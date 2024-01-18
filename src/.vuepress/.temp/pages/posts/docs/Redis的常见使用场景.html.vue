<template><div><ul>
<li>[1、缓存]</li>
</ul>
<p>String类型</p>
<p>例如：热点数据缓存（例如报表、头条排行榜、对象缓存、全页缓存等等可以提升为热点数据的访问数据。</p>
<ul>
<li>[2、数据共享分布式]</li>
</ul>
<p>举一个典型例子：分布式 session 的共享。</p>
<blockquote>
<p>spring session在 redis 里面保存的数据包括：</p>
<ul>
<li>
<p>SET 类型的</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>spring:session:expireations:[min]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>min 表示从 1970 年 1 月 1 日 0 点 0 分经过的分钟数， SET 集合的 member 为 expires:[sessionId] ,表示这一分钟应该过期的键。</p>
</li>
<li>
<p>String 类型的</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>spring:session:sessions:expires:[sessionId]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该数据对应一个空值，表示 sessionId 过期的剩余时间，即 maxInactiveInterval。</p>
</li>
<li>
<p>Hash 类型的</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>spring:session:sessions:[sessionId]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>session 保存的数据，记录了 creationTime，maxInactiveInterval，lastAccessedTime，attribute。前两个数据是用于 session 过期管理的辅助数据结构。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"lastAccessedTime"</span><span class="token operator">:</span> <span class="token number">1523933008926</span><span class="token punctuation">,</span><span class="token comment">/*2018/4/17 10:43:28*/</span>
    <span class="token property">"creationTime"</span><span class="token operator">:</span> <span class="token number">1523933008926</span><span class="token punctuation">,</span> <span class="token comment">/*2018/4/17 10:43:28*/</span>
    <span class="token property">"maxInactiveInterval"</span><span class="token operator">:</span> <span class="token number">1800</span><span class="token punctuation">,</span>
    <span class="token property">"sessionAttr:name"</span><span class="token operator">:</span> <span class="token string">"xu"</span> <span class="token comment">// 用户数据</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</blockquote>
<p>基于 spring-session 解决分布式 session 共享问题:https://spring.io/projects/spring-session-data-redis</p>
<p>Spring Session 数据结构解读:https://blog.didispace.com/spring-session-source-learning-xjf/</p>
<p>https://spring.io/projects/spring-session-data-redis</p>
<ul>
<li>[3、分布式锁]</li>
</ul>
<p>基本原理就是 setnx+expire</p>
<ul>
<li>[4、全局ID]</li>
</ul>
<p>int类型，incrby，利用原子性</p>
<p>incrby userid 1000</p>
<p>分库分表的场景，一次性拿一段</p>
<ul>
<li>[5、计数器]</li>
</ul>
<p>int类型，incr方法</p>
<p>例如：文章的阅读量、微博点赞数、允许一定的延迟，先写入Redis再定时同步到数据库</p>
<ul>
<li>[6、限流]</li>
</ul>
<p>https://mp.weixin.qq.com/s/jT0WYISuSoi_hkTmELb7PQ</p>
<ul>
<li>[7、位统计]</li>
</ul>
<p>这个可以用来做</p>
<ul>
<li>[8、购物车]</li>
<li>[9、用户消息时间线timeline]</li>
<li>[10、消息队列]</li>
<li>[11、抽奖]</li>
<li>[12、点赞、签到、打卡]</li>
<li>[13、商品标签]</li>
<li>[14、商品筛选]</li>
<li>[15、用户关注、推荐模型]</li>
<li>[16、排行榜]</li>
</ul>
</div></template>


