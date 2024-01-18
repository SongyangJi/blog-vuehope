<template><div><h1 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h1>
<h2 id="redis是什么" tabindex="-1"><a class="header-anchor" href="#redis是什么" aria-hidden="true">#</a> Redis是什么</h2>
<blockquote>
<p>Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API,是一个由Salvatore Sanfilippo写的key-value存储系统。</p>
</blockquote>
<ul>
<li><strong>Redis</strong> 即 <strong>Remote Dictionary Server</strong> （远程字典服务器），是一个以<strong>字典结构</strong>（<strong>key-value</strong>形式）存储数据的存储系统。</li>
<li>Redis 由 <strong>C语言</strong>编写而成，<strong>开源</strong>，简单稳定，代码量只有几万行，<strong>单线程</strong>模式工作，但性能强劲。</li>
</ul>
<h2 id="特性与优势" tabindex="-1"><a class="header-anchor" href="#特性与优势" aria-hidden="true">#</a> 特性与优势</h2>
<ul>
<li>Redis的数据都存储在内存中，<strong>读写速度快</strong>（相对于关系型数据库而言）。</li>
<li>Redis支持<strong>数据的持久化</strong>，可以将内存中的数据保存在磁盘中(<strong>异步写入</strong>)，重启的时候可以再次加载进行使用。</li>
<li>Redis 支持<strong>高级数据结构</strong>，如<strong>list，set，zset，hash</strong>（列表、集合、有序集合、散列）等数据结构的存储。</li>
<li>Redis支持<strong>数据的备份</strong>，即master-slave模式的数据备份。</li>
<li>Redis的所有操作都是<strong>原子性</strong>的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持<strong>事务</strong>，即原子性，通过MULTI和EXEC指令包起来。</li>
</ul>
<h2 id="功能角色" tabindex="-1"><a class="header-anchor" href="#功能角色" aria-hidden="true">#</a> 功能角色</h2>
<ul>
<li><strong>数据库</strong>,这也是它最开始的用途。</li>
<li><strong>缓存</strong>，Redis可以为每个键设置生存时间（Time To Live）TTL，这一功能可以让Redis扮演缓存系统的功能。</li>
<li><strong>高性能的优先队列</strong>，Redis的列表类型键可以用来实现队列，并且支持阻塞式读取。</li>
</ul>
<h1 id="安装与入门操作" tabindex="-1"><a class="header-anchor" href="#安装与入门操作" aria-hidden="true">#</a> 安装与入门操作</h1>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>MacOS中安装Redis很简单，使用包管理工具如HomeBrew即可，</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>brew install redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code v-pre>/usr/local/bin</code>下,我们可以看到这么几个可执行文件：</p>
<ul>
<li>redis-server <strong>Redis服务器</strong></li>
<li>redis-cli       <strong>Redis命令行客户端</strong></li>
<li>redis-benchmark	<strong>Redis性能测试工具</strong></li>
<li>redis-check-aof    <strong>AOF文件修复文件</strong></li>
<li>redis-check-rdb	<strong>RDB文件检查文件</strong></li>
<li>redis-sentinel       <strong>Sentinel服务器</strong></li>
</ul>
<figure><img src="https://img-blog.csdnimg.cn/20210118202017633.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>
<p>最常用的是 redis-server 和 redis-cli
其中</p>
<ul>
<li>redis-server是Redis的服务器，启动Redis也就是启动redis-server;</li>
<li>redis-cli是Redis<strong>自带的命令行客户端</strong>。</li>
</ul>
<h2 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>redis-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认是 6379端口。
会出现如下提示：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>51490:C 18 Jan 2021 20:25:26.344 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
51490:C 18 Jan 2021 20:25:26.345 # Redis version=6.0.9, bits=64, commit=00000000, modified=0, pid=51490, just started
51490:C 18 Jan 2021 20:25:26.345 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
51490:M 18 Jan 2021 20:25:26.346 * Increased maximum number of open files to 10032 (it was originally set to 256).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 6.0.9 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 51490
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

51490:M 18 Jan 2021 20:25:26.351 # Server initialized
51490:M 18 Jan 2021 20:25:26.353 * Loading RDB produced by version 6.0.9
51490:M 18 Jan 2021 20:25:26.353 * RDB age 623843 seconds
51490:M 18 Jan 2021 20:25:26.353 * RDB memory usage when created 1.02 Mb
51490:M 18 Jan 2021 20:25:26.353 * DB loaded from disk: 0.002 seconds
51490:M 18 Jan 2021 20:25:26.353 * Ready to accept connections


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>redis-server- --port 8888
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过--port自定义端口号。</p>
<h2 id="关闭redis" tabindex="-1"><a class="header-anchor" href="#关闭redis" aria-hidden="true">#</a> 关闭Redis</h2>
<ol>
<li>关闭服务器</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>redis-cli SHUTDOWN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为Redis此时可能正在将内存中的数据同步到硬盘，所以强行终止Redis进程可能导致数据丢失，所以应该让客户端请求关闭Redis。
当Redis收到 <code v-pre>SHUTDOWN</code>(小写的也是可以的)之后，</p>
<ol>
<li>先<strong>断开所有客户端连接</strong>。</li>
<li>根据配置执行<strong>持久化</strong>。</li>
<li>完成<strong>退出</strong>。</li>
</ol>
<p>在会看到如下提示。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>51578:M 18 Jan 2021 20:32:13.180 # User requested shutdown...
51578:M 18 Jan 2021 20:32:13.180 * Saving the final RDB snapshot before exiting.
51578:M 18 Jan 2021 20:32:13.182 * DB saved on disk
51578:M 18 Jan 2021 20:32:13.182 # Redis is now ready to exit, bye bye...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>退出客户端
使用<code v-pre>quit</code>即可</li>
</ol>
<h2 id="客户端的启动" tabindex="-1"><a class="header-anchor" href="#客户端的启动" aria-hidden="true">#</a> 客户端的启动</h2>
<p>通过redis-cli向Redis发送命令有两种方式</p>
<ol>
<li>
<p>将命令作为<code v-pre>redis-cli</code>的参数，比如上面的将SHUTDOWN作为参数。</p>
</li>
<li>
<p>不带参数的启动<code v-pre>redis-cli</code>，进入交互模式，自由输入命令，在输入多条命令时方便。</p>
</li>
</ol>
<p>-h、-p自定义地址和端口号。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>redis-cli -h 127.0.0.1 -p 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>在远程服务上执行命令</strong>
用密码password连接主机名为host，端口号为port的<strong>Redis</strong>服务</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>redis-cli -h host -p port -a password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="ping检测" tabindex="-1"><a class="header-anchor" href="#ping检测" aria-hidden="true">#</a> PING检测</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>127.0.0.1:6379> PING
PONG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>PING 命令，该命令用于检测 redis 服务是否启动。</p>
<h1 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h1>
<p>Redis 的配置文件位于 Redis 安装目录下，文件名为 redis.conf。
<img src="https://img-blog.csdnimg.cn/20210119134549587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0ODQ2MzI0,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p>
<h2 id="获取配置" tabindex="-1"><a class="header-anchor" href="#获取配置" aria-hidden="true">#</a> 获取配置</h2>
<ul>
<li><strong>获取所有配置</strong>
在进入redis客户端的交互模式后，输入:</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>CONFIG GET *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即可获取所有配置。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1) "rdbchecksum"
2) "yes"
3) "daemonize"
4) "no"
5) "io-threads-do-reads"
6) "no"
7) "lua-replicate-commands"
8) "yes"
9) "always-show-logo"
10) "no"
11) "protected-mode"
………………
291) "slaveof"
292) ""
293) "notify-keyspace-events"
294) ""
295) "bind"
296) ""
297) "requirepass"
298) ""
299) "oom-score-adj-values"
300) "0 200 800"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>获取单个配置信息：</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>127.0.0.1:6379> config get loglevel
1) "loglevel"
2) "notice"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一行是选项名，第二行是选项值。</p>
<h2 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置" aria-hidden="true">#</a> 修改配置</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>CONFIG SET config_setting_name new_config_value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>127.0.0.1:6379> config set loglevel warning
OK
127.0.0.1:6379> config get loglevel
1) "loglevel"
2) "warning"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="带配置启动" tabindex="-1"><a class="header-anchor" href="#带配置启动" aria-hidden="true">#</a> 带配置启动</h2>
<p>如果我们要修改的参数过多，可以直接修改配置文件（备份一开始的），然后带着配置文件启动。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>redis-server redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


