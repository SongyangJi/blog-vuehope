<template><div><h1 id="主从复制" tabindex="-1"><a class="header-anchor" href="#主从复制" aria-hidden="true">#</a> 主从复制</h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>主从复制，是指将一台Redis服务器的数据，复制到其他的Redis服务器。前者称为主节点(master)，后者称为从节点(slave)；数据的复制是单向的，只能由主节点到从节点。</p>
<p>默认情况下，每台Redis服务器都是主节点；且一个主节点可以有多个从节点(或没有从节点)，但一个从节点只能有一个主节点。</p>
<p><strong>主从复制的作用</strong></p>
<p>主从复制的作用主要包括：</p>
<ol>
<li>
<p><strong>数据备份</strong>：主从复制实现了<strong>数据的热备份</strong>，是持久化之外的一种数据冗余方式。</p>
</li>
<li>
<p>故障恢复：当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复；实际上是一种服务的冗余。</p>
</li>
<li>
<p><strong>负载均衡</strong>：在主从复制的基础上，配合<strong>读写分离</strong>，可以<strong>由主节点提供写服务，由从节点提供读服务</strong>（即写Redis数据时应用连接主节点，读Redis数据时应用连接从节点），分担服务器负载；尤其是在写少读多的场景下，通过多个从节点分担读负载，可以大大提高Redis服务器的并发量。</p>
<p>默认情况下，从库只能读，不可写。</p>
</li>
<li>
<p>高可用基石：除了上述作用以外，<strong>主从复制还是哨兵和集群能够实施的基础</strong>，因此说主从复制是Redis高可用的基础。</p>
</li>
</ol>
<h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<ol>
<li><strong>建立复制</strong></li>
</ol>
<p>需要注意，主从复制的开启，完全是在从节点发起的；不需要我们在主节点做任何事情。</p>
<p>从节点开启主从复制，有3种方式：</p>
<p>（1）配置文件</p>
<p>在从服务器的配置文件中加入：slaveof masterip masterport</p>
<p>（2）启动命令</p>
<p>redis-server启动命令后加入 --slaveof masterip masterport</p>
<p>（3）客户端命令</p>
<p>Redis服务器启动后，直接通过客户端执行命令：slaveof masterip masterport，则该Redis实例成为从节点。</p>
<p>上述3种方式是等效的，下面以客户端命令的方式为例，看一下当执行了slaveof后，Redis主节点和从节点的变化。</p>
<ol start="2">
<li><strong>改变主库</strong></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>slaveof masterip masterport
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><strong>停止复制</strong></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>slaveof no one
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="上手实战" tabindex="-1"><a class="header-anchor" href="#上手实战" aria-hidden="true">#</a> 上手实战</h2>
<p><strong>启动一主二从的集群架构</strong></p>
<p>分别在3个shell窗口中</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>redis-server
redis-server <span class="token parameter variable">--port</span> <span class="token number">6380</span> <span class="token parameter variable">--slaveof</span> <span class="token number">127.0</span>.0.1 <span class="token number">6379</span>
redis-server <span class="token parameter variable">--port</span> <span class="token number">6381</span> <span class="token parameter variable">--slaveof</span> <span class="token number">127.0</span>.0.1 <span class="token number">6379</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然这里也可以在配置文件里修改然后指定配置文件启动。</p>
<p><strong>使用客户端连接</strong></p>
<p>分别在3个shell窗口中</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>redis-cli <span class="token parameter variable">-p</span> <span class="token number">6379</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">6380</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">6381</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>info replication</code>检查复制状态：</p>
<p><strong>主库状态</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> info replication
<span class="token comment"># Replication</span>
role:master <span class="token comment"># 角色：主库</span>
connected_slaves:2 <span class="token comment"># 从库数量</span>
slave0:ip<span class="token operator">=</span><span class="token number">127.0</span>.0.1,port<span class="token operator">=</span><span class="token number">6380</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">224</span>,lag<span class="token operator">=</span><span class="token number">0</span> <span class="token comment"># ip、端口、状态、复制偏移量</span>
slave1:ip<span class="token operator">=</span><span class="token number">127.0</span>.0.1,port<span class="token operator">=</span><span class="token number">6381</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">224</span>,lag<span class="token operator">=</span><span class="token number">1</span> 
master_failover_state:no-failover
master_replid:4b6a1f35a960797cfce477656751eb3add4b320a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:224
second_repl_offset:-1
repl_backlog_active:1  <span class="token comment"># 复制缓冲区</span>
repl_backlog_size:1048576 <span class="token comment"># 复制缓冲区大小（默认是1MB）</span>
repl_backlog_first_byte_offset:1
repl_backlog_histlen:224
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从库状态</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">0</span>></span> info replication
<span class="token comment"># Replication</span>
role:slave <span class="token comment"># 角色：从库</span>
master_host:127.0.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:3
master_sync_in_progress:0
slave_repl_offset:238 <span class="token comment"># 从库偏移量</span>
slave_priority:100
slave_read_only:1 <span class="token comment"># 从库只读（默认）</span>
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:4b6a1f35a960797cfce477656751eb3add4b320a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:238 <span class="token comment"># 主库 偏移量 (二者相同表示复制没有延迟)</span>
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:238
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主从复制的步骤" tabindex="-1"><a class="header-anchor" href="#主从复制的步骤" aria-hidden="true">#</a> 主从复制的步骤</h2>
<h3 id="连接建立阶段" tabindex="-1"><a class="header-anchor" href="#连接建立阶段" aria-hidden="true">#</a> 连接建立阶段</h3>
<p>该阶段的主要作用是在主从节点之间建立连接，为数据同步做好准备。</p>
<ol>
<li>
<p><strong>保存主节点信息</strong>
从节点服务器内部维护了两个字段，即masterhost和masterport字段，用于存储主节点的ip和port信息。需要注意的是，slaveof是异步命令，从节点完成主节点ip和port的保存后，向发送slaveof命令的客户端直接返回OK，实际的复制操作在这之后才开始进行。</p>
</li>
<li>
<p><strong>建立socket连接</strong>
从节点每秒1次调用复制定时函数replicationCron()，如果发现了有主节点可以连接，便会根据主节点的ip和port，创建socket连接。如果连接成功，则：<strong>从节点为该socket建立一个专门处理复制工作的文件事件处理器，负责后续的复制工作，如接收RDB文件、接收命令传播等</strong>。<strong>主节点接收到从节点的socket连接后（即accept之后），为该socket创建相应的客户端状态，并将从节点看做是连接到主节点的一个客户端，后面的步骤会以从节点向主节点发送命令请求的形式来进行</strong>。</p>
</li>
<li>
<p><strong>发送ping命令检测</strong>
从节点成为主节点的客户端之后，发送ping命令进行首次请求，<strong>目的是检查socket连接是否可用，以及主节点当前是否能够处理请求</strong>。从节点发送ping命令后，可能出现3种情况：</p>
<p>（1）返回pong：说明socket连接正常，且主节点当前可以处理请求，复制过程继续。</p>
<p>（2）超时：一定时间后从节点仍未收到主节点的回复，说明socket连接不可用，则从节点断开socket连接，并重连。</p>
<p>（3）返回pong以外的结果：如果主节点返回其他结果，如正在处理超时运行的脚本，说明主节点当前无法处理命令，则从节点断开socket连接，并重连。</p>
</li>
</ol>
<h3 id="数据同步阶段" tabindex="-1"><a class="header-anchor" href="#数据同步阶段" aria-hidden="true">#</a> 数据同步阶段</h3>
<p>主从节点之间的连接建立以后，便可以开始进行数据同步，该阶段可以理解为从节点数据的初始化。具体执行的方式是：从节点向主节点发送<code v-pre>psync</code>命令（Redis2.8以前是<code v-pre>sync</code>命令），开始同步。</p>
<p><strong>数据同步阶段是主从复制最核心的阶段</strong>，根据主从节点当前状态的不同，可以分为<strong>全量复制</strong>和<strong>增量复制</strong>，下面会有一章专门讲解这两种复制方式以及psync命令的执行过程，这里不再详述。</p>
<h3 id="命令传播阶段" tabindex="-1"><a class="header-anchor" href="#命令传播阶段" aria-hidden="true">#</a> 命令传播阶段</h3>
<p>数据同步阶段完成后，主从节点进入命令传播阶段；在这个阶段主节点将自己执行的写命令发送给从节点，从节点接收命令并执行，从而保证主从节点数据的一致性。</p>
<p>在命令传播阶段，除了发送写命令，主从节点还维持着<strong>心跳机制：PING和REPLCONF ACK</strong>。由于心跳机制的原理涉及增量复制，因此将在介绍了部分复制的相关内容后单独介绍该心跳机制。</p>
<p><strong>延迟与不一致</strong></p>
<p>需要注意的是，命令传播是异步的过程，即主节点发送写命令后并不会等待从节点的回复；因此实际上主从节点之间很难保持实时的一致性，延迟在所难免。</p>
<p>数据不一致的程度，与<strong>主从节点之间的网络状况</strong>、<strong>主节点写命令的执行频率</strong>、以及<strong>主节点中的repl-disable-tcp-nodelay配置</strong>等有关。</p>
<p><code v-pre>repl-disable-tcp-nodelay no</code>：该配置作用于命令传播阶段，控制主节点是否禁止与从节点的TCP_NODELAY；默认no，即不禁止TCP_NODELAY。当设置为yes时，TCP会对包进行合并从而减少带宽，但是发送的频率会降低，从节点数据延迟增加，一致性变差；具体发送频率与Linux内核的配置有关，默认配置为40ms。当设置为no时，TCP会立马将主节点的数据发送给从节点，带宽增加但延迟变小。</p>
<p>一般来说，只有当应用对Redis数据不一致的容忍度较高，且主从节点之间网络状况不好时，才会设置为yes；多数情况使用默认值no。</p>
<h2 id="数据同步阶段-全量复制和部分复制" tabindex="-1"><a class="header-anchor" href="#数据同步阶段-全量复制和部分复制" aria-hidden="true">#</a> 数据同步阶段（全量复制和部分复制）</h2>
<p>在Redis2.8以前，从节点向主节点发送<code v-pre>sync</code>命令请求同步数据，此时的同步方式是全量复制；</p>
<p>在Redis2.8及以后，从节点可以发送<code v-pre>psync</code>命令请求同步数据，此时<strong>根据主从节点当前状态的不同</strong>，同步方式可能是全量复制或部分复制。后文介绍以Redis2.8及以后版本为例。</p>
<ol>
<li>全量复制：<strong>用于初次复制或其他无法进行部分复制的情况</strong>，<strong>将主节点中的所有数据都发送给从节点</strong>，是一个非常重量级的操作。</li>
<li>部分复制：<strong>用于网络中断等情况后的复制</strong>，<strong>只将中断期间主节点执行的写命令发送给从节点</strong>，与全量复制相比更加高效。需要注意的是，<strong>如果网络中断时间过长，导致主节点没有能够完整地保存中断期间执行的写命令，则无法进行部分复制，仍使用全量复制</strong>。</li>
</ol>
<h3 id="全量复制" tabindex="-1"><a class="header-anchor" href="#全量复制" aria-hidden="true">#</a> 全量复制</h3>
<p>Redis通过<code v-pre>psync</code>命令进行全量复制的过程如下：</p>
<p>（1）从节点判断无法进行部分复制，向主节点发送全量复制的请求；或从节点发送部分复制的请求，但主节点判断无法进行部分复制；具体判断过程需要在讲述了部分复制原理后再介绍。</p>
<p>（2）主节点收到全量复制的命令后，执行bgsave，<strong>在后台生成RDB文件</strong>，<strong>并使用一个缓冲区（称为复制缓冲区）记录从现在开始执行的所有写命令。</strong></p>
<p>（3）主节点的bgsave执行完成后，<strong>将RDB文件发送给从节点</strong>；从节点首先清除自己的旧数据，然后载入接收的RDB文件，将数据库状态更新至主节点执行bgsave时的数据库状态。</p>
<p>（4）主节点<strong>将前述复制缓冲区中的所有写命令发送给从节点</strong>，从节点执行这些写命令，将数据库状态更新至主节点的最新状态</p>
<p>（5）如果<strong>从节点开启了AOF，则会触发bgrewriteaof的执行</strong>，从而保证AOF文件更新至主节点的最新状态。</p>
<p>通过全量复制的过程可以看出，全量复制是非常重型的操作：</p>
<p>（1）主节点通过bgsave命令fork子进程进行RDB持久化，该过程是非常消耗CPU、内存(页表复制)、硬盘IO的；</p>
<p>（2）主节点通过网络将RDB文件发送给从节点，对主从节点的带宽都会带来很大的消耗；</p>
<p>（3）<strong>从节点清空老数据、载入新RDB文件的过程是阻塞的</strong>，无法响应客户端的命令；如果从节点执行bgrewriteaof，也会带来额外的消耗。</p>
<blockquote>
<p>可以使用无硬盘复制，也就是说在复制初始化阶段，主节点不会把RDB写到磁盘上之后再一次性发给客户端，而是通过网络直接发个从节点。</p>
</blockquote>
<h3 id="增量复制" tabindex="-1"><a class="header-anchor" href="#增量复制" aria-hidden="true">#</a> 增量复制</h3>
<p>由于全量复制在主节点数据量较大时效率太低，因此Redis2.8开始提供部分复制，用于处理网络中断时的数据同步。</p>
<blockquote>
<p>虽然不同版本的redis的复制有差异，不过前后兼容。</p>
</blockquote>
<p>部分复制的实现，依赖于三个重要的概念：</p>
<p>（1）<strong>复制偏移量</strong></p>
<p><strong>主节点和从节点分别维护一个复制偏移量（offset）</strong>，代表的是<strong>主节点向从节点传递的字节数</strong>；主节点每次向从节点传播N个字节数据时，主节点的offset增加N；从节点每次收到主节点传来的N个字节数据时，从节点的offset增加N。</p>
<p><strong>复制偏移量offset用于判断主从节点的数据库状态是否一致</strong>：如果二者offset相同，则一致；如果offset不同，则不一致，此时可以根据两个offset找出从节点缺少的那部分数据。</p>
<p>例如，如果主节点的offset是1000，而从节点的offset是500，那么部分复制就需要将offset为501-1000的数据传递给从节点。而offset为501-1000的数据存储的位置，就是下面要介绍的复制积压缓冲区。</p>
<p>（2）<strong>复制积压缓冲区</strong></p>
<p><strong>复制积压缓冲区是由主节点维护的、固定长度的、先进先出(FIFO)队列</strong>，默认大小1MB；当主节点开始有从节点时创建，其作用是备份主节点最近发送给从节点的数据。<strong>注意，无论主节点有一个还是多个从节点，都只需要一个复制积压缓冲区</strong>。</p>
<p>在命令传播阶段，<strong>主节点除了将写命令发送给从节点，还会发送一份给复制积压缓冲区，作为写命令的备份</strong>；除了存储写命令，复制积压缓冲区中还存储了其中的每个字节对应的复制偏移量（offset）。由于复制积压缓冲区定长且是先进先出，所以它保存的是主节点最近执行的写命令；<strong>时间较早的写命令会被挤出缓冲区</strong>。</p>
<p>由于该缓冲区长度固定且有限，因此可以备份的写命令也有限，**当主从节点offset的差距过大超过缓冲区长度时，将无法执行部分复制，只能执行全量复制。**反过来说，为了提高网络中断时部分复制执行的概率，可以根据需要增大复制积压缓冲区的大小(通过配置<code v-pre>repl-backlog-size</code>)；例如如果网络中断的平均时间是60s，而主节点平均每秒产生的写命令(特定协议格式)所占的字节数为100KB，则复制积压缓冲区的平均需求为6MB，保险起见，可以设置为12MB，来保证绝大多数断线情况都可以使用部分复制。</p>
<p><strong>从节点将自己的消费offset发送给主节点后，主节点根据offset和缓冲区大小决定能否执行部分复制</strong>：</p>
<ul>
<li>如果offset偏移量之后的数据，仍然都在复制积压缓冲区里，则执行部分复制；</li>
<li>如果offset偏移量之后的数据已不在复制积压缓冲区中（数据已被挤出），则执行全量复制。</li>
</ul>
<p>（3）<strong>服务器运行ID(runid)</strong></p>
<p><strong>每个Redis节点(无论主从)，在启动时都会自动生成一个随机ID(每次启动都不一样)</strong>，由40个随机的十六进制字符组成；runid用来唯一识别一个Redis节点。通过info Server命令，可以查看节点的runid。</p>
<p>主从节点初次复制时，主节点将自己的runid发送给从节点，从节点将这个runid保存起来；</p>
<p><strong>当断线重连时，从节点会将这个runid发送给主节点；主节点根据runid判断能否进行部分复制</strong>：</p>
<ul>
<li>如果从节点保存的runid与主节点现在的runid相同，说明主从节点之前同步过，主节点会继续尝试使用部分复制(到底能不能部分复制还要看offset和复制积压缓冲区的情况)；</li>
<li>如果从节点保存的runid与主节点现在的runid不同，说明从节点在断线前同步的Redis节点并不是当前的主节点，只能进行全量复制。</li>
</ul>
<h2 id="命令传播阶段-心跳机制" tabindex="-1"><a class="header-anchor" href="#命令传播阶段-心跳机制" aria-hidden="true">#</a> 命令传播阶段（心跳机制）</h2>
<h3 id="主-从-ping" tabindex="-1"><a class="header-anchor" href="#主-从-ping" aria-hidden="true">#</a> 主-&gt;从 : PING</h3>
<p>每隔指定的时间，主节点会向从节点发送<code v-pre>PING</code>命令，这个PING命令的作用，主要是为了让从节点进行超时判断。</p>
<p>PING发送的频率由repl-ping-slave-period参数控制，单位是秒，默认值是10s。</p>
<p>关于该PING命令究竟是由主节点发给从节点，还是相反，有一些争议；因为在Redis的官方文档中，对该参数的注释中说明是从节点向主节点发送PING命令。</p>
<h3 id="从-主-replconf-ack" tabindex="-1"><a class="header-anchor" href="#从-主-replconf-ack" aria-hidden="true">#</a> 从-&gt;主：REPLCONF ACK</h3>
<p>在命令传播阶段，从节点会向主节点发送<code v-pre>REPLCONF ACK</code>命令，频率是每秒1次；命令格式为：<code v-pre>REPLCONF ACK {offset}</code>，其中offset指从节点保存的复制偏移量。REPLCONF ACK命令的作用包括：</p>
<p>（1）<strong>实时监测主从节点网络状态</strong>：<strong>该命令会被主节点用于复制超时的判断</strong>。此外，在主节点中使用info Replication，可以看到其从节点的状态中的lag值，代表的是主节点上次收到该REPLCONF ACK命令的时间间隔，在正常情况下，该值应该是0或1。</p>
<p>（2）<strong>检测命令丢失</strong>：从节点发送了自身的offset，主节点会与自己的offset对比，如果从节点数据缺失（如网络丢包），主节点会重新推送缺失的数据（这里也会利用复制积压缓冲区）。注意**，offset和复制积压缓冲区，不仅可以用于部分复制，也可以用于处理命令丢失等情形**；区别在于前者是在断线重连后进行的，而后者是在主从节点没有断线的情况下进行的。</p>
<p>（3）<strong>辅助保证从节点的数量和延迟</strong>：Redis主节点中使用<code v-pre>min-slaves-to-write</code>和<code v-pre>min-slaves-max-lag</code>参数，来保证主节点在不安全的情况下不会执行写命令；</p>
<p>所谓不安全，是指从节点数量太少，或延迟过高。</p>
<p>例如<code v-pre>min-slaves-to-write</code>和<code v-pre>min-slaves-max-lag</code>分别是3和10，含义是如果从节点数量小于3个，或所有从节点的延迟值都大于10s，则主节点拒绝执行写命令。</p>
<p>而这里从节点延迟值的获取，就是通过主节点接收到REPLCONF ACK命令的时间来判断的，即前面所说的info Replication中的lag值。</p>
<h1 id="实际应用的问题" tabindex="-1"><a class="header-anchor" href="#实际应用的问题" aria-hidden="true">#</a> 实际应用的问题</h1>
<h2 id="_1-读写分离及其中的问题" tabindex="-1"><a class="header-anchor" href="#_1-读写分离及其中的问题" aria-hidden="true">#</a> 1. 读写分离及其中的问题</h2>
<h3 id="_1-延迟与不一致问题" tabindex="-1"><a class="header-anchor" href="#_1-延迟与不一致问题" aria-hidden="true">#</a> （1）延迟与不一致问题</h3>
<p>由于<strong>主从复制的命令传播是异步的</strong>，延迟与数据的不一致不可避免。如果应用对数据不一致的接受程度程度较低，可能的优化措施包括：优化主从节点之间的网络环境（如在同机房部署）；监控主从节点延迟（通过offset）判断，<strong>如果从节点延迟过大，通知应用不再通过该从节点读取数据</strong>；<strong>使用集群同时扩展写负载和读负载等</strong>。</p>
<p>在命令传播阶段以外的其他情况下，从节点的数据不一致可能更加严重，例如连接在数据同步阶段，或从节点失去与主节点的连接时等。从节点的<code v-pre>slave-serve-stale-data</code>参数便与此有关：它控制这种情况下从节点的表现；如果为yes（默认值），则从节点仍能够响应客户端的命令，如果为no，则从节点只能响应info、slaveof等少数命令。该参数的设置与应用对数据一致性的要求有关；<strong>如果对数据一致性要求很高，则应设置为no</strong>。</p>
<h3 id="_2-数据过期问题" tabindex="-1"><a class="header-anchor" href="#_2-数据过期问题" aria-hidden="true">#</a> （2）数据过期问题</h3>
<p>在单机版Redis中，存在两种删除策略：</p>
<ul>
<li>惰性删除：服务器不会主动删除数据，只有当客户端查询某个数据时，服务器判断该数据是否过期，如果过期则删除。</li>
<li>定期删除：服务器执行定时任务删除过期数据，但是考虑到内存和CPU的折中（删除会释放内存，但是频繁的删除操作对CPU不友好），该删除的频率和执行时间都受到了限制。</li>
</ul>
<p>在主从复制场景下，<strong>为了主从节点的数据一致性，从节点不会主动删除数据</strong>，而是由主节点控制从节点中过期数据的删除。由于主节点的惰性删除和定期删除策略，都不能保证主节点及时对过期数据执行删除操作，因此，当客户端通过Redis从节点读取数据时，很容易读取到已经过期的数据。</p>
<p><strong>Redis 3.2中，从节点在读取数据时，增加了对数据是否过期的判断</strong>：如果该数据已过期，则不返回给客户端；将Redis升级到3.2可以解决数据过期问题。</p>
<h3 id="_3-故障切换问题" tabindex="-1"><a class="header-anchor" href="#_3-故障切换问题" aria-hidden="true">#</a> （3）故障切换问题</h3>
<p><strong>在没有使用哨兵的读写分离场景下</strong>，应用针对读和写分别连接不同的Redis节点；当主节点或从节点出现问题而发生更改时，需要及时修改应用程序读写Redis数据的连接；连接的切换可以手动进行，或者自己写监控程序进行切换，但前者响应慢、容易出错，后者实现复杂，成本都不算低。(所以后面有<strong>哨兵机制</strong>)</p>
<h2 id="_2-各场景下复制的选择及优化技巧" tabindex="-1"><a class="header-anchor" href="#_2-各场景下复制的选择及优化技巧" aria-hidden="true">#</a> 2. 各场景下复制的选择及优化技巧</h2>
<p>在介绍了Redis复制的种种细节之后，现在我们可以来总结一下，在下面常见的场景中，何时使用部分复制，以及需要注意哪些问题。</p>
<h3 id="_1-第一次建立复制" tabindex="-1"><a class="header-anchor" href="#_1-第一次建立复制" aria-hidden="true">#</a> （1）第一次建立复制</h3>
<p>此时全量复制不可避免，但仍有几点需要注意：</p>
<p><strong>如果主节点的数据量较大，应该尽量避开流量的高峰期</strong>，避免造成阻塞；</p>
<p><strong>如果有多个从节点需要建立对主节点的复制，可以考虑将几个从节点错开</strong>，避免主节点带宽占用过大。</p>
<p><strong>如果从节点过多，也可以调整主从复制的拓扑结构，由一主多从结构变为树状结构</strong>（中间的节点既是其主节点的从节点，也是其从节点的主节点）；但使用树状结构应该谨慎：虽然主节点的直接从节点减少，降低了主节点的负担，但是多层从节点的延迟增大，数据一致性变差；且结构复杂，维护相当困难。</p>
<h3 id="_2-主节点重启" tabindex="-1"><a class="header-anchor" href="#_2-主节点重启" aria-hidden="true">#</a> （2）主节点重启</h3>
<p>主节点重启可以分为两种情况来讨论，一种是故障导致宕机，另一种则是有计划的重启。</p>
<p><strong>主节点宕机</strong></p>
<p>主节点宕机重启后，runid会发生变化，因此不能进行部分复制，只能全量复制。</p>
<p>实际上在主节点宕机的情况下，应进行故障转移处理，将其中的一个从节点升级为主节点，其他从节点从新的主节点进行复制；且故障转移应尽量的自动化，后面文章将要介绍的哨兵便可以进行自动的故障转移。</p>
<p><strong>安全重启：debug reload</strong></p>
<p>在一些场景下，可能希望对主节点进行重启，例如主节点内存碎片率过高，或者<strong>希望调整一些只能在启动时调整的参数</strong>。如果使用普通的手段重启主节点，会使得runid发生变化，可能导致不必要的全量复制。</p>
<p>为了解决这个问题，Redis提供了<code v-pre>debug reload</code>的重启方式：重启后，主节点的runid和offset都不受影响，避免了全量复制。</p>
<p>如下图所示，debug reload重启后runid和offset都未受影响：</p>
<h3 id="_3-从节点重启" tabindex="-1"><a class="header-anchor" href="#_3-从节点重启" aria-hidden="true">#</a> （3）从节点重启</h3>
<p>从节点宕机重启后，其保存的主节点的runid会丢失，因此即使再次执行slaveof，也无法进行部分复制。</p>
<h3 id="_4-网络中断" tabindex="-1"><a class="header-anchor" href="#_4-网络中断" aria-hidden="true">#</a> （4）网络中断</h3>
<p>如果主从节点之间出现网络问题，造成短时间内网络中断，可以分为多种情况讨论。</p>
<p>第一种情况：网络问题时间极为短暂，只造成了短暂的丢包，主从节点都没有判定超时（未触发repl-timeout）；此时只需要通过REPLCONF ACK来补充丢失的数据即可。</p>
<p>第二种情况：网络问题时间很长，主从节点判断超时（触发了repl-timeout），且丢失的数据过多，超过了复制积压缓冲区所能存储的范围；此时主从节点无法进行部分复制，只能进行全量复制。<strong>为了尽可能避免这种情况的发生，应该根据实际情况适当调整复制积压缓冲区的大小</strong>；此外及时发现并修复网络中断，也可以减少全量复制。</p>
<p>第三种情况：介于前述两种情况之间，主从节点判断超时，且丢失的数据仍然都在复制积压缓冲区中；此时主从节点可以进行部分复制。</p>
<h2 id="_3-复制相关的配置" tabindex="-1"><a class="header-anchor" href="#_3-复制相关的配置" aria-hidden="true">#</a> 3. 复制相关的配置</h2>
<p>这一节总结一下与复制有关的配置，说明这些配置的作用、起作用的阶段，以及配置方法等；通过了解这些配置，一方面加深对Redis复制的了解，另一方面掌握这些配置的方法，可以优化Redis的使用，少走坑。</p>
<p>配置大致可以分为主节点相关配置、从节点相关配置以及与主从节点都有关的配置，下面分别说明。</p>
<h3 id="_1-与主从节点都有关的配置" tabindex="-1"><a class="header-anchor" href="#_1-与主从节点都有关的配置" aria-hidden="true">#</a> （1）与主从节点都有关的配置</h3>
<p>首先介绍最特殊的配置，它决定了该节点是主节点还是从节点：</p>
<ol>
<li>
<p>slaveof masterip masterport：Redis启动时起作用；作用是建立复制关系，开启了该配置的Redis服务器在启动后成为从节点。该注释默认注释掉，即Redis服务器默认都是主节点。</p>
</li>
<li>
<p>repl-timeout 60：与各个阶段<strong>主从节点连接超时判断</strong>有关，见前面的介绍。</p>
</li>
</ol>
<h3 id="_2-主节点相关配置" tabindex="-1"><a class="header-anchor" href="#_2-主节点相关配置" aria-hidden="true">#</a> （2）主节点相关配置</h3>
<ol>
<li>
<p>repl-diskless-sync no：作用于全量复制阶段，控制主节点是否使用diskless复制（无盘复制）。所谓diskless复制，是指在全量复制时，主节点不再先把数据写入RDB文件，而是直接写入slave的socket中，整个过程中不涉及硬盘；diskless复制在磁盘IO很慢而网速很快时更有优势。需要注意的是，截至Redis3.0，diskless复制处于实验阶段，默认是关闭的。</p>
</li>
<li>
<p>repl-diskless-sync-delay 5：该配置作用于全量复制阶段，当主节点使用diskless复制时，该配置决定主节点向从节点发送之前停顿的时间，单位是秒；只有当diskless复制打开时有效，默认5s。之所以设置停顿时间，是基于以下两个考虑：(1)向slave的socket的传输一旦开始，新连接的slave只能等待当前数据传输结束，才能开始新的数据传输 (2)多个从节点有较大的概率在短时间内建立主从复制。</p>
</li>
<li>
<p>client-output-buffer-limit slave 256MB 64MB 60：与<strong>全量复制阶段主节点的缓冲区大小</strong>有关，见前面的介绍。</p>
</li>
<li>
<p>repl-disable-tcp-nodelay no：与<strong>命令传播阶段的延迟</strong>有关，见前面的介绍。</p>
</li>
<li>
<p>masterauth master-password：与连接建立阶段的身份验证有关，见前面的介绍。</p>
</li>
<li>
<p>repl-ping-slave-period 10：与<strong>命令传播阶段主从节点的超时判断</strong>有关，见前面的介绍。</p>
</li>
<li>
<p>repl-backlog-size 1mb：<strong>复制积压缓冲区的大小</strong>，见前面的介绍。</p>
</li>
<li>
<p>repl-backlog-ttl 3600：当主节点没有从节点时，复制积压缓冲区保留的时间，这样当断开的从节点重新连进来时，可以进行部分复制；默认3600s。如果设置为0，则永远不会释放复制积压缓冲区。</p>
</li>
<li>
<p>min-slaves-to-write 3：规定了<strong>主节点的最小从节点数目</strong>。</p>
</li>
<li>
<p>min-slaves-max-lag 10：<strong>从节点对应的最大延迟</strong>，见前面的介绍。</p>
</li>
</ol>
<h3 id="_3-从节点相关配置" tabindex="-1"><a class="header-anchor" href="#_3-从节点相关配置" aria-hidden="true">#</a> （3）从节点相关配置</h3>
<ol>
<li>
<p>slave-serve-stale-data yes：与<strong>从节点数据陈旧时是否响应客户端命令</strong>有关，见前面的介绍。</p>
</li>
<li>
<p>slave-read-only yes：<strong>从节点是否只读</strong>；默认是只读的。由于从节点开启写操作容易导致主从节点的数据不一致，因此该配置尽量不要修改。</p>
</li>
</ol>
<blockquote>
<p>[<a href="https://www.cnblogs.com/kismetv/p/9236731.html" target="_blank" rel="noopener noreferrer">深入学习Redis（3）：主从复制 <ExternalLinkIcon/></a>](https://www.cnblogs.com/kismetv/p/9236731.html)</p>
</blockquote>
</div></template>


