<template><div><h1 id="安装sftp服务" tabindex="-1"><a class="header-anchor" href="#安装sftp服务" aria-hidden="true">#</a> 安装SFTP服务</h1>
<blockquote>
<p>sftp是Secure File Transfer Protocol的缩写，安全文件传送协议。可以为传输文件提供一种安全的网络的加密方法。<strong>sftp 与 ftp 有着几乎一样的语法和功能。<strong>SFTP 为 SSH的其中一部分，是一种传输档案至 Blogger 伺服器的安全方式。其实</strong>在SSH软件包中，已经包含了一个叫作SFTP(Secure File Transfer Protocol)的安全文件信息传输子系统</strong>。 <strong>SFTP本身没有单独的守护进程，它必须使用sshd守护进程（端口号默认是22）来完成相应的连接和答复操作，所以从某种意义上来说，SFTP并不像一个服务器程序，而更像是一个客户端程序。<strong>SFTP同样是使用加密传输认证信息和传输的数据，所以，使用SFTP是非常安全的。但是</strong>，由于这种传输方式使用了加密/解密技术，所以传输效率比普通的FTP要低得多</strong>，如果您对网络安全性要求更高时，可以使用SFTP代替FTP。</p>
</blockquote>
<p>Ubuntu默认只安装openssh-client，需要手动安装openssh-server或者sftp-server。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> openssh-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h1>
<p>在Ubuntu系统上开通sftp文件服务，允许某些用户上传及下载文件。</p>
<p>但是这些用户只能使用sftp传输文件，不能使用SSH终端访问服务器，并且sftp不能访问系统文件。</p>
<p>系统管理员则既能使用sftp传输文件，也能使用SSH远程管理服务器。</p>
<h1 id="操作步骤" tabindex="-1"><a class="header-anchor" href="#操作步骤" aria-hidden="true">#</a> 操作步骤</h1>
<h2 id="sftp用户、用户组的创建" tabindex="-1"><a class="header-anchor" href="#sftp用户、用户组的创建" aria-hidden="true">#</a> sftp用户、用户组的创建</h2>
<ul>
<li>添加sftp用户，创建 sftp 用户组</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> adduser alice
<span class="token function">sudo</span> addgroup sftp-users
<span class="token comment"># 将alice从所有其他用户组中移除并加入到sftp-users组，并且关闭其Shell访问</span>
<span class="token comment">#/bin/false也可以替换为/sbin/nologin，目的是不允许该用户登录到系统中</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-G</span> sftp-users <span class="token parameter variable">-s</span> /bin/false alice
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建sftp服务器的管理员身份，并且加入 ssh用户组（不限制他的shell操作权限）</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> adduser admin
<span class="token function">sudo</span> addgroup ssh-users
<span class="token comment"># -a 表示以追加形式将 admin 加入 ssh-users </span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-G</span> ssh-users admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建文件服务器目录" tabindex="-1"><a class="header-anchor" href="#创建文件服务器目录" aria-hidden="true">#</a> 创建文件服务器目录</h2>
<ul>
<li>创建服务器文件目录</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建监狱目录</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> /home/sftp_root
<span class="token comment"># 普通用户能够写入的共享文件目录</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> /home/sftp_root/shared
<span class="token comment"># 设置共享文件夹的拥有者为管理员、用户组为 sftp-users</span>
<span class="token function">sudo</span> <span class="token function">chown</span> admin:sftp-users /home/sftp_root/shared
<span class="token comment"># 拥有者、sftp用户组的成员具有一切权限</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">770</span> /home/sftp_root/shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认允许所有用户或者用户组登录，若仅允许指定用户或者用户组访问，按照以下格式配置。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 以空格间隔</span>
AllowUsers user1 user2 
AllowGroups group1 group2 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="权限配置" tabindex="-1"><a class="header-anchor" href="#权限配置" aria-hidden="true">#</a> 权限配置</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在sshd_config文件的最后，添加以下内容：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>AllowGroups ssh-users sftp-users
Match Group sftp-users
ChrootDirectory /home/sftp_root
AllowTcpForwarding no
X11Forwarding no
ForceCommand internal-sftp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样配置的目的是：</p>
<ul>
<li>
<p>只允许ssh-uers及sftp-users通过SSH访问系统，其中ssh-uers用户组可以使用ssh，并且不受其他限制。</p>
<p>而SFTP用户组仅能使用SFTP进行访问，且不能使用shell</p>
</li>
<li>
<p>针对sftp-users用户，额外增加一些设置：将“/home/sftp_root”设置为该组用户的系统根目录（因此它们将不能访问该目录之外的其他系统文件;</p>
</li>
<li>
<p>禁止TCP Forwarding和X11 Forwarding</p>
</li>
</ul>
<p>另外需要注意的是：<strong>ChrootDirectory的权限问题，你设定的目录必须是root用户所有</strong>，否则就会出现问题。所以请确保sftp用户根目录的所有人是root, 权限是 750 或者 755。</p>
<p>需要注意的一点的是，现在所有需要远程连接的用户都必须加入 ssh-users 才行。</p>
<p>如将用户 songyangji 加入 ，这样ta就可以使用ssh连接本机。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-G</span> ssh-users songyangji
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>限制ssh连接的访问IP</strong></li>
</ul>
<p>仍然是</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># Authentication:</span>
AllowUsers root@10.10.10.*        <span class="token comment">#限制root用户只能通过10.10.10.*网段登录访问</span>
AllowUsers charles@10.10.10.*        <span class="token comment">#限制charles用户只能通过10.10.10.*网段登录访问</span>
AllowUsers john@10.10.10.*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="重启ssh" tabindex="-1"><a class="header-anchor" href="#重启ssh" aria-hidden="true">#</a> 重启SSH</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 亦可</span>
<span class="token comment"># /etc/init.d/ssh restart</span>
<span class="token function">service</span> <span class="token function">ssh</span> restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考博客</p>
<p><a href="https://www.jianshu.com/p/6b588a712513" target="_blank" rel="noopener noreferrer">搭建sftp服务器<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


