<template><div><p><strong>相关命令</strong></p>
<blockquote>
<p>MULTI
EXEC
DISCARD
WATCH
UNWATCH</p>
</blockquote>
<h1 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h1>
<p>事务是一组命令的集合。3</p>
<h2 id="性质" tabindex="-1"><a class="header-anchor" href="#性质" aria-hidden="true">#</a> 性质</h2>
<ul>
<li>事务中的<strong>所有命令都被序列化并顺序执行</strong>。在Redis事务的执行过程中（指定的是 <code v-pre>exec</code>后的真正的执行过程，而不是用<code v-pre>multi</code>后的入队过程），永远不会执行另一个客户端发出的请求（**命令不会加塞）。</li>
<li>所有命令都将被执行，或者所有命令都不执行，因此<strong>Redis事务也是原子的</strong>（这句话有可能会引起争议）。</li>
</ul>
<h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2>
<p>使用<code v-pre>MULTI</code>命令输入Redis事务。该命令始终以答复OK。
此时，用户可以发出多个命令。<strong>Redis不会执行这些命令，而是将它们排队。</strong>
<strong>一旦调用EXEC，将执行所有命令。</strong>，并且<strong>EXEC返回了一个答复数组</strong>，其中每个元素都是事务中单个命令的答复，其发出顺序与命令相同。
如：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> MULTI
OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> SET k1 v1
QUEUED
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> SET k2 v2
QUEUED
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> GET k1
QUEUED
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> EXEC
<span class="token number">1</span><span class="token punctuation">)</span> OK
<span class="token number">2</span><span class="token punctuation">)</span> OK
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"v1"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要强调的是，<code v-pre>MULTI</code>之后的命令并不会执行，它们只是入队而已，知道<code v-pre>EXEC</code>命令发出，所有命令才会一起执行。</p>
<h2 id="事务中的错误" tabindex="-1"><a class="header-anchor" href="#事务中的错误" aria-hidden="true">#</a> 事务中的错误</h2>
<h3 id="命令排队入队错误" tabindex="-1"><a class="header-anchor" href="#命令排队入队错误" aria-hidden="true">#</a> 命令排队入队错误</h3>
<p>这种常见的错误有 ① 命令不存在 ② 命令参数的个数不对。
这种错误一旦发生，<strong>这个事务就会失败，也就是说事务中的命令全都不会执行</strong>。
如：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> multi
OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> set a <span class="token number">1</span>
QUEUED
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> get b <span class="token number">1</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> ERR wrong number of arguments <span class="token keyword">for</span> <span class="token string">'get'</span> command
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> set c <span class="token number">3</span>
QUEUED
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token function">exec</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> EXECABORT Transaction discarded because of previous errors<span class="token punctuation">.</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> 
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> 
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> get <span class="token function">a</span>
<span class="token punctuation">(</span><span class="token keyword">nil</span><span class="token punctuation">)</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> get <span class="token function">c</span>
<span class="token punctuation">(</span><span class="token keyword">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可见即使是正确的命令也没有执行成功。</p>
<blockquote>
<p>从Redis 2.6.5开始，服务器会记住命令累积期间发生错误，并且将拒绝执行事务，并且在EXEC期间还会返回错误并自动丢弃该事务。</p>
</blockquote>
<h3 id="命令执行错误" tabindex="-1"><a class="header-anchor" href="#命令执行错误" aria-hidden="true">#</a> 命令执行错误</h3>
<p>常见的有，命令与键的类型冲突，给一个字符串类型的键自增但是键值不是数字，等等。</p>
<p>EXEC之后发生的错误不会以特殊方式处理:<strong>即使在事务期间某些命令失败，也会执行所有其他命令</strong>。
也正是因为一点，让Redis事务的原子性受到质疑。</p>
<p>如：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> SET a hello
OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> MULTI
OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> INCR a
QUEUED
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> SET b <span class="token number">2</span>
QUEUED
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> EXEC
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> ERR value is <span class="token keyword">not</span> an integer <span class="token keyword">or</span> out of range
<span class="token number">2</span><span class="token punctuation">)</span> OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> GET b
<span class="token string">"2"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即使在<code v-pre>INCR</code>命令执行错误之后，可以看到之后的合法的命令仍然执行成功了。</p>
<h2 id="为什么redis不支持回滚" tabindex="-1"><a class="header-anchor" href="#为什么redis不支持回滚" aria-hidden="true">#</a> 为什么Redis不支持回滚</h2>
<p>大致有三点原因：</p>
<ol>
<li>程序员自身犯的错误是无法避免的。</li>
<li>不支持回滚可以使得Redis事务的实现更加高效。</li>
<li>发生错误一般发生在开发过程中，不太可能进入到生产环境中。</li>
</ol>
<h2 id="discard命令队列" tabindex="-1"><a class="header-anchor" href="#discard命令队列" aria-hidden="true">#</a> DISCARD命令队列</h2>
<p>之前说，一旦客户端给Redis服务器发送一个<code v-pre>MULTI</code>此时，Redis受到的命令不会立即执行，而是存储在队列里。
也就是此时客户端和服务器的连接状态进入一种<strong>事务状态</strong>。
<strong>而<code v-pre>DISCARD</code>命令相反，它用来结束这种状态的，当然之前队列里的命令组也会被清空。</strong></p>
<p>注意，此命令只在客户端和服务器之间有<code v-pre>MULTI</code>执行之后，才会返回<strong>OK</strong>,否则返回
<strong>(error) ERR DISCARD without MULTI</strong>。</p>
<h2 id="watch实现乐观锁" tabindex="-1"><a class="header-anchor" href="#watch实现乐观锁" aria-hidden="true">#</a> WATCH实现乐观锁</h2>
<blockquote>
<p><code v-pre>WATCH</code>用于为Redis事务提供检查设置（CAS check-ans-set）行为。</p>
</blockquote>
<p>被WATCH的键，如果在事务执行（exec）前发生了变化，那么之后事务就不会执行，返回（null）。</p>
<p>下面的实现自增<code v-pre>INCR</code>命令组在多个客户端并发访问服务器的时候，就会产生竞争条件。
比如，一开始键的值的是10，向后两个客户端执行了自增命令，最终值应该是12。
但是，两个客户端可能先后拿到10，然后分别自增，最后分别赋值11。
就出现错误。</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>val <span class="token operator">=</span> GET mykey
val <span class="token operator">=</span> val <span class="token operator">+</span> <span class="token number">1</span>
SET mykey $val
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可能初学者，有这样的想法，将这组命令当成一个事务执行，不就解决问题了吗。
不过，事务执行的结果是在<code v-pre>exec</code>之后才能拿到的，无法中途拿到（其次你也要知道的是 multi 之后也是不加任何锁的）</p>
<p>这个时候就需要<code v-pre>WATCH</code>命令了。
不妨换思路，</p>
<ol>
<li>监控我们需要自增的键。</li>
<li>然后获取键值，并让值加1。</li>
<li>最后用<code v-pre>set</code>命令赋值。如果，在赋值的时候，发现值已经被另一个客户端修改了，这个时候如果还去set就会出现上面的情况，所以此次事务就放弃执行。</li>
</ol>
<p><strong>基于这个思路，我们采取先check后set的方式，执行事务，如果事务失败，再执行一次，并期望这次没有产生冲突，直到这个事务执行成功。</strong>
这种锁的形式成为<strong>乐观锁</strong>。</p>
<p>最终借助<code v-pre>WATCH</code>和事务实现了自增命令如下：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>WATCH mykey
val <span class="token operator">=</span> GET mykey
val <span class="token operator">=</span> val <span class="token operator">+</span> <span class="token number">1</span>
MULTI
SET mykey $val
EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<code v-pre>watch</code>命令还有如下补充：</p>
<ul>
<li><code v-pre>watch</code> 可以在<code v-pre>multi</code>之前多次调用，并且可以一次watch多个键，只要有一个键被改变，事务就不会执行。</li>
<li>当<code v-pre>exec</code>被调用时，所有键都会恢复 <strong>UNWATCHED</strong> 的状态，不管事务是否中止与否。
同样，当客户端连接关闭时，所有键都会被<strong>UNWATCHED</strong>。</li>
<li>也可以使用<code v-pre>unwatch</code>命令（不带参数）来刷新所有监视的键。</li>
<li>注意，很重要的一点是，<strong>键是否被监控都是相对于每个客户端而言的，也就是说它不是对于服务器的一个全局状态</strong>。以后会在Redis的实现里具体探讨。</li>
</ul>
<p>一个例子：有序集合zset是没有弹出第一个元素的原子性命令的，我们可以使用watch和事务实现它。
<strong>使用WATCH实现ZPOP</strong></p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>WATCH zset
element <span class="token operator">=</span> ZRANGE zset <span class="token number">0</span> <span class="token number">0</span>
MULTI
ZREM zset element
EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果EXEC失败（即返回Null答复），我们将重复该操作。</p>
<h2 id="redis脚本和事务" tabindex="-1"><a class="header-anchor" href="#redis脚本和事务" aria-hidden="true">#</a> Redis脚本和事务</h2>
<blockquote>
<p>一个Redis的脚本是定义事务性的，所以一切都可以用Redis的事务做的，你也可以用一个脚本做的，平时脚本会更简单，更快速。
这种重复是由于以下事实：脚本是在Redis 2.6中引入的，而事务早已存在。但是，我们不太可能在短期内取消对事务的支持，因为在语义上似乎是适当的，即使不诉诸Redis脚本，仍然有可能避免竞争状况，尤其是因为Redis事务的实现复杂性极低。
但是，在不久的将来，我们会看到整个用户群只是在使用脚本，这并非不可能。如果发生这种情况，我们可能会弃用并最终删除事务。</p>
</blockquote>
<h1 id="acid" tabindex="-1"><a class="header-anchor" href="#acid" aria-hidden="true">#</a> ACID</h1>
<p>与关系型数据库ACID的对比。</p>
</div></template>


