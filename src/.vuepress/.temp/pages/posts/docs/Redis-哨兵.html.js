export const data = JSON.parse("{\"key\":\"v-758b1d4f\",\"path\":\"/posts/docs/Redis-%E5%93%A8%E5%85%B5.html\",\"title\":\"Redis-哨兵\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis-哨兵\",\"date\":\"2021-12-09T20:43:29.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\",\"分布式\"],\"description\":\"Redis主从复制的作用有数据热备、负载均衡、故障恢复等；但主从复制存在的一个问题是故障恢复无法自动化。本文将要介绍的哨兵，它基于Redis主从复制，主要作用便是解决主节点故障恢复的自动化问题，进一步提高系统的高可用性。 部署哨兵节点 哨兵节点本质上是特殊的Redis节点，它的两个基本功能是监控和故障转移。 新建一个配置文件sentinel.conf,内容为\"},\"headers\":[{\"level\":2,\"title\":\"部署哨兵节点\",\"slug\":\"部署哨兵节点\",\"link\":\"#部署哨兵节点\",\"children\":[]},{\"level\":2,\"title\":\"Jedis使用哨兵\",\"slug\":\"jedis使用哨兵\",\"link\":\"#jedis使用哨兵\",\"children\":[]},{\"level\":2,\"title\":\"哨兵的原理\",\"slug\":\"哨兵的原理\",\"link\":\"#哨兵的原理\",\"children\":[{\"level\":3,\"title\":\"建立连接\",\"slug\":\"建立连接\",\"link\":\"#建立连接\",\"children\":[]},{\"level\":3,\"title\":\"定时任务\",\"slug\":\"定时任务\",\"link\":\"#定时任务\",\"children\":[]},{\"level\":3,\"title\":\"主观下线和客观下线\",\"slug\":\"主观下线和客观下线\",\"link\":\"#主观下线和客观下线\",\"children\":[]},{\"level\":3,\"title\":\"选举领导者哨兵节点\",\"slug\":\"选举领导者哨兵节点\",\"link\":\"#选举领导者哨兵节点\",\"children\":[]},{\"level\":3,\"title\":\"故障恢复\",\"slug\":\"故障恢复\",\"link\":\"#故障恢复\",\"children\":[]}]},{\"level\":2,\"title\":\"配置与实践建议\",\"slug\":\"配置与实践建议\",\"link\":\"#配置与实践建议\",\"children\":[{\"level\":3,\"title\":\"参数配置\",\"slug\":\"参数配置\",\"link\":\"#参数配置\",\"children\":[]},{\"level\":3,\"title\":\"实践建议\",\"slug\":\"实践建议\",\"link\":\"#实践建议\",\"children\":[]}]}],\"readingTime\":{\"minutes\":10.22,\"words\":3067},\"filePathRelative\":\"posts/docs/Redis-哨兵.md\",\"localizedDate\":\"2021年12月10日\",\"excerpt\":\"<blockquote>\\n<p>Redis主从复制的作用有数据热备、负载均衡、故障恢复等；但主从复制存在的一个问题是故障恢复无法自动化。本文将要介绍的哨兵，它基于Redis主从复制，主要作用便是解决主节点故障恢复的自动化问题，进一步提高系统的高可用性。</p>\\n</blockquote>\\n<h2> 部署哨兵节点</h2>\\n<p><strong>哨兵节点本质上是特殊的Redis节点</strong>，它的两个基本功能是<strong>监控</strong>和<strong>故障转移</strong>。</p>\\n<p>新建一个配置文件<code>sentinel.conf</code>,内容为</p>\",\"autoDesc\":true}")

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
