---
title: GoLang-方法
date: 2022-11-28 22:04:25
categories: Go
tags:
  - Go
---



```go
package main

import "fmt"

type N int

func (n N) testVal() {
	n++
	fmt.Printf("%p, %v\n", &n, n)
}

func (n *N) testPointer() {
	*n++
	fmt.Printf("%p, %v\n", n, *n)
}

func main() {
	var n N = 0
	n.testVal()
	n.testPointer()

	p := &n
	p.testVal()
	p.testPointer()

	fmt.Printf("%p, %v\n", &n, n)
}

```





```go
package main

import (
    "fmt"
    "reflect"
)

type S struct {
}

type T struct {
    S
}

func (S) SVal() {

}

func (*S) SPtr() {

}

func (T) TVal() {

}

func (*T) TPtr() {

}

func methodSet(v interface{}) {
    t := reflect.TypeOf(v)
    for i, n := 0, t.NumMethod(); i < n; i++ {
        method := t.Method(i)
        fmt.Println(method.Name, method.Type)
    }
}

func main() {
    var t T
    
    methodSet(t)
    println("-------")
    methodSet(&t)
}

```





Go语言里定义的方法集的规则是：
 从值的角度来看规则

| Values | Methods Receivers |
| ------ | ----------------- |
| T      | (t T)             |
| *T     | (t T) and (t *T)  |

T类型的值的方法集只包含值接收者声明的方法。而指向T类型的指针的方法集既包含值接收者声明的方法，也包含指针接收者声明的方法。



从接收者的角度来看规则

| Values | Methods Receivers |
| ------ | ----------------- |
| (t T)  | T and *T          |
| (t *T) | *T                |

使用指针接收者来实现一个接口，那么只有指向那个类型的指针才能够实现对应的接口。如果使用值接收者来实现一个接口，那么那个类型的值和指针都能够实现对应的接口。



作者：不会写代码的程序猿
链接：https://www.jianshu.com/p/1a5c68fa4009
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





**空指针**



```go
package main

import "fmt"

type X struct {
}

func (x *X) test() {
	fmt.Printf("test() : %p", x)
}

func main() {
	var x *X = nil
	x.test()
}

```





```go
package main

import "fmt"

type X struct {
}
=
func (x X) test() {
	fmt.Printf("test() : %p", x)
}

func main() {
	var x *X = nil
	x.test()
}

```

