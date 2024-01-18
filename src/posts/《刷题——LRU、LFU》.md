---
title: 《刷题——LRU、LFU》
date: 2023-01-09 15:14:59
categories: 算法题
tags:
---





## LRU

### 双向链表 + 哈希表
应该这样思考，比较合理。
**使用双向链表去维护键值对的使用顺序，也就是将刚刚使用的键值对放在链表的头部**。
但是，这样的单次操作复杂度是$O(n)$的。
如何优化，使用HashMap即可，
具体来说就是**将键与链表的节点一一对应**，这样就可以做到O(1)时间复杂度快速检索到关键节点。

```java
class LRUCache {

    private int size;
    private int capacity;
  
    // 哨兵(哑结点，不存储任何有效值)
    private Node head, tail;

    private HashMap<Integer, Node> map;

    private static class Node {
        Node prev, next; // 双向
        int key, val;

        public Node(int key,int val) {
            this.key = key;
            this.val = val;
        }

        public Node() {
        }
    }

    // 删除某个节点
    private void removeNode(Node node) {
        Node p1 = node.prev;
        Node p2 = node.next;
        p1.next = p2;
        p2.prev = p1;
    }

    // moveToHead 的辅助函数
    private void addToHead(Node node) {
        Node headNext = head.next;
        head.next = node;
        node.prev = head;
        node.next = headNext;
        headNext.prev = node;
    }

		// 将一个已有的节点移动到头部
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(); // 哑结点的构造
        tail = new Node();
        head.next = tail;
        tail.prev = head;
        map = new HashMap<>();
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        moveToHead(node); // 移动到头
        return node.val;
    }

    public void put(int key, int value) {
        Node node = map.get(key);
        if (node == null) {
            if (size >= capacity) {
                Node last = tail.prev; // 删掉末尾项，也就是删除最不常用的数据项
                // map和双向链表维护
                removeNode(last);
                map.remove(last.key);
            } else {
                size++;
            }
            node = new Node(key,value);
            addToHead(node);
            map.put(key, node);
        } else {
            // 修改值并移动到头部
            node.val = value;
            moveToHead(node);
        }
    }

}
```



### LinkedHashMap

[精彩题解](https://leetcode-cn.com/problems/lru-cache/solution/yuan-yu-linkedhashmapyuan-ma-by-jeromememory/)

直接使用`LinkedHashMap`
```cpp
class LRUCache extends LinkedHashMap<Integer, Integer> {

    int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75F, true); // 前两个参数无所谓，关键是第三个 true, 按照访问顺序来调整顺序
        this.capacity = capacity;
    }

    public int get(int key) {
        return getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

	// 将双向链表中最“老”的节点删除
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        // HashMap 会在 put 方法后调用这个方法，所以下面是 >  (注意是之后)
        return size() > capacity;
    }
}
```



## LFU（最不经常使用）缓存结构设计

unfinished

```java
import java.util.*;


public class Solution {
    /**
     * lfu design
     * @param operators int整型二维数组 ops
     * @param k int整型 the k
     * @return int整型一维数组
     */

    static int counter = 0; // 时间戳计数器

    static class Node implements Comparable<Node> {
        // 这里的 key 是需要的，是因为从 TreeSet 中再去删除某个节点的时候，需要以key为键再到 HashMap 删去Node
        // 以此方式实现双向同步维护
        int key; 
        int val;
        int fre;
        int t;

        public Node(int key, int val) {
            this.key = key;
            this.val = val;
            this.fre = 1;
            this.t = ++counter;
        }

        public boolean equals(Object o) {
            if(o instanceof Node) {
                Node node = (Node)o;
                return t == node.t;
            }
            return false;
        }

        public int compareTo(Node node) {
            return fre != node.fre ? fre - node.fre : t - node.t;
        }
    }
   
    // 仿照LRU的 map+双向链表的同步维护
    Map<Integer,Node> mp = new HashMap<>();
    TreeSet<Node> set = new TreeSet<>();
    
    public int[] LFU (int[][] operators, int k) {
        // write code here
        List<Integer> list = new ArrayList<>();

        for(int[] ope : operators) {
            if(ope[0] == 1) {
                int key = ope[1];
                int val = ope[2];
                Node node = mp.get(key);
                if(node == null) {
                    if(mp.size() >= k) {
                        mp.remove(set.pollFirst().key);
                    }
                    Node newNode = new Node(key, val);
                    mp.put(key, newNode);
                    set.add(newNode);
                } else {
                    set.remove(node);
                    node.val = val;
                    ++node.fre;
                    node.t = ++counter;
                    set.add(node);
                }
            } else if(ope[0] == 2){
                Node node = mp.get(ope[1]);
                if(node == null) {
                    list.add(-1);
                } else {
                    list.add(node.val);
                    // 注意：不要误以为像redis的zset一样，调整score就可以自动调整
                    // 所以需要手动先删后加
                    set.remove(node);
                    ++node.fre;
                    node.t = ++counter;
                    set.add(node);
                }
            }
        }

        return list.stream().mapToInt(Integer::valueOf).toArray();
    }
}
```

[LFU题解参考](https://leetcode-cn.com/problems/lfu-cache/solution/java-13ms-shuang-100-shuang-xiang-lian-biao-duo-ji/#ologn-%E8%A7%A3%E6%B3%95-%E2%80%94%E2%80%94-%E4%BD%BF%E7%94%A8%E5%B0%8F%E6%A0%B9%E5%A0%86%E6%89%BE%E5%88%B0-freq-%E6%9C%80%E5%B0%8F%EF%BC%8C%E5%9B%A0%E4%B8%BA-java-%E4%B8%AD%E7%9A%84-priorityqueue-%E9%BB%98%E8%AE%A4%E5%B0%B1%E6%98%AF%E5%B0%8F%E6%A0%B9%E5%A0%86,-%E5%AE%9E%E7%8E%B0%E6%9C%80%E7%AE%80%E5%8D%95)

[`有时候list<Integer>和数组int[]转换很麻烦。`](https://www.cnblogs.com/cat520/p/10299879.html)