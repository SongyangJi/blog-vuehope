<template><div><p>源码分析</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">// Use attaches a global middleware to the router. ie. the middleware attached though Use() will be</span>
<span class="token comment">// included in the handlers chain for every single request. Even 404, 405, static files...</span>
<span class="token comment">//</span>
<span class="token comment">// For example, this is the right place for a logger or error management middleware.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">Use</span><span class="token punctuation">(</span>middleware <span class="token operator">...</span>app<span class="token punctuation">.</span>HandlerFunc<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	engine<span class="token punctuation">.</span>RouterGroup<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>middleware<span class="token operator">...</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">rebuild404Handlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">rebuild405Handlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>RequestContext<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">// HandlersChain defines a HandlerFunc array.</span>
<span class="token keyword">type</span> HandlersChain <span class="token punctuation">[</span><span class="token punctuation">]</span>HandlerFunc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">// Use adds middleware to the group, see example code in GitHub.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>group <span class="token operator">*</span>RouterGroup<span class="token punctuation">)</span> <span class="token function">Use</span><span class="token punctuation">(</span>middleware <span class="token operator">...</span>app<span class="token punctuation">.</span>HandlerFunc<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	group<span class="token punctuation">.</span>Handlers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>group<span class="token punctuation">.</span>Handlers<span class="token punctuation">,</span> middleware<span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> group<span class="token punctuation">.</span><span class="token function">returnObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认的recover中间件</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">// Default creates a hertz instance with default middlewares.</span>
<span class="token keyword">func</span> <span class="token function">Default</span><span class="token punctuation">(</span>opts <span class="token operator">...</span>config<span class="token punctuation">.</span>Option<span class="token punctuation">)</span> <span class="token operator">*</span>Hertz <span class="token punctuation">{</span>
	h <span class="token operator">:=</span> <span class="token function">New</span><span class="token punctuation">(</span>opts<span class="token operator">...</span><span class="token punctuation">)</span>
	h<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>recovery<span class="token punctuation">.</span><span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> h
<span class="token punctuation">}</span>

<span class="token comment">// Recovery returns a middleware that recovers from any panic.</span>
<span class="token comment">// By default, it will print the time, content, and stack information of the error and write a 500.</span>
<span class="token comment">// Overriding the Config configuration, you can customize the error printing logic.</span>
<span class="token keyword">func</span> <span class="token function">Recovery</span><span class="token punctuation">(</span>opts <span class="token operator">...</span>Option<span class="token punctuation">)</span> app<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	cfg <span class="token operator">:=</span> <span class="token function">newOptions</span><span class="token punctuation">(</span>opts<span class="token operator">...</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				stack <span class="token operator">:=</span> <span class="token function">stack</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

				cfg<span class="token punctuation">.</span><span class="token function">recoveryHandler</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> err<span class="token punctuation">,</span> stack<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		ctx<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Next should be used only inside middleware.</span>
<span class="token comment">// It executes the pending handlers in the chain inside the calling handler.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>ctx <span class="token operator">*</span>RequestContext<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ctx<span class="token punctuation">.</span>index<span class="token operator">++</span>
	<span class="token keyword">for</span> ctx<span class="token punctuation">.</span>index <span class="token operator">&lt;</span> <span class="token function">int8</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>handlers<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ctx<span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>ctx<span class="token punctuation">.</span>index<span class="token punctuation">]</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
		ctx<span class="token punctuation">.</span>index<span class="token operator">++</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>PanicHandler <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> engine<span class="token punctuation">.</span><span class="token function">recv</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	rPath <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">URI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Path</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	httpMethod <span class="token operator">:=</span> bytesconv<span class="token punctuation">.</span><span class="token function">B2s</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	unescape <span class="token operator">:=</span> <span class="token boolean">false</span>
	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>options<span class="token punctuation">.</span>UseRawPath <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> <span class="token function">string</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">URI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">PathOriginal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		unescape <span class="token operator">=</span> engine<span class="token punctuation">.</span>options<span class="token punctuation">.</span>UnescapePathValues
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>options<span class="token punctuation">.</span>RemoveExtraSlash <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">CleanPath</span><span class="token punctuation">(</span>rPath<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Follow RFC7230#section-5.3</span>
	<span class="token keyword">if</span> rPath <span class="token operator">==</span> <span class="token string">""</span> <span class="token operator">||</span> rPath<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
		<span class="token function">serveError</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> consts<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> default400Body<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Find root of the tree for the given HTTP method</span>
	t <span class="token operator">:=</span> engine<span class="token punctuation">.</span>trees
	paramsPointer <span class="token operator">:=</span> <span class="token operator">&amp;</span>ctx<span class="token punctuation">.</span>Params
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> tl <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> tl<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>method <span class="token operator">!=</span> httpMethod <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Find route in tree</span>
		value <span class="token operator">:=</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>rPath<span class="token punctuation">,</span> paramsPointer<span class="token punctuation">,</span> unescape<span class="token punctuation">)</span>

		<span class="token keyword">if</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			ctx<span class="token punctuation">.</span><span class="token function">SetHandlers</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>handlers<span class="token punctuation">)</span>
			ctx<span class="token punctuation">.</span><span class="token function">SetFullPath</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>fullPath<span class="token punctuation">)</span>
			ctx<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> httpMethod <span class="token operator">!=</span> consts<span class="token punctuation">.</span>MethodConnect <span class="token operator">&amp;&amp;</span> rPath <span class="token operator">!=</span> <span class="token string">"/"</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> value<span class="token punctuation">.</span>tsr <span class="token operator">&amp;&amp;</span> engine<span class="token punctuation">.</span>options<span class="token punctuation">.</span>RedirectTrailingSlash <span class="token punctuation">{</span>
				<span class="token function">redirectTrailingSlash</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">if</span> engine<span class="token punctuation">.</span>options<span class="token punctuation">.</span>RedirectFixedPath <span class="token operator">&amp;&amp;</span> <span class="token function">redirectFixedPath</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>root<span class="token punctuation">,</span> engine<span class="token punctuation">.</span>options<span class="token punctuation">.</span>RedirectFixedPath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">break</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>options<span class="token punctuation">.</span>HandleMethodNotAllowed <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tree <span class="token operator">:=</span> <span class="token keyword">range</span> engine<span class="token punctuation">.</span>trees <span class="token punctuation">{</span>
			<span class="token keyword">if</span> tree<span class="token punctuation">.</span>method <span class="token operator">==</span> httpMethod <span class="token punctuation">{</span>
				<span class="token keyword">continue</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">if</span> value <span class="token operator">:=</span> tree<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>rPath<span class="token punctuation">,</span> paramsPointer<span class="token punctuation">,</span> unescape<span class="token punctuation">)</span><span class="token punctuation">;</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				ctx<span class="token punctuation">.</span><span class="token function">SetHandlers</span><span class="token punctuation">(</span>engine<span class="token punctuation">.</span>allNoMethod<span class="token punctuation">)</span>
				<span class="token function">serveError</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> consts<span class="token punctuation">.</span>StatusMethodNotAllowed<span class="token punctuation">,</span> default405Body<span class="token punctuation">)</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	ctx<span class="token punctuation">.</span><span class="token function">SetHandlers</span><span class="token punctuation">(</span>engine<span class="token punctuation">.</span>allNoRoute<span class="token punctuation">)</span>
	<span class="token function">serveError</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> consts<span class="token punctuation">.</span>StatusNotFound<span class="token punctuation">,</span> default404Body<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> demo</h1>
<p>中间件可以理解为洋葱穿透。</p>
<p>c.Next() 之前的操作是在 Handler 执行之前就执行；
c.Next() 之后的操作是在 Handler 执行之后再执行；</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">// Code generated by hertz generator.</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"context"</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"github.com/cloudwego/hertz/pkg/app"</span>
    <span class="token string">"github.com/cloudwego/hertz/pkg/app/server"</span>
    <span class="token string">"github.com/cloudwego/hertz/pkg/protocol/consts"</span>
<span class="token punctuation">)</span>

<span class="token comment">// customizeRegister registers customize routers.</span>
<span class="token keyword">func</span> <span class="token function">customizedRegister</span><span class="token punctuation">(</span>h <span class="token operator">*</span>server<span class="token punctuation">.</span>Hertz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    h<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello Before 1"</span><span class="token punctuation">)</span>
        ctx<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello After 1"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    h<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello Before 2"</span><span class="token punctuation">)</span>
        ctx<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello After 2"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    h<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span><span class="token string">"/middleware"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>consts<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    h<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello Before 3"</span><span class="token punctuation">)</span>
        ctx<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello After 3"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    h<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello Before 4"</span><span class="token punctuation">)</span>
        ctx<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello After 4"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Hello Before 1
Hello Before 2
to handler
Hello After 2
Hello After 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


