export const data = JSON.parse("{\"key\":\"v-247a73d2\",\"path\":\"/docs/%E3%80%8A%E5%88%B7%E9%A2%98%E2%80%94%E2%80%94%E9%93%BE%E8%A1%A8%E3%80%8B.html\",\"title\":\"《刷题——链表》\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"《刷题——链表》\",\"date\":\"2023-01-09T04:28:05.000Z\",\"categories\":\"算法题\",\"tags\":null,\"description\":\"链表 链表中的节点每k个一组翻转 题：将给出的链表中的节点每 k 个一组翻转，返回翻转后的链表 如果链表中的节点数不是 k 的倍数，将最后剩下的节点保持原样 你不能更改节点中的值，只能更改节点本身。 class Solution { public: /** * * @param head ListNode类 * @param k int整型 * @return ListNode类 */ int len(ListNode* head) { int cnt = 0; while(head) { ++cnt; head = head-&gt;next; } return cnt; } ListNode* reverseKGroup(ListNode* head, int k) { // write code here ListNode *dum = new ListNode(-1), *cur = dum; ListNode* p = head; while(p) { int l = len(p); if(l &lt; k) { cur-&gt;next = p; break; } ListNode *res = nullptr, *q = p; // 头插 for(int i = 0; i &lt; k; i++) { auto nxt = q-&gt;next; q-&gt;next = res; res = q; q = nxt; } cur-&gt;next = res; // 接上 cur = p; // cur 移动 p = q; // p 移动 } return dum-&gt;next; } };\"},\"headers\":[{\"level\":2,\"title\":\"链表\",\"slug\":\"链表\",\"link\":\"#链表\",\"children\":[{\"level\":3,\"title\":\"链表中的节点每k个一组翻转\",\"slug\":\"链表中的节点每k个一组翻转\",\"link\":\"#链表中的节点每k个一组翻转\",\"children\":[]},{\"level\":3,\"title\":\"判断链表中是否有环（快慢指针）\",\"slug\":\"判断链表中是否有环-快慢指针\",\"link\":\"#判断链表中是否有环-快慢指针\",\"children\":[]},{\"level\":3,\"title\":\"环的入口\",\"slug\":\"环的入口\",\"link\":\"#环的入口\",\"children\":[]},{\"level\":3,\"title\":\"链表相交\",\"slug\":\"链表相交\",\"link\":\"#链表相交\",\"children\":[]},{\"level\":3,\"title\":\"删除给出链表中的重复元素\",\"slug\":\"删除给出链表中的重复元素\",\"link\":\"#删除给出链表中的重复元素\",\"children\":[]},{\"level\":3,\"title\":\"K路归并问题\",\"slug\":\"k路归并问题\",\"link\":\"#k路归并问题\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.71,\"words\":1113},\"filePathRelative\":\"docs/《刷题——链表》.md\",\"localizedDate\":\"2023年1月9日\",\"excerpt\":\"<h2> 链表</h2>\\n<h3> 链表中的节点每k个一组翻转</h3>\\n<p>题：将给出的链表中的节点每 k 个一组翻转，返回翻转后的链表\\n如果链表中的节点数不是 k 的倍数，将最后剩下的节点保持原样\\n你不能更改节点中的值，只能更改节点本身。</p>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">Solution</span> <span class=\\\"token punctuation\\\">{</span>\\n<span class=\\\"token keyword\\\">public</span><span class=\\\"token operator\\\">:</span>\\n    <span class=\\\"token doc-comment comment\\\">/**\\n     * \\n     * <span class=\\\"token keyword\\\">@param</span> <span class=\\\"token parameter\\\">head</span> ListNode类 \\n     * <span class=\\\"token keyword\\\">@param</span> <span class=\\\"token parameter\\\">k</span> int整型 \\n     * <span class=\\\"token keyword\\\">@return</span> ListNode类\\n     */</span>\\n    <span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">len</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">ListNode</span><span class=\\\"token operator\\\">*</span> head<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">int</span> cnt <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">while</span><span class=\\\"token punctuation\\\">(</span>head<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token operator\\\">++</span>cnt<span class=\\\"token punctuation\\\">;</span>\\n            head <span class=\\\"token operator\\\">=</span> head<span class=\\\"token operator\\\">-&gt;</span>next<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token keyword\\\">return</span> cnt<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token class-name\\\">ListNode</span><span class=\\\"token operator\\\">*</span> <span class=\\\"token function\\\">reverseKGroup</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">ListNode</span><span class=\\\"token operator\\\">*</span> head<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span> k<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token comment\\\">// write code here</span>\\n        <span class=\\\"token class-name\\\">ListNode</span> <span class=\\\"token operator\\\">*</span>dum <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">ListNode</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">,</span> <span class=\\\"token operator\\\">*</span>cur <span class=\\\"token operator\\\">=</span> dum<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token class-name\\\">ListNode</span><span class=\\\"token operator\\\">*</span> p <span class=\\\"token operator\\\">=</span> head<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">while</span><span class=\\\"token punctuation\\\">(</span>p<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">int</span> l <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">len</span><span class=\\\"token punctuation\\\">(</span>p<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>l <span class=\\\"token operator\\\">&lt;</span> k<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                cur<span class=\\\"token operator\\\">-&gt;</span>next <span class=\\\"token operator\\\">=</span> p<span class=\\\"token punctuation\\\">;</span>\\n                <span class=\\\"token keyword\\\">break</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token class-name\\\">ListNode</span> <span class=\\\"token operator\\\">*</span>res <span class=\\\"token operator\\\">=</span> nullptr<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token operator\\\">*</span>q <span class=\\\"token operator\\\">=</span> p<span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token comment\\\">// 头插</span>\\n            <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&lt;</span> k<span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                auto nxt <span class=\\\"token operator\\\">=</span> q<span class=\\\"token operator\\\">-&gt;</span>next<span class=\\\"token punctuation\\\">;</span>\\n                q<span class=\\\"token operator\\\">-&gt;</span>next <span class=\\\"token operator\\\">=</span> res<span class=\\\"token punctuation\\\">;</span>\\n                res <span class=\\\"token operator\\\">=</span> q<span class=\\\"token punctuation\\\">;</span>\\n                q <span class=\\\"token operator\\\">=</span> nxt<span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            cur<span class=\\\"token operator\\\">-&gt;</span>next <span class=\\\"token operator\\\">=</span> res<span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 接上</span>\\n            cur <span class=\\\"token operator\\\">=</span> p<span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// cur 移动</span>\\n            p <span class=\\\"token operator\\\">=</span> q<span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// p 移动</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token keyword\\\">return</span> dum<span class=\\\"token operator\\\">-&gt;</span>next<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
