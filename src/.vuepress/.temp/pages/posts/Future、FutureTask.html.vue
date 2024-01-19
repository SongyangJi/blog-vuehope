<template><div><h1 id="接口设计" tabindex="-1"><a class="header-anchor" href="#接口设计" aria-hidden="true">#</a> 接口设计</h1>
<p>Runnable.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>lang</span><span class="token punctuation">;</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Future.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">boolean</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> mayInterruptIfRunning<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns true if this task was cancelled before it completed
     * normally.
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">isCancelled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns true if this task completed.
     *
     * Completion may be due to normal termination, an exception, or
     * cancellation -- in all of these cases, this method will return
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Waits if necessary for the computation to complete, and then
     * retrieves its result.
     */</span>
    <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">,</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">;</span> <span class="token comment">// may throw CancellationException</span>

    <span class="token doc-comment comment">/**
     * Waits if necessary for at most the given time for the computation
     * to complete, and then retrieves its result, if available.
     */</span>
    <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeout<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">,</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Future表示异步计算的结果。提供了检查计算是否完成、等待其完成以及检索计算结果的方法。只有当计算完成时，才能使用get方法检索结果，如果需要，则进行阻塞，直到准备就绪。通过取消方法执行取消。提供了其他方法来确定任务是正常完成还是被取消。一旦计算完成，就不能取消计算。如果您希望为了可取消性而使用Future，但不提供可用的结果，则可以声明Future&lt;?&gt;形式的类型并作为基础任务的结果返回null。</p>
<p>其中<code v-pre>boolean cancel(boolean mayInterruptIfRunning);</code> 需要解释一下，此方法会取消尚未开始执行的任务，如果返回成功，那么这个任务再也不会被执行了；对于那些已经开始运行的任务而言，参数<code v-pre>mayInterruptIfRunning</code>为false的话不会组织其运行，为true的话试图去中断（仅仅是发出中断信号了，java 的线程中断机制并不能保证此任务一定被取消）。</p>
<p>Future接口一共定义了5个方法：</p>
<ul>
<li><code v-pre>get()</code>
<ul>
<li>该方法用来获取执行结果, 如果任务还在执行中, 就阻塞等待;</li>
</ul>
</li>
<li><code v-pre>get(long timeout, TimeUnit unit)</code>
<ul>
<li>该方法同get方法类似, 所不同的是, 它最多等待指定的时间, 如果指定时间内任务没有完成, 则会抛出<code v-pre>TimeoutException</code>异常;</li>
</ul>
</li>
<li><code v-pre>cancel(boolean mayInterruptIfRunning)</code>
<ul>
<li>该方法用来尝试取消一个任务的执行, 它的返回值是boolean类型, 表示取消操作是否成功.</li>
</ul>
</li>
<li><code v-pre>isCancelled()</code>
<ul>
<li>该方法用于判断任务是否被取消了。如果一个任务在正常执行完成之前被cancel掉了, 则返回true</li>
</ul>
</li>
<li><code v-pre>isDone()</code>
<ul>
<li>如果一个任务已经结束, 则返回true。注意, 这里的任务结束包含了以下三种情况:
<ul>
<li>任务正常执行完毕</li>
<li>任务抛出了异常</li>
<li>任务已经被取消</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>关于cancel方法，这里要补充说几点：
首先有以下三种情况之一的，cancel操作一定是失败的：</p>
<ol>
<li>任务已经执行完成了</li>
<li>任务已经被取消过了</li>
<li>任务因为某种原因不能被取消</li>
</ol>
<p>其它情况下，cancel操作将返回true。值得注意的是，<strong>cancel操作返回true并不代表任务真的就是被取消了</strong>，这取决于发动cancel状态时任务所处的状态：</p>
<ol>
<li>如果发起cancel时任务还没有开始运行，则随后任务就不会被执行；</li>
<li>如果发起cancel时任务已经在运行了，则这时就需要看<code v-pre>mayInterruptIfRunning</code>参数了：
<ul>
<li>如果<code v-pre>mayInterruptIfRunning</code> 为true, 则当前在执行的任务会被中断</li>
<li>如果<code v-pre>mayInterruptIfRunning</code> 为false, 则可以<strong>允许正在执行的任务继续运行，直到它执行完</strong></li>
</ul>
</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">RunnableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Runnable</span><span class="token punctuation">,</span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// override comments</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="futuretask" tabindex="-1"><a class="header-anchor" href="#futuretask" aria-hidden="true">#</a> FutureTask</h1>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">LockSupport</span></span><span class="token punctuation">;</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">RunnableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token comment">/*
     * Revision notes: This differs from previous versions of this
     * class that relied on AbstractQueuedSynchronizer, mainly to
     * avoid surprising users about retaining interrupt status during
     * cancellation races. Sync control in the current design relies
     * on a "state" field updated via CAS to track completion, along
     * with a simple Treiber stack to hold waiting threads.
     *
     * Style note: As usual, we bypass overhead of using
     * AtomicXFieldUpdaters and instead directly use Unsafe intrinsics.
     */</span>

    <span class="token doc-comment comment">/**
     * The run state of this task, initially NEW.  The run state
     * transitions to a terminal state only in methods set,
     * setException, and cancel.  During completion, state may take on
     * transient values of COMPLETING (while outcome is being set) or
     * INTERRUPTING (only while interrupting the runner to satisfy a
     * cancel(true)). Transitions from these intermediate to final
     * states use cheaper ordered/lazy writes because values are unique
     * and cannot be further modified.
     *
     * Possible state transitions:
     * NEW -> COMPLETING -> NORMAL
     * NEW -> COMPLETING -> EXCEPTIONAL
     * NEW -> CANCELLED
     * NEW -> INTERRUPTING -> INTERRUPTED
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> state<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">NEW</span>          <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">COMPLETING</span>   <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">NORMAL</span>       <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">EXCEPTIONAL</span>  <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">CANCELLED</span>    <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">INTERRUPTING</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">INTERRUPTED</span>  <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/** The underlying callable; nulled out after running */</span>
    <span class="token keyword">private</span> <span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> callable<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/** The result to return or exception to throw from get() */</span>
    <span class="token keyword">private</span> <span class="token class-name">Object</span> outcome<span class="token punctuation">;</span> <span class="token comment">// non-volatile, protected by state reads/writes</span>
    <span class="token doc-comment comment">/** The thread running the callable; CASed during run() */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token class-name">Thread</span> runner<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/** Treiber stack of waiting threads */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token class-name">WaitNode</span> waiters<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns result or throws exception for completed task.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">s</span> completed state value
     */</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"unchecked"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">V</span> <span class="token function">report</span><span class="token punctuation">(</span><span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ExecutionException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> x <span class="token operator">=</span> outcome<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token constant">NORMAL</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">V</span><span class="token punctuation">)</span>x<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">>=</span> <span class="token constant">CANCELLED</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">CancellationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span><span class="token punctuation">)</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">FutureTask</span></span></span><span class="token punctuation">}</span> that will, upon running, execute the
     * given <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Callable</span></span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span>  <span class="token parameter">callable</span> the callable task
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the callable is null
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">FutureTask</span><span class="token punctuation">(</span><span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> callable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>callable <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callable <span class="token operator">=</span> callable<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token constant">NEW</span><span class="token punctuation">;</span>       <span class="token comment">// ensure visibility of callable</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">FutureTask</span></span></span><span class="token punctuation">}</span> that will, upon running, execute the
     * given <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Runnable</span></span></span><span class="token punctuation">}</span>, and arrange that <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">get</span></span><span class="token punctuation">}</span> will return the
     * given result on successful completion.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">runnable</span> the runnable task
     * <span class="token keyword">@param</span> <span class="token parameter">result</span> the result to return on successful completion. If
     * you don't need a particular result, consider using
     * constructions of the form:
     * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>runnable<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span></span></span><span class="token punctuation">}</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the runnable is null
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">FutureTask</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">,</span> <span class="token class-name">V</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callable <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">callable</span><span class="token punctuation">(</span>runnable<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token constant">NEW</span><span class="token punctuation">;</span>       <span class="token comment">// ensure visibility of callable</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isCancelled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> state <span class="token operator">>=</span> <span class="token constant">CANCELLED</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> state <span class="token operator">!=</span> <span class="token constant">NEW</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> mayInterruptIfRunning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>state <span class="token operator">==</span> <span class="token constant">NEW</span> <span class="token operator">&amp;&amp;</span>
              <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> stateOffset<span class="token punctuation">,</span> <span class="token constant">NEW</span><span class="token punctuation">,</span>
                  mayInterruptIfRunning <span class="token operator">?</span> <span class="token constant">INTERRUPTING</span> <span class="token operator">:</span> <span class="token constant">CANCELLED</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>    <span class="token comment">// in case call to interrupt throws exception</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>mayInterruptIfRunning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span> t <span class="token operator">=</span> runner<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                        t<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span> <span class="token comment">// final state</span>
                    <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">putOrderedInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> stateOffset<span class="token punctuation">,</span> <span class="token constant">INTERRUPTED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token function">finishCompletion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">CancellationException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">,</span> <span class="token class-name">ExecutionException</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> s <span class="token operator">=</span> state<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">&lt;=</span> <span class="token constant">COMPLETING</span><span class="token punctuation">)</span>
            s <span class="token operator">=</span> <span class="token function">awaitDone</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">report</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">CancellationException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeout<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">,</span> <span class="token class-name">ExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>unit <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> s <span class="token operator">=</span> state<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">&lt;=</span> <span class="token constant">COMPLETING</span> <span class="token operator">&amp;&amp;</span>
            <span class="token punctuation">(</span>s <span class="token operator">=</span> <span class="token function">awaitDone</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> unit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token constant">COMPLETING</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TimeoutException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">report</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Protected method invoked when this task transitions to state
     * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">isDone</span></span><span class="token punctuation">}</span> (whether normally or via cancellation). The
     * default implementation does nothing.  Subclasses may override
     * this method to invoke completion callbacks or perform
     * bookkeeping. Note that you can query status inside the
     * implementation of this method to determine whether this task
     * has been cancelled.
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Sets the result of this future to the given value unless
     * this future has already been set or has been cancelled.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This method is invoked internally by the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">run</span></span><span class="token punctuation">}</span> method
     * upon successful completion of the computation.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">v</span> the value
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">V</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> stateOffset<span class="token punctuation">,</span> <span class="token constant">NEW</span><span class="token punctuation">,</span> <span class="token constant">COMPLETING</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            outcome <span class="token operator">=</span> v<span class="token punctuation">;</span>
            <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">putOrderedInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> stateOffset<span class="token punctuation">,</span> <span class="token constant">NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// final state</span>
            <span class="token function">finishCompletion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Causes this future to report an <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ExecutionException</span></span><span class="token punctuation">}</span>
     * with the given throwable as its cause, unless this future has
     * already been set or has been cancelled.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This method is invoked internally by the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">run</span></span><span class="token punctuation">}</span> method
     * upon failure of the computation.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">t</span> the cause of failure
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">setException</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> stateOffset<span class="token punctuation">,</span> <span class="token constant">NEW</span><span class="token punctuation">,</span> <span class="token constant">COMPLETING</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            outcome <span class="token operator">=</span> t<span class="token punctuation">;</span>
            <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">putOrderedInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> stateOffset<span class="token punctuation">,</span> <span class="token constant">EXCEPTIONAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// final state</span>
            <span class="token function">finishCompletion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">!=</span> <span class="token constant">NEW</span> <span class="token operator">||</span>
            <span class="token operator">!</span><span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> runnerOffset<span class="token punctuation">,</span>
                                         <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> c <span class="token operator">=</span> callable<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> state <span class="token operator">==</span> <span class="token constant">NEW</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">V</span> result<span class="token punctuation">;</span>
                <span class="token keyword">boolean</span> ran<span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    result <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    ran <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    ran <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token function">setException</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>ran<span class="token punctuation">)</span>
                    <span class="token function">set</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// runner must be non-null until state is settled to</span>
            <span class="token comment">// prevent concurrent calls to run()</span>
            runner <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token comment">// state must be re-read after nulling runner to prevent</span>
            <span class="token comment">// leaked interrupts</span>
            <span class="token keyword">int</span> s <span class="token operator">=</span> state<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">>=</span> <span class="token constant">INTERRUPTING</span><span class="token punctuation">)</span>
                <span class="token function">handlePossibleCancellationInterrupt</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Executes the computation without setting its result, and then
     * resets this future to initial state, failing to do so if the
     * computation encounters an exception or is cancelled.  This is
     * designed for use with tasks that intrinsically execute more
     * than once.
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if successfully run and reset
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">runAndReset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">!=</span> <span class="token constant">NEW</span> <span class="token operator">||</span>
            <span class="token operator">!</span><span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> runnerOffset<span class="token punctuation">,</span>
                                         <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> ran <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> s <span class="token operator">=</span> state<span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">></span></span> c <span class="token operator">=</span> callable<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> s <span class="token operator">==</span> <span class="token constant">NEW</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    c<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// don't set result</span>
                    ran <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">setException</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// runner must be non-null until state is settled to</span>
            <span class="token comment">// prevent concurrent calls to run()</span>
            runner <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token comment">// state must be re-read after nulling runner to prevent</span>
            <span class="token comment">// leaked interrupts</span>
            s <span class="token operator">=</span> state<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">>=</span> <span class="token constant">INTERRUPTING</span><span class="token punctuation">)</span>
                <span class="token function">handlePossibleCancellationInterrupt</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ran <span class="token operator">&amp;&amp;</span> s <span class="token operator">==</span> <span class="token constant">NEW</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Ensures that any interrupt from a possible cancel(true) is only
     * delivered to a task while in run or runAndReset.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">handlePossibleCancellationInterrupt</span><span class="token punctuation">(</span><span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// It is possible for our interrupter to stall before getting a</span>
        <span class="token comment">// chance to interrupt us.  Let's spin-wait patiently.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token constant">INTERRUPTING</span><span class="token punctuation">)</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>state <span class="token operator">==</span> <span class="token constant">INTERRUPTING</span><span class="token punctuation">)</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// wait out pending interrupt</span>

        <span class="token comment">// assert state == INTERRUPTED;</span>

        <span class="token comment">// We want to clear any interrupt we may have received from</span>
        <span class="token comment">// cancel(true).  However, it is permissible to use interrupts</span>
        <span class="token comment">// as an independent mechanism for a task to communicate with</span>
        <span class="token comment">// its caller, and there is no way to clear only the</span>
        <span class="token comment">// cancellation interrupt.</span>
        <span class="token comment">//</span>
        <span class="token comment">// Thread.interrupted();</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Simple linked list nodes to record waiting threads in a Treiber
     * stack.  See other classes such as Phaser and SynchronousQueue
     * for more detailed explanation.
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">WaitNode</span> <span class="token punctuation">{</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Thread</span> thread<span class="token punctuation">;</span>
        <span class="token keyword">volatile</span> <span class="token class-name">WaitNode</span> next<span class="token punctuation">;</span>
        <span class="token class-name">WaitNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> thread <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Removes and signals all waiting threads, invokes done(), and
     * nulls out callable.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">finishCompletion</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// assert state > COMPLETING;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">WaitNode</span> q<span class="token punctuation">;</span> <span class="token punctuation">(</span>q <span class="token operator">=</span> waiters<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> waitersOffset<span class="token punctuation">,</span> q<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span> t <span class="token operator">=</span> q<span class="token punctuation">.</span>thread<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        q<span class="token punctuation">.</span>thread <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                        <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token class-name">WaitNode</span> next <span class="token operator">=</span> q<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    q<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// unlink to help gc</span>
                    q <span class="token operator">=</span> next<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        callable <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>        <span class="token comment">// to reduce footprint</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Awaits completion or aborts on interrupt or timeout.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">timed</span> true if use timed waits
     * <span class="token keyword">@param</span> <span class="token parameter">nanos</span> time to wait, if timed
     * <span class="token keyword">@return</span> state upon completion
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">awaitDone</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> timed<span class="token punctuation">,</span> <span class="token keyword">long</span> nanos<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token keyword">long</span> deadline <span class="token operator">=</span> timed <span class="token operator">?</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> nanos <span class="token operator">:</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token class-name">WaitNode</span> q <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> queued <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">removeWaiter</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">int</span> s <span class="token operator">=</span> state<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">></span> <span class="token constant">COMPLETING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>q <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    q<span class="token punctuation">.</span>thread <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> s<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token constant">COMPLETING</span><span class="token punctuation">)</span> <span class="token comment">// cannot time out yet</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>q <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                q <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WaitNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>queued<span class="token punctuation">)</span>
                queued <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> waitersOffset<span class="token punctuation">,</span>
                                                     q<span class="token punctuation">.</span>next <span class="token operator">=</span> waiters<span class="token punctuation">,</span> q<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>timed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                nanos <span class="token operator">=</span> deadline <span class="token operator">-</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>nanos <span class="token operator">&lt;=</span> <span class="token number">0L</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">removeWaiter</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> state<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">parkNanos</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> nanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
                <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Tries to unlink a timed-out or interrupted wait node to avoid
     * accumulating garbage.  Internal nodes are simply unspliced
     * without CAS since it is harmless if they are traversed anyway
     * by releasers.  To avoid effects of unsplicing from already
     * removed nodes, the list is retraversed in case of an apparent
     * race.  This is slow when there are a lot of nodes, but we don't
     * expect lists to be long enough to outweigh higher-overhead
     * schemes.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">removeWaiter</span><span class="token punctuation">(</span><span class="token class-name">WaitNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            node<span class="token punctuation">.</span>thread <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            retry<span class="token operator">:</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>          <span class="token comment">// restart on removeWaiter race</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">WaitNode</span> pred <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> q <span class="token operator">=</span> waiters<span class="token punctuation">,</span> s<span class="token punctuation">;</span> q <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> q <span class="token operator">=</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    s <span class="token operator">=</span> q<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>q<span class="token punctuation">.</span>thread <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                        pred <span class="token operator">=</span> q<span class="token punctuation">;</span>
                    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>pred <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        pred<span class="token punctuation">.</span>next <span class="token operator">=</span> s<span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>pred<span class="token punctuation">.</span>thread <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// check for race</span>
                            <span class="token keyword">continue</span> retry<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> waitersOffset<span class="token punctuation">,</span>
                                                          q<span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">)</span>
                        <span class="token keyword">continue</span> retry<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Unsafe mechanics</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span> <span class="token constant">UNSAFE</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> stateOffset<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> runnerOffset<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> waitersOffset<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token constant">UNSAFE</span> <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span><span class="token punctuation">.</span><span class="token function">getUnsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> k <span class="token operator">=</span> <span class="token class-name">FutureTask</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
            stateOffset <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span>objectFieldOffset
                <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"state"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            runnerOffset <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span>objectFieldOffset
                <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"runner"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            waitersOffset <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span>objectFieldOffset
                <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"waiters"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="状态" tabindex="-1"><a class="header-anchor" href="#状态" aria-hidden="true">#</a> 状态</h3>
<p>首先是找状态。</p>
<p>在FutureTask中，状态是由state属性来表示的，不出所料，它是volatile类型的，确保了不同线程对它修改的可见性：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> state<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">NEW</span>          <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">COMPLETING</span>   <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">NORMAL</span>       <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">EXCEPTIONAL</span>  <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">CANCELLED</span>    <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">INTERRUPTING</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">INTERRUPTED</span>  <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>state属性是贯穿整个FutureTask的最核心的属性，该属性的值代表了任务在运行过程中的状态，随着任务的执行，状态将不断地进行转变，从上面的定义中可以看出，总共有7种状态：包括了1个初始态，2个中间态和4个终止态。</p>
<p>虽说状态有这么多，但是状态的转换路径却只有四种：</p>
<img src="@source/posts/FutureTask-state.png" alt="state of FutureTask" style="zoom:70%;" />
<ul>
<li>任务的初始状态都是<code v-pre>NEW</code>, 这一点是构造函数保证的，我们后面分析构造函数的时候再讲；</li>
<li>任务的终止状态有4种：
<ul>
<li><code v-pre>NORMAL</code>：任务正常执行完毕</li>
<li><code v-pre>EXCEPTIONAL</code>：任务执行过程中发生异常</li>
<li><code v-pre>CANCELLED</code>：任务被取消</li>
<li><code v-pre>INTERRUPTED</code>：任务被中断</li>
</ul>
</li>
<li>任务的中间状态有2种：
<ul>
<li><code v-pre>COMPLETING</code> 正在设置任务结果</li>
<li><code v-pre>INTERRUPTING</code> 正在中断运行任务的线程</li>
</ul>
</li>
</ul>
<p>值得一提的是，任务的中间状态是一个瞬态，它非常的短暂。而且<strong>任务的中间态并不代表任务正在执行，而是任务已经执行完了，正在设置最终的返回结果</strong>，所以可以这么说：</p>
<blockquote>
<p>只要state不处于 <code v-pre>NEW</code> 状态，就说明任务已经执行完毕</p>
</blockquote>
<p>注意，这里的执行完毕是指传入的Callable对象的call方法执行完毕，或者抛出了异常。所以这里的<code v-pre>COMPLETING</code>的名字显得有点迷惑性，它并不意味着任务正在执行中，而意味着call方法已经执行完毕，正在设置任务执行的结果。</p>
<p>而将一个任务的状态设置成终止态只有三种方法：</p>
<ul>
<li>set</li>
<li>setException</li>
<li>cancel</li>
</ul>
<p>我们将在下文的源码解析中分析这三个方法。</p>
</div></template>


