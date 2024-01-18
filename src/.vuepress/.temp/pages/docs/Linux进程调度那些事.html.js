export const data = JSON.parse("{\"key\":\"v-71ee5d13\",\"path\":\"/docs/Linux%E8%BF%9B%E7%A8%8B%E8%B0%83%E5%BA%A6%E9%82%A3%E4%BA%9B%E4%BA%8B.html\",\"title\":\"Linux进程调度那些事\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux进程调度那些事\",\"date\":\"2021-10-17T01:00:12.000Z\",\"categories\":\"Linux\",\"tags\":[\"进程/线程\",\"Linux内核\"],\"description\":\"Linux进程调度的顶层设计 进程的调度有多种算法。常见的有： 先来先服务（FIFO） 最短作业优先调度（Shortest-Job-First SJF） 优先级调度（Priority-Scheduling） 轮转调度（Round-Robin RR） 上述的调度算法在一般的操作系统教科书中都有讲解，不再赘述。 如何合理组织调度算法和调度类呢？ Linux 的进程调度器是以模块化的方式来提供的，这种模块化的结构称之为调度器类\"},\"headers\":[{\"level\":2,\"title\":\"调度类与调度策略 (Scheduling classes and policies)\",\"slug\":\"调度类与调度策略-scheduling-classes-and-policies\",\"link\":\"#调度类与调度策略-scheduling-classes-and-policies\",\"children\":[]},{\"level\":2,\"title\":\"设计理念\",\"slug\":\"设计理念\",\"link\":\"#设计理念\",\"children\":[]},{\"level\":2,\"title\":\"关键问题\",\"slug\":\"关键问题\",\"link\":\"#关键问题\",\"children\":[]},{\"level\":2,\"title\":\"chrt\",\"slug\":\"chrt\",\"link\":\"#chrt\",\"children\":[]},{\"level\":2,\"title\":\"taskset\",\"slug\":\"taskset\",\"link\":\"#taskset\",\"children\":[]}],\"readingTime\":{\"minutes\":11.53,\"words\":3460},\"filePathRelative\":\"docs/Linux进程调度那些事.md\",\"localizedDate\":\"2021年10月17日\",\"excerpt\":\"<h1> Linux进程调度的顶层设计</h1>\\n<p>进程的调度有多种算法。常见的有：</p>\\n<ul>\\n<li>先来先服务（FIFO）</li>\\n<li>最短作业优先调度（Shortest-Job-First SJF）</li>\\n<li>优先级调度（Priority-Scheduling）</li>\\n<li>轮转调度（Round-Robin RR）</li>\\n</ul>\\n<p>上述的调度算法在一般的操作系统教科书中都有讲解，不再赘述。</p>\\n<p>如何合理组织调度算法和调度类呢？</p>\\n<p>Linux 的进程调度器是以模块化的方式来提供的，这种模块化的结构称之为<strong>调度器类</strong></p>\",\"autoDesc\":true}")

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
