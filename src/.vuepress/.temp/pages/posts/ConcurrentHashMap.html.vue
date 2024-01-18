<template><div><p>本篇文章将要介绍的 ConcurrentHashMap 是 HashMap 的并发版本，它是线程安全的，并且在高并发的情境下，性能优于 Hashtable 很多。</p>
<h2 id="历史版本的演变" tabindex="-1"><a class="header-anchor" href="#历史版本的演变" aria-hidden="true">#</a> 历史版本的演变</h2>
<blockquote>
<p><em>一句话总结</em></p>
<p>从JDK7版本的ReentrantLock+Segment+HashEntry，到JDK8版本中synchronized+CAS+HashEntry+红黑树。</p>
</blockquote>
<h3 id="jdk7的concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#jdk7的concurrenthashmap" aria-hidden="true">#</a> JDK7的ConcurrentHashMap</h3>
<p>JDK7 采用<strong>分段锁技术</strong>，<strong>整个 Hash 表被分成多个段（默认为16段），每个段中会对应一个 Segment 段锁</strong>，<strong>段与段之间可以并发访问，但是多线程想要操作同一个段是需要获取锁的</strong>。所有的 put，get，remove 等方法都是根据键的 hash 值对应到相应的段中，然后尝试获取锁进行访问。</p>
<p>相当于通过增加锁的数量来降低锁的粒度（能支持 N 个 Segment 这么多次数的并发）。</p>
<figure><img src="@source/posts/jdk7-segment.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>下图为JDK7的数据结构。</p>
<figure><img src="@source/posts/jdk7-segment2.webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Segment 是 ConcurrentHashMap 的一个内部类，主要的组成如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Segment</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">ReentrantLock</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
       <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">2249069246763182397L</span><span class="token punctuation">;</span>
       
       <span class="token comment">// 和 HashMap 中的 HashEntry 作用一样，真正存放数据的桶</span>
       <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">HashEntry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> table<span class="token punctuation">;</span>
       <span class="token keyword">transient</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>
       <span class="token keyword">transient</span> <span class="token keyword">int</span> modCount<span class="token punctuation">;</span>
       <span class="token keyword">transient</span> <span class="token keyword">int</span> threshold<span class="token punctuation">;</span>
       <span class="token keyword">final</span> <span class="token keyword">float</span> loadFactor<span class="token punctuation">;</span>
       
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原理上来说：ConcurrentHashMap 采用了分段锁技术，其中 Segment 继承于 ReentrantLock。不会像 HashTable 那样不管是 put 还是 get 操作都需要做同步处理，理论上 ConcurrentHashMap 支持 CurrencyLevel (Segment 数组数量)的线程并发。每当一个线程占用锁访问一个 Segment 时，不会影响到其他的 Segment。</p>
<p>下面也来看看核心的 <code v-pre>put</code>、<code v-pre>get</code> 方法。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Segment</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> s<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> hash <span class="token operator">=</span> <span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token punctuation">(</span>hash <span class="token operator">>>></span> segmentShift<span class="token punctuation">)</span> <span class="token operator">&amp;</span> segmentMask<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>s <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Segment</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token constant">UNSAFE</span><span class="token punctuation">.</span>getObject          <span class="token comment">// nonvolatile; recheck</span>
         <span class="token punctuation">(</span>segments<span class="token punctuation">,</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;&lt;</span> <span class="token constant">SSHIFT</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token constant">SBASE</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">//  in ensureSegment</span>
        s <span class="token operator">=</span> <span class="token function">ensureSegment</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hash<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先是通过 key 定位到 Segment，之后在对应的 Segment 中进行具体的 put。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> hash<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">,</span> <span class="token keyword">boolean</span> onlyIfAbsent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">HashEntry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> node <span class="token operator">=</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span>
        <span class="token function">scanAndLockForPut</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hash<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 尝试获取锁，如果获取失败肯定就有其他线程存在竞争</span>
    <span class="token class-name">V</span> oldValue<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">HashEntry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token punctuation">(</span>tab<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> hash<span class="token punctuation">;</span>
        <span class="token class-name">HashEntry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> first <span class="token operator">=</span> <span class="token function">entryAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">HashEntry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> e <span class="token operator">=</span> first<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">K</span> k<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>k <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span>
                    <span class="token punctuation">(</span>e<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    oldValue <span class="token operator">=</span> e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>onlyIfAbsent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
                        <span class="token operator">++</span>modCount<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                e <span class="token operator">=</span> e<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    node<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashEntry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> first<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> c <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">></span> threshold <span class="token operator">&amp;&amp;</span> tab<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token constant">MAXIMUM_CAPACITY</span><span class="token punctuation">)</span>
                    <span class="token function">rehash</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    <span class="token function">setEntryAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> index<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token operator">++</span>modCount<span class="token punctuation">;</span>
                count <span class="token operator">=</span> c<span class="token punctuation">;</span>
                oldValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> oldValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>scanAndLockForPut</code>为第一步操作：获取锁，尝试自旋获取锁（try lock），如果重试的次数达到了 <code v-pre>MAX_SCAN_RETRIES</code> 则改为阻塞锁（lock）获取，保证能获取成功。</p>
<p>再结合图看看 put 的流程。</p>
<ol>
<li>将当前 Segment 中的 table 通过 key 的 hashcode 定位到 HashEntry。</li>
<li>遍历该 HashEntry，如果不为空则判断传入的 key 和当前遍历的 key 是否相等，相等则覆盖旧的 value。</li>
<li>不为空则需要新建一个 HashEntry 并加入到 Segment 中，同时会先判断是否需要扩容。</li>
<li>最后会解除在 1 中所获取当前 Segment 的锁。</li>
</ol>
<p><code v-pre>get</code>的逻辑比价简单：</p>
<p>只需要将 Key 通过 Hash 之后定位到具体的 Segment ，再通过一次 Hash 定位到具体的元素上。</p>
<p>由于 HashEntry 中的 value 属性是用 volatile 关键词修饰的，保证了内存可见性，所以每次获取时都是最新值。</p>
<p>ConcurrentHashMap 的 get 方法是非常高效的，<strong>因为整个过程都不需要加锁</strong>。</p>
<h3 id="jdk8的concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#jdk8的concurrenthashmap" aria-hidden="true">#</a> JDK8的ConcurrentHashMap</h3>
<p>J<strong>DK8 取消了基于 Segment 的分段锁思想</strong>，<strong>改用 CAS + synchronized 控制并发操作</strong>，在某些方面提升了性能。</p>
<p><strong>并且追随 1.8 版本的 HashMap 底层实现，使用数组+链表+红黑树进行数据存储</strong>。本篇主要介绍 1.8 版本的 ConcurrentHashMap 的具体实现。</p>
<h3 id="put流程" tabindex="-1"><a class="header-anchor" href="#put流程" aria-hidden="true">#</a> put流程</h3>
<ul>
<li>根据 key 计算出 hashcode 。</li>
<li>判断是否需要进行初始化。</li>
<li><code v-pre>f</code> 即为当前 key 定位出的 Node，<strong>如果为空表示当前位置可以写入数据，利用 CAS 尝试写入，失败则自旋保证成功</strong>。</li>
<li>如果当前位置的 <code v-pre>hashcode == MOVED == -1</code>,则需要进行扩容。</li>
<li>如果都不满足，则利用 synchronized 锁写入数据。</li>
<li>如果数量大于 <code v-pre>TREEIFY_THRESHOLD</code> 则要转换为红黑树。</li>
</ul>
<p>有关其之前版本的实现情况，这里推荐几篇文章：</p>
<p><a href="http://www.jianshu.com/p/e694f1e868ec" target="_blank" rel="noopener noreferrer">谈谈ConcurrentHashMap1.7和1.8的不同实现<ExternalLinkIcon/></a>
<a href="https://www.cnblogs.com/everSeeker/p/5601861.html" target="_blank" rel="noopener noreferrer">ConcurrentHashMap在jdk1.8中的改进<ExternalLinkIcon/></a>
<a href="https://www.cnblogs.com/study-everyday/p/6430462.html" target="_blank" rel="noopener noreferrer">ConcurrentHashMap原理分析（1.7与1.8）<ExternalLinkIcon/></a></p>
<h3 id="jdk7与jdk8的区别" tabindex="-1"><a class="header-anchor" href="#jdk7与jdk8的区别" aria-hidden="true">#</a> JDK7与JDK8的区别</h3>
<ol>
<li><strong>底层数据结构</strong>：<strong>取消了Segment分段锁的数据结构</strong>，取而代之的是Node数组+链表+红黑树的结构，从而实现了对每一行数据进行加锁，进一步减少并发冲突的概率。</li>
</ol>
<blockquote>
<p>Node类成员变量Node的元素val和指针next都标注volatile，目的是在多线程环境下<strong>线程A修改结点的val或者新增节点的时候是对线程B可见的</strong>。</p>
</blockquote>
<blockquote>
<p>ConcurrentHashMap有成员变量transient volatile Node&lt;K,V&gt;[] table，此volatile的目的是<strong>为了使Node数组在扩容的时候对其他线程具有可见性</strong>。（例如：volatile int array[10]是指array的地址是volatile的而不是数组元素的值是volatile的.）</p>
</blockquote>
<ol start="2">
<li><strong>保证线程安全机制</strong>：JDK7采用segment的分段锁机制实现线程安全，其中segment继承自ReentrantLock。<strong>JDK8采用CAS(读)+Synchronized(写)保证线程安全</strong>。</li>
<li><strong>锁的粒度</strong>：原来是对需要进行数据操作的Segment加锁**，JDK8调整为对每个数组元素加锁（Node）**。</li>
<li><strong>链表转化为红黑树</strong>：定位结点的hash算法简化会带来弊端，Hash冲突加剧，因此在链表节点数量大于8时，会将链表转化为红黑树进行存储。</li>
<li><strong>查询时间复杂度</strong>：从原来的遍历链表O(n)，变成遍历红黑树O(logN)。</li>
</ol>
<h3 id="collections-synchronizedmap、hashtable、concurrenthashmap区别" tabindex="-1"><a class="header-anchor" href="#collections-synchronizedmap、hashtable、concurrenthashmap区别" aria-hidden="true">#</a> Collections.synchronizedMap、Hashtable、ConcurrentHashMap区别</h3>
<blockquote>
<p>参考文章</p>
<p><a href="https://www.cnblogs.com/yangming1996/p/8031199.html" target="_blank" rel="noopener noreferrer">为并发而生的 ConcurrentHashMap（Java 8）<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/6844903813892014087" target="_blank" rel="noopener noreferrer">解读Java8中ConcurrentHashMap是如何保证线程安全的<ExternalLinkIcon/></a></p>
<p><a href="https://crossoverjie.top/2018/07/23/java-senior/ConcurrentHashMap/" target="_blank" rel="noopener noreferrer">HashMap? ConcurrentHashMap? 相信看完这篇没人能难住你！<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


