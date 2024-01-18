export const data = JSON.parse("{\"key\":\"v-8f073a72\",\"path\":\"/posts/docs/%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98%E8%AF%A6%E8%A7%A3.html\",\"title\":\"背包问题详解\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"背包问题详解\",\"date\":\"2021-11-10T12:01:40.000Z\",\"categories\":\"算法\",\"tags\":[\"背包问题\",\"DP\"],\"description\":\"背包问题 01背包 Model: 给定n个物品，第i个物品的体积为Vi,价值为Wi.背包容积为m。每件物品最多选择一次，总体积不超过m,要求总价值最大。 01背包，时间复杂度 O(nm),空间复杂度 O(nm) #include&lt;stdio.h&gt; #include&lt;iostream&gt; #include&lt;cmath&gt; #include&lt;math.h&gt; #include&lt;string&gt; #include&lt;string.h&gt; #include&lt;algorithm&gt; #define ll long long using namespace std; const int maxn = 1e3; int n,m,w[maxn],v[maxn],f[maxn][maxn]; int main(){ cin&gt;&gt;n&gt;&gt;m; for(int i=1;i&lt;=n;i++) scanf(\\\"%d%d\\\",&amp;w[i],&amp;v[i]); for(int i=1;i&lt;=n;i++){ for(int j=0;j&lt;=m;j++) f[i][j]=f[i-1][j]; for(int j=v[i];j&lt;=m;j++) f[i][j] = max(f[i][j],f[i-1][j-v[i]]+w[i]); } // 打表观察 for(int i=1;i&lt;=n;i++){ for(int j=0;j&lt;=m;j++){ printf(\\\"%3d\\\",f[i][j]); } cout&lt;&lt;endl; } return 0; }\"},\"headers\":[{\"level\":2,\"title\":\"01背包\",\"slug\":\"_01背包\",\"link\":\"#_01背包\",\"children\":[{\"level\":3,\"title\":\"小栗子\",\"slug\":\"小栗子\",\"link\":\"#小栗子\",\"children\":[]}]},{\"level\":2,\"title\":\"完全背包\",\"slug\":\"完全背包\",\"link\":\"#完全背包\",\"children\":[{\"level\":3,\"title\":\"小栗子--自然数拆分\",\"slug\":\"小栗子-自然数拆分\",\"link\":\"#小栗子-自然数拆分\",\"children\":[]}]},{\"level\":2,\"title\":\"多重背包\",\"slug\":\"多重背包\",\"link\":\"#多重背包\",\"children\":[{\"level\":3,\"title\":\"直接拆分法\",\"slug\":\"直接拆分法\",\"link\":\"#直接拆分法\",\"children\":[]},{\"level\":3,\"title\":\"二进制拆分法\",\"slug\":\"二进制拆分法\",\"link\":\"#二进制拆分法\",\"children\":[]},{\"level\":3,\"title\":\"多重背包模板题.\",\"slug\":\"多重背包模板题\",\"link\":\"#多重背包模板题\",\"children\":[]}]},{\"level\":2,\"title\":\"分组背包\",\"slug\":\"分组背包\",\"link\":\"#分组背包\",\"children\":[]}],\"readingTime\":{\"minutes\":6.21,\"words\":1863},\"filePathRelative\":\"posts/docs/背包问题详解.md\",\"localizedDate\":\"2021年11月10日\",\"excerpt\":\"<h1> 背包问题</h1>\\n<h2> 01背包</h2>\\n<p>Model: 给定n个物品，第i个物品的体积为Vi,价值为Wi.背包容积为m。每件物品最多选择一次，总体积不超过m,要求总价值最大。</p>\\n<p><strong>01背包，时间复杂度 O(nm),空间复杂度 O(nm)</strong></p>\\n<div class=\\\"language-cpp line-numbers-mode\\\" data-ext=\\\"cpp\\\"><pre class=\\\"language-cpp\\\"><code>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span><span class=\\\"token string\\\">&lt;stdio.h&gt;</span></span>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span><span class=\\\"token string\\\">&lt;iostream&gt;</span></span>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span><span class=\\\"token string\\\">&lt;cmath&gt;</span></span>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span><span class=\\\"token string\\\">&lt;math.h&gt;</span></span>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span><span class=\\\"token string\\\">&lt;string&gt;</span></span>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span><span class=\\\"token string\\\">&lt;string.h&gt;</span></span>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span><span class=\\\"token string\\\">&lt;algorithm&gt;</span></span>\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">define</span> <span class=\\\"token macro-name\\\">ll</span> <span class=\\\"token expression\\\"><span class=\\\"token keyword\\\">long</span> <span class=\\\"token keyword\\\">long</span></span></span>\\n<span class=\\\"token keyword\\\">using</span> <span class=\\\"token keyword\\\">namespace</span> std<span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token keyword\\\">const</span> <span class=\\\"token keyword\\\">int</span> maxn <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">1e3</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token keyword\\\">int</span> n<span class=\\\"token punctuation\\\">,</span>m<span class=\\\"token punctuation\\\">,</span>w<span class=\\\"token punctuation\\\">[</span>maxn<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span>v<span class=\\\"token punctuation\\\">[</span>maxn<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span>f<span class=\\\"token punctuation\\\">[</span>maxn<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>maxn<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">main</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n    cin<span class=\\\"token operator\\\">&gt;&gt;</span>n<span class=\\\"token operator\\\">&gt;&gt;</span>m<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i<span class=\\\"token operator\\\">=</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>i<span class=\\\"token operator\\\">&lt;=</span>n<span class=\\\"token punctuation\\\">;</span>i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token function\\\">scanf</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"%d%d\\\"</span><span class=\\\"token punctuation\\\">,</span><span class=\\\"token operator\\\">&amp;</span>w<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span><span class=\\\"token operator\\\">&amp;</span>v<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i<span class=\\\"token operator\\\">=</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>i<span class=\\\"token operator\\\">&lt;=</span>n<span class=\\\"token punctuation\\\">;</span>i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> j<span class=\\\"token operator\\\">=</span><span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>j<span class=\\\"token operator\\\">&lt;=</span>m<span class=\\\"token punctuation\\\">;</span>j<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token operator\\\">=</span>f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> j<span class=\\\"token operator\\\">=</span>v<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>j<span class=\\\"token operator\\\">&lt;=</span>m<span class=\\\"token punctuation\\\">;</span>j<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">max</span><span class=\\\"token punctuation\\\">(</span>f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span>f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token operator\\\">-</span>v<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token operator\\\">+</span>w<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token comment\\\">// 打表观察</span>\\n    <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i<span class=\\\"token operator\\\">=</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>i<span class=\\\"token operator\\\">&lt;=</span>n<span class=\\\"token punctuation\\\">;</span>i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> j<span class=\\\"token operator\\\">=</span><span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>j<span class=\\\"token operator\\\">&lt;=</span>m<span class=\\\"token punctuation\\\">;</span>j<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token function\\\">printf</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"%3d\\\"</span><span class=\\\"token punctuation\\\">,</span>f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        cout<span class=\\\"token operator\\\">&lt;&lt;</span>endl<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token keyword\\\">return</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
