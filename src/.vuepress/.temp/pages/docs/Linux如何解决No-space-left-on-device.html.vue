<template><div><ol>
<li>发现不能创建文件了</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj<span class="token comment"># mkdir jsy</span>
mkdir: cannot create directory ‘jsy’: No space left on device
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>分析是磁盘空间不够用还是inode不够用</li>
</ol>
<p>查看文件系统的硬盘空间使用率（block usage，block）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj<span class="token comment"># df -h</span>
Filesystem      Size  Used Avail Use% Mounted on
udev            914M     <span class="token number">0</span>  914M   <span class="token number">0</span>% /dev
tmpfs           189M   22M  167M  <span class="token number">12</span>% /run
/dev/vda1        40G   40G     <span class="token number">0</span> <span class="token number">100</span>% /
tmpfs           943M     <span class="token number">0</span>  943M   <span class="token number">0</span>% /dev/shm
tmpfs           <span class="token number">5</span>.0M     <span class="token number">0</span>  <span class="token number">5</span>.0M   <span class="token number">0</span>% /run/lock
tmpfs           943M     <span class="token number">0</span>  943M   <span class="token number">0</span>% /sys/fs/cgroup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看文件系统的inode使用率（block usage，block）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/home<span class="token comment"># df -i</span>
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
udev            <span class="token number">233972</span>    <span class="token number">384</span>  <span class="token number">233588</span>    <span class="token number">1</span>% /dev
tmpfs           <span class="token number">241188</span>    <span class="token number">527</span>  <span class="token number">240661</span>    <span class="token number">1</span>% /run
/dev/vda1      <span class="token number">2621440</span> <span class="token number">162723</span> <span class="token number">2458717</span>    <span class="token number">7</span>% /
tmpfs           <span class="token number">241188</span>      <span class="token number">1</span>  <span class="token number">241187</span>    <span class="token number">1</span>% /dev/shm
tmpfs           <span class="token number">241188</span>      <span class="token number">2</span>  <span class="token number">241186</span>    <span class="token number">1</span>% /run/lock
tmpfs           <span class="token number">241188</span>     <span class="token number">18</span>  <span class="token number">241170</span>    <span class="token number">1</span>% /sys/fs/cgroup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由此可以发现，inode充足，但是由于一些大文件导致了空间不足</p>
<ol start="3">
<li>
<p>找出那些大文件</p>
<p>使用<code v-pre>du --max-depth=2 | sort -nr -k 1 | awk '$1&gt;1024*1024 {print}'</code></p>
<p>含义是，在<code v-pre>/</code>下递归深度为2的找出那些大小超过1MB的文件并倒序输出，输出第一列为文件大小（单位字节），第二列为目录名。</p>
</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>root@iZuf6h5bru0f6zsysev3zuZ:/# du --max-depth=2 | sort -nr -k 1 | awk '$1>1024*1024 {print}'
41109700	.
35567412	./home
35567408	./home/sduoj
3203416	./usr
2153156	./usr/lib
1202160	./var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>ls</code>的<code v-pre>-S</code>选项可以按照文件大小顺序逆序列出。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-lhS</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>删除</li>
</ol>
<p>这一步就不细说了，使用<code v-pre>rm</code>小心一点。</p>
<p>或者使用<code v-pre>find</code>的`delete，参考文章(https://blog.csdn.net/10km/article/details/121652997)。</p>
<ol start="5">
<li>检测是否删除成功</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj/testMyJudgeServer/logs<span class="token comment"># df -lh</span>
Filesystem      Size  Used Avail Use% Mounted on
udev            914M     <span class="token number">0</span>  914M   <span class="token number">0</span>% /dev
tmpfs           189M   22M  167M  <span class="token number">12</span>% /run
/dev/vda1        40G  <span class="token number">7</span>.0G   31G  <span class="token number">19</span>% /
tmpfs           943M     <span class="token number">0</span>  943M   <span class="token number">0</span>% /dev/shm
tmpfs           <span class="token number">5</span>.0M     <span class="token number">0</span>  <span class="token number">5</span>.0M   <span class="token number">0</span>% /run/lock
tmpfs           943M     <span class="token number">0</span>  943M   <span class="token number">0</span>% /sys/fs/cgroup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件系统已经有空闲内存了。</p>
<p><strong>如果发现删除了文件，但是磁盘空间并没有释放呢?</strong></p>
<p>在Linux或者Unix系统中，通过rm或者文件管理器删除文件将会从文件系统的目录结构上解除链接(unlink).然而如果文件是被打开的（有一个进程正在使用），那么进程将仍然可以读取该文件，磁盘空间也一直被占用。</p>
<p>使用</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">lsof</span> <span class="token operator">|</span> <span class="token function">grep</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看那些被进程打开未被释放但是被删除的文件。</p>
<p>然后kill掉那些进程。</p>
</div></template>


