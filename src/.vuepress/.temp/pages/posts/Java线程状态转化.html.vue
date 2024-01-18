<template><div><h1 id="多线程使用方式" tabindex="-1"><a class="header-anchor" href="#多线程使用方式" aria-hidden="true">#</a> 多线程使用方式</h1>
<h2 id="_1-直接继承thread" tabindex="-1"><a class="header-anchor" href="#_1-直接继承thread" aria-hidden="true">#</a> 1. 直接继承Thread</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>


    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyThread</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"here"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyThread</span> myThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-实现runnable" tabindex="-1"><a class="header-anchor" href="#_2-实现runnable" aria-hidden="true">#</a> 2. 实现Runnable</h2>
<ol>
<li>传入Thread</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"here"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>线程池池化</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Executors</span></span><span class="token punctuation">;</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"here"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// or lambda</span>
        <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"here"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用callable" tabindex="-1"><a class="header-anchor" href="#_3-使用callable" aria-hidden="true">#</a> 3. 使用Callable</h2>
<ul>
<li>Callable接口类似于Runnable，需要<strong>实现接口中的call()方法</strong>。但是，Runnable不返回结果，也不能抛出已检查的异常。</li>
<li>Runnable接口提供run()方法支持用户定义线程的执行体，而Callable中提供call()方法。
<ul>
<li><strong>拥有返回值</strong>。</li>
<li><strong>允许抛出异常</strong>。</li>
</ul>
</li>
<li>通过泛型我们可以知道，Callable接口中的形参类型需要和call方法返回值类型相同。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Callable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ExecutorService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Executors</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Future</span></span><span class="token punctuation">;</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">ExecutorService</span> pool <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> future <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token string">"Hello"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// or lambda</span>
<span class="token comment">//        pool.submit(() -> "Hello");</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用futuretask" tabindex="-1"><a class="header-anchor" href="#_4-使用futuretask" aria-hidden="true">#</a> 4. 使用FutureTask</h2>
<p>通过继承关系可以发现，<code v-pre>RunnableFuture</code>接口同时继承了<code v-pre>Runnable</code>和<code v-pre>Future</code>接口，意味着实现<code v-pre>RunnableFuture</code>接口的类既是Runnable的是实现类，又是Future的实现类。FutureTask就是充当这样的角色，<strong>它的实例可以作为target传入Thread的构造器中。</strong></p>
<p>通过查看源码，可以发现<strong>FutureTask内部维护了一个Callable的对象</strong>，可以通过下面的这个构造器初始化Callable对象。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> futureTask <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"here"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 1. Thread</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>futureTask<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. pooled</span>
        <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>futureTask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>futureTask<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用completablefuture" tabindex="-1"><a class="header-anchor" href="#_5-使用completablefuture" aria-hidden="true">#</a> 5. 使用CompletableFuture</h2>
<p>https://juejin.cn/post/6844903594165026829</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="状态变化" tabindex="-1"><a class="header-anchor" href="#状态变化" aria-hidden="true">#</a> 状态变化</h1>
<p><code v-pre>java.lang.Thread.State</code>枚举类中定义了六种线程的状态，可以调用线程Thread中的<code v-pre>getState()</code>方法<strong>获取当前线程的状态</strong>。</p>
<table>
<thead>
<tr>
<th style="text-align:left">线程状态</th>
<th style="text-align:left">解释</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">NEW</td>
<td style="text-align:left">尚未启动的线程状态，即线程创建，<strong>还未调用start方法</strong></td>
</tr>
<tr>
<td style="text-align:left">RUNNABLE</td>
<td style="text-align:left"><strong>就绪状态</strong>（调用start，等待调度）+<strong>正在运行</strong></td>
</tr>
<tr>
<td style="text-align:left">BLOCKED</td>
<td style="text-align:left"><strong>等待监视器锁</strong>时，陷入阻塞状态</td>
</tr>
<tr>
<td style="text-align:left">WAITING</td>
<td style="text-align:left">等待状态的线程正在<strong>等待</strong>另一线程执行特定的操作（如notify）</td>
</tr>
<tr>
<td style="text-align:left">TIMED_WAITING</td>
<td style="text-align:left">具有<strong>指定等待时间</strong>的等待状态</td>
</tr>
<tr>
<td style="text-align:left">TERMINATED</td>
<td style="text-align:left">线程完成执行，<strong>终止状态</strong></td>
</tr>
</tbody>
</table>
<figure><img src="@source/posts/java-thread-state-transfer.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="一、新建状态-new" tabindex="-1"><a class="header-anchor" href="#一、新建状态-new" aria-hidden="true">#</a> 一、新建状态(NEW)</h2>
<p>即用<strong>new关键字</strong>新建一个线程，这个线程就处于<strong>新建状态</strong>。</p>
<h2 id="二、运行状态-runnable" tabindex="-1"><a class="header-anchor" href="#二、运行状态-runnable" aria-hidden="true">#</a> 二、运行状态(RUNNABLE)</h2>
<p>操作系统中的就绪和运行两种状态，在Java中统称为RUNNABLE。</p>
<h3 id="就绪状态-ready" tabindex="-1"><a class="header-anchor" href="#就绪状态-ready" aria-hidden="true">#</a> 就绪状态（READY)</h3>
<p>当线程对象调用了<code v-pre>start()</code>方法之后，线程处于<strong>就绪状态</strong>，就绪意味着该线程<strong>可以执行</strong>，但具体啥时候执行将取决于JVM里线程调度器的调度。</p>
<blockquote>
<p>It is never legal to start a thread more than once. In particular, a thread may not be restarted once it has completed execution.</p>
</blockquote>
<ul>
<li>不允许对一个线程多次使用start。</li>
<li>线程执行完成之后，不能试图用start将其唤醒。</li>
</ul>
<h4 id="其他状态-就绪" tabindex="-1"><a class="header-anchor" href="#其他状态-就绪" aria-hidden="true">#</a> 其他状态 -&gt;就绪</h4>
<ul>
<li>线程调用start()，新建状态转化为就绪状态。</li>
<li>线程sleep(long)时间到，等待状态转化为就绪状态。</li>
<li>阻塞式IO操作结果返回，线程变为就绪状态。</li>
<li>其他线程调用join()方法，结束之后转化为就绪状态。</li>
<li>线程对象拿到对象锁之后，也会进入就绪状态。</li>
</ul>
<h3 id="运行状态-running" tabindex="-1"><a class="header-anchor" href="#运行状态-running" aria-hidden="true">#</a> 运行状态(RUNNING)</h3>
<p>处于就绪状态的线程获得了CPU之后，<strong>真正开始执行run()方法的线程执行体时</strong>，意味着该线程就已经处于<strong>运行状态</strong>。需要注意的是，<strong>对于单处理器，一个时刻只能有一个线程处于运行状态。</strong>
对于抢占式策略的系统来说，系统会给每个线程一小段时间处理各自的任务。时间用完之后，系统负责夺回线程占用的资源。下一段时间里，系统会根据一定规则，再次进行调度。</p>
<p><strong>运行状态转变为就绪状态</strong>的情形：</p>
<ul>
<li>线程失去处理器资源。线程不一定完整执行的，执行到一半，说不定就被别的线程抢走了。</li>
<li>调用yield()静态方法，暂时暂停当前线程，让系统的线程调度器重新调度一次，它自己完全有可能再次运行。</li>
</ul>
<p>yield方法的官方解释：</p>
<blockquote>
<p>A hint to the scheduler that the current thread is willing to yield its current use of a processor. The scheduler is free to ignore this hint.</p>
</blockquote>
<p>提示调度程序，当前线程愿意放弃当前对处理器的使用。这时，<strong>当前线程将会被置为就绪状态</strong>，和其他线程一样等待调度，这时候根据不同<strong>优先级</strong>决定的<strong>概率</strong>，当前线程完全有可能再次抢到处理器资源。</p>
<h2 id="三、阻塞状态-blocked" tabindex="-1"><a class="header-anchor" href="#三、阻塞状态-blocked" aria-hidden="true">#</a> 三、阻塞状态(BLOCKED)</h2>
<p>阻塞状态表示线程<strong>正等待监视器锁</strong>，而陷入的状态。</p>
<p>以下场景线程将会阻塞：</p>
<ul>
<li>线程等待进入synchronized同步方法。</li>
<li>线程等待进入synchronized同步代码块。</li>
</ul>
<p>线程取得锁，就会从阻塞状态转变为就绪状态。</p>
<h2 id="四、等待状态-waiting" tabindex="-1"><a class="header-anchor" href="#四、等待状态-waiting" aria-hidden="true">#</a> 四、等待状态(WAITING)</h2>
<p>进入该状态表示<strong>当前线程需要等待其他线程做出一些的特定的动作</strong>（通知或中断）。</p>
<h3 id="运行-等待" tabindex="-1"><a class="header-anchor" href="#运行-等待" aria-hidden="true">#</a> 运行-&gt;等待</h3>
<ul>
<li>当前线程运行过程中，其他线程调用<code v-pre>join</code>方法，当前线程将会进入等待状态。</li>
<li>当前线程对象调用<code v-pre>wait()</code>方法。
-<code v-pre>LockSupport.park()</code>：出于线程调度的目的<strong>禁用当前线程</strong>。</li>
</ul>
<h3 id="等待-就绪" tabindex="-1"><a class="header-anchor" href="#等待-就绪" aria-hidden="true">#</a> 等待-&gt;就绪</h3>
<ul>
<li>等待的线程<strong>被其他线程对象唤醒</strong>，<code v-pre>notify()</code>和<code v-pre>notifyAll()</code>。</li>
<li><code v-pre>LockSupport.unpark(Thread)</code>，与上面park方法对应，给出许可证，<strong>解除等待状态</strong>。</li>
</ul>
<h2 id="五、超时等待状态-timed-waiting" tabindex="-1"><a class="header-anchor" href="#五、超时等待状态-timed-waiting" aria-hidden="true">#</a> 五、超时等待状态(TIMED_WAITING)</h2>
<p>区别于<code v-pre>WAITING</code>，它可以在<strong>指定的时间</strong>自行返回。</p>
<h3 id="运行-超时等待" tabindex="-1"><a class="header-anchor" href="#运行-超时等待" aria-hidden="true">#</a> 运行-&gt;超时等待</h3>
<ul>
<li>调用静态方法，<code v-pre>Thread.sleep(long)</code></li>
<li>线程对象调用<code v-pre>wait(long)</code>方法</li>
<li>其他线程调用指定时间的<code v-pre>join(long)</code>。</li>
<li><code v-pre>LockSupport.parkNanos()</code>。</li>
<li><code v-pre>LockSupport.parkUntil()</code>。</li>
</ul>
<p>补充：
sleep和yield的不同之处：</p>
<ul>
<li>sleep(long)方法会<strong>使线程转入超时等待状态</strong>，时间到了之后才会转入就绪状态。而yield()方法不会将线程转入等待，而是强制线程进入就绪状态。</li>
<li>使用sleep(long)方法<strong>需要处理异常</strong>，而yield()不用。</li>
</ul>
<h3 id="超时等待-就绪" tabindex="-1"><a class="header-anchor" href="#超时等待-就绪" aria-hidden="true">#</a> 超时等待-&gt;就绪</h3>
<ul>
<li>同样的，等待的线程被其他线程对象唤醒，<code v-pre>notify()</code>和<code v-pre>notifyAll()</code>。</li>
<li><code v-pre>LockSupport.unpark(Thread)</code>。</li>
</ul>
<h2 id="六、消亡状态" tabindex="-1"><a class="header-anchor" href="#六、消亡状态" aria-hidden="true">#</a> 六、消亡状态</h2>
<p>即<strong>线程的终止</strong>，表示线程已经执行完毕。前面已经说了，已经消亡的线程不能通过start再次唤醒。</p>
<ul>
<li>run()和call()线程执行体中顺利执行完毕，<strong>线程正常终止</strong>。</li>
<li>线程抛出一个没有捕获的Exception或Error。</li>
</ul>
<p>需要注意的是：主线成和子线程互不影响，子线程并不会因为主线程结束就结束。</p>
<blockquote>
<p>参考文章</p>
<p>https://www.cnblogs.com/summerday152/p/12288671.html</p>
</blockquote>
</div></template>


