---
title: Redis缓存淘汰策略
date: 2022-03-21 22:43:17
categories: Redis
tags:
  - Redis
---

> Redis 使用的时内存空间来存储数据的，避免业务应用从后端数据库中读取数据，可以提升应用的响应速度。但是内存空间毕竟有限，随着我们存储数据的不断增长，要缓存的数据量越来越大，当超过了我们的内存大小时，该怎么办呢？



Redis 4.0 之前一共实现了 6 种内存淘汰策略，在 4.0 之后，又增加了 2 种策略。我们可以按照是否会进行数据淘汰把它们分成两类：

+ 不进行数据淘汰的策略，只有 noeviction 这一种。
+ 会进行淘汰的 7 种其他策略。会进行淘汰的 7 种策略，我们可以再进一步根据淘汰候选数据集的范围把它们分成两类：
+ + 在设置了过期时间的数据中进行淘汰，包括 volatile-random、volatile-ttl、volatile-lru、volatile-lfu（Redis 4.0 后新增）四种。
  + 在所有数据范围内进行淘汰，包括 allkeys-lru、allkeys-random、allkeys-lfu（Redis 4.0 后新增）三种。

具体如下：
+ noeviction：直接返回错误，不进行数据淘汰
+ volatile-ttl：表示在设置可过期时间的键值对中，**根据过期时间的先后进行淘汰数据，越早被过期的数据**，越先被淘汰
+ volatile-random：从名字可以看出来，就是在设置了过期时间的键值对中，随机淘汰数据。
+ volatile-lru：根据 lru 算法进行数据的淘汰
+ volatile-lfu：根据lfu算法进行数据的淘汰
+ allkeys-random：在全部的键值对数据中，进行数据的随机淘汰。
+ allkeys-lru：在全部的键值对数据中，根据 lru 算法进行数据的淘汰。
+ allkeys-lfu：在全部的键值对数据中，根据 lfu 算法进行数据的淘汰。

**默认情况下，Redis 在使用的内存空间超过 maxmemory 值时，并不会淘汰数据，也就是设定的 noeviction 策略。对应到 Redis 缓存，也就是指，一旦缓存被写满了，再有写请求来时，Redis 不再提供服务，而是直接返回错误。**

其中LRU算法的大家都比较熟悉了，LFU算法是在 LRU 算法的基础上，同时考虑了数据的访问时效性和数据的访问次数。参考链接[LFU](https://leetcode-cn.com/problems/lfu-cache/)

