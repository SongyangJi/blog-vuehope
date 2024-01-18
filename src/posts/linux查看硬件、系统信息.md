---
title: Linux查看系统信息——内存、CPU、磁盘
date: 2022-05-02 21:00:00
categories: Linux
tags:
  - 系统监控
---


# 1. 查看操作系统

```shell
cat /etc/issue
```

```shell
lsb_release -a
```



# 2. 查看内存信息

```shell
cat /proc/meminfo
```

```shell
# output
MemTotal:        4009020 kB
MemFree:          135628 kB
MemAvailable:    1925688 kB
Buffers:          282728 kB
Cached:          1324092 kB
SwapCached:         1612 kB
Active:           807888 kB
Inactive:        2533284 kB
Active(anon):      43472 kB
Inactive(anon):  1709556 kB
Active(file):     764416 kB
Inactive(file):   823728 kB
Unevictable:        6976 kB
Mlocked:               0 kB
SwapTotal:       2097148 kB
SwapFree:        2052092 kB
Dirty:             16828 kB
Writeback:             0 kB
AnonPages:       1739820 kB
Mapped:           482588 kB
Shmem:             26376 kB
KReclaimable:     385472 kB
Slab:             458420 kB
SReclaimable:     385472 kB
SUnreclaim:        72948 kB
KernelStack:       12944 kB
PageTables:        22444 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     4101656 kB
Committed_AS:    6306356 kB
VmallocTotal:   133143461888 kB
VmallocUsed:       27320 kB
VmallocChunk:          0 kB
Percpu:             1360 kB
HardwareCorrupted:     0 kB
AnonHugePages:         0 kB
ShmemHugePages:        0 kB
ShmemPmdMapped:        0 kB
FileHugePages:         0 kB
FilePmdMapped:         0 kB
CmaTotal:          32768 kB
CmaFree:           30140 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
Hugetlb:               0 kB
```



```shell
# 默认
free
```



```shell
              总计         已用        空闲      共享    缓冲/缓存    可用
内存：     4009020     1889432      115696       26380     2003892     1917212
交换：     2097148       46848     2050300
```



# 3. 查看CPU信息
1. 查看物理CPU个数

```shell
cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l
```

2. 查看每个物理CPU中core的个数(即核数)

```shell
cat /proc/cpuinfo | grep "cpu cores" | uniq
```

3. 查看逻辑CPU的个数

```shell
cat /proc/cpuinfo | grep "processor" | wc -l
```

4. 查看CPU信息（型号）

```shell
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
```

5. 查看是否开启超线程技术（只有intel的处理器支持）
如果启用此技术那么，每个物理核心又可分为两个逻辑处理器。
```shell
cat /proc/cpuinfo | grep -e "cpu cores"  -e "siblings" | sort | uniq
```
如果cpu cores数量和siblings数量一致，则没有启用超线程，否则超线程被启用。

# 4. 查看CPU的负载
平均负载是指上一分钟同时处于就绪状态的平均进程数。

如果CPU Load等于CPU个数乘以核数，那么就说CPU正好满负载，再多一点，可能就要出问题了，有些任务不能被及时分配处理器，那要保证响应时间的话，最好要小于CPU个数X核数X0.7。

Load Average是指CPU的Load。它所包含的信息是在一段时间内CPU正在处理及等待CPU处理的进程数之和的统计信息，也就是CPU使用队列的长度的统计信息。
Load Average的值应该小于CPU个数X核数X0.7，
Load Average会有3个状态平均值，分别是1分钟、5分钟和15分钟平均Load。

如果1分钟平均出现大于CPU个数X核数的情况，还不需要担心；如果5分钟的平均也是这样，那就要警惕了；15分钟的平均也是这样，就要分析哪里出现问题，防范未然。
查看CPU负载信息，使用`top`命令

```shell
# output
top - 15:50:31 up 4 days, 23:43, 1 user, load average: 0.51, 0.29, 0.37
Tasks: 492 total,  1 running, 490 sleeping,  1 stopped,  0 zombie
Cpu(s): 6.4%us, 0.1%sy, 0.0%ni, 93.4%id, 0.1%wa, 0.0%hi, 0.0%si, 0.0%st
Mem: 65973912k total, 32468632k used, 33505280k free,  906712k buffers
Swap: 41943032k total,  13204k used, 41929828k free, 6434448k cached
```


>  MacOS查看信息
> ```shell
> top -l 1 | head -n 10
> ```



# 5. 硬盘
```shell
fdisk -l
fdisk -l |grep Disk
```


```shell
# output
Disk /dev/sda: 500.1 GB, 500107862016 bytes
255 heads, 63 sectors/track, 60801 cylinders, total 976773168 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disk identifier: 0x00023728

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2148351     1073152   83  Linux
/dev/sda2         2148352    21680127     9765888   82  Linux swap / Solaris
/dev/sda3        21680128   177930239    78125056   83  Linux
/dev/sda4       177932286   976771071   399419393    5  Extended/dev/sda5       177932288   412305407   117186560   83  Linux
/dev/sda6       412307456   976771071   282231808   83  Linux
```





>  https://www.cnblogs.com/ggjucheng/archive/2013/01/14/2859613.html

 补：

```shell
uname -a # 查看内核/操作系统/CPU信息(含x86_64表示32位机器,i686表示32位机器)
head -n 1 /etc/issue # 查看操作系统版本，是数字1不是字母L
cat /proc/cpuinfo # 查看CPU信息的linux系统信息命令
hostname # 查看计算机名的linux系统信息命令
lspci -tv # 列出所有PCI设备
lsusb -tv # 列出所有USB设备的linux系统信息命令
lsmod # 列出加载的内核模块
env # 查看环境变量资源
free -m # 查看内存使用量和交换区使用量
df -h # 查看各分区使用情况
du -sh # 查看指定目录的大小
grep MemTotal /proc/meminfo # 查看内存总量
grep MemFree /proc/meminfo # 查看空闲内存量
uptime # 查看系统运行时间、用户数、负载
cat /proc/loadavg # 查看系统负载磁盘和分区
mount | column -t # 查看挂接的分区状态
fdisk -l # 查看所有分区
swapon -s # 查看所有交换分区
hdparm -i /dev/hda # 查看磁盘参数(仅适用于IDE设备)
dmesg | grep IDE # 查看启动时IDE设备检测状况网络
ifconfig # 查看所有网络接口的属性
iptables -L # 查看防火墙设置
route -n # 查看路由表
netstat -lntp # 查看所有监听端口
netstat -antp # 查看所有已经建立的连接
netstat -s # 查看网络统计信息进程
ps -ef # 查看所有进程
top # 实时显示进程状态用户
w # 查看活动用户
id # 查看指定用户信息
last # 查看用户登录日志
cut -d: -f1 /etc/passwd # 查看系统所有用户
cut -d: -f1 /etc/group # 查看系统所有组
crontab -l # 查看当前用户的计划任务服务
chkconfig –list # 列出所有系统服务
chkconfig –list | grep on # 列出所有启动的系统服务程序
rpm -qa # 查看所有安装的软件包
cat /proc/cpuinfo ：查看CPU相关参数的linux系统命令
cat /proc/partitions ：查看linux硬盘和分区信息的系统信息命令
cat /proc/meminfo ：查看linux系统内存信息的linux系统命令
cat /proc/version ：查看版本，类似uname -r
cat /proc/ioports ：查看设备io端口
cat /proc/interrupts ：查看中断
cat /proc/pci ：查看pci设备的信息
cat /proc/swaps ：查看所有swap分区的信息 
```

