<template><div><h2 id="cglib" tabindex="-1"><a class="header-anchor" href="#cglib" aria-hidden="true">#</a> CGLIB</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// CGLIB动态代理</span>
<span class="token comment">// 1. 首先实现一个MethodInterceptor，方法调用会被转发到该类的intercept()方法。</span>
<span class="token keyword">class</span> <span class="token class-name">MyMethodInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">MethodInterceptor</span><span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">intercept</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">,</span> <span class="token class-name">MethodProxy</span> proxy<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"You said: "</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> proxy<span class="token punctuation">.</span><span class="token function">invokeSuper</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 2. 然后在需要使用HelloConcrete的时候，通过CGLIB动态代理获取代理对象。</span>
<span class="token class-name">Enhancer</span> enhancer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Enhancer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
enhancer<span class="token punctuation">.</span><span class="token function">setSuperclass</span><span class="token punctuation">(</span><span class="token class-name">HelloConcrete</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
enhancer<span class="token punctuation">.</span><span class="token function">setCallback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyMethodInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">HelloConcrete</span> hello <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HelloConcrete</span><span class="token punctuation">)</span>enhancer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>hello<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token string">"I love you!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优缺点比较" tabindex="-1"><a class="header-anchor" href="#优缺点比较" aria-hidden="true">#</a> 优缺点比较</h2>
<p>JDK</p>
<ol>
<li>
<p>根据ClassLoader和Interface来获取接口类（前面已经讲了，类是由ClassLoader加载到JVM的，所以通过ClassLoader和Interface可以找到接口类）</p>
</li>
<li>
<p>获取构造对象；</p>
</li>
<li>
<p>通过构造对象和InvocationHandler生成实例，并返回，就是我们要的代理类。</p>
</li>
</ol>
<p>Java动态代理优缺点：</p>
<p>优点：</p>
<ol>
<li>
<p>Java本身支持，不用担心依赖问题，随着版本稳定升级；</p>
</li>
<li>
<p>代码实现简单；</p>
</li>
</ol>
<p>缺点：</p>
<ol>
<li>
<p>目标类必须实现某个接口，换言之，没有实现接口的类是不能生成代理对象的；</p>
</li>
<li>
<p>代理的方法必须都声明在接口中，否则，无法代理；</p>
</li>
<li>
<p>执行速度性能相对cglib较低；</p>
</li>
</ol>
<p>Cglib原理：</p>
<p>1.通过字节码增强技术动态的创建代理对象；</p>
<p>2.代理的是代理对象的引用；</p>
<p>Cglib优缺点：</p>
<p>优点：</p>
<p>1.代理的类无需实现接口；</p>
<p>2.执行速度相对JDK动态代理较高；</p>
<p>缺点：</p>
<p>1.字节码库需要进行更新以保证在新版java上能运行；</p>
<p>2.动态创建代理对象的代价相对JDK动态代理较高；</p>
<p>Tips：</p>
<p>1.代理的对象不能是final关键字修饰的</p>
<blockquote>
<p>https://www.cnblogs.com/carpenterlee/p/8241042.html</p>
<p>https://www.cnblogs.com/brithToSpring/p/13356626.html</p>
<p>https://segmentfault.com/a/1190000023514746</p>
</blockquote>
</div></template>


