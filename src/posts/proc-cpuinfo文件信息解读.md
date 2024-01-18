---
title: Linux——/proc/cpuinfo文件信息解读
date: 2023-04-08 16:08:42
categories: Linux
tags:
---

在linux系统中，提供了/proc目录下文件，显示系统的软硬件信息。如果想了解系统中CPU的提供商和相关配置信息，则可以查/proc/cpuinfo。但是此文件输出项较多，不易理解。例如我们想获取，有多少颗物理CPU，每个物理cpu核心数，以及超线程是否开启等信息。



# 明确物理CPU、核数、逻辑cpu数的概念

①物理CPU数（physical id）：主板上实际插入的cpu数量，可以数不重复的 physical id 有几个

②CPU核心数（cpu cores）：单块CPU上面能处理数据的芯片组的数量，如双核、四核等 

③逻辑CPU数：一般情况下，

　　逻辑CPU=物理CPU个数×每颗核数   　#不支持超线程技术或没有开启此技术

　　逻辑CPU=物理CPU个数×每颗核数 *2 　 #表示服务器的CPU支持超线程技术（简单来说，它可使处理器中的1 颗内核如2 颗内核那样在操作系统中发挥作用。这样一来，操作系统可使用的执行资源扩大了一倍，大幅提高了系统的整体性能）





# 输出条目解读

```shell
cat /proc/cpuinfo
```

输出

```shell
processor       : 0
vendor_id       : GenuineIntel
cpu family      : 6
model           : 44
model name      : Intel(R) Xeon(R) CPU           E5620  @ 2.40GHz
stepping        : 2
microcode       : 0x1f
cpu MHz         : 1729.000
cache size      : 12288 KB
physical id     : 0
siblings        : 8
core id         : 0
cpu cores       : 4
apicid          : 0
initial apicid  : 0
fpu             : yes
fpu_exception   : yes
cpuid level     : 11
wp              : yes
```

1. processor　：系统中逻辑处理核心数的编号，从0开始排序。
2. vendor_id　：CPU制造商
3. cpu family　：CPU产品系列代号
4. model　　　：CPU属于其系列中的哪一代的代号
5. model name：CPU属于的名字及其编号、标称主频
6. stepping　 ：CPU属于制作更新版本
7. cpu MHz　 ：CPU的实际使用主频
8. cache size ：CPU二级缓存大小
9. physical id ：单个物理CPU的标号
10. siblings ：单个物理CPU的逻辑CPU数。siblings=cpu cores [*2]。
11. core id ：当前物理核在其所处CPU中的编号，这个编号不一定连续。
12. cpu cores ：该逻辑核所处CPU的物理核数。比如此处cpu cores 是4个，那么对应core id 可能是 1、3、4、5。
13. apicid ：用来区分不同逻辑核的编号，系统中每个逻辑核的此编号必然不同，此编号不一定连续
14. fpu ：是否具有浮点运算单元（Floating Point Unit）
15. fpu_exception ：是否支持浮点计算异常
16. cpuid level ：执行cpuid指令前，eax寄存器中的值，根据不同的值cpuid指令会返回不同的内容
17. wp ：表明当前CPU是否在内核态支持对用户空间的写保护（Write Protection）

# 快速查看信息

1. 查看物理CPU个数

```shell
cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l
```

2. 查看每个物理CPU中core的个数(即核数)

```shell
cat /proc/cpuinfo | grep "cpu cores" | uniq
```

3. 查看逻辑CPU的个数

```shell
cat /proc/cpuinfo | grep "processor" | wc -l
```

4. 查看CPU信息（型号）

```shell
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
```

5. 查看是否开启超线程技术（只有intel的处理器支持）
如果启用此技术那么，每个物理核心又可分为两个逻辑处理器。
```shell
cat /proc/cpuinfo | grep -e "cpu cores"  -e "siblings" | sort | uniq
```
如果cpu cores数量和siblings数量一致，则没有启用超线程，否则超线程被启用。





> 关于超线程
>
> [什么是超线程？—— 英特尔](https://www.intel.cn/content/www/cn/zh/gaming/resources/hyper-threading.html)
>
> [CPU工作方式、多核心、超线程技术详解](https://zhuanlan.zhihu.com/p/52112475)

