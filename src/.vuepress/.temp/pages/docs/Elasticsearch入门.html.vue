<template><div><h1 id="背景知识" tabindex="-1"><a class="header-anchor" href="#背景知识" aria-hidden="true">#</a> 背景知识</h1>
<h2 id="elaticsearch-stack-简介" tabindex="-1"><a class="header-anchor" href="#elaticsearch-stack-简介" aria-hidden="true">#</a> Elaticsearch Stack 简介</h2>
<p>Elaticsearch，简称为es， es是一个高扩展的、<strong>分布式</strong>的、<strong>RESTful 风格</strong>的<strong>搜索和数据分析引擎</strong>。</p>
<p>它可以近乎实时的存储、检索数据。本身扩展性很好，可以扩展到上百台服务器，处理PB级别的数据。</p>
<p>Es也使用<strong>Java开发</strong>并使用Lucene作为其核心来实现所有索引和搜索的功能，但是它的目的是通过简单的RESTful API来隐藏Lucene的复杂性，从而让全文搜索变得简单。</p>
<h2 id="kibana简介" tabindex="-1"><a class="header-anchor" href="#kibana简介" aria-hidden="true">#</a> Kibana简介</h2>
<p>Kibana 是一个免费且开放的用户界面，能够让您对 Elasticsearch 数据进行可视化，并让您在 Elastic Stack 中进行导航。您可以进行各种操作，从跟踪查询负载，到理解请求如何流经您的整个应用，都能轻松完成。</p>
<p>Es技术栈还有其他工具，目前介绍这两个。</p>
<h1 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h1>
<p>下面是二者下载链接，下载相应的版本即可。</p>
<p><a href="https://www.elastic.co/cn/downloads/elasticsearch" target="_blank" rel="noopener noreferrer">elasticsearch下载<ExternalLinkIcon/></a></p>
<p><a href="https://www.elastic.co/cn/downloads/kibana" target="_blank" rel="noopener noreferrer">kibana下载<ExternalLinkIcon/></a></p>
<p>或者对于mac用户直接使用brew安装启动即可（学习环境使用）</p>
<p>(M1的mac)</p>
<ul>
<li>安装 elasticsearch</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> elastic/tap/elasticsearch-full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>安装 kibana</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> elastic/tap/kibana-full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>分别启动。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew services start elasticsearch-full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew services start kibana-full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问</p>
<p>es的默认端口 9200： http://localhost:9200/</p>
<p>kibana的默认端口 5601： http://localhost:5601/</p>
<p>注意：9300是tcp通讯端口，集群间和TCPClient都使用该端口，9200是http协议的RESTful接口。</p>
<p>如果正常展示web界面，以及如下文字，说明安装启动一切正常。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"SongyangJi-MacBookAir.local"</span><span class="token punctuation">,</span>
  <span class="token property">"cluster_name"</span> <span class="token operator">:</span> <span class="token string">"elasticsearch_jisongyang"</span><span class="token punctuation">,</span>
  <span class="token property">"cluster_uuid"</span> <span class="token operator">:</span> <span class="token string">"wCrPSWgyQnCCCVCr0Hhc1g"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"number"</span> <span class="token operator">:</span> <span class="token string">"7.14.2"</span><span class="token punctuation">,</span>
    <span class="token property">"build_flavor"</span> <span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
    <span class="token property">"build_type"</span> <span class="token operator">:</span> <span class="token string">"tar"</span><span class="token punctuation">,</span>
    <span class="token property">"build_hash"</span> <span class="token operator">:</span> <span class="token string">"6bc13727ce758c0e943c3c21653b3da82f627f75"</span><span class="token punctuation">,</span>
    <span class="token property">"build_date"</span> <span class="token operator">:</span> <span class="token string">"2021-09-15T10:18:09.722761972Z"</span><span class="token punctuation">,</span>
    <span class="token property">"build_snapshot"</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"lucene_version"</span> <span class="token operator">:</span> <span class="token string">"8.9.0"</span><span class="token punctuation">,</span>
    <span class="token property">"minimum_wire_compatibility_version"</span> <span class="token operator">:</span> <span class="token string">"6.8.0"</span><span class="token punctuation">,</span>
    <span class="token property">"minimum_index_compatibility_version"</span> <span class="token operator">:</span> <span class="token string">"6.0.0-beta1"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"tagline"</span> <span class="token operator">:</span> <span class="token string">"You Know, for Search"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="elasticsearch相关概念术语" tabindex="-1"><a class="header-anchor" href="#elasticsearch相关概念术语" aria-hidden="true">#</a> Elasticsearch相关概念术语</h1>
<h2 id="关系型数据库的比较与联系" tabindex="-1"><a class="header-anchor" href="#关系型数据库的比较与联系" aria-hidden="true">#</a> 关系型数据库的比较与联系</h2>
<table>
<thead>
<tr>
<th>数据库实例/Es集群</th>
<th>库/索引</th>
<th>表/类型</th>
<th>行/文档</th>
<th>列/字段</th>
</tr>
</thead>
<tbody>
<tr>
<td>RelationalDB</td>
<td>Databases</td>
<td>Tables</td>
<td>Rows</td>
<td>Columns</td>
</tr>
<tr>
<td>Elasticsearch</td>
<td>Indexes</td>
<td>Types</td>
<td>Documents</td>
<td>Fields</td>
</tr>
</tbody>
</table>
<h2 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h2>
<ul>
<li>
<p>index (索引)
一个索引就是一个拥有几分相似特征的文档的集合。</p>
</li>
<li>
<p>type（类型）
在一个索引中，你可以定义一种或多种类型。一个类型是你的索引的一个逻辑上的分类/分区，其语义完全由你来定。通常，会为具有一组共同字段的文档定义一个类型。</p>
</li>
</ul>
<p>不过，明显上述的概念定义是有点模糊的（不像关系型数据库的库表关系那样泾渭分明），所以在后来的版本中就取消了type这个语义。</p>
<ul>
<li>
<p>document 文档
一个文档是一个可被索引的基础信息单元。文档以JSON（Javascript Object Notation）格式来表示，而JSON是一个到处存在的互联网数据交互格式。在一个index，你可以存储任意多的文档。</p>
</li>
<li>
<p>field 字段</p>
<p>相当于是数据表的字段，对文档数据根据不同属性进行的分类标识，也就是 Json 中的键。</p>
</li>
<li>
<p>mapping 映射</p>
<p><strong>mapping是处理数据的方式和规则方面做一些限制</strong>，如某个字段的数据类型、默认值、分析器、是否被索引等等，这些都是映射里面可以设置的，其它就是处理es里面数据的一些使用规则设置也叫做映射，按着最优规则处理数据对性能提高很大，因此才需要建立映射，并且需要思考如何建立映射才能对性能更好。</p>
</li>
</ul>
<h1 id="与-elasticsearch-交互" tabindex="-1"><a class="header-anchor" href="#与-elasticsearch-交互" aria-hidden="true">#</a> 与 Elasticsearch 交互</h1>
<p>你可以</p>
<ul>
<li>使用elasticsearch提供的UI工具
<ol>
<li>elasticsearch-head插件</li>
<li>kibana的dev-tools</li>
</ol>
</li>
<li>使用elasticsearch提供的Restful接口直接访问
<ol>
<li>cURL</li>
<li>postman</li>
</ol>
</li>
<li>使用elasticsearch提供的API进行访问
也就是用程序调api去与es交互，也是程序开发者的最关心的交互方式。</li>
</ul>
<h2 id="curl" tabindex="-1"><a class="header-anchor" href="#curl" aria-hidden="true">#</a> curl</h2>
<p>如果使用curl的话</p>
<ul>
<li>语法</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -X<span class="token operator">&lt;</span>VERB<span class="token operator">></span> <span class="token string">'&lt;PROTOCOL>://&lt;HOST>:&lt;PORT>/&lt;PATH>?&lt;QUERY_STRING>'</span> <span class="token parameter variable">-d</span> <span class="token string">'&lt;BODY>'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>各字段的含义：</p>
<table>
<thead>
<tr>
<th><code v-pre>VERB</code></th>
<th>适当的 HTTP <em>方法</em> 或 <em>谓词</em> : <code v-pre>GET</code>、 <code v-pre>POST</code>、 <code v-pre>PUT</code>、 <code v-pre>HEAD</code> 或者 <code v-pre>DELETE</code>。</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>PROTOCOL</code></td>
<td><code v-pre>http</code> 或者 <code v-pre>https</code>（如果你在 Elasticsearch 前面有一个 <code v-pre>https</code> 代理）</td>
</tr>
<tr>
<td><code v-pre>HOST</code></td>
<td>Elasticsearch 集群中任意节点的主机名，或者用 <code v-pre>localhost</code> 代表本地机器上的节点。</td>
</tr>
<tr>
<td><code v-pre>PORT</code></td>
<td>运行 Elasticsearch HTTP 服务的端口号，默认是 <code v-pre>9200</code> 。</td>
</tr>
<tr>
<td><code v-pre>PATH</code></td>
<td>API 的终端路径（例如 <code v-pre>_count</code> 将返回集群中文档数量）。Path 可能包含多个组件，例如：<code v-pre>_cluster/stats</code> 和 <code v-pre>_nodes/stats/jvm</code> 。</td>
</tr>
<tr>
<td><code v-pre>QUERY_STRING</code></td>
<td>任意可选的查询字符串参数 (例如 <code v-pre>?pretty</code> 将格式化地输出 JSON 返回值，使其更容易阅读)</td>
</tr>
<tr>
<td><code v-pre>BODY</code></td>
<td>一个 JSON 格式的请求体 (如果请求需要的话)</td>
</tr>
</tbody>
</table>
<h2 id="使用kibana" tabindex="-1"><a class="header-anchor" href="#使用kibana" aria-hidden="true">#</a> 使用kibana</h2>
<p>在kibana的开发者工具<a href="http://localhost:5601/app/dev_tools#/console" target="_blank" rel="noopener noreferrer">console<ExternalLinkIcon/></a>。</p>
<p>以下为 <strong>version 7.14.2</strong> 的示范操作。</p>
<h3 id="索引的crud" tabindex="-1"><a class="header-anchor" href="#索引的crud" aria-hidden="true">#</a> 索引的CRUD</h3>
<h4 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h4>
<div class="language-http line-numbers-mode" data-ext="http"><pre v-pre class="language-http"><code>PUT /problem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回值</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"acknowledged"</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"shards_acknowledged"</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"index"</span> <span class="token operator">:</span> <span class="token string">"problem"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看索引" tabindex="-1"><a class="header-anchor" href="#查看索引" aria-hidden="true">#</a> 查看索引</h4>
<div class="language-http line-numbers-mode" data-ext="http"><pre v-pre class="language-http"><code>GET /problem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只介绍其中几个字段的含义：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"problem"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"aliases"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 索引的别名</span>
    <span class="token property">"mappings"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// mapping的规则</span>
    <span class="token property">"settings"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  
      <span class="token property">"index"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"routing"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"allocation"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"include"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"_tier_preference"</span> <span class="token operator">:</span> <span class="token string">"data_content"</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"number_of_shards"</span> <span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>  <span class="token comment">// 分片的数量，低版本的默认值是5，现在默认是1</span>
        <span class="token property">"provided_name"</span> <span class="token operator">:</span> <span class="token string">"problem"</span><span class="token punctuation">,</span> 
        <span class="token property">"creation_date"</span> <span class="token operator">:</span> <span class="token string">"1635053207532"</span><span class="token punctuation">,</span> <span class="token comment">// 创建时间戳</span>
        <span class="token property">"number_of_replicas"</span> <span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>  <span class="token comment">// 备份的数量</span>
        <span class="token property">"uuid"</span> <span class="token operator">:</span> <span class="token string">"HfPT1GNyTTmYAXCSjIVoVA"</span><span class="token punctuation">,</span>
        <span class="token property">"version"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  
          <span class="token property">"created"</span> <span class="token operator">:</span> <span class="token string">"7140299"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除索引" tabindex="-1"><a class="header-anchor" href="#删除索引" aria-hidden="true">#</a> 删除索引</h4>
<div class="language-http line-numbers-mode" data-ext="http"><pre v-pre class="language-http"><code>DELETE /index
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"acknowledged"</span> <span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文档的crud" tabindex="-1"><a class="header-anchor" href="#文档的crud" aria-hidden="true">#</a> 文档的CRUD</h3>
<h4 id="创建文档" tabindex="-1"><a class="header-anchor" href="#创建文档" aria-hidden="true">#</a> 创建文档</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>POST problem/_doc
{
    "difficult_level": "简单",
    "id": "1486",
    "name": "数组异或操作",
    "passing_rate": "84.3%",
    "passing_rate_number": 0.843,
    "solutions": 381,
    "uri": "xor-operation-in-an-array"
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"_index"</span> <span class="token operator">:</span> <span class="token string">"problem"</span><span class="token punctuation">,</span>
  <span class="token property">"_type"</span> <span class="token operator">:</span> <span class="token string">"_doc"</span><span class="token punctuation">,</span>
  <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token string">"SJ7bsHwBtcEm-AFPQqjS"</span><span class="token punctuation">,</span> <span class="token comment">// 此id便是自动生成的</span>
  <span class="token property">"_version"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">"result"</span> <span class="token operator">:</span> <span class="token string">"created"</span><span class="token punctuation">,</span>
  <span class="token property">"_shards"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"total"</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">"successful"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"failed"</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"_seq_no"</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">"_primary_term"</span> <span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入完文档后，可以看看这个index的信息。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"problem"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"aliases"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 发现 mappings 信息多了出来，主要是刚刚插入的json串的键的信息，如类型，名称等等</span>
    <span class="token property">"mappings"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> 
      <span class="token property">"properties"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"difficult_level"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span>
          <span class="token property">"fields"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"keyword"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"keyword"</span><span class="token punctuation">,</span>
              <span class="token property">"ignore_above"</span> <span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"id"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span>
          <span class="token property">"fields"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"keyword"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"keyword"</span><span class="token punctuation">,</span>
              <span class="token property">"ignore_above"</span> <span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span>
          <span class="token property">"fields"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"keyword"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"keyword"</span><span class="token punctuation">,</span>
              <span class="token property">"ignore_above"</span> <span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"passing_rate"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span>
          <span class="token property">"fields"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"keyword"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"keyword"</span><span class="token punctuation">,</span>
              <span class="token property">"ignore_above"</span> <span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"passing_rate_number"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"float"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"solutions"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"long"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"uri"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span>
          <span class="token property">"fields"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"keyword"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"keyword"</span><span class="token punctuation">,</span>
              <span class="token property">"ignore_above"</span> <span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"settings"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"index"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"routing"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"allocation"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"include"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"_tier_preference"</span> <span class="token operator">:</span> <span class="token string">"data_content"</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"number_of_shards"</span> <span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
        <span class="token property">"provided_name"</span> <span class="token operator">:</span> <span class="token string">"problem"</span><span class="token punctuation">,</span>
        <span class="token property">"creation_date"</span> <span class="token operator">:</span> <span class="token string">"1635053636611"</span><span class="token punctuation">,</span>
        <span class="token property">"number_of_replicas"</span> <span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
        <span class="token property">"uuid"</span> <span class="token operator">:</span> <span class="token string">"v12NNzubQ1u9g6x9wN9W0A"</span><span class="token punctuation">,</span>
        <span class="token property">"version"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"created"</span> <span class="token operator">:</span> <span class="token string">"7140299"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查询文档" tabindex="-1"><a class="header-anchor" href="#查询文档" aria-hidden="true">#</a> 查询文档</h4>
<p>搜索API的最基础的形式是没有指定任何查询的空搜索，它简单地返回集群中所有索引下的所有文档：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>GET /_search
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里我们搜索刚才创建的problem的索引</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>GET problem/_search
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"took"</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 执行整个搜索请求耗费了多少毫秒</span>
  <span class="token property">"timed_out"</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否超时, 可以指定 timeout 为 10 或者 10ms（10毫秒），或者 1s（1秒）如，GET /_search?timeout=10ms</span>

  <span class="token property">"_shards"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 在查询中参与分片的总数，以及这些分片成功了多少个失败了多少个</span>
    <span class="token property">"total"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"successful"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"skipped"</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"failed"</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"hits"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 结果中最重要的部分是 hits</span>
    <span class="token property">"total"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 配到的文档总数</span>
      <span class="token property">"value"</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">"relation"</span> <span class="token operator">:</span> <span class="token string">"eq"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"max_score"</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token comment">// 查询所匹配文档的 _score 的最大值</span>
    <span class="token property">"hits"</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">"_index"</span> <span class="token operator">:</span> <span class="token string">"problem"</span><span class="token punctuation">,</span>
        <span class="token property">"_type"</span> <span class="token operator">:</span> <span class="token string">"_doc"</span><span class="token punctuation">,</span>
        <span class="token property">"_id"</span> <span class="token operator">:</span> <span class="token string">"SJ7bsHwBtcEm-AFPQqjS"</span><span class="token punctuation">,</span> <span class="token comment">// 自动生成的id</span>
        <span class="token property">"_score"</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token comment">// 衡量了文档与查询的匹配程度,  返回的文档是按照 _score 降序排列的</span>
        <span class="token property">"_source"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 源文档，是你自己添加的文档</span>
          <span class="token property">"difficult_level"</span> <span class="token operator">:</span> <span class="token string">"简单"</span><span class="token punctuation">,</span>
          <span class="token property">"id"</span> <span class="token operator">:</span> <span class="token string">"1486"</span><span class="token punctuation">,</span>
          <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"数组异或操作"</span><span class="token punctuation">,</span>
          <span class="token property">"passing_rate"</span> <span class="token operator">:</span> <span class="token string">"84.3%"</span><span class="token punctuation">,</span>
          <span class="token property">"passing_rate_number"</span> <span class="token operator">:</span> <span class="token number">0.843</span><span class="token punctuation">,</span>
          <span class="token property">"solutions"</span> <span class="token operator">:</span> <span class="token number">381</span><span class="token punctuation">,</span>
          <span class="token property">"uri"</span> <span class="token operator">:</span> <span class="token string">"xor-operation-in-an-array"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="相关链接" tabindex="-1"><a class="header-anchor" href="#相关链接" aria-hidden="true">#</a> 相关链接</h1>
<p><a href="https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html" target="_blank" rel="noopener noreferrer">Elasticsearch: 权威指南（中文）<ExternalLinkIcon/></a></p>
<p><a href="https://www.elastic.co/guide/en/elasticsearch/reference/7.15/index.html" target="_blank" rel="noopener noreferrer">Elasticsearch Guide<ExternalLinkIcon/></a></p>
<p><a href="https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#reference" target="_blank" rel="noopener noreferrer">Spring 整合 Elasticsearch<ExternalLinkIcon/></a></p>
</div></template>


