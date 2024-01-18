<template><div><h1 id="docker虚拟机资源在线管理系统的设计与实现" tabindex="-1"><a class="header-anchor" href="#docker虚拟机资源在线管理系统的设计与实现" aria-hidden="true">#</a> Docker虚拟机资源在线管理系统的设计与实现</h1>
<h2 id="任务书" tabindex="-1"><a class="header-anchor" href="#任务书" aria-hidden="true">#</a> 任务书</h2>
<h3 id="主要研究内容" tabindex="-1"><a class="header-anchor" href="#主要研究内容" aria-hidden="true">#</a> 主要研究内容</h3>
<p>针对研究中心广大教师和研究生的实际需求，构建一个中心IT资源管理系统，该系统允许资源使用者（教师和研究生）在线提出Docker虚拟机的资源申请，在完成相应的审批流程后，实现Docker虚拟机资源的在线分配，并通过邮件实时告知申请者资源登录账号和密码。允许用户自行选定云平台私有镜像库中要安装的应用软件，实现所选定的镜像软件的一键式安装。</p>
<h3 id="主要技术指标" tabindex="-1"><a class="header-anchor" href="#主要技术指标" aria-hidden="true">#</a> 主要技术指标</h3>
<p>1、采用B/S架构完成开发，业务流程清晰；
2、实现对系统用户的统一鉴权；
3、界面友好，操作方便，支持选定软件的一键式安装。</p>
<h3 id="目标和要求" tabindex="-1"><a class="header-anchor" href="#目标和要求" aria-hidden="true">#</a> 目标和要求</h3>
<p>1、构建一个基于Web的Docker虚拟机资源管理系统，可协助研究中心运维人员方便地管理中心云平台现有IT资源。
2、搭建Docker云平台，构建平台私有镜像库，支持大部分常用软件的一键式安装；
3、实现资源在线申请、审核批复、在线资源分配和回收、资源使用情况的在线查询及统计分析等功能。</p>
<h3 id="特色" tabindex="-1"><a class="header-anchor" href="#特色" aria-hidden="true">#</a> 特色</h3>
<p>该系统能极大地提高研究中心IT资源的智能化管理水平。</p>
<h3 id="成果形式" tabindex="-1"><a class="header-anchor" href="#成果形式" aria-hidden="true">#</a> 成果形式</h3>
<p>1）系统源代码；
2）毕业设计论文。</p>
<h3 id="成果价值" tabindex="-1"><a class="header-anchor" href="#成果价值" aria-hidden="true">#</a> 成果价值</h3>
<p>通过该课题的研发，可以让学生综合利用在校学习的云计算平台、Docker容器技术、Web端开发技术等方面的知识来解决实际问题，可以培养和锻炼学生解决生产过程中实际问题的能力，为学生今后从事高性能计算、互联网业务的开发等相关领域的工作打下基础。</p>
<h3 id="应收集资料及主要参考文献" tabindex="-1"><a class="header-anchor" href="#应收集资料及主要参考文献" aria-hidden="true">#</a> 应收集资料及主要参考文献</h3>
<p>1、胡长征. 基于Docker的自动化部署系统研究及实现[D]. 中国科学院大学，2017：1-75.
2、曹郁. 基于Docker容器的微服务研究与实现[J]. 科学技术创新，2019，28：97-98.
3、李顺. 基于Docker的轻量化容器云平台设计与实践[J]. 金融科技时代，2019，10：38-40.</p>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<ol>
<li>容器服务的注册和发现，元数据、资源统计数据的管理</li>
<li>容器服务的部署——镜像软件的一键化安装、用户代码的自动化部署</li>
<li>容器资源的定时回收</li>
<li>容器的健康状态检测、故障通知、自动重启</li>
<li>私有镜像库的搭建，元数据的维护，镜像的管理</li>
<li>容器、镜像等资源的权限管理系统</li>
<li>容器、镜像等资源申请、审核平台</li>
<li>用户注册登录服务</li>
<li>消息通知系统</li>
</ol>
<h2 id="技术准备" tabindex="-1"><a class="header-anchor" href="#技术准备" aria-hidden="true">#</a> 技术准备</h2>
<ol>
<li>Web框架，SpringMVC</li>
<li>微服务架构，Dubbo（ProtocolBuffer）</li>
<li>数据库交互，Gorm</li>
<li>分布式key-value存储系统，Etcd</li>
<li>定时任务框架，Quartz/SchedulerX/xxl-job</li>
<li>权限管理系统，RABC+Shrio</li>
<li>申请审核系统，Java-Activity</li>
<li>Docker的Go-Client</li>
<li>私有镜像仓库，Harbor</li>
<li>CI/CD框架，Jenkins</li>
<li>Docker的资源使用监控系统，</li>
<li></li>
</ol>
<h2 id="模块划分" tabindex="-1"><a class="header-anchor" href="#模块划分" aria-hidden="true">#</a> 模块划分</h2>
<ol>
<li>容器服务</li>
<li>镜像服务</li>
<li>资源审核、权限管理系统</li>
<li>Web的API服务</li>
<li>......</li>
</ol>
</div></template>


