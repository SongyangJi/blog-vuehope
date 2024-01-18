<template><div><h2 id="读写文件相关" tabindex="-1"><a class="header-anchor" href="#读写文件相关" aria-hidden="true">#</a> 读写文件相关</h2>
<h3 id="write" tabindex="-1"><a class="header-anchor" href="#write" aria-hidden="true">#</a> write</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
write系统调用，是把缓存区buf中的前nbytes字节写入到与文件描述符有关的文件中。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//参数分别为 文件描述符、缓冲区、</span>
<span class="token class-name">size_t</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">int</span> flides<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">size_t</span> nbytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>返回值
write系统调用返回的是实际写入到文件中的字节数。</li>
</ul>
<h3 id="read" tabindex="-1"><a class="header-anchor" href="#read" aria-hidden="true">#</a> read</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
read系统调用，是从与文件描述符flides相关联的文件中读取前nbytes字节的内容，并且写入到数据区buf中。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token class-name">size_t</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">int</span> flides<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">size_t</span> nbytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
read系统调用返回的是实际读入的字节数。</li>
</ul>
<h3 id="open" tabindex="-1"><a class="header-anchor" href="#open" aria-hidden="true">#</a> open</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/stat.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token operator">*</span>path<span class="token punctuation">,</span> <span class="token keyword">int</span> oflags<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1</span>
<span class="token keyword">int</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token operator">*</span>path<span class="token punctuation">,</span> <span class="token keyword">int</span> oflags<span class="token punctuation">,</span> <span class="token class-name">mode_t</span> mode<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明：
其中，oflags是由必需文件访问模式和可选模式一起构成的(通过按位或“|”)：
必需部分：</p>
<ul>
<li>O_RDONLY———-以只读方式打开</li>
<li>O_WRONLY———以只写方式打开</li>
<li>O_RDWR————以读写方式打开
可选部分：</li>
<li>O_CREAT————按照参数mode给出的访问模式创建文件</li>
<li>O_EXCL————–与O_CREAT一起使用，确保创建出文件，避免两个程序同时创建同一个文件，如文件存在则open调用失败</li>
<li>O_APPEND———-把写入数据追加在文件的末尾</li>
<li>O_TRUNC———–把文件长度设置为0，丢弃原有内容</li>
</ul>
<p>在第一种调用方式上，加上了第三个参数mode，<strong>主要是搭配O_CREAT使用</strong>，同样地，这个参数规定了属主、同组和其他人对文件的文件操作权限。</p>
<ul>
<li>文件属主
<ul>
<li>S_IRUSR———-读权限</li>
<li>S_IWUSR———写权限</li>
<li>S_IXUSR———-执行权限</li>
</ul>
</li>
<li>文件所属组
<ul>
<li>S_IRGRP———-读权限</li>
<li>S_IWGRP———写权限</li>
<li>S_IXGRP———-执行权限</li>
</ul>
</li>
<li>其他人
<ul>
<li>S_IROTH———-读权限</li>
<li>S_IWOTH———写权限</li>
<li>S_IXOTH———-执行权限</li>
</ul>
</li>
</ul>
<p>另外，也可以用数字设定法：
0 : 无权限；
1 : 只执行；
2 : 只写；
4 : 只读。</p>
<p>这种权限设计实际上就是linux文件权限的设计。</p>
<ul>
<li>返回值
open系统调用成功返回一个新的文件描述符，失败返回-1。</li>
</ul>
<h3 id="close" tabindex="-1"><a class="header-anchor" href="#close" aria-hidden="true">#</a> close</h3>
<ul>
<li>函数定义</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
<span class="token keyword">int</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token keyword">int</span> flides<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数说明:
终止文件描述符flides与其对应的文件间的联系，文件描述符被释放，可重新使用。
使用完文件描述符之后，要记得释放！</li>
</ul>
<h3 id="fopen" tabindex="-1"><a class="header-anchor" href="#fopen" aria-hidden="true">#</a> fopen</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数,使用给定的模式 mode 打开 filename 所指向的文件。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>FILE <span class="token operator">*</span><span class="token function">fopen</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>filename<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>mode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th>&quot;r&quot;</th>
<th>打开一个用于读取的文件。该文件必须存在。</th>
</tr>
</thead>
<tbody>
<tr>
<td>&quot;w&quot;</td>
<td>创建一个用于写入的空文件。如果文件名称与已存在的文件相同，则会删除已有文件的内容，文件被视为一个新的空文件。</td>
</tr>
<tr>
<td>&quot;a&quot;</td>
<td>追加到一个文件。写操作向文件末尾追加数据。如果文件不存在，则创建文件。</td>
</tr>
<tr>
<td>&quot;r+&quot;</td>
<td>打开一个用于更新的文件，可读取也可写入。该文件必须存在。</td>
</tr>
<tr>
<td>&quot;w+&quot;</td>
<td>创建一个用于读写的空文件。</td>
</tr>
<tr>
<td>&quot;a+&quot;</td>
<td>打开一个用于读取和追加的文件。</td>
</tr>
</tbody>
</table>
<ul>
<li>返回值
该函数返回一个 FILE 指针。否则返回 NULL，且设置全局变量 errno 来标识错误。</li>
</ul>
<h3 id="fclose" tabindex="-1"><a class="header-anchor" href="#fclose" aria-hidden="true">#</a> fclose</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数 int fclose(FILE *stream) 关闭流 stream, 并且刷新所有的缓冲区。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// stream -- 这是指向 FILE 对象的指针，该 FILE 对象指定了要被关闭的流。</span>
<span class="token keyword">int</span> <span class="token function">fclose</span><span class="token punctuation">(</span>FILE <span class="token operator">*</span>stream<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>返回值
如果流成功关闭，则该方法返回零。如果失败，则返回 EOF。</li>
</ul>
<h3 id="fprintf" tabindex="-1"><a class="header-anchor" href="#fprintf" aria-hidden="true">#</a> fprintf</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数, 发送格式化输出到流 stream 中。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">fprintf</span><span class="token punctuation">(</span>FILE <span class="token operator">*</span>stream<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>format<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
如果成功，则返回写入的字符总数，否则返回一个负数。</li>
</ul>
<h3 id="flock" tabindex="-1"><a class="header-anchor" href="#flock" aria-hidden="true">#</a> flock</h3>
<ul>
<li>头文件</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/file.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明 flock()会依参数operation所指定的方式对参数fd所指的文件做各种锁定或解除锁定的动作。
此函数只能锁定整个文件，无法锁定文件的某一区域。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// fd 文件描述符、 锁定operation</span>
<span class="token keyword">int</span> <span class="token function">flock</span><span class="token punctuation">(</span><span class="token keyword">int</span> fd<span class="token punctuation">,</span><span class="token keyword">int</span> operation<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>参数 operation 有下列四种情况:</p>
<ul>
<li>LOCK_SH 建立共享锁定。多个进程可同时对同一个文件作共享锁定。</li>
<li>LOCK_EX 建立互斥锁定。一个文件同时只有一个互斥锁定。</li>
<li>LOCK_UN 解除文件锁定状态。</li>
<li>LOCK_NB 无法建立锁定时，此操作可不被阻断，马上返回进程。(通常与LOCK_SH或LOCK_EX做OR组合)</li>
</ul>
<ul>
<li>返回值
返回0表示成功，若有错误则返回-1，错误代码存于errno。</li>
</ul>
<h3 id="snprintf" tabindex="-1"><a class="header-anchor" href="#snprintf" aria-hidden="true">#</a> snprintf</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数，将可变参数(...)按照 format 格式化成字符串，并将字符串复制到 str 中，size 为要写入的字符的最大数目，超过 size 会被截断。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">snprintf</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span> str<span class="token punctuation">,</span> <span class="token class-name">size_t</span> size<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> format<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>str -- 目标字符串。</li>
<li>size -- 拷贝字节数(Bytes)。</li>
<li>format -- 格式化成字符串。</li>
<li>... -- 可变参数。</li>
</ul>
<ul>
<li>返回值
<ul>
<li>如果格式化后的字符串长度小于等于 size，则会把字符串全部复制到 str 中，并给其后添加一个字符串结束符 \0。
返回的实际写入的长度。</li>
<li>如果格式化后的字符串长度大于 size，超过 size 的部分会被截断，只将其中的 (size-1) 个字符复制到 str 中，并给其后添加一个字符串结束符 \0。
返回值为欲写入的字符串长度。</li>
</ul>
</li>
</ul>
<h2 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h2>
<h3 id="dup" tabindex="-1"><a class="header-anchor" href="#dup" aria-hidden="true">#</a> dup</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
dup用来复制参数oldfd所指的文件描述符。
返回的新文件描述符和参数oldfd指向同一个文件，这<strong>两个描述符共享同一个数据结构，共享所有的锁定，读写指针和各项标志位</strong>。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">dup</span><span class="token punctuation">(</span><span class="token keyword">int</span> oldfd<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
当复制成功是，返回最小的尚未被使用过的文件描述符;
若有错误则返回-1。
错误代码存入errno中。</li>
</ul>
<h3 id="dup2" tabindex="-1"><a class="header-anchor" href="#dup2" aria-hidden="true">#</a> dup2</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
dup2与dup区别是dup2可以用参数newfd指定新文件描述符的数值。
若参数newfd已经被程序使用，则系统就会将newfd所指的文件关闭；
若newfd等于oldfd，则返回newfd,而不关闭newfd所指的文件。
dup2所复制的文件描述符与原来的文件描述符共享各种文件状态。共享所有的锁定，读写位置和各项权限或flags等.
在shell的重定向功能中，(输入重定向”&lt;”和输出重定向”&gt;”)就是通过调用dup或dup2函数对标准输入和标准输出的操作来实现的。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">dup2</span><span class="token punctuation">(</span><span class="token keyword">int</span> oldfd<span class="token punctuation">,</span> <span class="token keyword">int</span> newfd<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>返回值
若dup2调用成功则返回新的文件描述符，出错则返回-1。</p>
</li>
<li>
<p>举例：
如何使用dup2实现标准输出到文件的重定向？</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;fcntl.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;string.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> oldfd<span class="token punctuation">;</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">int</span> t<span class="token punctuation">;</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>buf <span class="token operator">=</span> <span class="token string">"This is a test!!!!\n"</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>oldfd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token string">"/Users/jisongyang/CLionProjects/test_syscalls_sandbox/redirect/mine.txt"</span><span class="token punctuation">,</span> O_RDWR <span class="token operator">|</span> O_CREAT<span class="token punctuation">,</span>
                      <span class="token number">0644</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"open error\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    fd <span class="token operator">=</span> <span class="token function">dup2</span><span class="token punctuation">(</span>oldfd<span class="token punctuation">,</span> STDOUT_FILENO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fd <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"dup2 error\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"fd:%d  STDOUT_FILENO:%d\n"</span><span class="token punctuation">,</span> fd<span class="token punctuation">,</span> STDOUT_FILENO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    t <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token function">strlen</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token function">fileno</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buf<span class="token punctuation">,</span> t<span class="token punctuation">)</span> <span class="token operator">!=</span> t<span class="token punctuation">)</span><span class="token comment">//本应该写入到stdout的信息，但是标准输出已经重定向到目标文件中，故向标准输出写的数据将会写到目标文件中。</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"write error!\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">fflush</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// printf 是带缓冲的函数，不加这一行代码，printf 的内容不会写到文件里</span>
    <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最重要的一行代码：<code v-pre>dup2(oldfd, STDOUT_FILENO)</code></p>
</div></template>


