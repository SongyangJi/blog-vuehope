---
title: 查看docker容器在宿主机中的pid
date: 2022-06-11 01:31:03
categories: Docker
tags:
  - Docker
---



## 1、使用linux 系统命令 ps 进行查找

```shell
[root@web01 ~]# docker ps
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                   NAMES
7a8f16c97ec9        feisky/nginx:cpu-fix   "nginx -g 'daemon ..."   3 hours ago         Up 3 hours          0.0.0.0:10000->80/tcp   nginx

[root@web01 ~]# ps aux | grep 7a8f16c97ec9
root      2824  0.0  0.0 112720   984 pts/2    R+   14:42   0:00 grep --color=auto 7a8f16c97ec9
root     23837  0.0  0.1 264796  2972 ?        Sl   11:21   0:00 /usr/bin/docker-containerd-shim-current 7a8f16c97ec9e9750f8ef31fc24da3151562995c0d9e5837d2bf42c2885f3a27 /var/run/docker/libcontainerd/7a8f16c97ec9e9750f8ef31fc24da3151562995c0d9e5837d2bf42c2885f3a27 /usr/libexec/docker/docker-runc-current
```

先使用docker ps 查看容器id，再通过容器id在系统中查找该进程。



## 2、通过docker inspect 进行查找

```shell
[root@web01 ~]# docker ps
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                   NAMES
7a8f16c97ec9        feisky/nginx:cpu-fix   "nginx -g 'daemon ..."   3 hours ago         Up 3 hours          0.0.0.0:10000->80/tcp   nginx
[root@web01 ~]# docker inspect -f '{{.State.Pid}}' 7a8f16c97ec9
23852
```

当然docker inspect 的作用远不止如此，它能看到很多容器的配置信息，这里使用 -f 过滤出了pid信息。





## 3、使用docker container top 进行查看

```shell
[root@web01 ~]# docker ps
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                   NAMES
7a8f16c97ec9        feisky/nginx:cpu-fix   "nginx -g 'daemon ..."   3 hours ago         Up 3 hours          0.0.0.0:10000->80/tcp   nginx

[root@web01 ~]# docker container top 7a8f16c97ec9
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                23852               23837               0                   11:21               pts/1               00:00:00            nginx: master process nginx -g daemon off;
101                 23899               23852               0                   11:21               pts/1               00:00:00            nginx: worker process
101                 23900               23852               0                   11:21               pts/1               00:00:00            nginx: worker process
```

这里显示了很多个pid 需要特别说明一下，容器的pid 是23852 ，PPID 是它的父进程。下面的101、102都是它的子进程。
