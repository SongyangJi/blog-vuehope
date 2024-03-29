export const data = JSON.parse("{\"key\":\"v-2ad10b86\",\"path\":\"/docs/MySQL%E7%B3%BB%E5%88%97%E2%80%94%E2%80%94-%E9%94%81%E6%9C%BA%E5%88%B6.html\",\"title\":\"MySQL系列 —— 锁机制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL系列 —— 锁机制\",\"date\":\"2021-11-03T16:11:15.000Z\",\"categories\":\"MySQL\",\"tags\":[\"MySQL\",\"锁\"],\"description\":\"两阶段锁协议 两阶段锁协议（2PL）是一种能够保证事务可串行化的协议，它将事务的获取锁和释放锁划分成了增长（Growing）和缩减（Shrinking）两个不同的阶段。 在增长阶段，一个事务可以获得锁但是不能释放锁；而在缩减阶段事务只可以释放锁，并不能获得新的锁，如果只看 2PL 的定义，那么到这里就已经介绍完了，但是它还有两个变种： 严格两阶段锁（Strict 2PL）：事务持有的互斥锁必须在提交后再释放； 强两阶段锁（Rigorous 2PL）：事务持有的所有锁必须在提交后释放；\"},\"headers\":[{\"level\":3,\"title\":\"两阶段锁协议\",\"slug\":\"两阶段锁协议\",\"link\":\"#两阶段锁协议\",\"children\":[]},{\"level\":2,\"title\":\"按粒度分\",\"slug\":\"按粒度分\",\"link\":\"#按粒度分\",\"children\":[]},{\"level\":2,\"title\":\"按是否意向锁区分\",\"slug\":\"按是否意向锁区分\",\"link\":\"#按是否意向锁区分\",\"children\":[]},{\"level\":2,\"title\":\"按读写性质分\",\"slug\":\"按读写性质分\",\"link\":\"#按读写性质分\",\"children\":[]},{\"level\":2,\"title\":\"InnoDB中的表级锁\",\"slug\":\"innodb中的表级锁\",\"link\":\"#innodb中的表级锁\",\"children\":[]},{\"level\":2,\"title\":\"InnoDB中的行级锁\",\"slug\":\"innodb中的行级锁\",\"link\":\"#innodb中的行级锁\",\"children\":[]},{\"level\":2,\"title\":\"死锁\",\"slug\":\"死锁\",\"link\":\"#死锁\",\"children\":[]}],\"readingTime\":{\"minutes\":11.9,\"words\":3571},\"filePathRelative\":\"docs/MySQL系列——-锁机制.md\",\"localizedDate\":\"2021年11月4日\",\"excerpt\":\"<h3> 两阶段锁协议</h3>\\n<p>两阶段锁协议（2PL）是一种能够保证事务可串行化的协议，它将事务的获取锁和释放锁划分成了增长（Growing）和缩减（Shrinking）两个不同的阶段。</p>\\n<p>在增长阶段，一个事务可以获得锁但是不能释放锁；而在缩减阶段事务只可以释放锁，并不能获得新的锁，如果只看 2PL 的定义，那么到这里就已经介绍完了，但是它还有两个变种：</p>\\n<ol>\\n<li><strong>严格两阶段锁</strong>（Strict 2PL）：事务持有的<strong>互斥</strong>锁必须在提交后再释放；</li>\\n<li><strong>强两阶段锁</strong>（Rigorous 2PL）：事务持有的<strong>所有</strong>锁必须在提交后释放；</li>\\n</ol>\",\"autoDesc\":true}")

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
