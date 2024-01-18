---
title: KMP算法 —— 知识点、模板、 应用
date: 2021-11-12 01:18:45
categories: 算法
tags:
  - 字符串算法
---

> 这里并不打算去详细推导KMP的原理，以及精髓。只是整理了一下KMP算法的模板、应用、理解的关键点。

# 基本功能
KMP算法最基本的应用就是字符串的匹配——给定一个text串，一个pattern串，询问pattern串在text串中是否出现，以及出现几次、位置等等。

# 模板
```cpp
class KMP{
    string pattern;
    int len ;
    vector<int> next;  // 这里的next数组是从1开始的

    // 也叫失配数组,next[i] 表示以第i位结尾的子串与模式串的前缀相同的最大长度（但不能是自身），也就是所谓的最长公共前后缀
    void Next(){
        next.resize(len+1);
        int j = 0;
        for(int i = 2; i <= len; i++) {
            while(j > 0 && pattern[i] != pattern[j + 1]) {
                j = next[j];
            }
            if(pattern[i] == pattern[j + 1]) {
                j++;
            }
            next[i] = j;
        }
    }

public:
    KMP(const string &pattern) {
        len = pattern.size();
        this->pattern = " " + pattern; 
        Next();
    }
    
    bool isSubstringOfText(const string& text) {
        return getPositions(text).size() > 0;
    }
    

    // 统计模式串在文本串出现的次数
    int getTimes(const string& text) {
        return getPositions(text).size();
    }
    
    // 统计模式串在文本串的出现的次数
    vector<int> getPositions(const string& text) {
        vector<int> res;
        if(text.size()  < len) return res;
        int j = 0;
        for(int i = 0; i < text.size(); i++){
            while (j > 0 && text[i] != pattern[j + 1]){
                j = next[j];
            }
            if(text[i] == pattern[j + 1]){
                j++;
            }
            if(j == len){
                // i 是匹配时文本串的位置（从0开始）
                res.push_back(i);
                j = next[j];
            }
        }
        return res;
    };
    

    // 求数组f[] 其中 f[i] 表示文本串以i结尾的子串与 pattern 串的前缀相同的最大长度（这里也是从1开始计数）
    vector<int> getFArray(const string& text) {
        int m = text.size(), j = 0;
        vector<int> f(m+1);
        for(int i= 0 ;i < m; i++){
            while(j > 0 && (j == len || text[i] != pattern[j + 1])) {
                j = next[j];
            }
            if(text[i] == pattern[j + 1]){
                j++;
            }
            f[i] = j;
        }
        return f;
    }

    const vector<int> &getNext() const {
        return next;
    }
};
```

# 知识点
+ 失配数组的求法以及含义。`next[]`
+ 模式匹配的结果数组。`f[]`
+ 从DFA(有限状态自动)的角度去理解。(对后面的AC自动机的理解大有裨益)

# 典型应用
+ 模式串和文本串的模式匹配。
+ 处理和前缀和后缀有关的问题。
+ 处理循环节方面的问题。