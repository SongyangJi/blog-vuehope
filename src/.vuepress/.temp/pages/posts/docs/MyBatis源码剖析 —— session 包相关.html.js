export const data = JSON.parse("{\"key\":\"v-fe71cc1e\",\"path\":\"/posts/docs/MyBatis%E6%BA%90%E7%A0%81%E5%89%96%E6%9E%90%20%E2%80%94%E2%80%94%20session%20%E5%8C%85%E7%9B%B8%E5%85%B3.html\",\"title\":\"MyBatis源码剖析 —— session 包相关\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MyBatis源码剖析 —— session 包相关\",\"date\":\"2021-08-06T00:00:00.000Z\",\"categories\":\"MyBatis\",\"tags\":[\"MyBatis\",\"框架源码系列\"],\"description\":\"构建流程 从 SqlSessionFactoryBuilder 构建 SqlSessionFactory。 public SqlSessionFactory build(InputStream inputStream, String environment, Properties properties) { try { XMLConfigBuilder parser = new XMLConfigBuilder(inputStream, environment, properties); return build(parser.parse()); } } public SqlSessionFactory build(Configuration config) { return new DefaultSqlSessionFactory(config); }\"},\"headers\":[{\"level\":2,\"title\":\"SqlSessionFactory\",\"slug\":\"sqlsessionfactory\",\"link\":\"#sqlsessionfactory\",\"children\":[]},{\"level\":2,\"title\":\"DefaultSqlSessionFactory\",\"slug\":\"defaultsqlsessionfactory\",\"link\":\"#defaultsqlsessionfactory\",\"children\":[]},{\"level\":2,\"title\":\"SqlSession\",\"slug\":\"sqlsession\",\"link\":\"#sqlsession\",\"children\":[]},{\"level\":2,\"title\":\"DefaultSqlSession\",\"slug\":\"defaultsqlsession\",\"link\":\"#defaultsqlsession\",\"children\":[]},{\"level\":2,\"title\":\"SqlSessionManager\",\"slug\":\"sqlsessionmanager\",\"link\":\"#sqlsessionmanager\",\"children\":[]},{\"level\":2,\"title\":\"SqlSessionTemplate\",\"slug\":\"sqlsessiontemplate\",\"link\":\"#sqlsessiontemplate\",\"children\":[]}],\"readingTime\":{\"minutes\":4.02,\"words\":1205},\"filePathRelative\":\"posts/docs/MyBatis源码剖析 —— session 包相关.md\",\"localizedDate\":\"2021年8月6日\",\"excerpt\":\"<h1> 构建流程</h1>\\n<p>从 SqlSessionFactoryBuilder 构建 SqlSessionFactory。</p>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code>  <span class=\\\"token keyword\\\">public</span> <span class=\\\"token class-name\\\">SqlSessionFactory</span> <span class=\\\"token function\\\">build</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">InputStream</span> inputStream<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">String</span> environment<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">Properties</span> properties<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token keyword\\\">try</span> <span class=\\\"token punctuation\\\">{</span>\\n      <span class=\\\"token class-name\\\">XMLConfigBuilder</span> parser <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">XMLConfigBuilder</span><span class=\\\"token punctuation\\\">(</span>inputStream<span class=\\\"token punctuation\\\">,</span> environment<span class=\\\"token punctuation\\\">,</span> properties<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n      <span class=\\\"token keyword\\\">return</span> <span class=\\\"token function\\\">build</span><span class=\\\"token punctuation\\\">(</span>parser<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">parse</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>  \\n  <span class=\\\"token punctuation\\\">}</span>\\n  <span class=\\\"token keyword\\\">public</span> <span class=\\\"token class-name\\\">SqlSessionFactory</span> <span class=\\\"token function\\\">build</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">Configuration</span> config<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token keyword\\\">return</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">DefaultSqlSessionFactory</span><span class=\\\"token punctuation\\\">(</span>config<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n  <span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
