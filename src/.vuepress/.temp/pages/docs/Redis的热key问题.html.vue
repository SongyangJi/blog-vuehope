<template><div><blockquote>
<p>上面提到，所谓热key问题就是，突然有几十万的请求去访问redis上的某个特定key。那么，这样会造成流量过于集中，达到物理网卡上限，从而导致这台redis的服务器宕机。那接下来这个key的请求，就会直接怼到你的数据库上，导致你的服务不可用。</p>
</blockquote>
<h2 id="热key的危害" tabindex="-1"><a class="header-anchor" href="#热key的危害" aria-hidden="true">#</a> 热Key的危害</h2>
<ul>
<li>流量集中，达到服务器处理上限（<code v-pre>CPU</code>、网络 <code v-pre>IO</code> 等）；</li>
<li>会影响在同一个 <code v-pre>Redis</code> 实例上其他 <code v-pre>Key</code> 的读写请求操作；</li>
<li>热 <code v-pre>Key</code> 请求落到同一个 <code v-pre>Redis</code> 实例上，无法通过扩容解决；</li>
<li>大量 <code v-pre>Redis</code> 请求失败，查询操作可能打到数据库，拖垮数据库，导致整个服务不可用。</li>
</ul>
<h2 id="如何发现热key" tabindex="-1"><a class="header-anchor" href="#如何发现热key" aria-hidden="true">#</a> 如何发现热Key</h2>
<h3 id="凭借业务经验-预估热-key-出现" tabindex="-1"><a class="header-anchor" href="#凭借业务经验-预估热-key-出现" aria-hidden="true">#</a> 凭借业务经验，预估热 Key 出现</h3>
<p>根据业务系统上线的一些活动和功能，我们是可以在某些场景下提前预估热 <code v-pre>Key</code> 的出现的，比如业务需要进行一场商品秒杀活动，秒杀商品信息和数量一般都会缓存到 <code v-pre>Redis</code> 中，这种场景极有可能出现热 <code v-pre>Key</code> 问题的。</p>
<ul>
<li>优点：简单，凭经验发现热 <code v-pre>Key</code>，提早发现提早处理；</li>
<li>缺点：没有办法预测所有热 <code v-pre>Key</code> 出现，比如某些热点新闻事件，无法提前预测。</li>
</ul>
<h3 id="客户端进行收集" tabindex="-1"><a class="header-anchor" href="#客户端进行收集" aria-hidden="true">#</a> 客户端进行收集</h3>
<p>一般我们在连接 <code v-pre>Redis</code> 服务器时都要使用专门的 SDK（比如：<code v-pre>Java</code> 的客户端工具 <code v-pre>Jedis</code>、<code v-pre>Redisson</code>），我们可以对客户端工具进行封装，在发送请求前进行收集采集，同时定时把收集到的数据上报到统一的服务进行聚合计算。</p>
<ul>
<li>优点：方案简单</li>
<li>缺点：
<ul>
<li>对客户端代码有一定入侵，或者需要对 <code v-pre>SDK</code> 工具进行二次开发；</li>
<li>没法适应多语言架构，每一种语言的 <code v-pre>SDK</code> 都需要进行开发，后期开发维护成本较高。</li>
</ul>
</li>
</ul>
<h3 id="在代理层进行收集" tabindex="-1"><a class="header-anchor" href="#在代理层进行收集" aria-hidden="true">#</a> 在代理层进行收集</h3>
<p>如果所有的 <code v-pre>Redis</code> 请求都经过 <code v-pre>Proxy</code>（代理）的话，可以考虑改动 <code v-pre>Proxy</code> 代码进行收集，思路与客户端基本类似。</p>
<figure><img src="https://gitee.com/dongzl/article-images/raw/master/2021/03-Redis-Hot-Key/Redis-Hot-Key-02.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<ul>
<li>优点：对使用方完全透明，能够解决客户端 <code v-pre>SDK</code> 的语言异构和版本升级问题；</li>
<li>缺点：
<ul>
<li>开发成本会比客户端高些；</li>
<li>并不是所有的 <code v-pre>Redis</code> 集群架构中都有 <code v-pre>Proxy</code> 代理（使用这种方式必须要部署 <code v-pre>Proxy</code>）。</li>
</ul>
</li>
</ul>
<h3 id="使用-redis-自带命令" tabindex="-1"><a class="header-anchor" href="#使用-redis-自带命令" aria-hidden="true">#</a> 使用 Redis 自带命令</h3>
<ol>
<li><strong>hotkeys 参数</strong></li>
</ol>
<p><code v-pre>Redis</code> 在 <code v-pre>4.0.3</code> 版本中添加了 <a href="https://github.com/redis/redis/pull/4392" target="_blank" rel="noopener noreferrer">hotkeys<ExternalLinkIcon/></a> 查找特性，可以直接利用 <code v-pre>redis-cli --hotkeys</code> 获取当前 <code v-pre>keyspace</code> 的热点 <code v-pre>key</code>，实现上是通过 <code v-pre>scan + object freq</code> 完成的。</p>
<ul>
<li>优点：无需进行二次开发，能够直接利用现成的工具；</li>
<li>缺点：
<ul>
<li>由于需要扫描整个 <code v-pre>keyspace</code>，实时性上比较差;</li>
<li>扫描时间与 <code v-pre>key</code> 的数量正相关，如果 <code v-pre>key</code> 的数量比较多，耗时可能会非常长。</li>
</ul>
</li>
</ul>
<blockquote>
<p>hotkeys
https://www.zhangbj.com/p/765.html</p>
</blockquote>
<ol start="2">
<li><a href="https://redis.io/commands/monitor" target="_blank" rel="noopener noreferrer">monitor<ExternalLinkIcon/></a> 命令</li>
</ol>
<p><code v-pre>monitor</code> 命令可以实时抓取出 <code v-pre>Redis</code> 服务器接收到的命令，通过 <code v-pre>redis-cli monitor</code> 抓取数据，同时结合一些现成的分析工具，比如 <a href="https://github.com/facebookarchive/redis-faina" target="_blank" rel="noopener noreferrer">redis-faina<ExternalLinkIcon/></a>，统计出热 Key。</p>
<ul>
<li>优点：无需进行二次开发，能够直接利用现成的工具；</li>
<li>缺点：该命令在高并发的条件下，有内存增暴增的隐患，还会降低 <code v-pre>Redis</code> 的性能。</li>
</ul>
<h3 id="redis-节点抓包分析" tabindex="-1"><a class="header-anchor" href="#redis-节点抓包分析" aria-hidden="true">#</a> Redis 节点抓包分析</h3>
<p><code v-pre>Redis</code> 客户端使用 <code v-pre>TCP</code> 协议与服务端进行交互，通信协议采用的是 <code v-pre>RESP</code> 协议。自己写程序监听端口，按照 <code v-pre>RESP</code> 协议规则解析数据，进行分析。或者我们可以使用一些抓包工具，比如 <code v-pre>tcpdump</code> 工具，抓取一段时间内的流量进行解析。</p>
<ul>
<li>优点：对 <code v-pre>SDK</code> 或者 <code v-pre>Proxy</code> 代理层没有入侵；</li>
<li>缺点：
<ul>
<li>有一定的开发成本；</li>
<li>热 <code v-pre>Key</code> 节点的网络流量和系统负载已经比较高了，抓包可能会导致情况进一步恶化。</li>
</ul>
</li>
</ul>
<h2 id="如何解决" tabindex="-1"><a class="header-anchor" href="#如何解决" aria-hidden="true">#</a> 如何解决</h2>
<h3 id="增加-redis-实例副本数量" tabindex="-1"><a class="header-anchor" href="#增加-redis-实例副本数量" aria-hidden="true">#</a> 增加 Redis 实例副本数量</h3>
<p>对于出现热 <code v-pre>Key</code> 的 <code v-pre>Redis</code> 实例，我们可以通过水平扩容增加副本数量，将读请求的压力分担到不同副本节点上。</p>
<p>(通过<strong>主从复制-读写分离</strong>，将读请求分散多个机器上。)</p>
<h3 id="二级缓存-本地缓存" tabindex="-1"><a class="header-anchor" href="#二级缓存-本地缓存" aria-hidden="true">#</a> 二级缓存（本地缓存）</h3>
<p>当出现热 <code v-pre>Key</code> 以后，把热 <code v-pre>Key</code> 加载到系统的 <code v-pre>JVM</code> 中。后续针对这些热 <code v-pre>Key</code> 的请求，会直接从 <code v-pre>JVM</code> 中获取，而不会走到 <code v-pre>Redis</code> 层。这些本地缓存的工具很多，比如 <code v-pre>Ehcache</code>，或者 <code v-pre>Google Guava</code> 中 <code v-pre>Cache</code> 工具，或者直接使用 <code v-pre>HashMap</code> 作为本地缓存工具都是可以的。</p>
<p><strong>使用本地缓存需要注意两个问题：</strong></p>
<ul>
<li>如果对热 <code v-pre>Key</code> 进行本地缓存，需要防止本地缓存过大，影响系统性能；</li>
<li>需要处理本地缓存和 <code v-pre>Redis</code> 集群数据的一致性问题。</li>
</ul>
<h3 id="热-key-备份" tabindex="-1"><a class="header-anchor" href="#热-key-备份" aria-hidden="true">#</a> 热 Key 备份</h3>
<p>通过前面的分析，我们可以了解到，之所以出现热 <code v-pre>Key</code>，是因为有大量的对同一个 <code v-pre>Key</code> 的请求落到同一个 <code v-pre>Redis</code> 实例上，如果我们可以有办法将这些请求打散到不同的实例上，防止出现流量倾斜的情况，那么热 <code v-pre>Key</code> 问题也就不存在了。</p>
<p>那么如何将对某个热 <code v-pre>Key</code> 的请求打散到不同实例上呢？我们就可以通过热 <code v-pre>Key</code> 备份的方式，基本的思路就是，我们<strong>可以给热 <code v-pre>Key</code> 加上前缀或者后缀，把一个热 <code v-pre>Key</code> 的数量变成 <code v-pre>Redis</code> 实例个数 <code v-pre>N</code> 的倍数 <code v-pre>M</code>，从而由访问一个 <code v-pre>Redis</code> <code v-pre>Key</code> 变成访问 <code v-pre>N * M</code> 个 <code v-pre>Redis</code> <code v-pre>Key</code>。 <code v-pre>N * M</code> 个 <code v-pre>Redis</code> <code v-pre>Key</code> 经过分片分布到不同的实例上，将访问量均摊到所有实例</strong>。</p>
<p>具体的逻辑：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token operator">//</span> N 为 Redis 实例个数，M 为 N 的 <span class="token number">2</span>倍
const M <span class="token operator">=</span> N <span class="token operator">*</span> <span class="token number">2</span>
<span class="token operator">//</span>生成随机数
random <span class="token operator">=</span> <span class="token function">GenRandom</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> M<span class="token punctuation">)</span>
<span class="token operator">//</span>构造备份新 Key
bakHotKey <span class="token operator">=</span> hotKey <span class="token operator">+</span> <span class="token string">"_"</span> <span class="token operator">+</span> random
<span class="token operator">//</span> 先从备份key中取
data <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span>bakHotKey<span class="token punctuation">)</span>
<span class="token keyword">if</span> data <span class="token operator">==</span> <span class="token function">NULL</span> <span class="token punctuation">{</span>
    data <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span>hotKey<span class="token punctuation">)</span>
    <span class="token keyword">if</span> data <span class="token operator">==</span> <span class="token function">NULL</span> <span class="token punctuation">{</span>
        data <span class="token operator">=</span> <span class="token function">GetFromDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token operator">//</span> 可以利用原子锁来写入数据保证数据一致性
        redis<span class="token punctuation">.</span><span class="token function">SET</span><span class="token punctuation">(</span>hotKey<span class="token punctuation">,</span> data<span class="token punctuation">,</span> expireTime<span class="token punctuation">)</span>
        redis<span class="token punctuation">.</span><span class="token function">SET</span><span class="token punctuation">(</span>bakHotKey<span class="token punctuation">,</span> data<span class="token punctuation">,</span> expireTime <span class="token operator">+</span> <span class="token function">GenRandom</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        redis<span class="token punctuation">.</span><span class="token function">SET</span><span class="token punctuation">(</span>bakHotKey<span class="token punctuation">,</span> data<span class="token punctuation">,</span> expireTime <span class="token operator">+</span> <span class="token function">GenRandom</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，通过一个大于等于 <code v-pre>1</code> 小于 <code v-pre>M</code> 的随机数，得到一个 <code v-pre>bakHotKey</code>，程序会优先访问 <code v-pre>bakHotKey</code>，在得不到数据的情况下，再访问原来的 <code v-pre>hotkey</code>，并将 <code v-pre>hotkey</code> 的内容写回 <code v-pre>bakHotKey</code>。</p>
<p>值得注意的是，<code v-pre>backHotKey</code> 的过期时间是 <code v-pre>hotkey</code> 的过期时间加上一个较小的随机正整数，这是通过坡度过期的方式，保证在 <code v-pre>hotkey</code> 过期时，所有 <code v-pre>backHotKey</code> 不会同时过期而造成缓存雪崩。</p>
<blockquote>
<p>参考博客</p>
</blockquote>
</div></template>


