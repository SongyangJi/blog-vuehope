export const data = JSON.parse("{\"key\":\"v-576e871f\",\"path\":\"/posts/Go%E5%88%B7%E9%A2%98.html\",\"title\":\"Go刷题\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Go刷题\",\"date\":\"2022-12-06T09:17:05.000Z\",\"cagegories\":\"Go\",\"tags\":[\"Go\",\"刷题\"],\"description\":\"字符串 1805. 字符串中不同整数的数目 https://leetcode.cn/problems/number-of-different-integers-in-a-string/solutions/ func numDifferentIntegers(word string) int { cs := []rune(word) for i := 0; i &lt; len(cs); i++ { if !(cs[i] &gt;= '0' &amp;&amp; cs[i] &lt;= '9') { cs[i] = ' ' } } word = string(cs) splits := strings.Split(word, \\\" \\\") f := func(s string) string { for len(s) &gt; 1 { if !strings.HasPrefix(s, \\\"0\\\") { break } s = strings.TrimPrefix(s, \\\"0\\\") } return s } for i, s := range splits { splits[i] = f(s) } m := make(map[string]int) for _, s := range splits { if len(s) &gt; 0 { m[s]++ } } return len(m) }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Go%E5%88%B7%E9%A2%98.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Go刷题\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"字符串 1805. 字符串中不同整数的数目 https://leetcode.cn/problems/number-of-different-integers-in-a-string/solutions/ func numDifferentIntegers(word string) int { cs := []rune(word) for i := 0; i &lt; len(cs); i++ { if !(cs[i] &gt;= '0' &amp;&amp; cs[i] &lt;= '9') { cs[i] = ' ' } } word = string(cs) splits := strings.Split(word, \\\" \\\") f := func(s string) string { for len(s) &gt; 1 { if !strings.HasPrefix(s, \\\"0\\\") { break } s = strings.TrimPrefix(s, \\\"0\\\") } return s } for i, s := range splits { splits[i] = f(s) } m := make(map[string]int) for _, s := range splits { if len(s) &gt; 0 { m[s]++ } } return len(m) }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Go\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"刷题\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-12-06T09:17:05.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Go刷题\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-12-06T09:17:05.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.63,\"words\":190},\"filePathRelative\":\"posts/Go刷题.md\",\"localizedDate\":\"2022年12月6日\",\"excerpt\":\"<p>字符串</p>\\n<h1> 1805. 字符串中不同整数的数目</h1>\\n<p>https://leetcode.cn/problems/number-of-different-integers-in-a-string/solutions/</p>\\n<div class=\\\"language-go line-numbers-mode\\\" data-ext=\\\"go\\\"><pre class=\\\"language-go\\\"><code><span class=\\\"token keyword\\\">func</span> <span class=\\\"token function\\\">numDifferentIntegers</span><span class=\\\"token punctuation\\\">(</span>word <span class=\\\"token builtin\\\">string</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token builtin\\\">int</span> <span class=\\\"token punctuation\\\">{</span>\\n    cs <span class=\\\"token operator\\\">:=</span> <span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token function\\\">rune</span><span class=\\\"token punctuation\\\">(</span>word<span class=\\\"token punctuation\\\">)</span>\\n    <span class=\\\"token keyword\\\">for</span> i <span class=\\\"token operator\\\">:=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&lt;</span> <span class=\\\"token function\\\">len</span><span class=\\\"token punctuation\\\">(</span>cs<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token operator\\\">!</span><span class=\\\"token punctuation\\\">(</span>cs<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">&gt;=</span> <span class=\\\"token char\\\">'0'</span> <span class=\\\"token operator\\\">&amp;&amp;</span> cs<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">&lt;=</span> <span class=\\\"token char\\\">'9'</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            cs<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token char\\\">' '</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    word <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">string</span><span class=\\\"token punctuation\\\">(</span>cs<span class=\\\"token punctuation\\\">)</span>\\n    splits <span class=\\\"token operator\\\">:=</span> strings<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">Split</span><span class=\\\"token punctuation\\\">(</span>word<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token string\\\">\\\" \\\"</span><span class=\\\"token punctuation\\\">)</span>\\n    \\n    f <span class=\\\"token operator\\\">:=</span> <span class=\\\"token keyword\\\">func</span><span class=\\\"token punctuation\\\">(</span>s <span class=\\\"token builtin\\\">string</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token builtin\\\">string</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">for</span> <span class=\\\"token function\\\">len</span><span class=\\\"token punctuation\\\">(</span>s<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token number\\\">1</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">if</span> <span class=\\\"token operator\\\">!</span>strings<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">HasPrefix</span><span class=\\\"token punctuation\\\">(</span>s<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token string\\\">\\\"0\\\"</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token keyword\\\">break</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            s <span class=\\\"token operator\\\">=</span> strings<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">TrimPrefix</span><span class=\\\"token punctuation\\\">(</span>s<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token string\\\">\\\"0\\\"</span><span class=\\\"token punctuation\\\">)</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token keyword\\\">return</span> s\\n    <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token keyword\\\">for</span> i<span class=\\\"token punctuation\\\">,</span> s <span class=\\\"token operator\\\">:=</span> <span class=\\\"token keyword\\\">range</span> splits <span class=\\\"token punctuation\\\">{</span>\\n        splits<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">f</span><span class=\\\"token punctuation\\\">(</span>s<span class=\\\"token punctuation\\\">)</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    \\n    m <span class=\\\"token operator\\\">:=</span> <span class=\\\"token function\\\">make</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">map</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token builtin\\\">string</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token builtin\\\">int</span><span class=\\\"token punctuation\\\">)</span>\\n    <span class=\\\"token keyword\\\">for</span> <span class=\\\"token boolean\\\">_</span><span class=\\\"token punctuation\\\">,</span> s <span class=\\\"token operator\\\">:=</span> <span class=\\\"token keyword\\\">range</span> splits <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token function\\\">len</span><span class=\\\"token punctuation\\\">(</span>s<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">&gt;</span> <span class=\\\"token number\\\">0</span> <span class=\\\"token punctuation\\\">{</span>\\n            m<span class=\\\"token punctuation\\\">[</span>s<span class=\\\"token punctuation\\\">]</span><span class=\\\"token operator\\\">++</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token keyword\\\">return</span> <span class=\\\"token function\\\">len</span><span class=\\\"token punctuation\\\">(</span>m<span class=\\\"token punctuation\\\">)</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
