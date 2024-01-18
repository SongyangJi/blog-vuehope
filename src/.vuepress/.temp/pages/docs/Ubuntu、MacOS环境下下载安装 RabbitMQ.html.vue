<template><div><hr>
<h2 id="title-ubuntu、macos环境下下载安装-rabbitmqdate-2021-10-09categories-消息中间件tags-message-queue-rabbitmq" tabindex="-1"><a class="header-anchor" href="#title-ubuntu、macos环境下下载安装-rabbitmqdate-2021-10-09categories-消息中间件tags-message-queue-rabbitmq" aria-hidden="true">#</a> title: Ubuntu、MacOS环境下下载安装 RabbitMQ
date: 2021-10-09
categories: 消息中间件
tags:
- Message Queue
- RabbitMQ</h2>
<h1 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu" aria-hidden="true">#</a> Ubuntu</h1>
<h2 id="下载" tabindex="-1"><a class="header-anchor" href="#下载" aria-hidden="true">#</a> 下载</h2>
<p>先更新一下资源。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于rabbitMq需要erlang语言的支持，在安装rabbitMq之前需要安装erlang。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> erlang-nox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装rabbitmq</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> rabbitmq-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认下载的地址</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>songyangji@SongyangJi-Ubuntu-DeskStop:/etc/rabbitmq$ <span class="token function">whereis</span> rabbitmq
rabbitmq: /usr/lib/rabbitmq /etc/rabbitmq /usr/share/rabbitmq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开启、关闭" tabindex="-1"><a class="header-anchor" href="#开启、关闭" aria-hidden="true">#</a> 开启、关闭</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># start</span>
<span class="token function">sudo</span> <span class="token function">service</span> rabbitmq-server start

<span class="token comment"># stop</span>
<span class="token function">sudo</span> <span class="token function">service</span> rabbitmq-server stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接到/sbin目录下执行也是可以的。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 启动 start</span>
<span class="token function">sudo</span> /sbin/service rabbitmq-server start

<span class="token comment"># 停止 stop</span>
<span class="token function">sudo</span> /sbin/service rabbitmq-server stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动web管理端" tabindex="-1"><a class="header-anchor" href="#启动web管理端" aria-hidden="true">#</a> 启动Web管理端</h2>
<p>安装了Rabbitmq后，默认也安装了该管理工具，执行命令即可启动</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/rabbitmq
<span class="token function">sudo</span> rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>访问 localhost:15672
出现一下即可。
<img src="https://img-blog.csdnimg.cn/20210402155642536.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0ODQ2MzI0,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p>
<h1 id="macos" tabindex="-1"><a class="header-anchor" href="#macos" aria-hidden="true">#</a> MacOS</h1>
<h2 id="下载-1" tabindex="-1"><a class="header-anchor" href="#下载-1" aria-hidden="true">#</a> 下载</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew update
brew <span class="token function">install</span> rabbitmq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a> 配置环境变量</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">RABBITMQ_HOME</span><span class="token operator">=</span>/opt/homebrew/Cellar/rabbitmq/3.8.13
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$RABBITMQ_HOME</span>/sbin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动、关闭" tabindex="-1"><a class="header-anchor" href="#启动、关闭" aria-hidden="true">#</a> 启动、关闭</h2>
<p>这里是借助 brew 去管理的。如果直接使用  rabbitmq提供的脚本启动也是可以的。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew services start rabbitmq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew services stop rabbitmq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问Web端是一样的。</p>
</div></template>


