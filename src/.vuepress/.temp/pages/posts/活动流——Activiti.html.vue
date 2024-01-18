<template><div><h2 id="安装流程" tabindex="-1"><a class="header-anchor" href="#安装流程" aria-hidden="true">#</a> 安装流程</h2>
<ol>
<li>安装并启动tomcat</li>
<li>通过tomcat部署activiti</li>
<li>修改一下activiti的配置</li>
<li>访问服务</li>
</ol>
<h2 id="_2-4-activiti如何使用" tabindex="-1"><a class="header-anchor" href="#_2-4-activiti如何使用" aria-hidden="true">#</a> 2.4 Activiti如何使用</h2>
<h3 id="_2-4-1-整合activiti" tabindex="-1"><a class="header-anchor" href="#_2-4-1-整合activiti" aria-hidden="true">#</a> 2.4.1 整合Activiti</h3>
<ul>
<li>Activiti是一个工作流引擎，业务系统使用Activiti来对系统的业务流程进行自动化管理，为了方便业务系统访问（操作）Activiti的接口或功能，通常将Activiti和业务系统的环境集成在一起。</li>
</ul>
<h3 id="_2-4-2-业务流程建模" tabindex="-1"><a class="header-anchor" href="#_2-4-2-业务流程建模" aria-hidden="true">#</a> 2.4.2 业务流程建模</h3>
<ul>
<li>使用Activiti流程建模工具(Activity-designer)定义业务流程(.bpmn文件)。</li>
<li>.bpmn文件就是业务流程定义文件，通过xml定义业务流程。</li>
<li>如果使用其他公司开发的工作引擎一般都提供了可视化的建模工具（Process Designer）用于生成流程定义文件，建模工具操作直观，一般都支持图形化拖拽方式、多窗口的用户界面、丰富的过程图形元素、过程元素拷贝、粘贴、删除等功能。</li>
</ul>
<h3 id="_2-4-3-部署业务流程" tabindex="-1"><a class="header-anchor" href="#_2-4-3-部署业务流程" aria-hidden="true">#</a> 2.4.3 部署业务流程</h3>
<ul>
<li>向Activiti部署业务流程定义(.bpmn文件)。</li>
<li>使用Activiti提供的API向Activiti中部署.bpmn文件（一般情况下还需要一起部署业务流程的图片.png）。</li>
</ul>
<h3 id="_2-4-4-启动流程实例" tabindex="-1"><a class="header-anchor" href="#_2-4-4-启动流程实例" aria-hidden="true">#</a> 2.4.4 启动流程实例</h3>
<ul>
<li>启动一个流程实例表示开始一次业务流程的运行，比如员工请假流程部署完成，如果张三要请假就可以启动一个流程实例，如果李四要请假也需要启动一个流程实例，两个流程的执行互不影响，就好比定义一个Java类，实例化两个Java对象一样，部署的流程就好比Java类，启动一个流程实例就好比new一个Java对象。</li>
</ul>
<h3 id="_2-4-5-查询待办任务" tabindex="-1"><a class="header-anchor" href="#_2-4-5-查询待办任务" aria-hidden="true">#</a> 2.4.5 查询待办任务</h3>
<ul>
<li>因为现在系统的业务流程已经交给Activiti管理，通过Activiti就可以查询当前流程执行到哪里了，当前用户需要办理什么任务了，这些Activiti帮我们管理了，而不像传统方式中需要我们在SQL语句中的WHERE条件中指定当前查询的状态值是多少。</li>
</ul>
<h3 id="_2-4-6-处理待办任务" tabindex="-1"><a class="header-anchor" href="#_2-4-6-处理待办任务" aria-hidden="true">#</a> 2.4.6 处理待办任务</h3>
<ul>
<li>用户查询待办任务后，就可以办理某个任务，如果这任务办理完成还需要其他用户办理，比如采购单创建后由部门经理审核，这个过程也是由Activiti帮我们完成了，不需要我们在代码中硬编码指定下一个任务办理人了</li>
</ul>
<h3 id="_2-4-7-结束流程" tabindex="-1"><a class="header-anchor" href="#_2-4-7-结束流程" aria-hidden="true">#</a> 2.4.7 结束流程</h3>
<ul>
<li>当任务办理完成没有下一个任务/结点了，这个流程实例就完成了。</li>
</ul>
<p>Activiti的后台是有数据库的支持，所有的表都以ACT_开头。 第二部分是表示表的用途的两个字母标识。 用途也和服务的API对应。</p>
<ol>
<li>ACT_RE_: 'RE'表示repository。 这个前缀的表包含了流程定义和流程静态资源 （图片，规则，等等）。</li>
<li>ACT_RU_: 'RU'表示runtime。 这些运行时的表，包含流程实例，任务，变量，异步任务等运行中的数据。 Activiti只在流程实例执行过程中保存这些数据， 在流程结束时就会删除这些记录。 这样运行时表可以一直很小速度很快。</li>
<li>ACT_ID_: 'ID'表示identity。 这些表包含身份信息，比如用户，组等等。</li>
<li>ACT_HI_: 'HI'表示history。 这些表包含历史数据，比如历史流程实例， 变量，任务等等。</li>
<li>ACT_GE_: 通用数据， 用于不同场景下。</li>
</ol>
<h1 id="activi-23张表的含义" tabindex="-1"><a class="header-anchor" href="#activi-23张表的含义" aria-hidden="true">#</a> Activi 23张表的含义</h1>
<ol>
<li>act_ge_bytearray	二进制数据表</li>
<li>act_ge_property	属性数据表，存储整个流程引擎级别的数据</li>
<li>act_hi_actinst	历史节点表</li>
<li>act_hi_attachment	历史附件表</li>
<li>act_hi_comment	历史意见表</li>
<li>act_hi_identitylink	历史流程人员表</li>
<li>act_hi_detail	历史详情表</li>
<li>act_hi_procinst	历史流程实例表</li>
<li>act_hi_taskinst	历史任务实例表</li>
<li>act_hi_varinst	历史变量表</li>
<li>act_hi_group	用户组变量表</li>
<li>act_id_info	用户扩展信息表</li>
<li>act_id_membership	用户与用户组对应信息表</li>
<li>act_id_user	用户信息表</li>
<li>act_re_deployment	部署信息表</li>
<li>act_re_model	流程设计模型部署表</li>
<li>act_re_procdef	流程定义数据表</li>
<li>act_ru_event_subscr	throwEvent catchEvent 时间监听信息表</li>
<li>act_ru_execution	运行时流程执行实例表</li>
<li>act_ru_identitylink	运行时流程人员表，主要存储任务节点与参与者的相关信息</li>
<li>act_ru_job	运行时定时任务数据表</li>
<li>act_ru_task	运行时任务节点表</li>
<li>act_ru_variable	运行时流程变量数据表</li>
</ol>
<p>比较的重要的有这几张表</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_re_deployment<span class="token punctuation">;</span>   <span class="token comment">-- 一 流程部署表</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_ge_bytearray<span class="token punctuation">;</span>    <span class="token comment">-- 二 流程二进制表</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_re_procdef<span class="token punctuation">;</span>      <span class="token comment">-- 三 流程定义表</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_ru_execution<span class="token punctuation">;</span>    <span class="token comment">-- 四 流程正在运行表</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_hi_procinst<span class="token punctuation">;</span>     <span class="token comment">-- 五 流程实例历史表</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_ru_task<span class="token punctuation">;</span>         <span class="token comment">-- 六 流程当前任务表</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_hi_taskinst<span class="token punctuation">;</span>     <span class="token comment">-- 七 流程历史任务表</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> act_hi_actinst<span class="token punctuation">;</span>      <span class="token comment">-- 八 流程历史活动节点表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-1、service服务说明" tabindex="-1"><a class="header-anchor" href="#_5-1、service服务说明" aria-hidden="true">#</a> 5.1、Service服务说明</h2>
<figure><img src="https://www.activiti.org/userguide/6.latest/images/api.services.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h6 id="_5-1-1、repositoryservice仓库服务" tabindex="-1"><a class="header-anchor" href="#_5-1-1、repositoryservice仓库服务" aria-hidden="true">#</a> 5.1.1、RepositoryService仓库服务</h6>
<p>仓库服务是存储相关的服务，一般用来部署流程文件，获取流程文件，查询流程定义信息等操作，是引擎中的一个重要的服务。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/** 仓库服务 */  
RepositoryService repositoryService = engine.getRepositoryService(); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-2、运行时服务" tabindex="-1"><a class="header-anchor" href="#_5-1-2、运行时服务" aria-hidden="true">#</a> 5.1.2、运行时服务</h6>
<p>流程运行时的流程实例，流程定义，流程版本，流程节点等信息，使用运行时服务操作，是引擎中的一个重要的服务</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/** 运行时服务 */  
RuntimeService runtimeService = engine.getRuntimeService();  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-3、任务服务" tabindex="-1"><a class="header-anchor" href="#_5-1-3、任务服务" aria-hidden="true">#</a> 5.1.3、任务服务</h6>
<p>流程运行时的会产生任务，接收、办理、完成等操作使用任务服务完成，是引擎中的一个重要的服务</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/** 任务服务 */  
TaskService taskService = engine.getTaskService();  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-4、认证服务" tabindex="-1"><a class="header-anchor" href="#_5-1-4、认证服务" aria-hidden="true">#</a> 5.1.4、认证服务</h6>
<p>流程运行过程中的一些用户信息，组信息等操作使用认证服务，但是认证服务一般只作为辅助，每一个系统都有一个比较完整的人员系统</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/** 认证服务 */  
//一般不使用自带的认证服务，每个系统都有自己的认证系统  
IdentityService identityService = engine.getIdentityService();  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-5、历史服务" tabindex="-1"><a class="header-anchor" href="#_5-1-5、历史服务" aria-hidden="true">#</a> 5.1.5、历史服务</h6>
<p>流程运行时，和运行完成之后的一些历史信息，包括历史任务，历史节点等，是引擎中的一个重要的服务</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/** 历史服务 */  
HistoryService historyService = engine.getHistoryService();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-6、表单服务" tabindex="-1"><a class="header-anchor" href="#_5-1-6、表单服务" aria-hidden="true">#</a> 5.1.6、表单服务</h6>
<p>流程运行时的任务表单信息，是引擎中的一个辅助的服务</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/** 表单服务 */  
FormService formService = engine.getFormService();  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


