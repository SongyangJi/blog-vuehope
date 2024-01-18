
---
title: Ubuntu、MacOS环境下下载安装 RabbitMQ
date: 2021-10-09
categories: 消息中间件
tags:
	- Message Queue
	- RabbitMQ
---

# Ubuntu
## 下载
先更新一下资源。
```bash
sudo apt update
```

由于rabbitMq需要erlang语言的支持，在安装rabbitMq之前需要安装erlang。
```bash
sudo apt install -y erlang-nox
```

安装rabbitmq 
```bash
sudo apt install -y rabbitmq-server
```


默认下载的地址

```bash
songyangji@SongyangJi-Ubuntu-DeskStop:/etc/rabbitmq$ whereis rabbitmq
rabbitmq: /usr/lib/rabbitmq /etc/rabbitmq /usr/share/rabbitmq
```

## 开启、关闭
```bash
# start
sudo service rabbitmq-server start

# stop
sudo service rabbitmq-server stop
```


直接到/sbin目录下执行也是可以的。

```bash
# 启动 start
sudo /sbin/service rabbitmq-server start

# 停止 stop
sudo /sbin/service rabbitmq-server stop
```

## 启动Web管理端
安装了Rabbitmq后，默认也安装了该管理工具，执行命令即可启动

```bash
cd /etc/rabbitmq
sudo rabbitmq-plugins enable rabbitmq_management
```

访问 localhost:15672
出现一下即可。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210402155642536.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0ODQ2MzI0,size_16,color_FFFFFF,t_70)

# MacOS
## 下载
```bash
brew update
brew install rabbitmq
```

## 配置环境变量
```bash
export RABBITMQ_HOME=/opt/homebrew/Cellar/rabbitmq/3.8.13
export PATH=$PATH:$RABBITMQ_HOME/sbin
```


## 启动、关闭

这里是借助 brew 去管理的。如果直接使用  rabbitmq提供的脚本启动也是可以的。

```bash
brew services start rabbitmq
```
```bash
brew services stop rabbitmq
```

访问Web端是一样的。
