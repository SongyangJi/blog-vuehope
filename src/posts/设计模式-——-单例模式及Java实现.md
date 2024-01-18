---
title: 设计模式 —— 单例模式及Java实现
date: 2021-11-26 08:20:23
categories: 设计模式
tags:
  - 单例模式
  - 设计模式
---





# 单例模式
在整个项目中只提供这个类的一个实例，而不是需要这个实例对象时候去创建，用完就销毁。
## 适用场景
创建此对象时间、空间开销非常大，而实际上这种类的对象具有静态属性，即属于类。
对于不同的调用者，不会因为需求不同，赋予它任意的性质——即这种类只会一种或少数形式创建出对象，完全可以事先创建创建、而后供人调用。
Spring的IOC容器里的对象的存在形式默认就是单例的。
常用于工具类，IO类、连接类的对象生成。
# Java实现
## 饿汉式
在编译时就加载完毕。
```java
//饿汉式
public class Singleton {
    private final static Singleton singleton = new Singleton();
    public static Singleton getSingleton() {
        return singleton;
    }
}
```

## 懒汉式
并不是程序初始时就生成对象，因为可能在整个程序运行时间都没有使用，那么懒汉式的加载就加大了开销。
也就是说，我们要**在第一次要使用这个实例的时候才去创建它。**
+ Java实现
这样就实现了懒加载的最基本的要求。
```java
//懒汉式
public class Singleton {
    private static Singleton singleton = null;
    public static Singleton getSingleton() {
        if(singleton==null){
            return singleton = new Singleton();
        }
        return singleton;
    }
}
```
### 利用同步锁
不难发现，上面的做法是线程不安全的。具体来说，有a、b、c三个线程调用了`getSingleton()`，它们在调用的时候，`singleton`都是`null`,于是三个线程都会创建出一个对象，破坏了单例的要求。
解决方法，也很简单。对这个方法加上同步锁，这样就保证同时只有一个线程抢到这把锁，然后第二个线程抢到这把锁的时候就不会创建了。
但是`synchronized`是重量级的同步锁，开销很大，这样使得每次调用这个方法都要进行同步操作，开销很大。
```java
//懒汉式
public class Singleton {
    private static Singleton singleton = null;
    public synchronized static Singleton getSingleton() {
        if(singleton==null){
            return singleton = new Singleton();
        }
        return singleton;
    }
}
```
+ 双重检查锁
下面的写法，并不是对方法加锁，而是在第一次判“空”的时候，才加锁，这样的话就不用每一次调用方法都会进行同步操作。
举个例子，有三个线程进入了if代码，然后它们将依次获得这把锁，而只有第一个抢到这把锁的线程才会去new一个实例，而之后的线程就会跳过if直接返回实例。
```java
//懒汉式
public class Singleton {
    private volatile static Singleton singleton = null;
    public static Singleton getSingleton() {
        if(singleton==null){
            synchronized (Singleton.class){
                if(singleton==null){
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```
但是，这样的代码还有可能犯的一个的错误。
要知道，在上述场景中有多个线程对同一个变量（共享变量）又读又写，那么为了保证每个线程都对`singleton`的值实时可见，那么必须对共享变量加上`volatile`关键字修饰，才能避免对数据脏读。

### 利用静态内部类
这种写法巧妙的利用了静态内部类只会在第一次使用时才加载的特性，实现了懒加载，并且是线程安全的。
```java
//懒汉式
public class Singleton{
    private static class SingletonHolder{
        private static Singleton singleton = new Singleton();
    }
    public static Singleton getSingleton(){
        return SingletonHolder.singleton;
    }
}
```
不过很可惜这种做法还是可以使用反射去破坏单例。
验证如下：
```java
public class Singleton {
    private static class SingletonHolder {
        public static Singleton singleton = new Singleton();
    }

    public Singleton getSingleton() {
        return SingletonHolder.singleton;
    }

    public static void main(String[] args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        Constructor<Singleton> constructor = Singleton.class.getConstructor();
        Singleton singleton1 = constructor.newInstance();
        Singleton singleton2 = constructor.newInstance();
        Singleton singleton3 = constructor.newInstance();
        System.out.println(singleton1);
        System.out.println(singleton2);
        System.out.println(singleton3);
    }

}
```


### 利用枚举实现单例
```java
public class SingletonObject {

    private SingletonObject() {
        if (getSingletonObject() != null) {
            throw new RuntimeException("new instance failure");
        }
    }

    private enum SingletonHolder {
        INSTANCE;

        private final SingletonObject singletonObject;

        SingletonHolder() {
            this.singletonObject = new SingletonObject();
        }
    }

    public SingletonObject getSingletonObject() {
        return SingletonHolder.INSTANCE.singletonObject;
    }
    
}
```

## 能否用“反射”去破坏单例
单例模式很重要的一点就是保证全局只有一份实例，那么我们能够通过反射去强行破坏这一要求，去生成多个实例呢？
很不幸的是，是可以的。

```java
    private volatile static Singleton singleton = null;
    public static Singleton getSingleton() {
        if(singleton==null){
            synchronized (Singleton.class){
                if(singleton==null){
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }

    public static void main(String[] args) throws IllegalAccessException, InvocationTargetException, InstantiationException {
        Constructor constructor = null;
        try {
            constructor = Class.forName("单例模式.Singleton").getConstructor();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        constructor.setAccessible(true);
        Singleton singleton1 = (Singleton) constructor.newInstance();
        Singleton singleton2 = (Singleton) constructor.newInstance();
        Singleton singleton3 = (Singleton) constructor.newInstance();
        System.out.println(singleton1);
        System.out.println(singleton2);
        System.out.println(singleton3);
    }
}
```

```java
单例模式.Singleton@38af3868
单例模式.Singleton@77459877
单例模式.Singleton@5b2133b1
```
不过反射因为是一种认为操作，这种风险往往是已知的。
