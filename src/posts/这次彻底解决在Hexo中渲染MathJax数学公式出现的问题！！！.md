---
title: 这次彻底解决在Hexo中渲染MathJax数学公式出现的问题！！！
date: 2021-07-21
categories: hexo
tags: 
  - hexo
  - 写作
---
好家伙，这个问题已经困扰我好几个小时了。
网上的做法众说纷纭，有相似的东西，也有不同的。
这次我汇总一下。

具体的原因和过程可以看[在Hexo中渲染MathJax数学公式](https://www.jianshu.com/p/7ab21c7f0674)这篇博客。

我遇到的问题是，在本地公式可以正常渲染。但是用hexo部署上去的时候，却又这么几种问题。

ok，分析一下几点原因。

1. **渲染引擎缺失**

渲染引擎更换一下。
```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

似乎装这一个就可以了，但是似乎还有人装其他引擎的。



2. **语义冲突**

进入项目更目录下：
```bash  
vim node_modules\kramed\lib\rules\inline.js
```

修改这么两行。

```js
//  escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,
  escape: /^\\([`*\[\]()#$+\-.!_>])/
```

```js
//  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/
```


3. **配置文件未将MathJax开启**

这一步操作有些不同，但操作差不多，就是开启MathJax渲染。

```yml
# Mathjax数学公式
mathjax: true

# Katex数学公式(allpost设置为false时只有头部设置math:true的文章才开启)
katex:
  enable: true
  allpost: true
  copy_tex: true
```


4. **公式语法有误**
如果上述操作全部完成，还是不能成功，看看有没有语法问题。


比如，我遇到的问题，如果在公式内连续使用两个花括号，必须加上空格。

如下面的会渲染失败。
```
$$L_p  = (\sum_{i=1}^m |x_i - y_i |^{p}  )^{{\tfrac{1}{p}}}$$
```
在连续的花括号之间加上空格即可。
```
$$L_p  = (\sum_{i=1}^m |x_i - y_i |^{p}  )^{ {\tfrac{1} {p} } }$$
```



