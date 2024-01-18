---
title: CGLIB代理和JDK代理
date: 2022-03-16
categories: Java
tags: 
  - Java语言基础 
---



## CGLIB

```java
// CGLIB动态代理
// 1. 首先实现一个MethodInterceptor，方法调用会被转发到该类的intercept()方法。
class MyMethodInterceptor implements MethodInterceptor{
  ...
	@Override
	public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
		logger.info("You said: " + Arrays.toString(args));
		return proxy.invokeSuper(obj, args);
	}
}
// 2. 然后在需要使用HelloConcrete的时候，通过CGLIB动态代理获取代理对象。
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(HelloConcrete.class);
enhancer.setCallback(new MyMethodInterceptor());

HelloConcrete hello = (HelloConcrete)enhancer.create();
System.out.println(hello.sayHello("I love you!"));

```



## 优缺点比较

JDK

1. 根据ClassLoader和Interface来获取接口类（前面已经讲了，类是由ClassLoader加载到JVM的，所以通过ClassLoader和Interface可以找到接口类）

2. 获取构造对象；

3. 通过构造对象和InvocationHandler生成实例，并返回，就是我们要的代理类。

Java动态代理优缺点：

优点：

1. Java本身支持，不用担心依赖问题，随着版本稳定升级；

2. 代码实现简单；

缺点：

1. 目标类必须实现某个接口，换言之，没有实现接口的类是不能生成代理对象的；

2. 代理的方法必须都声明在接口中，否则，无法代理；

3. 执行速度性能相对cglib较低；





Cglib原理：

1.通过字节码增强技术动态的创建代理对象；

2.代理的是代理对象的引用；

Cglib优缺点：

优点：

1.代理的类无需实现接口；

2.执行速度相对JDK动态代理较高；

缺点：

1.字节码库需要进行更新以保证在新版java上能运行；

2.动态创建代理对象的代价相对JDK动态代理较高；

Tips：

1.代理的对象不能是final关键字修饰的







> https://www.cnblogs.com/carpenterlee/p/8241042.html
>
> https://www.cnblogs.com/brithToSpring/p/13356626.html
>
> https://segmentfault.com/a/1190000023514746

