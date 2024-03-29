export const data = JSON.parse("{\"key\":\"v-5a0b24ee\",\"path\":\"/posts/docs/Kafka-1.html\",\"title\":\"Kafka背景及架构介绍\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Kafka背景及架构介绍\",\"date\":\"2021-11-24T17:25:57.000Z\",\"categories\":\"消息中间件\",\"tags\":[\"Message Queue\",\"Kafka\"],\"description\":\"Kafka简介 Kafka是一种分布式的，基于发布/订阅的消息系统。主要设计目标如下： 快写：以时间复杂度为O(1)的方式提供消息持久化能力，即使对TB级以上数据也能保证常数时间复杂度的访问性能； 高吞吐率：即使在非常廉价的商用机器上也能做到单机支持每秒100K条以上消息的传输； 支持Kafka Server间的消息分区，及分布式消费，同时保证每个Partition内的消息顺序传输； 同时支持离线数据处理和实时数据处理； 扩容：支持在线水平扩展。 为何使用消息系统\"},\"headers\":[{\"level\":2,\"title\":\"Kafka名词术语\",\"slug\":\"kafka名词术语\",\"link\":\"#kafka名词术语\",\"children\":[{\"level\":3,\"title\":\"topic 和 partition\",\"slug\":\"topic-和-partition\",\"link\":\"#topic-和-partition\",\"children\":[]},{\"level\":3,\"title\":\"replica\",\"slug\":\"replica\",\"link\":\"#replica\",\"children\":[]}]},{\"level\":2,\"title\":\"Kafka拓扑结构\",\"slug\":\"kafka拓扑结构\",\"link\":\"#kafka拓扑结构\",\"children\":[]},{\"level\":2,\"title\":\"Topic & Partition\",\"slug\":\"topic-partition\",\"link\":\"#topic-partition\",\"children\":[]},{\"level\":2,\"title\":\"Producer消息路由\",\"slug\":\"producer消息路由\",\"link\":\"#producer消息路由\",\"children\":[]},{\"level\":2,\"title\":\"Consumer Group\",\"slug\":\"consumer-group\",\"link\":\"#consumer-group\",\"children\":[]},{\"level\":2,\"title\":\"Push vs. Pull\",\"slug\":\"push-vs-pull\",\"link\":\"#push-vs-pull\",\"children\":[]}],\"readingTime\":{\"minutes\":10.1,\"words\":3031},\"filePathRelative\":\"posts/docs/Kafka-1.md\",\"localizedDate\":\"2021年11月25日\",\"excerpt\":\"<h1> Kafka简介</h1>\\n<p>Kafka是一种分布式的，基于发布/订阅的消息系统。主要设计目标如下：</p>\\n<ul>\\n<li>快写：以时间复杂度为O(1)的方式提供消息持久化能力，即使对TB级以上数据也能保证常数时间复杂度的访问性能；</li>\\n<li>高吞吐率：即使在非常廉价的商用机器上也能做到单机支持每秒100K条以上消息的传输；</li>\\n<li>支持Kafka Server间的消息分区，及分布式消费，同时保证每个Partition内的消息顺序传输；</li>\\n<li>同时支持离线数据处理和实时数据处理；</li>\\n<li>扩容：支持在线水平扩展。</li>\\n</ul>\\n<h1> 为何使用消息系统</h1>\",\"autoDesc\":true}")

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
