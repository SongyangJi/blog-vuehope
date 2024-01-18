<template><div><blockquote>
<blockquote>
<p>这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。</p>
</blockquote>
</blockquote>
<h1 id="_1-spring-ioc容器和bean简介" tabindex="-1"><a class="header-anchor" href="#_1-spring-ioc容器和bean简介" aria-hidden="true">#</a> 1 Spring IoC容器和Bean简介</h1>
<h2 id="_1-5-bean的作用域" tabindex="-1"><a class="header-anchor" href="#_1-5-bean的作用域" aria-hidden="true">#</a> 1.5 Bean的作用域</h2>
<h3 id="_1-5-1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-5-1-介绍" aria-hidden="true">#</a> 1.5.1 介绍</h3>
<p>Spring框架支持六个作用域，但是后面四个只在web环境下才支持。
重点讲<strong>单例</strong>和<strong>原型</strong>。</p>
<ul>
<li>singleton
单例。IOC容器中只有一个实例。</li>
<li>prototype
原型。在每次请求该特定Bean时创建一个新的Bean实例。</li>
<li>request</li>
<li>session</li>
<li>application</li>
<li>websocket</li>
</ul>
<p>XML配置Bean举例。
<strong>单例</strong></p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accountService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.something.DefaultAccountService<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

<span class="token comment">&lt;!-- the following is equivalent, though redundant (singleton scope is the default) --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accountService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.something.DefaultAccountService<span class="token punctuation">"</span></span> <span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>singleton<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原型</strong></p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accountService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.something.DefaultAccountService<span class="token punctuation">"</span></span> <span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>prototype<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-5-2-单例与原型的区别" tabindex="-1"><a class="header-anchor" href="#_1-5-2-单例与原型的区别" aria-hidden="true">#</a> 1.5.2 单例与原型的区别</h3>
<p>原型作用域用于有状态的Bean。
将单例作用域用于无状态的Bean。</p>
<p>单例Bean好处是无需维护会话状态，可重复复用，开销低。
原型作用域用于有状态的Bean，某种程度上可以当成是 new 的替代。</p>
<p>关于原型bean的生命周期管理</p>
<blockquote>
<p>与其他作用域相比，<strong>Spring不能管理原型Bean的完整生命周期</strong>。容器将实例化，配置或组装原型对象，然后将其交给客户端，而无需对该原型实例的进一步记录。因此，尽管在不考虑范围的情况下在所有对象上都调用了初始化生命周期回调方法，但<strong>在原型的情况下，不会调用已配置的销毁生命周期回调</strong>。客户端代码必须清除原型作用域内的对象并释放原型Bean拥有的昂贵资源。为了使Spring容器释放原型作用下的bean所拥有的资源，请尝试使用 bean post-processor ，其中包含对需要清理的bean的引用。</p>
</blockquote>
<h3 id="_1-5-3-单例与原型的四种依赖关系" tabindex="-1"><a class="header-anchor" href="#_1-5-3-单例与原型的四种依赖关系" aria-hidden="true">#</a> 1.5.3 单例与原型的四种依赖关系</h3>
<ol>
<li>
<p>单例依赖单例
这也是默认的依赖关系。没什么好说的。</p>
</li>
<li>
<p>原型依赖原型</p>
</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyPrototype</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">AnotherPrototype</span> anotherPrototype<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">MySingleton</span> mySingleton<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnotherPrototype</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上面，这样做也没有什么问题。两个bean每次拿都是<strong>全新的</strong>。</p>
<ol start="3">
<li>
<p>原型依赖单例
由于单例，所以原型bean里的单例bean仍然是惟一的。</p>
</li>
<li>
<p>单例依赖原型</p>
</li>
</ol>
<p>如果希望单例作用域的bean在运行时重复获取原型作用域的bean的新实例，不能将原型作用域的bean依赖项注入到您的单例bean中，因为当Spring容器实例化单例bean并解析并注入其依赖项时，<strong>该注入仅发生一次</strong>。如果在运行时不止一次需要原型bean的新实例，请参见<strong>方法注入</strong>。</p>
<p><a href="https://song-yang-ji.blog.csdn.net/article/details/109661012" target="_blank" rel="noopener noreferrer">文章末尾就是方法注入的使用<ExternalLinkIcon/></a></p>
<h3 id="_1-5-4-使用自定义范围" tabindex="-1"><a class="header-anchor" href="#_1-5-4-使用自定义范围" aria-hidden="true">#</a> 1.5.4. 使用自定义范围</h3>
<p>暂略。。。</p>
<h2 id="_1-6-自定义bean的性质" tabindex="-1"><a class="header-anchor" href="#_1-6-自定义bean的性质" aria-hidden="true">#</a> 1.6 自定义Bean的性质</h2>
<p>Spring框架提供了许多接口，您可以使用这些接口来自定义Bean的性质。本节将它们分为以下几类：</p>
<ol>
<li>
<p>生命周期回调</p>
</li>
<li>
<p>ApplicationContextAware 和 BeanNameAware</p>
</li>
<li>
<p>其他 Aware接口</p>
</li>
</ol>
<h3 id="_1-6-1-生命周期回调" tabindex="-1"><a class="header-anchor" href="#_1-6-1-生命周期回调" aria-hidden="true">#</a> 1.6.1 生命周期回调</h3>
<p>从Spring 2.5开始，您可以至少使用三个方法来控制Bean生命周期行为。</p>
<ol>
<li>
<p>实现<code v-pre>InitializingBean</code>和<code v-pre>DisposableBean</code>回调接口</p>
</li>
<li>
<p>xml里使用<code v-pre>init-method</code>和<code v-pre>destroy-methodbean</code>定义元数据, 指定回调方法</p>
</li>
<li>
<p>使用<code v-pre>@PostConstruct</code>和<code v-pre>@PreDestroy</code>注解</p>
</li>
</ol>
<p>第一种方法，虽然也能达成目的，但是将代码强耦合到Spring，并不被推荐。</p>
<p>第二种方法，使用Spring的xml配置bean的方式完成。</p>
<p>第三种方法，在全注解开发Spring项目的现在，无疑是最佳选择（官方也是这么说的）。</p>
<p><strong>初始化后回调</strong>和<strong>销毁之前回调</strong>的处理是差不多，这里仅仅以初始化回调为例，另一个是一样的。</p>
<h4 id="_1-6-1-1-初始化回调" tabindex="-1"><a class="header-anchor" href="#_1-6-1-1-初始化回调" aria-hidden="true">#</a> 1.6.1.1 初始化回调</h4>
<ul>
<li>实现 <code v-pre>InitializingBean</code>接口</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>exampleInitBean<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>examples.AnotherExampleBean<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnotherExampleBean</span> <span class="token keyword">implements</span> <span class="token class-name">InitializingBean</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// do some initialization work</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用 bean 的 <code v-pre>init-method</code>属性</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>exampleInitBean<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>examples.ExampleBean<span class="token punctuation">"</span></span> <span class="token attr-name">init-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>init<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExampleBean</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// do some initialization work</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用 @PostConstruct 注解
值得一提的是，这个注解并不是Spring里的，而是javax里的。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExampleBean</span> <span class="token punctuation">{</span>
	<span class="token annotation punctuation">@PostConstruct</span> 
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// do some initialization work</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-6-1-2-销毁回调" tabindex="-1"><a class="header-anchor" href="#_1-6-1-2-销毁回调" aria-hidden="true">#</a> 1.6.1.2 销毁回调</h4>
<p>与上面几乎一样，略。</p>
<h4 id="_1-6-1-3-默认初始化和销毁​​方法" tabindex="-1"><a class="header-anchor" href="#_1-6-1-3-默认初始化和销毁​​方法" aria-hidden="true">#</a> 1.6.1.3 默认初始化和销毁​​方法</h4>
<p>当你需要为很多个，甚至所有的bean去设置初始化或销毁方法的时候，你可以直接为他们设置一个默认的公共的回调方法。</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">default-init-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>init<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blogService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.something.DefaultBlogService<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.something.DefaultUserService<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 可以覆盖掉默认的 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>authorService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.something.DefaultAuthorService<span class="token punctuation">"</span></span>  <span class="token attr-name">init-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initMethod<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>&lt;beans&gt;</code>的default-init-method 为一系列bean设置回调方法。</p>
<p>你还可以覆盖掉默认的。</p>
<h4 id="_1-6-1-4-配置多个回调方法的调用顺序" tabindex="-1"><a class="header-anchor" href="#_1-6-1-4-配置多个回调方法的调用顺序" aria-hidden="true">#</a> 1.6.1.4 配置多个回调方法的调用顺序</h4>
<ul>
<li>为同一个bean配置的具有不同初始化方法的调用顺序。</li>
</ul>
<ol>
<li>
<p>用注解的方法 @PostConstruct</p>
</li>
<li>
<p>由InitializingBean回调接口定义的afterPropertiesSet()</p>
</li>
<li>
<p>定制配置的init()方法</p>
</li>
</ol>
<p>销毁方法的调用顺序相同：</p>
<ol>
<li>
<p>用注释的方法 @PreDestroy</p>
</li>
<li>
<p>由DisposableBean回调接口定义的destroy()</p>
</li>
<li>
<p>定制配置的destroy()方法</p>
</li>
</ol>
<h4 id="_1-6-1-5-lifecycle接口" tabindex="-1"><a class="header-anchor" href="#_1-6-1-5-lifecycle接口" aria-hidden="true">#</a> 1.6.1.5 Lifecycle接口</h4>
<p>暂略。</p>
<h3 id="_1-6-2-applicationcontextaware-接口" tabindex="-1"><a class="header-anchor" href="#_1-6-2-applicationcontextaware-接口" aria-hidden="true">#</a> 1.6.2 ApplicationContextAware 接口</h3>
<p>以前，我们都是用 <code v-pre>ApplicationContext</code>去获取Bean（按类型、按bean的名字也罢）。
但是bean怎么拿到上下文，进而拿到其他的bean呢？
这个接口的出现终于解释了这个问题。</p>
<p>当 <code v-pre>ApplicationContext</code> 创建一个实现<code v-pre>ApplicationContextAware</code>接口的对象实例时，该实例将获得对<code v-pre>ApplicationContext</code>上下文的引用。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeanImplApplicationContextAware</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationContextAware</span> <span class="token punctuation">{</span>

    <span class="token class-name">ApplicationContext</span> context<span class="token punctuation">;</span>

    <span class="token comment">// 这个方法会由 Spring 自动调用，并传入上下文，</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        context <span class="token operator">=</span> applicationContext<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">showBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ExampleBean</span> exampleBean <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"exampleBean"</span><span class="token punctuation">,</span><span class="token class-name">ExampleBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"在BeanImplApplicationContextAware里获得了"</span><span class="token operator">+</span>exampleBean<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Boot</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConfigurableApplicationContext</span> applicationContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token string">"life_cycle"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">BeanImplApplicationContextAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">showBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6-3-其他-aware-接口" tabindex="-1"><a class="header-anchor" href="#_1-6-3-其他-aware-接口" aria-hidden="true">#</a> 1.6.3 其他 Aware 接口</h3>
<p><a href="https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-aware" target="_blank" rel="noopener noreferrer">官方文档的1.6.3<ExternalLinkIcon/></a></p>
<p><strong>必须要指明的一点的是，使用这些接口会将你的代码与Spring API绑定在一起，并且不遵循“控制反转”风格</strong>。</p>
<p>因此，只有在你确实需要编写一些基础bean，而他们确实需要访问 <strong>上下文容器时</strong>，才推荐使用这些接口。（总之，一般不用就拿ApplicationContextAware接口为例，我们完全可以使用自动装配AutoWire来代替它。）</p>
<blockquote>
<p>参考资料</p>
<p><a href="https://docs.spring.io/spring-framework/docs/current-SNAPSHOT/reference/html/core.html#spring-core" target="_blank" rel="noopener noreferrer">Spring官方文档<ExternalLinkIcon/></a></p>
<p><a href="https://docs.spring.io/spring-framework/docs/" target="_blank" rel="noopener noreferrer">doc index<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


