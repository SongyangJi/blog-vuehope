export const data = JSON.parse("{\"key\":\"v-586ae9cc\",\"path\":\"/docs/%E6%AD%BB%E9%94%81.html\",\"title\":\"死锁\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"死锁\",\"date\":\"2022-03-20T15:36:12.000Z\",\"categories\":\"操作系统\",\"tags\":[\"算法\",\"OS\"],\"description\":\"死锁的基本概念 死锁与饥饿 死锁：一组处于等待（阻塞）状态的进程，每一个进程持有其他进程所需要的资源，而又等待使用其他进程所拥有的资源，致使这组进程互相等待，均无法向前推进。另一种定义：当一组进程中每个进程都在等待一个事件，而这一事件只能由这一组进程的另一个进程引起时，这组进程处于死锁状态。 饥饿：就绪进程长时间得不到调度是处于等待状态，而不是死锁中的互相等待。若信号量的等待队列按照LIFO或优先级管理，则可能导致饥饿。 死锁形成的条件\"},\"headers\":[{\"level\":2,\"title\":\"死锁与饥饿\",\"slug\":\"死锁与饥饿\",\"link\":\"#死锁与饥饿\",\"children\":[]},{\"level\":2,\"title\":\"死锁形成的条件\",\"slug\":\"死锁形成的条件\",\"link\":\"#死锁形成的条件\",\"children\":[]},{\"level\":2,\"title\":\"死锁的处理方法\",\"slug\":\"死锁的处理方法\",\"link\":\"#死锁的处理方法\",\"children\":[{\"level\":3,\"title\":\"1. 互斥\",\"slug\":\"_1-互斥\",\"link\":\"#_1-互斥\",\"children\":[]},{\"level\":3,\"title\":\"2. 占有并等待\",\"slug\":\"_2-占有并等待\",\"link\":\"#_2-占有并等待\",\"children\":[]},{\"level\":3,\"title\":\"3. 非抢占\",\"slug\":\"_3-非抢占\",\"link\":\"#_3-非抢占\",\"children\":[]},{\"level\":3,\"title\":\"4. 循环等待\",\"slug\":\"_4-循环等待\",\"link\":\"#_4-循环等待\",\"children\":[]}]},{\"level\":2,\"title\":\"安全状态(safe state)\",\"slug\":\"安全状态-safe-state\",\"link\":\"#安全状态-safe-state\",\"children\":[]},{\"level\":2,\"title\":\"单实例——资源分配图(RAG——resource-allocation graph)\",\"slug\":\"单实例——资源分配图-rag——resource-allocation-graph\",\"link\":\"#单实例——资源分配图-rag——resource-allocation-graph\",\"children\":[]},{\"level\":2,\"title\":\"多实例——银行家算法(Banker's Algorithm)\",\"slug\":\"多实例——银行家算法-banker-s-algorithm\",\"link\":\"#多实例——银行家算法-banker-s-algorithm\",\"children\":[{\"level\":3,\"title\":\"伪代码\",\"slug\":\"伪代码\",\"link\":\"#伪代码\",\"children\":[]}]}],\"readingTime\":{\"minutes\":7.45,\"words\":2235},\"filePathRelative\":\"docs/死锁.md\",\"localizedDate\":\"2022年3月20日\",\"excerpt\":\"<h1> 死锁的基本概念</h1>\\n<h2> 死锁与饥饿</h2>\\n<ul>\\n<li><strong>死锁</strong>：一组处于等待（阻塞）状态的进程，每一个进程持有其他进程所需要的资源，而又等待使用其他进程所拥有的资源，致使这组进程互相等待，均无法向前推进。另一种定义：当一组进程中每个进程都在等待一个事件，而这一事件只能由这一组进程的另一个进程引起时，这组进程处于死锁状态。</li>\\n<li><strong>饥饿</strong>：就绪进程长时间得不到调度是处于等待状态，而不是死锁中的互相等待。若信号量的等待队列按照LIFO或优先级管理，则可能导致饥饿。</li>\\n</ul>\\n<h2> 死锁形成的条件</h2>\",\"autoDesc\":true}")

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
