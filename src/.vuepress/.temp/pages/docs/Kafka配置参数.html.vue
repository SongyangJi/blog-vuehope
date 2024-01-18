<template><div><h1 id="producer主要消息配置" tabindex="-1"><a class="header-anchor" href="#producer主要消息配置" aria-hidden="true">#</a> Producer主要消息配置</h1>
<ol>
<li>buffer.memory 缓冲消息的缓冲区大小（默认值32MB）</li>
<li>retries <strong>可重试异常的自动重试次数</strong></li>
<li>batch.size 当一个batch满的时候，producer会发送此batch的所有消息（默认值16KB）</li>
<li>linger.ms 发送消息的延迟时间（即使batch没有满，也会发送消息，和batch.size配合使用）</li>
<li>max.request.size 控制producer单条消息的大小</li>
<li>request.timeout.ms broker需要在此规定时间内返回处理结果</li>
</ol>
<p>为合理使用kafka的缓冲区和批处理机制，一般情况下，buffer.memory &gt; batch.size &gt; max.request.size。</p>
<h1 id="consumer主要消息配置" tabindex="-1"><a class="header-anchor" href="#consumer主要消息配置" aria-hidden="true">#</a> Consumer主要消息配置</h1>
<table>
<thead>
<tr>
<th><strong>参数</strong></th>
<th><strong>默认值</strong></th>
<th><strong>推荐值</strong></th>
<th><strong>说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>auto.commit.enable</td>
<td>TRUE</td>
<td>FALSE</td>
<td>如果为真，consumer所fetch的消息的offset将会自动的同步到zookeeper。这项提交的offset将在进程无法提供服务时，由新的consumer使用。约束： 设置为false后，需要先成功消费再提交，这样可以避免消息丢失。</td>
</tr>
<tr>
<td>auto.offset.reset</td>
<td>latest</td>
<td>earliest</td>
<td>没有初始化offset或者offset被删除时，可以设置以下值：earliest：自动复位offset为最早 latest：自动复位offset为最新none：如果没有发现offset则向消费者抛出异常anything else：向消费者抛出异常。</td>
</tr>
<tr>
<td>connections.max.idle.ms</td>
<td>600000</td>
<td>30000</td>
<td>空连接的超时时间（单位为ms），设置为30000可以在网络异常场景下减少请求卡顿的时间。</td>
</tr>
</tbody>
</table>
<ul>
<li>earliest
当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费</li>
<li>latest
当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的该分区下的数据</li>
<li>none
topic各分区都存在已提交的offset时，从offset后开始消费；只要有一个分区不存在已提交的offset，则抛出异常</li>
</ul>
<h1 id="发消息不丢配置" tabindex="-1"><a class="header-anchor" href="#发消息不丢配置" aria-hidden="true">#</a> 发消息不丢配置</h1>
<ol>
<li>block.on.buffer.full = true</li>
<li>acks = all</li>
<li>retries = MAX_VALUE</li>
<li>max.in.flight.requests.per.connection = 1</li>
<li>使用KafkaProducer.send(record, callback)</li>
<li>callback逻辑中显式关闭producer：close(0)</li>
<li>unclean.leader.election.enable=false</li>
<li>replication.factor = 3</li>
<li>min.insync.replicas = 2</li>
<li>replication.factor &gt; min.insync.replicas</li>
<li>enable.auto.commit=false</li>
</ol>
<h2 id="producer端" tabindex="-1"><a class="header-anchor" href="#producer端" aria-hidden="true">#</a> Producer端</h2>
<ul>
<li>block.on.buffer.full = true  尽管该参数在0.9.0.0已经被标记为“deprecated”，但鉴于它的含义非常直观，所以这里还是显式设置它为true，使得producer将一直等待缓冲区直至其变为可用。否则如果producer生产速度过快耗尽了缓冲区，producer将抛出异常</li>
<li>acks=all  很好理解，所有follower都响应了才认为消息提交成功，即 'committed'</li>
<li>retries = MAX 无限重试，直到你意识到出现了问题</li>
<li>max.in.flight.requests.per.connection = 1 限制客户端在单个broker连接上能够发送的未响应请求的个数。设置此值是1表示kafka broker在响应请求之前client不能再向同一个broker发送请求。注意：设置此参数是为了避免消息乱序</li>
<li>使用KafkaProducer.send(record, callback)而不是send(record)方法 ，自定义回调逻辑处理消息发送失败</li>
<li>callback逻辑中最好显式关闭producer：close(0) 注意：设置此参数是为了避免消息乱序</li>
</ul>
<p><strong>关于acks</strong>:</p>
<table>
<thead>
<tr>
<th><strong>acks</strong></th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>0</strong></td>
<td>Producer 往集群发送数据不需要等到集群的返回，不确保消息发送成功。安全性最低但是效率最高。</td>
</tr>
<tr>
<td><strong>1</strong></td>
<td>Producer 往集群发送数据只要 Leader 应答就可以发送下一条，只确保 Leader 接收成功。</td>
</tr>
<tr>
<td><strong>-1 或 all</strong></td>
<td>Producer 往集群发送数据需要所有的ISR Follower 都完成从 Leader 的同步才会发送下一条，确保 Leader 发送成功和所有的副本都成功接收。安全性最高，但是效率最低。</td>
</tr>
</tbody>
</table>
<h2 id="broker配置" tabindex="-1"><a class="header-anchor" href="#broker配置" aria-hidden="true">#</a> Broker配置</h2>
<ul>
<li>unclean.leader.election.enable=false  关闭unclean leader选举，即不允许非ISR中的副本被选举为leader，以避免数据丢失</li>
<li>replication.factor &gt;= 3  这个完全是个人建议了，参考了Hadoop及业界通用的三备份原则</li>
<li>min.insync.replicas &gt; 1 消息至少要被写入到ISR中的这么多副本才算成功，也是提升数据持久性的一个参数。与acks配合使用</li>
<li>保证replication.factor &gt; min.insync.replicas  如果两者相等，当一个副本挂掉了分区也就没法正常工作了。通常设置replication.factor = min.insync.replicas + 1即可</li>
</ul>
<p><a href="https://kafka.apache.org/documentation/#configuration" target="_blank" rel="noopener noreferrer">官网参考配置<ExternalLinkIcon/></a></p>
</div></template>


