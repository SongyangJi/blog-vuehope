<template><div><h1 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h1>
<h2 id="erlang节点与应用程序" tabindex="-1"><a class="header-anchor" href="#erlang节点与应用程序" aria-hidden="true">#</a> Erlang节点与应用程序</h2>
<p>Erlang节点指的是Erlang虚拟机运行erlang程序的Erlang虚拟机实例。</p>
<p>和Java不同，同一个Erlang节点可以运行多个erlang程序。</p>
<h2 id="rabbitmq节点" tabindex="-1"><a class="header-anchor" href="#rabbitmq节点" aria-hidden="true">#</a> RabbitMQ节点</h2>
<p>RabbitMQ节点包含Erlang节点和rabbitmq程序两个概念。</p>
<h1 id="启动、关闭" tabindex="-1"><a class="header-anchor" href="#启动、关闭" aria-hidden="true">#</a> 启动、关闭</h1>
<p>将 rabbitmq的安装目录下的 ./sbin加入PATH变量后。</p>
<ul>
<li>启动</li>
</ul>
<p>下面的命令就会同时启动 Rabbit和erlang实例。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmq-server <span class="token parameter variable">-detached</span> <span class="token comment"># -detached表示后台启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>关闭节点</li>
</ul>
<p>下面的命令会将整个Rabbit节点关闭，包括erlang实例。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>打开应用程序</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl start_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>关闭应用程序
仅停止rabbitmq应用程序。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl stop_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h1>
<p>mac通过brew安装、Ubuntu通过apt安装可能通过 rabbitmq-env.conf文件中的<code v-pre>CONFIG_FILE</code>配置项去找到配置文件。</p>
<p><a href="https://www.rabbitmq.com/configure.html" target="_blank" rel="noopener noreferrer">配置文档参考<ExternalLinkIcon/></a></p>
<p>默认情况下，通过上述安装方式是没有按照配置文件的，需要自行配置。</p>
<p><a href="https://github.com/rabbitmq/rabbitmq-server/blob/master/docs/rabbitmq.conf.example" target="_blank" rel="noopener noreferrer">rabbitmq.conf.example下载地址<ExternalLinkIcon/></a></p>
<h1 id="使用-rabbitmqctl" tabindex="-1"><a class="header-anchor" href="#使用-rabbitmqctl" aria-hidden="true">#</a> 使用 rabbitmqctl</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 查看手册</span>
rabbitmqctl <span class="token parameter variable">--help</span>
<span class="token comment"># 查看某个具体的命令如何使用</span>
rabbitmqctl <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="请求许可" tabindex="-1"><a class="header-anchor" href="#请求许可" aria-hidden="true">#</a> 请求许可</h2>
<h3 id="管理用户" tabindex="-1"><a class="header-anchor" href="#管理用户" aria-hidden="true">#</a> 管理用户</h3>
<blockquote>
<p>这里展示出最常用的</p>
</blockquote>
<ul>
<li>添加用户</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl add_user <span class="token punctuation">{</span>user_name<span class="token punctuation">}</span> <span class="token punctuation">{</span>password<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>删除用户</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl delete_user <span class="token punctuation">{</span>user_name<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>查看所有用户</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl list_users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="权限相关" tabindex="-1"><a class="header-anchor" href="#权限相关" aria-hidden="true">#</a> 权限相关</h3>
<ul>
<li>分配权限</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl set_permissions <span class="token parameter variable">-p</span> <span class="token punctuation">{</span>vhost<span class="token punctuation">}</span> <span class="token punctuation">{</span>username<span class="token punctuation">}</span> <span class="token punctuation">{</span>conf<span class="token punctuation">}</span> <span class="token punctuation">{</span>write<span class="token punctuation">}</span> <span class="token punctuation">{</span>read<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 分配给 alice 用户所有权限</span>
rabbitmqctl set_permissions <span class="token parameter variable">-p</span> / alice <span class="token string">".*"</span> <span class="token string">".*"</span> <span class="token string">"*"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>清除权限</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl clear_permissions <span class="token parameter variable">-p</span> <span class="token punctuation">{</span>vhost<span class="token punctuation">}</span> <span class="token punctuation">{</span>username<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>查看权限</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rabbitmqctl list_permissions <span class="token parameter variable">-p</span> <span class="token punctuation">{</span>vhost<span class="token punctuation">}</span>
rabbitmqctl list_user_permissions <span class="token punctuation">{</span>username<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="操作demo" tabindex="-1"><a class="header-anchor" href="#操作demo" aria-hidden="true">#</a> 操作Demo</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir ~ % <span class="token function">sudo</span> rabbitmqctl add_user jsy-mac0 <span class="token number">8888</span>
Password:
Adding user <span class="token string">"jsy-mac0"</span> <span class="token punctuation">..</span>.
Done. Don<span class="token string">'t forget to grant the user permissions to some virtual hosts! See '</span>rabbitmqctl <span class="token builtin class-name">help</span> set_permissions' to learn more.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir ~ % <span class="token function">sudo</span> rabbitmqctl set_user_tags jsy-mac0 administrator
Password:
Setting tags <span class="token keyword">for</span> user <span class="token string">"jsy-mac0"</span> to <span class="token punctuation">[</span>administrator<span class="token punctuation">]</span> <span class="token punctuation">..</span>.

<span class="token comment">#然后就可以通过http://host:15672 登录management界面管理rabbitmq了，但此时用户jsy-mac0还没有访问队列资源的权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir ~ % rabbitmqctl set_permissions <span class="token parameter variable">-p</span> / jsy-mac0 <span class="token string">".*"</span> <span class="token string">".*"</span> <span class="token string">".*"</span>
Setting permissions <span class="token keyword">for</span> user <span class="token string">"jsy-mac0"</span> <span class="token keyword">in</span> vhost <span class="token string">"/"</span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>songyangji@SongyangJi-Ubuntu-DeskStop:~$ <span class="token function">sudo</span> rabbitmqctl add_user mac <span class="token number">8888</span>
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> songyangji 的密码： 
Adding user <span class="token string">"mac"</span> <span class="token punctuation">..</span>.
songyangji@SongyangJi-Ubuntu-DeskStop:~$ <span class="token function">sudo</span> rabbitmqctl set_user_tags mac administrator
Setting tags <span class="token keyword">for</span> user <span class="token string">"mac"</span> to <span class="token punctuation">[</span>administrator<span class="token punctuation">]</span> <span class="token punctuation">..</span>.
songyangji@SongyangJi-Ubuntu-DeskStop:~$ <span class="token function">sudo</span> rabbitmqctl set_permissions <span class="token parameter variable">-p</span> /  mac <span class="token string">".*"</span> <span class="token string">".*"</span> <span class="token string">".*"</span>
Setting permissions <span class="token keyword">for</span> user <span class="token string">"mac"</span> <span class="token keyword">in</span> vhost <span class="token string">"/"</span> <span class="token punctuation">..</span>.
songyangji@SongyangJi-Ubuntu-DeskStop:~$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Usage

rabbitmqctl <span class="token punctuation">[</span>--node <span class="token operator">&lt;</span>node<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--timeout <span class="token operator">&lt;</span>timeout<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--longnames<span class="token punctuation">]</span> <span class="token punctuation">[</span>--quiet<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>command options<span class="token operator">></span><span class="token punctuation">]</span>

Available commands:

Help:

   autocomplete                  Provides <span class="token builtin class-name">command</span> name autocomplete variants
   <span class="token builtin class-name">help</span>                          Displays usage information <span class="token keyword">for</span> a <span class="token builtin class-name">command</span>
   version                       Displays CLI tools version

Nodes:

   await_startup                 Waits <span class="token keyword">for</span> the RabbitMQ application to start on the target <span class="token function">node</span>
   reset                         Instructs a RabbitMQ <span class="token function">node</span> to leave the cluster and <span class="token builtin class-name">return</span> to its virgin state
   rotate_logs                   Does nothing <span class="token punctuation">[</span>deprecated<span class="token punctuation">]</span>
   <span class="token function">shutdown</span>                      Stops RabbitMQ and its runtime <span class="token punctuation">(</span>Erlang VM<span class="token punctuation">)</span>. Monitors progress <span class="token keyword">for</span> <span class="token builtin class-name">local</span> nodes. Does not require a PID <span class="token function">file</span> path.
   start_app                     Starts the RabbitMQ application but leaves the runtime <span class="token punctuation">(</span>Erlang VM<span class="token punctuation">)</span> running
   stop                          Stops RabbitMQ and its runtime <span class="token punctuation">(</span>Erlang VM<span class="token punctuation">)</span>. Requires a <span class="token builtin class-name">local</span> <span class="token function">node</span> pid <span class="token function">file</span> path to monitor progress.
   stop_app                      Stops the RabbitMQ application, leaving the runtime <span class="token punctuation">(</span>Erlang VM<span class="token punctuation">)</span> running
   <span class="token function">wait</span>                          Waits <span class="token keyword">for</span> RabbitMQ <span class="token function">node</span> startup by monitoring a <span class="token builtin class-name">local</span> PID file. See also <span class="token string">'rabbitmqctl await_online_nodes'</span>

Cluster:

   await_online_nodes            Waits <span class="token keyword">for</span> <span class="token operator">&lt;</span>count<span class="token operator">></span> nodes to <span class="token function">join</span> the cluster
   change_cluster_node_type      Changes the <span class="token builtin class-name">type</span> of the cluster <span class="token function">node</span>
   cluster_status                Displays all the nodes <span class="token keyword">in</span> the cluster grouped by <span class="token function">node</span> type, together with the currently running nodes
   force_boot                    Forces <span class="token function">node</span> to start even <span class="token keyword">if</span> it cannot contact or rejoin any of its previously known peers
   force_reset                   Forcefully returns a RabbitMQ <span class="token function">node</span> to its virgin state
   forget_cluster_node           Removes a <span class="token function">node</span> from the cluster
   join_cluster                  Instructs the <span class="token function">node</span> to become a member of the cluster that the specified <span class="token function">node</span> is <span class="token keyword">in</span>
   rename_cluster_node           Renames cluster nodes <span class="token keyword">in</span> the <span class="token builtin class-name">local</span> database
   update_cluster_nodes          Instructs a cluster member <span class="token function">node</span> to <span class="token function">sync</span> the list of known cluster members from <span class="token operator">&lt;</span>seed_node<span class="token operator">></span>

Replication:

   cancel_sync_queue             Instructs a synchronising mirrored queue to stop synchronising itself
   sync_queue                    Instructs a mirrored queue with unsynchronised mirrors <span class="token punctuation">(</span>follower replicas<span class="token punctuation">)</span> to synchronise them

Users:

   add_user                      Creates a new user <span class="token keyword">in</span> the internal database. This user will have no permissions <span class="token keyword">for</span> any virtual hosts by default.
   authenticate_user             Attempts to authenticate a user. Exits with a non-zero code <span class="token keyword">if</span> authentication fails.
   change_password               Changes the user password
   clear_password                Clears <span class="token punctuation">(</span>resets<span class="token punctuation">)</span> password and disables password login <span class="token keyword">for</span> a user
   clear_user_limits             Clears user connection/channel limits
   delete_user                   Removes a user from the internal database. Has no effect on <span class="token function">users</span> provided by external backends such as LDAP
   list_user_limits              Displays configured user limits
   list_users                    List user names and tags
   set_user_limits               Sets user limits
   set_user_tags                 Sets user tags

Access Control:

   clear_permissions             Revokes user permissions <span class="token keyword">for</span> a vhost
   clear_topic_permissions       Clears user topic permissions <span class="token keyword">for</span> a vhost or exchange
   list_permissions              Lists user permissions <span class="token keyword">in</span> a virtual <span class="token function">host</span>
   list_topic_permissions        Lists topic permissions <span class="token keyword">in</span> a virtual <span class="token function">host</span>
   list_user_permissions         Lists permissions of a user across all virtual hosts
   list_user_topic_permissions   Lists user topic permissions
   list_vhosts                   Lists virtual hosts
   set_permissions               Sets user permissions <span class="token keyword">for</span> a vhost
   set_topic_permissions         Sets user topic permissions <span class="token keyword">for</span> an exchange

Monitoring, observability and health checks:

   list_bindings                 Lists all bindings on a vhost
   list_channels                 Lists all channels <span class="token keyword">in</span> the <span class="token function">node</span>
   list_ciphers                  Lists cipher suites supported by encoding commands
   list_connections              Lists AMQP <span class="token number">0.9</span>.1 connections <span class="token keyword">for</span> the <span class="token function">node</span>
   list_consumers                Lists all consumers <span class="token keyword">for</span> a vhost
   list_exchanges                Lists exchanges
   list_hashes                   Lists <span class="token builtin class-name">hash</span> functions supported by encoding commands
   list_node_auth_attempt_stats  Lists authentication attempts on the target <span class="token function">node</span>
   list_queues                   Lists queues and their properties
   list_unresponsive_queues      Tests queues to respond within timeout. Lists those <span class="token function">which</span> did not respond
   <span class="token function">ping</span>                          Checks that the <span class="token function">node</span> OS process is up, registered with EPMD and CLI tools can authenticate with it
   report                        Generate a server status report containing a concatenation of all server status information <span class="token keyword">for</span> support purposes
   schema_info                   Lists schema database tables and their properties
   status                        Displays status of a <span class="token function">node</span>

Parameters:

   clear_global_parameter        Clears a global runtime parameter
   clear_parameter               Clears a runtime parameter.
   list_global_parameters        Lists global runtime parameters
   list_parameters               Lists runtime parameters <span class="token keyword">for</span> a virtual <span class="token function">host</span>
   set_global_parameter          Sets a runtime parameter.
   set_parameter                 Sets a runtime parameter.

Policies:

   clear_operator_policy         Clears an operator policy
   clear_policy                  Clears <span class="token punctuation">(</span>removes<span class="token punctuation">)</span> a policy
   list_operator_policies        Lists operator policy overrides <span class="token keyword">for</span> a virtual <span class="token function">host</span>
   list_policies                 Lists all policies <span class="token keyword">in</span> a virtual <span class="token function">host</span>
   set_operator_policy           Sets an operator policy that overrides a subset of arguments <span class="token keyword">in</span> user policies
   set_policy                    Sets or updates a policy

Virtual hosts:

   add_vhost                     Creates a virtual <span class="token function">host</span>
   clear_vhost_limits            Clears virtual <span class="token function">host</span> limits
   delete_vhost                  Deletes a virtual <span class="token function">host</span>
   list_vhost_limits             Displays configured virtual <span class="token function">host</span> limits
   restart_vhost                 Restarts a failed vhost data stores and queues
   set_vhost_limits              Sets virtual <span class="token function">host</span> limits
   set_vhost_tags                Sets virtual <span class="token function">host</span> tags
   trace_off
   trace_on

Configuration and Environment:

   decode                        Decrypts an encrypted configuration value
   encode                        Encrypts a sensitive configuration value
   environment                   Displays the name and value of each variable <span class="token keyword">in</span> the application environment <span class="token keyword">for</span> each running application
   set_cluster_name              Sets the cluster name
   set_disk_free_limit           Sets the disk_free_limit setting
   set_log_level                 Sets log level <span class="token keyword">in</span> the running <span class="token function">node</span>
   set_vm_memory_high_watermark  Sets the vm_memory_high_watermark setting

Definitions:

   export_definitions            Exports definitions <span class="token keyword">in</span> JSON or compressed Erlang Term Format.
   import_definitions            Imports definitions <span class="token keyword">in</span> JSON or compressed Erlang Term Format.

Feature flags:

   enable_feature_flag           Enables a feature flag or all supported feature flags on the target <span class="token function">node</span>
   list_feature_flags            Lists feature flags

Operations:

   close_all_connections         Instructs the broker to close all connections <span class="token keyword">for</span> the specified vhost or entire RabbitMQ <span class="token function">node</span>
   close_all_user_connections    Instructs the broker to close all connections of the specified user
   close_connection              Instructs the broker to close the connection associated with the Erlang process <span class="token function">id</span>
   <span class="token builtin class-name">eval</span>                          Evaluates a snippet of Erlang code on the target <span class="token function">node</span>
   eval_file                     Evaluates a <span class="token function">file</span> that contains a snippet of Erlang code on the target <span class="token function">node</span>
   <span class="token builtin class-name">exec</span>                          Evaluates a snippet of Elixir code on the CLI <span class="token function">node</span>
   force_gc                      Makes all Erlang processes on the target <span class="token function">node</span> perform/schedule a full sweep garbage collection
   resume_listeners              Resumes client connection listeners making them accept client connections again
   suspend_listeners             Suspends client connection listeners so that no new client connections are accepted

Queues:

   delete_queue                  Deletes a queue
   purge_queue                   Purges a queue <span class="token punctuation">(</span>removes all messages <span class="token keyword">in</span> it<span class="token punctuation">)</span>

AMQP <span class="token number">1.0</span> plugin:

   list_amqp10_connections       Lists AMQP <span class="token number">1.0</span> connections on the target <span class="token function">node</span>

MQTT plugin:

   decommission_mqtt_node        Removes cluster member and permanently deletes its cluster-wide MQTT state
   list_mqtt_connections         Lists MQTT connections on the target <span class="token function">node</span>

STOMP plugin:

   list_stomp_connections        Lists STOMP connections on the target <span class="token function">node</span>

Deprecated:

   hipe_compile                  DEPRECATED. This <span class="token builtin class-name">command</span> is a no-op. HiPE is no longer supported by modern Erlang versions
   node_health_check             DEPRECATED. Performs intrusive, opinionated health checks on a fully booted node. See https://www.rabbitmq.com/monitoring.html<span class="token comment">#health-checks instead</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考博客</p>
<p><a href="https://www.jianshu.com/p/b5f8057a1cd5" target="_blank" rel="noopener noreferrer">Rabbitmq用户权限配置<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


