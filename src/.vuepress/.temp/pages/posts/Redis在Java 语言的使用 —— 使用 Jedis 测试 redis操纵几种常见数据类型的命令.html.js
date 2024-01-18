export const data = JSON.parse("{\"key\":\"v-7223e158\",\"path\":\"/posts/Redis%E5%9C%A8Java%20%E8%AF%AD%E8%A8%80%E7%9A%84%E4%BD%BF%E7%94%A8%20%E2%80%94%E2%80%94%20%E4%BD%BF%E7%94%A8%20Jedis%20%E6%B5%8B%E8%AF%95%20redis%E6%93%8D%E7%BA%B5%E5%87%A0%E7%A7%8D%E5%B8%B8%E8%A7%81%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%91%BD%E4%BB%A4.html\",\"title\":\"Redis在Java 语言的使用 —— 使用 Jedis 测试 redis操纵几种常见数据类型的命令\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis在Java 语言的使用 —— 使用 Jedis 测试 redis操纵几种常见数据类型的命令\",\"date\":\"2021-09-16T00:00:00.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\"],\"description\":\"Jedis Jedis介绍 Jedis 是 Redis 官方首选的 Java 客户端开发包。 如何使用 三样东西必不可少： jdk redis-server java的redis驱动 我没有直接使用jar包导入，而是采用maven。 &lt;!-- https://mvnrepository.com/artifact/redis.clients/jedis --&gt; &lt;dependency&gt; &lt;groupId&gt;redis.clients&lt;/groupId&gt; &lt;artifactId&gt;jedis&lt;/artifactId&gt; &lt;version&gt;3.3.0&lt;/version&gt; &lt;/dependency&gt;\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Redis%E5%9C%A8Java%20%E8%AF%AD%E8%A8%80%E7%9A%84%E4%BD%BF%E7%94%A8%20%E2%80%94%E2%80%94%20%E4%BD%BF%E7%94%A8%20Jedis%20%E6%B5%8B%E8%AF%95%20redis%E6%93%8D%E7%BA%B5%E5%87%A0%E7%A7%8D%E5%B8%B8%E8%A7%81%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%91%BD%E4%BB%A4.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Redis在Java 语言的使用 —— 使用 Jedis 测试 redis操纵几种常见数据类型的命令\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Jedis Jedis介绍 Jedis 是 Redis 官方首选的 Java 客户端开发包。 如何使用 三样东西必不可少： jdk redis-server java的redis驱动 我没有直接使用jar包导入，而是采用maven。 &lt;!-- https://mvnrepository.com/artifact/redis.clients/jedis --&gt; &lt;dependency&gt; &lt;groupId&gt;redis.clients&lt;/groupId&gt; &lt;artifactId&gt;jedis&lt;/artifactId&gt; &lt;version&gt;3.3.0&lt;/version&gt; &lt;/dependency&gt;\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"NoSQL\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Redis\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-09-16T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Redis在Java 语言的使用 —— 使用 Jedis 测试 redis操纵几种常见数据类型的命令\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-09-16T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"Jedis介绍\",\"slug\":\"jedis介绍\",\"link\":\"#jedis介绍\",\"children\":[]},{\"level\":2,\"title\":\"如何使用\",\"slug\":\"如何使用\",\"link\":\"#如何使用\",\"children\":[]},{\"level\":2,\"title\":\"测试string\",\"slug\":\"测试string\",\"link\":\"#测试string\",\"children\":[]},{\"level\":2,\"title\":\"测试hash\",\"slug\":\"测试hash\",\"link\":\"#测试hash\",\"children\":[]},{\"level\":2,\"title\":\"测试list\",\"slug\":\"测试list\",\"link\":\"#测试list\",\"children\":[]},{\"level\":2,\"title\":\"操纵set\",\"slug\":\"操纵set\",\"link\":\"#操纵set\",\"children\":[]},{\"level\":2,\"title\":\"操纵zset\",\"slug\":\"操纵zset\",\"link\":\"#操纵zset\",\"children\":[]},{\"level\":2,\"title\":\"测试HyperLogLog\",\"slug\":\"测试hyperloglog\",\"link\":\"#测试hyperloglog\",\"children\":[]},{\"level\":2,\"title\":\"测试 Bitmap\",\"slug\":\"测试-bitmap\",\"link\":\"#测试-bitmap\",\"children\":[]}],\"readingTime\":{\"minutes\":7.61,\"words\":2284},\"filePathRelative\":\"posts/Redis在Java 语言的使用 —— 使用 Jedis 测试 redis操纵几种常见数据类型的命令.md\",\"localizedDate\":\"2021年9月16日\",\"excerpt\":\"<h1> Jedis</h1>\\n<h2> Jedis介绍</h2>\\n<p>Jedis 是 Redis 官方首选的 Java 客户端开发包。</p>\\n<h2> 如何使用</h2>\\n<p>三样东西必不可少：</p>\\n<ol>\\n<li>jdk</li>\\n<li>redis-server</li>\\n<li>java的redis驱动</li>\\n</ol>\\n<p>我没有直接使用jar包导入，而是采用maven。</p>\\n<div class=\\\"language-xml line-numbers-mode\\\" data-ext=\\\"xml\\\"><pre class=\\\"language-xml\\\"><code>        <span class=\\\"token comment\\\">&lt;!-- https://mvnrepository.com/artifact/redis.clients/jedis --&gt;</span>\\n        <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n            <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>redis.clients<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n            <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>jedis<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n            <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>version</span><span class=\\\"token punctuation\\\">&gt;</span></span>3.3.0<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>version</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n        <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
