---
title: Lua脚本以及在redis中使用lua
date: 2021-11-30 08:13:10
categories: Redis
tags:
  - lua
  - NoSQL
  - Redis
---



# 什么是lua

## Mac安装 lua

**安装**

```shell
brew search lua
brew install lua
```

**进入shell**

```shell
lua
```

**运行脚本文件**

```shell
chmod +x test_lua.lua
/test_lua.lua
```


# 基本语法

## 注释

**行注释**
```lua 
-- 这是注释
```


**段注释**
```lua
--[[
这是块注释
这是块注释
--]]
```





## 变量
## 全局变量
```lua
a = 1
print(b) -- 无初始值为 nil
```


### 局部变量

在redis脚本中不能使用全局变量，只能使用局部变量（其实是为了防止脚本之间相互影响）

```lua
local a = 1
local b
local c, d
local e, f, g = 1, 2, 3
```


## 数据类型

### 空

没有赋值的变量或者表的字段即为nil，空。

### 布尔

只有true，false。

### 数字

包括整数、浮点数，1、2.0、3.5e10

### 字符串

```lua
local s1 = 'a'
local s2 = "abc"
```



### 表

lua中唯一的数据结构，既可以当数组，也可以当字典。

```lua
a = {}
b = {1, 2, 3}
c = {'s1', 's2', 's3'}
d = {1, 's', 'a'}
c[1] -- 's1'
d[1] = d[1] + 1
```


**注意：Lua规定数组的索引从 1 开始的，而不是 0**



## 函数



```lua
function (函数列表)
  函数题
end 
```


例子1
```lua
function m(a,b)
  return a*b
end
```

递归
```lua
function fun(n)
  if n < 2 then return 1 end
  return fun(n - 2) + fun(n - 1)
end
```



## 控制语句

### if

```lua
 if(5>10) then
    print('10');
 elseif 15>10 then
     print('15');
 else
     print('0');
 end
```



### while 循环

```lua
while 条件表达式 do
  语句块
end
```



```lua
sum = 0
num = 1
-- 注意 do 和 end
while num <= 100 do
    sum = sum + num
    num = num + 1
end

print("sum =",sum)
```



### for 循环

```lua 
for 变量 = 初值, 终值, 步长 do
  语句块
end  
```

```lua
sum = 0
-- 默认步长是1
for i = 1, 100 do
    sum = sum + i
end
```



另一个格式

```lua
for var1, var2, ..., varn in 迭代器 do
  语句块
end
```





**表的遍历**

```lua
a = {1, 3, 5, 7}

-- #获取表的长度
for i = 1, #a do
  print(i)
  print(a[i])
end


-- 使用 ipairs
for index, value in ipairs(a) do
  print(index)
  print(value)
end
```



# 常用库

## String库

1. 获取长度
```lua
a = 'abc'
print(#a) -- 长度为3
print(string.len('abc'))
```



2. 大小写转换
```lua
string.lower(s)
string.upper(s)
```


3. 子串
```lua
-- 闭区间，end可以取到
string.sub(s, start, [,end])
```



## Table 库

暂略。



## Math 库

```lua
math.max(x, ...)
math.min(x, ...)
math.abs(x)
```





# Redis和Lua

### lua使用redis

在lua脚本使用`redis.call`

```lua
redis.call('set','key1','val1')
local v = redis.call('get', 'key2')
return v
```

### redis-cli中使用lua

```shell
EVAL script numkeys key [key ...] arg [arg ...]
```



### KEYS 和 ARGV

使用 `KEYS`获取键，使用`ARGV`获取值。

> 注意索引从 1 开始。



### 原子性和执行时间

Redis执行lua脚本是原子的，也就是在一个脚本执行期间不会执行其他命令。

所有其他的命令都必须在脚本执行完成后才能执行。

为了防止一个脚本执行时间太长，Redis提供`lua-time-limit`限制脚本的最长运行时间（默认是 5 秒），

时间到了，就可以接受其他命令，但这个脚本的执行就无法无确保原子性了，因为它还没有只执行完。

