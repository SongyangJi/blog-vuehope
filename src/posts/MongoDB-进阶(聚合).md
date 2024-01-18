---
title: MongoDB 进阶(聚合)
date: 2021-10-19 08:57:21
categories: NoSQL
tags:
  - NoSQL
  - MongoDB
---



# 聚合

什么是聚合管道？

+ **聚合管道是基于数据处理管道概念建模的数据聚合框架**。
+ 文档进入**多阶段管道**，将文档转换为聚合结果。
+ MongoDB 聚合管道由**阶段**组成。每个阶段都会在文档通过管道时对其进行转换。
+ 管道阶段可以在管道中多次出现，但[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out)，[`$merge`](https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge)、 和 [`$geoNear`](https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#mongodb-pipeline-pipe.-geoNear)阶段除外。（相当于 Java 流式计算的的最后一步归约操作）。



**语法**

```bash
db.collection.aggregate( [ { <stage> }, ... ] )
```



## 聚合管道的阶段

这里只列出最常用的，完整请看参考文档。

| 阶段                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields) | 向文档添加新字段。类似于 [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project)，[`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields)对流中的每个文档进行整形；具体来说，通过向包含输入文档中现有字段和新添加字段的输出文档添加新字段。[`$set`](https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set)是 的别名[`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields)。 |
| [`$count`](https://docs.mongodb.com/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count) | 返回聚合管道此阶段的文档数计数。与[`$count`](https://docs.mongodb.com/manual/reference/operator/aggregation/count-accumulator/#mongodb-group-grp.-count)聚合累加器不同。 |
| [`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) | 按指定的标识符表达式对输入文档进行分组，并将累加器表达式（如果指定）应用于每个组。使用所有输入文档并为每个不同的组输出一个文档。输出文档仅包含标识符字段和累积字段（如果指定）。 |
| [`$limit`](https://docs.mongodb.com/manual/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) | 将未修改的前*n 个*文档传递到管道，其中*n*是指定的限制。对于每个输入文档，输出一个文档（对于前*n 个*文档）或零个文档（在前*n 个*文档之后）。 |
| [`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) | 对*同一*数据库中的另一个集合执行左外部 联接，以从“联接”集合中过滤文档以进行处理。 |
| [`$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) | 过滤文档流以只允许匹配的文档未经修改地传递到下一个管道阶段。 [`$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match)使用标准的 MongoDB 查询。对于每个输入文档，输出一个文档（匹配）或零个文档（不匹配）。 |
| [`$merge`](https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) | 将聚合管道的结果文档写入集合。该阶段可以将（插入新文档、合并文档、替换文档、保留现有文档、操作失败、使用自定义更新管道处理文档）结果合并到输出集合中。要使用该[`$merge`](https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge)阶段，它必须是管道中的最后一个阶段。*4.2版中的新功能*。 |
| [`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) | 将聚合管道的结果文档写入集合。要使用该[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out)阶段，它必须是管道中的最后一个阶段。 |
| [`$planCacheStats`](https://docs.mongodb.com/manual/reference/operator/aggregation/planCacheStats/#mongodb-pipeline-pipe.-planCacheStats) | 返回集合的[计划缓存](https://docs.mongodb.com/manual/core/query-plans/)信息。 |
| [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) | 重塑流中的每个文档，例如通过添加新字段或删除现有字段。对于每个输入文档，输出一个文档。另请参阅[`$unset`](https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset)删除现有字段。 |
| [`$replaceWith`](https://docs.mongodb.com/manual/reference/operator/aggregation/replaceWith/#mongodb-pipeline-pipe.-replaceWith) | 用指定的嵌入文档替换文档。该操作替换输入文档中的所有现有字段，包括该`_id`字段。指定嵌入在输入文档中的文档以将嵌入的文档提升到顶级。[`$replaceWith`](https://docs.mongodb.com/manual/reference/operator/aggregation/replaceWith/#mongodb-pipeline-pipe.-replaceWith)是[`$replaceRoot`](https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/#mongodb-pipeline-pipe.-replaceRoot)stage的别名 。 |
| [`$sample`](https://docs.mongodb.com/manual/reference/operator/aggregation/sample/#mongodb-pipeline-pipe.-sample) | 从其输入中随机选择指定数量的文档。                           |
| [`$search`](https://docs.atlas.mongodb.com/reference/atlas-search/query-syntax/#mongodb-pipeline-pipe.-search) | 对[Atlas](https://docs.atlas.mongodb.com/reference/atlas-search/query-syntax/) 集合中的一个或多个字段执行全文搜索 。笔记`$search` 仅适用于 MongoDB Atlas 集群，不适用于自管理部署。 |
| [`$set`](https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) | 向文档添加新字段。类似于 [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project)，[`$set`](https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set)对流中的每个文档进行整形；具体来说，通过向包含输入文档中现有字段和新添加字段的输出文档添加新字段。[`$set`](https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set)是[`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields)stage的别名。 |
| [`$skip`](https://docs.mongodb.com/manual/reference/operator/aggregation/skip/#mongodb-pipeline-pipe.-skip) | 跳过前*n 个*文档，其中*n*是指定的跳过编号，并将未修改的剩余文档传递到管道。对于每个输入文档，输出零个文档（对于前*n 个*文档）或一个文档（如果在前*n 个*文档之后）。 |
| [`$sort`](https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort) | 按指定的排序键对文档流重新排序。只是顺序变了；文件保持不变。对于每个输入文档，输出一个文档。 |
| [`$unionWith`](https://docs.mongodb.com/manual/reference/operator/aggregation/unionWith/#mongodb-pipeline-pipe.-unionWith) | 执行两个集合的并集；ie 将来自两个集合的管道结果合并为一个结果集。*4.4版中的新功能*。 |
| [`$unset`](https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset) | 从文档中删除/排除字段。[`$unset`](https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset)是[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project)删除字段的阶段的别名。 |


[参考文档](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)





## 聚合管道表达式



> 详细的 [参考文档](https://docs.mongodb.com/manual/reference/operator/aggregation/)









# 常用例子

## group



### 含义与作用

按指定的`_id`表达式对输入文档进行分组，并为每个不同的分组输出一个文档。`_id`每个输出文档的字段都包含唯一的按值分组。输出文档还可以包含保存某些[累加器表达式](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#std-label-accumulators-group)值的计算字段。



### 语法

```
{
  $group:
    {
      _id: <expression>, // Group By Expression
      <field1>: { <accumulator1> : <expression1> },
      ...
    }
 }
```



| Field   | Description                                                  |
| :------ | :----------------------------------------------------------- |
| `_id`   | *必须的*。如果指定null或者常量，相当于不分组。               |
| `field` | *可选的.* 使用 [accumulator operators](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#std-label-accumulators-group).计算 |



常用的 **累加器运算符**：

| 名称                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`$avg`](https://docs.mongodb.com/manual/reference/operator/aggregation/avg/#mongodb-group-grp.-avg) | 返回数值的平均值。忽略非数字值。*在5.0版更改*：在[`$setWindowFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)阶段可用。 |
| [`$count`](https://docs.mongodb.com/manual/reference/operator/aggregation/count-accumulator/#mongodb-group-grp.-count) | 返回组中的文档数。区别于[`$count`](https://docs.mongodb.com/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count)流水线阶段。*5.0版中的新功能*：在[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group)和 [`$setWindowFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)阶段可用。 |
| [`$first`](https://docs.mongodb.com/manual/reference/operator/aggregation/first/#mongodb-group-grp.-first) | 从每个组的第一个文档返回一个值。仅当文档已排序时才定义顺序。与[`$first`](https://docs.mongodb.com/manual/reference/operator/aggregation/first-array-element/#mongodb-expression-exp.-first)数组运算符不同。*在5.0版更改*：在[`$setWindowFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)阶段可用。 |
| [`$last`](https://docs.mongodb.com/manual/reference/operator/aggregation/last/#mongodb-group-grp.-last) | 从每个组的最后一个文档返回一个值。仅当文档已排序时才定义顺序。与[`$last`](https://docs.mongodb.com/manual/reference/operator/aggregation/last-array-element/#mongodb-expression-exp.-last)数组运算符不同。*在5.0版更改*：在[`$setWindowFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)阶段可用。 |
| [`$max`](https://docs.mongodb.com/manual/reference/operator/aggregation/max/#mongodb-group-grp.-max) | 返回每个组的最高表达式值。*在5.0版更改*：在[`$setWindowFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)阶段可用。 |
| [`$min`](https://docs.mongodb.com/manual/reference/operator/aggregation/min/#mongodb-group-grp.-min) | 返回每个组的最低表达式值。*在5.0版更改*：在[`$setWindowFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)阶段可用。 |
| [`$sum`](https://docs.mongodb.com/manual/reference/operator/aggregation/sum/#mongodb-group-grp.-sum) | 返回数值的总和。忽略非数字值。*在5.0版更改*：在[`$setWindowFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)阶段可用。 |



### 小例子

1. 以下聚合操作按`item` 字段对文档进行分组，计算每个商品的总销售额并仅返回总销售额大于或等于 100 的商品：

```
db.sales.aggregate(
  [
    // First Stage
    {
      $group :
        {
          _id : "$item",
          totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } }
        }
     },
     // Second Stage
     {
       $match: { "totalSaleAmount": { $gte: 100 } }
     }
   ]
 )
```



2. 计算计数、总和和平均值

```
db.sales.aggregate([
  // First Stage
  {
    $match : { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
  },
  // Second Stage
  {
    $group : {
       _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
       totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
       averageQuantity: { $avg: "$quantity" },
       count: { $sum: 1 }
    }
  },
  // Third Stage
  {
    $sort : { totalSaleAmount: -1 }
  }
 ])
```

+ 第一阶段：

  该[`$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match)阶段对文档进行过滤，仅将 2014 年的文档传递到下一阶段。

+ 第二阶段：

  该[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group)阶段按日期对单据进行分组，并计算每组单据的总销售额、平均数量和总数。

+ 第三阶段：

  该[`$sort`](https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort)阶段按每个组的总销售额以降序对结果进行排序。

相当于如下SQL

```sql
SELECT date,
       Sum(( price * quantity )) AS totalSaleAmount,
       Avg(quantity)             AS averageQuantity,
       Count(*)                  AS Count
FROM   sales
GROUP  BY Date(date)
ORDER  BY totalSaleAmount DESC
```







## lookup实现关联查询



> 参考[官方文档](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/)

### 含义与作用

对*同一* 数据库中的未分片集合执行左外部联接，以从“联接”集合中过滤文档以进行处理。对于每个输入文档，lookup阶段会添加一个新的数组字段，其元素是“joined”集合中的匹配文档。该lookup阶段将这些重塑的文档传递到下一阶段。

### 语法
```shell
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}
```

具体的字段的含义是：

| Field                                                        | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [from](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-from) | Specifies the collection in the *same* database to perform the join with. The `from` collection cannot be sharded. For details, see [Sharded Collection Restrictions](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-sharded-collections). |
| [localField](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-localField) | Specifies the field from the documents input to the [`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) stage. [`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) performs an equality match on the `localField` to the `foreignField` from the documents of the `from` collection. If an input document does not contain the `localField`, the [`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) treats the field as having a value of `null` for matching purposes. |
| [foreignField](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-foreignField) | Specifies the field from the documents in the `from` collection. [`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) performs an equality match on the `foreignField` to the `localField` from the input documents. If a document in the `from` collection does not contain the `foreignField`, the [`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) treats the value as `null` for matching purposes. |
| [as](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-as) | Specifies the name of the new array field to add to the input documents. The new array field contains the matching documents from the `from` collection. If the specified name already exists in the input document, the existing field is *overwritten*. |

上面的查询语句等效为：

```sql
SELECT *, <output array field>
FROM collection
WHERE <output array field> IN (
   SELECT *
   FROM <collection to join>
   WHERE <foreignField> = <collection.localField>
);
```



### 小例子


订单表
```
db.orders.insertMany( [
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
   { "_id" : 3  }
] )
```



库存表

```
db.inventory.insertMany( [
   { "_id" : 1, "sku" : "almonds", "description": "product 1", "instock" : 120 },
   { "_id" : 2, "sku" : "bread", "description": "product 2", "instock" : 80 },
   { "_id" : 3, "sku" : "cashews", "description": "product 3", "instock" : 60 },
   { "_id" : 4, "sku" : "pecans", "description": "product 4", "instock" : 70 },
   { "_id" : 5, "sku": null, "description": "Incomplete" },
   { "_id" : 6 }
] )
```



查询语句

```
db.orders.aggregate( [
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
] )
```



查询结果

```json
{
   "_id" : 1,
   "item" : "almonds",
   "price" : 12,
   "quantity" : 2,
   "inventory_docs" : [
      { "_id" : 1, "sku" : "almonds", "description" : "product 1", "instock" : 120 }
   ]
}
{
   "_id" : 2,
   "item" : "pecans",
   "price" : 20,
   "quantity" : 1,
   "inventory_docs" : [
      { "_id" : 4, "sku" : "pecans", "description" : "product 4", "instock" : 70 }
   ]
}
{
   "_id" : 3,
   "inventory_docs" : [
      { "_id" : 5, "sku" : null, "description" : "Incomplete" },
      { "_id" : 6 }
   ]
}
```







