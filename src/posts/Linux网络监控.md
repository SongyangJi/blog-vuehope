---
title: Linux网络监控
date: 2022-09-28 11:00:23
categories: Linux
tags:
---

# netstat

在linux一般使用netstat 来查看系统端口使用情况步。     netstat命令是一个监控TCP/IP网络的非常有用的工具，它可以显示路由表、实际的网络连接以及每一个网络接口设备的。

**netstat**命令的功能是**显示网络连接、路由表和网络接口信息**，可以让用户得知目前都有**哪些网络连接正在运作**。 



该命令的一般格式为：   

netstat [选项]

命令中各选项的含义如下：  

-a 显示所有socket，包括正在监听的。

-c 每隔1秒就重新显示一遍，直到用户中断它。

-i 显示所有网络接口的信息，格式同“ifconfig -e”。

-n **以网络IP地址代替名称**，显示出网络连接情形。

-r 显示核心路由表，格式同“route -e”。

-t 显示TCP协议的连接情况。

-u 显示UDP协议的连接情况。

-v 显示正在进行的工作。

-p：显示 PID 和程序名；



### **关键列解释:**

+ Proto 表示协议类型
+ LocalAddress 表示本地地址
+ ForeignAddress 表示对端地址
+ State 表示状态(对于 TCP 有效, UDP 没有状态概念)
+ PID/Program name 表示对应的进程id和进程名



然后用筛选拿到想要的信息。



常用的组合：

1. **查看进程名为firefox的连接**

```
netstat -anp | grep firefox
```

2. **查看111端口被那个进程调用**

```
netstat -anp | grep 111
```

3. **根据连接状态查询**

```
netstat -an | grep LISTEN
```

在这些状态中，我们最常用的就是 LISTEN 和 ESTABLISHED 状态，一种代表正在监听，另一种代表已经连接。





> https://www.oschina.net/translate/10-basic-linux-networking-and-monitoring?print