export const data = JSON.parse("{\"key\":\"v-4b028dbc\",\"path\":\"/docs/Redis%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81.html\",\"title\":\"Redis实现分布式锁\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis实现分布式锁\",\"date\":\"2021-11-29T11:00:11.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\",\"分布式锁\"],\"description\":\"分布式锁简介 分布式锁，是一种思想，它的实现方式有很多。比如，我们将沙滩当做分布式锁的组件，那么它看起来应该是这样的： 加锁 在沙滩上踩一脚，留下自己的脚印，就对应了加锁操作。其他进程或者线程，看到沙滩上已经有脚印，证明锁已被别人持有，则等待。 解锁 把脚印从沙滩上抹去，就是解锁的过程。 锁超时 为了避免死锁，我们可以设置一阵风，在单位时间后刮起，将脚印自动抹去。\"},\"headers\":[{\"level\":2,\"title\":\"锁的安全和活性保证\",\"slug\":\"锁的安全和活性保证\",\"link\":\"#锁的安全和活性保证\",\"children\":[]},{\"level\":2,\"title\":\"主从结构故障转移时的并发问题\",\"slug\":\"主从结构故障转移时的并发问题\",\"link\":\"#主从结构故障转移时的并发问题\",\"children\":[]},{\"level\":2,\"title\":\"锁的获取\",\"slug\":\"锁的获取\",\"link\":\"#锁的获取\",\"children\":[]},{\"level\":2,\"title\":\"锁的释放\",\"slug\":\"锁的释放\",\"link\":\"#锁的释放\",\"children\":[]},{\"level\":2,\"title\":\"使用Jedis实现”丐版“Redis锁\",\"slug\":\"使用jedis实现-丐版-redis锁\",\"link\":\"#使用jedis实现-丐版-redis锁\",\"children\":[]},{\"level\":2,\"title\":\"使用Redisson中的锁\",\"slug\":\"使用redisson中的锁\",\"link\":\"#使用redisson中的锁\",\"children\":[]},{\"level\":2,\"title\":\"Redisson中RLock的实现特点\",\"slug\":\"redisson中rlock的实现特点\",\"link\":\"#redisson中rlock的实现特点\",\"children\":[]},{\"level\":2,\"title\":\"加锁整体流程\",\"slug\":\"加锁整体流程\",\"link\":\"#加锁整体流程\",\"children\":[{\"level\":3,\"title\":\"构造锁\",\"slug\":\"构造锁\",\"link\":\"#构造锁\",\"children\":[]},{\"level\":3,\"title\":\"加锁\",\"slug\":\"加锁\",\"link\":\"#加锁\",\"children\":[]},{\"level\":3,\"title\":\"获取互斥状态\",\"slug\":\"获取互斥状态\",\"link\":\"#获取互斥状态\",\"children\":[]}]},{\"level\":2,\"title\":\"解锁整体流程\",\"slug\":\"解锁整体流程\",\"link\":\"#解锁整体流程\",\"children\":[{\"level\":3,\"title\":\"解锁\",\"slug\":\"解锁\",\"link\":\"#解锁\",\"children\":[]},{\"level\":3,\"title\":\"解锁的底层逻辑\",\"slug\":\"解锁的底层逻辑\",\"link\":\"#解锁的底层逻辑\",\"children\":[]}]},{\"level\":2,\"title\":\"Redisson的锁总结\",\"slug\":\"redisson的锁总结\",\"link\":\"#redisson的锁总结\",\"children\":[]}],\"readingTime\":{\"minutes\":13.89,\"words\":4168},\"filePathRelative\":\"docs/Redis实现分布式锁.md\",\"localizedDate\":\"2021年11月29日\",\"excerpt\":\"<h1> 分布式锁简介</h1>\\n<blockquote>\\n<p>分布式锁，是一种思想，它的实现方式有很多。比如，我们将沙滩当做分布式锁的组件，那么它看起来应该是这样的：</p>\\n<ul>\\n<li><strong>加锁</strong>\\n在沙滩上踩一脚，留下自己的脚印，就对应了加锁操作。其他进程或者线程，看到沙滩上已经有脚印，证明锁已被别人持有，则等待。</li>\\n<li><strong>解锁</strong>\\n把脚印从沙滩上抹去，就是解锁的过程。</li>\\n<li><strong>锁超时</strong>\\n为了避免死锁，我们可以设置一阵风，在单位时间后刮起，将脚印自动抹去。</li>\\n</ul>\\n</blockquote>\",\"autoDesc\":true}")

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
