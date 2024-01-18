---
title: Linux磁盘满了解决方案
date: 2022-11-07 09:53:50
categories: Linux
tags:
  - 问题解决
---



1. 发现不能创建文件了

```sh
root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj# mkdir jsy
mkdir: cannot create directory ‘jsy’: No space left on device
```



2. 分析是磁盘空间不够用还是inode不够用

查看文件系统的硬盘空间使用率（block usage，block）

```sh
root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            914M     0  914M   0% /dev
tmpfs           189M   22M  167M  12% /run
/dev/vda1        40G   40G     0 100% /
tmpfs           943M     0  943M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           943M     0  943M   0% /sys/fs/cgroup
```

查看文件系统的inode使用率（block usage，block）

```sh
root@iZuf6h5bru0f6zsysev3zuZ:/home# df -i
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
udev            233972    384  233588    1% /dev
tmpfs           241188    527  240661    1% /run
/dev/vda1      2621440 162723 2458717    7% /
tmpfs           241188      1  241187    1% /dev/shm
tmpfs           241188      2  241186    1% /run/lock
tmpfs           241188     18  241170    1% /sys/fs/cgroup
```

由此可以发现，inode充足，但是由于一些大文件导致了空间不足



3. 找出那些大文件

   使用`du --max-depth=2 | sort -nr -k 1 | awk '$1>1024*1024 {print}'`

   含义是，在`/`下递归深度为2的找出那些大小超过1MB的文件并倒序输出，输出第一列为文件大小（单位字节），第二列为目录名。

```
root@iZuf6h5bru0f6zsysev3zuZ:/# du --max-depth=2 | sort -nr -k 1 | awk '$1>1024*1024 {print}'
41109700	.
35567412	./home
35567408	./home/sduoj
3203416	./usr
2153156	./usr/lib
1202160	./var
```



`ls`的`-S`选项可以按照文件大小顺序逆序列出。

```sh
ls -lhS
```





4. 删除

这一步就不细说了，使用`rm`小心一点。

或者使用`find`的`delete，参考文章(https://blog.csdn.net/10km/article/details/121652997)。



5. 检测是否删除成功

```sh
root@iZuf6h5bru0f6zsysev3zuZ:/home/sduoj/testMyJudgeServer/logs# df -lh
Filesystem      Size  Used Avail Use% Mounted on
udev            914M     0  914M   0% /dev
tmpfs           189M   22M  167M  12% /run
/dev/vda1        40G  7.0G   31G  19% /
tmpfs           943M     0  943M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           943M     0  943M   0% /sys/fs/cgroup
```

文件系统已经有空闲内存了。



**如果发现删除了文件，但是磁盘空间并没有释放呢?**

在Linux或者Unix系统中，通过rm或者文件管理器删除文件将会从文件系统的目录结构上解除链接(unlink).然而如果文件是被打开的（有一个进程正在使用），那么进程将仍然可以读取该文件，磁盘空间也一直被占用。

使用

```sh
lsof | grep deleted
```

查看那些被进程打开未被释放但是被删除的文件。

然后kill掉那些进程。





