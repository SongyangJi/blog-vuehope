<template><div><p>下面列出一些常见的终端操作命令。</p>
<table>
<thead>
<tr>
<th>针对远方服务器主机 (Server) 之行为</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>切换目录</td>
<td>cd path</td>
</tr>
<tr>
<td>列出目前所在目录下的文件名</td>
<td>ls (or) dir</td>
</tr>
<tr>
<td>建立目录</td>
<td>mkdir directory</td>
</tr>
<tr>
<td>删除目录</td>
<td>rmdir directory</td>
</tr>
<tr>
<td>显示目前所在的目录</td>
<td>pwd</td>
</tr>
<tr>
<td>删除档案或目录</td>
<td>rm PATH</td>
</tr>
<tr>
<td>更改档案或目录名称</td>
<td>rename oldname newname</td>
</tr>
<tr>
<td>离开远程主机</td>
<td>exit (or) bye (or) quit</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>针对本机 (Client) 之行为(都加上 l (L的小写) )</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>变换目录到本机的 PATH 当中</td>
<td>lcd PATH</td>
</tr>
<tr>
<td>列出目前本机所在目录下的文件名</td>
<td>lls</td>
</tr>
<tr>
<td>在本机建立目录</td>
<td>lmkdir  directory</td>
</tr>
<tr>
<td>显示目前所在的本机目录</td>
<td>lpwd</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>针对资料上传/下载的行为</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>将档案由本机上传到远程主机</td>
<td>put local-file [remote-file]</td>
</tr>
<tr>
<td>将档案由远程主机下载回来</td>
<td>get remote-file [local-file]</td>
</tr>
<tr>
<td>上传多个文件件</td>
<td>mput files</td>
</tr>
<tr>
<td>下载多个文件</td>
<td>mget files</td>
</tr>
</tbody>
</table>
<ul>
<li>关于上传文件与文件夹的坑</li>
</ul>
<p>上传、下载文件肯定是没有问题的。</p>
<p>但是对于一整个文件夹的传输并不是像  scp命令一样通过 -r 参数就可以解决, 需要注意</p>
<blockquote>
<p>man sftp手册</p>
</blockquote>
</div></template>


