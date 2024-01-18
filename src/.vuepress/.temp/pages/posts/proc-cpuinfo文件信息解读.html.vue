<template><div><p>在linux系统中，提供了/proc目录下文件，显示系统的软硬件信息。如果想了解系统中CPU的提供商和相关配置信息，则可以查/proc/cpuinfo。但是此文件输出项较多，不易理解。例如我们想获取，有多少颗物理CPU，每个物理cpu核心数，以及超线程是否开启等信息。</p>
<h1 id="明确物理cpu、核数、逻辑cpu数的概念" tabindex="-1"><a class="header-anchor" href="#明确物理cpu、核数、逻辑cpu数的概念" aria-hidden="true">#</a> 明确物理CPU、核数、逻辑cpu数的概念</h1>
<p>①物理CPU数（physical id）：主板上实际插入的cpu数量，可以数不重复的 physical id 有几个</p>
<p>②CPU核心数（cpu cores）：单块CPU上面能处理数据的芯片组的数量，如双核、四核等</p>
<p>③逻辑CPU数：一般情况下，</p>
<p>逻辑CPU=物理CPU个数×每颗核数   　#不支持超线程技术或没有开启此技术</p>
<p>逻辑CPU=物理CPU个数×每颗核数 *2 　 #表示服务器的CPU支持超线程技术（简单来说，它可使处理器中的1 颗内核如2 颗内核那样在操作系统中发挥作用。这样一来，操作系统可使用的执行资源扩大了一倍，大幅提高了系统的整体性能）</p>
<h1 id="输出条目解读" tabindex="-1"><a class="header-anchor" href="#输出条目解读" aria-hidden="true">#</a> 输出条目解读</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>processor       <span class="token builtin class-name">:</span> <span class="token number">0</span>
vendor_id       <span class="token builtin class-name">:</span> GenuineIntel
cpu family      <span class="token builtin class-name">:</span> <span class="token number">6</span>
model           <span class="token builtin class-name">:</span> <span class="token number">44</span>
model name      <span class="token builtin class-name">:</span> Intel<span class="token punctuation">(</span>R<span class="token punctuation">)</span> Xeon<span class="token punctuation">(</span>R<span class="token punctuation">)</span> CPU           E5620  @ <span class="token number">2</span>.40GHz
stepping        <span class="token builtin class-name">:</span> <span class="token number">2</span>
microcode       <span class="token builtin class-name">:</span> 0x1f
cpu MHz         <span class="token builtin class-name">:</span> <span class="token number">1729.000</span>
cache size      <span class="token builtin class-name">:</span> <span class="token number">12288</span> KB
physical <span class="token function">id</span>     <span class="token builtin class-name">:</span> <span class="token number">0</span>
siblings        <span class="token builtin class-name">:</span> <span class="token number">8</span>
core <span class="token function">id</span>         <span class="token builtin class-name">:</span> <span class="token number">0</span>
cpu cores       <span class="token builtin class-name">:</span> <span class="token number">4</span>
apicid          <span class="token builtin class-name">:</span> <span class="token number">0</span>
initial apicid  <span class="token builtin class-name">:</span> <span class="token number">0</span>
fpu             <span class="token builtin class-name">:</span> <span class="token function">yes</span>
fpu_exception   <span class="token builtin class-name">:</span> <span class="token function">yes</span>
cpuid level     <span class="token builtin class-name">:</span> <span class="token number">11</span>
wp              <span class="token builtin class-name">:</span> <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>processor　：系统中逻辑处理核心数的编号，从0开始排序。</li>
<li>vendor_id　：CPU制造商</li>
<li>cpu family　：CPU产品系列代号</li>
<li>model　　　：CPU属于其系列中的哪一代的代号</li>
<li>model name：CPU属于的名字及其编号、标称主频</li>
<li>stepping　 ：CPU属于制作更新版本</li>
<li>cpu MHz　 ：CPU的实际使用主频</li>
<li>cache size ：CPU二级缓存大小</li>
<li>physical id ：单个物理CPU的标号</li>
<li>siblings ：单个物理CPU的逻辑CPU数。siblings=cpu cores [*2]。</li>
<li>core id ：当前物理核在其所处CPU中的编号，这个编号不一定连续。</li>
<li>cpu cores ：该逻辑核所处CPU的物理核数。比如此处cpu cores 是4个，那么对应core id 可能是 1、3、4、5。</li>
<li>apicid ：用来区分不同逻辑核的编号，系统中每个逻辑核的此编号必然不同，此编号不一定连续</li>
<li>fpu ：是否具有浮点运算单元（Floating Point Unit）</li>
<li>fpu_exception ：是否支持浮点计算异常</li>
<li>cpuid level ：执行cpuid指令前，eax寄存器中的值，根据不同的值cpuid指令会返回不同的内容</li>
<li>wp ：表明当前CPU是否在内核态支持对用户空间的写保护（Write Protection）</li>
</ol>
<h1 id="快速查看信息" tabindex="-1"><a class="header-anchor" href="#快速查看信息" aria-hidden="true">#</a> 快速查看信息</h1>
<ol>
<li>查看物理CPU个数</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"physical id"</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>查看每个物理CPU中core的个数(即核数)</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"cpu cores"</span> <span class="token operator">|</span> <span class="token function">uniq</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>查看逻辑CPU的个数</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"processor"</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>查看CPU信息（型号）</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> name <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f2</span> -d: <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>查看是否开启超线程技术（只有intel的处理器支持）
如果启用此技术那么，每个物理核心又可分为两个逻辑处理器。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">"cpu cores"</span>  <span class="token parameter variable">-e</span> <span class="token string">"siblings"</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果cpu cores数量和siblings数量一致，则没有启用超线程，否则超线程被启用。</p>
<blockquote>
<p>关于超线程</p>
<p><a href="https://www.intel.cn/content/www/cn/zh/gaming/resources/hyper-threading.html" target="_blank" rel="noopener noreferrer">什么是超线程？—— 英特尔<ExternalLinkIcon/></a></p>
<p><a href="https://zhuanlan.zhihu.com/p/52112475" target="_blank" rel="noopener noreferrer">CPU工作方式、多核心、超线程技术详解<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


