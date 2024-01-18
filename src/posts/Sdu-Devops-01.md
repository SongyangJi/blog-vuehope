---
title: 安装Docker、Harbor、Jenkins、Gitlab
date: 2022-05-06 21:00:00
categories: DevOps
---

# 系统平台信息

OS:  Linux Mint 20.3 Una

Kernel Release: 5.13.0-35-generic

Hardware Platform: x86_64

CPU Model Name:  Intel(R) Xeon(R) CPU E5-2680 v3 @ 2.50GHz

CPU Cores: 48

Main Memory: 125GB

IP: 211.87.224.233

# 依赖
## Docker
version 20.10.14



旧版本的 Docker 

```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```



#### 设置存储库

```shell
sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```



```shell
sudo apt-get update
```



这里没有安装 docker-compose

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io
```



apt-cache madison docker-ce

version = `5:20.10.16~3-0~ubuntu-focal`



```
sudo apt-get install docker-ce=5:20.10.16~3-0~ubuntu-focal docker-ce-cli=5:20.10.16~3-0~ubuntu-focal containerd.io
```





```
#1.配置阿里云的gpg
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

#2.配置阿里云的docker镜像
sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

#3.执行安装命令
sudo apt-get install docker-ce docker-ce-cli containerd.io
```






### Docker-Compose
docker-compose version 1.29.2

安装
```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
```

加上可执行权限
```shell
sudo chmod +x /usr/bin/docker-compose
```



## Go

go version go1.17.7 linux/amd6



## Java

openjdk version "1.8.0_312"



path: /usr/lib/jvm/java-8-openjdk-amd64

```shell
sudo update-alternatives --config java
```

```shell
#output
There are 3 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                            Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/java-17-openjdk-amd64/bin/java      1711      auto mode
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      manual mode
  2            /usr/lib/jvm/java-17-openjdk-amd64/bin/java      1711      manual mode
  3            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java   1081      manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

`java -version` 检查


## Maven

Apache Maven 3.8.5

path: /opt/apache-maven-3.8.5



+ jdk8编译插件配置

```xml
    <profile>
            <id>jdk-8</id>
            <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>8</jdk>
            </activation>

            <properties>
                <maven.compiler.source>8</maven.compiler.source>
                <maven.compiler.target>8</maven.compiler.target>
                <maven.compiler.compilerVersion>8</maven.compiler.compilerVersion>
            </properties>
    </profile>
```



+ maven仓库源

```xml
<mirror>
   <id>alimaven</id>
   <mirrorOf>central</mirrorOf>
   <name>Aliyun maven</name>
   <url>https://maven.aliyun.com/repository/central</url>
</mirror>
```





## Gitlab
使用docker安装 Gitlab
### 安装

```shell
docker search gitlab/
```


```shell
docker pull gitlab/gitlab-ce:latest
```

### 配置

```shell
sudo mkdir -p /srv/gitlab && echo "export GITLAB_HOME=/srv/gitlab" >> .profile && source .profile
```



docker-compose.yml
```yaml
version: '3.6'
services: 
  web: 
    image: 'gitlab/gitlab-ce:latest'
    container_name: sdu-weblab-gitlab
    restart: always
    hostname: '211.87.224.233'
    environment: 
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://211.87.224.233:8929'
        gitlab_rails['gitlab_shell_ssh_port'] = 2224
    ports: 
      - '8929:8929'
      - '2224:22'
    volumes: 
      - '$GITLAB_HOME/config:/etc/gitlab'
      - '$GITLAB_HOME/logs:/var/log/gitlab'
      - '$GITLAB_HOME/data:/var/opt/gitlab'
```

注意点:

external_url中的端口需要和ports映射的容器端口保持一致;

gitlab_rails['gitlab_shell_ssh_port']要和宿主机端口保持一致。



### 启动

构建并启动

```shell
docker-compose -f ./docker-compose.yml up -d # 如果文件名为`docker-compose.yml`可以不指定-f
```

强制重启

```shell
docker-compose up -d --force-recreate
```



重新构建并启动（反映yml的变化，一定是最新的）

```shell
docker-compose down && docker-compose up -d
```





注意：这个服务启动时间比较长，须等待一两分钟。

检查是否成功运行：浏览器访问 http://211.87.224.233:8929  (这个8989是映射的宿主机port，当然你可以映射成其他端口)

如果访问失败，注意云服务器的安全组或者firewall的端口开放情况（sudo ufw status）



### 使用Gitlab

默认管理员账户：root

查看配置文件得到密码
```shell
# 注意我们已经配置好数据卷映射了
sudo cat $GITLAB_HOME/config/initial_root_password
```

可以再去修改一下密码（设置为： sduweblab）




>https://docs.gitlab.com/ee/install/docker.html
>
>https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template



#### [New project]->[Create blank project]

#### Mac配置ssh登录

```shell
jisongyang@SongyangJi-MacBookAir .ssh % ssh -p 2224 -T git@211.87.224.233
ssh: connect to host 211.87.224.233 port 2224: Connection refused
```



```shell
jisongyang@SongyangJi-MacBookAir .ssh % ssh -T git@211.87.224.233
git@211.87.224.233's password:
```










## Jenkins

### 安装

jenkins: 2.346

```shell
docker pull jenkins/jenkins:latest
```

### 配置

docker-compse yml

```yaml
version: '3.6'
services: 
  jenkins: 
    image: jenkins/jenkins:latest
    container_name: sdu-weblab-jenkins-latest
    restart: always
    ports: 
      - "18080:8080"
      - "50000:50000"
    volumes: 
      - ./data:/var/jenkins_home # jenkins:latest 的home目录，包括插件和配置等等
      - '$MAVEN_HOME:/opt/maven'
      - '$JAVA_HOME:/opt/java8'
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
      - /etc/docker/daemon.json:/etc/docker/daemon.json
```

由于jenkins承担了打包的任务，因此将宿主机的jdk和maven挂载上去（另一种做法是自定义一个包含jdk和maven的jenkins镜像，有待尝试）。



(其中有关docker的配置后面再解释)



### 修改镜像源

否则大概率下载插件会失败！

```shell
vim data/hudson.model.UpdateCenter.xml
```



```xml
<?xml version='1.1' encoding='UTF-8'?>
<sites>
  <site>
    <id>default</id>
    <url>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json</url>
  </site>
</sites>
```



### 启动

启动之后，查看日志发现写数据卷的时候权限不够。（有可能）

```shell
sudo chmod -R 777 data/
```

给足data文件夹权限。(奇怪的是，docker-compose restart的时候还是要发现写权限不够)



检查是否启动成功，访问 http://211.87.224.233:18080/



**进入容器**

```shell
docker exec -it sdu-weblab-jenkins bash
```





### 登录Jenkins

```shell
# 查看管理员日志密码（查看文件 or 使用docker-compose logs -f 查看日志）
cat data/secrets/initialAdminPassword # 可能没有文件读权限
```



admin: f991e76fb99b4e3993ccdb52a9eaa8f7

### 管理插件

入口：[Manage Jenkins]->[System Configuration]->[Manage Plugins]



**必备插件**

+ Git Parameter
+ Publish Over SSH
+ Gitlab
+ Pipeline



### 全局配置


####  [Manage Jenkins]->[Global Tool Configuration]
配置jdk和maven的home。
其中MAVEN_HOME配置为`/opt/maven`; JAVA_HOME配置为`/opt/java8`（不错这两个文件夹其实是从宿主机映射过来的，其真实路径分别为宿主机的`$MAVEN_HOME`、`JAVA_HOME`，也就是`/opt/apache-maven-3.8.5`、`/usr/lib/jvm/java-8-openjdk-amd64`）



#### [Manage Jenkins]->[Configure System]->[Publish over SSH]

配置远程发布的机器，这里为了方便就配置本机即可。（这里在配置auth校验的时候最好使用密码校验，配置的私钥话可能因为不合规导致失败）



### 在Jenkins容器内使用docker

两种方案，一种是在Jenkins镜像里就有docker，另一种是使用宿主机的docker。

这里我们采取后者。

> 参考 https://www.dockone.io/article/431



这里只讲操作不讲原因和原理。



第一步修改权限：

```shell
cd /var/run
sudo chown root:root docker.sock && sudo chmod o+rw docker.sock
```



第二步修改jenkins的docker-compose.yml

```yaml
version: '3.6'
services: 
  jenkins: 
    image: jenkins/jenkins:latest
    container_name: sdu-weblab-jenkins-latest
    restart: always
    ports: 
      - "18080:8080"
      - "50000:50000"
    volumes: 
      - ./data:/var/jenkins_home # jenkins:latest 的home目录，包括插件和配置等等
      - '$MAVEN_HOME:/opt/maven'
      - '$JAVA_HOME:/opt/java8'
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
      - /etc/docker/daemon.json:/etc/docker/daemon.json
```

重点就是挂载宿主机三个文件即可，至于这里为什么mount这三个就足够了，不做解释。



记住重启一下
```
docker-compose up -d
```



检查：
```shell
jsy@wzai:~$ docker exec -it a6d580bfb4e1 bash
jenkins@a6d580bfb4e1:/$
jenkins@a6d580bfb4e1:/$
jenkins@a6d580bfb4e1:/$ docker version
```


## Harbor

### 下载

```shell
wget https://github.com/goharbor/harbor/releases/download/v2.5.0/harbor-offline-installer-v2.5.0.tgz
```



### 安装

**解压**

```shell
tar -xzvf harbor-offline-installer-v2.5.0.tgz -C ./
```

解压结果

```shell
jsy@wzai:~/devops$ ls harbor/
common.sh  harbor.v2.5.0.tar.gz  harbor.yml.tmpl  install.sh  LICENSE  prepare
```



**编辑配置文件**

```shell
cp harbor.yml.tmpl harbor.yml
```

修改hostname为主机ip，将htts相关内容注释掉（暂时不需要使用到https）、修改admin密码、修改http端口号。

```
hostname: 211.87.224.233

http:
  # port for http, default is 80. If https enabled, this port will redirect to https port
  port: 8930
  
harbor_admin_password: admin
```




安装：

```shell
./prepare && sudo ./install.sh
```



install过程分为这么几步：

```
[Step 0]: checking if docker is installed ...
[Step 1]: checking docker-compose is installed ...
[Step 2]: loading Harbor images ...
[Step 3]: preparing environment ...
[Step 4]: preparing harbor configs ...
```



安装完毕后检查一下：

```shell
jsy@wzai:~/devops/harbor$ sudo docker-compose ps
      Name                    Command                 State                  Ports
----------------------------------------------------------------------------------------------
harbor-core         /harbor/entrypoint.sh          Up (healthy)
harbor-db           /docker-entrypoint.sh 96 13    Up (healthy)
harbor-jobservice   /harbor/entrypoint.sh          Up (healthy)
harbor-log          /bin/sh -c /usr/local/bin/     Up (healthy)   127.0.0.1:1514->10514/tcp
                    ...
harbor-portal       nginx -g daemon off;           Up (healthy)
nginx               nginx -g daemon off;           Up (healthy)   0.0.0.0:8930->8080/tcp,:::89
                                                                  30->8080/tcp
redis               redis-server /etc/redis.conf   Up (healthy)
registry            /home/harbor/entrypoint.sh     Up (healthy)
registryctl         /home/harbor/start.sh          Up (healthy)
```



浏览器访问检查

localhost:8930

### 拉取/推送镜像



下一步使用docker login到私服，需要将私服的htp地址配置到docker的不安全register中；

```shell
sudo vim /etc/docker/daemon.json
```

写入

```json
{
  "insecure-registries": ["211.87.224.233:8930"]
}
```

必须重启docker服务

```shell
sudo systemctl restart docker
```



镜像名称要求：私服地址/项目名/镜像名:版本

```shell
# docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
docker tag IMAGE_ID 私服地址/项目名/镜像名:版本
```



**举例**

```shell
docker tag hello-world $HARBOR_URL/sdu-weblab/hello-world # 配置一下HARBOR_URL环境变量
```

检查一下

```shell
> docker images 
# 211.87.224.233:8930/sdu-weblab/hello-world   latest             feb5d9fea6a5   7 months ago   13.3kB
```



```shell
# 先登录后推送
docker login -u admin -p admin $HARBOR_URL
docker push 211.87.224.233:8930/sdu-weblab/hello-world
```



推送成功

```shell
jsy@wzai:~$ docker push 211.87.224.233:8930/sdu-weblab/hello-world
Using default tag: latest
The push refers to repository [211.87.224.233:8930/sdu-weblab/hello-world]
e07ee1baac5f: Pushed
latest: digest: sha256:f54a58bc1aac5ea1a25d796ae155dc228b3f0e11d046ae276b39c4bf2f13d8c4 size: 525
```



拉取镜像也是一样的。

```shell
# 先删除本地的
docker image rm 211.87.224.233:8930/sdu-weblab/hello-world
# 直接粘贴浏览器的命令
docker pull 211.87.224.233:8930/sdu-weblab/hello-world@sha256:f54a58bc1aac5ea1a25d796ae155dc228b3f0e11d046ae276b39c4bf2f13d8c4
```

> https://github.com/jenkinsci/docker/blob/master/README.md

