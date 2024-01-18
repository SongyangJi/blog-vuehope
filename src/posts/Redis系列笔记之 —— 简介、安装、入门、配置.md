---
title: Redis系列笔记之 —— 简介、安装、入门、配置
date: 2021-09-14
categories: Redis
tags:
  - NoSQL
  - Redis
---

# 简介
## Redis是什么

> Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API,是一个由Salvatore Sanfilippo写的key-value存储系统。

+ **Redis** 即 **Remote Dictionary Server** （远程字典服务器），是一个以**字典结构**（**key-value**形式）存储数据的存储系统。
+ Redis 由 **C语言**编写而成，**开源**，简单稳定，代码量只有几万行，**单线程**模式工作，但性能强劲。

## 特性与优势
+ Redis的数据都存储在内存中，**读写速度快**（相对于关系型数据库而言）。
+ Redis支持**数据的持久化**，可以将内存中的数据保存在磁盘中(**异步写入**)，重启的时候可以再次加载进行使用。
+ Redis 支持**高级数据结构**，如**list，set，zset，hash**（列表、集合、有序集合、散列）等数据结构的存储。
+ Redis支持**数据的备份**，即master-slave模式的数据备份。
+ Redis的所有操作都是**原子性**的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持**事务**，即原子性，通过MULTI和EXEC指令包起来。

## 功能角色
+ **数据库**,这也是它最开始的用途。
+ **缓存**，Redis可以为每个键设置生存时间（Time To Live）TTL，这一功能可以让Redis扮演缓存系统的功能。
+ **高性能的优先队列**，Redis的列表类型键可以用来实现队列，并且支持阻塞式读取。

# 安装与入门操作
## 安装
MacOS中安装Redis很简单，使用包管理工具如HomeBrew即可，
```
brew install redis
```

在`/usr/local/bin`下,我们可以看到这么几个可执行文件：
+ redis-server **Redis服务器**
+ redis-cli       **Redis命令行客户端**
+ redis-benchmark	**Redis性能测试工具**
+ redis-check-aof    **AOF文件修复文件**
+ redis-check-rdb	**RDB文件检查文件**
+ redis-sentinel       **Sentinel服务器**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210118202017633.png)

最常用的是 redis-server 和 redis-cli
其中
+ redis-server是Redis的服务器，启动Redis也就是启动redis-server;
+ redis-cli是Redis**自带的命令行客户端**。


## 启动
```
redis-server
```
默认是 6379端口。
会出现如下提示：

```
51490:C 18 Jan 2021 20:25:26.344 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
51490:C 18 Jan 2021 20:25:26.345 # Redis version=6.0.9, bits=64, commit=00000000, modified=0, pid=51490, just started
51490:C 18 Jan 2021 20:25:26.345 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
51490:M 18 Jan 2021 20:25:26.346 * Increased maximum number of open files to 10032 (it was originally set to 256).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 6.0.9 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 51490
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

51490:M 18 Jan 2021 20:25:26.351 # Server initialized
51490:M 18 Jan 2021 20:25:26.353 * Loading RDB produced by version 6.0.9
51490:M 18 Jan 2021 20:25:26.353 * RDB age 623843 seconds
51490:M 18 Jan 2021 20:25:26.353 * RDB memory usage when created 1.02 Mb
51490:M 18 Jan 2021 20:25:26.353 * DB loaded from disk: 0.002 seconds
51490:M 18 Jan 2021 20:25:26.353 * Ready to accept connections


```

```
redis-server- --port 8888
```
通过--port自定义端口号。

## 关闭Redis

1. 关闭服务器
```
redis-cli SHUTDOWN
```
因为Redis此时可能正在将内存中的数据同步到硬盘，所以强行终止Redis进程可能导致数据丢失，所以应该让客户端请求关闭Redis。
当Redis收到 `SHUTDOWN`(小写的也是可以的)之后，

 1. 先**断开所有客户端连接**。
 2. 根据配置执行**持久化**。
 3. 完成**退出**。

在会看到如下提示。
```
51578:M 18 Jan 2021 20:32:13.180 # User requested shutdown...
51578:M 18 Jan 2021 20:32:13.180 * Saving the final RDB snapshot before exiting.
51578:M 18 Jan 2021 20:32:13.182 * DB saved on disk
51578:M 18 Jan 2021 20:32:13.182 # Redis is now ready to exit, bye bye...
```


2. 退出客户端
使用`quit`即可


## 客户端的启动
通过redis-cli向Redis发送命令有两种方式

 1. 将命令作为`redis-cli`的参数，比如上面的将SHUTDOWN作为参数。

 2. 不带参数的启动`redis-cli`，进入交互模式，自由输入命令，在输入多条命令时方便。

-h、-p自定义地址和端口号。
```
redis-cli -h 127.0.0.1 -p 6379
```

+ **在远程服务上执行命令**
用密码password连接主机名为host，端口号为port的**Redis**服务
```
redis-cli -h host -p port -a password
```

## PING检测
```
127.0.0.1:6379> PING
PONG
```
PING 命令，该命令用于检测 redis 服务是否启动。



# 配置
Redis 的配置文件位于 Redis 安装目录下，文件名为 redis.conf。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210119134549587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0ODQ2MzI0,size_16,color_FFFFFF,t_70)
## 获取配置
+ **获取所有配置**
在进入redis客户端的交互模式后，输入:
```
CONFIG GET *
```
即可获取所有配置。

```
1) "rdbchecksum"
2) "yes"
3) "daemonize"
4) "no"
5) "io-threads-do-reads"
6) "no"
7) "lua-replicate-commands"
8) "yes"
9) "always-show-logo"
10) "no"
11) "protected-mode"
………………
291) "slaveof"
292) ""
293) "notify-keyspace-events"
294) ""
295) "bind"
296) ""
297) "requirepass"
298) ""
299) "oom-score-adj-values"
300) "0 200 800"
```


+ **获取单个配置信息：**
```
127.0.0.1:6379> config get loglevel
1) "loglevel"
2) "notice"
```
第一行是选项名，第二行是选项值。

## 修改配置
```
CONFIG SET config_setting_name new_config_value
```

如：
```
127.0.0.1:6379> config set loglevel warning
OK
127.0.0.1:6379> config get loglevel
1) "loglevel"
2) "warning"
```


## 带配置启动
如果我们要修改的参数过多，可以直接修改配置文件（备份一开始的），然后带着配置文件启动。
```
redis-server redis.conf
```

