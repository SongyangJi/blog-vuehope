---
title: JDK的BlockingQueue
date: 2021-12-15 00:07:32
categories: JUC
tags:
  - JUC
  - 并发集合类
---



## BlockingQueue



`BlockingQueue`接口，作为阻塞队列的接口规范，有多种实现类。

`BlockingQueue`有四种形式，处理不能立即满足但可能在未来某个时候满足的操作。

四种方式各不相同：一个抛出异常，第二个返回一个特殊值（ `null`或`false` ，取决于操作），第三个无限期地阻塞当前线程，直到操作成功，第四个阻塞仅给定的最大时间限制，然后放弃。 这些方法总结在下表中：



| 方法/特点 | Throws exception | Special value | Blocks         | Time out             |
| --------- | ---------------- | ------------- | -------------- | -------------------- |
| Insert    | add(e)           | offer(e)      | put(e)         | offer(e, time, unit) |
| Remove    | remove()         | poll()        | take()         | poll(time, unit)     |
| Examine   | element          | peek          | not applicable | not applicable       |





## LinkedBlockingQueue



> **基于链表的(有界的)阻塞队列**。
>
> 该队列对元素 FIFO（先进先出）进行排序。 
>
> 队列的头部是在队列中停留时间最长的那个元素。 队列的尾部是在队列中停留时间最短的那个元素。 新元素插入队列尾部，队列检索操作获取队列头部元素。 
>
> **链表实现的阻塞度列通常比基于数组的阻塞队列具有更高的吞吐量**, 但是没有提供公平访问策略，在大多数并发应用程序中性能的可预测较差。
> 可选的指定容量构造函数参数是一种防止队列过度扩展的方法。
>
> 如果未指定，容量等于Integer.MAX_VALUE 。链接节点在每次插入时动态创建，除非这会使队列超出容量。
> **不允许null元素**。



实现原理

**两把锁，两个条件变量**

```java
/** Lock held by take, poll, etc */
    // 节点出队操作所需要获取的锁
    private final ReentrantLock takeLock = new ReentrantLock();

    /** Wait queue for waiting takes */
    // 队列不空的条件通知（不空，说明可以出队）
    private final Condition notEmpty = takeLock.newCondition();

    /** Lock held by put, offer, etc */
    // 节点入队操作所需要获取的锁
    private final ReentrantLock putLock = new ReentrantLock();

    /** Wait queue for waiting puts */
    // 队列不满的条件通知（不满，说明可以入队）
    private final Condition notFull = putLock.newCondition();
```





```java
package java.util.concurrent;


public class LinkedBlockingQueue<E> extends AbstractQueue<E>
        implements BlockingQueue<E>, java.io.Serializable {
    private static final long serialVersionUID = -6903933977591709194L;


    static class Node<E> {
        E item;
        Node<E> next;

        Node(E x) { item = x; }
    }
    
    // 队列限制，如果没有指定为 Integer.MAX_VALUE
    private final int capacity;

    // 当前元素数
    private final AtomicInteger count = new AtomicInteger(); // 如果不是的，自增、自减都是线程不安全的

    /**
     * 哨兵头
     * 不变量: head.item == null
     */
    transient Node<E> head;

    /**
     * 哨兵尾
     * 不变量: last.item == null
     */
    private transient Node<E> last;
  
  	// 也就是说empty的queue也至少有1个哨兵（初始时，head == last ）
  

    /** Lock held by take, poll, etc */
    // 节点出队操作所需要获取的锁
    private final ReentrantLock takeLock = new ReentrantLock();

    /** Wait queue for waiting takes */
    // 队列不空的条件通知（不空，说明可以出队）
    private final Condition notEmpty = takeLock.newCondition();

    /** Lock held by put, offer, etc */
    // 节点入队操作所需要获取的锁
    private final ReentrantLock putLock = new ReentrantLock();

    /** Wait queue for waiting puts */
    // 队列不满的条件通知（不满，说明可以入队）
    private final Condition notFull = putLock.newCondition();

    // 通知那些因为队列已空而等待的节点出队线程
    private void signalNotEmpty() {
        final ReentrantLock takeLock = this.takeLock;
        takeLock.lock();
        try {
            notEmpty.signal(); // 注意不是 signalAll(), 只通知一个线程, 下面也是一样
         } finally {
            takeLock.unlock();
        }
    }

     // 通知那些因为队列已满而等待的节点入队线程
    private void signalNotFull() {
        final ReentrantLock putLock = this.putLock;
        putLock.lock();
        try {
            notFull.signal(); 
        } finally {
            putLock.unlock();
        }
    }

    // 入队
    private void enqueue(Node<E> node) {
        // assert putLock.isHeldByCurrentThread(); 断言当前线程拿到 putLock
        // assert last.next == null; 断言last确实是zu'h
        last = last.next = node;
    }

    // 
    private E dequeue() {
        // assert takeLock.isHeldByCurrentThread(); 断言当前线程拿到 takeLock
        Node<E> h = head;
        Node<E> first = h.next;
        h.next = h; // help GC
        head = first;
        E x = first.item;
        first.item = null;
        return x;
    }

    // 两把锁都加锁
    void fullyLock() {
        putLock.lock();
        takeLock.lock();
    }

    // 两把锁都解锁
    void fullyUnlock() {
        takeLock.unlock();
        putLock.unlock();
    }

    public LinkedBlockingQueue() {
        this(Integer.MAX_VALUE);
    }

    public LinkedBlockingQueue(int capacity) {
        if (capacity <= 0) throw new IllegalArgumentException();
        this.capacity = capacity;
        last = head = new Node<E>(null); // 一个就ok
    }

    public int size() {
        return count.get();
    }

    // 剩余可用容量
    public int remainingCapacity() {
        return capacity - count.get();
    }

    // 如果空间不够用吗，一直阻塞
    public void put(E e) throws InterruptedException {
        if (e == null) throw new NullPointerException();
        // Note: convention in all put/take/etc is to preset local var
        // holding count negative to indicate failure unless set.
        int c = -1;
        Node<E> node = new Node<E>(e);
        final ReentrantLock putLock = this.putLock;
        final AtomicInteger count = this.count;
        putLock.lockInterruptibly(); // 可中断的加锁
        try {
            while (count.get() == capacity) { // 注意是 while
                notFull.await(); // 等待过程中，也可能被 interrupt
            }
            enqueue(node);
            c = count.getAndIncrement(); // 先get后incr，也就是说先拿到队列此时的容量 c
            if (c + 1 < capacity) // c + 1 < capacity 队列一定不满，因为此时 putLock 被自己占有，如果有其他 take 线程，队列已用空间只会更小
                notFull.signal();  // 通知其他put线程工作（注意只通知一个）
            /**
             * 为什么，put 线程还需要通知其他 put 线程呢？
             * 从信号量的角度讲，只需要 take 线程去通知即可。
             * 这就是作者所说的级联通知，而且每次都通知一个，避免大量线程同时被唤醒去争抢锁，
             * 并且避免了不必要的（加锁--通知--解锁）方法调用。
             */
        } finally {
            putLock.unlock();
        }
        if (c == 0) // 如果已有其他 take 线程在等待，现在通知它们工作
            signalNotEmpty();
        /**
         * 为什么是 == 而不是 >= ?
         * 实际上，直接去掉这个 if 判断，直接调用 signalNotEmpty() 也是正确的。
         * 但是这会导致每次put调用后都用调用signalNotEmpty（这一步会加锁在解锁），增大太大开销。
         * 所以，相当于只在队列为 empty 时入队元素，put 线程才会通知 take 线程，并且也只通知一个。 
         */
    }

    // 指定等待时间，其余代码与上面一致，只是在等待固定时间后会 return false 
    public boolean offer(E e, long timeout, TimeUnit unit)
        throws InterruptedException {

        if (e == null) throw new NullPointerException();
        long nanos = unit.toNanos(timeout);
        int c = -1;
        final ReentrantLock putLock = this.putLock;
        final AtomicInteger count = this.count;
        putLock.lockInterruptibly();
        try {
            while (count.get() == capacity) {
                if (nanos <= 0)
                    return false;
                nanos = notFull.awaitNanos(nanos); // awaitNanos(nanos) 会返回需要等待的剩余时间，<= 0 表明等待结束了  
            }
            enqueue(new Node<E>(e));
            c = count.getAndIncrement();
            if (c + 1 < capacity)
                notFull.signal();
        } finally {
            putLock.unlock();
        }
        if (c == 0)
            signalNotEmpty();
        return true;
    }

    // 不阻塞
    public boolean offer(E e) {
        if (e == null) throw new NullPointerException();
        final AtomicInteger count = this.count;
        // 如果容量已满，直接返回即可
        if (count.get() == capacity)
            return false;
      
        int c = -1;
        Node<E> node = new Node<E>(e);
        final ReentrantLock putLock = this.putLock;
        putLock.lock();
        try {
            if (count.get() < capacity) {
                enqueue(node);
                c = count.getAndIncrement();
                if (c + 1 < capacity)
                    notFull.signal();
            }
        } finally {
            putLock.unlock();
        }
        if (c == 0)
            signalNotEmpty();
        return c >= 0;
    }

    public E take() throws InterruptedException {
        E x;
        int c = -1;
        final AtomicInteger count = this.count;
        final ReentrantLock takeLock = this.takeLock;
        takeLock.lockInterruptibly();
        try {
            while (count.get() == 0) {
                notEmpty.await();
            }
            x = dequeue();
            c = count.getAndDecrement();
            if (c > 1) // 级联通知
                notEmpty.signal();
        } finally {
            takeLock.unlock();
        }
        if (c == capacity)
            signalNotFull();
        /**
         * 与上面的逻辑类似，只在队列仅剩余一个可用位置的时候，才去通知 put 线程，并且只通知一个
         */
        return x;
    }

		// 下面的逻辑类似，不再赘述
    public E poll(long timeout, TimeUnit unit) throws InterruptedException {
        E x = null;
        int c = -1;
        long nanos = unit.toNanos(timeout);
        final AtomicInteger count = this.count;
        final ReentrantLock takeLock = this.takeLock;
        takeLock.lockInterruptibly();
        try {
            while (count.get() == 0) {
                if (nanos <= 0)
                    return null;
                nanos = notEmpty.awaitNanos(nanos);
            }
            x = dequeue();
            c = count.getAndDecrement();
            if (c > 1)
                notEmpty.signal();
        } finally {
            takeLock.unlock();
        }
        if (c == capacity)
            signalNotFull();
        return x;
    }

    public E poll() {
        final AtomicInteger count = this.count;
        if (count.get() == 0)
            return null;
        E x = null;
        int c = -1;
        final ReentrantLock takeLock = this.takeLock;
        takeLock.lock();
        try {
            if (count.get() > 0) {
                x = dequeue();
                c = count.getAndDecrement();
                if (c > 1)
                    notEmpty.signal();
            }
        } finally {
            takeLock.unlock();
        }
        if (c == capacity)
            signalNotFull();
        return x;
    }
    
    // 加 take 锁检测
    public E peek() {
        if (count.get() == 0)
            return null;
        final ReentrantLock takeLock = this.takeLock;
        takeLock.lock();
        try {
            Node<E> first = head.next;
            if (first == null)
                return null;
            else
                return first.item;
        } finally {
            takeLock.unlock();
        }
    }


    // contains调用时，直接不允许 put、take
    public boolean contains(Object o) {
        if (o == null) return false;
        fullyLock();
        try {
            for (Node<E> p = head.next; p != null; p = p.next)
                if (o.equals(p.item))
                    return true;
            return false;
        } finally {
            fullyUnlock();
        }
    }
}
```



迭代器:

```java
    // 返回弱一致性的迭代器
    public Iterator<E> iterator() {
        return new Itr();
    }

    private class Itr implements Iterator<E> {
   
        private Node<E> current;
        private Node<E> lastRet;
        // 缓存住，即使后来这个节点出队了，只要 hasNext() 返回 true, 也一定可以正常返回，
        // 也正因此，它是弱一致性的。
        private E currentElement;

        Itr() {
            fullyLock();
            try {
                current = head.next;
                if (current != null)
                    currentElement = current.item;
            } finally {
                fullyUnlock();
            }
        }

        public boolean hasNext() {
            return current != null;
        }

        
        private Node<E> nextNode(Node<E> p) {
            for (;;) {
                Node<E> s = p.next;
                if (s == p)  // 标志着这个节点已经被出队了。
                    return head.next;
                if (s == null || s.item != null)
                    return s;
                p = s;
            }
        }
      
        /**
         * next、remove之前，都会争抢两把锁，同时锁住。
         * 也就是说，使用迭代器遍历链表的时候
         */
        public E next() {
            fullyLock();
            try {
                if (current == null)
                    throw new NoSuchElementException();
                E x = currentElement;
                lastRet = current;
                current = nextNode(current);
                currentElement = (current == null) ? null : current.item;
                return x;
            } finally {
                fullyUnlock();
            }
        }

        public void remove() {
            if (lastRet == null)
                throw new IllegalStateException();
            fullyLock();
            try {
                Node<E> node = lastRet;
                lastRet = null;
                for (Node<E> trail = head, p = trail.next;
                     p != null;
                     trail = p, p = p.next) {
                    if (p == node) {
                        unlink(p, trail);
                        break;
                    }
                }
            } finally {
                fullyUnlock();
            }
        }
    }
```



## ArrayBlockingQueue

>**由数组支持的有界阻塞队列**。
>
>这是一个经典的“有界缓冲区”，其中一个固定大小的数组保存由生产者插入并由消费者提取的元素。 
>容量一旦创建，就无法更改。 
>
>尝试put元素放入已满队列将导致操作阻塞； 尝试从空队列中take元素也会类似地阻塞。
>
>**此类支持用于排序等待生产者和消费者线程的可选公平策略**。 
>
>默认情况下，不保证此顺序。 但是，在公平性设置为true时构造的队列以 FIFO 顺序授予线程访问权限。
>
>**公平通常会降低吞吐量，但会减少可变性并避免饥饿**。





实现原理

**一把锁，两个条件变量**

```java
/**
 * 这里只使用了一把锁，也就是说，put/take 线程会互相竞争。
 * 吞吐量自然也没有 LinkedBlockingQueue 大，但是提供了公平性策略。
 */ 
final ReentrantLock lock;

private final Condition notEmpty;

private final Condition notFull;
```



```java
package java.util.concurrent;

public class ArrayBlockingQueue<E> extends AbstractQueue<E>
        implements BlockingQueue<E>, java.io.Serializable {

    private static final long serialVersionUID = -817911632652898426L;

    /** The queued items */
    final Object[] items;

   
    /**
     * 在此实现中，数组允许被填充满，而不是最多为 length - 1
     */ 
  
    /** items index for next take, poll, peek or remove */
    // 下一个要取元素的位置，实际上也就是队列的第一个元素
    int takeIndex;

    /** items index for next put, offer, or add */
    // 下一个要放置元素的位置，实际上也就是队列的最后一个元素的下一个位置。
    int putIndex;

    /** Number of elements in the queue */
    // 元素个数
    int count; // 注意不是 atomic的
	
  	
    /**
     * 这里只使用了一把锁，也就是说，put/take 线程会互相竞争。
     * 吞吐量自然也没有 LinkedBlockingQueue 大，但是提供了公平性策略。
     */ 
    final ReentrantLock lock;

    private final Condition notEmpty;

    private final Condition notFull;
  

   
    /**
     * 循环减 1
     */
    final int dec(int i) {
        return ((i == 0) ? items.length : i) - 1;
    }

    private void enqueue(E x) {
        // assert lock.getHoldCount() == 1;
        // assert items[putIndex] == null;
        final Object[] items = this.items;
        items[putIndex] = x;
        if (++putIndex == items.length)
            putIndex = 0;
        count++;
        notEmpty.signal(); // 入队，通知非空
    }

    private E dequeue() {
        // assert lock.getHoldCount() == 1;
        // assert items[takeIndex] != null;
        final Object[] items = this.items;
        @SuppressWarnings("unchecked")
        E x = (E) items[takeIndex];
        items[takeIndex] = null;
        if (++takeIndex == items.length)
            takeIndex = 0;
        count--;
        if (itrs != null)
            itrs.elementDequeued();
        notFull.signal(); // 出队，通知非满
        return x;
    }



    // 由于底层是固定大小的数组，所以必须指定初始容量，默认是非公平的
    public ArrayBlockingQueue(int capacity) {
        this(capacity, false);
    }

   
    public ArrayBlockingQueue(int capacity, boolean fair) {
        if (capacity <= 0)
            throw new IllegalArgumentException();
        this.items = new Object[capacity];
        lock = new ReentrantLock(fair);
        notEmpty = lock.newCondition();
        notFull =  lock.newCondition();
    }

   
    
    public void put(E e) throws InterruptedException {
        checkNotNull(e);
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == items.length)
                notFull.await();
            enqueue(e);
        } finally {
            lock.unlock();
        }
    }
  
    public E take() throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == 0)
                notEmpty.await();
            return dequeue();
        } finally {
            lock.unlock();
        }
    }

    // size 方法也会加锁
    public int size() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
  
}
```
