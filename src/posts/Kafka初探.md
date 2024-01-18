---
title: Kafka初探
date: 2021-10-23 09:58:57
categories: 消息中间件
tags:
  - Message Queue
  - Kafka
---



# 一些网站

[官网](https://kafka.apache.org/)

[Kafka核心技术与实战](https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/Kafka%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF%E4%B8%8E%E5%AE%9E%E6%88%98/)



http://www.jasongj.com/tags/Kafka/



# 安装、测试

https://kafka.apache.org/quickstart

## 安装

[下载地址](https://www.apache.org/dyn/closer.cgi?path=/kafka/3.0.0/kafka_2.13-3.0.0.tgz)

配置相关环境。

## 测试

```bash
cd $KAFKA_HOME
```



kafka依赖zookeeper，所以要先启动它。(客户端默认连接端口2181)

```bash
sudo bin/zookeeper-server-start.sh config/zookeeper.properties
```


+ 启动服务器

```bash
# front start
sudo bin/kafka-server-start.sh config/server.properties
sudo bin/kafka-server-start.sh -daemon config/server.properties
```



+ 重启服务器

```shell
sudo bin/kafka-server-stop.sh
sudo bin/kafka-server-start.sh -daemon config/server.properties
```





+ 创建topic

```bash
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test
```



+ 列出topic

```bash
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```



+ 查看某个 topic

```bash
bin/kafka-topics.sh --describe --topic test --bootstrap-server localhost:9092
```



+ 发布消息

```bash
bin/kafka-console-producer.sh --topic test --bootstrap-server localhost:9092
```



+ 消费消息

```bash
bin/kafka-console-consumer.sh --topic test --from-beginning --bootstrap-server localhost:9092
```



能够呈现出来的效果就是，在**发布消息的console**中发布一条消息（enter分割），在**消费消息的console**中就会输出一条消息。





## SpringBoot Quick Start



+ yml配置

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: foo
      auto-offset-reset: earliest
```





```java
@Service
public class Demo {

    private final KafkaTemplate<String, String> template;

    @Autowired
    public Demo(KafkaTemplate<String, String> template) {
        this.template = template;
    }

    final String topicName = "myTopic";

    int idx = 0;

    @Scheduled(fixedRate = 1000)
    public void publish() {
        if (idx++ > 10) {
            return;
        }
        template.send(topicName, String.valueOf(idx));
    }

    @KafkaListener(topics = topicName)
    public void listen(ConsumerRecord<String, String> cr) {
        System.out.println(cr);
        System.out.println();
    }
    
}
```





输出:

```
ConsumerRecord(topic = myTopic, partition = 0, leaderEpoch = 0, offset = 2, CreateTime = 1635125751646, serialized key size = -1, serialized value size = 1, headers = RecordHeaders(headers = [], isReadOnly = false), key = null, value = 1)

ConsumerRecord(topic = myTopic, partition = 0, leaderEpoch = 0, offset = 3, CreateTime = 1635125752304, serialized key size = -1, serialized value size = 1, headers = RecordHeaders(headers = [], isReadOnly = false), key = null, value = 2)

ConsumerRecord(topic = myTopic, partition = 0, leaderEpoch = 0, offset = 4, CreateTime = 1635125753302, serialized key size = -1, serialized value size = 1, headers = RecordHeaders(headers = [], isReadOnly = false), key = null, value = 3)

ConsumerRecord(topic = myTopic, partition = 0, leaderEpoch = 0, offset = 5, CreateTime = 1635125754303, serialized key size = -1, serialized value size = 1, headers = RecordHeaders(headers = [], isReadOnly = false), key = null, value = 4)

ConsumerRecord(topic = myTopic, partition = 0, leaderEpoch = 0, offset = 6, CreateTime = 1635125755300, serialize
```



可以看到消息的各种属性，如主题、分区、偏移量、时间戳、键、值等等。



# Kafka-Eagle

必须配置好

```shell
ln -s "xxx" /usr/local/jdk8
export JAVA_HOME=/usr/local/jdk8
export KE_HOME=/usr/local/kafka-eagle-bin-3.0.0/efak-web-3.0.0
```



修改`system-config.properties`

主要修改了`efak.zk.cluster.alias=cluster1 cluster1.zk.list=127.0.0.1:2181` 还有`kafka mysql jdbc driver address`

```
######################################
# multi zookeeper & kafka cluster list
# Settings prefixed with 'kafka.eagle.' will be deprecated, use 'efak.' instead
######################################
#efak.zk.cluster.alias=cluster1,cluster2
#cluster1.zk.list=tdn1:2181,tdn2:2181,tdn3:2181
#cluster2.zk.list=xdn10:2181,xdn11:2181,xdn12:2181

efak.zk.cluster.alias=cluster1
cluster1.zk.list=127.0.0.1:2181

######################################
# zookeeper enable acl
######################################
cluster1.zk.acl.enable=false
cluster1.zk.acl.schema=digest
cluster1.zk.acl.username=test
cluster1.zk.acl.password=test123

######################################
# broker size online list
######################################
cluster1.efak.broker.size=20

######################################
# zk client thread limit
######################################
kafka.zk.limit.size=16

######################################
# EFAK webui port
######################################
efak.webui.port=8048

######################################
# EFAK enable distributed
######################################
efak.distributed.enable=false
efak.cluster.mode.status=master
efak.worknode.master.host=localhost
efak.worknode.port=8085

######################################
# kafka jmx acl and ssl authenticate
######################################
cluster1.efak.jmx.acl=false
cluster1.efak.jmx.user=keadmin
cluster1.efak.jmx.password=keadmin123
cluster1.efak.jmx.ssl=false
cluster1.efak.jmx.truststore.location=/data/ssl/certificates/kafka.truststore
cluster1.efak.jmx.truststore.password=ke123456

######################################
# kafka offset storage
######################################
cluster1.efak.offset.storage=kafka
cluster2.efak.offset.storage=zk

######################################
# kafka jmx uri
######################################
cluster1.efak.jmx.uri=service:jmx:rmi:///jndi/rmi://%s/jmxrmi

######################################
# kafka metrics, 15 days by default
######################################
efak.metrics.charts=true
efak.metrics.retain=15

######################################
# kafka sql topic records max
######################################
efak.sql.topic.records.max=5000
efak.sql.topic.preview.records.max=10

######################################
# delete kafka topic token
######################################
efak.topic.token=keadmin

######################################
# kafka sasl authenticate
######################################
cluster1.efak.sasl.enable=false
cluster1.efak.sasl.protocol=SASL_PLAINTEXT
cluster1.efak.sasl.mechanism=SCRAM-SHA-256
cluster1.efak.sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="kafka" password="kafka-eagle";
cluster1.efak.sasl.client.id=
cluster1.efak.blacklist.topics=
cluster1.efak.sasl.cgroup.enable=false
cluster1.efak.sasl.cgroup.topics=
cluster2.efak.sasl.enable=false
cluster2.efak.sasl.protocol=SASL_PLAINTEXT
cluster2.efak.sasl.mechanism=PLAIN
cluster2.efak.sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="kafka" password="kafka-eagle";
cluster2.efak.sasl.client.id=
cluster2.efak.blacklist.topics=
cluster2.efak.sasl.cgroup.enable=false
cluster2.efak.sasl.cgroup.topics=

######################################
# kafka ssl authenticate
######################################
cluster3.efak.ssl.enable=false
cluster3.efak.ssl.protocol=SSL
cluster3.efak.ssl.truststore.location=
cluster3.efak.ssl.truststore.password=
cluster3.efak.ssl.keystore.location=
cluster3.efak.ssl.keystore.password=
cluster3.efak.ssl.key.password=
cluster3.efak.ssl.endpoint.identification.algorithm=https
cluster3.efak.blacklist.topics=
cluster3.efak.ssl.cgroup.enable=false
cluster3.efak.ssl.cgroup.topics=

######################################
# kafka sqlite jdbc driver address
######################################
#efak.driver=org.sqlite.JDBC
#efak.url=jdbc:sqlite:/hadoop/kafka-eagle/db/ke.db
#efak.username=root
#efak.password=www.kafka-eagle.org

######################################
# kafka mysql jdbc driver address
######################################
efak.driver=com.mysql.cj.jdbc.Driver
efak.url=jdbc:mysql://127.0.0.1:3306/ke?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
efak.username=root
efak.password=root
```





```shell
cd $KE_HOME
bin/ke.sh start
```



```
Welcome to
    ______    ______    ___     __ __
   / ____/   / ____/   /   |   / //_/
  / __/     / /_      / /| |  / ,<
 / /___    / __/     / ___ | / /| |
/_____/   /_/       /_/  |_|/_/ |_|
( Eagle For Apache Kafka® )

Version v3.0.0 -- Copyright 2016-2022
*******************************************************************
* EFAK Service has started success.
* Welcome, Now you can visit 'http://192.168.0.100:8048'
* Account:admin ,Password:123456
*******************************************************************
* <Usage> ke.sh [start|status|stop|restart|stats] </Usage>
* <Usage> https://www.kafka-eagle.org/ </Usage>
*******************************************************************
```



介绍 https://juejin.cn/post/6971224791793532941

官网 http://www.kafka-eagle.org/

下载 https://github.com/smartloli/kafka-eagle-bin/tags

安装 http://www.kafka-eagle.org/articles/docs/installation/linux-macos.html



