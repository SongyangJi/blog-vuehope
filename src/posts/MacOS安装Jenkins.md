---
title: MacOS安装Jenkins
date: 2022-05-19 15:53:36
categories: Jenkins
tag: 
  - Jenkins
  - Devops
---



Mac用户使用brew安装jenkins最为方便了



```shell
# 安装
brew update
brew install jenkins
# 更新
brew upgrade jenkins
# 启动
brew services start jenkins
```



查看admin密码

```shell
cat .jenkins/secrets/initialAdminPassword
# a5f8fbee0dfe4fec807b71ae42a1a1f8
```

