---
title: ulimit
date: 2022-04-26 21:29:48
tags:
  - linux
  - 资源限制
---

# ulimit
  系统性能一直是一个受关注的话题，如何通过最简单的设置来实现最有效的性能调优，如何在有限资源的条件下保证程序的运作，ulimit 是我们在处理这些问题时，经常使用的一种**简单手段**。ulimit 是一种 Linux 系统的内键功能，它具有一套参数集，用于为由**它生成的 shell进程及其子进程**的资源使用设置限制。




## ulimit命令
ulimit 通过一些参数选项来管理不同种类的系统资源。
ulimit 命令的格式为：ulimit [options] [limit]

```
选项 含义
 
-a 显示当前系统所有的limit资源信息。 
 
-H 设置硬资源限制，一旦设置不能增加。例如：ulimit – Hs 64；限制硬资源，线程栈大小为 64K。
 
-S 设置软资源限制，设置后可以增加，但是不能超过硬资源设置。例如：ulimit – Sn 32；限制软资源，32 个文件描述符。
 
-c 最大的core文件的大小，以 blocks 为单位。例如：ulimit – c unlimited； 对生成的 core 文件的大小不进行限制。
 
-f 进程可以创建文件的最大值，以blocks 为单位.例如：ulimit – f 2048；限制进程可以创建的最大文件大小为 2048 blocks。
 
-d 进程最大的数据段的大小，以Kbytes 为单位。例如：ulimit -d unlimited；对进程的数据段大小不进行限制。
 
-m 最大内存大小，以Kbytes为单位。例如：ulimit – m unlimited；对最大内存不进行限制。
 
-n 可以打开的最大文件描述符的数量。例如：ulimit – n 128；限制最大可以使用 128 个文件描述符
 
-s 线程栈大小，以Kbytes为单位。例如:ulimit – s 512；限制线程栈的大小为 512 Kbytes。
 
-p 管道缓冲区的大小，以Kbytes 为单位。例如ulimit – p 512；限制管道缓冲区的大小为 512 Kbytes。
 
-u 用户最大可用的进程数。例如 limit – u 65536；限制用户最多可以使用 65536个进程。
 
-v 进程最大可用的虚拟内存，以Kbytes 为单位。ulimit – v 200000；限制最大可用的虚拟内存为 200000 Kbytes。
 
-t 最大CPU占用时间，以秒为单位。ulimit – t unlimited；对最大的 CPU 占用时间不进行限制。
 
-l 最大可加锁内存大小，以Kbytes 为单位。
```

## 使用ulimit的几种方案

### 在用户的启动脚本中

        如果用户使用的是 bash，就可以在用户的目录下的 .bashrc 文件中，加入 ulimit – u 64，来限制用户最多可以使用 64 个进程。此外，可以在与 .bashrc 功能相当的启动脚本中加入 ulimt。


### 在应用程序的启动脚本中

如果用户要对某个应用程序 myapp 进行限制，可以写一个简单的脚本 startmyapp。

ulimit – s 512
myapp

以后只要通过脚本 startmyapp 来启动应用程序，就可以限制应用程序 myapp 的线程栈大小为 512K。

 

### 直接在控制台输入 

ulimit – p 256 

限制管道的缓冲区为 256K。

### 修改所有 linux 用户的环境变量文件：
```
    vi /etc/profile

    ulimit -u 10000

    ulimit -n 4096

    ulimit -d unlimited

    ulimit -m unlimited

    ulimit -s unlimited

    ulimit -t unlimited

    ulimit -v unlimited
```
 保存后运行#source /etc/profile 使其生效

### 也可以针对单个用户的.bash_profile设置：
```
vi ~./.bash_profile

ulimit -n 1024
```
重新登陆ok


## 限制资源的作用范围
ulimit 作为对资源使用限制的一种工作，是有其作用范围的。那么，它限制的对象是单个用户，单个进程，还是整个系统呢？事实上，ulimit 限制的是当前 shell 进程以及其派生的子进程。举例来说，如果用户同时运行了两个 shell 终端进程，只在其中一个环境中执行了 ulimit – s 100，则该 shell 进程里创建文件的大小收到相应的限制，而同时另一个 shell终端包括其上运行的子程序都不会受其影响。


### 针对用户永久生效

那么，是否有针对某个具体用户的资源加以限制的方法呢？答案是有的，方法是通过修改系统的 /etc/security/limits.conf配置文件。该文件不仅能限制指定用户的资源使用，还能限制指定组的资源使用。该文件的每一行都是对限定的一个描述。
imits.conf的格式如下：

```
<domain>                  <type>      <item>     <value> 
username|@groupname       type        resource          limit
```
domain：username|@groupname：设置需要被限制的用户名，组名前面加@和用户名区别。也可以用通配符*来做所有用户的限制。

type：有 soft，hard 和 -，soft 指的是当前系统生效的设置值。hard 表明系统中所能设定的最大值。soft 的最大值不能超过hard的值。用 – 就表明同时设置了 soft 和 hard 的值。

resource：
    core – 限制内核文件的大小
    date – 最大数据大小
    fsize – 最大文件大小
    memlock – 最大锁定内存地址空间
    nofile – 打开文件的最大数目
    rss – 最大持久设置大小
    stack – 最大栈大小
    cpu – 以分钟为单位的最多 CPU 时间
    noproc – 进程的最大数目（系统的最大进程数）
    as – 地址空间限制
    maxlogins – 此用户允许登录的最大数目
要使 limits.conf 文件配置生效，必须要确保 pam_limits.so 文件被加入到启动文件中。
查看 /etc/pam.d/login 文件中有：session required /lib/security/pam_limits.so
