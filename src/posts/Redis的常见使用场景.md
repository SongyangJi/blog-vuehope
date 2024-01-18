---
title: Redis的常见使用场景
date: 2022-03-01 11:22:31
categories: Redis
tags:
  - NoSQL
  - Redis
---

- [1、缓存]

String类型

例如：热点数据缓存（例如报表、头条排行榜、对象缓存、全页缓存等等可以提升为热点数据的访问数据。

- [2、数据共享分布式]

举一个典型例子：分布式 session 的共享。

> spring session在 redis 里面保存的数据包括：
>
> - SET 类型的
>
>   ```
>   spring:session:expireations:[min]
>   ```
>
>   min 表示从 1970 年 1 月 1 日 0 点 0 分经过的分钟数， SET 集合的 member 为 expires:[sessionId] ,表示这一分钟应该过期的键。
>
> - String 类型的
>
>   ```
>   spring:session:sessions:expires:[sessionId]
>   ```
>
>   该数据对应一个空值，表示 sessionId 过期的剩余时间，即 maxInactiveInterval。
>
> - Hash 类型的
>
>   ```
>   spring:session:sessions:[sessionId]
>   ```
>
>   session 保存的数据，记录了 creationTime，maxInactiveInterval，lastAccessedTime，attribute。前两个数据是用于 session 过期管理的辅助数据结构。
>
>   ```json
>   {
>       "lastAccessedTime": 1523933008926,/*2018/4/17 10:43:28*/
>       "creationTime": 1523933008926, /*2018/4/17 10:43:28*/
>       "maxInactiveInterval": 1800,
>       "sessionAttr:name": "xu" // 用户数据
>   }
>   ```



基于 spring-session 解决分布式 session 共享问题:https://spring.io/projects/spring-session-data-redis

Spring Session 数据结构解读:https://blog.didispace.com/spring-session-source-learning-xjf/

https://spring.io/projects/spring-session-data-redis

- [3、分布式锁]

基本原理就是 setnx+expire

- [4、全局ID]

int类型，incrby，利用原子性

incrby userid 1000

分库分表的场景，一次性拿一段

- [5、计数器]

int类型，incr方法

例如：文章的阅读量、微博点赞数、允许一定的延迟，先写入Redis再定时同步到数据库

- [6、限流]

https://mp.weixin.qq.com/s/jT0WYISuSoi_hkTmELb7PQ

- [7、位统计]

这个可以用来做

- [8、购物车]
- [9、用户消息时间线timeline]
- [10、消息队列]
- [11、抽奖]
- [12、点赞、签到、打卡]
- [13、商品标签]
- [14、商品筛选]
- [15、用户关注、推荐模型]
- [16、排行榜]

