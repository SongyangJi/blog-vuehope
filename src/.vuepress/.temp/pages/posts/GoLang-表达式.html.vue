<template><div><h1 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h1>
<h2 id="自增" tabindex="-1"><a class="header-anchor" href="#自增" aria-hidden="true">#</a> 自增</h2>
<ol>
<li>只能后置，不允许前置</li>
<li>只能作为单独语句，不可以作为表达式</li>
</ol>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>x <span class="token operator">:=</span> <span class="token number">1</span>
x<span class="token operator">++</span>
<span class="token operator">++</span>x <span class="token comment">// error</span>
y <span class="token operator">:=</span> x<span class="token operator">++</span> <span class="token comment">// error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h2>
<p>指针是一个专门用来保存地址的整形变量。</p>
<p>go语言的指针相比于c中的指针有很大的限制和改变。</p>
<ol>
<li><strong>支持相等</strong>运算符，但是<strong>不支持加减法和类型转换</strong>。</li>
<li>不使用<code v-pre>-&gt;</code>访问成员，而是使用<code v-pre>.</code></li>
<li>不是所有对象都能使用<code v-pre>&amp;</code>获得其地址。</li>
</ol>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>	x <span class="token operator">:=</span> <span class="token number">1</span>
	<span class="token keyword">var</span> p <span class="token operator">*</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>x
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> p<span class="token punctuation">)</span>
	<span class="token comment">//p++ // Invalid operation: p++ (non-numeric type *int)</span>
	<span class="token comment">//p += 2 // Invalid operation: p += 2 (mismatched types *int and untyped int)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>m <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span>
m<span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
m<span class="token punctuation">[</span><span class="token string">"2"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span>
<span class="token function">println</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> <span class="token operator">&amp;</span>m<span class="token punctuation">)</span> <span class="token comment">// 0x1400005e180 0x1400000e028 为什么不一样？0x1400005e180引用着map</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> <span class="token operator">&amp;</span>m<span class="token punctuation">)</span> <span class="token comment">// map[1:1 2:2] &amp;map[1:1 2:2]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unsafe-pointer和uintptr" tabindex="-1"><a class="header-anchor" href="#unsafe-pointer和uintptr" aria-hidden="true">#</a> unsafe.Pointer和uintptr</h3>
<h3 id="零长度对象" tabindex="-1"><a class="header-anchor" href="#零长度对象" aria-hidden="true">#</a> 零长度对象</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>	<span class="token keyword">var</span> a<span class="token punctuation">,</span> b <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	pa <span class="token operator">:=</span> <span class="token operator">&amp;</span>a
	pb <span class="token operator">:=</span> <span class="token operator">&amp;</span>b
	<span class="token function">println</span><span class="token punctuation">(</span>pa<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>pb<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>pa <span class="token operator">==</span> pb<span class="token punctuation">)</span> <span class="token comment">// 结果和具体实现有关</span>

	p1 <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>pa<span class="token punctuation">)</span>
	p2 <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>pb<span class="token punctuation">)</span>
	<span class="token keyword">var</span> p1ptr <span class="token builtin">uintptr</span> <span class="token operator">=</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span>
	<span class="token keyword">var</span> p2ptr <span class="token builtin">uintptr</span> <span class="token operator">=</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>p1ptr<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>p2ptr<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>p1ptr <span class="token operator">==</span> p2ptr<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<p>0x14000096f58
0x14000096f58
false
1374390153048
1374390153048
true</p>
<p><strong>零长度对象</strong>的地址如何分配看具体实现，总之<strong>肯定不为nil</strong>，换言之它拥有合法的内存地址。</p>
<h3 id="二级指针" tabindex="-1"><a class="header-anchor" href="#二级指针" aria-hidden="true">#</a> 二级指针</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>	x <span class="token operator">:=</span> <span class="token number">1</span>
	px <span class="token operator">:=</span> <span class="token operator">&amp;</span>x
	ppx <span class="token operator">:=</span> <span class="token operator">&amp;</span>px <span class="token comment">// var pxx **int = &amp;px</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token operator">&amp;</span>x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>px<span class="token punctuation">,</span> <span class="token operator">&amp;</span>px<span class="token punctuation">,</span> <span class="token operator">*</span>px<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ppx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ppx<span class="token punctuation">,</span> <span class="token operator">*</span>ppx<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h1>
<p>对于复合类型（数组、切片、字典、结构体）的初始化而言，有一些语法限制。</p>
<ol>
<li>初始化表达式必须有类型标签；</li>
<li>左花括号必须在类型尾部，不能另起一行；</li>
<li>多个成员以逗号分隔；</li>
</ol>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>	<span class="token keyword">type</span> data <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		x <span class="token builtin">int</span>
		s <span class="token builtin">string</span>
	<span class="token punctuation">}</span>

	d <span class="token operator">:=</span> data<span class="token punctuation">{</span> <span class="token comment">// 初始化表达式必须有类型标签</span>
		<span class="token number">1</span><span class="token punctuation">,</span>
		<span class="token string">"s"</span><span class="token punctuation">,</span> <span class="token comment">// 逗号不能省略</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h1>
<h2 id="if-else" tabindex="-1"><a class="header-anchor" href="#if-else" aria-hidden="true">#</a> if-else</h2>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   x <span class="token operator">:=</span> <span class="token number">1</span>
   <span class="token keyword">if</span> x <span class="token operator">></span> <span class="token number">1</span> <span class="token punctuation">{</span> <span class="token comment">// </span>
      
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   
   <span class="token punctuation">}</span>
   
   <span class="token keyword">if</span> a<span class="token punctuation">,</span> b <span class="token operator">:=</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> a <span class="token operator">&lt;</span> b <span class="token punctuation">{</span>
      
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="switch" tabindex="-1"><a class="header-anchor" href="#switch" aria-hidden="true">#</a> switch</h2>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span>
    <span class="token keyword">switch</span> x <span class="token operator">:=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token punctuation">{</span> <span class="token comment">// 支持局部变量初始化</span>
    <span class="token keyword">case</span> a<span class="token punctuation">:</span> <span class="token comment">// 支持非常量</span>
        <span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token keyword">case</span> b<span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
    <span class="token keyword">case</span> c<span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">:</span> <span class="token comment">// 支持多case合并</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"5 &lt;= x &lt;= 7"</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"8 &lt;= x"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>无需显式使用break</strong>，这是和Java中的switch最大的区别。</p>
<p>如果需要Java中的switch中<strong>贯通后续</strong>的效果，可以使用<code v-pre>fallthrough</code>关键字（后续就不再匹配条件表达式，注意执行下一个case），同时使用<code v-pre>break</code>拦截fallthrough。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span>
    <span class="token keyword">switch</span> x <span class="token operator">:=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token punctuation">{</span> <span class="token comment">// 支持局部变量初始化</span>
    <span class="token keyword">case</span> a<span class="token punctuation">:</span> <span class="token comment">// 支持非常量</span>
        <span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token keyword">case</span> b<span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
        <span class="token keyword">if</span> b <span class="token operator">></span> <span class="token number">1</span> <span class="token punctuation">{</span>
           <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">fallthrough</span>
    <span class="token keyword">case</span> c<span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">:</span> <span class="token comment">// 支持多case合并</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"5 &lt;= x &lt;= 7"</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"8 &lt;= x"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> for</h2>
<p>for循环的几种形式：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>  x <span class="token operator">:=</span> <span class="token number">10</span>
  <span class="token keyword">for</span> x <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
    x<span class="token operator">--</span>
  <span class="token punctuation">}</span>
    
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>

	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// endless loop</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">true</span> <span class="token punctuation">{</span>
		<span class="token comment">// endless loop</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for-range" tabindex="-1"><a class="header-anchor" href="#for-range" aria-hidden="true">#</a> for-range</h3>
<p>可以使用<code v-pre>for-range</code>完成可迭代对象的数据遍历，支持<strong>字符串、数组、数组指针、切片、字典、通道</strong>，返回索引，键值数据。</p>
<table>
<thead>
<tr>
<th>Data-type</th>
<th>1st value</th>
<th>2nd value</th>
</tr>
</thead>
<tbody>
<tr>
<td>string</td>
<td>index</td>
<td>s[index]</td>
</tr>
<tr>
<td>array</td>
<td>index</td>
<td>v[index]</td>
</tr>
<tr>
<td>map</td>
<td>key</td>
<td>value</td>
</tr>
<tr>
<td>channel</td>
<td>element</td>
<td></td>
</tr>
</tbody>
</table>
<p>这里只演示string和array 的遍历，后面的具体再介绍。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>	<span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">"abcdef"</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"s[%d] = %c i.e. %c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> str<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for-range类似于java中的for-each语句，但是由于语言底层本身的区别，二者还是有不同的。</p>
<p>比如，range数组和数组指针是有差别的。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	data <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> data <span class="token punctuation">{</span>
		<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"a"</span>
			data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"b"</span>
			data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"c"</span>
		<span class="token punctuation">}</span>
		<span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> s<span class="token punctuation">,</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 这里输出的s都是改变之前的data的复制品中的元素</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	data <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token operator">&amp;</span>data <span class="token punctuation">{</span>
		<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"a"</span>
			data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"b"</span>
			data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"c"</span>
		<span class="token punctuation">}</span>
		<span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> s<span class="token punctuation">,</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
0 1 1a
1 2 2b
2 3 3c

0 1 1a
1 2b 2b
2 3c 3c

*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>range会复制目标数据，比如range一个数组时其实遍历的是复制的那个数组。不过，字符串、切片是个很小的结构体，字典和通道本身是指针封装，它们的复制成本都很小，无需担心。</strong></p>
<p>返回部分元素。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>    data <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> data <span class="token punctuation">{</span>
        <span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
            data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"a"</span>
            data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"b"</span>
            data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">"c"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> data <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">for</span> <span class="token keyword">range</span> data <span class="token punctuation">{</span> <span class="token comment">// 仅迭代，不返回。可以用来执行清空channel</span>
        
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="continue、break" tabindex="-1"><a class="header-anchor" href="#continue、break" aria-hidden="true">#</a> continue、break</h2>
<p>continue 仅用于 for 循环。</p>
<p>break可以用于for、switch，还可以用于<code v-pre>select</code>语句（后面详细介绍）</p>
</div></template>


