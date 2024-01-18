---
title: 剑指Offer题解-2
date: 2021-12-06 13:34:17
categtories: 算法题
tags:
  - 算法题
  - 剑指Offer
---



#### [剑指 Offer 44. 数字序列中某一位的数字](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/)



unfinished

```cpp
class Solution {
public:
    int findNthDigit(int n) {
        int d = 1, mul = 1;
        // 重要点，一个 d 位数有 9*10^(d - 1)个，那么就一共有 d* 9*10^(d - 1) 位
        while(n > (long long )d * 9 * mul) {
            n -= d * 9 * mul; 
            ++d;
            mul *= 10;
        }
        // 0  1  2  3  4
        // 00 11 22 33 44
        int num = mul + (n - 1)/ d;  // 索引要 - 1
        int pos = (n - 1)% d;
        string s = to_string(num);
        return s[pos] - '0';
    }
};
```





#### [剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)



```cpp
class Solution {
public:
    bool ans = true;
    bool verifyPostorder(vector<int>& postorder) {
        help(postorder, 0, postorder.size() - 1);
        return ans;
    }

    void help(vector<int>& v, int l, int r) {
        if(l > r) return;
        int root = v[r];
        int pos = l;
        while(pos < r && v[pos] < root) ++pos;
        int idx = pos;
        for(int i = idx ; i <= r - 1; i++) {
            if(v[i] < root) {
                ans = false;
                return;
            }
        }
        help(v, l, idx - 1);
        help(v, idx, r - 1);
    }
};
```





#### [剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)



```cpp
class Solution {
public:     

    vector<vector<int>> ans;
    vector<int> temp;
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        if(!root) return ans;
        dfs(root,targetSum);
        return ans;
    }

    void dfs(TreeNode* root,int sum){
        temp.push_back(root->val);
        int s = sum - root->val;
        if(!root->left && !root->right && s == 0) {
            ans.push_back(temp);
            temp.pop_back(); // 回溯
            return;            
        }
        if(root->left) dfs(root->left, s);
        if(root->right) dfs(root->right, s);
        temp.pop_back(); // 回溯
    }

};
```



#### [剑指 Offer 57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)

双指针

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while(l < r) {
            int sum = nums[l] + nums[r];
            if(sum == target) {
                return {nums[l], nums[r]};
            } else if(sum < target) {
                l++;
            } else {
                r--;
            }
        }
        return {};
    }
};
```



#### [剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)



unfinished

```cpp
class Solution {
public:
    vector<int> singleNumbers(vector<int>& nums) {
        int res = 0;
        for(int x : nums) {
            res ^= x;
        }
        // 任意挑一个不为1的位，以此为依据分成两组
        int bit = 1;
        while((bit & res) == 0) {
            bit <<= 1;
        }
        int a = 0, b = 0;
        for(int x : nums) {
            // 这个 bit 就能把数字区分开成两组
            if(x & bit) {
                a ^= x;
            } else {
                b ^= x;
            }
        }
        return {a, b};
    }
};
```





#### [剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)



```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int cnt[32] = {0};
        // 对每一个数都统计一下每一个bit
        for(int x : nums) {
            // 从低位到高位依次提取
            for(int i = 0; i < 32; i++) {
                cnt[i] += (x >> i) & 1;
            }
        }
        int ans = 0;
        // 从低位到高位
        for(int i = 0; i < 32; i++) {
            if(cnt[i] % 3) {
                ans |= 1 << i;
            }
        }
        return ans;
    }
};
```



#### [剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)



unfinished（最简洁的写法）

```cpp
class Solution {
public:
    vector<int> b;
    int ans = 0;
    int reversePairs(vector<int>& nums) {
        b.resize(nums.size());
        help(nums, 0, nums.size() - 1);
        return ans;
    }

    void help(vector<int>& nums, int l, int r) {
        if(l >= r) return;
        int m = (l + r)/2;
        help(nums, l, m);
        help(nums, m + 1, r);
        int i = l, j = m + 1;
        for(int k = l; k <= r; k++) {
            if(j > r || i <= m && nums[i] <= nums[j]) b[k] = nums[i++];
            else {
                ans += m - i + 1;
                b[k] = nums[j++];
            }
        }
        for(int k = l; k <= r; k++) {
            nums[k] = b[k];
        }
    }

};
```



#### [剑指 Offer 45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)



```cpp
class Solution {
public:
    static bool cmp(const string& s1,const string &s2){
        string s12 = s1+s2;
        string s21 = s2+s1;
        return s12 < s21;
    }

    string minNumber(vector<int>& nums) {
        string ans = "";
        vector<string> ss;
        for(int x:nums){
            ss.push_back(to_string(x));
        }
        sort(ss.begin(), ss.end(),
            [](string&s1, string &s2) { return s1 + s2 < s2 + s1; }
        );
        for(string& s:ss){
            ans += s;
        }
        return ans;
    }
};
```







#### [剑指 Offer 57 - II. 和为s的连续正数序列](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)

滑动窗口

```cpp
class Solution {
public:
    vector<vector<int>> findContinuousSequence(int target) {
        vector<vector<int> > ans;
        for(int l = 1, r = 2; l < r;) {
            int sum = (l + r) * (r - l + 1) / 2;
            if(sum == target) {
                vector<int> a;
                for(int i = l; i <= r; i++) {
                    a.push_back(i);
                }
                ans.push_back(a);
                ++l; // l移动
            } else if(sum < target) {
                ++r;
            } else {
                ++l;
            }
        }
        return ans;
    }
};
```







#### [剑指 Offer 47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)

```cpp
class Solution {
public:
    int maxValue(vector<vector<int>>& g) {
        int m = g.size(), n = g[0].size();
        vector<vector<int> > f(m , vector<int>(n));
        // f[0][0] = grid[0][0];
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                int res = 0;
                res = max(res, g[i][j] + (i ? f[i - 1][j] : 0));
                res = max(res, g[i][j] + (j ? f[i][j - 1] : 0));
                f[i][j] = res;
            }
        }
        return f[m - 1][n - 1];
    }
};
```









#### [剑指 Offer 46. 把数字翻译成字符串](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)

记忆化搜索

```cpp
class Solution {
public:
    map<int, int> mp;
    int len;
    string s;
    int translateNum(int num) {
        s = to_string(num);
        len = s.size();
        return dfs(0);
    }

    int dfs(int i) {
        if(i == len) return 1;
        if(mp.count(i)) {
            return mp[i];
        }
        int res = 0;
        if(i + 1 <= len) {
            res += dfs(i + 1);
        }
        if(i + 2 <= len) {
            bool f = true;
            if(s[i] == '0') f = false;
            if((s[i] - '0') * 10 + s[i + 1] - '0' > 25) f = false;
            if(f) {
                res += dfs(i + 2);
            }
        }
        mp[i] = res;
        return res;
    }

};
```





```cpp
class Solution {
public:
    int translateNum(int num) {
        string s = to_string(num);
        int m = s.size();
        s = " " + s;
        int f[40] = {1}; // 空串的分割种数为 1
        for(int i = 1; i <= m; i++) {
            f[i] = f[i - 1];
            if(i >= 2) {
                int x = stoi(s.substr(i - 1, 2));
                if(x >= 10 && x <= 25) f[i] += f[i - 2];
            }
        }
        return f[m];
    }
};
```





#### [剑指 Offer 48. 最长不含重复字符的子字符串](https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)



```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        set<char> st;
        int ans = 0;
        int l = 0;
        for(int r = 0; r < s.size(); r++) {
            while(l < r && st.count(s[r])) {
                st.erase(s[l++]);
            }
            st.insert(s[r]);
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};
```



#### [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)



```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        auto l = lower_bound(nums.begin(), nums.end(), target);
        if(l == nums.end() || *l != target) {
            return 0;
        }
        auto r = upper_bound(nums.begin(), nums.end(), target);
        return r - l;
    }
};
```





#### [剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

unfinished

```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (headA == nullptr || headB == nullptr) {
            return nullptr;
        }
        ListNode *pA = headA, *pB = headB;
        while (pA != pB) {
            pA = pA == nullptr ? headB : pA->next;
            pB = pB == nullptr ? headA : pB->next;
        }
        return pA;
    }
};
```





#### [剑指 Offer 53 - II. 0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)



二分

```cpp
class Solution {
public:
    int missingNumber(vector<int>& a) {
        int l = 0 ,r = a.size() - 1;
        // 找到第一个错位的索引
        while(l < r){
            int m = l + (r - l) /2;
            if(a[m] == m){
                l = m + 1; 
            } else {
                r = m;
            }
        }
        return a[l] != l ? l : a.size(); 
    }
};
```







#### [剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)



不要使用中序遍历拿出所有的

```cpp
class Solution {
public:
    int ans, k ;
    int kthLargest(TreeNode* root, int k) {
        this->k = k;
        dfs(root);
        return ans;
    }

    void dfs(TreeNode* root) {
        if(!root || k <= 0) return;
        dfs(root->right);
        if(--k == 0) { // 没访问一个节点， --k
            ans = root->val;
        }
        dfs(root->left);
    }

};
```





#### [剑指 Offer 49. 丑数](https://leetcode-cn.com/problems/chou-shu-lcof/)

优先队列

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        set<long> vis;
        priority_queue<long, vector<long>, greater<long>> pq;
        pq.push(1);
        int a[] = {2, 3, 5};
        long ans = 1;
        while(n--) {
            ans = pq.top();
            pq.pop();
            for(int y : a) {
                long x = ans * y;
                if(!vis.count(x)) {
                    vis.insert(x);
                    pq.push(x);
                }
            }   
        }
        return ans;
    }
};
```





动态规划

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> dp(n + 1);
        dp[1] = 1;
        int p2 = 1, p3 = 1, p5 = 1;
        for (int i = 2; i <= n; i++) {
            int num2 = dp[p2] * 2, num3 = dp[p3] * 3, num5 = dp[p5] * 5;
            dp[i] = min(min(num2, num3), num5);
            if (dp[i] == num2) {
                p2++;
            }
            if (dp[i] == num3) {   // 注意是 if （去重）
                p3++;
            }
            if (dp[i] == num5) {
                p5++;
            }
        }
        return dp[n];
    }
};
```







#### [剑指 Offer 59 - II. 队列的最大值](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/)

```cpp
class MaxQueue {
public:
    queue<int> q;
    deque<int> dq; // 递减

    MaxQueue() {

    }
    
    int max_value() {
        if(dq.empty()) return -1;
        return dq.front();
    }
    
    void push_back(int value) {
        q.push(value);
        while(dq.size() && dq.back() < value) {
            dq.pop_back();
        }
        dq.push_back(value);
    }
    
    int pop_front() {
        if(q.empty()) return -1;
        int x = q.front(); 
        q.pop();
        if(dq.front() == x) dq.pop_front();
        return x;
    }
};
```





#### [剑指 Offer 59 - I. 滑动窗口的最大值](https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)

```cpp
class Solution {
public:
    deque<int> dq;
    queue<int> q;
    int K;
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        if(nums.empty()) return {};
        K = k;
        vector<int> ans;
        // 初始
        int i = 0;
        for(; i < k; i++) {
            add(nums[i]);
        }
        // 结果集大小
        int sz = nums.size() - k + 1;
        while(sz--) {
            ans.push_back(dq.front());
            if(i < nums.size()) add(nums[i++]);
        }
        return ans;
    }

    void add(int x) {
        q.push(x);
        while(dq.size() && dq.back() < x) {
            dq.pop_back();
        }
        dq.push_back(x);

        if(q.size() == K + 1) {
            int x = q.front();
            q.pop();
            if(x == dq.front()) dq.pop_front();
        }
    }

};
```







#### [剑指 Offer 65. 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)



```cpp
class Solution {
    public int add(int a, int b) {
        // 理论知识
        int sum = 0;
        int C = 0, S; // C表示临时进位，S表示临时结果
        int X, Y;
        for (int i = 0; i < 32; ++i) {
            X = a & 1;
            Y = b & 1;
            S = C ^ X ^ Y;
            C = (X&Y) | ((X | Y) & C); // key point
            sum = sum | (S << i);
            a >>= 1;
            b >>= 1;
        }
        return sum;
    }
}
```





#### [剑指 Offer 60. n个骰子的点数](https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/)



unfinished

```cpp
class Solution {
public:
    vector<double> dicesProbability(int n) {
        vector<double> dp(6, 1.0 / 6.0);
        for (int i = 2; i <= n; i++) {
            vector<double> tmp(5 * i + 1, 0);
            for (int j = 0; j < dp.size(); j++) {
                for (int k = 0; k < 6; k++) {
                    tmp[j + k] += dp[j] / 6.0; // 概率论的加法公式
                }
            }
            dp = tmp;
        }
        return dp;
    }
};
```





#### [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)



unfinished

```cpp
class Solution {
public:
    int lastRemaining(int n, int m) {
        int idx = 0;
        for(int len = 2; len <= n; len++) {
            // (m ---> 0, m + idx ---> idx) 模len意义下 
            // aka. old_idx = (new_idx + m) % len;
            idx = (m + idx) % len;
        }
        return idx;
    }
};
/*
0 1 2 3 4    2   3 
3 4 0 1      0   0      
1 3 4        4   1 
1 3          1   1        
3            -   0 
*/
```







#### [剑指 Offer 55 - II. 平衡二叉树](https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/)





```cpp

class Solution {
public:
    bool ans = true;
    bool isBalanced(TreeNode* root) {
        len(root);
        return ans;
    }

    int len(TreeNode* root) {
        if(!root) return 0;
        int llen = len(root->left);
        int rlen = len(root->right);
        if(abs(rlen - llen) > 1) {
            ans = false;
        }
        return max(llen, rlen) + 1;
    }

};
```







#### [剑指 Offer 61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)



```cpp
class Solution {
    public boolean isStraight(int[] nums) {
        int joker = 0;
        Arrays.sort(nums); // 数组排序
        for(int i = 0; i < 4; i++) {
            if(nums[i] == 0) joker++; // 统计大小王数量
            else if(nums[i] == nums[i + 1]) return false; // 若有重复，提前返回 false
        }
        return nums[4] - nums[joker] < 5; // 最大牌 - 最小牌 < 5 则可构成顺子
    }
}
```





#### [剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

unfinished

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(!root || root == p || root == q){
            return root;
        }
        TreeNode* lc = lowestCommonAncestor(root->left, p, q);
        TreeNode* rc = lowestCommonAncestor(root->right, p, q);
        if(!lc) return rc; //左边这棵树既没有p，也没有q，看右边即可
        if(!rc) return lc; //右边这棵树既没有p，也没有q，看左边即可
        // 如果左边一个、右边一个，root就是lca。
        return root; 
    }
};
```



#### [剑指 Offer 68 - I. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

或者使用更一般的做法

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(!root) return NULL;
        int val = root->val;
        if(p->val < val && q->val < val) return lowestCommonAncestor(root->left, p, q);
        if(p->val > val && q->val > val) return lowestCommonAncestor(root->right, p, q);
        return root;
    }
};
```





