<template><div><h1 id="数据库" tabindex="-1"><a class="header-anchor" href="#数据库" aria-hidden="true">#</a> 数据库</h1>
<h2 id="查看" tabindex="-1"><a class="header-anchor" href="#查看" aria-hidden="true">#</a> 查看</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>show dbs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>use data_base_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 先切过去</span>
use to_delete_db
<span class="token comment"># 后删除</span>
db.dropDatabase<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="集合" tabindex="-1"><a class="header-anchor" href="#集合" aria-hidden="true">#</a> 集合</h1>
<h2 id="查看-1" tabindex="-1"><a class="header-anchor" href="#查看-1" aria-hidden="true">#</a> 查看</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.getCollectionNames<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建-1" tabindex="-1"><a class="header-anchor" href="#创建-1" aria-hidden="true">#</a> 创建</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建集合</span>
db.createCollection<span class="token punctuation">(</span>collection_name,options<span class="token punctuation">)</span>
<span class="token comment"># 或者直接使用集合名去插入文档，就自动创建集合</span>
db.mycol.insert<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"key"</span> <span class="token builtin class-name">:</span> <span class="token string">"value"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除-1" tabindex="-1"><a class="header-anchor" href="#删除-1" aria-hidden="true">#</a> 删除</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.collection_name.drop<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h1>
<h2 id="插入文档" tabindex="-1"><a class="header-anchor" href="#插入文档" aria-hidden="true">#</a> 插入文档</h2>
<h3 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h3>
<ul>
<li><code v-pre>save()</code>：如果 _id 主键存在则更新数据，如果不存在就插入数据。该方法新版本中已废弃，可以使用 db.collection.insertOne() 或 db.collection.replaceOne() 来代替。</li>
<li><code v-pre>insert()</code>: 若插入的数据主键已经存在，则会抛 org.springframework.dao.DuplicateKeyException 异常，提示主键重复，不保存当前数据。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.COLLECTION_NAME.insert<span class="token punctuation">(</span>document<span class="token punctuation">)</span>

db.COLLECTION_NAME.save<span class="token punctuation">(</span>document<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不过下面的两个方法都已经过期，不要使用了.</strong></p>
<ul>
<li><code v-pre>insertOne()</code>
传入一个json对象。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.insertOne<span class="token punctuation">(</span>
   <span class="token punctuation">{</span> item: <span class="token string">"canvas"</span>, qty: <span class="token number">100</span>, tags: <span class="token punctuation">[</span><span class="token string">"cotton"</span><span class="token punctuation">]</span>, size: <span class="token punctuation">{</span> h: <span class="token number">28</span>, w: <span class="token number">35.5</span>, uom: <span class="token string">"cm"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>insertMany()</code>
传入一个数组，里面是Json对象。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.insertMany<span class="token punctuation">(</span><span class="token punctuation">[</span>
   <span class="token punctuation">{</span> item: <span class="token string">"journal"</span>, qty: <span class="token number">25</span>, tags: <span class="token punctuation">[</span><span class="token string">"blank"</span>, <span class="token string">"red"</span><span class="token punctuation">]</span>, size: <span class="token punctuation">{</span> h: <span class="token number">14</span>, w: <span class="token number">21</span>, uom: <span class="token string">"cm"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span> item: <span class="token string">"mat"</span>, qty: <span class="token number">85</span>, tags: <span class="token punctuation">[</span><span class="token string">"gray"</span><span class="token punctuation">]</span>, size: <span class="token punctuation">{</span> h: <span class="token number">27.9</span>, w: <span class="token number">35.5</span>, uom: <span class="token string">"cm"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span> item: <span class="token string">"mousepad"</span>, qty: <span class="token number">25</span>, tags: <span class="token punctuation">[</span><span class="token string">"gel"</span>, <span class="token string">"blue"</span><span class="token punctuation">]</span>, size: <span class="token punctuation">{</span> h: <span class="token number">19</span>, w: <span class="token number">22.85</span>, uom: <span class="token string">"cm"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插入行为" tabindex="-1"><a class="header-anchor" href="#插入行为" aria-hidden="true">#</a> 插入行为</h3>
<ul>
<li>
<p>集合创建
如果该集合当前不存在，则插入操作将创建该集合。</p>
</li>
<li>
<p>_id字段
在MongoDB中，存储在集合中的每个文档都需要一个唯一的 _id字段作为主键。如果插入的文档省略了该_id字段，则MongoDB驱动程序会自动为该字段生成一个ObjectId, 键名为&quot;_id&quot; 。</p>
</li>
<li>
<p>原子性
MongoDB中的所有写操作在单个文档级别上都是原子性的。</p>
</li>
<li>
<p>写确认
对于写入问题，您可以指定从MongoDB请求的写入操作的确认级别。</p>
</li>
</ul>
<h2 id="查询文档" tabindex="-1"><a class="header-anchor" href="#查询文档" aria-hidden="true">#</a> 查询文档</h2>
<p>在任何数据库中，差不多查询是花样的最多的了。</p>
<h3 id="过滤器" tabindex="-1"><a class="header-anchor" href="#过滤器" aria-hidden="true">#</a> 过滤器</h3>
<p>先介绍一个所谓的过滤器概念。
这个也就是<strong>对匹配的文档进行操作</strong>，如查询、投影、更改、删除。</p>
<p>在MongoDB里，文档是一个重要的要素，<strong>过滤器也是一个文档</strong>。
<strong>文档通过并列、嵌套形成更复杂的查询条件。</strong></p>
<p>也不奇怪，MongoDB被称为文档型数据库了。</p>
<p>最简单的过滤器就是<strong>空过滤器</strong>。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 空文档</span>
db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">)</span>
<span class="token comment"># </span>
db.inventory.find<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h3>
<p><a href="https://docs.mongodb.com/manual/reference/operator/query/#std-label-query-selectors" target="_blank" rel="noopener noreferrer">更多的运算符，看这里<ExternalLinkIcon/></a></p>
<h4 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符" aria-hidden="true">#</a> 比较运算符</h4>
<table>
<thead>
<tr>
<th>运算符</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>$eq</td>
<td>匹配等于指定值的值。 （=）</td>
</tr>
<tr>
<td>$gt</td>
<td>匹配大于指定值的值。（&gt;）</td>
</tr>
<tr>
<td>$gte</td>
<td>匹配大于或等于指定值的值。（&gt;=）</td>
</tr>
<tr>
<td>$in</td>
<td>匹配数组中指定的任何值。</td>
</tr>
<tr>
<td>$lt</td>
<td>匹配小于指定值的值。（&lt;）</td>
</tr>
<tr>
<td>$lte</td>
<td>匹配小于或等于指定值的值。（&lt;=）</td>
</tr>
<tr>
<td>$ne</td>
<td>匹配所有不等于指定值的值。 （!=）</td>
</tr>
<tr>
<td>$nin</td>
<td>不匹配数组中指定的任何值。</td>
</tr>
</tbody>
</table>
<p>举例：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 相等条件</span>
<span class="token punctuation">{</span> <span class="token operator">&lt;</span>field<span class="token operator"><span class="token file-descriptor important">1</span>></span>: <span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span>, <span class="token punctuation">..</span>. <span class="token punctuation">}</span> 
<span class="token comment"># 不等于条件</span>
<span class="token punctuation">{</span><span class="token operator">&lt;</span>key<span class="token operator">></span>:<span class="token punctuation">{</span><span class="token string">"<span class="token variable">$ne</span>"</span>:<span class="token operator">&lt;</span>value<span class="token operator">></span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token comment"># 大于</span>
<span class="token punctuation">{</span><span class="token operator">&lt;</span>key<span class="token operator">></span>:<span class="token punctuation">{</span><span class="token string">"<span class="token variable">$gt</span>"</span>:<span class="token operator">&lt;</span>value<span class="token operator">></span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token comment"># 小于</span>
<span class="token punctuation">{</span><span class="token operator">&lt;</span>key<span class="token operator">></span>:<span class="token punctuation">{</span><span class="token string">"<span class="token variable">$lt</span>"</span>:<span class="token operator">&lt;</span>value<span class="token operator">></span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token comment"># 小于等于</span>
<span class="token punctuation">{</span><span class="token operator">&lt;</span>key<span class="token operator">></span>:<span class="token punctuation">{</span><span class="token string">"<span class="token variable">$gte</span>"</span>:<span class="token operator">&lt;</span>value<span class="token operator">></span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token comment"># 大于等于</span>
<span class="token punctuation">{</span><span class="token operator">&lt;</span>key<span class="token operator">></span>:<span class="token punctuation">{</span><span class="token string">"<span class="token variable">$lte</span>"</span>:<span class="token operator">&lt;</span>value<span class="token operator">></span><span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token comment"># in</span>
<span class="token punctuation">{</span><span class="token operator">&lt;</span>key<span class="token operator">></span>:<span class="token punctuation">{</span><span class="token string">"<span class="token variable">$in</span>"</span>:<span class="token punctuation">[</span><span class="token operator">&lt;</span>v<span class="token operator"><span class="token file-descriptor important">1</span>></span>,<span class="token operator">&lt;</span>v<span class="token operator"><span class="token file-descriptor important">2</span>></span>,<span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符" aria-hidden="true">#</a> 逻辑运算符</h4>
<table>
<thead>
<tr>
<th>运算符</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>$and</td>
<td>用逻辑联接查询子句AND将返回两个子句都符合条件的所有文档。</td>
</tr>
<tr>
<td>$not</td>
<td>反转查询表达式的效果，并返回与查询表达式不匹配的文档。</td>
</tr>
<tr>
<td>$nor</td>
<td>用逻辑联接查询子句NOR将返回两个子句均不匹配的所有文档。</td>
</tr>
<tr>
<td>$or</td>
<td>用逻辑联接查询子句OR将返回符合任一子句条件的所有文档。</td>
</tr>
</tbody>
</table>
<ul>
<li><strong>指定OR条件</strong>
使用$or运算符，您可以指定一个复合查询，该查询将每个子句与逻辑连接符连接在一起，OR以便该查询选择集合中至少匹配一个条件的文档。</li>
</ul>
<p><strong>注意它的组织方式，其中键是&quot;$or&quot; ；值是一个数组，数组里面是 若干个文档，当然还可以继续嵌套下去。</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token variable">$or</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> status: <span class="token string">"A"</span> <span class="token punctuation">}</span>, <span class="token punctuation">{</span> qty: <span class="token punctuation">{</span> <span class="token variable">$lt</span><span class="token builtin class-name">:</span> <span class="token number">30</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>指定AND条件</strong>
对于AND的话，当然也可以按照OR的方式依葫芦画瓢。不过，还可以直接隐式使用 <code v-pre>,</code>分割多个键值对。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> status: <span class="token string">"A"</span>, qty: <span class="token punctuation">{</span> <span class="token variable">$lt</span><span class="token builtin class-name">:</span> <span class="token number">30</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同时指定AND和OR</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span>
     status: <span class="token string">"A"</span>,
     <span class="token variable">$or</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> qty: <span class="token punctuation">{</span> <span class="token variable">$lt</span><span class="token builtin class-name">:</span> <span class="token number">30</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>, <span class="token punctuation">{</span> item: <span class="token string">'p'</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其余的运算符就不细说了，这里只介绍最常用的。</p>
<h3 id="其他查询技巧、用法" tabindex="-1"><a class="header-anchor" href="#其他查询技巧、用法" aria-hidden="true">#</a> 其他查询技巧、用法</h3>
<h4 id="嵌套文档" tabindex="-1"><a class="header-anchor" href="#嵌套文档" aria-hidden="true">#</a> 嵌套文档</h4>
<p>说白了，那些过滤器不仅仅可以出现数字、字符串这些，可以<strong>用文档过滤</strong>。</p>
<p>如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> size: <span class="token punctuation">{</span> h: <span class="token number">14</span>, w: <span class="token number">21</span>, uom: <span class="token string">"cm"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="嵌套字段" tabindex="-1"><a class="header-anchor" href="#嵌套字段" aria-hidden="true">#</a> 嵌套字段</h4>
<p>就像使用 对象一样，链式地选择某个字段。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">"size.h"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$lt</span><span class="token builtin class-name">:</span> <span class="token number">15</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="关于数组" tabindex="-1"><a class="header-anchor" href="#关于数组" aria-hidden="true">#</a> 关于数组</h3>
<h4 id="数组相关运算符。" tabindex="-1"><a class="header-anchor" href="#数组相关运算符。" aria-hidden="true">#</a> 数组相关运算符。</h4>
<table>
<thead>
<tr>
<th>运算符</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>$all</td>
<td>匹配包含查询中指定的所有元素的数组。（忽略顺序）</td>
</tr>
<tr>
<td>$size</td>
<td>如果数组字的大小为指定大小，则选择文档。</td>
</tr>
<tr>
<td>$elemMatch</td>
<td>如果array字段中的元素符合所有指定 $elemMatch 条件，则选择文档。</td>
</tr>
</tbody>
</table>
<p>下面的&quot;tags&quot;是一个数组</p>
<ol>
<li><strong>匹配一个数组</strong>
这里匹配，必须是完全匹配，元素顺序也要相同。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> tags: <span class="token punctuation">[</span><span class="token string">"red"</span>, <span class="token string">"blank"</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>相反，如果您希望找到一个同时包含元素&quot;red&quot;和 &quot;blank&quot;的数组，而不考虑该数组中的顺序或其他元素，请使用$all运算符：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> tags: <span class="token punctuation">{</span> <span class="token variable">$all</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">"red"</span>, <span class="token string">"blank"</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li><strong>针对一个元素去查询数组</strong>
最简单的，数组包含这个元素：&quot;tags&quot;是一个数组，它有包含元素&quot;red&quot;</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> tags: <span class="token string">"red"</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你还可以使用操作符指定查询条件：</p>
<p>dim_cm是一个数组，匹配条件是数组里面至少有一个大于25的元素。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> dim_cm: <span class="token punctuation">{</span> <span class="token variable">$gt</span><span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><strong>为数组元素指定多个条件</strong></li>
</ol>
<p>在数组元素上使用复合过滤条件查询数组:</p>
<p>注意匹配条件是，有一个元素大于15，有一个元素小于20（当然可以有同一个一个元素同时满足也算匹配）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> dim_cm: <span class="token punctuation">{</span> <span class="token variable">$gt</span><span class="token builtin class-name">:</span> <span class="token number">15</span>, <span class="token variable">$lt</span><span class="token builtin class-name">:</span> <span class="token number">20</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询满足多个条件的数组元素：</p>
<p>注意必须是至少包含同一个元素同时满足大于22且小于30</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> dim_cm: <span class="token punctuation">{</span> <span class="token variable">$elemMatch</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$gt</span><span class="token builtin class-name">:</span> <span class="token number">22</span>, <span class="token variable">$lt</span><span class="token builtin class-name">:</span> <span class="token number">30</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li><strong>通过数组索引位置查询元素</strong></li>
</ol>
<p>使用点号引用。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">"dim_cm.1"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$gt</span><span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按数组长度查询数组:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">"tags"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$size</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="关于嵌入文档的数组" tabindex="-1"><a class="header-anchor" href="#关于嵌入文档的数组" aria-hidden="true">#</a> 关于嵌入文档的数组</h3>
<p>demo data</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.insertMany<span class="token punctuation">(</span> <span class="token punctuation">[</span>
   <span class="token punctuation">{</span> item: <span class="token string">"journal"</span>, instock: <span class="token punctuation">[</span> <span class="token punctuation">{</span> warehouse: <span class="token string">"A"</span>, qty: <span class="token number">5</span> <span class="token punctuation">}</span>, <span class="token punctuation">{</span> warehouse: <span class="token string">"C"</span>, qty: <span class="token number">15</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span> item: <span class="token string">"notebook"</span>, instock: <span class="token punctuation">[</span> <span class="token punctuation">{</span> warehouse: <span class="token string">"C"</span>, qty: <span class="token number">5</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span> item: <span class="token string">"paper"</span>, instock: <span class="token punctuation">[</span> <span class="token punctuation">{</span> warehouse: <span class="token string">"A"</span>, qty: <span class="token number">60</span> <span class="token punctuation">}</span>, <span class="token punctuation">{</span> warehouse: <span class="token string">"B"</span>, qty: <span class="token number">15</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span> item: <span class="token string">"planner"</span>, instock: <span class="token punctuation">[</span> <span class="token punctuation">{</span> warehouse: <span class="token string">"A"</span>, qty: <span class="token number">40</span> <span class="token punctuation">}</span>, <span class="token punctuation">{</span> warehouse: <span class="token string">"B"</span>, qty: <span class="token number">5</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span> item: <span class="token string">"postcard"</span>, instock: <span class="token punctuation">[</span> <span class="token punctuation">{</span> warehouse: <span class="token string">"B"</span>, qty: <span class="token number">15</span> <span class="token punctuation">}</span>, <span class="token punctuation">{</span> warehouse: <span class="token string">"C"</span>, qty: <span class="token number">35</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查询嵌套在数组中的文档" tabindex="-1"><a class="header-anchor" href="#查询嵌套在数组中的文档" aria-hidden="true">#</a> 查询嵌套在数组中的文档</h4>
<p>相等匹配需要指定文档的精确匹配，包括字段顺序。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">"instock"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> warehouse: <span class="token string">"A"</span>, qty: <span class="token number">5</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="在文档数组中的字段上指定查询条件" tabindex="-1"><a class="header-anchor" href="#在文档数组中的字段上指定查询条件" aria-hidden="true">#</a> 在文档数组中的字段上指定查询条件</h4>
<ol>
<li>对嵌入在文档数组中的字段指定查询条件</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">'instock.qty'</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$lte</span><span class="token builtin class-name">:</span> <span class="token number">20</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中instock是数组，qty是数组中的文档的字段。</p>
<ol start="2">
<li>使用数组索引查询嵌入文档中的字段</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">'instock.0.qty'</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$lte</span><span class="token builtin class-name">:</span> <span class="token number">20</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="为文档数组指定多个条件" tabindex="-1"><a class="header-anchor" href="#为文档数组指定多个条件" aria-hidden="true">#</a> 为文档数组指定多个条件</h4>
<ol>
<li>同一个嵌入文档上指定多个条件</li>
</ol>
<p>使用<code v-pre>$elemMatch</code>运算符在一组嵌入文档上指定多个条件，以便至少一个嵌入文档满足所有指定的条件。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">"instock"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$elemMatch</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> qty: <span class="token number">5</span>, warehouse: <span class="token string">"A"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>意为：查询如下的文档，这些文档的 instock 字段（是一个文档数组）中，至少有一个嵌入文档，它的qty字段为5并且warehouse字段值为”A“。</p>
<ol start="2">
<li>多个嵌入文档元素组合满足标准</li>
</ol>
<p>如果数组字段上的复合查询条件不使用 $elemMatch运算符，则查询将选择其数组包含满足条件的任意元素组合的文档。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 不一定是同一个嵌入文档满足</span>
db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">"instock.qty"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$gt</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,  <span class="token variable">$lte</span><span class="token builtin class-name">:</span> <span class="token number">20</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token string">"instock.qty"</span><span class="token builtin class-name">:</span> <span class="token number">5</span>, <span class="token string">"instock.warehouse"</span><span class="token builtin class-name">:</span> <span class="token string">"A"</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="返回文档的部分字段" tabindex="-1"><a class="header-anchor" href="#返回文档的部分字段" aria-hidden="true">#</a> 返回文档的部分字段</h3>
<p>和SQL一样可以指定返回的字段。
默认情况下返回文档的全部内容。</p>
<p>语法：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.COLLECTION.find<span class="token punctuation">(</span>过滤器, 投影文档<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>投影文档，形如：
表明只返回item、status状态</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span> item: <span class="token number">1</span>, status: <span class="token number">1</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者也可以反过来，指定不返回那些字段</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span> status: <span class="token number">0</span>, instock: <span class="token number">0</span> <span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>支持字段的嵌套，如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span> item: <span class="token number">1</span>, status: <span class="token number">1</span>, <span class="token string">"size.uom"</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查询空或缺失字段" tabindex="-1"><a class="header-anchor" href="#查询空或缺失字段" aria-hidden="true">#</a> 查询空或缺失字段</h3>
<p>demo data</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db.inventory.insertMany([
   { _id: 1, item: null },
   { _id: 2 }
])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="相等过滤器" tabindex="-1"><a class="header-anchor" href="#相等过滤器" aria-hidden="true">#</a> 相等过滤器</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> item: null <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字段为null或者字段不存在都匹配</p>
<h4 id="类型检查" tabindex="-1"><a class="header-anchor" href="#类型检查" aria-hidden="true">#</a> 类型检查</h4>
<p>BSON type编号为10 表明是null字段。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> item <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$type</span><span class="token builtin class-name">:</span> <span class="token number">10</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只匹配null。</p>
<h4 id="存在性检查" tabindex="-1"><a class="header-anchor" href="#存在性检查" aria-hidden="true">#</a> 存在性检查</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.find<span class="token punctuation">(</span> <span class="token punctuation">{</span> item <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token variable">$exists</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只匹配不存在。</p>
<h2 id="更新文档" tabindex="-1"><a class="header-anchor" href="#更新文档" aria-hidden="true">#</a> 更新文档</h2>
<ol>
<li>更新单个文档</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.updateOne<span class="token punctuation">(</span>
   <span class="token punctuation">{</span> item: <span class="token string">"paper"</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span>
     <span class="token variable">$set</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">"size.uom"</span><span class="token builtin class-name">:</span> <span class="token string">"cm"</span>, status: <span class="token string">"P"</span> <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>替换整个文档</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.replaceOne<span class="token punctuation">(</span>
   <span class="token punctuation">{</span> item: <span class="token string">"paper"</span> <span class="token punctuation">}</span>,
   <span class="token punctuation">{</span> item: <span class="token string">"paper"</span>, instock: <span class="token punctuation">[</span> <span class="token punctuation">{</span> warehouse: <span class="token string">"A"</span>, qty: <span class="token number">60</span> <span class="token punctuation">}</span>, <span class="token punctuation">{</span> warehouse: <span class="token string">"B"</span>, qty: <span class="token number">40</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新方法" tabindex="-1"><a class="header-anchor" href="#更新方法" aria-hidden="true">#</a> 更新方法</h3>
<p>MongoDB 提供了以下方法来更新集合中的文档：</p>
<table>
<thead>
<tr>
<th style="text-align:left">方法</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.updateOne()</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">即使多个文档可能与指定的过滤器匹配，也最多更新与指定过滤器匹配的单个文档。<em>3.2版中的新功能</em>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.updateMany()</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">更新与指定过滤器匹配的所有文档。<em>3.2版中的新功能</em>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#mongodb-method-db.collection.replaceOne" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.replaceOne()</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">即使多个文档可能与指定的过滤器匹配，也最多替换与指定过滤器匹配的单个文档。<em>3.2版中的新功能</em>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.update()</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">更新或替换与指定过滤器匹配的单个文档，或者更新与指定过滤器匹配的所有文档。默认情况下，该<a href="https://docs.mongodb.com/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.update()</code><ExternalLinkIcon/></a>方法更新<strong>单个</strong>文档。要更新多个文档，请使用<a href="https://docs.mongodb.com/manual/reference/method/db.collection.update/#std-label-multi-parameter" target="_blank" rel="noopener noreferrer">multi<ExternalLinkIcon/></a>选项。</td>
</tr>
</tbody>
</table>
<h3 id="更新操作" tabindex="-1"><a class="header-anchor" href="#更新操作" aria-hidden="true">#</a> 更新操作</h3>
<p>db.collection.updateOne(filter,update, options)
db.collection.updateMany(filter&gt;, update, options)
db.collection.replaceOne(filter, update, options)</p>
<p>第一个参数 filter 是过滤条件，也就是指定那些文档会被更新。</p>
<p>第二个参数 update指定具体的更新操作。</p>
<p>使用逗号分隔。</p>
<p>过滤器在介绍查询的时候已经介绍的差不多了。</p>
<p>update结构如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span>
   <span class="token operator">&lt;</span>operator<span class="token operator"><span class="token file-descriptor important">1</span>></span>: <span class="token punctuation">{</span> <span class="token operator">&lt;</span>field<span class="token operator"><span class="token file-descriptor important">1</span>></span>: <span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span>, <span class="token punctuation">..</span>. <span class="token punctuation">}</span>,
   <span class="token operator">&lt;</span>operator<span class="token operator"><span class="token file-descriptor important">2</span>></span>: <span class="token punctuation">{</span> <span class="token operator">&lt;</span>field<span class="token operator"><span class="token file-descriptor important">2</span>></span>: <span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span>, <span class="token punctuation">..</span>. <span class="token punctuation">}</span>,
   <span class="token punctuation">..</span>.
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 operator* 为操作符,下面会有介绍。</p>
<h3 id="更新操作符" tabindex="-1"><a class="header-anchor" href="#更新操作符" aria-hidden="true">#</a> 更新操作符</h3>
<p>这里只列出它们，详细的使用demo可以<a href="https://docs.mongodb.com/manual/reference/operator/update/" target="_blank" rel="noopener noreferrer">看这里<ExternalLinkIcon/></a>。</p>
<h3 id="字段" tabindex="-1"><a class="header-anchor" href="#字段" aria-hidden="true">#</a> 字段</h3>
<table>
<thead>
<tr>
<th style="text-align:left">运算符</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate" target="_blank" rel="noopener noreferrer"><code v-pre>$currentDate</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">将字段的值设置为当前日期，作为日期或时间戳。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/inc/#mongodb-update-up.-inc" target="_blank" rel="noopener noreferrer"><code v-pre>$inc</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><strong>将字段的值增加指定的数量。</strong></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/min/#mongodb-update-up.-min" target="_blank" rel="noopener noreferrer"><code v-pre>$min</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">仅当指定值小于现有字段值时才更新该字段。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/max/#mongodb-update-up.-max" target="_blank" rel="noopener noreferrer"><code v-pre>$max</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">仅当指定值大于现有字段值时才更新该字段。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/mul/#mongodb-update-up.-mul" target="_blank" rel="noopener noreferrer"><code v-pre>$mul</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">将字段的值乘以指定的数量。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/rename/#mongodb-update-up.-rename" target="_blank" rel="noopener noreferrer"><code v-pre>$rename</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><strong>重命名字段。</strong></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/set/#mongodb-update-up.-set" target="_blank" rel="noopener noreferrer"><code v-pre>$set</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><strong>设置文档中字段的值。</strong></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/#mongodb-update-up.-setOnInsert" target="_blank" rel="noopener noreferrer"><code v-pre>$setOnInsert</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">如果更新导致插入文档，则设置字段的值。对修改现有文档的更新操作没有影响。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/unset/#mongodb-update-up.-unset" target="_blank" rel="noopener noreferrer"><code v-pre>$unset</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><strong>从文档中删除指定的字段。</strong></td>
</tr>
</tbody>
</table>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<h4 id="运算符-1" tabindex="-1"><a class="header-anchor" href="#运算符-1" aria-hidden="true">#</a> 运算符</h4>
<table>
<thead>
<tr>
<th style="text-align:left">运算符</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/positional/#mongodb-update-up.-" target="_blank" rel="noopener noreferrer"><code v-pre>$</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">充当占位符以更新与查询条件匹配的第一个元素。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/positional-all/#mongodb-update-up.---" target="_blank" rel="noopener noreferrer"><code v-pre>$[\]</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">充当占位符，为匹配查询条件的文档更新数组中的所有元素。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--" target="_blank" rel="noopener noreferrer"><code v-pre>$[\]</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">充当占位符，<code v-pre>arrayFilters</code>为符合查询条件的文档更新符合条件的所有元素。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet" target="_blank" rel="noopener noreferrer"><code v-pre>$addToSet</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">仅当集合中尚不存在元素时，才将元素添加到数组中。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/pop/#mongodb-update-up.-pop" target="_blank" rel="noopener noreferrer"><code v-pre>$pop</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><strong>删除数组的第一项或最后一项。</strong></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/pull/#mongodb-update-up.-pull" target="_blank" rel="noopener noreferrer"><code v-pre>$pull</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">删除与指定查询匹配的所有数组元素。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push" target="_blank" rel="noopener noreferrer"><code v-pre>$push</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><strong>将项目添加到数组。</strong></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/pullAll/#mongodb-update-up.-pullAll" target="_blank" rel="noopener noreferrer"><code v-pre>$pullAll</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">从数组中删除所有匹配的值。</td>
</tr>
</tbody>
</table>
<h4 id="修饰符" tabindex="-1"><a class="header-anchor" href="#修饰符" aria-hidden="true">#</a> 修饰符</h4>
<table>
<thead>
<tr>
<th style="text-align:left">运算符</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/each/#mongodb-update-up.-each" target="_blank" rel="noopener noreferrer"><code v-pre>$each</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">修改<a href="https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push" target="_blank" rel="noopener noreferrer"><code v-pre>$push</code><ExternalLinkIcon/></a>和<a href="https://docs.mongodb.com/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet" target="_blank" rel="noopener noreferrer"><code v-pre>$addToSet</code><ExternalLinkIcon/></a>运算符以附加多个项目以进行数组更新。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/position/#mongodb-update-up.-position" target="_blank" rel="noopener noreferrer"><code v-pre>$position</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">修改<a href="https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push" target="_blank" rel="noopener noreferrer"><code v-pre>$push</code><ExternalLinkIcon/></a>运算符以指定要在数组中添加元素的位置。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/slice/#mongodb-update-up.-slice" target="_blank" rel="noopener noreferrer"><code v-pre>$slice</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">修改<a href="https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push" target="_blank" rel="noopener noreferrer"><code v-pre>$push</code><ExternalLinkIcon/></a>运算符以限制更新数组的大小。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/sort/#mongodb-update-up.-sort" target="_blank" rel="noopener noreferrer"><code v-pre>$sort</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">修改<a href="https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push" target="_blank" rel="noopener noreferrer"><code v-pre>$push</code><ExternalLinkIcon/></a>运算符以重新排序存储在数组中的文档。</td>
</tr>
</tbody>
</table>
<h3 id="按位" tabindex="-1"><a class="header-anchor" href="#按位" aria-hidden="true">#</a> 按位</h3>
<table>
<thead>
<tr>
<th style="text-align:left">姓名</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/operator/update/bit/#mongodb-update-up.-bit" target="_blank" rel="noopener noreferrer"><code v-pre>$bit</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">执行整数值的按位<code v-pre>AND</code>、<code v-pre>OR</code>和<code v-pre>XOR</code>更新。</td>
</tr>
</tbody>
</table>
<h3 id="行为" tabindex="-1"><a class="header-anchor" href="#行为" aria-hidden="true">#</a> 行为</h3>
<ul>
<li>
<p>原子性
<strong>MongoDB 中的所有写操作在单个文档的级别上都是原子的</strong>。</p>
</li>
<li>
<p>_id字段
设置后，您不能更新_id字段的值，也不能用具有不同_id字段值的替换文档替换现有文档。</p>
</li>
<li>
<p>次序
对于写操作，MongoDB 会保留文档字段的顺序， 但以下情况除外：</p>
</li>
</ul>
<ul>
<li><code v-pre>_id</code>字段始终是文档中的第一个字段。</li>
<li>包含renaming字段名称的更新可能会导致文档中字段的重新排序。</li>
</ul>
<h2 id="删除文档" tabindex="-1"><a class="header-anchor" href="#删除文档" aria-hidden="true">#</a> 删除文档</h2>
<p>删除操作只需传入一个<strong>过滤器</strong>指定那些文档需要被删除即可。</p>
<p>举例：</p>
<ul>
<li>删除所有文档</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.inventory.deleteMany<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>删除符合条件的文档</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.collection.deleteMany<span class="token punctuation">(</span><span class="token operator">&lt;</span>filter<span class="token operator">></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>只删除一个符合条件的文档</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>db.collection.deleteMany<span class="token punctuation">(</span><span class="token operator">&lt;</span>filter<span class="token operator">></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除方法" tabindex="-1"><a class="header-anchor" href="#删除方法" aria-hidden="true">#</a> 删除方法</h3>
<table>
<thead>
<tr>
<th style="text-align:left">方法</th>
<th style="text-align:left"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#mongodb-method-db.collection.deleteOne" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.deleteOne()</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">即使多个文档可能与指定的过滤器匹配，也最多删除一个与指定过滤器匹配的文档。<em>3.2版中的新功能</em>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#mongodb-method-db.collection.deleteMany" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.deleteMany()</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">删除与指定过滤器匹配的所有文档。<em>3.2版中的新功能</em>。</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://docs.mongodb.com/manual/reference/method/db.collection.remove/#mongodb-method-db.collection.remove" target="_blank" rel="noopener noreferrer"><code v-pre>db.collection.remove()</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">删除单个文档或与指定过滤器匹配的所有文档。</td>
</tr>
</tbody>
</table>
<h3 id="行为-1" tabindex="-1"><a class="header-anchor" href="#行为-1" aria-hidden="true">#</a> 行为</h3>
<ul>
<li>索引</li>
</ul>
<p><strong>删除操作不会删除索引</strong>，即使从集合中删除所有文档也是如此。</p>
<ul>
<li>原子性</li>
</ul>
<p>MongoDB 中的所有写操作在单个文档的级别上都是原子的。</p>
<blockquote>
<p>参考文献
<a href="https://docs.mongodb.com/manual/reference/sql-comparison/" target="_blank" rel="noopener noreferrer">SQL到MongoDB的转换<ExternalLinkIcon/></a></p>
<p><a href="https://docs.mongodb.com/manual/crud/" target="_blank" rel="noopener noreferrer">MongoDB的CRUD<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


