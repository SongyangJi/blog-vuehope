<template><div><h1 id="负载均衡的5种策略" tabindex="-1"><a class="header-anchor" href="#负载均衡的5种策略" aria-hidden="true">#</a> 负载均衡的5种策略</h1>
<p>要理解负载均衡，必须先搞清楚正向代理和反向代理。</p>
<p><strong>负载均衡的几种常用方式</strong></p>
<h2 id="_1、轮询-默认" tabindex="-1"><a class="header-anchor" href="#_1、轮询-默认" aria-hidden="true">#</a> 1、轮询（默认）</h2>
<p>每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> backserver</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.0.14</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.0.15</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、weight" tabindex="-1"><a class="header-anchor" href="#_2、weight" aria-hidden="true">#</a> 2、weight</h2>
<p>指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的
情况。</p>
<div class="language-routeros line-numbers-mode" data-ext="routeros"><pre v-pre class="language-routeros"><code>upstream backserver {
    server 192.168.0.14 weight=3;
    server 192.168.0.15 weight=7;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>权重越高，在被访问的概率越大，如上例，分别是30%，70%。</p>
<h2 id="_3、ip-hash" tabindex="-1"><a class="header-anchor" href="#_3、ip-hash" aria-hidden="true">#</a> 3、ip_hash</h2>
<p>上述方式存在一个问题就是说，在负载均衡系统中，假如用户在某台服务器上登录了，那么该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的某一个，那么<strong>已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的</strong>。
我们可以采用<strong>ip_hash</strong>指令解决这个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过<strong>哈希算法，自动定位到该服务器</strong>。
每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决<strong>session的问题</strong>。</p>
<div class="language-roboconf line-numbers-mode" data-ext="roboconf"><pre v-pre class="language-roboconf"><code>upstream <span class="token component variable">backserver</span> <span class="token punctuation">{</span>
    ip_hash<span class="token punctuation">;</span>
    server <span class="token property">192.168.0.14</span><span class="token punctuation">:</span>88<span class="token punctuation">;</span>
    server <span class="token property">192.168.0.15</span><span class="token punctuation">:</span>80<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、fair-第三方" tabindex="-1"><a class="header-anchor" href="#_4、fair-第三方" aria-hidden="true">#</a> 4、fair（第三方）</h2>
<p>按后端服务器的响应时间来分配请求，响应时间短的优先分配。</p>
<div class="language-abnf line-numbers-mode" data-ext="abnf"><pre v-pre class="language-abnf"><code><span class="token rule">upstream</span> <span class="token rule">backserver</span> {
    <span class="token rule">server</span> <span class="token rule">server1</span><span class="token comment">;</span>
    <span class="token rule">server</span> <span class="token rule">server2</span><span class="token comment">;</span>
    <span class="token rule">fair</span><span class="token comment">;</span>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、url-hash-第三方" tabindex="-1"><a class="header-anchor" href="#_5、url-hash-第三方" aria-hidden="true">#</a> 5、url_hash（第三方）</h2>
<p>按访问url的hash结果来分配请求，使每个url定向到同一个（对应的）后端服务器，后端服务器为缓存时比较有效。</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> backserver</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> squid1:3128</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> squid2:3128</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">hash</span> <span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">hash_method</span> crc32</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="配置实践" tabindex="-1"><a class="header-anchor" href="#配置实践" aria-hidden="true">#</a> 配置实践</h1>
<p>在需要使用负载均衡的server中增加</p>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code>proxy_pass <span class="token property">http</span><span class="token punctuation">:</span><span class="token comment">//backserver/; </span>
<span class="token selector">upstream backserver</span><span class="token punctuation">{</span> 
    ip_hash<span class="token punctuation">;</span> 
    server 127.0.0.<span class="token property">1</span><span class="token punctuation">:</span>9090 down<span class="token punctuation">;</span> <span class="token punctuation">(</span>down 表示单前的server暂时不参与负载<span class="token punctuation">)</span> 
    server 127.0.0.<span class="token property">1</span><span class="token punctuation">:</span>8080 weight=2<span class="token punctuation">;</span> <span class="token punctuation">(</span>weight 默认为1<span class="token punctuation">;</span> weight越大，负载的权重就越大<span class="token punctuation">)</span> 
    server 127.0.0.<span class="token property">1</span><span class="token punctuation">:</span>6060<span class="token punctuation">;</span> 
    server 127.0.0.<span class="token property">1</span><span class="token punctuation">:</span>7070 backup<span class="token punctuation">;</span> <span class="token punctuation">(</span>其它所有的非backup机器down或者忙的时候，请求backup机器<span class="token punctuation">)</span> 
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>max_fails：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误;</p>
<p>fail_timeout: max_fails次失败后，暂停的时间;</p>
<p>配置实例：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#user  nobody;</span>

worker_processes  <span class="token number">4</span><span class="token punctuation">;</span>
events <span class="token punctuation">{</span>
<span class="token comment"># 最大并发数</span>
worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
http<span class="token punctuation">{</span>
    <span class="token comment"># 待选服务器列表</span>
    upstream myproject<span class="token punctuation">{</span>
        <span class="token comment"># ip_hash指令，将同一用户引入同一服务器。</span>
        ip_hash<span class="token punctuation">;</span>
        server <span class="token number">125.219</span>.42.4 <span class="token assign-left variable">fail_timeout</span><span class="token operator">=</span>60s<span class="token punctuation">;</span>
        server <span class="token number">172.31</span>.2.183<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    server<span class="token punctuation">{</span>
        <span class="token comment"># 监听端口</span>
        listen <span class="token number">80</span><span class="token punctuation">;</span>
        <span class="token comment"># 根目录下</span>
        location / <span class="token punctuation">{</span>
        <span class="token comment"># 选择哪个服务器列表</span>
            proxy_pass http://myproject<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考链接
<a href="https://segmentfault.com/a/1190000014483200" target="_blank" rel="noopener noreferrer">nginx负载均衡的5种策略<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


