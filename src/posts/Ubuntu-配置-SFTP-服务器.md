---
title: Ubuntu 配置 SFTP 服务器
date: 2021-08-01
categories: Linux
tags: 
  - Linux配置
  - FTP
---



# 安装SFTP服务

>sftp是Secure File Transfer Protocol的缩写，安全文件传送协议。可以为传输文件提供一种安全的网络的加密方法。**sftp 与 ftp 有着几乎一样的语法和功能。**SFTP 为 SSH的其中一部分，是一种传输档案至 Blogger 伺服器的安全方式。其实**在SSH软件包中，已经包含了一个叫作SFTP(Secure File Transfer Protocol)的安全文件信息传输子系统**。 **SFTP本身没有单独的守护进程，它必须使用sshd守护进程（端口号默认是22）来完成相应的连接和答复操作，所以从某种意义上来说，SFTP并不像一个服务器程序，而更像是一个客户端程序。**SFTP同样是使用加密传输认证信息和传输的数据，所以，使用SFTP是非常安全的。但是**，由于这种传输方式使用了加密/解密技术，所以传输效率比普通的FTP要低得多**，如果您对网络安全性要求更高时，可以使用SFTP代替FTP。



Ubuntu默认只安装openssh-client，需要手动安装openssh-server或者sftp-server。

```bash
sudo apt update
sudo apt install openssh-server
```



# 目标

在Ubuntu系统上开通sftp文件服务，允许某些用户上传及下载文件。

但是这些用户只能使用sftp传输文件，不能使用SSH终端访问服务器，并且sftp不能访问系统文件。

系统管理员则既能使用sftp传输文件，也能使用SSH远程管理服务器。



# 操作步骤

## sftp用户、用户组的创建
+ 添加sftp用户，创建 sftp 用户组

```bash
sudo adduser alice
sudo addgroup sftp-users
# 将alice从所有其他用户组中移除并加入到sftp-users组，并且关闭其Shell访问
#/bin/false也可以替换为/sbin/nologin，目的是不允许该用户登录到系统中
sudo usermod -G sftp-users -s /bin/false alice
```



+ 创建sftp服务器的管理员身份，并且加入 ssh用户组（不限制他的shell操作权限）

```bash
sudo adduser admin
sudo addgroup ssh-users
# -a 表示以追加形式将 admin 加入 ssh-users 
sudo usermod -a -G ssh-users admin
```


## 创建文件服务器目录
+ 创建服务器文件目录

```bash
# 创建监狱目录
sudo mkdir /home/sftp_root
# 普通用户能够写入的共享文件目录
sudo mkdir /home/sftp_root/shared
# 设置共享文件夹的拥有者为管理员、用户组为 sftp-users
sudo chown admin:sftp-users /home/sftp_root/shared
# 拥有者、sftp用户组的成员具有一切权限
sudo chmod 770 /home/sftp_root/shared
```



默认允许所有用户或者用户组登录，若仅允许指定用户或者用户组访问，按照以下格式配置。
```bash
# 以空格间隔
AllowUsers user1 user2 
AllowGroups group1 group2 
```

## 权限配置
```bash
sudo vim /etc/ssh/sshd_config
```

在sshd_config文件的最后，添加以下内容：

```bash
AllowGroups ssh-users sftp-users
Match Group sftp-users
ChrootDirectory /home/sftp_root
AllowTcpForwarding no
X11Forwarding no
ForceCommand internal-sftp
```

这样配置的目的是：

+ 只允许ssh-uers及sftp-users通过SSH访问系统，其中ssh-uers用户组可以使用ssh，并且不受其他限制。

  而SFTP用户组仅能使用SFTP进行访问，且不能使用shell

+ 针对sftp-users用户，额外增加一些设置：将“/home/sftp_root”设置为该组用户的系统根目录（因此它们将不能访问该目录之外的其他系统文件;

+ 禁止TCP Forwarding和X11 Forwarding

另外需要注意的是：**ChrootDirectory的权限问题，你设定的目录必须是root用户所有**，否则就会出现问题。所以请确保sftp用户根目录的所有人是root, 权限是 750 或者 755。



需要注意的一点的是，现在所有需要远程连接的用户都必须加入 ssh-users 才行。

如将用户 songyangji 加入 ，这样ta就可以使用ssh连接本机。

```bash
sudo usermod -a -G ssh-users songyangji
```

+ **限制ssh连接的访问IP**

仍然是

```bash
sudo vim /etc/ssh/sshd_config
```



```bash
# Authentication:
AllowUsers root@10.10.10.*        #限制root用户只能通过10.10.10.*网段登录访问
AllowUsers charles@10.10.10.*        #限制charles用户只能通过10.10.10.*网段登录访问
AllowUsers john@10.10.10.*
```


# 重启SSH

```bash
# 亦可
# /etc/init.d/ssh restart
service ssh restart
```





> 参考博客
>
> [搭建sftp服务器](https://www.jianshu.com/p/6b588a712513)
