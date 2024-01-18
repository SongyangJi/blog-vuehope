---
title: Spring 学习笔记4  ——  AOP（面向切面编程）
date: 2021-08-01
categories: Spring
tags: 
    - Spring核心
    - JavaEE
---


> 这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。



# 5. Spring 面向方面编程

## 5.1 AOP概念

下面是一些核心 AOP 概念和术语。这些术语不是特定于 Spring 的。

+ 切面（Aspect）：跨越多个类的关注点的模块化—— **AOP中的基本单位**，正如OOP中的类一样。在 Spring AOP 中，方面是通过使用**基于XML配置常规Bean**或**使用注解@Aspect注解的常规类 （@AspectJ 风格）实现的**。

  注意：`@Aspect`是注解，@AspectJ是AspectJ project在Spring AOP中实现的风格。

+ 连接点（Join point）：**程序执行过程中的一个点，例如方法的执行或异常的处理**。

  在 Spring AOP 中，一个连接点总是代表一个**方法**的执行，目前不能对**字段**进行拦截。

+ 通知（Advice）：**方面在特定连接点采取的行动**。通知类型将在后面讨论。

+ 切点（Pointcut）：**匹配连接点的谓词。**由切入点表达式匹配的连接点的概念是 AOP 的核心，Spring 默认使用 AspectJ 风格的切入点表达式语言。

  通俗的说，Spring会根据切点定义的规则去匹配连接点。

+ 引入（Introduction） ：代表类型声明额外的方法或字段。Spring AOP 允许您向任何目标对象引入新的接口（和相应的实现）。

  这个算是AOP里比较难理解的概念，最好通过实例来解释。

+ 目标对象（Target object）：被一个或多个方面建议的对象。也称为“建议对象”。由于 Spring AOP 是使用运行时代理实现的，所以这个对象始终是一个**被代理的对象** （即原对象）。

+ AOP 代理：由 AOP 框架创建的对象，用于实现方面契约（建议方法执行等）。在 Spring Framework 中，AOP 代理由 JDK 动态代理或 CGLIB 代理。

+ 编织：将切面与其他应用程序类型或对象联系起来以创建 Advised 对象。



切入点匹配的连接点概念是 AOP 的关键，它区别于仅提供拦截器的技术。





Spring AOP 包括以下类型的通知

+ 前置（Before）通知：在连接点之前运行的通知，**但不能阻止执行流继续到连接点**（除非它抛出异常）。
+ 返回后（After returning）通知：在连接点正常完成后运行的通知（例如，如果方法返回而没有抛出异常）。
+ 抛出异常后（After throwing）通知：如果方法通过抛出异常退出，则运行通知。
+ 后置（After or finally）通知：不管连接点退出的方式（正常或异常返回）都将运行的通知。
+ 环绕（Around）通知：环绕连接点的通知。这是最有力的通知。**环绕通知可以在方法调用之前和之后执行自定义行为**。它还**负责选择是继续连接点还是通过返回自己的返回值或抛出异常来缩短被代理的方法执行**。



## 5.2 使用@AspectJ风格的AOP



AOP在Spring中的使用，既可以使用注解驱动，也可以使用XML配置。

这里仍然只介绍注解驱动的AOP。



### 5.2.1 启用@AspectJ支持

对于SpringBoot项目而言，引入依赖即可。

```xml
<!-- aop -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

下面介绍AOP中的一系列概念在@AspectJ中的具体落地实现。

### 5.2.2 声明一个切面

使用注解 `@Aspect`标记类即可。

但请注意， `@Aspect`注释不足以在类路径中进行自动检测从而被Spring容器管理，所以@Component是有必要的。

```java
@Aspect
@Component
public class NotVeryUsefulAspect {

}
```

而且，在 Spring AOP 中，切面本身不能成为其他切面通知的目标。



### 5.2.3 声明一个切入点

如下，**切点是一个用`@Pointcut`标记的方法（返回值必须是void）**。

```java
@Pointcut("execution(* transfer(..))") // the pointcut expression
private void anyOldTransfer() {} // the pointcut signature
```

构成`@Pointcut`注解值的切入点表达式是一个正则 AspectJ 切入点表达式，这是切点的关键。

具体可以参考附录中的AspectJ编程指南。



> 参考资料
>
> [Spring官方文档](https://docs.spring.io/spring-framework/docs/current-SNAPSHOT/reference/html/core.html#spring-core)
>
> [doc index](https://docs.spring.io/spring-framework/docs/)
>
> [Spring 5 AOP 默认改用 CGLIB 了？](https://cloud.tencent.com/developer/article/1532547#:~:text=Spring%20AOP%20%E9%BB%98%E8%AE%A4%E4%BD%BF%E7%94%A8JDK,%E5%8F%AF%E4%BB%A5%E5%BC%BA%E5%88%B6%E4%BD%BF%E7%94%A8CGLIB%20%E4%BB%A3%E7%90%86%E3%80%82)
>
> [AspectJ编程指南](https://www.eclipse.org/aspectj/doc/released/progguide/index.html)
>
> [AspectJ网站](https://www.eclipse.org/aspectj/)



