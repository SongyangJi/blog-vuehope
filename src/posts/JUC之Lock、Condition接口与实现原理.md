---
title: JUC之Lock、Condition接口与实现原理
date: 2021-11-13 18:12:00
categories: JUC
tags:
  - JUC
  - Java多线程
---

# Lock接口



## Lock接口的API

```java
package java.util.concurrent.locks;

public interface Lock {
    // 获取锁，如果不能立即获取，阻塞，获取到锁之后从该方法返回
    void lock();

    // 获取锁，相比lock()方法，它可以相应中断
    void lockInterruptibly() throws InterruptedException;

    // 非阻塞的尝试获取锁，如果能立即获取并返回true，否则立即返回false
    boolean tryLock();

    // 带超时的获取锁，发生下列情况之一时返回
    // 1. 获取到锁
    // 2. 超时
    // 3. 被中断
    boolean tryLock(long time, TimeUnit unit) throws InterruptedException;

    // 释放锁
    void unlock();

    // 获取通知组件，该组件和该lock实例（监视器的概念）绑定
    Condition newCondition();
}
```

**如何使用它**

```java
Lock lock = new ReentrantLock();
lock.lock();
try {
    // do something
} finally {
    lock.unlock();
}
```





## Lock和synchronized的联系与区别

**共同点**

都是Java中常用的同步工具，都实现了锁的语义，都有预期配套的监视器方法。



**Lock相比于synchronized的特性**

1. 相比于`synchronized`隐式地获取、释放锁，Lock放弃了这一小小的便利性，让程序员自己获取和释放锁，控制的粒度细很多，尤其是在多把锁的有序性获取和释放时，更是`synchronized`做不到的；
2. 可中断的获取锁；
3. 提供尝试性的获取锁
4. 可以超时获取锁





# Condition接口

任何一个Java类都隐式继承了`java.lang.Object`,Obejct中的`wait()`、`wait(long timeout)`、`notify()`、`notifyAll()`方法。这些方法和`syschrinized`关键字配合就可以实现经典的**等待-通知模式**

`Condition`接口也提供了类似Object的监视器方法，与`Lock`配合也能实现上述的效果，并且功能更完整。



对比



## Condition接口的API

```java
package java.util.concurrent.locks;

public interface Condition {

    // 使当前线程等待，直到它被唤醒或被中断。
    // 在此方法可以返回当前线程之前，必须重新获取与此条件关联的锁,当线程返回时，它保证持有这个锁。
    void await() throws InterruptedException;

    // 使当前线程等待，直到它被唤醒（不受中断影响）
    void awaitUninterruptibly();
    
    // 进入等待状态直到被通知、中断、超时（时间单位是纳秒）
    long awaitNanos(long nanosTimeout) throws InterruptedException;

    // 与上面类似，不过可以指定时间单位
    boolean await(long time, TimeUnit unit) throws InterruptedException;

    // 与上面类似，不过直接指定终点时间
    boolean awaitUntil(Date deadline) throws InterruptedException;

    // 唤醒一个等待在Condition上的线程，该线程从等待方法返回前必须获得与Condition相关联的锁
    void signal();

    // 唤醒所有等待在Condition上的线程，该线程从等待方法返回前必须获得与Condition相关联的锁
    void signalAll();
  
}

```



## Condition的实现分析



<img src="./LockAndCondition.png" style="zoom:25%;" />





```java
// 只截取部分部分
public class ConditionObject implements Condition, java.io.Serializable {
        private transient Node firstWaiter;
        private transient Node lastWaiter;

  
        public ConditionObject() { }

        // Internal methods
				// ...
    }
```





# 公平锁和非公平锁

公平锁：多个线程按照申请锁的顺序去获得锁，线程会直接进入队列去排队，永远都是队列的第一位才能得到锁。

+ 优点：所有的线程都能得到资源，不会饿死在队列中。
+ 缺点：吞吐量会下降很多，队列里面除了第一个线程，其他的线程都会阻塞，cpu唤醒阻塞线程的开销会很大。

非公平锁：多个线程去获取锁的时候，会直接去尝试获取，获取不到，再去进入等待队列，如果能获取到，就直接获取到锁。

+ 优点：可以减少CPU唤醒线程的开销，整体的吞吐效率会高点，CPU也不必取唤醒所有线程，会减少唤起线程的数量。
+ 缺点：你们可能也发现了，这样可能导致队列中间的线程一直获取不到锁或者长时间获取不到锁，导致饿死。



学习AQS的时候，了解到AQS依赖于内部的FIFO同步队列来完成同步状态的管理，当前线程获取同步状态失败时，同步器会将当前线程以及等待状态等信息构造成一个Node对象并将其加入到同步队列，同时会阻塞当前线程，当同步状态释放时，会把首节点中的线程唤醒，使其再次尝试获取同步状态。

AQS的同步队列是FIFO的，就是先来排队的先走。那怎么实现非公平锁呢？



## ReentrantLock 的公平锁

**构造方法**

```java
//默认
public ReentrantLock() {
    sync = new NonfairSync();
}
//传入true or false
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
```



**公平锁的 lock 方法**

```java
static final class FairSync extends Sync {
    final void lock() {
        acquire(1);
    }
    // AbstractQueuedSynchronizer.acquire(int arg)
    public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
    protected final boolean tryAcquire(int acquires) {
        final Thread current = Thread.currentThread();
        int c = getState();
        if (c == 0) {
            // 1. 和非公平锁相比，这里多了一个判断：是否有线程在等待
            if (!hasQueuedPredecessors() &&
                compareAndSetState(0, acquires)) {
                setExclusiveOwnerThread(current);
                return true;
            }
        }
        else if (current == getExclusiveOwnerThread()) {
            int nextc = c + acquires;
            if (nextc < 0)
                throw new Error("Maximum lock count exceeded");
            setState(nextc);
            return true;
        }
        return false;
    }
}
```

我们可以看到，在注释1的位置，有个`!hasQueuedPredecessors()`条件，意思是说当前同步队列没有前驱节点（也就是没有线程在等待）时才会去`compareAndSetState(0, acquires)`使用CAS修改同步状态变量。所以就实现了公平锁，根据线程发出请求的顺序获取锁。



## 非公平锁的lock方法

```java
static final class NonfairSync extends Sync {
    final void lock() {
        // 2. 和公平锁相比，这里会直接先进行一次CAS，成功就返回了
        if (compareAndSetState(0, 1))
            setExclusiveOwnerThread(Thread.currentThread());
        else
            acquire(1);
    }
    // AbstractQueuedSynchronizer.acquire(int arg)
    public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
    protected final boolean tryAcquire(int acquires) {
        return nonfairTryAcquire(acquires);
    }
}
/**
 * Performs non-fair tryLock.  tryAcquire is implemented in
 * subclasses, but both need nonfair try for trylock method.
 */
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        //3.这里也是直接CAS，没有判断前面是否还有节点。
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0) // overflow
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```



非公平锁的实现在刚进入lock方法时会直接使用一次CAS去尝试获取锁，不成功才会到acquire方法中，如注释2。而在nonfairTryAcquire方法中并没有判断是否有前驱节点在等待，直接CAS尝试获取锁，如注释3。由此实现了非公平锁。



**非公平锁和公平锁的两处不同：**

1. 非公平锁在调用 lock 后，首先就会调用 CAS 进行一次抢锁，如果这个时候恰巧锁没有被占用，那么直接就获取到锁返回了。

2. 非公平锁在 CAS 失败后，和公平锁一样都会进入到 tryAcquire 方法，在 tryAcquire 方法中，如果发现锁这个时候被释放了（state == 0），非公平锁会直接 CAS 抢锁，但是公平锁会判断等待队列是否有线程处于等待状态，如果有则不去抢锁，乖乖排到后面。



**公平锁和非公平锁就这两点区别，如果这两次 CAS 都不成功，那么后面非公平锁和公平锁是一样的，都要进入到阻塞队列等待唤醒**。



相对来说，

1. **非公平锁会有更好的性能，因为它的吞吐量更大**;

2. 但**非公平锁让获取锁的时间变得更加不确定，可能会导致在阻塞队列中的线程长期处于饥饿状态**。



上文说到的线程切换的开销，其实就是非公平锁效率高于公平锁的原因，因为非公平锁减少了线程挂起的几率，后来的线程有一定几率逃离被挂起的开销。