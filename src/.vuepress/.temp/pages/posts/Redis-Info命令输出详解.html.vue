<template><div><h1 id="redis-info-输出详解" tabindex="-1"><a class="header-anchor" href="#redis-info-输出详解" aria-hidden="true">#</a> Redis Info 输出详解</h1>
<p>Redis 的 info 命令是使用频率很高的一个命令，它主要是显示 Redis 服务器当前状态，故我们经常用于监控Redis 服务器。我收集了一些参数解释，方便随时查询</p>
<h1 id="info命令简介" tabindex="-1"><a class="header-anchor" href="#info命令简介" aria-hidden="true">#</a> Info命令简介</h1>
<p>在使用Redis的过程中，可能会遇到很多问题，需要我们去诊断、去观察Redis的健康情况。Redis给我们提供了的 <code v-pre>info</code> 命令，可以让我们近距离的接触它，观察它各方面的信息、运行状况。下面让我们看看 <code v-pre>info</code> 命令都给我们带来了哪些信息。</p>
<p>命令格式：<code v-pre>INFO [section]</code></p>
<p>Info 指令显示的信息分为 9 大块，每块都有很多参数。我们也可以通过给定可选的参数 section ，可以让命令只返回某一部分的信息。这 9 块分别是:</p>
<ul>
<li><code v-pre>server</code> 部分记录了 Redis 服务器的信息</li>
<li><code v-pre>clients</code> 部分记录了已连接客户端的信息</li>
<li><code v-pre>memory</code> 部分记录了服务器的内存信息</li>
<li><code v-pre>persistence</code> 部分记录了跟 RDB 持久化和 AOF 持久化有关的信息</li>
<li><code v-pre>stats</code> 部分记录了一般统计信息</li>
<li><code v-pre>replication</code> 部分记录了主/从复制的相关信息</li>
<li><code v-pre>cpu</code> 部分记录了 CPU 的计算量统计信息</li>
<li><code v-pre>cluster</code> 部分记录了和集群有关的信息</li>
<li><code v-pre>keyspace</code> 部分记录了数据库相关的统计信息</li>
</ul>
<blockquote>
<p>不同版本的 Redis 可能对返回的一些域进行了增加或删减。 因此，一个健壮的客户端程序在对 INFO [section] 命令的输出进行分析时，应该能够跳过不认识的域，并且妥善地处理丢失不见的域。</p>
</blockquote>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h2 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> Server</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>redis_version</td>
<td>Redis 的服务器版本</td>
</tr>
<tr>
<td>redis_git_sha1</td>
<td>Redis 的服务器版本</td>
</tr>
<tr>
<td>redis_git_dirty</td>
<td>Git dirty flag</td>
</tr>
<tr>
<td>redis_build_id</td>
<td></td>
</tr>
<tr>
<td>redis_mode</td>
<td>运行模式：单机（集群）</td>
</tr>
<tr>
<td>os</td>
<td>Redis 服务器的宿主操作系统</td>
</tr>
<tr>
<td>arch_bits</td>
<td>架构（32 或 64 位）</td>
</tr>
<tr>
<td>multiplexing_api</td>
<td>Redis 所使用的事件处理机制，如epoll</td>
</tr>
<tr>
<td>gcc_version</td>
<td>编译 Redis 时所使用的 GCC 版本</td>
</tr>
<tr>
<td>process_id</td>
<td>服务器进程的 PID</td>
</tr>
<tr>
<td>run_id</td>
<td>Redis 服务器的随机标识符（用于 Sentinel 和集群）</td>
</tr>
<tr>
<td>tcp_port</td>
<td>TCP/IP 监听端口</td>
</tr>
<tr>
<td>uptime_in_seconds</td>
<td>自 Redis 服务器启动以来，经过的秒数</td>
</tr>
<tr>
<td>uptime_in_days</td>
<td>自 Redis 服务器启动以来，经过的天数</td>
</tr>
<tr>
<td>hz</td>
<td>redis内部调度（进行关闭timeout的客户端，删除过期key等等）频率，程序规定serverCron每秒运行10次。</td>
</tr>
<tr>
<td>lru_clock</td>
<td>以分钟为单位进行自增的时钟，用于 LRU 管理</td>
</tr>
<tr>
<td>executable</td>
<td>启动脚本路径</td>
</tr>
<tr>
<td>config_file</td>
<td>启动时指定的配置文件（redis.conf）路径</td>
</tr>
</tbody>
</table>
<h2 id="clients" tabindex="-1"><a class="header-anchor" href="#clients" aria-hidden="true">#</a> Clients</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>connected_clients</td>
<td>已连接客户端的数量（不包括通过从属服务器连接的客户端）</td>
</tr>
<tr>
<td>client_longest_output_list</td>
<td>当前连接的客户端当中，最长的输出列表</td>
</tr>
<tr>
<td>client_longest_input_buf</td>
<td>当前连接的客户端当中，最大输入缓存</td>
</tr>
<tr>
<td>blocked_clients</td>
<td>正在等待阻塞命令（BLPOP、BRPOP、BRPOPLPUSH）的客户端的数量</td>
</tr>
</tbody>
</table>
<h2 id="memory" tabindex="-1"><a class="header-anchor" href="#memory" aria-hidden="true">#</a> Memory</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>used_memory</td>
<td>使用内存（B）</td>
</tr>
<tr>
<td>used_memory_human</td>
<td>人类可读的格式的使用内存（MB）</td>
</tr>
<tr>
<td>used_memory_rss</td>
<td>操作系统角度，返回redis已分配的内存（即常驻内存），这个值和top、ps命令的输出一致</td>
</tr>
<tr>
<td>used_memory_rss_human</td>
<td>如上</td>
</tr>
<tr>
<td>used_memory_peak</td>
<td>内存使用的峰值</td>
</tr>
<tr>
<td>used_memory_peak_human</td>
<td>如上</td>
</tr>
<tr>
<td>total_system_memory</td>
<td>整个系统内存</td>
</tr>
<tr>
<td>total_system_memory_human</td>
<td>如上</td>
</tr>
<tr>
<td>used_memory_lua</td>
<td>Lua脚本存储占用的内存</td>
</tr>
<tr>
<td>used_memory_lua_human</td>
<td>如上</td>
</tr>
<tr>
<td>maxmemory</td>
<td>Redis实例的最大内存配置</td>
</tr>
<tr>
<td>maxmemory_human</td>
<td>如上</td>
</tr>
<tr>
<td>maxmemory_policy</td>
<td>当达到maxmemory时的淘汰策略</td>
</tr>
<tr>
<td>mem_fragmentation_ratio</td>
<td>used_memory_rss/used_memory的值。一般情况下，used_memory_rss略高于used_memory，当内存碎片较多时，则mem_fragmentation_ratio会较大，可以反映内存碎片是否很多</td>
</tr>
<tr>
<td>mem_allocator</td>
<td>内存分配器。可以是libc 、 jemalloc 或者 tcmalloc</td>
</tr>
</tbody>
</table>
<p>在理想情况下， <code v-pre>used_memory_rss</code> 的值应该只比 <code v-pre>used_memory</code> 稍微高一点儿。 当 <code v-pre>rss &gt; used</code> ，且两者的值相差较大时，表示存在（内部或外部的）内存碎片。 内存碎片的比率可以通过 <code v-pre>mem_fragmentation_ratio</code> 的值看出。 当 <code v-pre>used &gt; rss</code> 时，表示 Redis 的部分内存被操作系统换出到交换空间（swap）了，在这种情况下，操作可能会产生明显的延迟，需要重点关注。即：<code v-pre>mem_fragmentation_ratio</code> 小于1时</p>
<h2 id="persistence" tabindex="-1"><a class="header-anchor" href="#persistence" aria-hidden="true">#</a> Persistence</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>loading</td>
<td>服务器是否正在载入持久化文件</td>
</tr>
<tr>
<td>rdb_changes_since_last_save</td>
<td>离最近一次成功生成rdb文件，写入命令的个数</td>
</tr>
<tr>
<td>rdb_bgsave_in_progress</td>
<td>服务器是否正在创建rdb文件</td>
</tr>
<tr>
<td>rdb_last_save_time</td>
<td>最近一次成功rdb文件的时间戳</td>
</tr>
<tr>
<td>rdb_last_bgsave_status</td>
<td>最近一次成功rdb文件的状态</td>
</tr>
<tr>
<td>rdb_last_bgsave_time_sec</td>
<td>最近一次成功rdb文件的耗时</td>
</tr>
<tr>
<td>rdb_current_bgsave_time_sec</td>
<td>若当前正在创建rdb文件，指当前的创建操作已经耗费的时间</td>
</tr>
<tr>
<td>aof_enabled</td>
<td>aof是否开启</td>
</tr>
<tr>
<td>aof_rewrite_in_progress</td>
<td>aof的rewrite操作是否在进行中</td>
</tr>
<tr>
<td>aof_rewrite_scheduled</td>
<td>rewrite任务计划，当客户端发送bgrewriteaof指令，如果当前rewrite子进程正在执行，那么将客户端请求的bgrewriteaof变为计划任务，待aof子进程结束后执行rewrite</td>
</tr>
<tr>
<td>aof_last_rewrite_time_sec</td>
<td>最近一次aof rewrite耗费时长</td>
</tr>
<tr>
<td>aof_current_rewrite_time_sec</td>
<td>若当前正在执行aof rewrite，指当前的已经耗费的时间</td>
</tr>
<tr>
<td>aof_last_bgrewrite_status</td>
<td>最近一次aof bgrewrite的状态</td>
</tr>
<tr>
<td>aof_last_write_status</td>
<td>最近一次aof写入状态</td>
</tr>
<tr>
<td>开启 aof 后增加的一些info信息</td>
<td></td>
</tr>
<tr>
<td>aof_current_size</td>
<td>aof文件当前大小</td>
</tr>
<tr>
<td>aof_base_size</td>
<td>服务器启动时或者最近一次AOF重写后，文件的大小</td>
</tr>
<tr>
<td>aof_pending_rewrite</td>
<td>同上面的aof_rewrite_scheduled</td>
</tr>
<tr>
<td>aof_buffer_length</td>
<td>aof 缓冲区的大小</td>
</tr>
<tr>
<td>aof_rewrite_buffer_length</td>
<td>aof 重写缓冲区的大小</td>
</tr>
<tr>
<td>aof_pending_bio_fsync</td>
<td>后台IO队列中，等待fsync任务的个数</td>
</tr>
<tr>
<td>aof_delayed_fsync</td>
<td>被延迟的 fsync 调用数量</td>
</tr>
</tbody>
</table>
<h2 id="stats" tabindex="-1"><a class="header-anchor" href="#stats" aria-hidden="true">#</a> Stats</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>total_connections_received</td>
<td>自启动起连接过的总数。如果连接过多，说明短连接严重或连接池使用有问题，需调研代码的连接设置</td>
</tr>
<tr>
<td>total_commands_processed</td>
<td>自启动起运行命令的总数</td>
</tr>
<tr>
<td>instantaneous_ops_per_sec</td>
<td>每秒执行的命令数，相当于QPS</td>
</tr>
<tr>
<td>total_net_input_bytes</td>
<td>网络入口流量字节数</td>
</tr>
<tr>
<td>total_net_output_bytes</td>
<td>网络出口流量字节数</td>
</tr>
<tr>
<td>instantaneous_input_kbps</td>
<td>网络入口kps</td>
</tr>
<tr>
<td>instantaneous_output_kbps</td>
<td>网络出口kps</td>
</tr>
<tr>
<td>rejected_connections</td>
<td>拒绝的连接个数，由于maxclients限制，拒绝新连接的个数</td>
</tr>
<tr>
<td>sync_full</td>
<td>主从完全同步成功次数</td>
</tr>
<tr>
<td>sync_partial_ok</td>
<td>主从部分同步成功次数</td>
</tr>
<tr>
<td>sync_partial_err</td>
<td>主从部分同步失败次数</td>
</tr>
<tr>
<td>expired_keys</td>
<td>自启动起过期的key的总数</td>
</tr>
<tr>
<td>evicted_keys</td>
<td>使用内存大于maxmemory后，淘汰的key的总数</td>
</tr>
<tr>
<td>keyspace_hits</td>
<td>在main dictionary字典中成功查到的key个数</td>
</tr>
<tr>
<td>keyspace_misses</td>
<td>同上，未命中的key的个数</td>
</tr>
<tr>
<td>pubsub_channels</td>
<td>发布/订阅频道数</td>
</tr>
<tr>
<td>pubsub_patterns</td>
<td>发布/订阅模式数</td>
</tr>
<tr>
<td>latest_fork_usec</td>
<td>上次的fork操作使用的时间（单位ms）</td>
</tr>
<tr>
<td>migrate_cached_sockets</td>
<td>是否已经缓存了到该地址的连接</td>
</tr>
<tr>
<td>slave_expires_tracked_keys</td>
<td>从实例到期key数量</td>
</tr>
<tr>
<td>active_defrag_hits</td>
<td>主动碎片整理命中次数</td>
</tr>
<tr>
<td>active_defrag_misses</td>
<td>主动碎片整理未命中次数</td>
</tr>
<tr>
<td>active_defrag_key_hits</td>
<td>主动碎片整理key命中次数</td>
</tr>
<tr>
<td>active_defrag_key_misses</td>
<td>主动碎片整理key未命中次数</td>
</tr>
</tbody>
</table>
<h2 id="replication" tabindex="-1"><a class="header-anchor" href="#replication" aria-hidden="true">#</a> Replication</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>role</td>
<td>当前实例的角色master还是slave</td>
</tr>
<tr>
<td>connected_slaves:</td>
<td>slave的数量</td>
</tr>
<tr>
<td>master_replid</td>
<td>主实例启动随机字符串</td>
</tr>
<tr>
<td>master_replid2</td>
<td>主实例启动随机字符串2</td>
</tr>
<tr>
<td>slave0</td>
<td>slave机器的信息、状态</td>
</tr>
<tr>
<td>master_repl_offset</td>
<td>主从同步偏移量,此值如果和上面的offset相同说明主从一致没延迟，与master_replid可被用来标识主实例复制流中的位置。</td>
</tr>
<tr>
<td>second_repl_offset</td>
<td>主从同步偏移量2,此值如果和上面的offset相同说明主从一致没延迟</td>
</tr>
<tr>
<td>repl_backlog_active</td>
<td>复制缓冲区是否开启</td>
</tr>
<tr>
<td>repl_backlog_size</td>
<td>复制缓冲区大小</td>
</tr>
<tr>
<td>repl_backlog_first_byte_offset</td>
<td>复制缓冲区里偏移量的大小</td>
</tr>
<tr>
<td>repl_backlog_histlen</td>
<td>此值等于 master_repl_offset - repl_backlog_first_byte_offset,该值不会超过repl_backlog_size的大小</td>
</tr>
</tbody>
</table>
<h2 id="cpu" tabindex="-1"><a class="header-anchor" href="#cpu" aria-hidden="true">#</a> CPU</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>used_cpu_sys</td>
<td>Redis 服务器耗费的系统 CPU</td>
</tr>
<tr>
<td>used_cpu_user</td>
<td>Redis 服务器耗费的用户 CPU</td>
</tr>
<tr>
<td>used_cpu_sys_children</td>
<td>后台进程耗费的系统 CPU</td>
</tr>
<tr>
<td>used_cpu_user_children</td>
<td>后台进程耗费的用户 CPU</td>
</tr>
</tbody>
</table>
<h2 id="keyspace" tabindex="-1"><a class="header-anchor" href="#keyspace" aria-hidden="true">#</a> Keyspace</h2>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>参数含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>dbXXX:keys=XXX,expires=XXX</td>
<td>各个数据库（0-15）的 key 的数量，带有生存期的 key 的数量，平均存活时间</td>
</tr>
</tbody>
</table>
<p><strong>实例</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># Server</span>
redis_version:3.2.3					 <span class="token comment"># Redis 的版本</span>
redis_git_sha1:00000000				 <span class="token comment"># Redis 的版本</span>
redis_git_dirty:0
redis_build_id:9e93d0c7997bcfef
redis_mode:standalone				 <span class="token comment"># 运行模式：单机（集群）</span>
os:Linux <span class="token number">2.6</span>.32-431.el6.x86_64 x86_64 <span class="token comment"># 操作系统</span>
arch_bits:64						  <span class="token comment"># 操作系统位数</span>
multiplexing_api:epoll				 <span class="token comment"># redis所使用的事件处理机制</span>
gcc_version:4.4.7					 <span class="token comment"># gcc版本号</span>
process_id:1606						 <span class="token comment"># 当前 Redis 服务器进程id</span>
run_id:17e79b1966f1f891eff203a8e496151ee8a3a7a7
tcp_port:7001						 <span class="token comment"># 端口号</span>
uptime_in_seconds:4360189			 <span class="token comment"># 运行时间(秒)</span>
uptime_in_days:50					 <span class="token comment"># 运行时间(天)</span>
hz:10								 <span class="token comment"># redis内部调度（进行关闭timeout的客户端，删除过期key等等）频率，程序规定serverCron每秒运行10次。</span>
lru_clock:5070330					 <span class="token comment"># Redis的逻辑时钟</span>
executable:/usr/local/bin/redis-server			<span class="token comment"># 启动脚本路径</span>
config_file:/opt/redis3/conf/redis_7001.conf	<span class="token comment"># 启动指定的配置文件路径</span>

<span class="token comment"># Clients</span>
connected_clients:660				 <span class="token comment"># 连接的客户端数量</span>
client_longest_output_list:0		 <span class="token comment"># 当前连接的客户端当中，最长的输出列表</span>
client_biggest_input_buf:0			 <span class="token comment"># 当前连接的客户端当中，最大输入缓存</span>
blocked_clients:0					 <span class="token comment"># 阻塞的客户端数量</span>

<span class="token comment"># Memory</span>
used_memory:945408832				<span class="token comment"># 使用内存（B）</span>
used_memory_human:901.61M			<span class="token comment"># 使用内存（MB）	</span>
used_memory_rss:1148919808			<span class="token comment"># 系统给redis分配的内存（即常驻内存），这个值和top命令的输出一致</span>
used_memory_rss_human:1.07G
used_memory_peak:1162079480			<span class="token comment"># 内存使用的峰值</span>
used_memory_peak_human:1.08G		
total_system_memory:6136483840		<span class="token comment"># 整个系统内存</span>
total_system_memory_human:5.72G
used_memory_lua:122880				<span class="token comment"># Lua脚本存储占用的内存</span>
used_memory_lua_human:120.00K		
maxmemory:2147483648				<span class="token comment"># Redis实例的最大内存配置</span>
maxmemory_human:2.00G
maxmemory_policy:allkeys-lru		<span class="token comment"># 当达到maxmemory时的淘汰策略</span>
mem_fragmentation_ratio:1.22		<span class="token comment"># used_memory_rss/used_memory的比例。一般情况下，used_memory_rss略高于used_memory，当内存碎片较多时，则mem_fragmentation_ratio会较大，可以反映内存碎片是否很多</span>
mem_allocator:jemalloc-4.0.3		<span class="token comment"># 内存分配器</span>

<span class="token comment"># Persistence	</span>
loading:0								  <span class="token comment"># 服务器是否正在载入持久化文件</span>
rdb_changes_since_last_save:82423954	  <span class="token comment">#	离最近一次成功生成rdb文件，写入命令的个数                      </span>
rdb_bgsave_in_progress:0		          <span class="token comment"># 服务器是否正在创建rdb文件           </span>
rdb_last_save_time:1560991229		      <span class="token comment"># 最近一次成功rdb文件的时间戳               </span>
rdb_last_bgsave_status:ok		          <span class="token comment"># 最近一次成功rdb文件的状态           </span>
rdb_last_bgsave_time_sec:-1		          <span class="token comment"># 最近一次成功rdb文件的耗时            </span>
rdb_current_bgsave_time_sec:-1		      <span class="token comment"># 若当前正在创建rdb文件，指当前的创建操作已经耗费的时间                </span>
aof_enabled:0		                      <span class="token comment"># aof是否开启</span>
aof_rewrite_in_progress:0		          <span class="token comment"># aof的rewrite操作是否在进行中            </span>
aof_rewrite_scheduled:0		              <span class="token comment"># rewrite任务计划，当客户端发送bgrewriteaof指令，如果当前rewrite子进程正在执行，那么将客户端请求的bgrewriteaof变为计划任务，待aof子进程结束后执行rewrite        </span>
aof_last_rewrite_time_sec:-1		      <span class="token comment"># 最近一次aof rewrite耗费时长              </span>
aof_current_rewrite_time_sec:-1		      <span class="token comment"># 若当前正在执行aof rewrite，指当前的已经耗费的时间                </span>
aof_last_bgrewrite_status:ok		      <span class="token comment"># 最近一次aof bgrewrite的状态         </span>
aof_last_write_status:ok		          <span class="token comment"># 最近一次aof写入状态  </span>

<span class="token comment"># 开启aof后增加的一些info信息</span>
-----------------------------  
aof_current_size:0                 <span class="token comment"># aof当前大小</span>
aof_base_size:0                    <span class="token comment"># aof上次启动或rewrite的大小</span>
aof_pending_rewrite:0              <span class="token comment"># 同上面的aof_rewrite_scheduled</span>
aof_buffer_length:0                <span class="token comment"># aof buffer的大小</span>
aof_rewrite_buffer_length:0        <span class="token comment"># aof rewrite buffer的大小</span>
aof_pending_bio_fsync:0            <span class="token comment"># 后台IO队列中等待fsync任务的个数</span>
aof_delayed_fsync:0                <span class="token comment"># 延迟的fsync计数器 </span>
-----------------------------           

<span class="token comment"># Stats</span>
total_connections_received:15815		<span class="token comment"># 自启动起连接过的总数。如果连接过多，说明短连接严重或连接池使用有问题，需调研代码的连接设置</span>
total_commands_processed:502953838      <span class="token comment"># 自启动起运行命令的总数</span>
instantaneous_ops_per_sec:7             <span class="token comment"># 每秒执行的命令数，相当于QPS</span>
total_net_input_bytes:532510481889      <span class="token comment"># 网络入口流量字节数</span>
total_net_output_bytes:1571444057940    <span class="token comment"># 网络出口流量字节数</span>
instantaneous_input_kbps:0.37           <span class="token comment"># 网络入口kps</span>
instantaneous_output_kbps:0.59          <span class="token comment"># 网络出口kps</span>
rejected_connections:0                  <span class="token comment"># 拒绝的连接个数，由于maxclients限制，拒绝新连接的个数</span>
sync_full:1                             <span class="token comment"># 主从完全同步成功次数</span>
sync_partial_ok:0                       <span class="token comment"># 主从部分同步成功次数</span>
sync_partial_err:0                      <span class="token comment"># 主从部分同步失败次数</span>
expired_keys:4404930                    <span class="token comment"># 自启动起过期的key的总数</span>
evicted_keys:0                          <span class="token comment"># 使用内存大于maxmemory后，淘汰的key的总数</span>
keyspace_hits:337104556                 <span class="token comment"># 在main dictionary字典中成功查到的key个数</span>
keyspace_misses:22865229                <span class="token comment"># 同上，未命中的key的个数</span>
pubsub_channels:1                       <span class="token comment"># 发布/订阅频道数</span>
pubsub_patterns:0                       <span class="token comment"># 发布/订阅模式数</span>
latest_fork_usec:707                    <span class="token comment"># 上次的fork操作使用的时间（单位ms）</span>
migrate_cached_sockets:0                <span class="token comment"># 是否已经缓存了到该地址的连接</span>
slave_expires_tracked_keys:0			<span class="token comment"># 从实例到期key数量</span>
active_defrag_hits:0                    <span class="token comment"># 主动碎片整理命中次数</span>
active_defrag_misses:0                  <span class="token comment"># 主动碎片整理未命中次数</span>
active_defrag_key_hits:0                <span class="token comment"># 主动碎片整理key命中次数</span>
active_defrag_key_misses:0              <span class="token comment"># 主动碎片整理key未命中次数</span>


<span class="token comment"># Replication</span>
role:master							  <span class="token comment"># 当前实例的角色master还是slave</span>
connected_slaves:1					  <span class="token comment"># slave的数量</span>
master_replid:8f81c045a2cb00f16a7fc5c90a95e02127413bcc		<span class="token comment"># 主实例启动随机字符串</span>
master_replid2:0000000000000000000000000000000000000000     <span class="token comment"># 主实例启动随机字符串2</span>
slave0:ip<span class="token operator">=</span><span class="token number">172.17</span>.12.251,port<span class="token operator">=</span><span class="token number">7002</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">506247209326</span>,lag<span class="token operator">=</span><span class="token number">1</span>	<span class="token comment"># slave机器的信息、状态</span>
master_repl_offset:506247209478		  <span class="token comment"># 主从同步偏移量,此值如果和上面的offset相同说明主从一致没延迟，与master_replid可被用来标识主实例复制流中的位置。</span>
second_repl_offset					  <span class="token comment"># 主从同步偏移量2,此值如果和上面的offset相同说明主从一致没延迟</span>
repl_backlog_active:1				  <span class="token comment"># 复制缓冲区是否开启</span>
repl_backlog_size:157286400			  <span class="token comment"># 复制缓冲区大小</span>
repl_backlog_first_byte_offset:506089923079		<span class="token comment"># 复制缓冲区里偏移量的大小</span>
repl_backlog_histlen:157286400		  <span class="token comment"># 此值等于 master_repl_offset - repl_backlog_first_byte_offset,该值不会超过repl_backlog_size的大小</span>

<span class="token comment"># CPU</span>
used_cpu_sys:6834.06				  <span class="token comment"># 将所有redis主进程在核心态所占用的CPU时求和累计起来</span>
used_cpu_user:8282.10				  <span class="token comment"># 将所有redis主进程在用户态所占用的CPU时求和累计起来</span>
used_cpu_sys_children:0.11			  <span class="token comment"># 后台进程的核心态cpu使用率</span>
used_cpu_user_children:0.91           <span class="token comment"># 后台进程的用户态cpu使用率</span>

<span class="token comment"># Cluster</span>
cluster_enabled:0		<span class="token comment"># 实例是否启用集群模式</span>

<span class="token comment"># Keyspace		# 各个数据库（0-15）的 key 的数量，带有生存期的 key 的数量，平均存活时间</span>
db0:keys<span class="token operator">=</span><span class="token number">267906</span>,expires<span class="token operator">=</span><span class="token number">109608</span>,avg_ttl<span class="token operator">=</span><span class="token number">3426011859194</span>
db1:keys<span class="token operator">=</span><span class="token number">182</span>,expires<span class="token operator">=</span><span class="token number">179</span>,avg_ttl<span class="token operator">=</span><span class="token number">503527626</span>
db8:keys<span class="token operator">=</span><span class="token number">6</span>,expires<span class="token operator">=</span><span class="token number">0</span>,avg_ttl<span class="token operator">=</span><span class="token number">0</span>
db15:keys<span class="token operator">=</span><span class="token number">2</span>,expires<span class="token operator">=</span><span class="token number">0</span>,avg_ttl<span class="token operator">=</span><span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


