export const data = JSON.parse("{\"key\":\"v-14aac170\",\"path\":\"/posts/docs/%E3%80%8A%E5%88%B7%E9%A2%98%E2%80%94%E2%80%94LRU%E3%80%81LFU%E3%80%8B.html\",\"title\":\"《刷题——LRU、LFU》\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"《刷题——LRU、LFU》\",\"date\":\"2023-01-09T15:14:59.000Z\",\"categories\":\"算法题\",\"tags\":null,\"description\":\"LRU 双向链表 + 哈希表 应该这样思考，比较合理。 使用双向链表去维护键值对的使用顺序，也就是将刚刚使用的键值对放在链表的头部。 但是，这样的单次操作复杂度是$O(n)$的。 如何优化，使用HashMap即可， 具体来说就是将键与链表的节点一一对应，这样就可以做到O(1)时间复杂度快速检索到关键节点。 class LRUCache { private int size; private int capacity; // 哨兵(哑结点，不存储任何有效值) private Node head, tail; private HashMap&lt;Integer, Node&gt; map; private static class Node { Node prev, next; // 双向 int key, val; public Node(int key,int val) { this.key = key; this.val = val; } public Node() { } } // 删除某个节点 private void removeNode(Node node) { Node p1 = node.prev; Node p2 = node.next; p1.next = p2; p2.prev = p1; } // moveToHead 的辅助函数 private void addToHead(Node node) { Node headNext = head.next; head.next = node; node.prev = head; node.next = headNext; headNext.prev = node; } \\t\\t// 将一个已有的节点移动到头部 private void moveToHead(Node node) { removeNode(node); addToHead(node); } public LRUCache(int capacity) { this.capacity = capacity; head = new Node(); // 哑结点的构造 tail = new Node(); head.next = tail; tail.prev = head; map = new HashMap&lt;&gt;(); } public int get(int key) { if (!map.containsKey(key)) return -1; Node node = map.get(key); moveToHead(node); // 移动到头 return node.val; } public void put(int key, int value) { Node node = map.get(key); if (node == null) { if (size &gt;= capacity) { Node last = tail.prev; // 删掉末尾项，也就是删除最不常用的数据项 // map和双向链表维护 removeNode(last); map.remove(last.key); } else { size++; } node = new Node(key,value); addToHead(node); map.put(key, node); } else { // 修改值并移动到头部 node.val = value; moveToHead(node); } } }\"},\"headers\":[{\"level\":2,\"title\":\"LRU\",\"slug\":\"lru\",\"link\":\"#lru\",\"children\":[{\"level\":3,\"title\":\"双向链表 + 哈希表\",\"slug\":\"双向链表-哈希表\",\"link\":\"#双向链表-哈希表\",\"children\":[]},{\"level\":3,\"title\":\"LinkedHashMap\",\"slug\":\"linkedhashmap\",\"link\":\"#linkedhashmap\",\"children\":[]}]},{\"level\":2,\"title\":\"LFU（最不经常使用）缓存结构设计\",\"slug\":\"lfu-最不经常使用-缓存结构设计\",\"link\":\"#lfu-最不经常使用-缓存结构设计\",\"children\":[]}],\"readingTime\":{\"minutes\":3.26,\"words\":978},\"filePathRelative\":\"posts/docs/《刷题——LRU、LFU》.md\",\"localizedDate\":\"2023年1月9日\",\"excerpt\":\"<h2> LRU</h2>\\n<h3> 双向链表 + 哈希表</h3>\\n<p>应该这样思考，比较合理。\\n<strong>使用双向链表去维护键值对的使用顺序，也就是将刚刚使用的键值对放在链表的头部</strong>。\\n但是，这样的单次操作复杂度是$O(n)$的。\\n如何优化，使用HashMap即可，\\n具体来说就是<strong>将键与链表的节点一一对应</strong>，这样就可以做到O(1)时间复杂度快速检索到关键节点。</p>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">LRUCache</span> <span class=\\\"token punctuation\\\">{</span>\\n\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token keyword\\\">int</span> size<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token keyword\\\">int</span> capacity<span class=\\\"token punctuation\\\">;</span>\\n  \\n    <span class=\\\"token comment\\\">// 哨兵(哑结点，不存储任何有效值)</span>\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token class-name\\\">Node</span> head<span class=\\\"token punctuation\\\">,</span> tail<span class=\\\"token punctuation\\\">;</span>\\n\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token class-name\\\">HashMap</span><span class=\\\"token generics\\\"><span class=\\\"token punctuation\\\">&lt;</span><span class=\\\"token class-name\\\">Integer</span><span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">Node</span><span class=\\\"token punctuation\\\">&gt;</span></span> map<span class=\\\"token punctuation\\\">;</span>\\n\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token keyword\\\">static</span> <span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">Node</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token class-name\\\">Node</span> prev<span class=\\\"token punctuation\\\">,</span> next<span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 双向</span>\\n        <span class=\\\"token keyword\\\">int</span> key<span class=\\\"token punctuation\\\">,</span> val<span class=\\\"token punctuation\\\">;</span>\\n\\n        <span class=\\\"token keyword\\\">public</span> <span class=\\\"token class-name\\\">Node</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> key<span class=\\\"token punctuation\\\">,</span><span class=\\\"token keyword\\\">int</span> val<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">this</span><span class=\\\"token punctuation\\\">.</span>key <span class=\\\"token operator\\\">=</span> key<span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">this</span><span class=\\\"token punctuation\\\">.</span>val <span class=\\\"token operator\\\">=</span> val<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n\\n        <span class=\\\"token keyword\\\">public</span> <span class=\\\"token class-name\\\">Node</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token comment\\\">// 删除某个节点</span>\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">removeNode</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">Node</span> node<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token class-name\\\">Node</span> p1 <span class=\\\"token operator\\\">=</span> node<span class=\\\"token punctuation\\\">.</span>prev<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token class-name\\\">Node</span> p2 <span class=\\\"token operator\\\">=</span> node<span class=\\\"token punctuation\\\">.</span>next<span class=\\\"token punctuation\\\">;</span>\\n        p1<span class=\\\"token punctuation\\\">.</span>next <span class=\\\"token operator\\\">=</span> p2<span class=\\\"token punctuation\\\">;</span>\\n        p2<span class=\\\"token punctuation\\\">.</span>prev <span class=\\\"token operator\\\">=</span> p1<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token comment\\\">// moveToHead 的辅助函数</span>\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">addToHead</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">Node</span> node<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token class-name\\\">Node</span> headNext <span class=\\\"token operator\\\">=</span> head<span class=\\\"token punctuation\\\">.</span>next<span class=\\\"token punctuation\\\">;</span>\\n        head<span class=\\\"token punctuation\\\">.</span>next <span class=\\\"token operator\\\">=</span> node<span class=\\\"token punctuation\\\">;</span>\\n        node<span class=\\\"token punctuation\\\">.</span>prev <span class=\\\"token operator\\\">=</span> head<span class=\\\"token punctuation\\\">;</span>\\n        node<span class=\\\"token punctuation\\\">.</span>next <span class=\\\"token operator\\\">=</span> headNext<span class=\\\"token punctuation\\\">;</span>\\n        headNext<span class=\\\"token punctuation\\\">.</span>prev <span class=\\\"token operator\\\">=</span> node<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n\\t\\t<span class=\\\"token comment\\\">// 将一个已有的节点移动到头部</span>\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">moveToHead</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">Node</span> node<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token function\\\">removeNode</span><span class=\\\"token punctuation\\\">(</span>node<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token function\\\">addToHead</span><span class=\\\"token punctuation\\\">(</span>node<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token class-name\\\">LRUCache</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> capacity<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">this</span><span class=\\\"token punctuation\\\">.</span>capacity <span class=\\\"token operator\\\">=</span> capacity<span class=\\\"token punctuation\\\">;</span>\\n        head <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">Node</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 哑结点的构造</span>\\n        tail <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">Node</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        head<span class=\\\"token punctuation\\\">.</span>next <span class=\\\"token operator\\\">=</span> tail<span class=\\\"token punctuation\\\">;</span>\\n        tail<span class=\\\"token punctuation\\\">.</span>prev <span class=\\\"token operator\\\">=</span> head<span class=\\\"token punctuation\\\">;</span>\\n        map <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">HashMap</span><span class=\\\"token generics\\\"><span class=\\\"token punctuation\\\">&lt;</span><span class=\\\"token punctuation\\\">&gt;</span></span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">get</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> key<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token operator\\\">!</span>map<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">containsKey</span><span class=\\\"token punctuation\\\">(</span>key<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">return</span> <span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token class-name\\\">Node</span> node <span class=\\\"token operator\\\">=</span> map<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">get</span><span class=\\\"token punctuation\\\">(</span>key<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token function\\\">moveToHead</span><span class=\\\"token punctuation\\\">(</span>node<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 移动到头</span>\\n        <span class=\\\"token keyword\\\">return</span> node<span class=\\\"token punctuation\\\">.</span>val<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">put</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> key<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span> value<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token class-name\\\">Node</span> node <span class=\\\"token operator\\\">=</span> map<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">get</span><span class=\\\"token punctuation\\\">(</span>key<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>node <span class=\\\"token operator\\\">==</span> <span class=\\\"token keyword\\\">null</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>size <span class=\\\"token operator\\\">&gt;=</span> capacity<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token class-name\\\">Node</span> last <span class=\\\"token operator\\\">=</span> tail<span class=\\\"token punctuation\\\">.</span>prev<span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 删掉末尾项，也就是删除最不常用的数据项</span>\\n                <span class=\\\"token comment\\\">// map和双向链表维护</span>\\n                <span class=\\\"token function\\\">removeNode</span><span class=\\\"token punctuation\\\">(</span>last<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                map<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">remove</span><span class=\\\"token punctuation\\\">(</span>last<span class=\\\"token punctuation\\\">.</span>key<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span> <span class=\\\"token keyword\\\">else</span> <span class=\\\"token punctuation\\\">{</span>\\n                size<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            node <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">Node</span><span class=\\\"token punctuation\\\">(</span>key<span class=\\\"token punctuation\\\">,</span>value<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token function\\\">addToHead</span><span class=\\\"token punctuation\\\">(</span>node<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            map<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">put</span><span class=\\\"token punctuation\\\">(</span>key<span class=\\\"token punctuation\\\">,</span> node<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span> <span class=\\\"token keyword\\\">else</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token comment\\\">// 修改值并移动到头部</span>\\n            node<span class=\\\"token punctuation\\\">.</span>val <span class=\\\"token operator\\\">=</span> value<span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token function\\\">moveToHead</span><span class=\\\"token punctuation\\\">(</span>node<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
