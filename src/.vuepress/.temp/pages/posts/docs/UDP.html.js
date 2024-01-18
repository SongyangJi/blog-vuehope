export const data = JSON.parse("{\"key\":\"v-8b036b52\",\"path\":\"/posts/docs/UDP.html\",\"title\":\"UDP-用户数据报协议\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"UDP-用户数据报协议\",\"date\":\"2021-11-18T00:19:44.000Z\",\"categories\":\"计算机网络\",\"tags\":[\"UDP\"],\"description\":\"TCP 和 UDP 区别 连接 TCP 是⾯向连接的传输层协议，传输数据前先要建⽴连接。 UDP 是不需要连接，即刻传输数据。 服务对象 TCP 是⼀对⼀的两点服务，即⼀条连接只有两个端点。 UDP ⽀持⼀对⼀、⼀对多、多对多的交互通信 可靠性 TCP 是可靠交付数据的，数据可以⽆差错、不丢失、不重复、按需到达。 UDP 是尽最⼤努⼒交付，不保证可靠交付数据。 拥塞控制、流量控制 TCP 有拥塞控制和流量控制机制，保证数据传输的安全性。UDP 则没有，即使⽹络⾮常拥堵了，也不会影响 UDP 的发送速率。 ⾸部开销 TCP ⾸部⻓度较⻓，会有⼀定的开销，⾸部在没有使⽤「选项」字段时是 20 个字节，如果使⽤了「选项」\"},\"headers\":[{\"level\":3,\"title\":\"UDP 为什么是不可靠的？bind 和 connect 对于 UDP 的作用是什么\",\"slug\":\"udp-为什么是不可靠的-bind-和-connect-对于-udp-的作用是什么\",\"link\":\"#udp-为什么是不可靠的-bind-和-connect-对于-udp-的作用是什么\",\"children\":[]}],\"readingTime\":{\"minutes\":2.32,\"words\":695},\"filePathRelative\":\"posts/docs/UDP.md\",\"localizedDate\":\"2021年11月18日\",\"excerpt\":\"<h1> TCP 和 UDP 区别</h1>\\n<ol>\\n<li>连接</li>\\n</ol>\\n<p>TCP 是⾯向连接的传输层协议，传输数据前先要建⽴连接。</p>\\n<p>UDP 是不需要连接，即刻传输数据。</p>\\n<ol start=\\\"2\\\">\\n<li>\\n<p>服务对象\\nTCP 是⼀对⼀的两点服务，即⼀条连接只有两个端点。\\nUDP ⽀持⼀对⼀、⼀对多、多对多的交互通信</p>\\n</li>\\n<li>\\n<p>可靠性\\nTCP 是可靠交付数据的，数据可以⽆差错、不丢失、不重复、按需到达。\\nUDP 是尽最⼤努⼒交付，不保证可靠交付数据。</p>\\n</li>\\n<li>\\n<p>拥塞控制、流量控制</p>\\n<p>TCP 有拥塞控制和流量控制机制，保证数据传输的安全性。UDP 则没有，即使⽹络⾮常拥堵了，也不会影响 UDP 的发送速率。</p>\\n</li>\\n<li>\\n<p>⾸部开销</p>\\n<p>TCP ⾸部⻓度较⻓，会有⼀定的开销，⾸部在没有使⽤「选项」字段时是 20 个字节，如果使⽤了「选项」</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")

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
