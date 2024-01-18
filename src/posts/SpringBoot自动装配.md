---
title: SpringBoot自动装配
date: 2022-09-05 11:32:10
categories: Spring
tags:
---



# 从SPI到SpringBootAutoConfig

SPI ，全称为 Service Provider Interface(服务提供者接口)，是一种服务发现机制。它通过在classpath路径下的META-INF/services文件夹查找文件，自动加载文件中所定义的类。



通过某种方式读取`spring.factories`文件，紧接着把里面所有的自动配置类加载到Spring容器中，然后就可以通过Spring的机制将配置类的@Bean注入到容器中了。



[看完就会的SpringBoot自动装配原理](https://segmentfault.com/a/1190000040510401)



`@SpringBootApplication`
->`@EnableAutoConfiguration`
->`AutoConfigurationImportSelector`
->`AutoConfigurationImportSelector#selectImports()`
-> `AutoConfigurationImportSelector#getCandidateConfigurations`
-> `SpringFactoriesLoader#loadFactoryNames`
->...`SpringFactoriesLoader#loadSpringFactories()`
->"META-INF/spring.factories"

不光是这个依赖下的META-INF/spring.factories被读取到，所有 Spring Boot Starter 下的META-INF/spring.factories都会被读取到。

[淘宝一面：“说一下 Spring Boot 自动装配原理呗？”](https://www.cnblogs.com/javaguide/p/springboot-auto-config.html)



`AutoConfigurationImportSelector` 类实现了 `ImportSelector`接口，也就实现了这个接口中的 `selectImports`方法，该方法主要用于**获取所有符合条件的类的全限定类名，这些类需要被加载到 IoC 容器中**。



**总结**

Spring Boot 通过`@EnableAutoConfiguration`开启自动装配，通过 SpringFactoriesLoader 最终加载`META-INF/spring.factories`中的自动配置类实现自动装配，自动配置类其实就是通过`@Conditional`按需加载的配置类，想要其生效必须引入`spring-boot-starter-xxx`包实现起步依赖




> Spring Boot 提供的条件注解
> + `@ConditionalOnBean`：当容器里有指定 Bean 的条件下
> + `@ConditionalOnMissingBean`：当容器里没有指定 Bean 的情况下
> + `@ConditionalOnSingleCandidate`：当指定 Bean 在容器中只有一个，或者虽然有多个但是指定首选 Bean
> + `@ConditionalOnClass`：当类路径下有指定类的条件下
> + `@ConditionalOnMissingClass`：当类路径下没有指定类的条件下
> + `@ConditionalOnProperty`：指定的属性是否有指定的值
> + `@ConditionalOnResource`：类路径是否有指定的值
> + `@ConditionalOnExpression`：基于 SpEL 表达式作为判断条件
> + `@ConditionalOnJava`：基于 Java 版本作为判断条件
> + `@ConditionalOnJndi`：在 JNDI 存在的条件下差在指定的位置
> + `@ConditionalOnNotWebApplication`：当前项目不是 Web 项目的条件下
> + `@ConditionalOnWebApplication`：当前项目是 Web 项 目的条件下