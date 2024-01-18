---
title: Jenkins-API
date: 2022-05-13 02:43:18
categories: Jenkins
tags:
  - Jenkins
---




# REST API

Many objects of Jenkins provide the remote access API. They are available at `/.../api/` where "..." portion is the object for which you'd like to access.

+ [XML API](http://211.87.224.233:18080/api/xml)

  Access data exposed in [HTML](http://211.87.224.233:18080/) as XML for machine consumption. [Schema](http://211.87.224.233:18080/api/schema) is also available.You can also specify optional XPath to control the fragment you'd like to obtain (but see [below](http://211.87.224.233:18080/api/#tree)). For example, `../api/xml?xpath=/*/*[0]`.For XPath that matches multiple nodes, you need to also specify the "wrapper" query parameter to specify the name of the root XML element to be create so that the resulting XML becomes well-formed.Similarly `exclude` query parameter can be used to exclude nodes that match the given XPath from the result. This is useful for trimming down the amount of data you fetch (but again see [below](http://211.87.224.233:18080/api/#tree)). This query parameter can be specified multiple times.XPath filtering is powerful, and you can have it only return a very small data, but note that the server still has to build a full DOM of the raw data, which could cause a large memory spike. To avoid overloading the server, consider using the `tree` parameter, or use the `xpath` parameter in conjunction with the `tree` parameter. When used together, the result of the `tree` parameter filtering is built into DOM, then the XPath is applied to compute the final return value. In this way, you can often substantially reduce the size of DOM built in memory.

+ [JSON API](http://211.87.224.233:18080/api/json?pretty=true)

  Access the same data as JSON for JavaScript-based access. `tree` may be used.

+ [Python API](http://211.87.224.233:18080/api/python?pretty=true)

  Access the same data as Python for Python clients. This can be parsed into Python objects as `ast.literal_eval(urllib.urlopen("...").read())` and the resulting object tree is identical to that of JSON.

For more information about remote API in Jenkins, see [the documentation](https://www.jenkins.io/redirect/remote-api).

## Controlling the amount of data you fetch

The `tree` query parameter allows you to explicitly specify and retrieve only the information you are looking for, by using an XPath-ish path expression. The value should be a list of property names to include, with sub-properties inside square braces. Try [tree=jobs[name\],views[name,jobs[name]]](http://211.87.224.233:18080/api/xml?tree=jobs[name],views[name,jobs[name]]) to see just a list of jobs (only giving the name) and views (giving the name and jobs they contain). **Note**: for array-type properties (such as `jobs` in this example), the name must be given in the original plural, not in the singular as the element would appear in XML (`<job>`). This will be more natural for e.g. [json?tree=jobs[name\]](http://211.87.224.233:18080/api/json?tree=jobs[name]) anyway: the JSON writer does not do plural-to-singular mangling because arrays are represented explicitly.

For array-type properties, a range specifier is supported. For example, `tree=jobs[name]{0,10}` would retrieve the name of the first 10 jobs. The range specifier has the following variants:

+ **{M,N}**: From the M-th element (inclusive) to the N-th element (exclusive).
+ **{M,}**: From the M-th element (inclusive) to the end.
+ **{,N}**: From the first element (inclusive) to the N-th element (exclusive). The same as {0,N}.
+ **{N}**: Just retrieve the N-th element. The same as {N,N+1}.

Another way to retrieve more data is to use the `depth=N` query parameter. This retrieves all the data up to the specified depth. Compare [depth=0](http://211.87.224.233:18080/api/xml) and [depth=1](http://211.87.224.233:18080/api/xml?depth=1) and see what the difference is for yourself. Also note that data created by a smaller depth value is always a subset of the data created by a bigger depth value.

Because of the size of the data, the `depth` parameter should really be only used to explore what data Jenkins can return. Once you identify the data you want to retrieve, you can then come up with the `tree` parameter to exactly specify the data you need.

## Create Job
要创建新的Job，请使用查询参数发布config.xml到此URL（http://{jenkinsUrl}/createItem ），带上请求参数`name=*JOBNAME*`，请求头上带着`Content-Type: application/xml` 。

如果创建成功，您将获得 200 状态码，如果创建失败，您将获得 4xx/5xx 码。

`config.xml`是 Jenkins 用于将Job（无论是FreeStyle、Pipeline，还是其他类型的）存储在文件系统中的文件格式，因此可以在 Jenkins 主目录中查看它们的示例，或者通过直接从`/job/*JOBNAME*/config.xml`查询已经存在的job的xml定义。

## Copy Job
为了复制一个已有的Job，发送Post请求到此URL（http://{jenkinsUrl}/createItem ），带上请求参数`name=*NEWJOBNAME*&mode=copy&from=*FROMJOBNAME*`。



## Build Queue

Build queue has [its own separate API](http://211.87.224.233:18080/queue/api/).

## Load Statistics

Overall load statistics of Jenkins has [its own separate API](http://211.87.224.233:18080/overallLoad/api/).

## Restarting Jenkins

Jenkins will enter into the "quiet down" mode by sending a POST request with optional `reason` query parameter to [this URL](http://211.87.224.233:18080/quietDown). You can also send another request to this URL to update the reason. You can cancel this mode by sending a POST request to [this URL](http://211.87.224.233:18080/cancelQuietDown). On environments where Jenkins can restart itself (such as when Jenkins is installed as a Windows service), POSTing to [this URL](http://211.87.224.233:18080/restart) will start the restart sequence, or [this URL](http://211.87.224.233:18080/safeRestart) to restart once no jobs are running. All these URLs need Overall/Manage permission (typically granted via Overall/Administer).



> 参考文档
>
> https://ci.jenkins.io/api/
>
> https://www.jenkins.io/doc/book/using/remote-access-api/







# 使用 Jenkins API的Java客户端

## Maven依赖

```xml
<!--jenkins-java-client-->
<dependency>
    <groupId>com.offbytwo.jenkins</groupId>
    <artifactId>jenkins-client</artifactId>
    <version>0.3.8</version>
</dependency>
```



## 连接Jenkins

```java
package com.sdu.jsy.learnjenkins.config;

/**
 * @author: SongyangJi
 * @description:
 * @since: 2022/5/17
 */

@ConfigurationProperties(value = "jenkins")
@Configuration
@Getter
@Setter
public class JenkinsConfig {

    String url;
    String username;
    String token;

    /*
     * JenkinsHttpClient 和 JenkinsServer 关系：
     * JenkinsServer 是对 JenkinsHttpClient某些功能的更高层次的封装，
     * JenkinsServer依赖于JenkinsHttpClient
     */

    /**
     * Http 客户端工具
     * 如果有些 API 该工具包未提供，可以用此Http客户端操作远程接口，执行命令
     */
    @Bean
    public JenkinsHttpClient getHttpClient() {
        JenkinsHttpClient jenkinsHttpClient = null;
        try {
            jenkinsHttpClient = new JenkinsHttpClient(new URI(url), username, token);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return jenkinsHttpClient;
    }

    /**
     * 连接 Jenkins
     */
    @Bean
    public JenkinsServer connectServer() {
        JenkinsServer jenkinsServer = null;
        try {
            jenkinsServer = new JenkinsServer(new URI(url), username, token);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return jenkinsServer;
    }

}
```






## 操作Job

已有一条工作流：http://localhost:8080/job/pipeline-test/

### 创建Job

#### 查看xml定义
查看定义它的xml：http://localhost:8080/job/pipeline-test/config.xml

```xml
<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job@1180.v04c4e75dce43">
  <actions>
    <org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobAction plugin="pipeline-model-definition@2.2077.vc78ec45162f1"/>
    <org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobPropertyTrackerAction plugin="pipeline-model-definition@2.2077.vc78ec45162f1">
      <jobProperties/>
      <triggers/>
      <parameters/>
      <options/>
    </org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobPropertyTrackerAction>
  </actions>
  <description></description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty plugin="gitlab-plugin@1.5.31">
      <gitLabConnection></gitLabConnection>
      <jobCredentialId></jobCredentialId>
      <useAlternativeCredential>false</useAlternativeCredential>
    </com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty>
    <hudson.model.ParametersDefinitionProperty>
      <parameterDefinitions>
        <net.uaznia.lukanus.hudson.plugins.gitparameter.GitParameterDefinition plugin="git-parameter@0.9.16">
          <name>branch_tag</name>
          <uuid>912c32f3-e614-420d-80f3-f8086c4691d6</uuid>
          <type>PT_BRANCH_TAG</type>
          <branch></branch>
          <tagFilter>*</tagFilter>
          <branchFilter>.*</branchFilter>
          <sortMode>NONE</sortMode>
          <defaultValue>origin/master</defaultValue>
          <selectedValue>NONE</selectedValue>
          <quickFilterEnabled>false</quickFilterEnabled>
          <listSize>5</listSize>
          <requiredParameter>false</requiredParameter>
        </net.uaznia.lukanus.hudson.plugins.gitparameter.GitParameterDefinition>
        <hudson.model.StringParameterDefinition>
          <name>port</name>
          <defaultValue>8080</defaultValue>
          <trim>false</trim>
        </hudson.model.StringParameterDefinition>
      </parameterDefinitions>
    </hudson.model.ParametersDefinitionProperty>
    <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
      <triggers>
        <com.dabsquared.gitlabjenkins.GitLabPushTrigger plugin="gitlab-plugin@1.5.31">
          <spec></spec>
          <triggerOnPush>true</triggerOnPush>
          <triggerToBranchDeleteRequest>false</triggerToBranchDeleteRequest>
          <triggerOnMergeRequest>false</triggerOnMergeRequest>
          <triggerOnlyIfNewCommitsPushed>false</triggerOnlyIfNewCommitsPushed>
          <triggerOnPipelineEvent>false</triggerOnPipelineEvent>
          <triggerOnAcceptedMergeRequest>true</triggerOnAcceptedMergeRequest>
          <triggerOnClosedMergeRequest>false</triggerOnClosedMergeRequest>
          <triggerOnApprovedMergeRequest>true</triggerOnApprovedMergeRequest>
          <triggerOpenMergeRequestOnPush>never</triggerOpenMergeRequestOnPush>
          <triggerOnNoteRequest>true</triggerOnNoteRequest>
          <noteRegex>Jenkins please retry a build</noteRegex>
          <ciSkip>true</ciSkip>
          <skipWorkInProgressMergeRequest>true</skipWorkInProgressMergeRequest>
          <labelsThatForcesBuildIfAdded></labelsThatForcesBuildIfAdded>
          <setBuildDescription>true</setBuildDescription>
          <branchFilterType>All</branchFilterType>
          <includeBranchesSpec></includeBranchesSpec>
          <excludeBranchesSpec></excludeBranchesSpec>
          <sourceBranchRegex></sourceBranchRegex>
          <targetBranchRegex></targetBranchRegex>
          <secretToken>{AQAAABAAAAAQGEXb6DKS0zJvyDXcbayiGrgglRQ7E35la+RU6p8KpAc=}</secretToken>
          <pendingBuildName></pendingBuildName>
          <cancelPendingBuildsOnUpdate>false</cancelPendingBuildsOnUpdate>
        </com.dabsquared.gitlabjenkins.GitLabPushTrigger>
      </triggers>
    </org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
  </properties>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@2689.v434009a_31b_f1">
    <script>pipeline {
    agent any
    
    stages {
        stage(&apos;Stage 1: Fetch code from git&apos;) {
            steps {
                echo &apos;Stage 1: Fetch code from git -- SUCCESS&apos;
            }
        }

        stage(&apos;Stage 2: Build the project using maven&apos;) {
            steps {
                echo &apos;Stage 2: Build the project using maven -- SUCCESS&apos;
            }
        }

        stage(&apos;Stage 3: Make a custom image using docker&apos;) {
            steps {
                echo &apos;Stage 3: Make a custom image using docker -- SUCCESS&apos;
            }
        }

        stage(&apos;Stage 4: Push image to Harbor&apos;) {
            steps {
                echo &apos;Stage 4: Push image to Harbor -- SUCCESS&apos;
            }
        }

        stage(&apos;Stage 5: Publish over SSH&apos;) {
            steps {
                echo &apos;Stage 5: Publish over SSH -- SUCCESS&apos;
            }
        }

    }
}</script>
    <sandbox>true</sandbox>
  </definition>
  <triggers/>
  <disabled>false</disabled>
</flow-definition>
```

其实此xml存放于`$JENKINS_HOME/jobs/pipeline-test/config.xml`，也就是`$JENKINS_HOME/jobs/$JOB/config.xml`这个文件。



#### 运行代码

```java
jenkinsServer.createJob("pipeline2", xml); // xml如上
```
抛出异常`org.apache.http.client.HttpResponseException: status code: 403, reason phrase: Forbidden` 。

> 解决方案：https://blog.csdn.net/ccc_bigdata/article/details/108080084





# CLI

下载客户端jar：http://211.87.224.233:18080/cli/



+ 用法
```shell
java -jar jenkins-cli.jar [-s URL] command [opts...] args...
```

+ 示例
```shell
java -jar jenkins-cli.jar -s http://211.87.224.233:18080/ -auth admin:admin -webSocket help
```






>  参考文档
>
> http://www.mydlq.club/article/23/

