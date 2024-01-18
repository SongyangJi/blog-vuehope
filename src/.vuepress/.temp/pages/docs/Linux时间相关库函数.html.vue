<template><div><h2 id="时间相关" tabindex="-1"><a class="header-anchor" href="#时间相关" aria-hidden="true">#</a> 时间相关</h2>
<h3 id="time" tabindex="-1"><a class="header-anchor" href="#time" aria-hidden="true">#</a> time</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;time.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>函数说明:
C 库函数: 返回自纪元 Epoch（1970-01-01 00:00:00 UTC）起经过的时间，以秒为单位。
如果 seconds 不为空，则返回值也存储在变量 seconds 中。</li>
<li>函数定义</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token class-name">time_t</span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token class-name">time_t</span> <span class="token operator">*</span>seconds<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
以 time_t 对象返回当前日历时间。</li>
</ul>
<h3 id="localtime" tabindex="-1"><a class="header-anchor" href="#localtime" aria-hidden="true">#</a> localtime</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;time.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数  使用 timer 的值来填充 tm 结构。
timer 的值被分解为 tm 结构，并用本地时区表示。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">tm</span> <span class="token operator">*</span><span class="token function">localtime</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token class-name">time_t</span> <span class="token operator">*</span>timer<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
该函数返回指向 tm 结构的指针，该结构带有被填充的时间信息。下面是 tm 结构的细节:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">tm</span> <span class="token punctuation">{</span>
<span class="token keyword">int</span> tm_sec<span class="token punctuation">;</span>         <span class="token comment">/* 秒，范围从 0 到 59                */</span>
<span class="token keyword">int</span> tm_min<span class="token punctuation">;</span>         <span class="token comment">/* 分，范围从 0 到 59                */</span>
<span class="token keyword">int</span> tm_hour<span class="token punctuation">;</span>        <span class="token comment">/* 小时，范围从 0 到 23                */</span>
<span class="token keyword">int</span> tm_mday<span class="token punctuation">;</span>        <span class="token comment">/* 一月中的第几天，范围从 1 到 31                    */</span>
<span class="token keyword">int</span> tm_mon<span class="token punctuation">;</span>         <span class="token comment">/* 月份，范围从 0 到 11                */</span>
<span class="token keyword">int</span> tm_year<span class="token punctuation">;</span>        <span class="token comment">/* 自 1900 起的年数                */</span>
<span class="token keyword">int</span> tm_wday<span class="token punctuation">;</span>        <span class="token comment">/* 一周中的第几天，范围从 0 到 6                */</span>
<span class="token keyword">int</span> tm_yday<span class="token punctuation">;</span>        <span class="token comment">/* 一年中的第几天，范围从 0 到 365                    */</span>
<span class="token keyword">int</span> tm_isdst<span class="token punctuation">;</span>       <span class="token comment">/* 夏令时                        */</span>    
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="strftime" tabindex="-1"><a class="header-anchor" href="#strftime" aria-hidden="true">#</a> strftime</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;time.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数,根据 format 中定义的格式化规则，格式化结构 timeptr 表示的时间，并把它存储在 str 中。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token class-name">size_t</span> <span class="token function">strftime</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span>str<span class="token punctuation">,</span> <span class="token class-name">size_t</span> maxsize<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>format<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">tm</span> <span class="token operator">*</span>timeptr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>str -- 这是指向目标数组的指针，用来复制产生的 C 字符串。</li>
<li>maxsize -- 这是被复制到 str 的最大字符数。</li>
<li>format -- 这是 C 字符串，包含了普通字符和特殊格式说明符的任何组合。这些格式说明符由函数替换为表示 tm 中所指定时间的相对应值。
具体格式详见：
<a href="https://www.runoob.com/cprogramming/c-function-strftime.html" target="_blank" rel="noopener noreferrer">参考链接<ExternalLinkIcon/></a></li>
</ul>
<ul>
<li>返回值
如果产生的 C 字符串小于 size 个字符（包括空结束字符），则会返回复制到 str 中的字符总数（不包括空结束字符），否则返回零。</li>
</ul>
<h3 id="gettimeofday" tabindex="-1"><a class="header-anchor" href="#gettimeofday" aria-hidden="true">#</a> gettimeofday</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/time.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>函数说明:
返回当前距离1970年的秒数和微妙数，后面的tz是时区，一般不用（传 NULL 即可）。</li>
<li>函数定义</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">gettimeofday</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">timeval</span> <span class="token operator">*</span>tv<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">timezone</span> <span class="token operator">*</span>tz<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="clock-gettime" tabindex="-1"><a class="header-anchor" href="#clock-gettime" aria-hidden="true">#</a> clock_gettime</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;time.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
根据时钟模式，获取多种时间。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">clock_gettime</span><span class="token punctuation">(</span><span class="token class-name">clockid_t</span> clock_id<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">timespec</span> <span class="token operator">*</span> tp <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>CLOCK_REALTIME       0
Systemwide realtime clock. 系统实时时间,随系统实时时间改变而改变。
即从UTC1970-1-1 0:0:0开始计时,中间时刻如果系统时间被用户该成其他,则对应的时间相应改变</p>
</li>
<li>
<p>CLOCK_MONOTONIC     1
Represents monotonic time. Cannot be set. 从系统启动这一刻起开始计时,不受系统时间被用户改变的影响
用的是相对时间，它的时间是通过jiffies值来计算的。该时钟不受系统时钟源的影响，只受jiffies值的影响。
也就是说它获得的时间戳是单调的。</p>
</li>
<li>
<p>CLOCK_PROCESS_CPUTIME_ID    2
High resolution per-process timer. 本进程到当前代码系统CPU花费的时间</p>
</li>
<li>
<p>CLOCK_THREAD_CPUTIME_ID      3
Thread-specific timer. 本线程到当前代码系统CPU花费的时间</p>
</li>
<li>
<p>CLOCK_REALTIME_HR                4
High resolution version of CLOCK_REALTIME. 0
CLOCK_REALTIME 的 高精度版本</p>
</li>
<li>
<p>CLOCK_MONOTONIC_HR            5
High resolution version of CLOCK_MONOTONIC.
CLOCK_MONOTONIC 的高精度版本</p>
</li>
<li>
<p>返回值
时间结构<code v-pre>struct timespec</code></p>
</li>
<li>
<p>示例代码</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/time.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">timeval</span> tv<span class="token punctuation">;</span>
    <span class="token function">gettimeofday</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tv<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"gettimeofday : %ld, %d\n"</span><span class="token punctuation">,</span> tv<span class="token punctuation">.</span>tv_sec<span class="token punctuation">,</span>tv<span class="token punctuation">.</span>tv_usec<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">struct</span> <span class="token class-name">timespec</span> ts<span class="token punctuation">;</span>
    <span class="token function">clock_gettime</span><span class="token punctuation">(</span>CLOCK_REALTIME<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ts<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"CLOCK_REALTIME: %ld, %ld\n"</span><span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_sec<span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_nsec<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//打印出来的时间跟 cat /proc/uptime 第一个参数一样</span>
    <span class="token function">clock_gettime</span><span class="token punctuation">(</span>CLOCK_MONOTONIC<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ts<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"CLOCK_MONOTONIC: %ld, %ld\n"</span><span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_sec<span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_nsec<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">clock_gettime</span><span class="token punctuation">(</span>CLOCK_PROCESS_CPUTIME_ID<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ts<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"CLOCK_PROCESS_CPUTIME_ID: %ld, %ld\n"</span><span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_sec<span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_nsec<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">clock_gettime</span><span class="token punctuation">(</span>CLOCK_THREAD_CPUTIME_ID<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ts<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"CLOCK_THREAD_CPUTIME_ID: %ld, %ld\n"</span><span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_sec<span class="token punctuation">,</span> ts<span class="token punctuation">.</span>tv_nsec<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"\n%ld\n"</span><span class="token punctuation">,</span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，本项目使用的计时工具不能使用 time 以及 gettimeofday，否则有小概率发生&quot;时间回溯现象&quot;，
具体可以参考 <a href="https://song-yang-ji.blog.csdn.net/article/details/115837363" target="_blank" rel="noopener noreferrer">Linux的timedatectl —— 关闭或开启时间同步<ExternalLinkIcon/></a>.
必须使用 <code v-pre>clock_gettime(CLOCK_MONOTONIC, *timespec);</code> 才可以先后两次拿到的时间戳是递增的。</p>
</div></template>


