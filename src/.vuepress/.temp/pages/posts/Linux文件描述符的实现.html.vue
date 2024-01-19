<template><div><h1 id="什么是文件描述符" tabindex="-1"><a class="header-anchor" href="#什么是文件描述符" aria-hidden="true">#</a> 什么是文件描述符</h1>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>文件描述符在形式上是一个非负整数。实际上，它是一个索引值，指向内核为每一个进程所维护的该进程打开文件的记录表。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符。在程序设计程序设计)中，一些涉及底层的程序编写往往会围绕着文件描述符展开。但是文件描述符这一概念往往只适用于UNIX、Linux这样的操作系统。</p>
<p>每个Unix进程（除了可能的守护进程）应均有三个标准的POSIX文件描述符，对应于三个标准流：</p>
<table>
<thead>
<tr>
<th style="text-align:center">整数值</th>
<th style="text-align:center">名称</th>
<th style="text-align:center">符号常量</th>
<th style="text-align:center">文件流</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center"><a href="https://zh.wikipedia.org/wiki/Stdin" target="_blank" rel="noopener noreferrer">Standard input<ExternalLinkIcon/></a></td>
<td style="text-align:center">STDIN_FILENO</td>
<td style="text-align:center">stdin</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center"><a href="https://zh.wikipedia.org/wiki/Stdout" target="_blank" rel="noopener noreferrer">Standard output<ExternalLinkIcon/></a></td>
<td style="text-align:center">STDOUT_FILENO</td>
<td style="text-align:center">stdout</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center"><a href="https://zh.wikipedia.org/wiki/Stderr" target="_blank" rel="noopener noreferrer">Standard error<ExternalLinkIcon/></a></td>
<td style="text-align:center">STDERR_FILENO</td>
<td style="text-align:center">stderr</td>
</tr>
</tbody>
</table>
<p>文件描述符的优点主要有两个：</p>
<ul>
<li>基于文件描述符的I/O操作兼容POSIX标准。</li>
<li>在UNIX、Linux的系统调用中，大量的系统调用都是依赖于文件描述符。</li>
</ul>
<p>例如，下面的代码就示范了如何基于文件描述符来读取当前目录下的一个指定文件，并把文件内容打印至Console中。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/stat.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">int</span> numbytes<span class="token punctuation">;</span>
    <span class="token keyword">char</span> path<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"file"</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">/*
     * O_CREAT:如果文件不存在则创建
     * O_RDONLY:以只读模式打开文件
     */</span>
    fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> O_CREAT <span class="token operator">|</span> O_RDONLY<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>fd <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">"open()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span>EXIT_FAILURE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">memset</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>numbytes <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%d bytes read: %s"</span><span class="token punctuation">,</span> numbytes<span class="token punctuation">,</span> buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">memset</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">close</span> <span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span>EXIT_SUCCESS<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="与文件描述符相关的操作" tabindex="-1"><a class="header-anchor" href="#与文件描述符相关的操作" aria-hidden="true">#</a> 与文件描述符相关的操作</h2>
<h3 id="文件描述符的生成" tabindex="-1"><a class="header-anchor" href="#文件描述符的生成" aria-hidden="true">#</a> 文件描述符的生成</h3>
<ul>
<li>open(), open64(), creat(), creat64()</li>
<li>socket()</li>
<li>socketpair()</li>
<li>pipe()</li>
</ul>
<h3 id="与单一文件描述符相关的操作" tabindex="-1"><a class="header-anchor" href="#与单一文件描述符相关的操作" aria-hidden="true">#</a> 与单一文件描述符相关的操作</h3>
<ul>
<li>read(), write()</li>
<li>recv(), send()</li>
<li>recvmsg(), sendmsg()</li>
<li>sendfile()</li>
<li>lseek(), lseek64()</li>
<li>fstat(), fstat64()</li>
<li>fchmod()</li>
<li>fchown()</li>
</ul>
<h3 id="与复数文件描述符相关的操作" tabindex="-1"><a class="header-anchor" href="#与复数文件描述符相关的操作" aria-hidden="true">#</a> 与复数文件描述符相关的操作</h3>
<ul>
<li>select(), pselect()</li>
<li>poll(),epoll()</li>
</ul>
<h3 id="与文件描述符表相关的操作" tabindex="-1"><a class="header-anchor" href="#与文件描述符表相关的操作" aria-hidden="true">#</a> 与文件描述符表相关的操作</h3>
<ul>
<li>close()</li>
<li>dup()</li>
<li>dup2()</li>
<li>fcntl (F_DUPFD)</li>
<li>fcntl (F_GETFD and F_SETFD)</li>
</ul>
<h3 id="改变进程状态的操作" tabindex="-1"><a class="header-anchor" href="#改变进程状态的操作" aria-hidden="true">#</a> 改变进程状态的操作</h3>
<ul>
<li>fchdir()</li>
<li>mmap()</li>
</ul>
<h3 id="与文件加锁的操作" tabindex="-1"><a class="header-anchor" href="#与文件加锁的操作" aria-hidden="true">#</a> 与文件加锁的操作</h3>
<ul>
<li>flock()</li>
<li>fcntl (F_GETLK, F_SETLK and F_SETLKW)</li>
<li>lockf()</li>
</ul>
<h3 id="与套接字相关的操作" tabindex="-1"><a class="header-anchor" href="#与套接字相关的操作" aria-hidden="true">#</a> 与套接字相关的操作</h3>
<ul>
<li>connect()</li>
<li>bind()</li>
<li>listen()</li>
<li>accept()</li>
<li>getsockname()</li>
<li>getpeername()</li>
<li>getsockopt(), setsockopt()</li>
<li>shutdown()</li>
</ul>
<h1 id="文件描述符的实现" tabindex="-1"><a class="header-anchor" href="#文件描述符的实现" aria-hidden="true">#</a> 文件描述符的实现</h1>
<p><strong>在内核中每一个打开的文件都需要由3种数据结构来进行维护</strong>。</p>
<p>根据文中内容，这三种数据结构分别为：</p>
<ol>
<li>
<p>进程级：每个进程对应一张<strong>打开文件描述符表，<strong>这是</strong>进程级</strong>数据结构，也就是每一个进程都各自有这样一个数据结构；</p>
</li>
<li>
<p>内核级：内核维持一张<strong>打开文件表，文件表由多个文件表项组成，<strong>这是</strong>系统级</strong>数据结构，也就是说这样的数据结构是针对于整个内核而言的，每个进程都可共享的；</p>
</li>
<li>
<p>系统级：每个打开的文件对应一个<strong>i节点（i-node）<strong>数据结构（Linux下只有i节点没有v节点），由于这是每一个打开的文件与之对应的，因此这也是一个</strong>系统级</strong>数据结构，存在于内核中，非进程所独有。</p>
</li>
</ol>
<p>那么，这三种数据结构到底是什么呢？</p>
<h2 id="文件描述符表" tabindex="-1"><a class="header-anchor" href="#文件描述符表" aria-hidden="true">#</a> 文件描述符表</h2>
<p>在Linux中，对于每一个进程，都会分配一个PCB数据结构，它其中包含了该进程的所有信息，而在代码实现上，这个数据结构名为<strong>task_struct</strong>，在linux源码的<strong>include/linux/sched.h</strong>中可以找到其定义，它是一个很庞大的结构体，部分定义如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token punctuation">{</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token comment">/* CPU-specific state of this task */</span>
	<span class="token keyword">struct</span> <span class="token class-name">thread_struct</span> thread<span class="token punctuation">;</span>
	<span class="token comment">/* filesystem information */</span>
	<span class="token keyword">struct</span> <span class="token class-name">fs_struct</span> <span class="token operator">*</span>fs<span class="token punctuation">;</span>
	<span class="token comment">/* open file information */</span>
	<span class="token keyword">struct</span> <span class="token class-name">files_struct</span> <span class="token operator">*</span>files<span class="token punctuation">;</span>  <span class="token comment">// 注意这个</span>
	<span class="token comment">/* namespaces */</span>
	<span class="token keyword">struct</span> <span class="token class-name">nsproxy</span> <span class="token operator">*</span>nsproxy<span class="token punctuation">;</span>
	<span class="token comment">/* signal handlers */</span>
	<span class="token keyword">struct</span> <span class="token class-name">signal_struct</span> <span class="token operator">*</span>signal<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">sighand_struct</span> <span class="token operator">*</span>sighand<span class="token punctuation">;</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<strong>task_struct</strong>中，有一个成员变量名为<strong>files</strong>，注释中提到这是一个描述打开文件信息的变量，其类型为<strong>struct files_struct *</strong>，那么现在再接着看<strong>files_struct</strong>，在linux源码的<strong>include/linux/fdtable.h</strong>中可以找到其定义，定义如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">files_struct</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
   * read mostly part
   */</span>
	<span class="token class-name">atomic_t</span> count<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">fdtable</span> __rcu <span class="token operator">*</span>fdt<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">fdtable</span> fdtab<span class="token punctuation">;</span>
	<span class="token comment">/*
   * written part on a separate cache line in SMP
   */</span>
	<span class="token class-name">spinlock_t</span> file_lock ____cacheline_aligned_in_smp<span class="token punctuation">;</span>
	<span class="token keyword">int</span> next_fd<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">embedded_fd_set</span> close_on_exec_init<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">embedded_fd_set</span> open_fds_init<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">file</span> __rcu <span class="token operator">*</span> fd_array<span class="token punctuation">[</span>NR_OPEN_DEFAULT<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token comment">//进程级打开文件描述符表</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而这里所要找到的<strong>打开文件描述符表</strong>，实际上就是files_struct 中的成员<strong>struct file * fd_array[NR_OPEN_DEFAULT]<strong>它是一个指针数组，数组每一个元素都是一个指向</strong>file</strong>类型的指针，可想而知，这些指针都会指向一个打开的文件，并且file这一数据结构就是用来描述一个打开的文件的，**而我们所说的文件描述符，实际上就是这个指针数组的索引。**这也是为什么文件描述符是非负整数。</p>
<h2 id="文件表项" tabindex="-1"><a class="header-anchor" href="#文件表项" aria-hidden="true">#</a> 文件表项</h2>
<p>前面说了，每一个打开文件实际上就是用一个<strong>file</strong>结构体进行描述的，在linux源码的<strong>include/linux/fs.h</strong>中可以找到其定义，定义如下:</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
	 * fu_list becomes invalid after file_free is called and queued via
	 * fu_rcuhead for RCU freeing
	 */</span>
	<span class="token keyword">union</span> <span class="token punctuation">{</span>
		<span class="token keyword">struct</span> <span class="token class-name">list_head</span>	fu_list<span class="token punctuation">;</span>
		<span class="token keyword">struct</span> <span class="token class-name">rcu_head</span> 	fu_rcuhead<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>f_u<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">path</span>		f_path<span class="token punctuation">;</span>
	<span class="token comment">//文件路径，包括目录项以及i-node</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">f_dentry</span>	<span class="token expression">f_path<span class="token punctuation">.</span>dentry</span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">f_vfsmnt</span>	<span class="token expression">f_path<span class="token punctuation">.</span>mnt</span></span>
		<span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">file_operations</span>	<span class="token operator">*</span>f_op<span class="token punctuation">;</span>
	<span class="token class-name">spinlock_t</span>		f_lock<span class="token punctuation">;</span>
	<span class="token comment">/* f_ep_links, f_flags, no IRQ */</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_SMP</span></span>
		<span class="token keyword">int</span>			f_sb_list_cpu<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
		<span class="token class-name">atomic_long_t</span>		f_count<span class="token punctuation">;</span>
	<span class="token comment">//文件打开次数</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span> 		f_flags<span class="token punctuation">;</span>
	<span class="token comment">//文件打开时的flag，对应于open函数的flag参数</span>
	<span class="token class-name">fmode_t</span>			f_mode<span class="token punctuation">;</span>
	<span class="token comment">//文件打开时的mode，对应于open函数的mode参数</span>
	<span class="token class-name">loff_t</span>			f_pos<span class="token punctuation">;</span>
	<span class="token comment">//文件偏移位置</span>
	<span class="token keyword">struct</span> <span class="token class-name">fown_struct</span>	f_owner<span class="token punctuation">;</span>
	<span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">cred</span>	<span class="token operator">*</span>f_cred<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">file_ra_state</span>	f_ra<span class="token punctuation">;</span>
	u64			f_version<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_SECURITY</span></span>
		<span class="token keyword">void</span>			<span class="token operator">*</span>f_security<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
	<span class="token comment">/* needed for tty driver, and maybe others */</span>
	<span class="token keyword">void</span>			<span class="token operator">*</span>private_data<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_EPOLL</span></span>
	<span class="token comment">/* Used by fs/eventpoll.c to link all the hooks to this file */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span>	f_ep_links<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> </span>
	<span class="token comment">/* #ifdef CONFIG_EPOLL */</span>
	<span class="token keyword">struct</span> <span class="token class-name">address_space</span>	<span class="token operator">*</span>f_mapping<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_DEBUG_WRITECOUNT</span></span>
		<span class="token keyword">unsigned</span> <span class="token keyword">long</span> f_mnt_write_state<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在file结构体中，不得不再说一下它的f_path成员，这是一个<strong>struct path</strong>类型的变量，该类型定义于<strong>include/linux/path.h：</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">path</span> <span class="token punctuation">{</span>
	<span class="token keyword">struct</span> <span class="token class-name">vfsmount</span> <span class="token operator">*</span>mnt<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span>dentry<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的dentry实际上就指向文件所在的<strong>目录项</strong>了，<strong>struct dentry</strong>的类型定义于<strong>include/linux/dcache.h：</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token punctuation">{</span>
	<span class="token comment">/* RCU lookup touched fields */</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span> d_flags<span class="token punctuation">;</span>
	<span class="token comment">/* protected by d_lock */</span>
	<span class="token class-name">seqcount_t</span> d_seq<span class="token punctuation">;</span>
	<span class="token comment">/* per dentry seqlock */</span>
	<span class="token keyword">struct</span> <span class="token class-name">hlist_bl_node</span> d_hash<span class="token punctuation">;</span>
	<span class="token comment">/* lookup hash list */</span>
	<span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span>d_parent<span class="token punctuation">;</span>
	<span class="token comment">/* parent directory */</span>
	<span class="token keyword">struct</span> <span class="token class-name">qstr</span> d_name<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span>d_inode<span class="token punctuation">;</span> <span class="token comment">// 注意这个</span>
	<span class="token comment">/* Where the name belongs to - NULL is
					 * negative */</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">char</span> d_iname<span class="token punctuation">[</span>DNAME_INLINE_LEN<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token comment">/* small names */</span>
	<span class="token comment">/* Ref lookup also touches following */</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span> d_count<span class="token punctuation">;</span>
	<span class="token comment">/* protected by d_lock */</span>
	<span class="token class-name">spinlock_t</span> d_lock<span class="token punctuation">;</span>
	<span class="token comment">/* per dentry lock */</span>
	<span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">dentry_operations</span> <span class="token operator">*</span>d_op<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">super_block</span> <span class="token operator">*</span>d_sb<span class="token punctuation">;</span>
	<span class="token comment">/* The root of the dentry tree */</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">long</span> d_time<span class="token punctuation">;</span>
	<span class="token comment">/* used by d_revalidate */</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>d_fsdata<span class="token punctuation">;</span>
	<span class="token comment">/* fs-specific data */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> d_lru<span class="token punctuation">;</span>
	<span class="token comment">/* LRU list */</span>
	<span class="token comment">/*
	 * d_child and d_rcu can share memory
	 */</span>
	<span class="token keyword">union</span> <span class="token punctuation">{</span>
		<span class="token keyword">struct</span> <span class="token class-name">list_head</span> d_child<span class="token punctuation">;</span>
		<span class="token comment">/* child of parent list */</span>
		<span class="token keyword">struct</span> <span class="token class-name">rcu_head</span> d_rcu<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>d_u<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> d_subdirs<span class="token punctuation">;</span>
	<span class="token comment">/* our children */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> d_alias<span class="token punctuation">;</span>
	<span class="token comment">/* inode alias list */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在dentry结构体中，描述了根结点、父节点等等信息，尤其还要注意的是<strong>struct inode *d_inode</strong>这一变量，它则是指向了一个<strong>i-node</strong>结点。</p>
<p>再回到file结构体中，有一个<strong>struct file_operations *f_op</strong>变量，其类型定义在<strong>include/linux/fs.h</strong>中：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">file_operations</span> <span class="token punctuation">{</span>
	<span class="token keyword">struct</span> <span class="token class-name">module</span> <span class="token operator">*</span>owner<span class="token punctuation">;</span>
	<span class="token class-name">loff_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>llseek<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>read<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">char</span> __user <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">size_t</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>write<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> __user <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">size_t</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>aio_read<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">kiocb</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">iovec</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>aio_write<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">kiocb</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">iovec</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>readdir<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">filldir_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>poll<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">poll_table_struct</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>unlocked_ioctl<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>compat_ioctl<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>mmap<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">vm_area_struct</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>open<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>flush<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">fl_owner_t</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>release<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>fsync<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span> datasync<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>aio_fsync<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">kiocb</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span> datasync<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>fasync<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>lock<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file_lock</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>sendpage<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">page</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token class-name">size_t</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>get_unmapped_area<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>check_flags<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>flock<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file_lock</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>splice_write<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">pipe_inode_info</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">size_t</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>splice_read<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">pipe_inode_info</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">size_t</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>setlease<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">file_lock</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>fallocate<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">file</span> <span class="token operator">*</span>file<span class="token punctuation">,</span> <span class="token keyword">int</span> mode<span class="token punctuation">,</span> <span class="token class-name">loff_t</span> offset<span class="token punctuation">,</span>
				  <span class="token class-name">loff_t</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可见，在该成员中包含了所有文件操作相关的函数指针。</p>
<p>每一个打开的文件都对应于一个file结构体，在该结构体中，f_flags描述了文件标志，f_pos描述了文件的偏移位置，而在f_path中有含有一个指向一个inode结点的指针。</p>
<p>因此可以知道，文件表项的数据结构就是file结构体，而在实际上内核中也并不存在这样一张文件表，只是每个打开的文件都对应一个file结构体，也就是一个文件表项，**打开文件描述符表struct file fd_array[NR_OPEN_DEFAULT]**数组中的每一项都会指向这样一个文件表项，如下图所示：</p>
<img src="@source/posts/fd2.png" style="zoom:80%;" />
<h2 id="inode" tabindex="-1"><a class="header-anchor" href="#inode" aria-hidden="true">#</a> Inode</h2>
<p>第三种数据结构就是inode节点，在<strong>include/linux/fs.h</strong>中找到其定义如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token punctuation">{</span>
	<span class="token comment">/* RCU path lookup touches following: */</span>
	<span class="token class-name">umode_t</span>			i_mode<span class="token punctuation">;</span>
	<span class="token comment">//权限</span>
	<span class="token class-name">uid_t</span>			i_uid<span class="token punctuation">;</span>
	<span class="token comment">//用户id</span>
	<span class="token class-name">gid_t</span>			i_gid<span class="token punctuation">;</span>
	<span class="token comment">//组id</span>
	<span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">inode_operations</span>	<span class="token operator">*</span>i_op<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">super_block</span>	<span class="token operator">*</span>i_sb<span class="token punctuation">;</span>
	<span class="token class-name">spinlock_t</span>		i_lock<span class="token punctuation">;</span>
	<span class="token comment">/* i_blocks, i_bytes, maybe i_size */</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span>		i_flags<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">mutex</span>		i_mutex<span class="token punctuation">;</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">long</span>		i_state<span class="token punctuation">;</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">long</span>		dirtied_when<span class="token punctuation">;</span>
	<span class="token comment">/* jiffies of first dirtying */</span>
	<span class="token keyword">struct</span> <span class="token class-name">hlist_node</span>	i_hash<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span>	i_wb_list<span class="token punctuation">;</span>
	<span class="token comment">/* backing dev IO list */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span>	i_lru<span class="token punctuation">;</span>
	<span class="token comment">/* inode LRU list */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span>	i_sb_list<span class="token punctuation">;</span>
	<span class="token keyword">union</span> <span class="token punctuation">{</span>
		<span class="token keyword">struct</span> <span class="token class-name">list_head</span>	i_dentry<span class="token punctuation">;</span>
		<span class="token keyword">struct</span> <span class="token class-name">rcu_head</span>		i_rcu<span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">long</span>		i_ino<span class="token punctuation">;</span>
	<span class="token comment">//inode节点号</span>
	<span class="token class-name">atomic_t</span>		i_count<span class="token punctuation">;</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span>		i_nlink<span class="token punctuation">;</span>
	<span class="token class-name">dev_t</span>			i_rdev<span class="token punctuation">;</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span>		i_blkbits<span class="token punctuation">;</span>
	u64			i_version<span class="token punctuation">;</span>
	<span class="token class-name">loff_t</span>			i_size<span class="token punctuation">;</span>
	<span class="token comment">//文件大小</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__NEED_I_SIZE_ORDERED</span></span>
		<span class="token class-name">seqcount_t</span>		i_size_seqcount<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
		<span class="token keyword">struct</span> <span class="token class-name">timespec</span>		i_atime<span class="token punctuation">;</span>
	<span class="token comment">//最后一次访问(access)的时间</span>
	<span class="token keyword">struct</span> <span class="token class-name">timespec</span>		i_mtime<span class="token punctuation">;</span>
	<span class="token comment">//最后一次修改(modify)的时间</span>
	<span class="token keyword">struct</span> <span class="token class-name">timespec</span>		i_ctime<span class="token punctuation">;</span>
	<span class="token comment">//最后一次改变(change)的时间</span>
	<span class="token class-name">blkcnt_t</span>		i_blocks<span class="token punctuation">;</span>
	<span class="token comment">//块数</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">short</span>          i_bytes<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">rw_semaphore</span>	i_alloc_sem<span class="token punctuation">;</span>
	<span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">file_operations</span>	<span class="token operator">*</span>i_fop<span class="token punctuation">;</span>
	<span class="token comment">/* former ->i_op->default_file_ops */</span>
	<span class="token keyword">struct</span> <span class="token class-name">file_lock</span>	<span class="token operator">*</span>i_flock<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">address_space</span>	<span class="token operator">*</span>i_mapping<span class="token punctuation">;</span>
	<span class="token comment">//块地址映射</span>
	<span class="token keyword">struct</span> <span class="token class-name">address_space</span>	i_data<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_QUOTA</span></span>
		<span class="token keyword">struct</span> <span class="token class-name">dquot</span>		<span class="token operator">*</span>i_dquot<span class="token punctuation">[</span>MAXQUOTAS<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
		<span class="token keyword">struct</span> <span class="token class-name">list_head</span>	i_devices<span class="token punctuation">;</span>
	<span class="token keyword">union</span> <span class="token punctuation">{</span>
		<span class="token keyword">struct</span> <span class="token class-name">pipe_inode_info</span>	<span class="token operator">*</span>i_pipe<span class="token punctuation">;</span>
		<span class="token keyword">struct</span> <span class="token class-name">block_device</span>	<span class="token operator">*</span>i_bdev<span class="token punctuation">;</span>
		<span class="token keyword">struct</span> <span class="token class-name">cdev</span>		<span class="token operator">*</span>i_cdev<span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
	__u32			i_generation<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_FSNOTIFY</span></span>
		__u32			i_fsnotify_mask<span class="token punctuation">;</span>
	<span class="token comment">/* all events this inode cares about */</span>
	<span class="token keyword">struct</span> <span class="token class-name">hlist_head</span>	i_fsnotify_marks<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_IMA</span></span>
		<span class="token class-name">atomic_t</span>		i_readcount<span class="token punctuation">;</span>
	<span class="token comment">/* struct files open RO */</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
		<span class="token class-name">atomic_t</span>		i_writecount<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_SECURITY</span></span>
		<span class="token keyword">void</span>			<span class="token operator">*</span>i_security<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_FS_POSIX_ACL</span></span>
		<span class="token keyword">struct</span> <span class="token class-name">posix_acl</span>	<span class="token operator">*</span>i_acl<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">posix_acl</span>	<span class="token operator">*</span>i_default_acl<span class="token punctuation">;</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
		<span class="token keyword">void</span>			<span class="token operator">*</span>i_private<span class="token punctuation">;</span>
	<span class="token comment">/* fs or device private pointer */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码中只注释了一部分，通过inode结构，可以知道<strong>文件数据块的在磁盘上的位置以及文件大小</strong>等信息，这样才能使得<strong>进程能够通过file结构体来找到磁盘上相应文件的位置</strong>来进行文件读写。</p>
<p>另外补充一点，关于inode结构体中的<strong>struct inode_operations *i_op</strong>成员，其数据结构定义在<strong>include/linux/fs.h</strong>中：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">inode_operations</span> <span class="token punctuation">{</span>
	<span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token operator">*</span>lookup<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">nameidata</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token operator">*</span>follow_link<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">nameidata</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>permission<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>check_acl<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>readlink<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">char</span> __user <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>put_link<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">nameidata</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>create<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">nameidata</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>link<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>unlink<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>symlink<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>mkdir<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>rmdir<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>mknod<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">,</span><span class="token class-name">dev_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>rename<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span>
				<span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>truncate<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>setattr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">iattr</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>getattr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">vfsmount</span> <span class="token operator">*</span>mnt<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">kstat</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>setxattr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">,</span><span class="token class-name">size_t</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>getxattr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">size_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">ssize_t</span> <span class="token punctuation">(</span><span class="token operator">*</span>listxattr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">size_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>removexattr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">dentry</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>truncate_range<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span><span class="token punctuation">,</span> <span class="token class-name">loff_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>fiemap<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">inode</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">fiemap_extent_info</span> <span class="token operator">*</span><span class="token punctuation">,</span> u64 start<span class="token punctuation">,</span>
			      u64 len<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>____cacheline_aligned<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可见，在该成员变量所指向的数据结构中，包含了许多函数指针，这些函数指针大多针对于目录、文件操作。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>进程、打开文件描述符表、文件表项和i-node结点关系如图所示。（暂时忽略进程中0、1和2号文件描述符分别默认为标准输入、标准输出和标准错误的情况）</p>
<figure><img src="@source/posts/fd1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>通过以上分析，我们可以得出以下结论：</p>
<ol>
<li>
<p>每启动一个进程都会为其分配一个<code v-pre>task_struct</code>结构体，在task_struct结构体中含有一个<code v-pre>file_struct</code>结构体指针，其所指向的file_struct结构体中，含有一个file的指针数组<code v-pre>fd_array</code>,它就是<strong>打开文件描述符表</strong>，其中<strong>每一个元素都指向一个文件表项</strong>，这个<strong>数组的索引就是文件描述符</strong>。此外，file_struct结构体中的next_fd保存的是下一个分配的文件描述符，它会在调用open和close改变，最终使得每次open返回的都是当前可用的<strong>最小文件描述符</strong>；</p>
</li>
<li>
<p>每次调用open或者create(内部实际上还是调用的open)，都会对新打开的文件分配一个file结构体，并且将打开文件的标志、状态、权限等信息填入这个file结构体中。<strong>这个file结构体也叫文件表项</strong>；</p>
</li>
<li>
<p><strong>磁盘中的每个文件都对应一个i-node</strong>，<strong>每一个文件表项都会指向一个文件的i-node</strong>，**但是同一文件的i-node可以对应多个文件表项（**当多次调用open打开同一个文件时就会出现这种情况，不管是同一进程多次打开同一文件（如图中A进程的0号和2号文件描述符对应两个文件表项，但是最终指向同一i-node即同一文件），还是不同进程多次打开同一文件（如图中A进程3号文件描述符和B进程的3号文件描述符））；</p>
</li>
<li>
<p><strong>同一进程下的不同文件描述符是可以指向同一文件表项</strong>，即最终指向同一文件**（如图中A进程的0号文件描述符和1号文件描述符，使用dup函数即可实现）。**</p>
</li>
<li>
<p>子进程在创建时会拷贝父进程的打开文件描述符表，因此<strong>父子进程是共享文件表项</strong>的。而相互独立的不同进程的打开文件描述符表是相互独立的，因此相互独立的多个进程之间的文件描述符可以相同，但是不同进程的文件描述符是不能指向同一文件表项的（<strong>除非这个文件描述符是从同一个祖先进程中继承得来的</strong>），但是这并不妨碍不同进程访问同一文件（如第3点结论）；</p>
</li>
<li>
<p>指向同一文件表项的不同文件描述符（不同进程相同数值的文件描述符也看做不同）共享文件标志、文件偏移等信息；</p>
</li>
<li>
<p>每一个文件表项对应的file结构体中的<code v-pre>f_count</code>会记录通过该文件表项打开文件的次数，当<code v-pre>f_count</code>计数归0时这个文件表项才会被删除，因此，对于指向同一文件表项的两个不同文件描述符（如子进程所继承的父进程的文件描述符，或同一进程中dup的两个文件描述符指向同一个文件表项），即使其中一个文件描述符关闭了，只要仍然有文件描述符指向这个文件表项，那么就依然能通过这个文件表项访问文件，直到所有指向该文件表项的文件描述符都关闭了才不能再进行访问；</p>
</li>
</ol>
<blockquote>
<p>参考链接</p>
<p><a href="https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6" target="_blank" rel="noopener noreferrer">文件描述符<ExternalLinkIcon/></a></p>
<p><a href="https://www.cnblogs.com/lwyeric/p/13598704.html" target="_blank" rel="noopener noreferrer">Linux中文件描述符的理解<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


