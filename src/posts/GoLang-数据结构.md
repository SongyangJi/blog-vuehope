---
title: GoLang-数据结构
date: 2022-11-27 00:38:28
categories: Go
tags:
  - Go
---



# 切片

```go
package main

import "fmt"

func main() {
	a := [...]int{0, 1, 2}
	s := a[:]
	fmt.Println(a)
	fmt.Println(s)
	for i := range s {
		s[i] += 100
	}
	fmt.Println(a)
	fmt.Println(s)
}
```

输出

[0 1 2]
[0 1 2]
[100 101 102]
[100 101 102]