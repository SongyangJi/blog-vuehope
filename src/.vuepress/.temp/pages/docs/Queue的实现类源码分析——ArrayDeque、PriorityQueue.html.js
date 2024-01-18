export const data = JSON.parse("{\"key\":\"v-91b40740\",\"path\":\"/docs/Queue%E7%9A%84%E5%AE%9E%E7%8E%B0%E7%B1%BB%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E2%80%94%E2%80%94ArrayDeque%E3%80%81PriorityQueue.html\",\"title\":\"Queue的实现类源码分析——ArrayDeque、PriorityQueue\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Queue的实现类源码分析——ArrayDeque、PriorityQueue\",\"date\":\"2021-07-26T00:00:00.000Z\",\"categories\":\"Java集合类\",\"tags\":[\"Java集合类\",\"数据结构\",\"源码系列\"],\"description\":\"Queue的实现 继承类图 其中LinkedList的实现已经在这篇List实现类里面讲过了。\"},\"headers\":[{\"level\":2,\"title\":\"继承类图\",\"slug\":\"继承类图\",\"link\":\"#继承类图\",\"children\":[]},{\"level\":2,\"title\":\"ArrayDeque\",\"slug\":\"arraydeque\",\"link\":\"#arraydeque\",\"children\":[{\"level\":3,\"title\":\"数据结构\",\"slug\":\"数据结构\",\"link\":\"#数据结构\",\"children\":[]},{\"level\":3,\"title\":\"构造函数\",\"slug\":\"构造函数\",\"link\":\"#构造函数\",\"children\":[]},{\"level\":3,\"title\":\"扩容机制\",\"slug\":\"扩容机制\",\"link\":\"#扩容机制\",\"children\":[]}]},{\"level\":2,\"title\":\"PriorityQueue\",\"slug\":\"priorityqueue\",\"link\":\"#priorityqueue\",\"children\":[{\"level\":3,\"title\":\"数据结构\",\"slug\":\"数据结构-1\",\"link\":\"#数据结构-1\",\"children\":[]},{\"level\":3,\"title\":\"构造函数\",\"slug\":\"构造函数-1\",\"link\":\"#构造函数-1\",\"children\":[]},{\"level\":3,\"title\":\"算法逻辑\",\"slug\":\"算法逻辑\",\"link\":\"#算法逻辑\",\"children\":[]},{\"level\":3,\"title\":\"入队和出队操作的实现\",\"slug\":\"入队和出队操作的实现\",\"link\":\"#入队和出队操作的实现\",\"children\":[]},{\"level\":3,\"title\":\"扩容机制\",\"slug\":\"扩容机制-1\",\"link\":\"#扩容机制-1\",\"children\":[]}]},{\"level\":2,\"title\":\"ArrayDeque\",\"slug\":\"arraydeque-1\",\"link\":\"#arraydeque-1\",\"children\":[]},{\"level\":2,\"title\":\"PriorityQueue\",\"slug\":\"priorityqueue-1\",\"link\":\"#priorityqueue-1\",\"children\":[]}],\"readingTime\":{\"minutes\":12.36,\"words\":3707},\"filePathRelative\":\"docs/Queue的实现类源码分析——ArrayDeque、PriorityQueue.md\",\"localizedDate\":\"2021年7月26日\",\"excerpt\":\"<h1> Queue的实现</h1>\\n<h2> 继承类图</h2>\\n<p>其中<code>LinkedList</code>的实现已经在这篇<a href=\\\"http://47.117.127.179/2021/07/24/List%E5%AE%9E%E7%8E%B0%E7%B1%BB%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%20%E2%80%94%E2%80%94%20LinkedList%E3%80%81ArrayList/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">List实现类</a>里面讲过了。</p>\\n<figure><figcaption></figcaption></figure>\",\"autoDesc\":true}")

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
