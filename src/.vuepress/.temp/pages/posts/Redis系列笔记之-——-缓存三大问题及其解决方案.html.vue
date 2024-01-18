<template><div><blockquote>
<p>老八股文了，redis必问问题。</p>
</blockquote>
<h1 id="缓存的利与弊" tabindex="-1"><a class="header-anchor" href="#缓存的利与弊" aria-hidden="true">#</a> 缓存的利与弊</h1>
<h2 id="引入缓存的优点" tabindex="-1"><a class="header-anchor" href="#引入缓存的优点" aria-hidden="true">#</a> 引入缓存的优点</h2>
<ul>
<li>能够缩短服务的响应时间，给用户带来更好的体验。</li>
<li>能够增大系统的吞吐量，依然能够提升用户体验。</li>
<li>减轻数据库的压力，防止高峰期数据库被压垮，导致整个线上服务 BOOM！</li>
</ul>
<h2 id="引入缓存的缺点" tabindex="-1"><a class="header-anchor" href="#引入缓存的缺点" aria-hidden="true">#</a> 引入缓存的缺点</h2>
<ul>
<li>缓存有多种选型，是内存缓存，memcached 还是 redis，你是否都熟悉，如果不熟悉，无疑增加了维护的难度（本来是个纯洁的数据库系统）。</li>
<li>缓存系统也要考虑分布式，比如 redis 的分布式缓存还会有很多坑，无疑增加了系统的复杂性。</li>
<li>在特殊场景下，如果对缓存的准确性有非常高的要求，就必须考虑缓存和数据库的一致性问题。</li>
</ul>
<p>适合缓存的数据：读多写少、不常变化的数据，比如详情，评论等。</p>
<p>不适合缓存的数据：对于那些经常变化的数据，其实并不适合缓存，一方面会增加系统的复杂性（缓存的更新，缓存脏数据），另一方面也给系统带来一定的不稳定性（缓存系统的维护）。</p>
<p>但一些极端情况下，你需要将一些会变动的数据进行缓存，比如想要页面显示准实时的库存数，或者其他一些特殊业务场景。这时候你需要保证缓存不能（一直）有脏数据，这就需要再深入讨论一下，也就是<strong>缓存-数据库一致性的问题</strong>。</p>
<h1 id="缓存穿透" tabindex="-1"><a class="header-anchor" href="#缓存穿透" aria-hidden="true">#</a> 缓存穿透</h1>
<h2 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述" aria-hidden="true">#</a> 问题描述</h2>
<p>缓存穿透是指<strong>缓存和数据库中都没有的数据</strong>，而用户不断发起请求，如发起id为-1的数据或者特别大的不存在的数据。有可能是黑客利用漏洞攻击从而去压垮应用的数据库。</p>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<p>对于缓存穿透问题，常见的解决方案有以下三种：</p>
<ol>
<li><strong>验证拦截</strong>：接口层进行校验，如鉴定用户权限，对ID之类的字段做基础的校验，如<code v-pre>id&lt;=0</code>的字段直接拦截；</li>
<li><strong>缓存空数据</strong>：当数据库查询到的数据为空时，也将这条数据进行缓存，但缓存的有效性设置得要较短，以免影响正常数据的缓存（因为有可能一开始没有这个key，但后来有了，当然你可以主动删除缓存）；</li>
<li>使用布隆过滤器：布隆过滤器是一种比较独特数据结构，有一定的误差。当它指定一个数据存在时，它可能存在也可能不存在，但是当它指定一个数据不存在时，那么它一定是不存在的。（<s>具体使用方法参考文章模链接</s>）</li>
</ol>
<h1 id="缓存击穿" tabindex="-1"><a class="header-anchor" href="#缓存击穿" aria-hidden="true">#</a> 缓存击穿</h1>
<h2 id="问题描述-1" tabindex="-1"><a class="header-anchor" href="#问题描述-1" aria-hidden="true">#</a> 问题描述</h2>
<p>缓存击穿是指当前热点数据存储到期时，<strong>多个线程同时并发访问热点数据</strong>。因为缓存刚过期，<strong>所有并发请求都会到数据库中查询数据</strong>。</p>
<h2 id="解决方案-1" tabindex="-1"><a class="header-anchor" href="#解决方案-1" aria-hidden="true">#</a> 解决方案</h2>
<ul>
<li>
<p>将热点数据设置为永不过期；</p>
</li>
<li>
<p>加互斥锁：互斥锁可以控制查询数据库的线程访问，只让一个请求通过，只有一个请求去数据库拉取数据，取完数据，不管如何都需要释放锁。</p>
</li>
<li>
<p>添加超时标记：在缓存的对象上增加一个属性来标识超时时间，当获取到数据后，校验数据内部的标记时间，判定是否快超时了，如果是，异步发起一个线程（控制好并发）去主动更新该缓存。</p>
</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> retryCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 重试次数太多直接 return null</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>retryCount <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> value <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 代表缓存值过期</span>
        <span class="token comment">// 设置1 min的超时，防止del操作失败的时候，下次缓存过期一直不能load db</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">setnx</span><span class="token punctuation">(</span>key_mutex<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 代表设置成功</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                value <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                redis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> expire_secs<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token comment">// 确保最后删除，释放锁</span>
                redis<span class="token punctuation">.</span><span class="token function">del</span><span class="token punctuation">(</span>key_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span> 
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 这个时候代表同时候的其他线程已经load db并回设到缓存了，这时候重试获取缓存值即可</span>
            <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> retryCount <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 重试</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="缓存雪崩" tabindex="-1"><a class="header-anchor" href="#缓存雪崩" aria-hidden="true">#</a> 缓存雪崩</h1>
<h2 id="问题描述-2" tabindex="-1"><a class="header-anchor" href="#问题描述-2" aria-hidden="true">#</a> 问题描述</h2>
<p>缓存雪崩是指缓存中有大量的数据，在同一个时间点，或者较短的时间段内，全部过期了，这个时候请求过来，缓存没有数据，都会请求数据库，则数据库的压力就会突增，扛不住就会宕机。</p>
<p>造成缓存雪崩的关键在于在同一时间大规模的key失效。为什么会出现这个问题呢，有几种可能，</p>
<p>第一种可能是Redis宕机，</p>
<p>第二种可能是采用了相同的过期时间。</p>
<h2 id="解决方案-2" tabindex="-1"><a class="header-anchor" href="#解决方案-2" aria-hidden="true">#</a> 解决方案</h2>
<ol>
<li>如果是热点数据，那么可以考虑<strong>设置永远不过期</strong>。</li>
<li>缓存的过期时间除非比较严格，要不考虑<strong>设置一个波动随机值</strong>，比如理论十分钟，那这类key的缓存时间都加上一个1-3分钟，过期时间在7-13分钟内波动，<strong>有效防止都在同一个时间点上大量过期</strong>。</li>
<li>如果所有的热点数据在一台redis服务器上，也是极其危险的，如果网络有问题，或者redis服务器挂了，那么所有的热点数据也会雪崩（查询不到），因此<strong>将热点数据打散分不到不同的机器上</strong>，也可以有效减少这种情况。</li>
<li>对于redis服务挂掉的问题,可以实现redis的高可用主从架构, 并且做redis的持久化, 在redis挂掉的同时时读取本地缓存数据, 同时恢复redis服务加载持久化的数据。</li>
</ol>
<ul>
<li>【事前】<strong>高可用缓存</strong>：高可用缓存是防止出现整个缓存故障。即使个别节点，机器甚至机房都关闭，系统仍然可以提供服务，Redis 哨兵(Sentinel) 和 Redis 集群(Cluster) 都可以做到高可用；</li>
<li>【事中】<strong>缓存降级</strong>（临时支持）：当访问次数急剧增加导致服务出现问题时，我们如何确保服务仍然可用。在国内使用比较多的是 Hystrix，它通过熔断、降级、限流三个手段来降低雪崩发生后的损失。只要确保数据库不死，系统总可以响应请求，每年的春节 12306 我们不都是这么过来的吗？只要还可以响应起码还有抢到票的机会；</li>
<li>【事后】<strong>备份和快速预热</strong>：Redis数据备份和恢复、快速缓存预热。</li>
</ul>
<blockquote>
<p>参考链接：</p>
<p><a href="https://blog.csdn.net/Revivedsun/article/details/94992323" target="_blank" rel="noopener noreferrer">Guava布隆过滤器(boomfilter)使用简介<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


