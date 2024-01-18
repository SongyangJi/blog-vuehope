---
title: 运行、管理、配置RabbitMQ
date: 2021-10-10
categories: 消息中间件
tags:
  - Message Queue
  - RabbitMQ
---

# 基本概念
## Erlang节点与应用程序

Erlang节点指的是Erlang虚拟机运行erlang程序的Erlang虚拟机实例。

和Java不同，同一个Erlang节点可以运行多个erlang程序。

## RabbitMQ节点
RabbitMQ节点包含Erlang节点和rabbitmq程序两个概念。


# 启动、关闭
将 rabbitmq的安装目录下的 ./sbin加入PATH变量后。

+ 启动

下面的命令就会同时启动 Rabbit和erlang实例。
```shell
rabbitmq-server -detached # -detached表示后台启动
```

+ 关闭节点

下面的命令会将整个Rabbit节点关闭，包括erlang实例。
```shell
rabbitmqctl stop
```

+ 打开应用程序
```shell
rabbitmqctl start_app
```


+ 关闭应用程序
仅停止rabbitmq应用程序。
```shell
rabbitmqctl stop_app
```

# 配置

mac通过brew安装、Ubuntu通过apt安装可能通过 rabbitmq-env.conf文件中的`CONFIG_FILE`配置项去找到配置文件。

[配置文档参考](https://www.rabbitmq.com/configure.html)

默认情况下，通过上述安装方式是没有按照配置文件的，需要自行配置。

[rabbitmq.conf.example下载地址](https://github.com/rabbitmq/rabbitmq-server/blob/master/docs/rabbitmq.conf.example)



# 使用 rabbitmqctl
```shell
# 查看手册
rabbitmqctl --help
# 查看某个具体的命令如何使用
rabbitmqctl <command> --help
```

## 请求许可

### 管理用户

> 这里展示出最常用的

+ 添加用户
```shell
rabbitmqctl add_user {user_name} {password}
```

+ 删除用户
```shell
rabbitmqctl delete_user {user_name}
```

+ 查看所有用户
```shell
rabbitmqctl list_users
```



### 权限相关
+ 分配权限
```shell
rabbitmqctl set_permissions -p {vhost} {username} {conf} {write} {read}
```
举例
```shell
# 分配给 alice 用户所有权限
rabbitmqctl set_permissions -p / alice ".*" ".*" "*"
```


+ 清除权限
```shell
rabbitmqctl clear_permissions -p {vhost} {username}
```

+ 查看权限
```shell
rabbitmqctl list_permissions -p {vhost}
rabbitmqctl list_user_permissions {username}
```



# 操作Demo

```bash
jisongyang@SongyangJi-MacBookAir ~ % sudo rabbitmqctl add_user jsy-mac0 8888
Password:
Adding user "jsy-mac0" ...
Done. Don't forget to grant the user permissions to some virtual hosts! See 'rabbitmqctl help set_permissions' to learn more.
```


```bash
jisongyang@SongyangJi-MacBookAir ~ % sudo rabbitmqctl set_user_tags jsy-mac0 administrator
Password:
Setting tags for user "jsy-mac0" to [administrator] ...

#然后就可以通过http://host:15672 登录management界面管理rabbitmq了，但此时用户jsy-mac0还没有访问队列资源的权限
```


```bash
jisongyang@SongyangJi-MacBookAir ~ % rabbitmqctl set_permissions -p / jsy-mac0 ".*" ".*" ".*"
Setting permissions for user "jsy-mac0" in vhost "/" ...
```


```bash
songyangji@SongyangJi-Ubuntu-DeskStop:~$ sudo rabbitmqctl add_user mac 8888
[sudo] songyangji 的密码： 
Adding user "mac" ...
songyangji@SongyangJi-Ubuntu-DeskStop:~$ sudo rabbitmqctl set_user_tags mac administrator
Setting tags for user "mac" to [administrator] ...
songyangji@SongyangJi-Ubuntu-DeskStop:~$ sudo rabbitmqctl set_permissions -p /  mac ".*" ".*" ".*"
Setting permissions for user "mac" in vhost "/" ...
songyangji@SongyangJi-Ubuntu-DeskStop:~$ 
```




# 附录

```shell
Usage

rabbitmqctl [--node <node>] [--timeout <timeout>] [--longnames] [--quiet] <command> [<command options>]

Available commands:

Help:

   autocomplete                  Provides command name autocomplete variants
   help                          Displays usage information for a command
   version                       Displays CLI tools version

Nodes:

   await_startup                 Waits for the RabbitMQ application to start on the target node
   reset                         Instructs a RabbitMQ node to leave the cluster and return to its virgin state
   rotate_logs                   Does nothing [deprecated]
   shutdown                      Stops RabbitMQ and its runtime (Erlang VM). Monitors progress for local nodes. Does not require a PID file path.
   start_app                     Starts the RabbitMQ application but leaves the runtime (Erlang VM) running
   stop                          Stops RabbitMQ and its runtime (Erlang VM). Requires a local node pid file path to monitor progress.
   stop_app                      Stops the RabbitMQ application, leaving the runtime (Erlang VM) running
   wait                          Waits for RabbitMQ node startup by monitoring a local PID file. See also 'rabbitmqctl await_online_nodes'

Cluster:

   await_online_nodes            Waits for <count> nodes to join the cluster
   change_cluster_node_type      Changes the type of the cluster node
   cluster_status                Displays all the nodes in the cluster grouped by node type, together with the currently running nodes
   force_boot                    Forces node to start even if it cannot contact or rejoin any of its previously known peers
   force_reset                   Forcefully returns a RabbitMQ node to its virgin state
   forget_cluster_node           Removes a node from the cluster
   join_cluster                  Instructs the node to become a member of the cluster that the specified node is in
   rename_cluster_node           Renames cluster nodes in the local database
   update_cluster_nodes          Instructs a cluster member node to sync the list of known cluster members from <seed_node>

Replication:

   cancel_sync_queue             Instructs a synchronising mirrored queue to stop synchronising itself
   sync_queue                    Instructs a mirrored queue with unsynchronised mirrors (follower replicas) to synchronise them

Users:

   add_user                      Creates a new user in the internal database. This user will have no permissions for any virtual hosts by default.
   authenticate_user             Attempts to authenticate a user. Exits with a non-zero code if authentication fails.
   change_password               Changes the user password
   clear_password                Clears (resets) password and disables password login for a user
   clear_user_limits             Clears user connection/channel limits
   delete_user                   Removes a user from the internal database. Has no effect on users provided by external backends such as LDAP
   list_user_limits              Displays configured user limits
   list_users                    List user names and tags
   set_user_limits               Sets user limits
   set_user_tags                 Sets user tags

Access Control:

   clear_permissions             Revokes user permissions for a vhost
   clear_topic_permissions       Clears user topic permissions for a vhost or exchange
   list_permissions              Lists user permissions in a virtual host
   list_topic_permissions        Lists topic permissions in a virtual host
   list_user_permissions         Lists permissions of a user across all virtual hosts
   list_user_topic_permissions   Lists user topic permissions
   list_vhosts                   Lists virtual hosts
   set_permissions               Sets user permissions for a vhost
   set_topic_permissions         Sets user topic permissions for an exchange

Monitoring, observability and health checks:

   list_bindings                 Lists all bindings on a vhost
   list_channels                 Lists all channels in the node
   list_ciphers                  Lists cipher suites supported by encoding commands
   list_connections              Lists AMQP 0.9.1 connections for the node
   list_consumers                Lists all consumers for a vhost
   list_exchanges                Lists exchanges
   list_hashes                   Lists hash functions supported by encoding commands
   list_node_auth_attempt_stats  Lists authentication attempts on the target node
   list_queues                   Lists queues and their properties
   list_unresponsive_queues      Tests queues to respond within timeout. Lists those which did not respond
   ping                          Checks that the node OS process is up, registered with EPMD and CLI tools can authenticate with it
   report                        Generate a server status report containing a concatenation of all server status information for support purposes
   schema_info                   Lists schema database tables and their properties
   status                        Displays status of a node

Parameters:

   clear_global_parameter        Clears a global runtime parameter
   clear_parameter               Clears a runtime parameter.
   list_global_parameters        Lists global runtime parameters
   list_parameters               Lists runtime parameters for a virtual host
   set_global_parameter          Sets a runtime parameter.
   set_parameter                 Sets a runtime parameter.

Policies:

   clear_operator_policy         Clears an operator policy
   clear_policy                  Clears (removes) a policy
   list_operator_policies        Lists operator policy overrides for a virtual host
   list_policies                 Lists all policies in a virtual host
   set_operator_policy           Sets an operator policy that overrides a subset of arguments in user policies
   set_policy                    Sets or updates a policy

Virtual hosts:

   add_vhost                     Creates a virtual host
   clear_vhost_limits            Clears virtual host limits
   delete_vhost                  Deletes a virtual host
   list_vhost_limits             Displays configured virtual host limits
   restart_vhost                 Restarts a failed vhost data stores and queues
   set_vhost_limits              Sets virtual host limits
   set_vhost_tags                Sets virtual host tags
   trace_off
   trace_on

Configuration and Environment:

   decode                        Decrypts an encrypted configuration value
   encode                        Encrypts a sensitive configuration value
   environment                   Displays the name and value of each variable in the application environment for each running application
   set_cluster_name              Sets the cluster name
   set_disk_free_limit           Sets the disk_free_limit setting
   set_log_level                 Sets log level in the running node
   set_vm_memory_high_watermark  Sets the vm_memory_high_watermark setting

Definitions:

   export_definitions            Exports definitions in JSON or compressed Erlang Term Format.
   import_definitions            Imports definitions in JSON or compressed Erlang Term Format.

Feature flags:

   enable_feature_flag           Enables a feature flag or all supported feature flags on the target node
   list_feature_flags            Lists feature flags

Operations:

   close_all_connections         Instructs the broker to close all connections for the specified vhost or entire RabbitMQ node
   close_all_user_connections    Instructs the broker to close all connections of the specified user
   close_connection              Instructs the broker to close the connection associated with the Erlang process id
   eval                          Evaluates a snippet of Erlang code on the target node
   eval_file                     Evaluates a file that contains a snippet of Erlang code on the target node
   exec                          Evaluates a snippet of Elixir code on the CLI node
   force_gc                      Makes all Erlang processes on the target node perform/schedule a full sweep garbage collection
   resume_listeners              Resumes client connection listeners making them accept client connections again
   suspend_listeners             Suspends client connection listeners so that no new client connections are accepted

Queues:

   delete_queue                  Deletes a queue
   purge_queue                   Purges a queue (removes all messages in it)

AMQP 1.0 plugin:

   list_amqp10_connections       Lists AMQP 1.0 connections on the target node

MQTT plugin:

   decommission_mqtt_node        Removes cluster member and permanently deletes its cluster-wide MQTT state
   list_mqtt_connections         Lists MQTT connections on the target node

STOMP plugin:

   list_stomp_connections        Lists STOMP connections on the target node

Deprecated:

   hipe_compile                  DEPRECATED. This command is a no-op. HiPE is no longer supported by modern Erlang versions
   node_health_check             DEPRECATED. Performs intrusive, opinionated health checks on a fully booted node. See https://www.rabbitmq.com/monitoring.html#health-checks instead
```





> 参考博客
>
> [Rabbitmq用户权限配置](https://www.jianshu.com/p/b5f8057a1cd5)

