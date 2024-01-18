<template><div><h1 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>go <span class="token function">install</span> github.com/cloudwego/hertz/cmd/hz@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="生成代码" tabindex="-1"><a class="header-anchor" href="#生成代码" aria-hidden="true">#</a> 生成代码</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir hertz_demo % hz new
output directory /Users/jisongyang/GolandProjects/hertz_demo is not under GOPATH/src. Please specify a module name with the <span class="token string">'-module'</span> flag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>-module</code>指定模块</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>hz new <span class="token parameter variable">-module</span> hertz_demo`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目录结构</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir hertz_demo % tree
<span class="token builtin class-name">.</span>
├── biz
│   ├── handler
│   │   └── ping.go
│   └── router
│       └── register.go
├── go.mod
├── go.sum
├── main.go
├── router.go
└── router_gen.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> Demo</h1>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>

	<span class="token string">"github.com/cloudwego/hertz/pkg/app"</span>
	<span class="token string">"github.com/cloudwego/hertz/pkg/app/server"</span>
	<span class="token string">"github.com/cloudwego/hertz/pkg/protocol/consts"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// server.Default() creates a Hertz with recovery middleware.</span>
	<span class="token comment">// If you need a pure hertz, you can use server.New()</span>
	h <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	h<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/hello"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> c <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>consts<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Hello hertz!"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	h<span class="token punctuation">.</span><span class="token function">Spin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改监听端口</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>	<span class="token comment">// The default listening port is 8888.</span>
	<span class="token comment">// You can modify it with server.WithHostPorts().</span>
	h <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span>
		server<span class="token punctuation">.</span><span class="token function">WithHostPorts</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1:8080"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		server<span class="token punctuation">.</span><span class="token function">WithMaxRequestBodySize</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token operator">&lt;&lt;</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		server<span class="token punctuation">.</span><span class="token function">WithTransport</span><span class="token punctuation">(</span>standard<span class="token punctuation">.</span>NewTransporter<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>https://www.cloudwego.io/zh/docs/hertz/</p>
</blockquote>
</div></template>


