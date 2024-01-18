export const data = JSON.parse("{\"key\":\"v-7131dd3c\",\"path\":\"/docs/Rabbitmq%E6%B6%88%E6%81%AF%E6%A8%A1%E5%9E%8B.html\",\"title\":\"Rabbitmq消息模型\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Rabbitmq消息模型\",\"date\":\"2022-08-13T23:53:09.000Z\",\"categories\":\"消息中间件\",\"tags\":[\"Message Queue\",\"RabbitMQ\"],\"description\":\"基本模型 单个消费者 多个消费者并发消费 如果有多个消费者，它们会共同消费这个队列里的消息，是负载均衡的实现方式，官方称这叫\\\"Work Queues\\\"。\"},\"headers\":[{\"level\":2,\"title\":\"单个消费者\",\"slug\":\"单个消费者\",\"link\":\"#单个消费者\",\"children\":[]},{\"level\":2,\"title\":\"多个消费者并发消费\",\"slug\":\"多个消费者并发消费\",\"link\":\"#多个消费者并发消费\",\"children\":[]},{\"level\":2,\"title\":\"直连交换机(Direct Exchange)\",\"slug\":\"直连交换机-direct-exchange\",\"link\":\"#直连交换机-direct-exchange\",\"children\":[]},{\"level\":2,\"title\":\"扇出交换机(Fanout Exchange)\",\"slug\":\"扇出交换机-fanout-exchange\",\"link\":\"#扇出交换机-fanout-exchange\",\"children\":[]},{\"level\":2,\"title\":\"主题交换机（Topic Exchange）\",\"slug\":\"主题交换机-topic-exchange\",\"link\":\"#主题交换机-topic-exchange\",\"children\":[]}],\"readingTime\":{\"minutes\":1.79,\"words\":537},\"filePathRelative\":\"docs/Rabbitmq消息模型.md\",\"localizedDate\":\"2022年8月14日\",\"excerpt\":\"<h1> 基本模型</h1>\\n<h2> 单个消费者</h2>\\n<figure><img src=\\\"https://www.rabbitmq.com/img/tutorials/python-one-overall.png\\\" alt=\\\"\\\" tabindex=\\\"0\\\" loading=\\\"lazy\\\"><figcaption></figcaption></figure>\\n<h2> 多个消费者并发消费</h2>\\n<p><img src=\\\"https://www.rabbitmq.com/img/tutorials/python-two.png\\\" alt=\\\"\\\" loading=\\\"lazy\\\">\\n如果有多个消费者，它们会共同消费这个队列里的消息，是负载均衡的实现方式，官方称这叫\\\"Work Queues\\\"。</p>\",\"autoDesc\":true}")

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
