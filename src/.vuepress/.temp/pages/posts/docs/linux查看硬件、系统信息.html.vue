<template><div><h1 id="_1-查看操作系统" tabindex="-1"><a class="header-anchor" href="#_1-查看操作系统" aria-hidden="true">#</a> 1. 查看操作系统</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /etc/issue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lsb_release <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_2-查看内存信息" tabindex="-1"><a class="header-anchor" href="#_2-查看内存信息" aria-hidden="true">#</a> 2. 查看内存信息</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/meminfo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># output</span>
MemTotal:        <span class="token number">4009020</span> kB
MemFree:          <span class="token number">135628</span> kB
MemAvailable:    <span class="token number">1925688</span> kB
Buffers:          <span class="token number">282728</span> kB
Cached:          <span class="token number">1324092</span> kB
SwapCached:         <span class="token number">1612</span> kB
Active:           <span class="token number">807888</span> kB
Inactive:        <span class="token number">2533284</span> kB
Active<span class="token punctuation">(</span>anon<span class="token punctuation">)</span>:      <span class="token number">43472</span> kB
Inactive<span class="token punctuation">(</span>anon<span class="token punctuation">)</span>:  <span class="token number">1709556</span> kB
Active<span class="token punctuation">(</span>file<span class="token punctuation">)</span>:     <span class="token number">764416</span> kB
Inactive<span class="token punctuation">(</span>file<span class="token punctuation">)</span>:   <span class="token number">823728</span> kB
Unevictable:        <span class="token number">6976</span> kB
Mlocked:               <span class="token number">0</span> kB
SwapTotal:       <span class="token number">2097148</span> kB
SwapFree:        <span class="token number">2052092</span> kB
Dirty:             <span class="token number">16828</span> kB
Writeback:             <span class="token number">0</span> kB
AnonPages:       <span class="token number">1739820</span> kB
Mapped:           <span class="token number">482588</span> kB
Shmem:             <span class="token number">26376</span> kB
KReclaimable:     <span class="token number">385472</span> kB
Slab:             <span class="token number">458420</span> kB
SReclaimable:     <span class="token number">385472</span> kB
SUnreclaim:        <span class="token number">72948</span> kB
KernelStack:       <span class="token number">12944</span> kB
PageTables:        <span class="token number">22444</span> kB
NFS_Unstable:          <span class="token number">0</span> kB
Bounce:                <span class="token number">0</span> kB
WritebackTmp:          <span class="token number">0</span> kB
CommitLimit:     <span class="token number">4101656</span> kB
Committed_AS:    <span class="token number">6306356</span> kB
VmallocTotal:   <span class="token number">133143461888</span> kB
VmallocUsed:       <span class="token number">27320</span> kB
VmallocChunk:          <span class="token number">0</span> kB
Percpu:             <span class="token number">1360</span> kB
HardwareCorrupted:     <span class="token number">0</span> kB
AnonHugePages:         <span class="token number">0</span> kB
ShmemHugePages:        <span class="token number">0</span> kB
ShmemPmdMapped:        <span class="token number">0</span> kB
FileHugePages:         <span class="token number">0</span> kB
FilePmdMapped:         <span class="token number">0</span> kB
CmaTotal:          <span class="token number">32768</span> kB
CmaFree:           <span class="token number">30140</span> kB
HugePages_Total:       <span class="token number">0</span>
HugePages_Free:        <span class="token number">0</span>
HugePages_Rsvd:        <span class="token number">0</span>
HugePages_Surp:        <span class="token number">0</span>
Hugepagesize:       <span class="token number">2048</span> kB
Hugetlb:               <span class="token number">0</span> kB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 默认</span>
<span class="token function">free</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>              总计         已用        空闲      共享    缓冲/缓存    可用
内存：     <span class="token number">4009020</span>     <span class="token number">1889432</span>      <span class="token number">115696</span>       <span class="token number">26380</span>     <span class="token number">2003892</span>     <span class="token number">1917212</span>
交换：     <span class="token number">2097148</span>       <span class="token number">46848</span>     <span class="token number">2050300</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-查看cpu信息" tabindex="-1"><a class="header-anchor" href="#_3-查看cpu信息" aria-hidden="true">#</a> 3. 查看CPU信息</h1>
<ol>
<li>查看物理CPU个数</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"physical id"</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>查看每个物理CPU中core的个数(即核数)</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"cpu cores"</span> <span class="token operator">|</span> <span class="token function">uniq</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>查看逻辑CPU的个数</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"processor"</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>查看CPU信息（型号）</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> name <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f2</span> -d: <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>查看是否开启超线程技术（只有intel的处理器支持）
如果启用此技术那么，每个物理核心又可分为两个逻辑处理器。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">"cpu cores"</span>  <span class="token parameter variable">-e</span> <span class="token string">"siblings"</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果cpu cores数量和siblings数量一致，则没有启用超线程，否则超线程被启用。</p>
<h1 id="_4-查看cpu的负载" tabindex="-1"><a class="header-anchor" href="#_4-查看cpu的负载" aria-hidden="true">#</a> 4. 查看CPU的负载</h1>
<p>平均负载是指上一分钟同时处于就绪状态的平均进程数。</p>
<p>如果CPU Load等于CPU个数乘以核数，那么就说CPU正好满负载，再多一点，可能就要出问题了，有些任务不能被及时分配处理器，那要保证响应时间的话，最好要小于CPU个数X核数X0.7。</p>
<p>Load Average是指CPU的Load。它所包含的信息是在一段时间内CPU正在处理及等待CPU处理的进程数之和的统计信息，也就是CPU使用队列的长度的统计信息。
Load Average的值应该小于CPU个数X核数X0.7，
Load Average会有3个状态平均值，分别是1分钟、5分钟和15分钟平均Load。</p>
<p>如果1分钟平均出现大于CPU个数X核数的情况，还不需要担心；如果5分钟的平均也是这样，那就要警惕了；15分钟的平均也是这样，就要分析哪里出现问题，防范未然。
查看CPU负载信息，使用<code v-pre>top</code>命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># output</span>
<span class="token function">top</span> - <span class="token number">15</span>:50:31 up <span class="token number">4</span> days, <span class="token number">23</span>:43, <span class="token number">1</span> user, load average: <span class="token number">0.51</span>, <span class="token number">0.29</span>, <span class="token number">0.37</span>
Tasks: <span class="token number">492</span> total,  <span class="token number">1</span> running, <span class="token number">490</span> sleeping,  <span class="token number">1</span> stopped,  <span class="token number">0</span> zombie
Cpu<span class="token punctuation">(</span>s<span class="token punctuation">)</span>: <span class="token number">6.4</span>%us, <span class="token number">0.1</span>%sy, <span class="token number">0.0</span>%ni, <span class="token number">93.4</span>%id, <span class="token number">0.1</span>%wa, <span class="token number">0.0</span>%hi, <span class="token number">0.0</span>%si, <span class="token number">0.0</span>%st
Mem: 65973912k total, 32468632k used, 33505280k free,  906712k buffers
Swap: 41943032k total,  13204k used, 41929828k free, 6434448k cached
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>MacOS查看信息</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">top</span> <span class="token parameter variable">-l</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h1 id="_5-硬盘" tabindex="-1"><a class="header-anchor" href="#_5-硬盘" aria-hidden="true">#</a> 5. 硬盘</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">fdisk</span> <span class="token parameter variable">-l</span>
<span class="token function">fdisk</span> <span class="token parameter variable">-l</span> <span class="token operator">|</span><span class="token function">grep</span> Disk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># output</span>
Disk /dev/sda: <span class="token number">500.1</span> GB, <span class="token number">500107862016</span> bytes
<span class="token number">255</span> heads, <span class="token number">63</span> sectors/track, <span class="token number">60801</span> cylinders, total <span class="token number">976773168</span> sectors
Units <span class="token operator">=</span> sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">4096</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">4096</span> bytes / <span class="token number">4096</span> bytes
Disk identifier: 0x00023728

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        <span class="token number">2048</span>     <span class="token number">2148351</span>     <span class="token number">1073152</span>   <span class="token number">83</span>  Linux
/dev/sda2         <span class="token number">2148352</span>    <span class="token number">21680127</span>     <span class="token number">9765888</span>   <span class="token number">82</span>  Linux swap / Solaris
/dev/sda3        <span class="token number">21680128</span>   <span class="token number">177930239</span>    <span class="token number">78125056</span>   <span class="token number">83</span>  Linux
/dev/sda4       <span class="token number">177932286</span>   <span class="token number">976771071</span>   <span class="token number">399419393</span>    <span class="token number">5</span>  Extended/dev/sda5       <span class="token number">177932288</span>   <span class="token number">412305407</span>   <span class="token number">117186560</span>   <span class="token number">83</span>  Linux
/dev/sda6       <span class="token number">412307456</span>   <span class="token number">976771071</span>   <span class="token number">282231808</span>   <span class="token number">83</span>  Linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>https://www.cnblogs.com/ggjucheng/archive/2013/01/14/2859613.html</p>
</blockquote>
<p>补：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">uname</span> <span class="token parameter variable">-a</span> <span class="token comment"># 查看内核/操作系统/CPU信息(含x86_64表示32位机器,i686表示32位机器)</span>
<span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> /etc/issue <span class="token comment"># 查看操作系统版本，是数字1不是字母L</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token comment"># 查看CPU信息的linux系统信息命令</span>
<span class="token function">hostname</span> <span class="token comment"># 查看计算机名的linux系统信息命令</span>
lspci <span class="token parameter variable">-tv</span> <span class="token comment"># 列出所有PCI设备</span>
lsusb <span class="token parameter variable">-tv</span> <span class="token comment"># 列出所有USB设备的linux系统信息命令</span>
lsmod <span class="token comment"># 列出加载的内核模块</span>
<span class="token function">env</span> <span class="token comment"># 查看环境变量资源</span>
<span class="token function">free</span> <span class="token parameter variable">-m</span> <span class="token comment"># 查看内存使用量和交换区使用量</span>
<span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token comment"># 查看各分区使用情况</span>
<span class="token function">du</span> <span class="token parameter variable">-sh</span> <span class="token comment"># 查看指定目录的大小</span>
<span class="token function">grep</span> MemTotal /proc/meminfo <span class="token comment"># 查看内存总量</span>
<span class="token function">grep</span> MemFree /proc/meminfo <span class="token comment"># 查看空闲内存量</span>
<span class="token function">uptime</span> <span class="token comment"># 查看系统运行时间、用户数、负载</span>
<span class="token function">cat</span> /proc/loadavg <span class="token comment"># 查看系统负载磁盘和分区</span>
<span class="token function">mount</span> <span class="token operator">|</span> <span class="token function">column</span> <span class="token parameter variable">-t</span> <span class="token comment"># 查看挂接的分区状态</span>
<span class="token function">fdisk</span> <span class="token parameter variable">-l</span> <span class="token comment"># 查看所有分区</span>
<span class="token function">swapon</span> <span class="token parameter variable">-s</span> <span class="token comment"># 查看所有交换分区</span>
hdparm <span class="token parameter variable">-i</span> /dev/hda <span class="token comment"># 查看磁盘参数(仅适用于IDE设备)</span>
<span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">grep</span> IDE <span class="token comment"># 查看启动时IDE设备检测状况网络</span>
<span class="token function">ifconfig</span> <span class="token comment"># 查看所有网络接口的属性</span>
iptables <span class="token parameter variable">-L</span> <span class="token comment"># 查看防火墙设置</span>
route <span class="token parameter variable">-n</span> <span class="token comment"># 查看路由表</span>
<span class="token function">netstat</span> <span class="token parameter variable">-lntp</span> <span class="token comment"># 查看所有监听端口</span>
<span class="token function">netstat</span> <span class="token parameter variable">-antp</span> <span class="token comment"># 查看所有已经建立的连接</span>
<span class="token function">netstat</span> <span class="token parameter variable">-s</span> <span class="token comment"># 查看网络统计信息进程</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token comment"># 查看所有进程</span>
<span class="token function">top</span> <span class="token comment"># 实时显示进程状态用户</span>
w <span class="token comment"># 查看活动用户</span>
<span class="token function">id</span> <span class="token comment"># 查看指定用户信息</span>
last <span class="token comment"># 查看用户登录日志</span>
<span class="token function">cut</span> -d: <span class="token parameter variable">-f1</span> /etc/passwd <span class="token comment"># 查看系统所有用户</span>
<span class="token function">cut</span> -d: <span class="token parameter variable">-f1</span> /etc/group <span class="token comment"># 查看系统所有组</span>
<span class="token function">crontab</span> <span class="token parameter variable">-l</span> <span class="token comment"># 查看当前用户的计划任务服务</span>
<span class="token function">chkconfig</span> –list <span class="token comment"># 列出所有系统服务</span>
<span class="token function">chkconfig</span> –list <span class="token operator">|</span> <span class="token function">grep</span> on <span class="token comment"># 列出所有启动的系统服务程序</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token comment"># 查看所有安装的软件包</span>
<span class="token function">cat</span> /proc/cpuinfo ：查看CPU相关参数的linux系统命令
<span class="token function">cat</span> /proc/partitions ：查看linux硬盘和分区信息的系统信息命令
<span class="token function">cat</span> /proc/meminfo ：查看linux系统内存信息的linux系统命令
<span class="token function">cat</span> /proc/version ：查看版本，类似uname <span class="token parameter variable">-r</span>
<span class="token function">cat</span> /proc/ioports ：查看设备io端口
<span class="token function">cat</span> /proc/interrupts ：查看中断
<span class="token function">cat</span> /proc/pci ：查看pci设备的信息
<span class="token function">cat</span> /proc/swaps ：查看所有swap分区的信息 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


