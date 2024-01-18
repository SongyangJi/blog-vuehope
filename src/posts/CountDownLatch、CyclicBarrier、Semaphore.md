---
title: CountDownLatch、CyclicBarrier、Semaphore
date: 2022-09-26 03:53:22
categories: JUC
tags:
---



# CountDownLatch

**发令枪**（通知后，一组线程才开始工作）

```java
import java.util.concurrent.*;

public class Main {

    public static void main(String[] args) throws Exception {
        CountDownLatch cdl = new CountDownLatch(1);
        for (int i = 0; i < 3; i++) {
            int x = i;
            new Thread(() -> {
                try {
                    cdl.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("end " + x);
            }).start();
        }
        Thread.sleep(3000);
        cdl.countDown();
    }
}
```



**屏障**（一组线程完成后，主线程工作）

```java
import java.util.concurrent.*;

public class Main {

    public static void main(String[] args) throws Exception {
        int N = 5;
        CountDownLatch cdl = new CountDownLatch(N);
        for (int i = 0; i < N; i++) {
            int x = i;
            new Thread(() -> {
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("end " + x);
                cdl.countDown();
            }).start();
        }
        cdl.await();
        System.out.println("end main");
    }
}
```





# CyclicBarrier

```java

```





# 总结

CountDownLatch: 一个线程(或者多个)， 等待另外N个线程完成某个事情之后才能执行。

CyclicBarrier: N个线程相互等待，任何一个线程完成之前，所有的线程都必须等待。

这样应该就清楚一点了，对于CountDownLatch来说，重点是那个“一个线程”, 是它在等待， 而另外那N的线程在把“某个事情”做完之后可以继续等待，可以终止。而对于CyclicBarrier来说，重点是那N个线程，他们之间任何一个没有完成，所有的线程都必须等待。

[CycliBarriar和CountdownLatch有什么区别](https://cloud.tencent.com/developer/article/1648906)

