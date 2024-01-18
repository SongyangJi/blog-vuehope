<template><div><h1 id="前置知识" tabindex="-1"><a class="header-anchor" href="#前置知识" aria-hidden="true">#</a> 前置知识</h1>
<h2 id="事务并发执行时遇到的一致性问题" tabindex="-1"><a class="header-anchor" href="#事务并发执行时遇到的一致性问题" aria-hidden="true">#</a> 事务并发执行时遇到的一致性问题</h2>
<ul>
<li>脏写</li>
</ul>
<p>一个事务修改了另一个未提交事务修改过的数据。</p>
<ul>
<li>脏读</li>
</ul>
<p>一个事务读到了另一个未提交事务修改过的数据。</p>
<ul>
<li>不可重复读</li>
</ul>
<p>一个事务多次读到的同一数据行的值不相同。</p>
<ul>
<li>幻读</li>
</ul>
<p>一个事务多次按照同一个搜索条件，读到了不同的数据行。</p>
<h2 id="隔离级别" tabindex="-1"><a class="header-anchor" href="#隔离级别" aria-hidden="true">#</a> 隔离级别</h2>
<p>隔离级别描述了并发事务执行时对竞争数据的互相影响的程度。</p>
<p>最理想化的隔离应该每个事务执行时互不影响，互不干涉，就像数据库此时只为它一个事务使用似的。</p>
<p>不过，一般使用场景下，我们会<strong>舍弃一定的隔离性去换取一部分性能</strong>,</p>
<p>于是SQL标准设立的4个隔离级别，隔离级别越低，越有可能出现数据不一致的情况，不过并发性能也越高。</p>
<blockquote>
<p>注意，这是SQL指定的标准，不是MySQL指定的。</p>
<p>不同DBMS对隔离级别的支持也不一样。</p>
</blockquote>
<table>
<thead>
<tr>
<th>Isolation Level P1（隔离级别）</th>
<th>脏读</th>
<th>不可重复读</th>
<th>幻读</th>
</tr>
</thead>
<tbody>
<tr>
<td>READ UNCOMMITTED （读未提交）</td>
<td>Possible</td>
<td>Possible</td>
<td>Possible</td>
</tr>
<tr>
<td>READ COMMITTED（读已提交）</td>
<td>Not Possible</td>
<td>Possible</td>
<td>Possible</td>
</tr>
<tr>
<td>REPEATABLE READ （可重复读）</td>
<td>Not Possible</td>
<td>Not Possible</td>
<td>Possible</td>
</tr>
<tr>
<td>SERIALIZABLE  （可序列化）</td>
<td>Not Possible</td>
<td>Not Possible</td>
<td>Not Possible</td>
</tr>
</tbody>
</table>
<p>在任何隔离级别下，脏写都是不可接受的，这是一个对一致性影响极大的操作。</p>
<p>MySQL会用锁去保证不会有两个并发事务同时修改一条记录。</p>
<p><strong>MySQL默认使用的隔离级别是REPEATABLE READ</strong>，而且MySQL的可重复读，可以在很大程度上禁止幻读现象的发生，但不能绝对禁止（后文会给出原因）。</p>
<h1 id="mvcc" tabindex="-1"><a class="header-anchor" href="#mvcc" aria-hidden="true">#</a> MVCC</h1>
<p>Multi-Version Concurrency Control（多版本并发控制），MySQL中如何实现？</p>
<p>对于<code v-pre>READ UNCOMMITTED </code>直接读取B+树的最新记录就好了，无需任何多余操作，很简单；</p>
<p>对于<code v-pre>SERIALIZABLE</code>是通过对select语句加共享锁的方式实现的，后面会详细将锁的实现与使用；</p>
<p>对于<code v-pre>READ COMMITTED</code>和<code v-pre>REPEATABLE READ</code>的实现是比较复杂的，具体看下面的<strong>版本链+ReadView</strong>。</p>
<h2 id="版本链" tabindex="-1"><a class="header-anchor" href="#版本链" aria-hidden="true">#</a> 版本链</h2>
<ul>
<li>trx_id</li>
</ul>
<p>一个事务每次对某条聚簇索引进行更改的时候，都会把该事务的事务id赋值给trx_id列。</p>
<ul>
<li>roll_pointer</li>
</ul>
<p>每次对某条聚簇索引记录进行改动时，都会把旧的记录写入到undo日志中，这个隐藏列就相当于一个指针，可以通过它找到修改前的信息。</p>
<figure><img src="@source/posts/mvcc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如上图，每一次修改记录，就会产生一条undo日志（当然在具体实现的时候是许多条undo log）,每个undo日志也有一个 roll_pointer，那么对于某一数据行，B+树中的行记录和undo日志就构成一条版本链。</p>
<p>这条版本链在MVCC机制中起到重要作用。</p>
<h2 id="readview-一致性视图" tabindex="-1"><a class="header-anchor" href="#readview-一致性视图" aria-hidden="true">#</a> ReadView（一致性视图）</h2>
<p><code v-pre>READ COMMITTED</code>和<code v-pre>REPEATABLE READ</code>二者的一个共同的问题就是，如何判断版本链中的哪个版本是当前事务可见的。</p>
<p>MySQL设计出ReadView这样的数据结构解决这个问题。</p>
<p>它包括4个比较重要的概念：</p>
<ol>
<li><strong>m_ids</strong> : 生成此ReadView时，当前系统<strong>活跃的</strong>读写事务的事务id列表；</li>
<li><strong>min_trx_id</strong> ：生成此ReadView时，当前系统活跃的读写事务列表中最小的事务id，也就是m_ids中的最小值；</li>
<li><strong>max_trx_id</strong> ：生成此ReadView时，系统应该分配给下一个事务的事务id值；</li>
<li><strong>creator_trx_id</strong> ：生成此ReadView的事务id。</li>
</ol>
<p>有了这个ReadView，在访问某条记录时，采用下面的方式判断即可。</p>
<ol>
<li>如果被访问版本的<strong>trx_id和creator_trx_id相同</strong>，说明这个事务正在访问它自己修改过的记录，所以可见。</li>
<li>如果被访问版本的<strong>trx_id小于min_trx_id</strong>，说明生成此版本的事务在当前事务生成readview之前就已经提交了，自然也是可见的。</li>
<li>如果被访问版本的<strong>trx_id大于等于max_trx_id</strong>，表明生成此版本的事务在当前事务后才开启，所以不可见。</li>
<li>如果被访问版本的<strong>trx_id在min_trx_id-max_trx_id之间</strong>，那么需要判断trx_id是否在m_ids之间。如果在，说明此事务是活跃的，记录不可以被访问；如果不在，说明生成此已经结束，记录可见。</li>
<li>如果某个版本的记录对当前事务不可见，那么就顺着版本链往下找，并按照上面的方式判断可见性，直到遍历到最后一个版本返回空。</li>
</ol>
<p>那么具体怎么实现<code v-pre>READ COMMITTED</code>和<code v-pre>REPEATABLE READ</code>呢？</p>
<p>实际上二者的区别就在于生成ReadView的时机不同。</p>
<p><code v-pre>READ COMMITTED</code>在每次读取一条记录前都去生成ReadView，</p>
<p><code v-pre>REPEATABLE READ</code>则在第一次读取数据的时候生成ReadView（不过可以使用<code v-pre>WITH CONSISTENT SANPSHOT</code>指定一开启事务就生成ReadView）。</p>
<h2 id="二级索引和mvcc" tabindex="-1"><a class="header-anchor" href="#二级索引和mvcc" aria-hidden="true">#</a> 二级索引和MVCC</h2>
<p>注意只有聚簇索引记录才有 trx_id和roll_pointer。那么如果使用二级索引查询记录如何判断可见性呢？</p>
<ol>
<li>二级索引页面的Page Header部分有一个PAGE_MAX_TRX_ID的属性，它代表着<strong>修改</strong>该二级索引页面的最大事务id。如果此<code v-pre>PAGE_MAX_TRX_ID</code>是小于min_trx_id的，说明整个页面对当前事务都是可见的，判断完毕。</li>
<li>否则， 根据二级索引的主键值执行回表操作，得到对应的聚簇索引记录根据前面的方法判断可见性，然后对第一个可见的记录判断是否和利用二级索引查询的索引列的值相匹配，匹配，则此条记录可见；否则继续往下找，<strong>直到聚簇索引记录可见同时二级索引匹配条件满足</strong>。</li>
</ol>
<blockquote>
<p><a href="https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-95-51.pdf" target="_blank" rel="noopener noreferrer">A Critique of ANSI SQL Isolation Levels<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/hhc9_9/article/details/109394221" target="_blank" rel="noopener noreferrer">Mysql8.0下验证mysql的四种隔离级别<ExternalLinkIcon/></a></p>
<p>《MySQL是怎样运行的》</p>
</blockquote>
</div></template>


