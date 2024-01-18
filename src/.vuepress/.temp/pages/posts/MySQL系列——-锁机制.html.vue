<template><div><h3 id="两阶段锁协议" tabindex="-1"><a class="header-anchor" href="#两阶段锁协议" aria-hidden="true">#</a> 两阶段锁协议</h3>
<p>两阶段锁协议（2PL）是一种能够保证事务可串行化的协议，它将事务的获取锁和释放锁划分成了增长（Growing）和缩减（Shrinking）两个不同的阶段。</p>
<p>在增长阶段，一个事务可以获得锁但是不能释放锁；而在缩减阶段事务只可以释放锁，并不能获得新的锁，如果只看 2PL 的定义，那么到这里就已经介绍完了，但是它还有两个变种：</p>
<ol>
<li><strong>严格两阶段锁</strong>（Strict 2PL）：事务持有的<strong>互斥</strong>锁必须在提交后再释放；</li>
<li><strong>强两阶段锁</strong>（Rigorous 2PL）：事务持有的<strong>所有</strong>锁必须在提交后释放；</li>
</ol>
<h1 id="mysql中锁机制" tabindex="-1"><a class="header-anchor" href="#mysql中锁机制" aria-hidden="true">#</a> MySQL中锁机制</h1>
<h2 id="按粒度分" tabindex="-1"><a class="header-anchor" href="#按粒度分" aria-hidden="true">#</a> 按粒度分</h2>
<p>表锁
行锁</p>
<p>简单的说，表锁上锁的粒度是table，而行锁可以只对部分行上锁。</p>
<p>后者粒度低得多，这也是为什么InnoDB引擎是默认的引擎，除非你的数据库操作只有读，没有写和加锁读。</p>
<p>否则表锁的代价太大。</p>
<figure><img src="@source/posts/granularity-hierarchy.png" alt="granularity-hierarchy" tabindex="0" loading="lazy"><figcaption>granularity-hierarchy</figcaption></figure>
<h2 id="按是否意向锁区分" tabindex="-1"><a class="header-anchor" href="#按是否意向锁区分" aria-hidden="true">#</a> 按是否意向锁区分</h2>
<p>意向锁、非意向锁</p>
<p>（见上图）</p>
<p>虽然这种不同粒度的锁能够解决父节点被加锁时，子节点不能被加锁的问题，但是我们没有办法在子节点被加锁时，立刻确定父节点能不能被加锁。</p>
<p>在这时我们就需要引入<strong>意向锁</strong>来解决这个问题了。</p>
<p><strong>当需要给子节点加锁时，先给所有的父节点加对应的意向锁</strong>，<strong>意向锁之间是完全不会互斥的</strong>，只是用来帮助父节点快速判断是否可以对该节点进行加锁。</p>
<p>具体的，InnoDB如果需要对每一行加上行锁，那么需要先给它所在表加上意向锁。</p>
<p>加的是互斥行锁，就给表加上意向互斥锁（IX）；</p>
<p>加的是共享行锁，就给锁加上意向共享锁（IS）。</p>
<p>见下图，各种锁的兼容性矩阵。</p>
<figure><img src="@source/posts/lock-type-compatibility-matrix.png" alt="lock-type-compatibility-matrix" tabindex="0" loading="lazy"><figcaption>lock-type-compatibility-matrix</figcaption></figure>
<h2 id="按读写性质分" tabindex="-1"><a class="header-anchor" href="#按读写性质分" aria-hidden="true">#</a> 按读写性质分</h2>
<p>读锁（共享锁、S锁）
写锁（互斥锁、X锁）</p>
<p>这个锁的语义和其他地方（如Java中的<code v-pre>ReadWriteLock</code>）锁的意义是一致的。</p>
<p>读锁-读锁共享；读锁-写锁互斥；写锁-写锁互斥。</p>
<p>写操作加的都是写锁，普通读操作是不加锁的（这个读称之为MVCC的一致性非锁定读）。</p>
<p>如果需要读操作也要加锁，可以使用<code v-pre>for share</code>、<code v-pre>for update</code>）(前者也就是<code v-pre>lock in share mode </code>)。（后面会详细介绍）</p>
<blockquote>
<p>注意MySQL支持多种存储引擎，不同引擎对锁的支持是不一样的。
比如，MyISAM、Memory引擎就不支持行锁，自然也无需表级别的意向锁。
重点是InnoDB中的锁机制。</p>
</blockquote>
<h1 id="innodb存储引擎中的锁" tabindex="-1"><a class="header-anchor" href="#innodb存储引擎中的锁" aria-hidden="true">#</a> InnoDB存储引擎中的锁</h1>
<h2 id="innodb中的表级锁" tabindex="-1"><a class="header-anchor" href="#innodb中的表级锁" aria-hidden="true">#</a> InnoDB中的表级锁</h2>
<ul>
<li><strong>表级别的S锁、X锁</strong></li>
</ul>
<ol>
<li>
<p>默认情况在对一个表执行 select、insert、delete、update语句时, InnoDB引擎不会为这个表加上表级别的锁。</p>
</li>
<li>
<p>在执行一些DDL语句时，会和select、insert、delete、update产生冲突，一个阻塞另一个。</p>
<p>不过，这个不是表锁起的作用，而是位于服务器层的 <strong>元数据锁</strong>（Metadata Lock）来实现的。</p>
<p>（DDL语句执行时，<strong>会隐式提交当前会话中的事务</strong>，这个要注意)</p>
</li>
<li>
<p>InnoDB存储引擎提供的表锁其实在一般使用场景下，并不会直接使用到，只有在一些特殊场景下（服务崩溃需要对系统运维时使用）。</p>
</li>
</ol>
<p><strong>如何加表锁</strong></p>
<p>在系统变量为 <code v-pre>autocommit = 0</code>和<code v-pre>innodb_table_locks = 1</code>时，</p>
<div class="language-SQL line-numbers-mode" data-ext="SQL"><pre v-pre class="language-SQL"><code>LOCK TABLES t READ; # 表级别读锁
LOCK TABLES T WRITE; # 表级别的写锁
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>表级别的IS、IX锁</strong></p>
<p>在需要加行锁的时候，需要先给所在的表加上意向锁。加意向锁的作用和意图在上面已经说过了。</p>
</li>
<li>
<p><strong>表级别的AUTO-INC锁</strong></p>
</li>
</ul>
<p>如何实现对具有<strong>AUTO_INCREMENT</strong>属性的列的自增？</p>
<p>这个时候需要使用到表级别的<strong>自增锁</strong>。</p>
<p>注意这个AUTO-INC锁的作用范围只有单个插入语句，在插入语句完成后，这把锁就会被释放。</p>
<p>还有一个更轻量的实现，就是在获取到需要的自增值就立即释放锁，不必等待插入语句完成。</p>
<p>可以使用<code v-pre>innodb_autoinc_lock_mode</code>控制使用哪个实现。</p>
<h2 id="innodb中的行级锁" tabindex="-1"><a class="header-anchor" href="#innodb中的行级锁" aria-hidden="true">#</a> InnoDB中的行级锁</h2>
<p>InnoDB中的行级锁有下面几种概念， 共同实现了行锁这个语义。</p>
<ul>
<li>
<p><strong>Record Lock</strong></p>
<p>记录锁，官方叫它“LOCK_REC_NOT_GAP”，顾名思义，锁住的是真实的数据行。</p>
</li>
<li>
<p><strong>Gap Lock</strong></p>
<p>间隙锁，&quot;LOCK_GAP&quot;</p>
<p>这个间隙锁，锁住的是数据记录之间的间隙。</p>
<p>为什么要锁住间隙？这个gap lock的提出是为了解决”幻行“现象的发生。</p>
<p>所谓幻读，就是一个事务向另一个事务读范围中插入了一条记录，然后另一个事务就读到了“幻行”（虽然说MVCC的一致性读很大程度上可以避免，但是彻底避免幻读就需要使用gap lock）。</p>
</li>
</ul>
<img src="gap-lock.png" style="zoom:50%;" />
<p>如上图，再给7上间隙锁的时候，其他事务无法向(5,7)之间插入行记录。这就是<strong>锁住间隙</strong>的作用。</p>
<ul>
<li><strong>Next-key Lock</strong></li>
</ul>
<p>临键锁，官方叫它”LOCK_ORDINARY“,从这个英文名字就可以看出。</p>
<p>这个锁才是正常使用的加的行锁。</p>
<img src="next-key-lock.png" style="zoom:50%;" />
<p>如上，临键锁实际上记录锁和间隙锁的合体。给某个记录加上临键锁，实际上锁住了这条记录和它前面的间隙。</p>
<p>所以说临键锁是”左开右闭“的。</p>
<h1 id="innodb锁的内存结构" tabindex="-1"><a class="header-anchor" href="#innodb锁的内存结构" aria-hidden="true">#</a> InnoDB锁的内存结构</h1>
<p>上面讲到了表锁和行锁。</p>
<p>表锁的对象的是一个表，可以为这张表生成一个锁结构。</p>
<p>如果是行锁呢？难不成为每一个数据行都要生成一个锁结构吧，这个对内存消耗太大了，也不利于管理。</p>
<p>所以，符合下面这些条件的记录的锁实际上使用一个锁结构就可以做到。</p>
<ul>
<li>同一个事务中</li>
<li>加锁的类型一样</li>
<li>等待状态一样</li>
<li>被加锁的记录在同一个页面中</li>
</ul>
<img src="lock-structure.png" style="zoom:30%;" />
<ul>
<li>
<p><strong>锁所在的事务信息</strong>：无论表级锁还是行级锁，都是属于一个事务的，这里记载着属于这个事务的信息。</p>
</li>
<li>
<p><strong>索引信息</strong>：对于行级锁而言，需要记录一下加锁的记录属于哪个索引。</p>
</li>
<li>
<p>表锁或者行锁信息：</p>
<p>如果是行锁的话：</p>
<ul>
<li>Space ID：记录所在表空间。</li>
<li>Page Number：记录所在的页号</li>
<li>n_bits：对弈行级锁而言，一条记录对应一个比特，实际上就是用一个位图结构去记录那些行记录被加了锁，n_bits则是表示使用了多少比特。</li>
</ul>
</li>
<li>
<p><strong>type mode</strong></p>
<ul>
<li>
<p><strong>lock_mode</strong>（锁模式）</p>
<ul>
<li>LOCK_IS（共享意向锁）</li>
<li>LOCK_IX（独占意向锁）</li>
<li>LOCK_S（共享锁）</li>
<li>LOCK_X（独占锁）</li>
<li>LOCK_AUTO_INC（AUTO_INC锁）</li>
</ul>
</li>
<li>
<p><strong>lock_type</strong>（锁类型）</p>
<ul>
<li>LOCK_TABLE（表级锁）</li>
<li>LOCK_REC （行级锁）</li>
</ul>
</li>
<li>
<p><strong>rec_lock_type</strong> （行锁的具体类型，只有当lock_type为LOCK_REC时才是有效的）</p>
<ul>
<li>LOCK_ORDINARY（next_key临键锁）</li>
<li>LOCK_GAP（间隙锁）</li>
<li>LOCK_REC_NOT_GAP（记录锁）</li>
<li>LOCK_INSERT_INTENTION（插入意向锁）</li>
</ul>
</li>
<li>
<p><strong>LOCK_WAITING</strong></p>
<p>1 表示当前事务尚未得到锁，正处于等待状态，0 表示当前事务已经或得到锁。</p>
</li>
</ul>
</li>
</ul>
<p>其实仅仅看这个一个type mode 的结构皆可以知道MySQL锁的整体结构了。</p>
<figure><img src="@source/posts/typemode.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>其他信息</li>
</ul>
<p>为了更好地管理系统运行过程中生成的锁结构，有哈希表、链表等等数据结构方便管理</p>
<ul>
<li>
<p>比特数组</p>
<p>n_bits属性指出这个位图有多大，那么这一堆比特位就是用来隐射这一页中有哪些记录加上了锁的。</p>
</li>
</ul>
<h1 id="查看事务的加锁情况" tabindex="-1"><a class="header-anchor" href="#查看事务的加锁情况" aria-hidden="true">#</a> 查看事务的加锁情况</h1>
<p>也许需要打开一些配置项：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> <span class="token keyword">GLOBAL</span> innodb_status_output<span class="token operator">=</span><span class="token keyword">ON</span><span class="token punctuation">;</span>
<span class="token keyword">SET</span> <span class="token keyword">GLOBAL</span> innodb_status_output_locks<span class="token operator">=</span><span class="token keyword">ON</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在MySQL Clinet中使用<code v-pre>show engine innodb status</code></p>
<p>这里只列出关于事务和锁的信息，其余信息省略：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 当前活动的事务 </span>
TRANSACTIONS
------------
<span class="token comment"># 下一个分配的事务ID信息</span>
Trx <span class="token function">id</span> counter <span class="token number">7203081</span>
Purge <span class="token keyword">done</span> <span class="token keyword">for</span> trx<span class="token string">'s n:o &lt; 7203074 undo n:o &lt; 0 state: running but idle
# 每个回滚段中都有一个History链表，链表的长度为 57
History list length 57

# 下面对于每一个会话列出它的事务信息
LIST OF TRANSACTIONS FOR EACH SESSION:
#  每一个'</span>---TRANSACTION' 后面跟着响应的事务的信息
---TRANSACTION <span class="token number">422190990756560</span>, not started
<span class="token number">0</span> lock struct<span class="token punctuation">(</span>s<span class="token punctuation">)</span>, heap size <span class="token number">1136</span>, <span class="token number">0</span> row lock<span class="token punctuation">(</span>s<span class="token punctuation">)</span>

<span class="token comment"># 事务ID7203080, 活跃了 163 秒</span>
---TRANSACTION <span class="token number">7203080</span>, ACTIVE <span class="token number">163</span> sec
<span class="token comment"># 2个锁结构， 7个行锁（实际上只有6条记录）（这里的锁结构指的就是前面的锁的内存结构）</span>
<span class="token number">2</span> lock struct<span class="token punctuation">(</span>s<span class="token punctuation">)</span>, heap size <span class="token number">1136</span>, <span class="token number">7</span> row lock<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token comment"># MySQL内部线程号、操作系统中的线程号等信息</span>
MySQL thread <span class="token function">id</span> <span class="token number">17</span>, OS thread handle <span class="token number">13048123392</span>, query <span class="token function">id</span> <span class="token number">389</span> localhost <span class="token number">127.0</span>.0.1 root

<span class="token comment"># 锁结构1. 表级别的意向互斥锁</span>
TABLE LOCK table <span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span><span class="token builtin class-name">.</span><span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span> trx <span class="token function">id</span> <span class="token number">7203080</span> lock mode IX
<span class="token comment"># 锁结构2. 记录锁（</span>
<span class="token comment"># 详细解释：表空间号是106，页号是4，锁的位图大小为80，索引是PRIMARY聚簇索引，X型实际上是next-key-lock，（aka 临键锁）</span>
RECORD LOCKS space <span class="token function">id</span> <span class="token number">106</span> page no <span class="token number">4</span> n bits <span class="token number">80</span> index PRIMARY of table <span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span><span class="token builtin class-name">.</span><span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span> trx <span class="token function">id</span> <span class="token number">7203080</span> lock_mode X
<span class="token comment"># 紧接着就是加锁记录的详细信息</span>
Record lock, heap no <span class="token number">1</span> PHYSICAL RECORD: n_fields <span class="token number">1</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">8</span><span class="token punctuation">;</span> hex 73757072656d756d<span class="token punctuation">;</span> asc supremum<span class="token punctuation">;</span><span class="token punctuation">;</span>

Record lock, heap no <span class="token number">2</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000000</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0502<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span>  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 0100000164102a<span class="token punctuation">;</span> asc     d *<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000000</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000000</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000000</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>

Record lock, heap no <span class="token number">3</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0502<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span>  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 01000001641060<span class="token punctuation">;</span> asc     d `<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>

Record lock, heap no <span class="token number">4</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0551<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span> Q<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 010000012c112d<span class="token punctuation">;</span> asc     , -<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>

Record lock, heap no <span class="token number">5</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000001e<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0502<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span>  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 01000001641100<span class="token punctuation">;</span> asc     d  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000001e<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000001e<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000001e<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>

Record lock, heap no <span class="token number">6</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000028</span><span class="token punctuation">;</span> asc    <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e13cd<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span>  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 02000001591605<span class="token punctuation">;</span> asc     Y  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000028</span><span class="token punctuation">;</span> asc    <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000028</span><span class="token punctuation">;</span> asc    <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000028</span><span class="token punctuation">;</span> asc    <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span>

Record lock, heap no <span class="token number">7</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000032</span><span class="token punctuation">;</span> asc    <span class="token number">2</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0990<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span>  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 020000013e14d7<span class="token punctuation">;</span> asc     <span class="token operator">></span>  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000032</span><span class="token punctuation">;</span> asc    <span class="token number">2</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000032</span><span class="token punctuation">;</span> asc    <span class="token number">2</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000032</span><span class="token punctuation">;</span> asc    <span class="token number">2</span><span class="token punctuation">;</span><span class="token punctuation">;</span>

--------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="死锁" tabindex="-1"><a class="header-anchor" href="#死锁" aria-hidden="true">#</a> 死锁</h2>
<p>死锁示例sql：</p>
<p>事务1</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">start</span> <span class="token keyword">transaction</span> <span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> test_lock <span class="token keyword">where</span> primary_id <span class="token operator">=</span> <span class="token number">10</span> <span class="token keyword">for</span> <span class="token keyword">update</span> <span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> test_lock <span class="token keyword">where</span> primary_id <span class="token operator">=</span> <span class="token number">20</span> <span class="token keyword">for</span> <span class="token keyword">update</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事务2</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">start</span> <span class="token keyword">transaction</span> <span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> test_lock <span class="token keyword">where</span> primary_id <span class="token operator">=</span> <span class="token number">20</span> <span class="token keyword">for</span> <span class="token keyword">update</span> <span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> test_lock <span class="token keyword">where</span> primary_id <span class="token operator">=</span> <span class="token number">10</span> <span class="token keyword">for</span> <span class="token keyword">update</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>InnoDB的死锁检测机制</strong></p>
<p>当它检测到死锁发生时，会选择一个较小的事务（所谓较小的事务，就是在事务执行过程中插入、更新后删除的记录较少的事务）进行回滚（这个是自动完成的），并向客户端发送一条消息：<code v-pre>[40001][1213] Deadlock found when trying to get lock; try restarting transaction</code> .</p>
<blockquote>
<p>那么如何定位到死锁的发生的地方呢？</p>
</blockquote>
<p>仍然是使用<code v-pre>show engine innnodb status</code>来查看死锁信息：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>------------------------
<span class="token comment"># 最近一次捕捉的死锁信息</span>
LATEST DETECTED DEADLOCK
------------------------
<span class="token comment"># 死锁发生时间</span>
<span class="token number">2021</span>-11-27 <span class="token number">11</span>:49:06 0x309c3d000
<span class="token comment"># 死锁发生时的第一个事务信息</span>
*** <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> TRANSACTION:
TRANSACTION <span class="token number">7203086</span>, ACTIVE <span class="token number">12</span> sec starting index <span class="token builtin class-name">read</span>
<span class="token comment"># 该事务使用了一个表，为一个表上了锁</span>
mysql tables <span class="token keyword">in</span> use <span class="token number">1</span>, locked <span class="token number">1</span>
<span class="token comment"># 拥有 3 个锁结构，2个行锁</span>
LOCK WAIT <span class="token number">3</span> lock struct<span class="token punctuation">(</span>s<span class="token punctuation">)</span>, heap size <span class="token number">1136</span>, <span class="token number">2</span> row lock<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token comment"># 线程信息</span>
MySQL thread <span class="token function">id</span> <span class="token number">24</span>, OS thread handle <span class="token number">13048426496</span>, query <span class="token function">id</span> <span class="token number">978</span> localhost <span class="token number">127.0</span>.0.1 root statistics
<span class="token comment"># 发生锁时执行的SQL语句</span>
/* <span class="token assign-left variable">ApplicationName</span><span class="token operator">=</span>DataGrip <span class="token number">2020.3</span>.1 */ <span class="token keyword">select</span> * from test_lock where primary_id <span class="token operator">=</span> <span class="token number">20</span> <span class="token keyword">for</span> update
<span class="token comment"># 当前线程正在等待获取的锁</span>
*** <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space <span class="token function">id</span> <span class="token number">106</span> page no <span class="token number">4</span> n bits <span class="token number">80</span> index PRIMARY of table <span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span><span class="token builtin class-name">.</span><span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span> trx <span class="token function">id</span> <span class="token number">7203086</span> lock_mode X locks rec but not gap waiting
<span class="token comment"># 这条记录正对应着 select * from test_lock where primary_id = 20 for update ;</span>
Record lock, heap no <span class="token number">4</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0551<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span> Q<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 010000012c112d<span class="token punctuation">;</span> asc     , -<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>

<span class="token comment"># 死锁发生时的第二个事务信息</span>
*** <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> TRANSACTION:
TRANSACTION <span class="token number">7203087</span>, ACTIVE <span class="token number">9</span> sec starting index <span class="token builtin class-name">read</span>
mysql tables <span class="token keyword">in</span> use <span class="token number">1</span>, locked <span class="token number">1</span>
<span class="token number">3</span> lock struct<span class="token punctuation">(</span>s<span class="token punctuation">)</span>, heap size <span class="token number">1136</span>, <span class="token number">2</span> row lock<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
MySQL thread <span class="token function">id</span> <span class="token number">25</span>, OS thread handle <span class="token number">13048729600</span>, query <span class="token function">id</span> <span class="token number">987</span> localhost <span class="token number">127.0</span>.0.1 root statistics
/* <span class="token assign-left variable">ApplicationName</span><span class="token operator">=</span>DataGrip <span class="token number">2020.3</span>.1 */ <span class="token keyword">select</span> * from test_lock where primary_id <span class="token operator">=</span> <span class="token number">10</span> <span class="token keyword">for</span> update
<span class="token comment"># 此事务已经或得到的锁</span>
*** <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> HOLDS THE LOCK<span class="token punctuation">(</span>S<span class="token punctuation">)</span>:
RECORD LOCKS space <span class="token function">id</span> <span class="token number">106</span> page no <span class="token number">4</span> n bits <span class="token number">80</span> index PRIMARY of table <span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span><span class="token builtin class-name">.</span><span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span> trx <span class="token function">id</span> <span class="token number">7203087</span> lock_mode X locks rec but not gap
<span class="token comment"># 这条记录正对应着 select * from test_lock where primary_id = 20 for update ;</span>
Record lock, heap no <span class="token number">4</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0551<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span> Q<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 010000012c112d<span class="token punctuation">;</span> asc     , -<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex <span class="token number">80000014</span><span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token comment"># 此事务等待的锁</span>
*** <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space <span class="token function">id</span> <span class="token number">106</span> page no <span class="token number">4</span> n bits <span class="token number">80</span> index PRIMARY of table <span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span><span class="token builtin class-name">.</span><span class="token variable"><span class="token variable">`</span>test_lock<span class="token variable">`</span></span> trx <span class="token function">id</span> <span class="token number">7203087</span> lock_mode X locks rec but not gap waiting
Record lock, heap no <span class="token number">3</span> PHYSICAL RECORD: n_fields <span class="token number">6</span><span class="token punctuation">;</span> compact <span class="token function">format</span><span class="token punctuation">;</span> info bits <span class="token number">0</span>
 <span class="token number">0</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">1</span>: len <span class="token number">6</span><span class="token punctuation">;</span> hex 0000002e0502<span class="token punctuation">;</span> asc    <span class="token builtin class-name">.</span>  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">2</span>: len <span class="token number">7</span><span class="token punctuation">;</span> hex 01000001641060<span class="token punctuation">;</span> asc     d `<span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">3</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">4</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>
 <span class="token number">5</span>: len <span class="token number">4</span><span class="token punctuation">;</span> hex 8000000a<span class="token punctuation">;</span> asc     <span class="token punctuation">;</span><span class="token punctuation">;</span>

<span class="token comment"># InnoDB决定回滚第二个事务</span>
*** WE ROLL BACK TRANSACTION <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过注意，默认只记录最近一次死锁信息，可以将全局变量<code v-pre>innodb_print_all_deadlocks</code>设置为ON，这样的话</p>
<p>死锁发生的信息就会都记录在MySQL的错误日志中，然后就可以通过查看错误日志来分析更多的日志情况了。</p>
<p>于是，根据死锁发生的死锁日志来逆向定位产生的死锁的语句，然后再优化我们的业务。</p>
<h1 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h1>
<blockquote>
<p><a href="https://draveness.me/database-concurrency-control/" target="_blank" rel="noopener noreferrer">浅谈数据库并发控制 - 锁和 MVCC<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


