<template><div><h1 id="从自己实现一把锁说起" tabindex="-1"><a class="header-anchor" href="#从自己实现一把锁说起" aria-hidden="true">#</a> 从自己实现一把锁说起</h1>
<p>《操作系统概念》一书中在第6章”同步“中，以CAS这样的原子命令实现了锁的语义，并且以它为基础实现了非忙等（busy waiting）的锁。</p>
<p>下面我们在Java中使用<code v-pre>AtomicBoolean</code>这个原子更新类实现</p>
<h2 id="代码实例" tabindex="-1"><a class="header-anchor" href="#代码实例" aria-hidden="true">#</a> 代码实例</h2>
<p>众所周知，<code v-pre>i++</code>是经典的读改写操作，它不是原子的。</p>
<p>下面的代码在多线程环境下将一个数<code v-pre>x</code>自增N次，并观察在加锁和不加锁的情况下的结果。</p>
<p>结果，显示如果使用我们自己的实现的互斥锁，<code v-pre>x</code>最终等于N，也说明锁生效了。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LockByCAS</span> <span class="token keyword">implements</span> <span class="token class-name">Lock</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicBoolean</span> isLocked <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicBoolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyInteger</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> x<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">MyInteger</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">void</span> <span class="token function">incr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            x<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyInteger</span> integer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token class-name">N</span> <span class="token operator">=</span> <span class="token number">1000000</span><span class="token punctuation">;</span>
        <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleMutex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CountDownLatch</span> countDownLatch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span><span class="token class-name">N</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ExecutorService</span> pool <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token class-name">N</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pool<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token comment">// 你可以去掉这个，看看结果</span>
                lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                integer<span class="token punctuation">.</span><span class="token function">incr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                countDownLatch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        countDownLatch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// just wait all tasks to finish</span>
        pool<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>integer<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// busy waiting</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>isLocked<span class="token punctuation">.</span><span class="token function">compareAndExchange</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>        
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        isLocked<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">/* 省略其他接口的方法 */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是<code v-pre>compareAndSet</code>和<code v-pre>compareAndExchange</code>的区别，<code v-pre>compareAndExchange</code>的返回值是旧值，</p>
<p>而<code v-pre>compareAndSet</code>的返回值是CAS是否成功。</p>
<p>所以，如果在Java8中，使用<code v-pre>compareAndSet</code>可以使用下面的代码代替上面的循环。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">/* notice that compareAndExchange is different from compareAndSet*/</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// CAS succeed to jump the loop</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>isLocked<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>来总结一下自己实现的锁的缺点。</p>
<ol>
<li>使用<code v-pre>while</code>+<code v-pre>yield</code>，实际上就是忙等，在线程竞争非常剧烈的时候，CPU资源被大大浪费。不好，我们后面会用<code v-pre>wait</code>+<code v-pre>notify</code>的范式解决这个问题，使得线程没有获得锁的时候可以放弃CPU资源。</li>
<li>使用了<code v-pre>AtomicBoolean</code>，以及编写了一些自旋锁实现的模板代码。如果要实现其它的同步工具，这样的模板代码还要再写一遍。况且，<code v-pre>AtomicBoolean</code>自己是怎么实现的呢？</li>
</ol>
<blockquote>
<p>实际上面的痛点也正是由AQS(抽象队列同步器)所要解决的问题了。</p>
</blockquote>
<p>我们不妨看一看使用AQS实现一个非忙等的互斥锁有多简单，再开始我们对AQS的介绍。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleMutex</span> <span class="token keyword">implements</span> <span class="token class-name">Lock</span> <span class="token punctuation">{</span>

    <span class="token comment">// Our internal helper class</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Sync</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span> <span class="token punctuation">{</span>

        <span class="token comment">// Acquires the lock if state is zero</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> acquires<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">compareAndSetState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Releases the lock by setting state to zero</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryRelease</span><span class="token punctuation">(</span><span class="token keyword">int</span> releases<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// no need to use cas</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Provides a Condition</span>
        <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AbstractQueuedSynchronizer<span class="token punctuation">.</span>ConditionObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token comment">// The sync object does all the hard work. We just forward to it.</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Sync</span> sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
    <span class="token comment">// 还有其他的加锁方法，这里省略。下面的 Mutex 会有完整的实现。</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过继承AQS并重写一些方法，就可以实现一份非忙等的锁（不过这个锁还有一些锁语义的检查没有实现，这里仅仅作一个展示罢了）。</p>
<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1>
<p><code v-pre>AbstractQueuedSynchronizer</code>抽象队列同步器（简称<strong>队列同步器</strong>），是用来构建锁、信号量等同步组件的一个基础模板类，它使用了一个int成员变量来表示同步状态，通过内置的FIFO队，来完成对那些因为竞争资源（这里的资源形式各式各样，比如锁就是一个典型的竞争资源）而等待的线程的排队工作。</p>
<h2 id="如何使用aqs" tabindex="-1"><a class="header-anchor" href="#如何使用aqs" aria-hidden="true">#</a> 如何使用AQS</h2>
<p>AQS是一个抽象类，因此必须有子类去实现它的抽象方法。</p>
<p>设计模式告诉我们，聚合由于继承。</p>
<p>所以常见的使用方式是：</p>
<p>在自定义的同步组件中，用一个静态内部类去继承AQS，实现它的抽象方法。自定义的同步组件使用这个AQS的子类去实现high-level的同步语义。</p>
<p>要将此类用作同步器的基础，请根据适用情况重新定义以下方法，</p>
<ol>
<li><code v-pre>tryAcquire</code></li>
<li><code v-pre>tryRelease</code></li>
<li><code v-pre>tryAcquireShared</code></li>
<li><code v-pre>tryReleaseShared</code></li>
<li><code v-pre>isHeldExclusively</code></li>
</ol>
<p>默认情况下，这些方法中的每一个都会抛出<code v-pre>UnsupportedOperationException </code>。 这些方法的实现必须是内部线程安全的，并且通常应该是立即返回的而不是阻塞的。</p>
<p>override这些方法是使用此类的唯一支持方式。 所有其他方法都被声明为final因为都是模板类的模板方法，无需也不能重写。</p>
<p>重写同步器指定的方法时,需要使用<code v-pre>getState</code> 、 <code v-pre>setState()</code>、<code v-pre>compareAndSetState</code>来检查或修改同步器的状态。</p>
<h2 id="aqs和同步组件的关系" tabindex="-1"><a class="header-anchor" href="#aqs和同步组件的关系" aria-hidden="true">#</a> AQS和同步组件的关系</h2>
<p>同步组件面向同步组件的使用者，比如<code v-pre>ReentrantLock</code> ；</p>
<p>而AQS构建同步组件的实现者，它隐藏了很多实现具体的实现细节，实现者只需要实现AQS的若干方法即可。</p>
<p>锁和同步器很好地隔离了使用者和实现者所需关注的领域。同时省去实现者对大量模板方法的编写。</p>
<h1 id="源码分析" tabindex="-1"><a class="header-anchor" href="#源码分析" aria-hidden="true">#</a> 源码分析</h1>
<h3 id="aqs用于访问和修改同步状态的方法" tabindex="-1"><a class="header-anchor" href="#aqs用于访问和修改同步状态的方法" aria-hidden="true">#</a> AQS用于访问和修改同步状态的方法</h3>
<ul>
<li><code v-pre>getState()</code> : 获取当前同步状态；</li>
<li><code v-pre>setState(int newState)</code> 设置当前同步状态；</li>
<li><code v-pre>compareAndSetState(int expect, int update)</code>使用CAS设置当前的状态，该方法是原子的。</li>
</ul>
<h2 id="aqs的可重写的方法" tabindex="-1"><a class="header-anchor" href="#aqs的可重写的方法" aria-hidden="true">#</a> AQS的可重写的方法</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 独占式获取同步状态，该方法应该查询对象的状态是否符合预期，如果允许，再进行CAS设置同步状态；</span>
    <span class="token comment">// 如果此方法返回失败，acquire 方法可能会将线程排队（如果它尚未排队），直到收到来自某个其他线程的释放信号。 </span>
    <span class="token comment">// 获取到同步状态返回 true, 否则返回 false</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 独占式释放同步状态，其他在等待获取同步状态的线程将有机会获取同步状态</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryRelease</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 共享式获取同步状态，该方法应该查询对象的状态是否允许在共享模式下获取它，如果允许则获取它。</span>
    <span class="token comment">// 如果此方法返回失败，acquire 方法可能会将线程排队（如果它尚未排队），直到收到来自某个其他线程的释放信号。</span>
    <span class="token keyword">protected</span> <span class="token keyword">int</span> <span class="token function">tryAcquireShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 共享式释放同步状态</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryReleaseShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 查询同步器是否在独占模式下被线程使用，一般该方法表示同步器是否被该线程独占（参考线程获取到锁的状态）</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="aqs提供的模板方法" tabindex="-1"><a class="header-anchor" href="#aqs提供的模板方法" aria-hidden="true">#</a> AQS提供的模板方法</h2>
<p>独占式和共享式获取的区别在于<strong>同一时刻能否有多个线程同时获取的同步状态</strong>。</p>
<p>（比如读写锁中，读-读共享，实际上就是因为可以同时共享的获取到同步状态）。</p>
<table>
<thead>
<tr>
<th>方法名称</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>独占式的获取释放同步状态</strong></td>
<td>~</td>
</tr>
<tr>
<td>void acquire(int arg)</td>
<td>独占式获取同步状态，调用重写的<code v-pre>tryAcquire</code>后如果成功直接返回，否则进入同步队列等待。</td>
</tr>
<tr>
<td>void acquireInterruptibly(int arg)</td>
<td>与<code v-pre>acquire</code>类似，不过该方法响应中断。在当前线程在同步队列等待的时候，如果它被中断，则该方法会抛出`InterruptedException·。</td>
</tr>
<tr>
<td>boolean tryAcquireNanos(int arg, long nanosTimeout)</td>
<td>在<code v-pre>acquireInterruptibly</code>的基础上加了超时限制，如果没有在限制时间内获取到同步状态，返回false。</td>
</tr>
<tr>
<td>boolean release(int arg)</td>
<td>独占式的释放同步状态，该方法会在释放同步状态后，将同步队列中第一个节点包含的线程唤醒。该方法会调用重写的<code v-pre>tryRelease</code></td>
</tr>
<tr>
<td><strong>共享式的获取释放同步状态</strong></td>
<td>~</td>
</tr>
<tr>
<td>void acquireShared(int arg)</td>
<td>共享式获取同步状态，如果不能获取到同步状态，进入同步队列等待，和独占式获取的主要区别在于同一时刻可以有多个线程获取到同步状态。</td>
</tr>
<tr>
<td>void acquireSharedInterruptibly(int arg)</td>
<td></td>
</tr>
<tr>
<td>boolean tryAcquireSharedNanos(int arg, long nanosTimeout)</td>
<td></td>
</tr>
<tr>
<td>boolean releaseShared(int arg)</td>
<td></td>
</tr>
<tr>
<td><strong>查询同步队列的情况</strong></td>
<td>~</td>
</tr>
<tr>
<td>boolean hasQueuedThreads()</td>
<td>查询是否有线程在等待获取</td>
</tr>
<tr>
<td>getFirstQueuedThread</td>
<td>返回队列中的第一个（等待时间最长的）线程，如果当前没有线程排队，则返回null 。</td>
</tr>
<tr>
<td>boolean isQueued(Thread thread)</td>
<td>如果给定线程当前正在排队，则返回 true。<br/>此实现遍历队列以确定给定线程的存在。</td>
</tr>
<tr>
<td>Collection<code v-pre>&lt;Thread&gt;</code>getQueuedThreads()</td>
<td>返回一个包含可能正在等待获取的线程的集合。</td>
</tr>
</tbody>
</table>
<h1 id="使用aqs实现简单的同步工具" tabindex="-1"><a class="header-anchor" href="#使用aqs实现简单的同步工具" aria-hidden="true">#</a> 使用AQS实现简单的同步工具</h1>
<h2 id="不可重入的独占锁mutex" tabindex="-1"><a class="header-anchor" href="#不可重入的独占锁mutex" aria-hidden="true">#</a> 不可重入的独占锁Mutex</h2>
<p>这个 <code v-pre>Mutex</code> 就是对上面的 <em>自己实现锁</em> 的句号了，</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Mutex</span> <span class="token keyword">implements</span> <span class="token class-name">Lock</span> <span class="token punctuation">{</span>

    <span class="token comment">// Our internal helper class</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Sync</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span> <span class="token punctuation">{</span>
        <span class="token comment">// Acquires the lock if state is zero</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> acquires<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">assert</span> acquires <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// Otherwise unused</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 设置当前拥有独占访问权限的线程。</span>
                <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Releases the lock by setting state to zero</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryRelease</span><span class="token punctuation">(</span><span class="token keyword">int</span> releases<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">assert</span> releases <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// Otherwise unused</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// 只有抢到锁的才能释放锁</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalMonitorStateException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// a data race, but safe due to out-of-thin-air guarantees</span>
            <span class="token keyword">return</span> <span class="token function">getExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Reports whether in locked state</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Provides a Condition</span>
        <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AbstractQueuedSynchronizer<span class="token punctuation">.</span>ConditionObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token comment">// The sync object does all the hard work. We just forward to it.</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Sync</span> sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquireInterruptibly</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeout<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">tryAcquireNanos</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> unit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">isLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isHeldByCurrentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasQueuedThreads</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">hasQueuedThreads</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简易的发令枪-booleanlatch" tabindex="-1"><a class="header-anchor" href="#简易的发令枪-booleanlatch" aria-hidden="true">#</a> 简易的发令枪 BooleanLatch</h2>
<p>如下图实现的是一个简单的<code v-pre>CountDownLatch</code>,</p>
<p>不过只需要调用<code v-pre>fire</code>就可以唤醒所有那些因为它而等待的线程。</p>
<p>值得注意的是，因为唤醒的时候是全部都要唤醒，并且完全可以有多个线程同时去调用<code v-pre>fire()</code>，</p>
<p>所以<strong>下面的对于同步状态的获取和释放都是共享式的</strong>。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BooleanLatch</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Sync</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> <span class="token function">isSignalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">int</span> <span class="token function">tryAcquireShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> ignore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">isSignalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// >= 0</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryReleaseShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> ignore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">assert</span> ignore <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// just use state 1</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Sync</span> sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fire</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">releaseShared</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquireSharedInterruptibly</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">BooleanLatch</span> booleanLatch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BooleanLatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    booleanLatch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"倒计时"</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">-</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        booleanLatch<span class="token punctuation">.</span><span class="token function">fire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最多两个线程同时获得锁-twinslock" tabindex="-1"><a class="header-anchor" href="#最多两个线程同时获得锁-twinslock" aria-hidden="true">#</a> 最多两个线程同时获得锁 TwinsLock</h2>
<p>因为允许多个线程同时获取锁，所以这里的对于同步状态的获取都是共享式的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TwinsLock</span> <span class="token keyword">implements</span> <span class="token class-name">Lock</span> <span class="token punctuation">{</span>


    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Sync</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span> <span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">int</span> <span class="token function">tryAcquireShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 直到成功或者当前不可获取锁（不可获取锁就要去等待）</span>
                <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> newCount <span class="token operator">=</span> count <span class="token operator">-</span> arg<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>newCount <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">compareAndSetState</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span> newCount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> newCount<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryReleaseShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> newCount <span class="token operator">=</span> count <span class="token operator">+</span> arg<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetState</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span> newCount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Sync</span> sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquireShared</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">releaseShared</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">acquireSharedInterruptibly</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">tryAcquireShared</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> time<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sync<span class="token punctuation">.</span><span class="token function">tryAcquireSharedNanos</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> unit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>



    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token keyword">int</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试代码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TwinsLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">class</span> <span class="token class-name">Worker</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">TwinsLock</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Worker</span> worker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            worker<span class="token punctuation">.</span><span class="token function">setDaemon</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            worker<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="aqs源码分析" tabindex="-1"><a class="header-anchor" href="#aqs源码分析" aria-hidden="true">#</a> AQS源码分析</h1>
<h1 id="同步队列" tabindex="-1"><a class="header-anchor" href="#同步队列" aria-hidden="true">#</a> 同步队列</h1>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/** Marker to indicate a node is waiting in shared mode */</span>
        <span class="token comment">// 共享等待模式</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> <span class="token constant">SHARED</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/** Marker to indicate a node is waiting in exclusive mode */</span>
        <span class="token comment">// 独占等待模式</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> <span class="token constant">EXCLUSIVE</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/** waitStatus value to indicate thread has cancelled */</span>
        <span class="token comment">// 表明：由于在同步队列中等待的线程等待超时或被中断，需要从队列中取消等待，节点进入此状态就不再变化</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">CANCELLED</span> <span class="token operator">=</span>  <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/** waitStatus value to indicate successor's thread needs unparking */</span>
        <span class="token comment">// 后继节点正在等待，而当前线程释放了同步状态或取消，会通知后继节点</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">SIGNAL</span>    <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/** waitStatus value to indicate thread is waiting on condition */</span>
        <span class="token comment">// 节点当在等待队列里，节点相关的线程正在因某个Condition等待</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">CONDITION</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token comment">// 表明下一次共享式同步状态获取将会无条件的传播下去</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">PROPAGATE</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">;</span>

        <span class="token comment">// 尽可取为上述的枚举状态和初始化状态 0 ;</span>
        <span class="token comment">// waitStatus &lt; 0, 表明需要给Node发信号做一些事情，反之无需</span>
        <span class="token keyword">volatile</span> <span class="token keyword">int</span> waitStatus<span class="token punctuation">;</span>

        <span class="token comment">// 前驱</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Node</span> prev<span class="token punctuation">;</span>
        <span class="token comment">// 后继</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Node</span> next<span class="token punctuation">;</span>
        <span class="token comment">// 在构造时初始化并在使用后置 null</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Thread</span> thread<span class="token punctuation">;</span>

        <span class="token comment">// 该字段的含义被复用：</span>
        <span class="token comment">// 1. </span>
        <span class="token class-name">Node</span> nextWaiter<span class="token punctuation">;</span>

        <span class="token comment">// 是否是共享式等待的节点类型</span>
        <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">isShared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> nextWaiter <span class="token operator">==</span> <span class="token constant">SHARED</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Returns previous node, or throws NullPointerException if null.
         * Use when predecessor cannot be null.  The null check could
         * be elided, but is present to help the VM.
         *
         * <span class="token keyword">@return</span> the predecessor of this node
         */</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span> <span class="token function">predecessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NullPointerException</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> p <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token keyword">return</span> p<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// Used to establish initial head or SHARED marker</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> thread<span class="token punctuation">,</span> <span class="token class-name">Node</span> mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>     <span class="token comment">// Used by addWaiter</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>nextWaiter <span class="token operator">=</span> mode<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>thread <span class="token operator">=</span> thread<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> thread<span class="token punctuation">,</span> <span class="token keyword">int</span> waitStatus<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Used by Condition</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>waitStatus <span class="token operator">=</span> waitStatus<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>thread <span class="token operator">=</span> thread<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 懒初始化，仅通过 setHead 修改（除了初始化的时候）</span>
    <span class="token comment">// 首节点，总是获取同步状态成功的节点</span>
    <span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span> head<span class="token punctuation">;</span>

    <span class="token comment">// 尾节点，懒初始化，仅通过 enq 修改</span>
    <span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span> tail<span class="token punctuation">;</span>

    <span class="token comment">// 同步状态</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> state<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="独占式同步状态的获取与释放" tabindex="-1"><a class="header-anchor" href="#独占式同步状态的获取与释放" aria-hidden="true">#</a> 独占式同步状态的获取与释放</h2>
<ul>
<li>同步器的独占式同步状态的获取：<code v-pre>acquire(int arg)</code></li>
</ul>
<p>先尝试一下获取同步状态，失败后线程安全地将节点加入<strong>同步队列</strong> (调用addWaiter)。</p>
<p>然后进入同步队列的那些节点而言，就进入了一个自旋过程，该节点以”死循环“的方式获取同步状态（调用acquireQueued）。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 先尝试一下获取同步状态，失败后</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
            <span class="token function">acquireQueued</span><span class="token punctuation">(</span><span class="token function">addWaiter</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token punctuation">.</span><span class="token constant">EXCLUSIVE</span><span class="token punctuation">)</span><span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">selfInterrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// </span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>为当前线程和给定模式创建和排队节点。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Node</span> <span class="token function">addWaiter</span><span class="token punctuation">(</span><span class="token class-name">Node</span> mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Try the fast path of enq; backup to full enq on failure</span>
        <span class="token comment">// 先快速尝试一下</span>
        <span class="token class-name">Node</span> pred <span class="token operator">=</span> tail<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pred <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            node<span class="token punctuation">.</span>prev <span class="token operator">=</span> pred<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetTail</span><span class="token punctuation">(</span>pred<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// cas 设置尾巴</span>
                pred<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
                <span class="token keyword">return</span> node<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 如果上面的 cas 失败再调用 enq(node);</span>
        <span class="token function">enq</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>将节点插入队列，必要时进行初始化。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 返回入队节点 node 的前驱</span>
<span class="token keyword">private</span> <span class="token class-name">Node</span> <span class="token function">enq</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> t <span class="token operator">=</span> tail<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Must initialize</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetHead</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    tail <span class="token operator">=</span> head<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                node<span class="token punctuation">.</span>prev <span class="token operator">=</span> t<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetTail</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    t<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    <span class="token keyword">return</span> t<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于进入同步队列的节点，会进入一个自旋的过程：</p>
<p>在<strong>前驱为head</strong>时，尝试获取同步状态（调用tryAcquire）,如果获取到同步状态，则退出自旋；</p>
<p>否则进入阻塞（调用parkAndCheckInterrupt）。</p>
<p>再它被唤醒的时候再次进行上面的尝试，一直这样循环下去。</p>
<img src="@source/posts/aqs-acquire.png" alt="aqs-acquire" style="zoom:50%;" />
<ul>
<li>以独占不响应中断的模式获取同步状态</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>      <span class="token comment">// 如果在等待时中断，则返回true</span>
      <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">acquireQueued</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> failed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> interrupted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">final</span> <span class="token class-name">Node</span> p <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token function">predecessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> head <span class="token operator">&amp;&amp;</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">setHead</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    p<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// help GC</span>
                    failed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> interrupted<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldParkAfterFailedAcquire</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> node<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
                    <span class="token function">parkAndCheckInterrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    interrupted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>failed<span class="token punctuation">)</span>
                <span class="token function">cancelAcquire</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>头结点的线程释放了同步状态之后，将唤醒其后继节点，后继节点的线程被唤醒之后在去尝试获取同步状态。</p>
<p>不过需要注意，一定要有<code v-pre>p == head </code>的测试，<strong>因为只有首节点才拥有同步状态，但是非首节点有可能因为中断而被唤醒</strong>（也就是说要防止过早通知的情况）。</p>
<ul>
<li>可中断的获取同步状态</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">acquireInterruptibly</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">doAcquireInterruptibly</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 和上面的并没有什么差别，只是会直接抛出异常</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">doAcquireInterruptibly</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token function">addWaiter</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token punctuation">.</span><span class="token constant">EXCLUSIVE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> failed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">final</span> <span class="token class-name">Node</span> p <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token function">predecessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> head <span class="token operator">&amp;&amp;</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">setHead</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    p<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// help GC</span>
                    failed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldParkAfterFailedAcquire</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> node<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
                    <span class="token function">parkAndCheckInterrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果在等待中被中断，直接抛出 InterruptedException</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>failed<span class="token punctuation">)</span>
                <span class="token function">cancelAcquire</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="共享式同步状态的获取与释放" tabindex="-1"><a class="header-anchor" href="#共享式同步状态的获取与释放" aria-hidden="true">#</a> 共享式同步状态的获取与释放</h2>
<p>先挖个坑。。。</p>
</div></template>


