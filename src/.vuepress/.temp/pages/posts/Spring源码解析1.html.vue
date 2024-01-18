<template><div><blockquote>
<p>为了减少篇幅，以及尽可能介绍核心，在贴出代码的时候只节选部分。完整代码请参阅官方文档。</p>
</blockquote>
<h1 id="顶层设计" tabindex="-1"><a class="header-anchor" href="#顶层设计" aria-hidden="true">#</a> 顶层设计</h1>
<ol>
<li>如何表示对象与对象之间的关系</li>
<li>描述对象的文件存放在哪里</li>
<li>如何统一一个关于对象的定义</li>
<li>如何对不同的配置文件进行解析</li>
</ol>
<p>IOC的实现方式：</p>
<p>依赖注入（DI）、依赖查找（不再使用）</p>
<h1 id="源码类图" tabindex="-1"><a class="header-anchor" href="#源码类图" aria-hidden="true">#</a> 源码类图</h1>
<h2 id="beanfactory-存放bean的容器" tabindex="-1"><a class="header-anchor" href="#beanfactory-存放bean的容器" aria-hidden="true">#</a> BeanFactory（存放Bean的容器）</h2>
<blockquote>
<p><strong>访问 Spring bean 容器的根接口</strong>。
该接口的实现类包含一个bean的注册表，每个bean定义由一个字符串名称唯一标识。 根
据 bean 定义，工厂将返回包含对象的独立实例（原型设计模式），或单个共享实例（单例设计模式的高级替代方案，其中实例是范围内的单例）工厂）。 返回哪种类型的实例取决于 bean factory 配置：API 是相同的。
这种方法的重点是 BeanFactory 是应用程序组件的中央注册表，并且集中了应用程序组件的配置（例如，单个对象不再需要读取属性文件）。
<strong>Spring 的依赖注入功能是使用这个 BeanFactory 接口及其子接口实现的</strong>。
通常 BeanFactory 将加载存储在配置源（例如 XML ）中的 bean 定义，并使用org.springframework.beans包来配置 bean。 但是，实现可以简单地直接在 Java 代码中返回它根据需要创建的 Java 对象。 定义的存储方式没有限制：LDAP、RDBMS、XML、属性文件等。</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BeanFactory</span> <span class="token punctuation">{</span>
   <span class="token comment">// 根据 bean 名称获取 bean</span>
   <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
   <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> requiredType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
   <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> requiredType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
   <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> requiredType<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
   <span class="token comment">// 判断bean是否存在</span>
   <span class="token keyword">boolean</span> <span class="token function">containsBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">// bean的作用域</span>
   <span class="token keyword">boolean</span> <span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>
   <span class="token keyword">boolean</span> <span class="token function">isPrototype</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>源码类图</p>
<figure><img src="@source/posts/BeanFactory.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>ListableBeanFactory</li>
</ul>
<p>将所有bean列表化提供。（换言之，可以一下子获取所有bean）。</p>
<ul>
<li>HierarchicalBeanFactory</li>
</ul>
<p>描述有继承关系的bean。</p>
<ul>
<li>AutowireCapableBeanFactory</li>
</ul>
<p>定义bean的自动装配规则。这个类比较重要，看看它的源码。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AutowireCapableBeanFactory</span> <span class="token keyword">extends</span> <span class="token class-name">BeanFactory</span> <span class="token punctuation">{</span>
   <span class="token comment">// 自动配置的方式</span>
   <span class="token keyword">int</span> <span class="token constant">AUTOWIRE_NO</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
   <span class="token keyword">int</span> <span class="token constant">AUTOWIRE_BY_NAME</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token keyword">int</span> <span class="token constant">AUTOWIRE_BY_TYPE</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
   <span class="token keyword">int</span> <span class="token constant">AUTOWIRE_CONSTRUCTOR</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
   <span class="token annotation punctuation">@Deprecated</span>
   <span class="token keyword">int</span> <span class="token constant">AUTOWIRE_AUTODETECT</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>

   <span class="token comment">// 创建一个新的bean  </span>
   <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">createBean</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> beanClass<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
 
   <span class="token comment">// 自动装配benan</span>
   <span class="token keyword">void</span> <span class="token function">autowireBean</span><span class="token punctuation">(</span><span class="token class-name">Object</span> existingBean<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
   <span class="token class-name">Object</span> <span class="token function">configureBean</span><span class="token punctuation">(</span><span class="token class-name">Object</span> existingBean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
   <span class="token class-name">Object</span> <span class="token function">initializeBean</span><span class="token punctuation">(</span><span class="token class-name">Object</span> existingBean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
  
   <span class="token comment">// ....</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="beandefinition-bean的统一定义" tabindex="-1"><a class="header-anchor" href="#beandefinition-bean的统一定义" aria-hidden="true">#</a> BeanDefinition（Bean的统一定义）</h2>
<ul>
<li>AttributeAccessor</li>
</ul>
<p>基于反射的方式，对一个bean根据属性名，对属性值的CRUD操作</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AttributeAccessor</span> <span class="token punctuation">{</span>

   <span class="token keyword">void</span> <span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token annotation punctuation">@Nullable</span>
   <span class="token class-name">Object</span> <span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>


   <span class="token annotation punctuation">@Nullable</span>
   <span class="token class-name">Object</span> <span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>


   <span class="token keyword">boolean</span> <span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">attributeNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BeanDefinition 描述了一个 bean 实例，而那个bean具有属性值、构造函数参数值以及由具体实现提供的更多信息。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BeanDefinition</span> <span class="token keyword">extends</span> <span class="token class-name">AttributeAccessor</span><span class="token punctuation">,</span> <span class="token class-name">BeanMetadataElement</span> <span class="token punctuation">{</span>
  
   <span class="token comment">// 作用域</span>
   <span class="token class-name">String</span> <span class="token constant">SCOPE_SINGLETON</span> <span class="token operator">=</span> <span class="token class-name">ConfigurableBeanFactory</span><span class="token punctuation">.</span><span class="token constant">SCOPE_SINGLETON</span><span class="token punctuation">;</span>
   <span class="token class-name">String</span> <span class="token constant">SCOPE_PROTOTYPE</span> <span class="token operator">=</span> <span class="token class-name">ConfigurableBeanFactory</span><span class="token punctuation">.</span><span class="token constant">SCOPE_PROTOTYPE</span><span class="token punctuation">;</span>
   

   <span class="token comment">// get/set bean的类名</span>
   <span class="token keyword">void</span> <span class="token function">setBeanClassName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> beanClassName<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token annotation punctuation">@Nullable</span>
   <span class="token class-name">String</span> <span class="token function">getBeanClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">// @Scope("singleton") / @Scope("prototype") 可以指定</span>
   <span class="token keyword">void</span> <span class="token function">setScope</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> scope<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token annotation punctuation">@Nullable</span>
   <span class="token class-name">String</span> <span class="token function">getScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  
   <span class="token comment">// @Lazy 指定是否延迟初始化</span>
   <span class="token keyword">void</span> <span class="token function">setLazyInit</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> lazyInit<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">boolean</span> <span class="token function">isLazyInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  

   <span class="token comment">//  bean 所依赖的 bean 名称</span>
   <span class="token keyword">void</span> <span class="token function">setDependsOn</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> dependsOn<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token annotation punctuation">@Nullable</span>
   <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getDependsOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
   <span class="token comment">// @Primary 指定</span>
   <span class="token keyword">void</span> <span class="token function">setPrimary</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> primary<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">boolean</span> <span class="token function">isPrimary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


   <span class="token comment">// @PostConstruct指定初始化方法</span>
   <span class="token keyword">void</span> <span class="token function">setInitMethodName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> initMethodName<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token annotation punctuation">@Nullable</span>
   <span class="token class-name">String</span> <span class="token function">getInitMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">// @PreDestroy指定销毁方法</span>
   <span class="token keyword">void</span> <span class="token function">setDestroyMethodName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> destroyMethodName<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token annotation punctuation">@Nullable</span>
   <span class="token class-name">String</span> <span class="token function">getDestroyMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


   <span class="token comment">// 单例 or 原型</span>
   <span class="token keyword">boolean</span> <span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">boolean</span> <span class="token function">isPrototype</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


