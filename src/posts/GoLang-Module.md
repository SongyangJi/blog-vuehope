---
title: GoLang-Module
date: 2022-12-01 00:24:38
categories: Go
tags:
  - Go
---



# Go Mod 模式
Go Modules 在 Go 1.11 和 Go 1.12 中有三个模式，根据环境变量 `GO111MODULE`进行配置：

## GOPATH 模式（GO111MODULE=off）
Go 编译器从不使用 Go Mod。而会查找 vendor 目录和 GOPATH 以查找依赖项。

## Go Modules 模式（ GO111MODULE=on）
Go 编译器只使用 Go Mod，GOPATH不再作为导入目录，但它还是会把下载的依赖储存在 GOPATH/pkg/mod 中，也会把 go install 命令的结果放在 GOPATH/bin 中。

## 缺省模式（未设置该环境变量或 GO111MODULE=auto）
Go 编译器在同时满足以下两个条件时使用 Go Mod

1.当前目录不在 GOPATH/src/ 下；
2.在当前目录或上层目录中存在 go.mod 文件；

Go 1.13 及1.13以后版本默认使用 Go Mod 模式



# 依赖管理命令 go get/install、go mod tidy、download





# Go Module的发布、导入

https://zhuanlan.zhihu.com/p/109828249






> 参考文章
> https://www.topgoer.com/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AEgopath.html
>
> https://go.dev/blog/using-go-modules
>
> https://blog.csdn.net/m0_63044390/article/details/123984873
>
> https://www.topgoer.com/%E5%85%B6%E4%BB%96/%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86.html
>
> https://www.jianshu.com/p/04dd0d386df2
>
> [go mod 导入本地包](https://blog.golangstack.com/post/go-mod-import-local-package/)





