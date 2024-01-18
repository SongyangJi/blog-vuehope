<template><div><blockquote>
<p>这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。</p>
</blockquote>
<h1 id="_5-spring-面向方面编程" tabindex="-1"><a class="header-anchor" href="#_5-spring-面向方面编程" aria-hidden="true">#</a> 5. Spring 面向方面编程</h1>
<h2 id="_5-1-aop概念" tabindex="-1"><a class="header-anchor" href="#_5-1-aop概念" aria-hidden="true">#</a> 5.1 AOP概念</h2>
<p>下面是一些核心 AOP 概念和术语。这些术语不是特定于 Spring 的。</p>
<ul>
<li>
<p>切面（Aspect）：跨越多个类的关注点的模块化—— <strong>AOP中的基本单位</strong>，正如OOP中的类一样。在 Spring AOP 中，方面是通过使用<strong>基于XML配置常规Bean</strong>或<strong>使用注解@Aspect注解的常规类 （@AspectJ 风格）实现的</strong>。</p>
<p>注意：<code v-pre>@Aspect</code>是注解，@AspectJ是AspectJ project在Spring AOP中实现的风格。</p>
</li>
<li>
<p>连接点（Join point）：<strong>程序执行过程中的一个点，例如方法的执行或异常的处理</strong>。</p>
<p>在 Spring AOP 中，一个连接点总是代表一个<strong>方法</strong>的执行，目前不能对<strong>字段</strong>进行拦截。</p>
</li>
<li>
<p>通知（Advice）：<strong>方面在特定连接点采取的行动</strong>。通知类型将在后面讨论。</p>
</li>
<li>
<p>切点（Pointcut）：**匹配连接点的谓词。**由切入点表达式匹配的连接点的概念是 AOP 的核心，Spring 默认使用 AspectJ 风格的切入点表达式语言。</p>
<p>通俗的说，Spring会根据切点定义的规则去匹配连接点。</p>
</li>
<li>
<p>引入（Introduction） ：代表类型声明额外的方法或字段。Spring AOP 允许您向任何目标对象引入新的接口（和相应的实现）。</p>
<p>这个算是AOP里比较难理解的概念，最好通过实例来解释。</p>
</li>
<li>
<p>目标对象（Target object）：被一个或多个方面建议的对象。也称为“建议对象”。由于 Spring AOP 是使用运行时代理实现的，所以这个对象始终是一个<strong>被代理的对象</strong> （即原对象）。</p>
</li>
<li>
<p>AOP 代理：由 AOP 框架创建的对象，用于实现方面契约（建议方法执行等）。在 Spring Framework 中，AOP 代理由 JDK 动态代理或 CGLIB 代理。</p>
</li>
<li>
<p>编织：将切面与其他应用程序类型或对象联系起来以创建 Advised 对象。</p>
</li>
</ul>
<p>切入点匹配的连接点概念是 AOP 的关键，它区别于仅提供拦截器的技术。</p>
<p>Spring AOP 包括以下类型的通知</p>
<ul>
<li>前置（Before）通知：在连接点之前运行的通知，<strong>但不能阻止执行流继续到连接点</strong>（除非它抛出异常）。</li>
<li>返回后（After returning）通知：在连接点正常完成后运行的通知（例如，如果方法返回而没有抛出异常）。</li>
<li>抛出异常后（After throwing）通知：如果方法通过抛出异常退出，则运行通知。</li>
<li>后置（After or finally）通知：不管连接点退出的方式（正常或异常返回）都将运行的通知。</li>
<li>环绕（Around）通知：环绕连接点的通知。这是最有力的通知。<strong>环绕通知可以在方法调用之前和之后执行自定义行为</strong>。它还<strong>负责选择是继续连接点还是通过返回自己的返回值或抛出异常来缩短被代理的方法执行</strong>。</li>
</ul>
<h2 id="_5-2-使用-aspectj风格的aop" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-aspectj风格的aop" aria-hidden="true">#</a> 5.2 使用@AspectJ风格的AOP</h2>
<p>AOP在Spring中的使用，既可以使用注解驱动，也可以使用XML配置。</p>
<p>这里仍然只介绍注解驱动的AOP。</p>
<h3 id="_5-2-1-启用-aspectj支持" tabindex="-1"><a class="header-anchor" href="#_5-2-1-启用-aspectj支持" aria-hidden="true">#</a> 5.2.1 启用@AspectJ支持</h3>
<p>对于SpringBoot项目而言，引入依赖即可。</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- aop --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-aop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面介绍AOP中的一系列概念在@AspectJ中的具体落地实现。</p>
<h3 id="_5-2-2-声明一个切面" tabindex="-1"><a class="header-anchor" href="#_5-2-2-声明一个切面" aria-hidden="true">#</a> 5.2.2 声明一个切面</h3>
<p>使用注解 <code v-pre>@Aspect</code>标记类即可。</p>
<p>但请注意， <code v-pre>@Aspect</code>注释不足以在类路径中进行自动检测从而被Spring容器管理，所以@Component是有必要的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NotVeryUsefulAspect</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而且，在 Spring AOP 中，切面本身不能成为其他切面通知的目标。</p>
<h3 id="_5-2-3-声明一个切入点" tabindex="-1"><a class="header-anchor" href="#_5-2-3-声明一个切入点" aria-hidden="true">#</a> 5.2.3 声明一个切入点</h3>
<p>如下，<strong>切点是一个用<code v-pre>@Pointcut</code>标记的方法（返回值必须是void）</strong>。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(* transfer(..))"</span><span class="token punctuation">)</span> <span class="token comment">// the pointcut expression</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">anyOldTransfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// the pointcut signature</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>构成<code v-pre>@Pointcut</code>注解值的切入点表达式是一个正则 AspectJ 切入点表达式，这是切点的关键。</p>
<p>具体可以参考附录中的AspectJ编程指南。</p>
<blockquote>
<p>参考资料</p>
<p><a href="https://docs.spring.io/spring-framework/docs/current-SNAPSHOT/reference/html/core.html#spring-core" target="_blank" rel="noopener noreferrer">Spring官方文档<ExternalLinkIcon/></a></p>
<p><a href="https://docs.spring.io/spring-framework/docs/" target="_blank" rel="noopener noreferrer">doc index<ExternalLinkIcon/></a></p>
<p><a href="https://cloud.tencent.com/developer/article/1532547#:~:text=Spring%20AOP%20%E9%BB%98%E8%AE%A4%E4%BD%BF%E7%94%A8JDK,%E5%8F%AF%E4%BB%A5%E5%BC%BA%E5%88%B6%E4%BD%BF%E7%94%A8CGLIB%20%E4%BB%A3%E7%90%86%E3%80%82" target="_blank" rel="noopener noreferrer">Spring 5 AOP 默认改用 CGLIB 了？<ExternalLinkIcon/></a></p>
<p><a href="https://www.eclipse.org/aspectj/doc/released/progguide/index.html" target="_blank" rel="noopener noreferrer">AspectJ编程指南<ExternalLinkIcon/></a></p>
<p><a href="https://www.eclipse.org/aspectj/" target="_blank" rel="noopener noreferrer">AspectJ网站<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


