---
title: GoLang-运算符、流程控制
date: 2022-11-24 15:00:17
categories: Go
tags:
  - Go
---



# 运算符



## 自增

1. 只能后置，不允许前置
2. 只能作为单独语句，不可以作为表达式

```go
x := 1
x++
++x // error
y := x++ // error
```



## 指针

指针是一个专门用来保存地址的整形变量。

go语言的指针相比于c中的指针有很大的限制和改变。



1. **支持相等**运算符，但是**不支持加减法和类型转换**。
2. 不使用`->`访问成员，而是使用`.`
3. 不是所有对象都能使用`&`获得其地址。



```go
	x := 1
	var p *int = &x
	fmt.Println(x, p)
	//p++ // Invalid operation: p++ (non-numeric type *int)
	//p += 2 // Invalid operation: p += 2 (mismatched types *int and untyped int)
```



```go
m := make(map[string]int)
m["1"] = 1
m["2"] = 2
println(m, &m) // 0x1400005e180 0x1400000e028 为什么不一样？0x1400005e180引用着map
fmt.Println(m, &m) // map[1:1 2:2] &map[1:1 2:2]
```




### unsafe.Pointer和uintptr







### 零长度对象

```go
	var a, b struct{}
	pa := &a
	pb := &b
	println(pa)
	println(pb)
	println(pa == pb) // 结果和具体实现有关

	p1 := unsafe.Pointer(pa)
	p2 := unsafe.Pointer(pb)
	var p1ptr uintptr = uintptr(p1)
	var p2ptr uintptr = uintptr(p2)
	println(p1ptr)
	println(p2ptr)
	println(p1ptr == p2ptr) // true
```

输出：

0x14000096f58
0x14000096f58
false
1374390153048
1374390153048
true



**零长度对象**的地址如何分配看具体实现，总之**肯定不为nil**，换言之它拥有合法的内存地址。



### 二级指针

```go
	x := 1
	px := &x
	ppx := &px // var pxx **int = &px
	fmt.Println(x, &x)
	fmt.Println(px, &px, *px)
	fmt.Println(ppx, &ppx, *ppx)
```



# 初始化

对于复合类型（数组、切片、字典、结构体）的初始化而言，有一些语法限制。

1. 初始化表达式必须有类型标签；
2. 左花括号必须在类型尾部，不能另起一行；
3. 多个成员以逗号分隔；



```go
	type data struct {
		x int
		s string
	}

	d := data{ // 初始化表达式必须有类型标签
		1,
		"s", // 逗号不能省略
	}
```





# 流程控制

## if-else

```go
package main

func t() int {
   return 0
}

func main() {
   x := 1
   if x > 1 { // 
      
   } else {
   
   }
   
   if a, b := t(), t(); a < b {
      
   } else {
      
   }
}
```





## switch

```go
    a, b, c := 1, 2, 3
    switch x := foo(); x { // 支持局部变量初始化
    case a: // 支持非常量
        println(a)
    case b:
        println(b)
    case c:
        println(c)
    case 4:
        println(4)
    case 5, 6, 7: // 支持多case合并
        println("5 <= x <= 7")
    default:
        println("8 <= x")
    }
```



**无需显式使用break**，这是和Java中的switch最大的区别。

如果需要Java中的switch中**贯通后续**的效果，可以使用`fallthrough`关键字（后续就不再匹配条件表达式，注意执行下一个case），同时使用`break`拦截fallthrough。 

```go
    a, b, c := 1, 2, 3
    switch x := foo(); x { // 支持局部变量初始化
    case a: // 支持非常量
        println(a)
    case b:
        println(b)
        if b > 1 {
           break
        }
        fallthrough
    case c:
        println(c)
    case 4:
        println(4)
    case 5, 6, 7: // 支持多case合并
        println("5 <= x <= 7")
    default:
        println("8 <= x")
    }
```



## for

for循环的几种形式：

```go
  x := 10
  for x > 0 {
    x--
  }
    
	for i := 0; i < 10; i++ {

	}

	for {
		// endless loop
	}

	for true {
		// endless loop
	}
```



### for-range

可以使用`for-range`完成可迭代对象的数据遍历，支持**字符串、数组、数组指针、切片、字典、通道**，返回索引，键值数据。



| Data-type | 1st value | 2nd value |
| --------- | --------- | --------- |
| string    | index     | s[index]  |
| array     | index     | v[index]  |
| map       | key       | value     |
| channel   | element   |           |



这里只演示string和array 的遍历，后面的具体再介绍。

```go
	var str = "abcdef"
	for i, c := range str {
		fmt.Printf("s[%d] = %c i.e. %c\n", i, str[i], c)
	}
```



for-range类似于java中的for-each语句，但是由于语言底层本身的区别，二者还是有不同的。



比如，range数组和数组指针是有差别的。

```go
package main

func f1() {
	data := [3]string{"1", "2", "3"}
	for i, s := range data {
		if i == 0 {
			data[0] += "a"
			data[1] += "b"
			data[2] += "c"
		}
		println(i, s, data[i]) // 这里输出的s都是改变之前的data的复制品中的元素
	}
}

func f2() {
	data := [3]string{"1", "2", "3"}
	for i, s := range &data {
		if i == 0 {
			data[0] += "a"
			data[1] += "b"
			data[2] += "c"
		}
		println(i, s, data[i])
	}
}

func main() {
	f1()
	println()
	f2()
}

/**
0 1 1a
1 2 2b
2 3 3c

0 1 1a
1 2b 2b
2 3c 3c

*/
```



**range会复制目标数据，比如range一个数组时其实遍历的是复制的那个数组。不过，字符串、切片是个很小的结构体，字典和通道本身是指针封装，它们的复制成本都很小，无需担心。**





返回部分元素。

```go
    data := [3]string{"1", "2", "3"}
    for i := range data {
        if i == 0 {
            data[0] += "a"
            data[1] += "b"
            data[2] += "c"
        }
    }
    
    for _, s := range data {
        println(s)
    }
    
    for range data { // 仅迭代，不返回。可以用来执行清空channel
        
    }
```





## continue、break

continue 仅用于 for 循环。

break可以用于for、switch，还可以用于`select`语句（后面详细介绍）

