export const data = JSON.parse("{\"key\":\"v-3e89eed8\",\"path\":\"/docs/MyBatis%E6%BA%90%E7%A0%81%E5%89%96%E6%9E%90%20%E2%80%94%E2%80%94%20executor%20%E5%8C%85%E7%9B%B8%E5%85%B3%20%E2%80%94%E2%80%94%20Executor%E3%80%81Statement.html\",\"title\":\"MyBatis源码剖析 —— executor 包相关之Executor、Statement\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MyBatis源码剖析 —— executor 包相关之Executor、Statement\",\"date\":\"2021-08-08T00:00:00.000Z\",\"categories\":\"MyBatis\",\"tags\":[\"MyBatis\",\"框架源码系列\"],\"description\":\"Executor相关 只列出了两个有代表性的方法。 package org.apache.ibatis.executor; public interface Executor { int update(MappedStatement ms, Object parameter) throws SQLException; &lt;E&gt; List&lt;E&gt; query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey cacheKey, BoundSql boundSql) throws SQLException; }\"},\"headers\":[{\"level\":2,\"title\":\"BaseExecutor\",\"slug\":\"baseexecutor\",\"link\":\"#baseexecutor\",\"children\":[]},{\"level\":2,\"title\":\"SimpleExecutor\",\"slug\":\"simpleexecutor\",\"link\":\"#simpleexecutor\",\"children\":[]},{\"level\":2,\"title\":\"StatementHandler\",\"slug\":\"statementhandler\",\"link\":\"#statementhandler\",\"children\":[]},{\"level\":2,\"title\":\"BaseStatementHandler\",\"slug\":\"basestatementhandler\",\"link\":\"#basestatementhandler\",\"children\":[]}],\"readingTime\":{\"minutes\":4.51,\"words\":1352},\"filePathRelative\":\"docs/MyBatis源码剖析 —— executor 包相关 —— Executor、Statement.md\",\"localizedDate\":\"2021年8月8日\",\"excerpt\":\"<h1> Executor相关</h1>\\n<p>只列出了两个有代表性的方法。</p>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token keyword\\\">package</span> <span class=\\\"token namespace\\\">org<span class=\\\"token punctuation\\\">.</span>apache<span class=\\\"token punctuation\\\">.</span>ibatis<span class=\\\"token punctuation\\\">.</span>executor</span><span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">interface</span> <span class=\\\"token class-name\\\">Executor</span> <span class=\\\"token punctuation\\\">{</span>\\n\\n  <span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">update</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">MappedStatement</span> ms<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">Object</span> parameter<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">throws</span> <span class=\\\"token class-name\\\">SQLException</span><span class=\\\"token punctuation\\\">;</span>\\n\\n  <span class=\\\"token generics\\\"><span class=\\\"token punctuation\\\">&lt;</span><span class=\\\"token class-name\\\">E</span><span class=\\\"token punctuation\\\">&gt;</span></span> <span class=\\\"token class-name\\\">List</span><span class=\\\"token generics\\\"><span class=\\\"token punctuation\\\">&lt;</span><span class=\\\"token class-name\\\">E</span><span class=\\\"token punctuation\\\">&gt;</span></span> <span class=\\\"token function\\\">query</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">MappedStatement</span> ms<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">Object</span> parameter<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">RowBounds</span> rowBounds<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">ResultHandler</span> resultHandler<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">CacheKey</span> cacheKey<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">BoundSql</span> boundSql<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">throws</span> <span class=\\\"token class-name\\\">SQLException</span><span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
