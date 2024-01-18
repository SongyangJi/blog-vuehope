export const data = JSON.parse("{\"key\":\"v-4ddb66ee\",\"path\":\"/docs/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E2%80%94%E2%80%94%E8%BF%9B%E7%A8%8B%E8%B0%83%E5%BA%A6%E7%AE%97%E6%B3%95.html\",\"title\":\"操作系统——进程与线程、调度算法\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"操作系统——进程与线程、调度算法\",\"date\":\"2022-09-23T01:47:05.000Z\",\"categories\":\"操作系统\",\"tags\":null,\"description\":\"进程状态机 图片 阻塞一般是当系统执行IO操作时，此时进程进入阻塞状态，等待某个事件的返回。 挂起是指进程没有占有物理内存，被写到磁盘上了。这时进程状态是挂起状态。 阻塞挂起：进程被写入硬盘并等待某个事件的出现。 就绪挂起：进程被写入硬盘，进入内存可直接进入就绪状态。 PCB——进程控制块\"},\"headers\":[{\"level\":2,\"title\":\"进程状态机\",\"slug\":\"进程状态机\",\"link\":\"#进程状态机\",\"children\":[]},{\"level\":2,\"title\":\"PCB——进程控制块\",\"slug\":\"pcb——进程控制块\",\"link\":\"#pcb——进程控制块\",\"children\":[{\"level\":3,\"title\":\"PCB 信息\",\"slug\":\"pcb-信息\",\"link\":\"#pcb-信息\",\"children\":[]}]},{\"level\":2,\"title\":\"进程调度\",\"slug\":\"进程调度\",\"link\":\"#进程调度\",\"children\":[{\"level\":3,\"title\":\"进程调度原则\",\"slug\":\"进程调度原则\",\"link\":\"#进程调度原则\",\"children\":[]},{\"level\":3,\"title\":\"调度算法\",\"slug\":\"调度算法\",\"link\":\"#调度算法\",\"children\":[]}]},{\"level\":2,\"title\":\"进程与线程的区别\",\"slug\":\"进程与线程的区别\",\"link\":\"#进程与线程的区别\",\"children\":[{\"level\":3,\"title\":\"线程定义\",\"slug\":\"线程定义\",\"link\":\"#线程定义\",\"children\":[]}]}],\"readingTime\":{\"minutes\":7.03,\"words\":2110},\"filePathRelative\":\"docs/操作系统——进程调度算法.md\",\"localizedDate\":\"2022年9月23日\",\"excerpt\":\"<h2> 进程状态机</h2>\\n<figure><figcaption>图片</figcaption></figure>\\n<ol>\\n<li>阻塞一般是当系统执行IO操作时，此时进程进入阻塞状态，等待某个事件的返回。</li>\\n<li>挂起是指进程没有占有物理内存，被写到磁盘上了。这时进程状态是挂起状态。</li>\\n</ol>\\n<blockquote>\\n<ol>\\n<li><code>阻塞挂起</code>：进程被写入硬盘并等待某个事件的出现。</li>\\n<li><code>就绪挂起</code>：进程被写入硬盘，进入内存可直接进入就绪状态。</li>\\n</ol>\\n</blockquote>\\n<h2> PCB——进程控制块</h2>\",\"autoDesc\":true}")

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
