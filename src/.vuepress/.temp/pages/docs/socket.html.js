export const data = JSON.parse("{\"key\":\"v-6045b06b\",\"path\":\"/docs/socket.html\",\"title\":\"Socket编程 —— 使用 select、poll、epoll\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Socket编程 —— 使用 select、poll、epoll\",\"date\":\"2021-11-20T20:27:00.000Z\",\"categories\":\"IO\",\"tags\":[\"Linux\",\"IO\",\"Socket\"],\"description\":\"socket编程 服务端和客户端初始化 socket ，得到⽂件描述符； 服务端调⽤ bind ，将绑定在 IP 地址和端⼝; 服务端调⽤ listen ，进⾏监听； 服务端调⽤ accept ，等待客户端连接； 客户端调⽤ connect ，向服务器端的地址和端⼝发起连接请求； 服务端 accept 返回⽤于传输的 socket 的⽂件描述符； 客户端调⽤ write 写⼊数据；服务端调⽤ read 读取数据； 客户端断开连接时，会调⽤ close ，那么服务端 read 读取数据的时候，就会读取到了 EOF ，待处理完\"},\"headers\":[{\"level\":2,\"title\":\"socket编程\",\"slug\":\"socket编程\",\"link\":\"#socket编程\",\"children\":[]},{\"level\":2,\"title\":\"select函数\",\"slug\":\"select函数\",\"link\":\"#select函数\",\"children\":[]},{\"level\":2,\"title\":\"poll 函数\",\"slug\":\"poll-函数\",\"link\":\"#poll-函数\",\"children\":[]},{\"level\":2,\"title\":\"epoll 函数\",\"slug\":\"epoll-函数\",\"link\":\"#epoll-函数\",\"children\":[{\"level\":3,\"title\":\"相关接口\",\"slug\":\"相关接口\",\"link\":\"#相关接口\",\"children\":[]},{\"level\":3,\"title\":\"epoll的工作模式\",\"slug\":\"epoll的工作模式\",\"link\":\"#epoll的工作模式\",\"children\":[]},{\"level\":3,\"title\":\"epoll的实现原理\",\"slug\":\"epoll的实现原理\",\"link\":\"#epoll的实现原理\",\"children\":[]}]}],\"readingTime\":{\"minutes\":10.46,\"words\":3139},\"filePathRelative\":\"docs/socket.md\",\"localizedDate\":\"2021年11月21日\",\"excerpt\":\"<h2> socket编程</h2>\\n\\n<ol>\\n<li>\\n<p>服务端和客户端初始化 socket ，得到⽂件描述符；</p>\\n</li>\\n<li>\\n<p>服务端调⽤ bind ，将绑定在 IP 地址和端⼝;</p>\\n</li>\\n<li>\\n<p>服务端调⽤ listen ，进⾏监听；</p>\\n</li>\\n<li>\\n<p>服务端调⽤ accept ，等待客户端连接；</p>\\n</li>\\n<li>\\n<p>客户端调⽤ connect ，向服务器端的地址和端⼝发起连接请求；</p>\\n</li>\\n<li>\\n<p>服务端 accept 返回⽤于传输的 socket 的⽂件描述符；</p>\\n</li>\\n<li>\\n<p>客户端调⽤ write 写⼊数据；服务端调⽤ read 读取数据；</p>\\n</li>\\n<li>\\n<p>客户端断开连接时，会调⽤ close ，那么服务端 read 读取数据的时候，就会读取到了 EOF ，待处理完</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")

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
