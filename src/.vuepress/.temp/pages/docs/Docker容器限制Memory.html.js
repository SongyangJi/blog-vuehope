export const data = JSON.parse("{\"key\":\"v-cc030d80\",\"path\":\"/docs/Docker%E5%AE%B9%E5%99%A8%E9%99%90%E5%88%B6Memory.html\",\"title\":\"Docker容器限制Memory\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Docker容器限制Memory\",\"date\":\"2022-06-10T10:49:04.000Z\",\"categories\":\"Docker\",\"tags\":[\"Docker\",\"资源限制\"],\"description\":\"默认情况下容器使用的资源是不受限制的。也就是可以使用主机内核调度器所允许的最大资源。但是在容器的使用过程中，经常需要对容器可以使用的主机资源进行限制，本文介绍如何限制容器可以使用的主机内存。 压测工具 使用ubuntu的stress 作为压测工具，并制作镜像 FROM ubuntu:latest RUN apt-get update &amp;&amp; \\\\ apt-get install stress\"},\"headers\":[{\"level\":2,\"title\":\"限制内存使用上限\",\"slug\":\"限制内存使用上限\",\"link\":\"#限制内存使用上限\",\"children\":[]},{\"level\":2,\"title\":\"限制可用的 swap 大小\",\"slug\":\"限制可用的-swap-大小\",\"link\":\"#限制可用的-swap-大小\",\"children\":[]}],\"readingTime\":{\"minutes\":5.23,\"words\":1569},\"filePathRelative\":\"docs/Docker容器限制Memory.md\",\"localizedDate\":\"2022年6月10日\",\"excerpt\":\"<blockquote>\\n<p>默认情况下容器使用的资源是不受限制的。也就是可以使用主机内核调度器所允许的最大资源。但是在容器的使用过程中，经常需要对容器可以使用的主机资源进行限制，本文介绍如何限制容器可以使用的主机内存。</p>\\n</blockquote>\\n<h1> 压测工具</h1>\\n<p>使用ubuntu的<code>stress</code> 作为压测工具，并制作镜像</p>\\n<div class=\\\"language-docker line-numbers-mode\\\" data-ext=\\\"docker\\\"><pre class=\\\"language-docker\\\"><code><span class=\\\"token instruction\\\"><span class=\\\"token keyword\\\">FROM</span> ubuntu:latest</span>\\n\\n<span class=\\\"token instruction\\\"><span class=\\\"token keyword\\\">RUN</span> apt-get update &amp;&amp; <span class=\\\"token operator\\\">\\\\</span>\\n        apt-get install stress</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
