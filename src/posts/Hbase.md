---
title: Hbase
date: 2022-01-04 02:17:39
categories: NoSQL
tags:
  - NoSQL
  - Hbase
---



## 安装

```shell
brew install hbase
brew install jruby
brew install asciidoctor
```



## 运行

```shell
brew services start hbase
```



http://localhost:16010


# 应用实例
## 手机数据
+ 需求

有一张数据表，其中包含手机号码字段

1. 查询一段时间内固定号码的所有数据 
2. 查询一段时间内所有数据

+ 分析

  HBase要想查询快速，只能从rowKey上下手rowKey=phoneNum+时间 可以实现目标1，但是目标2很难实现rowKey=时间+phoneNum 可以实现目标2，但是目标1很难实现，且数据量越来越大可能导致热点问题 。



+ 解决思路1：牺牲空间换时间，写数据时同时写入两张表，内容一样，只是一张表rowKey=phoneNum+时间，另一张表rowKey=时间+phoneNum

+ 解决思路2：牺牲部分空间部分时间，两张表，一张全量表，rowKey=phoneNum+时间，另一张索引表只存rowKey=时间+phoneNum，目标1通过scan全量表就可以实现，目标2先scan索引表然后批量get全量表。






# 参考链接
> https://www.cnblogs.com/scuwangjun/p/11555291.html
> https://www.cnblogs.com/Chaser-Eagle/p/12008510.html
>
> [一文讲清HBase存储结构](https://juejin.cn/post/6844903753271754759)



