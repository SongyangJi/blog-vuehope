---
title: curl模板
date: 2022-04-14 14:16:29
tags:
---



```shell
curl -H "Content-type: application/json" -X POST 
-d '$json' '$url'
```

```shell
curl文件下载
curl将下载文件输出到stdout，将进度信息输出到stderr，不显示进度信息使用–silent 选项。

1. curl URL --silent
这条命令是将下载文件输出到终端，所有下载的数据都被写入到stdout。

2. curl URL --silent -O
使用选项 -O 将下载的数据写入到文件，必须使用文件的绝对地址。

3. curl URL -o filename --progress
######################################### 100.0%
选项 -o 将下载数据写入到指定名称的文件中，并使用 –progress 显示进度条。
```



比如:`curl http://211.87.224.233:9999/file/sftp/sdu-weblab.helloworld.jingtao.tar.gz -o sdu-weblab.helloworld.jingtao.tar.gz  `



${var##*/}
