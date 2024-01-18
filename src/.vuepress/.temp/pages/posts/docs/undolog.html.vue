<template><div><h2 id="undo-log的作用" tabindex="-1"><a class="header-anchor" href="#undo-log的作用" aria-hidden="true">#</a> undo log的作用</h2>
<p>为了保证事务的原子性，InnoDB引入了undo日志，undo日志记载了回滚操作所需的内容。</p>
<p>undo是<strong>逻辑日志</strong>，只是将数据库逻辑地恢复到原来的样子；所有修改都被逻辑地取消了，但是数据结构和页本身在回滚之后可能不大相同。</p>
<p>undo log有两个作用：<strong>提供回滚</strong>和<strong>多版本并发控制(MVCC)</strong>。</p>
<h2 id="事务id" tabindex="-1"><a class="header-anchor" href="#事务id" aria-hidden="true">#</a> 事务id</h2>
<p>在事务在对表中的记录进行修改的时候，会为这个事务分配一个唯一的事务id，这个事务id是递增的，所以事务id越小越先执行。未被分配事务id的事务的id默认是0。</p>
<h2 id="各种类型的undo-log" tabindex="-1"><a class="header-anchor" href="#各种类型的undo-log" aria-hidden="true">#</a> 各种类型的Undo log</h2>
<p>InnoDB对不同场景的设计了不同类型的undo日志，比如TRX_UNDO_INSERT_REC, TRX_UNDO_DEL_MARK_REC.</p>
<p>TRX_UNDO_UPD_EXIST_REC等等。</p>
<p>除了insert产生的undo日志中没有roll_pointer字段，其他的一般都有roll_pointer这个字段，这个字段就支撑了回滚和MVCC的功能。</p>
<figure><img src="@source/posts/docs/undolog.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="undo-log-的管理" tabindex="-1"><a class="header-anchor" href="#undo-log-的管理" aria-hidden="true">#</a> Undo log 的管理</h2>
<p>类型为FIL_PAGE_UNDO_LOG的页面，是专门用来存储undo日志的，不妨称为Undo页面。</p>
<p>一个事务写的undo日志可能在一个页面中放不下，所以MySQL使用链表来组织这些undo页面。</p>
<p>在一个事务执行过程中，最多分配4个页面链表，</p>
<p>分别是</p>
<ol>
<li>针对普通表的insert undo 链表；</li>
<li>针对普通表的update undo 链表；</li>
<li>针对临时表的insert undo 链表；</li>
<li>针对临时表的update undo 链表；</li>
</ol>
<p>每个undo页面链表都对应一个Undo Log Segment。Undo页面链表的第一个页中有一个名为Undo Log Segment Header的部分，用来存储关于这个段的信息。</p>
<p>同一个事务向一个undo链表写入的undo日志算是一个组，每个组都以一个Undo Log Header 部分开头。</p>
<h2 id="undo及redo如何记录事务" tabindex="-1"><a class="header-anchor" href="#undo及redo如何记录事务" aria-hidden="true">#</a> undo及redo如何记录事务</h2>
<h3 id="undo-redo事务的简化过程" tabindex="-1"><a class="header-anchor" href="#undo-redo事务的简化过程" aria-hidden="true">#</a> Undo + Redo事务的简化过程</h3>
<p>假设有A、B两个数据，值分别为1,2，开始一个事务，事务的操作内容为：把1修改为3，2修改为4，那么实际的记录如下（简化）：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>A.事务开始.
B.记录A=1到undo log.
C.修改A=3.
D.记录A=3到redo log.
E.记录B=2到undo log.
F.修改B=4.
G.记录B=4到redo log.
H.将redo log写入磁盘。
I.事务提交
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意是先写 undo log，再操作，最后再写redo log</strong></p>
<h3 id="崩溃恢复" tabindex="-1"><a class="header-anchor" href="#崩溃恢复" aria-hidden="true">#</a> 崩溃恢复</h3>
<p>前面说到未提交的事务和回滚了的事务也会记录Redo Log，因此在进行恢复时,这些事务要进行特殊的的处理。有2种不同的恢复策略：</p>
<ul>
<li>进行恢复时，只重做已经提交了的事务。</li>
<li>进行恢复时，<strong>重做所有事务包括未提交的事务和回滚了的事务，然后通过Undo Log回滚那些未提交的事务</strong>。</li>
</ul>
<p>MySQL数据库InnoDB存储引擎使用了B策略, InnoDB存储引擎中的恢复机制有几个特点：</p>
<ul>
<li>
<p><strong>在重做Redo Log时，并不关心事务性</strong>。 恢复时，没有BEGIN，也没有COMMIT,ROLLBACK的行为。也不关心每个日志是哪个事务的。尽管事务ID等事务相关的内容会记入Redo Log，这些内容只是被当作要操作的数据的一部分。</p>
</li>
<li>
<p>使用B策略就<strong>必须要将Undo Log持久化</strong>，而且<strong>必须要在写Redo Log之前将对应的Undo Log写入磁盘</strong>。Undo和Redo Log的这种关联，使得持久化变得复杂起来。</p>
<p>为了降低复杂度，<strong>InnoDB将Undo Log看作数据，因此记录Undo Log的操作也会记录到redo log中</strong>。</p>
<p><strong>这样undo log就可以像数据一样缓存起来</strong>，<strong>而不用在redo log之前写入磁盘了</strong>。</p>
<p>包含Undo Log操作的Redo Log，看起来是这样的：</p>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>     记录1: <span class="token operator">&lt;</span>trx1, Undo log insert <span class="token operator">&lt;</span>undo_insert …<span class="token operator">>></span> <span class="token comment"># 记录的 undo-log</span>
     记录2: <span class="token operator">&lt;</span>trx1, insert …<span class="token operator">></span> <span class="token comment"># 重做日志本身</span>
     记录3: <span class="token operator">&lt;</span>trx2, Undo log insert <span class="token operator">&lt;</span>undo_update …<span class="token operator">>></span>
     记录4: <span class="token operator">&lt;</span>trx2, update …<span class="token operator">></span>
     记录5: <span class="token operator">&lt;</span>trx3, Undo log insert <span class="token operator">&lt;</span>undo_delete …<span class="token operator">>></span>
     记录6: <span class="token operator">&lt;</span>trx3, delete …<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里，还有一个问题没有弄清楚。既然Redo没有事务性，那岂不是会重新执行被回滚了的事务？
确实是这样。同时Innodb也会将事务回滚时的操作也记录到redo log中。<strong>回滚操作本质上也是对数据进行修改，因此回滚时对数据的操作也会记录到Redo Log中</strong>。</p>
<p><strong>一个回滚了的事务的Redo Log</strong>，看起来是这样的：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>     记录1: <span class="token operator">&lt;</span>trx1, Undo log insert <span class="token operator">&lt;</span>undo_insert …<span class="token operator">>></span> <span class="token comment"># 记录的 undo-log</span>
     记录2: <span class="token operator">&lt;</span>trx1, insert A…<span class="token operator">></span> <span class="token comment"># 重做日志本身</span>
     记录3: <span class="token operator">&lt;</span>trx1, Undo log insert <span class="token operator">&lt;</span>undo_update …<span class="token operator">>></span>
     记录4: <span class="token operator">&lt;</span>trx1, update B…<span class="token operator">></span>
     记录5: <span class="token operator">&lt;</span>trx1, Undo log insert <span class="token operator">&lt;</span>undo_delete …<span class="token operator">>></span>
     记录6: <span class="token operator">&lt;</span>trx1, delete C…<span class="token operator">></span>
     <span class="token comment"># 下面是对应的回滚操作</span>
     记录7: <span class="token operator">&lt;</span>trx1, insert C<span class="token operator">></span> 
     记录8: <span class="token operator">&lt;</span>trx1, update B to old value<span class="token operator">></span>
     记录9: <span class="token operator">&lt;</span>trx1, delete A<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>一个被回滚了的事务在恢复时的操作就是先redo再undo，因此不会破坏数据的一致性</strong>。</p>
</div></template>


