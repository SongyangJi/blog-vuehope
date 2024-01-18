---
title: 使用Docker的API及SDK
date: 2022-05-08 02:20:39
categories: Docker
tags: 
  - 云原生
  - Docker
---



# Docker的HTTP-API

## 开启远程访问端口2375

### ~~修改/etc/default/docker（失败）~~

```shell
sudo vim /etc/default/docker
```

加上

DOCKER_OPTS="-H tcp://0.0.0.0:2375"

再

```shell
sudo systemctl restart docker
```





### ~~修改/etc/docker/daemon.json（失败）~~

```shell
vim /etc/docker/daemon.json
```

加入

```json
{
  "hosts": ["tcp://0.0.0.0:2375", "unix:///var/run/docker.sock"]
}
```

+ "unix:///var/run/docker.sock"：unix socket，本地客户端将通过这个来连接 Docker Daemon。
+ "tcp://0.0.0.0:2375"：tcp socket，表示允许任何远程客户端通过 2375 端口连接 Docker Daemon。

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

查看docker进程：

```shell
ps -ef | grep docker
#root      44221      1  1 18:16 ?        00:00:06 /usr/bin/dockerd -H tcp://0.0.0.0:2375 -H #unix://var/run/docker.sock
```
Docker守护进程打开一个HTTP Socket,这样才能实现远程通信







### 修改/usr/lib/systemd/system/docker.service（成功）

在/usr/lib/systemd/system/docker.service，配置远程访问。

主要是在[Service]这个部分，加上两个参数

```shell
# vim /usr/lib/systemd/system/docker.service
[Service]
# ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
```

重启

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```



这次检查我们看到了这个tcp进程:

```shell
root      117236       1  1 02:52 ?        00:00:05 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375 -H unix://var/run/docker.soc
```



## 使用Remote cocker daemon

### shell远程连接

```shell
# 加上请求主机即可
docker -H tcp://211.87.224.233:2375 version
docker -H tcp://ip:port ps
docker -H tcp://ip:port images
```



### RestAPI

浏览器访问：

比如想要查看版本 http://ip:port/version

其他的操作入口，请参考

> [Docker API Reference](https://docs.docker.com/engine/api/v1.41/#tag/Container)




> [Docker开启Remote API 访问 2375端口 ](https://www.cnblogs.com/hongdada/p/11512901.html)



# Docker-SDK-Go

## 入门


### 构造客户端

```go
package main

import (
	"github.com/docker/docker/client"
)

func main() {
	ctx := context.Background()
	// cli, err := client.NewClientWithOpts(client.FromEnv)
	// remoteDockerDaemonAddress := "211.87.224.233:2375"
	// cli, err := client.NewClientWithOpts(client.FromEnv, client.WithHost("tcp://" + remoteDockerDaemonAddress))
}
```

既可以连接本地，也可以连接远程的docker。



### 登录Registry私服并拉取镜像
```go
package main

import (
	"context"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"io"
	"os"
)

func main() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		panic(err)
	}

	harborUrl := "http://211.87.224.233:8930/"
	_, err = cli.RegistryLogin(ctx, types.AuthConfig{
		Username:      "admin",
		Password:      "admin",
		ServerAddress: harborUrl,
	})

	if err != nil {
		panic(nil)
	}

	imageName := "211.87.224.233:8930/sdu-weblab/hello-world"
  // out 是响应输出流，可以不输出
	out, err := cli.ImagePull(ctx, imageName, types.ImagePullOptions{})
	if err != nil {
		panic(err)
	}
	defer out.Close()
	io.Copy(os.Stdout, out)
}

```



### ~~查看容器的详细信息，如端口映射~~

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"os/exec"
	"strings"
)

func main() {
	//ip, port, err := getHostIpAndPortOfContainerPort("8af85dfb4659", "80")
	ip, port, err := getHostIpAndPortOfContainerPortFromConfig("8bfb9b8e2692", "80")
	if err != nil {
		panic(err)
	}
	fmt.Printf("ip:port = %s:%s", ip, port)
}

func getHostIpAndPortOfContainerPortFromConfig(containerId string, containerPort string) (ip string, port string, err error) {
	cli, err := client.NewClientWithOpts(client.FromEnv)
	containerJSON, err := cli.ContainerInspect(context.Background(), containerId)
	if !containerJSON.HostConfig.PublishAllPorts { // -p hostPort:containerPort
		_port, err := nat.NewPort(nat.SplitProtoPort(containerPort))
		if err != nil {
			return "", "", err
		}
		portBindMap := containerJSON.HostConfig.PortBindings
		bindings := portBindMap[_port]
		if len(bindings) == 0 {
			return "", "", errors.New(fmt.Sprintf("%s has no bindings", containerPort))
		}
		ip = bindings[0].HostIP
		port = bindings[0].HostPort
		if len(ip) == 0 {
			ip = "0.0.0.0"
		}
		return ip, port, nil
	} else { // -P containerPort
		return getHostIpAndPortOfContainerPort(containerId, containerPort)
	}
}

// todo 
func getHostIpAndPortOfContainerPort(containerId string, containerPort string) (ip string, port string, err error) {
	shell := "docker port " + containerId + " | grep " + containerPort + " | awk '{print $3}'"
	fmt.Println(shell)
	output, err := exec.Command("bash", "-c", shell).Output()
	if err != nil {
		return
	}
	ipPort := string(output)
	//fmt.Println(ipPort)
	splits := strings.Split(ipPort, ":")
	if len(splits) != 2 {
		err = errors.New("invalid format")
		return
	}
	ip = splits[0]
	port = splits[1]
	return
}

```

如果端口是用`-P`的方式随机映射的话就不能用`ContainerInspect`这个API了。



### 获取端口映射（获取其一即可）
```go
func getHostPortOfContainerPort(containerId string, containerPort string) (port string, err error) {
	shell := "docker port " + containerId + " | grep " + containerPort + " | awk '{print $3}'"
	output, err := exec.Command("bash", "-c", shell).Output()
	if err != nil {
		return
	}
	shellOut := string(output)
	shellOut = "0.0.0.0:49155\n:::49155"
	parts := strings.Split(shellOut, "\n")
	if len(parts) == 0 {
		err = fmt.Errorf("containerPort=%s has no bindings", containerPort)
		return
	}
	ipPort := parts[0]
	splits := strings.Split(ipPort, ":")
	if len(splits) != 2 {
		err = errors.New("invalid format")
		return
	}
	port = splits[1]
	return
}
```






### 创建容器

```go
const (
    imageName     string   = "my-gin:latest"                      //镜像名称
    containerName string   = "mygin-latest"                       //容器名称
    indexName     string   = "/" + containerName                  //容器索引名称，用于检查该容器是否存在是使用
    cmd           string   = "./ginDocker2"                       //运行的cmd命令，用于启动container中的程序
    workDir       string   = "/go/src/ginDocker2"                 //container工作目录
    openPort      nat.Port = "7070"                               //container开放端口
    hostPort      string   = "7070"                               //container映射到宿主机的端口
    containerDir  string   = "/go/src/ginDocker2"                 //容器挂载目录
    hostDir       string   = "/home/youngblood/Go/src/ginDocker2" //容器挂在载宿主机的目录
)


//创建容器
func createContainer(ctx context.Context, cli *client.Client) {
    //创建容器
    cont, err := cli.ContainerCreate(ctx, &container.Config{
        Image:      imageName,     //镜像名称
        Tty:        true,          //docker run命令中的-t选项
        OpenStdin:  true,          //docker run命令中的-i选项
        Cmd:        []string{cmd}, //docker 容器中执行的命令
        WorkingDir: workDir,       //docker容器中的工作目录
        ExposedPorts: nat.PortSet{
            openPort: struct{}{}, //docker容器对外开放的端口
        },
    }, &container.HostConfig{
        PortBindings: nat.PortMap{
            // 一个容器端口可以”一对多“地映射到多个宿主机端口
            openPort: []nat.PortBinding{nat.PortBinding{
                HostIP:   "0.0.0.0", //docker容器映射的宿主机的ip, 0.0.0.0 表示服务器的所有可监听的ip
                HostPort: hostPort,  //docker 容器映射到宿主机的端口;
        },
        Mounts: []mount.Mount{ //docker 容器目录挂在到宿主机目录
            mount.Mount{
                Type:   mount.TypeBind,
                Source: hostDir,
                Target: containerDir,
            },
        },
    }, nil, containerName)
    if err == nil {
        log.Printf("success create container:%s\n", cont.ID)
    } else {
        log.Println("failed to create container!!!!!!!!!!!!!")
    }
}
```

如果要实现-P（随机映射端口的话）的话：使用

```go
&container.HostConfig{
   PublishAllPorts: true,
}
```





**举例**

将`docker run -d -p 9000:80 --name docker.getting-started.latest docker/getting-started:latest`改写为docker程序：

```go
package main

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
)

func main() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		panic(err)
	}
 
	imageName := "docker/getting-started:latest"
	containerName := "docker.getting-started.latest"
	containerPort := nat.Port("80")
	hostPort := "9000"
	resp, err := cli.ContainerCreate(ctx,
		&container.Config{
			Image: imageName,
			ExposedPorts: nat.PortSet{
				containerPort: struct{}{},
			},
		}, &container.HostConfig{
			PortBindings: nat.PortMap{
				containerPort: []nat.PortBinding{ //
					{
						HostIP:   "0.0.0.0",
						HostPort: hostPort,
					},
				},
			},
		}, nil, nil, containerName)

	if err != nil {
		panic(err)
	}
	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}
	fmt.Printf("containerID = %s\n", resp.ID)
}
```


### 读取日志

```go
package main

import (
   "context"
   "io"
   "os"

   "github.com/docker/docker/api/types"
   "github.com/docker/docker/client"
)

func main() {
   ctx := context.Background()
   cli, err := client.NewClientWithOpts(client.FromEnv)
   //remoteDockerDaemonAddress := "211.87.224.233:2375"
   //cli, err := client.NewClientWithOpts(client.FromEnv, client.WithHost("tcp://"+remoteDockerDaemonAddress))
   if err != nil {
      panic(err)
   }

   options := types.ContainerLogsOptions{
      ShowStdout: true,
      ShowStderr: true,
      Follow:     true,
   }
   // Replace this ID with a container that really exists
   out, err := cli.ContainerLogs(ctx, "87f42c0ab7f5", options)
   if err != nil {
      panic(err)
   }

   io.Copy(os.Stdout, out)
}
```



如果将日志实时输出到websocket呢？如下：

```go
package main

import (
	"bufio"
	"context"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/websocket"
)

const DefaultBufferSize = 4 * 1024

var (
	out      io.ReadCloser
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	} // use default options
	conn *websocket.Conn
)

func main() {
	ctx := context.Background()
	//cli, err := client.NewClientWithOpts(client.FromEnv)
	remoteDockerDaemonAddress := "211.87.224.233:2375"
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithHost("tcp://"+remoteDockerDaemonAddress))
	if err != nil {
		panic(err)
	}

	options := types.ContainerLogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Follow:     true,
	}
	// Replace this ID with a container that really exists
	//out, err = cli.ContainerLogs(ctx, "8bfb9b8e2692", options) // local
	out, err = cli.ContainerLogs(ctx, "87f42c0ab7f5", options) // remote

	if err != nil {
		panic(err)
	}

	http.HandleFunc("/logs", socketHandler)
	log.Fatal(http.ListenAndServe("localhost:8081", nil))
}

func socketHandler(w http.ResponseWriter, r *http.Request) {
	// Upgrade our raw HTTP connection to a websocket based one
	_conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Error during connection upgradation:", err)
		os.Exit(3)
	}
	conn = _conn
	defer conn.Close()

	reader := bufio.NewReader(out)
	// The event loop
	for {
		message, err := reader.ReadString('\n')

		if err != nil {
			if err == io.EOF {
				exitAndNotifyPeer(message, 0)
			}
			exitAndNotifyPeer("\n", 1)
		}

		// todo delete
		log.Printf("Log read is: %s", message)

		err = conn.WriteMessage(websocket.TextMessage, []byte(message))
		if err != nil {
			log.Println("Error during message writing: ", err)
			os.Exit(2)
		}
	}
}

func exitAndNotifyPeer(msg string, exitCode int) {
	conn.WriteMessage(websocket.CloseMessage, []byte(msg))
	os.Exit(exitCode)
}
```






> 参考文档
>
> [一些小例子](https://docs.docker.com/engine/api/sdk/examples/)
>
> [Reference](https://pkg.go.dev/github.com/docker/docker/client)

