<template><div><h1 id="断点续传" tabindex="-1"><a class="header-anchor" href="#断点续传" aria-hidden="true">#</a> 断点续传</h1>
<p>基于http协议实现断点续传。</p>
<p>请求部分，需要在请求头里加入Range头，表示本次请求的byte数组的开始和结束位置。</p>
<p>格式为：Bytes=开始-结束。如果不填表示0或者最后。</p>
<blockquote>
<p>对于要支持断点续传的服务器，需要处理这个请求头，如果发现有Range头部，需要对响应特殊处理。</p>
</blockquote>
<ul>
<li>
<p>code：返回206；</p>
</li>
<li>
<p>header：需要返回如下几个header：</p>
<ul>
<li>Content-Range: 格式为bytes 开始-结束/全部，如 bytes 0-10/3103</li>
<li>Content-Type，对于二进制数据是application/octet-stream</li>
<li>Content-Length: 如1024，本次内容的大小</li>
<li>Accept-Ranges：bytes，表示支持Range请求</li>
</ul>
</li>
<li>
<p>body：返回Range范围内的字节；</p>
</li>
</ul>
<p>https://blog.csdn.net/u011748319/article/details/118680680</p>
<p>https://www.iteye.com/blog/rensanning-2248760</p>
<p>https://blog.csdn.net/weixin_29009501/article/details/114543338?utm_medium=distribute.pc_relevant.none-task-blog-2<sub>default</sub>baidujs_title~default-0.highlightwordscore&amp;spm=1001.2101.3001.4242.1</p>
</div></template>


