export const data = JSON.parse("{\"key\":\"v-0deed7e8\",\"path\":\"/docs/Zookeeper.html\",\"title\":\"Zookeeper\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Zookeeper\",\"date\":\"2022-09-26T11:01:58.000Z\",\"tags\":null,\"description\":\"节点类型 1.持久节点(PERSISTENT) 持久节点，创建后一直存在，直到主动删除此节点。 2.持久顺序节点(PERSISTENT_SEQUENTIAL) 持久顺序节点，创建后一直存在，直到主动删除此节点。在ZK中，每个父节点会为它的第一级子节点维护一份时序，记录每个子节点创建的先后顺序。 3.临时节点(EPHEMERAL) 临时节点在客户端会话失效后节点自动清除。临时节点下面不能创建子节点。 4.临时顺序节点(EPHEMERAL_SEQUENTIAL) 临时节点在客户端会话失效后节点自动清除。临时节点下面不能创建子节点。父节点getChildren会获得顺序的节点列表。\"},\"headers\":[{\"level\":2,\"title\":\"分布式屏障（通知）\",\"slug\":\"分布式屏障-通知\",\"link\":\"#分布式屏障-通知\",\"children\":[]},{\"level\":2,\"title\":\"分布式锁\",\"slug\":\"分布式锁\",\"link\":\"#分布式锁\",\"children\":[]}],\"readingTime\":{\"minutes\":3.46,\"words\":1037},\"filePathRelative\":\"docs/Zookeeper.md\",\"localizedDate\":\"2022年9月26日\",\"excerpt\":\"<h1> 节点类型</h1>\\n<p>1.持久节点(PERSISTENT)\\n持久节点，创建后一直存在，直到主动删除此节点。</p>\\n<p>2.持久顺序节点(PERSISTENT_SEQUENTIAL)\\n持久顺序节点，创建后一直存在，直到主动删除此节点。在ZK中，每个父节点会为它的第一级子节点维护一份时序，记录每个子节点创建的先后顺序。</p>\\n<p>3.临时节点(EPHEMERAL)\\n临时节点在客户端会话失效后节点自动清除。临时节点下面不能创建子节点。</p>\\n<p>4.临时顺序节点(EPHEMERAL_SEQUENTIAL)\\n临时节点在客户端会话失效后节点自动清除。临时节点下面不能创建子节点。父节点getChildren会获得顺序的节点列表。</p>\",\"autoDesc\":true}")

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
