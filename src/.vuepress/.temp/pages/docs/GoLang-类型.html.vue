<template><div><p>Go是<strong>静态类型</strong>语言。</p>
<h1 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h1>
<p>用<code v-pre>var</code>关键字声明变量</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> x <span class="token builtin">int</span>  <span class="token comment">// 默认值为0</span>
<span class="token keyword">var</span> f <span class="token builtin">bool</span> <span class="token comment">// 默认值为false</span>

<span class="token keyword">var</span> a<span class="token punctuation">,</span> b <span class="token builtin">int</span> <span class="token comment">// 相同类型的多个变量</span>


<span class="token keyword">var</span> x1 <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 这里的int可以省略</span>
<span class="token keyword">var</span> b <span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 这里的byte不可以省略</span>

<span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span>           <span class="token comment">// 省略类型，提供初始值，类型有编译器推断</span>
<span class="token keyword">var</span> j<span class="token punctuation">,</span> s <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token string">"s"</span> <span class="token comment">// 不同类型初始化值</span>

<span class="token comment">// 以组方式整理多行变量</span>
<span class="token keyword">var</span> <span class="token punctuation">(</span>
	i1<span class="token punctuation">,</span> i2 <span class="token builtin">int</span>
	x1<span class="token punctuation">,</span> s2 <span class="token operator">=</span> <span class="token number">12.1</span><span class="token punctuation">,</span> <span class="token string">""</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简短模式" tabindex="-1"><a class="header-anchor" href="#简短模式" aria-hidden="true">#</a> 简短模式</h2>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	x <span class="token operator">:=</span> <span class="token number">1</span>
	s <span class="token operator">:=</span> <span class="token string">"s"</span>

	i<span class="token punctuation">,</span> s1 <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">""</span> <span class="token comment">// 多个变量</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> s<span class="token punctuation">,</span> i<span class="token punctuation">,</span> s1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但这种简短模式</p>
<ol>
<li><strong>只能用在函数内部</strong>。</li>
<li>不能指定类型，只能通过初始化数据自动推导默认类型。</li>
</ol>
<p><strong>退化赋值</strong></p>
<p>指的是多个变量使用<strong>简短模式</strong>并不总是定义，可能是重新赋值，比如err的使用。</p>
<p>（至少一个是新定义）</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"os"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"/dev/random"</span><span class="token punctuation">)</span> <span class="token comment">// f, err 都是新定义</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span> <span class="token comment">// n 新定义，err退化赋值</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多变量赋值" tabindex="-1"><a class="header-anchor" href="#多变量赋值" aria-hidden="true">#</a> 多变量赋值</h2>
<p>先计算出所有右值，然后再依次完成赋值操作</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  x<span class="token punctuation">,</span> y <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>
  x<span class="token punctuation">,</span> y <span class="token operator">=</span> y <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">,</span> x <span class="token operator">+</span> <span class="token number">2</span>
  <span class="token function">println</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// 5 3</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h1>
<p>使用<code v-pre>const</code>关键字声明变量，取代<code v-pre>var</code>，并且必须提供初始值，没什么特别大的区别。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">const</span> i <span class="token operator">=</span> <span class="token number">0</span>           <span class="token comment">// 省略类型，提供初始值，类型有编译器推断</span>
<span class="token keyword">const</span> j<span class="token punctuation">,</span> s <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token string">"s"</span> <span class="token comment">// 不同类型初始化值</span>

<span class="token comment">// 以组方式整理多行变量</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
	x1<span class="token punctuation">,</span> s2 <span class="token operator">=</span> <span class="token number">12.1</span><span class="token punctuation">,</span> <span class="token string">""</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="各种类型" tabindex="-1"><a class="header-anchor" href="#各种类型" aria-hidden="true">#</a> 各种类型</h1>
<h2 id="基本类型" tabindex="-1"><a class="header-anchor" href="#基本类型" aria-hidden="true">#</a> 基本类型</h2>
<p>Go 内置了以下基本类型：</p>
<ul>
<li>布尔
<ul>
<li><em>bool</em></li>
</ul>
</li>
<li>字符串
<ul>
<li><em>string</em>（它的默认值是”“，而不是null）</li>
</ul>
</li>
<li>整数
<ul>
<li><em>int</em> <em>int8</em> <em>int16</em> <em>int32</em> <em>int64</em>（int是默认类型，依据目标平台，32位或者64位）</li>
<li><em>uint</em> <em>uint8</em> <em>uint16</em> <em>uint32</em> <em>uint64</em></li>
</ul>
</li>
<li>字节
<ul>
<li><em>byte</em> ，<em>uint8</em> 的别名</li>
</ul>
</li>
<li>Unicode
<ul>
<li><em>rune</em> ，<em>int32</em> 的别名</li>
</ul>
</li>
<li>浮点
<ul>
<li><em>float32</em> <em>float64</em>（float64默认浮点数类型）</li>
</ul>
</li>
<li>复数
<ul>
<li><em>complex64</em> <em>complex128</em></li>
</ul>
</li>
</ul>
<p>还有其他几种高级类型，如slice、map、channel等等，后面详细介绍。</p>
<ul>
<li>存储指针的uintptr</li>
</ul>
<p>uintptr is an integer type that is large enough to hold the bit pattern of any pointer.</p>
<h2 id="引用类型" tabindex="-1"><a class="header-anchor" href="#引用类型" aria-hidden="true">#</a> 引用类型</h2>
<p>这里引用类型特指slice、map、channel这种预定义类型。</p>
<p>它们必须使用<code v-pre>make</code>，而不是使用<code v-pre>new</code>，具体的后面再讲。</p>
<h2 id="自定义类型" tabindex="-1"><a class="header-anchor" href="#自定义类型" aria-hidden="true">#</a> 自定义类型</h2>
<p>使用<code v-pre>type</code>自定义自定义类型，包括基本类型创建，结构体，函数，接口等等。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> <span class="token punctuation">(</span>
	flags <span class="token builtin">byte</span>
	user <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		id <span class="token builtin">int</span>
		name <span class="token builtin">string</span>
	<span class="token punctuation">}</span>
	handle <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> x flags <span class="token operator">=</span> <span class="token number">1</span>
	<span class="token keyword">var</span> u user <span class="token operator">=</span> user<span class="token punctuation">{</span>
		id<span class="token punctuation">:</span>   <span class="token number">0</span><span class="token punctuation">,</span>
		name<span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> f handle <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="类型转换" tabindex="-1"><a class="header-anchor" href="#类型转换" aria-hidden="true">#</a> 类型转换</h1>
<p>如果制定了变量的类型，那么go不允许隐式的转换，哪怕是向下兼容的。（这一点和java有点区别）</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>	<span class="token keyword">var</span> x1 <span class="token builtin">int64</span> <span class="token operator">=</span> <span class="token number">11</span>
	<span class="token keyword">var</span> x2 <span class="token builtin">int32</span>
	<span class="token comment">//x1 = x2 // Cannot use 'x2' (type int32) as the type int64</span>
	x1 <span class="token operator">=</span> <span class="token function">int64</span><span class="token punctuation">(</span>x2<span class="token punctuation">)</span> <span class="token comment">// 必须强制转换</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意是 int(x)，而不是(int)x</p>
</div></template>


