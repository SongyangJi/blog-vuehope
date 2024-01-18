export const data = JSON.parse("{\"key\":\"v-429d9f3e\",\"path\":\"/docs/%E5%88%86%E5%B8%83%E5%BC%8FID.html\",\"title\":\"分布式ID\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"分布式ID\",\"date\":\"2022-09-28T10:48:10.000Z\",\"categories\":\"分布式\",\"tags\":null,\"description\":\"UUID 优点： 生成足够简单，本地生成无网络消耗，具有唯一性 缺点： 无序的字符串，不具备趋势自增特性 没有具体的业务含义 长度过长16 字节128位，36位长度的字符串，存储以及查询对MySQL的性能消耗较大，MySQL官方明确建议主键要尽量越短越好，作为数据库主键 UUID 的无序性会导致数据位置频繁变动，严重影响性能。 Snowflake——雪花算法\"},\"headers\":[{\"level\":2,\"title\":\"优点\",\"slug\":\"优点\",\"link\":\"#优点\",\"children\":[]},{\"level\":2,\"title\":\"缺点\",\"slug\":\"缺点\",\"link\":\"#缺点\",\"children\":[]},{\"level\":2,\"title\":\"优点\",\"slug\":\"优点-1\",\"link\":\"#优点-1\",\"children\":[]},{\"level\":2,\"title\":\"缺点\",\"slug\":\"缺点-1\",\"link\":\"#缺点-1\",\"children\":[]}],\"readingTime\":{\"minutes\":5.41,\"words\":1624},\"filePathRelative\":\"docs/分布式ID.md\",\"localizedDate\":\"2022年9月28日\",\"excerpt\":\"<h1> UUID</h1>\\n<p><strong>优点：</strong></p>\\n<ul>\\n<li>生成足够简单，本地生成无网络消耗，具有唯一性</li>\\n</ul>\\n<p><strong>缺点：</strong></p>\\n<ul>\\n<li>无序的字符串，不具备趋势自增特性</li>\\n<li>没有具体的业务含义</li>\\n<li>长度过长16 字节128位，36位长度的字符串，存储以及查询对MySQL的性能消耗较大，MySQL官方明确建议主键要尽量越短越好，作为数据库主键 <code>UUID</code> 的无序性会导致数据位置频繁变动，严重影响性能。</li>\\n</ul>\\n<h1> Snowflake——雪花算法</h1>\",\"autoDesc\":true}")

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
