<template><div><h1 id="安装、配置" tabindex="-1"><a class="header-anchor" href="#安装、配置" aria-hidden="true">#</a> 安装、配置</h1>
<h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装" aria-hidden="true">#</a> 下载安装</h2>
<p><a href="https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz" target="_blank" rel="noopener noreferrer">下载链接<ExternalLinkIcon/></a></p>
<p>下载、解压之后，目录结构如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir apache-zookeeper-3.7.0-bin % <span class="token function">ls</span> <span class="token parameter variable">-el</span>
total <span class="token number">48</span>
-rw-r--r--@  <span class="token number">1</span> <span class="token number">1000</span>        <span class="token number">1000</span>   <span class="token number">11358</span>  <span class="token number">3</span> <span class="token number">17</span>  <span class="token number">2021</span> LICENSE.txt
-rw-r--r--@  <span class="token number">1</span> <span class="token number">1000</span>        <span class="token number">1000</span>     <span class="token number">432</span>  <span class="token number">3</span> <span class="token number">17</span>  <span class="token number">2021</span> NOTICE.txt
-rw-r--r--@  <span class="token number">1</span> <span class="token number">1000</span>        <span class="token number">1000</span>    <span class="token number">2214</span>  <span class="token number">3</span> <span class="token number">17</span>  <span class="token number">2021</span> README.md
-rw-r--r--@  <span class="token number">1</span> <span class="token number">1000</span>        <span class="token number">1000</span>    <span class="token number">3570</span>  <span class="token number">3</span> <span class="token number">17</span>  <span class="token number">2021</span> README_packaging.md
drwxr-xr-x@ <span class="token number">18</span> jisongyang  <span class="token number">1000</span>     <span class="token number">576</span>  <span class="token number">8</span> <span class="token number">12</span> <span class="token number">19</span>:55 bin
drwxr-xr-x@  <span class="token number">6</span> <span class="token number">1000</span>        <span class="token number">1000</span>     <span class="token number">192</span>  <span class="token number">8</span> <span class="token number">12</span> 03:39 conf
drwxr-xr-x@ <span class="token number">25</span> <span class="token number">1000</span>        <span class="token number">1000</span>     <span class="token number">800</span>  <span class="token number">3</span> <span class="token number">17</span>  <span class="token number">2021</span> docs
drwxr-xr-x  <span class="token number">60</span> root        wheel   <span class="token number">1920</span>  <span class="token number">8</span> <span class="token number">11</span> <span class="token number">18</span>:41 lib
drwxr-xr-x   <span class="token number">5</span> root        wheel    <span class="token number">160</span>  <span class="token number">9</span> <span class="token number">12</span> <span class="token number">12</span>:49 logs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>照往常一样，配置一下环境变量。</p>
<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>
<p>要启动需要一个配置文件，在 conf 在创建：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> zoo_sample.cfg zoo.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="单机运行" tabindex="-1"><a class="header-anchor" href="#单机运行" aria-hidden="true">#</a> 单机运行</h2>
<h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3>
<p>因为我放在了 /usr/local 目录下，加上sudo。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> zkServer start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看状态" tabindex="-1"><a class="header-anchor" href="#查看状态" aria-hidden="true">#</a> 查看状态</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>zkServer status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里的standalone指的是单机模。</p>
<h3 id="关闭" tabindex="-1"><a class="header-anchor" href="#关闭" aria-hidden="true">#</a> 关闭</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> zkServer stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="客户端相关" tabindex="-1"><a class="header-anchor" href="#客户端相关" aria-hidden="true">#</a> 客户端相关</h1>
<h2 id="zkcli" tabindex="-1"><a class="header-anchor" href="#zkcli" aria-hidden="true">#</a> zkCli</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bin/zkCli.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定服务器。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bin/zkCli.sh <span class="token parameter variable">-server</span> <span class="token number">127.0</span>.0.1:2181
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然还有其他启动参数，不再一一介绍。</p>
<p>输入<code v-pre>help</code>,查看命令：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>[zkshell: 0] help
ZooKeeper -server host:port cmd args
addauth scheme auth
close
config [-c] [-w] [-s]
connect host:port
create [-s] [-e] [-c] [-t ttl] path [data] [acl]
delete [-v version] path
deleteall path
delquota [-n|-b] path
get [-s] [-w] path
getAcl [-s] path
getAllChildrenNumber path
getEphemerals path
history
listquota path
ls [-s] [-w] [-R] path
ls2 path [watch]
printwatches on|off
quit
reconfig [-s] [-v version] [[-file path] | [-members serverID=host:port1:port2;port3[,...]*]] | [-add serverId=host:port1:port2;port3[,...]]* [-remove serverId[,...]*]
redo cmdno
removewatches path [-c|-d|-a] [-l]
rmr path
set [-s] [-v version] path data
setAcl [-s] [-v version] [-R] path acl
setquota -n|-b val path
stat [-w] path
sync path
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最简单的如<code v-pre>ls /</code>命令列出所有节点。</p>
<h2 id="zkui" tabindex="-1"><a class="header-anchor" href="#zkui" aria-hidden="true">#</a> zkui</h2>
<ul>
<li>下载</li>
</ul>
<p>下载链接：https://github.com/DeemOpen/zkui</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/DeemOpen/zkui.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>安装</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> zkui/ <span class="token comment"># 进入工程界面</span>
mvn clean <span class="token function">install</span> <span class="token comment"># 进行maven打包，执行成功后会生成target文件夹，其中有jar文件。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>配置</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># zkui web页面访问端口</span>
<span class="token assign-left variable">serverPort</span><span class="token operator">=</span><span class="token number">9090</span>

<span class="token comment"># zookeeper集群的IP地址和端口（这里配置为单机模式）</span>
<span class="token assign-left variable">zkServer</span><span class="token operator">=</span>localhost:2181

<span class="token comment"># 设置登录zkui的用户名和密码，这里我们将用户名和密码都设置为admin</span>
userSet <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"users"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token string">"username"</span><span class="token builtin class-name">:</span><span class="token string">"admin"</span> , <span class="token string">"password"</span><span class="token builtin class-name">:</span><span class="token string">"admin"</span>,<span class="token string">"role"</span><span class="token builtin class-name">:</span> <span class="token string">"ADMIN"</span> <span class="token punctuation">}</span>,<span class="token punctuation">{</span> <span class="token string">"username"</span><span class="token builtin class-name">:</span><span class="token string">"appconfig"</span> , <span class="token string">"password"</span><span class="token builtin class-name">:</span><span class="token string">"appconfig"</span>,<span class="token string">"role"</span><span class="token builtin class-name">:</span> <span class="token string">"USER"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>启动</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> target/zkui-2.0-SNAPSHOT-jar-with-dependencies.jar <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h1>
<p><a href="https://zookeeper.apache.org/" target="_blank" rel="noopener noreferrer">Zookeeper官网<ExternalLinkIcon/></a></p>
<p><a href="http://ningg.top/zookeeper-getting-started/" target="_blank" rel="noopener noreferrer">ZooKeeper 初探：安装、使用<ExternalLinkIcon/></a></p>
<p><a href="https://www.jianshu.com/p/746799d3db07" target="_blank" rel="noopener noreferrer">安装zkui<ExternalLinkIcon/></a></p>
</div></template>


