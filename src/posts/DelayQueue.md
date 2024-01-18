---
title: DelayQueue
date: 2022-03-15 18:16:48
categories: JUC
tags:
  - JUC
  - 并发集合类
---



**Delayed元素**的**无界**阻塞队列，其中的**元素只能在其延迟到期时被获取**。 

队列的头部是延迟过期最早的那个Delayed元素。

如果没有延迟到期，则没有 head 并且poll将返回null 。

当元素的`getDelay(TimeUnit.NANOSECONDS)`方法返回小于或等于零的值时，就会发生过期。

尽管无法使用take或poll删除未过期的元素，它们仍被视为普通元素。 例如， size方法返回过期和未过期元素的计数。

此队列不允许空元素。





# 使用示例

实现了一个延时获取的元素类。

```java
package com.jsy.threadPool;

import java.time.Duration;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

/**
 * @author: SongyangJi
 * @description:
 * @since: 2021/10/31
 */
public class TestQueue {

    static class DelayedItem<T> implements Delayed {


        private T element;
        private final int delaySeconds;
        private final long expireNanoTime;

        public DelayedItem(T element, int delaySeconds) {
            this.element = element;
            this.delaySeconds = delaySeconds;
            expireNanoTime = System.nanoTime() + TimeUnit.NANOSECONDS.convert(Duration.ofSeconds(delaySeconds));
        }

        
        // 剩余的阻塞的时间
        @Override
        public long getDelay(TimeUnit unit) {
            return expireNanoTime - System.nanoTime();
        }

        @Override
        public int compareTo(Delayed o) {
            if (o == null)
                return 1;
            if (o == this)
                return 0;
            long diff = getDelay(TimeUnit.NANOSECONDS) - o.getDelay(TimeUnit.NANOSECONDS);
            return diff > 0 ? 1 : diff == 0 ? 0 : -1;
        }

        @Override
        public String toString() {
            return "DelayedItem{" +
                    "element=" + element +
                    '}';
        }

        public T getElement() {
            return element;
        }

        public void setElement(T element) {
            this.element = element;
        }

        public int getDelaySeconds() {
            return delaySeconds;
        }

        

    }

    public static void main(String[] args) throws InterruptedException {
        DelayQueue<DelayedItem<Integer>> delayQueue = new DelayQueue<>();
        delayQueue.offer(new DelayedItem<>(1, 1));
        delayQueue.offer(new DelayedItem<>(1, 3));
        delayQueue.offer(new DelayedItem<>(1, 5));
        delayQueue.offer(new DelayedItem<>(1, 7));
        long s1 = System.currentTimeMillis();
        while (true) {
            DelayedItem<Integer> item = delayQueue.take();
            long s2 = System.currentTimeMillis();
            System.out.println("to begin "+(s2 - s1)  + " ms");
            System.out.println(item);
        }
    }
    
    
}

```





# 源码解析

```java
package java.util.concurrent;

public class DelayQueue<E extends Delayed> extends AbstractQueue<E>
    implements BlockingQueue<E> {

    private final transient ReentrantLock lock = new ReentrantLock();
   
    // 以”剩余的阻塞的时间“为优先级，也就是说队首的是最早到达延迟时间点的
    private final PriorityQueue<E> q = new PriorityQueue<E>();

    // 用于等待首部元素的线程
    private Thread leader;

    // 当新元素在队列头部可用或新线程可能需要成为领导者时发出条件信号
    private final Condition available = lock.newCondition();

    public DelayQueue() {}
  
    public boolean offer(E e) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            q.offer(e);
            if (q.peek() == e) {
                leader = null;
                available.signal(); // 新元素在队列头部可用
            }
            return true;
        } finally {
            lock.unlock();
        }
    }



    public E poll() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            E first = q.peek();
            // 如果队列为空，或者所有元素都没有到期，返回 null,返回第一个过期的元素
            return (first == null || first.getDelay(NANOSECONDS) > 0)
                ? null
                : q.poll();
        } finally {
            lock.unlock();
        }
    }


    public E take() throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            for (;;) {
                E first = q.peek();
                if (first == null)
                    available.await();
                else {
                    long delay = first.getDelay(NANOSECONDS);
                    if (delay <= 0L)
                        return q.poll(); // 已经到时间了，可以出队
                    first = null; // don't retain ref while waiting
                  
                    // 第一个元素时间没到，take()方法的所在线程必须阻塞
                  
                    
                    if (leader != null)    // 现在已经有其他线程在等待了
                        available.await(); // 于是这个它自己无限等待，等待其他线程唤醒它，见 #1 处
                    else { // #2
                        Thread thisThread = Thread.currentThread();
                        leader = thisThread;
                        try {
                            available.awaitNanos(delay);  // 等待delay时间段
                        } finally {
                            if (leader == thisThread)
                                leader = null;
                        }
                    }
                }
            }
        } finally {
            if (leader == null && q.peek() != null) // 队列有元素，且没有leader，发出信号（leade r线程自己处理等待，获取元素，见 #2 处的代码段）
                available.signal(); // #1
            lock.unlock();
        }
    }



    // 不管有没有到时间，都返回第一个元素
    public E peek() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            return q.peek();
        } finally {
            lock.unlock();
        }
    }

    // 返回所有元素的数量
    public int size() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            return q.size();
        } finally {
            lock.unlock();
        }
    }
  
}

```
