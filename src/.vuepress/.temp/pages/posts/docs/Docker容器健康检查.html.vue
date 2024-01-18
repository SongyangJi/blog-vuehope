<template><div><h3 id="结构体定义" tabindex="-1"><a class="header-anchor" href="#结构体定义" aria-hidden="true">#</a> 结构体定义</h3>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token comment">// Health states</span>
const (
   NoHealthcheck = <span class="token string">"none"</span>      <span class="token comment">// Indicates there is no healthcheck</span>
   Starting      = <span class="token string">"starting"</span>  <span class="token comment">// Starting indicates that the container is not yet ready</span>
   Healthy       = <span class="token string">"healthy"</span>   <span class="token comment">// Healthy indicates that the container is running correctly</span>
   Unhealthy     = <span class="token string">"unhealthy"</span> <span class="token comment">// Unhealthy indicates that the container has a problem</span>
)

<span class="token comment">// Health stores information about the container's healthcheck results</span>
type Health struct <span class="token punctuation">{</span>
   Status        string               <span class="token comment">// Status is one of Starting, Healthy or Unhealthy</span>
   FailingStreak int                  <span class="token comment">// FailingStreak is the number of consecutive failures</span>
   Log           <span class="token punctuation">[</span><span class="token punctuation">]</span>*HealthcheckResult <span class="token comment">// Log contains the last few results (oldest first)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ContainerState stores container's running state</span>
<span class="token comment">// it's part of ContainerJSONBase and will return by "inspect" command</span>
type ContainerState struct <span class="token punctuation">{</span>
   Status     string <span class="token comment">// String representation of the container state. Can be one of "created", "running", "paused", "restarting", "removing", "exited", or "dead"</span>
   Running    bool
   Paused     bool
   Restarting bool
   OOMKilled  bool
   Dead       bool
   Pid        int
   ExitCode   int
   Error      string
   StartedAt  string
   FinishedAt string
   Health     *Health `json<span class="token operator">:</span><span class="token string">",omitempty"</span>`
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容器状态举例" tabindex="-1"><a class="header-anchor" href="#容器状态举例" aria-hidden="true">#</a> 容器状态举例</h3>
<h4 id="正在运行、有健康检查" tabindex="-1"><a class="header-anchor" href="#正在运行、有健康检查" aria-hidden="true">#</a> 正在运行、有健康检查</h4>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Id"</span><span class="token operator">:</span> <span class="token string">"62b16c0d39e0d53cb9b650abbec981c6a05487b44ca5a3e0a70add7ab0b65cba"</span><span class="token punctuation">,</span>
        <span class="token property">"State"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Status"</span><span class="token operator">:</span> <span class="token string">"running"</span><span class="token punctuation">,</span>
            <span class="token property">"Running"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">"Paused"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Restarting"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OOMKilled"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Dead"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Pid"</span><span class="token operator">:</span> <span class="token number">667960</span><span class="token punctuation">,</span>
            <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"Error"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"StartedAt"</span><span class="token operator">:</span> <span class="token string">"2022-05-14T20:38:38.295539629Z"</span><span class="token punctuation">,</span>
            <span class="token property">"FinishedAt"</span><span class="token operator">:</span> <span class="token string">"0001-01-01T00:00:00Z"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="正在运行、无健康检查" tabindex="-1"><a class="header-anchor" href="#正在运行、无健康检查" aria-hidden="true">#</a> 正在运行、无健康检查</h4>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Id"</span><span class="token operator">:</span> <span class="token string">"d8338185a6bfc54dca030c59abb5186161bf77094c1af8979c58b93540599905"</span><span class="token punctuation">,</span>
        <span class="token property">"State"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Status"</span><span class="token operator">:</span> <span class="token string">"running"</span><span class="token punctuation">,</span>
            <span class="token property">"Running"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">"Paused"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Restarting"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OOMKilled"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Dead"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Pid"</span><span class="token operator">:</span> <span class="token number">458280</span><span class="token punctuation">,</span>
            <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"Error"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"StartedAt"</span><span class="token operator">:</span> <span class="token string">"2022-05-14T13:02:57.171746945Z"</span><span class="token punctuation">,</span>
            <span class="token property">"FinishedAt"</span><span class="token operator">:</span> <span class="token string">"0001-01-01T00:00:00Z"</span><span class="token punctuation">,</span>
            <span class="token property">"Health"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"Status"</span><span class="token operator">:</span> <span class="token string">"healthy"</span><span class="token punctuation">,</span>
                <span class="token property">"FailingStreak"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token comment">// output 为日志的输出，这里省略</span>
                <span class="token property">"Log"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"Start"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:20:11.364683294+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"End"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:20:11.489168017+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                        <span class="token property">"Output"</span><span class="token operator">:</span> <span class="token string">""</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"Start"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:20:41.555034247+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"End"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:20:41.669428317+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                        <span class="token property">"Output"</span><span class="token operator">:</span> <span class="token string">""</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"Start"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:21:11.743222508+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"End"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:21:11.873154539+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                        <span class="token property">"Output"</span><span class="token operator">:</span> <span class="token string">""</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"Start"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:21:41.942537086+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"End"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:21:42.074005305+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                        <span class="token property">"Output"</span><span class="token operator">:</span> <span class="token string">""</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"Start"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:22:12.145717622+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"End"</span><span class="token operator">:</span> <span class="token string">"2022-05-16T10:22:12.298673054+08:00"</span><span class="token punctuation">,</span>
                        <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                        <span class="token property">"Output"</span><span class="token operator">:</span> <span class="token string">""</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>  
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="正常退出" tabindex="-1"><a class="header-anchor" href="#正常退出" aria-hidden="true">#</a> 正常退出</h4>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Id"</span><span class="token operator">:</span> <span class="token string">"e6c371ee6eff329e7fea4411b3fe1f7374f155c89f0defe40469d24fe4966c84"</span><span class="token punctuation">,</span>
        <span class="token property">"State"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Status"</span><span class="token operator">:</span> <span class="token string">"exited"</span><span class="token punctuation">,</span>
            <span class="token property">"Running"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Paused"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Restarting"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OOMKilled"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Dead"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Pid"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"Error"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"StartedAt"</span><span class="token operator">:</span> <span class="token string">"2022-04-05T09:35:31.758578263Z"</span><span class="token punctuation">,</span>
            <span class="token property">"FinishedAt"</span><span class="token operator">:</span> <span class="token string">"2022-04-05T09:35:31.75743118Z"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="非正常退出" tabindex="-1"><a class="header-anchor" href="#非正常退出" aria-hidden="true">#</a> 非正常退出</h4>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Id"</span><span class="token operator">:</span> <span class="token string">"9960fb71ac67b3d0869ba699d722c1c2b1513e257bfa661d4357f3d0cc80712e"</span><span class="token punctuation">,</span>
        <span class="token property">"State"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Status"</span><span class="token operator">:</span> <span class="token string">"exited"</span><span class="token punctuation">,</span>
            <span class="token property">"Running"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Paused"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Restarting"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OOMKilled"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Dead"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Pid"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">255</span><span class="token punctuation">,</span>
            <span class="token property">"Error"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"StartedAt"</span><span class="token operator">:</span> <span class="token string">"2022-04-05T20:12:33.193708879Z"</span><span class="token punctuation">,</span>
            <span class="token property">"FinishedAt"</span><span class="token operator">:</span> <span class="token string">"2022-05-07T18:10:37.476409625Z"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实操" tabindex="-1"><a class="header-anchor" href="#实操" aria-hidden="true">#</a> 实操</h2>
<h3 id="一个简单的健康检测" tabindex="-1"><a class="header-anchor" href="#一个简单的健康检测" aria-hidden="true">#</a> 一个简单的健康检测</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">hasHealthCheck</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> containerID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>enabled <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	containerJSON<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerInspect</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> containerID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error: [hasHealthCheck]"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> containerJSON<span class="token punctuation">.</span>Config <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> containerJSON<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Healthcheck <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">checkIsRunning</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> containerID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	containerJSON<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerInspect</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> containerID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Error: [checkIsRunning] fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> containerJSON<span class="token punctuation">.</span>State <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> containerJSON<span class="token punctuation">.</span>State<span class="token punctuation">.</span>Running
	<span class="token punctuation">}</span>
	<span class="token comment">//No such container</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">MonitorContainerHealth</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> containerID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	containerList<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerList</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ContainerListOptions<span class="token punctuation">{</span>All<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"[MonitorContainerHealth] error=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	containerExists <span class="token operator">:=</span> <span class="token boolean">false</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> container <span class="token operator">:=</span> <span class="token keyword">range</span> containerList <span class="token punctuation">{</span>
		<span class="token keyword">if</span> container<span class="token punctuation">.</span>ID <span class="token operator">==</span> containerID <span class="token punctuation">{</span>
			containerExists <span class="token operator">=</span> <span class="token boolean">true</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>containerExists <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"[MonitorContainerHealth] container:%s not exists"</span><span class="token punctuation">,</span> containerID<span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> checkContainerIsHealthy <span class="token keyword">func</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> containerID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>

	<span class="token keyword">if</span> <span class="token function">hasHealthCheck</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> containerID<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		checkContainerIsHealthy <span class="token operator">=</span> checkIsRunning <span class="token comment">// todo 默认</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		checkContainerIsHealthy <span class="token operator">=</span> checkIsRunning
	<span class="token punctuation">}</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>containerIsHealthy <span class="token keyword">func</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> containerID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">containerIsHealthy</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> containerID<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"[MonitorContainerHealth] container:%s is not running, so the monitor process terminate..."</span><span class="token punctuation">,</span> containerID<span class="token punctuation">)</span>
				os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token comment">// todo default 1s</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span>checkContainerIsHealthy<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


