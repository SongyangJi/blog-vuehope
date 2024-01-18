<template><div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> hbase
brew <span class="token function">install</span> jruby
brew <span class="token function">install</span> asciidoctor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew services start hbase
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>http://localhost:16010</p>
<h1 id="应用实例" tabindex="-1"><a class="header-anchor" href="#应用实例" aria-hidden="true">#</a> 应用实例</h1>
<h2 id="手机数据" tabindex="-1"><a class="header-anchor" href="#手机数据" aria-hidden="true">#</a> 手机数据</h2>
<ul>
<li>需求</li>
</ul>
<p>有一张数据表，其中包含手机号码字段</p>
<ol>
<li>查询一段时间内固定号码的所有数据</li>
<li>查询一段时间内所有数据</li>
</ol>
<ul>
<li>
<p>分析</p>
<p>HBase要想查询快速，只能从rowKey上下手rowKey=phoneNum+时间 可以实现目标1，但是目标2很难实现rowKey=时间+phoneNum 可以实现目标2，但是目标1很难实现，且数据量越来越大可能导致热点问题 。</p>
</li>
<li>
<p>解决思路1：牺牲空间换时间，写数据时同时写入两张表，内容一样，只是一张表rowKey=phoneNum+时间，另一张表rowKey=时间+phoneNum</p>
</li>
<li>
<p>解决思路2：牺牲部分空间部分时间，两张表，一张全量表，rowKey=phoneNum+时间，另一张索引表只存rowKey=时间+phoneNum，目标1通过scan全量表就可以实现，目标2先scan索引表然后批量get全量表。</p>
</li>
</ul>
<h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h1>
<blockquote>
<p>https://www.cnblogs.com/scuwangjun/p/11555291.html
https://www.cnblogs.com/Chaser-Eagle/p/12008510.html</p>
<p><a href="https://juejin.cn/post/6844903753271754759" target="_blank" rel="noopener noreferrer">一文讲清HBase存储结构<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


