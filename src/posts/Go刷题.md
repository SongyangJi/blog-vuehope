---
title: Go刷题
date: 2022-12-06 09:17:05
cagegories: Go
tags:
  - Go
  - 刷题
---

字符串



# 1805. 字符串中不同整数的数目
https://leetcode.cn/problems/number-of-different-integers-in-a-string/solutions/



```go
func numDifferentIntegers(word string) int {
    cs := []rune(word)
    for i := 0; i < len(cs); i++ {
        if !(cs[i] >= '0' && cs[i] <= '9') {
            cs[i] = ' '
        }
    }
    word = string(cs)
    splits := strings.Split(word, " ")
    
    f := func(s string) string {
        for len(s) > 1 {
            if !strings.HasPrefix(s, "0") {
                break
            }
            s = strings.TrimPrefix(s, "0")
        }
        return s
    }
    for i, s := range splits {
        splits[i] = f(s)
    }
    
    m := make(map[string]int)
    for _, s := range splits {
        if len(s) > 0 {
            m[s]++
        }
    }
    return len(m)
}
```



一次遍历，且原地完成

```go
func numDifferentIntegers(word string) int {
    s := map[string]bool{}
    n := len(word)
    p1 := 0
    for {
        for p1 < n && !unicode.IsDigit(rune(word[p1])) {
            p1++
        }
        if p1 == n {
            break
        }
        p2 := p1
        for p2 < n && unicode.IsDigit(rune(word[p2])) {
            p2++
        }
        for p2-p1 > 1 && word[p1] == '0' { // 去除前导 0
            p1++
        }
        s[word[p1:p2]] = true
        p1 = p2
    }
    return len(s)
}
```

