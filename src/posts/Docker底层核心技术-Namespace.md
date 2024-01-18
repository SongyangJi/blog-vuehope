---
title: Docker底层核心技术-Namespace
date: 2022-06-11 15:50:01
categories: Docker
tags:
  - Docker
---

> 我们知道， Docker 是使用 Linux 的 Namespace 技术实现各种资源隔离的。那么究竟什么是 Namespace，各种 Namespace 都有什么作用，为什么 Docker 需要 Namespace呢？


# 什么是 Namespace？

`Linux Namespace` 是 Linux 提供的一种内核级别环境隔离的方法。用官方的话来说，Linux Namespace 将全局系统资源封装在一个抽象中，从而使 namespace 内的进程认为自己具有独立的资源实例。这项技术本来没有掀起多大的波澜，是容器技术的崛起让他重新引起了大家的注意。

Linux Namespace 有如下 6 个种类：

| **分类**           | **系统调用参数** | **相关内核版本**                                             |
| ------------------ | ---------------- | ------------------------------------------------------------ |
| Mount namespaces   | CLONE_NEWNS      | [Linux 2.4.19](https://link.segmentfault.com/?enc=%2BUZjUSHsFnVMyxdIRI1AGg%3D%3D.gjeALggXOGhl4I%2FK6t%2FPu631zlrDabPYtH1Thy9PM6sQrfTxhZC7kHt%2BChNg3UwF) |
| UTS namespaces     | CLONE_NEWUTS     | [Linux 2.6.19](https://link.segmentfault.com/?enc=UMCIjnpsL9NzRflD2ekSlw%3D%3D.JUrNrso34Pdfy7WehLf8IbcdnOLCax6hnFPVZTIfm44%3D) |
| IPC namespaces     | CLONE_NEWIPC     | [Linux 2.6.19](https://link.segmentfault.com/?enc=mVHsSGWBKT%2F8S8FsszpQNg%3D%3D.eMt8rtHaduUCEFo0KkpSywYvUBa1M0c6L%2F1vPeVf7Fg%3D) |
| PID namespaces     | CLONE_NEWPID     | [Linux 2.6.24](https://link.segmentfault.com/?enc=jYUd3r2qkaHvuIuS45YcNA%3D%3D.F%2BFbhTmnrxXQ9og%2BjZ6YeUvF4OCSW%2BlbZh3QRIBW2qE%3D) |
| Network namespaces | CLONE_NEWNET     | [始于Linux 2.6.24 完成于 Linux 2.6.29](https://link.segmentfault.com/?enc=B8NyDjpAtiUsjd4TxzKOFw%3D%3D.mlMGKdt%2FsGvRRyFOFDguy%2FXwnvgxyz8qGKBfpboNVO4%3D) |
| User namespaces    | CLONE_NEWUSER    | [始于 Linux 2.6.23 完成于 Linux 3.8](https://link.segmentfault.com/?enc=5AgrP7X98up%2Fuyck268Z9w%3D%3D.Iem7g4brwXF4ER%2BOhdjlTQLCWYQSqFcei5K3MT5e9pA%3D) |

**namespace 的 API 由三个系统调用和一系列 `/proc` 文件组成**。

本文将会详细介绍这些系统调用和 `/proc` 文件。为了指定要操作的 namespace 类型，需要在系统调用的 flag 中通过常量 `CLONE_NEW*` 指定（包括 `CLONE_NEWIPC`，`CLONE_NEWNS`， `CLONE_NEWNET`，`CLONE_NEWPID`，`CLONE_NEWUSER` 和 `CLONE_NEWUTS），可以指定多个常量，通过 **|**（位或）操作来实现。

简单描述一下三个系统调用的功能：

+ **clone()** : 实现线程的系统调用，用来创建一个新的进程，并可以通过设计上述系统调用参数达到隔离的目的。
+ **unshare()** : 使某进程脱离某个 namespace。
+ **setns()** : 把某进程加入到某个 namespace。

具体的实现原理请往下看。




# 各种 Namespace 的作用？

## Mount Namespace
Mount Namespace 是 Linux 内核实现的第一个 Namespace，从内核的 2.4.19 版本开始加入。它可以用来隔离不同的进程或进程组看到的挂载点。通俗地说，就是可以实现在不同的进程中看到不同的挂载目录。使用 Mount Namespace 可以实现容器内只能看到自己的挂载信息，在容器内的挂载操作不会影响主机的挂载目录。



## PID Namespace
PID Namespace 的作用是用来隔离进程。在不同的 PID Namespace 中，进程可以拥有相同的 PID 号，利用 PID Namespace 可以实现每个容器的主进程为 1 号进程，而容器内的进程在主机上却拥有不同的PID。例如一个进程在主机上 PID 为 122，使用 PID Namespace 可以实现该进程在容器内看到的 PID 为 1。

下面我们通过一个实例来演示下 PID Namespace的作用。首先我们使用以下命令创建一个 bash 进程，并且新建一个 PID Namespace：

```
$ sudo unshare --pid --fork --mount-proc /bin/bash

[root@centos7 centos]#
```

执行完上述命令后，我们在主机上创建了一个新的 PID Namespace，并且当前命令行窗口加入了新创建的 PID Namespace。在当前的命令行窗口使用 ps aux 命令查看一下进程信息：

```
[root@centos7 centos]# ps aux

USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND

root         1  0.0  0.0 115544  2004 pts/0    S    10:57   0:00 bash

root        10  0.0  0.0 155444  1764 pts/0    R+   10:59   0:00 ps aux
```

通过上述命令输出结果可以看到当前 Namespace 下 bash 为 1 号进程，而且我们也看不到主机上的其他进程信息。



## UTS Namespace

UTS Namespace 主要是用来隔离主机名的，它允许每个 UTS Namespace 拥有一个独立的主机名。例如我们的主机名称为 docker，使用 UTS Namespace 可以实现在容器内的主机名称为 lagoudocker 或者其他任意自定义主机名。

同样我们通过一个实例来验证下 UTS Namespace 的作用，首先我们使用 unshare 命令来创建一个 UTS Namespace：

```perl
$ sudo unshare --uts --fork /bin/bash

[root@centos7 centos]#
```

创建好 UTS Namespace 后，当前命令行窗口已经处于一个独立的 UTS Namespace 中，下面我们使用 hostname 命令（hostname 可以用来查看主机名称）设置一下主机名：

```perl
root@centos7 centos]# hostname -b lagoudocker
```

然后再查看一下主机名：

```csharp
[root@centos7 centos]# hostname

lagoudocker
```

通过上面命令的输出，我们可以看到当前UTS Namespace 内的主机名已经被修改为 lagoudocker。然后我们新打开一个命令行窗口，使用相同的命令查看一下主机的 hostname：

```ruby
[centos@centos7 ~]$ hostname

centos7
```

可以看到主机的名称仍然为 centos7，并没有被修改。由此，可以验证 UTS Namespace 可以用来隔离主机名。

## IPC Namespace

IPC Namespace 主要是用来隔离进程间通信的。例如 PID Namespace 和 IPC Namespace 一起使用可以实现同一 IPC Namespace 内的进程彼此可以通信，不同 IPC Namespace 的进程却不能通信。

同样我们通过一个实例来验证下IPC Namespace的作用，首先我们使用 unshare 命令来创建一个 IPC Namespace：

```perl
$ sudo unshare --ipc --fork /bin/bash

[root@centos7 centos]#
```

下面我们需要借助两个命令来实现对 IPC Namespace 的验证。

+ ipcs -q 命令：用来查看系统间通信队列列表。
+ ipcmk -Q 命令：用来创建系统间通信队列。

我们首先使用 ipcs -q 命令查看一下当前 IPC Namespace 下的系统通信队列列表：

```ruby
[centos@centos7 ~]$ ipcs -q

------ Message Queues --------

key        msqid      owner      perms      used-bytes   messages
```

由上可以看到当前无任何系统通信队列，然后我们使用 ipcmk -Q 命令创建一个系统通信队列：

```bash
[root@centos7 centos]# ipcmk -Q

Message queue id: 0
```

再次使用 ipcs -q 命令查看当前 IPC Namespace 下的系统通信队列列表：

```csharp
[root@centos7 centos]# ipcs -q

------ Message Queues --------

key        msqid      owner      perms      used-bytes   messages

0x73682a32 0          root       644        0            0
```

可以看到我们已经成功创建了一个系统通信队列。然后我们新打开一个命令行窗口，使用ipcs -q 命令查看一下主机的系统通信队列：

```ruby
[centos@centos7 ~]$ ipcs -q

------ Message Queues --------

key        msqid      owner      perms      used-bytes   messages
```

通过上面的实验，可以发现，在单独的 IPC Namespace 内创建的系统通信队列在主机上无法看到。即 IPC Namespace 实现了系统通信队列的隔离。

## User Namespace

User Namespace 主要是用来隔离用户和用户组的。一个比较典型的应用场景就是在主机上以非 root 用户运行的进程可以在一个单独的 User Namespace 中映射成 root 用户。使用 User Namespace 可以实现进程在容器内拥有 root 权限，而在主机上却只是普通用户。

User Namesapce 的创建是可以不使用 root 权限的。下面我们以普通用户的身份创建一个 User Namespace，命令如下：

```ruby
[centos@centos7 ~]$ unshare --user -r /bin/bash

[root@centos7 ~]#
```

> CentOS7 默认允许创建的 User Namespace 为 0，如果执行上述命令失败（ unshare 命令返回的错误为 unshare: unshare failed: Invalid argument ），需要使用以下命令修改系统允许创建的 User Namespace 数量，命令为：echo 65535 > /proc/sys/user/max_user_namespaces，然后再次尝试创建 User Namespace。

然后执行 id 命令查看一下当前的用户信息：

```ini
[root@centos7 ~]# id

uid=0(root) gid=0(root) groups=0(root),65534(nfsnobody) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
```

通过上面的输出可以看到我们在新的 User Namespace 内已经是 root 用户了。下面我们使用只有主机 root 用户才可以执行的 reboot 命令来验证一下，在当前命令行窗口执行 reboot 命令：

```csharp
[root@centos7 ~]# reboot

Failed to open /dev/initctl: Permission denied

Failed to talk to init daemon.
```

可以看到，我们在新创建的 User Namespace 内虽然是 root 用户，但是并没有权限执行 reboot 命令。这说明在隔离的 User Namespace 中，并不能获取到主机的 root 权限，也就是说 User Namespace 实现了用户和用户组的隔离。



## Net Namespace

Net Namespace 是用来隔离网络设备、IP 地址和端口等信息的。Net Namespace 可以让每个进程拥有自己独立的 IP 地址，端口和网卡信息。例如主机 IP 地址为 172.16.4.1 ，容器内可以设置独立的 IP 地址为 192.168.1.1。

同样用实例验证，我们首先使用 ip a 命令查看一下主机上的网络信息：

```sql
$ ip a

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000

    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

    inet 127.0.0.1/8 scope host lo

       valid_lft forever preferred_lft forever

    inet6 ::1/128 scope host

       valid_lft forever preferred_lft forever

2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000

    link/ether 02:11:b0:14:01:0c brd ff:ff:ff:ff:ff:ff

    inet 172.20.1.11/24 brd 172.20.1.255 scope global dynamic eth0

       valid_lft 86063337sec preferred_lft 86063337sec

    inet6 fe80::11:b0ff:fe14:10c/64 scope link

       valid_lft forever preferred_lft forever

3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default

    link/ether 02:42:82:8d:a0:df brd ff:ff:ff:ff:ff:ff

    inet 172.17.0.1/16 scope global docker0

       valid_lft forever preferred_lft forever

    inet6 fe80::42:82ff:fe8d:a0df/64 scope link

       valid_lft forever preferred_lft forever
```

然后我们使用以下命令创建一个 Net Namespace：

```perl
$ sudo unshare --net --fork /bin/bash

[root@centos7 centos]#
```

同样的我们使用 ip a 命令查看一下网络信息：

```csharp
[root@centos7 centos]# ip a

1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000

    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

可以看到，宿主机上有 lo、eth0、docker0 等网络设备，而我们新建的 Net Namespace 内则与主机上的网络设备不同。



# 为什么 Docker 需要 Namespace？

Linux 内核从 2002 年 2.4.19 版本开始加入了 Mount Namespace，而直到内核 3.8 版本加入了 User Namespace 才为容器提供了足够的支持功能。

当 Docker 新建一个容器时， 它会创建这六种 Namespace，然后将容器中的进程加入这些 Namespace 之中，使得 Docker 容器中的进程只能看到当前 Namespace 中的系统资源。

正是由于 Docker 使用了 Linux 的这些 Namespace 技术，才实现了 Docker 容器的隔离，可以说没有 Namespace，就没有 Docker 容器。