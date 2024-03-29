---
title: IP地址0.0.0.0是什么意思？
date: 2022-05-09 00:27:15
tags: 
  - 网络拾遗
---

# IP地址 0.0.0.0 是什么意思
## 作用
IPV4中，0.0.0.0地址被用于表示一个无效的，未知的或者不可用的目标。

在服务器中，0.0.0.0指的是本机上的所有IPV4地址，如果一个主机有两个IP地址，192.168.1.1 和 10.1.2.1，并且该主机上的一个服务监听的地址是0.0.0.0 和端口 8080,那么通过这两个<ip地址:8080>都能够访问该服务。
在路由中，0.0.0.0表示的是默认路由，即当路由表中没有找到完全匹配的路由的时候所对应的路由。
## 用途总结
当一台主机还没有被分配一个IP地址的时候，用于表示主机本身。（DHCP分配IP地址的时候）
用作默认路由，表示”任意IPV4主机”。
用来表示目标机器不可用。
用作服务端，表示本机上的任意IPV4地址。
网关地址 0.0.0.0 表示直连规则，即当前记录对应的 Destination 跟本机在同一个网段，通信时不需要经过网关(路由器)。也就是说使用二层交换机通过MAC即可通信。

命中容器的路由表直连规则，意思是目的IP是在局域网内，不用走到出口网关
局域网内直接是通过二层网络来发送包。
