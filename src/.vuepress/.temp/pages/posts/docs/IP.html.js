export const data = JSON.parse("{\"key\":\"v-3ad617b3\",\"path\":\"/posts/docs/IP.html\",\"title\":\"IP-互联网协议\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"IP-互联网协议\",\"date\":\"2021-12-04T18:34:23.000Z\",\"categories\":\"计算机网络\",\"tags\":[\"IP\"],\"description\":\"互联网协议提供了“不可靠的”数据包传输机制（也称“尽力而为”或“尽最大努力交付”）； 也就是说，它不保证数据能准确的传输。数据包在到达的时候可能已经 1.损坏，2.顺序错乱，3.产生冗余包，或者 4.直接丢失。如果应用需要保证可靠性，一般需要采取其他的方法，例如利用IP的上层协议控制。 网络层和传输层协议的区别：网络层协议负责提供主机间的逻辑通信；运输层协议负责提供进程间的逻辑通信。 UDP和IP的区别 （1）IP是提供主机到主机的服务，如果有多个应用，数据应该交给谁？ IP提供主机到主机的服务，UDP提供应用到应用的服务，通过端口号进行区分。 （2）IP协议只校验头部，UDP除了头部还校验数据部分。\"},\"headers\":[{\"level\":3,\"title\":\"路由器和交换机的区别\",\"slug\":\"路由器和交换机的区别\",\"link\":\"#路由器和交换机的区别\",\"children\":[]},{\"level\":2,\"title\":\"IP地址\",\"slug\":\"ip地址\",\"link\":\"#ip地址\",\"children\":[{\"level\":3,\"title\":\"私有IP和公有IP\",\"slug\":\"私有ip和公有ip\",\"link\":\"#私有ip和公有ip\",\"children\":[]},{\"level\":3,\"title\":\"IP地址的常规分类\",\"slug\":\"ip地址的常规分类\",\"link\":\"#ip地址的常规分类\",\"children\":[]},{\"level\":3,\"title\":\"特殊IP地址\",\"slug\":\"特殊ip地址\",\"link\":\"#特殊ip地址\",\"children\":[]},{\"level\":3,\"title\":\"CIDR\",\"slug\":\"cidr\",\"link\":\"#cidr\",\"children\":[]},{\"level\":3,\"title\":\"IPV4 地址不够如何解决\",\"slug\":\"ipv4-地址不够如何解决\",\"link\":\"#ipv4-地址不够如何解决\",\"children\":[]}]},{\"level\":2,\"title\":\"IP报文结构\",\"slug\":\"ip报文结构\",\"link\":\"#ip报文结构\",\"children\":[]},{\"level\":2,\"title\":\"分片和组装\",\"slug\":\"分片和组装\",\"link\":\"#分片和组装\",\"children\":[{\"level\":3,\"title\":\"分组\",\"slug\":\"分组\",\"link\":\"#分组\",\"children\":[]},{\"level\":3,\"title\":\"重组\",\"slug\":\"重组\",\"link\":\"#重组\",\"children\":[]}]}],\"readingTime\":{\"minutes\":18.01,\"words\":5404},\"filePathRelative\":\"posts/docs/IP.md\",\"localizedDate\":\"2021年12月5日\",\"excerpt\":\"<p>互联网协议提供了“不可靠的”数据包传输机制（也称“尽力而为”或“尽最大努力交付”）；</p>\\n<p>也就是说，它不保证数据能准确的传输。数据包在到达的时候可能已经</p>\\n<p>1.损坏，2.顺序错乱，3.产生冗余包，或者 4.直接丢失。如果应用需要保证可靠性，一般需要采取其他的方法，例如利用IP的上层协议控制。</p>\\n<p>网络层和传输层协议的区别：网络层协议负责提供主机间的逻辑通信；运输层协议负责提供进程间的逻辑通信。</p>\\n<blockquote>\\n<p>UDP和IP的区别</p>\\n<p>（1）IP是提供主机到主机的服务，如果有多个应用，数据应该交给谁？</p>\\n<p>IP提供主机到主机的服务，<a href=\\\"https://so.csdn.net/so/search?q=UDP&amp;spm=1001.2101.3001.7020\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">UDP</a>提供应用到应用的服务，通过端口号进行区分。</p>\\n<p>（2）IP协议只校验头部，UDP除了头部还校验数据部分。</p>\\n</blockquote>\",\"autoDesc\":true}")

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
