---
title: Redis在Java 语言的使用 —— 使用 Jedis 测试 redis操纵几种常见数据类型的命令
date: 2021-09-16
categories: Redis
tags:
  - NoSQL
  - Redis
---



# Jedis
## Jedis介绍
Jedis 是 Redis 官方首选的 Java 客户端开发包。
## 如何使用
三样东西必不可少：

1. jdk
2. redis-server
3. java的redis驱动

我没有直接使用jar包导入，而是采用maven。

```xml
        <!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>3.3.0</version>
        </dependency>
```

在终端打开 redis-server之后：

```java
import redis.clients.jedis.Jedis;

public class PingJedis {
    public static void main(String[] args) {
        //连接本地的 Redis 服务
        Jedis jedis = new Jedis("localhost");
        // 如果 Redis 服务设置来密码，需要下面这行，没有就不需要
        // jedis.auth("123456");
        System.out.println("连接成功");
        System.out.println("服务正在运行: "+jedis.ping());

//        System.out.println("终止Redis服务:"+jedis.shutdown());

    }
}
```


如果正常返回 `pong`，说明我们已经可以在java里使用redis了；

## 测试string

```java
import redis.clients.jedis.Jedis;

import java.util.List;

public class StringInJedis {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        System.out.println("服务正在运行: "+jedis.ping());
        System.out.println("——————————————————————————————————————————");

//        先清空一下
        jedis.flushAll();

//       测试 set、get
        jedis.set("name","Ji");
        System.out.println(jedis.get("name"));
        // 测试 get 不存在的键
        System.out.println(jedis.get("non-exist"));

//       测试增量 incr incrBy
        jedis.incr("num");
        System.out.println(jedis.get("num"));
        jedis.incrBy("num",2);
        System.out.println(jedis.get("num"));

//        测试增量 incr incrBy
        jedis.decr("num");
        System.out.println(jedis.get("num"));
        jedis.decrBy("num",2);
        System.out.println(jedis.get("num"));

//        测试浮点数的增量
        jedis.incrByFloat("num",9.9);
        System.out.println(jedis.get("num"));

//        测试追加功能
        jedis.append("name"," Songyang");
        System.out.println(jedis.get("name"));


//        获取字符串长度
        System.out.println(jedis.strlen("name"));

//        一次性获取多个值
        List<String> values = jedis.mget("name","num");
        for(String val:values) System.out.println(val);


    }
}
```

```java
连接成功
服务正在运行: PONG
——————————————————————————————————————————
Ji
null
1
3
2
0
9.90000000000000036
Ji Songyang
11
Ji Songyang
9.90000000000000036
```

## 测试hash

```java
import redis.clients.jedis.Jedis;

import java.util.*;


public class HashInJedis {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        System.out.println("服务正在运行: "+jedis.ping());
        System.out.println("——————————————————————————————————————————");

//        先清空一下
        jedis.flushAll();

//        测试 hset、hget
        jedis.hset("car","color","white");
        jedis.hset("car","price","999998");
        System.out.println(jedis.hget("car","color"));
        System.out.println(jedis.hget("car","price"));

        Map<String,String> map = new HashMap<>();
        map.put("kind","bmw");
        map.put("owner","jsy");
        jedis.hset("car",map);


//       批量获取 键、值、键值对
        System.out.println(jedis.hlen("car"));
        System.out.println(jedis.hgetAll("car"));
        Set<String> keySet = jedis.hkeys("car");
        System.out.println(keySet);
        List<String> values = jedis.hvals("car");
        System.out.println(values);

//       测试字段是否存在
        System.out.println(jedis.hexists("car","price"));
        System.out.println(jedis.hexists("car","manufacturer"));

//        测试 hsetnx
        jedis.hsetnx("car","country","US");
        System.out.println(jedis.hgetAll("car"));

//        测试给某一个字段自增
        jedis.hincrBy("car","price",1);
        jedis.hincrByFloat("car","price",0.99);
        System.out.println(jedis.hget("car","price"));

//        测试 删除字段
        System.out.println(jedis.hdel("car", "price", "non-exist-field"));

    }
}

```

```java
连接成功
服务正在运行: PONG
——————————————————————————————————————————
white
999998
4
{color=white, owner=jsy, price=999998, kind=bmw}
[color, owner, price, kind]
[white, 999998, bmw, jsy]
true
false
{owner=jsy, country=US, color=white, price=999998, kind=bmw}
999999.98999999999068677
1
```

## 测试list

```java
import redis.clients.jedis.Jedis;

public class ListInJedis {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        System.out.println("服务正在运行: "+jedis.ping());
        System.out.println("——————————————————————————————————————————");

//        先清空一下
        jedis.flushAll();

//      测试 lpush、rpush
        jedis.lpush("list","2","1");
        jedis.rpush("list","3","4");
        System.out.println(jedis.lrange("list",0,-1));


//        测试删除
        jedis.lpop("list");
        jedis.rpop("list");
        System.out.println(jedis.llen("list"));
        System.out.println(jedis.lrange("list",0,-1));

        jedis.lpop("list");
        jedis.lpop("list");



        // 此时 list为空
        for(int i=0;i<10;i++) jedis.rpush("list",""+i);
        System.out.println(jedis.lrange("list",0,-1));

//        测试 lrange(key,start,end);
        System.out.println(jedis.lrange("list",0,-1));
        System.out.println(jedis.lrange("list",1,2));
        System.out.println(jedis.lrange("list",3,-2));


//       测试线性表的get、set方法
        System.out.println(jedis.lindex("list",3));
        System.out.println(jedis.lindex("list",-2));
        jedis.lset("list",0,"10");
        System.out.println(jedis.lrange("list", 0, -1));

//        测试 list 的删除元素的功能
        // 按索引 保留 [start,end]
        jedis.ltrim("list",3,8);
        // 按元素去删
        jedis.lrem("list",1,"5");
        System.out.println(jedis.lrange("list", 0, -1));
    }
}
```


```java
连接成功
服务正在运行: PONG
——————————————————————————————————————————
[1, 2, 3, 4]
2
[2, 3]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[1, 2]
[3, 4, 5, 6, 7, 8]
3
8
[10, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[3, 4, 6, 7, 8]
```

## 操纵set

```java
import redis.clients.jedis.Jedis;

import java.util.Set;

public class SetInJedis {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        System.out.println("服务正在运行: "+jedis.ping());
        System.out.println("——————————————————————————————————————————");

//        先清空一下
        jedis.flushAll();

//        测试 sadd、srem
        jedis.sadd("set","1","2","2","3","4");
        System.out.println(jedis.smembers("set"));
        jedis.srem("set","2","5");
        System.out.println(jedis.smembers("set"));

//        元素是否在集合中
        System.out.println(jedis.sismember("set","2"));
        System.out.println(jedis.sismember("set","1"));

//        获取集合元素的个数
        System.out.println(jedis.scard("set"));


//        测试集合的交集、并集、差集
        // 几个用于测试集合
        jedis.sadd("set1","1","2","3");
        jedis.sadd("set2","1","2","4");
        jedis.sadd("set3","2","3","6");

        // 并集
        Set<String> res1 = jedis.sunion("set1","set2","set3");
        System.out.println(res1);

        // 交集
        Set<String> res2 = jedis.sinter("set1","set2","set3");
        System.out.println(res2);

        // 差集
        Set<String> res3 = jedis.sdiff("set1","set2","set3");
        System.out.println(res3);

        // 集合中间的元算，还可以存储到Redis中。
        jedis.sunionstore("st1","set1","set2","set3");
        jedis.sinterstore("st2","set1","set2","set3");
        jedis.sdiffstore("st3","set1","set2","set3");
        System.out.println(jedis.smembers("st1"));
        System.out.println(jedis.smembers("st2"));
        System.out.println(jedis.smembers("st3"));
    }
}

```

```java
连接成功
服务正在运行: PONG
——————————————————————————————————————————
[1, 2, 3, 4]
[1, 3, 4]
false
true
3
[1, 2, 3, 4, 6]
[2]
[]
[1, 2, 3, 4, 6]
[2]
[]
```

## 操纵zset

```java
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Tuple;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ZSetInJedis {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        System.out.println("服务正在运行: "+jedis.ping());
        System.out.println("——————————————————————————————————————————");

//        先清空一下
        jedis.flushAll();

//        测试有序集合的增加功能
        jedis.zadd("student_score",100,"张三");
        Map<String,Double> map = new HashMap<>();
        map.put("李四",80.0);
        map.put("王五",90.0);
        map.put("陈二",60.0);
        jedis.zadd("student_score",map);

//        获取有序集合某个元素的分数、排名
        System.out.println(jedis.zscore("student_score","李四"));
        System.out.println(jedis.zrank("student_score","李四"));
        System.out.println(jedis.zscore("student_score","张三"));
        System.out.println(jedis.zrank("student_score","张三"));


//        按名次顺序检索元素（及其分数）

        System.out.println();
        System.out.println("按名次顺序检索元素（及其分数） ——————————————————————\n");
        // 返回 索引 [0,2]的元素
        System.out.println(jedis.zrange("student_score",0,2));
        // 返回 索引 [1,3]的元素及分数
        Set<Tuple> s = jedis.zrangeWithScores("student_score",1,3);
        for(Tuple tuple:s){
            System.out.println("元素： "+tuple.getElement()+"      分数："+tuple.getScore());
        }

        // 降序返回
        System.out.println(jedis.zrevrange("student_score", 0, 2));
        System.out.println(jedis.zrevrangeWithScores("student_score", 1, 3));

//        按分数范围检索元素
        System.out.println();
        System.out.println("按分数范围检索元素 ————————————————————  \n");
        // 获取分数在 [80,100]的元素
        System.out.println(jedis.zrangeByScore("student_score",80,100));
        // 降序返回
        System.out.println(jedis.zrevrangeByScore("student_score", 100, 80));
        // 获取分数在 [80,100]的元素（包括分数）
        System.out.println(jedis.zrangeByScoreWithScores("student_score",80,100));
        // 降序返回
        System.out.println(jedis.zrevrangeByScoreWithScores("student_score",100,80));

        // 返回分数大于等于70的，从第2个元素开始，且不超过2个元素，
        System.out.println(jedis.zrangeByScoreWithScores("student_score",70,Integer.MAX_VALUE,1,2));

//        返回有序集合的基数
        System.out.println(jedis.zcard("student_score"));

//        统计分数在 [min,max]的元素的个数
        System.out.println(jedis.zcount("student_score", 75, 95));


//        测试 删除元素的功能
        System.out.println("直接删除、按排名范围删除、按分数范围删除");


        System.out.println("当前有元素：  "+jedis.zrangeWithScores("student_score",0,-1));

        // 直接删除
        jedis.zrem("student_score","张三");
        System.out.println(jedis.zrangeWithScores("student_score",0,-1));

        // 按照排名范围删除
        jedis.zremrangeByRank("student_score",1,1);
        System.out.println(jedis.zrangeWithScores("student_score",0,-1));

        // 按分数范围删除
        jedis.zremrangeByScore("student_score",70,95);
        System.out.println(jedis.zrangeWithScores("student_score",0,-1));

        // 有序集合的集合之间的操作 （ 并、交、差 ） 类似 集合之间的操作,这里略去

    }
}

```

```java
连接成功
服务正在运行: PONG
——————————————————————————————————————————
80.0
1
100.0
3

按名次顺序检索元素（及其分数） ——————————————————————

[陈二, 李四, 王五]
元素： 李四      分数：80.0
元素： 王五      分数：90.0
元素： 张三      分数：100.0
[张三, 王五, 李四]
[[王五,90.0], [李四,80.0], [陈二,60.0]]

按分数范围检索元素 ————————————————————  

[李四, 王五, 张三]
[张三, 王五, 李四]
[[李四,80.0], [王五,90.0], [张三,100.0]]
[[张三,100.0], [王五,90.0], [李四,80.0]]
[[王五,90.0], [张三,100.0]]
4
2
直接删除、按排名范围删除、按分数范围删除
当前有元素：  [[陈二,60.0], [李四,80.0], [王五,90.0], [张三,100.0]]
[[陈二,60.0], [李四,80.0], [王五,90.0]]
[[陈二,60.0], [王五,90.0]]
[[陈二,60.0]]
```


## 测试HyperLogLog

```java
import redis.clients.jedis.Jedis;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class HyperLogLog {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        System.out.println("服务正在运行: "+jedis.ping());
        System.out.println("——————————————————————————————————————————");

//        先清空一下
        jedis.flushAll();

        // 随机插入 1E8 个数字，看一下 HyperLogLog 的准确率
        Random random = new Random();

        int N = (int)1e6;
        int gap = (int)1e5 , n = (int)1e5;

        while(n<=N){
            Set<Integer> set = new HashSet<>();
            jedis.del("hp");

            for(int i=0;i<n;i++){
                int x = random.nextInt();
                set.add(x);
                jedis.pfadd("hp",Integer.toString(x));
            }

            System.out.println("真实数据是 "+set.size()+"个不同的数");
            System.out.println("HyperLogLog 统计数据为 "+jedis.pfcount("hp")+"个不同的数");
            double rate = 1.0*Math.abs(jedis.pfcount("hp")-set.size())/set.size();
            System.out.println("误差率为："+rate);
            System.out.println();
            n += gap;
        }
    }
}

```


```java
连接成功
服务正在运行: PONG
——————————————————————————————————————————
真实数据是 99999个不同的数
HyperLogLog 统计数据为 100268个不同的数
误差率为：0.002690026900269003

真实数据是 199997个不同的数
HyperLogLog 统计数据为 200718个不同的数
误差率为：0.003605054075811137

真实数据是 299989个不同的数
HyperLogLog 统计数据为 297310个不同的数
误差率为：0.008930327445339663

真实数据是 399981个不同的数
HyperLogLog 统计数据为 394993个不同的数
误差率为：0.012470592353136774

真实数据是 499974个不同的数
HyperLogLog 统计数据为 497927个不同的数
误差率为：0.004094212899070752

真实数据是 599960个不同的数
HyperLogLog 统计数据为 592881个不同的数
误差率为：0.011799119941329423

真实数据是 699948个不同的数
HyperLogLog 统计数据为 697609个不同的数
误差率为：0.003341676810277335

真实数据是 799939个不同的数
HyperLogLog 统计数据为 797154个不同的数
误差率为：0.0034815154655542485

真实数据是 899907个不同的数
HyperLogLog 统计数据为 912082个不同的数
误差率为：0.01352917579260968

真实数据是 999889个不同的数
HyperLogLog 统计数据为 998794个不同的数
误差率为：0.0010951215584929926

Process finished with exit code 0
  
```



## 测试 Bitmap

```java
public class BitMapInJedis {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        System.out.println("连接成功");
        System.out.println("服务正在运行: " + jedis.ping());
        System.out.println("——————————————————————————————————————————");

//        先清空一下
        jedis.flushAll();

        final String key = "key_bitmap";

        jedis.setbit(key,0,true);
        jedis.setbit("key_bitmap",1,true);

        System.out.println(key+1+" :"+jedis.getbit(key, 1));
        System.out.println(key+2+" : "+jedis.getbit(key, 2));

        // 只允许 0、1
        jedis.setbit(key,131,"1");
        jedis.setbit(key,132,"0");


    }
}
```

