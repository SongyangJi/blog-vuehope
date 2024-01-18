---
title: Spring 学习笔记1  ——  IOC容器 I （IOC容器、DI依赖注入）
date: 2021-07-01
categories: Spring
tags: 
    - Spring核心
    - JavaEE
---


> 这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。


# 1 Spring IoC容器和Bean简介
## 1.1 了解IOC
### 1.1.1 Bean
什么是**Bean**?

> 在Spring中，构成应用程序主干并由Spring IoC容器管理的对象称为bean。Bean是由Spring
> IoC容器**实例化**，**组装**和**管理**的对象。

显然这里的Bean并不只是那些**实体类**，即**POJO**。这里的Bean包含了所有的由Spring托管的Java类的实例！

> Bean及其之间的**依赖关系**反映在容器使用的**配置元数据**（Configuration Metadata）中。

这里的配置元数据往往用`.xml`文件或者Java**注解** (`annotation`)实现。我们马上就能看到具体的例子。

### 1.1.2 IOC容器
帮助我们管理Java对象的容器就称为Spring IOC 容器。

> 在`org.springframework.beans`和`org.springframework.context`包是Spring框架的IoC容器的基础

+ 它们的maven依赖为
```xml
        <!-- https://mvnrepository.com/artifact/org.springframework/spring-core -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.2.9.RELEASE</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.9.RELEASE</version>
        </dependency>
```

## 1.2 容器概述

> `org.springframework.context.ApplicationContext`接口代表Spring IoC容器，并负责实例化，配置和组装Bean。
> 容器通过读取配置元数据获取有关要实例化，配置和组装哪些对象的指令。配置元数据以XML，Java批注或Java代码表示。

注意`ApplicationContext`是一个**接口**，通常创建`ClassPathXmlApplicationContext` 或的实例 `FileSystemXmlApplicationContext`（顾名思义，一个通过类路径，一个通过系统文件名）。


### 1.2.1 配置元数据

> Spring IoC容器使用一种形式的配置元数据。此配置元数据表示您作为应用程序开发人员如何告诉Spring容器在应用程序中实例化，配置和组装对象。

这里**元数据Meta data**实际上就是表明对象如何创建，如何组装，如何管理。（否则Spring怎么按照我们的意愿创建出我们想要的对象？）。


 + 配置的形式
 	+ **XML**

 		这也是最传统的方式，也就是所谓的XML配Bean的方式
 	+ **注解**（annotation）
 	基于注释的配置：Spring 2.5引入了对基于注释的配置元数据的支持。
 	+ **基于Java的配置**
 		(这个从Spring3.0开始支持)


基于注解和Java的配置算是Spring后期发展的产物，这里我们就以最传统的XML为例。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```

其中`id`是定义单个Bean的唯一唯一表示，`class`要使用**全限定名**（除非用到后面的**别名**）。


### 1.2.2 实例化容器
为了学习笔记的精简化，完整的代码不在这里提供，具体代码可参见 [这篇博客](https://song-yang-ji.blog.csdn.net/article/details/109662902)。

```java
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
```

### 1.2.3  使用容器
我们可以使用`ApplicationContext`来访问有IOC容器托管的对象。
+ 方式1
```java
T getBean(String name)
User user = (User)applicationContext.getBean("user");
```

+ 方式2

```java
T getBean(String name, Class<T> requiredType)
User user = applicationContext.getBean("user",User.class);
```

总结，方式一使用**类型强制转换**，方式二使用类型做参数，错误可以在编译时期发现，更好。

## 1.3 Bean

### 1.3.1 Bean 的命名
+ **命名约定**
使用**驼峰式命名**，如`accountManager， accountService，userDao，loginController`。

+ Bean 的标识

```xml
<bean id="user" name="user2,user3,user4" class="com.jsy.pojo.User">
        <property name="name" value="JSY"></property>
    </bean>
```
使用`id`来唯一标识bean，`name`是别名,可以有多个。`@Bean`
注解也可以提供别名。
```xml
<bean id="user" name="user2,user3,user4" class="com.jsy.pojo.User">
 </bean>
```

+ **不提供名称**
为什么允许这样做，可以猜想就类似于匿名内部类一样，无需提供名称。
这和后面的**自动装配**有关。


### 1.3.2 Bean 的实例化
~~这部分和类的初始化相关，暂且不谈~~ 


## 1.4 依赖（Dependencies）

> 典型的企业应用程序不包含单个对象（或Spring术语中的bean）。即使是最简单的应用程序，也有一些对象可以协同工作，以呈现最终用户视为一致的应用程序。

简单的说，就是对象的构成很多时候是依赖其他多个对象的。比如， `Zoo`实例依赖`Tiger`，`Lion`实例;`UserService`实例依赖`UserDao`或者`UserMapper`实例。

> 使用DI原理，代码更加简洁，当为对象提供依赖项时，去耦会更有效。该对象不查找其依赖项，并且不知道依赖项的位置或类。

也就是，程序员不在负责对象的创建和组装，而仅仅负责对象的提供，创建及组装（DI)由Spring 完成。

综上， **DI**实际上是实现**IOC**的一种措施。


### 1.4.1 依赖注入
#### 1.4.1.1 Constructor 注入
实体类
```java
package com.jsy.pojo;

public class Zoo {
    Tiger tiger;
    Lion lion;

    public Zoo(Tiger tiger, Lion lion) {
        this.tiger = tiger;
        this.lion = lion;
    }
}

```

```xml
    <bean id="zoo" class="com.jsy.pojo.Zoo">
        <constructor-arg ref="lion"></constructor-arg>
        <constructor-arg ref="tiger"></constructor-arg>
    </bean>

    <bean id="lion" class="com.jsy.pojo.Lion"></bean>
    <bean id="tiger" class="com.jsy.pojo.Tiger"></bean>
```

+ 构造函数参数解析匹配通过使用**参数的类型**进行

上述的例子中`Lion` 、`Tiger`类不是通过继承关联的，则不存在潜在的歧义，配置生效，

（~~以下的例子来自官方~~）
+ **type** 属性

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

+ **index** 属性

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

+ **name** 属性

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```


#### 1.4.1.2 Setter 注入

> 基于设置器的DI是通过在调用无参数构造函数或无参数static工厂方法以实例化您的bean之后，在您的bean上调用setter方法来完成的。


+ 必须具有无参构造器
 + 必须有set函数，函数名为 set+属性名（首字母大写）


#### 1.4.1.3 Factory方法注入
这种方法与上述两种原理是一致的，区别不大。

```java
public class ExampleBean {

    // a private constructor
    private ExampleBean(...) {
        ...
    }

    // a static factory method; the arguments to this method can be
    // considered the dependencies of the bean that is returned,
    // regardless of how those arguments are actually used.
    public static ExampleBean createInstance (
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {

        ExampleBean eb = new ExampleBean (...);
        // some other operations...
        return eb;
    }
}
```

```xml
<bean id="exampleBean" class="examples.ExampleBean" factory-method="createInstance">
    <constructor-arg ref="anotherExampleBean"/>
    <constructor-arg ref="yetAnotherBean"/>
    <constructor-arg value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

> 实例（非静态）工厂方法可以以基本上相同的方式使用（除了使用factory-bean属性代替使用class属性外）

#### 1.4.1.4 循环依赖问题

```java
package com.jsy.pojo;
public class A {
    B b;

    public void setB(B b) {
        this.b = b;
    }
}

package com.jsy.pojo;
public class B {
    A a;

    public void setA(A a) {
        this.a = a;
    }
}


```

> 使用构造函数注入，则可能会创建无法解决的循环依赖方案
> 一种可能的解决方案是编辑某些类的源代码，这些类的源代码由设置者而不是构造函数来配置。或者，避免构造函数注入，而仅使用setter注入。换句话说，尽管不建议这样做，但是您可以使用setter注入配置循环依赖关系。

简单的说，如果出现**循环依赖**，必须使用**setter**注入。

```xml
    <bean id="a" class="com.jsy.pojo.A">
        <property name="b" ref="b"></property>
    </bean>

    <bean id="b" class="com.jsy.pojo.B">
        <property name="a" ref="a"></property>
    </bean>
```


### 1.4.2 依赖注入的细节
**setter**注入使用`<property/>`
**constructor** 注入使用`<constructor-arg/>元素` 

下面主要是**setter**注入解释。


#### 1.4.2.1 真值注入

```xml
    <bean id="student" class="com.jsy.pojo.Student">
        <property name="age" value="18"></property>
        <property name="name" value="Mike"></property>
    </bean>
```

#### 1.4.2.2 Bean注入

```xml
    <bean id="zoo" class="com.jsy.pojo.Zoo">
        <property name="lion" ref="lion"></property>
       	<property name="tiger" ref="tiger"></property>
    </bean>
```

#### 1.4.2.3 空串和NULL

```xml
<bean class="ExampleBean">
    <property name="email" value=""/>
</bean>
```

```xml
<bean class="ExampleBean">
    <property name="email"><null/></property>
</bean>
```

> 下面的例子来自Kuangshen.

#### 1.4.2.4 数组注入
```xml
 <bean id="student" class="com.kuang.pojo.Student">
     <property name="name" value="小明"/>
     <property name="address" ref="addr"/>
     <property name="books">
         <array>
             <value>西游记</value>
             <value>红楼梦</value>
             <value>水浒传</value>
         </array>
     </property>
 </bean>
```

#### 1.4.2.5 List注入
```xml
<property name="hobbys">
     <list>
         <value>听歌</value>
         <value>看电影</value>
         <value>爬山</value>
     </list>
 </property>
```


#### 1.4.2.6 Map注入
```xml
 <property name="card">
     <map>
         <entry key="中国邮政" value="456456456465456"/>
         <entry key="建设" value="1456682255511"/>
     </map>
 </property>
```

#### 1.4.2.7 Set注入
```xml
<property name="games">
     <set>
         <value>LOL</value>
         <value>BOB</value>
         <value>COC</value>
     </set>
 </property>
```


#### 1.4.2.8 Properties注入
```xml
 <property name="info">
     <props>
         <prop key="学号">20190604</prop>
         <prop key="性别">男</prop>
         <prop key="姓名">小明</prop>
     </props>
 </property>
```

#### 1.4.2.9 p-命名空间与c-命名空间
+ p-空间
依赖于`setter`方法的依赖注入
在头文件中导入约束xml名称空间 : xmlns:p=[传送门](http://www.springframework.org/schema/p)
```xml
 <!--P(属性: properties)命名空间 , 属性依然要设置set方法, 无参构造器仍然要有-->
 <bean id="user" class="com.jsy.pojo.User" p:name="jsy" p:spouse-ref="address"/>
```

注意对于bean的注入必须在字段名后面加上`-ref`，否则bean初始化出错。

 + c-空间
依赖于**构造函数**;
须导入名称空间：xmlns:c=[传送门](http://www.springframework.org/schema/c）
```xml
 <!--C(构造: Constructor)命名空间>
 <bean id="user" class="com.jsy.pojo.User" c:name="jsy" c:age="18"/>
```


#### 1.4.2.10 复合属性名称
```xml
<bean id="something" class="things.ThingOne">
    <property name="fred.bob.sammy" value="123" />
</bean>
```

相当于一直递归地设置属性。

### 1.4.3 depends-on
**bean**的依赖关系除了使用 `<ref>`元素表示之外，
可以显示的使用`depends-on`属性：

```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
    <property name="manager" ref="manager" />
</bean>

<bean id="manager" class="ManagerBean" />
<bean id="accountDao" class="x.y.jdbc.JdbcAccountDao" />
```
有时bean之间的依赖关系不太直接。
也就是说，一个bean没有直接使用另一个bean，这个时候如果好像配置这种依赖关系，就要使用depends-on了。
使用它，可以强制指定bean的初始化顺序以及销毁顺序。

### 1.4.4 Bean的懒加载

> 默认情况下，ApplicationContext实现会在初始化过程中创建和配置所有 单例（singleton）bean。

如果不希望使用此行为，则可以通过将bean定义标记为延迟初始化来防止单例bean的预实例化。延迟初始化的bean告诉IoC容器**在首次请求时而不是在启动时**创建一个bean实例。

使用`lazy-init`属性。
```xml
<!-- 默认的 情况 -->
<bean name="not.lazy" class="com.something.AnotherBean"/>
<!-- 懒加载 -->
<bean id="lazy" class="com.something.ExpensiveToCreateBean" lazy-init="true"/>

<!-- 可以直接在 容器级别上进行所有 bean的懒初始化 -->
<beans default-lazy-init="true">
    <!-- no beans will be pre-instantiated... -->
</beans>
```


### 1.4.5 自动装配
这里并不打算讲在spring中基于xml的自动装配，后面会基于**注解**来实现自动装配，故这里略去不谈。


### 1.4.6 方法注入

> 方法注入是Spring IoC容器的一项高级功能，这里只讲解决办法。

这里只讲一下为什么需要方法注入。

简单来说，由于bean的声明周期不同，导致的问题。比如一个单例的bean依赖一个原型的bean，但是单例的bean的属性注入只有一次机会，这个时候就产生了问题。


使用 `@Lookup` 注解。

1. 声明一个原型bean。
```java
@Component
@Scope("prototype")
public class MyPrototype {
}
```

2. 在单例bean写一个返回 null 的 getXXX方法，
**这里的方法名实际上就是xml的 bean的id**。
再用`@Lookup`标记方法。

（这里也可以直接写成抽象方法，但不管怎样到最后，**Spring框架都要通过使用CGLIB库中的字节码生成来动态生成覆盖该方法的子类，从而实现此方法注入**）
```java
@Component
public class MySingleton {

    @Lookup
    public MyPrototype getMyPrototype() {
        return null;
    }
    
}
```

3. 获取 原型bean，然后使用。

```java
public void show() {
		// 这里返回的可不是 null，放心使用它
        MyPrototype myPrototype = getMyPrototype();
        System.out.println(myPrototype.hashCode());
    }
```


> 参考资料
>
> [Spring官方文档](https://docs.spring.io/spring-framework/docs/current-SNAPSHOT/reference/html/core.html#spring-core)
>
> [doc index](https://docs.spring.io/spring-framework/docs/)

