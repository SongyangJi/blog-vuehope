<template><div><blockquote>
<p>默认情况下容器使用的资源是不受限制的。也就是可以使用主机内核调度器所允许的最大资源。但是在容器的使用过程中，经常需要对容器可以使用的主机资源进行限制，本文介绍如何限制容器可以使用的主机内存。</p>
</blockquote>
<h1 id="压测工具" tabindex="-1"><a class="header-anchor" href="#压测工具" aria-hidden="true">#</a> 压测工具</h1>
<p>使用ubuntu的<code v-pre>stress</code> 作为压测工具，并制作镜像</p>
<div class="language-docker line-numbers-mode" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:latest</span>

<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\</span>
        apt-get install stress</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>shell命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> u-stress:latest <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="为什么要限制容器对内存的使用" tabindex="-1"><a class="header-anchor" href="#为什么要限制容器对内存的使用" aria-hidden="true">#</a> 为什么要限制容器对内存的使用？</h1>
<p>限制容器不能过多的使用主机的内存是非常重要的。对于 linux 主机来说，一旦内核检测到没有足够的内存可以分配，就会扔出 OOME(Out Of Memmory Exception)，并开始杀死一些进程用于释放内存空间。糟糕的是任何进程都可能成为内核猎杀的对象，包括 docker daemon 和其它一些重要的程序。更危险的是如果某个支持系统运行的重要进程被干掉了，整个系统也就宕掉了！这里我们考虑一个比较常见的场景，大量的容器把主机的内存消耗殆尽，OOME 被触发后系统内核立即开始杀进程释放内存。如果内核杀死的第一个进程就是 docker daemon 会怎么样？结果是没有办法管理运行中的容器了，这是不能接受的！
针对这个问题，docker 尝试通过调整 docker daemon 的 OOM 优先级来进行缓解。内核在选择要杀死的进程时会对所有的进程打分，直接杀死得分最高的进程，接着是下一个。当 docker daemon 的 OOM 优先级被降低后(注意容器进程的 OOM 优先级并没有被调整)，docker daemon 进程的得分不仅会低于容器进程的得分，还会低于其它一些进程的得分。这样 docker daemon 进程就安全多了。</p>
<p>我们可以通过下面的脚本直观的看一下当前系统中所有进程的得分情况：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">number</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">proc</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">find</span> /proc <span class="token parameter variable">-maxdepth</span> <span class="token number">1</span> <span class="token parameter variable">-regex</span> <span class="token string">'/proc/[0-9]+'</span><span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">printf</span> <span class="token string">"%2d %5d %s<span class="token entity" title="\n">\n</span>"</span> <span class="token punctuation">\</span>
        <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> $proc/oom_score<span class="token variable">)</span></span>"</span> <span class="token punctuation">\</span>
        <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $proc<span class="token variable">)</span></span>"</span> <span class="token punctuation">\</span>
        <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> $proc/cmdline <span class="token operator">|</span> <span class="token function">tr</span> <span class="token string">'\0'</span> <span class="token string">' '</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-c</span> <span class="token number">50</span><span class="token variable">)</span></span>"</span>
<span class="token keyword">done</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-nr</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">$number</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此脚本输出得分最高的 40 个进程，并进行了排序：</p>
<figure><img src="@source/docs/Docker容器限制Memory-0.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>第一列显示进程的得分，mysqld 排到的第一名。显示为 node server.js 的都是容器进程，排名普遍比较靠前。红框中的是 docker daemon 进程，非常的靠后，都排到了 sshd 的后面。</p>
<p>有了上面的机制后是否就可以高枕无忧了呢！不是的，docker 的官方文档中一直强调这只是一种缓解的方案，并且为我们提供了一些降低风险的建议：</p>
<ul>
<li>通过测试掌握应用对内存的需求</li>
<li>保证运行容器的主机有充足的内存</li>
<li>限制容器可以使用的内存</li>
<li>为主机配置 swap</li>
</ul>
<p>其实就是说：通过限制容器使用的内存上限，可以降低主机内存耗尽时带来的各种风险。</p>
<h1 id="限制memory" tabindex="-1"><a class="header-anchor" href="#限制memory" aria-hidden="true">#</a> 限制Memory</h1>
<p>/Users/jisongyang/go/pkg/mod/github.com/docker/docker@v20.10.15+incompatible/api/types/container/host_config.go</p>
<h2 id="限制内存使用上限" tabindex="-1"><a class="header-anchor" href="#限制内存使用上限" aria-hidden="true">#</a> 限制内存使用上限</h2>
<p>使用<code v-pre>-m(--memory=)</code>可以限制容器使用的最大内存。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-m</span> 300M --memory-swap <span class="token parameter variable">-1</span> <span class="token parameter variable">--name</span> con1 u-stress /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的 stress 命令会创建一个进程并通过 malloc 函数分配内存：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>stress <span class="token parameter variable">--vm</span> <span class="token number">1</span> --vm-bytes 500M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过 docker stats 命令查看实际情况：
<img src="@source/docs/Docker容器限制Memory-1.png" alt="" loading="lazy"></p>
<p>上面的 docker run 命令中通过 -m 选项限制容器使用的内存上限为 300M。同时设置 memory-swap 值为 -1，它表示容器程序使用内存的受限，而可以使用的 swap 空间使用不受限制(宿主机有多少 swap 容器就可以使用多少)。
下面我们通过 top 命令来查看 stress 进程内存的实际情况：
<img src="@source/docs/Docker容器限制Memory-2.png" alt="" loading="lazy"></p>
<p>上面的截图中先通过 pgrep 命令查询 stress 命令相关的进程，进程号比较大的那个是用来消耗内存的进程，我们就查看它的内存信息。VIRT 是进程虚拟内存的大小，所以它应该是 500M。RES 为实际分配的物理内存数量，我们看到这个值就在 300M 上下浮动。看样子我们已经成功的限制了容器能够使用的物理内存数量。</p>
<h2 id="限制可用的-swap-大小" tabindex="-1"><a class="header-anchor" href="#限制可用的-swap-大小" aria-hidden="true">#</a> 限制可用的 swap 大小</h2>
<p>强调一下 --memory-swap 是必须要与 --memory 一起使用的。</p>
<p>正常情况下， --memory-swap 的值包含容器可用内存和可用 swap。所以 --memory=&quot;300m&quot; --memory-swap=&quot;1g&quot; 的含义为：
容器可以使用 300M 的物理内存，并且可以使用 700M(1G -300M) 的 swap。--memory-swap 是容器可以使用的物理内存和可以使用的 swap 之和。</p>
<p>把 --memory-swap 设置为 0 和不设置是一样的，此时如果设置了 --memory，容器可以使用的 swap 大小为 --memory 值的两倍。（也就是说缺省情况下swap空间刚好为1倍的memory）</p>
<p><strong>如果 --memory-swap 的值和 --memory 相同，则容器不能使用 swap</strong>。下面的 demo 演示了在没有 swap 可用的情况下向系统申请大量内存的场景：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">-m</span> 300M --memory-swap<span class="token operator">=</span>300M u-stress /bin/bash
<span class="token comment"># stress --vm 1 --vm-bytes 500M</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/docs/Docker容器限制Memory-3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>demo 中容器的物理内存被限制在 300M，但是进程却希望申请到 500M 的物理内存。在没有 swap 可用的情况下，进程直接被 OOM kill 了。如果有足够的 swap，程序至少还可以正常的运行。</p>
<p>我们可以通过 --oom-kill-disable 选项强行阻止 OOM kill 的发生，但是最好不要。</p>
<h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h1>
<p>通过限制容器可用的物理内存，可以避免容器内服务异常导致大量消耗主机内存的情况(此时让容器重启是较好的策略)，因此可以降低主机内存被耗尽带来的风险。</p>
<p>https://sanhe-dev-exp-share.readthedocs.io/03-Docker/03-Restrict-CPU-Memory-and-GPU/README.html</p>
</div></template>


