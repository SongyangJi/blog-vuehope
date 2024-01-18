---
title: 对Jsch的Seession与Channel的线程安全性的测试
date: 2021-08-02
categories: FTP
tags: 
---

+ + 10000个文件(每个文件只有 12 byte)

  1. 1 session 1 channel
     串行： 37 s
     并行(4 核)： 死锁
     或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)
     等各种异常
  2. 1 session n channels
     串行：200 s
     并行(4 核)：25 s (但是文件下载有丢失)
   3. n sessions 1 channel
      串行：1200 s
      并行(4 核)：320 s
  
  

+ 100个文件(每个文件有 12 MB)
	1. 1 session 1 channel
   串行： 19 s
    并行(4 核)： 死锁
    或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)
    等各种异常, 总之文件传输失败
  
  2. 1 session n channels
     串行：20 s
     并行(4 核)：18s (但是文件下载有丢失)
  
  3. n sessions 1 channel
     串行：35 s 
     并行(4 核)：10 s

+ 10个文件(每个文件有 120 MB)

  1. 1 session 1 channel
     串行： 18 s
     并行(4 核)： 死锁
     或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)
     等各种异常, 总之文件传输失败

  2. 1 session n channels
     串行：18 s
     并行(4 核)：19 s 

  3. n sessions 1 channel
     串行：19 s
     并行(4 核)：8 s 
