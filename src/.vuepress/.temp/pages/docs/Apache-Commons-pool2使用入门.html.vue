<template><div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<h2 id="项目介绍" tabindex="-1"><a class="header-anchor" href="#项目介绍" aria-hidden="true">#</a> 项目介绍</h2>
<blockquote>
<p>创建新的对象并初始化的操作，可能会消耗很多的时间。在这种对象的初始化工作包含了一些费时的操作（例如，从一台位于20,000千米以外的主机上读出一些数据）的时候，尤其是这样。在需要大量生成这样的对象的时候，就可能会对性能造成一些不可忽略的影响。要缓解这个问题，除了选用更好的硬件和更棒的虚拟机以外，适当地采用一些能够减少对象创建次数的编码技巧，也是一种有效的对策。对象池化技术（Object Pooling）就是这方面的著名技巧，而Jakarta Commons Pool组件则是处理对象池化的得力外援。</p>
</blockquote>
<p>Commons Pool组件提供了一整套用于实现对象池化的框架，以及若干种各具特色的对象池实现，可以有效地减少处理对象池化时的工作量，为其它重要的工作留下更多的精力和时间</p>
<p>Apache Common-pool2完全重写了的对象池的实现，显著的提升了性能和可伸缩性，特别是在高并发加载的情况下。2.0 版本包含可靠的实例跟踪和池监控。</p>
<h3 id="maven-依赖" tabindex="-1"><a class="header-anchor" href="#maven-依赖" aria-hidden="true">#</a> Maven 依赖</h3>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>commons-pool2.version</span><span class="token punctuation">></span></span>2.11.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>commons-pool2.version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${commons-pool2.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接口设计" tabindex="-1"><a class="header-anchor" href="#接口设计" aria-hidden="true">#</a> 接口设计</h2>
<p><code v-pre>Apache Commons Pool</code>实现了<strong>对象池</strong>的功能。定义了对象的生成、销毁、激活、钝化等操作及其状态转换，并提供几个默认的对象池实现。
在讲述其实现原理前，先提一下其中有几个重要的对象：</p>
<ul>
<li>
<p>Object Pool（对象池）。</p>
</li>
<li>
<p>PooledObject（池对象）。</p>
</li>
<li>
<p>PooledObjectFactory（池对象工厂）。</p>
</li>
</ul>
<p>三种之间的关系图：</p>
<figure><img src="@source/docs/concepts-1.jpg" alt="关系图" tabindex="0" loading="lazy"><figcaption>关系图</figcaption></figure>
<p>下面分别详细讲解它们的实现。</p>
<p>（以下三个均为接口，位于 org.apache.commons.pool2）</p>
<h3 id="objectpool" tabindex="-1"><a class="header-anchor" href="#objectpool" aria-hidden="true">#</a> ObjectPool</h3>
<p>Object Pool负责管理PooledObject，如：借出对象，返回对象，校验对象，有多少激活对象，有多少空闲对象。</p>
<p>以下为类图结构，有几个默认的实现类可以直接使用。</p>
<ul>
<li>
<p>GenericObjectPool。</p>
</li>
<li>
<p>ProsiedObjectPool。</p>
</li>
<li>
<p>SoftReferenceObjectPool。</p>
</li>
</ul>
<figure><img src="@source/docs/object-pool.png" alt="Object Pool （对象池）" tabindex="0" loading="lazy"><figcaption>Object Pool （对象池）</figcaption></figure>
<table>
<thead>
<tr>
<th style="text-align:left">方法</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">borrowObject</td>
<td style="text-align:left">从池中借出一个对象。要么调用PooledObjectFactory.makeObject方法创建，要么对一个空闲对象使用PooledObjectFactory.activeObject进行激活，然后使用PooledObjectFactory.validateObject方法进行验证后再返回</td>
</tr>
<tr>
<td style="text-align:left">returnObject</td>
<td style="text-align:left">将一个对象返还给池。根据约定：对象必须 是使用borrowObject方法从池中借出的</td>
</tr>
<tr>
<td style="text-align:left">invalidateObject</td>
<td style="text-align:left">废弃一个对象。根据约定：对象必须 是使用borrowObject方法从池中借出的。通常在对象发生了异常或其他问题时使用此方法废弃它</td>
</tr>
<tr>
<td style="text-align:left">addObject</td>
<td style="text-align:left">使用工厂创建一个对象，<strong>钝化</strong>并且将它放入空闲对象池</td>
</tr>
<tr>
<td style="text-align:left">getNumberIdle</td>
<td style="text-align:left">返回池中空闲的对象数量。有可能是池中可供借出对象的近似值。如果这个信息无效，返回一个负数</td>
</tr>
<tr>
<td style="text-align:left">getNumActive</td>
<td style="text-align:left">返回从借出的对象数量。如果这个信息不可用，返回一个负数</td>
</tr>
<tr>
<td style="text-align:left">clear</td>
<td style="text-align:left">清除池中的所有空闲对象，释放其关联的资源（可选）。清除空闲对象必须使用PooledObjectFactory.destroyObject方法，池可用。</td>
</tr>
<tr>
<td style="text-align:left">close</td>
<td style="text-align:left">关闭池并释放关联的资源，池不可用。</td>
</tr>
</tbody>
</table>
<h3 id="pooledobject" tabindex="-1"><a class="header-anchor" href="#pooledobject" aria-hidden="true">#</a> PooledObject</h3>
<p>用于封装对象（如：线程、数据库连接、TCP连接），将其包裹成可被池管理的对象。</p>
<p>此类的实现必须是线程安全的。</p>
<p>提供了两个默认的池对象实现：</p>
<ul>
<li>DefaultPoolObject。用于非软引用的普通对象。</li>
<li>PooledSoftReference。用于软引用的对象。</li>
</ul>
<p>在开发连接池、线程池等组件时，需要根据实际情况重载5个方法：startEvictionTest、endEvictionTest、allocate、deallocate和invalidate，用于在不同的场景下修改被包裹对象的内部状态。</p>
<p>此接口的重要的方法：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 获得目标对象</span>
<span class="token class-name">T</span> <span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取PooledObject的状态</span>
<span class="token class-name">PooledObjectState</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">boolean</span> <span class="token function">startEvictionTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">boolean</span> <span class="token function">endEvictionTest</span><span class="token punctuation">(</span><span class="token class-name">Deque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PooledObject</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span></span> idleQueue<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 分配对象。 如果原始状态为 IDLE, 则返回 true</span>
<span class="token keyword">boolean</span> <span class="token function">allocate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 


<span class="token comment">// 如果当前已ALLOCATED ，则取消分配对象并将其设置为IDLE 。</span>
<span class="token comment">// 如果状态为ALLOCATED则为true 。</span>
<span class="token keyword">boolean</span> <span class="token function">deallocate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token class-name">PooledObjectState</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">markAbandoned</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">markReturning</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/*
... 省略其他方法
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PooledObject有多种状态，在不同的环节或经过处理后状态会发生变化。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>pool2</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">PooledObjectState</span> <span class="token punctuation">{</span>
    <span class="token constant">IDLE</span><span class="token punctuation">,</span> <span class="token comment">// 	位于队列中，未使用</span>
  
    <span class="token constant">ALLOCATED</span><span class="token punctuation">,</span> <span class="token comment">// 已被分配，正在使用</span>
  
    <span class="token constant">EVICTION</span><span class="token punctuation">,</span>  <span class="token comment">// 位于队列中，当前正在测试，可能会被回收到队列</span>
  
    <span class="token constant">EVICTION_RETURN_TO_HEAD</span><span class="token punctuation">,</span> <span class="token comment">// 不在队列中，目前正在测试是否可能被驱逐。 </span>
  
    <span class="token constant">VALIDATION</span><span class="token punctuation">,</span> <span class="token comment">// 位于队列中，当前正在验证</span>
  
    <span class="token constant">VALIDATION_PREALLOCATED</span><span class="token punctuation">,</span> <span class="token comment">// 不在队列中，当前正在验证。当对象从池中被借出，在配置了testOnBorrow的情况下，对象从队列移除和进行预分配的时候会进行验证</span>
  
    <span class="token constant">VALIDATION_RETURN_TO_HEAD</span><span class="token punctuation">,</span> <span class="token comment">// 不在队列中，正在进行验证。从池中借出对象时，从队列移除对象时会先进行测试。返回到队列头部的时候应该做一次完整的验证</span>
  
    <span class="token constant">INVALID</span><span class="token punctuation">,</span> <span class="token comment">// 	回收或验证失败，【即将/已经】 销毁</span>
  
    <span class="token constant">ABANDONED</span><span class="token punctuation">,</span> <span class="token comment">// 视为放弃，无效</span>
  
    <span class="token constant">RETURNING</span> <span class="token comment">// 返还到池中</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>状态转换如下图：</p>
<figure><img src="@source/docs/PooledObjectState.png" alt="PooledObjectState" tabindex="0" loading="lazy"><figcaption>PooledObjectState</figcaption></figure>
<h3 id="pooledobjectfactory" tabindex="-1"><a class="header-anchor" href="#pooledobjectfactory" aria-hidden="true">#</a> PooledObjectFactory</h3>
<p>一个定义生命周期方法的接口，用于由ObjectPool提供服务的实例。</p>
<p>PooledObjectFactory必须实现线程安全。</p>
<p>Commons pool2 定义了抽象工厂<code v-pre>BasePooledObjectFactory</code>，使用者应该继承这个抽象类实现自己的池化工厂。</p>
<table>
<thead>
<tr>
<th style="text-align:left">方法</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">makeObject</td>
<td style="text-align:left">每当需要新实例时都会调用makeObject 。</td>
</tr>
<tr>
<td style="text-align:left">activateObject</td>
<td style="text-align:left">每一个钝化（passivated）的ObjectPool实例从池中借出（borrowed）前调用。</td>
</tr>
<tr>
<td style="text-align:left">validateObject</td>
<td style="text-align:left">可能用于从池中借出对象时，对处于激活（activated）状态的ObjectPool实例进行测试确保它是有效的。也有可能在ObjectPool实例返还池中进行钝化前调用进行测试是否有效。它只对处于激活状态的实例调用。</td>
</tr>
<tr>
<td style="text-align:left">passivateObject</td>
<td style="text-align:left">当实例返还池中的时候调用。</td>
</tr>
<tr>
<td style="text-align:left">destroyObject</td>
<td style="text-align:left">当实例从池中被清理出去丢弃的时候调用。</td>
</tr>
</tbody>
</table>
<h2 id="常用的实现类" tabindex="-1"><a class="header-anchor" href="#常用的实现类" aria-hidden="true">#</a> 常用的实现类</h2>
<h3 id="genericobjectpool" tabindex="-1"><a class="header-anchor" href="#genericobjectpool" aria-hidden="true">#</a> GenericObjectPool</h3>
<h3 id="borrowobject" tabindex="-1"><a class="header-anchor" href="#borrowobject" aria-hidden="true">#</a> <code v-pre>borrowObject</code></h3>
<p>下面是GenericObjectPool中borrowObject方法的逻辑实现，有阻塞式和非阻塞式两种获取对象的模式。
默认情况下是阻塞的（你可以传入配置类更改这一行为）。</p>
<figure><img src="@source/docs/borrow.png" alt="borrow" tabindex="0" loading="lazy"><figcaption>borrow</figcaption></figure>
<h3 id="returnobject" tabindex="-1"><a class="header-anchor" href="#returnobject" aria-hidden="true">#</a> <code v-pre>returnObject</code></h3>
<p>下面是GenericObjectPool中returnObject方法的逻辑实现，在这里实现的FIFO（先进先出）和LIFO（后进先出）。</p>
<figure><img src="@source/docs/return-object.png" alt="return-object.png" tabindex="0" loading="lazy"><figcaption>return-object.png</figcaption></figure>
<h3 id="defaultpooledobject" tabindex="-1"><a class="header-anchor" href="#defaultpooledobject" aria-hidden="true">#</a> DefaultPooledObject</h3>
<h2 id="使用介绍" tabindex="-1"><a class="header-anchor" href="#使用介绍" aria-hidden="true">#</a> 使用介绍</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  
   <span class="token keyword">try</span> <span class="token punctuation">{</span>
       obj <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">borrowObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">try</span> <span class="token punctuation">{</span>
           <span class="token comment">//...use the object...</span>
       <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token comment">// invalidate the object</span>
           pool<span class="token punctuation">.</span><span class="token function">invalidateObject</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token comment">// do not return the object to the pool twice</span>
           obj <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
           <span class="token comment">// make sure the object is returned to the pool</span>
           <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
               pool<span class="token punctuation">.</span><span class="token function">returnObject</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// failed to borrow an object</span>
   <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>
<p><a href="http://commons.apache.org/proper/commons-pool/" target="_blank" rel="noopener noreferrer">Apache Commons Pool<ExternalLinkIcon/></a></p>
<p><a href="http://aofengblog.com/2014/08/06/Apache-Commons-Pool2-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/" target="_blank" rel="noopener noreferrer">Apache Commons Pool2 源码分析<ExternalLinkIcon/></a></p>
<p>注：插图来源于<a href="http://aofengblog.com/2014/08/06/Apache-Commons-Pool2-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/" target="_blank" rel="noopener noreferrer">http://aofengblog.com/<ExternalLinkIcon/></a></p>
</div></template>


