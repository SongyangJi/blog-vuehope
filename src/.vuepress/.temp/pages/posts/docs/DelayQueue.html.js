export const data = JSON.parse("{\"key\":\"v-696abecc\",\"path\":\"/posts/docs/DelayQueue.html\",\"title\":\"DelayQueue\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"DelayQueue\",\"date\":\"2022-03-15T18:16:48.000Z\",\"categories\":\"JUC\",\"tags\":[\"JUC\",\"并发集合类\"],\"description\":\"Delayed元素的无界阻塞队列，其中的元素只能在其延迟到期时被获取。 队列的头部是延迟过期最早的那个Delayed元素。 如果没有延迟到期，则没有 head 并且poll将返回null 。 当元素的getDelay(TimeUnit.NANOSECONDS)方法返回小于或等于零的值时，就会发生过期。 尽管无法使用take或poll删除未过期的元素，它们仍被视为普通元素。 例如， size方法返回过期和未过期元素的计数。\"},\"headers\":[],\"readingTime\":{\"minutes\":2.67,\"words\":800},\"filePathRelative\":\"posts/docs/DelayQueue.md\",\"localizedDate\":\"2022年3月16日\",\"excerpt\":\"<p><strong>Delayed元素</strong>的<strong>无界</strong>阻塞队列，其中的<strong>元素只能在其延迟到期时被获取</strong>。</p>\\n<p>队列的头部是延迟过期最早的那个Delayed元素。</p>\\n<p>如果没有延迟到期，则没有 head 并且poll将返回null 。</p>\\n<p>当元素的<code>getDelay(TimeUnit.NANOSECONDS)</code>方法返回小于或等于零的值时，就会发生过期。</p>\\n<p>尽管无法使用take或poll删除未过期的元素，它们仍被视为普通元素。 例如， size方法返回过期和未过期元素的计数。</p>\",\"autoDesc\":true}")

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
