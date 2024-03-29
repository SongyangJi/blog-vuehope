export const data = JSON.parse("{\"key\":\"v-1a8b0146\",\"path\":\"/docs/ConcurrentHashMap.html\",\"title\":\"JUC之并发安全的HashMap —— ConcurrentHashMap\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"JUC之并发安全的HashMap —— ConcurrentHashMap\",\"date\":\"2021-12-12T16:15:24.000Z\",\"categories\":\"JUC\",\"tags\":[\"JUC\",\"并发集合类\"],\"description\":\"本篇文章将要介绍的 ConcurrentHashMap 是 HashMap 的并发版本，它是线程安全的，并且在高并发的情境下，性能优于 Hashtable 很多。 历史版本的演变 一句话总结 从JDK7版本的ReentrantLock+Segment+HashEntry，到JDK8版本中synchronized+CAS+HashEntry+红黑树。 JDK7的ConcurrentHashMap JDK7 采用分段锁技术，整个 Hash 表被分成多个段（默认为16段），每个段中会对应一个 Segment 段锁，段与段之间可以并发访问，但是多线程想要操作同一个段是需要获取锁的。所有的 put，get，remove 等方法都是根据键的 hash 值对应到相应的段中，然后尝试获取锁进行访问。\"},\"headers\":[{\"level\":2,\"title\":\"历史版本的演变\",\"slug\":\"历史版本的演变\",\"link\":\"#历史版本的演变\",\"children\":[{\"level\":3,\"title\":\"JDK7的ConcurrentHashMap\",\"slug\":\"jdk7的concurrenthashmap\",\"link\":\"#jdk7的concurrenthashmap\",\"children\":[]},{\"level\":3,\"title\":\"JDK8的ConcurrentHashMap\",\"slug\":\"jdk8的concurrenthashmap\",\"link\":\"#jdk8的concurrenthashmap\",\"children\":[]},{\"level\":3,\"title\":\"put流程\",\"slug\":\"put流程\",\"link\":\"#put流程\",\"children\":[]},{\"level\":3,\"title\":\"JDK7与JDK8的区别\",\"slug\":\"jdk7与jdk8的区别\",\"link\":\"#jdk7与jdk8的区别\",\"children\":[]},{\"level\":3,\"title\":\"Collections.synchronizedMap、Hashtable、ConcurrentHashMap区别\",\"slug\":\"collections-synchronizedmap、hashtable、concurrenthashmap区别\",\"link\":\"#collections-synchronizedmap、hashtable、concurrenthashmap区别\",\"children\":[]}]}],\"readingTime\":{\"minutes\":5.13,\"words\":1538},\"filePathRelative\":\"docs/ConcurrentHashMap.md\",\"localizedDate\":\"2021年12月13日\",\"excerpt\":\"<p>本篇文章将要介绍的 ConcurrentHashMap 是 HashMap 的并发版本，它是线程安全的，并且在高并发的情境下，性能优于 Hashtable 很多。</p>\\n<h2> 历史版本的演变</h2>\\n<blockquote>\\n<p><em>一句话总结</em></p>\\n<p>从JDK7版本的ReentrantLock+Segment+HashEntry，到JDK8版本中synchronized+CAS+HashEntry+红黑树。</p>\\n</blockquote>\\n<h3> JDK7的ConcurrentHashMap</h3>\\n<p>JDK7 采用<strong>分段锁技术</strong>，<strong>整个 Hash 表被分成多个段（默认为16段），每个段中会对应一个 Segment 段锁</strong>，<strong>段与段之间可以并发访问，但是多线程想要操作同一个段是需要获取锁的</strong>。所有的 put，get，remove 等方法都是根据键的 hash 值对应到相应的段中，然后尝试获取锁进行访问。</p>\",\"autoDesc\":true}")

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
