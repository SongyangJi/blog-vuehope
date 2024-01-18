export const data = JSON.parse("{\"key\":\"v-0823f0c9\",\"path\":\"/docs/Redis%E7%B3%BB%E5%88%97%E7%AC%94%E8%AE%B0%E4%B9%8B-%E2%80%94%E2%80%94-%E7%BC%93%E5%AD%98%E4%B8%89%E5%A4%A7%E9%97%AE%E9%A2%98%E5%8F%8A%E5%85%B6%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html\",\"title\":\"Redis系列笔记之 —— 缓存三大问题及其解决方案\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis系列笔记之 —— 缓存三大问题及其解决方案\",\"date\":\"2021-10-31T00:00:00.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\"],\"description\":\"老八股文了，redis必问问题。 缓存的利与弊 引入缓存的优点 能够缩短服务的响应时间，给用户带来更好的体验。 能够增大系统的吞吐量，依然能够提升用户体验。 减轻数据库的压力，防止高峰期数据库被压垮，导致整个线上服务 BOOM！ 引入缓存的缺点 缓存有多种选型，是内存缓存，memcached 还是 redis，你是否都熟悉，如果不熟悉，无疑增加了维护的难度（本来是个纯洁的数据库系统）。 缓存系统也要考虑分布式，比如 redis 的分布式缓存还会有很多坑，无疑增加了系统的复杂性。 在特殊场景下，如果对缓存的准确性有非常高的要求，就必须考虑缓存和数据库的一致性问题。\"},\"headers\":[{\"level\":2,\"title\":\"引入缓存的优点\",\"slug\":\"引入缓存的优点\",\"link\":\"#引入缓存的优点\",\"children\":[]},{\"level\":2,\"title\":\"引入缓存的缺点\",\"slug\":\"引入缓存的缺点\",\"link\":\"#引入缓存的缺点\",\"children\":[]},{\"level\":2,\"title\":\"问题描述\",\"slug\":\"问题描述\",\"link\":\"#问题描述\",\"children\":[]},{\"level\":2,\"title\":\"解决方案\",\"slug\":\"解决方案\",\"link\":\"#解决方案\",\"children\":[]},{\"level\":2,\"title\":\"问题描述\",\"slug\":\"问题描述-1\",\"link\":\"#问题描述-1\",\"children\":[]},{\"level\":2,\"title\":\"解决方案\",\"slug\":\"解决方案-1\",\"link\":\"#解决方案-1\",\"children\":[]},{\"level\":2,\"title\":\"问题描述\",\"slug\":\"问题描述-2\",\"link\":\"#问题描述-2\",\"children\":[]},{\"level\":2,\"title\":\"解决方案\",\"slug\":\"解决方案-2\",\"link\":\"#解决方案-2\",\"children\":[]}],\"readingTime\":{\"minutes\":5.87,\"words\":1761},\"filePathRelative\":\"docs/Redis系列笔记之-——-缓存三大问题及其解决方案.md\",\"localizedDate\":\"2021年10月31日\",\"excerpt\":\"<blockquote>\\n<p>老八股文了，redis必问问题。</p>\\n</blockquote>\\n<h1> 缓存的利与弊</h1>\\n<h2> 引入缓存的优点</h2>\\n<ul>\\n<li>能够缩短服务的响应时间，给用户带来更好的体验。</li>\\n<li>能够增大系统的吞吐量，依然能够提升用户体验。</li>\\n<li>减轻数据库的压力，防止高峰期数据库被压垮，导致整个线上服务 BOOM！</li>\\n</ul>\\n<h2> 引入缓存的缺点</h2>\\n<ul>\\n<li>缓存有多种选型，是内存缓存，memcached 还是 redis，你是否都熟悉，如果不熟悉，无疑增加了维护的难度（本来是个纯洁的数据库系统）。</li>\\n<li>缓存系统也要考虑分布式，比如 redis 的分布式缓存还会有很多坑，无疑增加了系统的复杂性。</li>\\n<li>在特殊场景下，如果对缓存的准确性有非常高的要求，就必须考虑缓存和数据库的一致性问题。</li>\\n</ul>\",\"autoDesc\":true}")

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
