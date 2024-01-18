export const data = JSON.parse("{\"key\":\"v-5ccba6ae\",\"path\":\"/posts/docs/Redis%E7%BC%93%E5%AD%98%E6%B7%98%E6%B1%B0%E7%AD%96%E7%95%A5.html\",\"title\":\"Redis缓存淘汰策略\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis缓存淘汰策略\",\"date\":\"2022-03-21T22:43:17.000Z\",\"categories\":\"Redis\",\"tags\":[\"Redis\"],\"description\":\"Redis 使用的时内存空间来存储数据的，避免业务应用从后端数据库中读取数据，可以提升应用的响应速度。但是内存空间毕竟有限，随着我们存储数据的不断增长，要缓存的数据量越来越大，当超过了我们的内存大小时，该怎么办呢？ Redis 4.0 之前一共实现了 6 种内存淘汰策略，在 4.0 之后，又增加了 2 种策略。我们可以按照是否会进行数据淘汰把它们分成两类： 不进行数据淘汰的策略，只有 noeviction 这一种。 会进行淘汰的 7 种其他策略。会进行淘汰的 7 种策略，我们可以再进一步根据淘汰候选数据集的范围把它们分成两类： 在设置了过期时间的数据中进行淘汰，包括 volatile-random、volatile-ttl、volatile-lru、volatile-lfu（Redis 4.0 后新增）四种。 在所有数据范围内进行淘汰，包括 allkeys-lru、allkeys-random、allkeys-lfu（Redis 4.0 后新增）三种。\"},\"headers\":[],\"readingTime\":{\"minutes\":2.04,\"words\":611},\"filePathRelative\":\"posts/docs/Redis缓存淘汰策略.md\",\"localizedDate\":\"2022年3月22日\",\"excerpt\":\"<blockquote>\\n<p>Redis 使用的时内存空间来存储数据的，避免业务应用从后端数据库中读取数据，可以提升应用的响应速度。但是内存空间毕竟有限，随着我们存储数据的不断增长，要缓存的数据量越来越大，当超过了我们的内存大小时，该怎么办呢？</p>\\n</blockquote>\\n<p>Redis 4.0 之前一共实现了 6 种内存淘汰策略，在 4.0 之后，又增加了 2 种策略。我们可以按照是否会进行数据淘汰把它们分成两类：</p>\\n<ul>\\n<li>不进行数据淘汰的策略，只有 noeviction 这一种。</li>\\n<li>会进行淘汰的 7 种其他策略。会进行淘汰的 7 种策略，我们可以再进一步根据淘汰候选数据集的范围把它们分成两类：</li>\\n<li>\\n<ul>\\n<li>在设置了过期时间的数据中进行淘汰，包括 volatile-random、volatile-ttl、volatile-lru、volatile-lfu（Redis 4.0 后新增）四种。</li>\\n<li>在所有数据范围内进行淘汰，包括 allkeys-lru、allkeys-random、allkeys-lfu（Redis 4.0 后新增）三种。</li>\\n</ul>\\n</li>\\n</ul>\",\"autoDesc\":true}")

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
