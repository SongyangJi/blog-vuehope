<template><div><h1 id="uuid" tabindex="-1"><a class="header-anchor" href="#uuid" aria-hidden="true">#</a> UUID</h1>
<p><strong>优点：</strong></p>
<ul>
<li>生成足够简单，本地生成无网络消耗，具有唯一性</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>无序的字符串，不具备趋势自增特性</li>
<li>没有具体的业务含义</li>
<li>长度过长16 字节128位，36位长度的字符串，存储以及查询对MySQL的性能消耗较大，MySQL官方明确建议主键要尽量越短越好，作为数据库主键 <code v-pre>UUID</code> 的无序性会导致数据位置频繁变动，严重影响性能。</li>
</ul>
<h1 id="snowflake——雪花算法" tabindex="-1"><a class="header-anchor" href="#snowflake——雪花算法" aria-hidden="true">#</a> Snowflake——雪花算法</h1>
<p>雪花算法（Snowflake）是twitter公司内部分布式项目采用的ID生成算法，开源后广受国内大厂的好评，在该算法影响下各大公司相继开发出各具特色的分布式生成器。</p>
<figure><img src="https://pic2.zhimg.com/80/v2-4f51c7b6704323cc376b5a8a9a7cad09_1440w.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><code v-pre>Snowflake</code>生成的是Long类型的ID，一个Long类型占8个字节，每个字节占8比特，也就是说一个Long类型占64个比特。</p>
<p>Snowflake ID组成结构：<code v-pre>正数位</code>（占1比特）+ <code v-pre>时间戳</code>（占41比特）+ <code v-pre>机器ID</code>（占5比特）+ <code v-pre>数据中心</code>（占5比特）+ <code v-pre>自增值</code>（占12比特），总共64比特组成的一个Long类型。</p>
<ul>
<li>第一个bit位（1bit）：Java中long的最高位是符号位代表正负，正数是0，负数是1，一般生成ID都为正数，所以默认为0。</li>
<li>时间戳部分（41bit）：毫秒级的时间，不建议存当前时间戳，而是用（当前时间戳 - 固定开始时间戳）的差值，可以使产生的ID从更小的值开始；41位的时间戳可以使用69年，(1L &lt;&lt; 41) / (1000L * 60 * 60 * 24 * 365) = 69年</li>
<li>工作机器id（10bit）：也被叫做<code v-pre>workId</code>，这个可以灵活配置，机房或者机器号组合都可以。</li>
<li>序列号部分（12bit），自增值支持同一毫秒内同一个节点可以生成4096个ID</li>
</ul>
<p>根据这个算法的逻辑，只需要将这个算法用Java语言实现出来，封装为一个工具方法，那么各个业务应用可以直接使用该工具方法来获取分布式ID，只需保证每个业务应用有自己的工作机器id即可，而不需要单独去搭建一个获取分布式ID的应用。</p>
<h2 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h2>
<p><strong>效率高</strong>
生成id的效率比较快，最高在1ms内可以生成2的12次方，也就是4096个id。
<strong>不依赖其他组件</strong>
生成id的过程中，主要是根据时间戳，workID，序列号来进行生成，可以做到不额外依赖其他组件，只依赖于本地系统时间独立地生成id。</p>
<h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2>
<p><strong>易造成数据倾斜的问题</strong>
举例：一个数据库中总共有10个id，分别是</p>
<p>0，25，26，27，28，29，30，31，32，100</p>
<p>id的最小值是0，最大值是100，按照id最大值减去最小值，进行范围切分，分成四段的话，范围是以下四个范围：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> 
[``0``,``25``), 存在``1``个id，值分别是``0` `[``25``,``50``) 存在``8``个id，值分别是``25``，``26``，``27``，``28``，``29``，``30``，``31``，``32` `[``50``,``75``),存在``0``个id [``75``,``100``] 存在``1``个``100``，值是``100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样明显就会存在数据倾斜的问题，就是[25,50) 这个区间存在的id数量特别多，而其他区间存在的id数量特别少。如果我们用Sqoop将MySQL中的数据导入到Hive中去时，就是按照这种id最大值减去最小值，进行范围切分实现方法进行数据分片，然后多线程进行数据导入，每个线程负责一个分片的数据，数据不均匀的话，导入的时间就会变长，有些线程分配的数据量少，导入很快，有些线程分配的数据量大导入很慢。总导入时间取决于最慢的那个线程的时间。</p>
<p>使用Snowflake生成的id，id值的大小因为取决于生成id时的时间戳，如果某一个时间段爬取了大量文章进行入库，在很短的时候内生成了很多id，而其他时间段生成id数量很少，在使用Sqoop导入数据时就会有数据倾斜的问题，需要单独自己进行数据切分，让数据变均匀，然后进行导入。</p>
<h1 id="号段模式" tabindex="-1"><a class="header-anchor" href="#号段模式" aria-hidden="true">#</a> 号段模式</h1>
<p>号段模式是当下分布式ID生成器的主流实现方式之一，号段模式可以理解为<strong>从数据库批量的获取自增ID</strong>，每次从数据库取出一个号段范围，例如 [0,1000) 代表1000个ID，具体的业务服务将本号段，生成1~1000的自增ID并加载到内存。</p>
<p>表结构如下：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> id_generator <span class="token punctuation">(</span>
  id <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  max_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'当前最大id'</span><span class="token punctuation">,</span>
  step <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'号段的布长'</span><span class="token punctuation">,</span>
  biz_type	<span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'业务类型'</span><span class="token punctuation">,</span>
  version <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'版本号'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>eg.
<img src="https://pic3.zhimg.com/80/v2-abc2633c6ff85daf95fca018f717a24e_1440w.png" alt="" loading="lazy"></p>
<ul>
<li>
<p>biz_type ：代表不同业务类型；</p>
</li>
<li>
<p>max_id ：当前最大的可用id；</p>
</li>
<li>
<p>step ：代表号段的长度；</p>
</li>
<li>
<p>version ：是一个乐观锁，每次都更新version，保证并发时数据的正确性。</p>
</li>
</ul>
<p>等这批号段ID用完，再次向数据库申请新号段，对<code v-pre>max_id</code>字段做一次<code v-pre>update</code>操作，<code v-pre>update max_id= max_id + step</code>，update成功则说明新号段获取成功，新的号段范围是<code v-pre>(max_id ,max_id +step]</code>。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">update</span> id_generator <span class="token keyword">set</span> max_id <span class="token operator">=</span> <span class="token comment">#{max_id+step}, version = version + 1 where version = # {version} and biz_type = XXX</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于多业务端可能同时操作，所以采用版本号<code v-pre>version</code>乐观锁方式更新，这种<code v-pre>分布式ID</code>生成方式不强依赖于数据库，不会频繁的访问数据库，对数据库的压力小很多。</p>
<h2 id="优点-1" tabindex="-1"><a class="header-anchor" href="#优点-1" aria-hidden="true">#</a> 优点</h2>
<p><strong>效率高</strong>
生成id的效率取决于step的大小，不会像主键自增生成id那样再受限于数据库的数量。</p>
<h2 id="缺点-1" tabindex="-1"><a class="header-anchor" href="#缺点-1" aria-hidden="true">#</a> 缺点</h2>
<p><strong>强依赖于数据库</strong>
还是强依赖于数据库，数据库宕机后，虽然id生成系统靠内存中还未使用完id，可以维持系统正常运行一段时间，但是数据库不可用还是会导致整个系统不可用。</p>
<p><strong>id是连续的</strong>
容易造成被爬取，以及被竞争对手猜测出一天的订单量。</p>
<h1 id="美团-leaf" tabindex="-1"><a class="header-anchor" href="#美团-leaf" aria-hidden="true">#</a> 美团（Leaf）</h1>
<p>Leaf同时支持号段模式和snowflake算法模式，可以切换使用。</p>
</div></template>


