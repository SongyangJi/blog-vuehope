<template><div><h2 id="三级缓存的设计" tabindex="-1"><a class="header-anchor" href="#三级缓存的设计" aria-hidden="true">#</a> 三级缓存的设计</h2>
<blockquote>
<p>这里指的是单例的、非构造依赖的循环引用。很多人都知道Spring用了三层缓存来解决循环依赖，但是不知道其原因，为什么是三级缓存？二级缓存不行吗？一级缓存不可以 ？</p>
</blockquote>
<p>Spring 解决循环依赖的核心就是提前暴露对象，而提前暴露的对象就是放置于第二级缓存中。缓存的底层都是Map，至于它们属于第几层是由Spring获取数据顺序以及其作用来表现的。</p>
<p>三级缓存的说明：</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>singletonObjects</code></td>
<td>一级缓存，存放完整的 Bean。</td>
</tr>
<tr>
<td><code v-pre>earlySingletonObjects</code></td>
<td>二级缓存，存放提前暴露的Bean，Bean 是不完整的，未完成属性注入和执行 初始化（init） 方法。</td>
</tr>
<tr>
<td><code v-pre>singletonFactories</code></td>
<td>三级缓存，存放的是 Bean 工厂，主要是生产 Bean，存放到二级缓存中。</td>
</tr>
</tbody>
</table>
<h3 id="第一级缓存singletonobjects" tabindex="-1"><a class="header-anchor" href="#第一级缓存singletonobjects" aria-hidden="true">#</a> 第一级缓存<code v-pre>singletonObjects</code></h3>
<p>1.先说一级缓存<code v-pre>singletonObjects</code>。实际上，一级依赖已经可以解决循环依赖的问题，假设两个beanA和beanB相互依赖，beanA被实例化后，放入一级缓存，即使没有进行初始化，但是beanA的引用已经创建（栈到堆的引用已经确定），其他依赖beanB已经可以持有beanA的引用，但是这个bean在没有初始化完成前，其内存（堆）里的字段、方法等还不能正常使用，but，这并不影响对象之间引用持有；这个时候beanA依赖的beanB实例化，beanB可以顺利拿到beanA的引用，完成beanB的实例化与初始化，并放入一级缓存，在beanB完成创建后，beanA通过缓存顺利拿到beanB的引用，至此，循环依赖只需一层缓存就能完成。</p>
<p>2.一级缓存的关键点在与：bean实例化与初始化的分离。从JVM的角度，实例化后，对象已经存在，其内的属性都是初始默认值，只有在初始化后才会赋值，以及持有其他对象的引用。通过这个特性，在实例化后，我们就可以将对象的引用放入缓存交给需要引用依赖的其他对象，这个过程就是提前暴露。</p>
<h3 id="第三级缓存singletonfactories" tabindex="-1"><a class="header-anchor" href="#第三级缓存singletonfactories" aria-hidden="true">#</a> 第三级缓存<code v-pre>singletonFactories</code></h3>
<p>1.上述我们通过一级缓存已经拿到的对象有什么问题？</p>
<p>根本问题就是，我们拿到的是bean的原始引用，如果我们需要的是bean的代理对象怎么办？Spring里充斥了大量的动态代理模式的架构，典型的AOP就是动态代理模式实现的，再比如我们经常使用的配置类注解<code v-pre>@Configuration</code>在缺省情况下（full mode），其内的所有@Bean都是处于动态代理模式，除非手动指定<code v-pre>proxyBeanMethods = false</code>将配置转成简略模式（lite mode）。</p>
<p>2.所以，Spring在bean实例化后，将原始bean放入第三级缓存singletonFactories中，第三级缓存里实际存入的是ObjectFactory接口签名的回调实现。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code># 函数签名
<span class="token function">addSingletonFactory</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">ObjectFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> singletonFactory<span class="token punctuation">)</span>
    
# 具体实现由回调决定    
<span class="token function">addSingletonFactory</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> bean<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么如果有动态代理的需求，里面可以埋点进行处理，将原始bean包装后返回。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Object</span> exposedObject <span class="token operator">=</span> bean<span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mbd<span class="token punctuation">.</span><span class="token function">isSynthetic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasInstantiationAwareBeanPostProcessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">BeanPostProcessor</span> bp <span class="token operator">:</span> <span class="token function">getBeanPostProcessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>bp <span class="token keyword">instanceof</span> <span class="token class-name">SmartInstantiationAwareBeanPostProcessor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token class-name">SmartInstantiationAwareBeanPostProcessor</span> ibp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SmartInstantiationAwareBeanPostProcessor</span><span class="token punctuation">)</span> bp<span class="token punctuation">;</span>
					exposedObject <span class="token operator">=</span> ibp<span class="token punctuation">.</span><span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span>exposedObject<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> exposedObject<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.通过第三级缓存我们可以拿到可能经过包装的对象，解决对象代理封装的问题。</p>
<h3 id="第二级缓存earlysingletonobjects" tabindex="-1"><a class="header-anchor" href="#第二级缓存earlysingletonobjects" aria-hidden="true">#</a> 第二级缓存<code v-pre>earlySingletonObjects</code></h3>
<p>1.为什么需要<code v-pre>earlySingletonObjects</code>这个二级缓存？并且，如果只有一个缓存的情况下，为什么不直接使用<code v-pre>singletonFactories</code>这个缓存，即可实现代理又可以缓存数据。</p>
<p>2.从软件设计角度考虑，三个缓存代表三种不同的职责，根据单一职责原理，从设计角度就需分离三种职责的缓存，所以形成三级缓存的状态。</p>
<h2 id="三级缓存的划分及其作用。" tabindex="-1"><a class="header-anchor" href="#三级缓存的划分及其作用。" aria-hidden="true">#</a> 三级缓存的划分及其作用。</h2>
<ol>
<li>
<p>一级缓存<code v-pre>singletonObjects</code>是完整的bean，它可以被外界任意使用，并且不会有歧义。</p>
</li>
<li>
<p>二级缓存<code v-pre>earlySingletonObjects</code>是不完整的bean，没有完成初始化，它与<code v-pre>singletonObjects</code>的分离主要是职责的分离以及边界划分，可以试想一个Map缓存里既有完整可使用的bean，也有不完整的，只能持有引用的bean，在复杂度很高的架构中，很容易出现歧义，并带来一些不可预知的错误。</p>
</li>
<li>
<p>三级缓存<code v-pre>singletonFactories</code>，其职责就是包装一个bean，有回调逻辑，所以它的作用非常清晰，并且只能处于第三层。</p>
</li>
</ol>
<p>在实际使用中，<strong>要获取一个bean，先从一级缓存一直查找到三级缓存，缓存bean的时候是从三级到一级的顺序保存。</strong></p>
<p>并且缓存bean的过程中，<strong>三个缓存都是互斥的</strong>，只会保持bean在一个缓存中，而且，<strong>最终都会在一级缓存中</strong>。</p>
<h3 id="需要自行解决的循环依赖" tabindex="-1"><a class="header-anchor" href="#需要自行解决的循环依赖" aria-hidden="true">#</a> 需要自行解决的循环依赖</h3>
<ul>
<li>多例循环依赖（不是单例模式）</li>
<li>构造器循环依赖</li>
<li>@DependsOn产生的循环依赖（@DependsOn注解可以定义在类和方法上，意思是我这个组件要依赖于另一个组件，也就是说被依赖的组件会比该组件先注册到IOC容器中。）</li>
<li>@Async的循环依赖（https://blog.csdn.net/weixin_43944305/article/details/120499084、https://zhuanlan.zhihu.com/p/482514840）</li>
</ul>
<blockquote>
<p><a href="https://www.cnblogs.com/asker009/p/14376955.html" target="_blank" rel="noopener noreferrer">Spring Bean 循环依赖为什么需要三级缓存<ExternalLinkIcon/></a></p>
<p>https://juejin.cn/post/6985337310472568839</p>
<p>https://segmentfault.com/a/1190000039091691</p>
<p>https://blog.csdn.net/weixin_38738238/article/details/123218697</p>
<p>https://juejin.cn/post/7046316452801937416</p>
</blockquote>
</div></template>


