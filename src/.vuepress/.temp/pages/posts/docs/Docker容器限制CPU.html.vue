<template><div><h1 id="压测工具" tabindex="-1"><a class="header-anchor" href="#压测工具" aria-hidden="true">#</a> 压测工具</h1>
<p>使用ubuntu的<code v-pre>stress</code> 作为压测工具，并制作镜像</p>
<div class="language-docker line-numbers-mode" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:latest</span>

<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\</span>
        apt-get install stress</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>shell命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> u-stress:latest <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="限制cpu资源" tabindex="-1"><a class="header-anchor" href="#限制cpu资源" aria-hidden="true">#</a> 限制CPU资源</h1>
<h2 id="限制cpu核心个数-百分比" tabindex="-1"><a class="header-anchor" href="#限制cpu核心个数-百分比" aria-hidden="true">#</a> 限制CPU核心个数（百分比）</h2>
<p>在 docker 1.13 及更高的版本上，能够很容易的限制容器可以使用的主机 CPU 核心个数。
只需要通过 --cpus 选项指定容器可以使用的 CPU 个数就可以了，并且还可以指定如 1.5 之类的小数。（为什么还可以是小数呢，后面解释）</p>
<p>通过下面的命令创建容器，--cpus=2 表示容器最多可以使用主机上两个 CPU：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">--cpus</span><span class="token operator">=</span><span class="token number">2</span> u-stress:latest /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后由 stress 命令创建四个繁忙的进程消耗 CPU 资源：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>stress <span class="token parameter variable">-c</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用<code v-pre>docker stats</code>查看容状态，发现容器 CPU 的负载为 200%左右，它的含义为单个 CPU 负载的两倍。我们也可以把它理解为有两颗 CPU核心在 100% 的为它工作。</p>
<p>再让我们通过 top 命令看看主机 CPU 的真实负载情况：</p>
<figure><img src="@source/posts/docs/Docker容器限制CPU-0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>实际的情况并不是两个 CPU 负载 100%，而另外两个负载 0%。四个 CPU 的负载都是 50%，加起来容器消耗的 CPU 总量就是两个 CPU 100% 的负载。</p>
<p><strong>所以对于进程来说是没有 CPU 个数这一概念的</strong>，内核只能通过进程消耗的 CPU 时间片来统计出进程占用 CPU 的百分比。这也是我们看到的各种工具中都使用百分比来说明 CPU 使用率的原因。
并且 --cpus 选项支持设为小数也从侧面说明了对 CPU 的计量只能是百分比。</p>
<h2 id="指定固定的-cpu集" tabindex="-1"><a class="header-anchor" href="#指定固定的-cpu集" aria-hidden="true">#</a> 指定固定的 CPU集</h2>
<p>通过 --cpus 选项我们无法让容器始终在一个或某几个 CPU 上运行，但是通过<code v-pre>--cpuset-cpus</code> 选项却可以做到！这是非常有意义的，因为现在的多核系统中每个核心都有自己的缓存，如果频繁的调度进程在不同的核心上执行势必会带来缓存失效等开销。下面我们就演示如何设置容器使用固定的 CPU，下面的命令为容器设置了 --cpuset-cpus 选项，指定运行容器的 CPU 编号为 1：(编号从0开始)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> --cpuset-cpus<span class="token operator">=</span><span class="token string">"1"</span> u-stress:latest /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再启动压力测试命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>stress <span class="token parameter variable">-c</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后查看主机 CPU 的负载情况：</p>
<figure><img src="@source/posts/docs/Docker容器限制CPU-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>这次只有 Cpu1 达到了 100%，其它的 CPU 并未被容器使用。我们还可以反复的执行 stress -c 4 命令，但是始终都是 Cpu1 在干活。
再看看容器的 CPU 负载，也是只有 100%：</p>
<figure><img src="@source/posts/docs/Docker容器限制CPU-2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>-cpuset-cpus 选项还可以一次指定多个 CPU：
比如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> --cpuset-cpus<span class="token operator">=</span><span class="token string">"1,3"</span> u-stress:latest /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>--cpuset-cpus 选项的一个缺点是必须指定 CPU 在操作系统中的编号，这对于动态调度的环境(无法预测容器会在哪些主机上运行，只能通过程序动态的检测系统中的 CPU 编号，并生成 docker run 命令)会带来一些不便。</p>
<h2 id="设置使用-cpu-的权重" tabindex="-1"><a class="header-anchor" href="#设置使用-cpu-的权重" aria-hidden="true">#</a> 设置使用 CPU 的权重</h2>
<p>当 CPU 资源充足时，设置 CPU 的权重是没有意义的。只有在容器争用 CPU 资源的情况下， CPU 的权重才能让不同的容器分到不同的 CPU 用量。--cpu-shares 选项用来设置 CPU 权重，它的默认值为 1024。我们可以把它设置为 2 表示很低的权重，但是设置为 0 表示使用默认值 1024。
下面我们分别运行两个容器，指定它们都使用 Cpu0，并分别设置 --cpu-shares 为 512 和 1024：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> --cpuset-cpus<span class="token operator">=</span><span class="token string">"0"</span> --cpu-shares<span class="token operator">=</span><span class="token number">512</span> u-stress:latest /bin/bash
$ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> --cpuset-cpus<span class="token operator">=</span><span class="token string">"0"</span> --cpu-shares<span class="token operator">=</span><span class="token number">1024</span> u-stress:latest /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在两个容器中都运行 stress -c 4 命令。</p>
<p>此时主机 Cpu0 的负载为 100%：</p>
<figure><img src="@source/posts/docs/Docker容器限制CPU-3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>容器中 CPU 的负载为：</p>
<figure><img src="@source/posts/docs/Docker容器限制CPU-4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>两个容器分享一个 CPU，所以总量应该是 100%。具体每个容器分得的负载则取决于 --cpu-shares 选项的设置！我们的设置分别是 512 和 1024，则它们分得的比例为 1:2。在本例中如果想让两个容器各占 50%，只要把 --cpu-shares 选项设为相同的值就可以了。</p>
<p>参考：</p>
<p>https://sanhe-dev-exp-share.readthedocs.io/03-Docker/03-Restrict-CPU-Memory-and-GPU/README.html</p>
</div></template>


