<template><div><h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1>
<p>进程间通信（IPC：interprocess communication）是一种涉及一个进程与另一个进程的通信的机制。 这通常只发生在一个系统中。</p>
<p>沟通可以有两种类型 -</p>
<ul>
<li>在仅从一个进程启动的相关进程之间，例如父进程和子进程。</li>
<li>在不相关的进程之间，或两个或多个不同的进程之间。</li>
</ul>
<p>具体来说，有下面三大类形式：</p>
<figure><img src="@source/posts/docs/ipc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>按照《UNIX网络编程 卷2：进程间通信》的目录分类：</p>
<ol>
<li>消息传递（管道、FIFO、消息队列）</li>
<li>同步（互斥锁和条件变量、读写锁、信号量）</li>
<li>共享内存（匿名的、具名的）</li>
</ol>
<h1 id="消息传递" tabindex="-1"><a class="header-anchor" href="#消息传递" aria-hidden="true">#</a> 消息传递</h1>
<h2 id="管道" tabindex="-1"><a class="header-anchor" href="#管道" aria-hidden="true">#</a> 管道</h2>
<p><strong>管道是两个或多个相关或相互关联的过程之间的通信媒介。</strong></p>
<p>它可以在一个进程内，也可以在子进程和父进程之间进行通信。 通信也可以是多层次的，例如父母，孩子和孙子之间的通信等。通过写入管道的一个过程和管道的其他读取来实现通信。</p>
<p><strong>要实现管道系统调用，请创建两个文件，一个用于写入文件，另一个用于从文件中读取。</strong></p>
<h3 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h></span></span>
<span class="token keyword">int</span> <span class="token function">pipe</span><span class="token punctuation">(</span><span class="token keyword">int</span> pipedes<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该系统调用将创建用于单向通信的管道，即，它创建两个描述符，第一个连接到管道读取而另一个连接以写入管道。</p>
<p>描述符pipedes [0]用于读取，pipedes [1]用于写入。 无论写入管道[1]是什么都可以从pipedes [0]中读取。</p>
<p>此调用在成功时返回零，在失败时返回-1。 要了解失败的原因，请使用errno variable或perror（）函数进行检查。</p>
<p>如下图这是使用管道进行双向通信的常见做法：</p>
<figure><img src="@source/posts/docs/pipe_with_two.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h3 id="实例代码" tabindex="-1"><a class="header-anchor" href="#实例代码" aria-hidden="true">#</a> 实例代码</h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 用两个单工的管道实现双向通信</span>
    <span class="token keyword">int</span> pipefds1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> pipefds2<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> returnstatus1<span class="token punctuation">,</span> returnstatus2<span class="token punctuation">;</span>
    <span class="token keyword">int</span> pid<span class="token punctuation">;</span>
    <span class="token keyword">char</span> pipe1writemessage<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Hi"</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> pipe2writemessage<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Hello"</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> readmessage<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    returnstatus1 <span class="token operator">=</span> <span class="token function">pipe</span><span class="token punctuation">(</span>pipefds1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>returnstatus1 <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Unable to create pipe 1 \n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    returnstatus2 <span class="token operator">=</span> <span class="token function">pipe</span><span class="token punctuation">(</span>pipefds2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>returnstatus2 <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Unable to create pipe 2 \n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    pid <span class="token operator">=</span> <span class="token function">fork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pid <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Parent process </span>
        <span class="token function">close</span><span class="token punctuation">(</span>pipefds1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Close the unwanted pipe1 read side</span>
        <span class="token function">close</span><span class="token punctuation">(</span>pipefds2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Close the unwanted pipe2 write side</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"In Parent: Writing to pipe 1 – Message is %s\n"</span><span class="token punctuation">,</span> pipe1writemessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">write</span><span class="token punctuation">(</span>pipefds1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> pipe1writemessage<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>pipe1writemessage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">read</span><span class="token punctuation">(</span>pipefds2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> readmessage<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>readmessage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"In Parent: Reading from pipe 2 – Message is %s\n"</span><span class="token punctuation">,</span> readmessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">//child process</span>
        <span class="token function">close</span><span class="token punctuation">(</span>pipefds1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Close the unwanted pipe1 write side</span>
        <span class="token function">close</span><span class="token punctuation">(</span>pipefds2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Close the unwanted pipe2 read side</span>
        <span class="token function">read</span><span class="token punctuation">(</span>pipefds1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> readmessage<span class="token punctuation">,</span>
             <span class="token keyword">sizeof</span><span class="token punctuation">(</span>readmessage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"In Child: Reading from pipe 1 – Message is %s\n"</span><span class="token punctuation">,</span> readmessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"In Child: Writing to pipe 2 – Message is %s\n"</span><span class="token punctuation">,</span> pipe2writemessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">write</span><span class="token punctuation">(</span>pipefds2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> pipe2writemessage<span class="token punctuation">,</span>
              <span class="token keyword">sizeof</span><span class="token punctuation">(</span>pipe2writemessage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fifo" tabindex="-1"><a class="header-anchor" href="#fifo" aria-hidden="true">#</a> FIFO</h2>
<p>暂略</p>
<h2 id="消息队列" tabindex="-1"><a class="header-anchor" href="#消息队列" aria-hidden="true">#</a> 消息队列</h2>
<p>当我们已经拥有共享内存时，为什么我们需要消息队列？ 这将有多种原因，让我们试着将其分解为多个点以简化 -</p>
<ul>
<li>如所理解的，一<strong>旦进程接收到消息，它将不再可用于任何其他过程</strong>。 而在共享内存中，数据可供多个进程访问。</li>
<li>如果我们想要与小消息格式进行通信。</li>
<li>当多个进程同时通信时，<strong>共享内存数据需要通过同步进行保护</strong>。</li>
<li>使用共享内存的写入和读取频率很高，但<strong>实现该功能将非常复杂</strong>。 在这种情况下使用不值得。</li>
<li>如果<strong>并不是所有进程都需要访问共享内存</strong>，那么使用消息队列实现会更好。</li>
<li>如果我们想要<strong>与不同的数据包进行通信</strong>，则说过程A将消息类型1发送到进程B，消息类型10发送到进程C，消息类型20发送到进程D.在这种情况下，使用消息队列实现更简单。 为了将给定的消息类型简化为1,10,20，它可以是0或+ ve或-ve，如下所述。</li>
<li>当然，<strong>消息队列的顺序是FIFO</strong>（先进先出）。 插入队列中的第一条消息是第一个要检索的消息。</li>
</ul>
<ol>
<li>通过一个进程写入共享内存并通过另一个进程从共享内存中读取。 我们知道，阅读也可以通过多个流程完成</li>
</ol>
<figure><img src="@source/posts/docs/message_queue.jpg" alt="消息队列" tabindex="0" loading="lazy"><figcaption>消息队列</figcaption></figure>
<ol start="2">
<li>一个进程使用不同的数据包写入共享内存，并通过多个进程从中读取，即按消息类型。</li>
</ol>
<figure><img src="@source/posts/docs/multiple_message_queue.jpg" alt="多个消息队列" tabindex="0" loading="lazy"><figcaption>多个消息队列</figcaption></figure>
<h3 id="使用方法-1" tabindex="-1"><a class="header-anchor" href="#使用方法-1" aria-hidden="true">#</a> 使用方法</h3>
<p>这里以POSIX的接口为实例</p>
<table>
<thead>
<tr>
<th>API</th>
<th>API 作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>mqd_t mq_open(const char <em>name, int oflag, mode_t mode, struct mq_attr</em> attr)</td>
<td>创建命名消息队列</td>
</tr>
<tr>
<td>mqd_t mq_close(mqd_t mqdes)</td>
<td>结束到开放式消息队列的连接</td>
</tr>
<tr>
<td>mqd_t mq_unlink(const char *name)</td>
<td>结束到开放式消息队列的连接，并在最后一个进程关闭此队列时将其删除</td>
</tr>
<tr>
<td>mqd_t mq_send(mqd_t mqdes, const char *msg_ptr, size_t msg_len, unsigned msg_prio)</td>
<td>将消息放入队列</td>
</tr>
<tr>
<td>ssize_t mq_receive(mqd_t mqdes, char <em>msg_ptr, size_t msg_len, unsigned</em> msg_prio)</td>
<td>在队列中接收消息</td>
</tr>
<tr>
<td>mqd_t mq_notify(mqd_t mqdes, const struct sigevent *notification)</td>
<td>通知进程或线程消息已存在于队列中</td>
</tr>
<tr>
<td>mqd_t mq_getattr(mqd_t mqdes, struct mq_attr <em>attr) 、mqd_t mq_setattr(mqd_t mqdes, struct mq_attr</em> newattr, struct mq_attr *oldattr)</td>
<td>设置或获取消息队列属性</td>
</tr>
</tbody>
</table>
<h1 id="同步" tabindex="-1"><a class="header-anchor" href="#同步" aria-hidden="true">#</a> 同步</h1>
<h2 id="互斥锁与条件变量" tabindex="-1"><a class="header-anchor" href="#互斥锁与条件变量" aria-hidden="true">#</a> 互斥锁与条件变量</h2>
<p>这里互斥锁和条件变量的使用，与Java的<code v-pre>synchronized+wait+notify</code>以及<code v-pre>Lock+Condition</code> 机制在语义上和使用上十分相似，就不详细介绍了。</p>
<h3 id="使用方法-2" tabindex="-1"><a class="header-anchor" href="#使用方法-2" aria-hidden="true">#</a> 使用方法</h3>
<blockquote>
<p>linux c版本的条件变量和互斥锁(mutex)，不是C++的。</p>
</blockquote>
<ol>
<li>互斥锁的初始化</li>
</ol>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token class-name">pthread_mutex_t</span> <span class="token operator">*</span>restrict mutex<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token class-name">pthread_mutexattr_t</span> <span class="token operator">*</span>restrict attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">pthread_mutex_t</span> mutex <span class="token operator">=</span> PTHREAD_MUTEX_INITIALIZER<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>互斥锁的销毁</li>
</ol>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token class-name">pthread_mutex_t</span> <span class="token operator">*</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>加锁与解锁</li>
</ol>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token class-name">pthread_mutex_t</span> <span class="token operator">*</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">pthread_mutex_trylock</span><span class="token punctuation">(</span><span class="token class-name">pthread_mutex_t</span> <span class="token operator">*</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token class-name">pthread_mutex_t</span> <span class="token operator">*</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>条件变量的函数</li>
</ol>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_cond_wait</span><span class="token punctuation">(</span><span class="token class-name">pthread_cond_t</span> <span class="token operator">*</span>restrict cond<span class="token punctuation">,</span>
           <span class="token class-name">pthread_mutex_t</span> <span class="token operator">*</span>restrict mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">pthread_cond_signal</span><span class="token punctuation">(</span><span class="token class-name">pthread_cond_t</span> <span class="token operator">*</span>cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="信号量" tabindex="-1"><a class="header-anchor" href="#信号量" aria-hidden="true">#</a> 信号量</h2>
<p>基本上信号量分为两种类型 -</p>
<p><strong>Binary Semaphores</strong> - 只有两个状态0和1，即锁定/解锁或可用/不可用，Mutex实现。</p>
<p><strong>Counting Semaphores</strong> - 允许任意资源计数的信号量称为计数信号量。</p>
<h3 id="使用方法-3" tabindex="-1"><a class="header-anchor" href="#使用方法-3" aria-hidden="true">#</a> 使用方法</h3>
<table>
<thead>
<tr>
<th>API</th>
<th>API 作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>sem_t *sem_open(const char  *name, int oflag, mode_t mode, unsigned int value)</td>
<td>创建命名信号量</td>
</tr>
<tr>
<td>int sem_init(sem_t *sem, int pshared, unsigned int value)</td>
<td>初始化信号量结构</td>
</tr>
<tr>
<td>int sem_close(sem_t *sem)</td>
<td>结束到开放式信号量的连接</td>
</tr>
<tr>
<td>int sem_unlink(const char *name)</td>
<td>结束到开放式信号量的连接，并在最后一个进程关闭此信号量时将其删除</td>
</tr>
<tr>
<td>int sem_getvalue(sem_t <em>sem, int</em> sval)</td>
<td>将信号量的值复制到指定整数中</td>
</tr>
<tr>
<td>int sem_wait(sem_t *sem)</td>
<td>递减信号量计数，当其他进程拥有信号量时进行阻塞，或者当其他进程拥有信号量时返回错误（aka P 操作）</td>
</tr>
<tr>
<td>int sem_post(sem_t *sem)</td>
<td>递增信号量计数（aka V 操作）</td>
</tr>
</tbody>
</table>
<h1 id="共享内存相关" tabindex="-1"><a class="header-anchor" href="#共享内存相关" aria-hidden="true">#</a> 共享内存相关</h1>
<h2 id="内存映射" tabindex="-1"><a class="header-anchor" href="#内存映射" aria-hidden="true">#</a> 内存映射</h2>
<p>mmap()系统调用在调用进程的虚拟地址空间中提供映射，该映射将文件或设备映射到内存中。 这有两种类型 -</p>
<p><strong>File mapping or File-backed mapping</strong> - 此映射将进程的虚拟内存区域映射到文件。 这意味着读取或写入这些内存区域会导致文件被读取或写入。 这是默认的映射类型。</p>
<p><strong>Anonymous mapping</strong> - 此映射映射进程的虚拟内存区域，不受任何文件的支持。 内容初始化为零。 此映射类似于动态内存分配（malloc()），并在某些malloc()实现中用于某些分配。</p>
<p>当两个或多个进程共享相同的页面时，每个进程可以根据映射类型查看其他进程所做的页面内容的更改。 映射类型可以是私有的也可以是共享的 -</p>
<p><strong>Private Mapping (MAP_PRIVATE)</strong> - 对此映射内容的修改对其他进程不可见，并且映射不会传送到基础文件。</p>
<p><strong>Shared Mapping (MAP_SHARED)</strong> - 对此映射内容的修改对其他进程可见，并且映射将传送到基础文件。</p>
<h3 id="使用方法-4" tabindex="-1"><a class="header-anchor" href="#使用方法-4" aria-hidden="true">#</a> 使用方法</h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/mman.h></span></span>
<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">mmap</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>addr<span class="token punctuation">,</span> <span class="token class-name">size_t</span> length<span class="token punctuation">,</span> <span class="token keyword">int</span> prot<span class="token punctuation">,</span> <span class="token keyword">int</span> flags<span class="token punctuation">,</span> <span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token class-name">off_t</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参数</li>
</ul>
<p>虚拟地址addr可以是用户指定的，也可以是内核生成的（将addr作为NULL传递）;</p>
<p>字段length需要以字节为单位的映射大小;</p>
<p>字段prot表示存储器保护值，例如PROT_NONE，PROT_READ，PROT_WRITE，PROT_EXEC，分别用于可能无法访问，读取，写入或执行的区域。 该值可以是单个（PROT_NONE），也可以与三个标志中的任何一个（最后3个）进行OR运算;</p>
<p>字段flags指示映射类型或MAP_PRIVATE或MAP_SHARED;</p>
<p>字段fd表示标识要映射的文件的文件描述符;</p>
<p>字段offset表示文件的起始点，如果需要映射整个文件，则偏移量应为零。</p>
<ul>
<li>返回值</li>
</ul>
<p>在成功时返回映射的起始地址，或者在出错时返回MAP_FAILED。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/mman.h></span></span>
<span class="token keyword">int</span> <span class="token function">munmap</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>addr<span class="token punctuation">,</span> <span class="token class-name">size_t</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行已映射内存映射区域的取消映射。</p>
<p>字段addr表示映射的起始地址，length表示要取消映射的映射的字节大小。</p>
<h3 id="实例代码-1" tabindex="-1"><a class="header-anchor" href="#实例代码-1" aria-hidden="true">#</a> 实例代码</h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Filename: mmap_test.c */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/stat.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/mman.h></span></span>

<span class="token keyword">void</span> <span class="token function">write_mmap_sample_data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">stat</span> mmapstat<span class="token punctuation">;</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>data<span class="token punctuation">;</span>
    <span class="token keyword">int</span> minbyteindex<span class="token punctuation">;</span>
    <span class="token keyword">int</span> maxbyteindex<span class="token punctuation">;</span>
    <span class="token keyword">int</span> offset<span class="token punctuation">;</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">int</span> unmapstatus<span class="token punctuation">;</span>
    <span class="token function">write_mmap_sample_data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">stat</span><span class="token punctuation">(</span><span class="token string">"MMAP_DATA.txt"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>mmapstat<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">"stat failure"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token string">"MMAP_DATA.txt"</span><span class="token punctuation">,</span> O_RDONLY<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">"open failure"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    data <span class="token operator">=</span> <span class="token function">mmap</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">caddr_t</span><span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">,</span> mmapstat<span class="token punctuation">.</span>st_size<span class="token punctuation">,</span> PROT_READ<span class="token punctuation">,</span> MAP_SHARED<span class="token punctuation">,</span> fd<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">==</span> <span class="token punctuation">(</span><span class="token class-name">caddr_t</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">"mmap failure"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    minbyteindex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    maxbyteindex <span class="token operator">=</span> mmapstat<span class="token punctuation">.</span>st_size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Enter -1 to quit or "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"enter a number between %d and %d: "</span><span class="token punctuation">,</span> minbyteindex<span class="token punctuation">,</span> maxbyteindex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">"%d"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>offset <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>offset <span class="token operator">&lt;=</span> maxbyteindex<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Received char at %d is %c\n"</span><span class="token punctuation">,</span> offset<span class="token punctuation">,</span> data<span class="token punctuation">[</span>offset<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>offset <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Received invalid index %d\n"</span><span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>offset <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    unmapstatus <span class="token operator">=</span> <span class="token function">munmap</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> mmapstat<span class="token punctuation">.</span>st_size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>unmapstatus <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">"munmap failure"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">system</span><span class="token punctuation">(</span><span class="token string">"rm -f MMAP_DATA.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">write_mmap_sample_data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">char</span> ch<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">stat</span> textfilestat<span class="token punctuation">;</span>
    fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token string">"MMAP_DATA.txt"</span><span class="token punctuation">,</span> O_CREAT <span class="token operator">|</span> O_TRUNC <span class="token operator">|</span> O_WRONLY<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fd <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">"File open error "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Write A to Z</span>
    ch <span class="token operator">=</span> <span class="token char">'A'</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>ch <span class="token operator">&lt;=</span> <span class="token char">'Z'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">write</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ch<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ch<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Write 0 to 9</span>
    ch <span class="token operator">=</span> <span class="token char">'0'</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>ch <span class="token operator">&lt;=</span> <span class="token char">'9'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">write</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ch<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ch<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Write a to z</span>
    ch <span class="token operator">=</span> <span class="token char">'a'</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>ch <span class="token operator">&lt;=</span> <span class="token char">'z'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">write</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ch<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ch<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="共享内存" tabindex="-1"><a class="header-anchor" href="#共享内存" aria-hidden="true">#</a> 共享内存</h2>
<p>共享内存是两个或多个进程之间共享的内存。 但是，为什么我们需要共享内存或其他一些通信方式？</p>
<p>重申一下，每个进程都有自己的地址空间，如果任何进程想要将自己的地址空间中的某些信息与其他进程通信，那么只有IPC（进程间通信）技术才有可能。 我们已经知道，沟通可以在相关或不相关的流程之间进行。</p>
<h3 id="posix-版本" tabindex="-1"><a class="header-anchor" href="#posix-版本" aria-hidden="true">#</a> Posix 版本</h3>
<table>
<thead>
<tr>
<th>API</th>
<th>API 作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>int shm_open(const char *name, int oflag, mode_t mode)</td>
<td>创建共享内存，成功返回描述符</td>
</tr>
<tr>
<td>int shm_unlink(const char *name)</td>
<td>结束到共享内存的连接，并在最后一个进程关闭它时将其删除</td>
</tr>
<tr>
<td>void <em>mmap(void</em> addr, size_t length, int prot, int flags, int fd, off_t offset)</td>
<td>映射内存</td>
</tr>
</tbody>
</table>
<p>Posix的共享内存区构筑在<code v-pre>mmap</code>之上。</p>
<h3 id="systemv-版本" tabindex="-1"><a class="header-anchor" href="#systemv-版本" aria-hidden="true">#</a> SystemV 版本</h3>
<p>相关函数</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/ipc.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/shm.h></span></span>
<span class="token comment">// 创建或分配System V共享内存段, 成功时返回有效的共享内存标识符（用于进一步调用共享内存）</span>
<span class="token keyword">int</span> <span class="token function">shmget</span><span class="token punctuation">(</span><span class="token class-name">key_t</span> key<span class="token punctuation">,</span> <span class="token class-name">size_t</span> size<span class="token punctuation">,</span> <span class="token keyword">int</span> shmflg<span class="token punctuation">)</span>
<span class="token comment">// 为System V共享内存段执行共享内存操作，即将共享内存段附加到调用进程的地址空间。成功时返回附加共享内存段的地址。 </span>
<span class="token keyword">void</span> <span class="token operator">*</span> <span class="token function">shmat</span><span class="token punctuation">(</span><span class="token keyword">int</span> shmid<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>shmaddr<span class="token punctuation">,</span> <span class="token keyword">int</span> shmflg<span class="token punctuation">)</span>
<span class="token comment">// 从调用进程的地址空间中分离共享内存段的System V共享内存段。将在成功时返回0，在失败时返回-1</span>
<span class="token keyword">int</span> <span class="token function">shmdt</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>shmaddr<span class="token punctuation">)</span>
<span class="token comment">// 执行System V共享内存段的控制操作</span>
<span class="token keyword">int</span> <span class="token function">shmctl</span><span class="token punctuation">(</span><span class="token keyword">int</span> shmid<span class="token punctuation">,</span> <span class="token keyword">int</span> cmd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">shmid_ds</span> <span class="token operator">*</span>buf<span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考链接</p>
<p>《UNIX网络编程 卷2：进程间通信》</p>
<p><a href="https://iowiki.com/inter_process_communication/inter_process_communication_index.html" target="_blank" rel="noopener noreferrer">WIKI教程<ExternalLinkIcon/></a>
<a href="https://www.cnblogs.com/52php/p/5861372.html" target="_blank" rel="noopener noreferrer">Linux进程间通信（六）：共享内存 shmget()、shmat()、shmdt()、shmctl() <ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


