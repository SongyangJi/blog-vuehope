export const data = JSON.parse("{\"key\":\"v-6e31c81c\",\"path\":\"/posts/%E3%80%8A%E5%88%B7%E9%A2%98%E2%80%94%E2%80%94%E5%9B%BE%E7%9B%B8%E5%85%B3%E3%80%8B.html\",\"title\":\"《刷题——图相关》\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"《刷题——图相关》\",\"date\":\"2023-01-23T06:32:22.000Z\",\"categories\":\"算法题\",\"tags\":null,\"description\":\"图的最大路径和（树上DP求直径） import java.util.*; public class Solution { /** * 树的直径 * @param n int整型 树的节点个数 * @param Tree_edge Interval类一维数组 树的边 * @param Edge_value int整型一维数组 边的权值 * @return int整型 */ int N = 100010; int M = 2 * N; int idx = 0; int[] head = new int[N]; int[] w = new int[M], ver = new int[M], next = new int[M]; void add(int x, int y, int z) { w[++idx] = z; ver[idx] = y; next[idx] = head[x]; head[x] = idx; } int ans = 0; boolean[] v = new boolean[N]; int[] d = new int[N]; void dfs(int x) { v[x] = true; for(int i = head[x]; i &gt; 0; i = next[i]) { int y = ver[i]; if(v[y]) continue; // 不要重复计算和统计 dfs(y); ans = Math.max(ans, d[x] + d[y] + w[i]); // key: 先用后更新 d[x] = Math.max(d[x], d[y] + w[i]); } } public int solve (int n, Interval[] edges, int[] values) { // write code here for(int i = 0; i &lt; n - 1; i++) { int x = edges[i].start; int y = edges[i].end; int z = values[i]; add(x, y, z); add(y, x, z); } dfs(0); return ans; } }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/%E3%80%8A%E5%88%B7%E9%A2%98%E2%80%94%E2%80%94%E5%9B%BE%E7%9B%B8%E5%85%B3%E3%80%8B.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"《刷题——图相关》\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"图的最大路径和（树上DP求直径） import java.util.*; public class Solution { /** * 树的直径 * @param n int整型 树的节点个数 * @param Tree_edge Interval类一维数组 树的边 * @param Edge_value int整型一维数组 边的权值 * @return int整型 */ int N = 100010; int M = 2 * N; int idx = 0; int[] head = new int[N]; int[] w = new int[M], ver = new int[M], next = new int[M]; void add(int x, int y, int z) { w[++idx] = z; ver[idx] = y; next[idx] = head[x]; head[x] = idx; } int ans = 0; boolean[] v = new boolean[N]; int[] d = new int[N]; void dfs(int x) { v[x] = true; for(int i = head[x]; i &gt; 0; i = next[i]) { int y = ver[i]; if(v[y]) continue; // 不要重复计算和统计 dfs(y); ans = Math.max(ans, d[x] + d[y] + w[i]); // key: 先用后更新 d[x] = Math.max(d[x], d[y] + w[i]); } } public int solve (int n, Interval[] edges, int[] values) { // write code here for(int i = 0; i &lt; n - 1; i++) { int x = edges[i].start; int y = edges[i].end; int z = values[i]; add(x, y, z); add(y, x, z); } dfs(0); return ans; } }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-01-23T06:32:22.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"《刷题——图相关》\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-01-23T06:32:22.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":3,\"title\":\"图的最大路径和（树上DP求直径）\",\"slug\":\"图的最大路径和-树上dp求直径\",\"link\":\"#图的最大路径和-树上dp求直径\",\"children\":[]}],\"readingTime\":{\"minutes\":1.27,\"words\":382},\"filePathRelative\":\"posts/《刷题——图相关》.md\",\"localizedDate\":\"2023年1月23日\",\"excerpt\":\"<h3> 图的最大路径和（树上DP求直径）</h3>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token keyword\\\">import</span> <span class=\\\"token import\\\"><span class=\\\"token namespace\\\">java<span class=\\\"token punctuation\\\">.</span>util<span class=\\\"token punctuation\\\">.</span></span><span class=\\\"token operator\\\">*</span></span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">Solution</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token doc-comment comment\\\">/**\\n     * 树的直径\\n     * <span class=\\\"token keyword\\\">@param</span> <span class=\\\"token parameter\\\">n</span> int整型 树的节点个数\\n     * <span class=\\\"token keyword\\\">@param</span> <span class=\\\"token parameter\\\">Tree_edge</span> Interval类一维数组 树的边\\n     * <span class=\\\"token keyword\\\">@param</span> <span class=\\\"token parameter\\\">Edge_value</span> int整型一维数组 边的权值\\n     * <span class=\\\"token keyword\\\">@return</span> int整型\\n     */</span>\\n    <span class=\\\"token keyword\\\">int</span> <span class=\\\"token class-name\\\">N</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">100010</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span> <span class=\\\"token class-name\\\">M</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">2</span> <span class=\\\"token operator\\\">*</span> <span class=\\\"token class-name\\\">N</span><span class=\\\"token punctuation\\\">;</span>\\n    \\n    <span class=\\\"token keyword\\\">int</span> idx <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> head <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">N</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> w <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">M</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span> ver <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">M</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span> next <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">M</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n    \\n    <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">add</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> x<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span> y<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span> z<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        w<span class=\\\"token punctuation\\\">[</span><span class=\\\"token operator\\\">++</span>idx<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> z<span class=\\\"token punctuation\\\">;</span>\\n        ver<span class=\\\"token punctuation\\\">[</span>idx<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> y<span class=\\\"token punctuation\\\">;</span>\\n        next<span class=\\\"token punctuation\\\">[</span>idx<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> head<span class=\\\"token punctuation\\\">[</span>x<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n        head<span class=\\\"token punctuation\\\">[</span>x<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> idx<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token keyword\\\">int</span> ans <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">boolean</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> v <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">boolean</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">N</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> d <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">N</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n    \\n    <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">dfs</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> x<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        v<span class=\\\"token punctuation\\\">[</span>x<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token boolean\\\">true</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i <span class=\\\"token operator\\\">=</span> head<span class=\\\"token punctuation\\\">[</span>x<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">=</span> next<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">int</span> y <span class=\\\"token operator\\\">=</span> ver<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>v<span class=\\\"token punctuation\\\">[</span>y<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">continue</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 不要重复计算和统计</span>\\n            <span class=\\\"token function\\\">dfs</span><span class=\\\"token punctuation\\\">(</span>y<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            ans <span class=\\\"token operator\\\">=</span> <span class=\\\"token class-name\\\">Math</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">max</span><span class=\\\"token punctuation\\\">(</span>ans<span class=\\\"token punctuation\\\">,</span> d<span class=\\\"token punctuation\\\">[</span>x<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">+</span> d<span class=\\\"token punctuation\\\">[</span>y<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">+</span> w<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>  <span class=\\\"token comment\\\">// key: 先用后更新</span>\\n            d<span class=\\\"token punctuation\\\">[</span>x<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token class-name\\\">Math</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">max</span><span class=\\\"token punctuation\\\">(</span>d<span class=\\\"token punctuation\\\">[</span>x<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span> d<span class=\\\"token punctuation\\\">[</span>y<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">+</span> w<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">int</span> solve <span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> n<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">Interval</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> edges<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> values<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token comment\\\">// write code here</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&lt;</span> n <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">int</span> x <span class=\\\"token operator\\\">=</span> edges<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">.</span>start<span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">int</span> y <span class=\\\"token operator\\\">=</span> edges<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">.</span>end<span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">int</span> z <span class=\\\"token operator\\\">=</span> values<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token function\\\">add</span><span class=\\\"token punctuation\\\">(</span>x<span class=\\\"token punctuation\\\">,</span> y<span class=\\\"token punctuation\\\">,</span> z<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token function\\\">add</span><span class=\\\"token punctuation\\\">(</span>y<span class=\\\"token punctuation\\\">,</span> x<span class=\\\"token punctuation\\\">,</span> z<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token function\\\">dfs</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">return</span> ans<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
