<template><div><h2 id="一张图解释" tabindex="-1"><a class="header-anchor" href="#一张图解释" aria-hidden="true">#</a> 一张图解释</h2>
<figure><img src="@source/docs/bean-life.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>对于 Spring Bean 的生命周期来说：</p>
<ul>
<li>实例化 Instantiation</li>
<li>属性赋值 Populate</li>
<li>初始化 Initialization</li>
<li>销毁 Destruction</li>
</ul>
<h2 id="spring-bean-的生命周期的扩展点" tabindex="-1"><a class="header-anchor" href="#spring-bean-的生命周期的扩展点" aria-hidden="true">#</a> Spring Bean 的生命周期的扩展点</h2>
<p>Spring Bean 的生命周期的扩展点超级多，老周这里不可能全部列出来，只说核心的扩展点。这也就是为什么 Spring 的扩展性很好的原因，开了很多的口子，尽可能让某个功能高内聚松耦合，用户需要哪个功能就用哪个，而不是直接来一个大而全的东西。</p>
<p><strong>3.1 Bean 自身的方法</strong></p>
<p>比如构造函数、getter/setter 以及 init-method 和 destory-method 所指定的方法等，</p>
<p>也就对应着上文说的实例化 -&gt; 属性赋值 -&gt; 初始化 -&gt; 销毁四个阶段。</p>
<p><strong>3.2 容器级的方法（BeanPostProcessor 一系列接口）</strong></p>
<p>主要是后处理器方法，比如下图的 <code v-pre>InstantiationAwareBeanPostProcessor</code>、<code v-pre>BeanPostProcessor</code> 接口方法。这些接口的实现类是独立于 Bean 的，并且会注册到 Spring 容器中。在 Spring 容器创建任何 Bean 的时候，这些后处理器都会发生作用。</p>
<p>DEMO</p>
<figure><img src="@source/docs/Bean的生命周期demo.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>
<blockquote>
<p>1、Bean自身的方法：这个包括了Bean本身调用的方法和通过配置文件中<bean>的init-method和destory-method指定的方法。
2、Bean级生命周期接口方法：这个包括了BeanNameAware、BeanFactoryAware、InitializingBean和DisposableBean等接口方法。
3、容器级生命周期接口方法：这个包括了InstantiationAwareBeanPostProcessor和BeanPostProcessor这两个接口实现，一般称它们的实现类为”后处理器“。
4、工厂后置处理接口方法：BeanFactoryPostProcessor,BeanDefinitionRegistryPostProcessor,等等非常有用的工厂后处理器接口的方法。工厂后处理器也是容器级的。在应用上下文装配配置文件之后立即调用。</p>
</blockquote>
<h2 id="bean的后置处理器" tabindex="-1"><a class="header-anchor" href="#bean的后置处理器" aria-hidden="true">#</a> Bean的后置处理器</h2>
<blockquote>
<p>https://stackoverflow.com/questions/9862127/what-is-the-difference-between-beanpostprocessor-and-init-destroy-method-in-spri</p>
<p>https://www.cnblogs.com/duanxz/p/3750725.html</p>
</blockquote>
<h3 id="beanfactorypostprocessor、beanpostprocessor" tabindex="-1"><a class="header-anchor" href="#beanfactorypostprocessor、beanpostprocessor" aria-hidden="true">#</a> BeanFactoryPostProcessor、BeanPostProcessor</h3>
<p>在容器实际实例化任何其它的bean之前读取配置元数据，并有可能修改它。</p>
<p><strong>区别</strong>：BeanFactoryPostProcessor 仅仅对 bean definitions 发生关系，不能对bean instances 交互，对bean instances 的交互，由BeanPostProcessor的实现来处理。</p>
<p><strong>执行顺序</strong>：</p>
<p>BeanFactoryPostProcessor的回调比BeanPostProcessor要早。</p>
<h3 id="beanpostprocessor、initializingbean" tabindex="-1"><a class="header-anchor" href="#beanpostprocessor、initializingbean" aria-hidden="true">#</a> BeanPostProcessor、InitializingBean</h3>
<p><strong>区别</strong>：</p>
<p>BeanPostProcessor针对的多个bean的后置处理逻辑，而InitializingBean#afterPropertiesSet、@PostConstruct、@init-method都是针对单个bean的后置处理。</p>
<p><strong>执行顺序</strong>：</p>
<figure><img src="https://images2015.cnblogs.com/blog/285763/201702/285763-20170217204812410-1546305822.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如上图，指定的先后顺序如下：</p>
<ol>
<li>
<p>BeanPostProcessor#postProcessBeforeInitialization</p>
</li>
<li>
<ul>
<li>
<p>@PostConstruct</p>
</li>
<li>
<p>InitializingBean#afterPropertiesSet</p>
</li>
<li>
<p>init-method defined in XML</p>
</li>
</ul>
</li>
<li>
<p>BeanPostProcessor#postProcessAfterInitialization</p>
</li>
</ol>
<blockquote>
<p>参考
<a href="https://segmentfault.com/a/1190000040365130" target="_blank" rel="noopener noreferrer">一文读懂 Spring Bean 的生命周期<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


