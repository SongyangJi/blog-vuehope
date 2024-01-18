---
title: Kitex入门
date: 2022-12-03 23:59:15
tags:
  - RPC
  - Go
---



# thrift入门

## 安装
```shell
brew install thrift
```

## 编写thrift文件

[thrift语法](https://thrift.apache.org/docs/idl)

Goland 插件：Thrift Support



`User.thrift`

```thrift
namespace go Sample // Sample对应go的module名

struct User {
    1:required i32 id;
    2:required string name;
    3:required string avatar;
    4:required string address;
    5:required string mobile;
}

struct UserList {
    1:required list<User> userList;
    2:required i32 page;
    3:required i32 limit;
}
```



`Service.thrift`

```thrift
include "User.thrift"

namespace go Sample

typedef map<string, string> Data

struct Response {
    1:required i32 errCode; // 错误码
    2:required string errMsg; // 错误信息
    3:required Data data;
}

//定义服务
service Greeter {
    Response SayHello(
        1:required User.User user
    )

    Response GetUser(
        1:required i32 uid
    )
}
```



## 使用thrift脚手架

使用`thrift -r -v --gen go idl/Service.thrift`根据idl文件生成go代码。

```sh
jisongyang@SongyangJi-MacBookAir thrift_sample % thrift -r -v --gen go idl/Service.thrift
Scanning /Users/jisongyang/GolandProjects/thrift_sample/idl/Service.thrift for includes
Scanning /Users/jisongyang/GolandProjects/thrift_sample/idl/User.thrift for includes
Parsing /Users/jisongyang/GolandProjects/thrift_sample/idl/User.thrift for types
Parsing /Users/jisongyang/GolandProjects/thrift_sample/idl/Service.thrift for types
Program: /Users/jisongyang/GolandProjects/thrift_sample/idl/User.thrift
Generating "go"
Program: /Users/jisongyang/GolandProjects/thrift_sample/idl/Service.thrift
Generating "go"
```

目录结构
```shell
.
├── client_test.go
├── gen-go  # thrift脚手架生成的目录
│   └── Sample
│       ├── GoUnusedProtection__.go
│       ├── Service-consts.go
│       ├── Service.go
│       ├── User-consts.go
│       ├── User.go
│       └── greeter-remote
│           └── greeter-remote.go
├── go.mod
├── go.sum
├── idl # 自己编写的idl文件
│   ├── Service.thrift
│   └── User.thrift
└── main.go
```



## server端实现interface

这是thrift生成的

```go
type Greeter interface {
  // Parameters:
  //  - User
  SayHello(ctx context.Context, user *User) (_r *Response, _err error)
  // Parameters:
  //  - UID
  GetUser(ctx context.Context, uid int32) (_r *Response, _err error)
}
```

 

server端里去实现：

```go
//定义服务
type Greeter struct {
}

//实现IDL里定义的接口
//SayHello
func (this *Greeter) SayHello(ctx context.Context, u *Sample.User) (r *Sample.Response, err error) {
    strJson, _ := json.Marshal(u)
    return &Sample.Response{ErrCode: 0, ErrMsg: "success", Data: map[string]string{"User": string(strJson)}}, nil
}

//GetUser
func (this *Greeter) GetUser(ctx context.Context, uid int32) (r *Sample.Response, err error) {
    return &Sample.Response{ErrCode: 1, ErrMsg: "user not exist."}, nil
}
```





```go
   
    //buffered
    var transportFactory thrift.TTransportFactory
    if *buffered {
        transportFactory = thrift.NewTBufferedTransportFactory(8192)
    } else {
        transportFactory = thrift.NewTTransportFactory()
    }
    
    //framed
    if *framed {
        transportFactory = thrift.NewTFramedTransportFactory(transportFactory)
    }
    
    //handler
    handler := &Greeter{}
    
    //transport,no secure
    var err error
    var transport thrift.TServerTransport
    transport, err = thrift.NewTServerSocket(*addr)
    if err != nil {
        fmt.Println("error running server:", err)
    }
    
    //processor
    processor := Sample.NewGreeterProcessor(handler) // 关键
    
    fmt.Println("Starting the simple server... on ", *addr)
    
    //start tcp server
    server := thrift.NewTSimpleServer4(processor, transport, transportFactory, protocolFactory)
    err = server.Serve()
    
    if err != nil {
        fmt.Println("error running server:", err)
    }
```



## client端

```go
var ctx = context.Background()

func GetClient() *Sample.GreeterClient {
    addr := ":9090"
    var transport thrift.TTransport
    var err error
    transport, err = thrift.NewTSocket(addr)
    if err != nil {
        fmt.Println("Error opening socket:", err)
    }
    
    //protocol
    var protocolFactory thrift.TProtocolFactory
    protocolFactory = thrift.NewTBinaryProtocolFactoryDefault()
    
    //no buffered
    var transportFactory thrift.TTransportFactory
    transportFactory = thrift.NewTTransportFactory()
    
    transport, err = transportFactory.GetTransport(transport)
    if err != nil {
        fmt.Println("error running client:", err)
    }
    
    if err := transport.Open(); err != nil {
        fmt.Println("error running client:", err)
    }
    
    iprot := protocolFactory.GetProtocol(transport)
    oprot := protocolFactory.GetProtocol(transport)
    
    client := Sample.NewGreeterClient(thrift.NewTStandardClient(iprot, oprot)) // 关键
    return client
}

//GetUser
func TestGetUser(t *testing.T) {
    client := GetClient()
    rep, err := client.GetUser(ctx, 100)
    if err != nil {
        t.Errorf("thrift err: %v\n", err)
    } else {
        t.Logf("Recevied: %v\n", rep)
    }
}
```






> Reference
>
> https://thrift.apache.org/
>
> [thrift语法](https://thrift.apache.org/docs/idl)





# Kitex

关于kite的介绍和微服务rpc的基本概念就不写了，直接上操作。



## 安装

1. 安装 kitex：`go install github.com/cloudwego/kitex/tool/cmd/kitex@latest`
2. 安装 thriftgo：`go install github.com/cloudwego/thriftgo@latest`


```shell
jisongyang@SongyangJi-MacBookAir kitex_echo % kitex --version
v0.4.3
jisongyang@SongyangJi-MacBookAir kitex_echo % thriftgo --version
thriftgo 0.2.4
```

> 有了thriftgo无需安装thrift了。

> 这里可以直接创建目录，用kitex生成项目，也可以先创建go项目再进去编写idl。

## 编写IDL

echo.thrift

```thrift
namespace go api

struct Request {
  1: string message
}

struct Response {
  1: string message
}

service Echo {
    Response echo(1: Request req)
}

```



## 生成 echo 服务代码

命令：`kitex -module kitex_echo -service p.s.m echo.thrift`



```shell
jisongyang@SongyangJi-MacBookAir kitex_echo % kitex -module kitex_echo -service p.s.m echo.thrift
jisongyang@SongyangJi-MacBookAir kitex_echo % tree
.
├── build.sh
├── echo.thrift
├── go.mod
├── handler.go
├── kitex_gen
│   └── api # idl中go的namespace
│       ├── echo # idl的文件名
│       │   ├── client.go
│       │   ├── echo.go
│       │   ├── invoker.go
│       │   └── server.go
│       ├── echo.go
│       ├── k-consts.go
│       └── k-echo.go
├── main.go
└── script
    └── bootstrap.sh

4 directories, 13 files

```

[代码生成](https://www.cloudwego.io/zh/docs/kitex/tutorials/code-gen/code_generation/)



+ -service service_name
使用该选项时，kitex 会生成构建一个服务的脚手架代码，参数 `service_name` 给出启动时服务自身的名字，通常其值取决于使用 Kitex 框架时搭配的服务注册和服务发现功能。

如果不指定 -service 参数，那么生成的只有 kitex_gen 目录。


+ -module module_name
  该参数用于指定生成代码所属的 Go 模块，会影响生成代码里的 import path。
  如果当前目录是在 $GOPATH/src 下的一个目录，那么可以不指定该参数；kitex 会使用 $GOPATH/src 开始的相对路径作为 import path 前缀。例如，在$GOPATH/src/example.com/hello/world 下执行 kitex，那么 kitex_gen/example_package/example_package.go 在其他代码代码里的 import path 会是 example.com/hello/world/kitex_gen/example_package。
如果当前目录不在 $GOPATH/src 下，那么必须指定该参数。
如果指定了 -module 参数，那么 kitex 会从当前目录开始往上层搜索 go.mod 文件
如果不存在 go.mod 文件，那么 kitex 会调用 go mod init 生成 go.mod；
如果存在 go.mod 文件，那么 kitex 会检查 -module 的参数和 go.mod 里的模块名字是否一致，如果不一致则会报错退出；
最后，go.mod 的位置及其模块名字会决定生成代码里的 import path。



> Another example

```
.
├── build.sh                     // 服务的构建脚本，会创建一个名为 output 的目录并生成启动服务所需的文件到里面
├── handler.go                   // 用户在该文件里实现 IDL service 定义的方法
├── kitex_gen                    // IDL 内容相关的生成代码
│   ├── base                     // base.thrift 的生成代码
│   │   ├── base.go              // thriftgo 的产物，包含 base.thrift 定义的内容的 go 代码
│   │   └── k-base.go            // kitex 在 thriftgo 的产物之外生成的代码
│   └── demo                     // demo.thrift 的生成代码
│       ├── demo.go              // thriftgo 的产物，包含 demo.thrift 定义的内容的 go 代码
│       ├── k-demo.go            // kitex 在 thriftgo 的产物之外生成的代码
│       └── demoservice          // kitex 为 demo.thrift 里定义的 demo service 生成的代码
│           ├── demoservice.go   // 提供了 client.go 和 server.go 共用的一些定义
│           ├── client.go        // 提供了 NewClient API
│           └── server.go        // 提供了 NewServer API
├── main.go                      // 程序入口
└── script                       // 构建脚本
    └── bootstrap.sh             // 服务的启动脚本，会被 build.sh 拷贝至 output 下
```





### 一个bug——not enough arguments in call to t.tProt.xxx

根本原因是thrift在git上的go包更新了增加对go 1.7中的http.request + context的用法，部分函数中增加了context参数；但是thriftgo生成的go代码是版本较低的。

所以解决方案就是要么使用最新的thriftgo（目前好像develop版本可以），要么降低`github.com/apache/thrif`的版本。

亲测，将版本降低到v0.13.0是可以的。





## client端

值得一提的是，这里直接使用了服务端生成的go代码，这是可以的也是应该的。

如果如果是其他语言的话，就必须要在generate code一下了。

```go
package main

import (
    "context"
    "log"
    "time"
    
    "github.com/cloudwego/kitex/client"
    "github.com/cloudwego/kitex/client/callopt"
    "kitex_echo/kitex_gen/api"
    "kitex_echo/kitex_gen/api/echo"
)

func main() {
    c, err := echo.NewClient("p.s.m", client.WithHostPorts("0.0.0.0:8888"))
    if err != nil {
        log.Fatal(err)
    }
    req := &api.Request{Message: "helloworld from jsy"}
    resp, err := c.Echo(context.Background(), req, callopt.WithRPCTimeout(3*time.Second))
    if err != nil {
        log.Fatal(err)
    }
    log.Println(resp)
}
```



Go.mod

```go
module kite_echo_client

go 1.18

require (
	github.com/cloudwego/kitex v0.4.3
	kitex_echo v0.0.0-00010101000000-000000000000 // 这个服务端的module还没推送到git remote
)

require (
	github.com/apache/thrift v0.13.0 // indirect
	github.com/bytedance/gopkg v0.0.0-20220531084716-665b4f21126f // indirect
	github.com/chenzhuoyu/iasm v0.0.0-20220818063314-28c361dae733 // indirect
	github.com/choleraehyq/pid v0.0.15 // indirect
	github.com/cloudwego/fastpb v0.0.2 // indirect
	github.com/cloudwego/frugal v0.1.3 // indirect
	github.com/cloudwego/netpoll v0.2.6 // indirect
	github.com/cloudwego/thriftgo v0.2.1 // indirect
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/google/pprof v0.0.0-20220608213341-c488b8fa1db3 // indirect
	github.com/jhump/protoreflect v1.8.2 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/oleiade/lane v1.0.1 // indirect
	github.com/tidwall/gjson v1.9.3 // indirect
	github.com/tidwall/match v1.1.1 // indirect
	github.com/tidwall/pretty v1.2.0 // indirect
	golang.org/x/arch v0.0.0-20220722155209-00200b7164a7 // indirect
	golang.org/x/net v0.0.0-20210614182718-04defd469f4e // indirect
	golang.org/x/sync v0.0.0-20210220032951-036812b2e83c // indirect
	golang.org/x/sys v0.0.0-20220817070843-5a390386f1f2 // indirect
	golang.org/x/text v0.3.6 // indirect
	google.golang.org/genproto v0.0.0-20210513213006-bf773b8c8384 // indirect
	google.golang.org/protobuf v1.28.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace kitex_echo => ../kitex_echo // 直接替换为本地目录
```







https://www.cloudwego.io/zh/docs/kitex/