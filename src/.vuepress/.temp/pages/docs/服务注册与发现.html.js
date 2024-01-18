export const data = JSON.parse("{\"key\":\"v-f7238c4c\",\"path\":\"/docs/%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.html\",\"title\":\"服务注册与发现\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"服务注册与发现\",\"date\":\"2022-03-29T03:51:11.000Z\",\"categories\":\"分布式\",\"tags\":null,\"description\":\"服务注册与发现基本原理 服务注册与发现是分为注册和发现两个关键的步骤。 服务注册：服务进程在注册中心注册自己的元数据信息。通常包括主机和端口号，有时还有身份验证信息，协议，版本号，以及运行环境的信息。 服务发现：客户端服务进程向注册中心发起查询，来获取服务的信息。服务发现的一个重要作用就是提供给客户端一个可用的服务列表。 服务注册 注册是服务自己要负责注册与注销的工作。当服务启动后注册线程向注册中心注册，当服务下线时注销自己 服务发现\"},\"headers\":[{\"level\":2,\"title\":\"服务注册\",\"slug\":\"服务注册\",\"link\":\"#服务注册\",\"children\":[]},{\"level\":2,\"title\":\"服务发现\",\"slug\":\"服务发现\",\"link\":\"#服务发现\",\"children\":[]},{\"level\":2,\"title\":\"心跳机制\",\"slug\":\"心跳机制\",\"link\":\"#心跳机制\",\"children\":[]}],\"readingTime\":{\"minutes\":2.55,\"words\":764},\"filePathRelative\":\"docs/服务注册与发现.md\",\"localizedDate\":\"2022年3月29日\",\"excerpt\":\"<h1> 服务注册与发现基本原理</h1>\\n<p>服务注册与发现是分为注册和发现两个关键的步骤。</p>\\n<p><strong>服务注册</strong>：服务进程在注册中心注册自己的元数据信息。通常包括主机和端口号，有时还有身份验证信息，协议，版本号，以及运行环境的信息。</p>\\n<p><strong>服务发现</strong>：客户端服务进程向注册中心发起查询，来获取服务的信息。服务发现的一个重要作用就是提供给客户端一个可用的服务列表。</p>\\n<h2> 服务注册</h2>\\n<p>注册是服务自己要负责注册与注销的工作。当服务启动后注册线程向注册中心注册，当服务下线时注销自己</p>\\n<h2> 服务发现</h2>\",\"autoDesc\":true}")

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
