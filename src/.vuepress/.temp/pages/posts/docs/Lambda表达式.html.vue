<template><div><h1 id="c-中lambda表达式" tabindex="-1"><a class="header-anchor" href="#c-中lambda表达式" aria-hidden="true">#</a> C++中lambda表达式</h1>
<p>Lambda表达式包含一个函数对象参数</p>
<p>标识一个 Lambda 表达式的开始，这部分必须存在，不能省略。函数对象参数是传递给编译器自动生成的函数对象类的构造函数的。函数对象参数只能使用那些到定义 Lambda 为止时 Lambda 所在作用范围内可见的局部变量(包括 Lambda 所在类
的 this)。函数对象参数有以下形式：</p>
<ul>
<li>空。没有任何函数对象参数。</li>
<li>=。函数体内可以使用 Lambda 所在范围内所有可见的局部变量（包括 Lambda 所在类的 this），并且是值传递方式（相当于编译器自动为我们按值传递了所有局部变量）。</li>
<li>&amp;。函数体内可以使用 Lambda 所在范围内所有可见的局部变量（包括 Lambda 所在类的 this），并且是引用传递方式（相当于是编译器自动为我们按引用传递了所有局部变量）。</li>
<li>this。函数体内可以使用 Lambda 所在类中的成员变量。</li>
</ul>
<p>具体的使用方法示例：</p>
<ul>
<li><code v-pre>a</code>。将 a 按值进行传递。按值进行传递时，函数体内不能修改传递进来的 a 的拷贝，因为默认情况下函数是 const 的，要
修改传递进来的拷贝，可以添加 mutable 修饰符。</li>
<li><code v-pre>&amp;a</code>。将 a 按引用进行传递。</li>
<li><code v-pre>a，&amp;b</code>。将 a 按值传递，b 按引用进行传递。</li>
<li><code v-pre>[=]，&amp;a，&amp;b</code>。除 a 和 b 按引用进行传递外，其他参数都按值进行传递。</li>
<li><code v-pre>[&amp;]，a，b</code>。除 a 和 b 按值进行传递外，其他参数都按引用进行传递</li>
</ul>
<p>sort使用lambda表达式：</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    vector<span class="token operator">&lt;</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">>></span> <span class="token function">allCellsDistOrder</span><span class="token punctuation">(</span><span class="token keyword">int</span> R<span class="token punctuation">,</span> <span class="token keyword">int</span> C<span class="token punctuation">,</span> <span class="token keyword">int</span> r0<span class="token punctuation">,</span> <span class="token keyword">int</span> c0<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        vector<span class="token operator">&lt;</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">>></span> ret<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> R<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> C<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ret<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span><span class="token punctuation">{</span>i<span class="token punctuation">,</span> j<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">sort</span><span class="token punctuation">(</span>ret<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ret<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">=</span><span class="token punctuation">]</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span><span class="token operator">&amp;</span> a<span class="token punctuation">,</span> vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span><span class="token operator">&amp;</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//因为r0,c0是当前函数的局部变量，所以只能使用值传递而不能使用引用传递造成指针混乱</span>
            <span class="token keyword">return</span> <span class="token function">abs</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span> r0<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">abs</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> c0<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">abs</span><span class="token punctuation">(</span>b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span> r0<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">abs</span><span class="token punctuation">(</span>b<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> c0<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


