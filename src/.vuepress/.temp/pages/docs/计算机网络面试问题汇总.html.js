export const data = JSON.parse("{\"key\":\"v-1cf9be12\",\"path\":\"/docs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%E9%9D%A2%E8%AF%95%E9%97%AE%E9%A2%98%E6%B1%87%E6%80%BB.html\",\"title\":\"计算机网络面试问题汇总\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"计算机网络面试问题汇总\",\"date\":\"2021-11-29T23:42:04.000Z\",\"categories\":\"计算机网络\",\"tags\":[\"计算机网络\"],\"description\":\"SYN FLOOD SYN Flood 是种典型的 DoS（拒绝服务）攻击，其目的是通过消耗服务器所有可用资源使服务器无法用于处理合法请求。通过重复发送初始连接请求（SYN）数据包，攻击者能够压倒目标服务器上的所有可用端口，导致目标设备根本不响应合法请求。 SYN攻击的原理 在 TCP 建立连接的过程中，因为服务端不确定自己发给客户端的 SYN-ACK 消息或客户端反馈的 ACK 消息是否会丢在半路，所以会给每个待完成的半开连接状态设一个定时器，如果超过时间还没有收到客户端的 ACK 消息，则重新发送一次 SYN-ACK 消息给客户端，直到重试超过一定次数时才会放弃。\"},\"headers\":[{\"level\":2,\"title\":\"SYN攻击的原理\",\"slug\":\"syn攻击的原理\",\"link\":\"#syn攻击的原理\",\"children\":[]},{\"level\":2,\"title\":\"TCP 粘包问题\",\"slug\":\"tcp-粘包问题\",\"link\":\"#tcp-粘包问题\",\"children\":[]}],\"readingTime\":{\"minutes\":7.74,\"words\":2322},\"filePathRelative\":\"docs/计算机网络面试问题汇总.md\",\"localizedDate\":\"2021年11月30日\",\"excerpt\":\"<h1> SYN FLOOD</h1>\\n<p>SYN Flood 是种典型的 DoS（拒绝服务）攻击，其目的是通过消耗服务器所有可用资源使服务器无法用于处理合法请求。通过重复发送初始连接请求（SYN）数据包，攻击者能够压倒目标服务器上的所有可用端口，导致目标设备根本不响应合法请求。</p>\\n<h2> SYN攻击的原理</h2>\\n<p>在 TCP 建立连接的过程中，<strong>因为服务端不确定自己发给客户端的 SYN-ACK 消息或客户端反馈的 ACK 消息是否会丢在半路，所以会给每个待完成的半开连接状态设一个定时器</strong>，如果超过时间还没有收到客户端的 ACK 消息，则重新发送一次 SYN-ACK 消息给客户端，直到重试超过一定次数时才会放弃。</p>\",\"autoDesc\":true}")

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
