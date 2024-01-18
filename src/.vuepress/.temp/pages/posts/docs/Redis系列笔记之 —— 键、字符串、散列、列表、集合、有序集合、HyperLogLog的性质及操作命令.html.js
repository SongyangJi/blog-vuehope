export const data = JSON.parse("{\"key\":\"v-60d3fbd7\",\"path\":\"/posts/docs/Redis%E7%B3%BB%E5%88%97%E7%AC%94%E8%AE%B0%E4%B9%8B%20%E2%80%94%E2%80%94%20%E9%94%AE%E3%80%81%E5%AD%97%E7%AC%A6%E4%B8%B2%E3%80%81%E6%95%A3%E5%88%97%E3%80%81%E5%88%97%E8%A1%A8%E3%80%81%E9%9B%86%E5%90%88%E3%80%81%E6%9C%89%E5%BA%8F%E9%9B%86%E5%90%88%E3%80%81HyperLogLog%E7%9A%84%E6%80%A7%E8%B4%A8%E5%8F%8A%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.html\",\"title\":\"Redis系列笔记之 —— 键、字符串、散列、列表、集合、有序集合、HyperLogLog的性质及操作命令\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis系列笔记之 —— 键、字符串、散列、列表、集合、有序集合、HyperLogLog的性质及操作命令\",\"date\":\"2021-09-15T00:00:00.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\"],\"description\":\"键 命令不区分大小写，尽量使用大写，表明是Redis的关键字。 获得符合规则的键名列表 KEYS your_pattern\"},\"headers\":[{\"level\":2,\"title\":\"获得符合规则的键名列表\",\"slug\":\"获得符合规则的键名列表\",\"link\":\"#获得符合规则的键名列表\",\"children\":[]},{\"level\":2,\"title\":\"基本命令\",\"slug\":\"基本命令\",\"link\":\"#基本命令\",\"children\":[]},{\"level\":2,\"title\":\"生存时间相关\",\"slug\":\"生存时间相关\",\"link\":\"#生存时间相关\",\"children\":[]},{\"level\":2,\"title\":\"其他命令\",\"slug\":\"其他命令\",\"link\":\"#其他命令\",\"children\":[]},{\"level\":2,\"title\":\"字符串(string)\",\"slug\":\"字符串-string\",\"link\":\"#字符串-string\",\"children\":[{\"level\":3,\"title\":\"性质\",\"slug\":\"性质\",\"link\":\"#性质\",\"children\":[]},{\"level\":3,\"title\":\"操作命令\",\"slug\":\"操作命令\",\"link\":\"#操作命令\",\"children\":[]}]},{\"level\":2,\"title\":\"散列(hash)\",\"slug\":\"散列-hash\",\"link\":\"#散列-hash\",\"children\":[{\"level\":3,\"title\":\"特点\",\"slug\":\"特点\",\"link\":\"#特点\",\"children\":[]},{\"level\":3,\"title\":\"操作命令\",\"slug\":\"操作命令-1\",\"link\":\"#操作命令-1\",\"children\":[]}]},{\"level\":2,\"title\":\"列表\",\"slug\":\"列表\",\"link\":\"#列表\",\"children\":[{\"level\":3,\"title\":\"特点\",\"slug\":\"特点-1\",\"link\":\"#特点-1\",\"children\":[]},{\"level\":3,\"title\":\"操作命令\",\"slug\":\"操作命令-2\",\"link\":\"#操作命令-2\",\"children\":[]}]},{\"level\":2,\"title\":\"集合\",\"slug\":\"集合\",\"link\":\"#集合\",\"children\":[{\"level\":3,\"title\":\"特点\",\"slug\":\"特点-2\",\"link\":\"#特点-2\",\"children\":[]},{\"level\":3,\"title\":\"操作命令\",\"slug\":\"操作命令-3\",\"link\":\"#操作命令-3\",\"children\":[]}]},{\"level\":2,\"title\":\"有序集合\",\"slug\":\"有序集合\",\"link\":\"#有序集合\",\"children\":[{\"level\":3,\"title\":\"特点\",\"slug\":\"特点-3\",\"link\":\"#特点-3\",\"children\":[]},{\"level\":3,\"title\":\"操作命令\",\"slug\":\"操作命令-4\",\"link\":\"#操作命令-4\",\"children\":[]}]},{\"level\":2,\"title\":\"HyperLogLog\",\"slug\":\"hyperloglog\",\"link\":\"#hyperloglog\",\"children\":[]},{\"level\":2,\"title\":\"特点\",\"slug\":\"特点-4\",\"link\":\"#特点-4\",\"children\":[]},{\"level\":2,\"title\":\"命令\",\"slug\":\"命令\",\"link\":\"#命令\",\"children\":[]}],\"readingTime\":{\"minutes\":9.39,\"words\":2818},\"filePathRelative\":\"posts/docs/Redis系列笔记之 —— 键、字符串、散列、列表、集合、有序集合、HyperLogLog的性质及操作命令.md\",\"localizedDate\":\"2021年9月15日\",\"excerpt\":\"<h1> 键</h1>\\n<blockquote>\\n<p>命令不区分大小写，尽量使用大写，表明是Redis的关键字。</p>\\n</blockquote>\\n<h2> 获得符合规则的键名列表</h2>\\n<div class=\\\"language-text line-numbers-mode\\\" data-ext=\\\"text\\\"><pre class=\\\"language-text\\\"><code>KEYS your_pattern\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
