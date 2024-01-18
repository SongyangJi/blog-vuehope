export const data = JSON.parse("{\"key\":\"v-338beff0\",\"path\":\"/posts/docs/MySQL%E7%B3%BB%E5%88%97%E2%80%94%E2%80%94-InnoDB%E7%9A%84MVCC%E6%9C%BA%E5%88%B6.html\",\"title\":\"MySQL系列—— InnoDB的MVCC机制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL系列—— InnoDB的MVCC机制\",\"date\":\"2021-10-31T23:37:11.000Z\",\"categories\":\"MySQL\",\"tags\":[\"MySQL\"],\"description\":\"前置知识 事务并发执行时遇到的一致性问题 脏写 一个事务修改了另一个未提交事务修改过的数据。 脏读 一个事务读到了另一个未提交事务修改过的数据。 不可重复读 一个事务多次读到的同一数据行的值不相同。 幻读 一个事务多次按照同一个搜索条件，读到了不同的数据行。 隔离级别 隔离级别描述了并发事务执行时对竞争数据的互相影响的程度。\"},\"headers\":[{\"level\":2,\"title\":\"事务并发执行时遇到的一致性问题\",\"slug\":\"事务并发执行时遇到的一致性问题\",\"link\":\"#事务并发执行时遇到的一致性问题\",\"children\":[]},{\"level\":2,\"title\":\"隔离级别\",\"slug\":\"隔离级别\",\"link\":\"#隔离级别\",\"children\":[]},{\"level\":2,\"title\":\"版本链\",\"slug\":\"版本链\",\"link\":\"#版本链\",\"children\":[]},{\"level\":2,\"title\":\"ReadView（一致性视图）\",\"slug\":\"readview-一致性视图\",\"link\":\"#readview-一致性视图\",\"children\":[]},{\"level\":2,\"title\":\"二级索引和MVCC\",\"slug\":\"二级索引和mvcc\",\"link\":\"#二级索引和mvcc\",\"children\":[]}],\"readingTime\":{\"minutes\":5.15,\"words\":1546},\"filePathRelative\":\"posts/docs/MySQL系列——-InnoDB的MVCC机制.md\",\"localizedDate\":\"2021年11月1日\",\"excerpt\":\"<h1> 前置知识</h1>\\n<h2> 事务并发执行时遇到的一致性问题</h2>\\n<ul>\\n<li>脏写</li>\\n</ul>\\n<p>一个事务修改了另一个未提交事务修改过的数据。</p>\\n<ul>\\n<li>脏读</li>\\n</ul>\\n<p>一个事务读到了另一个未提交事务修改过的数据。</p>\\n<ul>\\n<li>不可重复读</li>\\n</ul>\\n<p>一个事务多次读到的同一数据行的值不相同。</p>\\n<ul>\\n<li>幻读</li>\\n</ul>\\n<p>一个事务多次按照同一个搜索条件，读到了不同的数据行。</p>\\n<h2> 隔离级别</h2>\\n<p>隔离级别描述了并发事务执行时对竞争数据的互相影响的程度。</p>\",\"autoDesc\":true}")

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
