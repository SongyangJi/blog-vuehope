<template><div><h1 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h1>
<p>pkg包安装简单，只需双击+一路next即可，安装路径默认是/usr/local/go/</p>
<p>https://zh.wikipedia.org/wiki/Go</p>
<p>https://go.dev/dl/</p>
<p>https://go.dev/</p>
<p>https://go.dev/doc/install</p>
<p><a href="https://go.dev/doc/manage-install#installing-multiple" target="_blank" rel="noopener noreferrer">安装多个版本的go<ExternalLinkIcon/></a></p>
<h1 id="helloworld" tabindex="-1"><a class="header-anchor" href="#helloworld" aria-hidden="true">#</a> HelloWorld</h1>
<p>创建编辑文件<code v-pre>vim hello.go</code></p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接运行</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>jisongyang@SongyangJi<span class="token operator">-</span>MacBookAir tmp <span class="token operator">%</span> <span class="token keyword">go</span> run hello<span class="token punctuation">.</span><span class="token keyword">go</span>
Hello World
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>先编译后执行（多一个编译产物）</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>jisongyang@SongyangJi<span class="token operator">-</span>MacBookAir tmp <span class="token operator">%</span> <span class="token keyword">go</span> build <span class="token operator">-</span>o hello hello<span class="token punctuation">.</span><span class="token keyword">go</span>
jisongyang@SongyangJi<span class="token operator">-</span>MacBookAir tmp <span class="token operator">%</span> ls
hello		hello<span class="token punctuation">.</span><span class="token keyword">go</span>
jisongyang@SongyangJi<span class="token operator">-</span>MacBookAir tmp <span class="token operator">%</span> <span class="token punctuation">.</span><span class="token operator">/</span>hello
Hello World
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


