export const data = JSON.parse("{\"key\":\"v-0112101a\",\"path\":\"/posts/docs/Kafka%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0.html\",\"title\":\"Kafka配置参数\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Kafka配置参数\",\"date\":\"2023-01-09T00:25:00.000Z\",\"categories\":\"消息中间件\",\"tags\":[\"Message Queue\",\"Kafka\"],\"description\":\"Producer主要消息配置 buffer.memory 缓冲消息的缓冲区大小（默认值32MB） retries 可重试异常的自动重试次数 batch.size 当一个batch满的时候，producer会发送此batch的所有消息（默认值16KB） linger.ms 发送消息的延迟时间（即使batch没有满，也会发送消息，和batch.size配合使用） max.request.size 控制producer单条消息的大小 request.timeout.ms broker需要在此规定时间内返回处理结果\"},\"headers\":[{\"level\":2,\"title\":\"Producer端\",\"slug\":\"producer端\",\"link\":\"#producer端\",\"children\":[]},{\"level\":2,\"title\":\"Broker配置\",\"slug\":\"broker配置\",\"link\":\"#broker配置\",\"children\":[]}],\"readingTime\":{\"minutes\":3.58,\"words\":1073},\"filePathRelative\":\"posts/docs/Kafka配置参数.md\",\"localizedDate\":\"2023年1月9日\",\"excerpt\":\"<h1> Producer主要消息配置</h1>\\n<ol>\\n<li>buffer.memory 缓冲消息的缓冲区大小（默认值32MB）</li>\\n<li>retries <strong>可重试异常的自动重试次数</strong></li>\\n<li>batch.size 当一个batch满的时候，producer会发送此batch的所有消息（默认值16KB）</li>\\n<li>linger.ms 发送消息的延迟时间（即使batch没有满，也会发送消息，和batch.size配合使用）</li>\\n<li>max.request.size 控制producer单条消息的大小</li>\\n<li>request.timeout.ms broker需要在此规定时间内返回处理结果</li>\\n</ol>\",\"autoDesc\":true}")

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
