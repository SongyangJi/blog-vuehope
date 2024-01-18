<template><div><p><code v-pre>ConcurrentLinkedQueue</code>，<strong>基于链表的无界的线程安全队列</strong>。</p>
<p>当许多线程将共享对公共集合的访问时， ConcurrentLinkedQueue是合适的选择。 <strong>像大多数其他并发集合实现一样，此类不允许使用null元素</strong>。</p>
<p>此实现采用了一种高效的非阻塞算法，该算法基于 Maged M. Michael 和 Michael L. Scott 在《Simple、Fast、Practical Non-Blocking and Blocking Concurrent Queue Algorithms》 中描述的算法 。</p>
<p><strong>迭代器是弱一致性的，返回元素反映了在迭代器创建时或之后的某个时刻的队列状态</strong>。</p>
<p>它们不会抛出 <code v-pre>java.util.ConcurrentModificationException</code> ，并且可能与其他操作同时进行。</p>
<p>自迭代器创建以来队列中包含的元素将只返回一次。</p>
<p>某个迭代器创建之后，使用它遍历队列元素时，队列中的某个元素正好返回一次。</p>
<p>请注意，与大多数集合不同， size方法不是时间复杂度为O(1)的操作。</p>
<p>由于这些队列的异步性质，确定当前元素数量需要遍历元素（所以它的时间复杂度是O(n) ，需要我们注意），因此如果在遍历期间修改此集合，则可能会报告不准确的结果。</p>
<p>此外，批量操作addAll 、 removeAll 、 retainAll 、 containsAll 、 equals和toArray不能保证以原子方式执行。</p>
<p>内存一致性影响：与其他并发集合一样，在一个线程中将对象放入ConcurrentLinkedQueue中的操作发生在另一个线程中从ConcurrentLinkedQueue访问或删除该元素之后的操作之前。</p>
<p>请注意，与此包中的大多数非阻塞算法一样，此实现依赖于以下事实：
在垃圾中收集到的系统中，不存在ABA问题的可能性。
要回收节点，则无需使用“计数指针”或其他相关技术。</p>
<p>基本的循环不变量:</p>
<ul>
<li>有且仅有一个节点的后即指针为null，就是队列的最后一个节点</li>
<li>CAS一个节点的引用和null引用，可以原子性地将它从队列中移除。</li>
<li>从head节点出发遍历所有元素的可达性必须保持，即使在并发修改的情况下。</li>
<li>一个已经出队的节点仍然可能处于可使用状态，比如在发生<strong>创建一个迭代器</strong>或者<strong>使用poll</strong>(不过它暂时失去了cpu时间片)的情况时。</li>
</ul>
<p>一个优化，每当当前指针距离头/尾指针两步远时候，都会去更新 head / tail。</p>
<p>因为头尾节点都是并发并且独立地更新的，所以完全由可能一方落后于另一方更新。</p>
<p>头部和尾部都有可能滞后，</p>
<p>迭代器会跳过元素为null的节点。</p>
<p>当创造一个节点（入队操作前）的时候，为了避免 volatile 写的开销，</p>
<p>使用了 Unsafe.putObject 代替了普通写，是的排队的开销降为约1.5倍的CAS。</p>
<p>头部和尾部节点有可能引用，也有可能不引用一个有着非空项的节点。</p>
<p>如果队列是空的，那么所有元素必然都是空的。</p>
<p>创建节点时，头尾节点引用一个有着空元素的哑结点。</p>
<p>它们都使用CAS进行更新，所以永不倒回。</p>
<p>注：为了节省篇幅，略去部分方法以及注释。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent</span><span class="token punctuation">;</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcurrentLinkedQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span>
        <span class="token keyword">implements</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span><span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">196745693267521676L</span><span class="token punctuation">;</span>

    

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        <span class="token keyword">volatile</span> <span class="token class-name">E</span> item<span class="token punctuation">;</span>
        <span class="token keyword">volatile</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> next<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * Constructs a new node.  Uses relaxed write because item can
         * only be seen after publication via casNext.
         * 创建一个节点，使用unsafe的方式，不过在使用 casNext 后才能真正遍历到它。
         */</span>
        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">E</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> itemOffset<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">boolean</span> <span class="token function">casItem</span><span class="token punctuation">(</span><span class="token class-name">E</span> cmp<span class="token punctuation">,</span> <span class="token class-name">E</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> itemOffset<span class="token punctuation">,</span> cmp<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

      	<span class="token comment">//  t.lazySetNext(newNode) &lt;==> t.next = newNode</span>
        <span class="token keyword">void</span> <span class="token function">lazySetNext</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">putOrderedObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> nextOffset<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>

        <span class="token keyword">boolean</span> <span class="token function">casNext</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> cmp<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> nextOffset<span class="token punctuation">,</span> cmp<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Unsafe mechanics</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span> <span class="token constant">UNSAFE</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> itemOffset<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> nextOffset<span class="token punctuation">;</span>

        <span class="token keyword">static</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token constant">UNSAFE</span> <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span><span class="token punctuation">.</span><span class="token function">getUnsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> k <span class="token operator">=</span> <span class="token class-name">Node</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
                itemOffset <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span>objectFieldOffset
                    <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"item"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                nextOffset <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span>objectFieldOffset
                    <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"next"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

  
    <span class="token doc-comment comment">/**
     * 不变量:
     * - 所有存活节点都可以通过 head 节点到达，通过后继指针 
     * - head != null
     * - (tmp = head).next != tmp || tmp != head  ???
     * 非不变量:
     * - head.item 可能为null，也有可能不为null,
		 * - 允许 tail 到 head的滞后，也就是可能无法从 head 到达 tail.
     * 
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> head<span class="token punctuation">;</span>

   <span class="token doc-comment comment">/**
     * 不变量:
     * - the last node 总是可以通过 tail 节点到达，通过后继指针 （the last node 是唯一的其next值为 null 的 node）
     * - tail != null
     * 非不变量:
     * - tail.item 可能为null，也有可能不为null,
		 * - 允许 tail 到 head的滞后，也就是可能无法从 head 到达 tail.
     * - tail.next 可能也可能不”自我指向“ tail.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> tail<span class="token punctuation">;</span>

    <span class="token comment">// 空队列，head、tail 指向同一哑结点</span>
    <span class="token keyword">public</span> <span class="token class-name">ConcurrentLinkedQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        head <span class="token operator">=</span> tail <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token class-name">ConcurrentLinkedQueue</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">></span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> h <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> t <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">E</span> e <span class="token operator">:</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">checkNotNull</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 注意 ConcurrentLinkedQueue 不允许null元素</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 遇到第一个元素</span>
                h <span class="token operator">=</span> t <span class="token operator">=</span> newNode<span class="token punctuation">;</span> 
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                t<span class="token punctuation">.</span><span class="token function">lazySetNext</span><span class="token punctuation">(</span>newNode<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 相当于 t.next = newNode, 不过避免了 volatile 写</span>
                t <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// c 为 empty，同上</span>
            h <span class="token operator">=</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> h<span class="token punctuation">;</span>
        tail <span class="token operator">=</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token doc-comment comment">/**
     * Tries to CAS head to p. If successful, repoint old head to itself
     * as sentinel for succ(), below.
     * 
     * CAS替换掉旧 head （h）为 新 head（p）
     * 如果替换成功，旧 head的next指针指向自己，成为哨兵
     */</span>
    <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">updateHead</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> h<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">!=</span> p <span class="token operator">&amp;&amp;</span> <span class="token function">casHead</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">)</span>
            h<span class="token punctuation">.</span><span class="token function">lazySetNext</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 使旧head的后继为head自己，起哨兵作用</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Returns the successor of p, or the head node if p.next has been
     * linked to self, which will only be true if traversing with a
     * stale pointer that is now off the list.
     * 
     * 获取 p 的后继，不过如果 p.next == p 的话，说明 p 已经出队了
     *（p.next == p 就是我们设置的标志，见h.lazySetNext(h)，
     * 因为正常情况下不会出现这种情况 —— 正常情况下 p.next == p 说明链表成环） 
     * 此时返回链表新的 head，表示从新头出发
     */</span>
    <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> <span class="token function">succ</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> next <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> next<span class="token punctuation">)</span> <span class="token operator">?</span> head <span class="token operator">:</span> next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Inserts the specified element at the tail of this queue.
     * As the queue is unbounded, this method will never return <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">false</span></span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> (as specified by <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Queue</span><span class="token punctuation">#</span><span class="token field">offer</span></span><span class="token punctuation">}</span>)
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified element is null
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">offer</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkNotNull</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>

      	<span class="token comment">// 无界队列，一定可以插入队尾成功。所以，如果失败，一直重试下去</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> t <span class="token operator">=</span> tail<span class="token punctuation">,</span> p <span class="token operator">=</span> t<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> q <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>q <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// p is last node</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">casNext</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> newNode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> t<span class="token punctuation">)</span> <span class="token comment">// p == t的时候不更新（防止每一次入队操作都去更新tail，间隔一次）</span>
                        <span class="token function">casTail</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 失败也ok</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// CAS竞争失败，下次再读，再去尝试</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> q<span class="token punctuation">)</span> <span class="token comment">// 只有一种情况出现 p == q, 就是 p 这个节点作为旧 head 从队列中被剔除出去，用 p.next = p 标识</span>
              
                <span class="token comment">// We have fallen off list.  If tail is unchanged, it</span>
                <span class="token comment">// will also be off-list, in which case we need to</span>
                <span class="token comment">// jump to head, from which all live nodes are always</span>
                <span class="token comment">// reachable.  Else the new tail is a better bet.</span>
              	<span class="token comment">// -------- 以上为源码注释 ---------</span>
                p <span class="token operator">=</span> <span class="token punctuation">(</span>t <span class="token operator">!=</span> <span class="token punctuation">(</span>t <span class="token operator">=</span> tail<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">?</span> t <span class="token operator">:</span> head<span class="token punctuation">;</span> 
                <span class="token comment">// 首先，跳到 head 处肯定是正确的，无非可能要多做几次循环找到尾节点罢了。</span>
                <span class="token comment">// 其次，如果 tail 发生了变化，说明有其他线程入队了节点，并且成功修改了 tail，这个时候没必要从 head 出发,</span>
                <span class="token comment">// 新的 tail 是更好的选择。</span>
          		  <span class="token comment">// </span>
                <span class="token comment">// 需要特别指明的是，如果 p 都已经出队了，那么 t 肯定也出队了（因为 p 是从 t 出发的嘛）</span>
                <span class="token comment">// 如果说此时 tail 还没有发生变化，说明此时 tail 已经跑到了 head的前面（这是完全可能发生的）</span>
                <span class="token comment">// 这时就必须跳到head了重新出发了。</span>
            <span class="token keyword">else</span>
                <span class="token comment">// 寻找真正的”尾节点“</span>
                p <span class="token operator">=</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> t <span class="token operator">&amp;&amp;</span> t <span class="token operator">!=</span> <span class="token punctuation">(</span>t <span class="token operator">=</span> tail<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">?</span> t <span class="token operator">:</span> q<span class="token punctuation">;</span> 
                <span class="token comment">/* 
                 * 这个三元表达式，做了很多事，有判断，有赋值。
                 * 如果，改写成下面这样，行不行呢？
                 * t = tail; p = q;
                 * 我觉得也是没问题的，因为这是个LIFO的队列，p 不是 the last node，顺着往下找就是了.
                 * 不过作者认为，如果经过一次循环后（也就是 p 跳过一个节点之后,此时 p != t，如果又 tail发生了变化，
                 * 直接跳到新的 tail 处继续寻找更好）
                 */</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 
     * 这段逻辑和上面的offer（入队）差不多：
     * 1. 找到链表的真正的头结点（从 head 出发，找到第一个 item 不为null的节点）
     * 2. 将头结点出队（cas将item域置null）
     * 3. 更新 head （cas更新head，旧head标记为"哨兵“）
     *
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        restartFromHead<span class="token operator">:</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> h <span class="token operator">=</span> head<span class="token punctuation">,</span> p <span class="token operator">=</span> h<span class="token punctuation">,</span> q<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">E</span> item <span class="token operator">=</span> p<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
              
                <span class="token comment">// item 不为 null，说明 p 就是链表的头结点了</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> p<span class="token punctuation">.</span><span class="token function">casItem</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">!=</span> h<span class="token punctuation">)</span> <span class="token comment">// 和跟新tail一样，不要每次出队一个节点，就更新一下 head（宁可多循环几次去找到真正的头结点）</span>
                        <span class="token function">updateHead</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>q <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> q <span class="token operator">:</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> item<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>q <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// p的item为null，p 又没有next节点，说明队列此时已经为empty了，返回null即可</span>
                    <span class="token function">updateHead</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 更新 head </span>
                    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> q<span class="token punctuation">)</span>
                    <span class="token comment">// 和上面的一样，如果有其他 thread 也在 poll 节点的话，那么 p 引用的节点可能已经出队，标记为哨兵（哨兵的next指针指向自己）</span>
                    <span class="token comment">// 这个时候需要从新的 head 出发寻找</span>
                    <span class="token keyword">continue</span> restartFromHead<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    p <span class="token operator">=</span> q<span class="token punctuation">;</span> <span class="token comment">// 往后移动，继续找</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 和上面的逻辑基本一致
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        restartFromHead<span class="token operator">:</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> h <span class="token operator">=</span> head<span class="token punctuation">,</span> p <span class="token operator">=</span> h<span class="token punctuation">,</span> q<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">E</span> item <span class="token operator">=</span> p<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token punctuation">(</span>q <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">updateHead</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// updateHead 自身也做了一次 h 是否等于 p 的判断的</span>
                    <span class="token keyword">return</span> item<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> q<span class="token punctuation">)</span>
                    <span class="token keyword">continue</span> restartFromHead<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    p <span class="token operator">=</span> q<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token comment">// 返回列表中的第一个活动（未删除）节点，如果没有，则返回 null。</span>
    <span class="token comment">// 这是 poll/peek 的另一种变体； 这里返回第一个节点，而不是元素。 </span>
    <span class="token comment">// 作为类内的方法使用，不公开</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        restartFromHead<span class="token operator">:</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> h <span class="token operator">=</span> head<span class="token punctuation">,</span> p <span class="token operator">=</span> h<span class="token punctuation">,</span> q<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">boolean</span> hasItem <span class="token operator">=</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>item <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>hasItem <span class="token operator">||</span> <span class="token punctuation">(</span>q <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">updateHead</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> hasItem <span class="token operator">?</span> p <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> q<span class="token punctuation">)</span>
                    <span class="token keyword">continue</span> restartFromHead<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    p <span class="token operator">=</span> q<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 不是通过 size == 0 来判断的</span>
    <span class="token comment">// 时间复杂度: O(1)</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    
    <span class="token comment">// 需要遍历整个链表，因为没有成员属性记录元素个数</span>
    <span class="token comment">// 时间复杂度: O(n), 谨慎使用</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> p <span class="token operator">=</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> p <span class="token operator">=</span> <span class="token function">succ</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 注意是 succ(p) 而不是简单的 p.next</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>item <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>count <span class="token operator">==</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> next<span class="token punctuation">,</span> pred <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> p <span class="token operator">=</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> p <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> pred <span class="token operator">=</span> p<span class="token punctuation">,</span> p <span class="token operator">=</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">boolean</span> removed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token class-name">E</span> item <span class="token operator">=</span> p<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        next <span class="token operator">=</span> <span class="token function">succ</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    removed <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">casItem</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                next <span class="token operator">=</span> <span class="token function">succ</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>pred <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// unlink</span>
                    pred<span class="token punctuation">.</span><span class="token function">casNext</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// cas 失败也 ok</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>removed<span class="token punctuation">)</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">checkNotNull</span><span class="token punctuation">(</span><span class="token class-name">Object</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>v <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
  
    <span class="token doc-comment comment">/**
     * UNSAFE 的 cas 
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">casTail</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> cmp<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> tailOffset<span class="token punctuation">,</span> cmp<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">casHead</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> cmp<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> headOffset<span class="token punctuation">,</span> cmp<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Unsafe mechanics</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span> <span class="token constant">UNSAFE</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> headOffset<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> tailOffset<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token constant">UNSAFE</span> <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span>Unsafe</span><span class="token punctuation">.</span><span class="token function">getUnsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> k <span class="token operator">=</span> <span class="token class-name">ConcurrentLinkedQueue</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
            headOffset <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span>objectFieldOffset
                <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"head"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            tailOffset <span class="token operator">=</span> <span class="token constant">UNSAFE</span><span class="token punctuation">.</span>objectFieldOffset
                <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"tail"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


