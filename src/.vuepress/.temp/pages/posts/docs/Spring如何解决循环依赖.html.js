export const data = JSON.parse("{\"key\":\"v-39579d02\",\"path\":\"/posts/docs/Spring%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%BE%AA%E7%8E%AF%E4%BE%9D%E8%B5%96.html\",\"title\":\"Spring如何解决循环依赖\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Spring如何解决循环依赖\",\"date\":\"2022-09-05T13:05:42.000Z\",\"categories\":\"Spring\",\"tags\":null,\"description\":\"三级缓存的设计 这里指的是单例的、非构造依赖的循环引用。很多人都知道Spring用了三层缓存来解决循环依赖，但是不知道其原因，为什么是三级缓存？二级缓存不行吗？一级缓存不可以 ？ Spring 解决循环依赖的核心就是提前暴露对象，而提前暴露的对象就是放置于第二级缓存中。缓存的底层都是Map，至于它们属于第几层是由Spring获取数据顺序以及其作用来表现的。 三级缓存的说明： 名称 作用 singletonObjects 一级缓存，存放完整的 Bean。 earlySingletonObjects 二级缓存，存放提前暴露的Bean，Bean 是不完整的，未完成属性注入和执行 初始化（init） 方法。 singletonFactories 三级缓存，存放的是 Bean 工厂，主要是生产 Bean，存放到二级缓存中。\"},\"headers\":[{\"level\":2,\"title\":\"三级缓存的设计\",\"slug\":\"三级缓存的设计\",\"link\":\"#三级缓存的设计\",\"children\":[{\"level\":3,\"title\":\"第一级缓存singletonObjects\",\"slug\":\"第一级缓存singletonobjects\",\"link\":\"#第一级缓存singletonobjects\",\"children\":[]},{\"level\":3,\"title\":\"第三级缓存singletonFactories\",\"slug\":\"第三级缓存singletonfactories\",\"link\":\"#第三级缓存singletonfactories\",\"children\":[]},{\"level\":3,\"title\":\"第二级缓存earlySingletonObjects\",\"slug\":\"第二级缓存earlysingletonobjects\",\"link\":\"#第二级缓存earlysingletonobjects\",\"children\":[]}]},{\"level\":2,\"title\":\"三级缓存的划分及其作用。\",\"slug\":\"三级缓存的划分及其作用。\",\"link\":\"#三级缓存的划分及其作用。\",\"children\":[{\"level\":3,\"title\":\"需要自行解决的循环依赖\",\"slug\":\"需要自行解决的循环依赖\",\"link\":\"#需要自行解决的循环依赖\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.76,\"words\":1427},\"filePathRelative\":\"posts/docs/Spring如何解决循环依赖.md\",\"localizedDate\":\"2022年9月5日\",\"excerpt\":\"<h2> 三级缓存的设计</h2>\\n<blockquote>\\n<p>这里指的是单例的、非构造依赖的循环引用。很多人都知道Spring用了三层缓存来解决循环依赖，但是不知道其原因，为什么是三级缓存？二级缓存不行吗？一级缓存不可以 ？</p>\\n</blockquote>\\n<p>Spring 解决循环依赖的核心就是提前暴露对象，而提前暴露的对象就是放置于第二级缓存中。缓存的底层都是Map，至于它们属于第几层是由Spring获取数据顺序以及其作用来表现的。</p>\\n<p>三级缓存的说明：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>名称</th>\\n<th>作用</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><code>singletonObjects</code></td>\\n<td>一级缓存，存放完整的 Bean。</td>\\n</tr>\\n<tr>\\n<td><code>earlySingletonObjects</code></td>\\n<td>二级缓存，存放提前暴露的Bean，Bean 是不完整的，未完成属性注入和执行 初始化（init） 方法。</td>\\n</tr>\\n<tr>\\n<td><code>singletonFactories</code></td>\\n<td>三级缓存，存放的是 Bean 工厂，主要是生产 Bean，存放到二级缓存中。</td>\\n</tr>\\n</tbody>\\n</table>\",\"autoDesc\":true}")

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
