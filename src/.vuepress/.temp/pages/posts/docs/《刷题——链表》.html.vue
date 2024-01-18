<template><div><h2 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h2>
<h3 id="链表中的节点每k个一组翻转" tabindex="-1"><a class="header-anchor" href="#链表中的节点每k个一组翻转" aria-hidden="true">#</a> 链表中的节点每k个一组翻转</h3>
<p>题：将给出的链表中的节点每 k 个一组翻转，返回翻转后的链表
如果链表中的节点数不是 k 的倍数，将最后剩下的节点保持原样
你不能更改节点中的值，只能更改节点本身。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token doc-comment comment">/**
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">head</span> ListNode类 
     * <span class="token keyword">@param</span> <span class="token parameter">k</span> int整型 
     * <span class="token keyword">@return</span> ListNode类
     */</span>
    <span class="token keyword">int</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token operator">*</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> cnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token operator">++</span>cnt<span class="token punctuation">;</span>
            head <span class="token operator">=</span> head<span class="token operator">-></span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> cnt<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token class-name">ListNode</span><span class="token operator">*</span> <span class="token function">reverseKGroup</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token operator">*</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// write code here</span>
        <span class="token class-name">ListNode</span> <span class="token operator">*</span>dum <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">*</span>cur <span class="token operator">=</span> dum<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span><span class="token operator">*</span> p <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token function">len</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cur<span class="token operator">-></span>next <span class="token operator">=</span> p<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">ListNode</span> <span class="token operator">*</span>res <span class="token operator">=</span> nullptr<span class="token punctuation">,</span> <span class="token operator">*</span>q <span class="token operator">=</span> p<span class="token punctuation">;</span>
            <span class="token comment">// 头插</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                auto nxt <span class="token operator">=</span> q<span class="token operator">-></span>next<span class="token punctuation">;</span>
                q<span class="token operator">-></span>next <span class="token operator">=</span> res<span class="token punctuation">;</span>
                res <span class="token operator">=</span> q<span class="token punctuation">;</span>
                q <span class="token operator">=</span> nxt<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            cur<span class="token operator">-></span>next <span class="token operator">=</span> res<span class="token punctuation">;</span> <span class="token comment">// 接上</span>
            cur <span class="token operator">=</span> p<span class="token punctuation">;</span> <span class="token comment">// cur 移动</span>
            p <span class="token operator">=</span> q<span class="token punctuation">;</span> <span class="token comment">// p 移动</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dum<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token class-name">ListNode</span><span class="token operator">*</span> <span class="token function">reverseKGroup</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token operator">*</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span><span class="token operator">*</span> dumb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dumb<span class="token operator">-></span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> <span class="token operator">*</span>pre <span class="token operator">=</span> dumb<span class="token punctuation">,</span> <span class="token operator">*</span>end <span class="token operator">=</span> dumb<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>end<span class="token operator">-></span>next <span class="token operator">!=</span> nullptr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k <span class="token operator">&amp;&amp;</span> end <span class="token operator">!=</span> nullptr<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                end <span class="token operator">=</span> end<span class="token operator">-></span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>end <span class="token operator">==</span> nullptr<span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token class-name">ListNode</span><span class="token operator">*</span> nxt <span class="token operator">=</span> end<span class="token operator">-></span>next<span class="token punctuation">;</span> <span class="token comment">// 拿到后继</span>
            <span class="token class-name">ListNode</span><span class="token operator">*</span> start <span class="token operator">=</span> pre<span class="token operator">-></span>next<span class="token punctuation">;</span> <span class="token comment">// 拿到头</span>
            end<span class="token operator">-></span>next <span class="token operator">=</span> nullptr<span class="token punctuation">;</span> <span class="token comment">// 断开</span>
            pre<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 反转</span>
            start<span class="token operator">-></span>next <span class="token operator">=</span> nxt<span class="token punctuation">;</span> <span class="token comment">// 接上链表</span>
            pre <span class="token operator">=</span> end <span class="token operator">=</span> start<span class="token punctuation">;</span> <span class="token comment">// “头”变成”尾“，从这出发</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dumb<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token class-name">ListNode</span><span class="token operator">*</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token operator">*</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span><span class="token operator">*</span> pre <span class="token operator">=</span> nullptr<span class="token punctuation">,</span> <span class="token operator">*</span>cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> nullptr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span><span class="token operator">*</span> nxt <span class="token operator">=</span> cur<span class="token operator">-></span>   next<span class="token punctuation">;</span>
            cur<span class="token operator">-></span>next <span class="token operator">=</span> pre<span class="token punctuation">;</span>
            pre <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> nxt<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="判断链表中是否有环-快慢指针" tabindex="-1"><a class="header-anchor" href="#判断链表中是否有环-快慢指针" aria-hidden="true">#</a> 判断链表中是否有环（快慢指针）</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasCycle</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">,</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fast <span class="token operator">==</span> slow<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 检查</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="环的入口" tabindex="-1"><a class="header-anchor" href="#环的入口" aria-hidden="true">#</a> 环的入口</h3>
<p><a href="https://song-yang-ji.blog.csdn.net/article/details/108997251" target="_blank" rel="noopener noreferrer">题解<ExternalLinkIcon/></a></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token class-name">EntryNodeOfLoop</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> pHead<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>pHead <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> pHead<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> pHead<span class="token punctuation">,</span> fast <span class="token operator">=</span> pHead<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>slow <span class="token operator">==</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> pHead<span class="token punctuation">;</span>
                <span class="token comment">// a+(n+1)b+nc=2(a+b)⟹a=c+(n−1)(b+c)</span>
                <span class="token comment">// a == c</span>
                <span class="token keyword">while</span><span class="token punctuation">(</span>cur <span class="token operator">!=</span> slow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> cur<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="链表相交" tabindex="-1"><a class="header-anchor" href="#链表相交" aria-hidden="true">#</a> 链表相交</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">getIntersectionNode</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> headA<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> headB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>headA <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> headB <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> pA <span class="token operator">=</span> headA<span class="token punctuation">,</span> pB <span class="token operator">=</span> headB<span class="token punctuation">;</span>
        <span class="token comment">// a + c + b == b + c + a (c是公共部分)</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>pA <span class="token operator">!=</span> pB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pA <span class="token operator">=</span> pA <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> headB <span class="token operator">:</span> pA<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            pB <span class="token operator">=</span> pB <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> headA <span class="token operator">:</span> pB<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> pA<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除给出链表中的重复元素" tabindex="-1"><a class="header-anchor" href="#删除给出链表中的重复元素" aria-hidden="true">#</a> 删除给出链表中的重复元素</h3>
<p><strong>删除给出链表中的重复元素</strong>（链表中元素从小到大有序），<strong>使链表中的所有元素都只出现一次</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> deleteDuplicates <span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// write code here</span>
        <span class="token class-name">ListNode</span> p <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>val <span class="token operator">==</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                p<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                p <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除给出链表中的重复元素，一个也不留</strong>（链表中元素从小到大有序）
<strong>删除有序链表中重复的元素-II</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token class-name">ListNode</span><span class="token operator">*</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token operator">*</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span><span class="token operator">*</span> dum <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">,</span> <span class="token operator">*</span>cur <span class="token operator">=</span> dum<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span><span class="token operator">*</span> p <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> val <span class="token operator">=</span> p<span class="token operator">-></span>val<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token operator">-></span>next <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>next<span class="token operator">-></span>val <span class="token operator">==</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ListNode</span><span class="token operator">*</span> q <span class="token operator">=</span> p<span class="token punctuation">;</span>
                <span class="token keyword">while</span><span class="token punctuation">(</span>q <span class="token operator">&amp;&amp;</span> q<span class="token operator">-></span>val <span class="token operator">==</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    q <span class="token operator">=</span> q<span class="token operator">-></span>next<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                p <span class="token operator">=</span> q<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token class-name">ListNode</span><span class="token operator">*</span> q <span class="token operator">=</span> p<span class="token operator">-></span>next<span class="token punctuation">;</span>
                p<span class="token operator">-></span>next <span class="token operator">=</span> nullptr<span class="token punctuation">;</span> <span class="token comment">// 断开</span>
                cur<span class="token operator">-></span>next <span class="token operator">=</span> p<span class="token punctuation">;</span>
                cur <span class="token operator">=</span> p<span class="token punctuation">;</span>
                p <span class="token operator">=</span> q<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dum<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="k路归并问题" tabindex="-1"><a class="header-anchor" href="#k路归并问题" aria-hidden="true">#</a> K路归并问题</h3>
<p><a href="https://leetcode-cn.com/problems/merge-k-sorted-lists/" target="_blank" rel="noopener noreferrer">23. 合并K个升序链表<ExternalLinkIcon/></a></p>
<ul>
<li>堆
<strong>k路归并问题</strong>
时间复杂度:$O(kn*log(k))$</li>
</ul>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token comment">/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">struct</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        ListNode<span class="token operator">*</span> p<span class="token punctuation">;</span>
        <span class="token function">Node</span><span class="token punctuation">(</span>ListNode<span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">p</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">bool</span> <span class="token keyword">operator</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token keyword">const</span> Node<span class="token operator">&amp;</span> b<span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> p<span class="token operator">-></span>val<span class="token operator">></span>b<span class="token punctuation">.</span>p<span class="token operator">-></span>val<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    ListNode<span class="token operator">*</span> <span class="token function">mergeKLists</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span>ListNode<span class="token operator">*</span><span class="token operator">></span><span class="token operator">&amp;</span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ListNode<span class="token operator">*</span> preHead <span class="token operator">=</span> <span class="token keyword">new</span> ListNode<span class="token punctuation">;</span> <span class="token comment">//哨兵</span>
        ListNode<span class="token operator">*</span> pre <span class="token operator">=</span> preHead<span class="token punctuation">;</span>
        priority_queue<span class="token operator">&lt;</span>Node<span class="token operator">></span> pq<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>lists<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>lists<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> pq<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">Node</span><span class="token punctuation">(</span>lists<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>pq<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            Node node <span class="token operator">=</span> pq<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            pq<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            pre<span class="token operator">-></span>next <span class="token operator">=</span> node<span class="token punctuation">.</span>p<span class="token punctuation">;</span>
            pre <span class="token operator">=</span> pre<span class="token operator">-></span>next<span class="token punctuation">;</span> <span class="token comment">// 尾插</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>p<span class="token operator">-></span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
                pq<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">Node</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>p<span class="token operator">-></span>next<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> preHead<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>分治算法
如果两两合并的话，时间复杂度 $O(k^2*n)$</li>
</ul>
<p>分治的话：一次合并区间的一半。就像是<strong>归并排序</strong>一样。
时间复杂度：$O(k*log(k)*n)$</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    ListNode<span class="token operator">*</span> <span class="token function">mergeKLists</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span>ListNode<span class="token operator">*</span><span class="token operator">></span><span class="token operator">&amp;</span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">devide_conquer</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>lists<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    ListNode<span class="token operator">*</span> <span class="token function">devide_conquer</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span>ListNode<span class="token operator">*</span><span class="token operator">></span><span class="token operator">&amp;</span> lists<span class="token punctuation">,</span><span class="token keyword">int</span> l<span class="token punctuation">,</span><span class="token keyword">int</span> r<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>l<span class="token operator">==</span>r<span class="token punctuation">)</span> <span class="token keyword">return</span> lists<span class="token punctuation">[</span>l<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>l<span class="token operator">></span>r<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> mid <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span>r <span class="token operator">-</span> l<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token comment">// 和归并排序一样的做法,先处理一半，再合并到一起</span>
        ListNode<span class="token operator">*</span> left <span class="token operator">=</span> <span class="token function">devide_conquer</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> l<span class="token punctuation">,</span> mid<span class="token punctuation">)</span>
        ListNode<span class="token operator">*</span> right <span class="token operator">=</span> <span class="token function">devide_conquer</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 双链合并的标准写法写法 </span>
    ListNode<span class="token operator">*</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>ListNode<span class="token operator">*</span> l1<span class="token punctuation">,</span> ListNode<span class="token operator">*</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ListNode<span class="token operator">*</span> preHead <span class="token operator">=</span> <span class="token keyword">new</span> ListNode<span class="token punctuation">;</span> <span class="token comment">// 哨兵</span>
        ListNode<span class="token operator">*</span> pre <span class="token operator">=</span> preHead<span class="token punctuation">;</span>  <span class="token comment">// 移动的哨兵</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>l1 <span class="token operator">&amp;&amp;</span> l2<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l1<span class="token operator">-></span>val<span class="token operator">&lt;</span>l2<span class="token operator">-></span>val<span class="token punctuation">)</span><span class="token punctuation">{</span>
                pre<span class="token operator">-></span>next <span class="token operator">=</span> l1<span class="token punctuation">;</span>
                l1 <span class="token operator">=</span> l1<span class="token operator">-></span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                pre<span class="token operator">-></span>next <span class="token operator">=</span> l2<span class="token punctuation">;</span>
                l2 <span class="token operator">=</span> l2<span class="token operator">-></span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            pre <span class="token operator">=</span> pre<span class="token operator">-></span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        pre<span class="token operator">-></span>next <span class="token operator">=</span> <span class="token punctuation">(</span>l1 <span class="token operator">?</span> l1 <span class="token operator">:</span> l2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> preHead<span class="token operator">-></span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多路归并</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">mergeKLists</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">></span></span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">></span></span> pq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>o1<span class="token punctuation">,</span> o2<span class="token punctuation">)</span> <span class="token operator">-></span> o1<span class="token punctuation">.</span>val <span class="token operator">-</span> o2<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> node <span class="token operator">:</span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> pq<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ListNode</span> dum <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cur <span class="token operator">=</span> dum<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>pq<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> node <span class="token operator">=</span> pq<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> node<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               pq<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dum<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


