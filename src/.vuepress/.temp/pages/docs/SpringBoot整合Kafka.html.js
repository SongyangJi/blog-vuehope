export const data = JSON.parse("{\"key\":\"v-578a9a3f\",\"path\":\"/docs/SpringBoot%E6%95%B4%E5%90%88Kafka.html\",\"title\":\"SpringBoot整合Kafka收发消息\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"SpringBoot整合Kafka收发消息\",\"date\":\"2021-10-25T09:58:57.000Z\",\"categories\":\"消息中间件\",\"tags\":[\"Message Queue\",\"Kafka\"],\"description\":\"Maven依赖 &lt;dependency&gt; &lt;groupId&gt;org.springframework.kafka&lt;/groupId&gt; &lt;artifactId&gt;spring-kafka&lt;/artifactId&gt; &lt;/dependency&gt; &lt;!-- kafka 流处理相关 --&gt; &lt;dependency&gt; &lt;groupId&gt;org.apache.kafka&lt;/groupId&gt; &lt;artifactId&gt;kafka-streams&lt;/artifactId&gt; &lt;/dependency&gt; &lt;!-- 本地嵌入式kafka，测试用，可无需依赖 --&gt; &lt;dependency&gt; &lt;groupId&gt;org.springframework.kafka&lt;/groupId&gt; &lt;artifactId&gt;spring-kafka-test&lt;/artifactId&gt; &lt;scope&gt;test&lt;/scope&gt; &lt;/dependency&gt;\"},\"headers\":[{\"level\":2,\"title\":\"使用KafkaTemplate\",\"slug\":\"使用kafkatemplate\",\"link\":\"#使用kafkatemplate\",\"children\":[]},{\"level\":2,\"title\":\"发送模式\",\"slug\":\"发送模式\",\"link\":\"#发送模式\",\"children\":[{\"level\":3,\"title\":\"fire-and-forget（发完即忘）\",\"slug\":\"fire-and-forget-发完即忘\",\"link\":\"#fire-and-forget-发完即忘\",\"children\":[]},{\"level\":3,\"title\":\"阻塞\",\"slug\":\"阻塞\",\"link\":\"#阻塞\",\"children\":[]},{\"level\":3,\"title\":\"非阻塞\",\"slug\":\"非阻塞\",\"link\":\"#非阻塞\",\"children\":[]},{\"level\":3,\"title\":\"使用ReplyingKafkaTemplate\",\"slug\":\"使用replyingkafkatemplate\",\"link\":\"#使用replyingkafkatemplate\",\"children\":[]}]},{\"level\":2,\"title\":\"接受消息\",\"slug\":\"接受消息\",\"link\":\"#接受消息\",\"children\":[]}],\"readingTime\":{\"minutes\":3.52,\"words\":1055},\"filePathRelative\":\"docs/SpringBoot整合Kafka.md\",\"localizedDate\":\"2021年10月25日\",\"excerpt\":\"<h1> Maven依赖</h1>\\n<div class=\\\"language-xml line-numbers-mode\\\" data-ext=\\\"xml\\\"><pre class=\\\"language-xml\\\"><code><span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>org.springframework.kafka<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>spring-kafka<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n\\n<span class=\\\"token comment\\\">&lt;!-- kafka 流处理相关 --&gt;</span>\\n<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>org.apache.kafka<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>kafka-streams<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n\\n<span class=\\\"token comment\\\">&lt;!-- 本地嵌入式kafka，测试用，可无需依赖 --&gt;</span>\\n<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>org.springframework.kafka<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>spring-kafka-test<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>scope</span><span class=\\\"token punctuation\\\">&gt;</span></span>test<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>scope</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
