<template><div><h1 id="硬盘" tabindex="-1"><a class="header-anchor" href="#硬盘" aria-hidden="true">#</a> 硬盘</h1>
<h2 id="fdisk" tabindex="-1"><a class="header-anchor" href="#fdisk" aria-hidden="true">#</a> fdisk</h2>
<blockquote>
<p>fdisk: 操作磁盘分区表</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">fdisk</span> <span class="token parameter variable">-l</span>
<span class="token function">fdisk</span> <span class="token parameter variable">-l</span> <span class="token operator">|</span> <span class="token function">grep</span> Disk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/<span class="token comment"># fdisk -l</span>
Disk /dev/vda: <span class="token number">40</span> GiB, <span class="token number">42949672960</span> bytes, <span class="token number">83886080</span> sectors
Units: sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
Disklabel type: dos
Disk identifier: 0x13be70fb

Device     Boot Start      End  Sectors Size Id Type
/dev/vda1  *     <span class="token number">2048</span> <span class="token number">83886046</span> <span class="token number">83883999</span>  40G <span class="token number">83</span> Linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="df" tabindex="-1"><a class="header-anchor" href="#df" aria-hidden="true">#</a> df</h2>
<blockquote>
<p>df: report file system disk space usage</p>
<p>usage: df [OPTION]... [FILE]...</p>
</blockquote>
<p>df 以<strong>磁盘分区</strong>为单位查看文件系统，可以获取硬盘被占用了多少空间，目前还剩下多少空间等信息。</p>
<p>例如，我们使用<strong>df -h</strong>命令来查看磁盘信息， <strong>-h</strong> 选项为根据大小适当显示：</p>
<p>显示内容参数说明：</p>
<ul>
<li><strong>Filesystem</strong>：文件系统</li>
<li><strong>Size</strong>： 分区大小</li>
<li><strong>Used</strong>： 已使用容量</li>
<li><strong>Avail</strong>： 还可以使用的容量</li>
<li><strong>Use%</strong>： 已用百分比</li>
<li><strong>Mounted on</strong>： 挂载点</li>
</ul>
<p><strong>相关命令：</strong></p>
<ul>
<li><strong>df -hl</strong>：查看磁盘剩余空间</li>
<li><strong>df -h</strong>：查看每个根路径的分区大小</li>
</ul>
<p>实例<code v-pre>df -h</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Filesystem      Size  Used Avail Use% Mounted on
udev            914M     <span class="token number">0</span>  914M   <span class="token number">0</span>% /dev
tmpfs           189M   22M  167M  <span class="token number">12</span>% /run
/dev/vda1        40G   40G     <span class="token number">0</span> <span class="token number">100</span>% /
tmpfs           943M     <span class="token number">0</span>  943M   <span class="token number">0</span>% /dev/shm
tmpfs           <span class="token number">5</span>.0M     <span class="token number">0</span>  <span class="token number">5</span>.0M   <span class="token number">0</span>% /run/lock
tmpfs           943M     <span class="token number">0</span>  943M   <span class="token number">0</span>% /sys/fs/cgroup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>-i</strong>: 展示inode</li>
</ul>
<h2 id="du" tabindex="-1"><a class="header-anchor" href="#du" aria-hidden="true">#</a> du</h2>
<blockquote>
<p>du: estimate file space usage</p>
</blockquote>
<p><strong>du</strong> 的英文原义为 <strong>disk usage</strong>，含义为显示磁盘空间的使用情况，用于查看当前目录的总大小。</p>
<p>例如查看当前目录的大小：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># du -sh
605M    .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>显示指定文件所占空间：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># du log2012.log 
300     log2012.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>方便阅读的格式显示test目录所占空间情况：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># du -h test
608K    test/test6
308K    test/test4
4.0K    test/scf/lib
4.0K    test/scf/service/deploy/product
4.0K    test/scf/service/deploy/info
12K     test/scf/service/deploy
16K     test/scf/service
4.0K    test/scf/doc
4.0K    test/scf/bin
32K     test/scf
8.0K    test/test3
1.3M    test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>du 命令用于查看当前目录的总大小：</p>
<ul>
<li><strong>-s</strong>：对每个Names参数只给出占用的数据块总数。</li>
<li><strong>-a</strong>：递归地显示指定目录中各文件及子目录中各文件占用的数据块数。<strong>若既不指定-s，也不指定-a，则只显示Names中的每一个目录及其中的各子目录所占的磁盘块数。</strong></li>
<li><strong>-b</strong>：以字节为单位列出磁盘空间使用情况（系统默认以k字节为单位）。</li>
<li><strong>-k</strong>：以1024字节为单位列出磁盘空间使用情况。</li>
<li><strong>-c</strong>：最后再加上一个总计（系统默认设置）。</li>
<li><strong>-l</strong>：计算所有的文件大小，对硬链接文件，则计算多次。</li>
<li><strong>-x</strong>：跳过在不同文件系统上的目录不予统计。</li>
<li><strong>-h</strong>：以K，M，G为单位，提高信息的可读性。</li>
<li><strong>--max-depth</strong>: 超过指定层数的目录后，予以忽略。</li>
</ul>
<p>常用的</p>
<ul>
<li><strong>du -sh [目录名]</strong>：返回该目录的大小</li>
<li><strong>du -sm [文件夹]</strong>：返回该文件夹总M数</li>
<li><strong>du -h [目录名]</strong>：查看指定文件夹下的所有文件大小（包含子文件夹）</li>
</ul>
<p>实例</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/<span class="token comment"># du -sh -c</span>
du: cannot access <span class="token string">'./proc/271257/task/271257/fd/4'</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
du: cannot access <span class="token string">'./proc/271257/task/271257/fdinfo/4'</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
du: cannot access <span class="token string">'./proc/271257/fd/3'</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
du: cannot access <span class="token string">'./proc/271257/fdinfo/3'</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
40G	<span class="token builtin class-name">.</span>
40G	total
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要排序呢？</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj<span class="token comment"># du | sort -n -r -k 1</span>
<span class="token number">35567408</span>	<span class="token builtin class-name">.</span>
<span class="token number">35566168</span>	./testMyJudgeServer
<span class="token number">35548224</span>	./testMyJudgeServer/logs
<span class="token number">18620304</span>	./testMyJudgeServer/logs/service-log
<span class="token number">16927848</span>	./testMyJudgeServer/logs/platform-log
<span class="token number">16927808</span>	./testMyJudgeServer/logs/platform-log/2021-11
<span class="token number">16881936</span>	./testMyJudgeServer/logs/service-log/2021-11
<span class="token number">1738324</span>	./testMyJudgeServer/logs/service-log/2021-10
<span class="token number">1132</span>	./sduoj-sandbox
<span class="token number">832</span>	./sduoj-sandbox/build
<span class="token number">492</span>	./sduoj-sandbox/build/objects
<span class="token number">300</span>	./sduoj-sandbox/build/bin
<span class="token number">264</span>	./sduoj-sandbox/src
<span class="token number">184</span>	./sduoj-sandbox/src/argtable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dumpe2fs" tabindex="-1"><a class="header-anchor" href="#dumpe2fs" aria-hidden="true">#</a> dumpe2fs</h2>
<blockquote>
<p>dumpe2fs  prints the super block and blocks group information for the filesystem present on device.</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@iZuf6h5bru0f6zsysev3zuZ:/home<span class="token comment"># dumpe2fs /dev/vda1 | head -n 50</span>
dumpe2fs <span class="token number">1.45</span>.5 <span class="token punctuation">(</span>07-Jan-2020<span class="token punctuation">)</span>
Filesystem volume name:   /
Last mounted on:          /
Filesystem UUID:          abf381e7-98ce-491f-85d5-f16aa9b23811
Filesystem magic number:  0xEF53
Filesystem revision <span class="token comment">#:    1 (dynamic)</span>
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent flex_bg sparse_super large_file huge_file dir_nlink extra_isize
Filesystem flags:         signed_directory_hash
Default <span class="token function">mount</span> options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              <span class="token number">2621440</span>
Block count:              <span class="token number">10485499</span>
Reserved block count:     <span class="token number">471818</span>
Free blocks:              <span class="token number">4097</span>
Free inodes:              <span class="token number">2458600</span>
First block:              <span class="token number">0</span>
Block size:               <span class="token number">4096</span>
Fragment size:            <span class="token number">4096</span>
Reserved GDT blocks:      <span class="token number">1021</span>
Blocks per group:         <span class="token number">32768</span>
Fragments per group:      <span class="token number">32768</span>
Inodes per group:         <span class="token number">8192</span>
Inode blocks per group:   <span class="token number">512</span>
Flex block group size:    <span class="token number">16</span>
Filesystem created:       Thu Mar <span class="token number">18</span> <span class="token number">14</span>:35:58 <span class="token number">2021</span>
Last <span class="token function">mount</span> time:          Wed Apr <span class="token number">27</span> <span class="token number">15</span>:48:37 <span class="token number">2022</span>
Last <span class="token function">write</span> time:          Wed Apr <span class="token number">27</span> <span class="token number">23</span>:48:37 <span class="token number">2022</span>
Mount count:              <span class="token number">10</span>
Maximum <span class="token function">mount</span> count:      <span class="token parameter variable">-1</span>
Last checked:             Thu Mar <span class="token number">18</span> <span class="token number">14</span>:35:58 <span class="token number">2021</span>
Check interval:           <span class="token number">0</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>none<span class="token operator">></span><span class="token punctuation">)</span>
Lifetime writes:          <span class="token number">2705</span> GB
Reserved blocks uid:      <span class="token number">0</span> <span class="token punctuation">(</span>user root<span class="token punctuation">)</span>
Reserved blocks gid:      <span class="token number">0</span> <span class="token punctuation">(</span>group root<span class="token punctuation">)</span>
First inode:              <span class="token number">11</span>
Inode size:	          <span class="token number">256</span>
Required extra isize:     <span class="token number">32</span>
Desired extra isize:      <span class="token number">32</span>
Journal inode:            <span class="token number">8</span>
Default directory hash:   half_md4
Directory Hash Seed:      79fdb20b-e5e8-4438-8721-e0c49cef8222
Journal backup:           inode blocks
Journal features:         journal_incompat_revoke
Journal size:             128M
Journal length:           <span class="token number">32768</span>
Journal sequence:         0x003cf420
Journal start:            <span class="token number">549</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


