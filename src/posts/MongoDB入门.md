---
title: M1 MacOS 下使用Brew安装MongoDB、入门概念
date: 2021-10-04 16:28:57
categories: NoSQL
tags:
  - NoSQL
  - MongoDB
---



# 特性

### 1. 灵活的模型

区别于关系数据库最大的一个特点就是字段灵活变更，这就非常适合一些迭代频繁且数据模型多变的业务场景。例如我们直播的活动业务场景，当前直播活动越来越多，玩的花样也是越来越多，其实就很适合用mongoDB来做活动业务的数据存储。

### 2. json数据格式

mongoDB的数据存储都是json格式，非常适合微服务Restful Api。

### 3. 横向扩展能力

与mysql的分库分表不同，它可以在业务代码不变更的情况下做自动水平扩展。能够很好的解决上文描述的两个场景
① 分表数据不均匀
② 分表数据过大要调整原有数据分布。



**与关系型数据库相比，MongoDB的优点：**

①. 弱一致性（最终一致），更能保证用户的访问速度；

②. 文档结构的存储方式，能够更便捷的获取数据；

对于一个层级式的数据结构来说，如果要将这样的数据使用扁平式的，表状的结构来保存数据，这无论是在查询还是获取数据时都十分困难。

③. 内置GridFS，支持大容量的存储；



**与关系型数据库相比，MongoDB的缺点：**

①. mongodb不支持事务操作;

②. mongodb占用空间过大;





# 下载、配置

```bash
# 安装必要的安装包
brew tap mongodb/brew
brew install mongodb-community
```

配置环境变量
```bash
# 可能不一样
export PATH=$PATH:/opt/homebrew/Cellar/mongodb-community/4.4.5/bin
```

# 启动方式
1. 使用 brew
```bash
brew services start mongodb-community
```
2.  开始 mongo 服务
(这是个守护进程)
```bash
sudo mongod
```
3. 启动MongoDB的shell
```bash
# 配置好环境之后
mongo

# MongoDB shell version v4.4.5
# connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
# Implicit session: session { "id" : UUID("0d903bb8-cfb4-4d43-9a60-# c365a1de640a") }
```
可以看到默认端口号是 27017 。

**注：**
mongod是服务端、
mongo是客户端。

（就像是mysqld和mysql）

# 基本概念
| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                           |
| ------------ | ---------------- | ----------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table  joins | 嵌入文档         | 表连接,MongoDB不支持（DBRef）       |
| primary key  | primary key      | 主键,MongoDB自动将_id字段设置为主键 |

**必须指明的是，这只是一种方便理解产生的垂直联系，实际上MongoDB存储的数据是半结构化的，并非RDBMS一样，有着规整的数据结构。**
比如，在MongoDB中collection里面的document的field可以各不相同，这在关系型数据库是绝不可以的。

## 文档
文档是一组键值(key-value)对(即 BSON，即 Binary Json；用起来就像json一样)。MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。
注：

+ **文档中的键/值对是有序的**。

+ **文档的键是字符串。**

## 集合
集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表格。

集合存在于数据库中，**集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据**，但通常情况下我们插入集合的数据都会有一定的关联性。

当第一个文档插入时，集合就会被创建。

## 数据类型
使用Json作为数据存储方式。
查询语言也是Json风格的。



| 数据类型           | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| String             | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer            | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。 |
| Boolean            | 布尔值。用于存储布尔值（真/假）。                            |
| Double             | 双精度浮点值。用于存储浮点值。                               |
| Min/Max keys       | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Array              | 用于将数组或列表或多个值存储为一个键。                       |
| Timestamp          | 时间戳。记录文档修改或添加的具体时间。                       |
| Object             | 用于内嵌文档。                                               |
| Null               | 用于创建空值。                                               |
| Symbol             | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date               | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID          | 对象 ID。用于创建文档的 ID。                                 |
| Binary Data        | 二进制数据。用于存储二进制数据。                             |
| Code               | 代码类型。用于在文档中存储 JavaScript 代码。                 |
| Regular expression | 正则表达式类型。用于存储正则表达式。                         |



下面说明下几种重要的数据类型。

### ObjectId

ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes，含义是：

+ 前 4 个字节表示创建 **unix** 时间戳,格林尼治时间 **UTC** 时间，比北京时间晚了 8 个小时
+ 接下来的 3 个字节是机器标识码；
+ 紧接的两个字节由进程 id 组成 PID；
+ 最后3个字节是一个自动增加的计数器，确保相同的进程同一秒产生的ObjectId也是不一样的。



MongoDB 中存储的文档必须有一个 _id 键。

**这个键的值可以是任何类型的**，默认是个 ObjectId 对象

由于 ObjectId 中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间。

```shell
> var newObject = ObjectId()
> newObject.getTimestamp()
ISODate("2021-10-19T00:45:32Z")
```



# 参考链接
[docs](https://docs.mongodb.com/)



[reference](https://docs.mongodb.com/manual/reference/)
