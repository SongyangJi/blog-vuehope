---
title: SpringBoot集成Redis ———— 序列化配置、常见工具类、基本的CRUD
date: 2021-09-28
categories: Redis
tags:
  - NoSQL
  - Redis
  - SpringBoot 集成一切
---



## Maven依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- lettuce连接池需要依赖下面的jar包 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```



序列化依赖，如果使用 spring-boot-starter-web, 就不需要了。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-json</artifactId>
</dependency>
```



## Java 连接 redis 的客户端

> 操作redis的客户端有jedis跟Lettuce。在springboot1.x系列中，其中使用的是jedis,但是到了springboot2.x其中使用的是Lettuce。 因为我们的版本是springboot2.x系列，所以今天使用的是Lettuce。
> 关于jedis跟lettuce的区别：
>
> +  Lettuce 和 Jedis 的定位都是Redis的client，所以他们当然可以直接连接redis server  
> + Jedis在实现上是直接连接的redis server，如果在多线程环境下是非线程安全的，这个时候只有使用连接池，为每个Jedis实例增加物理连接;
> + Lettuce的连接是基于Netty的，连接实例（StatefulRedisConnection）可以在多个线程间并发访问，应为StatefulRedisConnection是线程安全的，所以一个连接实例（StatefulRedisConnection）就可以满足多线程环境下的并发访问，当然这个也是可伸缩的设计，一个连接实例不够的情况也可以按需增加连接实例。



## 序列化配置

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate redisTemplate = new RedisTemplate();
        // 设置template获得 redis-connection 的工厂
        redisTemplate.setConnectionFactory(connectionFactory);
        // 设置序列化器
        redisTemplate.setKeySerializer(StringRedisSerializer.UTF_8);
        redisTemplate.setValueSerializer(RedisSerializer.json()); // value 序列化器使用 Json
        redisTemplate.setHashKeySerializer(StringRedisSerializer.UTF_8);
        redisTemplate.setHashValueSerializer(StringRedisSerializer.UTF_8);
        return redisTemplate;
    }

}
```



## yml基本配置

```yml
spring:
  redis:
    database: 0 #使用第几个数据库
    host: localhost #redis服务器地址
    port: 6379 #端口号
    password: ~ #redis服务器连接密码
    timeout: 10000  # 连接超时时间（单位：毫秒）
    lettuce:
      pool:
        ## 下面的值其实是lettuce连接池的默认配置，有兴趣的可以点进源码看一下
        max-active: 8 #连接池最大连接数（使用负值表示没有限制）
        max-wait: -1  #连接池最大阻塞等待时间（单位：使用负值表示没有限制）
        max-idle: 8 #连接池中的最大空闲连接
        min-idle: 0 #连接池中的最小空闲连接
```



## 工具类

### Json工具类

主要是将检查型异常改为运行时异常抛出

```java
/**
 * Json工具类, 功能为对象和字符串互相转换
 * 注意，jackson的属性注入是 无参构造器+getter+setter
 */
public final class JsonUtil {
    private static final ObjectMapper mapper = new ObjectMapper();

    /**
     * Serialize any Java value as a String.
     */
    public static String stringfy(Object object) {
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JsonUtil stringfy error: " + e.getMessage());
        }
    }

    /**
     * Deserialize JSON content from given JSON content String.
     */
    public static <T> T parse(String content, Class<T> valueType) {
        try {
            return mapper.readValue(content, valueType);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JsonUtil parse error: " + e.getMessage());
        }
    }
}
```



### 简单Bean类与Map之间的转换

这个工具类的转换，主要是在使用 redis 的 hash 结构去存储实体类的时候使用。

```java
/**
 * @author: SongyangJi
 * @description: 提供简单bean类与map之间的转化
 * @since: 2021/9/16
 */

public class BeanAndMapConvertUtil {

    public static Map<String, Object> beanToMap(Object object) {
        Map<String, Object> map = new HashMap<String, Object>();
        for (Field field : object.getClass().getDeclaredFields()) {
            try {
                boolean flag = field.isAccessible();
                field.setAccessible(true);
                Object obj = field.get(object);
                map.put(field.getName(), obj != null ? obj.toString() : "");
                field.setAccessible(flag);
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        }
        return map;
    }


    public static <T> T mapToBean(Map<String, Object> map, Class<T> beanClass) {
        T t;
        try {
            t = beanClass.newInstance();
            for (Field field : beanClass.getDeclaredFields()) {
                if (map.containsKey(field.getName())) {
                    boolean flag = field.isAccessible();
                    field.setAccessible(true);
                    Object obj = map.get(field.getName());
                    if (obj != null) {
                        if (field.getType().isAssignableFrom(obj.getClass())) {
                            field.set(t, obj);
                        }
                        field.setAccessible(flag);
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return t;
    }

}

```





## CRUD

### 简单的Entity

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    long userId;

    String name;

    int age;

    double weight;

    int score;

    LocalDate lastSignDay;

}
```



### 测试 String

```java
		void testString() {
        redisTemplate.opsForValue().set("str_key", "hello_world");
    }
```





### 测试 Hash

```java
		void testBeanAndHash() {
        User songyangJi = new User(12345L, "SongyangJi", 18, 73.5, 0, null);
        final String user_hash_key = "user_hash";

        System.out.println("------ 使用 Hash 存储对象 ------");
        // 使用Hash结构，map传入
        redisTemplate.opsForHash().putAll(user_hash_key + ":" + songyangJi.getUserId(), BeanAndMapConvertUtil.beanToMap(songyangJi));

        BoundHashOperations hashOs = redisTemplate.boundHashOps(user_hash_key + ":" + songyangJi.getUserId());
        System.out.println(hashOs.get("userId"));
        System.out.println(hashOs.get("name"));
        hashOs.put("name", "gong chen bo");
        hashOs.increment("age", 1);
        System.out.println(hashOs.keys());
        System.out.println(hashOs.values());
        System.out.println(hashOs.entries());
		}     
```



### 测试 Json序列化

```java
   void testBeanAndHash() {
        User songyangJi = new User(12345L, "SongyangJi", 18, 73.5, 0, null);
        final String user_json_key = "user_json";

        System.out.println("------- 使用 Json 存储对象 -------");
        redisTemplate.opsForValue().set(user_json_key + ":" + songyangJi.getUserId(), JsonUtil.stringfy(songyangJi));
        User u = JsonUtil.parse((String) redisTemplate.opsForValue().get(user_json_key + ":" + songyangJi.getUserId()), User.class);
        System.out.println(u);
        u.setName("gong chen bo");
        BoundValueOperations valueOps = redisTemplate.boundValueOps(user_json_key + ":" + songyangJi.getUserId());
        valueOps.set(JsonUtil.stringfy(u));
        System.out.println(redisTemplate.opsForValue().get(user_json_key + ":" + songyangJi.getUserId()));
    }
```



### 测试 HyperLogLog

```java
    void testHyperLogLog() {

        // 使用HyperLogLog统计每天登录的用户量
        final long userId = new Random().nextLong();
//        final long userId = 1L;
        HyperLogLogOperations hyperLogLog = redisTemplate.opsForHyperLogLog();
        String key = "user:login:number:" + LocalDate.now();
        hyperLogLog.add(key, userId);
        System.out.println(hyperLogLog.size(key));
    }
```



### 测试 BitMap

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



### 测试 Lua

```java
    void testLua() {
        User songyangJi = new User(12345L, "SongyangJi", 18, 73.5, 0, LocalDate.now().minusDays(1));
        final String user_hash_key = "user";
        // 使用Hash结构，map传入
        redisTemplate.opsForHash().putAll(user_hash_key + ":" + songyangJi.getUserId(), BeanAndMapConvertUtil.beanToMap(songyangJi));
        System.out.println(redisTemplate.opsForHash().entries(user_hash_key + ":" + songyangJi.getUserId()));

        // 构造 lua脚本
        DefaultRedisScript<String> script = new DefaultRedisScript<>();
        script.setLocation(new ClassPathResource("lua-script/user-sign.lua")); // 设置脚本所在位置，也可以直接把脚本内容放在字符串里
        script.setResultType(String.class); // 必须设置返回值类型（否则 execute 返回值为 null ）

        List<String> keys = new ArrayList<>();
        keys.add(String.valueOf(songyangJi.getUserId()));
        keys.add(LocalDate.now().toString());

        System.out.println("签到成功与否："+redisTemplate.execute(script, keys));
        System.out.println("签到成功与否："+redisTemplate.execute(script, keys));
        System.out.println(redisTemplate.opsForHash().entries(user_hash_key + ":" + songyangJi.getUserId()));
    }
```

resources/lua-script/user-sign.lua

```lua
local score = redis.call('hget', 'user:' .. KEYS[1], 'score')
local day = redis.call('hget', 'user:' .. KEYS[1], 'lastSignDay')
if (day == KEYS[2]) then
    return '0'
else
    redis.call('hset', 'user:' .. KEYS[1], 'score', score + 1, 'lastSignDay', KEYS[2])
    return '1'
end
-- 在 lua 中数组的索引从 1 开始
```







>  附录

Code:

```java
@SpringBootTest
class LearnRedisSpringbootApplicationTests {

    @Resource
    RedisTemplate redisTemplate;

    void flushDB() {
        Objects.requireNonNull(redisTemplate.getConnectionFactory()).getConnection().flushAll();
    }

    @Test
    void testString() {
        flushDB();
        redisTemplate.opsForValue().set("str_key", "hello_world");
    }

    @Test
    void testBeanAndHash() {
        flushDB();

        User songyangJi = new User(12345L, "SongyangJi", 18, 73.5, 0, null);
        final String user_hash_key = "user_hash";
        final String user_json_key = "user_json";

        System.out.println("------ 使用 Hash 存储对象 ------");
        // 使用Hash结构，map传入
        redisTemplate.opsForHash().putAll(user_hash_key + ":" + songyangJi.getUserId(), BeanAndMapConvertUtil.beanToMap(songyangJi));

        BoundHashOperations hashOs = redisTemplate.boundHashOps(user_hash_key + ":" + songyangJi.getUserId());
        System.out.println(hashOs.get("userId"));
        System.out.println(hashOs.get("name"));
        hashOs.put("name", "gong chen bo");
        hashOs.increment("age", 1);
        System.out.println(hashOs.keys());
        System.out.println(hashOs.values());
        System.out.println(hashOs.entries());

        System.out.println("------- 使用 Json 存储对象 -------");
        redisTemplate.opsForValue().set(user_json_key + ":" + songyangJi.getUserId(), JsonUtil.stringfy(songyangJi));
        User u = JsonUtil.parse((String) redisTemplate.opsForValue().get(user_json_key + ":" + songyangJi.getUserId()), User.class);
        System.out.println(u);
        u.setName("gong chen bo");
        BoundValueOperations valueOps = redisTemplate.boundValueOps(user_json_key + ":" + songyangJi.getUserId());
        valueOps.set(JsonUtil.stringfy(u));
        System.out.println(redisTemplate.opsForValue().get(user_json_key + ":" + songyangJi.getUserId()));
    }


    @Test
    void testBitMap() {
        flushDB();

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

    @Test
    void testHyperLogLog() {
        flushDB();

        // 使用HyperLogLog统计每天登录的用户量
        final long userId = new Random().nextLong();
//        final long userId = 1L;
        HyperLogLogOperations hyperLogLog = redisTemplate.opsForHyperLogLog();
        String key = "user:login:number:" + LocalDate.now();
        hyperLogLog.add(key, userId);
        System.out.println(hyperLogLog.size(key));
    }

    @Test
    void testLua() {
        flushDB();

        User songyangJi = new User(12345L, "SongyangJi", 18, 73.5, 0, LocalDate.now().minusDays(1));
        final String user_hash_key = "user";
        // 使用Hash结构，map传入
        redisTemplate.opsForHash().putAll(user_hash_key + ":" + songyangJi.getUserId(), BeanAndMapConvertUtil.beanToMap(songyangJi));
        System.out.println(redisTemplate.opsForHash().entries(user_hash_key + ":" + songyangJi.getUserId()));

        // 构造 lua脚本
        DefaultRedisScript<String> script = new DefaultRedisScript<>();
        script.setLocation(new ClassPathResource("lua-script/user-sign.lua")); // 设置脚本所在位置，也可以直接把脚本内容放在字符串里
        script.setResultType(String.class); // 必须设置返回值类型（否则 execute 返回值为 null ）

        List<String> keys = new ArrayList<>();
        keys.add(String.valueOf(songyangJi.getUserId()));
        keys.add(LocalDate.now().toString());

        System.out.println("签到成功与否："+redisTemplate.execute(script, keys));
        System.out.println("签到成功与否："+redisTemplate.execute(script, keys));
        System.out.println(redisTemplate.opsForHash().entries(user_hash_key + ":" + songyangJi.getUserId()));
    }

}
```

