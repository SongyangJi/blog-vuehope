---
title: 代理模式、Java中的动态代理、Proxy源码分析、实例分析
date: 2021-10-02
categories: Java
tags: 
	- Java语言基础 
---



# 代理
## 代理模式
+ 目的：为其他对象提供一种代理以控制对这个对象的访问，可以增强、可以削弱。
+ 应用实例：Spring中的**AOP**
+ 代理的分类：**静态代理**、**动态代理**
其中静态代理、动态代理的区别在于代理的生成时期不同 —— 前者在编译前就已经编写好代理类，后者在运行时动态生成代理类。
+ Java中代理的具体实现，依赖于接口实现(JDK实现的代理)、依赖于继承实现(CGLIB实现的代理)。

## Java中的动态代理

### API
JDK原生支持的代理依靠一个InvocationHandler接口和一个类Proxy。
先把API放出来。

+ `java.lang.reflect.InvocationHandler`
```java
Object invoke(Object proxy, Method method, Object[] args);
```
使用method句柄调用**被代理对象**的方法，方法参数是args,返回值 Object
(需要强转，但是不需要我们自己强转)。
注意，这里的`proxy`是生成的代理对象，不是我们希望被代理的真实的对象，而真实的对象需要在`InvocationHandler`接口的实现里，将它传进去。

**这个接口也就是我们在实现代理的时候关注最多的方法，对它的实现，决定了我们究竟完成了对目标对象怎样的控制。**

+ `java.lang.reflect.Proxy`
```java
// 返回代理类的类类型（不过已被废弃，不建议使用）
static Class<?> getProxyClass(ClassLoader loader, Class<?>... interfaces);
// 通过类加载器(这个参数暂时可以忽略)，代理类需要实现的接口、调用处理器生成代理类的实例
static Object newProxyInstance(ClassLoader loader,Class<?>[] interfaces ,InvocationHandler handler)
// 判断类类型是否是代理类
static boolean isProxyClass(Class<?> cl);
```

### 使用方法
在前面的叙述中，我们知道想要生成一个代理类需要提供三样东西，
1. 类加载器
2. 接口组
3. 调用处理

下面实操一下。
（例子来源于《Java核心技术卷1》）
```java
package about_proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;
import java.util.Random;

/**
 * @Author: Song yang Ji
 * @ProjectName: learnJavaSE
 * @Version 1.0
 * @Description: 使用代理完成对Comparable方法调用的跟踪
 */

public class TraceUsingProxy {
		
	// 调用处理器	
    public static class TraceHandler implements InvocationHandler {
        // 被代理的对象
        private Object target;

        public TraceHandler(Object target) {
            this.target = target;
        }

        /**
         * @param proxy  代理的对象
         * @param method 方法句柄
         * @param args   方法参数
         * @return method方法的返回值
         */
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // 输出方法的调用信息
            System.out.print(target + "." + method.getName() + "(");
            if (args != null) {
                for (int i = 0; i < args.length; i++) {
                    if (i > 0) System.out.print(", ");
                    System.out.print(args[i]);
                }
            }
            System.out.println(")");
            // 调用 target 对象的 method 方法，参数是 args
            return method.invoke(target, args);
        }
    }


    public static void main(String[] args) {
        System.getProperties().put("jdk.proxy.ProxyGenerator.saveGeneratedFiles", "true");
        int N = 1000;
        Object[] proxyInteger = new Object[N];
        for (int i = 0; i < N; i++) {
            proxyInteger[i] = Proxy.newProxyInstance(ClassLoader.getSystemClassLoader(), new Class[]{
                    Comparable.class
            }, new TraceHandler(i));
        }
        int key = new Random().nextInt(N);
        int res = Arrays.binarySearch(proxyInteger, key);
        System.out.printf("key %d is at %d\n", key, res);
    }
}
```

## 代理类的特性
1. 代理类是在运行时动态生成的，但是一旦生成，就是个普通类，在jvm眼里和其他类没有任何不同。
2. 所有的代理类都继承自`Proxy`。
3. 生成的代理类的名字往往是$Proxy开头的，但默认不可见，运行后即销毁。
4. 代理类Proxy及具体的代理类都只有一个实例字段，就是`InvocationHandler`的实例，所有对被代理对象的控制都在这里完成。
5. 生成代理类除了会override掉你指定的接口，还会覆盖Object里的`toString`、`equals`,`hashCode`方法。（后面会用代码说明）
6. 对于一个特定的类加载器和预设的一组接口来说，只会生成一个代理类。
也就是通过`getProxyClass(ClassLoader loader, Class<?>... interfaces)`;获得的代理类。

## 源码分析
想要看到动态生成的代理类。你可以在代码的开头加上：
```java
System.getProperties().put("jdk.proxy.ProxyGenerator.saveGeneratedFiles", "true");
```

```java
package about_proxy;


import java.io.Serializable;
import java.lang.reflect.Proxy;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        System.getProperties().put("jdk.proxy.ProxyGenerator.saveGeneratedFiles", "true");
		// 实现了众多接口的一个代理类
        Object proxy = Proxy.newProxyInstance(Test.class.getClassLoader(), new Class[]{
                Serializable.class, Comparable.class, List.class, Runnable.class
        }, (proxy1, method, args1) -> null);
        System.out.println(proxy.getClass().getName());
		// 没有实现任何接口的代理类
        Object proxy2 = Proxy.newProxyInstance(Test.class.getClassLoader(), new Class[]{
        }, (proxy1, method, args1) -> null);
        System.out.println(proxy2.getClass().getName());
    }
}
```

运行它，看一下生成的类的代码，分析一下内在机制。

```java
public final class $Proxy0 extends Proxy implements Serializable, Comparable, List, Runnable  {
    private static Method m1;
    private static Method m2;
    private static Method m0;
    private static Method m4;
    // ...... 还有其他Method句柄
    
    
    private static Method mxx;
	
	// 调用父类的构造函数，传入唯一的实例字段
    public $Proxy1(InvocationHandler var1) throws  {
        super(var1);
    }
	
	// 下面三个是覆盖Object的三个方法
    public final boolean equals(Object var1) throws  {
    // ...
    }
    public final String toString() throws  {
     // ...
    }
    public final int hashCode() throws  {
		// ...
    }

	// 这个是覆盖List接口里的add方法，具体方法的调用就要到InvocationHandler去实现
	public final void add(int var1, Object var2) throws  {
        try {
            super.h.invoke(this, m4, new Object[]{var1, var2});
        } catch (RuntimeException | Error var4) {
            throw var4;
        } catch (Throwable var5) {
            throw new UndeclaredThrowableException(var5);
        }
    }
	// 还有其他方法的override
	
	// 静态代码段，初始化所有的Method对象。
    static {
        try {
        	// 
            m1 = Class.forName("java.lang.Object").getMethod("equals", Class.forName("java.lang.Object"));
            m2 = Class.forName("java.lang.Object").getMethod("toString");
            m0 = Class.forName("java.lang.Object").getMethod("hashCode");
            m4 = Class.forName("java.util.List").getMethod("add", Integer.TYPE, Class.forName("java.lang.Object"));
            // ... 
            // 下面还有其他Method对象的生成，方法与上面的类似
        } catch (NoSuchMethodException var2) {
            throw new NoSuchMethodError(var2.getMessage());
        } catch (ClassNotFoundException var3) {
            throw new NoClassDefFoundError(var3.getMessage());
        }
    }
}
```

