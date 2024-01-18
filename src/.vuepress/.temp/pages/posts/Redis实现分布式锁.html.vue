<template><div><h1 id="分布式锁简介" tabindex="-1"><a class="header-anchor" href="#分布式锁简介" aria-hidden="true">#</a> 分布式锁简介</h1>
<blockquote>
<p>分布式锁，是一种思想，它的实现方式有很多。比如，我们将沙滩当做分布式锁的组件，那么它看起来应该是这样的：</p>
<ul>
<li><strong>加锁</strong>
在沙滩上踩一脚，留下自己的脚印，就对应了加锁操作。其他进程或者线程，看到沙滩上已经有脚印，证明锁已被别人持有，则等待。</li>
<li><strong>解锁</strong>
把脚印从沙滩上抹去，就是解锁的过程。</li>
<li><strong>锁超时</strong>
为了避免死锁，我们可以设置一阵风，在单位时间后刮起，将脚印自动抹去。</li>
</ul>
</blockquote>
<p>分布式锁的实现有很多，比如基于数据库、memcached、Redis、系统文件、zookeeper等。它们的核心的理念跟上面的过程大致相同。</p>
<p>在许多环境中不同进程必须以互斥方式使用共享资源进行操作时，分布式锁是一个非常有用的原语。此试图提供一种更规范的算法来实现Redis的分布式锁。我们提出了一种称为<code v-pre>Redlock</code>的算法，它实现了<code v-pre>DLM</code>（猜测是<code v-pre>Distributed Lock Manager</code>的缩写，分布式锁管理器），我们认为它比普通的单实例方法更安全。</p>
<h2 id="锁的安全和活性保证" tabindex="-1"><a class="header-anchor" href="#锁的安全和活性保证" aria-hidden="true">#</a> 锁的安全和活性保证</h2>
<p>算法的三个核心特征（三大最低保证）：</p>
<ul>
<li><strong>Safety property</strong>（安全性）：互斥。确保在任何给定时刻下，只有一个客户端可以持有锁；</li>
<li><strong>Liveness property A</strong>（活性A）：无死锁。即使存在曾经锁定资源的客户端崩溃或者出现网络分区异常，确保锁总是能够成功获取；</li>
<li><strong>Liveness property B</strong>（活性B）：容错性。只要大多数Redis节点处于正常运行状态，客户端就可以获取和释放锁。</li>
</ul>
<h2 id="主从结构故障转移时的并发问题" tabindex="-1"><a class="header-anchor" href="#主从结构故障转移时的并发问题" aria-hidden="true">#</a> 主从结构故障转移时的并发问题</h2>
<p>文档中还指出了目前算法对于故障转移的实现还存在明显的竞态条件问题（描述的应该是<code v-pre>Redis</code>主从架构下的问题）：</p>
<ul>
<li>客户端A获取Redis主节点中的锁（假设锁定的资源为X）</li>
<li>在Redis主节点把KEY同步到Redis从节点之前，Redis主节点崩溃</li>
<li>Redis从节点因为故障晋升为主节点</li>
<li>此时，客户端B获取资源X的锁成功，问题是资源X的锁在前面已经被客户端A获取过，这样就出现了并发问题。</li>
</ul>
<h1 id="单机下redis实现锁" tabindex="-1"><a class="header-anchor" href="#单机下redis实现锁" aria-hidden="true">#</a> 单机下Redis实现锁</h1>
<p>单个实例是我们将用于此处描述的分布式算法的基础。</p>
<h2 id="锁的获取" tabindex="-1"><a class="header-anchor" href="#锁的获取" aria-hidden="true">#</a> 锁的获取</h2>
<p>下面的redis命令是获取锁的核心思想 —— 如果键不存在，则设置一个id值（此时相当于拿到了锁），并且为了保证上面所说的活性要求，还设置了键的过期时间。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>SET resource_name my_random_value NX PX <span class="token number">30000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这实际上是<code v-pre>setnx</code>和<code v-pre>setex</code>的结合体，不过它是原子的。</p>
<p>如果较低版本的客户端中不支持这个命令，那就要使用lua脚本。</p>
<h2 id="锁的释放" tabindex="-1"><a class="header-anchor" href="#锁的释放" aria-hidden="true">#</a> 锁的释放</h2>
<p>下面的lua脚本的含义是：</p>
<p>当键存在，并且键值正是当前线程的独属id时（也就是防止释放别的线程加的锁，这就是这个独属于加到锁的线程的id的作用）。</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">if</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"get"</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">then</span>
    <span class="token keyword">return</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"del"</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">else</span>
    <span class="token keyword">return</span> <span class="token number">0</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用jedis实现-丐版-redis锁" tabindex="-1"><a class="header-anchor" href="#使用jedis实现-丐版-redis锁" aria-hidden="true">#</a> 使用Jedis实现”丐版“Redis锁</h2>
<p><s>注意下面的代码只能算是对redis加锁的原理予以初步的实践，远远达不到高性能、高可靠。</s></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyRedisLock</span> <span class="token keyword">implements</span> <span class="token class-name">Lock</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">JedisPool</span> jedisPool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JedisPool</span><span class="token punctuation">(</span><span class="token string">"localhost"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">EXPIRE_TIME_OUT</span> <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
    <span class="token comment">// SET命令已经提供了可选的复合操作符</span>
    <span class="token comment">// EX：设置超时时间，单位是秒</span>
    <span class="token comment">// PX：设置超时时间，单位是毫秒</span>
    <span class="token comment">// NX：IF NOT EXIST的缩写，只有KEY不存在的前提下才会设置K-V，设置成功返回1，否则返回0</span>
    <span class="token comment">// XX：IF EXIST的缩写，只有在KEY存在的前提下才会设置K-V，设置成功返回1，否则返回0</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">SetParams</span> params <span class="token operator">=</span> <span class="token class-name">SetParams</span><span class="token punctuation">.</span><span class="token function">setParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">px</span><span class="token punctuation">(</span><span class="token constant">EXPIRE_TIME_OUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> lockedId <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> lockName<span class="token punctuation">;</span>


    <span class="token keyword">private</span> <span class="token class-name">MyRedisLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> lockName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>lockName <span class="token operator">=</span> lockName<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">MyRedisLock</span> <span class="token function">getLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> lockName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyRedisLock</span><span class="token punctuation">(</span>lockName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> id <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lockedId<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> jedisPool<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 加锁失败就重试</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> statusCode <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>lockName<span class="token punctuation">,</span> id<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"OK"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>statusCode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 可以设计成 wait-notify 范式，不过这里就简陋一点了</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> jedisPool<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 为做到原子性，使用 Lua 脚本</span>
            <span class="token class-name">String</span> script <span class="token operator">=</span>
                    <span class="token string">"if redis.call('get',KEYS[1]) == ARGV[1] then"</span> <span class="token operator">+</span>
                            <span class="token string">"   return redis.call('del',KEYS[1]) "</span> <span class="token operator">+</span>
                            <span class="token string">"else"</span> <span class="token operator">+</span>
                            <span class="token string">"   return 0 "</span> <span class="token operator">+</span>
                            <span class="token string">"end"</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> id <span class="token operator">=</span> lockedId<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            jedis<span class="token punctuation">.</span><span class="token function">eval</span><span class="token punctuation">(</span>script<span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span>lockName<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> time<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

		<span class="token comment">// 测试代码</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyRedisLock</span> lock <span class="token operator">=</span> <span class="token class-name">MyRedisLock</span><span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">"lock1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        MyInteger.testLock(lock);</span>


        <span class="token keyword">long</span> l <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token class-name">N</span> <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">;</span>
        <span class="token class-name">MyInteger</span> integer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyInteger</span><span class="token punctuation">(</span><span class="token class-name">N</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CountDownLatch</span> countDownLatch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span><span class="token class-name">N</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ExecutorService</span> pool <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token class-name">N</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pool<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    integer<span class="token punctuation">.</span><span class="token function">decr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                countDownLatch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            countDownLatch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// just wait all tasks to finish</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"end : "</span> <span class="token operator">+</span> integer<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> r <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"耗时 "</span> <span class="token operator">+</span> <span class="token punctuation">(</span>r <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" ms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述算法的主要缺点：</p>
<ol>
<li>忙等（busy-waiting）的问题，消耗CPU资源；</li>
<li>只适用于单机；</li>
<li>不可重入</li>
<li>没有限制等待获取的锁的超时时间</li>
<li>不能做到在等待锁的时候响应中断</li>
</ol>
<h1 id="redisson实现分布式锁" tabindex="-1"><a class="header-anchor" href="#redisson实现分布式锁" aria-hidden="true">#</a> Redisson实现分布式锁</h1>
<p><a href="https://redisson.org/" target="_blank" rel="noopener noreferrer">Redisson<ExternalLinkIcon/></a>是架设在<a href="http://redis.cn/" target="_blank" rel="noopener noreferrer">Redis<ExternalLinkIcon/></a>基础上的一个Java驻内存数据网格（In-Memory Data Grid）。</p>
<p>相对于Jedis而言，Redisson是一个更高级的客户端。</p>
<p>它里面实现了各种分布式锁（本文只介绍和使用简单的）。</p>
<h2 id="使用redisson中的锁" tabindex="-1"><a class="header-anchor" href="#使用redisson中的锁" aria-hidden="true">#</a> 使用Redisson中的锁</h2>
<p><strong>maven依赖</strong></p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.redisson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>redisson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.16.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单使用 lock</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 配置类</span>
    <span class="token class-name">Config</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">useSingleServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token string">"redis://127.0.0.1:6379"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">useSingleServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"redis1234"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 初始化客户端</span>
    <span class="token keyword">final</span> <span class="token class-name">RedissonClient</span> client <span class="token operator">=</span> <span class="token class-name">Redisson</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>  
    <span class="token class-name">RLock</span> lock <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">"lock1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 加锁</span>
		lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        <span class="token comment">// do something ...  </span>
    <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
        <span class="token comment">// 释放锁</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redisson中rlock的实现特点" tabindex="-1"><a class="header-anchor" href="#redisson中rlock的实现特点" aria-hidden="true">#</a> Redisson中RLock的实现特点</h2>
<p><code v-pre>Redisson</code>中<code v-pre>RLock</code>的实现是基本参照了<code v-pre>Redis</code>的<code v-pre>red lock</code>算法进行实现，不过在原始的<code v-pre>red lock</code>算法下进行了改良，主要包括下面的特性：</p>
<ul>
<li>互斥</li>
<li>无死锁</li>
<li>可重入，类似于<code v-pre>ReentrantLock</code>，同一个线程可以重复获取同一个资源的锁（一般使用计数器实现），锁的重入特性一般情况下有利于提高资源的利用率</li>
<li><strong>续期</strong>，这个是一个比较前卫解决思路，也就是如果一个客户端对资源<code v-pre>X</code>永久锁定，那么并不是直接对<code v-pre>KEY</code>生存周期设置为<code v-pre>-1</code>，而是通<strong>过一个守护线程每隔固定周期延长<code v-pre>KEY</code>的过期时间</strong>，这样就能实现<strong>在守护线程不被杀掉的前提下，避免客户端崩溃导致锁无法释放长期占用资源的问题</strong></li>
<li><strong>锁状态变更订阅</strong>，依赖于<code v-pre>org.redisson.pubsub.LockPubSub</code>，用于订阅和通知锁释放事件</li>
<li>数据类型选用了<code v-pre>HASH</code>，配合<code v-pre>Lua</code>脚本完成多个命令的原子性</li>
</ul>
<p><code v-pre>RLock</code>的类图</p>
<figure><img src="@source/posts/rlock.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>RedissonLock<code v-pre>就是</code>RLock<code v-pre>的直接实现，也是分布式锁实现的核心类，从源码中看到</code>Redisson.getLock()<code v-pre>就是直接实例化</code>RedissonLock。</p>
<p><code v-pre>RedissonLock</code>的类继承图</p>
<figure><img src="@source/posts/redission-lock.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="加锁整体流程" tabindex="-1"><a class="header-anchor" href="#加锁整体流程" aria-hidden="true">#</a> 加锁整体流程</h2>
<blockquote>
<p>下面的代码是版本3.16.4中的，其他版本有点差别：</p>
</blockquote>
<h3 id="构造锁" tabindex="-1"><a class="header-anchor" href="#构造锁" aria-hidden="true">#</a> 构造锁</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">RedissonLock</span><span class="token punctuation">(</span><span class="token class-name">CommandAsyncExecutor</span> commandExecutor<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>commandExecutor<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//命令执行器</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>commandExecutor <span class="token operator">=</span> commandExecutor<span class="token punctuation">;</span>
    <span class="token comment">//UUID字符串</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> commandExecutor<span class="token punctuation">.</span><span class="token function">getConnectionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//内部锁过期时间(默认是 30*1000 , 也就是 30 秒)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>internalLockLeaseTime <span class="token operator">=</span> commandExecutor<span class="token punctuation">.</span>
                <span class="token function">getConnectionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCfg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLockWatchdogTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>entryName <span class="token operator">=</span> id <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>lockWatchdogTimeout</code>参数只有在没有使用<code v-pre>leaseTimeout</code>参数定义的成功获取到锁的场景（简单来说就是不设置时限的加锁）下生效，
如果看门狗在下一个<code v-pre>lockWatchdogTimeout</code>周期内不进行续期，那么锁就会过期释放
（从源码上看，每三分之一<code v-pre>lockWatchdogTimeout</code>就会执行一次续期任务，每次通过<code v-pre>pexpire</code>把<code v-pre>KEY</code>的存活周期延长<code v-pre>lockWatchdogTimeout</code>），<code v-pre>lockWatchdogTimeout</code>的默认值为<code v-pre>30000</code>，也就是<code v-pre>30</code>秒。</p>
<p>这里先列举一下<code v-pre>RedissonLock</code>中获取名称的方法，以便后面分析这些名称作为<code v-pre>K-V</code>结构的<code v-pre>KEY</code>时候使用：</p>
<ul>
<li><code v-pre>id</code>：由配置实例化时候实例化的<code v-pre>UUID</code>实例生成，从源码上分析每个连接方式的<code v-pre>Redisson</code>实例有唯一的<code v-pre>UUID</code>，<code v-pre>ConnectionManager</code>初始化的时候会调用<code v-pre>UUID id = UUID.randomUUID()</code>，笔者认为可以理解为<code v-pre>Redisson</code>实例在某个应用程序进程中的唯一标识，毕竟一般情况下，一个应用程序应该只会应用一种<code v-pre>Redisson</code>的连接方式</li>
<li><code v-pre>getEntryName()</code>：返回的是<code v-pre>UUID + : + $KEY</code>，例如<code v-pre>559cc9df-bad8-4f6c-86a4-ffa51b7f1c36:resource:x</code></li>
<li><code v-pre>getName()</code>：返回的是<code v-pre>$KEY</code>，例如<code v-pre>resource:x</code></li>
<li><code v-pre>getChannelName()</code>：返回的是<code v-pre>redisson_lock__channel:{$KEY}</code>，例如<code v-pre>redisson_lock__channel:{resource:x}</code></li>
<li><code v-pre>getLockName(long threadId)</code>：返回的是<code v-pre>UUID + : + $threadId</code>，例如<code v-pre>559cc9df-bad8-4f6c-86a4-ffa51b7f1c36:1</code></li>
</ul>
<h3 id="加锁" tabindex="-1"><a class="header-anchor" href="#加锁" aria-hidden="true">#</a> 加锁</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 获取锁</span>
		<span class="token keyword">public</span> <span class="token class-name">RLock</span> <span class="token function">getLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RedissonLock</span><span class="token punctuation">(</span>commandExecutor<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

		<span class="token doc-comment comment">/**
   	 * LeaseTime - 获取后持有锁的最长时间，如果它尚未通过调用unlock 。 如果leaseTime 为-1，则保持锁定直到显式解锁。
   	 */</span>
		 <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token keyword">long</span> leaseTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span> <span class="token keyword">boolean</span> interruptibly<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
      	<span class="token comment">// 当前线程ID</span>
        <span class="token keyword">long</span> threadId <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      	<span class="token comment">// 尝试获取锁</span>
        <span class="token class-name">Long</span> ttl <span class="token operator">=</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> leaseTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// lock acquired</span>
        <span class="token comment">// 如果ttl为 null，则证明获取锁成功</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ttl <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

      	<span class="token comment">// 如果获取锁失败，则订阅到对应这个锁的channel</span>
        <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RedissonLockEntry</span><span class="token punctuation">></span></span> future <span class="token operator">=</span> <span class="token function">subscribe</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>interruptibly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            commandExecutor<span class="token punctuation">.</span><span class="token function">syncSubscriptionInterrupted</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            commandExecutor<span class="token punctuation">.</span><span class="token function">syncSubscription</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
       
        <span class="token comment">// 不断尝试</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 再次尝试获取锁</span>
                ttl <span class="token operator">=</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> leaseTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// lock acquired</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>ttl <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// waiting for message</span>
                <span class="token comment">// ttl大于0 则等待ttl时间后继续尝试获取</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>ttl <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        future<span class="token punctuation">.</span><span class="token function">getNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span>ttl<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>interruptibly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        future<span class="token punctuation">.</span><span class="token function">getNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span>ttl<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>interruptibly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        future<span class="token punctuation">.</span><span class="token function">getNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        future<span class="token punctuation">.</span><span class="token function">getNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">acquireUninterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 取消对channel的订阅</span>
            <span class="token function">unsubscribe</span><span class="token punctuation">(</span>future<span class="token punctuation">,</span> threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token comment">//        get(lockAsync(leaseTime, unit));</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上代码，就是加锁的全过程。先调用<code v-pre>tryAcquire</code>来获取锁，如果返回值ttl为空，则证明加锁成功，返回；如果不为空，则证明加锁失败。这时候，它会订阅这个锁的Channel，等待锁释放的消息，然后重新尝试获取锁。流程如下：</p>
<img src="lock1.webp" style="zoom:60%;" />
<p>获取锁的过程是怎样的呢？接下来就要看<code v-pre>tryAcquire</code>方法。在这里，它有两种处理方式，一种是带有过期时间的锁，一种是不带过期时间的锁。</p>
<h3 id="获取互斥状态" tabindex="-1"><a class="header-anchor" href="#获取互斥状态" aria-hidden="true">#</a> 获取互斥状态</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
    <span class="token comment">// 同步方法依赖异步方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">long</span> waitTime<span class="token punctuation">,</span> <span class="token keyword">long</span> leaseTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span> <span class="token keyword">long</span> threadId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token function">tryAcquireAsync</span><span class="token punctuation">(</span>waitTime<span class="token punctuation">,</span> leaseTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> threadId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 通过传入锁持有的最大时间和线程ID异步获取锁
 */</span>
<span class="token keyword">private</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token function">tryAcquireAsync</span><span class="token punctuation">(</span><span class="token keyword">long</span> waitTime<span class="token punctuation">,</span> <span class="token keyword">long</span> leaseTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span> <span class="token keyword">long</span> threadId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> ttlRemainingFuture<span class="token punctuation">;</span>
  
  
        <span class="token keyword">if</span> <span class="token punctuation">(</span>leaseTime <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">// 锁持有最大时间不为-1，也就是明确锁的持有时间，不是永久持有的场景</span>
            ttlRemainingFuture <span class="token operator">=</span> <span class="token function">tryLockInnerAsync</span><span class="token punctuation">(</span>waitTime<span class="token punctuation">,</span> leaseTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> <span class="token class-name">RedisCommands</span><span class="token punctuation">.</span><span class="token constant">EVAL_LONG</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 先按照30秒的过期时间来执行获取锁的方法</span>
            ttlRemainingFuture <span class="token operator">=</span> <span class="token function">tryLockInnerAsync</span><span class="token punctuation">(</span>waitTime<span class="token punctuation">,</span> internalLockLeaseTime<span class="token punctuation">,</span>
                    <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> <span class="token class-name">RedisCommands</span><span class="token punctuation">.</span><span class="token constant">EVAL_LONG</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 如果还持有这个锁，则开启定时任务不断刷新该锁的过期时间</span>
        ttlRemainingFuture<span class="token punctuation">.</span><span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ttlRemaining<span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token comment">// // 执行异常场景直接返回</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            <span class="token comment">// lock acquired（当前已经获取到锁）</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ttlRemaining <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>leaseTime <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    internalLockLeaseTime <span class="token operator">=</span> unit<span class="token punctuation">.</span><span class="token function">toMillis</span><span class="token punctuation">(</span>leaseTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 如果是永久持有，定时调度进行 续期操作</span>
                    <span class="token function">scheduleExpirationRenewal</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ttlRemainingFuture<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="底层加锁逻辑" tabindex="-1"><a class="header-anchor" href="#底层加锁逻辑" aria-hidden="true">#</a> 底层加锁逻辑</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">tryLockInnerAsync</span><span class="token punctuation">(</span><span class="token keyword">long</span> waitTime<span class="token punctuation">,</span> <span class="token keyword">long</span> leaseTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span> <span class="token keyword">long</span> threadId<span class="token punctuation">,</span> <span class="token class-name">RedisStrictCommand</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> command<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">evalWriteAsync</span><span class="token punctuation">(</span><span class="token function">getRawName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">LongCodec</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">,</span> command<span class="token punctuation">,</span>
                 <span class="token comment">//如果锁不存在，则通过hincrby设置持有数为 1 ，并设置过期时间</span>
                 <span class="token comment">// KEYS[1] ：hash类型的键，代表哪个锁</span>
                 <span class="token comment">// ARGV[2] ：hash类型的字段，代表目前获取到锁的线程名</span>
                 <span class="token comment">// ARGV[1] ：传入的锁的过期时间                       </span>
                <span class="token string">"if (redis.call('exists', KEYS[1]) == 0) then "</span> <span class="token operator">+</span>
                        <span class="token string">"redis.call('hincrby', KEYS[1], ARGV[2], 1); "</span> <span class="token operator">+</span>
                        <span class="token string">"redis.call('pexpire', KEYS[1], ARGV[1]); "</span> <span class="token operator">+</span>
                        <span class="token string">"return nil; "</span> <span class="token operator">+</span>
                        <span class="token string">"end; "</span> <span class="token operator">+</span>
                        <span class="token comment">// 如果锁已存在，并且锁的是当前线程，则通过hincrby给数值递增1</span>
                        <span class="token string">"if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then "</span> <span class="token operator">+</span>
                        <span class="token string">"redis.call('hincrby', KEYS[1], ARGV[2], 1); "</span> <span class="token operator">+</span>
                        <span class="token string">"redis.call('pexpire', KEYS[1], ARGV[1]); "</span> <span class="token operator">+</span>
                        <span class="token string">"return nil; "</span> <span class="token operator">+</span>
                        <span class="token string">"end; "</span> <span class="token operator">+</span>
                        <span class="token string">"return redis.call('pttl', KEYS[1]);"</span><span class="token punctuation">,</span> <span class="token comment">// //如果锁已存在，但并非本线程，则返回过期时间ttl</span>
                <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token function">getRawName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unit<span class="token punctuation">.</span><span class="token function">toMillis</span><span class="token punctuation">(</span>leaseTime<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getLockName</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段LUA代码看起来并不复杂，有三个判断：</p>
<ul>
<li><strong>通过exists判断，如果锁不存在，则设置值和过期时间，加锁成功</strong></li>
<li><strong>通过hexists判断，如果锁已存在，并且锁的是当前线程，则证明是重入锁，加锁成功</strong></li>
<li><strong>如果锁已存在，但锁的不是当前线程，则证明有其他线程持有锁。返回当前锁的过期时间，加锁失败</strong></li>
</ul>
<img src="lock2.webp" style="zoom:60%;" />
<p>最后再概括一下<code v-pre>Redisson</code>中实现<code v-pre>red lock</code>算法使用的<code v-pre>HASH</code>数据类型：</p>
<ul>
<li><code v-pre>KEY</code>代表的就是资源或者锁，<strong>创建、存在性判断，延长生存周期和删除操作总是针对<code v-pre>KEY</code>进行的</strong></li>
<li><code v-pre>FIELD</code>代表的是锁名称<code v-pre>lockName()</code>，但是其实它由<code v-pre>Redisson</code>连接管理器实例的初始化<code v-pre>UUID</code>拼接客户端线程<code v-pre>ID</code>组成，严格来说应该是获取锁的客户端线程唯一标识；</li>
<li><code v-pre>VALUE</code>代表的是客户端线程对于锁的持有量。</li>
</ul>
<h2 id="解锁整体流程" tabindex="-1"><a class="header-anchor" href="#解锁整体流程" aria-hidden="true">#</a> 解锁整体流程</h2>
<h3 id="解锁" tabindex="-1"><a class="header-anchor" href="#解锁" aria-hidden="true">#</a> 解锁</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">unlockAsync</span><span class="token punctuation">(</span><span class="token keyword">long</span> threadId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RPromise</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedissonPromise</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// // 返回的RFuture如果持有的结果为true，说明解锁成功，返回NULL说明线程ID异常，加锁和解锁的客户端线程不是同一个线程</span>
        <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span> future <span class="token operator">=</span> <span class="token function">unlockInnerAsync</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        future<span class="token punctuation">.</span><span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">(</span>opStatus<span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
          	<span class="token comment">// 需要取消看门狗的续期任务</span>
            <span class="token function">cancelExpirationRenewal</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token comment">// 这是内部的异常，说明解锁异常</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">.</span><span class="token function">tryFailure</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
						<span class="token comment">// 这种情况说明线程ID异常，加锁和解锁的客户端线程不是同一个线程，抛出IllegalMonitorStateException异常</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>opStatus <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">IllegalMonitorStateException</span> cause <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IllegalMonitorStateException</span><span class="token punctuation">(</span><span class="token string">"attempt to unlock lock, not locked by current thread by node id: "</span>
                        <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">" thread-id: "</span> <span class="token operator">+</span> threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
                result<span class="token punctuation">.</span><span class="token function">tryFailure</span><span class="token punctuation">(</span>cause<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
						<span class="token comment">// 走到这里说明正常解锁</span>
            result<span class="token punctuation">.</span><span class="token function">trySuccess</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解锁的底层逻辑" tabindex="-1"><a class="header-anchor" href="#解锁的底层逻辑" aria-hidden="true">#</a> 解锁的底层逻辑</h3>
<p>核心还是lua脚本实现的原子性</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span> <span class="token function">unlockInnerAsync</span><span class="token punctuation">(</span><span class="token keyword">long</span> threadId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">evalWriteAsync</span><span class="token punctuation">(</span><span class="token function">getRawName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">LongCodec</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">,</span> <span class="token class-name">RedisCommands</span><span class="token punctuation">.</span><span class="token constant">EVAL_BOOLEAN</span><span class="token punctuation">,</span>
            <span class="token comment">// KEYS[1] 锁名</span>
            <span class="token comment">// ARGV[3] 线程id</span>
            <span class="token comment">// 如果释放锁的线程和已存在锁的线程不是同一个线程，返回null         </span>
            <span class="token string">"if (redis.call('hexists', KEYS[1], ARGV[3]) == 0) then "</span> <span class="token operator">+</span>
                    <span class="token string">"return nil;"</span> <span class="token operator">+</span>
                    <span class="token string">"end; "</span> <span class="token operator">+</span>
                    <span class="token comment">// 通过hincrby递减1的方式，释放一次锁</span>
                    <span class="token string">"local counter = redis.call('hincrby', KEYS[1], ARGV[3], -1); "</span> <span class="token operator">+</span>
                    <span class="token comment">// 若剩余次数大于0 ，则刷新过期时间</span>
                    <span class="token string">"if (counter > 0) then "</span> <span class="token operator">+</span>
                    <span class="token comment">// ARGV[2] 过期时间</span>
                    <span class="token string">"redis.call('pexpire', KEYS[1], ARGV[2]); "</span> <span class="token operator">+</span>
                    <span class="token string">"return 0; "</span> <span class="token operator">+</span>
                    <span class="token string">"else "</span> <span class="token operator">+</span>
                    <span class="token comment">// 否则证明锁已经释放，删除key并发布锁释放的消息</span>
                    <span class="token string">"redis.call('del', KEYS[1]); "</span> <span class="token operator">+</span>
                    <span class="token comment">// KEYS[2] ： 指的是 publish 的频道名</span>
                    <span class="token comment">// ARGV[1] ：解锁的消息</span>
                    <span class="token string">"redis.call('publish', KEYS[2], ARGV[1]); "</span> <span class="token operator">+</span>
                    <span class="token string">"return 1; "</span> <span class="token operator">+</span>
                    <span class="token string">"end; "</span> <span class="token operator">+</span>
                    <span class="token string">"return nil;"</span><span class="token punctuation">,</span>
            <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token function">getRawName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getChannelName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">LockPubSub</span><span class="token punctuation">.</span><span class="token constant">UNLOCK_MESSAGE</span><span class="token punctuation">,</span> internalLockLeaseTime<span class="token punctuation">,</span> <span class="token function">getLockName</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>如果解锁的线程和当前锁的线程不是同一个，解锁失败，抛出异常</strong>''</p>
</li>
<li>
<p><strong>通过hincrby递减1，先释放一次锁。</strong></p>
</li>
<li>
<p><strong>若剩余次数还大于0，则证明当前锁是重入锁，刷新过期时间；</strong></p>
</li>
<li>
<p><strong>若剩余次数小于0，删除key并发布锁释放的消息，解锁成功</strong></p>
</li>
</ol>
<img src="unlock.webp" style="zoom:60%;" />
<h2 id="redisson的锁总结" tabindex="-1"><a class="header-anchor" href="#redisson的锁总结" aria-hidden="true">#</a> Redisson的锁总结</h2>
<p><code v-pre>Redisson</code>中的<code v-pre>red lock</code>实现，应用到下面的核心技术：</p>
<ul>
<li>合理应用<code v-pre>Redis</code>的基本数据类型<code v-pre>HASH</code></li>
<li><code v-pre>Redis</code>的订阅发布</li>
<li><code v-pre>Lua</code>脚本的原子性</li>
<li><code v-pre>Netty</code>中的<code v-pre>Promise</code>实现</li>
<li><code v-pre>Netty</code>中的时间轮<code v-pre>HashedWheelTimer</code>和对应的定时任务<code v-pre>(HashedWheel)Timeout</code></li>
<li><code v-pre>Semaphore</code>进行带期限、永久或者可中断的阻塞以及唤醒，替代<code v-pre>CountDownLatch</code>中的无等待期限阻塞</li>
</ul>
<p>上面的核心技术相对合理地应用，才能实现一个高效而且容错能力相对比较高的分布式锁方案，但是从目前来看，<code v-pre>Redisson</code>仍未解决<code v-pre>red lock</code>算法中的故障转移缺陷，笔者认为这个有可能是<code v-pre>Redis</code>实现分布式锁方案的一个底层缺陷，<strong>此方案在<code v-pre>Redis</code>单实例中是相对完善</strong>，一旦应用在<code v-pre>Redis</code>集群（普通主从、哨兵或者<code v-pre>Cluster</code>），有几率会出现前文提到的节点角色切换导致多个不同客户端获取到同一个资源对应的锁的问题。暂时无解。</p>
<blockquote>
<p>但值得注意的是，上面的两种实现方式都是针对单机Redis实例而进行的。如果我们有多个Redis实例，请参阅<strong>Redlock算法</strong>。该算法的具体内容，请参考http://redis.cn/topics/distlock.html</p>
</blockquote>
<blockquote>
<p><a href="https://www.cnblogs.com/throwable/p/14264804.html" target="_blank" rel="noopener noreferrer">冷饭新炒：理解Redisson中分布式锁的实现 <ExternalLinkIcon/></a></p>
<p><a href="https://redis.io/topics/distlock" target="_blank" rel="noopener noreferrer">Distributed locks with Redis<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/dlf123321/article/details/123032170?spm=1001.2014.3001.5501" target="_blank" rel="noopener noreferrer">分布式锁的进化过程<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


