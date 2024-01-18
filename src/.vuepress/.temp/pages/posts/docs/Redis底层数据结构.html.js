export const data = JSON.parse("{\"key\":\"v-3bbc09b4\",\"path\":\"/posts/docs/Redis%E5%BA%95%E5%B1%82%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.html\",\"title\":\"Redis底层数据结构\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis底层数据结构\",\"date\":\"2022-03-19T16:31:28.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\"],\"description\":\"文章结构 Redis的数据类型和底层数据结构 Redis 数据结构并不是指 String（字符串）对象、List（列表）对象、Hash（哈希）对象、Set（集合）对象和 Zset（有序集合）对象，因为这些是 Redis 键值对中值的数据类型，也就是数据的保存形式，这些对象的底层实现的方式就用到了数据结构。 上图中，zset的实现箭头有误。应该使用到了 [压缩列表 / listpack] or [哈希表 + 跳表]，也就是说图中少画了一条指向哈希表的箭头。redis zset底层数据结构\"},\"headers\":[{\"level\":2,\"title\":\"压缩列表结构设计\",\"slug\":\"压缩列表结构设计\",\"link\":\"#压缩列表结构设计\",\"children\":[]},{\"level\":2,\"title\":\"压缩列表的缺陷\",\"slug\":\"压缩列表的缺陷\",\"link\":\"#压缩列表的缺陷\",\"children\":[]},{\"level\":2,\"title\":\"渐进式rehash\",\"slug\":\"渐进式rehash\",\"link\":\"#渐进式rehash\",\"children\":[]},{\"level\":2,\"title\":\"跳表结构设计\",\"slug\":\"跳表结构设计\",\"link\":\"#跳表结构设计\",\"children\":[]},{\"level\":2,\"title\":\"跳表节点查询过程\",\"slug\":\"跳表节点查询过程\",\"link\":\"#跳表节点查询过程\",\"children\":[]},{\"level\":2,\"title\":\"跳表节点层数设置\",\"slug\":\"跳表节点层数设置\",\"link\":\"#跳表节点层数设置\",\"children\":[]}],\"readingTime\":{\"minutes\":23.05,\"words\":6914},\"filePathRelative\":\"posts/docs/Redis底层数据结构.md\",\"localizedDate\":\"2022年3月20日\",\"excerpt\":\"<p><strong>文章结构</strong></p>\\n\\n<h1> Redis的数据类型和底层数据结构</h1>\\n<p><strong>Redis 数据结构并不是指 String（字符串）对象、List（列表）对象、Hash（哈希）对象、Set（集合）对象和 Zset（有序集合）对象，因为这些是 Redis 键值对中值的数据类型，也就是数据的保存形式，这些对象的底层实现的方式就用到了数据结构</strong>。</p>\\n<figure><figcaption></figcaption></figure>\\n<blockquote>\\n<p>上图中，zset的实现箭头有误。应该使用到了 [压缩列表 / listpack] or [哈希表 + 跳表]，也就是说图中少画了一条指向哈希表的箭头。<a href=\\\"https://developer.aliyun.com/article/666398\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">redis zset底层数据结构</a></p>\\n</blockquote>\",\"autoDesc\":true}")

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
