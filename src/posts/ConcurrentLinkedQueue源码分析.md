---
title: ConcurrentLinkedQueue源码分析
date: 2021-12-15 00:24:43
categories: JUC
tags:
  - JUC
  - 并发集合类
---





`ConcurrentLinkedQueue`，**基于链表的无界的线程安全队列**。



 当许多线程将共享对公共集合的访问时， ConcurrentLinkedQueue是合适的选择。 **像大多数其他并发集合实现一样，此类不允许使用null元素**。



此实现采用了一种高效的非阻塞算法，该算法基于 Maged M. Michael 和 Michael L. Scott 在《Simple、Fast、Practical Non-Blocking and Blocking Concurrent Queue Algorithms》 中描述的算法 。



**迭代器是弱一致性的，返回元素反映了在迭代器创建时或之后的某个时刻的队列状态**。 

它们不会抛出 `java.util.ConcurrentModificationException` ，并且可能与其他操作同时进行。

自迭代器创建以来队列中包含的元素将只返回一次。

某个迭代器创建之后，使用它遍历队列元素时，队列中的某个元素正好返回一次。



请注意，与大多数集合不同， size方法不是时间复杂度为O(1)的操作。

 由于这些队列的异步性质，确定当前元素数量需要遍历元素（所以它的时间复杂度是O(n) ，需要我们注意），因此如果在遍历期间修改此集合，则可能会报告不准确的结果。



此外，批量操作addAll 、 removeAll 、 retainAll 、 containsAll 、 equals和toArray不能保证以原子方式执行。 

内存一致性影响：与其他并发集合一样，在一个线程中将对象放入ConcurrentLinkedQueue中的操作发生在另一个线程中从ConcurrentLinkedQueue访问或删除该元素之后的操作之前。





请注意，与此包中的大多数非阻塞算法一样，此实现依赖于以下事实：
在垃圾中收集到的系统中，不存在ABA问题的可能性。
要回收节点，则无需使用“计数指针”或其他相关技术。


基本的循环不变量:
- 有且仅有一个节点的后即指针为null，就是队列的最后一个节点
-   CAS一个节点的引用和null引用，可以原子性地将它从队列中移除。
- 从head节点出发遍历所有元素的可达性必须保持，即使在并发修改的情况下。 
- 一个已经出队的节点仍然可能处于可使用状态，比如在发生**创建一个迭代器**或者**使用poll**(不过它暂时失去了cpu时间片)的情况时。



一个优化，每当当前指针距离头/尾指针两步远时候，都会去更新 head / tail。



因为头尾节点都是并发并且独立地更新的，所以完全由可能一方落后于另一方更新。

头部和尾部都有可能滞后，



迭代器会跳过元素为null的节点。



当创造一个节点（入队操作前）的时候，为了避免 volatile 写的开销，

使用了 Unsafe.putObject 代替了普通写，是的排队的开销降为约1.5倍的CAS。



头部和尾部节点有可能引用，也有可能不引用一个有着非空项的节点。

如果队列是空的，那么所有元素必然都是空的。

创建节点时，头尾节点引用一个有着空元素的哑结点。

它们都使用CAS进行更新，所以永不倒回。





注：为了节省篇幅，略去部分方法以及注释。

```java
package java.util.concurrent;


public class ConcurrentLinkedQueue<E> extends AbstractQueue<E>
        implements Queue<E>, java.io.Serializable {
    private static final long serialVersionUID = 196745693267521676L;

    

    private static class Node<E> {
        volatile E item;
        volatile Node<E> next;

        /**
         * Constructs a new node.  Uses relaxed write because item can
         * only be seen after publication via casNext.
         * 创建一个节点，使用unsafe的方式，不过在使用 casNext 后才能真正遍历到它。
         */
        Node(E item) {
            UNSAFE.putObject(this, itemOffset, item);
        }

        boolean casItem(E cmp, E val) {
            return UNSAFE.compareAndSwapObject(this, itemOffset, cmp, val);
        }

      	//  t.lazySetNext(newNode) <==> t.next = newNode
        void lazySetNext(Node<E> val) {
            UNSAFE.putOrderedObject(this, nextOffset, val); 
        }

        boolean casNext(Node<E> cmp, Node<E> val) {
            return UNSAFE.compareAndSwapObject(this, nextOffset, cmp, val);
        }

        // Unsafe mechanics

        private static final sun.misc.Unsafe UNSAFE;
        private static final long itemOffset;
        private static final long nextOffset;

        static {
            try {
                UNSAFE = sun.misc.Unsafe.getUnsafe();
                Class<?> k = Node.class;
                itemOffset = UNSAFE.objectFieldOffset
                    (k.getDeclaredField("item"));
                nextOffset = UNSAFE.objectFieldOffset
                    (k.getDeclaredField("next"));
            } catch (Exception e) {
                throw new Error(e);
            }
        }
    }

  
    /**
     * 不变量:
     * - 所有存活节点都可以通过 head 节点到达，通过后继指针 
     * - head != null
     * - (tmp = head).next != tmp || tmp != head  ???
     * 非不变量:
     * - head.item 可能为null，也有可能不为null,
		 * - 允许 tail 到 head的滞后，也就是可能无法从 head 到达 tail.
     * 
     */
    private transient volatile Node<E> head;

   /**
     * 不变量:
     * - the last node 总是可以通过 tail 节点到达，通过后继指针 （the last node 是唯一的其next值为 null 的 node）
     * - tail != null
     * 非不变量:
     * - tail.item 可能为null，也有可能不为null,
		 * - 允许 tail 到 head的滞后，也就是可能无法从 head 到达 tail.
     * - tail.next 可能也可能不”自我指向“ tail.
     */
    private transient volatile Node<E> tail;

    // 空队列，head、tail 指向同一哑结点
    public ConcurrentLinkedQueue() {
        head = tail = new Node<E>(null);
    }


    public ConcurrentLinkedQueue(Collection<? extends E> c) {
        Node<E> h = null, t = null;
        for (E e : c) {
            checkNotNull(e); // 注意 ConcurrentLinkedQueue 不允许null元素
            Node<E> newNode = new Node<E>(e);
            if (h == null) // 遇到第一个元素
                h = t = newNode; 
            else {
                t.lazySetNext(newNode); // 相当于 t.next = newNode, 不过避免了 volatile 写
                t = newNode;
            }
        }
        if (h == null) // c 为 empty，同上
            h = t = new Node<E>(null);
        head = h;
        tail = t;
    }
 
    /**
     * Tries to CAS head to p. If successful, repoint old head to itself
     * as sentinel for succ(), below.
     * 
     * CAS替换掉旧 head （h）为 新 head（p）
     * 如果替换成功，旧 head的next指针指向自己，成为哨兵
     */
    final void updateHead(Node<E> h, Node<E> p) {
        if (h != p && casHead(h, p))
            h.lazySetNext(h); // 使旧head的后继为head自己，起哨兵作用
    }

    /**
     * Returns the successor of p, or the head node if p.next has been
     * linked to self, which will only be true if traversing with a
     * stale pointer that is now off the list.
     * 
     * 获取 p 的后继，不过如果 p.next == p 的话，说明 p 已经出队了
     *（p.next == p 就是我们设置的标志，见h.lazySetNext(h)，
     * 因为正常情况下不会出现这种情况 —— 正常情况下 p.next == p 说明链表成环） 
     * 此时返回链表新的 head，表示从新头出发
     */
    final Node<E> succ(Node<E> p) {
        Node<E> next = p.next;
        return (p == next) ? head : next;
    }

    /**
     * Inserts the specified element at the tail of this queue.
     * As the queue is unbounded, this method will never return {@code false}.
     *
     * @return {@code true} (as specified by {@link Queue#offer})
     * @throws NullPointerException if the specified element is null
     */
    public boolean offer(E e) {
        checkNotNull(e);
        final Node<E> newNode = new Node<E>(e);

      	// 无界队列，一定可以插入队尾成功。所以，如果失败，一直重试下去
        for (Node<E> t = tail, p = t;;) {
            Node<E> q = p.next;
            if (q == null) {
                // p is last node
                if (p.casNext(null, newNode)) {
                    if (p != t) // p == t的时候不更新（防止每一次入队操作都去更新tail，间隔一次）
                        casTail(t, newNode);  // 失败也ok
                    return true;
                }
                // CAS竞争失败，下次再读，再去尝试
            }
            else if (p == q) // 只有一种情况出现 p == q, 就是 p 这个节点作为旧 head 从队列中被剔除出去，用 p.next = p 标识
              
                // We have fallen off list.  If tail is unchanged, it
                // will also be off-list, in which case we need to
                // jump to head, from which all live nodes are always
                // reachable.  Else the new tail is a better bet.
              	// -------- 以上为源码注释 ---------
                p = (t != (t = tail)) ? t : head; 
                // 首先，跳到 head 处肯定是正确的，无非可能要多做几次循环找到尾节点罢了。
                // 其次，如果 tail 发生了变化，说明有其他线程入队了节点，并且成功修改了 tail，这个时候没必要从 head 出发,
                // 新的 tail 是更好的选择。
          		  // 
                // 需要特别指明的是，如果 p 都已经出队了，那么 t 肯定也出队了（因为 p 是从 t 出发的嘛）
                // 如果说此时 tail 还没有发生变化，说明此时 tail 已经跑到了 head的前面（这是完全可能发生的）
                // 这时就必须跳到head了重新出发了。
            else
                // 寻找真正的”尾节点“
                p = (p != t && t != (t = tail)) ? t : q; 
                /* 
                 * 这个三元表达式，做了很多事，有判断，有赋值。
                 * 如果，改写成下面这样，行不行呢？
                 * t = tail; p = q;
                 * 我觉得也是没问题的，因为这是个LIFO的队列，p 不是 the last node，顺着往下找就是了.
                 * 不过作者认为，如果经过一次循环后（也就是 p 跳过一个节点之后,此时 p != t，如果又 tail发生了变化，
                 * 直接跳到新的 tail 处继续寻找更好）
                 */
        }
    }

    /**
     * 
     * 这段逻辑和上面的offer（入队）差不多：
     * 1. 找到链表的真正的头结点（从 head 出发，找到第一个 item 不为null的节点）
     * 2. 将头结点出队（cas将item域置null）
     * 3. 更新 head （cas更新head，旧head标记为"哨兵“）
     *
     */
    public E poll() {
        restartFromHead:
        for (;;) {
            for (Node<E> h = head, p = h, q;;) {
                E item = p.item;
              
                // item 不为 null，说明 p 就是链表的头结点了
                if (item != null && p.casItem(item, null)) {
                    if (p != h) // 和跟新tail一样，不要每次出队一个节点，就更新一下 head（宁可多循环几次去找到真正的头结点）
                        updateHead(h, ((q = p.next) != null) ? q : p);
                    return item;
                }
                else if ((q = p.next) == null) { // p的item为null，p 又没有next节点，说明队列此时已经为empty了，返回null即可
                    updateHead(h, p); // 更新 head 
                    return null;
                }
                else if (p == q)
                    // 和上面的一样，如果有其他 thread 也在 poll 节点的话，那么 p 引用的节点可能已经出队，标记为哨兵（哨兵的next指针指向自己）
                    // 这个时候需要从新的 head 出发寻找
                    continue restartFromHead;
                else
                    p = q; // 往后移动，继续找
            }
        }
    }

    /**
     * 和上面的逻辑基本一致
     */
    public E peek() {
        restartFromHead:
        for (;;) {
            for (Node<E> h = head, p = h, q;;) {
                E item = p.item;
                if (item != null || (q = p.next) == null) {
                    updateHead(h, p); // updateHead 自身也做了一次 h 是否等于 p 的判断的
                    return item;
                }
                else if (p == q)
                    continue restartFromHead;
                else
                    p = q;
            }
        }
    }


    // 返回列表中的第一个活动（未删除）节点，如果没有，则返回 null。
    // 这是 poll/peek 的另一种变体； 这里返回第一个节点，而不是元素。 
    // 作为类内的方法使用，不公开
    Node<E> first() {
        restartFromHead:
        for (;;) {
            for (Node<E> h = head, p = h, q;;) {
                boolean hasItem = (p.item != null);
                if (hasItem || (q = p.next) == null) {
                    updateHead(h, p);
                    return hasItem ? p : null;
                }
                else if (p == q)
                    continue restartFromHead;
                else
                    p = q;
            }
        }
    }

    // 不是通过 size == 0 来判断的
    // 时间复杂度: O(1)
    public boolean isEmpty() {
        return first() == null;
    }

    
    // 需要遍历整个链表，因为没有成员属性记录元素个数
    // 时间复杂度: O(n), 谨慎使用
    public int size() {
        int count = 0;
        for (Node<E> p = first(); p != null; p = succ(p)) // 注意是 succ(p) 而不是简单的 p.next
            if (p.item != null)
                if (++count == Integer.MAX_VALUE)
                    break;
        return count;
    }


    public boolean remove(Object o) {
        if (o != null) {
            Node<E> next, pred = null;
            for (Node<E> p = first(); p != null; pred = p, p = next) {
                boolean removed = false;
                E item = p.item;
                if (item != null) {
                    if (!o.equals(item)) {
                        next = succ(p);
                        continue;
                    }
                    removed = p.casItem(item, null);
                }

                next = succ(p);
                if (pred != null && next != null) // unlink
                    pred.casNext(p, next); // cas 失败也 ok
                if (removed)
                    return true;
            }
        }
        return false;
    }


    
    private static void checkNotNull(Object v) {
        if (v == null)
            throw new NullPointerException();
    }
  
  
    /**
     * UNSAFE 的 cas 
     */
    private boolean casTail(Node<E> cmp, Node<E> val) {
        return UNSAFE.compareAndSwapObject(this, tailOffset, cmp, val);
    }

    private boolean casHead(Node<E> cmp, Node<E> val) {
        return UNSAFE.compareAndSwapObject(this, headOffset, cmp, val);
    }

    // Unsafe mechanics

    private static final sun.misc.Unsafe UNSAFE;
    private static final long headOffset;
    private static final long tailOffset;
    static {
        try {
            UNSAFE = sun.misc.Unsafe.getUnsafe();
            Class<?> k = ConcurrentLinkedQueue.class;
            headOffset = UNSAFE.objectFieldOffset
                (k.getDeclaredField("head"));
            tailOffset = UNSAFE.objectFieldOffset
                (k.getDeclaredField("tail"));
        } catch (Exception e) {
            throw new Error(e);
        }
    }
}
```

