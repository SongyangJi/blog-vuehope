---

title: 高可靠性的消息队列 —— RabbitMQ
date: 2021-10-12
categories: 消息中间件
tags:
  - Message Queue 
  - RabbitMQ

---

# 前言
使用消息代理的系统根据定义是分布式的。

由于发送的协议方法（消息）不能保证到达对等方或被其成功处理，

因此**发布者和消费者都需要一种机制来进行传递和处理确认**。RabbitMQ 支持的几种消息传递协议提供了这样的特性。

+ 从代理（broker）对发布者（publisher）的确认是一个称为**publisher-confirms（发布者确认）**的扩展 协议。


+ 从消费者（consumer）到 RabbitMQ 的传递处理确认在消息传递协议中称为**acknowledgement（简称 ack，计算机网络中经常用到）**；

这两个功能都基于相同的想法，并受到 TCP 的启发。

它们对于从发布者到 RabbitMQ 节点以及从 RabbitMQ 节点到消费者的可靠交付至关重要。换句话说，**它们对于数据安全至关重要**。





# 生产者发布消息不丢失

> 注意下面两种方案不可以同时选择，最多选其一。
>
> 即事务通道不能进入确认模式，并且确认模式的通道也不能成为事务通道。

## 事务机制

+ 原生Java客户端

```java
        Channel ch = null;
// ...
        ch.txSelect();
        for (int i = 0; i < MSG_COUNT; ++i) {
            try {
                ch.basicPublish("", QUEUE_NAME,
                        MessageProperties.PERSISTENT_BASIC,
                        "nop".getBytes());
                ch.txCommit();
            } catch (Exception exception) {
                ch.txRollback();
            }
        }
```



+ SpringBoot AMQP

首先提供一个事务管理器供SpringBoot使用。

```java
@Bean
RabbitTransactionManager transactionManager(ConnectionFactory connectionFactory) {
    return new RabbitTransactionManager(connectionFactory);
}
```



接下来，在消息生产者上面做两件事：添加`@Transactional`并设置通信信道为事务模式：

```java
    @Service
    public class MsgService {
        @Autowired
        RabbitTemplate rabbitTemplate;

        @Transactional
        public void send() {
            rabbitTemplate.setChannelTransacted(true);
         // rabbitTemplate.convertAndSend(...);
         // int i = 1 / 0; 没有爆发异常，由spring提交事务，否则回滚（也就是不发生消息）
        }
    }
```



但是使用事务有两个问题。

首先channel长时间处于阻塞：发布者必须依次等待broker处理每条消息。

不过有时候发布者只要知道broker宕机时哪些消息尚未处理就足够了。

其次是事务实现的繁重性：每次提交都需要一个 fsync()，这需要很多时间才能完成。



> 发布 10000 条消息需要 4 多分钟（具体参数机器性能决定，总之确实非常慢）



## 发送方确认机制

一旦通道进入确认模式，代理将在处理消息时确认消息。

由于这是**异步完成**的，生产者可以流式发布而不用等待代理，代理也可以有效地**批量写入磁盘**。



+ 原生Java客户端

```java
     // 消息追踪记录（如果需要线程安全并且有序，可以使用 ConcurrentSkipListMap ）
        HashMap<Long, String> map = new HashMap<>();
        // 必须显式开启
        channel.confirmSelect();
        // 监听被退回的消息(如消息路由到队列失败)
        channel.addReturnListener(returnMessage -> {
            System.out.println("return : " + System.currentTimeMillis());
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            try {
                TimeUnit.SECONDS.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.err.println(new String(returnMessage.getBody()) + " publish fail!");
        });

        // 监听被到达或未到达交换机（exchange）的消息
        channel.addConfirmListener(new ConfirmListener() {
            @Override
            public void handleAck(long deliveryTag, boolean multiple) throws IOException {
                map.remove(deliveryTag); // 发送成功，缓存清除掉
            }

            @Override
            public void handleNack(long deliveryTag, boolean multiple) throws IOException {
                System.err.println(map.get(deliveryTag) + "not ack!");
                // 下面可以进行重新发送等逻辑
            }
        });

        try {
            Random random = new Random();
            int idx = 0;
            while (idx < 1000) {
                String message = "from server..." + (++idx);
                // 追踪记录
                map.put(channel.getNextPublishSeqNo(), message);
                // 发送消息
                channel.basicPublish("", queue, MessageProperties.PERSISTENT_BASIC, message.getBytes(StandardCharsets.UTF_8));

                TimeUnit.MILLISECONDS.sleep(random.nextInt(300) + 200);
            }
        } finally {
            System.out.println("以下为未成功发送的消息");
            // 可以进行重试逻辑
            map.values().forEach(s -> System.out.println("not ack, may need publish again : " + s));
        }
```



+ SpringBoot AMQP

首先**在配置文件中配置中开启消息发送方确认机制**。

```yaml
spring:
  rabbitmq:
    publisher-returns: true
    publisher-confirm-type: correlated
```



`publisher-confirm-type`有三种属性：

1. none：表示禁用发布确认模式，默认即此。
2. correlated：使用相关消息确认，回调中触发。
3. simple：使用 `waitForConfirms()` 和 `waitForConfirmsOrDie()` 方法的进行确认。



然后**配置回调的监听器**：

```java
@Configuration
public class PublisherConfirmConfig implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnsCallback {

    RabbitTemplate rabbitTemplate;


    public PublisherConfirmConfig(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    //@Bean 此处无需注入
    RabbitTransactionManager transactionManager(ConnectionFactory connectionFactory) {
        return new RabbitTransactionManager(connectionFactory);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        System.out.println("correlationData : "+correlationData);
        if (ack) {
            System.out.println("success");
        } else {
            System.err.println("cause : "+cause);
        }
    }

    @Override
    public void returnedMessage(ReturnedMessage returned) {
        System.err.println(returned);
    }


    @PostConstruct
    public void initRabbitTemplate() {
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnsCallback(this);
    }

}
```



发送消息：

```java
// 注意必须传入 CorrelationData，否则没有根据去跟踪（原生client使用deliveryTag跟踪）
rabbitTemplate.convertAndSend("q1", (Object) s, new CorrelationData("correlation id = " + count));
```





# MQ服务器存储消息不丢失



# 消费者消费消息不丢失


## 关于ACK

### RabbitMQ的Client

RabbitMQ中`channel`在消费消息（`basicConsume(String queue, boolean autoAck, Consumer callback)`）的时候，指定的ack的含义如下：

+ autoAck = true

当broker在消息发送后（写入TCP套接字后）此条消息就立即ack了，此条消息RabbitMQ服务器也不再保存了，

而丝毫不管收到消息的客户端是否处理。如果消费者在收到大量消息但没有处理的时候突然宕机了，那么那些未处理消息也就随着本地缓冲区的消失而消失了（服务器上也没有了）。

这种ack方式谨慎使用。

+ autoAck = false

这种ack方式必须要求用户自己主动ack消息（`channel.basicAck`）,常常和prefetchCount配合使用（后面会介绍到）。



### Spring AMQP

需要注意的是Spring AMQP中配置的ack的含义和上面的ack含义是不一样的。

+ auto（default）

容器将根据侦听器是正常返回还是抛出异常来发出 ack/nack。

+ none

这里的none和rabbitmq的auto是一个含义。

+ manual

用户必须通过channel去ack/nack



**配置方式**

+ yaml配置
```yaml
spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: auto
```


+ 方法级别（覆盖外部配置）
```java
@RabbitListener(queues = "ququeName", ackMode = "manual")
```



## Ack的相关api



### deliveryTag（交付标签）

当消费者（订阅）被注册时，消息将被 RabbitMQ 使用basic.deliver 方法传递。

该方法带有一个*交付标签*，它**唯一地标识了一个通道上的交付**。因此，**交付标签的范围是每个channel**。

交付标签是单调增长的正整数。确认交付的客户端库方法将交付标签作为参数。

由于交付标签的范围是每个通道，**交付必须在接收它们的同一通道上得到确认**。

在不同的通道上确认将导致“未知传递标签”协议异常并关闭通道。



### 确认（ack）方法
```java
oid basicAck(long deliveryTag, boolean multiple)
```
multiple为true的时候，会将之前的消息都ack（即交付标签小于deliveryTag的消息都会被ack）

### 拒绝（rejecj\nack）方法

```java
void basicReject(long deliveryTag, boolean requeue) 
```
requeue为true的时候会将消息重新入队，但必须要注意的是**如果这个queue没有其他消费者，而本机由于某些原因会反复拉取这条消息并拒绝再拉取导致死循环。**所以，在需要将消息重新入队的时候，需要注意消息重新入队的次数。



还有一个相似的方法，

```java
basicNack(long deliveryTag, boolean multiple, boolean requeue)
```

多了个 multiple 参数，含义和上面ack的multiple的一致。









# 业务上实现


## 投递失败的消息如何处理



## 消费的幂等性如何做到



## 消息中间件实现分布式事务





# 参考

[介绍发布者确认](https://blog.rabbitmq.com/posts/2011/02/introducing-publisher-confirms)

[发布者确认](https://rabbitmq.com/tutorials/tutorial-seven-java.html) 

[消费者确认和发布者确认](https://rabbitmq.com/confirms.html#consumer-acks-api-elements)
