<template><div><h1 id="redolog介绍" tabindex="-1"><a class="header-anchor" href="#redolog介绍" aria-hidden="true">#</a> RedoLog介绍</h1>
<h2 id="引言——mysql如何做到事务的持久性" tabindex="-1"><a class="header-anchor" href="#引言——mysql如何做到事务的持久性" aria-hidden="true">#</a> 引言——MySQL如何做到事务的持久性</h2>
<p>MySQL中如何修改数据呢，先从磁盘中加载数据页到InnoDB buffer pool中，然后从InnoDB buffer pool 中取出页面，进行读写操作。</p>
<p>那么如何做到事务的持久性呢，也就是说如何确保InnoDB buffer pool中的脏页一定会被刷新到磁盘从而做到持久化呢？</p>
<p>一种最简单的方法，在事务提交成功之前，确保脏页被刷新到磁盘，换句话说，只有在脏页写到磁盘上之后，事务提交才算成功。</p>
<p>不过这种方案有缺点：</p>
<ol>
<li><strong>每次都刷新一个完整的页到磁盘性能开销很大</strong>。比如，一个页面中只有几个字节被修改的时候，刷新完整的页面到磁盘很浪费。</li>
<li><strong>磁盘的随机IO很慢</strong>，一个事务修改的很多页面可能并不相邻，这个时候每个事务结束前都这样同步刷新的磁盘随机IO代价很大。</li>
</ol>
<p>MySQL采取的做法是，仅仅记录下那些修改的操作，譬如<strong>修改某个表空间的某个页面的某个偏移量的某几个字节</strong>，然后将这样的记录及时写到文件中。然后每次事务提交前只需要刷新这样的日志文件到磁盘即可。</p>
<p>而这样的日志文件就是 <strong>rodo log</strong> 了。</p>
<p>刷新redo-log而不是完整的数据页到磁盘的好处有：</p>
<ol>
<li>redo日志相对来讲比较紧凑，占用的空间比较小；</li>
<li>redo日志是顺序写入磁盘的，磁盘的顺序IO效率很高。</li>
</ol>
<h2 id="redo日志格式" tabindex="-1"><a class="header-anchor" href="#redo日志格式" aria-hidden="true">#</a> redo日志格式</h2>
<p>redo log 包括两部分：</p>
<ol>
<li>
<p>一个是内存中的日志缓冲(redo log buffer)；</p>
</li>
<li>
<p>另一个是磁盘上的日志文件(redo log file)。</p>
</li>
</ol>
<p>下面依次介绍</p>
<ol>
<li>type：这条redo日志的格式；</li>
<li>space ID：表空间 ID；</li>
<li>page number：页号；</li>
<li>data：这条redo日志的具体内容。</li>
</ol>
<p>具体来说redo日志的种类有非常多，这里就不细谈了。</p>
<p>挖个坑。</p>
<h2 id="mini-transaction-的概念" tabindex="-1"><a class="header-anchor" href="#mini-transaction-的概念" aria-hidden="true">#</a> Mini-transaction 的概念</h2>
<p>MySQL对底层页面的一次原子性的访问成为一个Mini-Transaction（MTR）</p>
<p>一个MTR产生多个redo日志。</p>
<p>之所以把它成为迷你的一个事务，是因为在进行崩溃恢复的时候需要把这一组redo日志作为一个不可分割的整体来处理。</p>
<img src="@source/posts/mtr.png" style="zoom:30%;" />
<h2 id="redo日志的管理" tabindex="-1"><a class="header-anchor" href="#redo日志的管理" aria-hidden="true">#</a> redo日志的管理</h2>
<h3 id="log-block" tabindex="-1"><a class="header-anchor" href="#log-block" aria-hidden="true">#</a> log block</h3>
<p>redo日志放在大小为512字节的log block 中。每一个block被分为 3 部分：</p>
<ul>
<li>log block header</li>
<li>log block body</li>
<li>log block trailer</li>
</ul>
<p>而真正的redo日志是被放在占用 496 字节的 block body 中的。</p>
<h3 id="redo-log-buffer" tabindex="-1"><a class="header-anchor" href="#redo-log-buffer" aria-hidden="true">#</a> redo log buffer</h3>
<p>为了解决磁盘速度过慢的问题，写入redo日志也不是直接立即写到磁盘中的。</p>
<p>于是，MySQL向操作系统申请了一大片内存，称为redo 日志缓冲区，也成为 redo buffer，</p>
<p>一个redo buffer有若干的 log block 构成。可以指定<code v-pre>innodb_log_buffer_size</code>来指定 log buffer 的大小。</p>
<p>向 log buffer 中写入redo日志也是顺序写入的。</p>
<h2 id="redo-log的刷盘时机" tabindex="-1"><a class="header-anchor" href="#redo-log的刷盘时机" aria-hidden="true">#</a> redo log的刷盘时机</h2>
<p>redo日志总留在log buffer中，总是不安全的，只要没有写到稳定的存储介质（磁盘、固定硬盘等等）中就不能保证持久性。</p>
<p>那么在什么情况下，redo日志会被写到磁盘上呢？</p>
<ol>
<li>
<p>事务提交时：道理很好理解，事务提交还没有将redo log 刷盘就无法做到持久性；</p>
</li>
<li>
<p>log buffer 空间不足时：log buffer 这块内存总是有限大小的，那么在redo log不够使用时，也需要即使把redo log 刷新到磁盘。InnoDB在日志量达到总容量的额50% 时，就会刷盘；</p>
</li>
<li>
<p>后台线程定时刷新；</p>
</li>
<li>
<p>正常关闭服务器时；</p>
</li>
<li>
<p>做checkpoint时。</p>
</li>
</ol>
<h2 id="redo日志文件" tabindex="-1"><a class="header-anchor" href="#redo日志文件" aria-hidden="true">#</a> redo日志文件</h2>
<p>之前谈的所有的redo log其实都是内存性的结构，那么存在在稳定介质中的便是 redo日志文件了。</p>
<p>磁盘上的日志文件不止一个，而是以一个日志文件组的形式出现，一个日志文件组由多个日志文件组成，名字形式为&quot;ib_logfile[数字]&quot;。
每个日志文件的大小由<code v-pre>innodb_log_file_size</code>指定，默认是 48 MB。
日志文件组文件的个数由<code v-pre>innodb_log_files_in_group</code>指定，默认是2个。</p>
<p>所以，总体的日志文件的大小便是<strong>innodb_log_file_size*innodb_log_files_in_group</strong>，</p>
<p>如果以循环的方法向redo日志文件中写入数据，那岂不是新写入的会覆盖旧写入的吗？</p>
<p>如何解决这个问题，MySQL提出了 checkpoint的概念（后面或介绍）。</p>
<p>每个日志的文件格式是一样的，日志组内的其他的日志文件也是具有相同的格式。</p>
<p>前2048个字节存储一些管理信息，后面的字节，实际上就是对内存中的log buffer的镜像。</p>
<h2 id="log-sequence-number相关" tabindex="-1"><a class="header-anchor" href="#log-sequence-number相关" aria-hidden="true">#</a> log-sequence-number相关</h2>
<h3 id="lsn" tabindex="-1"><a class="header-anchor" href="#lsn" aria-hidden="true">#</a> lsn</h3>
<p>InndoDB设计了名为lsn的全局变量，用来记录当前已经写入的<strong>lsn</strong>值，初始值为8704，然后不断递增。</p>
<p>lsn指的是写入的redo 日志量，这包括了写到了 log buffer 中但没有刷新到磁盘的redo日志。</p>
<h3 id="flushed-to-disk-lsn" tabindex="-1"><a class="header-anchor" href="#flushed-to-disk-lsn" aria-hidden="true">#</a> flushed_to_disk_lsn</h3>
<p>相应的，InndoDB设计者提出了一个表示刷新到磁盘中的redo日志量的全局变量<strong>flushed_to_disk_lsn</strong>。</p>
<p>一开始，lsn等于flushed_to_disk_lsn，随着系统的运行，redo日志不断写入log buffer，但又没有即使刷盘，那么flushed_to_disk_lsn便和lsn拉开了差距。</p>
<h3 id="checkpoint-lsn" tabindex="-1"><a class="header-anchor" href="#checkpoint-lsn" aria-hidden="true">#</a> checkpoint_lsn</h3>
<p>redo日志的大小总是有限的，那么就有必要对其进行重复利用。</p>
<p>具体的，如果redo日志对应的脏页已经刷新到磁盘，那么此时就没有必要再去保留这样的redo日志，</p>
<p>于是InnodB使用<strong>checkpoint_lsn</strong>表示当前系统中可以被覆盖redo日志总量是多少，这个变量的初始值也是8704。</p>
<p>MySQL中有后台线程在脏页刷新到磁盘的时候执行一次checkpoint操作，就是查看是否可以增加checkpoint_lsn（但是不是说只要刷新脏页就一定执行一次checkpoint操作）。</p>
<h2 id="innodb-flush-log-at-trx-commit" tabindex="-1"><a class="header-anchor" href="#innodb-flush-log-at-trx-commit" aria-hidden="true">#</a> innodb_flush_log_at_trx_commit</h2>
<p>它的取值有3种：</p>
<ul>
<li>0 ：事务提交时不会立即向磁盘同步redo日志。这样会加快处理速度，但是失去持久性这一保证，不可取。</li>
<li>1 ：事务提交时必须将redo日志同步到磁盘，这样可以保证事务的持久性。默认值就是1。</li>
<li>2：这是一个折中的选择，事务提交的时候需要同步到操作系统的写磁盘的缓冲区，但不一定要真正写到磁盘上。所以，如果数据库挂了，但是操作系统还没挂，持久性还是可以保证的；反之，持久性还是无法保证。</li>
</ul>
<h1 id="崩溃恢复" tabindex="-1"><a class="header-anchor" href="#崩溃恢复" aria-hidden="true">#</a> 崩溃恢复</h1>
<p>redo日志最重要的甚至是唯一的功能就是在数据库崩溃的时候提供数据恢复的保证了。</p>
<p>崩溃恢复的时候先找到恢复的起点。然后顺着日志文件就可以将数据正确恢复起来。</p>
<p>但是这个过程可以加快。</p>
<p>为了避免页面的随机IO，可以实现将redo文件的所有redo文件按照<strong>spaceID和pageNumber</strong>
为键，然后组织成一张哈希表，然后遍历这张hash表就可以一次性完成对一个页面的恢复。
当然，同一个页面的redo日志必须安装时间顺序排序。</p>
</div></template>


