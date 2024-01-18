---
title: LeetCode并发编程题
date: 2022-11-30 02:33:13
categories: 并发编程
tags:
  - Go
  - 并发编程
---

# 1114. 按序打印

```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class Foo {


    Lock lock = new ReentrantLock();

    boolean firstFinished = false;
    Condition firstCondition = lock.newCondition();

    boolean secondFinished = false;
    Condition secondCondition = lock.newCondition();

    public Foo() {

    }

    public void first(Runnable printFirst) throws InterruptedException {
        lock.lock();
        // printFirst.run() outputs "first". Do not change or remove this line.
        printFirst.run();
        firstCondition.signal();
        firstFinished = true;
        lock.unlock();
    }

    public void second(Runnable printSecond) throws InterruptedException {
        lock.lock();
        if(!firstFinished){
            firstCondition.await();
        }
        // printSecond.run() outputs "second". Do not change or remove this line.
        printSecond.run();
        secondCondition.signal();
        secondFinished = true;
        lock.unlock();
    }

    public void third(Runnable printThird) throws InterruptedException {
        lock.lock();
        if(!secondFinished) {
            secondCondition.await();
        }
        // printThird.run() outputs "third". Do not change or remove this line.
        printThird.run();
        lock.unlock();
    }
}
```



```go
package main

import (
	"sync"
	"time"
)

type Foo struct {
	firstReady  chan struct{}
	secondReady chan struct{}
}

func newFoo() *Foo {
	return &Foo{
		firstReady:  make(chan struct{}),
		secondReady: make(chan struct{}),
	}
}

func (foo *Foo) first() {
	println("first")
	foo.firstReady <- struct{}{}
}

func (foo *Foo) second() {
	<-foo.firstReady
	println("second")
	foo.secondReady <- struct{}{}
}

func (foo *Foo) third() {
	<-foo.secondReady
	println("third")
}

func solve(foo *Foo) {
	wg := sync.WaitGroup{}
	wg.Add(3)

	go func() {
		defer wg.Done()
		foo.third()
	}()

	go func() {
		defer wg.Done()
		foo.second()
	}()

	go func() {
		defer wg.Done()
		foo.first()
	}()

	wg.Wait()
}

func main() {
	for {
		foo := newFoo()
		solve(foo)
		println()
		time.Sleep(time.Second)
	}
}
```





# 1117. H2O 生成

https://leetcode.cn/problems/building-h2o/



```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class H2O {

    Lock lock = new ReentrantLock();

    int numOfO;
    int numOfH; 


    Condition oCondition = lock.newCondition();
    Condition hCondition = lock.newCondition();

    public H2O() {

    }

    private boolean ableGenerate() {
        return numOfO == 1 && numOfH == 2;
    }

    private void reset() {
        this.numOfO = this.numOfH = 0;
    }

    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {
        lock.lock();
        try {
            while (numOfH == 2) {
                hCondition.await();
            }
            numOfH++;
            releaseHydrogen.run();
            if (ableGenerate()) {
                reset();
                oCondition.signalAll();
            }
        } finally {
            lock.unlock();
        }

    }

    public void oxygen(Runnable releaseOxygen) throws InterruptedException {
        lock.lock();
        try {
            while (numOfO == 1) {
                oCondition.await();
            }
            releaseOxygen.run();
            numOfO++;
            if (ableGenerate()) {
                reset();
                hCondition.signalAll();
            }
        } finally {
            lock.unlock();
        }
    }
}
```



```go
package main

import (
	"fmt"
)

const (
	H = "h"
	O = "o"
)

type H2OGenerator struct {
	hydrogen chan string
	oxygen   chan string
	h2o      chan string
}

func newH2OGenerator() *H2OGenerator {
	return &H2OGenerator{
		hydrogen: make(chan string, 2),
		oxygen:   make(chan string, 1),
		h2o:      make(chan string, 3), // this cap only must be greater than or equal 3
	}
}

func (g *H2OGenerator) GeneratorH2O() {
	go func() {
		for {
			g.hydrogen <- H
			g.h2o <- H
		}
	}()

	go func() {
		for {
			g.oxygen <- O
			g.h2o <- O
		}
	}()

	h20Flow := make(chan string)

	go func() {
		for {
			res := ""
			for i := 0; i < 3; i++ {
				res += <-g.h2o
			}
			h20Flow <- res
			<-g.hydrogen
			<-g.hydrogen
			<-g.oxygen
		}
	}()

	// checker
	func(flow <-chan string) {
		ok := func(s string) bool {
			var hCounter, oCounter int
			for _, c := range s {
				if c == 'h' {
					hCounter++
				} else if c == 'o' {
					oCounter++
				}
			}
			return hCounter == 2 && oCounter == 1
		}

		for e := range flow {
			if ok(e) {
				//fmt.Println(e)
			} else {
				panic(fmt.Sprintf("h20-generator working wrong, res = %s", e))
			}
			//time.Sleep(time.Second)
		}
	}(h20Flow)

}

func main() {
	newH2OGenerator().GeneratorH2O()
}

```



3个channel实际上就是3个信号量，向channel里发送元素实际上对应信号量的acquire，接收元素对应release。

这3个信号量的操作顺序实际上就是并发屏障。

```
S1 = Semaphore(1)
S2 = Semaphore(2)
S3 = Semaphore(3)

goroutine1 -> {
    S1.P()
    S3.P()
}

goroutine2 -> {
    S2.P()
    S3.P()
}

goroutine3 -> {
    S3.V()
    S3.V()
    S3.V()
    
    S1.V()
    S2.V()
    S2.V()
}
```


> 注意，这里使用channel实现的信号量的V操作和java中的Semaphore的release操作语义不一致！





# 1115. 交替打印 FooBar

```java
class FooBar {
    private int n;

    boolean available = false;


    public FooBar(int n) {
        this.n = n;
    }

    public void foo(Runnable printFoo) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            synchronized (this) {
                if (available) {
                    this.wait();
                }
                printFoo.run();
                this.notify();
                this.available = !this.available;
            }
        }
    }

    public void bar(Runnable printBar) throws InterruptedException {

        for (int i = 0; i < n; i++) {
            synchronized (this) {
                if (!available) {
                    this.wait();
                }
                printBar.run();
                this.notify();
                this.available = !this.available;
            }
        }
    }
}
```



```go
package main

import (
	"sync"
	"time"
)

type FooBar struct {
	n        int
	fooReady chan struct{}
	barReady chan struct{}
}

func newFooBar(n int) *FooBar {
	return &FooBar{
		n:        n,
		fooReady: make(chan struct{}),
		barReady: make(chan struct{}),
	}
}

func (fooBar *FooBar) foo() {
	for i := 0; i < fooBar.n; i++ {
		<-fooBar.fooReady
		print("foo")
		fooBar.barReady <- struct{}{}
	}
}

func (fooBar *FooBar) bar() {
	for i := 0; i < fooBar.n; i++ {
		<-fooBar.barReady
		print("bar")
		if i != fooBar.n-1 { // notice sync channel's feature, receive must match send
			fooBar.fooReady <- struct{}{}
		}
	}
}

func solve(fooBar *FooBar) {
	wg := sync.WaitGroup{}
	wg.Add(2)
	go func() {
		defer wg.Done()
		fooBar.bar()
	}()

	go func() {
		defer wg.Done()
		fooBar.foo()
	}()

	fooBar.fooReady <- struct{}{}
	wg.Wait()
}

func main() {
	for {
		foo := newFooBar(10)
		solve(foo)
		println()
		time.Sleep(time.Second)
	}
}

```