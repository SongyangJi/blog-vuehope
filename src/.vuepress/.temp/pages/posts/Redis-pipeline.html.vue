<template><div><img src="redis_mget.png" alt="redis_mget" style="zoom:50%;" />
<img src="@source/posts/redis_pipeline.png" alt="redis_pipeline" style="zoom:50%;" />
<ul>
<li>
<p>普通请求：等待上一条命令应答后再执行，中间不仅仅多了RTT，而且还频繁的调用系统IO，发送网络请求</p>
</li>
<li>
<p>mget：节省RTT，但是前面的key需要等待最后一个key回复</p>
</li>
<li>
<p>pineline：节省RTT，减少IO调用次数</p>
</li>
</ul>
<p>RTT(Round-Trip Time): 往返时延。在计算机网络中它是一个重要的性能指标，表示从发送端发送数据开始，到发送端收到来自接收端的确认（接收端收到数据后便立即发送确认），总共经历的时延。</p>
<p>RTT=传播时延（往返哒）+排队时延（路由器和交换机的）+数据处理时延（应用程序的）。</p>
<h1 id="pipeline实现原理" tabindex="-1"><a class="header-anchor" href="#pipeline实现原理" aria-hidden="true">#</a> Pipeline实现原理</h1>
<p>pipeline管道操作是需要客户端与服务端的支持，客户端将命令写入缓冲，最后再通过exec命令发送给服务端，服务端通过命令拆分，逐个执行返回结果。</p>
<p>​</p>
<p>pipeline通过减少客户端与redis的通信次数来实现降低往返延时时间，而且Pipeline 实现的原理是队列，而队列的原理是时先进先出，这样就保证数据的顺序性。</p>
<h1 id="pipeline适用场景" tabindex="-1"><a class="header-anchor" href="#pipeline适用场景" aria-hidden="true">#</a> Pipeline适用场景</h1>
<p>Pipeline在某些场景下非常有用，比如有多个command需要被&quot;及时的&quot;提交，而且他们对相应结果没有互相依赖，而且对结果响应也无需立即获得，那么pipeline就可以充当这种&quot;批处理&quot;的工具；而且在一定程度上，可以较大的提升性能,性能提升的原因主要是TCP链接中较少了&quot;交互往返&quot;的时间。</p>
<p>不过在编码时请注意，pipeline期间将&quot;独占&quot;链接，此期间将不能进行非&quot;管道&quot;类型的其他操作，直到pipeline关闭；比如在上述代码中间，使用jedis.set(key,value)等操作都将抛出异常。</p>
<p>https://juejin.cn/post/6844904127001001991</p>
<p>https://redis.io/docs/manual/pipelining/</p>
</div></template>


