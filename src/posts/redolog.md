---
title: MySQL —— Redo log
date: 2021-12-09 18:47:05
categories: MySQL
tags: 
  - MySQL
---



# RedoLog介绍

## 引言——MySQL如何做到事务的持久性

MySQL中如何修改数据呢，先从磁盘中加载数据页到InnoDB buffer pool中，然后从InnoDB buffer pool 中取出页面，进行读写操作。

那么如何做到事务的持久性呢，也就是说如何确保InnoDB buffer pool中的脏页一定会被刷新到磁盘从而做到持久化呢？

一种最简单的方法，在事务提交成功之前，确保脏页被刷新到磁盘，换句话说，只有在脏页写到磁盘上之后，事务提交才算成功。

不过这种方案有缺点：

1. **每次都刷新一个完整的页到磁盘性能开销很大**。比如，一个页面中只有几个字节被修改的时候，刷新完整的页面到磁盘很浪费。
2. **磁盘的随机IO很慢**，一个事务修改的很多页面可能并不相邻，这个时候每个事务结束前都这样同步刷新的磁盘随机IO代价很大。



MySQL采取的做法是，仅仅记录下那些修改的操作，譬如**修改某个表空间的某个页面的某个偏移量的某几个字节**，然后将这样的记录及时写到文件中。然后每次事务提交前只需要刷新这样的日志文件到磁盘即可。

而这样的日志文件就是 **rodo log** 了。



刷新redo-log而不是完整的数据页到磁盘的好处有：

1. redo日志相对来讲比较紧凑，占用的空间比较小；
2. redo日志是顺序写入磁盘的，磁盘的顺序IO效率很高。



## redo日志格式

redo log 包括两部分：

1. 一个是内存中的日志缓冲(redo log buffer)；

2. 另一个是磁盘上的日志文件(redo log file)。

下面依次介绍



1. type：这条redo日志的格式；
2. space ID：表空间 ID；
3. page number：页号；
4. data：这条redo日志的具体内容。



具体来说redo日志的种类有非常多，这里就不细谈了。

挖个坑。


## Mini-transaction 的概念



MySQL对底层页面的一次原子性的访问成为一个Mini-Transaction（MTR）

一个MTR产生多个redo日志。

之所以把它成为迷你的一个事务，是因为在进行崩溃恢复的时候需要把这一组redo日志作为一个不可分割的整体来处理。



<img src="./mtr.png" style="zoom:30%;" />



## redo日志的管理


### log block

redo日志放在大小为512字节的log block 中。每一个block被分为 3 部分：

+ log block header
+ log block body
+ log block trailer

而真正的redo日志是被放在占用 496 字节的 block body 中的。



### redo log buffer

为了解决磁盘速度过慢的问题，写入redo日志也不是直接立即写到磁盘中的。

于是，MySQL向操作系统申请了一大片内存，称为redo 日志缓冲区，也成为 redo buffer，

一个redo buffer有若干的 log block 构成。可以指定`innodb_log_buffer_size`来指定 log buffer 的大小。

向 log buffer 中写入redo日志也是顺序写入的。




## redo log的刷盘时机

redo日志总留在log buffer中，总是不安全的，只要没有写到稳定的存储介质（磁盘、固定硬盘等等）中就不能保证持久性。

那么在什么情况下，redo日志会被写到磁盘上呢？



1. 事务提交时：道理很好理解，事务提交还没有将redo log 刷盘就无法做到持久性；

2. log buffer 空间不足时：log buffer 这块内存总是有限大小的，那么在redo log不够使用时，也需要即使把redo log 刷新到磁盘。InnoDB在日志量达到总容量的额50% 时，就会刷盘；

3. 后台线程定时刷新；

4. 正常关闭服务器时；

5. 做checkpoint时。

   

## redo日志文件
之前谈的所有的redo log其实都是内存性的结构，那么存在在稳定介质中的便是 redo日志文件了。

磁盘上的日志文件不止一个，而是以一个日志文件组的形式出现，一个日志文件组由多个日志文件组成，名字形式为"ib_logfile[数字]"。
每个日志文件的大小由`innodb_log_file_size`指定，默认是 48 MB。
日志文件组文件的个数由`innodb_log_files_in_group`指定，默认是2个。

所以，总体的日志文件的大小便是**innodb_log_file_size*innodb_log_files_in_group**，

如果以循环的方法向redo日志文件中写入数据，那岂不是新写入的会覆盖旧写入的吗？

如何解决这个问题，MySQL提出了 checkpoint的概念（后面或介绍）。


每个日志的文件格式是一样的，日志组内的其他的日志文件也是具有相同的格式。

前2048个字节存储一些管理信息，后面的字节，实际上就是对内存中的log buffer的镜像。


## log-sequence-number相关

### lsn

InndoDB设计了名为lsn的全局变量，用来记录当前已经写入的**lsn**值，初始值为8704，然后不断递增。

lsn指的是写入的redo 日志量，这包括了写到了 log buffer 中但没有刷新到磁盘的redo日志。

### flushed_to_disk_lsn
相应的，InndoDB设计者提出了一个表示刷新到磁盘中的redo日志量的全局变量**flushed_to_disk_lsn**。

一开始，lsn等于flushed_to_disk_lsn，随着系统的运行，redo日志不断写入log buffer，但又没有即使刷盘，那么flushed_to_disk_lsn便和lsn拉开了差距。


### checkpoint_lsn
redo日志的大小总是有限的，那么就有必要对其进行重复利用。

具体的，如果redo日志对应的脏页已经刷新到磁盘，那么此时就没有必要再去保留这样的redo日志，

于是InnodB使用**checkpoint_lsn**表示当前系统中可以被覆盖redo日志总量是多少，这个变量的初始值也是8704。

MySQL中有后台线程在脏页刷新到磁盘的时候执行一次checkpoint操作，就是查看是否可以增加checkpoint_lsn（但是不是说只要刷新脏页就一定执行一次checkpoint操作）。



## innodb_flush_log_at_trx_commit

它的取值有3种：

+ 0 ：事务提交时不会立即向磁盘同步redo日志。这样会加快处理速度，但是失去持久性这一保证，不可取。
+ 1 ：事务提交时必须将redo日志同步到磁盘，这样可以保证事务的持久性。默认值就是1。
+ 2：这是一个折中的选择，事务提交的时候需要同步到操作系统的写磁盘的缓冲区，但不一定要真正写到磁盘上。所以，如果数据库挂了，但是操作系统还没挂，持久性还是可以保证的；反之，持久性还是无法保证。




# 崩溃恢复

redo日志最重要的甚至是唯一的功能就是在数据库崩溃的时候提供数据恢复的保证了。

崩溃恢复的时候先找到恢复的起点。然后顺着日志文件就可以将数据正确恢复起来。

但是这个过程可以加快。

为了避免页面的随机IO，可以实现将redo文件的所有redo文件按照**spaceID和pageNumber**
为键，然后组织成一张哈希表，然后遍历这张hash表就可以一次性完成对一个页面的恢复。
当然，同一个页面的redo日志必须安装时间顺序排序。
