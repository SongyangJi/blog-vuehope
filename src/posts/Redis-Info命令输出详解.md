---
title: Redis-Info命令输出详解
date: 2021-12-09 13:34:10
categories: Redis
tags:
  - NoSQL
  - Redis
---





# Redis Info 输出详解



Redis 的 info 命令是使用频率很高的一个命令，它主要是显示 Redis 服务器当前状态，故我们经常用于监控Redis 服务器。我收集了一些参数解释，方便随时查询

# Info命令简介

在使用Redis的过程中，可能会遇到很多问题，需要我们去诊断、去观察Redis的健康情况。Redis给我们提供了的 `info` 命令，可以让我们近距离的接触它，观察它各方面的信息、运行状况。下面让我们看看 `info` 命令都给我们带来了哪些信息。

命令格式：`INFO [section]`

Info 指令显示的信息分为 9 大块，每块都有很多参数。我们也可以通过给定可选的参数 section ，可以让命令只返回某一部分的信息。这 9 块分别是:

+ `server` 部分记录了 Redis 服务器的信息
+ `clients` 部分记录了已连接客户端的信息
+ `memory` 部分记录了服务器的内存信息
+ `persistence` 部分记录了跟 RDB 持久化和 AOF 持久化有关的信息
+ `stats` 部分记录了一般统计信息
+ `replication` 部分记录了主/从复制的相关信息
+ `cpu` 部分记录了 CPU 的计算量统计信息
+ `cluster` 部分记录了和集群有关的信息
+ `keyspace` 部分记录了数据库相关的统计信息

> 不同版本的 Redis 可能对返回的一些域进行了增加或删减。 因此，一个健壮的客户端程序在对 INFO [section] 命令的输出进行分析时，应该能够跳过不认识的域，并且妥善地处理丢失不见的域。

## 



## Server

| 参数名称          | 参数含义                                                     |
| ----------------- | ------------------------------------------------------------ |
| redis_version     | Redis 的服务器版本                                           |
| redis_git_sha1    | Redis 的服务器版本                                           |
| redis_git_dirty   | Git dirty flag                                               |
| redis_build_id    |                                                              |
| redis_mode        | 运行模式：单机（集群）                                       |
| os                | Redis 服务器的宿主操作系统                                   |
| arch_bits         | 架构（32 或 64 位）                                          |
| multiplexing_api  | Redis 所使用的事件处理机制，如epoll                          |
| gcc_version       | 编译 Redis 时所使用的 GCC 版本                               |
| process_id        | 服务器进程的 PID                                             |
| run_id            | Redis 服务器的随机标识符（用于 Sentinel 和集群）             |
| tcp_port          | TCP/IP 监听端口                                              |
| uptime_in_seconds | 自 Redis 服务器启动以来，经过的秒数                          |
| uptime_in_days    | 自 Redis 服务器启动以来，经过的天数                          |
| hz                | redis内部调度（进行关闭timeout的客户端，删除过期key等等）频率，程序规定serverCron每秒运行10次。 |
| lru_clock         | 以分钟为单位进行自增的时钟，用于 LRU 管理                    |
| executable        | 启动脚本路径                                                 |
| config_file       | 启动时指定的配置文件（redis.conf）路径                       |

## Clients

| 参数名称                   | 参数含义                                                   |
| -------------------------- | ---------------------------------------------------------- |
| connected_clients          | 已连接客户端的数量（不包括通过从属服务器连接的客户端）     |
| client_longest_output_list | 当前连接的客户端当中，最长的输出列表                       |
| client_longest_input_buf   | 当前连接的客户端当中，最大输入缓存                         |
| blocked_clients            | 正在等待阻塞命令（BLPOP、BRPOP、BRPOPLPUSH）的客户端的数量 |

## Memory

| 参数名称                  | 参数含义                                                     |
| ------------------------- | ------------------------------------------------------------ |
| used_memory               | 使用内存（B）                                                |
| used_memory_human         | 人类可读的格式的使用内存（MB）                               |
| used_memory_rss           | 操作系统角度，返回redis已分配的内存（即常驻内存），这个值和top、ps命令的输出一致 |
| used_memory_rss_human     | 如上                                                         |
| used_memory_peak          | 内存使用的峰值                                               |
| used_memory_peak_human    | 如上                                                         |
| total_system_memory       | 整个系统内存                                                 |
| total_system_memory_human | 如上                                                         |
| used_memory_lua           | Lua脚本存储占用的内存                                        |
| used_memory_lua_human     | 如上                                                         |
| maxmemory                 | Redis实例的最大内存配置                                      |
| maxmemory_human           | 如上                                                         |
| maxmemory_policy          | 当达到maxmemory时的淘汰策略                                  |
| mem_fragmentation_ratio   | used_memory_rss/used_memory的值。一般情况下，used_memory_rss略高于used_memory，当内存碎片较多时，则mem_fragmentation_ratio会较大，可以反映内存碎片是否很多 |
| mem_allocator             | 内存分配器。可以是libc 、 jemalloc 或者 tcmalloc             |

在理想情况下， `used_memory_rss` 的值应该只比 `used_memory` 稍微高一点儿。 当 `rss > used` ，且两者的值相差较大时，表示存在（内部或外部的）内存碎片。 内存碎片的比率可以通过 `mem_fragmentation_ratio` 的值看出。 当 `used > rss` 时，表示 Redis 的部分内存被操作系统换出到交换空间（swap）了，在这种情况下，操作可能会产生明显的延迟，需要重点关注。即：`mem_fragmentation_ratio` 小于1时

## Persistence

| 参数名称                      | 参数含义                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| loading                       | 服务器是否正在载入持久化文件                                 |
| rdb_changes_since_last_save   | 离最近一次成功生成rdb文件，写入命令的个数                    |
| rdb_bgsave_in_progress        | 服务器是否正在创建rdb文件                                    |
| rdb_last_save_time            | 最近一次成功rdb文件的时间戳                                  |
| rdb_last_bgsave_status        | 最近一次成功rdb文件的状态                                    |
| rdb_last_bgsave_time_sec      | 最近一次成功rdb文件的耗时                                    |
| rdb_current_bgsave_time_sec   | 若当前正在创建rdb文件，指当前的创建操作已经耗费的时间        |
| aof_enabled                   | aof是否开启                                                  |
| aof_rewrite_in_progress       | aof的rewrite操作是否在进行中                                 |
| aof_rewrite_scheduled         | rewrite任务计划，当客户端发送bgrewriteaof指令，如果当前rewrite子进程正在执行，那么将客户端请求的bgrewriteaof变为计划任务，待aof子进程结束后执行rewrite |
| aof_last_rewrite_time_sec     | 最近一次aof rewrite耗费时长                                  |
| aof_current_rewrite_time_sec  | 若当前正在执行aof rewrite，指当前的已经耗费的时间            |
| aof_last_bgrewrite_status     | 最近一次aof bgrewrite的状态                                  |
| aof_last_write_status         | 最近一次aof写入状态                                          |
| 开启 aof 后增加的一些info信息 |                                                              |
| aof_current_size              | aof文件当前大小                                              |
| aof_base_size                 | 服务器启动时或者最近一次AOF重写后，文件的大小                |
| aof_pending_rewrite           | 同上面的aof_rewrite_scheduled                                |
| aof_buffer_length             | aof 缓冲区的大小                                             |
| aof_rewrite_buffer_length     | aof 重写缓冲区的大小                                         |
| aof_pending_bio_fsync         | 后台IO队列中，等待fsync任务的个数                            |
| aof_delayed_fsync             | 被延迟的 fsync 调用数量                                      |

## Stats

| 参数名称                   | 参数含义                                                     |
| -------------------------- | ------------------------------------------------------------ |
| total_connections_received | 自启动起连接过的总数。如果连接过多，说明短连接严重或连接池使用有问题，需调研代码的连接设置 |
| total_commands_processed   | 自启动起运行命令的总数                                       |
| instantaneous_ops_per_sec  | 每秒执行的命令数，相当于QPS                                  |
| total_net_input_bytes      | 网络入口流量字节数                                           |
| total_net_output_bytes     | 网络出口流量字节数                                           |
| instantaneous_input_kbps   | 网络入口kps                                                  |
| instantaneous_output_kbps  | 网络出口kps                                                  |
| rejected_connections       | 拒绝的连接个数，由于maxclients限制，拒绝新连接的个数         |
| sync_full                  | 主从完全同步成功次数                                         |
| sync_partial_ok            | 主从部分同步成功次数                                         |
| sync_partial_err           | 主从部分同步失败次数                                         |
| expired_keys               | 自启动起过期的key的总数                                      |
| evicted_keys               | 使用内存大于maxmemory后，淘汰的key的总数                     |
| keyspace_hits              | 在main dictionary字典中成功查到的key个数                     |
| keyspace_misses            | 同上，未命中的key的个数                                      |
| pubsub_channels            | 发布/订阅频道数                                              |
| pubsub_patterns            | 发布/订阅模式数                                              |
| latest_fork_usec           | 上次的fork操作使用的时间（单位ms）                           |
| migrate_cached_sockets     | 是否已经缓存了到该地址的连接                                 |
| slave_expires_tracked_keys | 从实例到期key数量                                            |
| active_defrag_hits         | 主动碎片整理命中次数                                         |
| active_defrag_misses       | 主动碎片整理未命中次数                                       |
| active_defrag_key_hits     | 主动碎片整理key命中次数                                      |
| active_defrag_key_misses   | 主动碎片整理key未命中次数                                    |

## Replication

| 参数名称                       | 参数含义                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| role                           | 当前实例的角色master还是slave                                |
| connected_slaves:              | slave的数量                                                  |
| master_replid                  | 主实例启动随机字符串                                         |
| master_replid2                 | 主实例启动随机字符串2                                        |
| slave0                         | slave机器的信息、状态                                        |
| master_repl_offset             | 主从同步偏移量,此值如果和上面的offset相同说明主从一致没延迟，与master_replid可被用来标识主实例复制流中的位置。 |
| second_repl_offset             | 主从同步偏移量2,此值如果和上面的offset相同说明主从一致没延迟 |
| repl_backlog_active            | 复制缓冲区是否开启                                           |
| repl_backlog_size              | 复制缓冲区大小                                               |
| repl_backlog_first_byte_offset | 复制缓冲区里偏移量的大小                                     |
| repl_backlog_histlen           | 此值等于 master_repl_offset - repl_backlog_first_byte_offset,该值不会超过repl_backlog_size的大小 |

## CPU

| 参数名称               | 参数含义                   |
| ---------------------- | -------------------------- |
| used_cpu_sys           | Redis 服务器耗费的系统 CPU |
| used_cpu_user          | Redis 服务器耗费的用户 CPU |
| used_cpu_sys_children  | 后台进程耗费的系统 CPU     |
| used_cpu_user_children | 后台进程耗费的用户 CPU     |

## Keyspace

| 参数名称                   | 参数含义                                                     |
| -------------------------- | ------------------------------------------------------------ |
| dbXXX:keys=XXX,expires=XXX | 各个数据库（0-15）的 key 的数量，带有生存期的 key 的数量，平均存活时间 |







**实例**

```shell
# Server
redis_version:3.2.3					 # Redis 的版本
redis_git_sha1:00000000				 # Redis 的版本
redis_git_dirty:0
redis_build_id:9e93d0c7997bcfef
redis_mode:standalone				 # 运行模式：单机（集群）
os:Linux 2.6.32-431.el6.x86_64 x86_64 # 操作系统
arch_bits:64						  # 操作系统位数
multiplexing_api:epoll				 # redis所使用的事件处理机制
gcc_version:4.4.7					 # gcc版本号
process_id:1606						 # 当前 Redis 服务器进程id
run_id:17e79b1966f1f891eff203a8e496151ee8a3a7a7
tcp_port:7001						 # 端口号
uptime_in_seconds:4360189			 # 运行时间(秒)
uptime_in_days:50					 # 运行时间(天)
hz:10								 # redis内部调度（进行关闭timeout的客户端，删除过期key等等）频率，程序规定serverCron每秒运行10次。
lru_clock:5070330					 # Redis的逻辑时钟
executable:/usr/local/bin/redis-server			# 启动脚本路径
config_file:/opt/redis3/conf/redis_7001.conf	# 启动指定的配置文件路径

# Clients
connected_clients:660				 # 连接的客户端数量
client_longest_output_list:0		 # 当前连接的客户端当中，最长的输出列表
client_biggest_input_buf:0			 # 当前连接的客户端当中，最大输入缓存
blocked_clients:0					 # 阻塞的客户端数量

# Memory
used_memory:945408832				# 使用内存（B）
used_memory_human:901.61M			# 使用内存（MB）	
used_memory_rss:1148919808			# 系统给redis分配的内存（即常驻内存），这个值和top命令的输出一致
used_memory_rss_human:1.07G
used_memory_peak:1162079480			# 内存使用的峰值
used_memory_peak_human:1.08G		
total_system_memory:6136483840		# 整个系统内存
total_system_memory_human:5.72G
used_memory_lua:122880				# Lua脚本存储占用的内存
used_memory_lua_human:120.00K		
maxmemory:2147483648				# Redis实例的最大内存配置
maxmemory_human:2.00G
maxmemory_policy:allkeys-lru		# 当达到maxmemory时的淘汰策略
mem_fragmentation_ratio:1.22		# used_memory_rss/used_memory的比例。一般情况下，used_memory_rss略高于used_memory，当内存碎片较多时，则mem_fragmentation_ratio会较大，可以反映内存碎片是否很多
mem_allocator:jemalloc-4.0.3		# 内存分配器

# Persistence	
loading:0								  # 服务器是否正在载入持久化文件
rdb_changes_since_last_save:82423954	  #	离最近一次成功生成rdb文件，写入命令的个数                      
rdb_bgsave_in_progress:0		          # 服务器是否正在创建rdb文件           
rdb_last_save_time:1560991229		      # 最近一次成功rdb文件的时间戳               
rdb_last_bgsave_status:ok		          # 最近一次成功rdb文件的状态           
rdb_last_bgsave_time_sec:-1		          # 最近一次成功rdb文件的耗时            
rdb_current_bgsave_time_sec:-1		      # 若当前正在创建rdb文件，指当前的创建操作已经耗费的时间                
aof_enabled:0		                      # aof是否开启
aof_rewrite_in_progress:0		          # aof的rewrite操作是否在进行中            
aof_rewrite_scheduled:0		              # rewrite任务计划，当客户端发送bgrewriteaof指令，如果当前rewrite子进程正在执行，那么将客户端请求的bgrewriteaof变为计划任务，待aof子进程结束后执行rewrite        
aof_last_rewrite_time_sec:-1		      # 最近一次aof rewrite耗费时长              
aof_current_rewrite_time_sec:-1		      # 若当前正在执行aof rewrite，指当前的已经耗费的时间                
aof_last_bgrewrite_status:ok		      # 最近一次aof bgrewrite的状态         
aof_last_write_status:ok		          # 最近一次aof写入状态  

# 开启aof后增加的一些info信息
-----------------------------  
aof_current_size:0                 # aof当前大小
aof_base_size:0                    # aof上次启动或rewrite的大小
aof_pending_rewrite:0              # 同上面的aof_rewrite_scheduled
aof_buffer_length:0                # aof buffer的大小
aof_rewrite_buffer_length:0        # aof rewrite buffer的大小
aof_pending_bio_fsync:0            # 后台IO队列中等待fsync任务的个数
aof_delayed_fsync:0                # 延迟的fsync计数器 
-----------------------------           

# Stats
total_connections_received:15815		# 自启动起连接过的总数。如果连接过多，说明短连接严重或连接池使用有问题，需调研代码的连接设置
total_commands_processed:502953838      # 自启动起运行命令的总数
instantaneous_ops_per_sec:7             # 每秒执行的命令数，相当于QPS
total_net_input_bytes:532510481889      # 网络入口流量字节数
total_net_output_bytes:1571444057940    # 网络出口流量字节数
instantaneous_input_kbps:0.37           # 网络入口kps
instantaneous_output_kbps:0.59          # 网络出口kps
rejected_connections:0                  # 拒绝的连接个数，由于maxclients限制，拒绝新连接的个数
sync_full:1                             # 主从完全同步成功次数
sync_partial_ok:0                       # 主从部分同步成功次数
sync_partial_err:0                      # 主从部分同步失败次数
expired_keys:4404930                    # 自启动起过期的key的总数
evicted_keys:0                          # 使用内存大于maxmemory后，淘汰的key的总数
keyspace_hits:337104556                 # 在main dictionary字典中成功查到的key个数
keyspace_misses:22865229                # 同上，未命中的key的个数
pubsub_channels:1                       # 发布/订阅频道数
pubsub_patterns:0                       # 发布/订阅模式数
latest_fork_usec:707                    # 上次的fork操作使用的时间（单位ms）
migrate_cached_sockets:0                # 是否已经缓存了到该地址的连接
slave_expires_tracked_keys:0			# 从实例到期key数量
active_defrag_hits:0                    # 主动碎片整理命中次数
active_defrag_misses:0                  # 主动碎片整理未命中次数
active_defrag_key_hits:0                # 主动碎片整理key命中次数
active_defrag_key_misses:0              # 主动碎片整理key未命中次数


# Replication
role:master							  # 当前实例的角色master还是slave
connected_slaves:1					  # slave的数量
master_replid:8f81c045a2cb00f16a7fc5c90a95e02127413bcc		# 主实例启动随机字符串
master_replid2:0000000000000000000000000000000000000000     # 主实例启动随机字符串2
slave0:ip=172.17.12.251,port=7002,state=online,offset=506247209326,lag=1	# slave机器的信息、状态
master_repl_offset:506247209478		  # 主从同步偏移量,此值如果和上面的offset相同说明主从一致没延迟，与master_replid可被用来标识主实例复制流中的位置。
second_repl_offset					  # 主从同步偏移量2,此值如果和上面的offset相同说明主从一致没延迟
repl_backlog_active:1				  # 复制缓冲区是否开启
repl_backlog_size:157286400			  # 复制缓冲区大小
repl_backlog_first_byte_offset:506089923079		# 复制缓冲区里偏移量的大小
repl_backlog_histlen:157286400		  # 此值等于 master_repl_offset - repl_backlog_first_byte_offset,该值不会超过repl_backlog_size的大小

# CPU
used_cpu_sys:6834.06				  # 将所有redis主进程在核心态所占用的CPU时求和累计起来
used_cpu_user:8282.10				  # 将所有redis主进程在用户态所占用的CPU时求和累计起来
used_cpu_sys_children:0.11			  # 后台进程的核心态cpu使用率
used_cpu_user_children:0.91           # 后台进程的用户态cpu使用率

# Cluster
cluster_enabled:0		# 实例是否启用集群模式

# Keyspace		# 各个数据库（0-15）的 key 的数量，带有生存期的 key 的数量，平均存活时间
db0:keys=267906,expires=109608,avg_ttl=3426011859194
db1:keys=182,expires=179,avg_ttl=503527626
db8:keys=6,expires=0,avg_ttl=0
db15:keys=2,expires=0,avg_ttl=0
```

