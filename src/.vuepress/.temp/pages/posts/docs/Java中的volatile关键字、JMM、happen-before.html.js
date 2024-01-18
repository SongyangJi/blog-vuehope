export const data = JSON.parse("{\"key\":\"v-e9e39006\",\"path\":\"/posts/docs/Java%E4%B8%AD%E7%9A%84volatile%E5%85%B3%E9%94%AE%E5%AD%97%E3%80%81JMM%E3%80%81happen-before.html\",\"title\":\"Java中的volatile关键字、JMM、happen-before\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Java中的volatile关键字、JMM、happen-before\",\"date\":\"2021-11-12T02:00:00.000Z\",\"categories\":\"Java多线程\",\"tags\":[\"Java多线程\",\"JMM\"],\"description\":\"并发编程中的三个主要问题 可见性问题 当一个线程修改共享变量的值的时候，其他能否立即得知这个修改，这是第一个问题。 原子性问题 这里的原子性，有两个尺度。 小的尺度上，对于单个变量（主要对long、double而言）的修改是否具有原子性。 大的尺度上，对于一个方法或者代码块的原子性如何保证。 有序性问题 有序性问题在并发编程时是最令人困惑的。 这里先指明，如果没有作出一些合理的同步工作，那么在单个线程中执行顺序具有顺序性， 但是在一个线程中观察另一个线程的操作都是不具有有序性的。\"},\"headers\":[{\"level\":2,\"title\":\"可见性问题\",\"slug\":\"可见性问题\",\"link\":\"#可见性问题\",\"children\":[]},{\"level\":2,\"title\":\"原子性问题\",\"slug\":\"原子性问题\",\"link\":\"#原子性问题\",\"children\":[]},{\"level\":2,\"title\":\"有序性问题\",\"slug\":\"有序性问题\",\"link\":\"#有序性问题\",\"children\":[]},{\"level\":2,\"title\":\"重排序和内存屏障\",\"slug\":\"重排序和内存屏障\",\"link\":\"#重排序和内存屏障\",\"children\":[{\"level\":3,\"title\":\"重排序\",\"slug\":\"重排序\",\"link\":\"#重排序\",\"children\":[]},{\"level\":3,\"title\":\"内存屏障\",\"slug\":\"内存屏障\",\"link\":\"#内存屏障\",\"children\":[]},{\"level\":3,\"title\":\"as-if-serial语义\",\"slug\":\"as-if-serial语义\",\"link\":\"#as-if-serial语义\",\"children\":[]},{\"level\":3,\"title\":\"重排序对多线程程序的影响\",\"slug\":\"重排序对多线程程序的影响\",\"link\":\"#重排序对多线程程序的影响\",\"children\":[]}]},{\"level\":2,\"title\":\"volatile的读-写内存语义\",\"slug\":\"volatile的读-写内存语义\",\"link\":\"#volatile的读-写内存语义\",\"children\":[]},{\"level\":2,\"title\":\"volatile的禁止重排序规则\",\"slug\":\"volatile的禁止重排序规则\",\"link\":\"#volatile的禁止重排序规则\",\"children\":[]},{\"level\":2,\"title\":\"volatile对非原子性约定的修正\",\"slug\":\"volatile对非原子性约定的修正\",\"link\":\"#volatile对非原子性约定的修正\",\"children\":[]},{\"level\":2,\"title\":\"volatile内存语义的实现\",\"slug\":\"volatile内存语义的实现\",\"link\":\"#volatile内存语义的实现\",\"children\":[{\"level\":3,\"title\":\"共享内存的可见性\",\"slug\":\"共享内存的可见性\",\"link\":\"#共享内存的可见性\",\"children\":[]},{\"level\":3,\"title\":\"禁止指令优化重排序\",\"slug\":\"禁止指令优化重排序\",\"link\":\"#禁止指令优化重排序\",\"children\":[]}]},{\"level\":2,\"title\":\"happen-before的作用\",\"slug\":\"happen-before的作用\",\"link\":\"#happen-before的作用\",\"children\":[]},{\"level\":2,\"title\":\"happen-before的定义\",\"slug\":\"happen-before的定义\",\"link\":\"#happen-before的定义\",\"children\":[]},{\"level\":2,\"title\":\"happen-before的规则\",\"slug\":\"happen-before的规则\",\"link\":\"#happen-before的规则\",\"children\":[]},{\"level\":2,\"title\":\"happen-before与时间上的先后顺序的关系\",\"slug\":\"happen-before与时间上的先后顺序的关系\",\"link\":\"#happen-before与时间上的先后顺序的关系\",\"children\":[]},{\"level\":2,\"title\":\"使用happen-before解释DoubleCheckLock\",\"slug\":\"使用happen-before解释doublechecklock\",\"link\":\"#使用happen-before解释doublechecklock\",\"children\":[]}],\"readingTime\":{\"minutes\":16.76,\"words\":5028},\"filePathRelative\":\"posts/docs/Java中的volatile关键字、JMM、happen-before.md\",\"localizedDate\":\"2021年11月12日\",\"excerpt\":\"<h1> 并发编程中的三个主要问题</h1>\\n<h2> 可见性问题</h2>\\n<p>当一个线程修改共享变量的值的时候，其他能否立即得知这个修改，这是第一个问题。</p>\\n<h2> 原子性问题</h2>\\n<p>这里的原子性，有两个尺度。</p>\\n<ol>\\n<li>小的尺度上，对于单个变量（主要对long、double而言）的修改是否具有原子性。</li>\\n<li>大的尺度上，对于一个方法或者代码块的原子性如何保证。</li>\\n</ol>\\n<h2> 有序性问题</h2>\\n<p>有序性问题在并发编程时是最令人困惑的。</p>\\n<p>这里先指明，<strong>如果没有作出一些合理的同步工作</strong>，那么<strong>在单个线程中执行顺序具有顺序性</strong>， 但是<strong>在一个线程中观察另一个线程的操作都是不具有有序性的</strong>。</p>\",\"autoDesc\":true}")

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
