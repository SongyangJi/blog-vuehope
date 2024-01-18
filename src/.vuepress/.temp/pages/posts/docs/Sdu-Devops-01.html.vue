<template><div><h1 id="系统平台信息" tabindex="-1"><a class="header-anchor" href="#系统平台信息" aria-hidden="true">#</a> 系统平台信息</h1>
<p>OS:  Linux Mint 20.3 Una</p>
<p>Kernel Release: 5.13.0-35-generic</p>
<p>Hardware Platform: x86_64</p>
<p>CPU Model Name:  Intel(R) Xeon(R) CPU E5-2680 v3 @ 2.50GHz</p>
<p>CPU Cores: 48</p>
<p>Main Memory: 125GB</p>
<p>IP: 211.87.224.233</p>
<h1 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h1>
<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h2>
<p>version 20.10.14</p>
<p>旧版本的 Docker</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> remove <span class="token function">docker</span> docker-engine docker.io containerd runc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="设置存储库" tabindex="-1"><a class="header-anchor" href="#设置存储库" aria-hidden="true">#</a> 设置存储库</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update

<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token punctuation">\</span>
    ca-certificates <span class="token punctuation">\</span>
    <span class="token function">curl</span> <span class="token punctuation">\</span>
    gnupg <span class="token punctuation">\</span>
    lsb-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里没有安装 docker-compose</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>apt-cache madison docker-ce</p>
<p>version = <code v-pre>5:20.10.16~3-0~ubuntu-focal</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>sudo apt-get install docker-ce=5:20.10.16~3-0~ubuntu-focal docker-ce-cli=5:20.10.16~3-0~ubuntu-focal containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>#1.配置阿里云的gpg
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

#2.配置阿里云的docker镜像
sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

#3.执行安装命令
sudo apt-get install docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker-Compose</h3>
<p>docker-compose version 1.29.2</p>
<p>安装</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>"</span> <span class="token parameter variable">-o</span> /usr/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加上可执行权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="go" tabindex="-1"><a class="header-anchor" href="#go" aria-hidden="true">#</a> Go</h2>
<p>go version go1.17.7 linux/amd6</p>
<h2 id="java" tabindex="-1"><a class="header-anchor" href="#java" aria-hidden="true">#</a> Java</h2>
<p>openjdk version &quot;1.8.0_312&quot;</p>
<p>path: /usr/lib/jvm/java-8-openjdk-amd64</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--config</span> <span class="token function">java</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#output</span>
There are <span class="token number">3</span> choices <span class="token keyword">for</span> the alternative <span class="token function">java</span> <span class="token punctuation">(</span>providing /usr/bin/java<span class="token punctuation">)</span>.

  Selection    Path                                            Priority   Status
------------------------------------------------------------
* <span class="token number">0</span>            /usr/lib/jvm/java-17-openjdk-amd64/bin/java      <span class="token number">1711</span>      auto mode
  <span class="token number">1</span>            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      <span class="token number">1111</span>      manual mode
  <span class="token number">2</span>            /usr/lib/jvm/java-17-openjdk-amd64/bin/java      <span class="token number">1711</span>      manual mode
  <span class="token number">3</span>            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java   <span class="token number">1081</span>      manual mode

Press <span class="token operator">&lt;</span>enter<span class="token operator">></span> to keep the current choice<span class="token punctuation">[</span>*<span class="token punctuation">]</span>, or <span class="token builtin class-name">type</span> selection number:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>java -version</code> 检查</p>
<h2 id="maven" tabindex="-1"><a class="header-anchor" href="#maven" aria-hidden="true">#</a> Maven</h2>
<p>Apache Maven 3.8.5</p>
<p>path: /opt/apache-maven-3.8.5</p>
<ul>
<li>jdk8编译插件配置</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>jdk-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jdk</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jdk</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>maven仓库源</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>alimaven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">></span></span>central<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>Aliyun maven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">></span></span>https://maven.aliyun.com/repository/central<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gitlab" tabindex="-1"><a class="header-anchor" href="#gitlab" aria-hidden="true">#</a> Gitlab</h2>
<p>使用docker安装 Gitlab</p>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> search gitlab/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull gitlab/gitlab-ce:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /srv/gitlab <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"export GITLAB_HOME=/srv/gitlab"</span> <span class="token operator">>></span> .profile <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">source</span> .profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>docker-compose.yml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.6'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span> 
  <span class="token key atrule">web</span><span class="token punctuation">:</span> 
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">'gitlab/gitlab-ce:latest'</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> sdu<span class="token punctuation">-</span>weblab<span class="token punctuation">-</span>gitlab
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> <span class="token string">'211.87.224.233'</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span> 
      <span class="token key atrule">GITLAB_OMNIBUS_CONFIG</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        external_url 'http://211.87.224.233:8929'
        gitlab_rails['gitlab_shell_ssh_port'] = 2224</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token string">'8929:8929'</span>
      <span class="token punctuation">-</span> <span class="token string">'2224:22'</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token string">'$GITLAB_HOME/config:/etc/gitlab'</span>
      <span class="token punctuation">-</span> <span class="token string">'$GITLAB_HOME/logs:/var/log/gitlab'</span>
      <span class="token punctuation">-</span> <span class="token string">'$GITLAB_HOME/data:/var/opt/gitlab'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意点:</p>
<p>external_url中的端口需要和ports映射的容器端口保持一致;</p>
<p>gitlab_rails['gitlab_shell_ssh_port']要和宿主机端口保持一致。</p>
<h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3>
<p>构建并启动</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> ./docker-compose.yml up <span class="token parameter variable">-d</span> <span class="token comment"># 如果文件名为`docker-compose.yml`可以不指定-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>强制重启</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> --force-recreate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重新构建并启动（反映yml的变化，一定是最新的）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> down <span class="token operator">&amp;&amp;</span> <span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：这个服务启动时间比较长，须等待一两分钟。</p>
<p>检查是否成功运行：浏览器访问 http://211.87.224.233:8929  (这个8989是映射的宿主机port，当然你可以映射成其他端口)</p>
<p>如果访问失败，注意云服务器的安全组或者firewall的端口开放情况（sudo ufw status）</p>
<h3 id="使用gitlab" tabindex="-1"><a class="header-anchor" href="#使用gitlab" aria-hidden="true">#</a> 使用Gitlab</h3>
<p>默认管理员账户：root</p>
<p>查看配置文件得到密码</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 注意我们已经配置好数据卷映射了</span>
<span class="token function">sudo</span> <span class="token function">cat</span> <span class="token variable">$GITLAB_HOME</span>/config/initial_root_password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以再去修改一下密码（设置为： sduweblab）</p>
<blockquote>
<p>https://docs.gitlab.com/ee/install/docker.html</p>
<p>https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template</p>
</blockquote>
<h4 id="new-project-create-blank-project" tabindex="-1"><a class="header-anchor" href="#new-project-create-blank-project" aria-hidden="true">#</a> [New project]-&gt;[Create blank project]</h4>
<h4 id="mac配置ssh登录" tabindex="-1"><a class="header-anchor" href="#mac配置ssh登录" aria-hidden="true">#</a> Mac配置ssh登录</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir .ssh % <span class="token function">ssh</span> <span class="token parameter variable">-p</span> <span class="token number">2224</span> <span class="token parameter variable">-T</span> git@211.87.224.233
ssh: connect to <span class="token function">host</span> <span class="token number">211.87</span>.224.233 port <span class="token number">2224</span>: Connection refused
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir .ssh % <span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@211.87.224.233
git@211.87.224.233's password:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jenkins" tabindex="-1"><a class="header-anchor" href="#jenkins" aria-hidden="true">#</a> Jenkins</h2>
<h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装</h3>
<p>jenkins: 2.346</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull jenkins/jenkins:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置-1" tabindex="-1"><a class="header-anchor" href="#配置-1" aria-hidden="true">#</a> 配置</h3>
<p>docker-compse yml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.6'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span> 
  <span class="token key atrule">jenkins</span><span class="token punctuation">:</span> 
    <span class="token key atrule">image</span><span class="token punctuation">:</span> jenkins/jenkins<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> sdu<span class="token punctuation">-</span>weblab<span class="token punctuation">-</span>jenkins<span class="token punctuation">-</span>latest
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token string">"18080:8080"</span>
      <span class="token punctuation">-</span> <span class="token string">"50000:50000"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/var/jenkins_home <span class="token comment"># jenkins:latest 的home目录，包括插件和配置等等</span>
      <span class="token punctuation">-</span> <span class="token string">'$MAVEN_HOME:/opt/maven'</span>
      <span class="token punctuation">-</span> <span class="token string">'$JAVA_HOME:/opt/java8'</span>
      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock
      <span class="token punctuation">-</span> /usr/bin/docker<span class="token punctuation">:</span>/usr/bin/docker
      <span class="token punctuation">-</span> /etc/docker/daemon.json<span class="token punctuation">:</span>/etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于jenkins承担了打包的任务，因此将宿主机的jdk和maven挂载上去（另一种做法是自定义一个包含jdk和maven的jenkins镜像，有待尝试）。</p>
<p>(其中有关docker的配置后面再解释)</p>
<h3 id="修改镜像源" tabindex="-1"><a class="header-anchor" href="#修改镜像源" aria-hidden="true">#</a> 修改镜像源</h3>
<p>否则大概率下载插件会失败！</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> data/hudson.model.UpdateCenter.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version='1.1' encoding='UTF-8'?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sites</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>site</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>default<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">></span></span>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>site</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sites</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动-1" tabindex="-1"><a class="header-anchor" href="#启动-1" aria-hidden="true">#</a> 启动</h3>
<p>启动之后，查看日志发现写数据卷的时候权限不够。（有可能）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> data/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>给足data文件夹权限。(奇怪的是，docker-compose restart的时候还是要发现写权限不够)</p>
<p>检查是否启动成功，访问 http://211.87.224.233:18080/</p>
<p><strong>进入容器</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> sdu-weblab-jenkins <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="登录jenkins" tabindex="-1"><a class="header-anchor" href="#登录jenkins" aria-hidden="true">#</a> 登录Jenkins</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 查看管理员日志密码（查看文件 or 使用docker-compose logs -f 查看日志）</span>
<span class="token function">cat</span> data/secrets/initialAdminPassword <span class="token comment"># 可能没有文件读权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>admin: f991e76fb99b4e3993ccdb52a9eaa8f7</p>
<h3 id="管理插件" tabindex="-1"><a class="header-anchor" href="#管理插件" aria-hidden="true">#</a> 管理插件</h3>
<p>入口：[Manage Jenkins]-&gt;[System Configuration]-&gt;[Manage Plugins]</p>
<p><strong>必备插件</strong></p>
<ul>
<li>Git Parameter</li>
<li>Publish Over SSH</li>
<li>Gitlab</li>
<li>Pipeline</li>
</ul>
<h3 id="全局配置" tabindex="-1"><a class="header-anchor" href="#全局配置" aria-hidden="true">#</a> 全局配置</h3>
<h4 id="manage-jenkins-global-tool-configuration" tabindex="-1"><a class="header-anchor" href="#manage-jenkins-global-tool-configuration" aria-hidden="true">#</a> [Manage Jenkins]-&gt;[Global Tool Configuration]</h4>
<p>配置jdk和maven的home。
其中MAVEN_HOME配置为<code v-pre>/opt/maven</code>; JAVA_HOME配置为<code v-pre>/opt/java8</code>（不错这两个文件夹其实是从宿主机映射过来的，其真实路径分别为宿主机的<code v-pre>$MAVEN_HOME</code>、<code v-pre>JAVA_HOME</code>，也就是<code v-pre>/opt/apache-maven-3.8.5</code>、<code v-pre>/usr/lib/jvm/java-8-openjdk-amd64</code>）</p>
<h4 id="manage-jenkins-configure-system-publish-over-ssh" tabindex="-1"><a class="header-anchor" href="#manage-jenkins-configure-system-publish-over-ssh" aria-hidden="true">#</a> [Manage Jenkins]-&gt;[Configure System]-&gt;[Publish over SSH]</h4>
<p>配置远程发布的机器，这里为了方便就配置本机即可。（这里在配置auth校验的时候最好使用密码校验，配置的私钥话可能因为不合规导致失败）</p>
<h3 id="在jenkins容器内使用docker" tabindex="-1"><a class="header-anchor" href="#在jenkins容器内使用docker" aria-hidden="true">#</a> 在Jenkins容器内使用docker</h3>
<p>两种方案，一种是在Jenkins镜像里就有docker，另一种是使用宿主机的docker。</p>
<p>这里我们采取后者。</p>
<blockquote>
<p>参考 https://www.dockone.io/article/431</p>
</blockquote>
<p>这里只讲操作不讲原因和原理。</p>
<p>第一步修改权限：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /var/run
<span class="token function">sudo</span> <span class="token function">chown</span> root:root docker.sock <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">chmod</span> o+rw docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步修改jenkins的docker-compose.yml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.6'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span> 
  <span class="token key atrule">jenkins</span><span class="token punctuation">:</span> 
    <span class="token key atrule">image</span><span class="token punctuation">:</span> jenkins/jenkins<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> sdu<span class="token punctuation">-</span>weblab<span class="token punctuation">-</span>jenkins<span class="token punctuation">-</span>latest
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token string">"18080:8080"</span>
      <span class="token punctuation">-</span> <span class="token string">"50000:50000"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/var/jenkins_home <span class="token comment"># jenkins:latest 的home目录，包括插件和配置等等</span>
      <span class="token punctuation">-</span> <span class="token string">'$MAVEN_HOME:/opt/maven'</span>
      <span class="token punctuation">-</span> <span class="token string">'$JAVA_HOME:/opt/java8'</span>
      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock
      <span class="token punctuation">-</span> /usr/bin/docker<span class="token punctuation">:</span>/usr/bin/docker
      <span class="token punctuation">-</span> /etc/docker/daemon.json<span class="token punctuation">:</span>/etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点就是挂载宿主机三个文件即可，至于这里为什么mount这三个就足够了，不做解释。</p>
<p>记住重启一下</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jsy@wzai:~$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> a6d580bfb4e1 <span class="token function">bash</span>
jenkins@a6d580bfb4e1:/$
jenkins@a6d580bfb4e1:/$
jenkins@a6d580bfb4e1:/$ <span class="token function">docker</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="harbor" tabindex="-1"><a class="header-anchor" href="#harbor" aria-hidden="true">#</a> Harbor</h2>
<h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载" aria-hidden="true">#</a> 下载</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/goharbor/harbor/releases/download/v2.5.0/harbor-offline-installer-v2.5.0.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装-2" tabindex="-1"><a class="header-anchor" href="#安装-2" aria-hidden="true">#</a> 安装</h3>
<p><strong>解压</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> harbor-offline-installer-v2.5.0.tgz <span class="token parameter variable">-C</span> ./
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解压结果</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jsy@wzai:~/devops$ <span class="token function">ls</span> harbor/
common.sh  harbor.v2.5.0.tar.gz  harbor.yml.tmpl  install.sh  LICENSE  prepare
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编辑配置文件</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> harbor.yml.tmpl harbor.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改hostname为主机ip，将htts相关内容注释掉（暂时不需要使用到https）、修改admin密码、修改http端口号。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>hostname: 211.87.224.233

http:
  # port for http, default is 80. If https enabled, this port will redirect to https port
  port: 8930
  
harbor_admin_password: admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>./prepare <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>install过程分为这么几步：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>[Step 0]: checking if docker is installed ...
[Step 1]: checking docker-compose is installed ...
[Step 2]: loading Harbor images ...
[Step 3]: preparing environment ...
[Step 4]: preparing harbor configs ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完毕后检查一下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jsy@wzai:~/devops/harbor$ <span class="token function">sudo</span> <span class="token function">docker-compose</span> <span class="token function">ps</span>
      Name                    Command                 State                  Ports
----------------------------------------------------------------------------------------------
harbor-core         /harbor/entrypoint.sh          Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>
harbor-db           /docker-entrypoint.sh <span class="token number">96</span> <span class="token number">13</span>    Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>
harbor-jobservice   /harbor/entrypoint.sh          Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>
harbor-log          /bin/sh <span class="token parameter variable">-c</span> /usr/local/bin/     Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>   <span class="token number">127.0</span>.0.1:1514-<span class="token operator">></span><span class="token number">10514</span>/tcp
                    <span class="token punctuation">..</span>.
harbor-portal       nginx <span class="token parameter variable">-g</span> daemon off<span class="token punctuation">;</span>           Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>
nginx               nginx <span class="token parameter variable">-g</span> daemon off<span class="token punctuation">;</span>           Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>   <span class="token number">0.0</span>.0.0:8930-<span class="token operator">></span><span class="token number">8080</span>/tcp,:::89
                                                                  <span class="token number">30</span>-<span class="token operator">></span><span class="token number">8080</span>/tcp
redis               redis-server /etc/redis.conf   Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>
registry            /home/harbor/entrypoint.sh     Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>
registryctl         /home/harbor/start.sh          Up <span class="token punctuation">(</span>healthy<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器访问检查</p>
<p>localhost:8930</p>
<h3 id="拉取-推送镜像" tabindex="-1"><a class="header-anchor" href="#拉取-推送镜像" aria-hidden="true">#</a> 拉取/推送镜像</h3>
<p>下一步使用docker login到私服，需要将私服的htp地址配置到docker的不安全register中；</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>写入</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"insecure-registries"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"211.87.224.233:8930"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>必须重启docker服务</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>镜像名称要求：私服地址/项目名/镜像名:版本</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]</span>
<span class="token function">docker</span> tag IMAGE_ID 私服地址/项目名/镜像名:版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>举例</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> tag hello-world <span class="token variable">$HARBOR_URL</span>/sdu-weblab/hello-world <span class="token comment"># 配置一下HARBOR_URL环境变量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查一下</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token function">docker</span> images 
<span class="token comment"># 211.87.224.233:8930/sdu-weblab/hello-world   latest             feb5d9fea6a5   7 months ago   13.3kB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 先登录后推送</span>
<span class="token function">docker</span> login <span class="token parameter variable">-u</span> admin <span class="token parameter variable">-p</span> admin <span class="token variable">$HARBOR_URL</span>
<span class="token function">docker</span> push <span class="token number">211.87</span>.224.233:8930/sdu-weblab/hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推送成功</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jsy@wzai:~$ <span class="token function">docker</span> push <span class="token number">211.87</span>.224.233:8930/sdu-weblab/hello-world
Using default tag: latest
The push refers to repository <span class="token punctuation">[</span><span class="token number">211.87</span>.224.233:8930/sdu-weblab/hello-world<span class="token punctuation">]</span>
e07ee1baac5f: Pushed
latest: digest: sha256:f54a58bc1aac5ea1a25d796ae155dc228b3f0e11d046ae276b39c4bf2f13d8c4 size: <span class="token number">525</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拉取镜像也是一样的。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 先删除本地的</span>
<span class="token function">docker</span> image <span class="token function">rm</span> <span class="token number">211.87</span>.224.233:8930/sdu-weblab/hello-world
<span class="token comment"># 直接粘贴浏览器的命令</span>
<span class="token function">docker</span> pull <span class="token number">211.87</span>.224.233:8930/sdu-weblab/hello-world@sha256:f54a58bc1aac5ea1a25d796ae155dc228b3f0e11d046ae276b39c4bf2f13d8c4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>https://github.com/jenkinsci/docker/blob/master/README.md</p>
</blockquote>
</div></template>


