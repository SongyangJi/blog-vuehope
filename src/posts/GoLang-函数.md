---
title: GoLang-函数
date: 2022-11-25 15:50:38
categories: Go
tags:
  - Go
---

# 定义

使用`func`定义函数。

go中的函数有如下特点（优缺点皆有）



1. 无须前置声明
2. 不支持命名嵌套定义
3. **不支持同名函数重载！（overload）**
4. 不支持默认参数



1. 支持不定长变参
2. **支持多返回值**
3. **支持命名返回值**
4. **支持匿名函数和闭包**



函数属于第一类对象，具有相同签名（参数列表和返回值列表）的视作同一类型。

> 第一类对象值得是可以运行时动态创建，可以用作函数的参数、返回值，可以存入变量的实体。



函数只能判断是否为nil，不支持其它任何比较操作。



一些小例子

```go
package main

import "strconv"

func f1() { // 无参、无返回值
}

func f3(x int) int {
	return 0
}

func f4() *int { // 返回指针也是安全的
	return nil
}

func f5(x int) (int, string) { // 多返回值
	return 0, ""
}

func f6() (res int, mes string) { // 命名返回值
	return 0, ""
}

type myHandler func(param string) (code int, msg string) // 定义一个函数

// 函数作为返回值
func chooseStrategy(code int) myHandler {
	var m map[int]myHandler
	return m[code]
}

// 函数作为参数
func exec(handler myHandler, param string) map[string]string {
	i, s := handler(param)
	//m := make(map[string]string)
	m := map[string]string{"code": strconv.Itoa(i), "msg": s}
	return m
}

func main() {
}
```



# 参数

相邻的同类型参数可合并:

```go
func f(x, y int, s1, s2 string) {

}
```



## 参数的传递方式

在go中，不管是指针，基本类型，引用类型还是其他类型参数，都是**值拷贝传递**。

```go
package main

func f(a [2]int) {
	println(&a)
	a[0]++
	a[1]++
}

func main() {
	a := [2]int{0, 0}
	println(&a)
	f(a)
	println(&a)
	for _, i := range a {
		println(i)
	}
}
/**
0x14000096f48
0x14000096f38
0x14000096f48
0
0

*/
```



> 数组是值类型。





## 指针参数性能更好吗？

> 这个问题对于java用户来说其实不算问题，因为java除了8种基本数据类型外都是对象，传递的时候都是对象的引用。

对于go的话，也不能说使用指针传递就一定更好。

首先，使用指针参数好处是避免了大对象的复制。



## 变参





