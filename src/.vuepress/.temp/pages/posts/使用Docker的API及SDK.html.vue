<template><div><h1 id="docker的http-api" tabindex="-1"><a class="header-anchor" href="#docker的http-api" aria-hidden="true">#</a> Docker的HTTP-API</h1>
<h2 id="开启远程访问端口2375" tabindex="-1"><a class="header-anchor" href="#开启远程访问端口2375" aria-hidden="true">#</a> 开启远程访问端口2375</h2>
<h3 id="修改-etc-default-docker-失败" tabindex="-1"><a class="header-anchor" href="#修改-etc-default-docker-失败" aria-hidden="true">#</a> <s>修改/etc/default/docker（失败）</s></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/default/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加上</p>
<p>DOCKER_OPTS=&quot;-H tcp://0.0.0.0:2375&quot;</p>
<p>再</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改-etc-docker-daemon-json-失败" tabindex="-1"><a class="header-anchor" href="#修改-etc-docker-daemon-json-失败" aria-hidden="true">#</a> <s>修改/etc/docker/daemon.json（失败）</s></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加入</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"hosts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"tcp://0.0.0.0:2375"</span><span class="token punctuation">,</span> <span class="token string">"unix:///var/run/docker.sock"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>&quot;unix:///var/run/docker.sock&quot;：unix socket，本地客户端将通过这个来连接 Docker Daemon。</li>
<li>&quot;tcp://0.0.0.0:2375&quot;：tcp socket，表示允许任何远程客户端通过 2375 端口连接 Docker Daemon。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看docker进程：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">docker</span>
<span class="token comment">#root      44221      1  1 18:16 ?        00:00:06 /usr/bin/dockerd -H tcp://0.0.0.0:2375 -H #unix://var/run/docker.sock</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Docker守护进程打开一个HTTP Socket,这样才能实现远程通信</p>
<h3 id="修改-usr-lib-systemd-system-docker-service-成功" tabindex="-1"><a class="header-anchor" href="#修改-usr-lib-systemd-system-docker-service-成功" aria-hidden="true">#</a> 修改/usr/lib/systemd/system/docker.service（成功）</h3>
<p>在/usr/lib/systemd/system/docker.service，配置远程访问。</p>
<p>主要是在[Service]这个部分，加上两个参数</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># vim /usr/lib/systemd/system/docker.service</span>
<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token comment"># ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span>
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/dockerd <span class="token parameter variable">-H</span> fd:// <span class="token parameter variable">--containerd</span><span class="token operator">=</span>/run/containerd/containerd.sock <span class="token parameter variable">-H</span> tcp://0.0.0.0:2375 <span class="token parameter variable">-H</span> unix://var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这次检查我们看到了这个tcp进程:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root      <span class="token number">117236</span>       <span class="token number">1</span>  <span class="token number">1</span> 02:52 ?        00:00:05 /usr/bin/dockerd <span class="token parameter variable">-H</span> fd:// <span class="token parameter variable">--containerd</span><span class="token operator">=</span>/run/containerd/containerd.sock <span class="token parameter variable">-H</span> tcp://0.0.0.0:2375 <span class="token parameter variable">-H</span> unix://var/run/docker.soc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用remote-cocker-daemon" tabindex="-1"><a class="header-anchor" href="#使用remote-cocker-daemon" aria-hidden="true">#</a> 使用Remote cocker daemon</h2>
<h3 id="shell远程连接" tabindex="-1"><a class="header-anchor" href="#shell远程连接" aria-hidden="true">#</a> shell远程连接</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 加上请求主机即可</span>
<span class="token function">docker</span> <span class="token parameter variable">-H</span> tcp://211.87.224.233:2375 version
<span class="token function">docker</span> <span class="token parameter variable">-H</span> tcp://ip:port <span class="token function">ps</span>
<span class="token function">docker</span> <span class="token parameter variable">-H</span> tcp://ip:port images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="restapi" tabindex="-1"><a class="header-anchor" href="#restapi" aria-hidden="true">#</a> RestAPI</h3>
<p>浏览器访问：</p>
<p>比如想要查看版本 http://ip:port/version</p>
<p>其他的操作入口，请参考</p>
<blockquote>
<p><a href="https://docs.docker.com/engine/api/v1.41/#tag/Container" target="_blank" rel="noopener noreferrer">Docker API Reference<ExternalLinkIcon/></a></p>
</blockquote>
<blockquote>
<p><a href="https://www.cnblogs.com/hongdada/p/11512901.html" target="_blank" rel="noopener noreferrer">Docker开启Remote API 访问 2375端口 <ExternalLinkIcon/></a></p>
</blockquote>
<h1 id="docker-sdk-go" tabindex="-1"><a class="header-anchor" href="#docker-sdk-go" aria-hidden="true">#</a> Docker-SDK-Go</h1>
<h2 id="入门" tabindex="-1"><a class="header-anchor" href="#入门" aria-hidden="true">#</a> 入门</h2>
<h3 id="构造客户端" tabindex="-1"><a class="header-anchor" href="#构造客户端" aria-hidden="true">#</a> 构造客户端</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/docker/docker/client"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// cli, err := client.NewClientWithOpts(client.FromEnv)</span>
	<span class="token comment">// remoteDockerDaemonAddress := "211.87.224.233:2375"</span>
	<span class="token comment">// cli, err := client.NewClientWithOpts(client.FromEnv, client.WithHost("tcp://" + remoteDockerDaemonAddress))</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>既可以连接本地，也可以连接远程的docker。</p>
<h3 id="登录registry私服并拉取镜像" tabindex="-1"><a class="header-anchor" href="#登录registry私服并拉取镜像" aria-hidden="true">#</a> 登录Registry私服并拉取镜像</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"github.com/docker/docker/api/types"</span>
	<span class="token string">"github.com/docker/docker/client"</span>
	<span class="token string">"io"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	harborUrl <span class="token operator">:=</span> <span class="token string">"http://211.87.224.233:8930/"</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">RegistryLogin</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>AuthConfig<span class="token punctuation">{</span>
		Username<span class="token punctuation">:</span>      <span class="token string">"admin"</span><span class="token punctuation">,</span>
		Password<span class="token punctuation">:</span>      <span class="token string">"admin"</span><span class="token punctuation">,</span>
		ServerAddress<span class="token punctuation">:</span> harborUrl<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	imageName <span class="token operator">:=</span> <span class="token string">"211.87.224.233:8930/sdu-weblab/hello-world"</span>
  <span class="token comment">// out 是响应输出流，可以不输出</span>
	out<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ImagePull</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> imageName<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ImagePullOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> out<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> out<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看容器的详细信息-如端口映射" tabindex="-1"><a class="header-anchor" href="#查看容器的详细信息-如端口映射" aria-hidden="true">#</a> <s>查看容器的详细信息，如端口映射</s></h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"errors"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/docker/docker/client"</span>
	<span class="token string">"github.com/docker/go-connections/nat"</span>
	<span class="token string">"os/exec"</span>
	<span class="token string">"strings"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//ip, port, err := getHostIpAndPortOfContainerPort("8af85dfb4659", "80")</span>
	ip<span class="token punctuation">,</span> port<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">getHostIpAndPortOfContainerPortFromConfig</span><span class="token punctuation">(</span><span class="token string">"8bfb9b8e2692"</span><span class="token punctuation">,</span> <span class="token string">"80"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"ip:port = %s:%s"</span><span class="token punctuation">,</span> ip<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getHostIpAndPortOfContainerPortFromConfig</span><span class="token punctuation">(</span>containerId <span class="token builtin">string</span><span class="token punctuation">,</span> containerPort <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ip <span class="token builtin">string</span><span class="token punctuation">,</span> port <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">)</span>
	containerJSON<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerInspect</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> containerId<span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>containerJSON<span class="token punctuation">.</span>HostConfig<span class="token punctuation">.</span>PublishAllPorts <span class="token punctuation">{</span> <span class="token comment">// -p hostPort:containerPort</span>
		_port<span class="token punctuation">,</span> err <span class="token operator">:=</span> nat<span class="token punctuation">.</span><span class="token function">NewPort</span><span class="token punctuation">(</span>nat<span class="token punctuation">.</span><span class="token function">SplitProtoPort</span><span class="token punctuation">(</span>containerPort<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		portBindMap <span class="token operator">:=</span> containerJSON<span class="token punctuation">.</span>HostConfig<span class="token punctuation">.</span>PortBindings
		bindings <span class="token operator">:=</span> portBindMap<span class="token punctuation">[</span>_port<span class="token punctuation">]</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>bindings<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s has no bindings"</span><span class="token punctuation">,</span> containerPort<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		ip <span class="token operator">=</span> bindings<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>HostIP
		port <span class="token operator">=</span> bindings<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>HostPort
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			ip <span class="token operator">=</span> <span class="token string">"0.0.0.0"</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> ip<span class="token punctuation">,</span> port<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// -P containerPort</span>
		<span class="token keyword">return</span> <span class="token function">getHostIpAndPortOfContainerPort</span><span class="token punctuation">(</span>containerId<span class="token punctuation">,</span> containerPort<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// todo </span>
<span class="token keyword">func</span> <span class="token function">getHostIpAndPortOfContainerPort</span><span class="token punctuation">(</span>containerId <span class="token builtin">string</span><span class="token punctuation">,</span> containerPort <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ip <span class="token builtin">string</span><span class="token punctuation">,</span> port <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	shell <span class="token operator">:=</span> <span class="token string">"docker port "</span> <span class="token operator">+</span> containerId <span class="token operator">+</span> <span class="token string">" | grep "</span> <span class="token operator">+</span> containerPort <span class="token operator">+</span> <span class="token string">" | awk '{print $3}'"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>shell<span class="token punctuation">)</span>
	output<span class="token punctuation">,</span> err <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"bash"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> shell<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	ipPort <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span>
	<span class="token comment">//fmt.Println(ipPort)</span>
	splits <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>ipPort<span class="token punctuation">,</span> <span class="token string">":"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>splits<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"invalid format"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	ip <span class="token operator">=</span> splits<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
	port <span class="token operator">=</span> splits<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果端口是用<code v-pre>-P</code>的方式随机映射的话就不能用<code v-pre>ContainerInspect</code>这个API了。</p>
<h3 id="获取端口映射-获取其一即可" tabindex="-1"><a class="header-anchor" href="#获取端口映射-获取其一即可" aria-hidden="true">#</a> 获取端口映射（获取其一即可）</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">getHostPortOfContainerPort</span><span class="token punctuation">(</span>containerId <span class="token builtin">string</span><span class="token punctuation">,</span> containerPort <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>port <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	shell <span class="token operator">:=</span> <span class="token string">"docker port "</span> <span class="token operator">+</span> containerId <span class="token operator">+</span> <span class="token string">" | grep "</span> <span class="token operator">+</span> containerPort <span class="token operator">+</span> <span class="token string">" | awk '{print $3}'"</span>
	output<span class="token punctuation">,</span> err <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"bash"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> shell<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	shellOut <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span>
	shellOut <span class="token operator">=</span> <span class="token string">"0.0.0.0:49155\n:::49155"</span>
	parts <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>shellOut<span class="token punctuation">,</span> <span class="token string">"\n"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>parts<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"containerPort=%s has no bindings"</span><span class="token punctuation">,</span> containerPort<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	ipPort <span class="token operator">:=</span> parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
	splits <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>ipPort<span class="token punctuation">,</span> <span class="token string">":"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>splits<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"invalid format"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	port <span class="token operator">=</span> splits<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建容器" tabindex="-1"><a class="header-anchor" href="#创建容器" aria-hidden="true">#</a> 创建容器</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
    imageName     <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"my-gin:latest"</span>                      <span class="token comment">//镜像名称</span>
    containerName <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"mygin-latest"</span>                       <span class="token comment">//容器名称</span>
    indexName     <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"/"</span> <span class="token operator">+</span> containerName                  <span class="token comment">//容器索引名称，用于检查该容器是否存在是使用</span>
    cmd           <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"./ginDocker2"</span>                       <span class="token comment">//运行的cmd命令，用于启动container中的程序</span>
    workDir       <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"/go/src/ginDocker2"</span>                 <span class="token comment">//container工作目录</span>
    openPort      nat<span class="token punctuation">.</span>Port <span class="token operator">=</span> <span class="token string">"7070"</span>                               <span class="token comment">//container开放端口</span>
    hostPort      <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"7070"</span>                               <span class="token comment">//container映射到宿主机的端口</span>
    containerDir  <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"/go/src/ginDocker2"</span>                 <span class="token comment">//容器挂载目录</span>
    hostDir       <span class="token builtin">string</span>   <span class="token operator">=</span> <span class="token string">"/home/youngblood/Go/src/ginDocker2"</span> <span class="token comment">//容器挂在载宿主机的目录</span>
<span class="token punctuation">)</span>


<span class="token comment">//创建容器</span>
<span class="token keyword">func</span> <span class="token function">createContainer</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> cli <span class="token operator">*</span>client<span class="token punctuation">.</span>Client<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//创建容器</span>
    cont<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerCreate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>container<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
        Image<span class="token punctuation">:</span>      imageName<span class="token punctuation">,</span>     <span class="token comment">//镜像名称</span>
        Tty<span class="token punctuation">:</span>        <span class="token boolean">true</span><span class="token punctuation">,</span>          <span class="token comment">//docker run命令中的-t选项</span>
        OpenStdin<span class="token punctuation">:</span>  <span class="token boolean">true</span><span class="token punctuation">,</span>          <span class="token comment">//docker run命令中的-i选项</span>
        Cmd<span class="token punctuation">:</span>        <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>cmd<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">//docker 容器中执行的命令</span>
        WorkingDir<span class="token punctuation">:</span> workDir<span class="token punctuation">,</span>       <span class="token comment">//docker容器中的工作目录</span>
        ExposedPorts<span class="token punctuation">:</span> nat<span class="token punctuation">.</span>PortSet<span class="token punctuation">{</span>
            openPort<span class="token punctuation">:</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">//docker容器对外开放的端口</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>container<span class="token punctuation">.</span>HostConfig<span class="token punctuation">{</span>
        PortBindings<span class="token punctuation">:</span> nat<span class="token punctuation">.</span>PortMap<span class="token punctuation">{</span>
            <span class="token comment">// 一个容器端口可以”一对多“地映射到多个宿主机端口</span>
            openPort<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>nat<span class="token punctuation">.</span>PortBinding<span class="token punctuation">{</span>nat<span class="token punctuation">.</span>PortBinding<span class="token punctuation">{</span>
                HostIP<span class="token punctuation">:</span>   <span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span> <span class="token comment">//docker容器映射的宿主机的ip, 0.0.0.0 表示服务器的所有可监听的ip</span>
                HostPort<span class="token punctuation">:</span> hostPort<span class="token punctuation">,</span>  <span class="token comment">//docker 容器映射到宿主机的端口;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        Mounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>mount<span class="token punctuation">.</span>Mount<span class="token punctuation">{</span> <span class="token comment">//docker 容器目录挂在到宿主机目录</span>
            mount<span class="token punctuation">.</span>Mount<span class="token punctuation">{</span>
                Type<span class="token punctuation">:</span>   mount<span class="token punctuation">.</span>TypeBind<span class="token punctuation">,</span>
                Source<span class="token punctuation">:</span> hostDir<span class="token punctuation">,</span>
                Target<span class="token punctuation">:</span> containerDir<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> containerName<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"success create container:%s\n"</span><span class="token punctuation">,</span> cont<span class="token punctuation">.</span>ID<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"failed to create container!!!!!!!!!!!!!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要实现-P（随机映射端口的话）的话：使用</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token operator">&amp;</span>container<span class="token punctuation">.</span>HostConfig<span class="token punctuation">{</span>
   PublishAllPorts<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>举例</strong></p>
<p>将<code v-pre>docker run -d -p 9000:80 --name docker.getting-started.latest docker/getting-started:latest</code>改写为docker程序：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/docker/docker/api/types"</span>
	<span class="token string">"github.com/docker/docker/api/types/container"</span>
	<span class="token string">"github.com/docker/docker/client"</span>
	<span class="token string">"github.com/docker/go-connections/nat"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	imageName <span class="token operator">:=</span> <span class="token string">"docker/getting-started:latest"</span>
	containerName <span class="token operator">:=</span> <span class="token string">"docker.getting-started.latest"</span>
	containerPort <span class="token operator">:=</span> nat<span class="token punctuation">.</span><span class="token function">Port</span><span class="token punctuation">(</span><span class="token string">"80"</span><span class="token punctuation">)</span>
	hostPort <span class="token operator">:=</span> <span class="token string">"9000"</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerCreate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span>
		<span class="token operator">&amp;</span>container<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
			Image<span class="token punctuation">:</span> imageName<span class="token punctuation">,</span>
			ExposedPorts<span class="token punctuation">:</span> nat<span class="token punctuation">.</span>PortSet<span class="token punctuation">{</span>
				containerPort<span class="token punctuation">:</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>container<span class="token punctuation">.</span>HostConfig<span class="token punctuation">{</span>
			PortBindings<span class="token punctuation">:</span> nat<span class="token punctuation">.</span>PortMap<span class="token punctuation">{</span>
				containerPort<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>nat<span class="token punctuation">.</span>PortBinding<span class="token punctuation">{</span> <span class="token comment">//</span>
					<span class="token punctuation">{</span>
						HostIP<span class="token punctuation">:</span>   <span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span>
						HostPort<span class="token punctuation">:</span> hostPort<span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> containerName<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerStart</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ContainerStartOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"containerID = %s\n"</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span>ID<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="读取日志" tabindex="-1"><a class="header-anchor" href="#读取日志" aria-hidden="true">#</a> 读取日志</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
   <span class="token string">"context"</span>
   <span class="token string">"io"</span>
   <span class="token string">"os"</span>

   <span class="token string">"github.com/docker/docker/api/types"</span>
   <span class="token string">"github.com/docker/docker/client"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">)</span>
   <span class="token comment">//remoteDockerDaemonAddress := "211.87.224.233:2375"</span>
   <span class="token comment">//cli, err := client.NewClientWithOpts(client.FromEnv, client.WithHost("tcp://"+remoteDockerDaemonAddress))</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   options <span class="token operator">:=</span> types<span class="token punctuation">.</span>ContainerLogsOptions<span class="token punctuation">{</span>
      ShowStdout<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      ShowStderr<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      Follow<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// Replace this ID with a container that really exists</span>
   out<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerLogs</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"87f42c0ab7f5"</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> out<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果将日志实时输出到websocket呢？如下：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"context"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>

	<span class="token string">"github.com/docker/docker/api/types"</span>
	<span class="token string">"github.com/docker/docker/client"</span>
	<span class="token string">"github.com/gorilla/websocket"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> DefaultBufferSize <span class="token operator">=</span> <span class="token number">4</span> <span class="token operator">*</span> <span class="token number">1024</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	out      io<span class="token punctuation">.</span>ReadCloser
	upgrader <span class="token operator">=</span> websocket<span class="token punctuation">.</span>Upgrader<span class="token punctuation">{</span>
		CheckOrigin<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span> <span class="token comment">// use default options</span>
	conn <span class="token operator">*</span>websocket<span class="token punctuation">.</span>Conn
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//cli, err := client.NewClientWithOpts(client.FromEnv)</span>
	remoteDockerDaemonAddress <span class="token operator">:=</span> <span class="token string">"211.87.224.233:2375"</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">WithHost</span><span class="token punctuation">(</span><span class="token string">"tcp://"</span><span class="token operator">+</span>remoteDockerDaemonAddress<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	options <span class="token operator">:=</span> types<span class="token punctuation">.</span>ContainerLogsOptions<span class="token punctuation">{</span>
		ShowStdout<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		ShowStderr<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		Follow<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// Replace this ID with a container that really exists</span>
	<span class="token comment">//out, err = cli.ContainerLogs(ctx, "8bfb9b8e2692", options) // local</span>
	out<span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerLogs</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"87f42c0ab7f5"</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span> <span class="token comment">// remote</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/logs"</span><span class="token punctuation">,</span> socketHandler<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">"localhost:8081"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">socketHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Upgrade our raw HTTP connection to a websocket based one</span>
	_conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> upgrader<span class="token punctuation">.</span><span class="token function">Upgrade</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"Error during connection upgradation:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	conn <span class="token operator">=</span> _conn
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>out<span class="token punctuation">)</span>
	<span class="token comment">// The event loop</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		message<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span>

		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token function">exitAndNotifyPeer</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token function">exitAndNotifyPeer</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// todo delete</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Log read is: %s"</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span>

		err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">WriteMessage</span><span class="token punctuation">(</span>websocket<span class="token punctuation">.</span>TextMessage<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error during message writing: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">exitAndNotifyPeer</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">,</span> exitCode <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	conn<span class="token punctuation">.</span><span class="token function">WriteMessage</span><span class="token punctuation">(</span>websocket<span class="token punctuation">.</span>CloseMessage<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span>exitCode<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考文档</p>
<p><a href="https://docs.docker.com/engine/api/sdk/examples/" target="_blank" rel="noopener noreferrer">一些小例子<ExternalLinkIcon/></a></p>
<p><a href="https://pkg.go.dev/github.com/docker/docker/client" target="_blank" rel="noopener noreferrer">Reference<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


