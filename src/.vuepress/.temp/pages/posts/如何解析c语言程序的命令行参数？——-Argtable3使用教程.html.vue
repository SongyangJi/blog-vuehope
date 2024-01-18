<template><div><h1 id="如何构建符合-posix-实用程序约定的shell-cli" tabindex="-1"><a class="header-anchor" href="#如何构建符合-posix-实用程序约定的shell-cli" aria-hidden="true">#</a> 如何构建符合 POSIX 实用程序约定的Shell-CLI</h1>
<h2 id="what-is-argtable" tabindex="-1"><a class="header-anchor" href="#what-is-argtable" aria-hidden="true">#</a> What is Argtable</h2>
<p>Argtable是一款开源的ANSI C library，用来解析GNU样式的命令行选项。它通过定义可用于指定命令行语法的声明式API，从而简化了命令行的分析。
argtable将自动生成一致的错误处理逻辑和命令行语法的文本描述，这对于一个健壮的cli程序来说，是非常必要的，但是很繁琐。</p>
<h2 id="introduction-of-argtable3" tabindex="-1"><a class="header-anchor" href="#introduction-of-argtable3" aria-hidden="true">#</a> Introduction of Argtable3</h2>
<p>解析程序的命令行一直以来都是一个分散注意力的主要编程任务。Argtable3 库通过允许程序员<strong>将源代码中的命令行选项直接定义为静态的结构数组</strong>来简化作业， 然后**
将该数组传递给argtable3库函数，这些函数就会相应地解析命令行。从命令行中提取的值直接保存到用户定义的程序变量中**，主程序就可以访问这些变量。
argtable3还可以从同一数组中生成命令行语法的描述，以便显示为联机帮助。根据第三条BSD许可条款，此库是免费的。 注意：<strong>argtable3不向后兼容</strong>。</p>
<h2 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start" aria-hidden="true">#</a> Quick Start</h2>
<h3 id="demo-code" tabindex="-1"><a class="header-anchor" href="#demo-code" aria-hidden="true">#</a> demo code</h3>
<ul>
<li>入门小例子</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// 引入 argtable3</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"argtable3.h"</span></span>

<span class="token comment">/* global arg_xxx structs */</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_lit</span> <span class="token operator">*</span>help<span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_end</span> <span class="token operator">*</span>end<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* the global arg_xxx structs are initialised within the argtable */</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>argtable<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            help <span class="token operator">=</span> <span class="token function">arg_litn</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">"help"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"display this help and exit"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            end <span class="token operator">=</span> <span class="token function">arg_end</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> exitcode <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> program<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"argtable"</span><span class="token punctuation">;</span>
    <span class="token function">arg_parse</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">,</span> argtable<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* special case: '--help' takes precedence over error reporting */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>help<span class="token operator">-></span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Usage: %s"</span><span class="token punctuation">,</span> program<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">arg_print_syntax</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">,</span> argtable<span class="token punctuation">,</span> <span class="token string">"\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Demonstrate command-line parsing in argtable3.\n\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">arg_print_glossary</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">,</span> argtable<span class="token punctuation">,</span> <span class="token string">"  %-25s %s\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        exitcode <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">/* deallocate each non-null entry in argtable[] */</span>
        <span class="token function">arg_freetable</span><span class="token punctuation">(</span>argtable<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>argtable<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>argtable<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> exitcode<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>运行</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>./argtable <span class="token parameter variable">--help</span>

<span class="token comment"># 输出</span>
<span class="token comment"># Usage: argtable [--help]</span>
<span class="token comment"># Demonstrate command-line parsing in argtable3.</span>
<span class="token comment">#</span>
<span class="token comment">#  --help                    display this help and exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="how-it-works" tabindex="-1"><a class="header-anchor" href="#how-it-works" aria-hidden="true">#</a> how it works</h3>
<p>Argtable3 提供了一组<strong>arg_xxx结构</strong>，一个用于它支持的每种类型的参数（<strong>文字、整数、双精度、字符串、文件名</strong>等），
并且每个结构都能够在命令行上处理该参数的多次出现。此外，<strong>可以为每个选项提供可互换使用的替代短选项 (-x)或长选项 (--xx) 形式</strong>。
事实上，每个选项甚至可以选择多个替代的短选项或长选项，或两者兼而有之。</p>
<p>要定义命令行选项，您必须为arg_xxx所需的每种类型的参数（<strong>文字、整数、双精度、字符串、文件名</strong>等）创建一个结构体，并将它们整理到我们称为参数表（<strong>argument table</strong>）的数组中。
参数表中结构的顺序定义了命令行选项的预期顺序，不过<strong>解析顺序实际上只对未标记的选项重要</strong>（和python的函数传参规则类似）。
<strong>参数表本身只是一个void指针数组</strong>（<code v-pre>void* arg_table[]</code>），
按照惯例，每个arg_xxx结构都有一个已知的<strong>arg_hdr结构体</strong>作为其第一个条目，Argtable3 函数使用它来标识结构体。</p>
<h4 id="arg-hdr" tabindex="-1"><a class="header-anchor" href="#arg-hdr" aria-hidden="true">#</a> arg_hdr</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> flag<span class="token punctuation">;</span>             <span class="token comment">/* Modifier flags: ARG_TERMINATOR, ARG_HASVALUE. */</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> shortopts<span class="token punctuation">;</span> <span class="token comment">/* String defining the short options */</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> longopts<span class="token punctuation">;</span>  <span class="token comment">/* String defiing the long options */</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> datatype<span class="token punctuation">;</span>  <span class="token comment">/* Description of the argument data type */</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> glossary<span class="token punctuation">;</span>  <span class="token comment">/* Description of the option as shown by arg_print_glossary function */</span>
    <span class="token keyword">int</span> mincount<span class="token punctuation">;</span>          <span class="token comment">/* Minimum number of occurences of this option accepted */</span>
    <span class="token keyword">int</span> maxcount<span class="token punctuation">;</span>          <span class="token comment">/* Maximum number of occurences if this option accepted */</span>
    <span class="token keyword">void</span><span class="token operator">*</span> parent<span class="token punctuation">;</span>          <span class="token comment">/* Pointer to parent arg_xxx struct */</span>
    arg_resetfn<span class="token operator">*</span> resetfn<span class="token punctuation">;</span>  <span class="token comment">/* Pointer to parent arg_xxx reset function */</span>
    arg_scanfn<span class="token operator">*</span> scanfn<span class="token punctuation">;</span>    <span class="token comment">/* Pointer to parent arg_xxx scan function */</span>
    arg_checkfn<span class="token operator">*</span> checkfn<span class="token punctuation">;</span>  <span class="token comment">/* Pointer to parent arg_xxx check function */</span>
    arg_errorfn<span class="token operator">*</span> errorfn<span class="token punctuation">;</span>  <span class="token comment">/* Pointer to parent arg_xxx error function */</span>
    <span class="token keyword">void</span><span class="token operator">*</span> priv<span class="token punctuation">;</span>            <span class="token comment">/* Pointer to private header data for use by arg_xxx functions */</span>
<span class="token punctuation">}</span> <span class="token class-name">arg_hdr_t</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最基本的一个类型，所有的其他类型都包含这个类型。一一解释下里面的参数的含义:</p>
<ul>
<li>shortopts: 参数的短名称，比如ls -a 中的a就是短名称;</li>
<li>longopts: 参数中的长名称，比如ls —all 中的all就是长名称;</li>
<li>datatype: 参数的数据类型有, , NULL, ,(时间类型传入format字符串),(rex类型传入匹配串),等;</li>
<li>glossary: 对于参数的描述;</li>
<li>mincount: 参数最少的个数(可以规定是否必须有参数比如设置为0为非必须，1…n为必须);</li>
<li>maxcount: 参数最多的个数，采用Unix风格的，如kernel.exe -l 1 -l 2 -l 3</li>
<li>其他参数非必须。</li>
</ul>
<h4 id="arg-xxx结构体族" tabindex="-1"><a class="header-anchor" href="#arg-xxx结构体族" aria-hidden="true">#</a> arg_xxx结构体族</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// 整数</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_int</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">int</span> <span class="token operator">*</span>ival<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 文字</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_lit</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 双精度浮点数</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_dbl</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">double</span> <span class="token operator">*</span>dval<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 字符串</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_str</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>sval<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">arg_rex</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>sval<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">arg_file</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>filename<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>basename<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>extension<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">arg_date</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>format<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">tm</span> <span class="token operator">*</span>tm_val<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="详细介绍-arg-int" tabindex="-1"><a class="header-anchor" href="#详细介绍-arg-int" aria-hidden="true">#</a> 详细介绍 arg_int</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">arg_int</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">arg_hdr</span> hdr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> count<span class="token punctuation">;</span>
    <span class="token keyword">int</span> <span class="token operator">*</span>ival<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构体的第一个数据成员hdr保存了 Argtable3 库函数使用的私有数据。它包含参数的标签字符串等内容（<strong>可以理解为元数据</strong>）。
直接公开地访问这些数据是可以的，但很少需要这样做。
它的ival成员变量指向持有从命令行提取出的数组，count为数组的长度。ival 数组的存储在arg_int构造时分配。
<strong>这必须通过arg_int构造函数完成。</strong>
注意，<strong>你永远不应该自己手动实例化任何arg_xxx结构，而是始终使用提供的构造函数来分配结构，并在完成后使用 arg_freetable 释放它。</strong></p>
<ul>
<li>举例</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">arg_int</span> <span class="token operator">*</span>s<span class="token punctuation">;</span>
s <span class="token operator">=</span> <span class="token function">arg_intn</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">"scalar"</span><span class="token punctuation">,</span> <span class="token string">"&lt;n>"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">"foo value"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>完成s后将指向一个包含5 个元素数组的内存块的结构体arg_int。
甚至，你还可以设置多个别名，短选项被赋予一串单个字符，而长选项被赋予一个逗号分隔的字符串。
例如：<code v-pre>s = arg_intn(&quot;kKx&quot;, &quot;scalar,foo&quot;, &quot;&lt;n&gt;&quot;, 3, 5, &quot;foo value&quot;);</code></p>
<p><img src="@source/posts/example.png" alt="example.png" loading="lazy">
如图所示，该<code v-pre>s-&gt;hdr</code>结构保留对构造函数的字符串参数的引用等。
该<code v-pre>s-&gt;count</code>变量初始化为零，因为它表示<code v-pre>s-&gt;ival</code>解析命令行后存储在数组中的有效值的数量。
<code v-pre>s-&gt;ival</code>数组的大小由<code v-pre>s-&gt;hdr.maxcount</code>给出。</p>
<ul>
<li>实例代码</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// 引入 argtable3</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"argtable3.h"</span></span>

<span class="token comment">/* global arg_xxx structs */</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_int</span> <span class="token operator">*</span>int_arrays<span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_end</span> <span class="token operator">*</span>end<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* the global arg_xxx structs are initialised within the argtable */</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>argtable<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            int_arrays <span class="token operator">=</span> <span class="token function">arg_intn</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"array"</span><span class="token punctuation">,</span> <span class="token string">"&lt;number>"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">"please input an integer"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            end <span class="token operator">=</span> <span class="token function">arg_end</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> exitcode <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> nerrors <span class="token operator">=</span> <span class="token function">arg_parse</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">,</span> argtable<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nerrors <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        exitcode <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> <span class="token operator">*</span>a <span class="token operator">=</span> int_arrays<span class="token operator">-></span>ival<span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> int_arrays<span class="token operator">-></span>count<span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"input numbers are as following:\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%d  "</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> exitcode<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 运行</span>
./argtable <span class="token parameter variable">-a</span> <span class="token number">1</span> <span class="token parameter variable">-a</span> <span class="token number">2</span> <span class="token parameter variable">--array</span> <span class="token number">3</span>
<span class="token comment"># 输出</span>
<span class="token comment"># input numbers are as following:</span>
<span class="token comment"># 1  2  3  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他的参数结构体使用方法大同小异。</p>
<h4 id="the-argument-table-参数表" tabindex="-1"><a class="header-anchor" href="#the-argument-table-参数表" aria-hidden="true">#</a> The Argument Table (参数表)</h4>
<p>在构建完各种类型参数的结构体之后，我们需要统一将它们组装到一个结构体数组里面，类型为<code v-pre>void **</code>。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">arg_lit</span> <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token function">arg_litn</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"the -a option"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_lit</span> <span class="token operator">*</span>b <span class="token operator">=</span> <span class="token function">arg_litn</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"the -b option"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_lit</span> <span class="token operator">*</span>c <span class="token operator">=</span> <span class="token function">arg_litn</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"the -c option"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_int</span> <span class="token operator">*</span>scal <span class="token operator">=</span> <span class="token function">arg_intn</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">"scalar"</span><span class="token punctuation">,</span> <span class="token string">"&lt;n>"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"foo value"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_lit</span> <span class="token operator">*</span>verb <span class="token operator">=</span> <span class="token function">arg_litn</span><span class="token punctuation">(</span><span class="token string">"v"</span><span class="token punctuation">,</span> <span class="token string">"verbose"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"verbose output"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_file</span> <span class="token operator">*</span>o <span class="token operator">=</span> <span class="token function">arg_filen</span><span class="token punctuation">(</span><span class="token string">"o"</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span><span class="token string">"myfile"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"output file"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_file</span> <span class="token operator">*</span>file <span class="token operator">=</span> <span class="token function">arg_filen</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">"&lt;file>"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"input files"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">arg_end</span> <span class="token operator">*</span>end <span class="token operator">=</span> <span class="token function">arg_end</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 这就是我们的参数列表</span>
<span class="token keyword">void</span> <span class="token operator">*</span>argtable<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> scal<span class="token punctuation">,</span> verb<span class="token punctuation">,</span> o<span class="token punctuation">,</span> file<span class="token punctuation">,</span> end<span class="token punctuation">}</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code v-pre>arg_end</code> 结构体是一个特殊的结构体，因为它不代表任何命令行选项。
它主要标记 argtable 数组的结尾，同时它也存储在处理命令行参数时遇到的任何解析器错误。
传递给arg_end构造函数的整数参数是它将存储的最大错误数，任何更多的错误都将被丢弃并替换为单个错误消息“错误太多”。
<strong><code v-pre>arg_end</code>必须要有。</strong></p>
<p>你还可以使用<code v-pre>arg_nullcheck</code>检查参数表中是否有空指针，（感觉这个功能很鸡肋）</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">arg_nullcheck</span><span class="token punctuation">(</span>argtable<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"error: insufficient memory\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="解析命令行" tabindex="-1"><a class="header-anchor" href="#解析命令行" aria-hidden="true">#</a> 解析命令行</h4>
<p>我们使用<code v-pre>arg_parse</code>函数来做到这一点，它返回它遇到的解析错误的数量。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> nerrors <span class="token operator">=</span> <span class="token function">arg_parse</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">,</span> argtable<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有错误的话（<code v-pre>nerrors == 0</code>），那么我们已经成功解析了命令行,你想要在命令行中提取的数据也都存在了参数表这个<code v-pre>void**</code>里面，正常地访问它即可。</p>
<h4 id="设置默认值" tabindex="-1"><a class="header-anchor" href="#设置默认值" aria-hidden="true">#</a> 设置默认值</h4>
<p>对此的解决方法很简单，直接在调用<code v-pre>arg_parse</code>之前设置<code v-pre>arg_table</code>的值，在命令行中有用户输入的值才会被覆盖。
其余的，就是你一开始设置的默认值。</p>
<h4 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h4>
<p>如果 arg_parse 函数报告错误，那么我们需要显示它们，因为 arg_parse 本身不会这样做。
使用<code v-pre>arg_print_errors</code>即可，arg_end的内部结构无需关心。
函数定义</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">arg_print_errors</span><span class="token punctuation">(</span>FILE<span class="token operator">*</span> fp<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">arg_end</span><span class="token operator">*</span> end<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> progname<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用实例如：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">If</span> <span class="token punctuation">(</span>nerrors <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token function">arg_print_errors</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">,</span> end<span class="token punctuation">,</span> <span class="token string">"myprog"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// stdout 文件描述符</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>arg_parse函数不打印错误消息是因为它可以被多次调用以使用替代参数表解析命令行，而不会过早显示无关的错误消息。
因此，我们可以为那些具有互斥命令行选项集的程序定义单独的参数表，依次尝试每个参数表，直到找到一个成功的候选者。
如果所有参数表都不能满足，那么我们可以选择打印所有参数表的错误消息，或者可能只显示与最匹配的错误信息。无论如何，我们可以控制显示哪些消息。</p>
<h4 id="显示选项语法及帮助" tabindex="-1"><a class="header-anchor" href="#显示选项语法及帮助" aria-hidden="true">#</a> 显示选项语法及帮助</h4>
<p>如果您希望您的程序显示在线帮助，您可以使用<code v-pre>arg_print_syntax</code>函数来显示从参数表派生的命令行语法。
该函数实际上有两种形式：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">arg_print_syntax</span><span class="token punctuation">(</span>FILE <span class="token operator">*</span>fp<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>argtable<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>suffix<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">arg_print_syntaxv</span><span class="token punctuation">(</span>FILE <span class="token operator">*</span>fp<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>argtable<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>suffix<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以使用<code v-pre>void arg_print_glossary(FILE *fp, void **argtable, const char *format);</code>来输出提示。</p>
<p>在文章的开始的示例中已经展示过这两个函数的使用方法了，这里不再赘述。</p>
<h4 id="打扫干净" tabindex="-1"><a class="header-anchor" href="#打扫干净" aria-hidden="true">#</a> 打扫干净</h4>
<p>在我们的程序结束时，我们需要释放分配给每个arg_xxx结构的内存。我们可以通过分别调用<code v-pre>arg_freetable</code>来做到这一点，
但有函数可以更方便地为我们做到这一点。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">arg_freetable</span><span class="token punctuation">(</span>argtable<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>argtable<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>argtable<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它将遍历一个参数表并代表我们调用它的每个元素。
请注意，第二个参数<code v-pre>sizeof(argtable)/sizeof(argtable[0])</code>仅表示 argtable 数组中的元素数。（使用了内存对齐？）
完成此功能后，所有 argtable 数组条目都将设置为NULL。</p>
<h3 id="完整的使用argtable3的流程图" tabindex="-1"><a class="header-anchor" href="#完整的使用argtable3的流程图" aria-hidden="true">#</a> 完整的使用Argtable3的流程图</h3>
<figure><img src="@source/posts/flowchart.png" alt="流程图" tabindex="0" loading="lazy"><figcaption>流程图</figcaption></figure>
<h2 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接" aria-hidden="true">#</a> 相关链接</h2>
<p><a href="https://www.argtable.org/tutorial/" target="_blank" rel="noopener noreferrer">Argtable3教程介绍<ExternalLinkIcon/></a>
<a href="https://github.com/argtable/argtable3/releases/" target="_blank" rel="noopener noreferrer">github地址<ExternalLinkIcon/></a></p>
</div></template>


