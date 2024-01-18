---
title: Spring 学习笔记3 —— IOC容器 3 (使用注解配置IOC容器)
date: 2021-07-10
categories: Spring
tags: 
    - Spring核心
    - JavaEE
---


> 这里我做的这份笔记的意义仅仅是记录下自己初涉Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。



# 1 Spring IoC容器和Bean简介
## 1.9 基于注解的容器配置
> **注解**在配置Spring上比**XML**更好吗？ 两种方式并无绝对的更好。不过目前的趋势是使用注解，尤其是对于不是特别大的项目。


### 1.9.1 @Autowire
**@Autowire** 用于自动装配，按照 **类型** 装配。
1. 注解字段
2. 注解构造器
3. 注解方法

其中，不建议使用 @Autowire 注入，这强依赖于 Spring 上下文的，无法在脱离ioc容器创建对象，比如在进行单元测试的时候。
使用构造器注入，表达强依赖关系。
使用方法（不一定是setter），表达依赖的可选择关系。


### 1.9.2 @Primary
由于@Autowire是按类型自动装配的，如果有过个bean的话Spring不知道找那个，
可以使用 **@Primary** 指定 bean 的优先级。

```java
@Primary
@Component
public class ...{
}
```
以及
```java
@Configuration
public class MovieConfiguration {

    @Bean
    @Primary
    public MovieCatalog firstMovieCatalog() { ... }

    @Bean
    public MovieCatalog secondMovieCatalog() { ... }

    // ...
}
```
### 1.9.3 @Qualifier
配合 @Autowire 使用，可以根据 bean 的名字进行精确匹配。
此注解可以使用在 方法、字段、类型、参数，相当于在需要根据name进行标识的时候，就使用它。

注：
可能有人想用 **@Resource** 去彻底代替 @Autowire + @Qualifier。
在一定场景下是可以的。
但是 **@Resource 只能用于字段，和单个参数的setter**，对于注解构造函数和多个参数的方法，它无能为力。不过， @Autowire + @Qualifier 没有这个限制。


官方文档这里还讲了 自定义的 @Qualifier ，这里就不细讲了。

### 1.9.4 @Resource
 `@Resource`有两个属性`name`、`type`
匹配规则：
 - 后面没有任何内容，**默认通过name属性**去匹配bean，找不到再按type去匹配；
 -  指定了name或者type则根据指定的类型去匹配bean；
 - 指定了name和type则根据指定的name和type去匹配bean，任何一个不匹配都将报错。


### 1.9.5 将泛型用作自动装配限定符
暂略。

### 1.9.4 @Value
@Value 通常用于注入外部属性。
这里还用到了 Spring表达式，不过这里仅仅使用读取即可。

```java
@Component
public class MovieRecommender {

    private final String catalog;

    public MovieRecommender(@Value("${catalog.name}") String catalog) {
        this.catalog = catalog;
    }
}
```
在 application.properties
```
catalog.name=MovieCatalog
```


还可以使用SpEL进行读取值后动态计算生成值。

## 1.10 类路径扫描与托管组件
### 1.10.1 @ComponentScan
要**自动检测这些类并注册相应的bean**，就可以使用 **@ComponentScan**。

它的作用，找到这些bean,并把它注册到 ioc 容器里， 就像我们手动在 xml 配置一样。

对于SpringBoot应用这个注解可能不会直接被我们使用，
原因是 @SpringBootApplication已经使用了 这个注解，而这个注解会扫描 com.xxx.xxx包及其子包下所有的@Component 及其派生注解，所以一般情况下我们用不着。


但是如果有类写在启动类所在包的外面，而你又想使用它，就得用上这个注解了。


使用方法：
指定扫描的包（子包会自动扫描），指定过滤器。
```java
@ComponentScan(basePackages = "org.example",
        includeFilters = @Filter(type = FilterType.REGEX, pattern = ".*Stub.*Repository"),
        excludeFilters = @Filter(Repository.class))
```

### 1.10.2 @Bean
@Bean注释的作用与<bean/>元素相同。


@Bean可以结合其他注解使用
这些注解基本上是补全了XML的功能
+ 如
@Primary :优先级，当有两个相同类型的Spring Bean，如果有一个被声明了是@Primary，那么@Autowired会注入这个带有@Primary的。
@Scope :作用域，默认有singleton/prototype，单例和每次注入重新初始化，
@Profile :见@Configuration
@Lazy :见@Configuration


```java
//@Component
@Configuration
public class BeanHolder {
    @Bean
    public ExampleBean exampleBean() {
        return new ExampleBean();
    }
    // 在类内调用，同样也会经过代理
    // （ 很好理解，cglib生成的子类override上面的getExampleBean方法后，调用f()时，
    // 根据类的多态，此时调用的getExampleBean方法是被增强过的方法
    public void f() {
        System.out.println(exampleBean());
        System.out.println(exampleBean());
        System.out.println(exampleBean());
    }
}
```
它和如下的xml配置等效
```xml
<beans>
    <bean id="exampleBean" class="com.xxx.BeanHolder"/>
</beans>
```

+ 如果把这里的 **@Configuration**换成 **@Component**会怎样？
注意，@Configuration类下被 @Bean 注解的方法，调用的时候会得到CGLIB代理的增强，
而@Component下的@Bean方法不经过代理，是标准的java调用。

+ 如果@Bean修饰的方法被 static呢？
注意CGLIB生成的子类只会override非静态方法，所以static的@Bean方法不会被容器拦截。
技术上来说，CGLIB会动态生成BeanHolder的子类，然后override那个@Bean代理的方法。

注意，看到下面的图，你通过Spring容器拿到的类，其实已经不是你自己写的类了，而是经过cglib加强过的类。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210526013456644.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0ODQ2MzI0,size_16,color_FFFFFF,t_70)
### 1.10.3 命名自动检测的组件
Spring自己生成的bean的名字是有规则的，就是类名答第一个字母变成小写，而你可以自定义名称生成规则（不过似乎很鸡肋，没什么用）。

### 1.10.4 @Scope
这个注解可以用在Bean class 和@Bean 方法上，用来指定作用域。

```java
@Scope("prototype")
@Component
public class ...{
}

@Bean
@Scope("prototype")
public MyBean myBean(){
}
```





> 参考资料
>
> [Spring官方文档](https://docs.spring.io/spring-framework/docs/current-SNAPSHOT/reference/html/core.html#spring-core)
>
> [doc index](https://docs.spring.io/spring-framework/docs/)
