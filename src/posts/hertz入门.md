---
title: hertz入门
date: 2022-12-09 09:51:28
categories: hertz 
tags:
  - Go
---



# 安装

```shell
go install github.com/cloudwego/hertz/cmd/hz@latest
```


# 生成代码
```shell
jisongyang@SongyangJi-MacBookAir hertz_demo % hz new
output directory /Users/jisongyang/GolandProjects/hertz_demo is not under GOPATH/src. Please specify a module name with the '-module' flag
```

使用`-module`指定模块
```shell
hz new -module hertz_demo`
```

目录结构
```shell
jisongyang@SongyangJi-MacBookAir hertz_demo % tree
.
├── biz
│   ├── handler
│   │   └── ping.go
│   └── router
│       └── register.go
├── go.mod
├── go.sum
├── main.go
├── router.go
└── router_gen.go
```



# Demo



```go
package main

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/app/server"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
)

func main() {
	// server.Default() creates a Hertz with recovery middleware.
	// If you need a pure hertz, you can use server.New()
	h := server.Default()

	h.GET("/hello", func(ctx context.Context, c *app.RequestContext) {
		c.String(consts.StatusOK, "Hello hertz!")
	})

	h.Spin()
}
```



修改监听端口

```go
	// The default listening port is 8888.
	// You can modify it with server.WithHostPorts().
	h := server.Default(
		server.WithHostPorts("127.0.0.1:8080"),
		server.WithMaxRequestBodySize(20<<20),
		server.WithTransport(standard.NewTransporter),
	)
```



> https://www.cloudwego.io/zh/docs/hertz/