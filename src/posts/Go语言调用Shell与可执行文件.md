---
title: Go语言调用Shell与可执行文件
date: 2022-06-20 13:51:38
categories: Go
tags:
  - Go
---



# 库函数

os/exec包可用于调用外部命令，可以使用管道连接输入输出，并支持阻塞与非阻塞方式执行命令。
os/exec包中关键的类型为Cmd，以下介绍的所有方法皆服务于该类型：

- `func Command(name string, arg ...string) *Cmd`
   方法返回一个*Cmd， 用于执行name指定的程序(携带arg参数)

- `func (c *Cmd) Run() error`
   执行Cmd中包含的命令，阻塞直到命令执行完成

- `func (c *Cmd) Start() error`
   执行Cmd中包含的命令，该方法立即返回，并不等待命令执行完成

- `func (c *Cmd) Wait() error`
   该方法会阻塞直到Cmd中的命令执行完成，但该命令必须是被Start方法开始执行的

- `func (c *Cmd) Output() ([]byte, error)`
   执行Cmd中包含的命令，并返回标准输出的切片

- `func (c *Cmd) CombinedOutput() ([]byte, error)`
   执行Cmd中包含的命令，并返回标准输出与标准错误合并后的切片

- `func (c *Cmd) StdinPipe() (io.WriteCloser, error)`
   返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输入

- `func (c *Cmd) StdoutPipe() (io.ReadCloser, error)`
   返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输出

- `func (c *Cmd) StderrPipe() (io.ReadCloser, error)`
   返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准错误



# 普通调用示例

## 调用Shell命令或可执行文件
演示在当前目录创建一个空文件
```go
package main

import (
    "fmt"
    "os/exec"
)

func main(){
    cmd := exec.Command("touch", "test_file")

    err := cmd.Run()
    if err != nil {
        fmt.Println("Execute Command failed:" + err.Error())
        return
    }

    fmt.Println("Execute Command finished.")
}
```
一般不建议使用这种默认方式调用Shell脚本：
`cmd := exec.Command("my_shell.sh")`
因为这种方式实际的执行结果和命令行执行#sh my_shell.sh一样，如果你的Shell脚本不满足sh的规范，就会调用失败。

## 调用Shell脚本
设置bash来调用指定Shell脚本，dir_size.sh为我们测试用的Shell脚本。调用完成后打印Shell脚本的标准输出到控制台。
```go
package main

import (
    "fmt"
    "os/exec"
)

func main(){
    command := `./dir_size.sh .`
    cmd := exec.Command("/bin/bash", "-c", command)

    output, err := cmd.Output()
    if err != nil {
        fmt.Printf("Execute Shell:%s failed with error:%s", command, err.Error())
        return
    }
    fmt.Printf("Execute Shell:%s finished with output:\n%s", command, string(output))
}
```



## 使用输入输出Pipe
演示使用管道连接到grep命令的标准输入，过滤包含test的字符串，并使用管道连接标准输出，打印运行结果：
```go
package main

import (
    "fmt"
    "io/ioutil"
    "os/exec"
)

func main(){
    cmd := exec.Command("/bin/bash", "-c", "grep test")

    stdin, _ := cmd.StdinPipe()
    stdout, _ := cmd.StdoutPipe()

    if err := cmd.Start(); err != nil{
        fmt.Println("Execute failed when Start:" + err.Error())
        return
    }

    stdin.Write([]byte("go text for grep\n"))
    stdin.Write([]byte("go test text for grep\n"))
    stdin.Close()

    out_bytes, _ := ioutil.ReadAll(stdout)
    stdout.Close()

    if err := cmd.Wait(); err != nil {
        fmt.Println("Execute failed when Wait:" + err.Error())
        return
    }

    fmt.Println("Execute finished:" + string(out_bytes))
}
```

程序输出结果：

```shell
[root@localhost ~]# ./execCommand 
Execute finished:go test text for grep
```