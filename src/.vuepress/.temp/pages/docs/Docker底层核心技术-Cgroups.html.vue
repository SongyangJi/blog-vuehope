<template><div><blockquote>
<p>我们知道使用不同的 Namespace，可以实现容器中的进程看不到别的容器的资源，但是有一个问题你是否注意到？容器内的进程仍然可以任意地使用主机的 CPU 、内存等资源，如果某一个容器使用的主机资源过多，可能导致主机的资源竞争，进而影响业务。那如果我们想限制一个容器资源的使用（如 CPU、内存等）应该如何做呢？</p>
</blockquote>
<p>这里就需要用到 Linux 内核的另一个核心技术cgroups。那么究竟什么是cgroups？我们应该如何使用cgroups？Docker 又是如何使用cgroups的？</p>
<h1 id="cgroups" tabindex="-1"><a class="header-anchor" href="#cgroups" aria-hidden="true">#</a> cgroups</h1>
<p>cgroups（全称：control groups）是 Linux 内核的一个功能，它可以实现限制进程或者进程组的资源（如 CPU、内存、磁盘 IO 等）。</p>
<blockquote>
<p>在 2006 年，Google 的工程师（ Rohit Seth 和 Paul Menage 为主要发起人） 发起了这个项目，起初项目名称并不是cgroups，而被称为进程容器（process containers）。在 2007 年cgroups代码计划合入Linux 内核，但是当时在 Linux 内核中，容器（container）这个词被广泛使用，并且拥有不同的含义。为了避免命名混乱和歧义，进程容器被重名为cgroups，并在 2008 年成功合入 Linux 2.6.24 版本中。cgroups目前已经成为 systemd、Docker、Linux Containers（LXC） 等技术的基础。</p>
</blockquote>
<p>cgroups 主要提供了如下功能。</p>
<ul>
<li>资源限制： 限制资源的使用量，例如我们可以通过限制某个业务的内存上限，从而保护主机其他业务的安全运行。</li>
<li><strong>优先级控制</strong>：不同的组可以有不同的资源（ CPU 、磁盘 IO 等）使用优先级。</li>
<li>审计：计算控制组的资源使用情况。（实时吗？）</li>
<li><strong>控制：控制进程的挂起或恢复。</strong></li>
</ul>
<p>了解了 cgroups 可以为我们提供什么功能，下面我来看下 cgroups 是如何实现这些功能的。</p>
<p>cgroups功能的实现依赖于三个核心概念：子系统、控制组、层级树。</p>
<ul>
<li>子系统（subsystem）：<strong>是一个内核的组件，一个子系统代表一类资源调度控制器</strong>。例如内存子系统可以限制内存的使用量，CPU 子系统可以限制 CPU 的使用时间。</li>
<li>控制组（cgroup）：表示一组进程和一组带有参数的子系统的关联关系。例如，一个进程使用了 CPU 子系统来限制 CPU 的使用时间，则这个进程和 CPU 子系统的关联关系称为控制组。</li>
<li>层级树（hierarchy）：是由一系列的控制组按照树状结构排列组成的。这种排列方式可以使得控制组拥有父子关系，子控制组默认拥有父控制组的属性，也就是子控制组会继承于父控制组。比如，系统中定义了一个控制组 c1，限制了 CPU 可以使用 1 核，然后另外一个控制组 c2 想实现既限制 CPU 使用 1 核，同时限制内存使用 2G，那么 c2 就可以直接继承 c1，无须重复定义 CPU 限制。</li>
</ul>
<p><strong>cgroups 的三个核心概念中，子系统是最核心的概念，因为子系统是真正实现某类资源的限制的基础。</strong></p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2>
<p>本课时我们讲解了什么是 cgroups，以及 cgroups 可以为我们提供哪些核心功能。其实 cgroups 不仅可以实现资源的限制，还可以为我们统计资源的使用情况，容器监控系统的数据来源也是 cgroups 提供的。</p>
<p>另外，请注意 cgroups 虽然可以实现资源的限制，但是不能保证资源的使用。例如，cgroups 限制某个容器最多使用 1 核 CPU，但不保证总是能使用到 1 核 CPU，当 CPU 资源发生竞争时，可能会导致实际使用的 CPU 资源产生竞争。</p>
<blockquote>
<p>参考文章https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/%E7%94%B1%E6%B5%85%E5%85%A5%E6%B7%B1%E5%90%83%E9%80%8F%20Docker-%E5%AE%8C/10%20%20%E8%B5%84%E6%BA%90%E9%99%90%E5%88%B6%EF%BC%9A%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87%20Cgroups%20%E6%9C%BA%E5%88%B6%E5%AE%9E%E7%8E%B0%E8%B5%84%E6%BA%90%E9%99%90%E5%88%B6%EF%BC%9F.md</p>
</blockquote>
</div></template>


