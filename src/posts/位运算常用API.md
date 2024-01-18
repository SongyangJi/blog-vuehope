---
title: 位运算常用API
date: 2023-01-02 20:43:20
categories: 算法
tags:
---





```cpp
#include <iostream>
using namespace std;


// 将某一位变成 1
void bitTo1(int x, int bit) {
    x |= 1 << bit
}

// 将某一位变成 0 
void bitTo0(int x, int bit) {
    x &= ~(1 << bit)
}

// y 是否是 x 的子集
bool checkSubset(int y,int x){
    return x-(x^y) == y;
}

// lowbit运算,求出最后一个的二进制状态下的1对应的十进制数值
int lowbit(int x){
    return x&-x;
}

// 统计 1 的个数
int count(int x){
    int cnt = 0;
    while(x>0){
        cnt++;
        x -= lowbit(x);
    }
    return cnt;
}

int _count(int x){
    int cnt = 0;
    while(x>0){
        if(x&1) cnt++;
        x >>= 1;
    }
    return cnt;
}

// 枚举子集
void subsets(int x){
    int cnt = 0;
    for (int i=x;i;i=(i-1)&x){
        cnt++;
        cout<<i<<endl;
        cout<<(checkSubset(i,x)?to_string(i)+"是"+to_string(x)+"的子集":"error")<<endl;
    }
    // 空集也是子集,所以还要加1
    cnt++;
}

int main() {
    subsets(123);
    return 0;
}
```

