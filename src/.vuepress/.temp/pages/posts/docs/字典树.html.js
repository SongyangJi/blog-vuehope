export const data = JSON.parse("{\"key\":\"v-b80d4092\",\"path\":\"/posts/docs/%E5%AD%97%E5%85%B8%E6%A0%91.html\",\"title\":\"字典树 —— Trie\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"字典树 —— Trie\",\"date\":\"2022-09-13T16:14:57.000Z\",\"categories\":\"数据结构\",\"tags\":null,\"description\":\"字典树介绍 又称前缀树，Trie树，是一种多叉树。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串）。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较。 它的最基本的操作是插入一个字符串，和查询。 存储原理 多叉树结构： 一般的，如果我们想存储一棵一般的树，树的节点可以这样写： struct OrdinaryTrieNode{ \\tint val; \\tvector&lt;OrdinaryTrieNode*&gt; childs; };\"},\"headers\":[{\"level\":2,\"title\":\"代码部分的几处重要点\",\"slug\":\"代码部分的几处重要点\",\"link\":\"#代码部分的几处重要点\",\"children\":[]},{\"level\":2,\"title\":\"典型例题\",\"slug\":\"典型例题\",\"link\":\"#典型例题\",\"children\":[]}],\"readingTime\":{\"minutes\":6.36,\"words\":1908},\"filePathRelative\":\"posts/docs/字典树.md\",\"localizedDate\":\"2022年9月14日\",\"excerpt\":\"<h1> 字典树介绍</h1>\\n<p>又称<strong>前缀树</strong>，Trie树，是一种多叉树。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串）。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较。\\n它的最基本的操作是插入一个字符串，和查询。</p>\\n<h1> 存储原理</h1>\\n<p>多叉树结构：\\n一般的，如果我们想存储一棵一般的树，树的节点可以这样写：</p>\\n<div class=\\\"language-cpp line-numbers-mode\\\" data-ext=\\\"cpp\\\"><pre class=\\\"language-cpp\\\"><code><span class=\\\"token keyword\\\">struct</span> <span class=\\\"token class-name\\\">OrdinaryTrieNode</span><span class=\\\"token punctuation\\\">{</span>\\n\\t<span class=\\\"token keyword\\\">int</span> val<span class=\\\"token punctuation\\\">;</span>\\n\\tvector<span class=\\\"token operator\\\">&lt;</span>OrdinaryTrieNode<span class=\\\"token operator\\\">*</span><span class=\\\"token operator\\\">&gt;</span> childs<span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
