<template><div><p><a href="https://leetcode.cn/problems/sort-an-array/" target="_blank" rel="noopener noreferrer">测试<ExternalLinkIcon/></a></p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token keyword">static</span> <span class="token keyword">int</span> N <span class="token operator">=</span> <span class="token number">50010</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> heap<span class="token punctuation">[</span>N<span class="token punctuation">]</span><span class="token punctuation">,</span> size<span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">down</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> least <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token keyword">int</span> l <span class="token operator">=</span> x <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> r <span class="token operator">=</span> x <span class="token operator">&lt;&lt;</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> size <span class="token operator">&amp;&amp;</span> heap<span class="token punctuation">[</span>l<span class="token punctuation">]</span> <span class="token operator">&lt;</span> heap<span class="token punctuation">[</span>least<span class="token punctuation">]</span><span class="token punctuation">)</span> least <span class="token operator">=</span> l<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">&lt;=</span> size <span class="token operator">&amp;&amp;</span> heap<span class="token punctuation">[</span>r<span class="token punctuation">]</span> <span class="token operator">&lt;</span> heap<span class="token punctuation">[</span>least<span class="token punctuation">]</span><span class="token punctuation">)</span> least <span class="token operator">=</span> r<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>least <span class="token operator">!=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">,</span> heap<span class="token punctuation">[</span>least<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">down</span><span class="token punctuation">(</span>least<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 迭代</span>
<span class="token comment">//        while(x &lt;= size) {</span>
<span class="token comment">//            int least = x;</span>
<span class="token comment">//            int l = x &lt;&lt; 1;</span>
<span class="token comment">//            int r = x &lt;&lt; 1 | 1;</span>
<span class="token comment">//            if (l &lt;= size &amp;&amp; heap[l] &lt; heap[least]) least = l;</span>
<span class="token comment">//            if (r &lt;= size &amp;&amp; heap[r] &lt; heap[least]) least = r;</span>
<span class="token comment">//            if (least == x) {</span>
<span class="token comment">//                break;</span>
<span class="token comment">//            }</span>
<span class="token comment">//            swap(heap[x], heap[least]);</span>
<span class="token comment">//            x = least;</span>
<span class="token comment">//        }</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">up</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> heap<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">&lt;</span> heap<span class="token punctuation">[</span>x <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token punctuation">,</span> heap<span class="token punctuation">[</span>x <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">up</span><span class="token punctuation">(</span>x <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 迭代写法</span>
<span class="token comment">//        while (x / 2 > 0 &amp;&amp; heap[x] &lt; heap[x / 2]) {</span>
<span class="token comment">//            swap(heap[x], heap[x / 2]);</span>
<span class="token comment">//            x >>= 1;</span>
<span class="token comment">//        }</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 建堆</span>
    <span class="token keyword">void</span> <span class="token function">build_heap</span><span class="token punctuation">(</span><span class="token keyword">const</span> vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        size <span class="token operator">=</span> nums<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> heap<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> size <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> i <span class="token operator">>=</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">down</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 依次取出堆顶，然后调整堆。</span>
    <span class="token keyword">void</span> <span class="token function">heap_sort</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> pos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            nums<span class="token punctuation">[</span>pos<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> heap<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            heap<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> heap<span class="token punctuation">[</span>size<span class="token operator">--</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token function">down</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token function">sortArray</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">build_heap</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">heap_sort</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> nums<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


