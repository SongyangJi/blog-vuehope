---
title: ZooKeeper入门
date: 2021-10-19 10:04:29
categories: ZooKeeper
tags:
  - ZooKeeper
  - 分布式
---



# 安装、配置


## 下载安装

[下载链接](https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz)

下载、解压之后，目录结构如下：

```shell
jisongyang@SongyangJi-MacBookAir apache-zookeeper-3.7.0-bin % ls -el
total 48
-rw-r--r--@  1 1000        1000   11358  3 17  2021 LICENSE.txt
-rw-r--r--@  1 1000        1000     432  3 17  2021 NOTICE.txt
-rw-r--r--@  1 1000        1000    2214  3 17  2021 README.md
-rw-r--r--@  1 1000        1000    3570  3 17  2021 README_packaging.md
drwxr-xr-x@ 18 jisongyang  1000     576  8 12 19:55 bin
drwxr-xr-x@  6 1000        1000     192  8 12 03:39 conf
drwxr-xr-x@ 25 1000        1000     800  3 17  2021 docs
drwxr-xr-x  60 root        wheel   1920  8 11 18:41 lib
drwxr-xr-x   5 root        wheel    160  9 12 12:49 logs
```

照往常一样，配置一下环境变量。


## 配置

要启动需要一个配置文件，在 conf 在创建：

```shell
cp zoo_sample.cfg zoo.cfg
```

## 单机运行

### 启动
因为我放在了 /usr/local 目录下，加上sudo。
```shell
sudo zkServer start
````

### 查看状态
```
zkServer status
```
这里的standalone指的是单机模。

### 关闭
```shell
sudo zkServer stop
```



# 客户端相关

## zkCli
```shell
bin/zkCli.sh
```
指定服务器。
```shell
bin/zkCli.sh -server 127.0.0.1:2181
````

当然还有其他启动参数，不再一一介绍。

输入`help`,查看命令：

```
[zkshell: 0] help
ZooKeeper -server host:port cmd args
addauth scheme auth
close
config [-c] [-w] [-s]
connect host:port
create [-s] [-e] [-c] [-t ttl] path [data] [acl]
delete [-v version] path
deleteall path
delquota [-n|-b] path
get [-s] [-w] path
getAcl [-s] path
getAllChildrenNumber path
getEphemerals path
history
listquota path
ls [-s] [-w] [-R] path
ls2 path [watch]
printwatches on|off
quit
reconfig [-s] [-v version] [[-file path] | [-members serverID=host:port1:port2;port3[,...]*]] | [-add serverId=host:port1:port2;port3[,...]]* [-remove serverId[,...]*]
redo cmdno
removewatches path [-c|-d|-a] [-l]
rmr path
set [-s] [-v version] path data
setAcl [-s] [-v version] [-R] path acl
setquota -n|-b val path
stat [-w] path
sync path
```



最简单的如`ls /`命令列出所有节点。







## zkui



+ 下载

下载链接：https://github.com/DeemOpen/zkui

```shell
git clone https://github.com/DeemOpen/zkui.git
```



+ 安装

```shell
cd zkui/ # 进入工程界面
mvn clean install # 进行maven打包，执行成功后会生成target文件夹，其中有jar文件。
```



+ 配置

```shell
# zkui web页面访问端口
serverPort=9090

# zookeeper集群的IP地址和端口（这里配置为单机模式）
zkServer=localhost:2181

# 设置登录zkui的用户名和密码，这里我们将用户名和密码都设置为admin
userSet = {"users": [{ "username":"admin" , "password":"admin","role": "ADMIN" },{ "username":"appconfig" , "password":"appconfig","role": "USER" }]}
```



+ 启动

```shell
nohup java -jar target/zkui-2.0-SNAPSHOT-jar-with-dependencies.jar &
```






# 参考链接

[Zookeeper官网](https://zookeeper.apache.org/)

[ZooKeeper 初探：安装、使用](http://ningg.top/zookeeper-getting-started/)

[安装zkui](https://www.jianshu.com/p/746799d3db07)

