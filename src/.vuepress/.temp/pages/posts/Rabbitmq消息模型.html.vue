<template><div><h1 id="基本模型" tabindex="-1"><a class="header-anchor" href="#基本模型" aria-hidden="true">#</a> 基本模型</h1>
<h2 id="单个消费者" tabindex="-1"><a class="header-anchor" href="#单个消费者" aria-hidden="true">#</a> 单个消费者</h2>
<figure><img src="https://www.rabbitmq.com/img/tutorials/python-one-overall.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="多个消费者并发消费" tabindex="-1"><a class="header-anchor" href="#多个消费者并发消费" aria-hidden="true">#</a> 多个消费者并发消费</h2>
<p><img src="https://www.rabbitmq.com/img/tutorials/python-two.png" alt="" loading="lazy">
如果有多个消费者，它们会共同消费这个队列里的消息，是负载均衡的实现方式，官方称这叫&quot;Work Queues&quot;。</p>
<p>（而在Kafka、RocketMQ里，这样的消费方式叫ConsumerGroup）</p>
<p><strong>总结</strong></p>
<p>根据上面的两张图，我们可以得出这样的结论，这里的队列逻辑上和物理上可以认为是一个，多个生产者并发push，多个消费者并发poll。</p>
<h1 id="交换机的引入" tabindex="-1"><a class="header-anchor" href="#交换机的引入" aria-hidden="true">#</a> 交换机的引入</h1>
<p>虽然基本的mq模型就是上面所述的，但是为了更好地管理消息的路由，各大mq的设计方案各有不同。</p>
<p>RabbitMq的设计理念是：消费者和<strong>队列</strong>打交道，生产者和<strong>交换机</strong>打交道，<strong>队列</strong>可以<strong>绑定（bind）<strong>到</strong>交换机</strong>上，二者的网络路由关系叫<strong>路由键</strong>。</p>
<blockquote>
<p>ps：虽然设计上，生产者只能将消息发到某个exchange，但是为了保持历史兼容，rabbit自己提供了一个default的交换机供你使用，这个交换机叫直连（Direct）交换机。</p>
</blockquote>
<h2 id="直连交换机-direct-exchange" tabindex="-1"><a class="header-anchor" href="#直连交换机-direct-exchange" aria-hidden="true">#</a> 直连交换机(Direct Exchange)</h2>
<figure><img src="https://www.rabbitmq.com/img/tutorials/direct-exchange.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如上图，消息发送到某个直连交换机后，具体要路由到哪个队列，是由生产者发送消息的路由键决定的。</p>
<blockquote>
<p>ps：同样，为了历史兼容，如果你使用了默认的交换机，也没有指定路由键，那么默认会使用队列名作为路由键。</p>
</blockquote>
<h2 id="扇出交换机-fanout-exchange" tabindex="-1"><a class="header-anchor" href="#扇出交换机-fanout-exchange" aria-hidden="true">#</a> 扇出交换机(Fanout Exchange)</h2>
<figure><img src="https://www.rabbitmq.com/img/tutorials/bindings.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>扇出交换机将消息广播到每一个bind的队列上。</p>
<blockquote>
<p>ps: 其实这里的fanout的概念就有点像kafka、rocketmq里，不同ConsumerGroup消费topic的概念，也就是说，不用的ConsumerGroup的消费进度是独立的。</p>
</blockquote>
<h2 id="主题交换机-topic-exchange" tabindex="-1"><a class="header-anchor" href="#主题交换机-topic-exchange" aria-hidden="true">#</a> 主题交换机（Topic Exchange）</h2>
<figure><img src="https://www.rabbitmq.com/img/tutorials/python-five.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>可以理解为<strong>带匹配符的Direct Exchange</strong>，根据路由键来路由到相匹配的队列上，而不是简单地比较是否相等。</p>
<blockquote>
<p>参考资料</p>
<p>https://www.rabbitmq.com/getstarted.html</p>
</blockquote>
</div></template>


