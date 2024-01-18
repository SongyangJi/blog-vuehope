---
title: GoLang入门
date: 2021-12-27 00:28:14
categories: Go
tags:
  - Go
---



# 安装

pkg包安装简单，只需双击+一路next即可，安装路径默认是/usr/local/go/

https://zh.wikipedia.org/wiki/Go

https://go.dev/dl/

https://go.dev/



https://go.dev/doc/install



[安装多个版本的go](https://go.dev/doc/manage-install#installing-multiple)



# HelloWorld

创建编辑文件`vim hello.go`

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello World")
}
```



直接运行

```go
jisongyang@SongyangJi-MacBookAir tmp % go run hello.go
Hello World
```



先编译后执行（多一个编译产物）

```go
jisongyang@SongyangJi-MacBookAir tmp % go build -o hello hello.go
jisongyang@SongyangJi-MacBookAir tmp % ls
hello		hello.go
jisongyang@SongyangJi-MacBookAir tmp % ./hello
Hello World
```



