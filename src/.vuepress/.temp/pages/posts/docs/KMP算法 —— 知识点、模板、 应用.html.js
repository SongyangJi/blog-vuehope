export const data = JSON.parse("{\"key\":\"v-b3fd7514\",\"path\":\"/posts/docs/KMP%E7%AE%97%E6%B3%95%20%E2%80%94%E2%80%94%20%E7%9F%A5%E8%AF%86%E7%82%B9%E3%80%81%E6%A8%A1%E6%9D%BF%E3%80%81%20%E5%BA%94%E7%94%A8.html\",\"title\":\"KMP算法 —— 知识点、模板、 应用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"KMP算法 —— 知识点、模板、 应用\",\"date\":\"2021-11-12T01:18:45.000Z\",\"categories\":\"算法\",\"tags\":[\"字符串算法\"],\"description\":\"这里并不打算去详细推导KMP的原理，以及精髓。只是整理了一下KMP算法的模板、应用、理解的关键点。 基本功能 KMP算法最基本的应用就是字符串的匹配——给定一个text串，一个pattern串，询问pattern串在text串中是否出现，以及出现几次、位置等等。 模板 class KMP{ string pattern; int len ; vector&lt;int&gt; next; // 这里的next数组是从1开始的 // 也叫失配数组,next[i] 表示以第i位结尾的子串与模式串的前缀相同的最大长度（但不能是自身），也就是所谓的最长公共前后缀 void Next(){ next.resize(len+1); int j = 0; for(int i = 2; i &lt;= len; i++) { while(j &gt; 0 &amp;&amp; pattern[i] != pattern[j + 1]) { j = next[j]; } if(pattern[i] == pattern[j + 1]) { j++; } next[i] = j; } } public: KMP(const string &amp;pattern) { len = pattern.size(); this-&gt;pattern = \\\" \\\" + pattern; Next(); } bool isSubstringOfText(const string&amp; text) { return getPositions(text).size() &gt; 0; } // 统计模式串在文本串出现的次数 int getTimes(const string&amp; text) { return getPositions(text).size(); } // 统计模式串在文本串的出现的次数 vector&lt;int&gt; getPositions(const string&amp; text) { vector&lt;int&gt; res; if(text.size() &lt; len) return res; int j = 0; for(int i = 0; i &lt; text.size(); i++){ while (j &gt; 0 &amp;&amp; text[i] != pattern[j + 1]){ j = next[j]; } if(text[i] == pattern[j + 1]){ j++; } if(j == len){ // i 是匹配时文本串的位置（从0开始） res.push_back(i); j = next[j]; } } return res; }; // 求数组f[] 其中 f[i] 表示文本串以i结尾的子串与 pattern 串的前缀相同的最大长度（这里也是从1开始计数） vector&lt;int&gt; getFArray(const string&amp; text) { int m = text.size(), j = 0; vector&lt;int&gt; f(m+1); for(int i= 0 ;i &lt; m; i++){ while(j &gt; 0 &amp;&amp; (j == len || text[i] != pattern[j + 1])) { j = next[j]; } if(text[i] == pattern[j + 1]){ j++; } f[i] = j; } return f; } const vector&lt;int&gt; &amp;getNext() const { return next; } };\"},\"headers\":[],\"readingTime\":{\"minutes\":1.85,\"words\":555},\"filePathRelative\":\"posts/docs/KMP算法 —— 知识点、模板、 应用.md\",\"localizedDate\":\"2021年11月12日\",\"excerpt\":\"<blockquote>\\n<p>这里并不打算去详细推导KMP的原理，以及精髓。只是整理了一下KMP算法的模板、应用、理解的关键点。</p>\\n</blockquote>\\n<h1> 基本功能</h1>\\n<p>KMP算法最基本的应用就是字符串的匹配——给定一个text串，一个pattern串，询问pattern串在text串中是否出现，以及出现几次、位置等等。</p>\\n<h1> 模板</h1>\\n<div class=\\\"language-cpp line-numbers-mode\\\" data-ext=\\\"cpp\\\"><pre class=\\\"language-cpp\\\"><code><span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">KMP</span><span class=\\\"token punctuation\\\">{</span>\\n    string pattern<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span> len <span class=\\\"token punctuation\\\">;</span>\\n    vector<span class=\\\"token operator\\\">&lt;</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token operator\\\">&gt;</span> next<span class=\\\"token punctuation\\\">;</span>  <span class=\\\"token comment\\\">// 这里的next数组是从1开始的</span>\\n\\n    <span class=\\\"token comment\\\">// 也叫失配数组,next[i] 表示以第i位结尾的子串与模式串的前缀相同的最大长度（但不能是自身），也就是所谓的最长公共前后缀</span>\\n    <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">Next</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n        next<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">resize</span><span class=\\\"token punctuation\\\">(</span>len<span class=\\\"token operator\\\">+</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">int</span> j <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">2</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&lt;=</span> len<span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">while</span><span class=\\\"token punctuation\\\">(</span>j <span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token number\\\">0</span> <span class=\\\"token operator\\\">&amp;&amp;</span> pattern<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">!=</span> pattern<span class=\\\"token punctuation\\\">[</span>j <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                j <span class=\\\"token operator\\\">=</span> next<span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>pattern<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">==</span> pattern<span class=\\\"token punctuation\\\">[</span>j <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                j<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            next<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> j<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n<span class=\\\"token keyword\\\">public</span><span class=\\\"token operator\\\">:</span>\\n    <span class=\\\"token function\\\">KMP</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">const</span> string <span class=\\\"token operator\\\">&amp;</span>pattern<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        len <span class=\\\"token operator\\\">=</span> pattern<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">this</span><span class=\\\"token operator\\\">-&gt;</span>pattern <span class=\\\"token operator\\\">=</span> <span class=\\\"token string\\\">\\\" \\\"</span> <span class=\\\"token operator\\\">+</span> pattern<span class=\\\"token punctuation\\\">;</span> \\n        <span class=\\\"token function\\\">Next</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token keyword\\\">bool</span> <span class=\\\"token function\\\">isSubstringOfText</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">const</span> string<span class=\\\"token operator\\\">&amp;</span> text<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">return</span> <span class=\\\"token function\\\">getPositions</span><span class=\\\"token punctuation\\\">(</span>text<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n\\n    <span class=\\\"token comment\\\">// 统计模式串在文本串出现的次数</span>\\n    <span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">getTimes</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">const</span> string<span class=\\\"token operator\\\">&amp;</span> text<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">return</span> <span class=\\\"token function\\\">getPositions</span><span class=\\\"token punctuation\\\">(</span>text<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    <span class=\\\"token comment\\\">// 统计模式串在文本串的出现的次数</span>\\n    vector<span class=\\\"token operator\\\">&lt;</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token function\\\">getPositions</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">const</span> string<span class=\\\"token operator\\\">&amp;</span> text<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        vector<span class=\\\"token operator\\\">&lt;</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token operator\\\">&gt;</span> res<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>text<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span>  <span class=\\\"token operator\\\">&lt;</span> len<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">return</span> res<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">int</span> j <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&lt;</span> text<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">while</span> <span class=\\\"token punctuation\\\">(</span>j <span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token number\\\">0</span> <span class=\\\"token operator\\\">&amp;&amp;</span> text<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">!=</span> pattern<span class=\\\"token punctuation\\\">[</span>j <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n                j <span class=\\\"token operator\\\">=</span> next<span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>text<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">==</span> pattern<span class=\\\"token punctuation\\\">[</span>j <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n                j<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>j <span class=\\\"token operator\\\">==</span> len<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token comment\\\">// i 是匹配时文本串的位置（从0开始）</span>\\n                res<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">push_back</span><span class=\\\"token punctuation\\\">(</span>i<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                j <span class=\\\"token operator\\\">=</span> next<span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token keyword\\\">return</span> res<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n    \\n\\n    <span class=\\\"token comment\\\">// 求数组f[] 其中 f[i] 表示文本串以i结尾的子串与 pattern 串的前缀相同的最大长度（这里也是从1开始计数）</span>\\n    vector<span class=\\\"token operator\\\">&lt;</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token function\\\">getFArray</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">const</span> string<span class=\\\"token operator\\\">&amp;</span> text<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">int</span> m <span class=\\\"token operator\\\">=</span> text<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">size</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">,</span> j <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n        vector<span class=\\\"token operator\\\">&lt;</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token function\\\">f</span><span class=\\\"token punctuation\\\">(</span>m<span class=\\\"token operator\\\">+</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i<span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span> <span class=\\\"token punctuation\\\">;</span>i <span class=\\\"token operator\\\">&lt;</span> m<span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">while</span><span class=\\\"token punctuation\\\">(</span>j <span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token number\\\">0</span> <span class=\\\"token operator\\\">&amp;&amp;</span> <span class=\\\"token punctuation\\\">(</span>j <span class=\\\"token operator\\\">==</span> len <span class=\\\"token operator\\\">||</span> text<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">!=</span> pattern<span class=\\\"token punctuation\\\">[</span>j <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                j <span class=\\\"token operator\\\">=</span> next<span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>text<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">==</span> pattern<span class=\\\"token punctuation\\\">[</span>j <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">{</span>\\n                j<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> j<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token keyword\\\">return</span> f<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token keyword\\\">const</span> vector<span class=\\\"token operator\\\">&lt;</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token operator\\\">&amp;</span><span class=\\\"token function\\\">getNext</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">const</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">return</span> next<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
