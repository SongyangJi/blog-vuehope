---
title: Git的学习笔记
date: 2022-05-08 01:43:28
categories: DevOps
tags: 
  - git
---


# 安装与配置
Mac上使用图形化安装工具、brew、xcode自带的都可以。
检查

```bash
git --version
```

## 环境配置
配置文件为 *gitconfig

作用域有三种：
1. 系统 system (/etc/gitconfig)
2. 全局（用户）global (在 ~/.gitconfig )
3. 项目 (在仓库的 /project/.git/config)

+ 查看
```bash
git config --list
```

+ 配置
```bash
git config --global user.name 'jsy'
git config --global user.email '153xxxxx@qq.com'
```

# 基本概念
## 版本库、工作区、暂存区
+ 版本库
就是那个 .git
里面有
```bash
jisongyang@SongyangJi-MacBookAir .git % ls
HEAD		description	info		refs
config		hooks		objects
```


+ 工作区
我们能看到的那个包含.git的文件夹, 比如下面的那个 repo 文件夹就是
```bash
jisongyang@SongyangJi-MacBookAir .git % cd ..
jisongyang@SongyangJi-MacBookAir repo % pwd
/Users/jisongyang/learn-git-repo/repo
```

+ 暂存区
临时保存的修改的文件的地方


## git下文件的状态
1. untracked 未被git管理
2. tracked
	1. unmodified 未修改
	2. modified 已修改
	3. staged 暂存


查看状态
```bash
git status
# 未跟踪
git status -s
```

举例
```bash
jisongyang@SongyangJi-MacBookAir repo % clear
# 未跟踪
jisongyang@SongyangJi-MacBookAir repo % git status -s
?? a.txt
jisongyang@SongyangJi-MacBookAir repo % git add a.txt
# 已跟踪
jisongyang@SongyangJi-MacBookAir repo % git status -s
A  a.txt
jisongyang@SongyangJi-MacBookAir repo % echo hello >> a.txt
# 已修改
jisongyang@SongyangJi-MacBookAir repo % git status -s
AM a.txt
jisongyang@SongyangJi-MacBookAir repo % git reset a.txt
jisongyang@SongyangJi-MacBookAir repo % git status -s
?? a.txt
jisongyang@SongyangJi-MacBookAir repo % git commit a.txt
[master (root-commit) 5273424] init a.txt
 1 file changed, 2 insertions(+)
 create mode 100644 a.txt
jisongyang@SongyangJi-MacBookAir repo % git status -s
# a.txt 在状态里不可见了
jisongyang@SongyangJi-MacBookAir repo %
```

## .gitignore
当有文件不需要git管理的时候，使用这个文件就很有必要了。
比如日志、项目编译出来的文件、IDEA的本地信息等等，就不需要git管理。

```bash
# 文件名固定
touch .gitignore
```

看例子就好
```bash
# 忽略所有 *.class
*.class
# 但是不忽略Hello.class
!Hello.class
# 忽略当前目录下的TODO文件夹
/TODO 
# 忽略 target 下的所有文件
target/
# 忽略 doc/*.txt的所有文件夹
doc/*.txt
## 忽略 doc及其所有子目录下所有的 *.txt
doc/**/*.txt
```


## 仓库

+ 在本地初始化仓库

```bash
git init
```
创建完会多一个 .init文件(默认不可见)


+ 从远程仓库克隆
```bash
git clone repo
```


## 暂存区
从工作区到暂存区
```bash
git add filename
# 添加全部文件
git add .
```
暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响
```bash
git reset HEAD
```

直接从暂存区删除文件，工作区则不做出改变
```bash
git rm --cached -f <file>
```


## 版本库

+ 从暂存区到版本库
```bash
git commit -m 'message'
```

+ 修改上一次的commit
```bash
git commit --amend
```
具体使用方法见[git commit --amend 修改git提交记录用法详解](https://zhuanlan.zhihu.com/p/100243017)

# 远程仓库
**查看已连接的远程仓库**
```bash
git remote
git remote -v
git remote show origin
```

**添加远程仓库**
```bash
git remote add [shortname] url
```

**从远程仓库克隆到本地**
```bash
git clone repo
```

**移除无效的远程仓库**（只是移除关联关系，不会对远程仓库有影响）
```bash
git remote rm origin
```

**抓取(fetch)**
从远程仓库将最新版本获取到本地仓库
```bash
git fetch
```

**拉取(pull)**
相当于fetch + merge : 从远程仓库将最新版本获取到本地仓库，并merge
（根据配置也可能是相当于 fetch + rebase）
(可能报 merge unrelated histories)
```bash
git pull [romote-name] [branch-name]
```

**推送(push)**
```bash
git push [romote-name] [branch-name]
```



# 分支
master分支是git自动创建的，但没并没有什么特殊之处。

**查看分支**
```bash
# 列出所有本地分支
git branch
# 列出所有远程分支
git branch -r
# 列出远程和本地分支
git branch -a
```

**创建分支**(在原先分支下创建分支，内容会初始共享)
```bash
git branch branch-name
```
举例（*master表示当前在master分支下）
```bash
jisongyang@SongyangJi-MacBookAir repo1 % git branch b1
jisongyang@SongyangJi-MacBookAir repo1 % git branch
  b1
* master
```


**切换分支**（这个时候就自动把目标分支在本地仓库里的文件换到工作区里）
```bashå
git checkout b1

# "打开"远程仓库的分支
# 如果没有全部拉下来的话
# git fetch -all
git checkout -b dev（本地分支名） origin/dev（远程分支名）
```

两个命令合并到一步：
```shell
git checkout -b dev
```


**将本地分支推送至远程仓库**
```bash
git push -u origin b1
```

**分支合并**
(可能会冲突)
这里的冲突需要正确理解（这里的冲突的就像是乐观锁的加版本号一样，事实上在svn里确实有全局版本号，不允许脏写发生）
```bash
# 把b1分支合并到当前的master分支
git merge b1
```

**rebase**
```bash
git fetch
git rebase dev
```

**是rebase还是merge？**
git rebase和git merge这两个命令都旨在将更改代码从一个分支合并到另一个分支，但二者的合并方式却有很大的不同。
git merge优点是分支代码合并后不破坏原分支的代码提交记录，缺点就是会产生额外的提交记录并进行两条分支的合并，
git rebase 优点是无须新增提交记录到目标分支，rebase后可以将对象分支的提交历史续上目标分支上，形成线性提交历史记录，进行review的时候更加直观。

> **git rebase的黄金原则**
> **不能对一个共享的分支进行Git rebase操作**。
> ~~比如，现在在feature分支上，现在想要合并master分支的代码：
> 也就是说，如果master分支是共享的（这是一种很常见的方式），
> 那么就不能进行 git rebase master，
> 而是要进行 git merge master。~~ 

总结
+ **融合代码到公共分支的时使用git merge**，而不用git rebase
+ **融合代码到个人分支的时候使用git rebase**，可以不污染分支的提交记录，形成简洁的线性提交历史记录。
参考 [git rebase和git merge有什么区别？](https://joyohub.com/2020/04/06/git-rebase/)




**删除分支**
```bash
# 删除的是本地的分支，对远程的分支无关
git branch -d branch-name
# 强制删除（git的保护，以防误删）
git branch -D branch-name
```

```bash
jisongyang@SongyangJi-MacBookAir repo1 % git branch -d b1
error: The branch 'b1' is not fully merged.
If you are sure you want to delete it, run 'git branch -D b1'.
```

**删除远程分支**
```bash
git push origin -d branchname
```




# 标签
Git给历史中的某次提交打上标签，以示重要。
标签指的是某个分支某个特定时间节点的状态。（就像是打了一份快照）


**查看已有标签**
```bash
# 列出已有标签
git tag
git show tag
```
**创建标签**
```bash
git tag tagname
git tag tagname -m message
# 举例
git tag v1.0 -m 'finally a stable release'
```

**将标签推送到远程仓库**：
```bash
# 推送某个标签
git push origin vxx
# 推送所有不在remote的标签
git push origin --tags
```

实操
```bash
# 拉取所有版本
git fetch --all --tags
# 查看有哪些版本
git tag
# 创建某个版本的新的分支并切换过去
git checkout tags/v1.0 -b v1.0-branch
```


[Git-基础-打标签](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)



# 命令拾遗

```bash
# 查看工作区和暂存区的文件
git ls-files
```

删除
```bash
git rm file
```
`git rm`和`rm`的区别很多，网上讲的也都是其中的一个方面，不细讲了，最好自己试试。

查看日志

```bash
git log
```
