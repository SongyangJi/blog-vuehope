---
title: 使用Jenkins的pipeline实现CI/CD
date: 2022-05-07 21:00:00
categories: DevOps
---



# Pipeline


## Prerequisites

### 安装Pipeline插件

在你想创建一条流水线的时候，有可能发现并没有这个UI入口，原因是还没有下载相关插件，所以可以下载插件****，这是一整套和流水线相关的插件。（还有 BlueOcean等其他流水线相关的插件，这里先不使用，只使用classic的pipeline）。

下载完记得重启`docker-compose restart`。



## 创建流水线



### Jenkinsfile模板

```
pipeline {
    agent any

    stages {
        stage('Stage 1: Fetch code from git') {
            steps {
                echo 'Stage 1: Fetch code from git -- SUCCESS'
            }
        }

        stage('Stage 2: Build the project using maven') {
            steps {
                echo 'Stage 2: Build the project using maven -- SUCCESS'
            }
        }

        stage('Stage 3: Make a custom image using docker') {
            steps {
                echo 'Stage 3: Make a custom image using docker -- SUCCESS'
            }
        }

        stage('Stage 4: Push image to Harbor') {
            steps {
                echo 'Stage 4: Push image to Harbor -- SUCCESS'
            }
        }

        stage('Stage 5: Publish over SSH') {
            steps {
                echo 'Stage 5: Publish over SSH -- SUCCESS'
            }
        }

    }
}
```



## 从GitLab拉取代码

流水线片段脚本：

```
                checkout([$class: 'GitSCM', branches: [[name: '${branch_tag}']], extensions: [], userRemoteConfigs: [[url: 'http://211.87.224.233:8929/sdu-weblab/springboot-helloworld.git']]])
```
其中`branch_tag`为git参数（此项功能需要 Git Parameter 插件）。



stage为：

```
        stage('Stage 1: Fetch code from git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '${branch_tag}']], extensions: [], userRemoteConfigs: [[url: 'http://211.87.224.233:8929/sdu-weblab/springboot-helloworld.git']]])
                echo 'Stage 1: Fetch code from git -- SUCCESS'
            }
        }
```





### Git Parameter

该插件允许您在构建中分配**branch, tag, pull request or revision number**作为参数。

此插件将从你的项目中读取 GIT SCM 配置。
这个插件直接使用了[Git Plugin](https://plugins.jenkins.io/git/)和[Git Client Plugin](https://plugins.jenkins.io/git-client/)。



git 拉取分支：

checkout: Check out from version control




http://211.87.224.233:18080/


https://plugins.jenkins.io/git-parameter



### 使用WebHooks实现push分支自动build

~~http://211.87.224.233:8080/project/pipeline-springboot-helloworld~~

```
Hook executed successfully but returned HTTP 404 <!doctype html><html lang="en"><head><title>HTTP Status 404 – Not Found</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 404 – Not Found</h1></body></html>
```



1. 下载插件**Gitlab**插件
2. 在gitlab上设置Jenkins里插件生成的webhook，并添加secret token。此次webhook token为http://jenkins:8080/project/pipeline-springboot-helloworld



## 使用Jenkins容器内的Maven打包

打包命令

```shell
${MAVEN_HOME}/bin/mvn clean package -Dmaven.test.skip=true # 容器内的${MAVEN_HOME},不是宿主机的,在这里为/opt/maven
```



片段生成器生成的语句:

```shell
sh '/opt/maven/bin/mvn clean package -Dmaven.test.skip=true'
```





stage为：

```shell
        stage('Stage 2: Build the project using maven') {
            steps {
                // 下面两条shell作debug用，后面删去
                sh 'pwd'
                sh 'ls -al'
                sh '/opt/maven/bin/mvn clean package -Dmaven.test.skip=true'
                echo 'Stage 2: Build the project using maven -- SUCCESS'
            }
        }
```



日志：

```shell
+ pwd
/var/jenkins_home/workspace/pipeline-springboot-helloworld
[Pipeline] sh
+ ls -al
total 8
drwxr-xr-x 5 jenkins jenkins  100 May  6 10:11 .
drwxr-xr-x 4 jenkins jenkins   98 May  6 10:09 ..
drwxr-xr-x 8 jenkins jenkins  210 May  6 10:13 .git
-rw-r--r-- 1 jenkins jenkins  387 May  5 15:35 .gitignore
-rw-r--r-- 1 jenkins jenkins 1437 May  5 15:35 pom.xml
drwxr-xr-x 4 jenkins jenkins   42 May  5 15:35 src
drwxr-xr-x 6 jenkins jenkins  199 May  6 10:12 target
[Pipeline] sh
+ /opt/maven/bin/mvn clean package -Dmaven.test.skip=true
[INFO] Scanning for projects...
[INFO] 
[INFO] -----------------------< com.sduweb:helloworld >------------------------
[INFO] Building helloworld 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ helloworld ---
[INFO] Deleting /var/jenkins_home/workspace/pipeline-springboot-helloworld/target
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ helloworld ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'UTF-8' encoding to copy filtered properties files.
[INFO] Copying 1 resource
[INFO] Copying 0 resource
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ helloworld ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 2 source files to /var/jenkins_home/workspace/pipeline-springboot-helloworld/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:testResources (default-testResources) @ helloworld ---
[INFO] Not copying test resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.1:testCompile (default-testCompile) @ helloworld ---
[INFO] Not compiling test sources
[INFO] 
[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ helloworld ---
[INFO] Tests are skipped.
[INFO] 
[INFO] --- maven-jar-plugin:3.2.2:jar (default-jar) @ helloworld ---
[INFO] Building jar: /var/jenkins_home/workspace/pipeline-springboot-helloworld/target/helloworld-0.0.1-SNAPSHOT.jar
[INFO] 
[INFO] --- spring-boot-maven-plugin:2.6.4:repackage (repackage) @ helloworld ---
[INFO] Replacing main artifact with repackaged archive
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.425 s
[INFO] Finished at: 2022-05-06T10:14:04Z
[INFO] ------------------------------------------------------------------------
```


从上面的日志输出可以得到如下结论：
1. 对于Jenkins每一个流水线项目，Jenkins都会在存储在`/var/jenkins_home/workspace/${projectName}`
1. 从gitlab拉取代码后存储在本流水线对应的目录下`/var/jenkins_home/workspace/${projectName}`
1. 打完jar后存储在`/var/jenkins_home/workspace/${projectName}/target/xxx.jar`





> **跳过单元测试**
>
> + -DskipTests，不执行[测试用例](https://so.csdn.net/so/search?q=测试用例&spm=1001.2101.3001.7020)，但编译测试用例类生成相应的class文件至target/test-classes下。 
>
> + -Dmaven.test.skip=true，不执行测试用例，也不编译测试用例类。



> 参考
https://www.jianshu.com/p/6f91752f3962
https://www.jianshu.com/p/6f57c322e50e



## 使用Jenkins容器内的Docker制作自定义镜像

pwd: /var/jenkins_home/workspace/${projectName}
/target/xxx.jar



Dockerfile

```Dockerfile
FROM openjdk:8-jdk-alpine
ARG JarFileName
COPY ${JarFileName} /opt/weblab/
WORKDIR /opt/weblab/
CMD java -jar ${JarFileName}
```



~~执行shell~~
```shell
cp -r /opt/docker_workdir ./
cp ./target/*.jar ./docker_workdir
docker build -t ${JOB_NAME}:${branch_tag##*/} ./docker_workdir --build-arg JarFileName=$(ls target -l | grep jar$ | awk '{print $9}')
```

~~流水线片段~~
```shell
sh '''cp -r /opt/docker_workdir ./
cp ./target/*.jar ./docker_workdir
docker build -t ${JOB_NAME}:${branch_tag##*/} ./docker_workdir --build-arg JarFileName=$(ls target -l | grep jar$ | awk \'{print $9}\')'''
```



~~stage: 为~~

```
        stage('Stage 3: Make a custom image using docker') {
            steps {
                sh '''
                cp -r /opt/docker_workdir ./
                cp ./target/*.jar ./docker_workdir
                docker build -t ${JOB_NAME}:${branch_tag##*/} ./docker_workdir --build-arg JarFileName=$(ls target -l | grep jar$ | awk \'{print $9}\')
                '''
                echo 'Stage 3: Make a custom image using docker -- SUCCESS'
            }
        }
```







build_image.sh

```shell
cp -r /opt/docker_workdir ./
cp ./target/*.jar ./docker_workdir
jarFileName=$(ls *.jar)
echo "jar is ${jarFileName}"
docker build -t ${JOB_NAME}:${branch_tag##*/} ./docker_workdir --build-arg  JarFileName="${jarFileName}"
```











## 将自定义镜像推送到Harbor

```shell
docker login -u admin -p admin $HARBOR_URL
```



Jenkinsfile:

增加以下环境变量

```
pipeline {
    agent any
    
		environment {
        harbor_user = 'admin'
        harbor_password = 'admin'
        harbor_url = '211.87.224.233:8930'
        harbor_repo = 'sdu-weblab'
    }
    // ......
}
```



Shell

```shell
docker login -u ${harborUser} -p ${harborPassword} ${harbor_url}
docker tag ${JOB_NAME}:${branch_tag##*/} ${harbor_url}/${harbor_repo}/${JOB_NAME}:${branch_tag##*/}
docker rmi $(docker images -f "dangling=true" -q) -f
docker push ${harbor_url}/${harbor_repo}/${JOB_NAME}:${branch_tag##*/}
```



~~pipeline script:~~

```shell
                sh '''
                    docker login -u ${harborUser} -p ${harborPassword} ${harbor_url}
                    docker tag ${JOB_NAME}:${branch_tag##*/} ${harbor_url}/${harbor_repo}/${JOB_NAME}:${branch_tag##*/}
                    docker rmi $(docker images -f "dangling=true" -q) -f
                    docker push ${harbor_url}/${harbor_repo}/${JOB_NAME}:${branch_tag##*/}
                 '''
```



~~stage为：~~

```
        stage('Stage 4: Push image to Harbor') {
            steps {
                sh '''
                    docker login -u ${harborUser} -p ${harborPassword} ${harbor_url}
                    docker tag ${JOB_NAME}:${branch_tag##*/} ${harbor_url}/${harbor_repo}/${JOB_NAME}:${branch_tag##*/}
                    docker rmi $(docker images -f "dangling=true" -q) -f
                    docker push ${harbor_url}/${harbor_repo}/${JOB_NAME}:${branch_tag##*/}
                 '''
                echo 'Stage 4: Push image to Harbor -- SUCCESS'
            }
        }
```



~~改为执行本地的脚本。~~

```shell
harbor_user=$1
harbor_password=$2
harbor_url=$3
harbor_repo=$4
project=$5
branch_tag=$6

image_name=${harbor_url}/${harbor_repo}/${project}:${branch_tag##*/}

# 删除和镜像关联的容器(正常情况不会有，但这里是单机部署)
container_id=$(docker ps -a | grep "${image_name}" | awk '{print $1}')
if [ "${container_id}" != "" ] ; then
  echo "Container ${container_id} of ${image_name} is running, now try to kill it..."
  docker stop "$container_id"
  docker rm "$container_id"
fi
# todo 这样做其实还有是问题的，就是上面的 container_id 可能会有多个

# shellcheck disable=SC2086
docker login -u "${harbor_user}" -p "${harbor_password}" ${harbor_url}

docker tag "${project}":"${branch_tag##*/}" "${image_name}"
docker rmi $(docker images -f "dangling=true" -q) -f
docker push image_name
```



Jenkins端shell：

```shell
/opt/docker_workdir/push_to_harbor.sh $harbor_user $harbor_password $harbor_url $harbor_repo $JOB_NAME $branch_tag
```

流水线片段

```shell
sh '/opt/docker_workdir/push_to_harbor.sh $harbor_user $harbor_password $harbor_url $harbor_repo $JOB_NAME $branch_tag'
```







其中：

```shell
# 删除悬挂镜像
docker rmi $(docker images -f "dangling=true" -q) 
```

> *docker中的none:none镜像是怎么回事？*
> https://projectatomic.io/blog/2015/07/what-are-docker-none-none-images/





用 go 改写：

```go
package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

var (
	harborUser     string
	harborPassword string
	harborUrl      string
	harborRepo     string
	project        string
	version        string
)

var (
	logFileName string
	logFile     *os.File
)

func init() {
	var err error
	logFileName = time.Now().Format("2006-01-02 15:04:05") + "[push_to_harbor].log"
	logFile, err = os.OpenFile(logFileName, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		panic(err)
	}
	log.SetOutput(logFile)
	log.SetPrefix("[sdu-weblab-deploy]")
	log.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC)
}

func main() {
	flag.StringVar(&harborUser, "harbor_User", "", "")
	flag.StringVar(&harborPassword, "harbor_password", "", "")
	flag.StringVar(&harborUrl, "harbor_url", "", "")
	flag.StringVar(&harborRepo, "harbor_repo", "", "")
	flag.StringVar(&project, "project", "", "")
	flag.StringVar(&version, "version", "", "")
	if len(harborUser) == 0 || len(harborPassword) == 0 || len(harborUrl) == 0 ||
		len(harborRepo) == 0 || len(project) == 0 || len(version) == 0 {
		log.Fatal("key args missing")
	}
	log.Printf("Notice: harbor_url=%s, harbor_repo=%s, project=%s, version=%s",
		harborUrl, harborRepo, project, version)

	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Fatalf("New docker client fail, err=%v", err)
	}

	version = getRealVersion(version)
	imageName := getHarborImageName(harborUrl, harborRepo, project, version)

	// 删除和镜像关联的容器(正常情况不会有，但这里是单机部署)
	// 1. check existing containers and remove it if so
	log.Printf("Check if container of %s exists...\n", imageName)
	containers, err := cli.ContainerList(ctx, types.ContainerListOptions{All: true})
	if err != nil {
		log.Fatalf("List all containers fail, err=%v", err)
	}

	var timeOut = time.Second
	for _, c := range containers {
		if c.Image == imageName {
			cid := c.ID
			err = cli.ContainerStop(ctx, cid, &timeOut)
			if err != nil {
				log.Printf("Warning: container.ID=%s stop failed", cid)
			}
			err = cli.ContainerRemove(ctx, cid, types.ContainerRemoveOptions{Force: true})
			if err != nil {
				log.Fatalf("Container.ID=%s remove failed", cid)
			}
		}
	}

	// 2. tag by the rule of harbor
	// 2.1 check and remove outdated version images
	log.Printf("Check if image %s exists...\n", imageName)
	imageList, err := cli.ImageList(ctx, types.ImageListOptions{})
	if err != nil {
		log.Fatalf("List all images fail, err=%v", err)
	}
	for _, image := range imageList {
		for _, repoTag := range image.RepoTags {
			if repoTag == imageName {
				log.Printf("Image=%s exists, next to remove it", image.ID)
				cli.ImageRemove(ctx, image.ID, types.ImageRemoveOptions{
					Force: true,
				})
				break
			}
		}
	}
	// 2.2 tag
	sourceImageName := getSourceImageName(harborRepo, project, version)
	err = cli.ImageTag(ctx, sourceImageName, imageName)
	if err != nil {
		log.Fatalf("image tag fail, err=%v", err.Error())
	}
	// todo docker rmi $(docker images -f "dangling=true" -q) -f

	// 3. push image to harbor
	log.Printf("Push image %s to Harbor...\n", imageName)
	_, err = cli.RegistryLogin(ctx, types.AuthConfig{
		// todo security
		Username:      "admin",
		Password:      "admin",
		ServerAddress: harborUrl,
	})
	if err != nil {
		log.Fatalf("push to harbor fail, err=%v", err.Error())
	}

	out, err := cli.ImagePush(ctx, imageName, types.ImagePushOptions{})
	if err != nil {
		log.Fatalf("Pulling image failed, err=%v", err)
	}
	defer out.Close()
	io.Copy(logFile, out)

}

// remove possible "/"
func getRealVersion(rawVersion string) string {
	parts := strings.Split(rawVersion, "/")
	if len(parts) > 0 {
		return parts[len(parts)-1]
	}
	return version
}

func getSourceImageName(team, project, version string) string {
	return fmt.Sprintf("%s/%s/%s:%s", team, harborRepo, project, version)
}

func getHarborImageName(harborUrl, harborRepo, project, version string) string {
	return fmt.Sprintf("%s/%s/%s:%s", harborUrl, harborRepo, project, version)
}
```





## 通过SSH通知目标服务器部署

这里使用**Publish Over SSH**。

**部署端**的执行脚本：

```shell
harbor_url=$1
harbor_repo=$2
project=$3
version=$4
container_port=$5

image_name=$harbor_url/$harbor_repo/$project:$version

container_id=$(docker ps -a | grep "${image_name}" | awk '{print $1}')

echo "Check if container of ${image_name} exists..."
if [ "${container_id}" != "" ] ; then
  echo "Container ${container_id} of ${image_name} is running, now try to kill it..."
  docker stop "$container_id"
  docker rm "$container_id"
fi

old_image=$(docker images | grep "${image_name}")

if [ "${old_image}" != "" ] ; then
  echo "Image $image_name exists, now try to remove it"
  docker rmi "$image_name" -f
fi

echo "Try to login Harbor..."
docker login -u amdin -p admin "$harbor_url"
echo "Login Harbor successfully."

echo "Try to pull $image_name from Harbor..."
docker pull "${image_name}"
echo "Pull image ${image_name} from Harbor successfully."

docker run -d -p "$container_port" --name "$harbor_repo.$project.$version" "$image_name"

echo "Deploy service successfully."

```
以上脚本执行了如下事情：
1. 检查旧版本的容器是否在运行，如果有停止并删除；
1. 检查旧镜像是否存在，如果有删除；
1. 登录私服Harbor
1. 拉取最新的镜像
1. 运行容器



**发布端（Jenkins）**的执行脚本

```shell
cd deploy && touch deploy.log && /home/jsy/devops/docker_workdir/deploy.sh $harbor_url $harbor_repo $JOB_NAME $branch_tag $container_port > deploy.log
```



测试一下：

```
cd deploy && touch deploy.log && /home/jsy/devops/docker_workdir/deploy.sh 211.87.224.233:8930 sdu-weblab springboot-helloworld origin/master 8080 > deploy.log
```





使用sshPublisher生成流水线脚本：

```shell
sshPublisher(publishers: [sshPublisherDesc(configName: 'sdu-weblab-local-machine', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "cd deploy && touch deploy.log && /home/jsy/devops/docker_workdir/deploy.sh $harbor_url $harbor_repo $JOB_NAME $branch_tag $container_port > deploy.log", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
```



stage为

            stage('Stage 5: Publish over SSH') {
                steps {
                    sshPublisher(publishers: [sshPublisherDesc(configName: 'sdu-weblab-local-machine', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "cd deploy && touch deploy.log && /home/jsy/devops/docker_workdir/deploy.sh $harbor_url $harbor_repo $JOB_NAME $branch_tag $container_port > deploy.log", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                    echo 'Stage 5: Publish over SSH -- SUCCESS'
                }
            }



## 通过SSH通知目标服务器部署（部署端使用go部署）

### 部署程序

```go
package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
)

const (
	DefaultVersion       = "master"
	MonitorProgrammeName = "monitor"
)

var (
	harborUrl     string
	harborRepo    string
	project       string
	version       string
	containerPort int
)

var (
	logFileName string
	containerID string
)

func init() {
	logFileName = time.Now().Format("2006-01-02 15:04:05") + ".log"
	logFile, err := os.OpenFile(logFileName, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		panic(err)
	}
	log.SetOutput(logFile)
	log.SetPrefix("[sdu-weblab-deploy]")
	log.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC)
	return
}

func main() {
	flag.StringVar(&harborUrl, "harbor_url", "", "")
	flag.StringVar(&harborRepo, "harbor_repo", "", "")
	flag.StringVar(&project, "project", "", "")
	flag.StringVar(&version, "version", DefaultVersion, "")
	flag.IntVar(&containerPort, "container_port", 8080, "")
	flag.Parse()
	if len(harborUrl) == 0 || len(harborRepo) == 0 || len(project) == 0 {
		log.Fatal("key args missing")
	}
	log.Printf("Notice: harbor_url=%s, harbor_repo=%s, project=%s, version=%s, container_port=%d",
		harborUrl, harborRepo, project, version, containerPort)

	version = getBranch(version)
	imageName := harborUrl + "/" + harborRepo + "/" + project + ":" + version
	log.Printf("Docker image name is %s", imageName)

	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Fatalf("New docker client fail, err=%v", err)
	}

	// 1. check existing containers
	log.Printf("Check if container of %s exists...\n", imageName)
	containers, err := cli.ContainerList(ctx, types.ContainerListOptions{All: true})
	if err != nil {
		log.Fatalf("List all containers fail, err=%v", err)
	}

	var timeOut = time.Second
	for _, c := range containers {
		if c.Image == imageName {
			cid := c.ID
			err = cli.ContainerStop(ctx, cid, &timeOut)
			if err != nil {
				log.Printf("Warning: container.ID=%s stop failed", cid)
			}
			err = cli.ContainerRemove(ctx, cid, types.ContainerRemoveOptions{Force: true})
			if err != nil {
				log.Fatalf("Container.ID=%s remove failed", cid)
			}
		}
	}

	// 2. check outdated version images
	log.Printf("Check if image %s exists...\n", imageName)
	imageList, err := cli.ImageList(ctx, types.ImageListOptions{
		All: true,
	})
	if err != nil {
		log.Fatalf("List all images fail, err=%v", err)
	}
	for _, image := range imageList {
		for _, repoTag := range image.RepoTags {
			if repoTag == imageName {
				cli.ImageRemove(ctx, image.ID, types.ImageRemoveOptions{
					Force: true,
				})
				break
			}
		}
	}

	// 3. pull image from harbor
	log.Printf("Pull image %s from Harbor...\n", imageName)
	_, err = cli.RegistryLogin(ctx, types.AuthConfig{
		// todo security
		Username:      "admin",
		Password:      "admin",
		ServerAddress: harborUrl,
	})

	if err != nil {
		panic(nil)
	}

	// out 是响应输出流，可以不输出
	out, err := cli.ImagePull(ctx, imageName, types.ImagePullOptions{})
	if err != nil {
		panic(err)
	}
	defer out.Close()
	io.Copy(os.Stdout, out)

	// 4. docker run -d -p "$container_port" --name "$harbor_repo.$project.$version" "$image_name"
	log.Printf("Run image %s to be contaniner...\n", imageName)
	containerName := harborRepo + "." + project + "." + version
	containerNatPort := nat.Port(strconv.Itoa(containerPort) + "/tcp")

	resp, err := cli.ContainerCreate(ctx,
		&container.Config{
			Image: imageName,
			ExposedPorts: nat.PortSet{
				containerNatPort: struct{}{},
			},
		}, &container.HostConfig{
			PublishAllPorts: true,
		}, nil, nil, containerName)

	if err != nil {
		log.Fatalf("Creating container failed, err=%v", err)
	}
	if err = cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		log.Fatalf("Starting container failed, err=%v", err)
	}

	containerID = resp.ID
	log.Printf("Container ID = %s", containerID)

	// todo register to center
	hostPortOfContainerPort, err := getHostPortOfContainerPort(containerID, strconv.Itoa(containerPort))
	if err != nil {
		log.Printf("Error: get port binding failed, err=%v", err)
	} else {
		log.Printf("Container hostPort of container port is %s", hostPortOfContainerPort)
	}
	log.Println("Deploy successfully.")

	// 5. run a new programme to fetch log stream and transfer it to websocket
	runGoProgramme(MonitorProgrammeName)
}

func runGoProgramme(programme string) {
	log.Printf("Next to run programme %s ", programme)
	sduWeblabBinHome := os.Getenv("SDU_WEBLAB_BIN_HOME")
	s := fmt.Sprintf("%s/%s --logFileName=%s --containerID=%s", sduWeblabBinHome, programme, logFileName, containerID)
	log.Printf("Shell script is %s", s)
	err := exec.Command("/bin/bash", "-c", s).Start()
	if err != nil {
		log.Fatalf("Fail to run programe %s, err=%v", programme, err)
	}
}

func getBranch(repoBranch string) string {
	parts := strings.Split(repoBranch, "/")
	if len(parts) > 0 {
		return parts[len(parts)-1]
	}
	return DefaultVersion
}

func getHostPortOfContainerPort(containerId string, containerPort string) (port string, err error) {
	shell := "docker port " + containerId + " | grep " + containerPort + " | awk '{print $3}'"
	output, err := exec.Command("bash", "-c", shell).Output()
	if err != nil {
		return
	}
	shellOut := string(output)
	parts := strings.Split(shellOut, "\n")
	if len(parts) == 0 {
		err = fmt.Errorf("containerPort=%s has no bindings", containerPort)
		return
	}
	ipPort := parts[0]
	splits := strings.Split(ipPort, ":")
	if len(splits) != 2 {
		err = errors.New("invalid format")
		return
	}
	port = splits[1]
	return
}

```



### 监控程序
```go
package main

import (
	"bufio"
	"context"
	"flag"
	"io"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/websocket"
)

var (
	logFileName string
	containerID string
)

var (
	logOut   io.ReadCloser
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	} // use default options
	conn       *websocket.Conn
	listenPort int
)

func InitLog() {
	logFile, err := os.OpenFile(logFileName, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		panic(err)
	}
	log.SetOutput(logFile)
	log.SetPrefix("[sdu-weblab-deploy]")
	log.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC)
	return
}

func main() {
	// fetch log stream and transfer it to websocket
	flag.StringVar(&logFileName, "logFileName", "", "")
	flag.StringVar(&containerID, "containerID", "", "")
	flag.Parse()

	if len(logFileName) == 0 || len(containerID) == 0 {
		log.Fatal("key args missing")
	}

	// init log settings
	InitLog()

	log.Printf("Fetch log stream and transfer it to websocket...\n")
	ctx := context.Background()
	var err error
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Fatalf("New docker client fail, err=%v", err)
	}

	options := types.ContainerLogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Follow:     true,
	}
	logOut, err = cli.ContainerLogs(ctx, containerID, options) // remote

	if err != nil {
		log.Fatalf("Get log of container failed, err=%v", err)
	}

	listener, err := net.Listen("tcp", ":0")
	if err != nil {
		log.Fatalf("Net listen failed, err=%v", err)
	}
	listenPort = listener.Addr().(*net.TCPAddr).Port
	// todo register to center
	log.Printf("Websocket port is %d", listenPort)

	http.HandleFunc("/logs", socketHandler)
	log.Fatal(http.Serve(listener, nil))
}

func socketHandler(w http.ResponseWriter, r *http.Request) {
	// Upgrade our raw HTTP connection to a websocket based one
	_conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Error during connection upgradation:", err)
		os.Exit(3)
	}
	conn = _conn
	defer conn.Close()

	reader := bufio.NewReader(logOut)
	// The event loop
	for {
		message, err := reader.ReadString('\n')

		if err != nil {
			if err == io.EOF {
				exitAndNotifyPeer(message, 0)
			}
			exitAndNotifyPeer("\n", 1)
		}
		//log.Printf("Log read is: %s", message)
		err = conn.WriteMessage(websocket.TextMessage, []byte(message))
		if err != nil {
			log.Println("Error during message writing: ", err)
			os.Exit(2)
		}
	}
}

func exitAndNotifyPeer(msg string, exitCode int) {
	conn.WriteMessage(websocket.CloseMessage, []byte(msg))
	os.Exit(exitCode)
}

```





### 构建脚本
```
jsy@wzai:~/devops/docker_workdir$ tree
.
├── deploy
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   └── output
│       └── bin
│           └── deploy
├── monitor
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   └── output
│       └── bin
│           └── monitor
```

`go build`

首次构建

```shell
cd ~/devops/docker_workdir/
cd deploy && go mod tidy && mkdir -p output/bin && go build -o output/bin/deploy
cd monitor && go mod tidy && mkdir -p output/bin && go build -o output/bin/monitor
```

后面更新

```shell
cd ~/devops/docker_workdir/
cd deploy && go mod tidy && go build -o output/bin/deploy
cd ~/devops/docker_workdir/
cd monitor && go mod tidy && go build -o output/bin/monitor
```



构建或更新软链接

```shell
sudo ln -f -s /home/jsy/devops/docker_workdir/deploy/output/bin/deploy /opt/sduweblab/bin/deploy
sudo ln -f -s /home/jsy/devops/docker_workdir/monitor/output/bin/monitor /opt/sduweblab/bin/monitor
```





~~更新产物~~

```shell
cd ~/devops/docker_workdir/
cd deploy && go mod tidy && go build -o output/bin/deploy
cd ~/devops/docker_workdir/
cd monitor && go mod tidy && go build -o output/bin/monitor
sudo ln -f -s /home/jsy/devops/docker_workdir/deploy/output/bin/deploy /opt/sduweblab/bin/deploy
sudo ln -f -s /home/jsy/devops/docker_workdir/monitor/output/bin/monitor /opt/sduweblab/bin/monitor
```


更新产物（推送镜像到harbor也使用go改写）
```shell
sudo rm /opt/sduweblab/bin/deploy
sudo rm /opt/sduweblab/bin/monitor
sudo rm /opt/sduweblab/bin/push_to_harbor
cd ~/devops/docker_workdir/
cd deploy && go mod tidy && go build -o output/bin/deploy
cd ~/devops/docker_workdir/
cd monitor && go mod tidy && go build -o output/bin/monitor
cd ~/devops/docker_workdir/
cd push_to_harbor && go mod tidy && go build -o output/bin/push_to_harbor
sudo cp /home/jsy/devops/docker_workdir/deploy/output/bin/deploy /opt/sduweblab/bin/deploy
sudo cp /home/jsy/devops/docker_workdir/monitor/output/bin/monitor /opt/sduweblab/bin/monitor
sudo cp /home/jsy/devops/docker_workdir/push_to_harbor/output/bin/push_to_harbor /opt/sduweblab/bin/push_to_harbor
cd
```





原先的shell换成go程序即可。



测试脚本：

```go
cd deploy && /opt/sduweblab/bin/deploy --harbor_url=211.87.224.233:8930 --harbor_repo=sdu-weblab --project=springboot-helloworld --version=origin/master --container_port=8080
```

