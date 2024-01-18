export const data = JSON.parse("{\"key\":\"v-329123ef\",\"path\":\"/posts/docs/Redis-%E9%9B%86%E7%BE%A4.html\",\"title\":\"Redis-集群\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis-集群\",\"date\":\"2021-12-16T14:17:42.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\",\"分布式\"],\"description\":\"一、集群的作用 集群，即Redis Cluster，是Redis 3.0开始引入的分布式存储方案。 集群由多个节点(Node)组成，Redis的数据分布在这些节点中。 集群中的节点分为主节点和从节点： 只有主节点负责读写请求和集群信息的维护；从节点只进行主节点数据和状态信息的复制。 集群的作用，可以归纳为两点： 数据分区：数据分区(或称数据分片)是集群最核心的功能。\"},\"headers\":[{\"level\":2,\"title\":\"1. 集群伸缩\",\"slug\":\"_1-集群伸缩\",\"link\":\"#_1-集群伸缩\",\"children\":[{\"level\":3,\"title\":\"增加节点\",\"slug\":\"增加节点\",\"link\":\"#增加节点\",\"children\":[]},{\"level\":3,\"title\":\"减少节点\",\"slug\":\"减少节点\",\"link\":\"#减少节点\",\"children\":[]},{\"level\":3,\"title\":\"ASK错误\",\"slug\":\"ask错误\",\"link\":\"#ask错误\",\"children\":[]}]},{\"level\":2,\"title\":\"2. 故障转移\",\"slug\":\"_2-故障转移\",\"link\":\"#_2-故障转移\",\"children\":[]},{\"level\":2,\"title\":\"3. 集群的限制及应对方法\",\"slug\":\"_3-集群的限制及应对方法\",\"link\":\"#_3-集群的限制及应对方法\",\"children\":[]},{\"level\":2,\"title\":\"4. Hash Tag\",\"slug\":\"_4-hash-tag\",\"link\":\"#_4-hash-tag\",\"children\":[]},{\"level\":2,\"title\":\"5. 参数优化\",\"slug\":\"_5-参数优化\",\"link\":\"#_5-参数优化\",\"children\":[{\"level\":3,\"title\":\"cluster_node_timeout\",\"slug\":\"cluster-node-timeout\",\"link\":\"#cluster-node-timeout\",\"children\":[]},{\"level\":3,\"title\":\"cluster-require-full-coverage\",\"slug\":\"cluster-require-full-coverage\",\"link\":\"#cluster-require-full-coverage\",\"children\":[]}]},{\"level\":2,\"title\":\"6. redis-trib.rb\",\"slug\":\"_6-redis-trib-rb\",\"link\":\"#_6-redis-trib-rb\",\"children\":[]}],\"readingTime\":{\"minutes\":11.64,\"words\":3491},\"filePathRelative\":\"posts/docs/Redis-集群.md\",\"localizedDate\":\"2021年12月16日\",\"excerpt\":\"<h1> 一、集群的作用</h1>\\n<p>集群，即Redis Cluster，是Redis 3.0开始引入的分布式存储方案。</p>\\n<p>集群由多个节点(Node)组成，Redis的数据分布在这些节点中。</p>\\n<p><strong>集群中的节点分为主节点和从节点</strong>：</p>\\n<p><strong>只有主节点负责读写请求和集群信息的维护；从节点只进行主节点数据和状态信息的复制</strong>。</p>\\n<p>集群的作用，可以归纳为两点：</p>\\n<ol>\\n<li><strong>数据分区</strong>：数据分区(或称数据分片)是集群最核心的功能。</li>\\n</ol>\",\"autoDesc\":true}")

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
