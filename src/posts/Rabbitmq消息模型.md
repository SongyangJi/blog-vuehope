---
title: Rabbitmq消息模型
date: 2022-08-13 23:53:09
categories: 消息中间件
tags:
  - Message Queue 
  - RabbitMQ
---






# 基本模型

## 单个消费者
![](https://www.rabbitmq.com/img/tutorials/python-one-overall.png)
## 多个消费者并发消费
![](https://www.rabbitmq.com/img/tutorials/python-two.png)
如果有多个消费者，它们会共同消费这个队列里的消息，是负载均衡的实现方式，官方称这叫"Work Queues"。

（而在Kafka、RocketMQ里，这样的消费方式叫ConsumerGroup）



**总结**

根据上面的两张图，我们可以得出这样的结论，这里的队列逻辑上和物理上可以认为是一个，多个生产者并发push，多个消费者并发poll。





# 交换机的引入

虽然基本的mq模型就是上面所述的，但是为了更好地管理消息的路由，各大mq的设计方案各有不同。

RabbitMq的设计理念是：消费者和**队列**打交道，生产者和**交换机**打交道，**队列**可以**绑定（bind）**到**交换机**上，二者的网络路由关系叫**路由键**。



> ps：虽然设计上，生产者只能将消息发到某个exchange，但是为了保持历史兼容，rabbit自己提供了一个default的交换机供你使用，这个交换机叫直连（Direct）交换机。



## 直连交换机(Direct Exchange)

![](https://www.rabbitmq.com/img/tutorials/direct-exchange.png)

如上图，消息发送到某个直连交换机后，具体要路由到哪个队列，是由生产者发送消息的路由键决定的。

> ps：同样，为了历史兼容，如果你使用了默认的交换机，也没有指定路由键，那么默认会使用队列名作为路由键。



## 扇出交换机(Fanout Exchange)

![](https://www.rabbitmq.com/img/tutorials/bindings.png)

扇出交换机将消息广播到每一个bind的队列上。

> ps: 其实这里的fanout的概念就有点像kafka、rocketmq里，不同ConsumerGroup消费topic的概念，也就是说，不用的ConsumerGroup的消费进度是独立的。



## 主题交换机（Topic Exchange）

![](https://www.rabbitmq.com/img/tutorials/python-five.png)

可以理解为**带匹配符的Direct Exchange**，根据路由键来路由到相匹配的队列上，而不是简单地比较是否相等。






> 参考资料
>
> https://www.rabbitmq.com/getstarted.html