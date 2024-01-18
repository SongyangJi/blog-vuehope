<template><div><blockquote>
<p>我们知道， Docker 是使用 Linux 的 Namespace 技术实现各种资源隔离的。那么究竟什么是 Namespace，各种 Namespace 都有什么作用，为什么 Docker 需要 Namespace呢？</p>
</blockquote>
<h1 id="什么是-namespace" tabindex="-1"><a class="header-anchor" href="#什么是-namespace" aria-hidden="true">#</a> 什么是 Namespace？</h1>
<p><code v-pre>Linux Namespace</code> 是 Linux 提供的一种内核级别环境隔离的方法。用官方的话来说，Linux Namespace 将全局系统资源封装在一个抽象中，从而使 namespace 内的进程认为自己具有独立的资源实例。这项技术本来没有掀起多大的波澜，是容器技术的崛起让他重新引起了大家的注意。</p>
<p>Linux Namespace 有如下 6 个种类：</p>
<table>
<thead>
<tr>
<th><strong>分类</strong></th>
<th><strong>系统调用参数</strong></th>
<th><strong>相关内核版本</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>Mount namespaces</td>
<td>CLONE_NEWNS</td>
<td><a href="https://link.segmentfault.com/?enc=%2BUZjUSHsFnVMyxdIRI1AGg%3D%3D.gjeALggXOGhl4I%2FK6t%2FPu631zlrDabPYtH1Thy9PM6sQrfTxhZC7kHt%2BChNg3UwF" target="_blank" rel="noopener noreferrer">Linux 2.4.19<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>UTS namespaces</td>
<td>CLONE_NEWUTS</td>
<td><a href="https://link.segmentfault.com/?enc=UMCIjnpsL9NzRflD2ekSlw%3D%3D.JUrNrso34Pdfy7WehLf8IbcdnOLCax6hnFPVZTIfm44%3D" target="_blank" rel="noopener noreferrer">Linux 2.6.19<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>IPC namespaces</td>
<td>CLONE_NEWIPC</td>
<td><a href="https://link.segmentfault.com/?enc=mVHsSGWBKT%2F8S8FsszpQNg%3D%3D.eMt8rtHaduUCEFo0KkpSywYvUBa1M0c6L%2F1vPeVf7Fg%3D" target="_blank" rel="noopener noreferrer">Linux 2.6.19<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>PID namespaces</td>
<td>CLONE_NEWPID</td>
<td><a href="https://link.segmentfault.com/?enc=jYUd3r2qkaHvuIuS45YcNA%3D%3D.F%2BFbhTmnrxXQ9og%2BjZ6YeUvF4OCSW%2BlbZh3QRIBW2qE%3D" target="_blank" rel="noopener noreferrer">Linux 2.6.24<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Network namespaces</td>
<td>CLONE_NEWNET</td>
<td><a href="https://link.segmentfault.com/?enc=B8NyDjpAtiUsjd4TxzKOFw%3D%3D.mlMGKdt%2FsGvRRyFOFDguy%2FXwnvgxyz8qGKBfpboNVO4%3D" target="_blank" rel="noopener noreferrer">始于Linux 2.6.24 完成于 Linux 2.6.29<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>User namespaces</td>
<td>CLONE_NEWUSER</td>
<td><a href="https://link.segmentfault.com/?enc=5AgrP7X98up%2Fuyck268Z9w%3D%3D.Iem7g4brwXF4ER%2BOhdjlTQLCWYQSqFcei5K3MT5e9pA%3D" target="_blank" rel="noopener noreferrer">始于 Linux 2.6.23 完成于 Linux 3.8<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<p><strong>namespace 的 API 由三个系统调用和一系列 <code v-pre>/proc</code> 文件组成</strong>。</p>
<p>本文将会详细介绍这些系统调用和 <code v-pre>/proc</code> 文件。为了指定要操作的 namespace 类型，需要在系统调用的 flag 中通过常量 <code v-pre>CLONE_NEW*</code> 指定（包括 <code v-pre>CLONE_NEWIPC</code>，<code v-pre>CLONE_NEWNS</code>， <code v-pre>CLONE_NEWNET</code>，<code v-pre>CLONE_NEWPID</code>，<code v-pre>CLONE_NEWUSER</code> 和 `CLONE_NEWUTS），可以指定多个常量，通过 <strong>|</strong>（位或）操作来实现。</p>
<p>简单描述一下三个系统调用的功能：</p>
<ul>
<li><strong>clone()</strong> : 实现线程的系统调用，用来创建一个新的进程，并可以通过设计上述系统调用参数达到隔离的目的。</li>
<li><strong>unshare()</strong> : 使某进程脱离某个 namespace。</li>
<li><strong>setns()</strong> : 把某进程加入到某个 namespace。</li>
</ul>
<p>具体的实现原理请往下看。</p>
<h1 id="各种-namespace-的作用" tabindex="-1"><a class="header-anchor" href="#各种-namespace-的作用" aria-hidden="true">#</a> 各种 Namespace 的作用？</h1>
<h2 id="mount-namespace" tabindex="-1"><a class="header-anchor" href="#mount-namespace" aria-hidden="true">#</a> Mount Namespace</h2>
<p>Mount Namespace 是 Linux 内核实现的第一个 Namespace，从内核的 2.4.19 版本开始加入。它可以用来隔离不同的进程或进程组看到的挂载点。通俗地说，就是可以实现在不同的进程中看到不同的挂载目录。使用 Mount Namespace 可以实现容器内只能看到自己的挂载信息，在容器内的挂载操作不会影响主机的挂载目录。</p>
<h2 id="pid-namespace" tabindex="-1"><a class="header-anchor" href="#pid-namespace" aria-hidden="true">#</a> PID Namespace</h2>
<p>PID Namespace 的作用是用来隔离进程。在不同的 PID Namespace 中，进程可以拥有相同的 PID 号，利用 PID Namespace 可以实现每个容器的主进程为 1 号进程，而容器内的进程在主机上却拥有不同的PID。例如一个进程在主机上 PID 为 122，使用 PID Namespace 可以实现该进程在容器内看到的 PID 为 1。</p>
<p>下面我们通过一个实例来演示下 PID Namespace的作用。首先我们使用以下命令创建一个 bash 进程，并且新建一个 PID Namespace：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ sudo unshare --pid --fork --mount-proc /bin/bash

[root@centos7 centos]#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行完上述命令后，我们在主机上创建了一个新的 PID Namespace，并且当前命令行窗口加入了新创建的 PID Namespace。在当前的命令行窗口使用 ps aux 命令查看一下进程信息：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>[root@centos7 centos]# ps aux

USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND

root         1  0.0  0.0 115544  2004 pts/0    S    10:57   0:00 bash

root        10  0.0  0.0 155444  1764 pts/0    R+   10:59   0:00 ps aux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述命令输出结果可以看到当前 Namespace 下 bash 为 1 号进程，而且我们也看不到主机上的其他进程信息。</p>
<h2 id="uts-namespace" tabindex="-1"><a class="header-anchor" href="#uts-namespace" aria-hidden="true">#</a> UTS Namespace</h2>
<p>UTS Namespace 主要是用来隔离主机名的，它允许每个 UTS Namespace 拥有一个独立的主机名。例如我们的主机名称为 docker，使用 UTS Namespace 可以实现在容器内的主机名称为 lagoudocker 或者其他任意自定义主机名。</p>
<p>同样我们通过一个实例来验证下 UTS Namespace 的作用，首先我们使用 unshare 命令来创建一个 UTS Namespace：</p>
<div class="language-perl line-numbers-mode" data-ext="perl"><pre v-pre class="language-perl"><code>$ sudo unshare <span class="token operator">--</span>uts <span class="token operator">--</span>fork <span class="token operator">/</span>bin<span class="token operator">/</span>bash

<span class="token punctuation">[</span>root<span class="token variable">@centos7</span> centos<span class="token punctuation">]</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建好 UTS Namespace 后，当前命令行窗口已经处于一个独立的 UTS Namespace 中，下面我们使用 hostname 命令（hostname 可以用来查看主机名称）设置一下主机名：</p>
<div class="language-perl line-numbers-mode" data-ext="perl"><pre v-pre class="language-perl"><code>root<span class="token variable">@centos7</span> centos<span class="token punctuation">]</span><span class="token comment"># hostname -b lagoudocker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后再查看一下主机名：</p>
<div class="language-csharp line-numbers-mode" data-ext="cs"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span>root<span class="token class-name">@centos7</span> centos<span class="token punctuation">]</span># hostname

lagoudocker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面命令的输出，我们可以看到当前UTS Namespace 内的主机名已经被修改为 lagoudocker。然后我们新打开一个命令行窗口，使用相同的命令查看一下主机的 hostname：</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token punctuation">[</span>centos<span class="token variable">@centos7</span> <span class="token operator">~</span><span class="token punctuation">]</span>$ hostname

centos7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到主机的名称仍然为 centos7，并没有被修改。由此，可以验证 UTS Namespace 可以用来隔离主机名。</p>
<h2 id="ipc-namespace" tabindex="-1"><a class="header-anchor" href="#ipc-namespace" aria-hidden="true">#</a> IPC Namespace</h2>
<p>IPC Namespace 主要是用来隔离进程间通信的。例如 PID Namespace 和 IPC Namespace 一起使用可以实现同一 IPC Namespace 内的进程彼此可以通信，不同 IPC Namespace 的进程却不能通信。</p>
<p>同样我们通过一个实例来验证下IPC Namespace的作用，首先我们使用 unshare 命令来创建一个 IPC Namespace：</p>
<div class="language-perl line-numbers-mode" data-ext="perl"><pre v-pre class="language-perl"><code>$ sudo unshare <span class="token operator">--</span>ipc <span class="token operator">--</span>fork <span class="token operator">/</span>bin<span class="token operator">/</span>bash

<span class="token punctuation">[</span>root<span class="token variable">@centos7</span> centos<span class="token punctuation">]</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们需要借助两个命令来实现对 IPC Namespace 的验证。</p>
<ul>
<li>ipcs -q 命令：用来查看系统间通信队列列表。</li>
<li>ipcmk -Q 命令：用来创建系统间通信队列。</li>
</ul>
<p>我们首先使用 ipcs -q 命令查看一下当前 IPC Namespace 下的系统通信队列列表：</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token punctuation">[</span>centos<span class="token variable">@centos7</span> <span class="token operator">~</span><span class="token punctuation">]</span>$ ipcs <span class="token operator">-</span>q

<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span> Message Queues <span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>

key        msqid      owner      perms      used<span class="token operator">-</span>bytes   messages
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由上可以看到当前无任何系统通信队列，然后我们使用 ipcmk -Q 命令创建一个系统通信队列：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@centos7 centos<span class="token punctuation">]</span><span class="token comment"># ipcmk -Q</span>

Message queue id: <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次使用 ipcs -q 命令查看当前 IPC Namespace 下的系统通信队列列表：</p>
<div class="language-csharp line-numbers-mode" data-ext="cs"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span>root<span class="token class-name">@centos7</span> centos<span class="token punctuation">]</span># ipcs <span class="token operator">-</span>q

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> Message Queues <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>

key        msqid      owner      perms      used<span class="token operator">-</span>bytes   messages

<span class="token number">0x73682a32</span> <span class="token number">0</span>          root       <span class="token number">644</span>        <span class="token number">0</span>            <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到我们已经成功创建了一个系统通信队列。然后我们新打开一个命令行窗口，使用ipcs -q 命令查看一下主机的系统通信队列：</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token punctuation">[</span>centos<span class="token variable">@centos7</span> <span class="token operator">~</span><span class="token punctuation">]</span>$ ipcs <span class="token operator">-</span>q

<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span> Message Queues <span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>

key        msqid      owner      perms      used<span class="token operator">-</span>bytes   messages
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的实验，可以发现，在单独的 IPC Namespace 内创建的系统通信队列在主机上无法看到。即 IPC Namespace 实现了系统通信队列的隔离。</p>
<h2 id="user-namespace" tabindex="-1"><a class="header-anchor" href="#user-namespace" aria-hidden="true">#</a> User Namespace</h2>
<p>User Namespace 主要是用来隔离用户和用户组的。一个比较典型的应用场景就是在主机上以非 root 用户运行的进程可以在一个单独的 User Namespace 中映射成 root 用户。使用 User Namespace 可以实现进程在容器内拥有 root 权限，而在主机上却只是普通用户。</p>
<p>User Namesapce 的创建是可以不使用 root 权限的。下面我们以普通用户的身份创建一个 User Namespace，命令如下：</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token punctuation">[</span>centos<span class="token variable">@centos7</span> <span class="token operator">~</span><span class="token punctuation">]</span>$ unshare <span class="token operator">-</span><span class="token operator">-</span>user <span class="token operator">-</span>r <span class="token operator">/</span>bin<span class="token operator">/</span>bash

<span class="token punctuation">[</span>root<span class="token variable">@centos7</span> <span class="token operator">~</span><span class="token punctuation">]</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>CentOS7 默认允许创建的 User Namespace 为 0，如果执行上述命令失败（ unshare 命令返回的错误为 unshare: unshare failed: Invalid argument ），需要使用以下命令修改系统允许创建的 User Namespace 数量，命令为：echo 65535 &gt; /proc/sys/user/max_user_namespaces，然后再次尝试创建 User Namespace。</p>
</blockquote>
<p>然后执行 id 命令查看一下当前的用户信息：</p>
<div class="language-ini line-numbers-mode" data-ext="ini"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">root@centos7 ~</span><span class="token punctuation">]</span></span># id

<span class="token key attr-name">uid</span><span class="token punctuation">=</span><span class="token value attr-value">0(root) gid=0(root) groups=0(root),65534(nfsnobody) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的输出可以看到我们在新的 User Namespace 内已经是 root 用户了。下面我们使用只有主机 root 用户才可以执行的 reboot 命令来验证一下，在当前命令行窗口执行 reboot 命令：</p>
<div class="language-csharp line-numbers-mode" data-ext="cs"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span>root@centos7 <span class="token operator">~</span><span class="token punctuation">]</span># reboot

Failed to open <span class="token operator">/</span>dev<span class="token operator">/</span>initctl<span class="token punctuation">:</span> Permission denied

Failed to talk to init daemon<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们在新创建的 User Namespace 内虽然是 root 用户，但是并没有权限执行 reboot 命令。这说明在隔离的 User Namespace 中，并不能获取到主机的 root 权限，也就是说 User Namespace 实现了用户和用户组的隔离。</p>
<h2 id="net-namespace" tabindex="-1"><a class="header-anchor" href="#net-namespace" aria-hidden="true">#</a> Net Namespace</h2>
<p>Net Namespace 是用来隔离网络设备、IP 地址和端口等信息的。Net Namespace 可以让每个进程拥有自己独立的 IP 地址，端口和网卡信息。例如主机 IP 地址为 172.16.4.1 ，容器内可以设置独立的 IP 地址为 192.168.1.1。</p>
<p>同样用实例验证，我们首先使用 ip a 命令查看一下主机上的网络信息：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>$ ip a

<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK<span class="token punctuation">,</span>UP<span class="token punctuation">,</span>LOWER_UP<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN <span class="token keyword">group</span> <span class="token keyword">default</span> qlen <span class="token number">1000</span>

    link<span class="token operator">/</span>loopback <span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span> brd <span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span>:<span class="token number">00</span>

    inet <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">/</span><span class="token number">8</span> scope host lo

       valid_lft forever preferred_lft forever

    inet6 ::<span class="token number">1</span><span class="token operator">/</span><span class="token number">128</span> scope host

       valid_lft forever preferred_lft forever

<span class="token number">2</span>: eth0: <span class="token operator">&lt;</span>BROADCAST<span class="token punctuation">,</span>MULTICAST<span class="token punctuation">,</span>UP<span class="token punctuation">,</span>LOWER_UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc pfifo_fast state UP <span class="token keyword">group</span> <span class="token keyword">default</span> qlen <span class="token number">1000</span>

    link<span class="token operator">/</span>ether <span class="token number">02</span>:<span class="token number">11</span>:b0:<span class="token number">14</span>:<span class="token number">01</span>:<span class="token number">0</span>c brd ff:ff:ff:ff:ff:ff

    inet <span class="token number">172.20</span><span class="token number">.1</span><span class="token number">.11</span><span class="token operator">/</span><span class="token number">24</span> brd <span class="token number">172.20</span><span class="token number">.1</span><span class="token number">.255</span> scope <span class="token keyword">global</span> dynamic eth0

       valid_lft <span class="token number">86063337</span>sec preferred_lft <span class="token number">86063337</span>sec

    inet6 fe80::<span class="token number">11</span>:b0ff:fe14:<span class="token number">10</span>c<span class="token operator">/</span><span class="token number">64</span> scope link

       valid_lft forever preferred_lft forever

<span class="token number">3</span>: docker0: <span class="token operator">&lt;</span><span class="token keyword">NO</span><span class="token operator">-</span>CARRIER<span class="token punctuation">,</span>BROADCAST<span class="token punctuation">,</span>MULTICAST<span class="token punctuation">,</span>UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noqueue state DOWN <span class="token keyword">group</span> <span class="token keyword">default</span>

    link<span class="token operator">/</span>ether <span class="token number">02</span>:<span class="token number">42</span>:<span class="token number">82</span>:<span class="token number">8</span>d:a0:df brd ff:ff:ff:ff:ff:ff

    inet <span class="token number">172.17</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">/</span><span class="token number">16</span> scope <span class="token keyword">global</span> docker0

       valid_lft forever preferred_lft forever

    inet6 fe80::<span class="token number">42</span>:<span class="token number">82</span>ff:fe8d:a0df<span class="token operator">/</span><span class="token number">64</span> scope link

       valid_lft forever preferred_lft forever
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们使用以下命令创建一个 Net Namespace：</p>
<div class="language-perl line-numbers-mode" data-ext="perl"><pre v-pre class="language-perl"><code>$ sudo unshare <span class="token operator">--</span>net <span class="token operator">--</span>fork <span class="token operator">/</span>bin<span class="token operator">/</span>bash

<span class="token punctuation">[</span>root<span class="token variable">@centos7</span> centos<span class="token punctuation">]</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的我们使用 ip a 命令查看一下网络信息：</p>
<div class="language-csharp line-numbers-mode" data-ext="cs"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span>root<span class="token class-name">@centos7</span> centos<span class="token punctuation">]</span># ip a

<span class="token number">1</span><span class="token punctuation">:</span> lo<span class="token punctuation">:</span> <span class="token operator">&lt;</span>LOOPBACK<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noop state DOWN <span class="token keyword">group</span> <span class="token keyword">default</span> qlen <span class="token number">1000</span>

    link<span class="token operator">/</span>loopback <span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> brd <span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，宿主机上有 lo、eth0、docker0 等网络设备，而我们新建的 Net Namespace 内则与主机上的网络设备不同。</p>
<h1 id="为什么-docker-需要-namespace" tabindex="-1"><a class="header-anchor" href="#为什么-docker-需要-namespace" aria-hidden="true">#</a> 为什么 Docker 需要 Namespace？</h1>
<p>Linux 内核从 2002 年 2.4.19 版本开始加入了 Mount Namespace，而直到内核 3.8 版本加入了 User Namespace 才为容器提供了足够的支持功能。</p>
<p>当 Docker 新建一个容器时， 它会创建这六种 Namespace，然后将容器中的进程加入这些 Namespace 之中，使得 Docker 容器中的进程只能看到当前 Namespace 中的系统资源。</p>
<p>正是由于 Docker 使用了 Linux 的这些 Namespace 技术，才实现了 Docker 容器的隔离，可以说没有 Namespace，就没有 Docker 容器。</p>
</div></template>


