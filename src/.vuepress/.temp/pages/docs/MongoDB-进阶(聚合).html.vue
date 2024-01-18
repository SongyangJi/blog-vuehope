<template><div><h1 id="聚合" tabindex="-1"><a class="header-anchor" href="#聚合" aria-hidden="true">#</a> 聚合</h1>
<p>什么是聚合管道？</p>
<ul>
<li><strong>聚合管道是基于数据处理管道概念建模的数据聚合框架</strong>。</li>
<li>文档进入<strong>多阶段管道</strong>，将文档转换为聚合结果。</li>
<li>MongoDB 聚合管道由<strong>阶段</strong>组成。每个阶段都会在文档通过管道时对其进行转换。</li>
<li>管道阶段可以在管道中多次出现，但<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out" target="_blank" rel="noopener noreferrer"><code v-pre>$out</code><ExternalLinkIcon/></a>，<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge" target="_blank" rel="noopener noreferrer"><code v-pre>$merge</code><ExternalLinkIcon/></a>、 和 <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#mongodb-pipeline-pipe.-geoNear" target="_blank" rel="noopener noreferrer"><code v-pre>$geoNear</code><ExternalLinkIcon/></a>阶段除外。（相当于 Java 流式计算的的最后一步归约操作）。</li>
</ul>
<p><strong>语法</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.collection.aggregate<span class="token punctuation">(</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>stage<span class="token operator">></span> <span class="token punctuation">}</span>, <span class="token punctuation">..</span>. <span class="token punctuation">]</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="聚合管道的阶段" tabindex="-1"><a class="header-anchor" href="#聚合管道的阶段" aria-hidden="true">#</a> 聚合管道的阶段</h2>
<p>这里只列出最常用的，完整请看参考文档。</p>
<table>
<thead>
<tr>
<th style="text-align:left">阶段</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields" target="_blank" rel="noopener noreferrer"><code v-pre>$addFields</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">向文档添加新字段。类似于 <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project" target="_blank" rel="noopener noreferrer"><code v-pre>$project</code><ExternalLinkIcon/></a>，<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields" target="_blank" rel="noopener noreferrer"><code v-pre>$addFields</code><ExternalLinkIcon/></a>对流中的每个文档进行整形；具体来说，通过向包含输入文档中现有字段和新添加字段的输出文档添加新字段。<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set" target="_blank" rel="noopener noreferrer"><code v-pre>$set</code><ExternalLinkIcon/></a>是 的别名<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields" target="_blank" rel="noopener noreferrer"><code v-pre>$addFields</code><ExternalLinkIcon/></a>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count" target="_blank" rel="noopener noreferrer"><code v-pre>$count</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">返回聚合管道此阶段的文档数计数。与<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/count-accumulator/#mongodb-group-grp.-count" target="_blank" rel="noopener noreferrer"><code v-pre>$count</code><ExternalLinkIcon/></a>聚合累加器不同。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group" target="_blank" rel="noopener noreferrer"><code v-pre>$group</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">按指定的标识符表达式对输入文档进行分组，并将累加器表达式（如果指定）应用于每个组。使用所有输入文档并为每个不同的组输出一个文档。输出文档仅包含标识符字段和累积字段（如果指定）。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit" target="_blank" rel="noopener noreferrer"><code v-pre>$limit</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">将未修改的前<em>n 个</em>文档传递到管道，其中<em>n</em>是指定的限制。对于每个输入文档，输出一个文档（对于前<em>n 个</em>文档）或零个文档（在前<em>n 个</em>文档之后）。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup" target="_blank" rel="noopener noreferrer"><code v-pre>$lookup</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">对<em>同一</em>数据库中的另一个集合执行左外部 联接，以从“联接”集合中过滤文档以进行处理。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match" target="_blank" rel="noopener noreferrer"><code v-pre>$match</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">过滤文档流以只允许匹配的文档未经修改地传递到下一个管道阶段。 <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match" target="_blank" rel="noopener noreferrer"><code v-pre>$match</code><ExternalLinkIcon/></a>使用标准的 MongoDB 查询。对于每个输入文档，输出一个文档（匹配）或零个文档（不匹配）。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge" target="_blank" rel="noopener noreferrer"><code v-pre>$merge</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">将聚合管道的结果文档写入集合。该阶段可以将（插入新文档、合并文档、替换文档、保留现有文档、操作失败、使用自定义更新管道处理文档）结果合并到输出集合中。要使用该<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge" target="_blank" rel="noopener noreferrer"><code v-pre>$merge</code><ExternalLinkIcon/></a>阶段，它必须是管道中的最后一个阶段。<em>4.2版中的新功能</em>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out" target="_blank" rel="noopener noreferrer"><code v-pre>$out</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">将聚合管道的结果文档写入集合。要使用该<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out" target="_blank" rel="noopener noreferrer"><code v-pre>$out</code><ExternalLinkIcon/></a>阶段，它必须是管道中的最后一个阶段。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/planCacheStats/#mongodb-pipeline-pipe.-planCacheStats" target="_blank" rel="noopener noreferrer"><code v-pre>$planCacheStats</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">返回集合的<a href="https://docs.mongodb.com/manual/core/query-plans/" target="_blank" rel="noopener noreferrer">计划缓存<ExternalLinkIcon/></a>信息。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project" target="_blank" rel="noopener noreferrer"><code v-pre>$project</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">重塑流中的每个文档，例如通过添加新字段或删除现有字段。对于每个输入文档，输出一个文档。另请参阅<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset" target="_blank" rel="noopener noreferrer"><code v-pre>$unset</code><ExternalLinkIcon/></a>删除现有字段。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/replaceWith/#mongodb-pipeline-pipe.-replaceWith" target="_blank" rel="noopener noreferrer"><code v-pre>$replaceWith</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">用指定的嵌入文档替换文档。该操作替换输入文档中的所有现有字段，包括该<code v-pre>_id</code>字段。指定嵌入在输入文档中的文档以将嵌入的文档提升到顶级。<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/replaceWith/#mongodb-pipeline-pipe.-replaceWith" target="_blank" rel="noopener noreferrer"><code v-pre>$replaceWith</code><ExternalLinkIcon/></a>是<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/#mongodb-pipeline-pipe.-replaceRoot" target="_blank" rel="noopener noreferrer"><code v-pre>$replaceRoot</code><ExternalLinkIcon/></a>stage的别名 。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/sample/#mongodb-pipeline-pipe.-sample" target="_blank" rel="noopener noreferrer"><code v-pre>$sample</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">从其输入中随机选择指定数量的文档。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.atlas.mongodb.com/reference/atlas-search/query-syntax/#mongodb-pipeline-pipe.-search" target="_blank" rel="noopener noreferrer"><code v-pre>$search</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">对<a href="https://docs.atlas.mongodb.com/reference/atlas-search/query-syntax/" target="_blank" rel="noopener noreferrer">Atlas<ExternalLinkIcon/></a> 集合中的一个或多个字段执行全文搜索 。笔记<code v-pre>$search</code> 仅适用于 MongoDB Atlas 集群，不适用于自管理部署。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set" target="_blank" rel="noopener noreferrer"><code v-pre>$set</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">向文档添加新字段。类似于 <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project" target="_blank" rel="noopener noreferrer"><code v-pre>$project</code><ExternalLinkIcon/></a>，<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set" target="_blank" rel="noopener noreferrer"><code v-pre>$set</code><ExternalLinkIcon/></a>对流中的每个文档进行整形；具体来说，通过向包含输入文档中现有字段和新添加字段的输出文档添加新字段。<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set" target="_blank" rel="noopener noreferrer"><code v-pre>$set</code><ExternalLinkIcon/></a>是<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields" target="_blank" rel="noopener noreferrer"><code v-pre>$addFields</code><ExternalLinkIcon/></a>stage的别名。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/skip/#mongodb-pipeline-pipe.-skip" target="_blank" rel="noopener noreferrer"><code v-pre>$skip</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">跳过前<em>n 个</em>文档，其中<em>n</em>是指定的跳过编号，并将未修改的剩余文档传递到管道。对于每个输入文档，输出零个文档（对于前<em>n 个</em>文档）或一个文档（如果在前<em>n 个</em>文档之后）。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort" target="_blank" rel="noopener noreferrer"><code v-pre>$sort</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">按指定的排序键对文档流重新排序。只是顺序变了；文件保持不变。对于每个输入文档，输出一个文档。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/unionWith/#mongodb-pipeline-pipe.-unionWith" target="_blank" rel="noopener noreferrer"><code v-pre>$unionWith</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">执行两个集合的并集；ie 将来自两个集合的管道结果合并为一个结果集。<em>4.4版中的新功能</em>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset" target="_blank" rel="noopener noreferrer"><code v-pre>$unset</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">从文档中删除/排除字段。<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset" target="_blank" rel="noopener noreferrer"><code v-pre>$unset</code><ExternalLinkIcon/></a>是<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project" target="_blank" rel="noopener noreferrer"><code v-pre>$project</code><ExternalLinkIcon/></a>删除字段的阶段的别名。</td>
</tr>
</tbody>
</table>
<p><a href="https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/" target="_blank" rel="noopener noreferrer">参考文档<ExternalLinkIcon/></a></p>
<h2 id="聚合管道表达式" tabindex="-1"><a class="header-anchor" href="#聚合管道表达式" aria-hidden="true">#</a> 聚合管道表达式</h2>
<blockquote>
<p>详细的 <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/" target="_blank" rel="noopener noreferrer">参考文档<ExternalLinkIcon/></a></p>
</blockquote>
<h1 id="常用例子" tabindex="-1"><a class="header-anchor" href="#常用例子" aria-hidden="true">#</a> 常用例子</h1>
<h2 id="group" tabindex="-1"><a class="header-anchor" href="#group" aria-hidden="true">#</a> group</h2>
<h3 id="含义与作用" tabindex="-1"><a class="header-anchor" href="#含义与作用" aria-hidden="true">#</a> 含义与作用</h3>
<p>按指定的<code v-pre>_id</code>表达式对输入文档进行分组，并为每个不同的分组输出一个文档。<code v-pre>_id</code>每个输出文档的字段都包含唯一的按值分组。输出文档还可以包含保存某些<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/group/#std-label-accumulators-group" target="_blank" rel="noopener noreferrer">累加器表达式<ExternalLinkIcon/></a>值的计算字段。</p>
<h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>{
  $group:
    {
      _id: &lt;expression>, // Group By Expression
      &lt;field1>: { &lt;accumulator1> : &lt;expression1> },
      ...
    }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>_id</code></td>
<td style="text-align:left"><em>必须的</em>。如果指定null或者常量，相当于不分组。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>field</code></td>
<td style="text-align:left"><em>可选的.</em> 使用 <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/group/#std-label-accumulators-group" target="_blank" rel="noopener noreferrer">accumulator operators<ExternalLinkIcon/></a>.计算</td>
</tr>
</tbody>
</table>
<p>常用的 <strong>累加器运算符</strong>：</p>
<table>
<thead>
<tr>
<th style="text-align:left">名称</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/avg/#mongodb-group-grp.-avg" target="_blank" rel="noopener noreferrer"><code v-pre>$avg</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">返回数值的平均值。忽略非数字值。<em>在5.0版更改</em>：在<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields" target="_blank" rel="noopener noreferrer"><code v-pre>$setWindowFields</code><ExternalLinkIcon/></a>阶段可用。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/count-accumulator/#mongodb-group-grp.-count" target="_blank" rel="noopener noreferrer"><code v-pre>$count</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">返回组中的文档数。区别于<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count" target="_blank" rel="noopener noreferrer"><code v-pre>$count</code><ExternalLinkIcon/></a>流水线阶段。<em>5.0版中的新功能</em>：在<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group" target="_blank" rel="noopener noreferrer"><code v-pre>$group</code><ExternalLinkIcon/></a>和 <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields" target="_blank" rel="noopener noreferrer"><code v-pre>$setWindowFields</code><ExternalLinkIcon/></a>阶段可用。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/first/#mongodb-group-grp.-first" target="_blank" rel="noopener noreferrer"><code v-pre>$first</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">从每个组的第一个文档返回一个值。仅当文档已排序时才定义顺序。与<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/first-array-element/#mongodb-expression-exp.-first" target="_blank" rel="noopener noreferrer"><code v-pre>$first</code><ExternalLinkIcon/></a>数组运算符不同。<em>在5.0版更改</em>：在<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields" target="_blank" rel="noopener noreferrer"><code v-pre>$setWindowFields</code><ExternalLinkIcon/></a>阶段可用。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/last/#mongodb-group-grp.-last" target="_blank" rel="noopener noreferrer"><code v-pre>$last</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">从每个组的最后一个文档返回一个值。仅当文档已排序时才定义顺序。与<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/last-array-element/#mongodb-expression-exp.-last" target="_blank" rel="noopener noreferrer"><code v-pre>$last</code><ExternalLinkIcon/></a>数组运算符不同。<em>在5.0版更改</em>：在<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields" target="_blank" rel="noopener noreferrer"><code v-pre>$setWindowFields</code><ExternalLinkIcon/></a>阶段可用。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/max/#mongodb-group-grp.-max" target="_blank" rel="noopener noreferrer"><code v-pre>$max</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">返回每个组的最高表达式值。<em>在5.0版更改</em>：在<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields" target="_blank" rel="noopener noreferrer"><code v-pre>$setWindowFields</code><ExternalLinkIcon/></a>阶段可用。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/min/#mongodb-group-grp.-min" target="_blank" rel="noopener noreferrer"><code v-pre>$min</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">返回每个组的最低表达式值。<em>在5.0版更改</em>：在<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields" target="_blank" rel="noopener noreferrer"><code v-pre>$setWindowFields</code><ExternalLinkIcon/></a>阶段可用。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/sum/#mongodb-group-grp.-sum" target="_blank" rel="noopener noreferrer"><code v-pre>$sum</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">返回数值的总和。忽略非数字值。<em>在5.0版更改</em>：在<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields" target="_blank" rel="noopener noreferrer"><code v-pre>$setWindowFields</code><ExternalLinkIcon/></a>阶段可用。</td>
</tr>
</tbody>
</table>
<h3 id="小例子" tabindex="-1"><a class="header-anchor" href="#小例子" aria-hidden="true">#</a> 小例子</h3>
<ol>
<li>以下聚合操作按<code v-pre>item</code> 字段对文档进行分组，计算每个商品的总销售额并仅返回总销售额大于或等于 100 的商品：</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.sales.aggregate(
  [
    // First Stage
    {
      $group :
        {
          _id : "$item",
          totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } }
        }
     },
     // Second Stage
     {
       $match: { "totalSaleAmount": { $gte: 100 } }
     }
   ]
 )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>计算计数、总和和平均值</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.sales.aggregate([
  // First Stage
  {
    $match : { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
  },
  // Second Stage
  {
    $group : {
       _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
       totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
       averageQuantity: { $avg: "$quantity" },
       count: { $sum: 1 }
    }
  },
  // Third Stage
  {
    $sort : { totalSaleAmount: -1 }
  }
 ])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>第一阶段：</p>
<p>该<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match" target="_blank" rel="noopener noreferrer"><code v-pre>$match</code><ExternalLinkIcon/></a>阶段对文档进行过滤，仅将 2014 年的文档传递到下一阶段。</p>
</li>
<li>
<p>第二阶段：</p>
<p>该<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group" target="_blank" rel="noopener noreferrer"><code v-pre>$group</code><ExternalLinkIcon/></a>阶段按日期对单据进行分组，并计算每组单据的总销售额、平均数量和总数。</p>
</li>
<li>
<p>第三阶段：</p>
<p>该<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort" target="_blank" rel="noopener noreferrer"><code v-pre>$sort</code><ExternalLinkIcon/></a>阶段按每个组的总销售额以降序对结果进行排序。</p>
</li>
</ul>
<p>相当于如下SQL</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">date</span><span class="token punctuation">,</span>
       <span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">(</span> price <span class="token operator">*</span> quantity <span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> totalSaleAmount<span class="token punctuation">,</span>
       <span class="token function">Avg</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span>             <span class="token keyword">AS</span> averageQuantity<span class="token punctuation">,</span>
       <span class="token function">Count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>                  <span class="token keyword">AS</span> Count
<span class="token keyword">FROM</span>   sales
<span class="token keyword">GROUP</span>  <span class="token keyword">BY</span> <span class="token keyword">Date</span><span class="token punctuation">(</span><span class="token keyword">date</span><span class="token punctuation">)</span>
<span class="token keyword">ORDER</span>  <span class="token keyword">BY</span> totalSaleAmount <span class="token keyword">DESC</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lookup实现关联查询" tabindex="-1"><a class="header-anchor" href="#lookup实现关联查询" aria-hidden="true">#</a> lookup实现关联查询</h2>
<blockquote>
<p>参考<a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="含义与作用-1" tabindex="-1"><a class="header-anchor" href="#含义与作用-1" aria-hidden="true">#</a> 含义与作用</h3>
<p>对<em>同一</em> 数据库中的未分片集合执行左外部联接，以从“联接”集合中过滤文档以进行处理。对于每个输入文档，lookup阶段会添加一个新的数组字段，其元素是“joined”集合中的匹配文档。该lookup阶段将这些重塑的文档传递到下一阶段。</p>
<h3 id="语法-1" tabindex="-1"><a class="header-anchor" href="#语法-1" aria-hidden="true">#</a> 语法</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span>
   <span class="token variable">$lookup</span><span class="token builtin class-name">:</span>
     <span class="token punctuation">{</span>
       from: <span class="token operator">&lt;</span>collection to join<span class="token operator">></span>,
       localField: <span class="token operator">&lt;</span>field from the input documents<span class="token operator">></span>,
       foreignField: <span class="token operator">&lt;</span>field from the documents of the <span class="token string">"from"</span> collection<span class="token operator">></span>,
       as: <span class="token operator">&lt;</span>output array field<span class="token operator">></span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的字段的含义是：</p>
<table>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-from" target="_blank" rel="noopener noreferrer">from<ExternalLinkIcon/></a></td>
<td style="text-align:left">Specifies the collection in the <em>same</em> database to perform the join with. The <code v-pre>from</code> collection cannot be sharded. For details, see <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-sharded-collections" target="_blank" rel="noopener noreferrer">Sharded Collection Restrictions<ExternalLinkIcon/></a>.</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-localField" target="_blank" rel="noopener noreferrer">localField<ExternalLinkIcon/></a></td>
<td style="text-align:left">Specifies the field from the documents input to the <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup" target="_blank" rel="noopener noreferrer"><code v-pre>$lookup</code><ExternalLinkIcon/></a> stage. <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup" target="_blank" rel="noopener noreferrer"><code v-pre>$lookup</code><ExternalLinkIcon/></a> performs an equality match on the <code v-pre>localField</code> to the <code v-pre>foreignField</code> from the documents of the <code v-pre>from</code> collection. If an input document does not contain the <code v-pre>localField</code>, the <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup" target="_blank" rel="noopener noreferrer"><code v-pre>$lookup</code><ExternalLinkIcon/></a> treats the field as having a value of <code v-pre>null</code> for matching purposes.</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-foreignField" target="_blank" rel="noopener noreferrer">foreignField<ExternalLinkIcon/></a></td>
<td style="text-align:left">Specifies the field from the documents in the <code v-pre>from</code> collection. <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup" target="_blank" rel="noopener noreferrer"><code v-pre>$lookup</code><ExternalLinkIcon/></a> performs an equality match on the <code v-pre>foreignField</code> to the <code v-pre>localField</code> from the input documents. If a document in the <code v-pre>from</code> collection does not contain the <code v-pre>foreignField</code>, the <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup" target="_blank" rel="noopener noreferrer"><code v-pre>$lookup</code><ExternalLinkIcon/></a> treats the value as <code v-pre>null</code> for matching purposes.</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#std-label-lookup-eq-as" target="_blank" rel="noopener noreferrer">as<ExternalLinkIcon/></a></td>
<td style="text-align:left">Specifies the name of the new array field to add to the input documents. The new array field contains the matching documents from the <code v-pre>from</code> collection. If the specified name already exists in the input document, the existing field is <em>overwritten</em>.</td>
</tr>
</tbody>
</table>
<p>上面的查询语句等效为：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span><span class="token punctuation">,</span> <span class="token operator">&lt;</span>output array field<span class="token operator">></span>
<span class="token keyword">FROM</span> collection
<span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>output array field<span class="token operator">></span> <span class="token operator">IN</span> <span class="token punctuation">(</span>
   <span class="token keyword">SELECT</span> <span class="token operator">*</span>
   <span class="token keyword">FROM</span> <span class="token operator">&lt;</span>collection <span class="token keyword">to</span> <span class="token keyword">join</span><span class="token operator">></span>
   <span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>foreignField<span class="token operator">></span> <span class="token operator">=</span> <span class="token operator">&lt;</span>collection<span class="token punctuation">.</span>localField<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小例子-1" tabindex="-1"><a class="header-anchor" href="#小例子-1" aria-hidden="true">#</a> 小例子</h3>
<p>订单表</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.orders.insertMany( [
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
   { "_id" : 3  }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>库存表</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.inventory.insertMany( [
   { "_id" : 1, "sku" : "almonds", "description": "product 1", "instock" : 120 },
   { "_id" : 2, "sku" : "bread", "description": "product 2", "instock" : 80 },
   { "_id" : 3, "sku" : "cashews", "description": "product 3", "instock" : 60 },
   { "_id" : 4, "sku" : "pecans", "description": "product 4", "instock" : 70 },
   { "_id" : 5, "sku": null, "description": "Incomplete" },
   { "_id" : 6 }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询语句</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.orders.aggregate( [
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询结果</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
   <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
   <span class="token property">"item"</span> <span class="token operator">:</span> <span class="token string">"almonds"</span><span class="token punctuation">,</span>
   <span class="token property">"price"</span> <span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
   <span class="token property">"quantity"</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
   <span class="token property">"inventory_docs"</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token property">"sku"</span> <span class="token operator">:</span> <span class="token string">"almonds"</span><span class="token punctuation">,</span> <span class="token property">"description"</span> <span class="token operator">:</span> <span class="token string">"product 1"</span><span class="token punctuation">,</span> <span class="token property">"instock"</span> <span class="token operator">:</span> <span class="token number">120</span> <span class="token punctuation">}</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
   <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
   <span class="token property">"item"</span> <span class="token operator">:</span> <span class="token string">"pecans"</span><span class="token punctuation">,</span>
   <span class="token property">"price"</span> <span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
   <span class="token property">"quantity"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
   <span class="token property">"inventory_docs"</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token property">"sku"</span> <span class="token operator">:</span> <span class="token string">"pecans"</span><span class="token punctuation">,</span> <span class="token property">"description"</span> <span class="token operator">:</span> <span class="token string">"product 4"</span><span class="token punctuation">,</span> <span class="token property">"instock"</span> <span class="token operator">:</span> <span class="token number">70</span> <span class="token punctuation">}</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">{</span>
   <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
   <span class="token property">"inventory_docs"</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token property">"sku"</span> <span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span> <span class="token property">"description"</span> <span class="token operator">:</span> <span class="token string">"Incomplete"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token number">6</span> <span class="token punctuation">}</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


