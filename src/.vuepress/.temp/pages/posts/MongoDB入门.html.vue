<template><div><h1 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h1>
<h3 id="_1-灵活的模型" tabindex="-1"><a class="header-anchor" href="#_1-灵活的模型" aria-hidden="true">#</a> 1. 灵活的模型</h3>
<p>区别于关系数据库最大的一个特点就是字段灵活变更，这就非常适合一些迭代频繁且数据模型多变的业务场景。例如我们直播的活动业务场景，当前直播活动越来越多，玩的花样也是越来越多，其实就很适合用mongoDB来做活动业务的数据存储。</p>
<h3 id="_2-json数据格式" tabindex="-1"><a class="header-anchor" href="#_2-json数据格式" aria-hidden="true">#</a> 2. json数据格式</h3>
<p>mongoDB的数据存储都是json格式，非常适合微服务Restful Api。</p>
<h3 id="_3-横向扩展能力" tabindex="-1"><a class="header-anchor" href="#_3-横向扩展能力" aria-hidden="true">#</a> 3. 横向扩展能力</h3>
<p>与mysql的分库分表不同，它可以在业务代码不变更的情况下做自动水平扩展。能够很好的解决上文描述的两个场景
① 分表数据不均匀
② 分表数据过大要调整原有数据分布。</p>
<p><strong>与关系型数据库相比，MongoDB的优点：</strong></p>
<p>①. 弱一致性（最终一致），更能保证用户的访问速度；</p>
<p>②. 文档结构的存储方式，能够更便捷的获取数据；</p>
<p>对于一个层级式的数据结构来说，如果要将这样的数据使用扁平式的，表状的结构来保存数据，这无论是在查询还是获取数据时都十分困难。</p>
<p>③. 内置GridFS，支持大容量的存储；</p>
<p><strong>与关系型数据库相比，MongoDB的缺点：</strong></p>
<p>①. mongodb不支持事务操作;</p>
<p>②. mongodb占用空间过大;</p>
<h1 id="下载、配置" tabindex="-1"><a class="header-anchor" href="#下载、配置" aria-hidden="true">#</a> 下载、配置</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 安装必要的安装包</span>
brew tap mongodb/brew
brew <span class="token function">install</span> mongodb-community
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置环境变量</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 可能不一样</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/opt/homebrew/Cellar/mongodb-community/4.4.5/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="启动方式" tabindex="-1"><a class="header-anchor" href="#启动方式" aria-hidden="true">#</a> 启动方式</h1>
<ol>
<li>使用 brew</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew services start mongodb-community
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>开始 mongo 服务
(这是个守护进程)</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> mongod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>启动MongoDB的shell</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 配置好环境之后</span>
mongo

<span class="token comment"># MongoDB shell version v4.4.5</span>
<span class="token comment"># connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&amp;gssapiServiceName=mongodb</span>
<span class="token comment"># Implicit session: session { "id" : UUID("0d903bb8-cfb4-4d43-9a60-# c365a1de640a") }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到默认端口号是 27017 。</p>
<p><strong>注：</strong>
mongod是服务端、
mongo是客户端。</p>
<p>（就像是mysqld和mysql）</p>
<h1 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h1>
<table>
<thead>
<tr>
<th>SQL术语/概念</th>
<th>MongoDB术语/概念</th>
<th>解释/说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>database</td>
<td>database</td>
<td>数据库</td>
</tr>
<tr>
<td>table</td>
<td>collection</td>
<td>数据库表/集合</td>
</tr>
<tr>
<td>row</td>
<td>document</td>
<td>数据记录行/文档</td>
</tr>
<tr>
<td>column</td>
<td>field</td>
<td>数据字段/域</td>
</tr>
<tr>
<td>index</td>
<td>index</td>
<td>索引</td>
</tr>
<tr>
<td>table  joins</td>
<td>嵌入文档</td>
<td>表连接,MongoDB不支持（DBRef）</td>
</tr>
<tr>
<td>primary key</td>
<td>primary key</td>
<td>主键,MongoDB自动将_id字段设置为主键</td>
</tr>
</tbody>
</table>
<p><strong>必须指明的是，这只是一种方便理解产生的垂直联系，实际上MongoDB存储的数据是半结构化的，并非RDBMS一样，有着规整的数据结构。</strong>
比如，在MongoDB中collection里面的document的field可以各不相同，这在关系型数据库是绝不可以的。</p>
<h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>
<p>文档是一组键值(key-value)对(即 BSON，即 Binary Json；用起来就像json一样)。MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。
注：</p>
<ul>
<li>
<p><strong>文档中的键/值对是有序的</strong>。</p>
</li>
<li>
<p><strong>文档的键是字符串。</strong></p>
</li>
</ul>
<h2 id="集合" tabindex="-1"><a class="header-anchor" href="#集合" aria-hidden="true">#</a> 集合</h2>
<p>集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表格。</p>
<p>集合存在于数据库中，<strong>集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据</strong>，但通常情况下我们插入集合的数据都会有一定的关联性。</p>
<p>当第一个文档插入时，集合就会被创建。</p>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<p>使用Json作为数据存储方式。
查询语言也是Json风格的。</p>
<table>
<thead>
<tr>
<th style="text-align:left">数据类型</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">String</td>
<td style="text-align:left">字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。</td>
</tr>
<tr>
<td style="text-align:left">Integer</td>
<td style="text-align:left">整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。</td>
</tr>
<tr>
<td style="text-align:left">Boolean</td>
<td style="text-align:left">布尔值。用于存储布尔值（真/假）。</td>
</tr>
<tr>
<td style="text-align:left">Double</td>
<td style="text-align:left">双精度浮点值。用于存储浮点值。</td>
</tr>
<tr>
<td style="text-align:left">Min/Max keys</td>
<td style="text-align:left">将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。</td>
</tr>
<tr>
<td style="text-align:left">Array</td>
<td style="text-align:left">用于将数组或列表或多个值存储为一个键。</td>
</tr>
<tr>
<td style="text-align:left">Timestamp</td>
<td style="text-align:left">时间戳。记录文档修改或添加的具体时间。</td>
</tr>
<tr>
<td style="text-align:left">Object</td>
<td style="text-align:left">用于内嵌文档。</td>
</tr>
<tr>
<td style="text-align:left">Null</td>
<td style="text-align:left">用于创建空值。</td>
</tr>
<tr>
<td style="text-align:left">Symbol</td>
<td style="text-align:left">符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。</td>
</tr>
<tr>
<td style="text-align:left">Date</td>
<td style="text-align:left">日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。</td>
</tr>
<tr>
<td style="text-align:left">Object ID</td>
<td style="text-align:left">对象 ID。用于创建文档的 ID。</td>
</tr>
<tr>
<td style="text-align:left">Binary Data</td>
<td style="text-align:left">二进制数据。用于存储二进制数据。</td>
</tr>
<tr>
<td style="text-align:left">Code</td>
<td style="text-align:left">代码类型。用于在文档中存储 JavaScript 代码。</td>
</tr>
<tr>
<td style="text-align:left">Regular expression</td>
<td style="text-align:left">正则表达式类型。用于存储正则表达式。</td>
</tr>
</tbody>
</table>
<p>下面说明下几种重要的数据类型。</p>
<h3 id="objectid" tabindex="-1"><a class="header-anchor" href="#objectid" aria-hidden="true">#</a> ObjectId</h3>
<p>ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes，含义是：</p>
<ul>
<li>前 4 个字节表示创建 <strong>unix</strong> 时间戳,格林尼治时间 <strong>UTC</strong> 时间，比北京时间晚了 8 个小时</li>
<li>接下来的 3 个字节是机器标识码；</li>
<li>紧接的两个字节由进程 id 组成 PID；</li>
<li>最后3个字节是一个自动增加的计数器，确保相同的进程同一秒产生的ObjectId也是不一样的。</li>
</ul>
<p>MongoDB 中存储的文档必须有一个 _id 键。</p>
<p><strong>这个键的值可以是任何类型的</strong>，默认是个 ObjectId 对象</p>
<p>由于 ObjectId 中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> var newObject <span class="token operator">=</span> ObjectId<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">></span> newObject.getTimestamp<span class="token punctuation">(</span><span class="token punctuation">)</span>
ISODate<span class="token punctuation">(</span><span class="token string">"2021-10-19T00:45:32Z"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h1>
<p><a href="https://docs.mongodb.com/" target="_blank" rel="noopener noreferrer">docs<ExternalLinkIcon/></a></p>
<p><a href="https://docs.mongodb.com/manual/reference/" target="_blank" rel="noopener noreferrer">reference<ExternalLinkIcon/></a></p>
</div></template>


