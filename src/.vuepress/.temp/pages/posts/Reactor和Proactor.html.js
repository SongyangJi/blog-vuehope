export const data = JSON.parse("{\"key\":\"v-7a9341f7\",\"path\":\"/posts/Reactor%E5%92%8CProactor.html\",\"title\":\"Reactor模式和Proactor模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Reactor模式和Proactor模式\",\"date\":\"2021-11-30T09:19:26.000Z\",\"categories\":\"设计模式\",\"tags\":null,\"description\":\"Reactor 模式也叫 Dispatcher 模式，我觉得这个名字更贴合该模式的含义，即 I/O 多路复⽤监 听事件，收到事件后，根据事件类型分配（Dispatch）给某个进程/线程。 Reactor 模式主要由 Reactor 和处理资源池这两个核⼼部分组成，它俩负责的事情如下： Reactor 负责监听和分发事件，事件类型包含连接事件、读写事件； 处理资源池负责处理事件，如 read -&gt; 业务逻辑 -&gt; send；\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Reactor%E5%92%8CProactor.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Reactor模式和Proactor模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Reactor 模式也叫 Dispatcher 模式，我觉得这个名字更贴合该模式的含义，即 I/O 多路复⽤监 听事件，收到事件后，根据事件类型分配（Dispatch）给某个进程/线程。 Reactor 模式主要由 Reactor 和处理资源池这两个核⼼部分组成，它俩负责的事情如下： Reactor 负责监听和分发事件，事件类型包含连接事件、读写事件； 处理资源池负责处理事件，如 read -&gt; 业务逻辑 -&gt; send；\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-11-30T09:19:26.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Reactor模式和Proactor模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-11-30T09:19:26.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":1.54,\"words\":462},\"filePathRelative\":\"posts/Reactor和Proactor.md\",\"localizedDate\":\"2021年11月30日\",\"excerpt\":\"<p>Reactor 模式也叫 Dispatcher 模式，我觉得这个名字更贴合该模式的含义，即 <strong>I/O</strong> 多路复⽤监\\n听事件，收到事件后，根据事件类型分配（<strong>Dispatch</strong>）给某个进程/线程。</p>\\n<p>Reactor 模式主要由 <strong>Reactor</strong> 和<strong>处理资源池</strong>这两个核⼼部分组成，它俩负责的事情如下：</p>\\n<ol>\\n<li><strong>Reactor 负责监听和分发事件，事件类型包含连接事件、读写事件</strong>；</li>\\n<li><strong>处理资源池负责处理事件，如 read -&gt; 业务逻辑 -&gt; send</strong>；</li>\\n</ol>\",\"autoDesc\":true}")

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
