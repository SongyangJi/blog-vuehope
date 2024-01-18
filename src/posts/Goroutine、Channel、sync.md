---
title: Go并发编程——goroutine、channel、sync
date: 2022-03-01 10:35:00
categories: Go
tags:
  - Go
  - 并发编程
---

```go
// 它的调度也是不规律的
func f(id int) {
	cnt := 0
	for {
		time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
		cnt++
		fmt.Printf("%d says %d\n", id, cnt)
	}
}

func main() {
	go f(1)
	go f(2)
	go f(3)
  // 仅仅让主任务不退出而已
	for {
		
	}
}

```





```go
var wg sync.WaitGroup

func hello(i int) {
	defer wg.Done() // goroutine结束就登记-1
	fmt.Println("Hello Goroutine!", i)
}
func main() {

	for i := 0; i < 10; i++ {
		wg.Add(1) // 启动一个goroutine就登记+1
		go hello(i) // 10个goroutine是并发执行的
	}
	wg.Wait() // 等待所有登记的goroutine都结束
}
```

