export const data = JSON.parse("{\"key\":\"v-ea25ce26\",\"path\":\"/posts/docs/Docker%E5%AE%B9%E5%99%A8%E9%99%90%E5%88%B6CPU.html\",\"title\":\"Docker容器限制CPU\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Docker容器限制CPU\",\"date\":\"2022-06-09T11:11:04.000Z\",\"categories\":\"Docker\",\"tags\":[\"Docker\",\"资源限制\"],\"description\":\"压测工具 使用ubuntu的stress 作为压测工具，并制作镜像 FROM ubuntu:latest RUN apt-get update &amp;&amp; \\\\ apt-get install stress\"},\"headers\":[{\"level\":2,\"title\":\"限制CPU核心个数（百分比）\",\"slug\":\"限制cpu核心个数-百分比\",\"link\":\"#限制cpu核心个数-百分比\",\"children\":[]},{\"level\":2,\"title\":\"指定固定的 CPU集\",\"slug\":\"指定固定的-cpu集\",\"link\":\"#指定固定的-cpu集\",\"children\":[]},{\"level\":2,\"title\":\"设置使用 CPU 的权重\",\"slug\":\"设置使用-cpu-的权重\",\"link\":\"#设置使用-cpu-的权重\",\"children\":[]}],\"readingTime\":{\"minutes\":3.9,\"words\":1169},\"filePathRelative\":\"posts/docs/Docker容器限制CPU.md\",\"localizedDate\":\"2022年6月9日\",\"excerpt\":\"<h1> 压测工具</h1>\\n<p>使用ubuntu的<code>stress</code> 作为压测工具，并制作镜像</p>\\n<div class=\\\"language-docker line-numbers-mode\\\" data-ext=\\\"docker\\\"><pre class=\\\"language-docker\\\"><code><span class=\\\"token instruction\\\"><span class=\\\"token keyword\\\">FROM</span> ubuntu:latest</span>\\n\\n<span class=\\\"token instruction\\\"><span class=\\\"token keyword\\\">RUN</span> apt-get update &amp;&amp; <span class=\\\"token operator\\\">\\\\</span>\\n        apt-get install stress</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
