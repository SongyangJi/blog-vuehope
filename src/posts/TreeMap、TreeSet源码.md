---
title: TreeMap、TreeSet源码
date: 2021-07-30
categories: Java集合类
tags: 
  - Java集合类
  - 数据结构
  - 源码系列
---


# `TreeMap`
```java

package java.util;


public class TreeMap<K,V>
    extends AbstractMap<K,V>
    implements NavigableMap<K,V>, Cloneable, java.io.Serializable
{
    // 比较器
    private final Comparator<? super K> comparator;

    // 树根
    private transient Entry<K,V> root;

    // 键值对的个数
    private transient int size = 0;

    private transient int modCount = 0;


    /*
    几个构造器方法
    */
    
    public TreeMap() {
        comparator = null;
    }

    public TreeMap(Comparator<? super K> comparator) {
        this.comparator = comparator;
    }

    public TreeMap(Map<? extends K, ? extends V> m) {
        comparator = null;
        putAll(m);
    }
    
    public TreeMap(SortedMap<K, ? extends V> m) {
        comparator = m.comparator();
        try {
            buildFromSorted(m.size(), m.entrySet().iterator(), null, null);
        } catch (java.io.IOException cannotHappen) {
        } catch (ClassNotFoundException cannotHappen) {
        }
    }


  
    public int size() {
        return size;
    }

    // O(logn)
    public boolean containsKey(Object key) {
        return getEntry(key) != null;
    }

    // O(n)
    public boolean containsValue(Object value) {
        // 内部 Entry 的遍历
        for (Entry<K,V> e = getFirstEntry(); e != null; e = successor(e))
            if (valEquals(value, e.value))
                return true;
        return false;
    }

    
    public V get(Object key) {
        Entry<K,V> p = getEntry(key);
        return (p==null ? null : p.value);
    }

    public Comparator<? super K> comparator() {
        return comparator;
    }

    // 最小键
    public K firstKey() {
        return key(getFirstEntry());
    }

    // 最大键
    public K lastKey() {
        return key(getLastEntry());
    }

    
    /*
    一系列获取 entry 的 方法，
    然后再通过 entry 去操纵键值对
    */
    
    final Entry<K,V> getFirstEntry() {
        Entry<K,V> p = root;
        if (p != null)
            while (p.left != null)
                p = p.left;
        return p;
    }

 
    final Entry<K,V> getLastEntry() {
        Entry<K,V> p = root;
        if (p != null)
            while (p.right != null)
                p = p.right;
        return p;
    }
    
    
    // 根据键值查找 entry 
    // O(logn)
    final Entry<K,V> getEntry(Object key) {
        // Offload comparator-based version for sake of performance
        if (comparator != null)
            return getEntryUsingComparator(key);
        if (key == null)
            throw new NullPointerException();
        @SuppressWarnings("unchecked")
            Comparable<? super K> k = (Comparable<? super K>) key;
       
        // 从 树根开始，按照 BST 的搜索方式进行搜索
        Entry<K,V> p = root;
        while (p != null) {
            int cmp = k.compareTo(p.key);
            if (cmp < 0)
                p = p.left;
            else if (cmp > 0)
                p = p.right;
            else
                return p;
        }
        return null;
    }


    final Entry<K,V> getEntryUsingComparator(Object key) {
        // 算法与上面一致
    }
    
    /*
    下面四个方法的时间复杂度都是 O(logn)
    */

    // 返回与大于或等于给定键的最小键相关联的键值映射，如果没有此键，则 null
    final Entry<K,V> getCeilingEntry(K key) {
        Entry<K,V> p = root;
        while (p != null) {
            int cmp = compare(key, p.key);
            if (cmp < 0) {
                if (p.left != null)
                    p = p.left;
                else
                    // key < p.key 且 p 无 左孩子，那么 p.key 即为大于 key 中的最小键
                    return p;
            } else if (cmp > 0) {
                if (p.right != null) {
                    p = p.right;
                } else {
                    // 下面的迭代需要注意一下，
                    // 向上回溯
                    // 需要找到第一个在p右边的祖先节点
                    Entry<K,V> parent = p.parent;
                    Entry<K,V> ch = p;
                    while (parent != null && ch == parent.right) {
                        ch = parent;
                        parent = parent.parent;
                    }
                    return parent;
                }
            } else
                // 刚好相等
                return p;
        }
        return null;
    }

    // 返回与小于或等于给定键的最大键相关联的键值映射，如果没有此键，则 null 
    final Entry<K,V> getFloorEntry(K key) {
        // 算法同上
    }

    // 返回与严格大于给定键的最小键相关联的键值映射，如果没有此键，则 null
    final Entry<K,V> getHigherEntry(K key) {
        // 算法同上
    }

    // 返回严格小于给定键的最大键相关联的键值映射，如果没有此键，则 null 
    final Entry<K,V> getLowerEntry(K key) {
        // 算法同上
    }

    
    public V put(K key, V value) {
        Entry<K,V> t = root;
        // 树为空
        if (t == null) {
            compare(key, key); // 类型检查、判空检查
            root = new Entry<>(key, value, null);
            size = 1;
            modCount++;
            return null;
        }
        
        int cmp;
        // 记录轨迹
        Entry<K,V> parent;
        // 区分使用比较器与否
        Comparator<? super K> cpr = comparator;
        if (cpr != null) {
            do {
                parent = t;
                cmp = cpr.compare(key, t.key);
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else
                    // 找到键，直接 setV
                    return t.setValue(value);
            } while (t != null);
        }
        else {
        // 不使用比较器
        }
        Entry<K,V> e = new Entry<>(key, value, parent);
        if (cmp < 0)
            parent.left = e;
        else
            parent.right = e;
        // 调用红黑树的平衡算法
        fixAfterInsertion(e);
        size++;
        modCount++;
        return null;
    }

    
    // 调用 deleteEntry;
    public V remove(Object key) {
        Entry<K,V> p = getEntry(key);
        if (p == null)
            return null;

        V oldValue = p.value;
        deleteEntry(p);
        return oldValue;
    }

    // O(1)
    // 只要 root = null， 经过可达性分析之后一整棵树都会被 GC
    public void clear() {
        modCount++;
        size = 0;
        root = null;
    }

   

    // NavigableMap API methods
    // 下面省略了一系列的 NavigableMap接口的方法
    
    public Map.Entry<K,V> firstEntry() {
        return exportEntry(getFirstEntry());
    }
    
    public Map.Entry<K,V> lastEntry() {
        return exportEntry(getLastEntry());
    }
    
    // ............

    
    /*
    省略了视图类的代码
    */
    // 首次请求此视图时，初始化为包含条目集视图实例的字段。 
    // 视图是无状态的，因此没有理由创建多个视图。
    
    // 注意，是视图，而不是快照
    // 实现方法是通过通过内部类获取迭代器访问元素的
    private transient EntrySet entrySet;
    private transient KeySet<K> navigableKeySet;
    private transient NavigableMap<K,V> descendingMap;

    public Set<K> keySet() {
        return navigableKeySet();
    }

    public NavigableSet<K> navigableKeySet() {
        KeySet<K> nks = navigableKeySet;
        return (nks != null) ? nks : (navigableKeySet = new KeySet<>(this));
    }

    public Collection<V> values() {
        Collection<V> vs = values;
        if (vs == null) {
            vs = new Values();
            values = vs;
        }
        return vs;
    }
    
    public Set<Map.Entry<K,V>> entrySet() {
        EntrySet es = entrySet;
        return (es != null) ? es : (entrySet = new EntrySet());
    }

   
    // 下面是作者包装的一些小方法（省略大部分）
    
    // 使用 exportEntry方法返回包装后的不可变的 Entry 因为内部的 Entry是可变的
    static <K,V> Map.Entry<K,V> exportEntry(TreeMap.Entry<K,V> e) {
        return (e == null) ? null :
            new AbstractMap.SimpleImmutableEntry<>(e);
    }

    private static int computeRedLevel(int sz) {
        int level = 0;
        for (int m = sz - 1; m >= 0; m = m / 2 - 1)
             level++;
        return level;
    }
    
}
```

```java
    // 树的节点类
    static final class Entry<K,V> implements Map.Entry<K,V> {
        K key;
        V value;
        Entry<K,V> left;
        Entry<K,V> right;
        // 因为需要向上回溯，需要父指针
        Entry<K,V> parent;
        // 染色标记
        boolean color = BLACK;

        Entry(K key, V value, Entry<K,V> parent) {
            this.key = key;
            this.value = value;
            this.parent = parent;
        }

        public K getKey() {
            return key;
        }
 
        public V getValue() {
            return value;
        }
        public V setValue(V value) {
            V oldValue = this.value;
            this.value = value;
            return oldValue;
        }
    }
    
    // O(logn)
    // 后继节点，即下一个key
    static <K,V> TreeMap.Entry<K,V> successor(Entry<K,V> t) {
        if (t == null)
            return null;
        // 存在右子树，则从右子树的根一直向左走
        else if (t.right != null) {
            Entry<K,V> p = t.right;
            while (p.left != null)
                p = p.left;
            return p;
        
        } else {
            // 向上回溯
            // 需要找到第一个在p右边的祖先节点
            Entry<K,V> p = t.parent;
            Entry<K,V> ch = t;
            while (p != null && ch == p.right) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    }

    // 前驱节点，即下一个key（算法与上面是对称的）
    static <K,V> Entry<K,V> predecessor(Entry<K,V> t) {
        if (t == null)
            return null;
        else if (t.left != null) {
            Entry<K,V> p = t.left;
            while (p.right != null)
                p = p.right;
            return p;
        } else {
            Entry<K,V> p = t.parent;
            Entry<K,V> ch = t;
            while (p != null && ch == p.left) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    }

    /**
        和《算法导论》采用的哑结点NIL略有不同，而是采用了包装过的访问器，
        避免对空指针一系列的判断
     */

    // 返回颜色
    // 如果为空，返回黑色，实际上就是对应哑结点NIL的黑色
    private static <K,V> boolean colorOf(Entry<K,V> p) {
        return (p == null ? BLACK : p.color);
    }

    // 返回父节点
    private static <K,V> Entry<K,V> parentOf(Entry<K,V> p) {
        return (p == null ? null: p.parent);
    }

    // 如果不空，设置颜色
    private static <K,V> void setColor(Entry<K,V> p, boolean c) {
        if (p != null)
            p.color = c;
    }
    
    // 左孩子
    private static <K,V> Entry<K,V> leftOf(Entry<K,V> p) {
        return (p == null) ? null: p.left;
    }

    // 右孩子
    private static <K,V> Entry<K,V> rightOf(Entry<K,V> p) {
        return (p == null) ? null: p.right;
    }
    
    /*
    左/右旋操作比一般的写的要复杂，主要复杂在对parent指针的更新上。
    */
    
    // 左旋
    /** From CLR */
    private void rotateLeft(Entry<K,V> p) {
        if (p != null) {
            Entry<K,V> r = p.right;
            
            p.right = r.left;
            if (r.left != null)
                r.left.parent = p;
                
            r.parent = p.parent;
            if (p.parent == null)
                root = r;
            else if (p.parent.left == p)
                p.parent.left = r;
            else
                p.parent.right = r;
                
            r.left = p;
            p.parent = r;
        }
    }

    // 右旋
    /** From CLR */
    private void rotateRight(Entry<K,V> p) {
        if (p != null) {
            Entry<K,V> l = p.left;
            p.left = l.right;
            if (l.right != null) l.right.parent = p;
            l.parent = p.parent;
            if (p.parent == null)
                root = l;
            else if (p.parent.right == p)
                p.parent.right = l;
            else p.parent.left = l;
            l.right = p;
            p.parent = l;
        }
    }
     
    // 在插入节点之后调用平衡算法
    /** From CLR */
    private void fixAfterInsertion(Entry<K,V> x) {
        // 注意这里，必须染成红色，否则无法保证 红黑树第五条性质 ———— 任一节点的到叶节点的任一路径的黑高相同，但是会导致第二性质、第三性质的破坏 
        x.color = RED;

        while (x != null && x != root && x.parent.color == RED) {
            if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
                Entry<K,V> y = rightOf(parentOf(parentOf(x)));
                if (colorOf(y) == RED) {
                    setColor(parentOf(x), BLACK);
                    setColor(y, BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    x = parentOf(parentOf(x));
                } else {
                    if (x == rightOf(parentOf(x))) {
                        x = parentOf(x);
                        rotateLeft(x);
                    }
                    setColor(parentOf(x), BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    rotateRight(parentOf(parentOf(x)));
                }
            } else {
                // 算法是对称的，“左”换成“右”即可
                Entry<K,V> y = leftOf(parentOf(parentOf(x)));
                if (colorOf(y) == RED) {
                    setColor(parentOf(x), BLACK);
                    setColor(y, BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    x = parentOf(parentOf(x));
                } else {
                    if (x == leftOf(parentOf(x))) {
                        x = parentOf(x);
                        rotateRight(x);
                    }
                    setColor(parentOf(x), BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    rotateLeft(parentOf(parentOf(x)));
                }
            }
        }
        root.color = BLACK;
    }

    // 供 remove 调用
    // 这部分和《算法导论》的处理差别很大
    // 个人认为 Josh Bloch and Doug Lea 的处理比 CLR 的更优雅一点
    private void deleteEntry(Entry<K,V> p) {
        modCount++;
        size--;

        // p 有两个孩子，用后继节点的键值代替 p 的键值
        if (p.left != null && p.right != null) {
            Entry<K,V> s = successor(p);
            p.key = s.key;
            p.value = s.value;
            // 现在其实去删 p 的后继 s 
            p = s;
        }

        // Start fixup at replacement node, if it exists.
        Entry<K,V> replacement = (p.left != null ? p.left : p.right);
        
        // 注意下面的 p 可能已经不是原来的 p 了

        if (replacement != null) {
            // p要被替换，构建双向链接
            replacement.parent = p.parent;
            if (p.parent == null)
                root = replacement;
            else if (p == p.parent.left)
                p.parent.left  = replacement;
            else
                p.parent.right = replacement;

            // Null out links so they are OK to use by fixAfterDeletion.
            // 这行代码可以被省略掉吗？
            p.left = p.right = p.parent = null;

            // Fix replacement
            if (p.color == BLACK)
                fixAfterDeletion(replacement);
        
        
        // 下面两种情况实际上是一种情况的细化
        } else if (p.parent == null) {
            // 此时，p 没有孩子，且 p 就是根
            root = null;
        } else {
            // 此时 p 没有孩子，但是 p 并不是根
            
            // 如果要删的 p 的颜色是红色，不会引起5条性质中任一条性质的破坏
            
            // 这里先调整后删除也是可以的（虽然《算法导论》上仍然是先删除后调整）
            if (p.color == BLACK)
                fixAfterDeletion(p);
            
            if (p.parent != null) {
                if (p == p.parent.left)
                    p.parent.left = null;
                else if (p == p.parent.right)
                    p.parent.right = null;
                p.parent = null;
            }
        }
    }

    // 删除节点之后的平衡调整
    /** From CLR */
    private void fixAfterDeletion(Entry<K,V> x) {
        while (x != root && colorOf(x) == BLACK) {
            if (x == leftOf(parentOf(x))) {
                Entry<K,V> sib = rightOf(parentOf(x));

                if (colorOf(sib) == RED) {
                    setColor(sib, BLACK);
                    setColor(parentOf(x), RED);
                    rotateLeft(parentOf(x));
                    sib = rightOf(parentOf(x));
                }

                if (colorOf(leftOf(sib))  == BLACK &&
                    colorOf(rightOf(sib)) == BLACK) {
                    setColor(sib, RED);
                    x = parentOf(x);
                } else {
                    if (colorOf(rightOf(sib)) == BLACK) {
                        setColor(leftOf(sib), BLACK);
                        setColor(sib, RED);
                        rotateRight(sib);
                        sib = rightOf(parentOf(x));
                    }
                    setColor(sib, colorOf(parentOf(x)));
                    setColor(parentOf(x), BLACK);
                    setColor(rightOf(sib), BLACK);
                    rotateLeft(parentOf(x));
                    x = root;
                }
            } else { // symmetric
                Entry<K,V> sib = leftOf(parentOf(x));

                if (colorOf(sib) == RED) {
                    setColor(sib, BLACK);
                    setColor(parentOf(x), RED);
                    rotateRight(parentOf(x));
                    sib = leftOf(parentOf(x));
                }

                if (colorOf(rightOf(sib)) == BLACK &&
                    colorOf(leftOf(sib)) == BLACK) {
                    setColor(sib, RED);
                    x = parentOf(x);
                } else {
                    if (colorOf(leftOf(sib)) == BLACK) {
                        setColor(rightOf(sib), BLACK);
                        setColor(sib, RED);
                        rotateLeft(sib);
                        sib = leftOf(parentOf(x));
                    }
                    setColor(sib, colorOf(parentOf(x)));
                    setColor(parentOf(x), BLACK);
                    setColor(leftOf(sib), BLACK);
                    rotateRight(parentOf(x));
                    x = root;
                }
            }
        }

        setColor(x, BLACK);
    }
```




# `TreeSet`
`TreeSet`的实现完全基于`TreeMap`, value使用一个哑值即可。
以便代码复用的最大化。
```java
package java.util;


public class TreeSet<E> extends AbstractSet<E>
    implements NavigableSet<E>, Cloneable, java.io.Serializable
{
    // 使用 TreeMap 实现 TreeSet
    private transient NavigableMap<E,Object> m;

    // 静态的、所有键隐含的值，仅仅起一个哨兵作用
    private static final Object PRESENT = new Object();

    
    public TreeSet() {
        this(new TreeMap<E,Object>());
    }

    
    
   
    public Iterator<E> iterator() {
        return m.navigableKeySet().iterator();
    }

    
    public Iterator<E> descendingIterator() {
        return m.descendingKeySet().iterator();
    }

   
    public NavigableSet<E> descendingSet() {
        return new TreeSet<>(m.descendingMap());
    }

 
    public int size() {
        return m.size();
    }

    
    public boolean isEmpty() {
        return m.isEmpty();
    }

    
    public boolean contains(Object o) {
        return m.containsKey(o);
    }

    
    public boolean add(E e) {
        return m.put(e, PRESENT)==null;
    }

    
    public boolean remove(Object o) {
        return m.remove(o)==PRESENT;
    }

    
    public void clear() {
        m.clear();
    }

   
    
    public E first() {
        return m.firstKey();
    }

   
    public E last() {
        return m.lastKey();
    }

    
    public E lower(E e) {
        return m.lowerKey(e);
    }

    
    public E floor(E e) {
        return m.floorKey(e);
    }

   
    public E ceiling(E e) {
        return m.ceilingKey(e);
    }


    public E higher(E e) {
        return m.higherKey(e);
    }

}
```

