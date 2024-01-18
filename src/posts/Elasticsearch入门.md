---
title: Elasticsearch入门
date: 2021-10-23 20:29:14
categories: Elasticsearch
tags:
  - Elasticsearch
---



# 背景知识

## Elaticsearch Stack 简介
Elaticsearch，简称为es， es是一个高扩展的、**分布式**的、**RESTful 风格**的**搜索和数据分析引擎**。

它可以近乎实时的存储、检索数据。本身扩展性很好，可以扩展到上百台服务器，处理PB级别的数据。

Es也使用**Java开发**并使用Lucene作为其核心来实现所有索引和搜索的功能，但是它的目的是通过简单的RESTful API来隐藏Lucene的复杂性，从而让全文搜索变得简单。

## Kibana简介
Kibana 是一个免费且开放的用户界面，能够让您对 Elasticsearch 数据进行可视化，并让您在 Elastic Stack 中进行导航。您可以进行各种操作，从跟踪查询负载，到理解请求如何流经您的整个应用，都能轻松完成。

Es技术栈还有其他工具，目前介绍这两个。


# 安装
下面是二者下载链接，下载相应的版本即可。

[elasticsearch下载](https://www.elastic.co/cn/downloads/elasticsearch)

[kibana下载](https://www.elastic.co/cn/downloads/kibana)

或者对于mac用户直接使用brew安装启动即可（学习环境使用）



(M1的mac)

+ 安装 elasticsearch

```shell
brew install elastic/tap/elasticsearch-full
```

+ 安装 kibana 

```shell
brew install elastic/tap/kibana-full
```

分别启动。

```shell
brew services start elasticsearch-full
```


```shell
brew services start kibana-full
```


访问

es的默认端口 9200： http://localhost:9200/

kibana的默认端口 5601： http://localhost:5601/




注意：9300是tcp通讯端口，集群间和TCPClient都使用该端口，9200是http协议的RESTful接口。



如果正常展示web界面，以及如下文字，说明安装启动一切正常。

```json
{
  "name" : "SongyangJi-MacBookAir.local",
  "cluster_name" : "elasticsearch_jisongyang",
  "cluster_uuid" : "wCrPSWgyQnCCCVCr0Hhc1g",
  "version" : {
    "number" : "7.14.2",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "6bc13727ce758c0e943c3c21653b3da82f627f75",
    "build_date" : "2021-09-15T10:18:09.722761972Z",
    "build_snapshot" : false,
    "lucene_version" : "8.9.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

# Elasticsearch相关概念术语

## 关系型数据库的比较与联系

| 数据库实例/Es集群 | 库/索引   | 表/类型 | 行/文档   | 列/字段 |
| ----------------- | --------- | ------- | --------- | ------- |
| RelationalDB      | Databases | Tables  | Rows      | Columns |
| Elasticsearch     | Indexes   | Types   | Documents | Fields  |


## 核心概念
+ index (索引)
一个索引就是一个拥有几分相似特征的文档的集合。

+ type（类型）
在一个索引中，你可以定义一种或多种类型。一个类型是你的索引的一个逻辑上的分类/分区，其语义完全由你来定。通常，会为具有一组共同字段的文档定义一个类型。

不过，明显上述的概念定义是有点模糊的（不像关系型数据库的库表关系那样泾渭分明），所以在后来的版本中就取消了type这个语义。

+ document 文档
  一个文档是一个可被索引的基础信息单元。文档以JSON（Javascript Object Notation）格式来表示，而JSON是一个到处存在的互联网数据交互格式。在一个index，你可以存储任意多的文档。


+ field 字段

  相当于是数据表的字段，对文档数据根据不同属性进行的分类标识，也就是 Json 中的键。



+ mapping 映射

  **mapping是处理数据的方式和规则方面做一些限制**，如某个字段的数据类型、默认值、分析器、是否被索引等等，这些都是映射里面可以设置的，其它就是处理es里面数据的一些使用规则设置也叫做映射，按着最优规则处理数据对性能提高很大，因此才需要建立映射，并且需要思考如何建立映射才能对性能更好。

  

# 与 Elasticsearch 交互

你可以

+ 使用elasticsearch提供的UI工具
  1. elasticsearch-head插件
  2. kibana的dev-tools
+ 使用elasticsearch提供的Restful接口直接访问
  1. cURL
  2. postman
+ 使用elasticsearch提供的API进行访问
  也就是用程序调api去与es交互，也是程序开发者的最关心的交互方式。



## curl

如果使用curl的话

+ 语法

```shell
curl -X<VERB> '<PROTOCOL>://<HOST>:<PORT>/<PATH>?<QUERY_STRING>' -d '<BODY>'
```



各字段的含义：

| `VERB`         | 适当的 HTTP *方法* 或 *谓词* : `GET`、 `POST`、 `PUT`、 `HEAD` 或者 `DELETE`。 |
| -------------- | ------------------------------------------------------------ |
| `PROTOCOL`     | `http` 或者 `https`（如果你在 Elasticsearch 前面有一个 `https` 代理） |
| `HOST`         | Elasticsearch 集群中任意节点的主机名，或者用 `localhost` 代表本地机器上的节点。 |
| `PORT`         | 运行 Elasticsearch HTTP 服务的端口号，默认是 `9200` 。       |
| `PATH`         | API 的终端路径（例如 `_count` 将返回集群中文档数量）。Path 可能包含多个组件，例如：`_cluster/stats` 和 `_nodes/stats/jvm` 。 |
| `QUERY_STRING` | 任意可选的查询字符串参数 (例如 `?pretty` 将格式化地输出 JSON 返回值，使其更容易阅读) |
| `BODY`         | 一个 JSON 格式的请求体 (如果请求需要的话)                    |




## 使用kibana

在kibana的开发者工具[console](http://localhost:5601/app/dev_tools#/console)。

以下为 **version 7.14.2** 的示范操作。

### 索引的CRUD

#### 创建索引

```http
PUT /problem
```

返回值

```json
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "problem"
}
```



#### 查看索引

```http
GET /problem
```

只介绍其中几个字段的含义：

```json
{
  "problem" : {
    "aliases" : { }, // 索引的别名
    "mappings" : { }, // mapping的规则
    "settings" : {  
      "index" : {
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",  // 分片的数量，低版本的默认值是5，现在默认是1
        "provided_name" : "problem", 
        "creation_date" : "1635053207532", // 创建时间戳
        "number_of_replicas" : "1",  // 备份的数量
        "uuid" : "HfPT1GNyTTmYAXCSjIVoVA",
        "version" : {  
          "created" : "7140299"
        }
      }
    }
  }
}

```


#### 删除索引
```http
DELETE /index
```

```json
{
  "acknowledged" : true
}
```



### 文档的CRUD

#### 创建文档
```
POST problem/_doc
{
    "difficult_level": "简单",
    "id": "1486",
    "name": "数组异或操作",
    "passing_rate": "84.3%",
    "passing_rate_number": 0.843,
    "solutions": 381,
    "uri": "xor-operation-in-an-array"
}
```

```json
{
  "_index" : "problem",
  "_type" : "_doc",
  "_id" : "SJ7bsHwBtcEm-AFPQqjS", // 此id便是自动生成的
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

插入完文档后，可以看看这个index的信息。

```json
{
  "problem" : {
    "aliases" : { },
    // 发现 mappings 信息多了出来，主要是刚刚插入的json串的键的信息，如类型，名称等等
    "mappings" : { 
      "properties" : {
        "difficult_level" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "id" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "name" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "passing_rate" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "passing_rate_number" : {
          "type" : "float"
        },
        "solutions" : {
          "type" : "long"
        },
        "uri" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        }
      }
    },
    "settings" : {
      "index" : {
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",
        "provided_name" : "problem",
        "creation_date" : "1635053636611",
        "number_of_replicas" : "1",
        "uuid" : "v12NNzubQ1u9g6x9wN9W0A",
        "version" : {
          "created" : "7140299"
        }
      }
    }
  }
}
```





#### 查询文档

搜索API的最基础的形式是没有指定任何查询的空搜索，它简单地返回集群中所有索引下的所有文档：
```
GET /_search
```



这里我们搜索刚才创建的problem的索引

```
GET problem/_search
```



```json
{
  "took" : 2, // 执行整个搜索请求耗费了多少毫秒
  "timed_out" : false, // 是否超时, 可以指定 timeout 为 10 或者 10ms（10毫秒），或者 1s（1秒）如，GET /_search?timeout=10ms

  "_shards" : { // 在查询中参与分片的总数，以及这些分片成功了多少个失败了多少个
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : { // 结果中最重要的部分是 hits
    "total" : { // 配到的文档总数
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0, // 查询所匹配文档的 _score 的最大值
    "hits" : [
      {
        "_index" : "problem",
        "_type" : "_doc",
        "_id" : "SJ7bsHwBtcEm-AFPQqjS", // 自动生成的id
        "_score" : 1.0, // 衡量了文档与查询的匹配程度,  返回的文档是按照 _score 降序排列的
        "_source" : { // 源文档，是你自己添加的文档
          "difficult_level" : "简单",
          "id" : "1486",
          "name" : "数组异或操作",
          "passing_rate" : "84.3%",
          "passing_rate_number" : 0.843,
          "solutions" : 381,
          "uri" : "xor-operation-in-an-array"
        }
      }
    ]
  }
}
```






# 相关链接

[Elasticsearch: 权威指南（中文）](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html)

[Elasticsearch Guide](https://www.elastic.co/guide/en/elasticsearch/reference/7.15/index.html)


[Spring 整合 Elasticsearch](https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#reference)

