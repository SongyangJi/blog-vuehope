export const data = JSON.parse("{\"key\":\"v-6f184051\",\"path\":\"/docs/Unix%E4%B8%AD%E7%9A%84%E4%BA%94%E7%A7%8D%20IO%20%E6%A8%A1%E5%9E%8B.html\",\"title\":\"Unix/Linux 中的五种 IO 模型\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Unix/Linux 中的五种 IO 模型\",\"date\":\"2021-11-20T20:20:00.000Z\",\"categories\":\"IO\",\"tags\":[\"Linux\",\"IO\"],\"description\":\"前言 IO模型的选择在Linux网络编程中十分重要，在Unix/Linux环境中主要提供了五种不同的IO模型，分别是 阻塞式IO（blocking IO）； 非阻塞式IO（nonblocking IO）； IO多路复用（ IO multiplexing）； 信号驱动式IO（signal driven IO）； 异步IO（asynchronous IO）。 通常一个输入操作包含两个不同阶段： 等待数据准备好 从内核向进程复制数据\"},\"headers\":[{\"level\":2,\"title\":\"阻塞与非阻塞\",\"slug\":\"阻塞与非阻塞\",\"link\":\"#阻塞与非阻塞\",\"children\":[]},{\"level\":2,\"title\":\"同步与异步\",\"slug\":\"同步与异步\",\"link\":\"#同步与异步\",\"children\":[]},{\"level\":2,\"title\":\"非阻塞与异步的区别\",\"slug\":\"非阻塞与异步的区别\",\"link\":\"#非阻塞与异步的区别\",\"children\":[]}],\"readingTime\":{\"minutes\":8.94,\"words\":2682},\"filePathRelative\":\"docs/Unix中的五种 IO 模型.md\",\"localizedDate\":\"2021年11月21日\",\"excerpt\":\"<h1> 前言</h1>\\n<p>IO模型的选择在Linux网络编程中十分重要，在Unix/Linux环境中主要提供了五种不同的IO模型，分别是</p>\\n<ol>\\n<li>阻塞式IO（blocking IO）；</li>\\n<li>非阻塞式IO（nonblocking IO）；</li>\\n<li>IO多路复用（ IO multiplexing）；</li>\\n<li>信号驱动式IO（signal driven IO）；</li>\\n<li>异步IO（asynchronous IO）。</li>\\n</ol>\\n<p>通常一个输入操作包含两个不同阶段：</p>\\n<ol>\\n<li>等待数据准备好</li>\\n<li>从内核向进程复制数据</li>\\n</ol>\",\"autoDesc\":true}")

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
