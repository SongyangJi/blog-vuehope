<template><div><h1 id="开题报告" tabindex="-1"><a class="header-anchor" href="#开题报告" aria-hidden="true">#</a> 开题报告</h1>
<p>题目：Docker虚拟机资源在线管理系统的设计与实现</p>
<h2 id="一、论文-设计-的主要内容、理论意义和应用价值" tabindex="-1"><a class="header-anchor" href="#一、论文-设计-的主要内容、理论意义和应用价值" aria-hidden="true">#</a> 一、论文（设计）的主要内容、理论意义和应用价值</h2>
<h3 id="主要内容" tabindex="-1"><a class="header-anchor" href="#主要内容" aria-hidden="true">#</a> 主要内容</h3>
<p>针对软件与数据工程研究中心广大教师和研究生的实际需求，构建一个中心IT资源管理系统，该系统允许资源使用者（教师或研究生）在线提出Docker虚拟机的资源申请，在完成相应的审批流程后，实现Docker虚拟机资源的在线分配。资源使用到期后，实现资源回收。平台运维人员可借助该系统实现资源的日常管理。为更好地方便用户，允许其自行选定云平台私有镜像库中要安装的应用软件，实现所选定的镜像软件的一键式安装。</p>
<h3 id="理论意义" tabindex="-1"><a class="header-anchor" href="#理论意义" aria-hidden="true">#</a> 理论意义</h3>
<p>研究“云原生“背景下的软件系统架构的多租户资源（包括但不限于计算资源、存储资源、网络资源）隔离的技术可行性，发掘在已有的各种“沙箱”技术上可以定制化改进的创新点。</p>
<h3 id="应用价值" tabindex="-1"><a class="header-anchor" href="#应用价值" aria-hidden="true">#</a> 应用价值</h3>
<p>1、构建一个基于Web的Docker虚拟机资源管理系统，可协助研究中心运维人员方便地管理中心云平台现有IT资源。</p>
<p>2、搭建Docker云平台，构建平台私有镜像库，支持大部分常用软件的一键式安装；</p>
<p>3、实现资源在线申请、审核批复、在线资源分配和回收、资源使用情况的在线查询及统计分析等功能。</p>
<h2 id="二、主要参考书目" tabindex="-1"><a class="header-anchor" href="#二、主要参考书目" aria-hidden="true">#</a> 二、主要参考书目</h2>
<p>1、胡长征. [基于Docker的自动化部署系统研究及实现[D]. 中国科学院大学，2017：1-75.</p>
<p>2、曹郁. 基于 Docker 容器的微服务研究与实现[J].科学技术 创新，2019，28：97-98.</p>
<p>3、李顺. 基于 Docker 的轻量化容器云平台设计与实践[J].金 融科技时代，2019，10：38-40.</p>
<h2 id="三、毕业论文-设计-写作计划" tabindex="-1"><a class="header-anchor" href="#三、毕业论文-设计-写作计划" aria-hidden="true">#</a> 三、毕业论文（设计）写作计划</h2>
<p>3.8-3.20： 进行初步的需求分析，系统多模块设计，学习相关的背景知识。同时完成论文的摘要、绪论部分。</p>
<p>3.20-4.1：搭建好系统环境；完成操作Docker资源的核心模块编码设计。同时完成论文需求分析部分。</p>
<p>4.2-4.15：初步构建资源管理系统，实现申请、审核、批复、分配与回收、统计报表等功能。同时完成论文的系统架构设计以及详细设计部分。</p>
<p>4.15-5.1：完善系统，实现常用软件的一键式安装，用户代码的自动部署等功能。</p>
<p>5.1-5.15：进行系统测试，完善功能，同时完成论文，包含系统的实现与测试结论等部分。</p>
<table>
<thead>
<tr>
<th>初稿完成日期</th>
<th>2021年4月25号</th>
<th>定稿日期</th>
<th>2021年5月15日</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h1 id="开题答辩" tabindex="-1"><a class="header-anchor" href="#开题答辩" aria-hidden="true">#</a> 开题答辩</h1>
<h2 id="课题研究内容" tabindex="-1"><a class="header-anchor" href="#课题研究内容" aria-hidden="true">#</a> 课题研究内容</h2>
<p>针对研究中心广大教师和研究生的实际需求，构建一个中心IT资源管理系统，该系统允许资源使用者（教师和研究生）在线提出Docker虚拟机的资源申请，在完成相应的审批流程后，实现Docker虚拟机资源的在线分配，并通过邮件实时告知申请者资源登录账号和密码。</p>
<p>允许用户自行选定云平台私有镜像库中要安装的应用软件，实现所选定的镜像软件的一键式安装。</p>
<h2 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h2>
<ol>
<li>借助Docker的虚拟化技术完成对研究中心计算资源的隔离，可视化监控、可视化配置</li>
<li>搭建Docker私有镜像仓库，方便常用软件的一键式安装和内部软件的共享</li>
<li>使用Gitlab、Jenkins等框架构建简单的CI/CD平台，方便用户代码的部署与运行</li>
</ol>
<h2 id="进展" tabindex="-1"><a class="header-anchor" href="#进展" aria-hidden="true">#</a> 进展</h2>
<p>完成需求分析、技术调研、本机搭建环境</p>
<h3 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h3>
<ol>
<li>容器服务的注册和发现，元数据、资源统计数据的管理</li>
<li>容器服务的部署——镜像软件的一键化安装、用户代码的自动化部署</li>
<li>容器资源的定时回收</li>
<li>容器的健康状态检测、故障通知、自动重启</li>
<li>私有镜像库的搭建，元数据的维护，镜像的管理</li>
<li>容器、镜像等资源的权限管理系统</li>
<li>容器、镜像等资源申请、审核平台</li>
</ol>
<h3 id="拟采用的技术路线" tabindex="-1"><a class="header-anchor" href="#拟采用的技术路线" aria-hidden="true">#</a> 拟采用的技术路线</h3>
<ol>
<li>
<p>Web框架，Hertz/SpringMVC、Vue+ElementUI</p>
</li>
<li>
<p>微服务框架，Dubbo（ProtocolBuffer）</p>
</li>
<li>
<p>数据库交互，Gorm/Mybatis</p>
</li>
<li>
<p>分布式key-value存储系统，Etcd</p>
</li>
<li>
<p>定时任务框架，Quartz/SchedulerX/xxl-job</p>
</li>
<li>
<p>权限管理系统，RABC+Shrio</p>
</li>
<li>
<p>申请审核系统，Java-Activity</p>
</li>
<li>
<p>Docker的Go-Client</p>
</li>
<li>
<p>私有镜像仓库，Harbor</p>
</li>
<li>
<p>CI/CD框架，Jenkins</p>
</li>
<li>
<p>容器服务</p>
</li>
<li>
<p>镜像服务</p>
</li>
<li>
<p>资源审核、权限管理系统</p>
</li>
<li>
<p>硬件资源</p>
</li>
<li>
<p>Web的API服务</p>
</li>
<li>
<p>消息通知服务（钉钉、邮件等）</p>
</li>
</ol>
<p>图：。。。</p>
<h3 id="搭建环境" tabindex="-1"><a class="header-anchor" href="#搭建环境" aria-hidden="true">#</a> 搭建环境</h3>
<p>之后会在Linux平台上搭建环境。</p>
<h2 id="下一步课题研发计划" tabindex="-1"><a class="header-anchor" href="#下一步课题研发计划" aria-hidden="true">#</a> 下一步课题研发计划</h2>
</div></template>


