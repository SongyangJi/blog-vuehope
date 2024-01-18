<template><div><h1 id="进程-线程相关" tabindex="-1"><a class="header-anchor" href="#进程-线程相关" aria-hidden="true">#</a> 进程/线程相关</h1>
<h2 id="线程相关" tabindex="-1"><a class="header-anchor" href="#线程相关" aria-hidden="true">#</a> 线程相关</h2>
<h2 id="background-information" tabindex="-1"><a class="header-anchor" href="#background-information" aria-hidden="true">#</a> background information</h2>
<p>线程和进程的理论概念不再赘述。
Linux 中，系统是不认识线程还是进程的，它只认识 task。</p>
<blockquote>
<p>下面的阐述都是 Unix like 下的有关线程的语义。</p>
</blockquote>
<p>主线程和子线程</p>
<ul>
<li>共享： 用户区内，除了栈区是不共享的，其余都是共享的。</li>
<li>不共享： 栈区（当有 1 主 + 4 子线程时候，栈区会被平分为 5 份）</li>
</ul>
<p>多进程共享的资源（fork、clone出的子进程和父进程）：</p>
<ul>
<li>代码</li>
<li>文件描述符</li>
<li>内存映射区 –mmap</li>
</ul>
<p>多线程共享的资源：</p>
<ul>
<li>
<p>堆</p>
</li>
<li>
<p>全局变量</p>
</li>
<li>
<p>线程号和线程 ID 是有区别的
查看方式： 找到程序的进程 ID后， <code v-pre>ps -Lf $(pid)</code>，LWP那一列即为线程ID。</p>
</li>
</ul>
<h3 id="pthread-create" tabindex="-1"><a class="header-anchor" href="#pthread-create" aria-hidden="true">#</a> pthread_create</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;pthread.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>pthread非linux系统的默认库， 需手动链接-线程库 -lpthread</p>
<ul>
<li>
<p>函数说明:
返回成功时，由 tidp 指向的内存单元被设置为新创建线程的线程ID。a
ttr参数用于指定各种不同的线程属性。
新创建的线程从start_rtn函数的地址开始运行，该函数只有一个万能指针参数arg。
如果需要向start_rtn函数传递的参数不止一个，那么需要把这些参数放到一个结构体中，然后把这个结构的地址作为arg的参数传入。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token class-name">pthread_t</span> <span class="token operator">*</span>tidp<span class="token punctuation">,</span><span class="token keyword">const</span> <span class="token class-name">pthread_attr_t</span> <span class="token operator">*</span>attr<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">(</span><span class="token operator">*</span>start_rtn<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">void</span> <span class="token operator">*</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>参数说明：
第一个参数为指向线程标识符的指针。
第二个参数用来设置线程属性。
第三个参数是线程运行函数的起始地址。
最后一个参数是运行函数的参数。</p>
</li>
<li>
<p>返回值
若线程创建成功，则返回0。若线程创建失败，则返回出错编号，并且*thread中的内容是未定义的。</p>
</li>
<li>
<p>代码</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h></span></span>

<span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">13</span><span class="token punctuation">;</span> <span class="token comment">//设置为全局变量，在全局区域，共享</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">myfun</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">void</span><span class="token operator">*</span> p <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>num<span class="token punctuation">;</span>  <span class="token comment">//传一个地址进去（voi* 也是 4 个字节）</span>
    <span class="token class-name">pthread_t</span> id<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token punctuation">(</span>id<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> myfun<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"i = %d, thread id: %ld\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> id<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">myfun</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"num = %d, child thread id: %ld\n"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span><span class="token punctuation">)</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">++</span><span class="token punctuation">,</span> <span class="token function">pthread_self</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参考链接
<a href="https://man7.org/linux/man-pages/man3/pthread_create.3.html" target="_blank" rel="noopener noreferrer">pthread_create(3) — Linux manual page<ExternalLinkIcon/></a>
<a href="https://xmuli.tech/posts/28f8209f/" target="_blank" rel="noopener noreferrer">Linux中创建多线程实例pthread_create()<ExternalLinkIcon/></a></li>
</ul>
<h3 id="pthread-join" tabindex="-1"><a class="header-anchor" href="#pthread-join" aria-hidden="true">#</a> pthread_join</h3>
<p>pthread_join()即是子线程合入主线程，主线程阻塞等待子线程结束，然后回收子线程资源。</p>
<p>注意，默认情况下，资源是不会随着子线程的exit或return而回收的。</p>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>函数说明:
thread_join()函数，以阻塞的方式等待thread指定的线程结束。当函数返回时，被等待线程的资源被收回。
如果线程已经结束，那么该函数会立即返回。并且thread指定的线程必须是 joinable 的。</li>
<li>函数定义</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_join</span><span class="token punctuation">(</span><span class="token class-name">pthread_t</span> thread<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>retval<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>thread: 线程标识符，即线程ID，标识唯一线程。
retval: 用户定义的指针，用来存储被等待线程的返回值。</p>
<ul>
<li>
<p>返回值
0代表成功。 失败，返回的则是错误号。</p>
</li>
<li>
<p>示例代码：</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>

<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">thread_function</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Thread working... %d \n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">pthread_t</span> mythread<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mythread<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_function<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"error creating thread."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_join</span><span class="token punctuation">(</span>mythread<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"error join thread."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"thread done! \n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
 输出
Thread working...! 0 
Thread working...! 1 
Thread working...! 2 
Thread working...! 3 
Thread working...! 4 
Thread working...! 5 
Thread working...! 6 
Thread working...! 7 
thread done! 
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果去掉<code v-pre>pthread_join</code>的调用的话，
输出为：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>thread done<span class="token operator">!</span> 
Thread working<span class="token punctuation">..</span>. <span class="token number">0</span> 
Process finished with <span class="token builtin class-name">exit</span> code <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，子线程来不及执行它的函数，就因为父线程的死亡而被迫终结了。</p>
<h3 id="pthread-detach" tabindex="-1"><a class="header-anchor" href="#pthread-detach" aria-hidden="true">#</a> pthread_detach</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
pthread_join()函数的替代函数，可回收创建时detachstate属性设置为PTHREAD_CREATE_JOINABLE的线程的存储空间。
该函数不会阻塞父线程。
pthread_join()函数用于只是应用程序在线程tid终止时回收其存储空间。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_detach</span><span class="token punctuation">(</span><span class="token class-name">pthread_t</span> tid<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
thread_detach() 在调用成功完成之后返回零。其他任何返回值都表示出现了错误。</li>
</ul>
<p>注意，即使如此，父线程退出时，子线程仍然会强制退出。</p>
<h3 id="pthread-cancel" tabindex="-1"><a class="header-anchor" href="#pthread-cancel" aria-hidden="true">#</a> pthread_cancel</h3>
<ul>
<li>
<p>函数说明：
发送终止信号给thread线程，如果成功则返回0，否则为非0值。发送成功并不意味着thread会终止。</p>
</li>
<li>
<p>函数定义：</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pthread_cancel</span><span class="token punctuation">(</span><span class="token class-name">pthread_t</span> thread<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>示例代码：</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/**
 * @Author: 吉松阳
 * @Date: 2021/9/26
 * @Description: 
 */</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>

<span class="token keyword">void</span> <span class="token function">print_message_function</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>ptr<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">pthread_t</span> thread1<span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>thread1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span>print_message_function<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"main thread\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_cancel</span><span class="token punctuation">(</span>thread1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">print_message_function</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>ptr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">pthread_detach</span><span class="token punctuation">(</span><span class="token function">pthread_self</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"child thread\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 实验证明 pthread_exit 确实起作用了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参考链接：
<a href="https://www.cnblogs.com/lijunamneg/archive/2013/01/25/2877211.html" target="_blank" rel="noopener noreferrer">线程取消(pthread_cancel)<ExternalLinkIcon/></a></li>
</ul>
<h2 id="信号处理相关" tabindex="-1"><a class="header-anchor" href="#信号处理相关" aria-hidden="true">#</a> 信号处理相关</h2>
<h3 id="raise" tabindex="-1"><a class="header-anchor" href="#raise" aria-hidden="true">#</a> raise</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数, 会促使生成信号 sig。sig 参数与 SIG 宏兼容。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// sig -- 要发送的信号码。</span>
<span class="token keyword">int</span> <span class="token function">raise</span><span class="token punctuation">(</span><span class="token keyword">int</span> sig<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看所有信号：使用 <code v-pre>kill -l</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>songyangji@SongyangJi-Ubuntu-DeskStop:~$ <span class="token function">kill</span> <span class="token parameter variable">-l</span>
 <span class="token number">1</span><span class="token punctuation">)</span> SIGHUP	 <span class="token number">2</span><span class="token punctuation">)</span> SIGINT	 <span class="token number">3</span><span class="token punctuation">)</span> SIGQUIT	 <span class="token number">4</span><span class="token punctuation">)</span> SIGILL	 <span class="token number">5</span><span class="token punctuation">)</span> SIGTRAP
 <span class="token number">6</span><span class="token punctuation">)</span> SIGABRT	 <span class="token number">7</span><span class="token punctuation">)</span> SIGBUS	 <span class="token number">8</span><span class="token punctuation">)</span> SIGFPE	 <span class="token number">9</span><span class="token punctuation">)</span> SIGKILL	<span class="token number">10</span><span class="token punctuation">)</span> SIGUSR1
<span class="token number">11</span><span class="token punctuation">)</span> SIGSEGV	<span class="token number">12</span><span class="token punctuation">)</span> SIGUSR2	<span class="token number">13</span><span class="token punctuation">)</span> SIGPIPE	<span class="token number">14</span><span class="token punctuation">)</span> SIGALRM	<span class="token number">15</span><span class="token punctuation">)</span> SIGTERM
<span class="token number">16</span><span class="token punctuation">)</span> SIGSTKFLT	<span class="token number">17</span><span class="token punctuation">)</span> SIGCHLD	<span class="token number">18</span><span class="token punctuation">)</span> SIGCONT	<span class="token number">19</span><span class="token punctuation">)</span> SIGSTOP	<span class="token number">20</span><span class="token punctuation">)</span> SIGTSTP
<span class="token number">21</span><span class="token punctuation">)</span> SIGTTIN	<span class="token number">22</span><span class="token punctuation">)</span> SIGTTOU	<span class="token number">23</span><span class="token punctuation">)</span> SIGURG	<span class="token number">24</span><span class="token punctuation">)</span> SIGXCPU	<span class="token number">25</span><span class="token punctuation">)</span> SIGXFSZ
<span class="token number">26</span><span class="token punctuation">)</span> SIGVTALRM	<span class="token number">27</span><span class="token punctuation">)</span> SIGPROF	<span class="token number">28</span><span class="token punctuation">)</span> SIGWINCH	<span class="token number">29</span><span class="token punctuation">)</span> SIGIO	<span class="token number">30</span><span class="token punctuation">)</span> SIGPWR
<span class="token number">31</span><span class="token punctuation">)</span> SIGSYS	<span class="token number">34</span><span class="token punctuation">)</span> SIGRTMIN	<span class="token number">35</span><span class="token punctuation">)</span> SIGRTMIN+1	<span class="token number">36</span><span class="token punctuation">)</span> SIGRTMIN+2	<span class="token number">37</span><span class="token punctuation">)</span> SIGRTMIN+3
<span class="token number">38</span><span class="token punctuation">)</span> SIGRTMIN+4	<span class="token number">39</span><span class="token punctuation">)</span> SIGRTMIN+5	<span class="token number">40</span><span class="token punctuation">)</span> SIGRTMIN+6	<span class="token number">41</span><span class="token punctuation">)</span> SIGRTMIN+7	<span class="token number">42</span><span class="token punctuation">)</span> SIGRTMIN+8
<span class="token number">43</span><span class="token punctuation">)</span> SIGRTMIN+9	<span class="token number">44</span><span class="token punctuation">)</span> SIGRTMIN+10	<span class="token number">45</span><span class="token punctuation">)</span> SIGRTMIN+11	<span class="token number">46</span><span class="token punctuation">)</span> SIGRTMIN+12	<span class="token number">47</span><span class="token punctuation">)</span> SIGRTMIN+13
<span class="token number">48</span><span class="token punctuation">)</span> SIGRTMIN+14	<span class="token number">49</span><span class="token punctuation">)</span> SIGRTMIN+15	<span class="token number">50</span><span class="token punctuation">)</span> SIGRTMAX-14	<span class="token number">51</span><span class="token punctuation">)</span> SIGRTMAX-13	<span class="token number">52</span><span class="token punctuation">)</span> SIGRTMAX-12
<span class="token number">53</span><span class="token punctuation">)</span> SIGRTMAX-11	<span class="token number">54</span><span class="token punctuation">)</span> SIGRTMAX-10	<span class="token number">55</span><span class="token punctuation">)</span> SIGRTMAX-9	<span class="token number">56</span><span class="token punctuation">)</span> SIGRTMAX-8	<span class="token number">57</span><span class="token punctuation">)</span> SIGRTMAX-7
<span class="token number">58</span><span class="token punctuation">)</span> SIGRTMAX-6	<span class="token number">59</span><span class="token punctuation">)</span> SIGRTMAX-5	<span class="token number">60</span><span class="token punctuation">)</span> SIGRTMAX-4	<span class="token number">61</span><span class="token punctuation">)</span> SIGRTMAX-3	<span class="token number">62</span><span class="token punctuation">)</span> SIGRTMAX-2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，
当一个进程调用fork时，因为子进程在开始时复制父进程的存储映像，信号捕捉函数的地址在子进程中是有意义的，所以子进程继承父进程的信号处理方式。
但是当子进程调用exec后，因为exec运行新的程序后会覆盖从父进程继承来的存储映像。
那么信号捕捉函数在新程序中已无意义，所以exec会将原先设置为要捕捉的信号都更改为默认动作。</p>
<ul>
<li>返回值
如果成功该函数返回零，否则返回非零。</li>
</ul>
<h3 id="signal" tabindex="-1"><a class="header-anchor" href="#signal" aria-hidden="true">#</a> signal</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
C 库函数,设置一个函数来处理信号，即带有 sig 参数的信号处理程序。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token keyword">int</span> sig<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>func<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数说明：</p>
<ul>
<li>
<p>sig -- 在信号处理程序中作为变量使用的信号码。下面是一些重要的标准信号常量</p>
</li>
<li>
<p>func -- 一个指向函数的指针。它可以是一个由程序定义的函数，也可以是下面预定义函数之一。</p>
<ul>
<li>SIG_DFL	默认的信号处理程序。</li>
<li>SIG_IGN	忽视信号。</li>
</ul>
</li>
<li>
<p>返回值
该函数返回之前的信号处理程序</p>
</li>
<li>
<p>实例代码</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;signal.h></span></span>

<span class="token keyword">void</span> <span class="token function">signal_catchfunc</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret<span class="token punctuation">;</span>
    <span class="token function">signal</span><span class="token punctuation">(</span>SIGINT<span class="token punctuation">,</span> signal_catchfunc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"开始生成一个信号\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ret <span class="token operator">=</span> <span class="token function">raise</span><span class="token punctuation">(</span>SIGINT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"错误，不能生成SIGINT信号\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"退出....\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">signal_catchfunc</span><span class="token punctuation">(</span><span class="token keyword">int</span> signal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"捕获信号\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sandbox使用的信号" tabindex="-1"><a class="header-anchor" href="#sandbox使用的信号" aria-hidden="true">#</a> sandbox使用的信号</h3>
<p>信号的共达60余个，这里只介绍一下sandbox中使用的信号。</p>
<h3 id="sigusr1-sigusr2" tabindex="-1"><a class="header-anchor" href="#sigusr1-sigusr2" aria-hidden="true">#</a> SIGUSR1/SIGUSR2</h3>
<p>SIGUSR1 用户自定义信号 默认处理：进程终止;
SIGUSR2 用户自定义信号默认处理：进程终止。</p>
<h3 id="sigsegv" tabindex="-1"><a class="header-anchor" href="#sigsegv" aria-hidden="true">#</a> SIGSEGV</h3>
<p>在POSIX兼容的平台上，SIGSEGV是当一个进程<strong>执行了一个无效的内存引用</strong>，或<strong>发生段错误</strong>时发送给它的信号。
SIGSEGV的符号常量在头文件<code v-pre>signal.h</code>中定义。
因为在不同平台上，信号数字可能变化，因此最好使用符号信号名。通常，它是信号#11。
<a href="https://zh.wikipedia.org/wiki/SIGSEGV" target="_blank" rel="noopener noreferrer">SIGSEGV维基百科<ExternalLinkIcon/></a></p>
<h2 id="execxx-函数组" tabindex="-1"><a class="header-anchor" href="#execxx-函数组" aria-hidden="true">#</a> execXX 函数组</h2>
<p>exec函数族提供了一个在进程中启动另一个程序执行的方法。它可以根据指定的文件名或目录名找到可执行文件，
并用它来取代原调用进程的数据段、代码段和堆栈段，在执行完之后，原调用进程的内容除了进程号外，其他全部被新的进程替换了。
另外，这里的可执行文件既可以是二进制文件，也可以是Linux下任何可执行的脚本文件。</p>
<p>exec函数一共有六个，其中execve为内核级系统调用，
其他（execl，execle，execlp，execv，execvp）都是调用execve的库函数。
不同之处在于如何找到程序、如何指定参数以及环境来自何处。</p>
<ul>
<li>
<p>名称中带有 v 的调用，用带有一个数组参数来指定argv[]新程序的数组。数组的最后一个元素为 NULL。</p>
</li>
<li>
<p>名称中带有 l 的调用，将新程序的参数作为函数本身的可变长度参数列表。参数的结尾为参数指针(char *)NULL。
你应该始终进行类型转换，因为NULL实际是整数常量，并且调用可变参数函数时的默认参数转换不会将其转换为指针。</p>
</li>
<li>
<p>名称中带有 e 的调用，需要一个额外的参数（或l情况下的参数）来提供新程序的环境；否则，程序将继承当前进程的环境。</p>
</li>
</ul>
<h3 id="execve" tabindex="-1"><a class="header-anchor" href="#execve" aria-hidden="true">#</a> execve</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
pthread_create是类Unix操作系统（Unix、Linux、Mac OS X等）的创建线程的函数。
它的功能是创建线程（实际上就是确定调用该线程函数的入口点），在线程创建以后，就开始运行相关的线程函数。</p>
</li>
<li>
<p>函数定义:</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">execve</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>pathname<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token keyword">const</span> argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token keyword">const</span> envp<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>返回值:
如果执行成功则函数不会返回(后面的代码也并不会执行了)，执行失败则直接返回-1，失败原因存于errno 中。</p>
</li>
<li>
<p>示例代码:</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/**
 * @Author: 吉松阳
 * @Date: 2021/9/22
 * @Description: 
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"ls"</span><span class="token punctuation">,</span> <span class="token string">"-el"</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>envp<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"PATH=/bin"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">execve</span><span class="token punctuation">(</span><span class="token string">"/bin/ls"</span><span class="token punctuation">,</span> argv<span class="token punctuation">,</span> envp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
  total 128
  drwxr-xr-x  5 jisongyang  staff    160 Sep 22 22:07 CMakeFiles
  -rw-r--r--  1 jisongyang  staff   6687 Sep 22 22:06 Makefile
  -rw-r--r--  1 jisongyang  staff   1021 Sep 22 22:06 cmake_install.cmake
  -rwxr-xr-x  1 jisongyang  staff  50424 Sep 22 22:22 test_execve
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考链接:</p>
<ol>
<li><a href="https://man7.org/linux/man-pages/man2/execve.2.html" target="_blank" rel="noopener noreferrer">execve(2) — Linux manual page<ExternalLinkIcon/></a></li>
<li><a href="https://stackoverflow.com/questions/20823371/what-is-the-difference-between-the-functions-of-the-exec-family-of-system-calls" target="_blank" rel="noopener noreferrer">What is the difference between the functions of the exec family of system calls like exec and execve?<ExternalLinkIcon/></a></li>
</ol>
<h3 id="sleep" tabindex="-1"><a class="header-anchor" href="#sleep" aria-hidden="true">#</a> sleep</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
sleep()会令目前的进程暂停, 直到达到参数seconds 所指定的时间, 或是被信号所中断.</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">unsigned</span> <span class="token keyword">int</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> seconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回值
若进程暂停到参数seconds 所指定的时间则返回0, 若有信号中断则返回剩余秒数.</li>
</ul>
<h2 id="wait-函数组" tabindex="-1"><a class="header-anchor" href="#wait-函数组" aria-hidden="true">#</a> wait 函数组</h2>
<p>进程调用 exit() 退出执行后，被设置为僵死状态。
这时父进程可以通过 wait4() 系统调用查询子进程是否终结，之后再进行最后的操作，彻底删除进程所占用的内存资源。
wait4() 系统调用由 linux 内核实现。
linux 系统通常提供了 wait()、waitpid()、wait3()、wait4() 这四个函数，
四个函数的参数不同，语义也有细微的差别，但是都返回关于终止进程的状态信息。</p>
<h3 id="wait" tabindex="-1"><a class="header-anchor" href="#wait" aria-hidden="true">#</a> wait</h3>
<ul>
<li>头文件:</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h></span>        <span class="token comment">// 提供类型 pid_t 的定义</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>函数说明:
当进程调用 wait() 时，会暂停目前进程的执行（即阻塞），由 wait() 来自动分析是否当前进程的某个子进程已经退出，
如果找到了这样一个已经变成僵尸进程的子进程，wait 就会收集这个子进程的信息，并将其彻底销毁后返回；
如果没有找到这样一个子进程，wait 就会一直阻塞在这里，直到出现<strong>僵尸进程</strong>。</p>
</li>
<li>
<p>函数定义</p>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token class-name">pid_t</span> <span class="token function">wait</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数 status 保存着子进程退出时的一些状态（包括 task_struct、thread_info及内核栈等）它是一个指向 int 类型的指针；
如果不在意子进程的结束状态值，只想把这个僵尸进程消灭掉（实际上，大多数时候都是这样做的），则可以将这个参数设为 NULL。</p>
<p>关于 status参数比较复杂，可以参考这里
<a href="https://www.ibm.com/developerworks/cn/linux/kernel/syscall/part3/index.html" target="_blank" rel="noopener noreferrer">传送门<ExternalLinkIcon/></a></p>
<ul>
<li>返回值
如果 wait() 调用成功，则会返回被收集子进程的进程ID；如果被调用进程没有子进程，则调用失败，返回 -1</li>
</ul>
<h3 id="waitpid" tabindex="-1"><a class="header-anchor" href="#waitpid" aria-hidden="true">#</a> waitpid</h3>
<ul>
<li>函数原型：</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token class-name">pid_t</span> <span class="token function">waitpid</span><span class="token punctuation">(</span><span class="token class-name">pid_t</span> pid<span class="token punctuation">,</span><span class="token keyword">int</span> <span class="token operator">*</span>status<span class="token punctuation">,</span><span class="token keyword">int</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>waitpid() 函数的功能与 wait() 的功能类似，不过，它比 wait() 函数多了两个参数：</p>
<ul>
<li>
<p>1）参数 pid 为欲等待的子进程的识别码：
pid &lt; -1 ：等待进程组 ID 为 pid 绝对值的进程组中的任何子进程；
pid = -1 ：等待任何子进程，此时 waitpid() 相当于 wait()。实际上，wait()就是 pid = -1、options = 0 的waitpid()， 且有：
pid = 0 ：等待进程组 ID 与当前进程相同的任何子进程（也就是等待同一个进程组中的任何子进程）；
pid &gt; 0 ：等待任何子进程 ID 为 pid 的子进程，只要指定的子进程还没有结束，waitpid() 就会一直等下去。</p>
</li>
<li>
<p>2）参数 options 提供一些额外的选项来控制 waitpid()：
WNOHANG：如果没有任何已经结束了的子进程，则马上返回，不等待；
WUNTRACED：如果子进程进入暂停执行的情况，则马上返回，但结束状态不予理会；
也可以将这两个选项组合起来使用，使用 OR 操作。如果不想使用这两个选项，也可以直接把 options 设为 0</p>
</li>
<li>
<p>3）waitpid() 的返回值，有三种：
a）正常返回时，waitpid() 返回收集到的子进程的PID；
b）如果设置了 WNOHANG，而调用 waitpid() 时，没有发现已退出的子进程可收集，则返回0；
c）如果调用出错，则返回 -1，这时erron 会被设置为相应的值以指示错误所在。（当 pid 所指示的子进程不错在，或此进程存在，但不是调用进程的子进程， waitpid() 就会返回出错，这时 erron 被设置为 ECHILD）</p>
</li>
</ul>
<h3 id="wait3-wait4" tabindex="-1"><a class="header-anchor" href="#wait3-wait4" aria-hidden="true">#</a> wait3/wait4</h3>
<p>函数原型</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/tpyes.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h></span></span>

<span class="token class-name">pid_t</span> <span class="token function">wait3</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>status<span class="token punctuation">,</span><span class="token keyword">int</span> options<span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">rusage</span> <span class="token operator">*</span>rusage<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">pid_t</span> <span class="token function">wait4</span><span class="token punctuation">(</span><span class="token class-name">pid_t</span> pid<span class="token punctuation">,</span><span class="token keyword">int</span> <span class="token operator">*</span>status<span class="token punctuation">,</span><span class="token keyword">int</span> options<span class="token punctuation">,</span><span class="token keyword">struct</span> <span class="token class-name">rusage</span> <span class="token operator">*</span>rusage<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wait3() 和 wait4() 函数除了可以获得子进程状态信息外，还可以获得子进程的资源使用信息，这些信息是通过参数 <strong>rusage</strong> 得到的。
而 wait3() 与 wait4() 之间的区别是，wait3() 等待所有进程，而 wait4() 可以根据 pid 的值选择要等待的子进程。
参数 pid 的意义与 waitpid() 函数的一样。</p>
<p>其中，需要注意的是，参数rusage所指向的结构中返回终止子进程的资源使用情况。其中包括进程使用的CPU时间总量以及内存管理的统计数据。
如下，为它的结构定义：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">rusage</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">timeval</span> ru_utime<span class="token punctuation">;</span> <span class="token comment">/* user CPU time used */</span>
    <span class="token keyword">struct</span> <span class="token class-name">timeval</span> ru_stime<span class="token punctuation">;</span> <span class="token comment">/* system CPU time used */</span>
    <span class="token keyword">long</span>   ru_maxrss<span class="token punctuation">;</span>        <span class="token comment">/* maximum resident set size */</span>
    <span class="token keyword">long</span>   ru_ixrss<span class="token punctuation">;</span>         <span class="token comment">/* integral shared memory size */</span>
    <span class="token keyword">long</span>   ru_idrss<span class="token punctuation">;</span>         <span class="token comment">/* integral unshared data size */</span>
    <span class="token keyword">long</span>   ru_isrss<span class="token punctuation">;</span>         <span class="token comment">/* integral unshared stack size */</span>
    <span class="token keyword">long</span>   ru_minflt<span class="token punctuation">;</span>        <span class="token comment">/* page reclaims (soft page faults) */</span>
    <span class="token keyword">long</span>   ru_majflt<span class="token punctuation">;</span>        <span class="token comment">/* page faults (hard page faults) */</span>
    <span class="token keyword">long</span>   ru_nswap<span class="token punctuation">;</span>         <span class="token comment">/* swaps */</span>
    <span class="token keyword">long</span>   ru_inblock<span class="token punctuation">;</span>       <span class="token comment">/* block input operations */</span>
    <span class="token keyword">long</span>   ru_oublock<span class="token punctuation">;</span>       <span class="token comment">/* block output operations */</span>
    <span class="token keyword">long</span>   ru_msgsnd<span class="token punctuation">;</span>        <span class="token comment">/* IPC messages sent */</span>
    <span class="token keyword">long</span>   ru_msgrcv<span class="token punctuation">;</span>        <span class="token comment">/* IPC messages received */</span>
    <span class="token keyword">long</span>   ru_nsignals<span class="token punctuation">;</span>      <span class="token comment">/* signals received */</span>
    <span class="token keyword">long</span>   ru_nvcsw<span class="token punctuation">;</span>         <span class="token comment">/* voluntary context switches */</span>
    <span class="token keyword">long</span>   ru_nivcsw<span class="token punctuation">;</span>        <span class="token comment">/* involuntary context switches */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中比较重要的三项：</p>
<ol>
<li>timeval ru_utime; /* user CPU time used */        用户态CPU使用时间</li>
<li>timeval ru_stime; /* system CPU time used */      内核态CPU使用时间</li>
<li>ru_maxrss;        /* maximum resident set size */ 最大驻留集</li>
</ol>
<p>还可以shell中使用</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">man</span> getrusage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="如何使用int-status" tabindex="-1"><a class="header-anchor" href="#如何使用int-status" aria-hidden="true">#</a> 如何使用int* status</h3>
<p>如果参数status的值不是NULL，wait就会把子进程退出时的状态取出并存入其中，这指向整数值（int），
指出了子进程是正常退出还是被非正常结束的，以及正常结束时的返回值，或被哪一个信号结束的等信息。
由于这些信息被存放在<strong>一个整数的不同二进制位</strong>中，所以用常规的方法读取会非常麻烦，
于是就设计了一套专门的宏来完成这项工作，下面介绍一下其中最常用的几个。</p>
<p>请注意，下面的宏中的 status 虽然名字一样，这里的参数status并不同于wait中的参数
一个是指向整数的指针，而是那个指针所指向的整数，切记不要搞混。</p>
<h3 id="wifexited-int-status" tabindex="-1"><a class="header-anchor" href="#wifexited-int-status" aria-hidden="true">#</a> WIFEXITED(int status)</h3>
<p>这个宏用来指出进程是否为正常退出的，如果是，它会返回一个非零值。</p>
<h3 id="wexitstatus-status" tabindex="-1"><a class="header-anchor" href="#wexitstatus-status" aria-hidden="true">#</a> WEXITSTATUS(status)</h3>
<p><strong>当WIFEXITED返回非零值时</strong>，可以用这个宏来提取<strong>子进程的返回值</strong>。
如果子进程调用exit(5)退出，WEXITSTATUS(status) 就会返回5；如果子进程调用exit(7)，WEXITSTATUS(status)就会返回7。
请注意，如果进程不是正常退出的，也就是 说，WIFEXITED返回0，这个值就毫无意义。</p>
<p>所以二者往往这样配合使用：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//正常退出判断</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">WIFEXITED</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"child exit with %d\n"</span><span class="token punctuation">,</span> <span class="token function">WEXITSTATUS</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wifsignaled-status" tabindex="-1"><a class="header-anchor" href="#wifsignaled-status" aria-hidden="true">#</a> WIFSIGNALED(status)</h3>
<p>这个宏来指出进程是否遇到未处理的信号而意外退出，如果是，返回非零0.</p>
<h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h3>
<p><strong>当 WIFSIGNALED 返回非零值时</strong>，此时可通过WTERMSIG(status)获取使得<strong>进程退出的信号编号</strong></p>
<p>所以二者可以这样配合使用</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//因为某种信号中断获取状态</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">WIFSIGNALED</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"child killed by %d\n"</span><span class="token punctuation">,</span> <span class="token function">WTERMSIG</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>参考链接
<a href="https://man7.org/linux/man-pages/man2/wait4.2.html" target="_blank" rel="noopener noreferrer">wait4(2) — Linux manual page<ExternalLinkIcon/></a></li>
</ul>
</div></template>


