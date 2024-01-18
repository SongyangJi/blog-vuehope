<template><div><h1 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h1>
<p>使用<code v-pre>func</code>定义函数。</p>
<p>go中的函数有如下特点（优缺点皆有）</p>
<ol>
<li>
<p>无须前置声明</p>
</li>
<li>
<p>不支持命名嵌套定义</p>
</li>
<li>
<p><strong>不支持同名函数重载！（overload）</strong></p>
</li>
<li>
<p>不支持默认参数</p>
</li>
<li>
<p>支持不定长变参</p>
</li>
<li>
<p><strong>支持多返回值</strong></p>
</li>
<li>
<p><strong>支持命名返回值</strong></p>
</li>
<li>
<p><strong>支持匿名函数和闭包</strong></p>
</li>
</ol>
<p>函数属于第一类对象，具有相同签名（参数列表和返回值列表）的视作同一类型。</p>
<blockquote>
<p>第一类对象值得是可以运行时动态创建，可以用作函数的参数、返回值，可以存入变量的实体。</p>
</blockquote>
<p>函数只能判断是否为nil，不支持其它任何比较操作。</p>
<p>一些小例子</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"strconv"</span>

<span class="token keyword">func</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 无参、无返回值</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">f3</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">f4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span><span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token comment">// 返回指针也是安全的</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">f5</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 多返回值</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">""</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">f6</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>res <span class="token builtin">int</span><span class="token punctuation">,</span> mes <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 命名返回值</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">""</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> myHandler <span class="token keyword">func</span><span class="token punctuation">(</span>param <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>code <span class="token builtin">int</span><span class="token punctuation">,</span> msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token comment">// 定义一个函数</span>

<span class="token comment">// 函数作为返回值</span>
<span class="token keyword">func</span> <span class="token function">chooseStrategy</span><span class="token punctuation">(</span>code <span class="token builtin">int</span><span class="token punctuation">)</span> myHandler <span class="token punctuation">{</span>
	<span class="token keyword">var</span> m <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span>myHandler
	<span class="token keyword">return</span> m<span class="token punctuation">[</span>code<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// 函数作为参数</span>
<span class="token keyword">func</span> <span class="token function">exec</span><span class="token punctuation">(</span>handler myHandler<span class="token punctuation">,</span> param <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	i<span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token function">handler</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
	<span class="token comment">//m := make(map[string]string)</span>
	m <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"code"</span><span class="token punctuation">:</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"msg"</span><span class="token punctuation">:</span> s<span class="token punctuation">}</span>
	<span class="token keyword">return</span> m
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h1>
<p>相邻的同类型参数可合并:</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s2 <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参数的传递方式" tabindex="-1"><a class="header-anchor" href="#参数的传递方式" aria-hidden="true">#</a> 参数的传递方式</h2>
<p>在go中，不管是指针，基本类型，引用类型还是其他类型参数，都是<strong>值拷贝传递</strong>。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>a <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">++</span>
	a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	<span class="token function">f</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> a <span class="token punctuation">{</span>
		<span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/**
0x14000096f48
0x14000096f38
0x14000096f48
0
0

*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>数组是值类型。</p>
</blockquote>
<h2 id="指针参数性能更好吗" tabindex="-1"><a class="header-anchor" href="#指针参数性能更好吗" aria-hidden="true">#</a> 指针参数性能更好吗？</h2>
<blockquote>
<p>这个问题对于java用户来说其实不算问题，因为java除了8种基本数据类型外都是对象，传递的时候都是对象的引用。</p>
</blockquote>
<p>对于go的话，也不能说使用指针传递就一定更好。</p>
<p>首先，使用指针参数好处是避免了大对象的复制。</p>
<h2 id="变参" tabindex="-1"><a class="header-anchor" href="#变参" aria-hidden="true">#</a> 变参</h2>
</div></template>


