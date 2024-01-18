export const data = JSON.parse("{\"key\":\"v-2ae9f822\",\"path\":\"/posts/docs/MongoDB%20%E7%B4%A2%E5%BC%95.html\",\"title\":\"MongoDB 索引\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MongoDB 索引\",\"date\":\"2021-11-02T08:08:21.000Z\",\"categories\":\"NoSQL\",\"tags\":[\"NoSQL\",\"MongoDB\"],\"description\":\"索引支持在 MongoDB 中高效执行查询。 如果没有索引，MongoDB 必须执行集合扫描，即扫描集合中的每个文档，以选择那些与查询语句匹配的文档。如果查询存在合适的索引，MongoDB 可以使用该索引来限制它必须检查的文档数量。 索引是特殊的数据结构（MongoDB 索引使用 B 树数据结构），它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或字段集的值，按字段值排序。索引条目的排序支持高效的等式匹配和基于范围的查询操作。此外，MongoDB 可以使用索引中的排序返回排序结果。\"},\"headers\":[{\"level\":2,\"title\":\"默认_id索引\",\"slug\":\"默认-id索引\",\"link\":\"#默认-id索引\",\"children\":[]},{\"level\":2,\"title\":\"创建索引\",\"slug\":\"创建索引\",\"link\":\"#创建索引\",\"children\":[]},{\"level\":2,\"title\":\"查看索引\",\"slug\":\"查看索引\",\"link\":\"#查看索引\",\"children\":[]},{\"level\":2,\"title\":\"索引类型\",\"slug\":\"索引类型\",\"link\":\"#索引类型\",\"children\":[{\"level\":3,\"title\":\"单字段索引\",\"slug\":\"单字段索引\",\"link\":\"#单字段索引\",\"children\":[]},{\"level\":3,\"title\":\"复合索引\",\"slug\":\"复合索引\",\"link\":\"#复合索引\",\"children\":[]},{\"level\":3,\"title\":\"多键索引\",\"slug\":\"多键索引\",\"link\":\"#多键索引\",\"children\":[]},{\"level\":3,\"title\":\"哈希索引\",\"slug\":\"哈希索引\",\"link\":\"#哈希索引\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.58,\"words\":774},\"filePathRelative\":\"posts/docs/MongoDB 索引.md\",\"localizedDate\":\"2021年11月2日\",\"excerpt\":\"<p>索引支持在 MongoDB 中高效执行查询。</p>\\n<p><strong>如果没有索引，MongoDB 必须执行<em>集合扫描</em>，即扫描<em>集合中的</em>每个文档，以选择那些与查询语句匹配的文档</strong>。如果查询存在合适的索引，MongoDB 可以使用该索引来限制它必须检查的文档数量。</p>\\n<p>索引是特殊的数据结构（<strong>MongoDB 索引使用 B 树数据结构</strong>），它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或字段集的值，按字段值排序。索引条目的排序支持高效的等式匹配和基于范围的查询操作。此外，MongoDB 可以使用索引中的排序返回排序结果。</p>\",\"autoDesc\":true}")

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
