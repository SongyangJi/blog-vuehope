---
title: CopyOnWriteArrayList和CopyOnWriteArraySet
date: 2021-12-15 00:34:34
categories: JUC
tags:
  - JUC
  - 并发集合类
---





# ArrayList的线程不安全性

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Vector;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.TimeUnit;

public class Test{

    public static void main(String[] args) throws InterruptedException {
//        List<Integer> list = new ArrayList<>();
        List<Integer> list = new CopyOnWriteArrayList<>();

        list.add(0);

        Thread thread1 = new Thread(() -> {
           list.set(0,999);
        });

        Thread thread2 = new Thread(() -> {
            // 数据没有更改，一直循环等待下去
            while (list.get(0) == 0) {

            }
            System.out.println("list中的元素被修改为： "+list.get(0));
        });

        thread2.start();
        TimeUnit.SECONDS.sleep(3);
        System.out.println("修改list中的元素");
        thread1.start();
    }

}
```



#  CopyOnWrite

ArrayList的线程安全变体。

**所有可变操作（ add 、 set等）都是通过制作底层数组的新副本来实现的**。

这通常成本太高，但当遍历操作大大超过突变时可能比替代方法更有效，并且当您不能或不想同步遍历时很有用，但需要排除并发线程之间的干扰。



 “快照”样式的迭代器方法使用对创建迭代器时数组状态的引用。 

这个数组在迭代器的生命周期内永远不会改变，所以线程之间的干扰不会发生，并且迭代器保证不会抛出`ConcurrentModificationException` 。

 自创建迭代器以来，迭代器不会反映对列表的添加、删除或更改。 

不支持迭代器本身的元素更改操作（ remove 、 set和add ）， 这些方法会抛`UnsupportedOperationException `。

允许 null 元素。



> RCU(Read-Copy Update)，是Linux 中比较重要的一种同步机制。 顾名思义就是“读，拷贝更新”，再直白点是“随意读，但更新数据的时候，需要先复制一份副本，在副本上完成修改，再一次性地替换旧数据”。 这是Linux 内核实现的一种针对“读多写少”的共享数据的同步机制。



## 关于set方法的几点疑问




## 源码解析
```java
package java.util.concurrent;

public class CopyOnWriteArrayList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable {
    private static final long serialVersionUID = 8673264195747942595L;

    /** The lock protecting all mutators */
    final transient ReentrantLock lock = new ReentrantLock();

    /** The array, accessed only via getArray/setArray. */
    private transient volatile Object[] array;

    
		
    // 读不加任何锁，直接读
    @SuppressWarnings("unchecked")
    private E get(Object[] a, int index) {
        return (E) a[index];
    }

    // 1. 加锁
    // 2. 写时复制 (拷贝原数组, 更改元素)
    // 3. 引用新数组
    public E set(int index, E element) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] elements = getArray();
            E oldValue = get(elements, index);

            if (oldValue != element) {
                int len = elements.length;
                Object[] newElements = Arrays.copyOf(elements, len);
                newElements[index] = element;
                setArray(newElements);
            } else {
                // Not quite a no-op; ensures volatile write semantics
                setArray(elements); // 确保写volatile的写语义
            }
            return oldValue;
        } finally {
            lock.unlock();
        }
    }
  
    // 1. 加锁
    // 2. 写时复制 (拷贝原数组, 添加新元素)
    // 3. 引用新数组
    public boolean add(E e) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] elements = getArray();
            int len = elements.length;
            Object[] newElements = Arrays.copyOf(elements, len + 1);
            newElements[len] = e;
            setArray(newElements);
            return true;
        } finally {
            lock.unlock();
        }
    }

    // 与上面的做法如出一辙
    public void add(int index, E element) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] elements = getArray();
            int len = elements.length;
            if (index > len || index < 0)
                throw new IndexOutOfBoundsException("Index: "+index+
                                                    ", Size: "+len);
            Object[] newElements;
            int numMoved = len - index;
            if (numMoved == 0)
                newElements = Arrays.copyOf(elements, len + 1);
            else {
                newElements = new Object[len + 1];
                System.arraycopy(elements, 0, newElements, 0, index);
                System.arraycopy(elements, index, newElements, index + 1,
                                 numMoved);
            }
            newElements[index] = element;
            setArray(newElements);
        } finally {
            lock.unlock();
        }
    }

    // 和 add 操作是一样的，不过是一个增加元素，一个是删除元素没什么区别
    public E remove(int index) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] elements = getArray();
            int len = elements.length;
            E oldValue = get(elements, index);
            int numMoved = len - index - 1;
            if (numMoved == 0)
                setArray(Arrays.copyOf(elements, len - 1));
            else {
                Object[] newElements = new Object[len - 1];
                System.arraycopy(elements, 0, newElements, 0, index);
                System.arraycopy(elements, index + 1, newElements, index,
                                 numMoved);
                setArray(newElements);
            }
            return oldValue;
        } finally {
            lock.unlock();
        }
    }

    // 不要立即加锁（当然这样并不错，这可能没必要加锁，因为有可能要删除的对象可能压根不在数组里）
    // 所以先拿到快照去检查一下看有没有，没有的话直接返回false，有的话才去删除
    public boolean remove(Object o) {
        Object[] snapshot = getArray(); 
        int index = indexOf(o, snapshot, 0, snapshot.length);
        return (index < 0) ? false : remove(o, snapshot, index);
    }

    private boolean remove(Object o, Object[] snapshot, int index) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] current = getArray();
            int len = current.length;
            // 如果在争抢到锁的时候，数组已经被修改了，也就是说此时 snapshot != current,
            // 还需要再次检查，寻找要删除的index
            if (snapshot != current) findIndex: {
                int prefix = Math.min(index, len);
                for (int i = 0; i < prefix; i++) {
                    if (current[i] != snapshot[i] && eq(o, current[i])) {
                        index = i; // 找到了
                        break findIndex;
                    }
                }
                if (index >= len) // 没找到
                    return false;
                if (current[index] == o)
                    break findIndex;
                index = indexOf(o, current, index, len);
                if (index < 0) // 没找到
                    return false;
            }
            // 如果说快照仍然保持为最新的话，其实和上面的remove(index)的处理逻辑是一样的
            Object[] newElements = new Object[len - 1];
            System.arraycopy(current, 0, newElements, 0, index);
            System.arraycopy(current, index + 1,
                             newElements, index,
                             len - index - 1);
            setArray(newElements);
            return true;
        } finally {
            lock.unlock();
        }
    }

   	// (节省篇幅，代码省略了)
		// clear、sort 和上面也是一样，先加锁，对快照进行修改，最后引用新数组 		
    public void clear() {
    }

    public void sort(Comparator<? super E> c) {
    }

}
```



迭代器


```java
    public Iterator<E> iterator() {
        return new COWIterator<E>(getArray(), 0);
    }


    static final class COWIterator<E> implements ListIterator<E> {
        /** Snapshot of the array */
        // 拿到快照：自创建迭代器以来，迭代器不会反映对列表的添加、删除或更改。 
        private final Object[] snapshot;
        /** Index of element to be returned by subsequent call to next.  */
        private int cursor;
    
        private COWIterator(Object[] elements, int initialCursor) {
            cursor = initialCursor;
            snapshot = elements;
        }
      
    }
```





# Vector

```java
public class Vector<E>
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    
    // 无需 volatile 修饰，因为 synchronized 的内存语义可以做到
    protected Object[] elementData;

    protected int elementCount;

  
    public synchronized boolean isEmpty() {
        return elementCount == 0;
    }

    public synchronized int indexOf(Object o, int index) {
        if (o == null) {
            for (int i = index ; i < elementCount ; i++)
                if (elementData[i]==null)
                    return i;
        } else {
            for (int i = index ; i < elementCount ; i++)
                if (o.equals(elementData[i]))
                    return i;
        }
        return -1;
    }

    public synchronized E get(int index) {
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);

        return elementData(index);
    }
 
    public synchronized E set(int index, E element) {
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);

        E oldValue = elementData(index);
        elementData[index] = element;
        return oldValue;
    }

   
    public synchronized boolean add(E e) {
        modCount++;
        ensureCapacityHelper(elementCount + 1);
        elementData[elementCount++] = e;
        return true;
    }
    
    public synchronized E remove(int index) {
        modCount++;
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);
        E oldValue = elementData(index);

        int numMoved = elementCount - index - 1;
        if (numMoved > 0)
            System.arraycopy(elementData, index+1, elementData, index,
                             numMoved);
        elementData[--elementCount] = null; // Let gc do its work

        return oldValue;
    }

}
```



# SynchronizedList

```java
static class SynchronizedList<E>
    extends SynchronizedCollection<E>
    implements List<E> {
    private static final long serialVersionUID = -7754090372962971524L;

    final List<E> list;

    SynchronizedList(List<E> list) {
        super(list);
        this.list = list;
    }
    
    /**
     * 下面代码中出现的 mutex 都是继承父类 
     * SynchronizedCollection 中的监视器对象 mutex
     */
    SynchronizedList(List<E> list, Object mutex) {
        super(list, mutex);
        this.list = list;
    }

    public boolean equals(Object o) {
        if (this == o)
            return true;
        synchronized (mutex) {return list.equals(o);}
    }
    public int hashCode() {
        synchronized (mutex) {return list.hashCode();}
    }

    public E get(int index) {
        synchronized (mutex) {return list.get(index);}
    }
    public E set(int index, E element) {
        synchronized (mutex) {return list.set(index, element);}
    }
    public void add(int index, E element) {
        synchronized (mutex) {list.add(index, element);}
    }
    public E remove(int index) {
        synchronized (mutex) {return list.remove(index);}
    }

    public int indexOf(Object o) {
        synchronized (mutex) {return list.indexOf(o);}
    }
    public int lastIndexOf(Object o) {
        synchronized (mutex) {return list.lastIndexOf(o);}
    }

    public boolean addAll(int index, Collection<? extends E> c) {
        synchronized (mutex) {return list.addAll(index, c);}
    }

    public ListIterator<E> listIterator() {
        return list.listIterator(); // Must be manually synched by user
    }

    public ListIterator<E> listIterator(int index) {
        return list.listIterator(index); // Must be manually synched by user
    }

    public List<E> subList(int fromIndex, int toIndex) {
        synchronized (mutex) {
            return new SynchronizedList<>(list.subList(fromIndex, toIndex),
                                        mutex);
        }
    }

    @Override
    public void replaceAll(UnaryOperator<E> operator) {
        synchronized (mutex) {list.replaceAll(operator);}
    }
    @Override
    public void sort(Comparator<? super E> c) {
        synchronized (mutex) {list.sort(c);}
    }

}
```





# CopyOnWriteArraySet

使用内部CopyOnWriteArrayList进行所有操作的Set 。 因此，它具有相同的基本属性：
它最适合集合大小通常保持较小、只读操作的数量远远超过可变操作的应用程序，并且您需要在遍历过程中防止线程之间的干扰。
它是线程安全的。
可变操作（ add 、 set 、 remove等）的开销很大，因为它们通常需要复制整个底层数组。
迭代器不支持可变remove操作。
通过迭代器遍历速度快，不会遇到来自其他线程的干扰。

迭代器依赖于构建迭代器时数组的不变快照。



```java
public class CopyOnWriteArraySet<E> extends AbstractSet<E>
        implements java.io.Serializable {
    private static final long serialVersionUID = 5457747651344034263L;

    // 以此为基本实现容器
    private final CopyOnWriteArrayList<E> al;

    public CopyOnWriteArraySet() {
        al = new CopyOnWriteArrayList<E>();
    }


   
    public int size() {
        return al.size();
    }

   
    public boolean isEmpty() {
        return al.isEmpty();
    }

    // 注意这个时间复杂度是O(n)的
    public boolean contains(Object o) {
        return al.contains(o);
    }

		// 注意这个时间复杂度是O(n)的
    public boolean remove(Object o) {
        return al.remove(o);
    }

		// 注意这个时间复杂度是O(n)的
    public boolean add(E e) {
        return al.addIfAbsent(e);
    }
 
}
```
