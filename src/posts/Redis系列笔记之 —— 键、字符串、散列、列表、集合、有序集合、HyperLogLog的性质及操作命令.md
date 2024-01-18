---
title: Redis系列笔记之 —— 键、字符串、散列、列表、集合、有序集合、HyperLogLog的性质及操作命令
date: 2021-09-15
categories: Redis
tags:
  - NoSQL
  - Redis
---



# 键

> 命令不区分大小写，尽量使用大写，表明是Redis的关键字。

## 获得符合规则的键名列表
```
KEYS your_pattern
```

pattern支持glob风格。

 1. `？` 匹配单个字符；
 2. `*` 匹配任意个（包括0个）字符；
 3. `[]` 匹配 [] 括号间的任一字符，可以使用`-`表示范围，如a[b-d],表示匹配ab、ac、ad；
 4. `\x` 用于转义，匹配字符 x 本身。

那么`KEYS *`实际上就会返回Redis中所有的键。

## 基本命令
1. **删除**
```
DEL key
```
存在并删除成功返回1，失败返回0；

2.  **判断是否存在**
```
EXISTS key
```

3. **获取类型**
```
TYPE key
```
返回类型可能是（string字符串、hash散列、list列表、set集合、zset有序集合）



4. 序列化给定 key
```
DUMP key
```
返回被序列化的值


## 生存时间相关
1. 为给定 key 设置过期时间
```
EXPIRE key seconds
```
单位秒。

2. 设置 key 的过期时间以毫秒计

```
PEXPIRE key milliseconds
```

3. 和 EXPIRE 类似
```
EXPIREAT key timestamp
```
EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置过期时间。 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。

4. 和 EXPIRE 类似
```
PEXPIREAT key milliseconds-timestamp
```
设置 key 过期时间的时间戳(unix timestamp) 以毫秒计

5. 移除过期时间
```
PERSIST key
```
移除 key 的过期时间，key 将持久保持。

注意，使用`SET`、`GETSET`命令为键赋值，也会同时清除键的过期时间。
但是只对键值操作的命令，如（RPUSH、INCR、HSET、ZREM）

6. 返回剩余的生存时间。
```
TTL key
```
以**秒为单位**，返回给定 key 的剩余生存时间(TTL, time to live)。

7. 和TTL类似
```
PTTL key
```
以**毫秒为单位**返回 key 的剩余的过期时间。

## 其他命令
1. 修改 key 的名称
```
RENAME key newkey
```

2. 仅当 newkey 不存在时，将 key 改名为 newkey 。
```
RENAMENX key newkey
```

3. 从当前数据库中随机返回一个 key 

```
RANDOMKEY
```

4. 将当前数据库的 key 移动到给定的数据库 db 当中
```
MOVE key db
```

5. 清除某个数据库的数据
```
FLUSHDB
```

6. 清除Redis所有数据
```
FLUSHALL
```

# 数据类型
## 字符串(string)
### 性质
+ string 是 redis 最基本的类型，你可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。

+ string 类型是二进制安全的。意思是 **redis 的 string 可以包含任何数据**。比如jpg图片或者**序列化的对象**。

+ string 类型是 Redis 最基本的数据类型，**string** 类型的值最大能存储 **512M**B。

### 操作命令
+ **取值赋值**
```
SET key value
```


```
GET key
```


在指定的 key 不存在时，为 key 设置指定的值。
```
SETNX KEY_NAME VALUE
```


+ **递增递减数字**
当存储的字符串是**整数形式**时，可以使用`INCR`命令自增1，并返回自增后的值。
（当键不存在时，默认从0开始自增，所以第一次返回值为 1 ）。
```cpp
INCR num 
返回：1
INCR num 
返回：2
```
如果给非整数类型的值，如浮点值、字符串，使用INCR命令，会报错。
如：
```
127.0.0.1:6379[1]> GET s
"helloworld"
127.0.0.1:6379[1]> INCR s
(error) ERR value is not an integer or out of range
```

**指定增量**
```
INCRBY key increment
```


同样的，也有**减少命令**。
```
DECR key
```

```
DECR key decrement
```

+ **浮点数的增加**
```
INCRBYFLOAT key increment
```
但没有对应的减少命令。


+ **向尾部追加值**
```
APPEND key value
```

+ **获取字符串长度**
```
STRLEN key
```

+ **同时获得/得到多个键值**
```
MGET key [key ...]
```
```
MSET key value [key1 value1 ...]
```

+ 位操作
暂略。



> 以下的数据类型都不能支持嵌套。

## 散列(hash)
### 特点
+ Redis hash 是一个**键值(key=>value)对集合**。
+ 键值的类型只能是**字符串**，也就是说不能去嵌套其他类型。
+ hash 特别适合用于**存储对象**。 
+ 一个散列类型的键最多只能包含$2^{32}-1$（**40亿**多）个字段。

### 操作命令
+ **赋值、取值**

```
HSET key field value
HGET key field
```
注：HSET命令不区分插入还是更新操作，插入操返回1，更新返回0；

```
HMSET key field1 value1 field2 value2 [filed3 value3]
HMGET key field1 field2 [field3]
```

如果不知道散列类型的键对应的值有哪些字段，可以使用：
```
HGETALL
```

+ 只获取**字段名**或**字段值**
```
HKEYS key
HVALS key
```
+ 只获取**字段数量**
返回字段的数量。
```
HLEN key
```


示例：
```
127.0.0.1:6379> HSET car price 50000
(integer) 1
127.0.0.1:6379> HMSET car kind bmw color white
OK
127.0.0.1:6379> HGET car price
"50000"
127.0.0.1:6379> HMGET car kind color
1) "bmw"
2) "white"
127.0.0.1:6379> HGETALL car
1) "price"
2) "50000"
3) "kind"
4) "bmw"
5) "color"
6) "white"
```


+ **判断字段是否存在**
```
HEXISTS key field
```
+ **当字段不存在时赋值**
（NX表示not exists）
```
HSETNX key field value
```
值得一提的是，这个命令也是一个原子操作，不需要担心静态条件。

 + **增加数字**
```
HINCRBY key filed increment
```
（散列类型没有HINCR命令）

+ **删除字段**
```
HDEL key field [field1 ……]
```
返回成功的删除字段的个数。


## 列表
### 特点
Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。
列表类型的内部使用双向链表，所以在链表两端添加元素的时间复杂度为O(1)。
自然，在链表两端查询元素都是很快的。

### 操作命令
+ **向列表两端添加元素**

```
// 从左边添加（头部）
LPUSH key val [val1 ……]
// 从右边添加（尾部）
RPUSH key val [val1 ……]
```

+ **向列表两端弹出元素**

```
LPOP key
RPOP key
```
+ **获取列表中元素的个数**

```
LLEN
```
当键不存在时，返回0；

+ **获得列表片段**
两个注意点，① 索引**从0开始**， ② **左右都是闭区间**。
```
LRANGE key start end
```
并且支持负索引，表示从右边开始计数。
如-1表示右边第一个，-2表示右边第二个。

 **两个情况**
① start的位置在stop的后面，返回空列表
② stop的位置大于实际的索引范围，则返回到列表最右边的元素。


+ **删除列表中指定的值**
REM为remove的缩写
```
LREM key count value
```
删除前count个值value的元素。
**注意**：
① count为0时，删除所有
②count为负，仍然删除前|count|个。

**返回的是实际删除的元素的个数**。


 + **获得/修改制定索引的元素值**
```
LINDEX key index
LSET KEY index value
```
注意：索引从0开始

+ **只保留指定阶段**
**只保留[start,end]的元素**，其余的元素删除。
```
LTRIM key start end
```
+ **将元素从一个列表转到另一个列表**
将第一个列表的元素从右边弹出，从左边添加进第二的列表。
```
RPOPLPUSH source destination
```

## 集合

### 特点
**Redis 的 Set 是 String 类型的无序集合**。集合成员是**唯一的**，这就意味着集合中不能出现重复的数据。

Redis 中集合是通过**哈希表 hash table**实现的，所以添加，删除，查找的复杂度**基本上是** O(1)的。

集合中最大的成员数为 $2^{32}- 1$ (4294967295, 每个集合可存储40多亿个成员)。

### 操作命令

+ **增加/删除元素**
```
SADD key member [member ...]
SREM key member [member ...]
```
返回是成功添加、删除的元素的个数。

+ **获得集合的所有元素**
```
SMEMBERS
```

+ **判断元素是否在集合中**

```
SISMEMBER key member
```
时间复杂度为O(1)。当值存在时返回1，否则返回0。

 1. **集合的交**
 intersection： 交集
```
SINTER setA setB setC
```
 2. **集合的并**
 union：并集
 ```
SUNION setA setB setC
 ```

3. **集合的差**
首先差集$A-B$的含义是，$\{x| x\in A \ \ and \ \ x\notin B \}$
```
SDIFF key [key ....]
```

比如: A - B - C，依次计算即可：
多个集合做差集是将前两个集合差集的结果再次作为操作数。


+ **获取集合中元素的个数** 

```
SCARD  key
```

+ **进行集合运算并将结果存储**
```
SINTERSTORE destination key [key ...]
SDIFFSTORE destination key [key ...]
SUNIONSTORE destination key [key ...]
```

## 有序集合
### 特点
+ Redis的zset 和 set 一样也是**string类型元素的集合**,且**不允许重复**的成员。
+ 不同的是**每个元素都会关联一个double类型的分数**。redis正是通过分数来为集合中的成员进行**从小到大的排序**。
+ zset的**成员是唯一的**,但分数(score)却可以重复。

### 操作命令
+ **增加元素**
```
ZADD key score member [score member ...]
```

如:

```
ZADD student_score 100 zhangsan 90 xiaoming 60 xiaohua
```

+ **获得元素的分数**
````
ZSCORE  key number
````

+ 获得**排名在某个范围**的元素列表
```
ZRANGE key start stop [WITHSCORES]
ZREVRANGE key start stop [WITHSCORES]
```
ZRANGE命令会按照**元素分数的从小到大的顺序**返回**索引从start到stop之间的所有元素**

+ ZARNGE和 LRANGE类似，包括 star, stop；
+ 如果**需要同时获得元素的分数**，加上参数`WITHSCORES`,
+ 如果**需要从大到小排序**，用ZREVRANGE
如：

```
127.0.0.1:6379> ZRANGE student_score 0 -1 WITHSCORES
1) "xiaohua"
2) "60"
3) "xiaoming"
4) "90"
5) "zhangsan"
6) "100"
127.0.0.1:6379> ZREVRANGE student_score 0 -1 WITHSCORES
1) "zhangsan"
2) "100"
3) "xiaoming"
4) "90"
5) "xiaohua"
6) "60"
```


+ 获得**指定分数范围的元素**
```
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offser count]
```

该命令按照**元素分数从小到大**的顺序返回分数在min到max之间（包含min、max）的元素。
+  如果需要是开区间，在min、max前面加上`(`
+ min、max也可以使用**无穷大**，`+inf、-inf`

```
LIMIT offset count
```
和SQL中语法类似，offset是偏移量，count是最大允许的个数。

表示获取分数**大于**80分的从第**2**个人开始的3个人（不足3个就拉倒）。
```
ZRANGEBYSCORE student_score (80 +inf WITHSCORES LIMIT  1 3
```


+ **增加某个元素的分数**
```
ZINCRBY key increment member
```

+ **获得集合中元素的数量**
```
ZCARD key
```

+ 获得指定**分数范围内的元素个数**

```
ZCOUNT key min max
```

+ **删除元素**
返回成功删除的元素个数。
```
ZREM member [member...]
```

+ 按照**排名范围删除元素**
```
ZREMRANGEBYRANK key start stop
```

+ 按照**分数范围删除元素**
```
ZREMRANGEBYSCORE key min max
```

+ 按**元素的排名**
从0开始，从小到大获取元素的排名，最小元素的排名为0；
```
ZRANK key member
```

+ **有序集合的交集**
暂略。



## HyperLogLog

> 基数：一个数据集中不同元素的个数。
> 基数估计：估计一个数据集中不同元素的个数，但是允许有误差。

## 特点
+ HyperLogLog 是用来做**基数统计**的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。

+ 在 Redis 里面，**每个 HyperLogLog 键只需要花费 12 KB 内存**，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

+ 但是，因为 HyperLogLog 只会**根据输入元素来计算基数**，而**不会储存输入元素本身**，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。


## 命令

+ 将多个元素添加进**HyperLogLog**,但是只是统计个数，不会保存数据本身。
```
PFADD key element [element ...]
```


+ 返回数据集的基数
如果有多个key，会统计这些数据集的基数之和，但是注意**不是简单的求和**。
```
PFCOUNT key [key ...]
```

+ 将多个 HyperLogLog 合并为一个 HyperLogLog
```
PFMERGE destkey sourcekey [sourcekey ...]
```
