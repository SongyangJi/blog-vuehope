<template><div><ul>
<li>
<ul>
<li>10000个文件(每个文件只有 12 byte)</li>
</ul>
<ol>
<li>1 session 1 channel
串行： 37 s
并行(4 核)： 死锁
或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)
等各种异常</li>
<li>1 session n channels
串行：200 s
并行(4 核)：25 s (但是文件下载有丢失)</li>
<li>n sessions 1 channel
串行：1200 s
并行(4 核)：320 s</li>
</ol>
</li>
<li>
<p>100个文件(每个文件有 12 MB)</p>
<ol>
<li>
<p>1 session 1 channel
串行： 19 s
并行(4 核)： 死锁
或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)
等各种异常, 总之文件传输失败</p>
</li>
<li>
<p>1 session n channels
串行：20 s
并行(4 核)：18s (但是文件下载有丢失)</p>
</li>
<li>
<p>n sessions 1 channel
串行：35 s
并行(4 核)：10 s</p>
</li>
</ol>
</li>
<li>
<p>10个文件(每个文件有 120 MB)</p>
<ol>
<li>
<p>1 session 1 channel
串行： 18 s
并行(4 核)： 死锁
或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)
等各种异常, 总之文件传输失败</p>
</li>
<li>
<p>1 session n channels
串行：18 s
并行(4 核)：19 s</p>
</li>
<li>
<p>n sessions 1 channel
串行：19 s
并行(4 核)：8 s</p>
</li>
</ol>
</li>
</ul>
</div></template>


