<template><div><p>字符串</p>
<h1 id="_1805-字符串中不同整数的数目" tabindex="-1"><a class="header-anchor" href="#_1805-字符串中不同整数的数目" aria-hidden="true">#</a> 1805. 字符串中不同整数的数目</h1>
<p>https://leetcode.cn/problems/number-of-different-integers-in-a-string/solutions/</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">numDifferentIntegers</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    cs <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>cs<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token operator">!</span><span class="token punctuation">(</span>cs<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">>=</span> <span class="token char">'0'</span> <span class="token operator">&amp;&amp;</span> cs<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token char">'9'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            cs<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">' '</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    word <span class="token operator">=</span> <span class="token function">string</span><span class="token punctuation">(</span>cs<span class="token punctuation">)</span>
    splits <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span>
    
    f <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token operator">!</span>strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">break</span>
            <span class="token punctuation">}</span>
            s <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">TrimPrefix</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> s
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> splits <span class="token punctuation">{</span>
        splits<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    m <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> splits <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
            m<span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一次遍历，且原地完成</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">numDifferentIntegers</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    s <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>
    p1 <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> p1 <span class="token operator">&lt;</span> n <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>unicode<span class="token punctuation">.</span><span class="token function">IsDigit</span><span class="token punctuation">(</span><span class="token function">rune</span><span class="token punctuation">(</span>word<span class="token punctuation">[</span>p1<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            p1<span class="token operator">++</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> p1 <span class="token operator">==</span> n <span class="token punctuation">{</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        p2 <span class="token operator">:=</span> p1
        <span class="token keyword">for</span> p2 <span class="token operator">&lt;</span> n <span class="token operator">&amp;&amp;</span> unicode<span class="token punctuation">.</span><span class="token function">IsDigit</span><span class="token punctuation">(</span><span class="token function">rune</span><span class="token punctuation">(</span>word<span class="token punctuation">[</span>p2<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            p2<span class="token operator">++</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> p2<span class="token operator">-</span>p1 <span class="token operator">></span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> word<span class="token punctuation">[</span>p1<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'0'</span> <span class="token punctuation">{</span> <span class="token comment">// 去除前导 0</span>
            p1<span class="token operator">++</span>
        <span class="token punctuation">}</span>
        s<span class="token punctuation">[</span>word<span class="token punctuation">[</span>p1<span class="token punctuation">:</span>p2<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
        p1 <span class="token operator">=</span> p2
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


