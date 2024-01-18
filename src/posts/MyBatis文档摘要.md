---
title: MyBatis文档摘要
date: 2021-08-06
categories: MyBatis
tags:
  - MyBatis
  - 文档系列
---



# 配置文件

MyBatis 的配置文件的层次结构：

+ configuration（配置）
  + properties（属性）
  + settings（设置）
  + typeAliases（类型别名）
  + typeHandlers（类型处理器）
  + objectFactory（对象工厂）
  + plugins（插件）
  + environments（环境配置）
     + environment（环境变量）
        + transactionManager（事务管理器）
        + dataSource（数据源）
  + databaseIdProvider（数据库厂商标识）
  + mappers（映射器）



## 属性（properties）



## 设置（settings）



### 对象关系映射相关

| 设置名                   | 描述                                                         | 有效值              | 默认值  |
| :----------------------- | :----------------------------------------------------------- | :------------------ | :------ |
| autoMappingBehavior      | 指定 MyBatis 应如何自动映射列到字段或属性。 NONE 表示关闭自动映射；PARTIAL 只会自动映射没有定义嵌套结果映射的字段。 FULL 会自动映射任何复杂的结果集（无论是否嵌套）。 | NONE, PARTIAL, FULL | PARTIAL |
| mapUnderscoreToCamelCase | 是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。 | true \| false       | False   |
| autoMappingUnknownColumnBehavior |指定发现自动映射目标未知列（或未知属性类型）的行为。`NONE`: 不做任何反应`WARNING`: 输出警告日志（`'org.apache.ibatis.session.AutoMappingUnknownColumnBehavior'` 的日志等级必须设置为 `WARN`）`FAILING`: 映射失败 (抛出 `SqlSessionException`)|NONE, WARNING, FAILING||



### 缓存相关
| 设置名          | 描述                                                         | 有效值               | 默认值  |
| :-------------- | :----------------------------------------------------------- | :------------------- | ------- |
| cacheEnabled    | 全局性地开启或关闭所有映射器配置文件中已配置的任何缓存。     | true \| false        | true    |
| localCacheScope | MyBatis 利用本地缓存机制（Local Cache）防止循环引用和加速重复的嵌套查询。 默认值为 SESSION，会缓存一个会话中执行的所有查询。 若设置值为 STATEMENT，本地缓存将仅用于执行语句，对相同 SqlSession 的不同查询将不会进行缓存。 | SESSION \| STATEMENT | SESSION |
|                 |                                                              |                      |         |



### 数据库连接与执行器相关

| 设置名                  | 描述                                                         | 有效值             | 默认值        |
| :---------------------- | :----------------------------------------------------------- | :----------------- | ------------- |
| defaultStatementTimeout | 设置超时时间，它决定数据库驱动等待数据库响应的秒数。         | 任意正整数         | 未设置 (null) |
| defaultExecutorType     | 配置默认的执行器。SIMPLE 就是普通的执行器；REUSE 执行器会重用预处理语句（PreparedStatement）； BATCH 执行器不仅重用语句还会执行批量更新。 | SIMPLE REUSE BATCH | SIMPLE        |
|                         |                                                              |                    |               |



### 日志相关

| 设置名    | 描述                                                  | 有效值                                                       | 默认值 |
| :-------- | :---------------------------------------------------- | :----------------------------------------------------------- | ------ |
| logPrefix | 指定 MyBatis 增加到日志名称的前缀。                   | 任何字符串                                                   | 未设置 |
| logImpl   | 指定 MyBatis 所用日志的具体实现，未指定时将自动查找。 | SLF4J \| LOG4J \| LOG4J2 \| JDK_LOGGING \| COMMONS_LOGGING \| STDOUT_LOGGING \| NO_LOGGING | 未设置 |



## 类型别名（typeAliases）



## 类型处理器（typeHandlers）
