---
title: Docker入门
date: 2022-04-03 18:16:01
categories: Docker
tags:
---

系列文章

[由浅入深吃透Docker](https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/%E7%94%B1%E6%B5%85%E5%85%A5%E6%B7%B1%E5%90%83%E9%80%8F%20Docker-%E5%AE%8C)



Docker 是**一个用于开发、发布和运行应用程序的开放平台**。Docker 使您能够**将应用程序与基础架构分离**，以便您可以快速交付软件。使用 Docker，您可以像管理应用程序一样管理基础设施。通过利用 Docker 快速交付、测试和部署代码的方法，您可以显着减少编写代码和在生产环境中运行之间的延迟。



## 我可以使用 Docker 做什么？

+ **快速、一致地交付您的应用程序**
Docker 通过允许开发人员使用提供应用程序和服务的本地容器在标准化环境中工作来简化开发生命周期。

也就是说，**容器的概念非常适合持续集成和持续交付 (CI/CD) 工作流程。**

+ **响应式部署和扩展**

Docker 基于容器的平台允许高度可移植的工作负载。Docker 容器可以在开发人员的本地笔记本电脑、数据中心的物理或虚拟机、云提供商或混合环境中运行。

Docker 的可移植性和轻量级特性还使得动态管理工作负载、根据业务需求**近乎实时地扩展或拆除应用程序和服务变得容易**。



+ **在相同硬件上运行更多工作负载**
> Docker 是轻量级和快速的。它为基于管理程序的虚拟机提供了一种可行且经济高效的替代方案，因此您可以使用更多的计算容量来实现业务目标。Docker 非常适合高密度环境下需要用更少资源完成更多工作的中小型部署。

也就是说，相比对docker更加可靠。



## Docker architecture

Docker 使用客户端-服务器架构。Docker客户端与 Docker守护进程对话，后者负责构建、运行和分发 Docker 容器的繁重工作。Docker 客户端和守护程序可以在同一系统上运行，或者您可以将 Docker 客户端连接到远程 Docker 守护程序。Docker 客户端和守护程序使用 REST API，通过 UNIX 套接字或网络接口进行通信。另一个 Docker 客户端是 Docker Compose，它允许您使用由一组容器组成的应用程序。

![Docker Architecture Diagram](architecture.svg)



### The Docker daemon（Docker 守护进程）

Docker 守护程序 ( `dockerd`) 侦听 Docker API 请求并管理 Docker 对象，例如 images, containers, networks, and volumes（镜像、容器、网络和数据卷）。守护进程还可以与其他守护进程通信以管理 Docker 服务。



### The Docker client

Docker 客户端 ( `docker`) 是许多 Docker 用户与 Docker 交互的主要方式。当您使用诸如`docker run`之类的命令时，客户端会将这些命令发送到`dockerd`执行它们。该`docker`命令使用 Docker API。Docker 客户端可以与多个守护进程通信。



### Docker Desktop

Docker Desktop 是一个易于安装的应用程序，适用于您的 Mac 或 Windows 环境，使您能够构建和共享容器化应用程序和微服务。Docker Desktop 包括 Docker 守护程序 ( `dockerd`)、Docker 客户端 ( `docker`)、Docker Compose、Docker Content Trust、Kubernetes 和 Credential Helper。



### Docker registries（注册中心）

Docker*注册中心*存储 Docker 镜像。

Docker Hub 是一个任何人都可以使用的公共注册中心，并且 Docker 默认配置为在 Docker Hub 上查找镜像。您甚至可以运行自己的私有注册中心。

当您使用`docker pull` or `docker run`命令时，将从您配置的注册中心中提取所需的镜像。

当您使用该`docker push`命令时，您的镜像会被推送到您配置的注册中心中。



### Docker objects

#### Images（镜像）

*镜像*是一个只读模板，其中包含创建 Docker 容器的指令。

通常，一个镜像基于另一个镜像，并带有一些额外的自定义。例如，您可以基于`ubuntu`映像构建一个自己的映像 ，而这个自定义的镜像安装了 Apache Web Server和自己的应用程序，以及使得应用程序运行所需的配置信息。

你可以创建自己的镜像，也可以只使用其他人创建并在注册中心中发布的镜像。 

要构建您自己的镜像，你需要使用简单的语法创建一个*Dockerfile* ，这个docker file便是用于定义创建和运行镜像所需的步骤。

Dockerfile 中的每条指令都会在映像中创建一个层（layer）。当您更改 Dockerfile 并重建映像时，仅重建那些已更改的层。与其他虚拟化技术相比，这是使映像如此轻量、小巧和快速的部分原因。



#### Containers

*容器*是镜像的可运行实例。

您可以**使用 Docker API 或 CLI 创建、启动、停止、移动或删除（create, start, stop, move, or delete）容器**。您可以将容器连接到一个或多个网络，将存储附加到它，甚至可以根据其当前状态创建新映像。

默认情况下，一个容器与其他容器及其主机的隔离相对较好。您可以控制容器的网络、存储或其他底层子系统与其他容器或主机的隔离程度。

**容器由其映像以及您在创建或启动它时提供给它的配置选项定义**。

当容器被移除时，任何未存储在持久存储介质中的状态更改都会消失。



##### 示例`docker run`命令

以下命令运行一个`ubuntu`容器，以交互方式附加到您的本地命令行会话，然后运行`/bin/bash`.

```shell
docker run -i -t ubuntu /bin/bash
```

当您运行此命令时，会发生以下情况（假设您使用的是默认注册中心配置）：

1. 如果您在本地没有`ubuntu`映像，Docker 会从您配置的注册中心中提取它，就像您`docker pull ubuntu`手动运行一样。
2. Docker 会创建一个新容器，就像您`docker container create` 手动运行命令一样。
3. Docker 为容器分配一个读写文件系统，作为它的最后一层。这允许正在运行的容器在其本地文件系统中创建或修改文件和目录。
4. Docker 创建了一个网络接口来将容器连接到默认网络，因为您没有指定任何网络选项（这是一个默认行为）。这包括为容器分配 IP 地址。默认情况下，容器可以使用主机的网络连接连接到外部网络。
5. Docker 启动容器并执行`/bin/bash`. 因为容器以交互方式运行并附加到您的终端（由于`-i`and`-t` 标志），您可以在输出记录到终端时使用键盘提供输入。
6. 当您键入`exit`终止`/bin/bash`命令时，容器会停止但不会被删除。您可以重新启动或删除它。



## 底层技术

Docker 是用Go 编写的，并利用 Linux 内核的几个特性来提供其功能。Docker 使用一种称为`namespaces`的技术来提供隔离的工作空间（也就是所说的*容器*的概念）。当您运行容器时，Docker 会为该容器创建一组 *命名空间。*

这些命名空间提供了一层隔离。容器的每个方面都在单独的命名空间中运行，并且它的访问权限仅限于该命名空间。



> 参考
>
> https://docs.docker.com/get-started/overview/
>
