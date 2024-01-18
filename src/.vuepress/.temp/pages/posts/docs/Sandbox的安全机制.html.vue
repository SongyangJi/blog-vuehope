<template><div><h1 id="sandbox的安全机制如何设计" tabindex="-1"><a class="header-anchor" href="#sandbox的安全机制如何设计" aria-hidden="true">#</a> Sandbox的安全机制如何设计？</h1>
<p>对于Linux而言，它的风格是一贯的。沙盒是进程而不是线程，这点非常明确。</p>
<h2 id="用户权限相关" tabindex="-1"><a class="header-anchor" href="#用户权限相关" aria-hidden="true">#</a> 用户权限相关</h2>
<h3 id="nobody-用户" tabindex="-1"><a class="header-anchor" href="#nobody-用户" aria-hidden="true">#</a> Nobody 用户</h3>
<p>在许多Unix系统与类Unix系统（如Linux）中，nobody是一个没有任何权限的用户。
该用户不拥有任何文件，也没有任何特殊权限。某些系统还会定义类似的用户组“nogroup”。
示例：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/**
 * @Author: 吉松阳
 * @Date: 2021/9/23
 * @Description: 
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pwd.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">passwd</span> <span class="token operator">*</span>pw<span class="token punctuation">;</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>username <span class="token operator">=</span> <span class="token string">"nobody"</span><span class="token punctuation">;</span>
    pw <span class="token operator">=</span> <span class="token function">getpwnam</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pw<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%s is not exist\n"</span><span class="token punctuation">,</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"pw->pw_name = %s\n"</span><span class="token punctuation">,</span> pw<span class="token operator">-></span>pw_name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"pw->pw_passwd = %s\n"</span><span class="token punctuation">,</span> pw<span class="token operator">-></span>pw_passwd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"pw->pw_uid = %d\n"</span><span class="token punctuation">,</span> pw<span class="token operator">-></span>pw_uid<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"pw->pw_gid = %d\n"</span><span class="token punctuation">,</span> pw<span class="token operator">-></span>pw_gid<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"pw->pw_gecos = %s\n"</span><span class="token punctuation">,</span> pw<span class="token operator">-></span>pw_gecos<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"pw->pw_dir = %s\n"</span><span class="token punctuation">,</span> pw<span class="token operator">-></span>pw_dir<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"pw->pw_shell = %s\n"</span><span class="token punctuation">,</span> pw<span class="token operator">-></span>pw_shell<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是 MacOS Big Sur 上的 nobody 用户相关信息。
其中<code v-pre>/var/empty</code>表明它不拥有任何文件，<code v-pre>/usr/bin/false</code>表明它不能登录使用shell</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>pw->pw_name = nobody
pw->pw_passwd = *
pw->pw_uid = -2
pw->pw_gid = -2
pw->pw_gecos = Unprivileged User
pw->pw_dir = /var/empty
pw->pw_shell = /usr/bin/false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在运行oj用户的代码的时候，是以nobody的身份运行的，意味着它的权限非常有限，不能去执行那些危险的代码。</p>
<h3 id="root-用户" tabindex="-1"><a class="header-anchor" href="#root-用户" aria-hidden="true">#</a> root 用户</h3>
<p>root用户，即系统的管理员。
sandbox程序本身需要 root权限。
如何区分呢？
将上面的代码中的用户名替换成 root, 输出为：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pw-<span class="token operator">></span>pw_name <span class="token operator">=</span> root
pw-<span class="token operator">></span>pw_passwd <span class="token operator">=</span> *
pw-<span class="token operator">></span>pw_uid <span class="token operator">=</span> <span class="token number">0</span>
pw-<span class="token operator">></span>pw_gid <span class="token operator">=</span> <span class="token number">0</span>
pw-<span class="token operator">></span>pw_gecos <span class="token operator">=</span> System Administrator
pw-<span class="token operator">></span>pw_dir <span class="token operator">=</span> /var/root
pw-<span class="token operator">></span>pw_shell <span class="token operator">=</span> /bin/sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现uid、gid 均为 0。
于是在运行沙箱之前判定一下程序的执行者的uid、gid是不是 root 用户即可。</p>
<h2 id="资源限制" tabindex="-1"><a class="header-anchor" href="#资源限制" aria-hidden="true">#</a> 资源限制</h2>
<h3 id="setuid-setgid" tabindex="-1"><a class="header-anchor" href="#setuid-setgid" aria-hidden="true">#</a> setuid/setgid</h3>
<ul>
<li>
<p>background infomation
内核为每个进程维护的三个UID值。
这三个UID分别是实际用户ID(real uid)、有效用户ID(effective uid)、保存的设置用户ID(saved set-user ID)。
其中 real uid 指的是运行某程序的实际用户ID（登录shell的那个用户的uid）；
effective uid 指的是指当前进程是以哪个用户ID来运行的；
保存的设置用户ID就是有效用户ID的一个副本，与SUID权限有关。
一般情况下 real uid 和 effective uid 相同，但是使用<code v-pre>setuid</code>、<code v-pre>chmod +s</code>之后，二者就不一定相同了。</p>
</li>
<li>
<p><code v-pre>setuid</code>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
<span class="token keyword">int</span> <span class="token function">setuid</span><span class="token punctuation">(</span><span class="token class-name">uid_t</span> uid<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明：
+（1） 如果进程具有超级用户权限，那么 <code v-pre>setuid(uid_t uid)</code>会将三种 uid 全部设置成参数uid；
(启动sandbox其实就是要求以root身份启动的)</p>
<ul>
<li>(2) 如果 uid 等于 real uid 或者 saved set-user ID, 那么只把 effective uid 修改成 uid；</li>
<li>(3) 两种情况都不满组足，返回 -1 , errno被设置为 EPERM。</li>
</ul>
</li>
<li>
<p>返回值
执行成功则返回0； 失败则返回-1, 错误代码存于errno.</p>
</li>
<li>
<p>使用场景</p>
<ul>
<li>降低权限，比如在sandbox中通过让程序以 nobody 的身份来运行。</li>
<li>提高权限，但是最好注意在使用完 root 权限后建议马上执行setuid(getuid())，来抛弃root 权限，避免不必要的风险。</li>
</ul>
</li>
</ul>
<h3 id="setrlimit-getrlimit" tabindex="-1"><a class="header-anchor" href="#setrlimit-getrlimit" aria-hidden="true">#</a> setrlimit/getrlimit</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/resource.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
获取或设定资源使用限制。
每种资源都有相关的软硬限制:<strong>软限制</strong>是内核强加给相应资源的限制值，<strong>硬限制</strong>是软限制的最大值。
非授权调用进程只可以将其软限制指定为0~硬限制范围中的某个值，同时能不可逆转地降低其硬限制。
授权进程可以任意改变其软硬限制。
RLIM_INFINITY的值表示不对资源限制。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">getrlimit</span><span class="token punctuation">(</span><span class="token keyword">int</span> resource<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">rlimit</span> <span class="token operator">*</span>rlim<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">setrlimit</span><span class="token punctuation">(</span><span class="token keyword">int</span> resource<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">rlimit</span> <span class="token operator">*</span>rlim<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>resource：可能的选择有</p>
<ul>
<li>RLIMIT_AS // 进程的最大虚内存空间，字节为单位。</li>
<li>RLIMIT_CORE // 内核转存文件的最大长度。</li>
<li>RLIMIT_CPU // 最大允许的CPU使用时间，秒为单位。当进程达到软限制，内核将给其发送<strong>SIGXCPU</strong>信号，这一信号的默认行为是终止进程的执行。
然而，可以捕捉信号，处理句柄可将控制返回给主程序。
如果进程继续耗费CPU时间，核心会以每秒一次的频率给其发送SIGXCPU信号。
如果达到硬限制，那时将给进程发送 SIGKILL信号终止其执行。</li>
<li>RLIMIT_DATA // 进程数据段的最大值。</li>
<li>RLIMIT_FSIZE // 进程可建立的文件的最大长度。如果进程试图超出这一限制时，核心会给其发送<strong>SIGXFSZ</strong>信号，默认情况下将终止进程的执行。</li>
<li>RLIMIT_LOCKS // 进程可建立的锁和租赁的最大值。</li>
<li>RLIMIT_MEMLOCK // 进程可锁定在内存中的最大数据量，字节为单位。</li>
<li>RLIMIT_MSGQUEUE // 进程可为POSIX消息队列分配的最大字节数。</li>
<li>RLIMIT_NICE // 进程可通过setpriority() 或 nice()调用设置的最大完美值。</li>
<li>RLIMIT_NOFILE // 指定比进程可打开的最大文件描述词大一的值，超出此值，将会产生EMFILE错误。</li>
<li>RLIMIT_NPROC // 用户可拥有的最大进程数。</li>
<li>RLIMIT_RTPRIO // 进程可通过sched_setscheduler 和 sched_setparam设置的最大实时优先级。</li>
<li>RLIMIT_SIGPENDING // 用户可拥有的最大挂起信号数。</li>
<li>RLIMIT_STACK // 最大的进程栈，以字节为单位。</li>
</ul>
<p>rlimit：描述资源软硬限制的结构体，原型如下</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">rlimit</span> <span class="token punctuation">{</span>
	<span class="token class-name">rlim_t</span>  rlim_cur<span class="token punctuation">;</span>               <span class="token comment">/* current (soft) limit 软限制 */</span>
	<span class="token class-name">rlim_t</span>  rlim_max<span class="token punctuation">;</span>               <span class="token comment">/* maximum value for rlim_cur 硬限制 */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>返回值
<strong>成功执行时，返回 0 。失败返回 -1</strong> 。
errno被设为以下的某个值：</p>
<ul>
<li>EFAULT：rlim指针指向的空间不可访问</li>
<li>EINVAL：参数无效</li>
<li>EPERM：增加资源限制值时，权能不允许</li>
</ul>
</li>
<li>
<p>参考链接：
<a href="https://man7.org/linux/man-pages/man2/getrlimit.2.html" target="_blank" rel="noopener noreferrer">getrlimit(2) — Linux manual page<ExternalLinkIcon/></a></p>
</li>
</ul>
<h1 id="使用seccomp限制syscall" tabindex="-1"><a class="header-anchor" href="#使用seccomp限制syscall" aria-hidden="true">#</a> 使用seccomp限制syscall</h1>
<h2 id="什么是seccomp" tabindex="-1"><a class="header-anchor" href="#什么是seccomp" aria-hidden="true">#</a> 什么是seccomp</h2>
<p>seccomp（全称 <strong>secure computing mode</strong>）是linux kernel从2.6.23版本开始所支持的一种安全机制。
seccomp是一种<strong>内核中的安全机制</strong>,正常情况下,程序可以使用所有的syscall,这是不安全的。
比如劫持程序流后通过execve的syscall来<code v-pre>getshell</code>。
通过seccomp我们可以在程序中禁用掉某些syscall,这样就算劫持了程序流也只能调用部分的syscall了.</p>
<p><strong>通过seccomp，我们限制程序使用某些系统调用，这样可以减少系统的暴露面，同时是程序进入一种“安全”的状态。</strong>
详细介绍可参考seccomp内核文档(见参考链接)。</p>
<h2 id="如何使用seccomp" tabindex="-1"><a class="header-anchor" href="#如何使用seccomp" aria-hidden="true">#</a> 如何使用seccomp</h2>
<p>seccomp可以通过系统调用ptrctl(2)或者通过系统调用seccomp(2)开启，前提是内核配置中开启了CONFIG_SECCOMP和CONFIG_SECCOMP_FILTER。</p>
<p>seccomp支持两种模式：<strong>SECCOMP_MODE_STRICT</strong> 和 <strong>SECCOMP_MODE_FILTER</strong>。</p>
<ul>
<li>在SECCOMP_MODE_STRICT模式下，进程不能使用<code v-pre>read(2)</code>、<code v-pre>write(2)</code>、<code v-pre>_exit(2)</code>和<code v-pre>sigreturn(2)</code>以外的其他系统调用。</li>
<li>在SECCOMP_MODE_FILTER模式下，可以利用BerkeleyPacket Filter配置哪些系统调用及它们的参数可以被进程使用。</li>
</ul>
<h2 id="如何查看是否使用了seccomp" tabindex="-1"><a class="header-anchor" href="#如何查看是否使用了seccomp" aria-hidden="true">#</a> 如何查看是否使用了seccomp</h2>
<p>通常有两种方法：
利用<code v-pre>prctl(2)</code>的PR_GET_SECCOMP的参数获取当前进程的seccomp状态。</p>
<ul>
<li>返回值0表示没有使用seccomp;</li>
<li>返回值2表示使用了seccomp并处于SECCOMP_MODE_FILTER模式；</li>
<li>其他情况进程会被SIGKILL信号杀死。</li>
</ul>
<p>从Linux3.8开始，可以利用/proc/$pid/status中的Seccomp字段查看。如果没有seccomp字段，说明内核不支持seccomp。</p>
<ul>
<li>举例:
查看mysql服务的seccomp的状态，发现并没有进入安全限制模式。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/<span class="token variable"><span class="token variable">`</span>pidof mysqld<span class="token variable">`</span></span>/status
<span class="token comment"># 输出</span>
Name:	mysqld
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
Seccomp:	<span class="token number">0</span>
Seccomp_filters:	<span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在sandbox环境下执行 python3 脚本，
查看次进程的seccomp的状态，发现进程处于SECCOMP_MODE_FILTER模式 。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Name:	python3
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
Seccomp:	<span class="token number">2</span>
Seccomp_filters:	<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>代码示例
使用 <code v-pre>syscall</code> 调用 execve，如果没有安全限制的话，会正常进入 shell</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/syscall.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;seccomp.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    scmp_filter_ctx ctx<span class="token punctuation">;</span> <span class="token comment">// scmp 过滤上下文</span>
    ctx <span class="token operator">=</span> <span class="token function">seccomp_init</span><span class="token punctuation">(</span>SCMP_ACT_ALLOW<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 初始化过滤状态为允许所有系统调用</span>
    <span class="token function">seccomp_rule_add</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> SCMP_ACT_KILL<span class="token punctuation">,</span> <span class="token function">SCMP_SYS</span><span class="token punctuation">(</span>execve<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加需要限制的系统调用</span>
    <span class="token function">seccomp_load</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 装载上下文</span>

    <span class="token keyword">char</span> <span class="token operator">*</span>filename <span class="token operator">=</span> <span class="token string">"/bin/sh"</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"/bin/sh"</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>envp<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token constant">NULL</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token function">syscall</span><span class="token punctuation">(</span>SYS_execve<span class="token punctuation">,</span> filename<span class="token punctuation">,</span> argv<span class="token punctuation">,</span> envp<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// execve</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-o</span> ban ban.c <span class="token parameter variable">-l</span> seccomp
<span class="token comment"># 须先实现安装 </span>
<span class="token comment"># sudo apt install libseccomp-dev libseccomp2 seccomp</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>songyangji@SongyangJi-Ubuntu-DeskStop:~/桌面$ ./ban
错误的系统调用 <span class="token punctuation">(</span>核心已转储<span class="token punctuation">)</span> <span class="token comment"># Bad system call (core dumped)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="api-rule" tabindex="-1"><a class="header-anchor" href="#api-rule" aria-hidden="true">#</a> api rule</h2>
<h3 id="scmp-sys" tabindex="-1"><a class="header-anchor" href="#scmp-sys" aria-hidden="true">#</a> SCMP_SYS</h3>
<p>根据系统调用名获取系统调用号，虽然你可以直接使用 <code v-pre>__NR_syscall</code> 直接指定，但是为了跨平台最好使用它获取。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">SCMP_SYS</span><span class="token punctuation">(</span>syscall_name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="scmp-filter-ctx" tabindex="-1"><a class="header-anchor" href="#scmp-filter-ctx" aria-hidden="true">#</a> scmp_filter_ctx</h3>
<p>结构体定义</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">void</span> <span class="token operator">*</span> scmp_filter_ctx<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>seccmp的过滤器上下文，保存、传递了我们传入的系统调用过滤条件。</p>
<h3 id="seccomp-init" tabindex="-1"><a class="header-anchor" href="#seccomp-init" aria-hidden="true">#</a> seccomp_init</h3>
<ul>
<li>
<p>函数说明:
seccomp_init的作用就是初始化 scmp_filter_ctx结构。
需要注意的是，任何其他libseccomp中的函数调用，必须在seccomp_init之后。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>scmp_filter_ctx <span class="token function">seccomp_init</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> def_action<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>返回值
成功返回scmp_filter_ctx（过滤器上下文） ctx；
失败返回NULL</p>
</li>
<li>
<p>参数说明
def_action用于指定默认行为，有效动作值如下：（当线程调用了<code v-pre>seccomp</code>过滤规则中没有相关配置规则的系统调用时触发）</p>
<ul>
<li>SCMP_ACT_KILL
线程将会被内核以SIGSYS信号终止；</li>
<li>SCMP_ACT_KILL_PROCESS
整个进程被终止；</li>
<li>SCMP_ACT_TRAP
线程将会抛出一个SIGSYS信号；</li>
<li>SCMP_ACT_ERRNO(uint16_t errno)
线程调用与筛选规则匹配的系统调用时，它将收到一个errno的返回值；</li>
<li>SCMP_ACT_TRACE(uint16_t msg_num)
略</li>
<li>SCMP_ACT_LOG
不会对调用系统调用的线程产生任何影响，但系统调用会被记录到日志。</li>
<li>SCMP_ACT_ALLOW
不会对调用系统调用的线程产生任何影响。</li>
</ul>
</li>
</ul>
<h3 id="seccomp-rule-addxxx" tabindex="-1"><a class="header-anchor" href="#seccomp-rule-addxxx" aria-hidden="true">#</a> seccomp_rule_addXXX</h3>
<h4 id="函数说明" tabindex="-1"><a class="header-anchor" href="#函数说明" aria-hidden="true">#</a> 函数说明:</h4>
<p>这个函数组都会向当前seccomp过滤器添加新的过滤规则。</p>
<blockquote>
<p>调用应用程序提供的所有过滤器规则被组合成一个联合，并带有额外的逻辑来消除冗余的系统调用过滤器。
例如，如果添加了一条规则，该规则允许给定的系统调用具有一组特定的参数值，
然后又添加了一条规则，该规则允许相同的系统调用而不管参数值如何，
那么第一个更具体的规则将有效地从过滤器中删除第二个更通用的规则。</p>
</blockquote>
<h4 id="函数定义" tabindex="-1"><a class="header-anchor" href="#函数定义" aria-hidden="true">#</a> 函数定义</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">seccomp_rule_add</span><span class="token punctuation">(</span>scmp_filter_ctx ctx<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> action<span class="token punctuation">,</span>
                            <span class="token keyword">int</span> syscall<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg_cnt<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">seccomp_rule_add_exact</span><span class="token punctuation">(</span>scmp_filter_ctx ctx<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> action<span class="token punctuation">,</span>
                                  <span class="token keyword">int</span> syscall<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg_cnt<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">seccomp_rule_add_array</span><span class="token punctuation">(</span>scmp_filter_ctx ctx<span class="token punctuation">,</span>
                                  <span class="token class-name">uint32_t</span> action<span class="token punctuation">,</span> <span class="token keyword">int</span> syscall<span class="token punctuation">,</span>
                                  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg_cnt<span class="token punctuation">,</span>
                                  <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token operator">*</span>arg_array<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">seccomp_rule_add_exact_array</span><span class="token punctuation">(</span>scmp_filter_ctx ctx<span class="token punctuation">,</span>
                                        <span class="token class-name">uint32_t</span> action<span class="token punctuation">,</span> <span class="token keyword">int</span> syscall<span class="token punctuation">,</span>
                                        <span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg_cnt<span class="token punctuation">,</span>
                                        <span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token operator">*</span>arg_array<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="参数说明" tabindex="-1"><a class="header-anchor" href="#参数说明" aria-hidden="true">#</a> 参数说明</h4>
<ul>
<li>
<ol>
<li>action有效动作值如下：（当线程调用了<code v-pre>seccomp</code>过滤规则中有相关配置规则的系统调用时触发）</li>
</ol>
<ul>
<li>SCMP_ACT_KILL
线程将会被内核终止；</li>
<li>SCMP_ACT_KILL_PROCESS
整个进程被终止；</li>
<li>SCMP_ACT_TRAP
线程将会抛出一个SIGSYS信号；</li>
<li>SCMP_ACT_ERRNO(uint16_t errno)
线程调用与筛选规则匹配的系统调用时，它将收到一个errno的返回值；</li>
<li>SCMP_ACT_TRACE(uint16_t msg_num)
略</li>
<li>SCMP_ACT_LOG
会对调用系统调用的线程产生任何影响，但系统调用会被记录到日志。</li>
<li>SCMP_ACT_ALLOW
不会对调用系统调用的线程产生任何影响（也就是允许调用这个system call）。</li>
<li>SCMP_ACT_NOTIFY
略</li>
</ul>
</li>
<li>
<ol start="2">
<li>arg_cnt 指定规则配置的系统调用的参数的匹配情况的个数（因为后面是一个变长数组）</li>
</ol>
</li>
<li>
<ol start="3">
<li>边长数组的元素是 <code v-pre>scmp_arg_cmp</code> 结构体，定义如下。</li>
</ol>
</li>
</ul>
<p>系统调用的参数比较规则相关定义：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/**
 * Comparison operators
 */</span>
<span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> <span class="token punctuation">{</span>
	_SCMP_CMP_MIN <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
	SCMP_CMP_NE <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>		<span class="token comment">/**&lt; not equal */</span>
	SCMP_CMP_LT <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>		<span class="token comment">/**&lt; less than */</span>
	SCMP_CMP_LE <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span>		<span class="token comment">/**&lt; less than or equal */</span>
	SCMP_CMP_EQ <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span>		<span class="token comment">/**&lt; equal */</span>
	SCMP_CMP_GE <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span>		<span class="token comment">/**&lt; greater than or equal */</span>
	SCMP_CMP_GT <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">,</span>		<span class="token comment">/**&lt; greater than */</span>
	SCMP_CMP_MASKED_EQ <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">,</span>		<span class="token comment">/**&lt; masked equality */</span>
	_SCMP_CMP_MAX<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Argument datum
 */</span>
<span class="token keyword">typedef</span> <span class="token class-name">uint64_t</span> <span class="token class-name">scmp_datum_t</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Argument / Value comparison definition
 */</span>
<span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token punctuation">{</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg<span class="token punctuation">;</span>	<span class="token comment">/**&lt; argument number, starting at 0 */</span>
	<span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">;</span>	<span class="token comment">/**&lt; the comparison op, e.g. SCMP_CMP_* */</span>
	<span class="token class-name">scmp_datum_t</span> datum_a<span class="token punctuation">;</span>
	<span class="token class-name">scmp_datum_t</span> datum_b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有效比较操作值（ op ）如下：</p>
<ul>
<li>
<p>SCMP_CMP_NE
参数值不等于基准值时匹配，例如：
SCMP_CMP( arg , SCMP_CMP_NE , datum )</p>
</li>
<li>
<p>SCMP_CMP_LT
参数值小于基准值时匹配，例如：
SCMP_CMP( arg , SCMP_CMP_LT , datum )</p>
</li>
<li>
<p>SCMP_CMP_LE
参数值小于或等于基准值时匹配，例如：
SCMP_CMP( arg , SCMP_CMP_LE , datum )</p>
</li>
<li>
<p>SCMP_CMP_EQ
参数值等于基准值时匹配，例如：
SCMP_CMP( arg , SCMP_CMP_EQ , datum )</p>
</li>
<li>
<p>SCMP_CMP_GE
参数值大于或等于基准值时匹配，例如：
SCMP_CMP( arg , SCMP_CMP_GE , datum )</p>
</li>
<li>
<p>SCMP_CMP_GT
参数值大于基准值时匹配，例如：
SCMP_CMP( arg , SCMP_CMP_GT , datum )</p>
</li>
<li>
<p>SCMP_CMP_MASKED_EQ
当掩码参数值等于掩码基准值时匹配，例如：
SCMP_CMP( arg , SCMP_CMP_MASKED_EQ , mask , datum )</p>
</li>
</ul>
<p>注意，scmp_arg_cmp 此结构不能直接生成，需要调用它提供的宏生成，有如下宏：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_CMP</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg<span class="token punctuation">,</span>
                                    <span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A0</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A1</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A2</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A3</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A4</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A5</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_CMP64</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg<span class="token punctuation">,</span>
                                    <span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A0_64</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A1_64</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A2_64</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A3_64</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A4_64</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A5_64</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_CMP32</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg<span class="token punctuation">,</span>
                                    <span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A0_32</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A1_32</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A2_32</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A3_32</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A4_32</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">struct</span> <span class="token class-name">scmp_arg_cmp</span> <span class="token function">SCMP_A5_32</span><span class="token punctuation">(</span><span class="token keyword">enum</span> <span class="token class-name">scmp_compare</span> op<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释一下上面的这么多宏的功能分类依据，A{0-5}中的0、1、2、3、4、5用于指定系统调用的那个参数，
32还是64自然是指定32位机器还是64位机器，
SCMP_CMP的第一个参数<code v-pre>unsigned int arg</code>的功能就是<code v-pre>A{$arg_num}</code>中的<code v-pre>$arg_num</code>，
所有宏的第一个参数<code v-pre>op</code>就是用于指定比较的规则，如上已经介绍过。</p>
<h4 id="返回值" tabindex="-1"><a class="header-anchor" href="#返回值" aria-hidden="true">#</a> 返回值</h4>
<p>函数成功时返回零；
失败时返回负的errno值。</p>
<h4 id="举例" tabindex="-1"><a class="header-anchor" href="#举例" aria-hidden="true">#</a> 举例</h4>
<ol>
<li></li>
</ol>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">seccomp_rule_add</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> SCMP_ACT_ALLOW<span class="token punctuation">,</span> <span class="token function">SCMP_SYS</span><span class="token punctuation">(</span>open<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">SCMP_CMP</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> SCMP_CMP_MASKED_EQ<span class="token punctuation">,</span> O_WRONLY <span class="token operator">|</span> O_RDWR<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定<code v-pre>open(const *path, int oflags)</code>系统调用的<code v-pre>oflags</code>参数如果既没有O_WRONLY，也没有O_RDWR（二进制对应位），就是允许的，
换言之这条规则禁用掉了 open的 w、rw。</p>
<h3 id="seccomp-load" tabindex="-1"><a class="header-anchor" href="#seccomp-load" aria-hidden="true">#</a> seccomp_load</h3>
<ul>
<li>
<p>函数说明:
将ctx提供的seccomp过滤器加载到内核中；
如果函数成功，新的 seccomp 过滤器将在函数返回时处于活动状态</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">seccomp_load</span><span class="token punctuation">(</span>scmp_filter_ctx ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
成功时返回0，失败时返回以下错误码：
-ECANCELED
There was a system failure beyond the control of the
library.
-EFAULT
Internal libseccomp failure.
-EINVAL
Invalid input, either the context or architecture token is invalid.
-ENOMEM
The library was unable to allocate enough memory.
-ESRCH
Unable to load the filter due to thread issues.</li>
</ul>
<h3 id="seccomp-release-3" tabindex="-1"><a class="header-anchor" href="#seccomp-release-3" aria-hidden="true">#</a> seccomp_release(3)</h3>
<ul>
<li>
<p>函数说明:
释放ctx 中的 seccomp 过滤器结构的内存，该过滤器首先由seccomp_init(3)或seccomp_reset(3)初始化，
并释放与给定 seccomp 过滤器上下文关联的任何内存。
加载到内核中的任何 seccomp过滤器不受影响。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">seccomp_release</span><span class="token punctuation">(</span>scmp_filter_ctx ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h3>
<p><a href="https://www.kernel.org/doc/Documentation/prctl/seccomp_filter.txt" target="_blank" rel="noopener noreferrer">Secure Computing with filters<ExternalLinkIcon/></a>
<a href="https://man7.org/linux/man-pages/man3/seccomp_init.3.html" target="_blank" rel="noopener noreferrer">seccomp_init(3)<ExternalLinkIcon/></a>
<a href="https://man7.org/linux/man-pages/man3/seccomp_rule_add.3.html" target="_blank" rel="noopener noreferrer">seccomp_rule_add(3)<ExternalLinkIcon/></a>
<a href="https://man7.org/linux/man-pages/man3/seccomp_load.3.html" target="_blank" rel="noopener noreferrer">seccomp_load(3)<ExternalLinkIcon/></a>
<a href="https://man7.org/linux/man-pages/man3/seccomp_release.3.html" target="_blank" rel="noopener noreferrer">seccomp_release(3)<ExternalLinkIcon/></a></p>
<blockquote>
<p>参考链接</p>
<p><a href="https://zh.wikipedia.org/wiki/%E6%B2%99%E7%9B%92_(%E9%9B%BB%E8%85%A6%E5%AE%89%E5%85%A8)" target="_blank" rel="noopener noreferrer">沙箱安全<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


