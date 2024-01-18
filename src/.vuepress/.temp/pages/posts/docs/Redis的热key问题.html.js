export const data = JSON.parse("{\"key\":\"v-cbfda0bc\",\"path\":\"/posts/docs/Redis%E7%9A%84%E7%83%ADkey%E9%97%AE%E9%A2%98.html\",\"title\":\"Redis的热key问题\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis的热key问题\",\"date\":\"2022-08-13T23:50:26.000Z\",\"categories\":\"Redis\",\"tag\":[\"Redis\"],\"description\":\"上面提到，所谓热key问题就是，突然有几十万的请求去访问redis上的某个特定key。那么，这样会造成流量过于集中，达到物理网卡上限，从而导致这台redis的服务器宕机。那接下来这个key的请求，就会直接怼到你的数据库上，导致你的服务不可用。 热Key的危害 流量集中，达到服务器处理上限（CPU、网络 IO 等）； 会影响在同一个 Redis 实例上其他 Key 的读写请求操作； 热 Key 请求落到同一个 Redis 实例上，无法通过扩容解决； 大量 Redis 请求失败，查询操作可能打到数据库，拖垮数据库，导致整个服务不可用。\"},\"headers\":[{\"level\":2,\"title\":\"热Key的危害\",\"slug\":\"热key的危害\",\"link\":\"#热key的危害\",\"children\":[]},{\"level\":2,\"title\":\"如何发现热Key\",\"slug\":\"如何发现热key\",\"link\":\"#如何发现热key\",\"children\":[{\"level\":3,\"title\":\"凭借业务经验，预估热 Key 出现\",\"slug\":\"凭借业务经验-预估热-key-出现\",\"link\":\"#凭借业务经验-预估热-key-出现\",\"children\":[]},{\"level\":3,\"title\":\"客户端进行收集\",\"slug\":\"客户端进行收集\",\"link\":\"#客户端进行收集\",\"children\":[]},{\"level\":3,\"title\":\"在代理层进行收集\",\"slug\":\"在代理层进行收集\",\"link\":\"#在代理层进行收集\",\"children\":[]},{\"level\":3,\"title\":\"使用 Redis 自带命令\",\"slug\":\"使用-redis-自带命令\",\"link\":\"#使用-redis-自带命令\",\"children\":[]},{\"level\":3,\"title\":\"Redis 节点抓包分析\",\"slug\":\"redis-节点抓包分析\",\"link\":\"#redis-节点抓包分析\",\"children\":[]}]},{\"level\":2,\"title\":\"如何解决\",\"slug\":\"如何解决\",\"link\":\"#如何解决\",\"children\":[{\"level\":3,\"title\":\"增加 Redis 实例副本数量\",\"slug\":\"增加-redis-实例副本数量\",\"link\":\"#增加-redis-实例副本数量\",\"children\":[]},{\"level\":3,\"title\":\"二级缓存（本地缓存）\",\"slug\":\"二级缓存-本地缓存\",\"link\":\"#二级缓存-本地缓存\",\"children\":[]},{\"level\":3,\"title\":\"热 Key 备份\",\"slug\":\"热-key-备份\",\"link\":\"#热-key-备份\",\"children\":[]}]}],\"readingTime\":{\"minutes\":5.75,\"words\":1726},\"filePathRelative\":\"posts/docs/Redis的热key问题.md\",\"localizedDate\":\"2022年8月14日\",\"excerpt\":\"<blockquote>\\n<p>上面提到，所谓热key问题就是，突然有几十万的请求去访问redis上的某个特定key。那么，这样会造成流量过于集中，达到物理网卡上限，从而导致这台redis的服务器宕机。那接下来这个key的请求，就会直接怼到你的数据库上，导致你的服务不可用。</p>\\n</blockquote>\\n<h2> 热Key的危害</h2>\\n<ul>\\n<li>流量集中，达到服务器处理上限（<code>CPU</code>、网络 <code>IO</code> 等）；</li>\\n<li>会影响在同一个 <code>Redis</code> 实例上其他 <code>Key</code> 的读写请求操作；</li>\\n<li>热 <code>Key</code> 请求落到同一个 <code>Redis</code> 实例上，无法通过扩容解决；</li>\\n<li>大量 <code>Redis</code> 请求失败，查询操作可能打到数据库，拖垮数据库，导致整个服务不可用。</li>\\n</ul>\",\"autoDesc\":true}")

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
