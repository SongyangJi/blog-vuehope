---
title: SpringBoot整合Kafka收发消息
date: 2021-10-25 09:58:57
categories: 消息中间件
tags:
  - Message Queue
  - Kafka
---





# Maven依赖

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>

<!-- kafka 流处理相关 -->
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-streams</artifactId>
</dependency>

<!-- 本地嵌入式kafka，测试用，可无需依赖 -->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka-test</artifactId>
    <scope>test</scope>
</dependency>
```




# 配置主题

使用SpringBoot,  一个默认配置的 KafkaAdmin 会被注入，可以直接使用。

```java
@Bean
public KafkaAdmin admin() {
    Map<String, Object> configs = new HashMap<>();
    // configs.put(AdminClientConfig.BOOTSTRAPx_SERVERS_CONFIG, ...); 
    return new KafkaAdmin(configs);
}

```



使用`TopicBuilder`

```java
@Bean
public NewTopic topic1() {
    return TopicBuilder.name("topic1")  // 主题名
            .partitions(10) // 分区数
            .replicas(3)    // 备份数
            .compact()
            .build();
}
```



# 发送消息

## 使用KafkaTemplate

使用`KafkaTemplate`来发送消息, API

```java
// 1. 需要设置默认的主题： public void setDefaultTopic(String defaultTopic)
ListenableFuture<SendResult<K, V>> sendDefault(V data);

ListenableFuture<SendResult<K, V>> sendDefault(K key, V data);

ListenableFuture<SendResult<K, V>> sendDefault(Integer partition, K key, V data);

ListenableFuture<SendResult<K, V>> sendDefault(Integer partition, Long timestamp, K key, V data);

// 2.必须指定主题、值（数据）
// 可以指定分区、键、时间戳
ListenableFuture<SendResult<K, V>> send(String topic, V data);

ListenableFuture<SendResult<K, V>> send(String topic, K key, V data);

ListenableFuture<SendResult<K, V>> send(String topic, Integer partition, K key, V data);

ListenableFuture<SendResult<K, V>> send(String topic, Integer partition, Long timestamp, K key, V data);

// 3.使用 kafka-clients 提供的 ProducerRecord 
ListenableFuture<SendResult<K, V>> send(ProducerRecord<K, V> record);
// 4.使用 spring 封装提供的 message
ListenableFuture<SendResult<K, V>> send(Message<?> message);
```

返回值值得注意,`ListenableFuture`是spring提供的拓展了juc下`Future`接口的增加了添加了回调功能增强版Future。



## 发送模式

### fire-and-forget（发完即忘）

```java
kafkaTemplate.send(...)
```

也就是发完之后完全不做任何处理，发送失败也无所谓，比如传送一些日志的时候。

### 阻塞

因为返回的是 `ListenableFuture`，所以可以阻塞式的等待结果。

```java
// 一直阻塞
kafkaTemplate.send().get();
// 等待固定时间
kafkaTemplate.send().get(10, TimeUnit.SECONDS);
```



```java
public void sendToKafka(final MyOutputData data) {
    final ProducerRecord<String, String> record = createRecord(data);

    try {
        template.send(record).get(10, TimeUnit.SECONDS);
        handleSuccess(data);
    }
    catch (ExecutionException e) {
        handleFailure(data, record, e.getCause());
    }
    catch (TimeoutException | InterruptedException e) {
        handleFailure(data, record, e);
    }
}
```



### 非阻塞

```java
public void sendToKafka(final MyOutputData data) {
    final ProducerRecord<String, String> record = createRecord(data);

    ListenableFuture<SendResult<Integer, String>> future = template.send(record);
    // 添加处理回调
    future.addCallback(new KafkaSendCallback<SendResult<Integer, String>>() {

        @Override
        public void onSuccess(SendResult<Integer, String> result) {
            handleSuccess(data);
        }

        @Override
        public void onFailure(KafkaProducerException ex) {
            handleFailure(data, record, ex);
        }

    });
}

```



当然，还有种粗粒度的添加回调，在kafkaTemplate上添加回调：

```java
// LoggingProducerListener，它会记录错误并且在发送成功时不执行任何操作。
kafkaTemplate.setProducerListener(new LoggingProducerListener<>());
kafkaTemplate.setProducerListener(new ProducerListener<String, String>() {
    @Override
    public void onSuccess(ProducerRecord<String, String> producerRecord, RecordMetadata recordMetadata) {

    }

    @Override
    public void onError(ProducerRecord<String, String> producerRecord, RecordMetadata recordMetadata, Exception exception) {

    }
});
```



### 使用ReplyingKafkaTemplate

不过需要注意，这个`ReplyingKafkaTemplate`SpringBoot并没有注入，需要自行构造。

```java
    @Bean
    public ReplyingKafkaTemplate<String, String, String> replyingTemplate(
            ProducerFactory<String, String> pf,
            ConcurrentMessageListenerContainer<String, String> repliesContainer) {

        return new ReplyingKafkaTemplate<>(pf, repliesContainer);
    }

    @Bean
    public ConcurrentMessageListenerContainer<String, String> repliesContainer(
            ConcurrentKafkaListenerContainerFactory<String, String> containerFactory) {

        ConcurrentMessageListenerContainer<String, String> repliesContainer =
                containerFactory.createContainer("replies");
        repliesContainer.getContainerProperties().setGroupId("repliesGroup");
        repliesContainer.setAutoStartup(false);
        return repliesContainer;
    }
```



API

```java
RequestReplyFuture<K, V, R> sendAndReceive(ProducerRecord<K, V> record);

// replyTimeout为等待回复的超时时间
RequestReplyFuture<K, V, R> sendAndReceive(ProducerRecord<K, V> record,
    Duration replyTimeout);
```



如何使用这个返回值`RequestReplyFuture`呢？

```java
RequestReplyFuture<String, String, String> replyFuture = template.sendAndReceive(record);
// 发送结果
SendResult<String, String> sendResult = replyFuture.getSendFuture().get();
System.out.println("Sent ok: " + sendResult.getRecordMetadata());
// 返回的结果
ConsumerRecord<String, String> consumerRecord = replyFuture.get();
System.out.println("Return value: " + consumerRecord.value()); // 返回值
```



## 接受消息

大的方向有两种接受消息的方式,一个low-level一点，一个high-level一点。

1. 配置`MessageListenerContainer`并提供`MessageListener`。
2. 使用`@KafkaListener`。



其中第二种方法类似于其他MQ的监听器，如`@RabbitListener`,使用简单方便。



第一种方法相当于SpringBoot提供了一个消息监听器的容器，这个容器负责`kafkaConsumer.poll`调用，

以及MessageListener的方法调用，主要的动能就是让用户无需关注多线程并发代码的编写，着力于消息的消费与处理。



值得注意的是，即使你没有直接使用第一种方法，`@KafkaListener`所注解的类也被封装成`MessagingMessageListenerAdapter`然后由`MessageListenerContainer`调度。



下面主要介绍@KafkaListener的使用。



> 只列出最常用的属性

```java
public @interface KafkaListener {
  
  // 订阅的主题
	String[] topics() default {};

  // 用于匹配主题的pattern
	String topicPattern() default "";

  // 主题分区
	TopicPartition[] topicPartitions() default {};

	String errorHandler() default "";

  // 消费组id
	String groupId() default "";

  // 线程数
	String concurrency() default "";
  
  String[] properties() default {};
  
}


public @interface TopicPartition {


	String topic();

	String[] partitions() default {};


	PartitionOffset[] partitionOffsets() default {};

}


public @interface PartitionOffset {

	String partition();


	String initialOffset();


	String relativeToCurrent() default "false";

}

```















