<template><div><h1 id="pipeline" tabindex="-1"><a class="header-anchor" href="#pipeline" aria-hidden="true">#</a> Pipeline</h1>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2>
<h3 id="安装pipeline插件" tabindex="-1"><a class="header-anchor" href="#安装pipeline插件" aria-hidden="true">#</a> 安装Pipeline插件</h3>
<p>在你想创建一条流水线的时候，有可能发现并没有这个UI入口，原因是还没有下载相关插件，所以可以下载插件****，这是一整套和流水线相关的插件。（还有 BlueOcean等其他流水线相关的插件，这里先不使用，只使用classic的pipeline）。</p>
<p>下载完记得重启<code v-pre>docker-compose restart</code>。</p>
<h2 id="创建流水线" tabindex="-1"><a class="header-anchor" href="#创建流水线" aria-hidden="true">#</a> 创建流水线</h2>
<h3 id="jenkinsfile模板" tabindex="-1"><a class="header-anchor" href="#jenkinsfile模板" aria-hidden="true">#</a> Jenkinsfile模板</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>pipeline {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="从gitlab拉取代码" tabindex="-1"><a class="header-anchor" href="#从gitlab拉取代码" aria-hidden="true">#</a> 从GitLab拉取代码</h2>
<p>流水线片段脚本：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>                checkout([$class: 'GitSCM', branches: [[name: '${branch_tag}']], extensions: [], userRemoteConfigs: [[url: 'http://211.87.224.233:8929/sdu-weblab/springboot-helloworld.git']]])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中<code v-pre>branch_tag</code>为git参数（此项功能需要 Git Parameter 插件）。</p>
<p>stage为：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>        stage('Stage 1: Fetch code from git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '${branch_tag}']], extensions: [], userRemoteConfigs: [[url: 'http://211.87.224.233:8929/sdu-weblab/springboot-helloworld.git']]])
                echo 'Stage 1: Fetch code from git -- SUCCESS'
            }
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="git-parameter" tabindex="-1"><a class="header-anchor" href="#git-parameter" aria-hidden="true">#</a> Git Parameter</h3>
<p>该插件允许您在构建中分配<strong>branch, tag, pull request or revision number</strong>作为参数。</p>
<p>此插件将从你的项目中读取 GIT SCM 配置。
这个插件直接使用了<a href="https://plugins.jenkins.io/git/" target="_blank" rel="noopener noreferrer">Git Plugin<ExternalLinkIcon/></a>和<a href="https://plugins.jenkins.io/git-client/" target="_blank" rel="noopener noreferrer">Git Client Plugin<ExternalLinkIcon/></a>。</p>
<p>git 拉取分支：</p>
<p>checkout: Check out from version control</p>
<p>http://211.87.224.233:18080/</p>
<p>https://plugins.jenkins.io/git-parameter</p>
<h3 id="使用webhooks实现push分支自动build" tabindex="-1"><a class="header-anchor" href="#使用webhooks实现push分支自动build" aria-hidden="true">#</a> 使用WebHooks实现push分支自动build</h3>
<p><s>http://211.87.224.233:8080/project/pipeline-springboot-helloworld</s></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Hook executed successfully but returned HTTP 404 &lt;!doctype html>&lt;html lang="en">&lt;head>&lt;title>HTTP Status 404 – Not Found&lt;/title>&lt;style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}&lt;/style>&lt;/head>&lt;body>&lt;h1>HTTP Status 404 – Not Found&lt;/h1>&lt;/body>&lt;/html>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>下载插件<strong>Gitlab</strong>插件</li>
<li>在gitlab上设置Jenkins里插件生成的webhook，并添加secret token。此次webhook token为http://jenkins:8080/project/pipeline-springboot-helloworld</li>
</ol>
<h2 id="使用jenkins容器内的maven打包" tabindex="-1"><a class="header-anchor" href="#使用jenkins容器内的maven打包" aria-hidden="true">#</a> 使用Jenkins容器内的Maven打包</h2>
<p>打包命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token variable">${MAVEN_HOME}</span>/bin/mvn clean package <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true <span class="token comment"># 容器内的${MAVEN_HOME},不是宿主机的,在这里为/opt/maven</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>片段生成器生成的语句:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sh</span> <span class="token string">'/opt/maven/bin/mvn clean package -Dmaven.test.skip=true'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>stage为：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>        stage<span class="token punctuation">(</span><span class="token string">'Stage 2: Build the project using maven'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                // 下面两条shell作debug用，后面删去
                <span class="token function">sh</span> <span class="token string">'pwd'</span>
                <span class="token function">sh</span> <span class="token string">'ls -al'</span>
                <span class="token function">sh</span> <span class="token string">'/opt/maven/bin/mvn clean package -Dmaven.test.skip=true'</span>
                <span class="token builtin class-name">echo</span> <span class="token string">'Stage 2: Build the project using maven -- SUCCESS'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>+ <span class="token builtin class-name">pwd</span>
/var/jenkins_home/workspace/pipeline-springboot-helloworld
<span class="token punctuation">[</span>Pipeline<span class="token punctuation">]</span> <span class="token function">sh</span>
+ <span class="token function">ls</span> <span class="token parameter variable">-al</span>
total <span class="token number">8</span>
drwxr-xr-x <span class="token number">5</span> jenkins jenkins  <span class="token number">100</span> May  <span class="token number">6</span> <span class="token number">10</span>:11 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">4</span> jenkins jenkins   <span class="token number">98</span> May  <span class="token number">6</span> <span class="token number">10</span>:09 <span class="token punctuation">..</span>
drwxr-xr-x <span class="token number">8</span> jenkins jenkins  <span class="token number">210</span> May  <span class="token number">6</span> <span class="token number">10</span>:13 .git
-rw-r--r-- <span class="token number">1</span> jenkins jenkins  <span class="token number">387</span> May  <span class="token number">5</span> <span class="token number">15</span>:35 .gitignore
-rw-r--r-- <span class="token number">1</span> jenkins jenkins <span class="token number">1437</span> May  <span class="token number">5</span> <span class="token number">15</span>:35 pom.xml
drwxr-xr-x <span class="token number">4</span> jenkins jenkins   <span class="token number">42</span> May  <span class="token number">5</span> <span class="token number">15</span>:35 src
drwxr-xr-x <span class="token number">6</span> jenkins jenkins  <span class="token number">199</span> May  <span class="token number">6</span> <span class="token number">10</span>:12 target
<span class="token punctuation">[</span>Pipeline<span class="token punctuation">]</span> <span class="token function">sh</span>
+ /opt/maven/bin/mvn clean package <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Scanning <span class="token keyword">for</span> projects<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> -----------------------<span class="token operator">&lt;</span> com.sduweb:helloworld <span class="token operator">></span>------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Building helloworld <span class="token number">0.0</span>.1-SNAPSHOT
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --------------------------------<span class="token punctuation">[</span> jar <span class="token punctuation">]</span>---------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-clean-plugin:3.1.0:clean <span class="token punctuation">(</span>default-clean<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Deleting /var/jenkins_home/workspace/pipeline-springboot-helloworld/target
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-resources-plugin:3.2.0:resources <span class="token punctuation">(</span>default-resources<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Using <span class="token string">'UTF-8'</span> encoding to copy filtered resources.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Using <span class="token string">'UTF-8'</span> encoding to copy filtered properties files.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Copying <span class="token number">1</span> resource
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Copying <span class="token number">0</span> resource
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-compiler-plugin:3.8.1:compile <span class="token punctuation">(</span>default-compile<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Changes detected - recompiling the module<span class="token operator">!</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Compiling <span class="token number">2</span> <span class="token builtin class-name">source</span> files to /var/jenkins_home/workspace/pipeline-springboot-helloworld/target/classes
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-resources-plugin:3.2.0:testResources <span class="token punctuation">(</span>default-testResources<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Not copying <span class="token builtin class-name">test</span> resources
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-compiler-plugin:3.8.1:testCompile <span class="token punctuation">(</span>default-testCompile<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Not compiling <span class="token builtin class-name">test</span> sources
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-surefire-plugin:2.22.2:test <span class="token punctuation">(</span>default-test<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests are skipped.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-jar-plugin:3.2.2:jar <span class="token punctuation">(</span>default-jar<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Building jar: /var/jenkins_home/workspace/pipeline-springboot-helloworld/target/helloworld-0.0.1-SNAPSHOT.jar
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- spring-boot-maven-plugin:2.6.4:repackage <span class="token punctuation">(</span>repackage<span class="token punctuation">)</span> @ helloworld ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Replacing main artifact with repackaged archive
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time:  <span class="token number">2.425</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2022</span>-05-06T10:14:04Z
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的日志输出可以得到如下结论：</p>
<ol>
<li>对于Jenkins每一个流水线项目，Jenkins都会在存储在<code v-pre>/var/jenkins_home/workspace/${projectName}</code></li>
<li>从gitlab拉取代码后存储在本流水线对应的目录下<code v-pre>/var/jenkins_home/workspace/${projectName}</code></li>
<li>打完jar后存储在<code v-pre>/var/jenkins_home/workspace/${projectName}/target/xxx.jar</code></li>
</ol>
<blockquote>
<p><strong>跳过单元测试</strong></p>
<ul>
<li>
<p>-DskipTests，不执行<a href="https://so.csdn.net/so/search?q=%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">测试用例<ExternalLinkIcon/></a>，但编译测试用例类生成相应的class文件至target/test-classes下。</p>
</li>
<li>
<p>-Dmaven.test.skip=true，不执行测试用例，也不编译测试用例类。</p>
</li>
</ul>
</blockquote>
<blockquote>
<p>参考
https://www.jianshu.com/p/6f91752f3962
https://www.jianshu.com/p/6f57c322e50e</p>
</blockquote>
<h2 id="使用jenkins容器内的docker制作自定义镜像" tabindex="-1"><a class="header-anchor" href="#使用jenkins容器内的docker制作自定义镜像" aria-hidden="true">#</a> 使用Jenkins容器内的Docker制作自定义镜像</h2>
<p>pwd: /var/jenkins_home/workspace/${projectName}
/target/xxx.jar</p>
<p>Dockerfile</p>
<div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre v-pre class="language-Dockerfile"><code>FROM openjdk:8-jdk-alpine
ARG JarFileName
COPY ${JarFileName} /opt/weblab/
WORKDIR /opt/weblab/
CMD java -jar ${JarFileName}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>执行shell</s></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> <span class="token parameter variable">-r</span> /opt/docker_workdir ./
<span class="token function">cp</span> ./target/*.jar ./docker_workdir
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span> ./docker_workdir --build-arg <span class="token assign-left variable">JarFileName</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> target <span class="token parameter variable">-l</span> <span class="token operator">|</span> <span class="token function">grep</span> jar$ <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $9}'</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>流水线片段</s></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sh</span> <span class="token string">''</span>'cp <span class="token parameter variable">-r</span> /opt/docker_workdir ./
<span class="token function">cp</span> ./target/*.jar ./docker_workdir
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span> ./docker_workdir --build-arg <span class="token assign-left variable">JarFileName</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> target <span class="token parameter variable">-l</span> <span class="token operator">|</span> <span class="token function">grep</span> jar$ <span class="token operator">|</span> <span class="token function">awk</span> <span class="token punctuation">\</span>'<span class="token punctuation">{</span>print $9<span class="token punctuation">}</span><span class="token punctuation">\</span>'<span class="token variable">)</span></span><span class="token string">''</span>'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>stage: 为</s></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>        stage('Stage 3: Make a custom image using docker') {
            steps {
                sh '''
                cp -r /opt/docker_workdir ./
                cp ./target/*.jar ./docker_workdir
                docker build -t ${JOB_NAME}:${branch_tag##*/} ./docker_workdir --build-arg JarFileName=$(ls target -l | grep jar$ | awk \'{print $9}\')
                '''
                echo 'Stage 3: Make a custom image using docker -- SUCCESS'
            }
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>build_image.sh</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> <span class="token parameter variable">-r</span> /opt/docker_workdir ./
<span class="token function">cp</span> ./target/*.jar ./docker_workdir
<span class="token assign-left variable">jarFileName</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> *.jar<span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">"jar is <span class="token variable">${jarFileName}</span>"</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span> ./docker_workdir --build-arg  <span class="token assign-left variable">JarFileName</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${jarFileName}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将自定义镜像推送到harbor" tabindex="-1"><a class="header-anchor" href="#将自定义镜像推送到harbor" aria-hidden="true">#</a> 将自定义镜像推送到Harbor</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login <span class="token parameter variable">-u</span> admin <span class="token parameter variable">-p</span> admin <span class="token variable">$HARBOR_URL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Jenkinsfile:</p>
<p>增加以下环境变量</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>pipeline {
    agent any
    
		environment {
        harbor_user = 'admin'
        harbor_password = 'admin'
        harbor_url = '211.87.224.233:8930'
        harbor_repo = 'sdu-weblab'
    }
    // ......
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Shell</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login <span class="token parameter variable">-u</span> <span class="token variable">${harborUser}</span> <span class="token parameter variable">-p</span> <span class="token variable">${harborPassword}</span> <span class="token variable">${harbor_url}</span>
<span class="token function">docker</span> tag <span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span> <span class="token variable">${harbor_url}</span>/<span class="token variable">${harbor_repo}</span>/<span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span>
<span class="token function">docker</span> rmi <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-f</span> <span class="token string">"dangling=true"</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>
<span class="token function">docker</span> push <span class="token variable">${harbor_url}</span>/<span class="token variable">${harbor_repo}</span>/<span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>pipeline script:</s></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>                <span class="token function">sh</span> <span class="token string">''</span>'
                    <span class="token function">docker</span> login <span class="token parameter variable">-u</span> <span class="token variable">${harborUser}</span> <span class="token parameter variable">-p</span> <span class="token variable">${harborPassword}</span> <span class="token variable">${harbor_url}</span>
                    <span class="token function">docker</span> tag <span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span> <span class="token variable">${harbor_url}</span>/<span class="token variable">${harbor_repo}</span>/<span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span>
                    <span class="token function">docker</span> rmi <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-f</span> <span class="token string">"dangling=true"</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>
                    <span class="token function">docker</span> push <span class="token variable">${harbor_url}</span>/<span class="token variable">${harbor_repo}</span>/<span class="token variable">${JOB_NAME}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span>
                 <span class="token string">''</span>'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>stage为：</s></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>        stage('Stage 4: Push image to Harbor') {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>改为执行本地的脚本。</s></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">harbor_user</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token assign-left variable">harbor_password</span><span class="token operator">=</span><span class="token variable">$2</span>
<span class="token assign-left variable">harbor_url</span><span class="token operator">=</span><span class="token variable">$3</span>
<span class="token assign-left variable">harbor_repo</span><span class="token operator">=</span><span class="token variable">$4</span>
<span class="token assign-left variable">project</span><span class="token operator">=</span><span class="token variable">$5</span>
<span class="token assign-left variable">branch_tag</span><span class="token operator">=</span><span class="token variable">$6</span>

<span class="token assign-left variable">image_name</span><span class="token operator">=</span><span class="token variable">${harbor_url}</span>/<span class="token variable">${harbor_repo}</span>/<span class="token variable">${project}</span><span class="token builtin class-name">:</span><span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span>

<span class="token comment"># 删除和镜像关联的容器(正常情况不会有，但这里是单机部署)</span>
<span class="token assign-left variable">container_id</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"<span class="token variable">${image_name}</span>"</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${container_id}</span>"</span> <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"Container <span class="token variable">${container_id}</span> of <span class="token variable">${image_name}</span> is running, now try to kill it..."</span>
  <span class="token function">docker</span> stop <span class="token string">"<span class="token variable">$container_id</span>"</span>
  <span class="token function">docker</span> <span class="token function">rm</span> <span class="token string">"<span class="token variable">$container_id</span>"</span>
<span class="token keyword">fi</span>
<span class="token comment"># todo 这样做其实还有是问题的，就是上面的 container_id 可能会有多个</span>

<span class="token comment"># shellcheck disable=SC2086</span>
<span class="token function">docker</span> login <span class="token parameter variable">-u</span> <span class="token string">"<span class="token variable">${harbor_user}</span>"</span> <span class="token parameter variable">-p</span> <span class="token string">"<span class="token variable">${harbor_password}</span>"</span> <span class="token variable">${harbor_url}</span>

<span class="token function">docker</span> tag <span class="token string">"<span class="token variable">${project}</span>"</span><span class="token builtin class-name">:</span><span class="token string">"<span class="token variable">${branch_tag<span class="token operator">##</span>*<span class="token operator">/</span>}</span>"</span> <span class="token string">"<span class="token variable">${image_name}</span>"</span>
<span class="token function">docker</span> rmi <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-f</span> <span class="token string">"dangling=true"</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>
<span class="token function">docker</span> push image_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Jenkins端shell：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/opt/docker_workdir/push_to_harbor.sh <span class="token variable">$harbor_user</span> <span class="token variable">$harbor_password</span> <span class="token variable">$harbor_url</span> <span class="token variable">$harbor_repo</span> <span class="token variable">$JOB_NAME</span> <span class="token variable">$branch_tag</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>流水线片段</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sh</span> <span class="token string">'/opt/docker_workdir/push_to_harbor.sh $harbor_user $harbor_password $harbor_url $harbor_repo $JOB_NAME $branch_tag'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 删除悬挂镜像</span>
<span class="token function">docker</span> rmi <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-f</span> <span class="token string">"dangling=true"</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em>docker中的none:none镜像是怎么回事？</em>
https://projectatomic.io/blog/2015/07/what-are-docker-none-none-images/</p>
</blockquote>
<p>用 go 改写：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"flag"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
	<span class="token string">"strings"</span>
	<span class="token string">"time"</span>

	<span class="token string">"github.com/docker/docker/api/types"</span>
	<span class="token string">"github.com/docker/docker/client"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	harborUser     <span class="token builtin">string</span>
	harborPassword <span class="token builtin">string</span>
	harborUrl      <span class="token builtin">string</span>
	harborRepo     <span class="token builtin">string</span>
	project        <span class="token builtin">string</span>
	version        <span class="token builtin">string</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	logFileName <span class="token builtin">string</span>
	logFile     <span class="token operator">*</span>os<span class="token punctuation">.</span>File
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> err <span class="token builtin">error</span>
	logFileName <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">"2006-01-02 15:04:05"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"[push_to_harbor].log"</span>
	logFile<span class="token punctuation">,</span> err <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>logFileName<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_APPEND<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">SetOutput</span><span class="token punctuation">(</span>logFile<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">SetPrefix</span><span class="token punctuation">(</span><span class="token string">"[sdu-weblab-deploy]"</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">SetFlags</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span>LstdFlags <span class="token operator">|</span> log<span class="token punctuation">.</span>Lshortfile <span class="token operator">|</span> log<span class="token punctuation">.</span>LUTC<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>harborUser<span class="token punctuation">,</span> <span class="token string">"harbor_User"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>harborPassword<span class="token punctuation">,</span> <span class="token string">"harbor_password"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>harborUrl<span class="token punctuation">,</span> <span class="token string">"harbor_url"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>harborRepo<span class="token punctuation">,</span> <span class="token string">"harbor_repo"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>project<span class="token punctuation">,</span> <span class="token string">"project"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>version<span class="token punctuation">,</span> <span class="token string">"version"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>harborUser<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">len</span><span class="token punctuation">(</span>harborPassword<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">len</span><span class="token punctuation">(</span>harborUrl<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span>
		<span class="token function">len</span><span class="token punctuation">(</span>harborRepo<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">len</span><span class="token punctuation">(</span>project<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">len</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"key args missing"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Notice: harbor_url=%s, harbor_repo=%s, project=%s, version=%s"</span><span class="token punctuation">,</span>
		harborUrl<span class="token punctuation">,</span> harborRepo<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version<span class="token punctuation">)</span>

	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">WithAPIVersionNegotiation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"New docker client fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	version <span class="token operator">=</span> <span class="token function">getRealVersion</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span>
	imageName <span class="token operator">:=</span> <span class="token function">getHarborImageName</span><span class="token punctuation">(</span>harborUrl<span class="token punctuation">,</span> harborRepo<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version<span class="token punctuation">)</span>

	<span class="token comment">// 删除和镜像关联的容器(正常情况不会有，但这里是单机部署)</span>
	<span class="token comment">// 1. check existing containers and remove it if so</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Check if container of %s exists...\n"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	containers<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerList</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ContainerListOptions<span class="token punctuation">{</span>All<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"List all containers fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> timeOut <span class="token operator">=</span> time<span class="token punctuation">.</span>Second
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> containers <span class="token punctuation">{</span>
		<span class="token keyword">if</span> c<span class="token punctuation">.</span>Image <span class="token operator">==</span> imageName <span class="token punctuation">{</span>
			cid <span class="token operator">:=</span> c<span class="token punctuation">.</span>ID
			err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerStop</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> cid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>timeOut<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Warning: container.ID=%s stop failed"</span><span class="token punctuation">,</span> cid<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerRemove</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> cid<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ContainerRemoveOptions<span class="token punctuation">{</span>Force<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Container.ID=%s remove failed"</span><span class="token punctuation">,</span> cid<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 2. tag by the rule of harbor</span>
	<span class="token comment">// 2.1 check and remove outdated version images</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Check if image %s exists...\n"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	imageList<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ImageList</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ImageListOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"List all images fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> image <span class="token operator">:=</span> <span class="token keyword">range</span> imageList <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> repoTag <span class="token operator">:=</span> <span class="token keyword">range</span> image<span class="token punctuation">.</span>RepoTags <span class="token punctuation">{</span>
			<span class="token keyword">if</span> repoTag <span class="token operator">==</span> imageName <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Image=%s exists, next to remove it"</span><span class="token punctuation">,</span> image<span class="token punctuation">.</span>ID<span class="token punctuation">)</span>
				cli<span class="token punctuation">.</span><span class="token function">ImageRemove</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> image<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ImageRemoveOptions<span class="token punctuation">{</span>
					Force<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 2.2 tag</span>
	sourceImageName <span class="token operator">:=</span> <span class="token function">getSourceImageName</span><span class="token punctuation">(</span>harborRepo<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version<span class="token punctuation">)</span>
	err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ImageTag</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> sourceImageName<span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"image tag fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// todo docker rmi $(docker images -f "dangling=true" -q) -f</span>

	<span class="token comment">// 3. push image to harbor</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Push image %s to Harbor...\n"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">RegistryLogin</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>AuthConfig<span class="token punctuation">{</span>
		<span class="token comment">// todo security</span>
		Username<span class="token punctuation">:</span>      <span class="token string">"admin"</span><span class="token punctuation">,</span>
		Password<span class="token punctuation">:</span>      <span class="token string">"admin"</span><span class="token punctuation">,</span>
		ServerAddress<span class="token punctuation">:</span> harborUrl<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"push to harbor fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	out<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ImagePush</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> imageName<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ImagePushOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Pulling image failed, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> out<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>logFile<span class="token punctuation">,</span> out<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token comment">// remove possible "/"</span>
<span class="token keyword">func</span> <span class="token function">getRealVersion</span><span class="token punctuation">(</span>rawVersion <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	parts <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>rawVersion<span class="token punctuation">,</span> <span class="token string">"/"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>parts<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> parts<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>parts<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> version
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getSourceImageName</span><span class="token punctuation">(</span>team<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s/%s/%s:%s"</span><span class="token punctuation">,</span> team<span class="token punctuation">,</span> harborRepo<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getHarborImageName</span><span class="token punctuation">(</span>harborUrl<span class="token punctuation">,</span> harborRepo<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s/%s/%s:%s"</span><span class="token punctuation">,</span> harborUrl<span class="token punctuation">,</span> harborRepo<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通过ssh通知目标服务器部署" tabindex="-1"><a class="header-anchor" href="#通过ssh通知目标服务器部署" aria-hidden="true">#</a> 通过SSH通知目标服务器部署</h2>
<p>这里使用<strong>Publish Over SSH</strong>。</p>
<p><strong>部署端</strong>的执行脚本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">harbor_url</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token assign-left variable">harbor_repo</span><span class="token operator">=</span><span class="token variable">$2</span>
<span class="token assign-left variable">project</span><span class="token operator">=</span><span class="token variable">$3</span>
<span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token variable">$4</span>
<span class="token assign-left variable">container_port</span><span class="token operator">=</span><span class="token variable">$5</span>

<span class="token assign-left variable">image_name</span><span class="token operator">=</span><span class="token variable">$harbor_url</span>/<span class="token variable">$harbor_repo</span>/<span class="token variable">$project</span><span class="token builtin class-name">:</span><span class="token variable">$version</span>

<span class="token assign-left variable">container_id</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"<span class="token variable">${image_name}</span>"</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span><span class="token variable">)</span></span>

<span class="token builtin class-name">echo</span> <span class="token string">"Check if container of <span class="token variable">${image_name}</span> exists..."</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${container_id}</span>"</span> <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"Container <span class="token variable">${container_id}</span> of <span class="token variable">${image_name}</span> is running, now try to kill it..."</span>
  <span class="token function">docker</span> stop <span class="token string">"<span class="token variable">$container_id</span>"</span>
  <span class="token function">docker</span> <span class="token function">rm</span> <span class="token string">"<span class="token variable">$container_id</span>"</span>
<span class="token keyword">fi</span>

<span class="token assign-left variable">old_image</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"<span class="token variable">${image_name}</span>"</span><span class="token variable">)</span></span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${old_image}</span>"</span> <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"Image <span class="token variable">$image_name</span> exists, now try to remove it"</span>
  <span class="token function">docker</span> rmi <span class="token string">"<span class="token variable">$image_name</span>"</span> <span class="token parameter variable">-f</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token string">"Try to login Harbor..."</span>
<span class="token function">docker</span> login <span class="token parameter variable">-u</span> amdin <span class="token parameter variable">-p</span> admin <span class="token string">"<span class="token variable">$harbor_url</span>"</span>
<span class="token builtin class-name">echo</span> <span class="token string">"Login Harbor successfully."</span>

<span class="token builtin class-name">echo</span> <span class="token string">"Try to pull <span class="token variable">$image_name</span> from Harbor..."</span>
<span class="token function">docker</span> pull <span class="token string">"<span class="token variable">${image_name}</span>"</span>
<span class="token builtin class-name">echo</span> <span class="token string">"Pull image <span class="token variable">${image_name}</span> from Harbor successfully."</span>

<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token string">"<span class="token variable">$container_port</span>"</span> <span class="token parameter variable">--name</span> <span class="token string">"<span class="token variable">$harbor_repo</span>.<span class="token variable">$project</span>.<span class="token variable">$version</span>"</span> <span class="token string">"<span class="token variable">$image_name</span>"</span>

<span class="token builtin class-name">echo</span> <span class="token string">"Deploy service successfully."</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上脚本执行了如下事情：</p>
<ol>
<li>检查旧版本的容器是否在运行，如果有停止并删除；</li>
<li>检查旧镜像是否存在，如果有删除；</li>
<li>登录私服Harbor</li>
<li>拉取最新的镜像</li>
<li>运行容器</li>
</ol>
<p>**发布端（Jenkins）**的执行脚本</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> deploy <span class="token operator">&amp;&amp;</span> <span class="token function">touch</span> deploy.log <span class="token operator">&amp;&amp;</span> /home/jsy/devops/docker_workdir/deploy.sh <span class="token variable">$harbor_url</span> <span class="token variable">$harbor_repo</span> <span class="token variable">$JOB_NAME</span> <span class="token variable">$branch_tag</span> <span class="token variable">$container_port</span> <span class="token operator">></span> deploy.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试一下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>cd deploy &amp;&amp; touch deploy.log &amp;&amp; /home/jsy/devops/docker_workdir/deploy.sh 211.87.224.233:8930 sdu-weblab springboot-helloworld origin/master 8080 > deploy.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用sshPublisher生成流水线脚本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>sshPublisher<span class="token punctuation">(</span>publishers: <span class="token punctuation">[</span>sshPublisherDesc<span class="token punctuation">(</span>configName: <span class="token string">'sdu-weblab-local-machine'</span>, transfers: <span class="token punctuation">[</span>sshTransfer<span class="token punctuation">(</span>cleanRemote: false, excludes: <span class="token string">''</span>, execCommand: <span class="token string">"cd deploy &amp;&amp; touch deploy.log &amp;&amp; /home/jsy/devops/docker_workdir/deploy.sh <span class="token variable">$harbor_url</span> <span class="token variable">$harbor_repo</span> <span class="token variable">$JOB_NAME</span> <span class="token variable">$branch_tag</span> <span class="token variable">$container_port</span> > deploy.log"</span>, execTimeout: <span class="token number">120000</span>, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: <span class="token string">'[, ]+'</span>, remoteDirectory: <span class="token string">''</span>, remoteDirectorySDF: false, removePrefix: <span class="token string">''</span>, sourceFiles: <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">]</span>, usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>stage为</p>
<pre><code>        stage('Stage 5: Publish over SSH') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'sdu-weblab-local-machine', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: &quot;cd deploy &amp;&amp; touch deploy.log &amp;&amp; /home/jsy/devops/docker_workdir/deploy.sh $harbor_url $harbor_repo $JOB_NAME $branch_tag $container_port &gt; deploy.log&quot;, execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                echo 'Stage 5: Publish over SSH -- SUCCESS'
            }
        }
</code></pre>
<h2 id="通过ssh通知目标服务器部署-部署端使用go部署" tabindex="-1"><a class="header-anchor" href="#通过ssh通知目标服务器部署-部署端使用go部署" aria-hidden="true">#</a> 通过SSH通知目标服务器部署（部署端使用go部署）</h2>
<h3 id="部署程序" tabindex="-1"><a class="header-anchor" href="#部署程序" aria-hidden="true">#</a> 部署程序</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"errors"</span>
	<span class="token string">"flag"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
	<span class="token string">"os/exec"</span>
	<span class="token string">"strconv"</span>
	<span class="token string">"strings"</span>
	<span class="token string">"time"</span>

	<span class="token string">"github.com/docker/docker/api/types"</span>
	<span class="token string">"github.com/docker/docker/api/types/container"</span>
	<span class="token string">"github.com/docker/docker/client"</span>
	<span class="token string">"github.com/docker/go-connections/nat"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	DefaultVersion       <span class="token operator">=</span> <span class="token string">"master"</span>
	MonitorProgrammeName <span class="token operator">=</span> <span class="token string">"monitor"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	harborUrl     <span class="token builtin">string</span>
	harborRepo    <span class="token builtin">string</span>
	project       <span class="token builtin">string</span>
	version       <span class="token builtin">string</span>
	containerPort <span class="token builtin">int</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	logFileName <span class="token builtin">string</span>
	containerID <span class="token builtin">string</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	logFileName <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">"2006-01-02 15:04:05"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">".log"</span>
	logFile<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>logFileName<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_APPEND<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">SetOutput</span><span class="token punctuation">(</span>logFile<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">SetPrefix</span><span class="token punctuation">(</span><span class="token string">"[sdu-weblab-deploy]"</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">SetFlags</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span>LstdFlags <span class="token operator">|</span> log<span class="token punctuation">.</span>Lshortfile <span class="token operator">|</span> log<span class="token punctuation">.</span>LUTC<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>harborUrl<span class="token punctuation">,</span> <span class="token string">"harbor_url"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>harborRepo<span class="token punctuation">,</span> <span class="token string">"harbor_repo"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>project<span class="token punctuation">,</span> <span class="token string">"project"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>version<span class="token punctuation">,</span> <span class="token string">"version"</span><span class="token punctuation">,</span> DefaultVersion<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>containerPort<span class="token punctuation">,</span> <span class="token string">"container_port"</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>harborUrl<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">len</span><span class="token punctuation">(</span>harborRepo<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">len</span><span class="token punctuation">(</span>project<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"key args missing"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Notice: harbor_url=%s, harbor_repo=%s, project=%s, version=%s, container_port=%d"</span><span class="token punctuation">,</span>
		harborUrl<span class="token punctuation">,</span> harborRepo<span class="token punctuation">,</span> project<span class="token punctuation">,</span> version<span class="token punctuation">,</span> containerPort<span class="token punctuation">)</span>

	version <span class="token operator">=</span> <span class="token function">getBranch</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span>
	imageName <span class="token operator">:=</span> harborUrl <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> harborRepo <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> project <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> version
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Docker image name is %s"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>

	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">WithAPIVersionNegotiation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"New docker client fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 1. check existing containers</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Check if container of %s exists...\n"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	containers<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerList</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ContainerListOptions<span class="token punctuation">{</span>All<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"List all containers fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> timeOut <span class="token operator">=</span> time<span class="token punctuation">.</span>Second
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> containers <span class="token punctuation">{</span>
		<span class="token keyword">if</span> c<span class="token punctuation">.</span>Image <span class="token operator">==</span> imageName <span class="token punctuation">{</span>
			cid <span class="token operator">:=</span> c<span class="token punctuation">.</span>ID
			err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerStop</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> cid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>timeOut<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Warning: container.ID=%s stop failed"</span><span class="token punctuation">,</span> cid<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerRemove</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> cid<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ContainerRemoveOptions<span class="token punctuation">{</span>Force<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Container.ID=%s remove failed"</span><span class="token punctuation">,</span> cid<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 2. check outdated version images</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Check if image %s exists...\n"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	imageList<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ImageList</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ImageListOptions<span class="token punctuation">{</span>
		All<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"List all images fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> image <span class="token operator">:=</span> <span class="token keyword">range</span> imageList <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> repoTag <span class="token operator">:=</span> <span class="token keyword">range</span> image<span class="token punctuation">.</span>RepoTags <span class="token punctuation">{</span>
			<span class="token keyword">if</span> repoTag <span class="token operator">==</span> imageName <span class="token punctuation">{</span>
				cli<span class="token punctuation">.</span><span class="token function">ImageRemove</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> image<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ImageRemoveOptions<span class="token punctuation">{</span>
					Force<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 3. pull image from harbor</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Pull image %s from Harbor...\n"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">RegistryLogin</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> types<span class="token punctuation">.</span>AuthConfig<span class="token punctuation">{</span>
		<span class="token comment">// todo security</span>
		Username<span class="token punctuation">:</span>      <span class="token string">"admin"</span><span class="token punctuation">,</span>
		Password<span class="token punctuation">:</span>      <span class="token string">"admin"</span><span class="token punctuation">,</span>
		ServerAddress<span class="token punctuation">:</span> harborUrl<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// out 是响应输出流，可以不输出</span>
	out<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ImagePull</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> imageName<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ImagePullOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> out<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> out<span class="token punctuation">)</span>

	<span class="token comment">// 4. docker run -d -p "$container_port" --name "$harbor_repo.$project.$version" "$image_name"</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Run image %s to be contaniner...\n"</span><span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
	containerName <span class="token operator">:=</span> harborRepo <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span> project <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span> version
	containerNatPort <span class="token operator">:=</span> nat<span class="token punctuation">.</span><span class="token function">Port</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>containerPort<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"/tcp"</span><span class="token punctuation">)</span>

	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerCreate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span>
		<span class="token operator">&amp;</span>container<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
			Image<span class="token punctuation">:</span> imageName<span class="token punctuation">,</span>
			ExposedPorts<span class="token punctuation">:</span> nat<span class="token punctuation">.</span>PortSet<span class="token punctuation">{</span>
				containerNatPort<span class="token punctuation">:</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>container<span class="token punctuation">.</span>HostConfig<span class="token punctuation">{</span>
			PublishAllPorts<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> containerName<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Creating container failed, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerStart</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> types<span class="token punctuation">.</span>ContainerStartOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Starting container failed, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	containerID <span class="token operator">=</span> resp<span class="token punctuation">.</span>ID
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Container ID = %s"</span><span class="token punctuation">,</span> containerID<span class="token punctuation">)</span>

	<span class="token comment">// todo register to center</span>
	hostPortOfContainerPort<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">getHostPortOfContainerPort</span><span class="token punctuation">(</span>containerID<span class="token punctuation">,</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>containerPort<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Error: get port binding failed, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Container hostPort of container port is %s"</span><span class="token punctuation">,</span> hostPortOfContainerPort<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Deploy successfully."</span><span class="token punctuation">)</span>

	<span class="token comment">// 5. run a new programme to fetch log stream and transfer it to websocket</span>
	<span class="token function">runGoProgramme</span><span class="token punctuation">(</span>MonitorProgrammeName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">runGoProgramme</span><span class="token punctuation">(</span>programme <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Next to run programme %s "</span><span class="token punctuation">,</span> programme<span class="token punctuation">)</span>
	sduWeblabBinHome <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"SDU_WEBLAB_BIN_HOME"</span><span class="token punctuation">)</span>
	s <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s/%s --logFileName=%s --containerID=%s"</span><span class="token punctuation">,</span> sduWeblabBinHome<span class="token punctuation">,</span> programme<span class="token punctuation">,</span> logFileName<span class="token punctuation">,</span> containerID<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Shell script is %s"</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"/bin/bash"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Fail to run programe %s, err=%v"</span><span class="token punctuation">,</span> programme<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getBranch</span><span class="token punctuation">(</span>repoBranch <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	parts <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>repoBranch<span class="token punctuation">,</span> <span class="token string">"/"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>parts<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> parts<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>parts<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> DefaultVersion
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getHostPortOfContainerPort</span><span class="token punctuation">(</span>containerId <span class="token builtin">string</span><span class="token punctuation">,</span> containerPort <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>port <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	shell <span class="token operator">:=</span> <span class="token string">"docker port "</span> <span class="token operator">+</span> containerId <span class="token operator">+</span> <span class="token string">" | grep "</span> <span class="token operator">+</span> containerPort <span class="token operator">+</span> <span class="token string">" | awk '{print $3}'"</span>
	output<span class="token punctuation">,</span> err <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"bash"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> shell<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	shellOut <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span>
	parts <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>shellOut<span class="token punctuation">,</span> <span class="token string">"\n"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>parts<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"containerPort=%s has no bindings"</span><span class="token punctuation">,</span> containerPort<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	ipPort <span class="token operator">:=</span> parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
	splits <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>ipPort<span class="token punctuation">,</span> <span class="token string">":"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>splits<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"invalid format"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	port <span class="token operator">=</span> splits<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监控程序" tabindex="-1"><a class="header-anchor" href="#监控程序" aria-hidden="true">#</a> 监控程序</h3>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"context"</span>
	<span class="token string">"flag"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>

	<span class="token string">"github.com/docker/docker/api/types"</span>
	<span class="token string">"github.com/docker/docker/client"</span>
	<span class="token string">"github.com/gorilla/websocket"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	logFileName <span class="token builtin">string</span>
	containerID <span class="token builtin">string</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	logOut   io<span class="token punctuation">.</span>ReadCloser
	upgrader <span class="token operator">=</span> websocket<span class="token punctuation">.</span>Upgrader<span class="token punctuation">{</span>
		CheckOrigin<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span> <span class="token comment">// use default options</span>
	conn       <span class="token operator">*</span>websocket<span class="token punctuation">.</span>Conn
	listenPort <span class="token builtin">int</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">InitLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	logFile<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>logFileName<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_APPEND<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">SetOutput</span><span class="token punctuation">(</span>logFile<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">SetPrefix</span><span class="token punctuation">(</span><span class="token string">"[sdu-weblab-deploy]"</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">SetFlags</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span>LstdFlags <span class="token operator">|</span> log<span class="token punctuation">.</span>Lshortfile <span class="token operator">|</span> log<span class="token punctuation">.</span>LUTC<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// fetch log stream and transfer it to websocket</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>logFileName<span class="token punctuation">,</span> <span class="token string">"logFileName"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>containerID<span class="token punctuation">,</span> <span class="token string">"containerID"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>logFileName<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token function">len</span><span class="token punctuation">(</span>containerID<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"key args missing"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// init log settings</span>
	<span class="token function">InitLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Fetch log stream and transfer it to websocket...\n"</span><span class="token punctuation">)</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> err <span class="token builtin">error</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewClientWithOpts</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>FromEnv<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">WithAPIVersionNegotiation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"New docker client fail, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	options <span class="token operator">:=</span> types<span class="token punctuation">.</span>ContainerLogsOptions<span class="token punctuation">{</span>
		ShowStdout<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		ShowStderr<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		Follow<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	logOut<span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">ContainerLogs</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> containerID<span class="token punctuation">,</span> options<span class="token punctuation">)</span> <span class="token comment">// remote</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Get log of container failed, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	listener<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">":0"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Net listen failed, err=%v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	listenPort <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">Addr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>net<span class="token punctuation">.</span>TCPAddr<span class="token punctuation">)</span><span class="token punctuation">.</span>Port
	<span class="token comment">// todo register to center</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Websocket port is %d"</span><span class="token punctuation">,</span> listenPort<span class="token punctuation">)</span>

	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/logs"</span><span class="token punctuation">,</span> socketHandler<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">Serve</span><span class="token punctuation">(</span>listener<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">socketHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Upgrade our raw HTTP connection to a websocket based one</span>
	_conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> upgrader<span class="token punctuation">.</span><span class="token function">Upgrade</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"Error during connection upgradation:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	conn <span class="token operator">=</span> _conn
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>logOut<span class="token punctuation">)</span>
	<span class="token comment">// The event loop</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		message<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span>

		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token function">exitAndNotifyPeer</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token function">exitAndNotifyPeer</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//log.Printf("Log read is: %s", message)</span>
		err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">WriteMessage</span><span class="token punctuation">(</span>websocket<span class="token punctuation">.</span>TextMessage<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error during message writing: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">exitAndNotifyPeer</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">,</span> exitCode <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	conn<span class="token punctuation">.</span><span class="token function">WriteMessage</span><span class="token punctuation">(</span>websocket<span class="token punctuation">.</span>CloseMessage<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span>exitCode<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建脚本" tabindex="-1"><a class="header-anchor" href="#构建脚本" aria-hidden="true">#</a> 构建脚本</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>jsy@wzai:~/devops/docker_workdir$ tree
.
├── deploy
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   └── output
│       └── bin
│           └── deploy
├── monitor
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   └── output
│       └── bin
│           └── monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>go build</code></p>
<p>首次构建</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> deploy <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> output/bin <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/deploy
<span class="token builtin class-name">cd</span> monitor <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> output/bin <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后面更新</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> deploy <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/deploy
<span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> monitor <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建或更新软链接</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-s</span> /home/jsy/devops/docker_workdir/deploy/output/bin/deploy /opt/sduweblab/bin/deploy
<span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-s</span> /home/jsy/devops/docker_workdir/monitor/output/bin/monitor /opt/sduweblab/bin/monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><s>更新产物</s></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> deploy <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/deploy
<span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> monitor <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/monitor
<span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-s</span> /home/jsy/devops/docker_workdir/deploy/output/bin/deploy /opt/sduweblab/bin/deploy
<span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-s</span> /home/jsy/devops/docker_workdir/monitor/output/bin/monitor /opt/sduweblab/bin/monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新产物（推送镜像到harbor也使用go改写）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">rm</span> /opt/sduweblab/bin/deploy
<span class="token function">sudo</span> <span class="token function">rm</span> /opt/sduweblab/bin/monitor
<span class="token function">sudo</span> <span class="token function">rm</span> /opt/sduweblab/bin/push_to_harbor
<span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> deploy <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/deploy
<span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> monitor <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/monitor
<span class="token builtin class-name">cd</span> ~/devops/docker_workdir/
<span class="token builtin class-name">cd</span> push_to_harbor <span class="token operator">&amp;&amp;</span> go mod tidy <span class="token operator">&amp;&amp;</span> go build <span class="token parameter variable">-o</span> output/bin/push_to_harbor
<span class="token function">sudo</span> <span class="token function">cp</span> /home/jsy/devops/docker_workdir/deploy/output/bin/deploy /opt/sduweblab/bin/deploy
<span class="token function">sudo</span> <span class="token function">cp</span> /home/jsy/devops/docker_workdir/monitor/output/bin/monitor /opt/sduweblab/bin/monitor
<span class="token function">sudo</span> <span class="token function">cp</span> /home/jsy/devops/docker_workdir/push_to_harbor/output/bin/push_to_harbor /opt/sduweblab/bin/push_to_harbor
<span class="token builtin class-name">cd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原先的shell换成go程序即可。</p>
<p>测试脚本：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>cd deploy <span class="token operator">&amp;&amp;</span> <span class="token operator">/</span>opt<span class="token operator">/</span>sduweblab<span class="token operator">/</span>bin<span class="token operator">/</span>deploy <span class="token operator">--</span>harbor_url<span class="token operator">=</span><span class="token number">211.87</span><span class="token number">.224</span><span class="token number">.233</span><span class="token punctuation">:</span><span class="token number">8930</span> <span class="token operator">--</span>harbor_repo<span class="token operator">=</span>sdu<span class="token operator">-</span>weblab <span class="token operator">--</span>project<span class="token operator">=</span>springboot<span class="token operator">-</span>helloworld <span class="token operator">--</span>version<span class="token operator">=</span>origin<span class="token operator">/</span>master <span class="token operator">--</span>container_port<span class="token operator">=</span><span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


