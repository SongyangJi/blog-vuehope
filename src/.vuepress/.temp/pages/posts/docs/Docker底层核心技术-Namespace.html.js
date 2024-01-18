export const data = JSON.parse("{\"key\":\"v-18798763\",\"path\":\"/posts/docs/Docker%E5%BA%95%E5%B1%82%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF-Namespace.html\",\"title\":\"Docker底层核心技术-Namespace\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Docker底层核心技术-Namespace\",\"date\":\"2022-06-11T15:50:01.000Z\",\"categories\":\"Docker\",\"tags\":[\"Docker\"],\"description\":\"我们知道， Docker 是使用 Linux 的 Namespace 技术实现各种资源隔离的。那么究竟什么是 Namespace，各种 Namespace 都有什么作用，为什么 Docker 需要 Namespace呢？ 什么是 Namespace？ Linux Namespace 是 Linux 提供的一种内核级别环境隔离的方法。用官方的话来说，Linux Namespace 将全局系统资源封装在一个抽象中，从而使 namespace 内的进程认为自己具有独立的资源实例。这项技术本来没有掀起多大的波澜，是容器技术的崛起让他重新引起了大家的注意。\"},\"headers\":[{\"level\":2,\"title\":\"Mount Namespace\",\"slug\":\"mount-namespace\",\"link\":\"#mount-namespace\",\"children\":[]},{\"level\":2,\"title\":\"PID Namespace\",\"slug\":\"pid-namespace\",\"link\":\"#pid-namespace\",\"children\":[]},{\"level\":2,\"title\":\"UTS Namespace\",\"slug\":\"uts-namespace\",\"link\":\"#uts-namespace\",\"children\":[]},{\"level\":2,\"title\":\"IPC Namespace\",\"slug\":\"ipc-namespace\",\"link\":\"#ipc-namespace\",\"children\":[]},{\"level\":2,\"title\":\"User Namespace\",\"slug\":\"user-namespace\",\"link\":\"#user-namespace\",\"children\":[]},{\"level\":2,\"title\":\"Net Namespace\",\"slug\":\"net-namespace\",\"link\":\"#net-namespace\",\"children\":[]}],\"readingTime\":{\"minutes\":8.34,\"words\":2503},\"filePathRelative\":\"posts/docs/Docker底层核心技术-Namespace.md\",\"localizedDate\":\"2022年6月11日\",\"excerpt\":\"<blockquote>\\n<p>我们知道， Docker 是使用 Linux 的 Namespace 技术实现各种资源隔离的。那么究竟什么是 Namespace，各种 Namespace 都有什么作用，为什么 Docker 需要 Namespace呢？</p>\\n</blockquote>\\n<h1> 什么是 Namespace？</h1>\\n<p><code>Linux Namespace</code> 是 Linux 提供的一种内核级别环境隔离的方法。用官方的话来说，Linux Namespace 将全局系统资源封装在一个抽象中，从而使 namespace 内的进程认为自己具有独立的资源实例。这项技术本来没有掀起多大的波澜，是容器技术的崛起让他重新引起了大家的注意。</p>\",\"autoDesc\":true}")

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
