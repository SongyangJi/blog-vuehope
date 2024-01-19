<template><div><h1 id="executorservice" tabindex="-1"><a class="header-anchor" href="#executorservice" aria-hidden="true">#</a> ExecutorService</h1>
<img src="@source/posts/Executor.png" alt="Executor" style="zoom:50%;" />
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Executor</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> command<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ExecutorService</span> <span class="token keyword">extends</span> <span class="token class-name">Executor</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * Initiates an orderly shutdown in which previously submitted
     * tasks are executed, but no new tasks will be accepted.
     * Invocation has no additional effect if already shut down.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This method does not wait for previously submitted tasks to
     * complete execution.  Use <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">awaitTermination</span></span> awaitTermination<span class="token punctuation">}</span>
     * to do that.
     */</span>
    <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Attempts to stop all actively executing tasks, halts the
     * processing of waiting tasks, and returns a list of the tasks
     * that were awaiting execution.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This method does not wait for actively executing tasks to
     * terminate.  Use <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">awaitTermination</span></span> awaitTermination<span class="token punctuation">}</span> to
     * do that.
     *
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">boolean</span> <span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">boolean</span> <span class="token function">isTerminated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Blocks until all tasks have completed execution after a shutdown
     * request, or the timeout occurs, or the current thread is
     * interrupted, whichever happens first.
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeout<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">;</span>

    
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> task<span class="token punctuation">)</span><span class="token punctuation">;</span>

    
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">,</span> <span class="token class-name">T</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>

    
    <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://www.cnblogs.com/aspirant/p/10265863.html" target="_blank" rel="noopener noreferrer">线程池中shutdown()和shutdownNow()方法的区别<ExternalLinkIcon/></a></p>
<p><code v-pre>shutdown</code>、<code v-pre>shutdownNow</code>、<code v-pre>awaitTermination</code>。</p>
<p>三者的区别：</p>
<ul>
<li><code v-pre>shutdown</code>:</li>
</ul>
<p>线程池的状态则立刻变成SHUTDOWN状态。此时，则不能再往线程池中添加任何任务，空闲的工作线程会被中断从而结束（它们正在<code v-pre>r = workQueue.take()</code>）；活跃的工作线程继续执行任务（<code v-pre>w.tryLock()</code>保证任务执行结束之前不中断），但是这个方法的调用并不等待这些任务的完成（换句话说，是异步地）。</p>
<ul>
<li>
<p><code v-pre>shutdownNow</code>:</p>
<p>线程池的状态立刻变成STOP状态，并试图停止所有正在执行的线程，不再处理还在池队列中等待的任务，并且它会返回那些未执行的任务。</p>
<p>（它试图终止线程的方法是通过调用Thread.interrupt()方法来实现的，但是大家知道，这种方法的作用有限，如果线程中没有sleep 、wait、Condition、定时锁等应用, interrupt()方法是无法中断当前的线程的。所以，ShutdownNow()并不代表线程池就一定立即就能退出，它可能必须要等待所有正在执行的任务都执行完成了才能退出。 ）</p>
</li>
<li>
<p><code v-pre>awaitTermination</code>:</p>
<p>此方法的调用会阻塞住，直到所有的任务执行完成或者超时。弥补了上面两个方法的不足。</p>
</li>
</ul>
<h1 id="abstractexecutorservice" tabindex="-1"><a class="header-anchor" href="#abstractexecutorservice" aria-hidden="true">#</a> AbstractExecutorService</h1>
<p>提供ExecutorService执行方法的默认实现。此类使用newTaskFor返回的RunnableFuture（默认为此包中提供的FutureTask类）实现submit、invokeAny和invokeAll方法。例如，submit（Runnable）的实现创建了一个关联的RunnableFuture，它被执行并返回。子类可以重写newTaskFor方法以返回除了FutureTask之外的RunnableFuture实现。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractExecutorService</span> <span class="token keyword">implements</span> <span class="token class-name">ExecutorService</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">RunnableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">newTaskFor</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">,</span> <span class="token class-name">T</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>runnable<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">RunnableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">newTaskFor</span><span class="token punctuation">(</span><span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> callable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>callable<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>task <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RunnableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> ftask <span class="token operator">=</span> <span class="token function">newTaskFor</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">execute</span><span class="token punctuation">(</span>ftask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ftask<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">,</span> <span class="token class-name">T</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>task <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RunnableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> ftask <span class="token operator">=</span> <span class="token function">newTaskFor</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">execute</span><span class="token punctuation">(</span>ftask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ftask<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> task<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>task <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RunnableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> ftask <span class="token operator">=</span> <span class="token function">newTaskFor</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">execute</span><span class="token punctuation">(</span>ftask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ftask<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="threadpoolexecutor" tabindex="-1"><a class="header-anchor" href="#threadpoolexecutor" aria-hidden="true">#</a> ThreadPoolExecutor</h1>
<h2 id="线程池工作的状态表示与转换" tabindex="-1"><a class="header-anchor" href="#线程池工作的状态表示与转换" aria-hidden="true">#</a> 线程池工作的状态表示与转换</h2>
<p>线程池有两大控制状态需要表示，</p>
<ol>
<li>workerCount：the effective number of threads</li>
<li>runState：whether running, shutting down etc</li>
</ol>
<p>其中，workerCount表示开启的线程数（这些线程并允许停止），它和实际活着的线程数并不相等，用户视角的workers的数量由<code v-pre>HashSet&lt;Worker&gt; workers</code>表示。</p>
<p>runState主要用于线程池的生命周期控制。</p>
<ul>
<li>
<p>RUNNING:  Accept new tasks and process queued tasks</p>
</li>
<li>
<p>SHUTDOWN: Don't accept new tasks, but process queued tasks</p>
</li>
<li>
<p>STOP:     Don't accept new tasks, don't process queued tasks, and interrupt in-progress tasks</p>
</li>
<li>
<p>TIDYING:  All tasks have terminated, workerCount is zero, the thread transitioning to state TIDYING</p>
<p>will run the terminated() hook method</p>
</li>
<li>
<p>TERMINATED: terminated() has completed</p>
</li>
</ul>
<p>这些值之间的数字顺序很重要有序比较。runState随时间单调增加时间，但不必命中每个状态。</p>
<ul>
<li>
<p>RUNNING -&gt; SHUTDOWN</p>
<p>On invocation of shutdown(), perhaps implicitly in finalize()</p>
</li>
<li>
<p>(RUNNING or SHUTDOWN) -&gt; STOP</p>
<p>On invocation of shutdownNow()</p>
</li>
<li>
<p>SHUTDOWN -&gt; TIDYING</p>
<p>When both queue and pool are empty</p>
</li>
<li>
<p>STOP -&gt; TIDYING</p>
<p>When pool is empty</p>
</li>
<li>
<p>TIDYING -&gt; TERMINATED</p>
<p>When the terminated() hook method has completed</p>
</li>
</ul>
<p>此外作者使用了一个小技巧，为了高效率地在多线程环境下改变这两个控制状态，作者将这两个字段打包进一个原子量里，其中高三位存储runState，低29位存储线程数。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> ctl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token function">ctlOf</span><span class="token punctuation">(</span><span class="token constant">RUNNING</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">COUNT_BITS</span> <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">SIZE</span> <span class="token operator">-</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">CAPACITY</span>   <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">COUNT_BITS</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// runState is stored in the high-order bits</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">RUNNING</span>    <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">COUNT_BITS</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">SHUTDOWN</span>   <span class="token operator">=</span>  <span class="token number">0</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">COUNT_BITS</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">STOP</span>       <span class="token operator">=</span>  <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">COUNT_BITS</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">TIDYING</span>    <span class="token operator">=</span>  <span class="token number">2</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">COUNT_BITS</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">TERMINATED</span> <span class="token operator">=</span>  <span class="token number">3</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">COUNT_BITS</span><span class="token punctuation">;</span>

<span class="token comment">// Packing and unpacking ctl</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">runStateOf</span><span class="token punctuation">(</span><span class="token keyword">int</span> c<span class="token punctuation">)</span>     <span class="token punctuation">{</span> <span class="token keyword">return</span> c <span class="token operator">&amp;</span> <span class="token operator">~</span><span class="token constant">CAPACITY</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">workerCountOf</span><span class="token punctuation">(</span><span class="token keyword">int</span> c<span class="token punctuation">)</span>  <span class="token punctuation">{</span> <span class="token keyword">return</span> c <span class="token operator">&amp;</span> <span class="token constant">CAPACITY</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">ctlOf</span><span class="token punctuation">(</span><span class="token keyword">int</span> rs<span class="token punctuation">,</span> <span class="token keyword">int</span> wc<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> rs <span class="token operator">|</span> wc<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">/*
 * Bit field accessors that don't require unpacking ctl.
 * These depend on the bit layout and on workerCount being never negative.
 */</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">runStateLessThan</span><span class="token punctuation">(</span><span class="token keyword">int</span> c<span class="token punctuation">,</span> <span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> c <span class="token operator">&lt;</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">runStateAtLeast</span><span class="token punctuation">(</span><span class="token keyword">int</span> c<span class="token punctuation">,</span> <span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> c <span class="token operator">>=</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isRunning</span><span class="token punctuation">(</span><span class="token keyword">int</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> c <span class="token operator">&lt;</span> <span class="token constant">SHUTDOWN</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Attempts to CAS-increment the workerCount field of ctl.
 */</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">compareAndIncrementWorkerCount</span><span class="token punctuation">(</span><span class="token keyword">int</span> expect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> ctl<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>expect<span class="token punctuation">,</span> expect <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Attempts to CAS-decrement the workerCount field of ctl.
 */</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">compareAndDecrementWorkerCount</span><span class="token punctuation">(</span><span class="token keyword">int</span> expect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> ctl<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>expect<span class="token punctuation">,</span> expect <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Decrements the workerCount field of ctl. This is called only on
 * abrupt termination of a thread (see processWorkerExit). Other
 * decrements are performed within getTask.
 */</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">decrementWorkerCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span> <span class="token function">compareAndDecrementWorkerCount</span><span class="token punctuation">(</span>ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工作线程抽象——worker" tabindex="-1"><a class="header-anchor" href="#工作线程抽象——worker" aria-hidden="true">#</a> 工作线程抽象——Worker</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>   <span class="token doc-comment comment">/**
    *Class Worker主要维护线程运行任务，以及其他次要的记账信息。
    *此类扩展了AbstractQueuedSynchronizer，以简化获取和释放每个任务执行。
    *并且防止在还没有启动loop执行任务时，就被中断
    *此外，要抑制中断直到线程实际上开始运行任务，我们初始化锁将状态设置为负值，并在启动时清除（在
    *runWorker）。
    */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Worker</span>
        <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span>
        <span class="token keyword">implements</span> <span class="token class-name">Runnable</span>
    <span class="token punctuation">{</span>
        
        <span class="token doc-comment comment">/** Thread this worker is running in.  Null if factory fails. */</span>
        <span class="token keyword">final</span> <span class="token class-name">Thread</span> thread<span class="token punctuation">;</span>
        <span class="token doc-comment comment">/** Initial task to run.  Possibly null. */</span>
        <span class="token class-name">Runnable</span> firstTask<span class="token punctuation">;</span>
        <span class="token doc-comment comment">/** Per-thread task counter */</span>
        <span class="token keyword">volatile</span> <span class="token keyword">long</span> completedTasks<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * Creates with given first task and thread from ThreadFactory.
         * <span class="token keyword">@param</span> <span class="token parameter">firstTask</span> the first task (null if none)
         */</span>
        <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> firstTask<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 阻止中断直到调用runWorker</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>firstTask <span class="token operator">=</span> firstTask<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>thread <span class="token operator">=</span> <span class="token function">getThreadFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newThread</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// worker 自身也是一个runnable</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/** 将主运行循环委托给外部的runWorker方法  */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">runWorker</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Lock methods</span>
        <span class="token comment">//</span>
        <span class="token comment">// The value 0 represents the unlocked state.</span>
        <span class="token comment">// The value 1 represents the locked state.</span>

        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> unused<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryRelease</span><span class="token punctuation">(</span><span class="token keyword">int</span> unused<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>        <span class="token punctuation">{</span> <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>      <span class="token punctuation">{</span> <span class="token function">release</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

        <span class="token keyword">void</span> <span class="token function">interruptIfStarted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span> t<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>t <span class="token operator">=</span> thread<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>t<span class="token punctuation">.</span><span class="token function">isInterrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    t<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SecurityException</span> ignore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="预定义的几种拒绝策略" tabindex="-1"><a class="header-anchor" href="#预定义的几种拒绝策略" aria-hidden="true">#</a> 预定义的几种拒绝策略</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>  <span class="token comment">/* Predefined RejectedExecutionHandlers */</span>

  
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">CallerRunsPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">CallerRunsPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                r<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">AbortPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">AbortPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RejectedExecutionException</span><span class="token punctuation">(</span><span class="token string">"Task "</span> <span class="token operator">+</span> r<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>
                                                 <span class="token string">" rejected from "</span> <span class="token operator">+</span>
                                                 e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DiscardPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token class-name">DiscardPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DiscardOldestPolicy</span> <span class="token keyword">implements</span> <span class="token class-name">RejectedExecutionHandler</span> <span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token class-name">DiscardOldestPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rejectedExecution</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">,</span> <span class="token class-name">ThreadPoolExecutor</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>e<span class="token punctuation">.</span><span class="token function">isShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                e<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构造器" tabindex="-1"><a class="header-anchor" href="#构造器" aria-hidden="true">#</a> 构造器</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>
                          <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>
                          <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> workQueue<span class="token punctuation">,</span>
                          <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>
                          <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>corePoolSize <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span>
        maximumPoolSize <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span>
        maximumPoolSize <span class="token operator">&lt;</span> corePoolSize <span class="token operator">||</span>
        keepAliveTime <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>workQueue <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> threadFactory <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> handler <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>acc <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getSecurityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span>
            <span class="token keyword">null</span> <span class="token operator">:</span>
            <span class="token class-name">AccessController</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>corePoolSize <span class="token operator">=</span> corePoolSize<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>maximumPoolSize <span class="token operator">=</span> maximumPoolSize<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>workQueue <span class="token operator">=</span> workQueue<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keepAliveTime <span class="token operator">=</span> unit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>keepAliveTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>threadFactory <span class="token operator">=</span> threadFactory<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>handler <span class="token operator">=</span> handler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="核心原理" tabindex="-1"><a class="header-anchor" href="#核心原理" aria-hidden="true">#</a> 核心原理</h2>
<h3 id="addworker" tabindex="-1"><a class="header-anchor" href="#addworker" aria-hidden="true">#</a> addWorker</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 新增worker，返回worker的thread是否启动成功</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">addWorker</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> firstTask<span class="token punctuation">,</span> <span class="token keyword">boolean</span> core<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        retry<span class="token operator">:</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> rs <span class="token operator">=</span> <span class="token function">runStateOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 运行状态</span>

            <span class="token comment">// Check if queue empty only if necessary.</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>rs <span class="token operator">>=</span> <span class="token constant">SHUTDOWN</span> <span class="token operator">&amp;&amp;</span>
                <span class="token operator">!</span> <span class="token punctuation">(</span>rs <span class="token operator">==</span> <span class="token constant">SHUTDOWN</span> <span class="token operator">&amp;&amp;</span>
                   firstTask <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
                   <span class="token operator">!</span> workQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> wc <span class="token operator">=</span> <span class="token function">workerCountOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 工作线程数</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>wc <span class="token operator">>=</span> <span class="token constant">CAPACITY</span> <span class="token operator">||</span>
                    wc <span class="token operator">>=</span> <span class="token punctuation">(</span>core <span class="token operator">?</span> corePoolSize <span class="token operator">:</span> maximumPoolSize<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 超过了则不再创建</span>
                    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndIncrementWorkerCount</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">break</span> retry<span class="token punctuation">;</span> <span class="token comment">// cas成功则break</span>
                c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Re-read ctl</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">runStateOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">!=</span> rs<span class="token punctuation">)</span>
                    <span class="token keyword">continue</span> retry<span class="token punctuation">;</span>
                <span class="token comment">// else CAS failed due to workerCount change; retry inner loop</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      
        <span class="token keyword">boolean</span> workerStarted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// worker 是否成功启动</span>
        <span class="token keyword">boolean</span> workerAdded <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// worker 是否成功添加</span>
        <span class="token class-name">Worker</span> w <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            w <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span>firstTask<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">final</span> <span class="token class-name">Thread</span> t <span class="token operator">=</span> w<span class="token punctuation">.</span>thread<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> mainLock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mainLock<span class="token punctuation">;</span>
                mainLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Recheck while holding lock.</span>
                    <span class="token comment">// Back out on ThreadFactory failure or if</span>
                    <span class="token comment">// shut down before lock acquired.</span>
                    <span class="token keyword">int</span> rs <span class="token operator">=</span> <span class="token function">runStateOf</span><span class="token punctuation">(</span>ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token keyword">if</span> <span class="token punctuation">(</span>rs <span class="token operator">&lt;</span> <span class="token constant">SHUTDOWN</span> <span class="token operator">||</span>
                        <span class="token punctuation">(</span>rs <span class="token operator">==</span> <span class="token constant">SHUTDOWN</span> <span class="token operator">&amp;&amp;</span> firstTask <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">isAlive</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// precheck that t is startable</span>
                            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalThreadStateException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        workers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加到工作集</span>
                        <span class="token keyword">int</span> s <span class="token operator">=</span> workers<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">></span> largestPoolSize<span class="token punctuation">)</span>
                            largestPoolSize <span class="token operator">=</span> s<span class="token punctuation">;</span>
                        workerAdded <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    mainLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>workerAdded<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    t<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 启动工作线程的loop</span>
                    workerStarted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span> workerStarted<span class="token punctuation">)</span>
                <span class="token function">addWorkerFailed</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 回滚</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> workerStarted<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gettask" tabindex="-1"><a class="header-anchor" href="#gettask" aria-hidden="true">#</a> getTask</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
*对任务执行阻塞或定时等待，具体取决于当前配置设置，
* 或者如果此工作程序返回null必须退出，原因是：
* 1. 有超过maximumPoolSize个工作线程（由于对setMaximumPoolSize的调用）。
* 2. 池已stop。
* 3. 池已shutdown，队列为空。
* 4. 此工作人员在等待任务时超时，已超时
*
*<span class="token keyword">@return</span> 任务，如果worker必须退出，则返回null，在这种情况下workerCount递减
*/</span>
<span class="token keyword">private</span> <span class="token class-name">Runnable</span> <span class="token function">getTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> timedOut <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// Did the last poll() time out?</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rs <span class="token operator">=</span> <span class="token function">runStateOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Check if queue empty only if necessary.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rs <span class="token operator">>=</span> <span class="token constant">SHUTDOWN</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>rs <span class="token operator">>=</span> <span class="token constant">STOP</span> <span class="token operator">||</span> workQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 进入”销毁“阶段</span>
            <span class="token function">decrementWorkerCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> wc <span class="token operator">=</span> <span class="token function">workerCountOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Are workers subject to culling?</span>
        <span class="token keyword">boolean</span> timed <span class="token operator">=</span> allowCoreThreadTimeOut <span class="token operator">||</span> wc <span class="token operator">></span> corePoolSize<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>wc <span class="token operator">></span> maximumPoolSize <span class="token operator">||</span> <span class="token punctuation">(</span>timed <span class="token operator">&amp;&amp;</span> timedOut<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>wc <span class="token operator">></span> <span class="token number">1</span> <span class="token operator">||</span> workQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndDecrementWorkerCount</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Runnable</span> r <span class="token operator">=</span> timed <span class="token operator">?</span>
                workQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span>keepAliveTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token comment">// 带超时的阻塞</span>
                workQueue<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 无限阻塞</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> r<span class="token punctuation">;</span>
            timedOut <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> retry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timedOut <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="runworker" tabindex="-1"><a class="header-anchor" href="#runworker" aria-hidden="true">#</a> runWorker</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>  <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">runWorker</span><span class="token punctuation">(</span><span class="token class-name">Worker</span> w<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> wt <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Runnable</span> task <span class="token operator">=</span> w<span class="token punctuation">.</span>firstTask<span class="token punctuation">;</span>
        w<span class="token punctuation">.</span>firstTask <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        w<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// allow interrupts</span>
        <span class="token keyword">boolean</span> completedAbruptly <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 突然完成</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>task <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token punctuation">(</span>task <span class="token operator">=</span> <span class="token function">getTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// loop</span>
                w<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// If pool is stopping, ensure thread is interrupted;</span>
                <span class="token comment">// if not, ensure thread is not interrupted.  This</span>
                <span class="token comment">// requires a recheck in second case to deal with</span>
                <span class="token comment">// shutdownNow race while clearing interrupt</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">runStateAtLeast</span><span class="token punctuation">(</span>ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">STOP</span><span class="token punctuation">)</span> <span class="token operator">||</span>
                     <span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
                      <span class="token function">runStateAtLeast</span><span class="token punctuation">(</span>ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">STOP</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
                    <span class="token operator">!</span>wt<span class="token punctuation">.</span><span class="token function">isInterrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    wt<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token function">beforeExecute</span><span class="token punctuation">(</span>wt<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 钩子</span>
                    <span class="token class-name">Throwable</span> thrown <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        task<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 执行我们提交的任务</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">RuntimeException</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        thrown <span class="token operator">=</span> x<span class="token punctuation">;</span> <span class="token keyword">throw</span> x<span class="token punctuation">;</span> <span class="token comment">// ???</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Error</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        thrown <span class="token operator">=</span> x<span class="token punctuation">;</span> <span class="token keyword">throw</span> x<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        thrown <span class="token operator">=</span> x<span class="token punctuation">;</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        <span class="token function">afterExecute</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> thrown<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hook</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    task <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    w<span class="token punctuation">.</span>completedTasks<span class="token operator">++</span><span class="token punctuation">;</span>
                    w<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            completedAbruptly <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token function">processWorkerExit</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> completedAbruptly<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="execute" tabindex="-1"><a class="header-anchor" href="#execute" aria-hidden="true">#</a> execute</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 下面这段代码就对应着向线程池提交一个任务的工作流程了</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> command<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>command <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">workerCountOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">&lt;</span> corePoolSize<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 小于核心线程数，新开一个线程</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">addWorker</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRunning</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> workQueue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 尝试入队</span>
        <span class="token keyword">int</span> recheck <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 这里执行一次 double check</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span> <span class="token function">isRunning</span><span class="token punctuation">(</span>recheck<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">remove</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">workerCountOf</span><span class="token punctuation">(</span>recheck<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token function">addWorker</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">addWorker</span><span class="token punctuation">(</span>command<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 入队失败，再尝试开一个线程</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 执行拒绝策略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码分析" tabindex="-1"><a class="header-anchor" href="#源码分析" aria-hidden="true">#</a> 源码分析</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadPoolExecutor</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractExecutorService</span> <span class="token punctuation">{</span>
		<span class="token comment">// 工作队列，用于保存任务并移交给工作线程</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> workQueue<span class="token punctuation">;</span>

    <span class="token comment">// 锁定对工作线程集合和相关记账的访问</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> mainLock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 保存所有的工作线程</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Worker</span><span class="token punctuation">></span></span> workers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Worker</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Wait condition to support awaitTermination
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Condition</span> termination <span class="token operator">=</span> mainLock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 跟踪达到的最大池大小
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> largestPoolSize<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 已完成的任务的计数器
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> completedTaskCount<span class="token punctuation">;</span>

    <span class="token comment">/*
     * 线程池的几大参数都被修饰为
     */</span>

    <span class="token doc-comment comment">/**
     * 线程工厂
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 拒绝策略
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 针对核心线程的最大空闲生存时间
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 默认为false，也就是说即使核心线程空闲仍然保持存活
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> allowCoreThreadTimeOut<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 核心线程数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> corePoolSize<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 最大线程数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 默认的拒绝策略
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">RejectedExecutionHandler</span> defaultHandler <span class="token operator">=</span>
        <span class="token keyword">new</span> <span class="token class-name">AbortPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   


    <span class="token comment">// 用cas的方式递增runState    </span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">advanceRunState</span><span class="token punctuation">(</span><span class="token keyword">int</span> targetState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> c <span class="token operator">=</span> ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">runStateAtLeast</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> targetState<span class="token punctuation">)</span> <span class="token operator">||</span>
                ctl<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> <span class="token function">ctlOf</span><span class="token punctuation">(</span>targetState<span class="token punctuation">,</span> <span class="token function">workerCountOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 线程池的预热  </span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">prestartCoreThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">workerCountOf</span><span class="token punctuation">(</span>ctl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> corePoolSize <span class="token operator">&amp;&amp;</span>
            <span class="token function">addWorker</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">prestartAllCoreThreads</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">addWorker</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token operator">++</span>n<span class="token punctuation">;</span>
        <span class="token keyword">return</span> n<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


