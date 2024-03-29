---
title: Redis的热key问题
date: 2022-08-13 23:50:26
categories: Redis
tag:
  - Redis
---



> 上面提到，所谓热key问题就是，突然有几十万的请求去访问redis上的某个特定key。那么，这样会造成流量过于集中，达到物理网卡上限，从而导致这台redis的服务器宕机。那接下来这个key的请求，就会直接怼到你的数据库上，导致你的服务不可用。



## 热Key的危害

+ 流量集中，达到服务器处理上限（`CPU`、网络 `IO` 等）；
+ 会影响在同一个 `Redis` 实例上其他 `Key` 的读写请求操作；
+ 热 `Key` 请求落到同一个 `Redis` 实例上，无法通过扩容解决；
+ 大量 `Redis` 请求失败，查询操作可能打到数据库，拖垮数据库，导致整个服务不可用。




## 如何发现热Key

### 凭借业务经验，预估热 Key 出现

根据业务系统上线的一些活动和功能，我们是可以在某些场景下提前预估热 `Key` 的出现的，比如业务需要进行一场商品秒杀活动，秒杀商品信息和数量一般都会缓存到 `Redis` 中，这种场景极有可能出现热 `Key` 问题的。

+ 优点：简单，凭经验发现热 `Key`，提早发现提早处理；
+ 缺点：没有办法预测所有热 `Key` 出现，比如某些热点新闻事件，无法提前预测。

### 客户端进行收集

一般我们在连接 `Redis` 服务器时都要使用专门的 SDK（比如：`Java` 的客户端工具 `Jedis`、`Redisson`），我们可以对客户端工具进行封装，在发送请求前进行收集采集，同时定时把收集到的数据上报到统一的服务进行聚合计算。

+ 优点：方案简单
+ 缺点：
  + 对客户端代码有一定入侵，或者需要对 `SDK` 工具进行二次开发；
  + 没法适应多语言架构，每一种语言的 `SDK` 都需要进行开发，后期开发维护成本较高。

### 在代理层进行收集

如果所有的 `Redis` 请求都经过 `Proxy`（代理）的话，可以考虑改动 `Proxy` 代码进行收集，思路与客户端基本类似。

![img](https://gitee.com/dongzl/article-images/raw/master/2021/03-Redis-Hot-Key/Redis-Hot-Key-02.png)

+ 优点：对使用方完全透明，能够解决客户端 `SDK` 的语言异构和版本升级问题；
+ 缺点：
  + 开发成本会比客户端高些；
  + 并不是所有的 `Redis` 集群架构中都有 `Proxy` 代理（使用这种方式必须要部署 `Proxy`）。



### 使用 Redis 自带命令

1. **hotkeys 参数**

`Redis` 在 `4.0.3` 版本中添加了 [hotkeys](https://github.com/redis/redis/pull/4392) 查找特性，可以直接利用 `redis-cli --hotkeys` 获取当前 `keyspace` 的热点 `key`，实现上是通过 `scan + object freq` 完成的。

+ 优点：无需进行二次开发，能够直接利用现成的工具；
+ 缺点：
  + 由于需要扫描整个 `keyspace`，实时性上比较差;
  + 扫描时间与 `key` 的数量正相关，如果 `key` 的数量比较多，耗时可能会非常长。

> hotkeys
> https://www.zhangbj.com/p/765.html



2. [monitor](https://redis.io/commands/monitor) 命令

`monitor` 命令可以实时抓取出 `Redis` 服务器接收到的命令，通过 `redis-cli monitor` 抓取数据，同时结合一些现成的分析工具，比如 [redis-faina](https://github.com/facebookarchive/redis-faina)，统计出热 Key。

+ 优点：无需进行二次开发，能够直接利用现成的工具；
+ 缺点：该命令在高并发的条件下，有内存增暴增的隐患，还会降低 `Redis` 的性能。



### Redis 节点抓包分析

`Redis` 客户端使用 `TCP` 协议与服务端进行交互，通信协议采用的是 `RESP` 协议。自己写程序监听端口，按照 `RESP` 协议规则解析数据，进行分析。或者我们可以使用一些抓包工具，比如 `tcpdump` 工具，抓取一段时间内的流量进行解析。

+ 优点：对 `SDK` 或者 `Proxy` 代理层没有入侵；
+ 缺点：
  + 有一定的开发成本；
  + 热 `Key` 节点的网络流量和系统负载已经比较高了，抓包可能会导致情况进一步恶化。

## 如何解决

### 增加 Redis 实例副本数量

对于出现热 `Key` 的 `Redis` 实例，我们可以通过水平扩容增加副本数量，将读请求的压力分担到不同副本节点上。

(通过**主从复制-读写分离**，将读请求分散多个机器上。)



### 二级缓存（本地缓存）

当出现热 `Key` 以后，把热 `Key` 加载到系统的 `JVM` 中。后续针对这些热 `Key` 的请求，会直接从 `JVM` 中获取，而不会走到 `Redis` 层。这些本地缓存的工具很多，比如 `Ehcache`，或者 `Google Guava` 中 `Cache` 工具，或者直接使用 `HashMap` 作为本地缓存工具都是可以的。

**使用本地缓存需要注意两个问题：**

+ 如果对热 `Key` 进行本地缓存，需要防止本地缓存过大，影响系统性能；
+ 需要处理本地缓存和 `Redis` 集群数据的一致性问题。



### 热 Key 备份

通过前面的分析，我们可以了解到，之所以出现热 `Key`，是因为有大量的对同一个 `Key` 的请求落到同一个 `Redis` 实例上，如果我们可以有办法将这些请求打散到不同的实例上，防止出现流量倾斜的情况，那么热 `Key` 问题也就不存在了。

那么如何将对某个热 `Key` 的请求打散到不同实例上呢？我们就可以通过热 `Key` 备份的方式，基本的思路就是，我们**可以给热 `Key` 加上前缀或者后缀，把一个热 `Key` 的数量变成 `Redis` 实例个数 `N` 的倍数 `M`，从而由访问一个 `Redis` `Key` 变成访问 `N * M` 个 `Redis` `Key`。 `N * M` 个 `Redis` `Key` 经过分片分布到不同的实例上，将访问量均摊到所有实例**。



具体的逻辑：

```lua
// N 为 Redis 实例个数，M 为 N 的 2倍
const M = N * 2
//生成随机数
random = GenRandom(0, M)
//构造备份新 Key
bakHotKey = hotKey + "_" + random
// 先从备份key中取
data = redis.GET(bakHotKey)
if data == NULL {
    data = redis.GET(hotKey)
    if data == NULL {
        data = GetFromDB()
        // 可以利用原子锁来写入数据保证数据一致性
        redis.SET(hotKey, data, expireTime)
        redis.SET(bakHotKey, data, expireTime + GenRandom(0, 5))
    } else {
        redis.SET(bakHotKey, data, expireTime + GenRandom(0, 5))
    }
}
```



在这段代码中，通过一个大于等于 `1` 小于 `M` 的随机数，得到一个 `bakHotKey`，程序会优先访问 `bakHotKey`，在得不到数据的情况下，再访问原来的 `hotkey`，并将 `hotkey` 的内容写回 `bakHotKey`。

值得注意的是，`backHotKey` 的过期时间是 `hotkey` 的过期时间加上一个较小的随机正整数，这是通过坡度过期的方式，保证在 `hotkey` 过期时，所有 `backHotKey` 不会同时过期而造成缓存雪崩。





> 参考博客
>
> 

