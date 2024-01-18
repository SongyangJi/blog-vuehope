<template><div><h1 id="节点类型" tabindex="-1"><a class="header-anchor" href="#节点类型" aria-hidden="true">#</a> 节点类型</h1>
<p>1.持久节点(PERSISTENT)
持久节点，创建后一直存在，直到主动删除此节点。</p>
<p>2.持久顺序节点(PERSISTENT_SEQUENTIAL)
持久顺序节点，创建后一直存在，直到主动删除此节点。在ZK中，每个父节点会为它的第一级子节点维护一份时序，记录每个子节点创建的先后顺序。</p>
<p>3.临时节点(EPHEMERAL)
临时节点在客户端会话失效后节点自动清除。临时节点下面不能创建子节点。</p>
<p>4.临时顺序节点(EPHEMERAL_SEQUENTIAL)
临时节点在客户端会话失效后节点自动清除。临时节点下面不能创建子节点。父节点getChildren会获得顺序的节点列表。</p>
<h1 id="有哪几种角色" tabindex="-1"><a class="header-anchor" href="#有哪几种角色" aria-hidden="true">#</a> 有哪几种角色</h1>
<ol>
<li>Leader</li>
</ol>
<p>（1）事务请求的唯一调度和处理者，保证集群事务处理的顺序性</p>
<p>（2）集群内部各服务的调度者</p>
<ol start="2">
<li>Follower</li>
</ol>
<p>（1）处理客户端的非事务请求，转发事务请求给 Leader 服务器</p>
<p>（2）参与事务请求 Proposal 的投票</p>
<p>（3）参与 Leader 选举投票</p>
<ol start="3">
<li>Observer</li>
</ol>
<p>3.3.0 版本以后引入的一个服务器角色，在不影响集群事务处理能力的基础上提升集群的非事务处理能力</p>
<p>（1）处理客户端的非事务请求，转发事务请求给 Leader 服务器</p>
<p>（2）不参与任何形式的投票</p>
<h1 id="使用案例" tabindex="-1"><a class="header-anchor" href="#使用案例" aria-hidden="true">#</a> 使用案例</h1>
<ul>
<li>服务注册与订阅（共用节点）</li>
<li>分布式通知（监听znode）</li>
<li>服务命名（znode特性）</li>
<li>数据订阅、发布（watcher）</li>
<li>分布式锁（临时节点）</li>
</ul>
<h2 id="分布式屏障-通知" tabindex="-1"><a class="header-anchor" href="#分布式屏障-通知" aria-hidden="true">#</a> 分布式屏障（通知）</h2>
<p>分布式系统使用<em>障碍</em>来阻止对一组节点的处理，直到满足一个条件，此时所有节点都被允许继续进行。在 ZooKeeper 中通过指定一个屏障节点来实现屏障。如果屏障节点存在，则屏障就位。这是伪代码：</p>
<ol>
<li>客户端在屏障节点上调用 ZooKeeper API 的<strong>exists()函数，并将</strong><em>watch</em>设置为 true。</li>
<li>如果**exists()**返回 false，则障碍消失，客户端继续</li>
<li>否则，如果**exists()**返回 true，则客户端等待 ZooKeeper 为屏障节点发送监视事件。</li>
<li>当 watch 事件被触发时，客户端重新发出**exists()**调用，再次等待直到屏障节点被移除。</li>
</ol>
<h2 id="分布式锁" tabindex="-1"><a class="header-anchor" href="#分布式锁" aria-hidden="true">#</a> 分布式锁</h2>
<p>全局同步的完全分布式锁，这意味着在任何时间快照中，没有两个客户端认为他们持有相同的锁。这些可以使用 ZooKeeper 来实现。与优先级队列一样，首先定义一个锁节点。</p>
<blockquote>
<p>ZooKeeper recipes 目录中现在存在一个 Lock 实现。这与发布工件的发布 - zookeeper-recipes/zookeeper-recipes-lock 目录一起分发。</p>
</blockquote>
<p>希望获得锁的客户端执行以下操作：</p>
<ol>
<li>使用路径名为“ <em>locknode</em> /guid-lock-”并设置<em>序列</em>和<em>临时</em>标志调用**create() 。**如果缺少 create() 结果，则需要该*guid 。*请参阅下面的注释。</li>
<li><em>在不</em>设置监视标志的情况下在锁定节点上调用<strong>getChildren()</strong>（这对于避免羊群效应很重要）。</li>
<li>如果在步骤<strong>1</strong>中创建的路径名具有最小的序列号后缀，则客户端具有锁定并且客户端退出协议。</li>
<li>客户端调用**exists( )**并在锁定目录中的路径上设置了监视标志，并具有下一个最低序列号。</li>
<li>如果<strong>exists( )<strong>返回null，则转到步骤</strong>2</strong>。否则，请等待上一步的路径名通知，然后再转到第<strong>2</strong>步。</li>
</ol>
<p>解锁协议非常简单：希望释放锁的客户端只需删除他们在步骤 1 中创建的节点。</p>
<p>这里有几点需要注意：</p>
<ul>
<li>删除一个节点只会导致一个客户端唤醒，因为每个节点都被一个客户端监视。通过这种方式，您可以避免羊群效应。</li>
<li>没有轮询或超时。</li>
<li>由于您实现锁定的方式，很容易看到锁定争用、中断锁定、调试锁定问题等的数量。</li>
</ul>
</div></template>


