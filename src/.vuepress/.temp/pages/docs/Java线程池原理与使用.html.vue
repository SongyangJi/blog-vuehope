<template><div><h1 id="使用线程池的好处" tabindex="-1"><a class="header-anchor" href="#使用线程池的好处" aria-hidden="true">#</a> 使用线程池的好处</h1>
<p>首先，回答这个问题，要先回答为什么要使用多线程。
其次再是为什么要使用线程池。
使用多线程的好处及必要性就不说了。</p>
<p><strong>使用线程池的好处：</strong></p>
<ol>
<li>提高响应速度：通过复用线程可以消除线程创建销毁带来的延迟，提示响应速度</li>
<li>降低资源消耗线程池可以统筹内存和CPU的使用，避免资源使用不当，线程池会根据配置和任务数量灵活控制线程数量，不够就创建，多了就回收，避免线程过多导致内存溢出，过少导致资源浪费</li>
<li>提高线程可管理行线程池可以统一管理资源，统一进行分配、调优、监控。</li>
</ol>
<h1 id="线程池工作原理" tabindex="-1"><a class="header-anchor" href="#线程池工作原理" aria-hidden="true">#</a> 线程池工作原理</h1>
<p>将任务传递给线程池，而不是为每个任务启动一个新线程来并发执行。
一旦池中有任何空闲线程，任务就会分配给其中之一并执行。
在内部，任务被插入到一个阻塞队列中，然后池中的空闲线程从该队列中取出任务并执行。</p>
<figure><img src="@source/docs/thread-pools.png" alt="线程池的原理" tabindex="0" loading="lazy"><figcaption>线程池的原理</figcaption></figure>
<p>不过在JDK提供的线程池的原理比这个还要复杂些（真实的往往是复杂的）。</p>
<figure><img src="@source/docs/pool2.jpg" alt="工作流程图" tabindex="0" loading="lazy"><figcaption>工作流程图</figcaption></figure>
<h1 id="自己实现一个简单的线程池" tabindex="-1"><a class="header-anchor" href="#自己实现一个简单的线程池" aria-hidden="true">#</a> 自己实现一个简单的线程池</h1>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span>: SongyangJi
 * <span class="token keyword">@description</span>:
 * <span class="token keyword">@since</span>: 2021/10/15
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadPool</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> taskQueue<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PooledThread</span><span class="token punctuation">></span></span> threads <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> isStopped <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token parameter">numOfThreads</span>  工作线程数
     * <span class="token keyword">@param</span> <span class="token parameter">maxNumOfTasks</span> 缓冲队列最多预存任务数
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ThreadPool</span><span class="token punctuation">(</span><span class="token keyword">int</span> numOfThreads<span class="token punctuation">,</span> <span class="token keyword">int</span> maxNumOfTasks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        taskQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>maxNumOfTasks<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numOfThreads<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            threads<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PooledThread</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">PooledThread</span> thread <span class="token operator">:</span> threads<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            thread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isStopped<span class="token punctuation">)</span> <span class="token keyword">throw</span>
                <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">"ThreadPool is stopped"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>taskQueue<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shutDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isStopped <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">PooledThread</span> thread <span class="token operator">:</span> threads<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            thread<span class="token punctuation">.</span><span class="token function">toStop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        taskQueue<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PooledThread</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> taskQueue<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> isStopped <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">PooledThread</span><span class="token punctuation">(</span><span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            taskQueue <span class="token operator">=</span> queue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>isStopped<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Runnable</span> runnable<span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    runnable <span class="token operator">=</span> taskQueue<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    runnable<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> ignored<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">toStop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isStopped <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 中断当前线程（但可能不被响应）</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>


    <span class="token comment">// 测试</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ThreadPool</span> threadPool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPool</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">final</span> <span class="token keyword">int</span> id <span class="token operator">=</span> i<span class="token punctuation">;</span>
            threadPool<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"task %d finished in %s\n"</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        threadPool<span class="token punctuation">.</span><span class="token function">shutDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="threadpoolexecutor工作机制" tabindex="-1"><a class="header-anchor" href="#threadpoolexecutor工作机制" aria-hidden="true">#</a> ThreadPoolExecutor工作机制</h1>
<h2 id="构造方法" tabindex="-1"><a class="header-anchor" href="#构造方法" aria-hidden="true">#</a> 构造方法</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span> 
                          <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>
                          <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>
                          <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> workQueue<span class="token punctuation">,</span>
                          <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>
                          <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构造参数的含义" tabindex="-1"><a class="header-anchor" href="#构造参数的含义" aria-hidden="true">#</a> 构造参数的含义</h2>
<table>
<thead>
<tr>
<th>序号</th>
<th>名称</th>
<th>类型</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>corePoolSize</td>
<td>int</td>
<td>核心线程池大小</td>
</tr>
<tr>
<td>2</td>
<td>maximumPoolSize</td>
<td>int</td>
<td>最大线程池大小</td>
</tr>
<tr>
<td>3</td>
<td>keepAliveTime</td>
<td>long</td>
<td>线程最大空闲时间</td>
</tr>
<tr>
<td>4</td>
<td>unit</td>
<td>TimeUnit</td>
<td>时间单位</td>
</tr>
<tr>
<td>5</td>
<td>workQueue</td>
<td>BlockingQueue</td>
<td>线程等待队列</td>
</tr>
<tr>
<td>6</td>
<td>threadFactory</td>
<td>ThreadFactory</td>
<td>线程创建工厂</td>
</tr>
<tr>
<td>7</td>
<td>handler</td>
<td>RejectedExecutionHandler</td>
<td>拒绝策略</td>
</tr>
</tbody>
</table>
<h2 id="内部机制" tabindex="-1"><a class="header-anchor" href="#内部机制" aria-hidden="true">#</a> 内部机制</h2>
<ol>
<li>
<p>如果当前线程池的线程数还没有达到基本大小(poolSize &lt; corePoolSize)，无论是否有空闲的线程新增一个线程处理新提交的任务；</p>
</li>
<li>
<p>如果当前线程池的线程数大于或等于基本大小(poolSize &gt;= corePoolSize) 且任务队列未满时，就将新提交的任务提交到阻塞队列排队，等候处理workQueue.offer(command)；</p>
</li>
<li>
<p>如果当前线程池的线程数大于或等于基本大小(poolSize &gt;= corePoolSize) 且任务队列满时；</p>
<ul>
<li>当前poolSize&lt;maximumPoolSize，那么就新增线程来处理任务；</li>
<li>当前poolSize=maximumPoolSize，那么意味着线程池的处理能力已经达到了极限，此时需要拒绝新增加的任务。至于如何拒绝处理新增的任务，取决于线程池的饱和策略RejectedExecutionHandler。</li>
</ul>
</li>
</ol>
<p>描述为如下的工作流程图：</p>
<figure><img src="@source/docs/pool1.jpg" alt="线程池对任务的处理流程" tabindex="0" loading="lazy"><figcaption>线程池对任务的处理流程</figcaption></figure>
<p>这里有一篇讲的很好的、可视化线程池工作机制的文章<a href="https://zhuanlan.zhihu.com/p/112527671" target="_blank" rel="noopener noreferrer">&gt;&gt;传送门<ExternalLinkIcon/></a>。</p>
<h2 id="拒绝策略" tabindex="-1"><a class="header-anchor" href="#拒绝策略" aria-hidden="true">#</a> 拒绝策略</h2>
<p>拒绝策略是RejectedExecutionHandler的实现类；</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// r - 请求执行的可运行任务</span>
<span class="token comment">// executor – 尝试执行此任务的执行器</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> executor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当要创建的线程数量大于线程池的最大线程数的时候，新的任务就会被拒绝，就会调用这个接口里的这个方法。</p>
<p>下面介绍 ThreadPoolExecutor 中已经实现的四种策略。</p>
<h3 id="abortpolicy" tabindex="-1"><a class="header-anchor" href="#abortpolicy" aria-hidden="true">#</a> AbortPolicy</h3>
<p>这也是默认的拒绝策略（保守的策略）</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RejectedExecutionException</span><span class="token punctuation">(</span><span class="token string">"Task "</span> <span class="token operator">+</span> r<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>
                                         <span class="token string">" rejected from "</span> <span class="token operator">+</span>
                                         e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="discardpolicy" tabindex="-1"><a class="header-anchor" href="#discardpolicy" aria-hidden="true">#</a> DiscardPolicy</h3>
<p>很潇洒，啥也不做。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="discardoldestpolicy" tabindex="-1"><a class="header-anchor" href="#discardoldestpolicy" aria-hidden="true">#</a> DiscardOldestPolicy</h3>
<p>丢弃最早的未处理请求，然后去执行这个现在的任务。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        e<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="callerrunspolicy" tabindex="-1"><a class="header-anchor" href="#callerrunspolicy" aria-hidden="true">#</a> CallerRunsPolicy</h3>
<p>在任务被拒绝添加后，会调用当前线程池的所在的线程去执行被拒绝的任务。</p>
<p>也就是说，自己的活自己做，不要让线程池去做了。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        r<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="阻塞队列" tabindex="-1"><a class="header-anchor" href="#阻塞队列" aria-hidden="true">#</a> 阻塞队列</h2>
<p>阻塞队列的选取可以参考在JUC中BlockingQueue的几种实现类，这里不再赘述。</p>
<h1 id="executor框架-——-jdk提供的线程池家族" tabindex="-1"><a class="header-anchor" href="#executor框架-——-jdk提供的线程池家族" aria-hidden="true">#</a> Executor框架 —— JDK提供的线程池家族</h1>
<h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2>
<figure><img src="@source/docs/ThreadPoolExecutor.png" alt="ThreadPoolExecutor" tabindex="0" loading="lazy"><figcaption>ThreadPoolExecutor</figcaption></figure>
<h2 id="几种开箱即用的线程池" tabindex="-1"><a class="header-anchor" href="#几种开箱即用的线程池" aria-hidden="true">#</a> 几种开箱即用的线程池</h2>
<h3 id="fixedthreadpool" tabindex="-1"><a class="header-anchor" href="#fixedthreadpool" aria-hidden="true">#</a> FixedThreadPool</h3>
<p>构造函数：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token keyword">int</span> nThreads<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span>nThreads<span class="token punctuation">,</span> nThreads<span class="token punctuation">,</span>
                                      <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">,</span>
                                      <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特点：</p>
<ul>
<li>
<p>workQueue 为LinkedBlockingQueue（<strong>无界阻塞队列</strong>），队列最大值为Integer.MAX_VALUE。如果任务提交速度持续大余任务处理速度，会造成队列大量阻塞。因为队列基本上是无穷大，很有可能在拒绝策略前，内存溢出。由于队列容量无穷大，所以实际上maximumPoolSize是无效参数。</p>
</li>
<li>
<p>corePoolSize与maximumPoolSize相等，即其线程全为核心线程，是一个固定大小的线程池；</p>
</li>
<li>
<p>keepAliveTime = 0 表明多余的线程会被立即终止，但是由于默认情况下这不对核心线程起作用，又由于队列容量无穷大，所以这个参数实际上也是无效的。（因为在核心线程池满之后，就不再被销毁，除非你<code v-pre>allowCoreThreadTimeOut(true)</code>）</p>
</li>
<li>
<p>由于第一点，没有设置拒绝策略，设置了也是无效的。</p>
</li>
</ul>
<p>适用场景：</p>
<p>计算重量级的任务。</p>
<h3 id="cachedthreadpool" tabindex="-1"><a class="header-anchor" href="#cachedthreadpool" aria-hidden="true">#</a> CachedThreadPool</h3>
<p>构造函数：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>     <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">,</span>
                                      <span class="token number">60L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">,</span>
                                      <span class="token keyword">new</span> <span class="token class-name">SynchronousQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>corePoolSize = 0，maximumPoolSize = Integer.MAX_VALUE，即线程数量几乎无限制；</p>
</li>
<li>
<p>keepAliveTime = 60s，线程空闲60s后自动结束，因此长时间保持空闲的CachedThreadPool不占用资源。</p>
</li>
<li>
<p>workQueue 为 SynchronousQueue 为无容量的同步队列，这个队列类似于一个接力棒，入队出队必须同时传递，所以当核心线程池已满的时候，会直接创建一个新的线程；</p>
</li>
</ul>
<p>适用场景：快速处理大量耗时较短的任务，如Netty的NIO接受请求时，可使用CachedThreadPool。</p>
<h3 id="singlethreadexecutor" tabindex="-1"><a class="header-anchor" href="#singlethreadexecutor" aria-hidden="true">#</a> SingleThreadExecutor</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FinalizableDelegatedExecutorService</span>
            <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>
                                    <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">,</span>
                                    <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上就是 Executors.newFixedThreadPool(1)的包装。</p>
<p>线程池一旦接受了一个任务，就保持一个线程去接受任务。</p>
<h1 id="合理配置线程池大小" tabindex="-1"><a class="header-anchor" href="#合理配置线程池大小" aria-hidden="true">#</a> 合理配置线程池大小</h1>
<h2 id="任务的不同角度的分类" tabindex="-1"><a class="header-anchor" href="#任务的不同角度的分类" aria-hidden="true">#</a> 任务的不同角度的分类</h2>
<p>合理的配置线程池的大小，从以下几个角度分析任务的特性：</p>
<ul>
<li>
<p>任务的性质：CPU密集型任务、IO密集型任务、混合型任务。</p>
</li>
<li>
<p>任务的优先级：高、中、低。</p>
</li>
<li>
<p>任务的执行时间：长、中、短。</p>
</li>
<li>
<p>任务的依赖性：是否依赖其他系统资源，如数据库连接等。</p>
</li>
</ul>
<p>性质不同的任务可以交给不同规模的线程池执行</p>
<ul>
<li>
<p>CPU密集型任务应配置尽可能小的线程，如配置CPU个数+1的线程数;</p>
</li>
<li>
<p>IO密集型任务应配置尽可能多的线程，因为IO操作不占用CPU，不要让CPU闲下来，应加大线程数量，如配置两倍CPU个数+1;</p>
</li>
<li>
<p>混合型的任务，如果可以拆分，拆分成IO密集型和CPU密集型分别处理，前提是两者运行的时间是差不多的，如果处理时间相差很大，则没必要拆分了。</p>
</li>
</ul>
<h2 id="一个经验公式" tabindex="-1"><a class="header-anchor" href="#一个经验公式" aria-hidden="true">#</a> 一个经验公式</h2>
<p><em><em>最佳线程数目 = （（线程等待时间+线程CPU时间）/线程CPU时间 ）</em> CPU数目</em>*</p>
<p>比如平均每个线程CPU运行时间为0.5s，而线程等待时间（非CPU运行时间，比如IO）为1.5s，CPU核心数为8，那么根据上面这个公式估算得到：((0.5+1.5)/0.5)*8=32。这个公式进一步转化为：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>最佳线程数目 = （线程等待时间/线程CPU时间+ 1）* CPU
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以得出一个结论： 线程等待时间所占比例越高，需要越多线程。线程CPU时间所占比例越高，需要越少线程。 以上公式与CPU和IO密集型任务设置线程数基本吻合。</p>
<h2 id="实践配置" tabindex="-1"><a class="header-anchor" href="#实践配置" aria-hidden="true">#</a> 实践配置</h2>
<p>高并发、任务执行时间短的业务怎样使用线程池？并发不高、任务执行时间长的业务怎样使用线程池？并发高、业务执行时间长的业务怎样使用线程池？</p>
<ol>
<li>
<p>高并发、任务执行时间短的业务，线程池线程数可以设置为CPU核数+1，减少线程上下文的切换</p>
</li>
<li>
<p>并发不高、任务执行时间长的业务要区分开看：</p>
</li>
</ol>
<ul>
<li>假如是业务时间长集中在IO操作上，也就是IO密集型的任务，因为IO操作并不占用CPU，所以不要让所有的CPU闲下来，可以适当加大线程池中的线程数目，让CPU处理更多的业务</li>
<li>假如是业务时间长集中在计算操作上，也就是计算密集型任务，这个就没办法了，和（1）一样吧，线程池中的线程数设置得少一些，减少线程上下文的切换</li>
</ul>
<ol start="3">
<li>
<p>并发高、业务执行时间长，解决这种类型任务的关键不在于线程池而在于整体架构的设计，看看这些业务里面某些数据是否能做缓存是第一步，增加服务器是第二步，至于线程池的设置，设置参考（2）。</p>
<p>最后，业务执行时间长的问题，也可能需要分析一下，看看能不能使用中间件对任务进行拆分和解耦</p>
</li>
</ol>
<h2 id="其他配置" tabindex="-1"><a class="header-anchor" href="#其他配置" aria-hidden="true">#</a> 其他配置</h2>
<p>队列大小 = 线程数 * (最大响应时间/任务实际处理时间)</p>
<p>假设目标最大响应时间为0.4s，计算阻塞队列的长度为20 * (0.4 / 0.2) = 40。</p>
<p>很好理解，就是拿最大响应时间（pct999的响应时间）和平均处理时间的比率*线程数，这些任务可能就是来不及处理堆积在队列里的。</p>
<blockquote>
<p>参考链接</p>
<p><a href="http://tutorials.jenkov.com/java-concurrency/thread-pools.html" target="_blank" rel="noopener noreferrer">Thread Pools<ExternalLinkIcon/></a></p>
<p><a href="https://zhuanlan.zhihu.com/p/112527671" target="_blank" rel="noopener noreferrer">线程池工作原理可视化<ExternalLinkIcon/></a></p>
<p><a href="https://www.jianshu.com/p/0d5604152b97" target="_blank" rel="noopener noreferrer">本以为“线程池”很简单，没想到第一问就被干趴下了！<ExternalLinkIcon/></a></p>
<p>《Java 并发编程的艺术》</p>
</blockquote>
</div></template>


