<template><div><h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h1>
<p>使用消息代理的系统根据定义是分布式的。</p>
<p>由于发送的协议方法（消息）不能保证到达对等方或被其成功处理，</p>
<p>因此<strong>发布者和消费者都需要一种机制来进行传递和处理确认</strong>。RabbitMQ 支持的几种消息传递协议提供了这样的特性。</p>
<ul>
<li>
<p>从代理（broker）对发布者（publisher）的确认是一个称为**publisher-confirms（发布者确认）**的扩展 协议。</p>
</li>
<li>
<p>从消费者（consumer）到 RabbitMQ 的传递处理确认在消息传递协议中称为<strong>acknowledgement（简称 ack，计算机网络中经常用到）</strong>；</p>
</li>
</ul>
<p>这两个功能都基于相同的想法，并受到 TCP 的启发。</p>
<p>它们对于从发布者到 RabbitMQ 节点以及从 RabbitMQ 节点到消费者的可靠交付至关重要。换句话说，<strong>它们对于数据安全至关重要</strong>。</p>
<h1 id="生产者发布消息不丢失" tabindex="-1"><a class="header-anchor" href="#生产者发布消息不丢失" aria-hidden="true">#</a> 生产者发布消息不丢失</h1>
<blockquote>
<p>注意下面两种方案不可以同时选择，最多选其一。</p>
<p>即事务通道不能进入确认模式，并且确认模式的通道也不能成为事务通道。</p>
</blockquote>
<h2 id="事务机制" tabindex="-1"><a class="header-anchor" href="#事务机制" aria-hidden="true">#</a> 事务机制</h2>
<ul>
<li>原生Java客户端</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>        <span class="token class-name">Channel</span> ch <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
        ch<span class="token punctuation">.</span><span class="token function">txSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token constant">MSG_COUNT</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                ch<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token constant">QUEUE_NAME</span><span class="token punctuation">,</span>
                        <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_BASIC</span><span class="token punctuation">,</span>
                        <span class="token string">"nop"</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                ch<span class="token punctuation">.</span><span class="token function">txCommit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ch<span class="token punctuation">.</span><span class="token function">txRollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>SpringBoot AMQP</li>
</ul>
<p>首先提供一个事务管理器供SpringBoot使用。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token class-name">RabbitTransactionManager</span> <span class="token function">transactionManager</span><span class="token punctuation">(</span><span class="token class-name">ConnectionFactory</span> connectionFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RabbitTransactionManager</span><span class="token punctuation">(</span>connectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，在消息生产者上面做两件事：添加<code v-pre>@Transactional</code>并设置通信信道为事务模式：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Service</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MsgService</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Autowired</span>
        <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

        <span class="token annotation punctuation">@Transactional</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            rabbitTemplate<span class="token punctuation">.</span><span class="token function">setChannelTransacted</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">// rabbitTemplate.convertAndSend(...);</span>
         <span class="token comment">// int i = 1 / 0; 没有爆发异常，由spring提交事务，否则回滚（也就是不发生消息）</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是使用事务有两个问题。</p>
<p>首先channel长时间处于阻塞：发布者必须依次等待broker处理每条消息。</p>
<p>不过有时候发布者只要知道broker宕机时哪些消息尚未处理就足够了。</p>
<p>其次是事务实现的繁重性：每次提交都需要一个 fsync()，这需要很多时间才能完成。</p>
<blockquote>
<p>发布 10000 条消息需要 4 多分钟（具体参数机器性能决定，总之确实非常慢）</p>
</blockquote>
<h2 id="发送方确认机制" tabindex="-1"><a class="header-anchor" href="#发送方确认机制" aria-hidden="true">#</a> 发送方确认机制</h2>
<p>一旦通道进入确认模式，代理将在处理消息时确认消息。</p>
<p>由于这是<strong>异步完成</strong>的，生产者可以流式发布而不用等待代理，代理也可以有效地<strong>批量写入磁盘</strong>。</p>
<ul>
<li>原生Java客户端</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>     <span class="token comment">// 消息追踪记录（如果需要线程安全并且有序，可以使用 ConcurrentSkipListMap ）</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 必须显式开启</span>
        channel<span class="token punctuation">.</span><span class="token function">confirmSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 监听被退回的消息(如消息路由到队列失败)</span>
        channel<span class="token punctuation">.</span><span class="token function">addReturnListener</span><span class="token punctuation">(</span>returnMessage <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"return : "</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>returnMessage<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" publish fail!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 监听被到达或未到达交换机（exchange）的消息</span>
        channel<span class="token punctuation">.</span><span class="token function">addConfirmListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ConfirmListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleAck</span><span class="token punctuation">(</span><span class="token keyword">long</span> deliveryTag<span class="token punctuation">,</span> <span class="token keyword">boolean</span> multiple<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 发送成功，缓存清除掉</span>
            <span class="token punctuation">}</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleNack</span><span class="token punctuation">(</span><span class="token keyword">long</span> deliveryTag<span class="token punctuation">,</span> <span class="token keyword">boolean</span> multiple<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"not ack!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 下面可以进行重新发送等逻辑</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> idx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>idx <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"from server..."</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token operator">++</span>idx<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 追踪记录</span>
                map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>channel<span class="token punctuation">.</span><span class="token function">getNextPublishSeqNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 发送消息</span>
                channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queue<span class="token punctuation">,</span> <span class="token class-name">MessageProperties</span><span class="token punctuation">.</span><span class="token constant">PERSISTENT_BASIC</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"以下为未成功发送的消息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 可以进行重试逻辑</span>
            map<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>s <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"not ack, may need publish again : "</span> <span class="token operator">+</span> s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>SpringBoot AMQP</li>
</ul>
<p>首先<strong>在配置文件中配置中开启消息发送方确认机制</strong>。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">publisher-returns</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">publisher-confirm-type</span><span class="token punctuation">:</span> correlated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>publisher-confirm-type</code>有三种属性：</p>
<ol>
<li>none：表示禁用发布确认模式，默认即此。</li>
<li>correlated：使用相关消息确认，回调中触发。</li>
<li>simple：使用 <code v-pre>waitForConfirms()</code> 和 <code v-pre>waitForConfirmsOrDie()</code> 方法的进行确认。</li>
</ol>
<p>然后<strong>配置回调的监听器</strong>：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PublisherConfirmConfig</span> <span class="token keyword">implements</span> <span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ConfirmCallback</span><span class="token punctuation">,</span> <span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ReturnsCallback</span> <span class="token punctuation">{</span>

    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">PublisherConfirmConfig</span><span class="token punctuation">(</span><span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>rabbitTemplate <span class="token operator">=</span> rabbitTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//@Bean 此处无需注入</span>
    <span class="token class-name">RabbitTransactionManager</span> <span class="token function">transactionManager</span><span class="token punctuation">(</span><span class="token class-name">ConnectionFactory</span> connectionFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RabbitTransactionManager</span><span class="token punctuation">(</span>connectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token class-name">CorrelationData</span> correlationData<span class="token punctuation">,</span> <span class="token keyword">boolean</span> ack<span class="token punctuation">,</span> <span class="token class-name">String</span> cause<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"correlationData : "</span><span class="token operator">+</span>correlationData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ack<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"cause : "</span><span class="token operator">+</span>cause<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">returnedMessage</span><span class="token punctuation">(</span><span class="token class-name">ReturnedMessage</span> returned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>returned<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initRabbitTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setConfirmCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setReturnsCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发送消息：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 注意必须传入 CorrelationData，否则没有根据去跟踪（原生client使用deliveryTag跟踪）</span>
rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token string">"q1"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">)</span> s<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">CorrelationData</span><span class="token punctuation">(</span><span class="token string">"correlation id = "</span> <span class="token operator">+</span> count<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="mq服务器存储消息不丢失" tabindex="-1"><a class="header-anchor" href="#mq服务器存储消息不丢失" aria-hidden="true">#</a> MQ服务器存储消息不丢失</h1>
<h1 id="消费者消费消息不丢失" tabindex="-1"><a class="header-anchor" href="#消费者消费消息不丢失" aria-hidden="true">#</a> 消费者消费消息不丢失</h1>
<h2 id="关于ack" tabindex="-1"><a class="header-anchor" href="#关于ack" aria-hidden="true">#</a> 关于ACK</h2>
<h3 id="rabbitmq的client" tabindex="-1"><a class="header-anchor" href="#rabbitmq的client" aria-hidden="true">#</a> RabbitMQ的Client</h3>
<p>RabbitMQ中<code v-pre>channel</code>在消费消息（<code v-pre>basicConsume(String queue, boolean autoAck, Consumer callback)</code>）的时候，指定的ack的含义如下：</p>
<ul>
<li>autoAck = true</li>
</ul>
<p>当broker在消息发送后（写入TCP套接字后）此条消息就立即ack了，此条消息RabbitMQ服务器也不再保存了，</p>
<p>而丝毫不管收到消息的客户端是否处理。如果消费者在收到大量消息但没有处理的时候突然宕机了，那么那些未处理消息也就随着本地缓冲区的消失而消失了（服务器上也没有了）。</p>
<p>这种ack方式谨慎使用。</p>
<ul>
<li>autoAck = false</li>
</ul>
<p>这种ack方式必须要求用户自己主动ack消息（<code v-pre>channel.basicAck</code>）,常常和prefetchCount配合使用（后面会介绍到）。</p>
<h3 id="spring-amqp" tabindex="-1"><a class="header-anchor" href="#spring-amqp" aria-hidden="true">#</a> Spring AMQP</h3>
<p>需要注意的是Spring AMQP中配置的ack的含义和上面的ack含义是不一样的。</p>
<ul>
<li>auto（default）</li>
</ul>
<p>容器将根据侦听器是正常返回还是抛出异常来发出 ack/nack。</p>
<ul>
<li>none</li>
</ul>
<p>这里的none和rabbitmq的auto是一个含义。</p>
<ul>
<li>manual</li>
</ul>
<p>用户必须通过channel去ack/nack</p>
<p><strong>配置方式</strong></p>
<ul>
<li>yaml配置</li>
</ul>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">listener</span><span class="token punctuation">:</span>
      <span class="token key atrule">simple</span><span class="token punctuation">:</span>
        <span class="token key atrule">acknowledge-mode</span><span class="token punctuation">:</span> auto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>方法级别（覆盖外部配置）</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token string">"ququeName"</span><span class="token punctuation">,</span> ackMode <span class="token operator">=</span> <span class="token string">"manual"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="ack的相关api" tabindex="-1"><a class="header-anchor" href="#ack的相关api" aria-hidden="true">#</a> Ack的相关api</h2>
<h3 id="deliverytag-交付标签" tabindex="-1"><a class="header-anchor" href="#deliverytag-交付标签" aria-hidden="true">#</a> deliveryTag（交付标签）</h3>
<p>当消费者（订阅）被注册时，消息将被 RabbitMQ 使用basic.deliver 方法传递。</p>
<p>该方法带有一个<em>交付标签</em>，它<strong>唯一地标识了一个通道上的交付</strong>。因此，<strong>交付标签的范围是每个channel</strong>。</p>
<p>交付标签是单调增长的正整数。确认交付的客户端库方法将交付标签作为参数。</p>
<p>由于交付标签的范围是每个通道，<strong>交付必须在接收它们的同一通道上得到确认</strong>。</p>
<p>在不同的通道上确认将导致“未知传递标签”协议异常并关闭通道。</p>
<h3 id="确认-ack-方法" tabindex="-1"><a class="header-anchor" href="#确认-ack-方法" aria-hidden="true">#</a> 确认（ack）方法</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>oid <span class="token function">basicAck</span><span class="token punctuation">(</span><span class="token keyword">long</span> deliveryTag<span class="token punctuation">,</span> <span class="token keyword">boolean</span> multiple<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>multiple为true的时候，会将之前的消息都ack（即交付标签小于deliveryTag的消息都会被ack）</p>
<h3 id="拒绝-rejecj-nack-方法" tabindex="-1"><a class="header-anchor" href="#拒绝-rejecj-nack-方法" aria-hidden="true">#</a> 拒绝（rejecj\nack）方法</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">basicReject</span><span class="token punctuation">(</span><span class="token keyword">long</span> deliveryTag<span class="token punctuation">,</span> <span class="token keyword">boolean</span> requeue<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>requeue为true的时候会将消息重新入队，但必须要注意的是**如果这个queue没有其他消费者，而本机由于某些原因会反复拉取这条消息并拒绝再拉取导致死循环。**所以，在需要将消息重新入队的时候，需要注意消息重新入队的次数。</p>
<p>还有一个相似的方法，</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token function">basicNack</span><span class="token punctuation">(</span><span class="token keyword">long</span> deliveryTag<span class="token punctuation">,</span> <span class="token keyword">boolean</span> multiple<span class="token punctuation">,</span> <span class="token keyword">boolean</span> requeue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>多了个 multiple 参数，含义和上面ack的multiple的一致。</p>
<h1 id="业务上实现" tabindex="-1"><a class="header-anchor" href="#业务上实现" aria-hidden="true">#</a> 业务上实现</h1>
<h2 id="投递失败的消息如何处理" tabindex="-1"><a class="header-anchor" href="#投递失败的消息如何处理" aria-hidden="true">#</a> 投递失败的消息如何处理</h2>
<h2 id="消费的幂等性如何做到" tabindex="-1"><a class="header-anchor" href="#消费的幂等性如何做到" aria-hidden="true">#</a> 消费的幂等性如何做到</h2>
<h2 id="消息中间件实现分布式事务" tabindex="-1"><a class="header-anchor" href="#消息中间件实现分布式事务" aria-hidden="true">#</a> 消息中间件实现分布式事务</h2>
<h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h1>
<p><a href="https://blog.rabbitmq.com/posts/2011/02/introducing-publisher-confirms" target="_blank" rel="noopener noreferrer">介绍发布者确认<ExternalLinkIcon/></a></p>
<p><a href="https://rabbitmq.com/tutorials/tutorial-seven-java.html" target="_blank" rel="noopener noreferrer">发布者确认<ExternalLinkIcon/></a></p>
<p><a href="https://rabbitmq.com/confirms.html#consumer-acks-api-elements" target="_blank" rel="noopener noreferrer">消费者确认和发布者确认<ExternalLinkIcon/></a></p>
</div></template>


