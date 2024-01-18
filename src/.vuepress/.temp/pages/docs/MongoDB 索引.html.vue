<template><div><p>索引支持在 MongoDB 中高效执行查询。</p>
<p><strong>如果没有索引，MongoDB 必须执行<em>集合扫描</em>，即扫描<em>集合中的</em>每个文档，以选择那些与查询语句匹配的文档</strong>。如果查询存在合适的索引，MongoDB 可以使用该索引来限制它必须检查的文档数量。</p>
<p>索引是特殊的数据结构（<strong>MongoDB 索引使用 B 树数据结构</strong>），它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或字段集的值，按字段值排序。索引条目的排序支持高效的等式匹配和基于范围的查询操作。此外，MongoDB 可以使用索引中的排序返回排序结果。</p>
<p>从根本上说，<strong>MongoDB 中的索引类似于其他数据库系统中的索引</strong>（因为数据结构使用的都是B树）。MongoDB 在<strong>集合</strong>级别定义索引，并支持 MongoDB 集合中文档的任何字段或子字段的索引。</p>
<h2 id="默认-id索引" tabindex="-1"><a class="header-anchor" href="#默认-id索引" aria-hidden="true">#</a> 默认<code v-pre>_id</code>索引</h2>
<p>MongoDB在创建集合期间在<code v-pre>_id</code>字段上 创建唯一索引。该索引可防止客户端插入具有相同字段值的两个文档。您不能在字段上删除此索引。</p>
<h2 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h2>
<p>索引一旦创建就不能重命名。相反，您必须删除并使用新名称重新创建索引。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.collection.createIndex( &lt;key and index type specification>, &lt;options> )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看索引" tabindex="-1"><a class="header-anchor" href="#查看索引" aria-hidden="true">#</a> 查看索引</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.collection.getIndexes()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="索引类型" tabindex="-1"><a class="header-anchor" href="#索引类型" aria-hidden="true">#</a> 索引类型</h2>
<p>MongoDB 提供了许多不同的索引类型来支持特定类型的数据和查询。</p>
<h3 id="单字段索引" tabindex="-1"><a class="header-anchor" href="#单字段索引" aria-hidden="true">#</a> 单字段索引</h3>
<p>MongoDB支持在文档的单个字段上创建用户定义的升序/降序索引。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.collection.createIndex( { score: 1 } )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://docs.mongodb.com/manual/images/index-ascending.bakedsvg.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="复合索引" tabindex="-1"><a class="header-anchor" href="#复合索引" aria-hidden="true">#</a> 复合索引</h3>
<p>MongoDB 还支持多个字段上的用户定义索引，即 <a href="https://docs.mongodb.com/manual/core/index-compound/" target="_blank" rel="noopener noreferrer">复合索引<ExternalLinkIcon/></a>。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.collection.createIndex( { userid: 1, score: -1 } )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>复合索引中列出的字段顺序很重要。例如，如果复合索引由 组成<code v-pre>{ userid: 1, score: -1 }</code>，则索引首先按升序排序<code v-pre>userid</code>，然后在每个<code v-pre>userid</code> 值中按降序排序<code v-pre>score</code>。</p>
<figure><img src="https://docs.mongodb.com/manual/images/index-compound-key.bakedsvg.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="多键索引" tabindex="-1"><a class="header-anchor" href="#多键索引" aria-hidden="true">#</a> 多键索引</h3>
<p>MongoDB 使用<a href="https://docs.mongodb.com/manual/core/index-multikey/" target="_blank" rel="noopener noreferrer">多键索引<ExternalLinkIcon/></a>来索引<strong>存储在数组中的内容</strong>。
如果你索引一个包含数组值的字段，MongoDB 会<strong>为数组的每个元素创建单独的索引条目</strong>。这些<a href="https://docs.mongodb.com/manual/core/index-multikey/" target="_blank" rel="noopener noreferrer">多键索引<ExternalLinkIcon/></a>允许查询通过匹配数组的一个或多个元素来选择包含数组的文档。</p>
<p>如果索引字段包含数组值，MongoDB 会自动判断是否创建多键索引；您<strong>不需要显式指定多键类型</strong>。</p>
<figure><img src="https://docs.mongodb.com/manual/images/index-multikey.bakedsvg.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="哈希索引" tabindex="-1"><a class="header-anchor" href="#哈希索引" aria-hidden="true">#</a> 哈希索引</h3>
<p>为了支持<a href="https://docs.mongodb.com/manual/core/hashed-sharding/#std-label-sharding-hashed-sharding" target="_blank" rel="noopener noreferrer">基于散列的分片<ExternalLinkIcon/></a>，MongoDB 提供了一种<a href="https://docs.mongodb.com/manual/core/index-hashed/" target="_blank" rel="noopener noreferrer">散列索引<ExternalLinkIcon/></a>类型，它对字段值的散列值进行索引。这些索引在其范围内具有更随机的值分布，但<strong>仅支持相等匹配</strong>，<strong>不支持基于范围的查询</strong>。</p>
<blockquote>
<p><a href="https://docs.mongodb.com/manual/indexes/" target="_blank" rel="noopener noreferrer">官方文档索引<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


