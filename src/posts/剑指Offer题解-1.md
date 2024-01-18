---
title: 剑指Offer题解-1
date: 2021-12-03 14:29:19
categories: 算法题
tags:
  - 算法题
  - 剑指Offer
---



#### [剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

```cpp
class CQueue {
public:
    stack<int> st1,st2;
    CQueue() {

    }
    
    void appendTail(int value) {
        st1.push(value);
    }
    
    int deleteHead() {
        if(st1.size() + st2.size() == 0) return -1;
        // 将 st1 其中的元素全都取出来的，顺序就是FIFO的顺序了
        if(st2.empty()){
            while(!st1.empty()){
                int val = st1.top();
                st1.pop();
                st2.push(val);
            }
        }
        int val = st2.top();
        st2.pop();
        return val;
    }
};
```



#### [剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

```cpp
class Solution {
public:
    int mod = 1e9+7;
    int fib(int n) {
        if(n == 0) return - 1;
        int a = 0, b = 1;
        for(int i = 0; i < n - 1; i++) {
            int c = (a + b) % mod;
            a = b;
            b = c;
        }
        return b;
    }
};
```



**矩阵加速**

```java
class Solution {
    int mod = (int)1e9 + 7;
    public int fib(int n) {
        int[][] A = {{1, 1}, {1, 0}};
        int[][] B = pow(A, n);
        return B[1][0];
    }

    // 矩阵乘法，返回新数组
    int[][] mul(int[][] A, int[][] B) {
        int m = A.length, n = B[0].length;
        int len = A[0].length;
        int[][] ans = new int[m][n];
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                int res = 0;
                for(int k = 0; k < len; k++) {
                    // 小心溢出
                    res = (int)((res + (long)A[i][k] * B[k][j] ) % mod);
                }
                ans[i][j] = res;
            }
        }
        return ans;
    }

    // 快速幂计算
    int[][] pow(int[][] A, int n) {
        int[][] ans = new int[A.length][A[0].length];
        for(int i = 0; i < ans.length; i++) {
            ans[i][i] = 1;
        }
        while(n > 0) {
            if(n % 2 == 1) {
                ans = mul(ans, A);
            }
            A = mul(A, A);
            n >>= 1;
        }
        return ans;
    }

}
```





#### [剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

unfinished

如何做到`O(1)`?。

```cpp
class Solution {
public:
    int findRepeatNumber(vector<int>& nums) {
        int i = 0;
        // 每次要么做到 nums[i] == i， 要么做到 nums[nums[i]] == nums[i]
        // 也就是说，每次都有一个元素被放到正确的地方。
        // 可以想想为什么是 O(n) 的
        while(i < nums.size()) {
            if(nums[i] == i) {
                i++;
                continue;
            }
            if(nums[nums[i]] == nums[i]) return nums[i]; // 实际上也避免了死循环
            swap(nums[i],nums[nums[i]]);
        }
        return -1;
    }
};
```







#### [剑指 Offer 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

**单调的思维** ，一句话解释，每一行的最后一个小于等于 target的元素的位置是单调的。

```cpp
class Solution {
public:
    bool findNumberIn2DArray(vector<vector<int>>& matrix, int target) {
        int m = matrix.size();
        if(m == 0) return false;
        int n = matrix[0].size();
        // 从右上角进行搜索
        int j = n - 1 , i = 0;
        while(j >= 0 && i < m) {
            // 移动到第一个小于等于 target的地方
            while(j >= 0 && matrix[i][j] > target) j--;
            // 检查
            if(j >= 0 && matrix[i][j] == target) return true;
            // 此时 matrix[i][j]是小于 target的
            i++;
        }
        return false;
    }
};
```



#### [剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)



如果没有重复元素的话：

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n - 1;
        while(l < r) {
            int mid = l + (r - l)/2;
            // 判断 nums[mid]在那一段
            if(nums[mid] < nums[r]) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return nums[l];
    }
};
```







#### [剑指 Offer 07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)



```cpp
class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = preorder.size();
        return create(0, n - 1, 0, n - 1, preorder, inorder);
    }
    // 返回某子树的根
    TreeNode* create(int preL, int preR, int inL, int inR,vector<int>& preorder, vector<int>& inorder){
        if(preL > preR){
            return nullptr;
        }
        int val  = preorder[preL]; // 首个元素就是 根 root
        TreeNode* node = new TreeNode(val);
        // 在中序遍历找出 根
        int idx = 0;
        for(int i = inL; i <= inR; i++){
            if(inorder[i] == val){
                idx = i;
                break;
            }
        }
        int numLeft = idx - inL; // 左子树节点的数量
        node->left = create(preL + 1, preL + numLeft, inL, idx - 1, preorder, inorder);
        node->right = create(preL + numLeft + 1, preR, idx + 1, inR, preorder, inorder);
        return node;
    }
};
```





#### [剑指 Offer 14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)



简单DP

```cpp
class Solution {
public:
    int cuttingRope(int n) {
        vector<int> dp(n+1);
        dp[1] = 1;
        // 注意提给的限制，就是 段数大于 1 
        for(int i = 2;i <= n; i++) {
            for(int j = 1; j < i; j++) {
                // max(dp[j], j) 分别对应切割的最大值 和 不切割的情况
                dp[i] = max(dp[i], max(dp[j], j) * (i - j));
            }
        }
        return dp[n];
    }  
};
```



数学求导推导：

```cpp
class Solution {
    public int cuttingRope(int n) {
        if (n <= 3) {
            return n-1;
        }
        /*
            据 数学证明：
            当 n >= 3时，因数 拆分成 3 的计算结果 较大
            当 n < 3时，因数越大，计算结果越大
        */
        int mod = 1000000007;
        long result = 1L;
        while (n > 4) {
            result = result * 3 % mod;
            n -= 3;
        }

        /*
            将 最后一个 因数 计算在内
        */
        result = result * n % mod;

        return (int)result;
    }
}
```



#### [剑指 Offer 12. 矩阵中的路径](https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/)



```cpp
const int dx[] = {1, 0, -1, 0};
const int dy[] = {0, 1, 0, -1};
class Solution {
public:
    bool ans = false;
    string s;
    vector<vector<char>> g;
    int m, n;
    bool vis[210][210];
    bool exist(vector<vector<char>>& board, string word) {
        if(word == "") return true;
        s = word;
        g = board;
        m = g.size();
        n = g[0].size();
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                memset(vis, 0, sizeof(vis));
                dfs(i, j, 0);
            }
        }
        return ans;
    }

    bool dfs(int i, int j, int pos) {
        if(pos == s.size()) {
            ans = true;
            return true;
        }
        if(s[pos] != g[i][j]) {
            return false;
        }
        if(pos == s.size() - 1) {
            ans = true;
            return true;
        } //特判，走到头了，无需再走

        vis[i][j] = 1;
        for(int k = 0; k < 4; k++) {
            int x = i + dx[k];
            int y = j + dy[k];
            if(x >= 0 && x < m && y >= 0 && y < n && !vis[x][y]) {
                if(dfs(x, y, pos + 1)) {
                    return true;
                }
            }
        }
        vis[i][j] = 0; //回溯
        return false;
    }

};
```



时间复杂度的上限：$O*(M*N*3^L)$



#### [剑指 Offer 25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)



```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode* dum = new ListNode(-1), *cur = dum;
        ListNode *p1 = l1, *p2 = l2;
        while(p1 && p2) {
            if(p1->val < p2->val) {
                cur->next = p1;
                p1 = p1->next; 
            } else {
                cur->next = p2;
                p2 = p2->next;
            }
            cur = cur->next;
        }
        cur->next = p1 ? p1 : p2;
        return dum->next;
    }
};
```





#### [剑指 Offer 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

unfinished

```cpp
class Solution {
public:
    bool isSubStructure(TreeNode* A, TreeNode* B) {
        if(!B || !A) {
            return false;
        }
        if(check(A, B)) {
            return true;
        }
        if(isSubStructure(A->left,B) || isSubStructure(A->right,B)){
            return true;
        }
        return false;
    }
    // 检查 a 是否包含 b, 必须各自以 a、b 为根
    bool check(TreeNode* a,TreeNode* b){
        if(!b){
            return true;
        }
        if(!a){
            return false;
        }
        return a->val==b->val && check(a->left,b->left) && check(a->right,b->right);
    }
};
```



#### [剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

```cpp
class Solution {
public:
    TreeNode* mirrorTree(TreeNode* root) {
        if(root == nullptr) return nullptr;
        swap(root->left, root->right);
        mirrorTree(root->left);
        mirrorTree(root->right);
        return root;
    }
};
```





#### [剑指 Offer 28. 对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        return check(root, root);
    }

    bool check(TreeNode* a, TreeNode* b) {
        if(a == nullptr && a == nullptr) return true;
        if((a && !b) || (!a && b)) return false;
        return a->val == b->val && check(a->left, b->right) && check(a->right, b->left);  
    }

};
```





#### [剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)



循环不变量

```cpp
class Solution {
public:
    vector<int> exchange(vector<int>& nums) {
        // [0 , i] [i + 1,..]
        int i = -1;
        for(int j = 0; j < nums.size(); j++) {
            if(nums[j]&1) {
                swap(nums[++i], nums[j]);
            }
        }
        return nums;
    }
};
```







#### [剑指 Offer 29. 顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)



```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& g) {
        vector<int> ans;
        int m = g.size();
        if(m == 0) return ans;
        int n = g[0].size();
        int cnt = 0;
        int left = 0, right = n - 1, high = 0, low = m - 1; 
        while(cnt < m * n) {
            // 注意对 cnt 的限制
            for(int j = left; j <= right && cnt < m * n; j++) {
                ans.push_back(g[high][j]);
                ++cnt;
            }
            for(int i = high + 1; i <= low && cnt < m * n; i++) {
                ans.push_back(g[i][right]);
                ++cnt;
            }
            for(int j = right - 1; j >= left && cnt < m * n; j--) {
                ans.push_back(g[low][j]);
                ++cnt;
            }
            for(int i = low - 1; i >= high + 1 && cnt < m * n; i--) {
                ans.push_back(g[i][left]);  
                ++cnt;
            }
            ++left;
            --right;
            ++high;
            --low;
        }
        return ans;
    }
};
```





#### [剑指 Offer 19. 正则表达式匹配](https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/)



unfinished



```cpp
class Solution {
public:
    bool f[30][40] = {0};
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        s = " " + s;
        p = " " + p;
        f[0][0] = 1;

        auto ok = [&](int i, int j) {
            if(i == 0 || j == 0) return false;
            return p[j] == '.' || s[i] == p[j];
        };

        for(int i = 0; i <= m; i++) {
            for(int j = 1; j <= n; j++) {
                if(p[j] == '*') {
                    f[i][j] = f[i][j - 2]; // 题给数据保证不越界
                    if(ok(i, j - 1)) {
                        f[i][j] |= f[i - 1][j];
                    }
                } else {
                    f[i][j] = ok(i, j) ? f[i - 1][j - 1] : false;
                }
            }
        }
        return f[m][n];
    }
};
```





#### [剑指 Offer 17. 打印从1到最大的n位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)



```cpp
class Solution {
public:
    vector<int> printNumbers(int n) {
        string s = "1" , x = "0";
        for(int i = 0; i < n; i++) s += "0", x+= "0";
        incr(x);
        vector<int> ans;
        while(x < s){
            ans.push_back(stoi(x));
            incr(x);
        }
        return ans;
    }

    // 去除前导 0 
    string pretty(string &s){
        int i = 0;
        while(i<s.size() && s[i] == '0') i++;
        if(i == s.size()){
            return "0";
        }
        return s.substr(i);
    }

    void incr(string &s){
        int j = s.size() - 1;
        // 子串的低位 对应 数字的高位
        while(j >= 0) {
            int cnt = s[j] - '0' + 1; // 既有可能一开始加的 1 ，也要可能是进位上来的 1 
            if(cnt < 10){
                ++s[j]; // 字符的增加
                break;
            }
            s[j--] = '0';
        }
    }
};
```





#### [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* res = NULL;
        ListNode* p = head;
        while(p) {
            auto q = p->next;
            p->next = res;
            res = p;
            p = q;
        }
        return res;
    }
};
```





#### [剑指 Offer 30. 包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)



```java
class MinStack {

  
  	// min是一个单调减的栈
    Deque<Integer> st = new ArrayDeque<Integer>(), min = new ArrayDeque<Integer>(); 
  	
    public MinStack() {

    }
    
    public void push(int x) {
        st.push(x);
        if(min.isEmpty()|| min.peek() >= x) {
            min.push(x);
        }
    }
    
    public void pop() {
        int x = st.pop();
        if(x == min.peek()) {
            min.pop();
        }
    }
    
    public int top() {
        return st.peek();
    }
    
    public int min() {
        return min.peek();
    }
}

```





#### [剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)



```cpp
class Solution {
public:
    vector<int> ans;
    vector<int> getLeastNumbers(vector<int>& arr, int k) {
        qsort(arr, 0, (int)arr.size() - 1, k);
        return ans;
    }
    
    void qsort(vector<int>& a, int l, int r, int k) {
        if(l > r || k <= 0) return; // 注意 k <= 0
        int i = l - 1, j = r + 1, x = a[(l + r) / 2];
        while(i < j) {
            do { ++i; } while(a[i] < x);
            do { --j; } while(a[j] > x);
            if(i < j) {
                swap(a[i], a[j]);
            }
        }
        if(k >= j - l + 1) { // 注意这里是 >= (否则下面会递归爆栈)
            for(int idx = l; idx <= j; idx++) {
                ans.push_back(a[idx]);
            }
            qsort(a, j + 1, r, k - (j - l + 1));
        } else {
            qsort(a, l, j, k);
        }
    }
};
```



#### [剑指 Offer 41. 数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)



unfinished



```java
class MedianFinder {

    PriorityQueue<Integer> pq1, pq2;


    /** initialize your data structure here. */
    public MedianFinder() {
        pq1 = new PriorityQueue<>((o1, o2) -> o2 - o1);
        pq2 = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        if(pq1.size() == pq2.size()) {
            pq2.offer(num);
            pq1.offer(pq2.poll());
        } else {
            pq1.offer(num);
            pq2.offer(pq1.poll());   
        }
    }
    
    public double findMedian() {
        if(pq1.size() == pq2.size()) {
            double res = (pq1.peek() + pq2.peek()) / 2.0;
            return res;
        }
        return pq1.peek();
    }
}
```







#### [剑指 Offer 31. 栈的压入、弹出序列](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)



```cpp
// 模拟就好
class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        stack<int> st;
        int pos = 0;
        for(int x : pushed) {
            st.push(x);
            // 能出栈就立即出栈，否则后面进栈的元素就会影响顺序
            while(!st.empty() && st.top() == popped[pos] ){
                st.pop();
                ++pos;
            }
        }
        return st.empty();
    }
};
```





#### [剑指 Offer 42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

前缀和

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int ans = -1e9, preMin = 0;
        int cnt = 0;
        for(int x : nums) {
            cnt += x;
            ans = max(ans, cnt - preMin);
            preMin = min(preMin, cnt);
        }
        return ans;
    }
};
```





#### [剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)



```cpp

```





#### [剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)



领导者算法

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int leader, cnt = 0;
        for(int i = 0; i < nums.size(); i++) {
            if(cnt == 0) {
                cnt = 1;
                leader = nums[i];
            } else {
                if(nums[i] == leader) {
                    ++cnt;
                } else {
                    --cnt;
                }
            }
        }
        return leader;
    }
};
```







#### [剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)



```cpp
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        // 层次遍历这棵树，null 值使用 “ ”表示
        List<String> list = new ArrayList<>();
        Deque<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()) {
            TreeNode node = q.poll();
            if(node == null) {
                list.add(" ");
                continue;
            } else {
                list.add("" + node.val);
            }
            q.offer(node.left);
            q.offer(node.right);
        }
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < list.size(); i++) {
            if(i > 0) {
                sb.append(",");
            }
            sb.append(list.get(i));
        }
        return sb.toString();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        int pos = 0;
        String[] split = data.split(",");
        if(split.length == 0 || " ".equals(split[0])) return null;
        TreeNode root = new TreeNode(Integer.parseInt(split[pos++]));
        // 如何重建这棵树？
        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while(q.size() > 0) {
            int size = q.size();
            int len = size;
            List<TreeNode> list = new ArrayList<>();
            List<String> valList = new ArrayList<>();
            // 一次性取出这一层所有的节点，以及用于构建左右子树的字符串
            while(size-- > 0) {
                list.add(q.poll());
                valList.add(split[pos++]);
                valList.add(split[pos++]);
            }
            for(int i = 0; i < len; i++) {
                TreeNode node = list.get(i);
                String leftS = valList.get(i * 2);
                String rightS = valList.get(i * 2 + 1);
                node.left = node.right = null;
                if(!" ".equals(leftS)) {
                    node.left = new TreeNode(Integer.parseInt(leftS));
                    q.offer(node.left);
                }
                if(!" ".equals(rightS)) {
                    node.right = new TreeNode(Integer.parseInt(rightS));
                    q.offer(node.right);
                }              
            }
        }
        return root;
    }
}
```





#### [剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)

unfinished

```cpp
class Solution {
public:
    Node *first = nullptr, *last = nullptr; 
    Node* treeToDoublyList(Node* root) {
        if(root == nullptr) return nullptr;
        help(root);
        // 循环链表的要求
        first->left = last;
        last->right = first;  
        return first;
    }

    void help(Node* root) {
        if(!root) return;
        help(root->left);
        if(last) {
            last->right = root;
            root->left = last;
            last = root;
        } else {
            first = last = root;
        }
        help(root->right);
    }
};
```



#### [剑指 Offer 38. 字符串的排列](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/)



关键是如何去重（当然不能使用set）



```cpp
class Solution {
public:
    vector<string> ans;
    int len;
    string s,temp;
    vector<bool> vis;
    vector<string> permutation(string s) {
        // 将字符排序（用于去重）
        sort(s.begin(),s.end());
        this->s = s;
        len = s.size();
        vis = vector<bool>(len,false);
        dfs(0);
        return ans;
    }

    void dfs(int pos) {
        if(pos == len) {
            ans.push_back(temp);
            return;
        }
        for(int i = 0; i < len; i++) {
            if(!vis[i]) {
                // 判断条件注意一下
                // 比如有两个相同字符 c，这两个可以接连选，当然也可以接连不选（也就是11 、00都是可以接受的）
                // 但是 10、01只能要一个，我们选择 10
                if(i > 0 && s[i] == s[i-1] && !vis[i-1]) continue; // key point
                temp.push_back(s[i]);
                vis[i] = 1;
                dfs(pos+1);
                temp.pop_back();
                vis[i] = 0;
            }
        }
    }

};
```





#### [剑指 Offer 43. 1～n 整数中 1 出现的次数](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)



```cpp
class Solution {
public:
    int countDigitOne(int n) {
        int ans = 0;
        for(long long mul = 1; n >= mul; mul *= 10) {
            ans += (n/(mul * 10)) * mul;
            ans += min(max( n % (mul * 10) - mul + 1, 0LL), mul); // 0LL 表示 long long 的整形量
        }
        return ans;
    }
};
```







#### [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)



unfinished

```cpp
class Solution {
public:
    unordered_map<Node*, Node*> cachedNode;

    Node* copyRandomList(Node* head) {
        if (head == nullptr) {
            return nullptr;
        }
        if (!cachedNode.count(head)) {
            Node* headNew = new Node(head->val);
            cachedNode[head] = headNew;
            headNew->next = copyRandomList(head->next);
            headNew->random = copyRandomList(head->random);
        }
        return cachedNode[head];
    }
};

```
