---
title: 算法题C++模板API
date: 2021-11-28 22:28:28
categories: Cpp
tags:
  - 算法题
  - cpp
---





# 语法类

## 类与结构体

```cpp
struct Node {
    int x, y, z;

    Node(int x, int y, int z) : x(x), y(y), z(z) {}
    
};

int main() {
    // 初始化
    Node node(1, 2, 3);
    Node node1 = {2, 3, 4};
    return 0;
}
```



## 重新定义类型

```cpp
#define P1 pair<int,int>

typedef pair<int, int> P2;

class F1 {
    using P3 = pair<int, int>;
};
```



## IO

```c
const int N = 100;
char g[N][N];
int main() {
    int T;
    cin >> T;
    while (T--) {
        int m, n;
        cin >> m >> n;
//        memset(g, 0, sizeof(g));
        for (int i = 0; i < m; i++) {
            scanf("%s", g[i + 1] + 1);
        }

        for (int i = 1; i <= m; i++) {
            printf("%s\n", g[i] + 1);
        }
    }
    return 0;
}
```





# algorithm



## reverse

```cpp
int main() {
    // 初始化
    vector<int> a = {1, 2, 3, 4};
    reverse(a.begin(), a.end());
    for (int x : a) {
        cout << x << " ";
    }
    cout << endl;
    int b[] = {1, 2, 3, 4};
    reverse(b, b + 3); // [)
    for (int x : b) {
        cout << x << " ";
    }

    return 0;
}
```





## sort

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

bool cmp(int &a, int &b) {
    return a % 2 < b % 2;
}

int main() {
    // 对数组排序
    int a[4] = {1, 3, 2, 0};
    sort(a, a + 4); // 注意是 [)
    for (int i : a) {
        cout << i << " ";
    }
    cout << endl;

    // 从大到小
    sort(a, a + 4, [](int x, int y) {
        return x > y;
    });
    for (int i : a) {
        cout << i << " ";
    }
    cout << endl;

    // 从大到小
    sort(a, a + 4, cmp); // 传入 cmp 函数指针
    for (int i : a) {
        cout << i << " ";
    }
    cout << endl;

    // vector<vector<int> > vs;
    vector<vector<int>> vs(10, vector<int>(2)); // 10 * 2
    sort(vs.begin(), vs.end(), [](vector<int> &a, vector<int> &b) {
        return a[0] != b[0] ? a[0] < b[0] : a[1] > b[1]; // 先按第一维从小排序,再第二维从大到小排序
    });
    // 注意，默认的sort，其实是按vector<int>的字典序排序。
    return 0;
}


```



## lower_bound、upper_bound

```cpp
int main() {
    int a[] = {1, 3, 5, 7, 9};
    sort(a, a + 5);

    // 返回值 int*
    int idx = lower_bound(a, a + 5, 5) - a;
    cout << idx << " , " << a[idx] << endl;

    int idx2 = upper_bound(a, a + 5, 5) - a;
    cout << idx2 << " , " << a[idx2] << endl;


    vector<int> v = {2, 4, 6, 8, 10};
    auto it1 = lower_bound(v.begin(), v.end(), 7);
    // 返回值是 vector<int>::iterator
    vector<int>::iterator it2 = lower_bound(v.begin(), v.end(), 7);
    cout << *it1 << endl;
    cout << *it2 << endl;

    int idx3 = lower_bound(v.begin(), v.end(), 7) - v.begin();
    cout << idx3 << " , " << v[idx3] << endl;

    return 0;
}
```



# data structure

头文件

```cpp
#include <string>
#include <vector>
#include <queue>
#include <stack>
#include <map>
#include <set>
#include <unordered_map>
#include <unordered_set>
```








## pair

```cpp
int main() {
    // 初始化方式
    P2 p2 = {3, 4};
    P2 p3(5, 6);
    P2 p4 = make_pair(7, 8);

    cout << p2.first << "," << p2.second << endl;
    cout << p3.first << "," << p3.second << endl;
    cout << p4.first << "," << p4.second << endl;
   
    vector<P2> v = {{1, 5},
                    {2, 4},
                    {3, 3}};
    
    // 解包
    for (auto [x, y] : v) {
        cout << x << "," << y;
    }
    
    return 0;
}
```





## string

```cpp
int main() {
    string s1;
    s1.push_back('a');
    s1 += 'b';
    s1 += "c";
    s1.append("def"); // aka +
    cout << s1 << endl;

    // 反转
    reverse(s1.begin(), s1.end());
    cout << s1 << endl;

    // 直接访问
    cout << s1[0] << " " << s1[1] << endl;
   
    // 子串
    string s = "0123456";
    s1 = s.substr(2,4); // s.substring(2, 2 + 4); aka 2345
   
    return 0;
}
```



字符串和数字互转

```cpp
int main() {
    string s = "123";
    int x = stoi(s);
    cout << x << endl;
    string y = to_string(x);
    cout << y << endl;
    return 0;
}
```



子串和find

```cpp
int main() {
    string s = "01234567890123456789";

    // 子串
    cout << s.substr() << endl;
    cout << s.substr(2) << endl;
    cout << s.substr(2, 4) << endl;
    cout << s.substr(2, 100) << endl;

    // find、rfind
    int p1 = s.find("012");
    cout << "p1 " << p1 << endl;
    int p2 = s.find("012", 1);
    cout << "p2 " << p2 << endl;
    int rp = s.rfind("012");
    cout << "rp " << rp << endl;
    
    return 0;
}
```



split

```cpp
#include <iostream>
using namespace std;
 
int main() {
    char s[] = "a b   c  d e";
    const char* delim = " ";
    char* p = nullptr;
    p = strtok(s, delim);
    while (p) {
        cout << p << endl;
        p = strtok(nullptr, delim);
    }
    return 0;
}
```





## vector

```cpp
int main() {
    // 初始化
    vector<int> a1;
    vector<int> a2(10);
    vector<int> a3 = {1, 2, 3, 4};
    vector<int> a4(100, 0x3f3f3f3f);

    // 清空
    a1.clear();
    cout << "empty " << a1.empty() << endl;

    a1.push_back(1);
    a1.push_back(2);
    a1.push_back(3); // 推入
    a1.pop_back(); // 弹出
    a1.push_back(4);

    //  原来的值不清空
    a1.resize(10);

    // 迭代器 [)
    a1.begin();
    a1.end(); // 取不到

    // 头
    cout << a1.front() << endl;  // aka a1[0]
    // 尾巴
    cout << a1.back() << endl; // 可以取到 aka a1[a1.size() - 1]

    a1.insert(a1.begin() + 1, 999);

    cout << " ---- " << endl;

    for (int x : a1) {
        cout << x << " ";
    }
    
    return 0;
}
```



```cpp
int main() {

    vector<int> a = {1, 2, 3, 4, 5};
    // 这么写是错的
    for (auto it = a.begin(); it != a.end(); ++it) {
        if (*it % 2 == 0) {
            a.erase(it);
        } else {
            cout << *it << " ";
        }
    }
    cout << endl;

    for (int x : a) {
        cout << x << " ";
    }
}  
```



```cpp
int main() {

    vector<int> a = {1, 2, 3, 4, 5};
    // 正确做法
    for (auto it = a.begin(); it != a.end();) {
        if (*it % 2 == 0) {
            it = a.erase(it); // 返回下一个有效的iterator
        } else {
            cout << *(it++) << " ";
        }
    }
    cout << endl;

    for (int x : a) {
        cout << x << " ";
    }
}  
```





## queue、stack

```cpp
int main() {
    queue<int> q;
    q.push(1);
    q.push(2);
    q.push(3);

    while (!q.empty()) {
        int x = q.front();
        q.pop();
        cout << x << " ";
    }
    cout << endl;


    stack<int> st;
    st.push(1);
    st.push(2);
    st.push(3);

    while(!st.empty()) {
        cout << st.top() << " ";
        st.pop();
    }

    return 0;
}
```




## deque

```cpp
int main() {
    deque<int> dq;
    
    dq.push_back(1);
    dq.push_front(2);
    
    dq.pop_front();
    dq.pop_back();
    
    dq.front();
    dq.back();
    
    return 0;
}
```





## priority_queue

```cpp
#include <queue>

using namespace std;

struct Node {
    int x, y;
    bool operator<(const Node &node) const { // 注意两个 const 修饰
        return x * y < node.x * node.y;
    }
};

int main() {
    // 大根堆
    priority_queue<int> pq1;
    // 小根堆
    priority_queue<int, vector<int>, greater<int>> pq2;

    priority_queue<Node> pq3;
    pq3.push({2, 2});
    pq3.push({3, 1});


    while(pq3.size() > 0) {
        Node node = pq3.top();
        pq3.pop();
    }
    

    // 不可以既重写Node的操作符，又使用greater
//    priority_queue<Node, vector<Node>, greater<Node>> pq4;
    return 0;
}
```





## set、unordered_set

```cpp
int main() {
    
    set<int> s;

    s.insert(3);
    s.insert(2);
    s.insert(1);
    s.insert(1);

    // 判断存在与否
    if (s.count(1)) {

    }
    if (s.find(1) != s.end()) {

    }


    // 正序遍历
    for (int x : s) {
        cout << x << " ";
    }
    cout << endl;
    // 或者
    for (auto it = s.begin(); it != s.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    s.erase(2);

    s.erase(s.begin());

    // 逆序
    for (auto it = s.rbegin(); it != s.rend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    cout << " -------------- " << endl;

    // 遍历删除的正确做法
    s = {1, 2, 3, 4, 5};
    for (auto it = s.begin(); it != s.end();) {
        if (*it % 2 == 0) {
            s.erase(it++);
        } else {
            cout << *(it++) << " ";
        }
    }
    cout << endl;

    for (int x : s) {
        cout << x << " ";
    }
    cout << endl;

    s = {1, 3, 5, 7, 9};

    // 二分查找
    auto it = s.lower_bound(2);
    cout << *it << endl;
    advance(it, 1); // O(len)
    cout << *it << endl;
    advance(it, 2);
    cout << *it << endl;
    advance(it, 1);
    if (it == s.end()) {
        cout << "to end" << endl;
    } else {
        cout << *it << endl;
    }
    
    return 0;
}
```



unordered_set更简单，因为它是无序的，所以api'更少。

**自定义排序类型**

```cpp
struct Node {
    int x, y;

    bool operator<(const Node &b) const {
        return x != b.x ? x < b.x : y < b.y;
    }
};


int main() {
    set<Node> set = {{1, 2},
                    {1, 1},
                    {2, 0}};

    for(auto& node : set) {
        cout << node.x <<"," << node.y << endl;
    }
    return 0;
}
```



## map、unordered_map

```cpp
int main() {
    // 初始化
    map<int, int> mp;

    mp = {{1, 2},
          {3, 4}};
    cout << mp[1]++ << endl;
    cout << mp[1] << endl;

    mp.insert(pair<int, int>(1, 2)); // 如果键已经存在，则不插入
    cout << mp[1] << endl;

    // 判断存在与否
    if (mp.find(1) != mp.end()) {

    }
    if (mp.count(1) > 0) {

    }

    cout << endl;
    // 遍历
    mp = {{1, 2},
          {3, 4},
          {5, 6},
          {7, 8}};
   	for(auto [k,v] : mp) {
        cout << k << "," << v << endl;
    }

    for (auto &item :mp) {
        cout << item.first << "," << item.second << endl;
    }

    for(auto it = mp.rbegin(); it != mp.rend(); it++) {
        cout << it->first << " , " << it->second << endl;
    }

    return 0;
}
```





## multiset、multimap

```cpp
#include <set>
int main() {

    multiset<int> multiset;

    multiset.insert(4);
    multiset.insert(1);
    multiset.insert(3);
    multiset.insert(2);

    for(int x : multiset) {
        cout << x << " ";
    }

    return 0;
}
```



```cpp
#include <map>
int main() {

    multimap<int, int> mp;
    mp.insert(make_pair(1, 1));
    mp.insert(make_pair(1, 2));
    mp.insert(make_pair(1, 3));

    for (auto &it:mp) {
        cout << it.first << " " << it.second << endl;
    }

    return 0;
}
```




## 容器的相互转换
```cpp
int main() {
    deque<int> dq = {1, 2, 3, 4};
    vector<int> a(dq.begin(), dq.end());
    for(int x : a) {
        cout << x << endl;
    }
    a[1] = 99; // 不影响原值
    while (!dq.empty()) {
        cout << dq.front() << endl;
        dq.pop_front();
    }
    return 0;
}
```
