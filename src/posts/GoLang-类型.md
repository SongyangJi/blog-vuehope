---
title: GoLang-类型
date: 2022-11-21 09:48:19
categories: Go
tags:
  - Go
---



Go是**静态类型**语言。

# 定义

用`var`关键字声明变量

```go
package main

import (
	"fmt"
)

var x int  // 默认值为0
var f bool // 默认值为false

var a, b int // 相同类型的多个变量


var x1 int = 1 // 这里的int可以省略
var b byte = 1 // 这里的byte不可以省略

var i = 0           // 省略类型，提供初始值，类型有编译器推断
var j, s = 100, "s" // 不同类型初始化值

// 以组方式整理多行变量
var (
	i1, i2 int
	x1, s2 = 12.1, ""
)

func main() {
	fmt.Println("Hello World")
}

```



## 简短模式

```go
package main

import "fmt"

func main() {
	x := 1
	s := "s"

	i, s1 := 0, "" // 多个变量

	fmt.Println(x, s, i, s1)
}
```

但这种简短模式

1. **只能用在函数内部**。
2. 不能指定类型，只能通过初始化数据自动推导默认类型。



**退化赋值**

指的是多个变量使用**简短模式**并不总是定义，可能是重新赋值，比如err的使用。

（至少一个是新定义）

```go
package main

import "os"

func main() {
	f, err := os.Open("/dev/random") // f, err 都是新定义
	buf := make([]byte, 1024)
	n, err := f.Read(buf) // n 新定义，err退化赋值
}
```



## 多变量赋值

先计算出所有右值，然后再依次完成赋值操作

```go
func main() {
  x, y := 1, 2
  x, y = y + 3, x + 2
  println(x, y) // 5 3
}
```





# 常量

使用`const`关键字声明变量，取代`var`，并且必须提供初始值，没什么特别大的区别。

```go
const i = 0           // 省略类型，提供初始值，类型有编译器推断
const j, s = 100, "s" // 不同类型初始化值

// 以组方式整理多行变量
const (
	x1, s2 = 12.1, ""
)
```





# 各种类型

## 基本类型

Go 内置了以下基本类型：

+ 布尔
  + *bool*
+ 字符串
  + *string*（它的默认值是”“，而不是null）
+ 整数
  + *int* *int8* *int16* *int32* *int64*（int是默认类型，依据目标平台，32位或者64位）
  + *uint* *uint8* *uint16* *uint32* *uint64*
+ 字节
  + *byte* ，*uint8* 的别名
+ Unicode
  + *rune* ，*int32* 的别名
+ 浮点
  + *float32* *float64*（float64默认浮点数类型）
+ 复数
  + *complex64* *complex128*

还有其他几种高级类型，如slice、map、channel等等，后面详细介绍。



+ 存储指针的uintptr

uintptr is an integer type that is large enough to hold the bit pattern of any pointer.



## 引用类型

这里引用类型特指slice、map、channel这种预定义类型。

它们必须使用`make`，而不是使用`new`，具体的后面再讲。



## 自定义类型

使用`type`自定义自定义类型，包括基本类型创建，结构体，函数，接口等等。

```go
package main

import "fmt"

type (
	flags byte
	user struct {
		id int
		name string
	}
	handle func(string) bool
)

func main() {
	var x flags = 1
	var u user = user{
		id:   0,
		name: "",
	}
	var f handle = func(s string) bool {
		fmt.Println(s)
		return true
	}
}
```



# 类型转换

如果制定了变量的类型，那么go不允许隐式的转换，哪怕是向下兼容的。（这一点和java有点区别）

```go
	var x1 int64 = 11
	var x2 int32
	//x1 = x2 // Cannot use 'x2' (type int32) as the type int64
	x1 = int64(x2) // 必须强制转换
```



注意是 int(x)，而不是(int)x