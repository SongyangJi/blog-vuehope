---
title: Lambda表达式
date: 2021-11-28 19:34:21
categories: Cpp
tags:
  - cpp
---



# C++中lambda表达式

Lambda表达式包含一个函数对象参数

标识一个 Lambda 表达式的开始，这部分必须存在，不能省略。函数对象参数是传递给编译器自动生成的函数对象类的构造函数的。函数对象参数只能使用那些到定义 Lambda 为止时 Lambda 所在作用范围内可见的局部变量(包括 Lambda 所在类
的 this)。函数对象参数有以下形式：
+ 空。没有任何函数对象参数。
+ =。函数体内可以使用 Lambda 所在范围内所有可见的局部变量（包括 Lambda 所在类的 this），并且是值传递方式（相当于编译器自动为我们按值传递了所有局部变量）。
+ &。函数体内可以使用 Lambda 所在范围内所有可见的局部变量（包括 Lambda 所在类的 this），并且是引用传递方式（相当于是编译器自动为我们按引用传递了所有局部变量）。
+ this。函数体内可以使用 Lambda 所在类中的成员变量。


具体的使用方法示例：
  + `a`。将 a 按值进行传递。按值进行传递时，函数体内不能修改传递进来的 a 的拷贝，因为默认情况下函数是 const 的，要
    修改传递进来的拷贝，可以添加 mutable 修饰符。
  + `&a`。将 a 按引用进行传递。
  + `a，&b`。将 a 按值传递，b 按引用进行传递。
  + `[=]，&a，&b`。除 a 和 b 按引用进行传递外，其他参数都按值进行传递。
  + `[&]，a，b`。除 a 和 b 按值进行传递外，其他参数都按引用进行传递





sort使用lambda表达式：

```cpp
class Solution {
public:
    vector<vector<int>> allCellsDistOrder(int R, int C, int r0, int c0) {
        vector<vector<int>> ret;
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                ret.push_back({i, j});
            }
        }
        sort(ret.begin(), ret.end(), [=](vector<int>& a, vector<int>& b) {//因为r0,c0是当前函数的局部变量，所以只能使用值传递而不能使用引用传递造成指针混乱
            return abs(a[0] - r0) + abs(a[1] - c0) < abs(b[0] - r0) + abs(b[1] - c0);
        });
        return ret;
    }
};
```
