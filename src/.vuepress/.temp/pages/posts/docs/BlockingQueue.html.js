export const data = JSON.parse("{\"key\":\"v-4508925c\",\"path\":\"/posts/docs/BlockingQueue.html\",\"title\":\"JDK的BlockingQueue\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"JDK的BlockingQueue\",\"date\":\"2021-12-15T00:07:32.000Z\",\"categories\":\"JUC\",\"tags\":[\"JUC\",\"并发集合类\"],\"description\":\"BlockingQueue BlockingQueue接口，作为阻塞队列的接口规范，有多种实现类。 BlockingQueue有四种形式，处理不能立即满足但可能在未来某个时候满足的操作。 四种方式各不相同：一个抛出异常，第二个返回一个特殊值（ null或false ，取决于操作），第三个无限期地阻塞当前线程，直到操作成功，第四个阻塞仅给定的最大时间限制，然后放弃。 这些方法总结在下表中： 方法/特点 Throws exception Special value Blocks Time out Insert add(e) offer(e) put(e) offer(e, time, unit) Remove remove() poll() take() poll(time, unit) Examine element peek not applicable not applicable\"},\"headers\":[{\"level\":2,\"title\":\"BlockingQueue\",\"slug\":\"blockingqueue\",\"link\":\"#blockingqueue\",\"children\":[]},{\"level\":2,\"title\":\"LinkedBlockingQueue\",\"slug\":\"linkedblockingqueue\",\"link\":\"#linkedblockingqueue\",\"children\":[]},{\"level\":2,\"title\":\"ArrayBlockingQueue\",\"slug\":\"arrayblockingqueue\",\"link\":\"#arrayblockingqueue\",\"children\":[]}],\"readingTime\":{\"minutes\":9.31,\"words\":2794},\"filePathRelative\":\"posts/docs/BlockingQueue.md\",\"localizedDate\":\"2021年12月15日\",\"excerpt\":\"<h2> BlockingQueue</h2>\\n<p><code>BlockingQueue</code>接口，作为阻塞队列的接口规范，有多种实现类。</p>\\n<p><code>BlockingQueue</code>有四种形式，处理不能立即满足但可能在未来某个时候满足的操作。</p>\\n<p>四种方式各不相同：一个抛出异常，第二个返回一个特殊值（ <code>null</code>或<code>false</code> ，取决于操作），第三个无限期地阻塞当前线程，直到操作成功，第四个阻塞仅给定的最大时间限制，然后放弃。 这些方法总结在下表中：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>方法/特点</th>\\n<th>Throws exception</th>\\n<th>Special value</th>\\n<th>Blocks</th>\\n<th>Time out</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>Insert</td>\\n<td>add(e)</td>\\n<td>offer(e)</td>\\n<td>put(e)</td>\\n<td>offer(e, time, unit)</td>\\n</tr>\\n<tr>\\n<td>Remove</td>\\n<td>remove()</td>\\n<td>poll()</td>\\n<td>take()</td>\\n<td>poll(time, unit)</td>\\n</tr>\\n<tr>\\n<td>Examine</td>\\n<td>element</td>\\n<td>peek</td>\\n<td>not applicable</td>\\n<td>not applicable</td>\\n</tr>\\n</tbody>\\n</table>\",\"autoDesc\":true}")

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
