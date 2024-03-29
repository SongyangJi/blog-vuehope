export const data = JSON.parse("{\"key\":\"v-d296b7fc\",\"path\":\"/posts/docs/Redis%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E7%AC%94%E8%AE%B0%20%E2%80%94%E2%80%94%20%E4%BA%8B%E5%8A%A1%EF%BC%88Transactions%EF%BC%89.html\",\"title\":\"Redis官方文档笔记 —— 事务（Transactions）\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis官方文档笔记 —— 事务（Transactions）\",\"date\":\"2021-09-16T00:00:00.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\"],\"description\":\"相关命令 MULTI EXEC DISCARD WATCH UNWATCH 事务 事务是一组命令的集合。3 性质 事务中的所有命令都被序列化并顺序执行。在Redis事务的执行过程中（指定的是 exec后的真正的执行过程，而不是用multi后的入队过程），永远不会执行另一个客户端发出的请求（**命令不会加塞）。 所有命令都将被执行，或者所有命令都不执行，因此Redis事务也是原子的（这句话有可能会引起争议）。\"},\"headers\":[{\"level\":2,\"title\":\"性质\",\"slug\":\"性质\",\"link\":\"#性质\",\"children\":[]},{\"level\":2,\"title\":\"用法\",\"slug\":\"用法\",\"link\":\"#用法\",\"children\":[]},{\"level\":2,\"title\":\"事务中的错误\",\"slug\":\"事务中的错误\",\"link\":\"#事务中的错误\",\"children\":[{\"level\":3,\"title\":\"命令排队入队错误\",\"slug\":\"命令排队入队错误\",\"link\":\"#命令排队入队错误\",\"children\":[]},{\"level\":3,\"title\":\"命令执行错误\",\"slug\":\"命令执行错误\",\"link\":\"#命令执行错误\",\"children\":[]}]},{\"level\":2,\"title\":\"为什么Redis不支持回滚\",\"slug\":\"为什么redis不支持回滚\",\"link\":\"#为什么redis不支持回滚\",\"children\":[]},{\"level\":2,\"title\":\"DISCARD命令队列\",\"slug\":\"discard命令队列\",\"link\":\"#discard命令队列\",\"children\":[]},{\"level\":2,\"title\":\"WATCH实现乐观锁\",\"slug\":\"watch实现乐观锁\",\"link\":\"#watch实现乐观锁\",\"children\":[]},{\"level\":2,\"title\":\"Redis脚本和事务\",\"slug\":\"redis脚本和事务\",\"link\":\"#redis脚本和事务\",\"children\":[]}],\"readingTime\":{\"minutes\":6.09,\"words\":1828},\"filePathRelative\":\"posts/docs/Redis官方文档笔记 —— 事务（Transactions）.md\",\"localizedDate\":\"2021年9月16日\",\"excerpt\":\"<p><strong>相关命令</strong></p>\\n<blockquote>\\n<p>MULTI\\nEXEC\\nDISCARD\\nWATCH\\nUNWATCH</p>\\n</blockquote>\\n<h1> 事务</h1>\\n<p>事务是一组命令的集合。3</p>\\n<h2> 性质</h2>\\n<ul>\\n<li>事务中的<strong>所有命令都被序列化并顺序执行</strong>。在Redis事务的执行过程中（指定的是 <code>exec</code>后的真正的执行过程，而不是用<code>multi</code>后的入队过程），永远不会执行另一个客户端发出的请求（**命令不会加塞）。</li>\\n<li>所有命令都将被执行，或者所有命令都不执行，因此<strong>Redis事务也是原子的</strong>（这句话有可能会引起争议）。</li>\\n</ul>\",\"autoDesc\":true}")

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
