<template><div><h1 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h1>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Reference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token comment">//引用的对象</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> referent<span class="token punctuation">;</span>        
    <span class="token comment">//回收队列，由使用者在Reference的构造函数中指定</span>
    <span class="token keyword">volatile</span> <span class="token class-name">ReferenceQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">></span></span> queue<span class="token punctuation">;</span>
     <span class="token comment">//当该引用被加入到queue中的时候，该字段被设置为queue中的下一个元素，以形成链表结构</span>
    <span class="token keyword">volatile</span> <span class="token class-name">Reference</span> next<span class="token punctuation">;</span>
    <span class="token comment">//在GC时，JVM底层会维护一个叫DiscoveredList的链表，存放的是Reference对象，discovered字段指向的就是链表中的下一个元素，由JVM设置</span>
    <span class="token keyword">transient</span> <span class="token keyword">private</span> <span class="token class-name">Reference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> discovered<span class="token punctuation">;</span>  
    <span class="token comment">//进行线程同步的锁对象</span>
    <span class="token keyword">static</span> <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Lock</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//等待加入queue的Reference对象，在GC时由JVM设置，会有一个java层的线程(ReferenceHandler)源源不断的从pending中提取元素加入到queue</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Reference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> pending <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个Reference对象的生命周期如下：</p>
<figure><img src="@source/docs/java-ref.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h1 id="_1-强引用" tabindex="-1"><a class="header-anchor" href="#_1-强引用" aria-hidden="true">#</a> 1.强引用</h1>
<p>我们平日里面的用到的new了一个对象就是强引用，例如 <code v-pre>Object obj = new Object();</code></p>
<p>当JVM的内存空间不足时，宁愿抛出OutOfMemoryError使得程序异常终止也不愿意回收具有<strong>强引用的存活着的对象</strong>！</p>
<p>回收的时间是不一定的，具体得看GC回收策略。</p>
<h1 id="_2-软引用" tabindex="-1"><a class="header-anchor" href="#_2-软引用" aria-hidden="true">#</a> 2.软引用</h1>
<p>软引用的生命周期比强引用短一些。软引用是通过<code v-pre>SoftReference</code>类实现的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SoftReference</span> softObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SoftReference</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj <span class="token operator">=</span> <span class="token keyword">null</span>； <span class="token comment">//去除强引用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就是一个简单的软引用使用方法。通过<code v-pre>get()</code>方法获取对象。</p>
<p><strong>当JVM认为内存空间不足时，就回去试图回收软引用指向的对象</strong>，也就是说在JVM抛出<code v-pre>OutOfMemoryError</code>之前，会去清理软引用对象。</p>
<p>软引用可以与引用队列<code v-pre>(ReferenceQueue)</code>联合使用。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ReferenceQueue</span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReferenceQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SoftReference</span> softObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SoftReference</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj <span class="token operator">=</span> <span class="token keyword">null</span>； <span class="token comment">//去除强引用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当<code v-pre>softObj</code>软引用的<code v-pre>obj</code>被GC回收之后，<code v-pre>softObj</code> 对象就会被塞到<code v-pre>queue</code>中，之后我们可以通过这个队列的<code v-pre>poll()</code>来检查你关心的对象是否被回收了，如果队列为空，就返回一个<code v-pre>null</code>。反之就返回软引用对象也就是<code v-pre>softObj</code>。</p>
<p><strong>软引用一般用来实现内存敏感的缓存</strong>，如果有空闲内存就可以保留缓存，当内存不足时就清理掉，这样就保证使用缓存的同时不会耗尽内存。例如图片缓存框架中缓存图片就是通过软引用的。</p>
<h1 id="_3-弱引用" tabindex="-1"><a class="header-anchor" href="#_3-弱引用" aria-hidden="true">#</a> 3.弱引用</h1>
<p>弱引用是通过<code v-pre>WeakReference</code>类实现的，它的生命周期比软引用还要短, 也是通过<code v-pre>get()</code>方法获取对象。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> weakObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
 obj <span class="token operator">=</span> <span class="token keyword">null</span>； <span class="token comment">//去除强引用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在GC的时候，JVM 不管内存空间足不足都会回收这个对象</strong>，同样也可以配合<code v-pre>ReferenceQueue</code> 使用，也同样适用于内存敏感的缓存。</p>
<p><code v-pre>ThreadLocal</code>中的<code v-pre>Entry</code>就是继承了<code v-pre>WeakReference</code>类，这<code v-pre>Entry</code>弱引用着<code v-pre>ThreadLocal</code>。</p>
<h1 id="_4-幻象引用" tabindex="-1"><a class="header-anchor" href="#_4-幻象引用" aria-hidden="true">#</a> 4.幻象引用</h1>
<p>也称虚引用，是通过<code v-pre>PhantomReference</code>类实现的。任何时候可能被GC回收,就像没有引用一样。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ReferenceQueue</span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReferenceQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PhantomReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> phantomObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhantomReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>obj <span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj <span class="token operator">=</span> <span class="token keyword">null</span>； <span class="token comment">//去除强引用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过<strong>无法通过虚引用访问对象的任何属性或者函数</strong>。</p>
<p>那就要问了要它有什么用？</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PhantomReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Reference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token comment">// 永远返回 null</span>
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虚引用仅仅只是提供了一种确保对象被<code v-pre>finalize</code>以后来做某些事情的机制。比如说这个对象被回收之后发一个系统通知啊啥的。虚引用是必须配合<code v-pre>ReferenceQueue</code> 使用的，具体使用方法和上面提到软引用的一样。主要用来跟踪对象被垃圾回收的活动。</p>
<p>一个错误认知：</p>
<blockquote>
<p>严格的说，<strong>虚引用是会影响对象生命周期的</strong>，如果不做任何处理，只要虚引用不被回收，那其引用的对象永远不会被回收。所以一般来说，从ReferenceQueue中获得PhantomReference对象后，如果PhantomReference对象不会被回收的话（比如被其他GC ROOT可达的对象引用），需要调用clear方法解除PhantomReference和其引用对象的引用关系。</p>
</blockquote>
<blockquote>
<p>[<a href="https://segmentfault.com/a/1190000039994284" target="_blank" rel="noopener noreferrer">Java四种引用类型原理你真的搞明白了吗？五分钟带你深入理解！<ExternalLinkIcon/></a>](https://segmentfault.com/a/1190000039994284)</p>
</blockquote>
</div></template>


