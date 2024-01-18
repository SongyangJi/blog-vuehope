---
title: Spring 学习笔记2  ——  IOC容器 2 （Bean的作用域、生命周期回调接口）
date: 2021-07-05
categories: Spring
tags: 
    - Spring核心
    - JavaEE
---






> > 这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。

# 1 Spring IoC容器和Bean简介
## 1.5 Bean的作用域
### 1.5.1 介绍
Spring框架支持六个作用域，但是后面四个只在web环境下才支持。
重点讲**单例**和**原型**。

+ singleton
单例。IOC容器中只有一个实例。
+ prototype
原型。在每次请求该特定Bean时创建一个新的Bean实例。
+ request
+ session
+ application
+ websocket

XML配置Bean举例。
**单例**
```xml
<bean id="accountService" class="com.something.DefaultAccountService"/>

<!-- the following is equivalent, though redundant (singleton scope is the default) -->
<bean id="accountService" class="com.something.DefaultAccountService" scope="singleton"/>
```
**原型**
```xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="prototype"/>
```

### 1.5.2 单例与原型的区别
原型作用域用于有状态的Bean。
将单例作用域用于无状态的Bean。

单例Bean好处是无需维护会话状态，可重复复用，开销低。
原型作用域用于有状态的Bean，某种程度上可以当成是 new 的替代。

关于原型bean的生命周期管理
> 与其他作用域相比，**Spring不能管理原型Bean的完整生命周期**。容器将实例化，配置或组装原型对象，然后将其交给客户端，而无需对该原型实例的进一步记录。因此，尽管在不考虑范围的情况下在所有对象上都调用了初始化生命周期回调方法，但**在原型的情况下，不会调用已配置的销毁生命周期回调**。客户端代码必须清除原型作用域内的对象并释放原型Bean拥有的昂贵资源。为了使Spring容器释放原型作用下的bean所拥有的资源，请尝试使用 bean post-processor ，其中包含对需要清理的bean的引用。

### 1.5.3 单例与原型的四种依赖关系

1. 单例依赖单例
这也是默认的依赖关系。没什么好说的。

2. 原型依赖原型

```java
@Component
@Scope("prototype")
public class MyPrototype {
    @Resource
    AnotherPrototype anotherPrototype;
    @Resource
    MySingleton mySingleton;
}

@Component
@Scope("prototype")
public class AnotherPrototype {
}
```
如上面，这样做也没有什么问题。两个bean每次拿都是**全新的**。

3. 原型依赖单例
由于单例，所以原型bean里的单例bean仍然是惟一的。

4. 单例依赖原型

如果希望单例作用域的bean在运行时重复获取原型作用域的bean的新实例，不能将原型作用域的bean依赖项注入到您的单例bean中，因为当Spring容器实例化单例bean并解析并注入其依赖项时，**该注入仅发生一次**。如果在运行时不止一次需要原型bean的新实例，请参见**方法注入**。

[文章末尾就是方法注入的使用](https://song-yang-ji.blog.csdn.net/article/details/109661012)


### 1.5.4. 使用自定义范围
暂略。。。


## 1.6 自定义Bean的性质
Spring框架提供了许多接口，您可以使用这些接口来自定义Bean的性质。本节将它们分为以下几类：

1. 生命周期回调

2. ApplicationContextAware 和 BeanNameAware

3. 其他 Aware接口

### 1.6.1 生命周期回调
从Spring 2.5开始，您可以至少使用三个方法来控制Bean生命周期行为。

1. 实现`InitializingBean`和`DisposableBean`回调接口

2. xml里使用`init-method`和`destroy-methodbean`定义元数据, 指定回调方法

3. 使用`@PostConstruct`和`@PreDestroy`注解

第一种方法，虽然也能达成目的，但是将代码强耦合到Spring，并不被推荐。

第二种方法，使用Spring的xml配置bean的方式完成。

第三种方法，在全注解开发Spring项目的现在，无疑是最佳选择（官方也是这么说的）。

**初始化后回调**和**销毁之前回调**的处理是差不多，这里仅仅以初始化回调为例，另一个是一样的。

#### 1.6.1.1 初始化回调
+ 实现 `InitializingBean`接口
```xml
<bean id="exampleInitBean" class="examples.AnotherExampleBean"/>
```

```java
public class AnotherExampleBean implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        // do some initialization work
    }
}
```

+ 使用 bean 的 `init-method`属性
```xml
<bean id="exampleInitBean" class="examples.ExampleBean" init-method="init"/>
```
```java
public class ExampleBean {
    public void init() {
        // do some initialization work
    }
}
```


+ 使用 @PostConstruct 注解
值得一提的是，这个注解并不是Spring里的，而是javax里的。
```java
public class ExampleBean {
	@PostConstruct 
    public void init() {
        // do some initialization work
    }
}
```

#### 1.6.1.2 销毁回调
与上面几乎一样，略。

#### 1.6.1.3 默认初始化和销毁​​方法
当你需要为很多个，甚至所有的bean去设置初始化或销毁方法的时候，你可以直接为他们设置一个默认的公共的回调方法。

```xml
<beans default-init-method="init">
    <bean id="blogService" class="com.something.DefaultBlogService"/>
    <bean id="userService" class="com.something.DefaultUserService"/>
    <!-- 可以覆盖掉默认的 -->
    <bean id="authorService" class="com.something.DefaultAuthorService"  init-method="initMethod"/>
</beans>
```

使用 `<beans>`的default-init-method 为一系列bean设置回调方法。

你还可以覆盖掉默认的。

#### 1.6.1.4 配置多个回调方法的调用顺序
+ 为同一个bean配置的具有不同初始化方法的调用顺序。
1. 用注解的方法 @PostConstruct

2. 由InitializingBean回调接口定义的afterPropertiesSet()

3. 定制配置的init()方法


销毁方法的调用顺序相同：

1. 用注释的方法 @PreDestroy

2. 由DisposableBean回调接口定义的destroy()

3. 定制配置的destroy()方法

#### 1.6.1.5 Lifecycle接口
暂略。

### 1.6.2 ApplicationContextAware 接口
以前，我们都是用 `ApplicationContext`去获取Bean（按类型、按bean的名字也罢）。
但是bean怎么拿到上下文，进而拿到其他的bean呢？
这个接口的出现终于解释了这个问题。

当 `ApplicationContext` 创建一个实现`ApplicationContextAware`接口的对象实例时，该实例将获得对`ApplicationContext`上下文的引用。


```java
@Component
public class BeanImplApplicationContextAware implements ApplicationContextAware {

    ApplicationContext context;

    // 这个方法会由 Spring 自动调用，并传入上下文，
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }

    public void showBean() {
        ExampleBean exampleBean = context.getBean("exampleBean",ExampleBean.class);
        System.out.println("在BeanImplApplicationContextAware里获得了"+exampleBean);
    }
}
```
启动类
```java
public class Boot {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = new AnnotationConfigApplicationContext("life_cycle");
        applicationContext.getBean(BeanImplApplicationContextAware.class).showBean();
    }
}
```

### 1.6.3 其他 Aware 接口
[官方文档的1.6.3](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-aware)

**必须要指明的一点的是，使用这些接口会将你的代码与Spring API绑定在一起，并且不遵循“控制反转”风格**。

因此，只有在你确实需要编写一些基础bean，而他们确实需要访问 **上下文容器时**，才推荐使用这些接口。（总之，一般不用就拿ApplicationContextAware接口为例，我们完全可以使用自动装配AutoWire来代替它。）





> 参考资料
>
> [Spring官方文档](https://docs.spring.io/spring-framework/docs/current-SNAPSHOT/reference/html/core.html#spring-core)
>
> [doc index](https://docs.spring.io/spring-framework/docs/)
