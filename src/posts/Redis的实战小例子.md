---
title: Redis的实战小例子
date: 2022-09-21 15:14:47
categories: Redis
tags:
---
## 缓存
最常见的使用方式。

## 分布式锁
https://songyangji.gitee.io/2021/11/29/Redis%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81/

## 排行榜
在线比赛的排行榜。

使用 zset即可。
```java
@Service
public class GameService {

    @Resource
    RedisTemplate redisTemplate;
    ZSetOperations ops;

    @PostConstruct
    public void init() {
        ops = redisTemplate.opsForZSet();
    }

    public void incrUserScoreInGame(String gameId, int uid, double addedScore) {
        ops.incrementScore(gameId, uid, addedScore);
    }

    public void addUserWithScore(String gameId, int uid, double score) {
        ops.add(gameId, uid, score);
    }

    public List<UserScore> getTopK(String gameId, int k) {
        Set<ZSetOperations.TypedTuple<Integer>> set = ops.rangeWithScores(gameId, 0, k - 1);
        ArrayList<UserScore> objects = new ArrayList<>();
        assert set != null;
        for (ZSetOperations.TypedTuple<Integer> tuple : set) {
            UserScore userScore = new UserScore(tuple.getValue() == null ? -1 : tuple.getValue() , tuple.getScore() == null ?0 : tuple.getScore());
            objects.add(userScore);
        }
        return objects;
    }
    
}
```
大数据量进行排名时候，分数的累加是具有规律性的，就是说一般不会突然一下子加10000分，减10000分。而是+10，-10。那么可以得出这么一个结论：在一般情况下，前十名的用户是由前1000名（也可以是2000名，结合具体业务来）来产出的。所以给出这样的策略：1.第一次跑批得出前1000名的uid，进行排序，计算出前10名进行展示。2.10分钟内，只统计这1000个uid的分数变化情况，产出10名。3.定时任务10分钟一次跑全量数据跑出最新的1000个uid，计算前10。4.如果遇到大分数累加事件，直接将该用户当前积分和第1000个uid分数进行比较，分数低的uid进行抛弃。

zset只存10个，每次写入前判断下第10名的value，大于就写入，并存储更新第10名的value，难道不是这样做？

## 签到
```java
    void testBitMap() {
        // 示例：使用BitMap记录用户本周是否有签到
        final long userId = new Random().nextLong();
        // final long userId = 1L;
        // userId高48位用于将用户划分到不同的key，低16位作为位图偏移参数offset;
        String keySign = "user:sign:" + LocalDate.now().getDayOfWeek() + ":" + (userId >> 16);
        // offset参数必须大于或等于0，小于2^32(bit 映射被限制在 512 MB 之内)
        redisTemplate.opsForValue().setBit(keySign, userId & 0xffff, true);
        System.out.println("是否签到：" + redisTemplate.opsForValue().getBit(keySign, userId & 0xffff));
        System.out.println("是否签到：" + redisTemplate.opsForValue().getBit(keySign, (userId + 1) & 0xffff));
    }
```

## 面对面开房间

https://www.cnblogs.com/54chensongxia/p/13813533.html

https://www.runoob.com/html/html5-geolocation.html

数据结构：

6位的房间号 ： 1000，000；

`longitude:latitude`

> 在经线上，纬度每差1度,实地距离大约为111千米；
>
> 在纬线上，经度每差1度,实际距离为111×cosθ千米。（其中θ表示该纬线的纬度.在不同纬线上,经度每差1度的实际距离是不相等的）。

```shell
# 添加一个空间元素,longitude、latitude、member分别是该地理位置的经度、纬度、成员
# 这里的成员就是指代具体的业务数据，比如说用户的ID等
# 需要注意的是Redis的纬度有效范围不是[-90,90]而是[-85,85]
# 如果在添加一个空间元素时，这个元素中的menber已经存在key中，那么GEOADD命令会返回0,相当于更新了这个menber的位置信息
GEOADD key longitude latitude member [longitude latitude member]
# 用于添加城市的坐标信息
geoadd cities:locations 117.12 39.08 tianjin 114.29 38.02 shijiazhuang 118.01 39.38 tangshan 115.29 38.51 baoding

# 获取地理位置信息
geopos key member [member ...]
# 获取天津的坐标
geopos cities:locations tianjin

# 获取两个坐标之间的距离
# unit代表单位，有4个单位值
  - m (meter) 代表米
  - km （kilometer）代表千米
  - mi （miles）代表英里
  - ft （ft）代表尺
geodist key member1 member2 [unit]
# 获取天津和保定之间的距离
GEODIST cities:locations tianjin baoding km

# 获取指定位置范围内的地理信息位置集合，此命令可以用于实现附近的人的功能
# georadius和georadiusbymember两个命令的作用是一样的，都是以一个地理位置为中心算出指定半径内的其他地理信息位置，不同的是georadius命令的中心位置给出了具体的经纬度，georadiusbymember只需给出成员即可。其中radiusm|km|ft|mi是必需参数，指定了半径（带单位），这两个命令有很多可选参数，参数含义如下：
# - withcoord：返回结果中包含经纬度。 
# - withdist：返回结果中包含离中心节点位置的距离。
# - withhash：返回结果中包含geohash，有关geohash后面介绍。
# - COUNT count：指定返回结果的数量。
# - asc|desc：返回结果按照离中心节点的距离做升序或者降序。
# - store key：将返回结果的地理位置信息保存到指定键。
# - storedist key：将返回结果离中心节点的距离保存到指定键。
georadius key longitude latitude radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key] [storedist key]

georadiusbymember key member radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key] [storedist key]

# 获取geo hash
# Redis使用geohash将二维经纬度转换为一维字符串，geohash有如下特点：
# - GEO的数据类型为zset，Redis将所有地理位置信息的geohash存放在zset中。
# - 字符串越长，表示的位置更精确，表3-8给出了字符串长度对应的精度，例如geohash长度为9时，精度在2米左右。长度和精度的对应关系，请参考：https://easyreadfs.nosdn.127.net/9F42_CKRFsfc8SUALbHKog==/8796093023252281390
# - 两个字符串越相似，它们之间的距离越近，Redis利用字符串前缀匹配算法实现相关的命令。
# - geohash编码和经纬度是可以相互转换的。
# - Redis正是使用有序集合并结合geohash的特性实现了GEO的若干命令。
geohash key member [member ...]

# 删除操作，GEO没有提供删除成员的命令，但是因为GEO的底层实现是zset，所以可以借用zrem命令实现对地理位置信息的删除。
zrem key member
```


# 限流
## 第一种：基于Redis的setnx的操作
我们在使用Redis的分布式锁的时候，大家都知道是依靠了setnx的指令，在CAS（Compare and swap）的操作的时候，同时给指定的key设置了过期实践（expire），我们在限流的主要目的就是为了在单位时间内，有且仅有N数量的请求能够访问我的代码程序。所以依靠setnx可以很轻松的做到这方面的功能。

比如我们需要在10秒内限定20个请求，那么我们在setnx的时候可以设置过期时间10，当请求的setnx数量达到20时候即达到了限流效果。代码比较简单就不做展示了。

当然这种做法的弊端是很多的，比如当统计1-10秒的时候，无法统计2-11秒之内，如果需要统计N秒内的M个请求，那么我们的Redis中需要保持N个key等等问题



## 第二种：基于Redis的数据结构zset]

其实限流涉及的最主要的就是滑动窗口，上面也提到1-10怎么变成2-11。其实也就是起始值和末端值都各+1即可。

而我们如果用Redis的list数据结构可以轻而易举的实现该功能

我们可以将请求打造成一个zset数组，当每一次请求进来的时候，value保持唯一，可以用UUID生成，而score可以用当前时间戳表示，因为score我们可以用来计算当前时间戳之内有多少的请求数量，而zset数据结构也提供了range方法让我们可以很轻易的获取到2个时间戳内有多少请求。

代码如下

```java
public Response limitFlow(){
        Long currentTime = new Date().getTime();
        System.out.println(currentTime);
        if(redisTemplate.hasKey("limit")) {
            Integer count = redisTemplate.opsForZSet().rangeByScore("limit", currentTime -  intervalTime, currentTime).size();        // intervalTime是限流的时间 
            System.out.println(count);
            if (count != null && count > 5) {
                return Response.ok("每分钟最多只能访问5次");
            }
        }
        redisTemplate.opsForZSet().add("limit",UUID.randomUUID().toString(),currentTime);
        return Response.ok("访问成功");
    }
```



通过上述代码可以做到滑动窗口的效果，并且能保证每N秒内至多M个请求，缺点就是zset的数据结构会越来越大。实现方式相对也是比较简单的。

> 基于微服务的思想，构建在 B2C 电商场景下的项目实战。核心技术栈，是 Spring Boot + Dubbo 。未来，会重构成 Spring Cloud Alibaba 。
>
> 项目地址：https://github.com/YunaiV/onemall



## 第三种：基于Redis的令牌桶算法

提到限流就不得不提到令牌桶算法了。

令牌桶算法提及到输入速率和输出速率，当输出速率大于输入速率，那么就是超出流量限制了。

也就是说我们每访问一次请求的时候，可以从Redis中获取一个令牌，如果拿到令牌了，那就说明没超出限制，而如果拿不到，则结果相反。



依靠上述的思想，我们可以**结合Redis的List数据结构**很轻易的做到这样的代码，只是简单实现

**依靠List的leftPop来获取令牌；**

```java
// 输出令牌
public Response limitFlow2(Long id){
        Object result = redisTemplate.opsForList().leftPop("limit_list");
        if(result == null){
            return Response.ok("当前令牌桶中无令牌");
        }
        return Response.ok(articleDescription2);
    }
```



再**依靠Java的定时任务，定时往List中rightPush令牌**，当然令牌也需要唯一性，所以我这里还是用UUID进行了生成

```java
// 10S的速率往令牌桶中添加UUID，只为保证唯一性
    @Scheduled(fixedDelay = 10_000,initialDelay = 0)
    public void setIntervalTimeTask(){
        redisTemplate.opsForList().rightPush("limit_list",UUID.randomUUID().toString());
    }
```

综上，代码实现起始都不是很难，针对这些限流方式我们可以在AOP或者filter中加入以上代码，用来做到接口的限流，最终保护你的网站。

Redis其实还有很多其他的用处，他的作用不仅仅是缓存，分布式锁的作用。他的数据结构也不仅仅是只有String，Hash，List，Set，Zset。有兴趣的可以后续了解下他的GeoHash算法；BitMap，HLL以及布隆过滤器数据(Redis4.0之后加入，可以用Docker直接安装redislabs/rebloom)结构。


>  https://mp.weixin.qq.com/s/jT0WYISuSoi_hkTmELb7PQ



## 第四种：基于Redis的漏桶算法

https://juejin.cn/post/6844903982842789896