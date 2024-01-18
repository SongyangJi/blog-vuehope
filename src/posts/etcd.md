---
title: etcd
date: 2022-12-09 02:57:47
categories: NoSQL
tags:
  - etcd
  - Go
---



# 安装

```shell
brew install etcd
```





# 启动



启动


```shell
jisongyang@SongyangJi-MacBookAir ~ % brew services start etcd
==> Successfully started `etcd` (label: homebrew.mxcl.etcd)
jisongyang@SongyangJi-MacBookAir ~ % brew services list
Name              Status  User       File
activemq          none
etcd              started jisongyang ~/Library/LaunchAgents/homebrew.mxcl.etcd.plist
hbase             none
jenkins           none
mongodb-community none
nginx             none
rabbitmq          none
redis             none
jisongyang@SongyangJi-MacBookAir ~ % etcdctl endpoint health
127.0.0.1:2379 is healthy: successfully committed proposal: took = 2.418875ms
jisongyang@SongyangJi-MacBookAir ~ % etcd ctl put "name" "bob"
{"level":"info","ts":"2022-12-09T03:06:16.834+0800","caller":"etcdmain/etcd.go:73","msg":"Running: ","args":["etcd","ctl","put","name","bob"]}
{"level":"warn","ts":"2022-12-09T03:06:16.834+0800","caller":"etcdmain/etcd.go:75","msg":"failed to verify flags","error":"'ctl' is not a valid flag"}
jisongyang@SongyangJi-MacBookAir ~ %
jisongyang@SongyangJi-MacBookAir ~ % etcd ctl get "name"
{"level":"info","ts":"2022-12-09T03:06:26.364+0800","caller":"etcdmain/etcd.go:73","msg":"Running: ","args":["etcd","ctl","get","name"]}
{"level":"warn","ts":"2022-12-09T03:06:26.364+0800","caller":"etcdmain/etcd.go:75","msg":"failed to verify flags","error":"'ctl' is not a valid flag"}
```



检查是否启动成功:

```shell
etcdctl endpoint health
```





# 安装etcd-webui
```bash
$ git clone https://github.com/henszey/etcd-browser.git
$ cd etcd-browser/
$ vim server.js  
```


修改如下内容
```bash
var etcdHost = process.env.ETCD_HOST || '127.0.0.1'; // || '172.17.42.1';
var etcdPort = process.env.ETCD_PORT || 2379; // 4001
var serverPort = process.env.SERVER_PORT || 8000;
```

```bash
jisongyang@SongyangJi-MacBookAir etcd-browser % node server.js
proxy /api requests to etcd on 127.0.0.1:2379
etc-browser listening on port 8000
```


访问：http://127.0.0.1:8000/





