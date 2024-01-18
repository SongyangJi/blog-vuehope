export const data = JSON.parse("{\"key\":\"v-76b61bbf\",\"path\":\"/posts/%E5%89%91%E6%8C%87Offer%E9%A2%98%E8%A7%A3-1.html\",\"title\":\"剑指Offer题解-1\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"剑指Offer题解-1\",\"date\":\"2021-12-03T14:29:19.000Z\",\"categories\":\"算法题\",\"tags\":[\"算法题\",\"剑指Offer\"],\"description\":\"剑指 Offer 09. 用两个栈实现队列 class CQueue { public: stack&lt;int&gt; st1,st2; CQueue() { } void appendTail(int value) { st1.push(value); } int deleteHead() { if(st1.size() + st2.size() == 0) return -1; // 将 st1 其中的元素全都取出来的，顺序就是FIFO的顺序了 if(st2.empty()){ while(!st1.empty()){ int val = st1.top(); st1.pop(); st2.push(val); } } int val = st2.top(); st2.pop(); return val; } };\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/%E5%89%91%E6%8C%87Offer%E9%A2%98%E8%A7%A3-1.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"剑指Offer题解-1\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"剑指 Offer 09. 用两个栈实现队列 class CQueue { public: stack&lt;int&gt; st1,st2; CQueue() { } void appendTail(int value) { st1.push(value); } int deleteHead() { if(st1.size() + st2.size() == 0) return -1; // 将 st1 其中的元素全都取出来的，顺序就是FIFO的顺序了 if(st2.empty()){ while(!st1.empty()){ int val = st1.top(); st1.pop(); st2.push(val); } } int val = st2.top(); st2.pop(); return val; } };\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"算法题\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"剑指Offer\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-12-03T14:29:19.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"剑指Offer题解-1\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-12-03T14:29:19.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":11.4,\"words\":3419},\"filePathRelative\":\"posts/剑指Offer题解-1.md\",\"localizedDate\":\"2021年12月3日\",\"excerpt\":\"<h4> <a href=\\\"https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">剑指 Offer 09. 用两个栈实现队列</a></h4>\\n<div class=\\\"language-cpp line-numbers-mode\\\" data-ext=\\\"cpp\\\"><pre class=\\\"language-cpp\\\"><code><span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">CQueue</span> <span class=\\\"token punctuation\\\">{</span>\\n<span class=\\\"token keyword\\\">public</span><span class=\\\"token operator\\\">:</span>\\n    stack<span class=\\\"token operator\\\">&lt;</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token operator\\\">&gt;</span> st1<span class=\\\"token punctuation\\\">,</span>st2<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token function\\\">CQueue</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">appendTail</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> value<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        st1<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">push</span><span class=\\\"token punctuation\\\">(</span>value<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">deleteHead</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>st1<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">+</span> st2<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">==</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">return</span> <span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token comment\\\">// 将 st1 其中的元素全都取出来的，顺序就是FIFO的顺序了</span>\\n        <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>st2<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">empty</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">while</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token operator\\\">!</span>st1<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">empty</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token keyword\\\">int</span> val <span class=\\\"token operator\\\">=</span> st1<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">top</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                st1<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">pop</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                st2<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">push</span><span class=\\\"token punctuation\\\">(</span>val<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token keyword\\\">int</span> val <span class=\\\"token operator\\\">=</span> st2<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">top</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        st2<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">pop</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">return</span> val<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
