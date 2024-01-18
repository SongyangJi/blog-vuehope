---
title: 活动流——Activiti
date: 2023-02-26 03:14:17
categories: FrameWork
tags:
---



## 安装流程
1. 安装并启动tomcat
2. 通过tomcat部署activiti
3. 修改一下activiti的配置
4. 访问服务





## 2.4 Activiti如何使用

### 2.4.1 整合Activiti

+ Activiti是一个工作流引擎，业务系统使用Activiti来对系统的业务流程进行自动化管理，为了方便业务系统访问（操作）Activiti的接口或功能，通常将Activiti和业务系统的环境集成在一起。

### 2.4.2 业务流程建模

+ 使用Activiti流程建模工具(Activity-designer)定义业务流程(.bpmn文件)。
+ .bpmn文件就是业务流程定义文件，通过xml定义业务流程。
+ 如果使用其他公司开发的工作引擎一般都提供了可视化的建模工具（Process Designer）用于生成流程定义文件，建模工具操作直观，一般都支持图形化拖拽方式、多窗口的用户界面、丰富的过程图形元素、过程元素拷贝、粘贴、删除等功能。

### 2.4.3 部署业务流程

+ 向Activiti部署业务流程定义(.bpmn文件)。
+ 使用Activiti提供的API向Activiti中部署.bpmn文件（一般情况下还需要一起部署业务流程的图片.png）。

### 2.4.4 启动流程实例

+ 启动一个流程实例表示开始一次业务流程的运行，比如员工请假流程部署完成，如果张三要请假就可以启动一个流程实例，如果李四要请假也需要启动一个流程实例，两个流程的执行互不影响，就好比定义一个Java类，实例化两个Java对象一样，部署的流程就好比Java类，启动一个流程实例就好比new一个Java对象。

### 2.4.5 查询待办任务

+ 因为现在系统的业务流程已经交给Activiti管理，通过Activiti就可以查询当前流程执行到哪里了，当前用户需要办理什么任务了，这些Activiti帮我们管理了，而不像传统方式中需要我们在SQL语句中的WHERE条件中指定当前查询的状态值是多少。

### 2.4.6 处理待办任务

+ 用户查询待办任务后，就可以办理某个任务，如果这任务办理完成还需要其他用户办理，比如采购单创建后由部门经理审核，这个过程也是由Activiti帮我们完成了，不需要我们在代码中硬编码指定下一个任务办理人了

### 2.4.7 结束流程

+ 当任务办理完成没有下一个任务/结点了，这个流程实例就完成了。





Activiti的后台是有数据库的支持，所有的表都以ACT_开头。 第二部分是表示表的用途的两个字母标识。 用途也和服务的API对应。

1. ACT_RE_: 'RE'表示repository。 这个前缀的表包含了流程定义和流程静态资源 （图片，规则，等等）。
2. ACT_RU_: 'RU'表示runtime。 这些运行时的表，包含流程实例，任务，变量，异步任务等运行中的数据。 Activiti只在流程实例执行过程中保存这些数据， 在流程结束时就会删除这些记录。 这样运行时表可以一直很小速度很快。
3. ACT_ID_: 'ID'表示identity。 这些表包含身份信息，比如用户，组等等。
4. ACT_HI_: 'HI'表示history。 这些表包含历史数据，比如历史流程实例， 变量，任务等等。
5. ACT_GE_: 通用数据， 用于不同场景下。



# Activi 23张表的含义



1. act_ge_bytearray	二进制数据表
2. act_ge_property	属性数据表，存储整个流程引擎级别的数据
3. act_hi_actinst	历史节点表
4. act_hi_attachment	历史附件表
5. act_hi_comment	历史意见表
6. act_hi_identitylink	历史流程人员表
7. act_hi_detail	历史详情表
8. act_hi_procinst	历史流程实例表
9. act_hi_taskinst	历史任务实例表
10. act_hi_varinst	历史变量表
11. act_hi_group	用户组变量表
12. act_id_info	用户扩展信息表
13. act_id_membership	用户与用户组对应信息表
14. act_id_user	用户信息表
15. act_re_deployment	部署信息表
16. act_re_model	流程设计模型部署表
17. act_re_procdef	流程定义数据表
18. act_ru_event_subscr	throwEvent catchEvent 时间监听信息表
19. act_ru_execution	运行时流程执行实例表
20. act_ru_identitylink	运行时流程人员表，主要存储任务节点与参与者的相关信息
21. act_ru_job	运行时定时任务数据表
22. act_ru_task	运行时任务节点表
23. act_ru_variable	运行时流程变量数据表



比较的重要的有这几张表

```sql
SELECT * FROM act_re_deployment;   -- 一 流程部署表

SELECT * FROM act_ge_bytearray;    -- 二 流程二进制表

SELECT * FROM act_re_procdef;      -- 三 流程定义表

SELECT * FROM act_ru_execution;    -- 四 流程正在运行表

SELECT * FROM act_hi_procinst;     -- 五 流程实例历史表

SELECT * FROM act_ru_task;         -- 六 流程当前任务表

SELECT * FROM act_hi_taskinst;     -- 七 流程历史任务表

SELECT * FROM act_hi_actinst;      -- 八 流程历史活动节点表
```





## 5.1、Service服务说明



![](https://www.activiti.org/userguide/6.latest/images/api.services.png)



###### 5.1.1、RepositoryService仓库服务

仓库服务是存储相关的服务，一般用来部署流程文件，获取流程文件，查询流程定义信息等操作，是引擎中的一个重要的服务。

```
/** 仓库服务 */  
RepositoryService repositoryService = engine.getRepositoryService(); 
```

###### 5.1.2、运行时服务

流程运行时的流程实例，流程定义，流程版本，流程节点等信息，使用运行时服务操作，是引擎中的一个重要的服务

```
/** 运行时服务 */  
RuntimeService runtimeService = engine.getRuntimeService();  
```

###### 5.1.3、任务服务

流程运行时的会产生任务，接收、办理、完成等操作使用任务服务完成，是引擎中的一个重要的服务

```
/** 任务服务 */  
TaskService taskService = engine.getTaskService();  
```

###### 5.1.4、认证服务

流程运行过程中的一些用户信息，组信息等操作使用认证服务，但是认证服务一般只作为辅助，每一个系统都有一个比较完整的人员系统

```
/** 认证服务 */  
//一般不使用自带的认证服务，每个系统都有自己的认证系统  
IdentityService identityService = engine.getIdentityService();  
```

###### 5.1.5、历史服务

流程运行时，和运行完成之后的一些历史信息，包括历史任务，历史节点等，是引擎中的一个重要的服务

```
/** 历史服务 */  
HistoryService historyService = engine.getHistoryService();
```

###### 5.1.6、表单服务

流程运行时的任务表单信息，是引擎中的一个辅助的服务

```
/** 表单服务 */  
FormService formService = engine.getFormService();  
```





