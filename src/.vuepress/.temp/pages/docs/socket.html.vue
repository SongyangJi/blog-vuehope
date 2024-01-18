<template><div><h2 id="socket编程" tabindex="-1"><a class="header-anchor" href="#socket编程" aria-hidden="true">#</a> socket编程</h2>
<img src="socket-state.png" style="zoom:50%;" />
<ol>
<li>
<p>服务端和客户端初始化 socket ，得到⽂件描述符；</p>
</li>
<li>
<p>服务端调⽤ bind ，将绑定在 IP 地址和端⼝;</p>
</li>
<li>
<p>服务端调⽤ listen ，进⾏监听；</p>
</li>
<li>
<p>服务端调⽤ accept ，等待客户端连接；</p>
</li>
<li>
<p>客户端调⽤ connect ，向服务器端的地址和端⼝发起连接请求；</p>
</li>
<li>
<p>服务端 accept 返回⽤于传输的 socket 的⽂件描述符；</p>
</li>
<li>
<p>客户端调⽤ write 写⼊数据；服务端调⽤ read 读取数据；</p>
</li>
<li>
<p>客户端断开连接时，会调⽤ close ，那么服务端 read 读取数据的时候，就会读取到了 EOF ，待处理完</p>
</li>
</ol>
<p>数据后，服务端调⽤ close ，表示连接关闭。</p>
<p>这⾥需要注意的是，服务端调⽤ accept 时，连接成功了会返回⼀个已完成连接的 socket，后续⽤来传输数据。</p>
<p>所以，监听的 socket 和真正⽤来传送数据的 socket，是两个 socket，⼀个叫作<strong>监听 socket</strong>，⼀个叫作<strong>已完成连接 socket</strong>。</p>
<p>成功连接建⽴之后，双⽅开始通过 read 和 write 函数来读写数据，就像往⼀个⽂件流⾥⾯写东⻄⼀样。</p>
<h2 id="select函数" tabindex="-1"><a class="header-anchor" href="#select函数" aria-hidden="true">#</a> select函数</h2>
<p>select 实现多路复⽤的⽅式是，<strong>将已连接的 Socket 都放到⼀个⽂件描述符集合</strong>，</p>
<p>然后<strong>调⽤ select 函数将⽂件描述符集合拷⻉到内核⾥，让内核来检查是否有⽹络事件产⽣</strong>，检查的⽅式很粗暴，就是通过<strong>遍历⽂件描述符集合的⽅式</strong>，<strong>当检查到有事件产⽣后，将此 Socket 标记为可读或可写， 接着再把整个⽂件描述符集合拷⻉回⽤户态⾥</strong>，然后⽤户态还需要<strong>再通过遍历的⽅法找到可读或可写的 Socke</strong>t，然后再对其处</p>
<p>理。</p>
<p>所以，对<strong>于 select 这种⽅式，需要进⾏ 2 次「遍历」⽂件描述符集合</strong>，⼀次是在内核态⾥，⼀个次是在<strong>⽤户态</strong> ，⽽且还会发⽣ <strong>2</strong> 次「拷⻉」⽂件描述符集合，先从⽤户空间传⼊内核空间，由内核修改后，再传出到⽤户空间中。</p>
<p>select 使⽤固定⻓度的 BitsMap，表示⽂件描述符集合，⽽且<strong>所⽀持的⽂件描述符的个数是有限制的</strong>，在</p>
<p>Linux 系统中，由内核中的 FD_SETSIZE 限制， 默认最⼤值为 1024 ，只能监听 0~1023 的⽂件描述符。</p>
<h2 id="poll-函数" tabindex="-1"><a class="header-anchor" href="#poll-函数" aria-hidden="true">#</a> poll 函数</h2>
<p><strong>poll 不再⽤位图或数组来存储所关注的⽂件描述符，取⽽代之⽤动态数组</strong>，以<strong>链表形式来组织，突破了</strong></p>
<p><strong>select 的⽂件描述符个数限制</strong>，当然还会受到系统⽂件描述符限制。</p>
<p>但是 poll 和 select 并没有太⼤的本质区别，都是使⽤「线性结构」存储进程关注的 <strong>Socket</strong> 集合，因此<strong>都需要遍历⽂件描述符集合</strong>来找到可读或可写的 <strong>Socket</strong>，时间复杂度为 <strong>O(n)</strong>，</p>
<p>⽽且<strong>也需要在⽤户态与内核态之间拷⻉⽂件描述符集合</strong>，这种⽅式随着并发数上来，性能的损耗会呈指数级增⻓。</p>
<h2 id="epoll-函数" tabindex="-1"><a class="header-anchor" href="#epoll-函数" aria-hidden="true">#</a> epoll 函数</h2>
<p>epoll 通过两个⽅⾯，很好解决了 select/poll 的问题。</p>
<ul>
<li>第⼀点，epoll 在内核⾥<strong>使⽤红⿊树来跟踪进程所有待检测的⽂件描述符</strong>，把需要监控的 socket 通过</li>
</ul>
<p><code v-pre>epoll_ctl()</code> 函数加⼊内核中的红⿊树⾥，红⿊树是个⾼效的数据结构，增删查⼀般时间复杂度是</p>
<p>O(logn) ，通过对这棵⿊红树进⾏操作，<strong>这样就不需要像 select/poll 每次操作时都传⼊整个 socket 集合，只需要传⼊⼀个待检测的 socket，减少了内核和⽤户空间⼤量的数据拷⻉和内存分配</strong>。</p>
<ul>
<li>第⼆点， epoll 使⽤<strong>事件驱动</strong>的机制，<strong>内核⾥维护了⼀个链表来记录就绪事件</strong>，<strong>当某个 socket 有事件发⽣时，通过回调函数内核会将其加⼊到这个就绪事件列表中</strong>，当⽤户调⽤ <code v-pre>epoll_wait() </code>函数时，<strong>只会返回有事件发⽣的⽂件描述符的个数，不需要像 select/poll 那样轮询扫描整个 socket 集合</strong>，⼤⼤提⾼了检测的效率。
<img src="@source/docs/epoll.png" alt="" loading="lazy"></li>
</ul>
<h3 id="相关接口" tabindex="-1"><a class="header-anchor" href="#相关接口" aria-hidden="true">#</a> 相关接口</h3>
<p>epoll API是Linux专有的特性，相较于<code v-pre>select</code>和<code v-pre>poll</code>，<code v-pre>epoll</code>更加灵活且<strong>没有描述符限制</strong>。<code v-pre>epoll</code>设计也与<code v-pre>select</code>和<code v-pre>poll</code>不同，主要包含以下三个接口：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">epoll_create</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">epoll_ctl</span><span class="token punctuation">(</span><span class="token keyword">int</span> epfd<span class="token punctuation">,</span> <span class="token keyword">int</span> op<span class="token punctuation">,</span> <span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">epoll_event</span> <span class="token operator">*</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">epoll_wait</span><span class="token punctuation">(</span><span class="token keyword">int</span> epfd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">epoll_event</span> <span class="token operator">*</span> events<span class="token punctuation">,</span> <span class="token keyword">int</span> maxevents<span class="token punctuation">,</span> <span class="token keyword">int</span> timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>下面依次介绍。</p>
</blockquote>
<h4 id="epoll-create" tabindex="-1"><a class="header-anchor" href="#epoll-create" aria-hidden="true">#</a> epoll_create()</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">epoll_create</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span>；<span class="token comment">//创建一个epoll的句柄，size用来告诉内核这个监听的数目一共有多大</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个epoll的句柄，size用来告诉内核这个监听的数目一共有多大，这个参数不同于select()中的第一个参数，给出最大监听的fd+1的值，<em>参数size并不是限制了epoll所能监听的描述符最大个数，只是对内核初始分配内部数据结构的一个建议</em>。
当创建好epoll句柄后，它就会占用一个fd值，在linux下如果查看/proc/进程id/fd/，是能够看到这个fd的，所以在使用完epoll后，必须调用close()关闭，否则可能导致fd被耗尽。</p>
<h4 id="int-epoll-ctl" tabindex="-1"><a class="header-anchor" href="#int-epoll-ctl" aria-hidden="true">#</a> int epoll_ctl()</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">epoll_ctl</span><span class="token punctuation">(</span><span class="token keyword">int</span> epfd<span class="token punctuation">,</span> <span class="token keyword">int</span> op<span class="token punctuation">,</span> <span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">epoll_event</span> <span class="token operator">*</span>ev<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//修改兴趣列表（事件注册函数）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数是对指定描述符fd执行op操作。</p>
<ul>
<li>epfd：是epoll_create()的返回值。</li>
<li>op：表示op操作，用三个宏来表示：1. <code v-pre>EPOLL_CTL_ADD</code>注册新的fd到epfd中；2. <code v-pre>EPOLL_CTL_MOD</code>修改已经注册的fd的监听事件；3. <code v-pre>EPOLL_CTL_DEL</code>从<code v-pre>epfd</code>中删除一个fd。</li>
<li>fd：是需要监听的fd（文件描述符）</li>
<li>epoll_event：是告诉内核需要监听什么事，struct epoll_event结构如下：</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">epoll_event</span> <span class="token punctuation">{</span>
  __uint32_t events<span class="token punctuation">;</span>  <span class="token comment">/* Epoll events */</span>
  <span class="token class-name">epoll_data_t</span> data<span class="token punctuation">;</span>  <span class="token comment">/* User data variable */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>events可以是以下几个宏的集合</strong>：</p>
<ol>
<li>EPOLLIN ：表示对应的文件描述符可以读（包括对端SOCKET正常关闭）；</li>
<li>EPOLLOUT：表示对应的文件描述符可以写；</li>
<li>EPOLLPRI：表示对应的文件描述符有紧急的数据可读（这里应该表示有带外数据到来）；</li>
<li>EPOLLERR：表示对应的文件描述符发生错误；</li>
<li>EPOLLHUP：表示对应的文件描述符被挂断；</li>
<li>EPOLLET： bsEPOLL设为边缘触发（Edge Triggered)模式，这是相对于水平触发(Level Triggered）来说的。</li>
<li>EPOLLONESHOT：只监听一次事件，当监听完这次事件之后，如果还需要继续监听这个socket的话，需要再次把这个socket加入到EPOLL队列里。</li>
</ol>
<p>其中<code v-pre>data</code>的类型为：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">union</span> epoll_data <span class="token punctuation">{</span>
  <span class="token keyword">void</span>    <span class="token operator">*</span>ptr<span class="token punctuation">;</span> <span class="token comment">//pointer to user defined data</span>
  <span class="token keyword">int</span>     fd<span class="token punctuation">;</span> <span class="token comment">//file descriptor</span>
  uint_32 u32<span class="token punctuation">;</span> <span class="token comment">//32-bit integer</span>
  uint_64 u64<span class="token punctuation">;</span> <span class="token comment">//64-bit integer</span>
<span class="token punctuation">}</span> <span class="token class-name">epoll_data_t</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code v-pre>data</code>字段是唯一可以获知同这个事件相关的文件描述符的途径</strong>，因此调用<code v-pre>epoll_ctl()</code>将文件描述符添加到兴趣列表中时，应该要么将<code v-pre>ev.data.fd</code>设为文件描述符，要么将<code v-pre>ev.data.ptr</code>设为指向包含该文件描述的结构体。</p>
<h4 id="int-epoll-wait" tabindex="-1"><a class="header-anchor" href="#int-epoll-wait" aria-hidden="true">#</a> int epoll_wait()</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">epoll_wait</span><span class="token punctuation">(</span><span class="token keyword">int</span> epfd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">epoll_event</span> <span class="token operator">*</span>evlist<span class="token punctuation">,</span> <span class="token keyword">int</span> maxevents<span class="token punctuation">,</span> <span class="token keyword">int</span> timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>数组<code v-pre>evlist</code>的空间由调用者负责申请;</p>
<p>等待epfd上的io事件，最多返回maxevents个事件。
参数evlist用来从内核得到事件的集合，maxevents告之内核这个evlist有多大，这个maxevents的值不能大于创建epoll_create()时的size，参数timeout是超时时间（毫秒，0会立即返回，-1将不确定，也有说法说是永久阻塞）。<strong>该函数返回需要处理的事件数目，如返回0表示已超时</strong>。</p>
<h3 id="epoll的工作模式" tabindex="-1"><a class="header-anchor" href="#epoll的工作模式" aria-hidden="true">#</a> epoll的工作模式</h3>
<p>epoll对文件描述符的操作有两种模式：<strong>LT（level trigger）<strong>和</strong>ET（edge trigger）</strong>。LT模式是默认模式，LT模式与ET模式的区别如下：</p>
<p><strong>LT模式</strong>：当epoll_wait检测到描述符事件发生并将此事件通知应用程序，<strong>应用程序可以不立即处理该事件</strong>。下次调用epoll_wait时，会再次响应应用程序并通知此事件。</p>
<p><strong>ET模式</strong>：当epoll_wait检测到描述符事件发生并将此事件通知应用程序，<strong>应用程序必须立即处理该事件</strong>。如果不处理，下次调用epoll_wait时，不会再次响应应用程序并通知此事件。</p>
<p>LT模式下，<strong>主要缓冲区数据一次没有处理完，那么下次<code v-pre>epoll_wait</code>返回时，还会返回这个句柄</strong>；</p>
<p>而ET模式下，缓冲区数据一次没处理结束，那么下次就不会再通知了，只在第一次返回．所以在ET模式下，一般是通过while循环，一次性读完全部数据**．epoll默认使用的是LT**．</p>
<h4 id="_1-lt模式" tabindex="-1"><a class="header-anchor" href="#_1-lt模式" aria-hidden="true">#</a> 1. LT模式</h4>
<p>LT(level triggered)是默认的工作方式，并且<strong>同时支持block和no-block</strong> socket.在这种做法中，内核告诉你一个文件描述符是否就绪了，然后你可以对这个就绪的fd进行IO操作。如果你不作任何操作，内核还是会继续通知你的。</p>
<h4 id="_2-et模式" tabindex="-1"><a class="header-anchor" href="#_2-et模式" aria-hidden="true">#</a> 2. ET模式</h4>
<p><strong>ET(edge-triggered)是高速工作方式</strong>，只支持no-block socket。在这种模式下，当描述符从未就绪变为就绪时，内核通过epoll告诉你。然后它会假设你知道文件描述符已经就绪，并且不会再为那个文件描述符发送更多的就绪通知，直到你做了某些操作导致那个文件描述符不再为就绪状态了(比如，你在发送，接收或者接收请求，或者发送接收的数据少于一定量时导致了一个EWOULDBLOCK 错误）。但是请注意，如果一直不对这个fd作IO操作(从而导致它再次变成未就绪)，内核不会发送更多的通知(only once)</p>
<p><strong>ET模式在很大程度上减少了epoll事件被重复触发的次数</strong>，因此效率要比LT模式高。epoll工作在ET模式的时候，<strong>必须使用非阻塞套接口</strong>，以避免由于一个文件句柄的阻塞读/阻塞写操作把处理多个文件描述符的任务饿死。</p>
<p><strong>假如有这样一个例子：</strong></p>
<ol>
<li>我们已经把一个用来从管道中读取数据的文件句柄(RFD)添加到epoll描述符</li>
<li>这个时候从管道的另一端被写入了2KB的数据</li>
<li>调用epoll_wait(2)，并且它会返回RFD，说明它已经准备好读取操作</li>
<li>然后我们读取了1KB的数据</li>
<li>调用epoll_wait(2)（两种工作模式有不同的差别）</li>
</ol>
<p><strong>LT模式：</strong>
如果是LT模式，那么在第5步调用epoll_wait(2)之后，仍然能受到通知。</p>
<p><strong>ET模式：</strong>
只有在监视的文件句柄上发生了某个事件的时候 ET 工作模式才会汇报事件。因此在第5步的时候，调用者可能会放弃等待仍在存在于文件输入缓冲区内的剩余数据。</p>
<h3 id="epoll的实现原理" tabindex="-1"><a class="header-anchor" href="#epoll的实现原理" aria-hidden="true">#</a> epoll的实现原理</h3>
<p>在linux，一切皆文件．所以当调用<code v-pre>epoll_create</code>时，内核给这个<code v-pre>epoll</code>分配一个文件描述符，但是这个不是普通的文件，而是只服务于epoll。</p>
<p>当内核初始化epoll时，会开辟一块内核高速缓冲区，用于放置我们监听的对端socket，这些socket会以<strong>红黑树节点的形式</strong>保存在内核的<code v-pre>cache</code>里，以支持快速的查找，插入，删除。</p>
<p>同时，建立了一个<strong>list链表，用于存储准备就绪的事件</strong>．所以调用<code v-pre>epoll_wait</code>时，在timeout时间内，只是简单的观察这个list链表是否有数据，如果没有，则睡眠至超时时间到返回；如果有数据，则在超时时间到，拷贝至用户态<code v-pre>events</code>数组中．</p>
<p><em>那么，这个准备就绪list链表是怎么维护的呢？</em>
当我们执行<code v-pre>epoll_ctl()</code>时，除了把socket_fd放到epoll系统里对应的红黑树上之外，还会<strong>给内核中断处理程序注册一个回调函数</strong>，告诉内核，<strong>如果这个句柄的中断到了，就把它放到准备就绪list链表里</strong>。所以，当一个socket上有数据到了，内核在把网卡上的数据copy到内核中后就来把socket插入到准备就绪链表里了。</p>
<p>epoll主要由两个结构体：eventpoll与epitem。epitem是每一个IO所对应的的事件。比如 <code v-pre>epoll_ctl()</code>的<code v-pre>EPOLL_CTL_ADD</code>操作的时候，就需要创建一个<code v-pre>epitem</code>。<code v-pre>eventpoll</code>是每一个epoll所对应的。比如<code v-pre>epoll_create</code>就是创建一个<code v-pre>eventpoll</code>。如下图所示，<code v-pre>eventpoll</code> 包含了 <code v-pre>lock</code>、<code v-pre>mtx</code>、<code v-pre>wq（等待队列）</code>与 <code v-pre>rdlist</code> 等成员，其中 <code v-pre>rdlist</code> 和 <code v-pre>rbr</code> 是我们所关心的。</p>
</div></template>


