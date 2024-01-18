---

title: MongoDB 索引
date: 2021-11-02 08:08:21
categories: NoSQL
tags:
  - NoSQL
  - MongoDB
---



索引支持在 MongoDB 中高效执行查询。

**如果没有索引，MongoDB 必须执行*集合扫描*，即扫描*集合中的*每个文档，以选择那些与查询语句匹配的文档**。如果查询存在合适的索引，MongoDB 可以使用该索引来限制它必须检查的文档数量。



索引是特殊的数据结构（**MongoDB 索引使用 B 树数据结构**），它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或字段集的值，按字段值排序。索引条目的排序支持高效的等式匹配和基于范围的查询操作。此外，MongoDB 可以使用索引中的排序返回排序结果。





从根本上说，**MongoDB 中的索引类似于其他数据库系统中的索引**（因为数据结构使用的都是B树）。MongoDB 在**集合**级别定义索引，并支持 MongoDB 集合中文档的任何字段或子字段的索引。



## 默认`_id`索引

MongoDB在创建集合期间在`_id`字段上 创建唯一索引。该索引可防止客户端插入具有相同字段值的两个文档。您不能在字段上删除此索引。



## 创建索引

索引一旦创建就不能重命名。相反，您必须删除并使用新名称重新创建索引。

```
db.collection.createIndex( <key and index type specification>, <options> )
```

## 查看索引



```
db.collection.getIndexes()
```




## 索引类型

MongoDB 提供了许多不同的索引类型来支持特定类型的数据和查询。

### 单字段索引

MongoDB支持在文档的单个字段上创建用户定义的升序/降序索引。

```
db.collection.createIndex( { score: 1 } )
```



![](https://docs.mongodb.com/manual/images/index-ascending.bakedsvg.svg)



### 复合索引

MongoDB 还支持多个字段上的用户定义索引，即 [复合索引](https://docs.mongodb.com/manual/core/index-compound/)。

```
db.collection.createIndex( { userid: 1, score: -1 } )
```



复合索引中列出的字段顺序很重要。例如，如果复合索引由 组成`{ userid: 1, score: -1 }`，则索引首先按升序排序`userid`，然后在每个`userid` 值中按降序排序`score`。



![](https://docs.mongodb.com/manual/images/index-compound-key.bakedsvg.svg)



### 多键索引

MongoDB 使用[多键索引](https://docs.mongodb.com/manual/core/index-multikey/)来索引**存储在数组中的内容**。
如果你索引一个包含数组值的字段，MongoDB 会**为数组的每个元素创建单独的索引条目**。这些[多键索引](https://docs.mongodb.com/manual/core/index-multikey/)允许查询通过匹配数组的一个或多个元素来选择包含数组的文档。

如果索引字段包含数组值，MongoDB 会自动判断是否创建多键索引；您**不需要显式指定多键类型**。



![](https://docs.mongodb.com/manual/images/index-multikey.bakedsvg.svg)



### 哈希索引



为了支持[基于散列的分片](https://docs.mongodb.com/manual/core/hashed-sharding/#std-label-sharding-hashed-sharding)，MongoDB 提供了一种[散列索引](https://docs.mongodb.com/manual/core/index-hashed/)类型，它对字段值的散列值进行索引。这些索引在其范围内具有更随机的值分布，但**仅支持相等匹配**，**不支持基于范围的查询**。



> [官方文档索引](https://docs.mongodb.com/manual/indexes/)



