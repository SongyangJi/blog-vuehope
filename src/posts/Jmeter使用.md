---
title: Jmeter使用
date: 2021-11-29 10:18:42
categories: 测试
tags:
  - Jmeter
  - 测试
---



## Add Threads（Users）添加线程组

**线程组主要参数详解**

1. 线程数：虚拟用户数。一个虚拟用户占用一个进程或线程。模拟多少用户访问也就填写多少个线程数量。
2. Ramp-Up时间(秒)：设置的虚拟用户数需要多长时间全部启动。如果线程数为`100`，准备时长为`5`，那么需要`5`秒钟启动`100`个线程，也就是每秒钟启动`20`个线程。 相当于每秒模拟`20`个用户进行访问，设置为零我理解为并发访问。
3. 循环次数：如果线程数为`100`，循环次数为`100`。那么总请求数为`100*100=10000` 。如果勾选了“永远”，那么所有线程会一直发送请求，直到选择停止运行脚本。



## Add Sample 添加取样器（）

### Add Sample HTTP Request 添加http接口测试（）

**Http请求主要参数详解**

+ 协议：向目标服务器发送HTTP请求协议，可以是`HTTP`或`HTTPS`，默认为`HTTP`。
+ 服务器名称或IP ：`HTTP`请求发送的目标服务器名称或`IP`。
+ 端口号：目标服务器的端口号，默认值为80
+ 方法：发送`HTTP`请求的方法，可用方法包括`GET`、`POST`、`HEAD`、`PUT`、`OPTIONS`、`TRACE`、`DELETE`等。
+ 路径：目标`URL`路径（`URL`中去掉服务器地址、端口及参数后剩余部分）。
+ 字符集编码：编码方式，默认为`ISO-8859-1`编码，这里配置为`utf-8`。
+ 参数：同请求一起发送参数 ，在请求中发送的`URL`参数，用户可以将`URL`中所有参数设置在本表中，表中每行为一个参数（对应`URL`中的 `key=value`），注意参数传入中文时需要勾选“编码”。



## 断言
### Add Assertions Json Assertion 添加Json断言（）

### Add Listener Assertion Results 添加断言结果（）



## 结果报告

### Add Listener View Results Tree 添加察看结果树（）

###  Add Listener Aggregate Report 添加聚合报告（）

**聚合报告参数详解**

1. Label：每个 `JMeter` 的 `element`（例如我这里只有一个 `Spring WebFlux`）都有一个 `Name` 属性，这里显示的就是 `Name` 属性的值。
2. 样本(Samples)：请求数——表示这次测试中一共发出了多少个请求，我这里模拟了`100`个用户循环`6`次也就为`100*6=600`。
3. 平均值(Average)：平均响应时间 (单位:`ms`)。默认是单个`Request`的平均响应时间，当使用了`Transaction Controller`时，也可以是`Transaction`为单位显示平均响应时间。
4. 中位数(Median)： 50％ 用户的响应时间。
5. 90% 百分位(Line)：90％用户的响应时间。相邻几个`*%`同意。
6. 最小值(Min)：最小响应时间。
7. 最大值(Max)：最大响应时间。
8. 异常(Error) %：错误率——错误请求数/请求总数。
9. 吞吐量(Throughput)：吞吐量——默认情况下表示每秒完成的请求数（`Request per Second`），当使用了 `Transaction Controller` 时，也可以表示类似 `LoadRunner` 的 `Transaction per Second` 数 。
10. 接收 KB/Sec：每秒从服务器端接收到的数据量，相当于`LoadRunner`中的`Throughput/Sec`。
11. 发送 KB/Sec：每秒向服务器发送的数据量，相当于`LoadRunner`中的`Throughput/Sec`。




> 一般而言，性能测试中我们需要重点关注的数据有： Samples、Average、Min、Max、Error、Throughput。





> [Apache JMeter 入门教程](https://www.jianshu.com/p/6bc152ca6126)
>
> [软件压力测试](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E5%8E%8B%E5%8A%9B%E6%B5%8B%E8%AF%95/10364657)

