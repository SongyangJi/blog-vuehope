<template><div><blockquote>
<p>这里并不打算去详细推导KMP的原理，以及精髓。只是整理了一下KMP算法的模板、应用、理解的关键点。</p>
</blockquote>
<h1 id="基本功能" tabindex="-1"><a class="header-anchor" href="#基本功能" aria-hidden="true">#</a> 基本功能</h1>
<p>KMP算法最基本的应用就是字符串的匹配——给定一个text串，一个pattern串，询问pattern串在text串中是否出现，以及出现几次、位置等等。</p>
<h1 id="模板" tabindex="-1"><a class="header-anchor" href="#模板" aria-hidden="true">#</a> 模板</h1>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">KMP</span><span class="token punctuation">{</span>
    string pattern<span class="token punctuation">;</span>
    <span class="token keyword">int</span> len <span class="token punctuation">;</span>
    vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> next<span class="token punctuation">;</span>  <span class="token comment">// 这里的next数组是从1开始的</span>

    <span class="token comment">// 也叫失配数组,next[i] 表示以第i位结尾的子串与模式串的前缀相同的最大长度（但不能是自身），也就是所谓的最长公共前后缀</span>
    <span class="token keyword">void</span> <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        next<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span>len<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> pattern<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> pattern<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                j <span class="token operator">=</span> next<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>pattern<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> pattern<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                j<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            next<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> j<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">KMP</span><span class="token punctuation">(</span><span class="token keyword">const</span> string <span class="token operator">&amp;</span>pattern<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        len <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token operator">-></span>pattern <span class="token operator">=</span> <span class="token string">" "</span> <span class="token operator">+</span> pattern<span class="token punctuation">;</span> 
        <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">bool</span> <span class="token function">isSubstringOfText</span><span class="token punctuation">(</span><span class="token keyword">const</span> string<span class="token operator">&amp;</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getPositions</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    

    <span class="token comment">// 统计模式串在文本串出现的次数</span>
    <span class="token keyword">int</span> <span class="token function">getTimes</span><span class="token punctuation">(</span><span class="token keyword">const</span> string<span class="token operator">&amp;</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getPositions</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 统计模式串在文本串的出现的次数</span>
    vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token function">getPositions</span><span class="token punctuation">(</span><span class="token keyword">const</span> string<span class="token operator">&amp;</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> res<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>text<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token operator">&lt;</span> len<span class="token punctuation">)</span> <span class="token keyword">return</span> res<span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> text<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>j <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> text<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> pattern<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                j <span class="token operator">=</span> next<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>text<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> pattern<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                j<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>j <span class="token operator">==</span> len<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// i 是匹配时文本串的位置（从0开始）</span>
                res<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                j <span class="token operator">=</span> next<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    

    <span class="token comment">// 求数组f[] 其中 f[i] 表示文本串以i结尾的子串与 pattern 串的前缀相同的最大长度（这里也是从1开始计数）</span>
    vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token function">getFArray</span><span class="token punctuation">(</span><span class="token keyword">const</span> string<span class="token operator">&amp;</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token function">f</span><span class="token punctuation">(</span>m<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span>i <span class="token operator">&lt;</span> m<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>j <span class="token operator">==</span> len <span class="token operator">||</span> text<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> pattern<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                j <span class="token operator">=</span> next<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>text<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> pattern<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                j<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            f<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> j<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> f<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span><span class="token function">getNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="知识点" tabindex="-1"><a class="header-anchor" href="#知识点" aria-hidden="true">#</a> 知识点</h1>
<ul>
<li>失配数组的求法以及含义。<code v-pre>next[]</code></li>
<li>模式匹配的结果数组。<code v-pre>f[]</code></li>
<li>从DFA(有限状态自动)的角度去理解。(对后面的AC自动机的理解大有裨益)</li>
</ul>
<h1 id="典型应用" tabindex="-1"><a class="header-anchor" href="#典型应用" aria-hidden="true">#</a> 典型应用</h1>
<ul>
<li>模式串和文本串的模式匹配。</li>
<li>处理和前缀和后缀有关的问题。</li>
<li>处理循环节方面的问题。</li>
</ul>
</div></template>


