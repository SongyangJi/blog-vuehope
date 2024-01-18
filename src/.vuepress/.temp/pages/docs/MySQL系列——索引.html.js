export const data = JSON.parse("{\"key\":\"v-372a38aa\",\"path\":\"/docs/MySQL%E7%B3%BB%E5%88%97%E2%80%94%E2%80%94%E7%B4%A2%E5%BC%95.html\",\"title\":\"MySQL系列——索引\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL系列——索引\",\"date\":\"2021-10-27T14:08:19.000Z\",\"categories\":\"MySQL\",\"tags\":[\"MySQL\",\"索引\"],\"description\":\"索引的数据结构 B树、B+树 关于 B树、B+树本身的介绍，不是本文的重点，之后也许会专门写一篇文章详细介绍， 这里直接就贴出wiki的链接了。 B树 B+树\"},\"headers\":[{\"level\":2,\"title\":\"B树、B+树\",\"slug\":\"b树、b-树\",\"link\":\"#b树、b-树\",\"children\":[]},{\"level\":2,\"title\":\"MyISAM引擎中的索引\",\"slug\":\"myisam引擎中的索引\",\"link\":\"#myisam引擎中的索引\",\"children\":[]},{\"level\":2,\"title\":\"InnoDB引擎中的索引\",\"slug\":\"innodb引擎中的索引\",\"link\":\"#innodb引擎中的索引\",\"children\":[{\"level\":3,\"title\":\"主键索引（聚簇索引）\",\"slug\":\"主键索引-聚簇索引\",\"link\":\"#主键索引-聚簇索引\",\"children\":[]},{\"level\":3,\"title\":\"二级索引（辅助索引）\",\"slug\":\"二级索引-辅助索引\",\"link\":\"#二级索引-辅助索引\",\"children\":[]}]},{\"level\":2,\"title\":\"聚簇索引 vs 非聚簇索引\",\"slug\":\"聚簇索引-vs-非聚簇索引\",\"link\":\"#聚簇索引-vs-非聚簇索引\",\"children\":[{\"level\":3,\"title\":\"优势\",\"slug\":\"优势\",\"link\":\"#优势\",\"children\":[]},{\"level\":3,\"title\":\"劣势\",\"slug\":\"劣势\",\"link\":\"#劣势\",\"children\":[]}]},{\"level\":2,\"title\":\"最左匹配原则\",\"slug\":\"最左匹配原则\",\"link\":\"#最左匹配原则\",\"children\":[]},{\"level\":2,\"title\":\"覆盖索引\",\"slug\":\"覆盖索引\",\"link\":\"#覆盖索引\",\"children\":[]},{\"level\":2,\"title\":\"合理建立联合索引\",\"slug\":\"合理建立联合索引\",\"link\":\"#合理建立联合索引\",\"children\":[]},{\"level\":2,\"title\":\"索引的创建\",\"slug\":\"索引的创建\",\"link\":\"#索引的创建\",\"children\":[]},{\"level\":2,\"title\":\"查看与删除索引\",\"slug\":\"查看与删除索引\",\"link\":\"#查看与删除索引\",\"children\":[]},{\"level\":2,\"title\":\"自适应哈希索引\",\"slug\":\"自适应哈希索引\",\"link\":\"#自适应哈希索引\",\"children\":[]},{\"level\":2,\"title\":\"索引下推（IPC）\",\"slug\":\"索引下推-ipc\",\"link\":\"#索引下推-ipc\",\"children\":[]}],\"readingTime\":{\"minutes\":11.07,\"words\":3320},\"filePathRelative\":\"docs/MySQL系列——索引.md\",\"localizedDate\":\"2021年10月27日\",\"excerpt\":\"<h1> 索引的数据结构</h1>\\n<h2> B树、B+树</h2>\\n<blockquote>\\n<p>关于 B树、B+树本身的介绍，不是本文的重点，之后也许会专门写一篇文章详细介绍，</p>\\n</blockquote>\\n<p>这里直接就贴出wiki的链接了。</p>\\n<p><a href=\\\"https://zh.wikipedia.org/wiki/B%E6%A0%91\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">B树</a></p>\\n<p><a href=\\\"https://zh.wikipedia.org/wiki/B%2B%E6%A0%91\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">B+树</a></p>\",\"autoDesc\":true}")

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
