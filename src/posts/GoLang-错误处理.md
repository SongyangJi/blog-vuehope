---
title: GoLang-错误处理
date: 2022-11-30 00:06:14
categories: Go
tags:
  - Go
---



```go
package main

import (
	"sync"
	"time"
)

var wg sync.WaitGroup

func testPanic() {
	a := []int{1, 2, 3}
	println(a[5])
}

// other's code, maybe panic
func boringTask(i int) {
	defer wg.Done()
	time.Sleep(time.Second * time.Duration(i))
	if i == 2 {
		testPanic()
	}
	println("end:", i)
}

func main() {
	tasks := 5
	wg.Add(tasks)
	for i := 0; i < tasks; i++ {
		go boringTask(i)
	}
	wg.Wait()
}

```





错误的做法：

```go
func main() {
	tasks := 5
	wg.Add(tasks)
	for i := 0; i < tasks; i++ {
		func() {
			defer func() {
				if err := recover(); err != nil {
					fmt.Printf("err=%v\n", err)
				}
			}()
			go boringTask(i)
		}()
	}
	wg.Wait()
}

```





```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func testPanic() {
	a := []int{1, 2, 3}
	println(a[5])
}

// other's code, maybe panic
func boringTask(param int) {
	defer wg.Done()
	time.Sleep(time.Second * time.Duration(param))
	if param == 2 {
		testPanic()
	}
	println("end:", param)
}

// 自己包裹一下
func boringTaskWrapper(param int) func() {
	return func() {
		defer func() {
			if err := recover(); err != nil {
				fmt.Printf("err=%v\n", err)
			}
		}()
		boringTask(param)
	}
}

func main() {
	tasks := 5
	wg.Add(tasks)
	for i := 0; i < tasks; i++ {
		go boringTaskWrapper(i)()
	}
	wg.Wait()
}

```

