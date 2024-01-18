---
title: LeetCode 卖股票六道题
date: 2021-12-08 18:43:53
categories: 算法题
tags:
  - LeetCode
  - DP
---





# [121.买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/submissions/)
DP的阶段就是天数，记录下历史最低价格，用新出现的价格更新答案，并更新历史最小值。
时间复杂度：
$O(n)$

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int ans = 0, m = INT_MAX;
        for(int i=0;i<prices.size();i++){
            ans = max(ans,prices[i]-m);
            m = min(m,prices[i]);
        }
        return ans;
    }
};
```

这里提供一个更直观的解法。
时间复杂度：$O(n*log(n))$
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int ans = 0;
        multiset<int> ms;
        for(int x:prices){
            ms.insert(x);
        }
        for(int i=0;i<prices.size();i++){
            ms.erase(ms.find(prices[i]));
            if(!ms.empty()) ans = max(ans,*ms.rbegin()-prices[i]);
        }
        return ans;
    }
};
```

# [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
累积每个单调升序端一头一尾的差值。
```cpp
class Solution {
public:
    int maxProfit(vector<int>& a) {
        int ans = 0 , n = a.size();
        int l = 0;
        for(int i=1;i<n;i++){
            if(a[i]<a[i-1]){
                ans += a[i-1]-a[l];
                l = i;
            }
        }
        ans += max(0,a[n-1]-a[l]);
        return ans;
    }
};
```
有点**差分**的感觉。
```cpp
class Solution {
public:
    int maxProfit(vector<int>& a) {
        int ans = 0 ;
        for(int i=1;i<a.size();i++){
            ans += max(0,a[i]-a[i-1]);
        }
        return ans;
    }
};
```
+ DP
```cpp
class Solution {
public:
    int maxProfit(vector<int>& a) {
        int n = a.size();
        if(n<2) return 0;
        vector<vector<int>> dp(n,vector<int>(2));
        dp[0][0] = 0;
        dp[0][1] = -a[0];
        for(int i=1;i<n;i++){
            dp[i][0] = max(dp[i-1][0],dp[i-1][1]+a[i]);
            dp[i][1] = max(dp[i-1][1],dp[i-1][0]-a[i]);
        }
        return dp[n-1][0];
    }
};
```

# [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)
上一问的DP的延续。
```cpp
class Solution {
public:
    int maxProfit(vector<int>& a, int fee) {
        int n = a.size();
        if(n<2) return 0;
        vector<vector<int>> dp(n,vector<int>(2));
        dp[0][0] = 0;
        dp[0][1] = -a[0];
        for(int i=1;i<n;i++){
            dp[i][0] = max(dp[i-1][0],dp[i-1][1]+a[i]-fee);
            dp[i][1] = max(dp[i-1][1],dp[i-1][0]-a[i]);
        }
        return dp[n-1][0];
    }
};
```


# [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
自己的代码，但是思路并不是很清晰，还WA了好几次，主要是初值设置。

+ 截取了一段网友的思路，很清晰：
一天结束时，可能有持股、可能未持股、可能卖出过1次、可能卖出过2次、也可能未卖出过
所以定义状态转移数组dp[天数][当前是否持股][卖出的次数]

具体一天结束时的6种状态：
① 未持股，未卖出过股票：说明从未进行过买卖，利润为0
$dp[i][0][0]=0$
② 未持股，卖出过1次股票：可能是今天卖出，也可能是之前卖的（昨天也未持股且卖出过）
$dp[i][0][1]=max(dp[i-1][1][0]+prices[i],dp[i-1][0][1])$
③ 未持股，卖出过2次股票:可能是今天卖出，也可能是之前卖的（昨天也未持股且卖出过）
$dp[i][0][2]=max(dp[i-1][1][1]+prices[i],dp[i-1][0][2])$
④ 持股，未卖出过股票：可能是今天买的，也可能是之前买的（昨天也持股）
$dp[i][1][0]=max(dp[i-1][0][0]-prices[i],dp[i-1][1][0])$
⑤ 持股，卖出过1次股票：可能是今天买的，也可能是之前买的（昨天也持股）
$dp[i][1][1]=max(dp[i-1][0][1]-prices[i],dp[i-1][1][1])$
⑥ 持股，卖出过2次股票：最多交易2次，这种情况不存在
$dp[i][1][2]=float('-inf')$

```cpp
class Solution {
public:
    int maxProfit(vector<int>& a) {
        int n = a.size();
        if(n<2) return 0;
        vector<vector<vector<int>>> dp(n,vector<vector<int>>(2,vector<int>(3,0)));
        dp[0][1][0] = -a[0];
        dp[0][1][1] = -1e9;
        dp[0][1][2] = -1e9;
        for(int i=1;i<n;i++){
            for(int k=0;k<2;k++){
                dp[i][0][k+1] = max(dp[i-1][0][k+1],dp[i-1][1][k]+a[i]);
                dp[i][1][k] = max(dp[i-1][1][k],dp[i-1][0][k]-a[i]);
            }
        }
        return max(max(dp[n-1][0][1],dp[n-1][0][2]),0);
    }
};
```


# [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)
```cpp
class Solution {
public:
    int maxProfit(int K, vector<int>& a) {
        int n = a.size();
        if(n<2) return 0;
        if(K>=n/2){
            return maxProfit(a);
        }        
        vector<vector<vector<int>>> dp(n,vector<vector<int>>(2,vector<int>(K+1,0)));
        dp[0][1][0] = -a[0];
        for(int k=1;k<=K;k++){
            dp[0][1][k] = -1e9;
        }
        for(int i=1;i<n;i++){
            for(int k=0;k<K;k++){
                dp[i][0][k+1] = max(dp[i-1][0][k+1],dp[i-1][1][k]+a[i]);
                dp[i][1][k] = max(dp[i-1][1][k],dp[i-1][0][k]-a[i]);
            }
        }
        int ans = 0;
        for(int k=1;k<=K;k++){
            ans = max(ans,dp[n-1][0][k]);
        } 
        return ans;
    }
    int maxProfit(vector<int>& a) {
        int ans = 0 ;
        for(int i=1;i<a.size();i++){
            ans += max(0,a[i]-a[i-1]);
        }
        return ans;
    }
};
```


# [309.最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
用`dp[i][j][k]`其中i是角标;
j为0或1——表示这一天结束时是否拥有股票;
k也为0或1，表示这一天是否是交易日。
初始化为负无穷大。
```cpp
class Solution {
public:
    int maxProfit(vector<int>& a) {
        int n = a.size();
        if(n<2) return 0;
        vector<vector<vector<int>>> dp(n,vector<vector<int>>(2,vector<int>(2,-1e9)));
        dp[0][0][0] = 0;
        dp[0][1][0] = -a[0];
        for(int i=1;i<n;i++){
            // 买股票
            dp[i][1][0] = max(dp[i-1][1][0],dp[i-1][0][0]-a[i]);
            // 卖股票
            dp[i][0][0] = max(dp[i-1][0][0],dp[i-1][0][1]);
            dp[i][0][1] = dp[i-1][1][0]+a[i];
        }
        return max(dp[n-1][0][0],dp[n-1][0][1]);
    }
};
```

很明显空间可以进行一下压缩。但是可读性有点差了
```cpp
class Solution {
public:
    int maxProfit(vector<int>& a) {
        int n = a.size();
        if(n<2) return 0;
        int dp00 = 0,dp10 = -a[0],dp01=-1e9,dp_00,dp_01,dp_10;
        for(int i=1;i<n;i++){
            // 买股票
            dp_10 = max(dp10,dp00-a[i]);
            // 卖股票
            dp_00 = max(dp00,dp01);
            dp_01 = dp10+a[i];
            dp10 = dp_10;
            dp00 = dp_00;
            dp01 = dp_01;
        }
        return max(dp00,dp01);
    }
};
```
