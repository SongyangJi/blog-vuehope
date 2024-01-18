export const data = JSON.parse("{\"key\":\"v-6dfd421c\",\"path\":\"/docs/%E4%B8%80%E4%BA%9B%E8%BF%98%E4%B8%8D%E9%94%99%E7%9A%84%E9%A2%98-4.html\",\"title\":\"一些还不错的题-4\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"一些还不错的题-4\",\"date\":\"2022-07-20T00:00:03.000Z\",\"categories\":\"算法题\",\"description\":\"二叉树 二叉树第K小 给定一棵结点数为n 二叉搜索树，请找出其中的第 k 小的TreeNode结点值。 1.返回第k小的节点值即可 2.不能查找的情况，如二叉树为空，则返回-1，或者k大于n等等，也返回-1 3.保证n个节点的值不一样 class Solution { public: int cnt = 0; int ans = -1; int k; int KthNode(TreeNode* proot, int k) { if(proot == nullptr) { return -1; } this-&gt;k = k; dfs(proot); return ans; } void dfs(TreeNode* root) { if(root == nullptr) { return; } dfs(root-&gt;left); ++cnt; if(cnt == k) { ans = root-&gt;val; } dfs(root-&gt;right); } };\"},\"headers\":[{\"level\":2,\"title\":\"二叉树\",\"slug\":\"二叉树\",\"link\":\"#二叉树\",\"children\":[{\"level\":3,\"title\":\"二叉树第K小\",\"slug\":\"二叉树第k小\",\"link\":\"#二叉树第k小\",\"children\":[]}]},{\"level\":2,\"title\":\"DP\",\"slug\":\"dp\",\"link\":\"#dp\",\"children\":[{\"level\":3,\"title\":\"扔鸡蛋\",\"slug\":\"扔鸡蛋\",\"link\":\"#扔鸡蛋\",\"children\":[]},{\"level\":3,\"title\":\"NC122 正则表达式匹配\",\"slug\":\"nc122-正则表达式匹配\",\"link\":\"#nc122-正则表达式匹配\",\"children\":[]},{\"level\":3,\"title\":\"NC135 买卖股票的最好时机(三)\",\"slug\":\"nc135-买卖股票的最好时机-三\",\"link\":\"#nc135-买卖股票的最好时机-三\",\"children\":[]},{\"level\":3,\"title\":\"NC167 买卖股票的最好时机(四)\",\"slug\":\"nc167-买卖股票的最好时机-四\",\"link\":\"#nc167-买卖股票的最好时机-四\",\"children\":[]},{\"level\":3,\"title\":\"NC44通配符匹配\",\"slug\":\"nc44通配符匹配\",\"link\":\"#nc44通配符匹配\",\"children\":[]},{\"level\":3,\"title\":\"NC173 填充数组\",\"slug\":\"nc173-填充数组\",\"link\":\"#nc173-填充数组\",\"children\":[]},{\"level\":3,\"title\":\"NC178 打家劫舍(三)\",\"slug\":\"nc178-打家劫舍-三\",\"link\":\"#nc178-打家劫舍-三\",\"children\":[]},{\"level\":3,\"title\":\"NC196 编辑距离(一)\",\"slug\":\"nc196-编辑距离-一\",\"link\":\"#nc196-编辑距离-一\",\"children\":[]},{\"level\":3,\"title\":\"NC187 压缩字符串(二)\",\"slug\":\"nc187-压缩字符串-二\",\"link\":\"#nc187-压缩字符串-二\",\"children\":[]}]},{\"level\":2,\"title\":\"二分\",\"slug\":\"二分\",\"link\":\"#二分\",\"children\":[{\"level\":3,\"title\":\"两个有序数组找topk\",\"slug\":\"两个有序数组找topk\",\"link\":\"#两个有序数组找topk\",\"children\":[]},{\"level\":3,\"title\":\"NC164 最长上升子序列(二)\",\"slug\":\"nc164-最长上升子序列-二\",\"link\":\"#nc164-最长上升子序列-二\",\"children\":[]}]},{\"level\":2,\"title\":\"回溯\",\"slug\":\"回溯\",\"link\":\"#回溯\",\"children\":[{\"level\":3,\"title\":\"数独\",\"slug\":\"数独\",\"link\":\"#数独\",\"children\":[]},{\"level\":3,\"title\":\"NC182 单词拆分(二)\",\"slug\":\"nc182-单词拆分-二\",\"link\":\"#nc182-单词拆分-二\",\"children\":[]}]},{\"level\":2,\"title\":\"栈\",\"slug\":\"栈\",\"link\":\"#栈\",\"children\":[{\"level\":3,\"title\":\"NC171 直方图内最大矩形\",\"slug\":\"nc171-直方图内最大矩形\",\"link\":\"#nc171-直方图内最大矩形\",\"children\":[]},{\"level\":3,\"title\":\"NC237 最大矩形\",\"slug\":\"nc237-最大矩形\",\"link\":\"#nc237-最大矩形\",\"children\":[]},{\"level\":3,\"title\":\"NC240 计算器(一)\",\"slug\":\"nc240-计算器-一\",\"link\":\"#nc240-计算器-一\",\"children\":[]}]},{\"level\":2,\"title\":\"其他\",\"slug\":\"其他\",\"link\":\"#其他\",\"children\":[]}],\"readingTime\":{\"minutes\":15.47,\"words\":4641},\"filePathRelative\":\"docs/一些还不错的题-4.md\",\"localizedDate\":\"2022年7月20日\",\"excerpt\":\"<h2> 二叉树</h2>\\n<h3> 二叉树第K小</h3>\\n<p>给定一棵结点数为n 二叉搜索树，请找出其中的第 k 小的TreeNode结点值。</p>\\n<p>1.返回第k小的节点值即可</p>\\n<p>2.不能查找的情况，如二叉树为空，则返回-1，或者k大于n等等，也返回-1</p>\\n<p>3.保证n个节点的值不一样</p>\\n<div class=\\\"language-cpp line-numbers-mode\\\" data-ext=\\\"cpp\\\"><pre class=\\\"language-cpp\\\"><code><span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">Solution</span> <span class=\\\"token punctuation\\\">{</span>\\n<span class=\\\"token keyword\\\">public</span><span class=\\\"token operator\\\">:</span> \\n    <span class=\\\"token keyword\\\">int</span> cnt <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span> ans <span class=\\\"token operator\\\">=</span> <span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span> k<span class=\\\"token punctuation\\\">;</span>\\n    \\n    <span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">KthNode</span><span class=\\\"token punctuation\\\">(</span>TreeNode<span class=\\\"token operator\\\">*</span> proot<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span> k<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>proot <span class=\\\"token operator\\\">==</span> <span class=\\\"token keyword\\\">nullptr</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">return</span> <span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token keyword\\\">this</span><span class=\\\"token operator\\\">-&gt;</span>k <span class=\\\"token operator\\\">=</span> k<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token function\\\">dfs</span><span class=\\\"token punctuation\\\">(</span>proot<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">return</span> ans<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">dfs</span><span class=\\\"token punctuation\\\">(</span>TreeNode<span class=\\\"token operator\\\">*</span> root<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>root <span class=\\\"token operator\\\">==</span> <span class=\\\"token keyword\\\">nullptr</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">return</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token function\\\">dfs</span><span class=\\\"token punctuation\\\">(</span>root<span class=\\\"token operator\\\">-&gt;</span>left<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token operator\\\">++</span>cnt<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>cnt <span class=\\\"token operator\\\">==</span> k<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            ans <span class=\\\"token operator\\\">=</span> root<span class=\\\"token operator\\\">-&gt;</span>val<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token function\\\">dfs</span><span class=\\\"token punctuation\\\">(</span>root<span class=\\\"token operator\\\">-&gt;</span>right<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n        \\n<span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
