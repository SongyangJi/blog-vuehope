---
title: 超详细的MongoDB的增删改查学习笔记！
date: 2021-10-04 16:34:47
categories: NoSQL
tags:
  - NoSQL
  - MongoDB
---



# 数据库

## 查看
```bash
show dbs
```

## 创建
```bash
use data_base_name
```

## 删除
```bash
# 先切过去
use to_delete_db
# 后删除
db.dropDatabase()
```

# 集合

## 查看
```bash
db.getCollectionNames()
```

## 创建
```bash
# 创建集合
db.createCollection(collection_name,options)
# 或者直接使用集合名去插入文档，就自动创建集合
db.mycol.insert({"key" : "value"})
```

## 删除
```bash
db.collection_name.drop()
```


# 文档

## 插入文档
### API
+ `save()`：如果 _id 主键存在则更新数据，如果不存在就插入数据。该方法新版本中已废弃，可以使用 db.collection.insertOne() 或 db.collection.replaceOne() 来代替。
+ `insert()`: 若插入的数据主键已经存在，则会抛 org.springframework.dao.DuplicateKeyException 异常，提示主键重复，不保存当前数据。

```bash
db.COLLECTION_NAME.insert(document)

db.COLLECTION_NAME.save(document)
```

**不过下面的两个方法都已经过期，不要使用了.**

+ `insertOne()`
传入一个json对象。
```bash
db.inventory.insertOne(
   { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)
```

+ `insertMany()`
传入一个数组，里面是Json对象。
```bash
db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
   { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
   { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])
```


### 插入行为
+ 集合创建
如果该集合当前不存在，则插入操作将创建该集合。

+ _id字段
在MongoDB中，存储在集合中的每个文档都需要一个唯一的 _id字段作为主键。如果插入的文档省略了该_id字段，则MongoDB驱动程序会自动为该字段生成一个ObjectId, 键名为"_id" 。

+ 原子性
MongoDB中的所有写操作在单个文档级别上都是原子性的。

+ 写确认
对于写入问题，您可以指定从MongoDB请求的写入操作的确认级别。

## 查询文档
在任何数据库中，差不多查询是花样的最多的了。

### 过滤器
先介绍一个所谓的过滤器概念。
这个也就是**对匹配的文档进行操作**，如查询、投影、更改、删除。

在MongoDB里，文档是一个重要的要素，**过滤器也是一个文档**。
**文档通过并列、嵌套形成更复杂的查询条件。**

也不奇怪，MongoDB被称为文档型数据库了。





最简单的过滤器就是**空过滤器**。
```bash
# 空文档
db.inventory.find( {} )
# 
db.inventory.find()
```

### 运算符
[更多的运算符，看这里](https://docs.mongodb.com/manual/reference/operator/query/#std-label-query-selectors)
#### 比较运算符
| 运算符 | 含义                              |
| ------ | --------------------------------- |
| $eq    | 匹配等于指定值的值。 （=）        |
| $gt    | 匹配大于指定值的值。（>）         |
| $gte   | 匹配大于或等于指定值的值。（>=）  |
| $in    | 匹配数组中指定的任何值。          |
| $lt    | 匹配小于指定值的值。（<）         |
| $lte   | 匹配小于或等于指定值的值。（<=）  |
| $ne    | 匹配所有不等于指定值的值。 （!=） |
| $nin   | 不匹配数组中指定的任何值。        |

举例：
```bash
# 相等条件
{ <field1>: <value1>, ... } 
# 不等于条件
{<key>:{"$ne":<value>}}
# 大于
{<key>:{"$gt":<value>}}
# 小于
{<key>:{"$lt":<value>}}
# 小于等于
{<key>:{"$gte":<value>}}
# 大于等于
{<key>:{"$lte":<value>}}

# in
{<key>:{"$in":[<v1>,<v2>,...]}
```


#### 逻辑运算符
| 运算符 | 含义                                                      |
| ------ | --------------------------------------------------------- |
| $and   | 用逻辑联接查询子句AND将返回两个子句都符合条件的所有文档。 |
| $not   | 反转查询表达式的效果，并返回与查询表达式不匹配的文档。    |
| $nor   | 用逻辑联接查询子句NOR将返回两个子句均不匹配的所有文档。   |
| $or    | 用逻辑联接查询子句OR将返回符合任一子句条件的所有文档。    |

+ **指定OR条件**
使用$or运算符，您可以指定一个复合查询，该查询将每个子句与逻辑连接符连接在一起，OR以便该查询选择集合中至少匹配一个条件的文档。

**注意它的组织方式，其中键是"$or" ；值是一个数组，数组里面是 若干个文档，当然还可以继续嵌套下去。**
```bash
db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
```

+ **指定AND条件**
对于AND的话，当然也可以按照OR的方式依葫芦画瓢。不过，还可以直接隐式使用 `,`分割多个键值对。
```bash
db.inventory.find( { status: "A", qty: { $lt: 30 } } )
```


同时指定AND和OR

```bash
db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: 'p' } ]
} )
```

其余的运算符就不细说了，这里只介绍最常用的。



### 其他查询技巧、用法
#### 嵌套文档
说白了，那些过滤器不仅仅可以出现数字、字符串这些，可以**用文档过滤**。

如：
```bash
db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } )
```
#### 嵌套字段
就像使用 对象一样，链式地选择某个字段。
```bash
db.inventory.find( { "size.h": { $lt: 15 } } )
```

### 关于数组
#### 数组相关运算符。

| 运算符     | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| $all       | 匹配包含查询中指定的所有元素的数组。（忽略顺序）             |
| $size      | 如果数组字的大小为指定大小，则选择文档。                     |
| $elemMatch | 如果array字段中的元素符合所有指定 $elemMatch 条件，则选择文档。 |



下面的"tags"是一个数组

1. **匹配一个数组**
这里匹配，必须是完全匹配，元素顺序也要相同。
```bash
db.inventory.find( { tags: ["red", "blank"] } )
```
相反，如果您希望找到一个同时包含元素"red"和 "blank"的数组，而不考虑该数组中的顺序或其他元素，请使用$all运算符：
```bash
db.inventory.find( { tags: { $all: ["red", "blank"] } } )
```

2. **针对一个元素去查询数组**
最简单的，数组包含这个元素："tags"是一个数组，它有包含元素"red"
```bash
db.inventory.find( { tags: "red" } )
```



你还可以使用操作符指定查询条件：

dim_cm是一个数组，匹配条件是数组里面至少有一个大于25的元素。

```bash
db.inventory.find( { dim_cm: { $gt: 25 } } )
```



3. **为数组元素指定多个条件**

在数组元素上使用复合过滤条件查询数组:

注意匹配条件是，有一个元素大于15，有一个元素小于20（当然可以有同一个一个元素同时满足也算匹配）

```bash
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )
```

查询满足多个条件的数组元素：

注意必须是至少包含同一个元素同时满足大于22且小于30

```bash
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )
```

4. **通过数组索引位置查询元素**

使用点号引用。

```bash
db.inventory.find( { "dim_cm.1": { $gt: 25 } } )
```



按数组长度查询数组:
```bash
db.inventory.find( { "tags": { $size: 3 } } )
```


### 关于嵌入文档的数组
demo data
```bash
db.inventory.insertMany( [
   { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
   { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
   { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
   { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
]);
```
#### 查询嵌套在数组中的文档
相等匹配需要指定文档的精确匹配，包括字段顺序。
```bash
db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )
```

#### 在文档数组中的字段上指定查询条件
1. 对嵌入在文档数组中的字段指定查询条件
```bash
db.inventory.find( { 'instock.qty': { $lte: 20 } } )
```
其中instock是数组，qty是数组中的文档的字段。

2. 使用数组索引查询嵌入文档中的字段
```bash
db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )
```


#### 为文档数组指定多个条件
1. 同一个嵌入文档上指定多个条件

使用`$elemMatch`运算符在一组嵌入文档上指定多个条件，以便至少一个嵌入文档满足所有指定的条件。
```bash
db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )
```
意为：查询如下的文档，这些文档的 instock 字段（是一个文档数组）中，至少有一个嵌入文档，它的qty字段为5并且warehouse字段值为”A“。

2. 多个嵌入文档元素组合满足标准

如果数组字段上的复合查询条件不使用 $elemMatch运算符，则查询将选择其数组包含满足条件的任意元素组合的文档。
```bash
# 不一定是同一个嵌入文档满足
db.inventory.find( { "instock.qty": { $gt: 10,  $lte: 20 } } )
db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )
```


### 返回文档的部分字段
和SQL一样可以指定返回的字段。
默认情况下返回文档的全部内容。



语法：

```shell
db.COLLECTION.find(过滤器, 投影文档)
```



投影文档，形如：
表明只返回item、status状态
```bash
{ item: 1, status: 1}
```
或者也可以反过来，指定不返回那些字段
```bash
{ status: 0, instock: 0 } 
```

支持字段的嵌套，如：
```bash
{ item: 1, status: 1, "size.uom": 1 }
```

### 查询空或缺失字段
demo data
```
db.inventory.insertMany([
   { _id: 1, item: null },
   { _id: 2 }
])
```

#### 相等过滤器
```bash
db.inventory.find( { item: null } )
```
字段为null或者字段不存在都匹配

#### 类型检查
BSON type编号为10 表明是null字段。
```bash
db.inventory.find( { item : { $type: 10 } } )
```
只匹配null。
#### 存在性检查
```bash
db.inventory.find( { item : { $exists: false } } )
```
只匹配不存在。



## 更新文档


1. 更新单个文档
```bash
db.inventory.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" }
   }
)
```

2. 替换整个文档
```bash
db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)
```





### 更新方法

MongoDB 提供了以下方法来更新集合中的文档：

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`db.collection.updateOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) | 即使多个文档可能与指定的过滤器匹配，也最多更新与指定过滤器匹配的单个文档。*3.2版中的新功能*。 |
| [`db.collection.updateMany()`](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany) | 更新与指定过滤器匹配的所有文档。*3.2版中的新功能*。          |
| [`db.collection.replaceOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#mongodb-method-db.collection.replaceOne) | 即使多个文档可能与指定的过滤器匹配，也最多替换与指定过滤器匹配的单个文档。*3.2版中的新功能*。 |
| [`db.collection.update()`](https://docs.mongodb.com/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) | 更新或替换与指定过滤器匹配的单个文档，或者更新与指定过滤器匹配的所有文档。默认情况下，该[`db.collection.update()`](https://docs.mongodb.com/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update)方法更新**单个**文档。要更新多个文档，请使用[multi](https://docs.mongodb.com/manual/reference/method/db.collection.update/#std-label-multi-parameter)选项。 |



### 更新操作

db.collection.updateOne(filter,update, options)
db.collection.updateMany(filter>, update, options)
db.collection.replaceOne(filter, update, options)

第一个参数 filter 是过滤条件，也就是指定那些文档会被更新。

第二个参数 update指定具体的更新操作。

使用逗号分隔。



过滤器在介绍查询的时候已经介绍的差不多了。

update结构如下：

```bash
{
   <operator1>: { <field1>: <value1>, ... },
   <operator2>: { <field2>: <value2>, ... },
   ...
}
```

其中 operator* 为操作符,下面会有介绍。



### 更新操作符

这里只列出它们，详细的使用demo可以[看这里](https://docs.mongodb.com/manual/reference/operator/update/)。

### 字段

| 运算符                                                       | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`$currentDate`](https://docs.mongodb.com/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate) | 将字段的值设置为当前日期，作为日期或时间戳。                 |
| [`$inc`](https://docs.mongodb.com/manual/reference/operator/update/inc/#mongodb-update-up.-inc) | **将字段的值增加指定的数量。**                               |
| [`$min`](https://docs.mongodb.com/manual/reference/operator/update/min/#mongodb-update-up.-min) | 仅当指定值小于现有字段值时才更新该字段。                     |
| [`$max`](https://docs.mongodb.com/manual/reference/operator/update/max/#mongodb-update-up.-max) | 仅当指定值大于现有字段值时才更新该字段。                     |
| [`$mul`](https://docs.mongodb.com/manual/reference/operator/update/mul/#mongodb-update-up.-mul) | 将字段的值乘以指定的数量。                                   |
| [`$rename`](https://docs.mongodb.com/manual/reference/operator/update/rename/#mongodb-update-up.-rename) | **重命名字段。**                                             |
| [`$set`](https://docs.mongodb.com/manual/reference/operator/update/set/#mongodb-update-up.-set) | **设置文档中字段的值。**                                     |
| [`$setOnInsert`](https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/#mongodb-update-up.-setOnInsert) | 如果更新导致插入文档，则设置字段的值。对修改现有文档的更新操作没有影响。 |
| [`$unset`](https://docs.mongodb.com/manual/reference/operator/update/unset/#mongodb-update-up.-unset) | **从文档中删除指定的字段。**                                 |

### 数组

#### 运算符

| 运算符                                                       | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`$`](https://docs.mongodb.com/manual/reference/operator/update/positional/#mongodb-update-up.-) | 充当占位符以更新与查询条件匹配的第一个元素。                 |
| [`$[\]`](https://docs.mongodb.com/manual/reference/operator/update/positional-all/#mongodb-update-up.---) | 充当占位符，为匹配查询条件的文档更新数组中的所有元素。       |
| [`$[\]`](https://docs.mongodb.com/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--) | 充当占位符，`arrayFilters`为符合查询条件的文档更新符合条件的所有元素。 |
| [`$addToSet`](https://docs.mongodb.com/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) | 仅当集合中尚不存在元素时，才将元素添加到数组中。             |
| [`$pop`](https://docs.mongodb.com/manual/reference/operator/update/pop/#mongodb-update-up.-pop) | **删除数组的第一项或最后一项。**                             |
| [`$pull`](https://docs.mongodb.com/manual/reference/operator/update/pull/#mongodb-update-up.-pull) | 删除与指定查询匹配的所有数组元素。                           |
| [`$push`](https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push) | **将项目添加到数组。**                                       |
| [`$pullAll`](https://docs.mongodb.com/manual/reference/operator/update/pullAll/#mongodb-update-up.-pullAll) | 从数组中删除所有匹配的值。                                   |

#### 修饰符

| 运算符                                                       | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`$each`](https://docs.mongodb.com/manual/reference/operator/update/each/#mongodb-update-up.-each) | 修改[`$push`](https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push)和[`$addToSet`](https://docs.mongodb.com/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet)运算符以附加多个项目以进行数组更新。 |
| [`$position`](https://docs.mongodb.com/manual/reference/operator/update/position/#mongodb-update-up.-position) | 修改[`$push`](https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push)运算符以指定要在数组中添加元素的位置。 |
| [`$slice`](https://docs.mongodb.com/manual/reference/operator/update/slice/#mongodb-update-up.-slice) | 修改[`$push`](https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push)运算符以限制更新数组的大小。 |
| [`$sort`](https://docs.mongodb.com/manual/reference/operator/update/sort/#mongodb-update-up.-sort) | 修改[`$push`](https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push)运算符以重新排序存储在数组中的文档。 |

### 按位

| 姓名                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [`$bit`](https://docs.mongodb.com/manual/reference/operator/update/bit/#mongodb-update-up.-bit) | 执行整数值的按位`AND`、`OR`和`XOR`更新。 |

### 行为
+ 原子性
**MongoDB 中的所有写操作在单个文档的级别上都是原子的**。

+  _id字段
设置后，您不能更新_id字段的值，也不能用具有不同_id字段值的替换文档替换现有文档。
+    次序
  对于写操作，MongoDB 会保留文档字段的顺序， 但以下情况除外：
  - `_id`字段始终是文档中的第一个字段。
  - 包含renaming字段名称的更新可能会导致文档中字段的重新排序。



## 删除文档

删除操作只需传入一个**过滤器**指定那些文档需要被删除即可。

举例：

+ 删除所有文档
```bash
db.inventory.deleteMany({})
```
+ 删除符合条件的文档
```bash
db.collection.deleteMany(<filter>)
```
+ 只删除一个符合条件的文档
```bash
db.collection.deleteMany(<filter>)
```


### 删除方法

| 方法                                                         |                                                              |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`db.collection.deleteOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#mongodb-method-db.collection.deleteOne) | 即使多个文档可能与指定的过滤器匹配，也最多删除一个与指定过滤器匹配的文档。*3.2版中的新功能*。 |
| [`db.collection.deleteMany()`](https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#mongodb-method-db.collection.deleteMany) | 删除与指定过滤器匹配的所有文档。*3.2版中的新功能*。          |
| [`db.collection.remove()`](https://docs.mongodb.com/manual/reference/method/db.collection.remove/#mongodb-method-db.collection.remove) | 删除单个文档或与指定过滤器匹配的所有文档。                   |

### 行为


+  索引

**删除操作不会删除索引**，即使从集合中删除所有文档也是如此。

+  原子性

MongoDB 中的所有写操作在单个文档的级别上都是原子的。



> 参考文献
> [SQL到MongoDB的转换](https://docs.mongodb.com/manual/reference/sql-comparison/)
> 
> [MongoDB的CRUD](https://docs.mongodb.com/manual/crud/)