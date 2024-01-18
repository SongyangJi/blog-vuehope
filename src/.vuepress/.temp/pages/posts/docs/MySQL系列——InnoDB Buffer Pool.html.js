export const data = JSON.parse("{\"key\":\"v-ca0f606e\",\"path\":\"/posts/docs/MySQL%E7%B3%BB%E5%88%97%E2%80%94%E2%80%94InnoDB%20Buffer%20Pool.html\",\"title\":\"MySQL系列——InnoDB Buffer Pool\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL系列——InnoDB Buffer Pool\",\"date\":\"2021-10-29T10:03:19.000Z\",\"categories\":\"MySQL\",\"tags\":[\"MySQL\",\"InnoDB\"],\"description\":\"InnoDB Buffer Pool 介绍 磁盘太慢，用内存作为缓冲区很有必要——这是缓存的基本思想，将数据存放在读写速度更快的存储介质中。 不过这里的缓冲区指的不是 Redis、Memchached这些外部的内存性缓冲，还是MySQL自治的一块内存缓冲区。 所谓自治，就是说完全由MySQL自己去管理这块内存区域，自己完成脏数据的刷盘，使用MySQL执行CRUD无需也无法自己做这方面的操作——不过你可以修改其中的配置以调整缓存的具体行为。 InnoDB Buffer Pool 本质上是MySQL在向操作系统申请的一大块内存，默认是128MB（比较小，完全可以开大一点）。\"},\"headers\":[{\"level\":2,\"title\":\"介绍\",\"slug\":\"介绍\",\"link\":\"#介绍\",\"children\":[]},{\"level\":2,\"title\":\"内部组成\",\"slug\":\"内部组成\",\"link\":\"#内部组成\",\"children\":[]},{\"level\":2,\"title\":\"free 链表\",\"slug\":\"free-链表\",\"link\":\"#free-链表\",\"children\":[]},{\"level\":2,\"title\":\"flush 链表\",\"slug\":\"flush-链表\",\"link\":\"#flush-链表\",\"children\":[]},{\"level\":2,\"title\":\"缓冲页的哈希表\",\"slug\":\"缓冲页的哈希表\",\"link\":\"#缓冲页的哈希表\",\"children\":[]},{\"level\":2,\"title\":\"LRU链表的使用管理\",\"slug\":\"lru链表的使用管理\",\"link\":\"#lru链表的使用管理\",\"children\":[{\"level\":3,\"title\":\"数据冷热分离\",\"slug\":\"数据冷热分离\",\"link\":\"#数据冷热分离\",\"children\":[]},{\"level\":3,\"title\":\"进一步优化\",\"slug\":\"进一步优化\",\"link\":\"#进一步优化\",\"children\":[]}]},{\"level\":2,\"title\":\"刷新脏页到磁盘\",\"slug\":\"刷新脏页到磁盘\",\"link\":\"#刷新脏页到磁盘\",\"children\":[]},{\"level\":2,\"title\":\"查看当前 buffer pool的状态/配置\",\"slug\":\"查看当前-buffer-pool的状态-配置\",\"link\":\"#查看当前-buffer-pool的状态-配置\",\"children\":[]},{\"level\":2,\"title\":\"配置 Buffer Pool\",\"slug\":\"配置-buffer-pool\",\"link\":\"#配置-buffer-pool\",\"children\":[{\"level\":3,\"title\":\"配置解析\",\"slug\":\"配置解析\",\"link\":\"#配置解析\",\"children\":[]},{\"level\":3,\"title\":\"配置参考\",\"slug\":\"配置参考\",\"link\":\"#配置参考\",\"children\":[]}]}],\"readingTime\":{\"minutes\":7.76,\"words\":2327},\"filePathRelative\":\"posts/docs/MySQL系列——InnoDB Buffer Pool.md\",\"localizedDate\":\"2021年10月29日\",\"excerpt\":\"<h1> InnoDB Buffer Pool</h1>\\n<h2> 介绍</h2>\\n<p>磁盘太慢，用内存作为缓冲区很有必要——这是缓存的基本思想，将数据存放在读写速度更快的存储介质中。</p>\\n<p>不过这里的缓冲区指的不是 Redis、Memchached这些外部的内存性缓冲，还是MySQL自治的一块内存缓冲区。</p>\\n<p>所谓自治，就是说完全由MySQL自己去管理这块内存区域，自己完成脏数据的刷盘，使用MySQL执行CRUD无需也无法自己做这方面的操作——不过你可以修改其中的配置以调整缓存的具体行为。</p>\\n<p>InnoDB Buffer Pool 本质上是MySQL在向操作系统申请的一大块内存，默认是128MB（比较小，完全可以开大一点）。</p>\",\"autoDesc\":true}")

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
