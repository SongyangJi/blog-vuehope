<template><div><h1 id="innodb-buffer-pool" tabindex="-1"><a class="header-anchor" href="#innodb-buffer-pool" aria-hidden="true">#</a> InnoDB Buffer Pool</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>磁盘太慢，用内存作为缓冲区很有必要——这是缓存的基本思想，将数据存放在读写速度更快的存储介质中。</p>
<p>不过这里的缓冲区指的不是 Redis、Memchached这些外部的内存性缓冲，还是MySQL自治的一块内存缓冲区。</p>
<p>所谓自治，就是说完全由MySQL自己去管理这块内存区域，自己完成脏数据的刷盘，使用MySQL执行CRUD无需也无法自己做这方面的操作——不过你可以修改其中的配置以调整缓存的具体行为。</p>
<p>InnoDB Buffer Pool 本质上是MySQL在向操作系统申请的一大块内存，默认是128MB（比较小，完全可以开大一点）。</p>
<h2 id="内部组成" tabindex="-1"><a class="header-anchor" href="#内部组成" aria-hidden="true">#</a> 内部组成</h2>
<p>Buffer Pool 对应的一大块内存被划分一个又一个页面，页面大小和InnoDB表空间的页面大小一致，默认是16KB，不妨称它为<strong>缓冲页。</strong></p>
<p>由于这些缓冲业本身较大，如果已过用户的调整可能更大，不便于直接管理。于是为每个缓冲页创建一个控制块，</p>
<p>每个控制块包含该页所属的表空间编号、页号、缓冲页在Buffer Pool 中的地址等关键信息。</p>
<p>每个控制块的所占用的内存大小是一致的，大概只有16KB的5%左右（aka 800个字节）。</p>
<img src="@source/posts/innodb-buffer.png" style="zoom:35%;" />
<h2 id="free-链表" tabindex="-1"><a class="header-anchor" href="#free-链表" aria-hidden="true">#</a> free 链表</h2>
<p>缓冲页一开始都为空（逻辑上的空），随着从磁盘读取数据会逐渐使用buffer pool中的页。</p>
<p>如何区分这些空闲的页和非空闲的页呢？</p>
<p>MySQL的做法并不特殊，使用一条链表将空闲也组织起来。</p>
<p>具体的数据结构，下面的图说的很清楚了。</p>
<p>红色对应的空闲的控制块，蓝色对应的是相应的缓冲页。</p>
<img src="@source/posts/free.png" style="zoom:40%;" />
<h2 id="flush-链表" tabindex="-1"><a class="header-anchor" href="#flush-链表" aria-hidden="true">#</a> flush 链表</h2>
<p>读缓存的逻辑比较简单，就是把磁盘中的页读到内存中（不过还要设计缓冲页的淘汰问题）。</p>
<p>写缓存呢？</p>
<p>和上面，我们需要把buffer pool中的写过的页（也就是和磁盘的上的页不一致的页），也就是脏页管理起来，然后按照某种刷盘逻辑将这些脏页在未来某个时刻写到磁盘上。</p>
<p>具体的组织结构也是链表，和上面的的形式几乎一致。不再赘述。</p>
<h2 id="缓冲页的哈希表" tabindex="-1"><a class="header-anchor" href="#缓冲页的哈希表" aria-hidden="true">#</a> 缓冲页的哈希表</h2>
<p>如何根据快速知道某个是否在缓冲池中，毫无疑问，哈希表可以派上用场。</p>
<p>具体的，可以使用 <strong>表空间号+页号</strong> 作为键来定位一个页，值是页控制块的内存地址。</p>
<h2 id="lru链表的使用管理" tabindex="-1"><a class="header-anchor" href="#lru链表的使用管理" aria-hidden="true">#</a> LRU链表的使用管理</h2>
<p>只要涉及到缓存，就必然涉及到缓存区不够用，需要淘汰部分缓存的情况。对于innodb buffer pool来说也不意外。</p>
<p>不过，这里的LRU算法不是最朴素的实现（比如每使用一次页，就把它对应的控制块移动到LRU链表的头部），
这里的LRU链表是变种。</p>
<h3 id="数据冷热分离" tabindex="-1"><a class="header-anchor" href="#数据冷热分离" aria-hidden="true">#</a> 数据冷热分离</h3>
<p>为什么呢？</p>
<p>两个原因：</p>
<ol>
<li>MySQL的预读策略可能将一些原本不会使用的页面误装载进了buffer pool；</li>
<li>执行一些全表扫描的SQL时，会将大量的数据页加载进buffer pool，不过又由于这些全表扫描出的页面的本身的使用频率的非常低（全表的扫描这样的sql一般只有定期做报表的时候用到），这个时候相当于一下子就把缓冲区全用冷数据充满了，也就是说相当于清空了缓冲区。</li>
</ol>
<p>所以，MySQL对这里LRU链表作如下处理，</p>
<p>将数据冷热分离，默认情况下，将LRU链表前约5/8的数据作为热数据（也称为 young ）区域，后3/8的数据作为冷数据（也称为 old）区域。</p>
<p>如何对上面提出的两个问题做出优化，上面的问题的共同点在于使用一个页面之后就再不用了（aka，用完即弃，不是那种在一个时间段里频繁使用到的数据）。</p>
<p>所以，<code v-pre>innnodb_old_blocks_time</code>这个系统配置变量其到作用，默认是1000ms。</p>
<p>对于从磁盘加载进来的数据页，先将它加入old区域，记录下第一次加入的时间，之后再访问它的时候，如果间隔的时间小于<code v-pre>innnodb_old_blocks_time</code>, 还不会加入young区域，仍然作为冷数据处理。</p>
<p>于是，对于那些原表扫描和预读机制的冷数据页不会影响到真正的需要缓存的热数据。</p>
<h3 id="进一步优化" tabindex="-1"><a class="header-anchor" href="#进一步优化" aria-hidden="true">#</a> 进一步优化</h3>
<p>是不是对于young区域数据页每访问一次就要把它加入LRU链表的头部呢？因为这些数据可能都很热，每一次每访问一次就把要移动一次控制块节点，没必要。</p>
<p>所以，MySQL只对于那些处于young区域后3/4区域的节点才会在使用的时候加入young的头部。</p>
<h2 id="刷新脏页到磁盘" tabindex="-1"><a class="header-anchor" href="#刷新脏页到磁盘" aria-hidden="true">#</a> 刷新脏页到磁盘</h2>
<p>后台线程会定期将脏页刷新到磁盘中。</p>
<p>也就是说，这里的缓存使用方式实际上是<strong>Write-hehind（异步缓存写入）</strong>，适合多写的方式。</p>
<p>脏页的刷新主要有3种做法：</p>
<ol>
<li>
<p>从LRU的尾部（也是从old区域）开始扫描一些页面，扫描页面的数量由<code v-pre>innodb_lru_scan_depth</code>（默认是1024）指定，如果扫描中发现是脏页就把它刷新到磁盘。</p>
</li>
<li>
<p>从flush链表刷新一部分页面到磁盘。刷新的速率取决于当时系统繁忙的程度。</p>
</li>
<li>
<p>如果用户线程想将一个磁盘页加载进buffer pool，但是此时全都是脏页了，这时就必须挑出一个脏页刷到磁盘上。</p>
</li>
</ol>
<h2 id="查看当前-buffer-pool的状态-配置" tabindex="-1"><a class="header-anchor" href="#查看当前-buffer-pool的状态-配置" aria-hidden="true">#</a> 查看当前 buffer pool的状态/配置</h2>
<p>查看当前状态</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">engine</span> <span class="token keyword">innodb</span> <span class="token keyword">status</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># ......</span>
BUFFER POOL AND MEMORY
----------------------
Total large memory allocated <span class="token number">137428992</span> <span class="token comment"># 向操作系统申请的一大块连续空间 + 全部控制块 + 缓冲页 + 碎片</span>
Dictionary memory allocated <span class="token number">410319</span>
Buffer pool size   <span class="token number">8191</span>  <span class="token comment"># 一共容纳多少缓冲页（页数）</span>
Free buffers       <span class="token number">7017</span>  <span class="token comment"># 空闲的缓冲页个数</span>
Database pages     <span class="token number">1170</span>  <span class="token comment"># LRU链表中的页的数量</span>
Old database pages <span class="token number">451</span>   <span class="token comment"># OLD区域中的页的数量</span>
Modified db pages  <span class="token number">0</span>     <span class="token comment"># FLUSH链表中页的数量（脏页的数量）</span>
Pending reads      <span class="token number">0</span>
Pending writes: LRU <span class="token number">0</span>, flush list <span class="token number">0</span>, single page <span class="token number">0</span>
Pages made young <span class="token number">0</span>, not young <span class="token number">0</span>
<span class="token number">0.00</span> youngs/s, <span class="token number">0.00</span> non-youngs/s
Pages <span class="token builtin class-name">read</span> <span class="token number">1039</span>, created <span class="token number">131</span>, written <span class="token number">137</span>
<span class="token number">0.00</span> reads/s, <span class="token number">0.00</span> creates/s, <span class="token number">0.00</span> writes/s
No buffer pool page gets since the last printout
Pages <span class="token builtin class-name">read</span> ahead <span class="token number">0.00</span>/s, evicted without access <span class="token number">0.00</span>/s, Random <span class="token builtin class-name">read</span> ahead <span class="token number">0.00</span>/s
LRU len: <span class="token number">1170</span>, unzip_LRU len: <span class="token number">0</span>
I/O sum<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>:cur<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>, <span class="token function">unzip</span> sum<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>:cur<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的参看官方文档。</p>
<p><strong>查看配置变量</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">status</span> <span class="token operator">like</span> <span class="token string">'Innodb_buffer_pool_%'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>变量解析</strong></p>
<ul>
<li>Innodb_buffer_pool_pages_total 参数表示缓存页面的总数量;</li>
<li>Innodb_buffer_pool_pages_data 代表有数据的缓存页数;</li>
<li>Innodb_buffer_pool_pages_free 代表没有使用的缓存页数;</li>
<li>Innodb_buffer_pool_pages_misc: innodb buffer pool 缓存池中当前已经被用作管理用途或hash index而不能用作为普通数据页的数目。</li>
<li>Innodb_buffer_pool_read_requests表示read请求的次数，</li>
<li>Innodb_buffer_pool_reads 表示从物理磁盘中读取数据的请求次数，</li>
</ul>
<p>innodb buffer的read命中率 =（Innodb_buffer_pool_read_requests -Innodb_buffer_pool_reads） / Innodb_buffer_pool_read_requests * 100%。
如果这个命中率小于95%，建议增大 innodb_buffer_pool_size。</p>
<p>如果Innodb_buffer_pool_pages_free偏大的话，证明有很多缓存没有被利用到，这时可以考虑减小缓存; 相反Innodb_buffer_pool_pages_data过大就考虑增大缓存。</p>
<h2 id="配置-buffer-pool" tabindex="-1"><a class="header-anchor" href="#配置-buffer-pool" aria-hidden="true">#</a> 配置 Buffer Pool</h2>
<h3 id="配置解析" tabindex="-1"><a class="header-anchor" href="#配置解析" aria-hidden="true">#</a> 配置解析</h3>
<p>由于一个Buffer Pool可能很大，一次性申请、移动、管理它不适合，所以MySQL实际做法是用多个做个chunk组成一个buffer pool。</p>
<ul>
<li>innodb_buffer_pool_size 参数为innodb_buffer_pool的大小设置（默认是128MB）。</li>
<li>innodb_buffer_pool_chunk_size 参数为InnoDB缓冲池块大小（默认是128MB）。</li>
<li>innodb_buffer_pool_instances 参数为缓冲池实例的个数（默认是1）。</li>
</ul>
<p>注意，不同的innodb_buffer_pool 实例的链表管理、哈希管理、锁管理都是独立的，也正因此如果可以配置多个buffer pool实例可以增大并发度。</p>
<p>配置规则：
*<em>innodb_buffer_pool_size = innodb_buffer_pool_chunk_size * innodb_buffer_pool_instances <em>N</em></em></p>
<p>其中N指的是一个buffer pool实例中有几个 chunk。</p>
<p>（注意，如果不是整数倍，那么会调整为整数倍；又如果配置的innodb_buffer_pool_size 小于innodb_buffer_pool_chunk_size * innodb_buffer_pool_instances，那么MySQL会缩小innodb_buffer_pool_chunk_size的大小）</p>
<p>系统默认的innodb_buffer_pool_chunk_size （8.x版本）为128M。
innodb_buffer_pool_instances参数的默认设置为1 最大设置为64 ，但是
将innodb_buffer_pool_size大小设置为1GB或更大时，此选项才生效。
（主要是防止有太多小的instance从而导致性能问题。）</p>
<h3 id="配置参考" tabindex="-1"><a class="header-anchor" href="#配置参考" aria-hidden="true">#</a> 配置参考</h3>
<p>建议设置为系统内存的50%-80%，但也不是越大越好，要根据具体项目具体分析
（操作系统留1G左右，mysql连接数*4M，宿主程序缓存nM）。</p>
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
</tbody>
</table>
<h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h1>
<blockquote>
<p>《MySQL是怎样运行的》</p>
</blockquote>
<p>https://www.cnblogs.com/frankcui/p/15227775.html</p>
</div></template>


