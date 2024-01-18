<template><div><blockquote>
<p>这里我做的这份笔记的意义仅仅是记录下自己初涉Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。</p>
</blockquote>
<h1 id="_1-spring-ioc容器和bean简介" tabindex="-1"><a class="header-anchor" href="#_1-spring-ioc容器和bean简介" aria-hidden="true">#</a> 1 Spring IoC容器和Bean简介</h1>
<h2 id="_1-9-基于注解的容器配置" tabindex="-1"><a class="header-anchor" href="#_1-9-基于注解的容器配置" aria-hidden="true">#</a> 1.9 基于注解的容器配置</h2>
<blockquote>
<p><strong>注解</strong>在配置Spring上比<strong>XML</strong>更好吗？ 两种方式并无绝对的更好。不过目前的趋势是使用注解，尤其是对于不是特别大的项目。</p>
</blockquote>
<h3 id="_1-9-1-autowire" tabindex="-1"><a class="header-anchor" href="#_1-9-1-autowire" aria-hidden="true">#</a> 1.9.1 @Autowire</h3>
<p><strong>@Autowire</strong> 用于自动装配，按照 <strong>类型</strong> 装配。</p>
<ol>
<li>注解字段</li>
<li>注解构造器</li>
<li>注解方法</li>
</ol>
<p>其中，不建议使用 @Autowire 注入，这强依赖于 Spring 上下文的，无法在脱离ioc容器创建对象，比如在进行单元测试的时候。
使用构造器注入，表达强依赖关系。
使用方法（不一定是setter），表达依赖的可选择关系。</p>
<h3 id="_1-9-2-primary" tabindex="-1"><a class="header-anchor" href="#_1-9-2-primary" aria-hidden="true">#</a> 1.9.2 @Primary</h3>
<p>由于@Autowire是按类型自动装配的，如果有过个bean的话Spring不知道找那个，
可以使用 <strong>@Primary</strong> 指定 bean 的优先级。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Primary</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以及</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MovieConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token keyword">public</span> <span class="token class-name">MovieCatalog</span> <span class="token function">firstMovieCatalog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">MovieCatalog</span> <span class="token function">secondMovieCatalog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-9-3-qualifier" tabindex="-1"><a class="header-anchor" href="#_1-9-3-qualifier" aria-hidden="true">#</a> 1.9.3 @Qualifier</h3>
<p>配合 @Autowire 使用，可以根据 bean 的名字进行精确匹配。
此注解可以使用在 方法、字段、类型、参数，相当于在需要根据name进行标识的时候，就使用它。</p>
<p>注：
可能有人想用 <strong>@Resource</strong> 去彻底代替 @Autowire + @Qualifier。
在一定场景下是可以的。
但是 <strong>@Resource 只能用于字段，和单个参数的setter</strong>，对于注解构造函数和多个参数的方法，它无能为力。不过， @Autowire + @Qualifier 没有这个限制。</p>
<p>官方文档这里还讲了 自定义的 @Qualifier ，这里就不细讲了。</p>
<h3 id="_1-9-4-resource" tabindex="-1"><a class="header-anchor" href="#_1-9-4-resource" aria-hidden="true">#</a> 1.9.4 @Resource</h3>
<p><code v-pre>@Resource</code>有两个属性<code v-pre>name</code>、<code v-pre>type</code>
匹配规则：</p>
<ul>
<li>后面没有任何内容，<strong>默认通过name属性</strong>去匹配bean，找不到再按type去匹配；</li>
<li>指定了name或者type则根据指定的类型去匹配bean；</li>
<li>指定了name和type则根据指定的name和type去匹配bean，任何一个不匹配都将报错。</li>
</ul>
<h3 id="_1-9-5-将泛型用作自动装配限定符" tabindex="-1"><a class="header-anchor" href="#_1-9-5-将泛型用作自动装配限定符" aria-hidden="true">#</a> 1.9.5 将泛型用作自动装配限定符</h3>
<p>暂略。</p>
<h3 id="_1-9-4-value" tabindex="-1"><a class="header-anchor" href="#_1-9-4-value" aria-hidden="true">#</a> 1.9.4 @Value</h3>
<p>@Value 通常用于注入外部属性。
这里还用到了 Spring表达式，不过这里仅仅使用读取即可。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MovieRecommender</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> catalog<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">MovieRecommender</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${catalog.name}"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> catalog<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>catalog <span class="token operator">=</span> catalog<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 application.properties</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>catalog.name=MovieCatalog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还可以使用SpEL进行读取值后动态计算生成值。</p>
<h2 id="_1-10-类路径扫描与托管组件" tabindex="-1"><a class="header-anchor" href="#_1-10-类路径扫描与托管组件" aria-hidden="true">#</a> 1.10 类路径扫描与托管组件</h2>
<h3 id="_1-10-1-componentscan" tabindex="-1"><a class="header-anchor" href="#_1-10-1-componentscan" aria-hidden="true">#</a> 1.10.1 @ComponentScan</h3>
<p>要<strong>自动检测这些类并注册相应的bean</strong>，就可以使用 <strong>@ComponentScan</strong>。</p>
<p>它的作用，找到这些bean,并把它注册到 ioc 容器里， 就像我们手动在 xml 配置一样。</p>
<p>对于SpringBoot应用这个注解可能不会直接被我们使用，
原因是 @SpringBootApplication已经使用了 这个注解，而这个注解会扫描 com.xxx.xxx包及其子包下所有的@Component 及其派生注解，所以一般情况下我们用不着。</p>
<p>但是如果有类写在启动类所在包的外面，而你又想使用它，就得用上这个注解了。</p>
<p>使用方法：
指定扫描的包（子包会自动扫描），指定过滤器。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">"org.example"</span><span class="token punctuation">,</span>
        includeFilters <span class="token operator">=</span> <span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span><span class="token constant">REGEX</span><span class="token punctuation">,</span> pattern <span class="token operator">=</span> <span class="token string">".*Stub.*Repository"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        excludeFilters <span class="token operator">=</span> <span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span><span class="token class-name">Repository</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-10-2-bean" tabindex="-1"><a class="header-anchor" href="#_1-10-2-bean" aria-hidden="true">#</a> 1.10.2 @Bean</h3>
<p>@Bean注释的作用与<bean/>元素相同。</p>
<p>@Bean可以结合其他注解使用
这些注解基本上是补全了XML的功能</p>
<ul>
<li>如
@Primary :优先级，当有两个相同类型的Spring Bean，如果有一个被声明了是@Primary，那么@Autowired会注入这个带有@Primary的。
@Scope :作用域，默认有singleton/prototype，单例和每次注入重新初始化，
@Profile :见@Configuration
@Lazy :见@Configuration</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//@Component</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeanHolder</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ExampleBean</span> <span class="token function">exampleBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ExampleBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 在类内调用，同样也会经过代理</span>
    <span class="token comment">// （ 很好理解，cglib生成的子类override上面的getExampleBean方法后，调用f()时，</span>
    <span class="token comment">// 根据类的多态，此时调用的getExampleBean方法是被增强过的方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">exampleBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">exampleBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">exampleBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它和如下的xml配置等效</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>exampleBean<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.xxx.BeanHolder<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>如果把这里的 <strong>@Configuration</strong>换成 <strong>@Component</strong>会怎样？
注意，@Configuration类下被 @Bean 注解的方法，调用的时候会得到CGLIB代理的增强，
而@Component下的@Bean方法不经过代理，是标准的java调用。</p>
</li>
<li>
<p>如果@Bean修饰的方法被 static呢？
注意CGLIB生成的子类只会override非静态方法，所以static的@Bean方法不会被容器拦截。
技术上来说，CGLIB会动态生成BeanHolder的子类，然后override那个@Bean代理的方法。</p>
</li>
</ul>
<p>注意，看到下面的图，你通过Spring容器拿到的类，其实已经不是你自己写的类了，而是经过cglib加强过的类。
<img src="https://img-blog.csdnimg.cn/20210526013456644.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0ODQ2MzI0,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p>
<h3 id="_1-10-3-命名自动检测的组件" tabindex="-1"><a class="header-anchor" href="#_1-10-3-命名自动检测的组件" aria-hidden="true">#</a> 1.10.3 命名自动检测的组件</h3>
<p>Spring自己生成的bean的名字是有规则的，就是类名答第一个字母变成小写，而你可以自定义名称生成规则（不过似乎很鸡肋，没什么用）。</p>
<h3 id="_1-10-4-scope" tabindex="-1"><a class="header-anchor" href="#_1-10-4-scope" aria-hidden="true">#</a> 1.10.4 @Scope</h3>
<p>这个注解可以用在Bean class 和@Bean 方法上，用来指定作用域。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Bean</span>
<span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">MyBean</span> <span class="token function">myBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考资料</p>
<p><a href="https://docs.spring.io/spring-framework/docs/current-SNAPSHOT/reference/html/core.html#spring-core" target="_blank" rel="noopener noreferrer">Spring官方文档<ExternalLinkIcon/></a></p>
<p><a href="https://docs.spring.io/spring-framework/docs/" target="_blank" rel="noopener noreferrer">doc index<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


