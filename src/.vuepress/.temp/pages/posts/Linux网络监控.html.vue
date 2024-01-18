<template><div><h1 id="netstat" tabindex="-1"><a class="header-anchor" href="#netstat" aria-hidden="true">#</a> netstat</h1>
<p>在linux一般使用netstat 来查看系统端口使用情况步。     netstat命令是一个监控TCP/IP网络的非常有用的工具，它可以显示路由表、实际的网络连接以及每一个网络接口设备的。</p>
<p><strong>netstat</strong>命令的功能是<strong>显示网络连接、路由表和网络接口信息</strong>，可以让用户得知目前都有<strong>哪些网络连接正在运作</strong>。</p>
<p>该命令的一般格式为：</p>
<p>netstat [选项]</p>
<p>命令中各选项的含义如下：</p>
<p>-a 显示所有socket，包括正在监听的。</p>
<p>-c 每隔1秒就重新显示一遍，直到用户中断它。</p>
<p>-i 显示所有网络接口的信息，格式同“ifconfig -e”。</p>
<p>-n <strong>以网络IP地址代替名称</strong>，显示出网络连接情形。</p>
<p>-r 显示核心路由表，格式同“route -e”。</p>
<p>-t 显示TCP协议的连接情况。</p>
<p>-u 显示UDP协议的连接情况。</p>
<p>-v 显示正在进行的工作。</p>
<p>-p：显示 PID 和程序名；</p>
<h3 id="关键列解释" tabindex="-1"><a class="header-anchor" href="#关键列解释" aria-hidden="true">#</a> <strong>关键列解释:</strong></h3>
<ul>
<li>Proto 表示协议类型</li>
<li>LocalAddress 表示本地地址</li>
<li>ForeignAddress 表示对端地址</li>
<li>State 表示状态(对于 TCP 有效, UDP 没有状态概念)</li>
<li>PID/Program name 表示对应的进程id和进程名</li>
</ul>
<p>然后用筛选拿到想要的信息。</p>
<p>常用的组合：</p>
<ol>
<li><strong>查看进程名为firefox的连接</strong></li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>netstat -anp | grep firefox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li><strong>查看111端口被那个进程调用</strong></li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>netstat -anp | grep 111
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><strong>根据连接状态查询</strong></li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>netstat -an | grep LISTEN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这些状态中，我们最常用的就是 LISTEN 和 ESTABLISHED 状态，一种代表正在监听，另一种代表已经连接。</p>
<blockquote>
<p>https://www.oschina.net/translate/10-basic-linux-networking-and-monitoring?print</p>
</blockquote>
</div></template>


