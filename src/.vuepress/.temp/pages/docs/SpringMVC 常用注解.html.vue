<template><div><h1 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> @Controller</h1>
<p><code v-pre>@Controller</code> 用于标记在一个类上，使用它标记的类就是一个SpringMVC Controller 对象。分发处理器将会扫描使用了该注解的类的方法，并检测该方法是否使用了@RequestMapping 注解。
<strong>@Controller 只是定义了一个控制器类，而使用@RequestMapping 注解的方法才是真正处理请求的处理器。</strong></p>
<h2 id="restcontroller" tabindex="-1"><a class="header-anchor" href="#restcontroller" aria-hidden="true">#</a> @RestController</h2>
<p>一般我们直接把这个注解加上控制类上，既声明这是一个控制类，也将对象转成json格式传给前端。</p>
<p><code v-pre>@RestController</code>  = <code v-pre>@Controller</code> + <code v-pre>@ResponseBody</code></p>
<h1 id="requestmapping" tabindex="-1"><a class="header-anchor" href="#requestmapping" aria-hidden="true">#</a> @RequestMapping</h1>
<h2 id="url匹配" tabindex="-1"><a class="header-anchor" href="#url匹配" aria-hidden="true">#</a> URL匹配</h2>
<p>@RequestMapping是一个用来处理请求地址映射的注解，可用于类或方法上。</p>
<p>通过类路径和方法路径结合访问controller方法</p>
<blockquote>
<p>当@RequestMapping 标记在Controller 类上的时候，里面使用@RequestMapping
标记的方法的请求地址都是相对于类上的@RequestMapping 而言的；当Controller
类上没有标记@RequestMapping 注解时，方法上的@RequestMapping
都是绝对路径。这种绝对路径和相对路径所组合成的最终路径都是相对于根路径“/ ”而言的。</p>
</blockquote>
<p>总之，这个注解的作用是完成了 <strong>url到控制器方法</strong>的映射。</p>
<ul>
<li>常规使用：类路径+方法路径</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token comment">// 这个注解在返回非视图的对象时使用</span>
<span class="token annotation punctuation">@ResponseBody</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/name"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"jsy"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/age"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">age</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动服务器后，访问 http://localhost:8080/user/name 。</p>
<ul>
<li><strong>URL模板</strong>
为了取出URL模板中的 参数，需要使用<code v-pre>@PathVariable</code>注解，下面会细讲。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token comment">// 这个注解在返回非视图的对象时使用</span>
<span class="token annotation punctuation">@ResponseBody</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/user/"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/name/{p1}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> p1<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"我叫"</span><span class="token operator">+</span>p1<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>正则匹配</strong>
举一个最简单的例子：通配符<code v-pre>*</code>
如<code v-pre>@RequestMapping(&quot;*/user/&quot;)</code>会匹配到<code v-pre>/test/user/</code>等等。</li>
</ul>
<h2 id="value和method属性" tabindex="-1"><a class="header-anchor" href="#value和method属性" aria-hidden="true">#</a> value和method属性</h2>
<ul>
<li><strong>value</strong>
指定请求的实际地址，指定的地址可以是URI Template 模式</li>
<li><strong>method</strong>
指定请求的method类型， GET、POST、PUT、DELETE等。也就是<strong>窄化了请求范围</strong></li>
</ul>
<h2 id="getmapping、-postmapping" tabindex="-1"><a class="header-anchor" href="#getmapping、-postmapping" aria-hidden="true">#</a> @GetMapping、@PostMapping</h2>
<p>根据上面的<code v-pre>method</code>属性，可以直接使用<code v-pre>@RequestMapping</code>的衍生注解：</p>
<ul>
<li>@GetMapping 等同于 @RequestMapping(method = RequestMethod.GET)</li>
<li>@PostMapping 等同于 @RequestMapping(method = RequestMethod.POST)</li>
<li>@PutMapping 等同于 @RequestMapping(method = RequestMethod.PUT)</li>
<li>@DeleteMapping 等同于 @RequestMapping(method = RequestMethod.DELETE)</li>
<li>@PatchMapping 等同于 @RequestMapping(method = RequestMethod.PATCH)
等等。</li>
</ul>
<h1 id="获取参数" tabindex="-1"><a class="header-anchor" href="#获取参数" aria-hidden="true">#</a> 获取参数</h1>
<h2 id="pathvariable" tabindex="-1"><a class="header-anchor" href="#pathvariable" aria-hidden="true">#</a> @PathVariable</h2>
<p><strong>用于将请求URL中的模板变量映射到功能处理方法的参数上，即取出uri模板中的变量作为参数。</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token comment">// 这个注解在返回非视图的对象时使用</span>
<span class="token annotation punctuation">@ResponseBody</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/user"</span><span class="token punctuation">,</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/name/{p1}/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"p1"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p<span class="token punctuation">,</span><span class="token annotation punctuation">@PathVariable</span> <span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"我叫"</span><span class="token operator">+</span>p<span class="token operator">+</span><span class="token string">",学号是"</span><span class="token operator">+</span>id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意点，如果所需要使用的变量名跟参数名不相同的时候，就要明确指出使用的是URI 模板中的哪个变量!</p>
<h2 id="requestbody" tabindex="-1"><a class="header-anchor" href="#requestbody" aria-hidden="true">#</a> @RequestBody</h2>
<p>默认会将post请求中body中的json串反序列话为实体类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>   <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/student"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">post</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Student</span> student<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="requestparam" tabindex="-1"><a class="header-anchor" href="#requestparam" aria-hidden="true">#</a> @RequestParam</h2>
<p>这就是 GET请求的 query-string的格式，形如： <strong>?name1=value1&amp;name2=value2</strong>。</p>
<p>@RequestParam就是用来提取中其中的值的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/student"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Student</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


