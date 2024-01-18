export const data = JSON.parse("{\"key\":\"v-c57ba6b4\",\"path\":\"/posts/docs/Redis-pipeline.html\",\"title\":\"Redis的pipeline\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis的pipeline\",\"date\":\"2022-04-15T18:03:53.000Z\",\"categories\":\"Redis\",\"description\":\"普通请求：等待上一条命令应答后再执行，中间不仅仅多了RTT，而且还频繁的调用系统IO，发送网络请求 mget：节省RTT，但是前面的key需要等待最后一个key回复 pineline：节省RTT，减少IO调用次数 RTT(Round-Trip Time): 往返时延。在计算机网络中它是一个重要的性能指标，表示从发送端发送数据开始，到发送端收到来自接收端的确认（接收端收到数据后便立即发送确认），总共经历的时延。 RTT=传播时延（往返哒）+排队时延（路由器和交换机的）+数据处理时延（应用程序的）。\"},\"headers\":[],\"readingTime\":{\"minutes\":1.72,\"words\":517},\"filePathRelative\":\"posts/docs/Redis-pipeline.md\",\"localizedDate\":\"2022年4月16日\",\"excerpt\":\"\\n\\n<ul>\\n<li>\\n<p>普通请求：等待上一条命令应答后再执行，中间不仅仅多了RTT，而且还频繁的调用系统IO，发送网络请求</p>\\n</li>\\n<li>\\n<p>mget：节省RTT，但是前面的key需要等待最后一个key回复</p>\\n</li>\\n<li>\\n<p>pineline：节省RTT，减少IO调用次数</p>\\n</li>\\n</ul>\\n<p>RTT(Round-Trip Time): 往返时延。在计算机网络中它是一个重要的性能指标，表示从发送端发送数据开始，到发送端收到来自接收端的确认（接收端收到数据后便立即发送确认），总共经历的时延。</p>\\n<p>RTT=传播时延（往返哒）+排队时延（路由器和交换机的）+数据处理时延（应用程序的）。</p>\",\"autoDesc\":true}")

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
