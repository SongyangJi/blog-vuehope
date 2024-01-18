---
title: Spring源码解析1
date: 2021-10-15 00:39:49
categories: Spring
tags: 
    - Spring核心
    - JavaEE
---


> 为了减少篇幅，以及尽可能介绍核心，在贴出代码的时候只节选部分。完整代码请参阅官方文档。

# 顶层设计



1. 如何表示对象与对象之间的关系
2. 描述对象的文件存放在哪里
3. 如何统一一个关于对象的定义
4. 如何对不同的配置文件进行解析



IOC的实现方式：

依赖注入（DI）、依赖查找（不再使用）





# 源码类图



## BeanFactory（存放Bean的容器）

>**访问 Spring bean 容器的根接口**。
>该接口的实现类包含一个bean的注册表，每个bean定义由一个字符串名称唯一标识。 根
>据 bean 定义，工厂将返回包含对象的独立实例（原型设计模式），或单个共享实例（单例设计模式的高级替代方案，其中实例是范围内的单例）工厂）。 返回哪种类型的实例取决于 bean factory 配置：API 是相同的。
>这种方法的重点是 BeanFactory 是应用程序组件的中央注册表，并且集中了应用程序组件的配置（例如，单个对象不再需要读取属性文件）。
>**Spring 的依赖注入功能是使用这个 BeanFactory 接口及其子接口实现的**。
>通常 BeanFactory 将加载存储在配置源（例如 XML ）中的 bean 定义，并使用org.springframework.beans包来配置 bean。 但是，实现可以简单地直接在 Java 代码中返回它根据需要创建的 Java 对象。 定义的存储方式没有限制：LDAP、RDBMS、XML、属性文件等。

```java
package org.springframework.beans.factory;

public interface BeanFactory {
   // 根据 bean 名称获取 bean
   Object getBean(String name) throws BeansException;
   <T> T getBean(String name, Class<T> requiredType) throws BeansException;
   <T> T getBean(Class<T> requiredType) throws BeansException;
   <T> T getBean(Class<T> requiredType, Object... args) throws BeansException;
   // 判断bean是否存在
   boolean containsBean(String name);
   // bean的作用域
   boolean isSingleton(String name) throws NoSuchBeanDefinitionException;
   boolean isPrototype(String name) throws NoSuchBeanDefinitionException;
}
```



源码类图

![](BeanFactory.png)





+ ListableBeanFactory

将所有bean列表化提供。（换言之，可以一下子获取所有bean）。



+ HierarchicalBeanFactory

描述有继承关系的bean。



+ AutowireCapableBeanFactory

定义bean的自动装配规则。这个类比较重要，看看它的源码。

```java
public interface AutowireCapableBeanFactory extends BeanFactory {
   // 自动配置的方式
   int AUTOWIRE_NO = 0;
   int AUTOWIRE_BY_NAME = 1;
   int AUTOWIRE_BY_TYPE = 2;
   int AUTOWIRE_CONSTRUCTOR = 3;
   @Deprecated
   int AUTOWIRE_AUTODETECT = 4;

   // 创建一个新的bean  
   <T> T createBean(Class<T> beanClass) throws BeansException;
 
   // 自动装配benan
   void autowireBean(Object existingBean) throws BeansException;
   Object configureBean(Object existingBean, String beanName) throws BeansException;
   Object initializeBean(Object existingBean, String beanName) throws BeansException;
  
   // ....

}
```



## BeanDefinition（Bean的统一定义）



+ AttributeAccessor

基于反射的方式，对一个bean根据属性名，对属性值的CRUD操作

```java
public interface AttributeAccessor {

   void setAttribute(String name, @Nullable Object value);

   @Nullable
   Object getAttribute(String name);


   @Nullable
   Object removeAttribute(String name);


   boolean hasAttribute(String name);

   String[] attributeNames();

}
```





BeanDefinition 描述了一个 bean 实例，而那个bean具有属性值、构造函数参数值以及由具体实现提供的更多信息。



```java
package org.springframework.beans.factory.config;

public interface BeanDefinition extends AttributeAccessor, BeanMetadataElement {
  
   // 作用域
   String SCOPE_SINGLETON = ConfigurableBeanFactory.SCOPE_SINGLETON;
   String SCOPE_PROTOTYPE = ConfigurableBeanFactory.SCOPE_PROTOTYPE;
   

   // get/set bean的类名
   void setBeanClassName(@Nullable String beanClassName);
   @Nullable
   String getBeanClassName();

   // @Scope("singleton") / @Scope("prototype") 可以指定
   void setScope(@Nullable String scope);
   @Nullable
   String getScope();

  
   // @Lazy 指定是否延迟初始化
   void setLazyInit(boolean lazyInit);
   boolean isLazyInit();
  

   //  bean 所依赖的 bean 名称
   void setDependsOn(@Nullable String... dependsOn);
   @Nullable
   String[] getDependsOn();
  
   // @Primary 指定
   void setPrimary(boolean primary);
   boolean isPrimary();


   // @PostConstruct指定初始化方法
   void setInitMethodName(@Nullable String initMethodName);
   @Nullable
   String getInitMethodName();

   // @PreDestroy指定销毁方法
   void setDestroyMethodName(@Nullable String destroyMethodName);
   @Nullable
   String getDestroyMethodName();


   // 单例 or 原型
   boolean isSingleton();
   boolean isPrototype();
  
}
```
