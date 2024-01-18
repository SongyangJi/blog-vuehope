<template><div><h1 id="从spi到springbootautoconfig" tabindex="-1"><a class="header-anchor" href="#从spi到springbootautoconfig" aria-hidden="true">#</a> 从SPI到SpringBootAutoConfig</h1>
<p>SPI ，全称为 Service Provider Interface(服务提供者接口)，是一种服务发现机制。它通过在classpath路径下的META-INF/services文件夹查找文件，自动加载文件中所定义的类。</p>
<p>通过某种方式读取<code v-pre>spring.factories</code>文件，紧接着把里面所有的自动配置类加载到Spring容器中，然后就可以通过Spring的机制将配置类的@Bean注入到容器中了。</p>
<p><a href="https://segmentfault.com/a/1190000040510401" target="_blank" rel="noopener noreferrer">看完就会的SpringBoot自动装配原理<ExternalLinkIcon/></a></p>
<p><code v-pre>@SpringBootApplication</code>
-&gt;<code v-pre>@EnableAutoConfiguration</code>
-&gt;<code v-pre>AutoConfigurationImportSelector</code>
-&gt;<code v-pre>AutoConfigurationImportSelector#selectImports()</code>
-&gt; <code v-pre>AutoConfigurationImportSelector#getCandidateConfigurations</code>
-&gt; <code v-pre>SpringFactoriesLoader#loadFactoryNames</code>
-&gt;...<code v-pre>SpringFactoriesLoader#loadSpringFactories()</code>
-&gt;&quot;META-INF/spring.factories&quot;</p>
<p>不光是这个依赖下的META-INF/spring.factories被读取到，所有 Spring Boot Starter 下的META-INF/spring.factories都会被读取到。</p>
<p><a href="https://www.cnblogs.com/javaguide/p/springboot-auto-config.html" target="_blank" rel="noopener noreferrer">淘宝一面：“说一下 Spring Boot 自动装配原理呗？”<ExternalLinkIcon/></a></p>
<p><code v-pre>AutoConfigurationImportSelector</code> 类实现了 <code v-pre>ImportSelector</code>接口，也就实现了这个接口中的 <code v-pre>selectImports</code>方法，该方法主要用于<strong>获取所有符合条件的类的全限定类名，这些类需要被加载到 IoC 容器中</strong>。</p>
<p><strong>总结</strong></p>
<p>Spring Boot 通过<code v-pre>@EnableAutoConfiguration</code>开启自动装配，通过 SpringFactoriesLoader 最终加载<code v-pre>META-INF/spring.factories</code>中的自动配置类实现自动装配，自动配置类其实就是通过<code v-pre>@Conditional</code>按需加载的配置类，想要其生效必须引入<code v-pre>spring-boot-starter-xxx</code>包实现起步依赖</p>
<blockquote>
<p>Spring Boot 提供的条件注解</p>
<ul>
<li><code v-pre>@ConditionalOnBean</code>：当容器里有指定 Bean 的条件下</li>
<li><code v-pre>@ConditionalOnMissingBean</code>：当容器里没有指定 Bean 的情况下</li>
<li><code v-pre>@ConditionalOnSingleCandidate</code>：当指定 Bean 在容器中只有一个，或者虽然有多个但是指定首选 Bean</li>
<li><code v-pre>@ConditionalOnClass</code>：当类路径下有指定类的条件下</li>
<li><code v-pre>@ConditionalOnMissingClass</code>：当类路径下没有指定类的条件下</li>
<li><code v-pre>@ConditionalOnProperty</code>：指定的属性是否有指定的值</li>
<li><code v-pre>@ConditionalOnResource</code>：类路径是否有指定的值</li>
<li><code v-pre>@ConditionalOnExpression</code>：基于 SpEL 表达式作为判断条件</li>
<li><code v-pre>@ConditionalOnJava</code>：基于 Java 版本作为判断条件</li>
<li><code v-pre>@ConditionalOnJndi</code>：在 JNDI 存在的条件下差在指定的位置</li>
<li><code v-pre>@ConditionalOnNotWebApplication</code>：当前项目不是 Web 项目的条件下</li>
<li><code v-pre>@ConditionalOnWebApplication</code>：当前项目是 Web 项 目的条件下</li>
</ul>
</blockquote>
</div></template>


