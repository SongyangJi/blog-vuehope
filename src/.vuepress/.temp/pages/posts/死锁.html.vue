<template><div><h1 id="死锁的基本概念" tabindex="-1"><a class="header-anchor" href="#死锁的基本概念" aria-hidden="true">#</a> 死锁的基本概念</h1>
<h2 id="死锁与饥饿" tabindex="-1"><a class="header-anchor" href="#死锁与饥饿" aria-hidden="true">#</a> 死锁与饥饿</h2>
<ul>
<li><strong>死锁</strong>：一组处于等待（阻塞）状态的进程，每一个进程持有其他进程所需要的资源，而又等待使用其他进程所拥有的资源，致使这组进程互相等待，均无法向前推进。另一种定义：当一组进程中每个进程都在等待一个事件，而这一事件只能由这一组进程的另一个进程引起时，这组进程处于死锁状态。</li>
<li><strong>饥饿</strong>：就绪进程长时间得不到调度是处于等待状态，而不是死锁中的互相等待。若信号量的等待队列按照LIFO或优先级管理，则可能导致饥饿。</li>
</ul>
<h2 id="死锁形成的条件" tabindex="-1"><a class="header-anchor" href="#死锁形成的条件" aria-hidden="true">#</a> 死锁形成的条件</h2>
<p>如果以下四个条件同时满足，就会引起死锁：</p>
<ul>
<li>mutual exclusion互斥：至少一个资源要求互斥地共享；</li>
<li>hold and wait占有并等待：一个进程至少占有一个资源并等待另一资源，该资源为其它进程所占有；</li>
<li>no preemption非抢占：资源不能被抢占，只能进程完成任务后自动释放；</li>
<li>circular wait循环等待：互相等待形成一个环。</li>
</ul>
<h2 id="死锁的处理方法" tabindex="-1"><a class="header-anchor" href="#死锁的处理方法" aria-hidden="true">#</a> 死锁的处理方法</h2>
<p>从大的方面来讲有四种解决方案：</p>
<ul>
<li>
<p><strong>使用协议预防死锁</strong>
死锁预防是指一组方法，需要确定至少一个必要条件不成立。</p>
<p>预防的特点是<strong>保证一定不会死锁，但是会降低资源利用率和系统吞吐量</strong>，属于静态的处理方法。</p>
</li>
<li>
<p><strong>使用动态追踪技术避免死锁</strong></p>
<p>死锁避免要求操作系统事先得到有关进程申请使用资源的额外信息。当进程申请资源时，若发现满足该资源的请求可能导致死锁发生，则拒绝该申请。</p>
<p>死锁避免算法会因为<strong>追踪当前资源分配成本增加运行成本</strong>，但是<strong>相对于静态的死锁预防方法它允许更多的并发使用资源，所以系统吞吐量大于死锁预防</strong>。</p>
</li>
<li>
<p><strong>允许进入死锁状态，检测并加以恢复</strong></p>
</li>
<li>
<p><strong>忽视死锁问题</strong>
大多数系统使用，因为死锁发生并不频繁，预防、避免和恢复耗费太大。</p>
</li>
</ul>
<h1 id="死锁预防" tabindex="-1"><a class="header-anchor" href="#死锁预防" aria-hidden="true">#</a> 死锁预防</h1>
<p>死锁预防是指实现破坏死锁的形成条件，预防的特点是一定不会死锁，但是会降低资源利用率和系统吞吐量。</p>
<h3 id="_1-互斥" tabindex="-1"><a class="header-anchor" href="#_1-互斥" aria-hidden="true">#</a> 1. 互斥</h3>
<p>非共享资源必须互斥，共享资源不要求互斥所以不会死锁。无法从互斥条件下手避免死锁。</p>
<h3 id="_2-占有并等待" tabindex="-1"><a class="header-anchor" href="#_2-占有并等待" aria-hidden="true">#</a> 2. 占有并等待</h3>
<ul>
<li>
<p>拥有不等待：资源静态分配策略，要求一个进程在执行前获得所有资源</p>
</li>
<li>
<p>等待不拥有：进程在申请其他资源的时候必须释放已分配的资源。</p>
</li>
</ul>
<p>缺点：资源利用率低，分配以后可能很久不被使用；产生饥饿，对于第一种协议，如果有进程需要多个常用资源，就可能会永久等待。</p>
<h3 id="_3-非抢占" tabindex="-1"><a class="header-anchor" href="#_3-非抢占" aria-hidden="true">#</a> 3. 非抢占</h3>
<p>如果一个进程占有一些资源并在申请一些无法立刻分配到的资源，那么它占有的这些资源就都可以被抢占。该进程将会在它重新获得原有的资源以及原本要申请的资源的时候重启。</p>
<p>用于状态可保存和恢复的资源如CPU，memory等，不适用于打印机等。</p>
<h3 id="_4-循环等待" tabindex="-1"><a class="header-anchor" href="#_4-循环等待" aria-hidden="true">#</a> 4. 循环等待</h3>
<p>对所有资源类型进行完全排序，要求每个进程按递增顺序申请资源。</p>
<p>如哲学家就餐问题，桌上的五根筷子分别编号，所有人只能按照从小到大的顺序申请筷子，所以永远不会出现每个人获得一只筷子的情况。</p>
<p>再比如，当一个进程对资源的使用顺序为5→2→4→3→1的时候，它的申请顺序仍然是12345，也就是说即使1是最后使用，也要先申请。这种浪费在程序越大、申请资源越多的时候越是明显。</p>
<h1 id="死锁避免" tabindex="-1"><a class="header-anchor" href="#死锁避免" aria-hidden="true">#</a> 死锁避免</h1>
<h2 id="安全状态-safe-state" tabindex="-1"><a class="header-anchor" href="#安全状态-safe-state" aria-hidden="true">#</a> 安全状态(safe state)</h2>
<p>如果系统能按照某个顺序为每个进程分配资源并能避免死锁，系统状态就是安全的。或者说，<strong>如果存在一个安全序列safe sequence<code v-pre>&lt;P0,P1,P2,…,Pn&gt;</code>，使得前面的进程能够得到足够的资源完成，同时它释放的资源又能满足后面的进程的话，就是安全的</strong>。</p>
<p>下面给出一个简单的例子：</p>
<table>
<thead>
<tr>
<th>process</th>
<th>maximum</th>
<th>allocation</th>
<th>need</th>
<th>available</th>
</tr>
</thead>
<tbody>
<tr>
<td>p0</td>
<td>10</td>
<td>5</td>
<td>5</td>
<td>3</td>
</tr>
<tr>
<td>p1</td>
<td>4</td>
<td>2</td>
<td>2</td>
<td>3</td>
</tr>
<tr>
<td>p2</td>
<td>9</td>
<td>2</td>
<td>7</td>
<td>3</td>
</tr>
</tbody>
</table>
<p>现在给出一个安全序列<code v-pre>&lt;P1,P0,P2&gt;</code>，之所以说它是安全序列，可以这样分析：P1分配到2个资源以后可以完成任务释放4个资源，那么总共可用资源变成5个，分配给P0以后待其完成任务释放10个资源可以让P2使用，这个分配顺序能确保不会产生死锁，所以系统状态是安全的。</p>
<p>但是，<strong>不安全状态并不一定会导致死锁</strong>。因为我们这里的最大资源需求量很有可能会超出真正需求量，反之，死锁状态一定是不安全状态。</p>
<p><strong>有了安全状态的概念，就可以定义避免算法以确保系统不会死锁，其思想就是简单的确保系统始终处于安全状态。</strong></p>
<h2 id="单实例——资源分配图-rag——resource-allocation-graph" tabindex="-1"><a class="header-anchor" href="#单实例——资源分配图-rag——resource-allocation-graph" aria-hidden="true">#</a> 单实例——资源分配图(RAG——resource-allocation graph)</h2>
<p>使用具有claim边的RAG，适用于每种资源类型有单个实例的资源分配系统。</p>
<figure><img src="@source/posts/rag.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>有如下重要概念：</p>
<ol>
<li>虚边：将要请求或可能使用claim edge;</li>
<li>实边：请求边和分配边request，assignment</li>
</ol>
<p>规定：
如果没有环，就是安全状态；
如果有环，即使环中有虚边，也是不安全状态，在避免算法里面是不允许出现的；
如果出现了实边环，就是死锁。</p>
<h2 id="多实例——银行家算法-banker-s-algorithm" tabindex="-1"><a class="header-anchor" href="#多实例——银行家算法-banker-s-algorithm" aria-hidden="true">#</a> 多实例——银行家算法(Banker's Algorithm)</h2>
<blockquote>
<p>在银行中，客户申请贷款的数量是有限的，每个客户在第一次申请贷款时要声明完成该项目所需的最大资金量，在满足所有贷款要求时，客户应及时归还。银行家在客户申请的贷款数量不超过自己拥有的最大值时，都应尽量满足客户的需要。在这样的描述中，银行家就好比操作系统，资金就是资源，客户就相当于要申请资源的进程。</p>
</blockquote>
<blockquote>
<p>上面的算法针对的是每个资源都只有单实例的情况。</p>
</blockquote>
<p>当新进程进入系统时，必须说明其可能需要的每种类型资源实例的最大数量。用户申请一组资源时，系统必须确保这些资源分配后系统仍处于安全状态。</p>
<p>设系统中共有n个进程和m种资源类型</p>
<ul>
<li>
<p>安全性算法：确定计算机系统是否处于安全状态</p>
<ul>
<li>向量finish[n]存储进程是否已经完成，初始状态为false；</li>
<li>向量available[m]存储当前每种资源的剩余可用量，初始值为资源总量；</li>
<li>向量need[n] [m]存储每个进程的所需要的每种资源的数量(need即max——最多需要多少资源)；</li>
<li>寻找是否存在finish=false且所需资源need[i] ≤ available的进程，如果存在，让这个进程获得所需要的资源执行结束，然后释放资源，这个时候它的finish=true，而总的available也要加上该进程原来占有的资源；</li>
<li>循环执行上一步直到没有符合条件的进程。这时候如果finish全部为true，那么系统处于安全状态，我们就能获得一个安全序列。</li>
</ul>
</li>
<li>
<p>资源请求算法：判断是否可安全允许请求</p>
<ul>
<li>确定request≤need，否则出错；request≤available，否则等待</li>
<li>按照请求假分配，修改系统当前的available、need，然后判断假分配以后系统状态是否安全。如果安全，该分配得到允许。</li>
</ul>
</li>
</ul>
<h3 id="伪代码" tabindex="-1"><a class="header-anchor" href="#伪代码" aria-hidden="true">#</a> 伪代码</h3>
<p><strong>P - 进程的集合</strong>
<strong>Mp - 进程p的最大的请求数目</strong>
<strong>Cp - 进程p当前被分配的资源</strong>
<strong>A - 当前可用的资源</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>P <span class="token operator">!=</span> ∅<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    found <span class="token operator">=</span> FALSE<span class="token punctuation">;</span>
    <span class="token function">foreach</span> <span class="token punctuation">(</span>p ∈ P<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Mp − Cp ≤ A<span class="token punctuation">)</span> <span class="token punctuation">{</span>
             <span class="token comment">/* p可以獲得他所需的資源。假設他得到資源後執行；執行終止，並釋放所擁有的資源。*/</span>
             A <span class="token operator">=</span> A <span class="token operator">+</span> Cp <span class="token punctuation">;</span>
             P <span class="token operator">=</span> P − <span class="token punctuation">{</span>p<span class="token punctuation">}</span><span class="token punctuation">;</span>
             found <span class="token operator">=</span> TRUE<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span> found<span class="token punctuation">)</span> <span class="token keyword">return</span> FAIL<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> OK<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><a href="https://zh.wikipedia.org/wiki/%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%95" target="_blank" rel="noopener noreferrer">银行家算法<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


