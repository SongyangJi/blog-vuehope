---
title: ThreadLocal使用、源码解析
date: 2021-08-05
categories: Java多线程
tags:
  - Java多线程
---



# ThreadLocal的作用

1. 方便传参（参考反面例子，go没有适用于goroutine的threadlocal，只能显式函数传参）
2. 资源隔离（数据库连接）



# 使用ThreadLocal线程ID工具类

```java
import java.util.concurrent.atomic.AtomicInteger;
/*

实现了一个线程ID工具类

-----来自源码文档demo
*/
public class ThreadId {
    // Atomic integer containing the next thread ID to be assigned
    private static final AtomicInteger nextId = new AtomicInteger(0);

    // Thread local variable containing each thread's ID
    private static final ThreadLocal<Integer> threadId =
            ThreadLocal.withInitial(nextId::getAndIncrement);

    // Returns the current thread's unique ID, assigning it if necessary
    public static int get() {
        return threadId.get();
    }


    public static void main(String[] args) {
        new Thread(()->{
            System.out.println("A: "+ThreadId.get());
            System.out.println("A: "+ThreadId.get());
        }).start();

        new Thread(()->{
            System.out.println("B: "+ThreadId.get());
            System.out.println("B: "+ThreadId.get());
        }).start();

        new Thread(()->{
            System.out.println("C: "+ThreadId.get());
            System.out.println("C: "+ThreadId.get());
        }).start();
    }

}
```



# 源码分析

```java
package java.lang;

public class ThreadLocal<T> {

    // 此ThreadLocal对象的“自定义”的哈希吗
    private final int threadLocalHashCode = nextHashCode();

    // 静态的线程安全的循环计数器
    private static AtomicInteger nextHashCode =
        new AtomicInteger();
    
    // 连续的 ThreadLocal的哈希值的增量差异（此 magic number 可以产生离散程度很好的哈希表）
    private static final int HASH_INCREMENT = 0x61c88647;

    // 获取下一个 hash 值的工具方法
    private static int nextHashCode() {
        return nextHashCode.getAndAdd(HASH_INCREMENT);
    }

    // 返回当前线程获取此 thread-local 对象的初始值
    // 可以用匿名内部类（lambda表达式代替）覆盖此方法，以提供初始值
    protected T initialValue() {
        return null;
    }

    public ThreadLocal() {
    }

    // 返回此线程局部变量的当前线程中的值
    /*
    	步骤：
    	1、获取当前线程
    	2、获取此线程拥有的 ThreadLocalMap
    	3、在 ThreadLocalMap 中根据此 ThreadLocal 对象拿到值
    */
    public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                T result = (T)e.value;
                return result;
            }
        }
        return setInitialValue();
    }

    
  	/*
    	步骤：
    	1、获取当前线程
    	2、获取此线程拥有的 ThreadLocalMap
    	3、调用map 的 setter 方法（ 如果未初始化，则先初始化 ）
    */
    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            map.set(this, value);
        } else {
            // 创建此线程的自己的 ThreadLocalMap
            createMap(t, value);
        }
    }
    
     // ThreadLocal 允许线程”删除“它的线程本地量
     public void remove() {
         ThreadLocalMap m = getMap(Thread.currentThread());
         if (m != null) {
             m.remove(this);
         }
     }

    // 每个线程有自己的 ThreadLocalMap实例，用 Thread 类的 threadLocals 字段设置
    // 然后在某个 ThreadLocalMap实例 中根据 threadLocal实例 取值
    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }

    // 设置线程的threadLocals
    void createMap(Thread t, T firstValue) {
        t.threadLocals = new ThreadLocalMap(this, firstValue);
    }

}
```



## ThreadLocal的内部类 ThreadLocalMap
> ThreadLocalMap 是一种定制的哈希映射，仅适用于维护线程本地值。


每个线程有自己的 ThreadLocalMap实例，用 Thread 类的 threadLocals 字段设置。
```java
static class ThreadLocalMap {

    /* 注意这里的弱引用 */
    static class Entry extends WeakReference<ThreadLocal<?>> {
        /** The value associated with this ThreadLocal. */
        Object value;

        Entry(ThreadLocal<?> k, Object v) {
            super(k);
            value = v;
        }
    }

    // table 的默认容量
    private static final int INITIAL_CAPACITY = 16;

    // 有需要就扩容，容量大小为 2 的整数次幂
    private Entry[] table;

    /**
     * The number of entries in the table.
     */
    private int size = 0;

    // 下一次进行 resize 的阈值
    private int threshold; // Default to 0

    // 负载因子为 2/3 
    private void setThreshold(int len) {
        threshold = len * 2 / 3;
    }

    // 取模意义下的 ”后一个位置“
    private static int nextIndex(int i, int len) {
        return ((i + 1 < len) ? i + 1 : 0);
    }

    // 取模意义下的 ”前一个位置“
    private static int prevIndex(int i, int len) {
        return ((i - 1 >= 0) ? i - 1 : len - 1);
    }

    // 初始化惰性构造
    ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
        table = new Entry[INITIAL_CAPACITY];
        // 一样的技巧 —— 位运算代替取模
        int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1);
        table[i] = new Entry(firstKey, firstValue);
        size = 1;
        setThreshold(INITIAL_CAPACITY);
    }


    private Entry getEntry(ThreadLocal<?> key) {
        int i = key.threadLocalHashCode & (table.length - 1);
        Entry e = table[i];
        if (e != null && e.get() == key)
            return e;
        else
            return getEntryAfterMiss(key, i, e);
    }

```



# 内存泄漏分析demo

```java
public class Test {

    static class Node {
        byte[] bytes = new byte[1024];
    }

    public static void main(String[] args) {

        while (true){
            ThreadLocal<Node> threadLocal = new ThreadLocal<>();
            Node node = new Node()
            threadLocal.set(new Node());
//            System.out.println(threadLocal.get());
        }
    }
}
```



**引用链分析**:

+ GC对象Node:
局部变量引用node，

另一条引用链
```
Thread.currentThread()->threadLocals(ThreadLocalMap)->table(Entry[])->Entry-->threadLocal
```
最后一个是弱引用



+ GC对象ThreadLocal
局部变量引用 threadLocal，

另一条引用链
```
Thread.currentThread()->threadLocals(ThreadLocalMap)->table(Entry[])->Entry->node
```
都是强引用。


> (Weakly Reachable )[https://www.cs.fsu.edu/~jtbauer/cis3931/tutorial/refobjs/about/weak.html]
