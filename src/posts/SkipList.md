---
title: SkipList
date: 2021-12-16 14:23:04
categories: 数据结构
tags: 
  - 数据结构
---




# C++实现
采用 `right`、`down`指针的方法，维护前驱与后继、上层与下层的节点之间的关系。

**缺点**：每个节点都要存储真实的数据，增加了不必要的开销。

(~~另外，我的代码实现有点冗余，其实可以把查找节点抽象一个方法出来。~~ )

```cpp
#include <vector>
using std::vector;

class SkipList {
private:
    // 最高层数为32层
    static const int MAX_LEVELS = 32;

    struct Node {
        // 真实数据
        int val;
        // 向右走、向下走的指针
        Node *right, *down;

        explicit Node(int val = 0, Node *right = nullptr, Node *down = nullptr) : val(val), right(right), down(down) {}
    };

    // 哑结点
    Node *head = nullptr;

    // 模拟抛硬币
    static bool getRand() {
        int x = rand() % 2;
        return x;
    }

public:
    SkipList() {
        // 哑结点初始化MAX层，next指针都为空，head是最上面的节点
        // 哑结点不存储任何真实数据，仅仅是为了代码实现方便罢了
        Node *down = nullptr, *up;
        for (int i = 0; i < MAX_LEVELS; i++) {
            up = new Node(0, nullptr, down);
            down = up;
        }
        head = up;
    }

    // 查找某个元素是否存在
    bool search(int target) {
        // 从左上角出发
        Node *node = head;
        while (node) {
            //先向右移，再向下移
            if (node->right) {
                // 此时  node.val < target < node.val, 通过“跳跃”的方式快速缩小了范围
                if (target < node->right->val) {
                    node = node->down;
                    // 找到了   
                } else if (node->right->val == target) {
                    return true;
                    // 继续往右走    
                } else {
                    node = node->right;
                }
                // 右面没有节点了，只能往下走才可能找到    
            } else {
                node = node->down;
            }
        }
        return false;
    }

    // 这里的新增节点，是允许重复值的；如果是Set的话，可以先查找出目标 node ，如果 node.val ==  num , 就不要重复插入了
    void add(int num) {
        // 其实是一个栈，用来存储搜索路径中的节点(前驱)，
        // 因为最后要根据新节点的层数往上层增加节点，就必须知道它的前驱
        vector<Node *> downs;
        // 从顶部开始搜索。
        Node *node = head;
        while (node) {
            // 一直往右走，直到右边没有节点，或者右边节点的值大于 num
            while (node->right && node->right->val <= num) {
                node = node->right;
            }
            //找到这一层的找到要插入的位置的前驱, 入栈
            downs.push_back(node);
            // 往下走，直到最底层
            node = node->down;
        }

        // 这时候已经到了最底层
        // 从后向前根据“抛硬币的节点”依次在每一层的前驱后面插入节点;
        int pos = downs.size() - 1;
        Node *dn = nullptr, *pre;
        do {
            pre = downs[pos--];
            // 新增节点存储值是 num （明显数据被重复存储了），后继是 pre->right ,前驱是 pre（其实就是链表的插入操作），注意
            pre->right = new Node(num, pre->right, dn);
            // 这时的 pre->right 就是新增的节点。
            dn = pre->right;
            // 如果没有超出允许的 MAX_LEVELS 并且根据抛硬币的结果需要继续往上加，则继续  
        } while (pos >= 0 && getRand());
    }

    // 删除一个值,基本上与查找流程一致
    bool erase(int num) {
        Node *node = head;
        // 记录是否存在
        bool exist = false;
        while (node) {
            if (node->right) {
                // 找到了目标值
                if (node->right->val == num) {
                    // del 即为要删除的节点
                    Node *del = node->right;
                    // 链表的删除操作
                    node->right = del->right;
                    // 注意我们是要把这个"柱子"从上向右全部删除的，所以还要往下走，继续走
                    // node 是要删除的节点的前驱
                    node = node->down;
                    exist = true;
                    delete del;
                } else if (node->right->val < num) {
                    node = node->right;
                } else {
                    node = node->down;
                }
            } else {
                node = node->down;
            }
        }
        return exist;
    }
};
```


# 力扣《设计跳表》
力扣上的一道题目，可以供你测试你的代码。
[设计跳表](https://leetcode-cn.com/problems/design-skiplist/)
```cpp
struct Node{
    int val;
    Node *right, *down;
    Node(Node* _right, Node* _down, int _val):right(_right),down(_down),val(_val){}
};
class Skiplist {
public:
    Node* head;
    vector<Node*> inserted;
    Skiplist() {
        head = new Node(NULL, NULL, 0);
    }
    
    bool search(int target) {
        Node *p = head;
        while(p){
            while(p->right && p->right->val < target) p = p->right;
            if(p->right && p->right->val == target) return true;
            p = p->down;
        }
        return false;
    }
    
    void add(int num) {
        inserted.clear();
        Node *p = head;
        while(p){
            while(p->right && p->right->val < num) p = p->right;
            inserted.push_back(p);
            p = p->down;
        }
        bool grow = true;
        Node* downNode = NULL;
        while(grow && !inserted.empty()){
            Node* rightmost = inserted.back(); inserted.pop_back();
            Node* newNode = new Node(rightmost->right, downNode, num);
            rightmost->right = newNode;
            downNode = newNode;
            grow = (rand()%2 == 0);
        }
        // 不人为限制层数，层数极高的情况很稀疏；
        if(grow){
            Node* newNode = new Node(NULL, downNode, num);
            head = new Node(newNode, head, 0);
        }
    }
    
    bool erase(int num) {
        Node *p = head;
        bool seen = false;
        while(p){
            while(p->right && p->right->val < num) p = p->right;
            if(!seen && p->right && p->right->val == num) seen = true;
            if(seen){
                p->right = p->right->right;
            }
            p = p->down;
        }
        return seen;
    }
};

/**
 * Your Skiplist object will be instantiated and called as such:
 * Skiplist* obj = new Skiplist();
 * bool param_1 = obj->search(target);
 * obj->add(num);
 * bool param_3 = obj->erase(num);
 */
```
