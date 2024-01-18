<template><div><p>Reactor 模式也叫 Dispatcher 模式，我觉得这个名字更贴合该模式的含义，即 <strong>I/O</strong> 多路复⽤监
听事件，收到事件后，根据事件类型分配（<strong>Dispatch</strong>）给某个进程/线程。</p>
<p>Reactor 模式主要由 <strong>Reactor</strong> 和<strong>处理资源池</strong>这两个核⼼部分组成，它俩负责的事情如下：</p>
<ol>
<li><strong>Reactor 负责监听和分发事件，事件类型包含连接事件、读写事件</strong>；</li>
<li><strong>处理资源池负责处理事件，如 read -&gt; 业务逻辑 -&gt; send</strong>；</li>
</ol>
<p>Reactor 模式是灵活多变的，可以应对不同的业务场景，灵活在于：</p>
<ol>
<li>Reactor 的数量可以只有⼀个，也可以有多个；</li>
<li>处理资源池可以是单个进程 / 线程，也可以是多个进程 /线程；</li>
</ol>
<p>将上⾯的两个因素排列组设⼀下，理论上就可以有 4 种⽅案选择：</p>
<ol>
<li>单 Reactor 单进程 / 线程；</li>
<li>单 Reactor 多进程 / 线程；</li>
<li>多 Reactor 单进程 / 线程；</li>
<li>多 Reactor 多进程 / 线程；</li>
</ol>
<p>其中，「多 Reactor 单进程 / 线程」实现⽅案相⽐「单 Reactor 单进程 / 线程」⽅案，不仅复杂⽽且也没有性能优势，因此实际中并没有应⽤。</p>
<p>剩下的 3 个⽅案都是⽐较经典的，且都有应⽤在实际的项⽬中：
单 Reactor 单进程 / 线程；
单 Reactor 多线程 / 进程；
多 Reactor 多进程 / 线程；( Netty 和 Memcache 都采⽤了「多 Reactor 多线程、「多 Reactor 多进程」⽅案的开源软件是 Nginx)</p>
<p>⽅案具体使⽤进程还是线程，要看使⽤的编程语⾔以及平台有关：</p>
<p>Java 语⾔⼀般使⽤线程，⽐如 Netty;</p>
<p>C 语⾔使⽤进程和线程都可以，例如 Nginx 使⽤的是进程，Memcache 使⽤的是线程。</p>
<p>接下来，分别介绍这三个经典的 Reactor ⽅案。</p>
</div></template>


