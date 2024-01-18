export const data = JSON.parse("{\"key\":\"v-848850f2\",\"path\":\"/posts/docs/Docker%E5%BA%95%E5%B1%82%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF-Cgroups.html\",\"title\":\"Docker底层核心技术-Cgroups\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Docker底层核心技术-Cgroups\",\"date\":\"2022-10-18T19:00:41.000Z\",\"categories\":\"Docker\",\"tags\":[\"Docker\"],\"description\":\"我们知道使用不同的 Namespace，可以实现容器中的进程看不到别的容器的资源，但是有一个问题你是否注意到？容器内的进程仍然可以任意地使用主机的 CPU 、内存等资源，如果某一个容器使用的主机资源过多，可能导致主机的资源竞争，进而影响业务。那如果我们想限制一个容器资源的使用（如 CPU、内存等）应该如何做呢？ 这里就需要用到 Linux 内核的另一个核心技术cgroups。那么究竟什么是cgroups？我们应该如何使用cgroups？Docker 又是如何使用cgroups的？ cgroups\"},\"headers\":[{\"level\":2,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}],\"readingTime\":{\"minutes\":3.68,\"words\":1104},\"filePathRelative\":\"posts/docs/Docker底层核心技术-Cgroups.md\",\"localizedDate\":\"2022年10月19日\",\"excerpt\":\"<blockquote>\\n<p>我们知道使用不同的 Namespace，可以实现容器中的进程看不到别的容器的资源，但是有一个问题你是否注意到？容器内的进程仍然可以任意地使用主机的 CPU 、内存等资源，如果某一个容器使用的主机资源过多，可能导致主机的资源竞争，进而影响业务。那如果我们想限制一个容器资源的使用（如 CPU、内存等）应该如何做呢？</p>\\n</blockquote>\\n<p>这里就需要用到 Linux 内核的另一个核心技术cgroups。那么究竟什么是cgroups？我们应该如何使用cgroups？Docker 又是如何使用cgroups的？</p>\\n<h1> cgroups</h1>\",\"autoDesc\":true}")

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
