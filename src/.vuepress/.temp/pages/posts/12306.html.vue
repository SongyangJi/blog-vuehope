<template><div><h1 id="_12306究竟难在哪里" tabindex="-1"><a class="header-anchor" href="#_12306究竟难在哪里" aria-hidden="true">#</a> 12306究竟难在哪里</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<h3 id="_12306-的业务数据量" tabindex="-1"><a class="header-anchor" href="#_12306-的业务数据量" aria-hidden="true">#</a> 12306 的业务数据量</h3>
<p>https://zhuanlan.zhihu.com/p/31074574</p>
<h3 id="大数据时代" tabindex="-1"><a class="header-anchor" href="#大数据时代" aria-hidden="true">#</a> 大数据时代</h3>
<p>互联网三高架构：高并发、高性能、高可用，简称三高（3H）
互联网应用系统开发肯定经常会看到高并发和高性能这两个词，可谓是耳熟能详。
对于12306这样的国民级应用来说，3H能否做到，直接关系到使用者的体验——也就是春运时能否安然买到火车票回家。</p>
<p>像12306这样如此大规模的分布式架构系统，深入研究其架构基础来说对于我们还为时尚早，
但是罗马不是一天建成的，此次数据课课设我也不妨从几个技术点，结合当前主流的工具去实践一番，探究其中数据库层面可能遇到的技术瓶颈, 从而窥一斑而见全豹，深化自身对数据库的理解，加强使用的熟练度。</p>
<h3 id="高可用" tabindex="-1"><a class="header-anchor" href="#高可用" aria-hidden="true">#</a> 高可用</h3>
<p>集群：一主多从（读写分离的配置）mysql binlog</p>
<p>分布式：数据分片  sharding、mycat</p>
<h4 id="soa-分布式服务系统" tabindex="-1"><a class="header-anchor" href="#soa-分布式服务系统" aria-hidden="true">#</a> SOA（分布式服务系统）</h4>
<p>面向服务的体系结构（英语：service-oriented architecture）并不特指一种技术，而是一种分布式运算的软件设计方法。软件的部分组件（调用者），可以透过网络上的通用协议调用另一个应用软件组件运行、运作，让调用者获得服务。SOA原则上采用开放标准、与软件资源进行交互并采用表示的标准方式。因此应能跨越厂商、产品与技术。一项服务应视为一个独立的功能单元，可以远程访问并独立运行与更新，例如在线查询信用卡账单。</p>
<p>图</p>
<h3 id="高并发-与-高性能" tabindex="-1"><a class="header-anchor" href="#高并发-与-高性能" aria-hidden="true">#</a> 高并发 与 高性能</h3>
<p>高效的IO、高效的计算、流量的负载均衡</p>
<h2 id="高效的io" tabindex="-1"><a class="header-anchor" href="#高效的io" aria-hidden="true">#</a> 高效的IO</h2>
<h3 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存" aria-hidden="true">#</a> 缓存</h3>
<p>读多写少的二八法则在计算机世界里到处都是，下面从三个层面的缓存去深化对缓存的使用。</p>
<h4 id="innodb" tabindex="-1"><a class="header-anchor" href="#innodb" aria-hidden="true">#</a> innodb</h4>
<p>innodb-buffer-pool设置多大
Innodb buffer pool缓存池中包含数据的页的数目，包括脏页。单位是page。</p>
<p>innodb_buffer_pool_size 参数为innodb_buffer_pool的大小设置。
innodb_buffer_pool_chunk_size参数为InnoDB缓冲池块大小。
innodb_buffer_pool_instances参数为缓冲池实例的个数。</p>
<p>规则：
innodb_buffer_pool_size = innodb_buffer_pool_chunk_size * innodb_buffer_pool_instances *N</p>
<p>系统默认的innodb_buffer_pool_chunk_size为128M
innodb_buffer_pool_instances参数的默认设置为1 最大设置为64 ，但是将innodb_buffer_pool_size大小设置为1GB或更大时，此选项才生效。（主要是防止有太多小的instance从而导致性能问题。）</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> @<span class="token variable">@innodb_buffer_pool_size</span><span class="token operator">/</span><span class="token number">1024</span><span class="token operator">/</span><span class="token number">1024</span><span class="token operator">/</span><span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> innodb_buffer_pool_size <span class="token operator">=</span> <span class="token number">4227858432</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>建议设置为系统内存的50%-80%，但也不是越大越好，要根据具体项目具体分析（操作系统留1G左右，mysql连接数*4M，宿主程序缓存nM）。</p>
<p>查看缓冲池状态</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">status</span> <span class="token operator">like</span> <span class="token string">'Innodb_buffer_pool_%'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量解析
Innodb_buffer_pool_pages_total参数表示缓存页面的总数量;
Innodb_buffer_pool_pages_data代表有数据的缓存页数;
Innodb_buffer_pool_pages_free代表没有使用的缓存页数;
Innodb_buffer_pool_pages_misc: innodb buffer pool缓存池中当前已经被用作管理用途或hash index而不能用作为普通数据页的数目。</p>
<p>Innodb_buffer_pool_read_requests表示read请求的次数，
Innodb_buffer_pool_reads表示从物理磁盘中读取数据的请求次数，</p>
<p>innodb buffer的read命中率 =（Innodb_buffer_pool_read_requests - Innodb_buffer_pool_reads） / Innodb_buffer_pool_read_requests * 100%。
如果这个命中率小于95%，建议增大 innodb_buffer_pool_size</p>
<p>如果Innodb_buffer_pool_pages_free偏大的话，证明有很多缓存没有被利用到，这时可以考虑减小缓存;
相反Innodb_buffer_pool_pages_data过大就考虑增大缓存。</p>
<p>配置建议规则 （来自 阿里RDS配置参考）</p>
<table>
<thead>
<tr>
<th style="text-align:left">实例内存大小（单位：MB）</th>
<th style="text-align:left">默认Buffer Pool（单位：MB）</th>
<th style="text-align:left">推荐最大Buffer Pool（单位：MB）</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1024</td>
<td style="text-align:left">256</td>
<td style="text-align:left">256</td>
</tr>
<tr>
<td style="text-align:left">2048</td>
<td style="text-align:left">512</td>
<td style="text-align:left">512</td>
</tr>
<tr>
<td style="text-align:left">4096</td>
<td style="text-align:left">1536</td>
<td style="text-align:left">1536</td>
</tr>
<tr>
<td style="text-align:left">8192</td>
<td style="text-align:left">4608</td>
<td style="text-align:left">4608</td>
</tr>
<tr>
<td style="text-align:left">16384</td>
<td style="text-align:left">12288</td>
<td style="text-align:left">12288</td>
</tr>
<tr>
<td style="text-align:left">24576</td>
<td style="text-align:left">18432</td>
<td style="text-align:left">19456</td>
</tr>
<tr>
<td style="text-align:left">32768</td>
<td style="text-align:left">24576</td>
<td style="text-align:left">25600</td>
</tr>
<tr>
<td style="text-align:left">49152</td>
<td style="text-align:left">36864</td>
<td style="text-align:left">38912</td>
</tr>
<tr>
<td style="text-align:left">65536</td>
<td style="text-align:left">49152</td>
<td style="text-align:left">52224</td>
</tr>
<tr>
<td style="text-align:left">98304</td>
<td style="text-align:left">73728</td>
<td style="text-align:left">77824</td>
</tr>
<tr>
<td style="text-align:left">131072</td>
<td style="text-align:left">98304</td>
<td style="text-align:left">104448</td>
</tr>
<tr>
<td style="text-align:left">196608</td>
<td style="text-align:left">147456</td>
<td style="text-align:left">156672</td>
</tr>
<tr>
<td style="text-align:left">229376</td>
<td style="text-align:left">172032</td>
<td style="text-align:left">183296</td>
</tr>
<tr>
<td style="text-align:left">262144</td>
<td style="text-align:left">196608</td>
<td style="text-align:left">208896</td>
</tr>
<tr>
<td style="text-align:left">393216</td>
<td style="text-align:left">294912</td>
<td style="text-align:left">314368</td>
</tr>
<tr>
<td style="text-align:left">491520</td>
<td style="text-align:left">368640</td>
<td style="text-align:left">393216</td>
</tr>
<tr>
<td style="text-align:left">786432</td>
<td style="text-align:left">589824</td>
<td style="text-align:left">628736</td>
</tr>
</tbody>
</table>
<h4 id="mybatis-一级缓存、二级缓存" tabindex="-1"><a class="header-anchor" href="#mybatis-一级缓存、二级缓存" aria-hidden="true">#</a> mybatis 一级缓存、二级缓存</h4>
<h5 id="一级缓存" tabindex="-1"><a class="header-anchor" href="#一级缓存" aria-hidden="true">#</a> 一级缓存</h5>
<p>查询时：只要两条SQL的下列五个值相同，即可以认为是相同的SQL。
Statement Id + Offset + Limmit + Sql + Params</p>
<p>更新时：每次执行update前都会清空localCache,避免脏读</p>
<ol>
<li>MyBatis一级缓存的生命周期和SqlSession一致，级缓存只在数据库会话内部共享。</li>
<li>MyBatis一级缓存内部设计简单，只是一个没有容量限定的HashMap，在缓存的功能性上有所欠缺。</li>
<li>MyBatis的一级缓存最大范围是SqlSession内部，有多个SqlSession或者分布式的环境下，数据库写操作会引起旧数据（不过考虑到mysql的MVCC下的RR，也是有价值的），建议设定缓存级别为Statement。</li>
</ol>
<h5 id="二级缓存" tabindex="-1"><a class="header-anchor" href="#二级缓存" aria-hidden="true">#</a> 二级缓存</h5>
<p>二级缓存 -&gt; 一级缓存 -&gt; 数据库。</p>
<p>当sqlsession没有调用commit()方法时，二级缓存并没有起到作用。
（但是在spring容器管理下的sqlsession 在没有开启事务的时，是不会commit的，二级缓存根本用不上）
即使是在 @Transactional 下，又有多少会在事务里调用同一段sql呢？</p>
<ol>
<li>MyBatis的二级缓存相对于一级缓存来说，实现了SqlSession之间缓存数据的共享，同时粒度更加的细，能够到namespace级别，通过Cache接口实现类不同的组合，对Cache的可控性也更强。</li>
<li>MyBatis在多表查询时，极大可能会出现脏数据，有设计上的缺陷，安全使用二级缓存的条件比较苛刻。</li>
<li>在分布式环境下，由于默认的MyBatis Cache实现都是基于本地的，分布式环境下必然会出现读取到脏数据，需要使用集中式缓存将MyBatis的Cache接口实现，有一定的开发成本，直接使用Redis、Memcached等分布式缓存可能成本更低，安全性也更高。</li>
</ol>
<h4 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> redis</h4>
<p>略去
更新逻辑</p>
<h2 id="系统架构" tabindex="-1"><a class="header-anchor" href="#系统架构" aria-hidden="true">#</a> 系统架构</h2>
<h3 id="数据分片" tabindex="-1"><a class="header-anchor" href="#数据分片" aria-hidden="true">#</a> 数据分片</h3>
<p>分库分表的需要</p>
<p>垂直分片</p>
<p>水平分片</p>
<p>分库分表带来的问题：</p>
<ol>
<li>维护困难</li>
<li>sql的支持度</li>
<li>跨库事务</li>
<li>跨库Join
后面会结合项目的具体问题进行细讲</li>
</ol>
<h3 id="数据库集群" tabindex="-1"><a class="header-anchor" href="#数据库集群" aria-hidden="true">#</a> 数据库集群</h3>
<p>数据分片与主从复制</p>
<p>主库会生成一个 log dump 线程,用来给从库 I/O 线程传 Binlog 数据。</p>
<p>从库的 I/O 线程会去请求主库的 Binlog，并将得到的 Binlog 写到本地的 relay log (中继日志)文件中。</p>
<p>SQL 线程,会读取 relay log 文件中的日志，并解析成 SQL 语句逐一执行。</p>
<h5 id="主节点-log-dump-线程" tabindex="-1"><a class="header-anchor" href="#主节点-log-dump-线程" aria-hidden="true">#</a> 主节点 log dump 线程</h5>
<p>当从节点连接主节点时，主节点会为其创建一个 log dump 线程，用于发送和读取 Binlog 的内容。在读取 Binlog 中的操作时，log dump 线程会对主节点上的 Binlog 加锁；当读取完成发送给从节点之前，锁会被释放。<strong>主节点会为自己的每一个从节点创建一个 log dump 线程</strong>。</p>
<h5 id="从节点i-o线程" tabindex="-1"><a class="header-anchor" href="#从节点i-o线程" aria-hidden="true">#</a> 从节点I/O线程</h5>
<p>当从节点上执行<code v-pre>start slave</code>命令之后，从节点会创建一个 I/O 线程用来连接主节点，请求主库中更新的Binlog。I/O 线程接收到主节点的 log dump 进程发来的更新之后，保存在本地 relay-log（中继日志）中。</p>
<h5 id="relay-log" tabindex="-1"><a class="header-anchor" href="#relay-log" aria-hidden="true">#</a> relay log</h5>
<p>这里又引申出一个新的日志概念。MySQL 进行主主复制或主从复制的时候会在要复制的服务器下面产生相应的 relay log。</p>
<p>relay log 是怎么产生的呢？</p>
<p>从服务器 I/O 线程将主服务器的 Binlog 日志读取过来，解析到各类 Events 之后记录到从服务器本地文件，这个文件就被称为 relay log。然后 SQL 线程会读取 relay log 日志的内容并应用到从服务器，从而使从服务器和主服务器的数据保持一致。中继日志充当缓冲区，这样 master 就不必等待 slave 执行完成才发送下一个事件。</p>
<h2 id="数据库设计" tabindex="-1"><a class="header-anchor" href="#数据库设计" aria-hidden="true">#</a> 数据库设计</h2>
<h3 id="列车、站点与图论模型" tabindex="-1"><a class="header-anchor" href="#列车、站点与图论模型" aria-hidden="true">#</a> 列车、站点与图论模型</h3>
<p>列车抽象为图论中的路径
车站抽象为图论中的点</p>
<p>不过，上述的建模还不够全面，这仅仅是对静态结构的描述，还要加上时间这个维度。</p>
<p>在本次系统实现中，使用Quartz的CronTrigger（基于日历的调度，可精确到秒），进行列车状态变化的驱动。
相比于SpringBoot 的  @Scheduled 调度强大的多。</p>
<p>（真实环境下，也许是列车驾驶员人工去发送信息）。</p>
<h3 id="er图" tabindex="-1"><a class="header-anchor" href="#er图" aria-hidden="true">#</a> ER图</h3>
<h3 id="业务量究竟大在哪里" tabindex="-1"><a class="header-anchor" href="#业务量究竟大在哪里" aria-hidden="true">#</a> 业务量究竟大在哪里</h3>
<p>电商最头疼的是什么模块？</p>
<p>订单？支付？都不是，是库存！！！</p>
<p>为什么？因为库存是<strong>多读多写</strong>的场景，是整个性能的瓶颈！</p>
<p>订单，就用户一个人可以写，你爱怎么改怎么改，分布式也好做，因为只有单写。</p>
<p>库存不一样，同一个sku每个订单都要改库存，这太恐怖了，一般电商还可以通过分仓库，预分配等手段解决，火车票你怎么搞！！分仓库？哦，今天北京发往上海的G123车钱，华北地区还有三张票，西南地区库存为0？不可能！！！全国人民在极短的时间内，大量订单抢同一个库存，这本来就已经非常困难了，再加上，几乎所有热门车票都特么这么抢！而且，一列火车，由于乘客的起始站和终点站不同，可以逻辑上分成多种商品，但这些商品又相互有库存关联，无法划为独立sku...想想就头疼，再加上在多写的库上做分布式，同步问题又是老大难。所以，12306非常困难！！</p>
<h3 id="库存是什么-——-火车售票的余票算法" tabindex="-1"><a class="header-anchor" href="#库存是什么-——-火车售票的余票算法" aria-hidden="true">#</a> 库存是什么? —— 火车售票的余票算法</h3>
<h4 id="路径节点对构成-sku" tabindex="-1"><a class="header-anchor" href="#路径节点对构成-sku" aria-hidden="true">#</a> 路径节点对构成 sku</h4>
<p>网上自称某宝工程师写的12306文章。他们将<strong>路径上的每个站点对</strong>独立成一件商品，每次购、退票都需要查询删改库存，造成巨大的数据库操作开销。</p>
<p>将每站点全部商品位化，是为了<strong>营造高并发的假象</strong>而已，白白浪费了计算资源。以每趟车2000张票为例子。</p>
<p>某宝的工程师算法逻辑是直接操作库的逻辑，那么将数据库映射成为bmp处理，但这又带来新的问题，比如锁定机制，数据同步机制，写入仲裁机制，这些在本算法中由天然的cpu硬件机制来实施。与硬件有一致性，机制成熟算法健壮性有保证。如果人为的另立机制想拓展bmp算法的性能会导致很多问题，</p>
<p>![image-20220316031959849](../../../../../Library/Application Support/typora-user-images/image-20220316031959849.png)</p>
<h4 id="站点座位bitmap法" tabindex="-1"><a class="header-anchor" href="#站点座位bitmap法" aria-hidden="true">#</a> 站点座位bitmap法</h4>
<p>抢票的基本单位是某一列列车。</p>
<p>对<strong>此列列车经过的所有站点都创建等容量大小的位图（容量大小为座位数量）</strong>—— 当然，如果有多个类型的座位，同理每种类型都创建位图即可。</p>
<p><strong>位图0表示空闲，1表示已占。</strong></p>
<p><strong>用户每次买票获取此列车对应所有中途站点的位图，对这些位图（或者说二进制串）做按位或运算</strong>，</p>
<p>运算结果为1的表明不能被购买（只要有一个为1，就不能购买），为0的表明还没有人购买，可以售出。</p>
<p>如果有用户抢到某个余座，需要将这几个连续的位图的对应bit的0全部改成1（原子地更新）。</p>
<p>https://mp.weixin.qq.com/s?__biz=MzkxNDEyOTI0OQ==&amp;mid=2247484331&amp;idx=1&amp;sn=3e0294efe74cd7b9a421aef778081c69&amp;source=41#wechat_redirect</p>
<h2 id="库存-扣减的问题" tabindex="-1"><a class="header-anchor" href="#库存-扣减的问题" aria-hidden="true">#</a> ”库存“扣减的问题</h2>
<h3 id="超卖问题的解决" tabindex="-1"><a class="header-anchor" href="#超卖问题的解决" aria-hidden="true">#</a> 超卖问题的解决</h3>
<h4 id="悲观锁" tabindex="-1"><a class="header-anchor" href="#悲观锁" aria-hidden="true">#</a> 悲观锁</h4>
<p>悲观锁（Pessimistic Lock），顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。</p>
<p>悲观锁：假定会发生并发冲突，屏蔽一切可能违反数据完整性的操作。</p>
<p>Java synchronized、ReentrantLock 就属于悲观锁的一种实现，每次线程要修改数据时都先获得锁，保证同一时刻只有一个线程能操作数据，其他线程则会被block。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">LOCK</span> <span class="token operator">IN</span> <span class="token keyword">SHARE</span> <span class="token keyword">MODE</span><span class="token punctuation">;</span>  <span class="token comment">// SELECT ... FOR SHARE;</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">FOR</span> <span class="token keyword">UPDATE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>具体一点的一点：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectWithXLock<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>TrainStationSeatStatusMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select
    train_id,
    working_date,
    type,
    station_id,
    status
    from train_station_seat_status
    where
    train_id = #{trainId}             // 列车id
    and working_date = #{workingDate} // 日期
    and type = #{type}                // 座位类型
    and station_id in                 // 车站id
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>foreach</span> <span class="token attr-name">item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span> <span class="token attr-name">index</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span> <span class="token attr-name">collection</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stationIds<span class="token punctuation">"</span></span>
             <span class="token attr-name">open</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(<span class="token punctuation">"</span></span> <span class="token attr-name">separator</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>,<span class="token punctuation">"</span></span> <span class="token attr-name">close</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        #{item}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>foreach</span><span class="token punctuation">></span></span>
    for update ;                      // 写锁
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>悲观锁</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 悲观锁</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">SeatLocation</span> <span class="token function">buyTicketAndOccupySeatWithPessimisticLock</span><span class="token punctuation">(</span><span class="token class-name">DrivingPlan</span> drivingPlan<span class="token punctuation">,</span> <span class="token class-name">SeatType</span> seatType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TicketSaleCoreException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> trainId <span class="token operator">=</span> drivingPlan<span class="token punctuation">.</span><span class="token function">getTrain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTrainId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LocalDate</span> workingDate <span class="token operator">=</span> drivingPlan<span class="token punctuation">.</span><span class="token function">getWorkingDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> stationIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    drivingPlan<span class="token punctuation">.</span><span class="token function">getSeatStatusOfPassStations</span><span class="token punctuation">(</span>seatType<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>trainStationSeatStatus <span class="token operator">-></span> stationIds<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>trainStationSeatStatus<span class="token punctuation">.</span><span class="token function">getStationId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 加互斥锁，一次性拿到所有需要的状态位图</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainStationSeatStatus</span><span class="token punctuation">></span></span> trainStationSeatStatuses <span class="token operator">=</span> trainStationSeatStatusMapper<span class="token punctuation">.</span><span class="token function">selectWithXLock</span><span class="token punctuation">(</span>trainId<span class="token punctuation">,</span> workingDate<span class="token punctuation">,</span> seatType<span class="token punctuation">,</span> stationIds<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 检查位图结构</span>
    <span class="token function">checkHasSameCapacity</span><span class="token punctuation">(</span>trainStationSeatStatuses<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 二进制串集作按位或运算</span>
    <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> availSeats <span class="token operator">=</span> <span class="token function">getAvailSeats</span><span class="token punctuation">(</span>trainStationSeatStatuses<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取所有可用的座位</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> availSeatsIds <span class="token operator">=</span> <span class="token function">getAvailSeats</span><span class="token punctuation">(</span>availSeats<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>availSeatsIds<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 随机从空闲座位中挑一个空闲座位</span>
    <span class="token keyword">int</span> idx <span class="token operator">=</span> <span class="token function">randomSeatIndex</span><span class="token punctuation">(</span>availSeats<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 更改位图</span>
    <span class="token function">occupyOneSeat</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> trainStationSeatStatuses<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 更改座位-位图状态</span>
    trainStationSeatStatuses<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>trainStationSeatStatus <span class="token operator">-></span> <span class="token punctuation">{</span>
        <span class="token class-name">Integer</span> stationId <span class="token operator">=</span> trainStationSeatStatus<span class="token punctuation">.</span><span class="token function">getStationId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        trainStationSeatStatusMapper<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
                trainStationSeatStatus<span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">UpdateWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainStationSeatStatus</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"train_id"</span><span class="token punctuation">,</span> trainId<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"working_date"</span><span class="token punctuation">,</span> workingDate<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"type"</span><span class="token punctuation">,</span> seatType<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"station_id"</span><span class="token punctuation">,</span> stationId<span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 查询对应位置的座位</span>
    <span class="token keyword">return</span> seatMapper<span class="token punctuation">.</span><span class="token function">selectOne</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainPatternSeatMap</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"train_pattern_id"</span><span class="token punctuation">,</span> drivingPlan<span class="token punctuation">.</span><span class="token function">getTrain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTrainPatternId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"type"</span><span class="token punctuation">,</span> seatType<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"idx"</span><span class="token punctuation">,</span> idx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSeatLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="乐观锁" tabindex="-1"><a class="header-anchor" href="#乐观锁" aria-hidden="true">#</a> 乐观锁</h4>
<p>乐观锁（Optimistic Lock），顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在提交更新的时候会判断一下在此期间别人有没有去更新这个数据。乐观锁适用于读多写少的应用场景，这样可以提高吞吐量。</p>
<p>乐观锁：假设不会发生并发冲突，只在提交操作时检查是否违反数据完整性。</p>
<p>使用数据版本（Version）记录机制实现，这是乐观锁最常用的一种实现方式。何谓数据版本？即为数据增加一个版本标识，一般是通过为数据库表增加一个数字类型的 “version” 字段来实现。当读取数据时，将version字段的值一同读出，数据每更新一次，对此version值加一。当我们提交更新的时候，判断数据库表对应记录的当前版本信息与第一次取出来的version值进行比对，如果数据库表当前版本号与第一次取出来的version值相等，则予以更新，否则认为是过期数据。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">UPDATE</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">SET</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> version <span class="token operator">=</span> <span class="token comment">#{version}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是在本例中，不能简单地使用这个方案，因为这里需要原子性地一次性修改掉多个位串记录。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 乐观锁</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SeatLocation</span> <span class="token function">buyTicketAndOccupySeatWithOptimisticLock</span><span class="token punctuation">(</span><span class="token class-name">DrivingPlan</span> drivingPlan<span class="token punctuation">,</span> <span class="token class-name">SeatType</span> seatType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TicketSaleCoreException</span><span class="token punctuation">,</span> <span class="token class-name">OptimisticLockFailure</span> <span class="token punctuation">{</span>
        <span class="token class-name">Integer</span> trainId <span class="token operator">=</span> drivingPlan<span class="token punctuation">.</span><span class="token function">getTrain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTrainId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDate</span> workingDate <span class="token operator">=</span> drivingPlan<span class="token punctuation">.</span><span class="token function">getWorkingDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//         先乐观锁尝试</span>
<span class="token comment">//         无锁读</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainStationSeatStatus</span><span class="token punctuation">></span></span> seatStatusOfPassStations <span class="token operator">=</span> drivingPlan<span class="token punctuation">.</span><span class="token function">getSeatStatusOfPassStations</span><span class="token punctuation">(</span>seatType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainStationSeatStatus</span><span class="token punctuation">></span></span> realStationSeatStatuses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        seatStatusOfPassStations<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>trainStationSeatStatus <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">TrainStationSeatStatus</span> status <span class="token operator">=</span> trainStationSeatStatusMapper<span class="token punctuation">.</span><span class="token function">selectOne</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainStationSeatStatus</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"train_id"</span><span class="token punctuation">,</span> trainId<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"working_date"</span><span class="token punctuation">,</span> workingDate<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"type"</span><span class="token punctuation">,</span> seatType<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"station_id"</span><span class="token punctuation">,</span> trainStationSeatStatus<span class="token punctuation">.</span><span class="token function">getStationId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            realStationSeatStatuses<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        seatStatusOfPassStations <span class="token operator">=</span> realStationSeatStatuses<span class="token punctuation">;</span>

        <span class="token comment">// 根据二进制位图检查座位的可用情况</span>
        <span class="token function">checkHasSameCapacity</span><span class="token punctuation">(</span>seatStatusOfPassStations<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> availSeats <span class="token operator">=</span> <span class="token function">getAvailSeats</span><span class="token punctuation">(</span>seatStatusOfPassStations<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> availSeatsIds <span class="token operator">=</span> <span class="token function">getAvailSeats</span><span class="token punctuation">(</span>availSeats<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 快照读，若此时无票，则直接返回</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>availSeatsIds<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 尝试占座</span>
        <span class="token keyword">int</span> idx <span class="token operator">=</span> <span class="token function">randomSeatIndex</span><span class="token punctuation">(</span>availSeats<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">occupyOneSeat</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> seatStatusOfPassStations<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">TrainStationSeatStatus</span> trainStationSeatStatus <span class="token operator">:</span> seatStatusOfPassStations<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> succ <span class="token operator">=</span> trainStationSeatStatusMapper<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>trainStationSeatStatus<span class="token punctuation">,</span>
                    <span class="token keyword">new</span> <span class="token class-name">UpdateWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainStationSeatStatus</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"train_id"</span><span class="token punctuation">,</span> trainId<span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"working_date"</span><span class="token punctuation">,</span> workingDate<span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"type"</span><span class="token punctuation">,</span> trainStationSeatStatus<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"station_id"</span><span class="token punctuation">,</span> trainStationSeatStatus<span class="token punctuation">.</span><span class="token function">getStationId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 只要有一个更新失败，前面的操作必须全部回滚，这里的回滚绝不可以是自己做"补偿操作"，而应该是抛出异常迫使回滚</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>succ <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">OptimisticLockFailure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 流程到这里，表明乐观锁争抢修改成功</span>
        <span class="token comment">// 查询对应位置的座位</span>
        <span class="token keyword">return</span> seatMapper<span class="token punctuation">.</span><span class="token function">selectOne</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TrainPatternSeatMap</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"train_pattern_id"</span><span class="token punctuation">,</span> drivingPlan<span class="token punctuation">.</span><span class="token function">getTrain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTrainPatternId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"type"</span><span class="token punctuation">,</span> seatType<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"idx"</span><span class="token punctuation">,</span> idx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSeatLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自适应锁" tabindex="-1"><a class="header-anchor" href="#自适应锁" aria-hidden="true">#</a> 自适应锁</h4>
<p>不要有一种错觉，觉得乐观锁实现了无锁并发安全，就觉得乐观锁的性能远远优越悲观锁，</p>
<p>这个是有几个前提的，读多写少，竞争程度不激烈，短事务。（总而言之，减少因为乐观锁加锁失败重试的次数）</p>
<p>所以，我的策略是，对于上述两种加锁方式，同时予以实现。
具体的，默认先使用乐观锁并发修改数据，同时设定乐观锁失败重试次数做多为1次（可以根据实际情况修改配置），如果仍然未修改成功，再改用悲观锁进行竞争修改数据。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SeatLocation</span> <span class="token function">buyTicketAndOccupySeat</span><span class="token punctuation">(</span><span class="token class-name">DrivingPlan</span> drivingPlan<span class="token punctuation">,</span> <span class="token class-name">SeatType</span> seatType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TicketSaleCoreException</span> <span class="token punctuation">{</span>
<span class="token comment">//        System.out.println("乐观锁最大重试次数 " + MAX_OPTIMISTIC_LOCK_RETRIES);</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token constant">MAX_OPTIMISTIC_LOCK_RETRIES</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">SeatLocation</span> seatLocation <span class="token operator">=</span> transactionTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>transactionStatus <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 没有抛出自定义的异常，说明一切正常，</span>
                    <span class="token keyword">return</span> <span class="token function">buyTicketAndOccupySeatWithOptimisticLock</span><span class="token punctuation">(</span>drivingPlan<span class="token punctuation">,</span> seatType<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">OptimisticLockFailure</span> <span class="token operator">|</span> <span class="token class-name">TicketSaleCoreException</span> failure<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    transactionStatus<span class="token punctuation">.</span><span class="token function">setRollbackOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 乐观锁已经争抢成功</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>seatLocation <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> seatLocation<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">buyTicketAndOccupySeatWithPessimisticLock</span><span class="token punctuation">(</span>drivingPlan<span class="token punctuation">,</span> seatType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="技术难点举例" tabindex="-1"><a class="header-anchor" href="#技术难点举例" aria-hidden="true">#</a> 技术难点举例</h2>
<h3 id="库存超卖" tabindex="-1"><a class="header-anchor" href="#库存超卖" aria-hidden="true">#</a> 库存超卖</h3>
<p>这里的库存指的就是一般意义上的库存：</p>
<blockquote>
<p>常见的库存扣减方式有：</p>
<ul>
<li>下单减库存：即当买家下单后，在商品的总库存中减去买家购买数量。下单减库存是最简单的减库存方式，也是控制最精确的一种，下单时直接通过数据库的事务机制控制商品库存，这样一定不会出现超卖的情况。但是你要知道，有些人下完单可能并不会付款。</li>
<li>付款减库存：即买家下单后，并不立即减库存，而是等到有用户付款后才真正减库存，否则库存一直保留给其他买家。但因为付款时才减库存，如果并发比较高，有可能出现买家下单后付不了款的情况，因为可能商品已经被其他人买走了。</li>
<li>预扣库存：这种方式相对复杂一些，买家下单后，库存为其保留一定的时间（如 30 分钟），超过这个时间，库存将会自动释放，释放后其他买家就可以继续购买。在买家付款前，系统会校验该订单的库存是否还有保留：如果没有保留，则再次尝试预扣；如果库存不足（也就是预扣失败）则不允许继续付款；如果预扣成功，则完成付款并实际地减去库存。
至于采用哪一种减库存方式更多是业务层面的考虑，减库存最核心的是大并发请求时保证数据库中的库存字段值不能为负数。</li>
</ul>
</blockquote>
<p>解决方案已经在上面已经有了部分描述——介绍了纯数据库层面的解决方案。</p>
<p>下面介绍一下使用Redis的做法：<strong>Lua脚本处理秒杀请求</strong></p>
<p>大致处理过程如下：</p>
<ol>
<li>将商品信息预热到redis中；</li>
<li>用户扣库存请求用lua在redis里完成</li>
<li>及时将redis的记录落到数据库（定时任务）</li>
</ol>
<h3 id="避免重复下单" tabindex="-1"><a class="header-anchor" href="#避免重复下单" aria-hidden="true">#</a> 避免重复下单</h3>
<p>用户快速点了两次 “提交订单”  按钮，浏览器会向后端发送两条创建订单的请求，最终会创建两条一模一样的订单。</p>
<p><strong>幂等性如何保证</strong>？</p>
<ol>
<li><strong>先select后insert</strong></li>
</ol>
<p>这种插入数据（不论是新增一行，还是将修改字段的空值）的场景比较容易处理，先查后改。</p>
<ol start="2">
<li><strong>数据库自身特性 “主键唯一约束”</strong></li>
</ol>
<p>利用数据库自身特性 “主键唯一约束”，在插入订单记录时，带上主键值，如果订单重复，记录插入会失败。</p>
<p>操作过程：</p>
<p>引入一个服务，用于生成一个“全局唯一的订单号”；</p>
<p>进入创建订单页面时，前端请求该服务，预生成订单ID；</p>
<p>提交订单时，请求参数除了业务参数外，还要带上这个预生成订单ID。</p>
<ol start="3">
<li><strong>建防重表</strong></li>
</ol>
<p>有时候表中并非所有的场景都不允许产生重复的数据，只有某些特定场景才不允许。这时候，直接在表中加唯一索引，显然是不太合适的。</p>
<p>针对这种情况，我们可以通过<code v-pre>建防重表</code>来解决问题。</p>
<p>该表可以只包含两个字段：<code v-pre>id</code> 和 <code v-pre>唯一索引</code>，唯一索引可以是多个字段比如：name、code等组合起来的唯一标识，例如：susan_0001。</p>
<ol start="4">
<li><strong>建立业务状态机</strong></li>
</ol>
<p>很多时候业务表是有状态的，比如订单表中有：1-下单、2-已支付、3-完成、4-撤销等状态。如果这些状态的值是有规律的，按照业务节点正好是从小到大，我们就能通过它来保证接口的幂等性。</p>
<ol start="5">
<li><strong>分布式锁</strong></li>
</ol>
<p>具体使用分布式锁，各式各样了。不过核心思想就是<code v-pre>setnx</code>。</p>
<ol start="6">
<li><strong>带过期期限的token</strong></li>
</ol>
<p>请求时先请求token，token存redis，带过期时间。实际业务处理时redis里有token直接返回，反之执行数据操作。</p>
<h3 id="订单分库分表-多维度查询" tabindex="-1"><a class="header-anchor" href="#订单分库分表-多维度查询" aria-hidden="true">#</a> 订单分库分表，多维度查询</h3>
<p>如果电商网站的订单数过多，我们一般会想到 <code v-pre>分库分表</code> 解决策略。没问题，这个大方向是对的。</p>
<p><strong>但是查询维度很多。</strong></p>
<p>1、买家，查询 <code v-pre>我的订单</code> 列表，需要根据 <code v-pre>buyer_id</code> 来查询</p>
<p>2、查看订单详情，需要根据 <code v-pre>order_id</code> 来查询</p>
<p>3、卖家，查询 <code v-pre>我的销售</code> 列表，需要根据 <code v-pre>seller_id</code> 来查询</p>
<p><strong>而订单分表只有一个分表键，如何满足多维度 SQL 操作呢</strong>？</p>
<p>如何调节分片键与索引的矛盾: <strong>冗余</strong>。</p>
<ol>
<li>全量冗余</li>
<li>关系冗余</li>
</ol>
<p>举例:
order表</p>
<p>![order_table](../../../../../Library/Application Support/typora-user-images/image-20220316031324461.png)</p>
<h3 id="分布式事务" tabindex="-1"><a class="header-anchor" href="#分布式事务" aria-hidden="true">#</a> 分布式事务</h3>
<h4 id="xa" tabindex="-1"><a class="header-anchor" href="#xa" aria-hidden="true">#</a> XA</h4>
<h4 id="seata-的-at" tabindex="-1"><a class="header-anchor" href="#seata-的-at" aria-hidden="true">#</a> Seata 的 AT</h4>
</div></template>


