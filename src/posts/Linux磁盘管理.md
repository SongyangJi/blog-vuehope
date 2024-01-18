---
title: Linux磁盘与文件系统管理
date: 2022-11-07 09:16:07
categories: Linux
tags:
---



# 硬盘



## fdisk
> fdisk: 操作磁盘分区表

```shell
fdisk -l
fdisk -l | grep Disk
```




```shell
root@iZuf6h5bru0f6zsysev3zuZ:/# fdisk -l
Disk /dev/vda: 40 GiB, 42949672960 bytes, 83886080 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x13be70fb

Device     Boot Start      End  Sectors Size Id Type
/dev/vda1  *     2048 83886046 83883999  40G 83 Linux
```



## df

> df: report file system disk space usage
>
> usage: df [OPTION]... [FILE]...

df 以**磁盘分区**为单位查看文件系统，可以获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

例如，我们使用**df -h**命令来查看磁盘信息， **-h** 选项为根据大小适当显示：

显示内容参数说明：

+ **Filesystem**：文件系统
+ **Size**： 分区大小
+ **Used**： 已使用容量
+ **Avail**： 还可以使用的容量
+ **Use%**： 已用百分比
+ **Mounted on**： 挂载点　

**相关命令：**

+ **df -hl**：查看磁盘剩余空间
+ **df -h**：查看每个根路径的分区大小



实例`df -h`

```sh
Filesystem      Size  Used Avail Use% Mounted on
udev            914M     0  914M   0% /dev
tmpfs           189M   22M  167M  12% /run
/dev/vda1        40G   40G     0 100% /
tmpfs           943M     0  943M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           943M     0  943M   0% /sys/fs/cgroup
```



- **-i**: 展示inode

## du

> du: estimate file space usage



**du** 的英文原义为 **disk usage**，含义为显示磁盘空间的使用情况，用于查看当前目录的总大小。

例如查看当前目录的大小：

```
# du -sh
605M    .
```

显示指定文件所占空间：

```
# du log2012.log 
300     log2012.log
```

方便阅读的格式显示test目录所占空间情况：

```
# du -h test
608K    test/test6
308K    test/test4
4.0K    test/scf/lib
4.0K    test/scf/service/deploy/product
4.0K    test/scf/service/deploy/info
12K     test/scf/service/deploy
16K     test/scf/service
4.0K    test/scf/doc
4.0K    test/scf/bin
32K     test/scf
8.0K    test/test3
1.3M    test
```

du 命令用于查看当前目录的总大小：

+ **-s**：对每个Names参数只给出占用的数据块总数。
+ **-a**：递归地显示指定目录中各文件及子目录中各文件占用的数据块数。**若既不指定-s，也不指定-a，则只显示Names中的每一个目录及其中的各子目录所占的磁盘块数。**
+ **-b**：以字节为单位列出磁盘空间使用情况（系统默认以k字节为单位）。
+ **-k**：以1024字节为单位列出磁盘空间使用情况。
+ **-c**：最后再加上一个总计（系统默认设置）。
+ **-l**：计算所有的文件大小，对硬链接文件，则计算多次。
+ **-x**：跳过在不同文件系统上的目录不予统计。
+ **-h**：以K，M，G为单位，提高信息的可读性。
+ **--max-depth**: 超过指定层数的目录后，予以忽略。



常用的

+ **du -sh [目录名]**：返回该目录的大小
+ **du -sm [文件夹]**：返回该文件夹总M数
+ **du -h [目录名]**：查看指定文件夹下的所有文件大小（包含子文件夹）



实例

```sh
root@iZuf6h5bru0f6zsysev3zuZ:/# du -sh -c
du: cannot access './proc/271257/task/271257/fd/4': No such file or directory
du: cannot access './proc/271257/task/271257/fdinfo/4': No such file or directory
du: cannot access './proc/271257/fd/3': No such file or directory
du: cannot access './proc/271257/fdinfo/3': No such file or directory
40G	.
40G	total
```



如果需要排序呢？

```sh
root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj# du | sort -n -r -k 1
35567408	.
35566168	./testMyJudgeServer
35548224	./testMyJudgeServer/logs
18620304	./testMyJudgeServer/logs/service-log
16927848	./testMyJudgeServer/logs/platform-log
16927808	./testMyJudgeServer/logs/platform-log/2021-11
16881936	./testMyJudgeServer/logs/service-log/2021-11
1738324	./testMyJudgeServer/logs/service-log/2021-10
1132	./sduoj-sandbox
832	./sduoj-sandbox/build
492	./sduoj-sandbox/build/objects
300	./sduoj-sandbox/build/bin
264	./sduoj-sandbox/src
184	./sduoj-sandbox/src/argtable
```



## dumpe2fs
> dumpe2fs  prints the super block and blocks group information for the filesystem present on device.


```sh
root@iZuf6h5bru0f6zsysev3zuZ:/home# dumpe2fs /dev/vda1 | head -n 50
dumpe2fs 1.45.5 (07-Jan-2020)
Filesystem volume name:   /
Last mounted on:          /
Filesystem UUID:          abf381e7-98ce-491f-85d5-f16aa9b23811
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent flex_bg sparse_super large_file huge_file dir_nlink extra_isize
Filesystem flags:         signed_directory_hash
Default mount options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              2621440
Block count:              10485499
Reserved block count:     471818
Free blocks:              4097
Free inodes:              2458600
First block:              0
Block size:               4096
Fragment size:            4096
Reserved GDT blocks:      1021
Blocks per group:         32768
Fragments per group:      32768
Inodes per group:         8192
Inode blocks per group:   512
Flex block group size:    16
Filesystem created:       Thu Mar 18 14:35:58 2021
Last mount time:          Wed Apr 27 15:48:37 2022
Last write time:          Wed Apr 27 23:48:37 2022
Mount count:              10
Maximum mount count:      -1
Last checked:             Thu Mar 18 14:35:58 2021
Check interval:           0 (<none>)
Lifetime writes:          2705 GB
Reserved blocks uid:      0 (user root)
Reserved blocks gid:      0 (group root)
First inode:              11
Inode size:	          256
Required extra isize:     32
Desired extra isize:      32
Journal inode:            8
Default directory hash:   half_md4
Directory Hash Seed:      79fdb20b-e5e8-4438-8721-e0c49cef8222
Journal backup:           inode blocks
Journal features:         journal_incompat_revoke
Journal size:             128M
Journal length:           32768
Journal sequence:         0x003cf420
Journal start:            549
```