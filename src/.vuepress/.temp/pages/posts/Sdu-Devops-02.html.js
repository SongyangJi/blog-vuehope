export const data = JSON.parse("{\"key\":\"v-4bb20165\",\"path\":\"/posts/Sdu-Devops-02.html\",\"title\":\"使用Jenkins的pipeline实现CI/CD\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"使用Jenkins的pipeline实现CI/CD\",\"date\":\"2022-05-07T21:00:00.000Z\",\"categories\":\"DevOps\",\"description\":\"Pipeline Prerequisites 安装Pipeline插件 在你想创建一条流水线的时候，有可能发现并没有这个UI入口，原因是还没有下载相关插件，所以可以下载插件****，这是一整套和流水线相关的插件。（还有 BlueOcean等其他流水线相关的插件，这里先不使用，只使用classic的pipeline）。 下载完记得重启docker-compose restart。 创建流水线 Jenkinsfile模板 pipeline { agent any stages { stage('Stage 1: Fetch code from git') { steps { echo 'Stage 1: Fetch code from git -- SUCCESS' } } stage('Stage 2: Build the project using maven') { steps { echo 'Stage 2: Build the project using maven -- SUCCESS' } } stage('Stage 3: Make a custom image using docker') { steps { echo 'Stage 3: Make a custom image using docker -- SUCCESS' } } stage('Stage 4: Push image to Harbor') { steps { echo 'Stage 4: Push image to Harbor -- SUCCESS' } } stage('Stage 5: Publish over SSH') { steps { echo 'Stage 5: Publish over SSH -- SUCCESS' } } } }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Sdu-Devops-02.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"使用Jenkins的pipeline实现CI/CD\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Pipeline Prerequisites 安装Pipeline插件 在你想创建一条流水线的时候，有可能发现并没有这个UI入口，原因是还没有下载相关插件，所以可以下载插件****，这是一整套和流水线相关的插件。（还有 BlueOcean等其他流水线相关的插件，这里先不使用，只使用classic的pipeline）。 下载完记得重启docker-compose restart。 创建流水线 Jenkinsfile模板 pipeline { agent any stages { stage('Stage 1: Fetch code from git') { steps { echo 'Stage 1: Fetch code from git -- SUCCESS' } } stage('Stage 2: Build the project using maven') { steps { echo 'Stage 2: Build the project using maven -- SUCCESS' } } stage('Stage 3: Make a custom image using docker') { steps { echo 'Stage 3: Make a custom image using docker -- SUCCESS' } } stage('Stage 4: Push image to Harbor') { steps { echo 'Stage 4: Push image to Harbor -- SUCCESS' } } stage('Stage 5: Publish over SSH') { steps { echo 'Stage 5: Publish over SSH -- SUCCESS' } } } }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-05-07T21:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"使用Jenkins的pipeline实现CI/CD\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-05-07T21:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"Prerequisites\",\"slug\":\"prerequisites\",\"link\":\"#prerequisites\",\"children\":[{\"level\":3,\"title\":\"安装Pipeline插件\",\"slug\":\"安装pipeline插件\",\"link\":\"#安装pipeline插件\",\"children\":[]}]},{\"level\":2,\"title\":\"创建流水线\",\"slug\":\"创建流水线\",\"link\":\"#创建流水线\",\"children\":[{\"level\":3,\"title\":\"Jenkinsfile模板\",\"slug\":\"jenkinsfile模板\",\"link\":\"#jenkinsfile模板\",\"children\":[]}]},{\"level\":2,\"title\":\"从GitLab拉取代码\",\"slug\":\"从gitlab拉取代码\",\"link\":\"#从gitlab拉取代码\",\"children\":[{\"level\":3,\"title\":\"Git Parameter\",\"slug\":\"git-parameter\",\"link\":\"#git-parameter\",\"children\":[]},{\"level\":3,\"title\":\"使用WebHooks实现push分支自动build\",\"slug\":\"使用webhooks实现push分支自动build\",\"link\":\"#使用webhooks实现push分支自动build\",\"children\":[]}]},{\"level\":2,\"title\":\"使用Jenkins容器内的Maven打包\",\"slug\":\"使用jenkins容器内的maven打包\",\"link\":\"#使用jenkins容器内的maven打包\",\"children\":[]},{\"level\":2,\"title\":\"使用Jenkins容器内的Docker制作自定义镜像\",\"slug\":\"使用jenkins容器内的docker制作自定义镜像\",\"link\":\"#使用jenkins容器内的docker制作自定义镜像\",\"children\":[]},{\"level\":2,\"title\":\"将自定义镜像推送到Harbor\",\"slug\":\"将自定义镜像推送到harbor\",\"link\":\"#将自定义镜像推送到harbor\",\"children\":[]},{\"level\":2,\"title\":\"通过SSH通知目标服务器部署\",\"slug\":\"通过ssh通知目标服务器部署\",\"link\":\"#通过ssh通知目标服务器部署\",\"children\":[]},{\"level\":2,\"title\":\"通过SSH通知目标服务器部署（部署端使用go部署）\",\"slug\":\"通过ssh通知目标服务器部署-部署端使用go部署\",\"link\":\"#通过ssh通知目标服务器部署-部署端使用go部署\",\"children\":[{\"level\":3,\"title\":\"部署程序\",\"slug\":\"部署程序\",\"link\":\"#部署程序\",\"children\":[]},{\"level\":3,\"title\":\"监控程序\",\"slug\":\"监控程序\",\"link\":\"#监控程序\",\"children\":[]},{\"level\":3,\"title\":\"构建脚本\",\"slug\":\"构建脚本\",\"link\":\"#构建脚本\",\"children\":[]}]}],\"readingTime\":{\"minutes\":12.17,\"words\":3651},\"filePathRelative\":\"posts/Sdu-Devops-02.md\",\"localizedDate\":\"2022年5月8日\",\"excerpt\":\"<h1> Pipeline</h1>\\n<h2> Prerequisites</h2>\\n<h3> 安装Pipeline插件</h3>\\n<p>在你想创建一条流水线的时候，有可能发现并没有这个UI入口，原因是还没有下载相关插件，所以可以下载插件****，这是一整套和流水线相关的插件。（还有 BlueOcean等其他流水线相关的插件，这里先不使用，只使用classic的pipeline）。</p>\\n<p>下载完记得重启<code>docker-compose restart</code>。</p>\\n<h2> 创建流水线</h2>\\n<h3> Jenkinsfile模板</h3>\\n<div class=\\\"language-text line-numbers-mode\\\" data-ext=\\\"text\\\"><pre class=\\\"language-text\\\"><code>pipeline {\\n    agent any\\n\\n    stages {\\n        stage('Stage 1: Fetch code from git') {\\n            steps {\\n                echo 'Stage 1: Fetch code from git -- SUCCESS'\\n            }\\n        }\\n\\n        stage('Stage 2: Build the project using maven') {\\n            steps {\\n                echo 'Stage 2: Build the project using maven -- SUCCESS'\\n            }\\n        }\\n\\n        stage('Stage 3: Make a custom image using docker') {\\n            steps {\\n                echo 'Stage 3: Make a custom image using docker -- SUCCESS'\\n            }\\n        }\\n\\n        stage('Stage 4: Push image to Harbor') {\\n            steps {\\n                echo 'Stage 4: Push image to Harbor -- SUCCESS'\\n            }\\n        }\\n\\n        stage('Stage 5: Publish over SSH') {\\n            steps {\\n                echo 'Stage 5: Publish over SSH -- SUCCESS'\\n            }\\n        }\\n\\n    }\\n}\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}