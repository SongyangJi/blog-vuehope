export const data = JSON.parse("{\"key\":\"v-00be1512\",\"path\":\"/docs/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E2%80%94%E2%80%94%E9%A1%B5%E9%9D%A2%E7%BD%AE%E6%8D%A2%E7%AE%97%E6%B3%95.html\",\"title\":\"操作系统——页面置换算法\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"操作系统——页面置换算法\",\"date\":\"2022-09-23T01:46:02.000Z\",\"categories\":\"操作系统\",\"tags\":null,\"description\":\"缺页中断 当 CPU 访问的⻚⾯不在物理内存时，便会产⽣⼀个缺⻚中断，请求操作系统将所缺⻚调⼊到物理内存。那它与⼀般中断的主要区别在于： 缺⻚中断在指令执⾏「期间」产⽣和处理中断信号，⽽⼀般中断在⼀条指令执⾏「完成」后检查和处理中断信号。 缺⻚中断返回到该指令的开始重新执⾏「该指令」，⽽⼀般中断返回回到该指令的「下⼀个指令」执⾏。 在 CPU ⾥访问⼀条 Load M 指令，然后 CPU 会去找 M 所对应的⻚表项。 如果该⻚表项的状态位是「有效的」，那 CPU 就可以直接去访问物理内存了，如果状态位是「⽆效的」，则 CPU 则会发送缺⻚中断请求。 操作系统收到了缺⻚中断，则会执⾏缺⻚中断处理函数，先会查找该⻚⾯在磁盘中的⻚⾯的位置。 找到磁盘中对应的⻚⾯后，需要把该⻚⾯换⼊到物理内存中，但是在换⼊前，需要在物理内存中找空闲⻚，如果找到空闲⻚，就把⻚⾯换⼊到物理内存中。 ⻚⾯从磁盘换⼊到物理内存完成后，则把⻚表项中的状态位修改为「有效的」。 最后，CPU 重新执⾏导致缺⻚异常的指令。\"},\"headers\":[{\"level\":2,\"title\":\"缺页中断\",\"slug\":\"缺页中断\",\"link\":\"#缺页中断\",\"children\":[{\"level\":3,\"title\":\"最佳⻚⾯置换算法OPT\",\"slug\":\"最佳⻚面置换算法opt\",\"link\":\"#最佳⻚面置换算法opt\",\"children\":[]},{\"level\":3,\"title\":\"先进先出置换算法FIFO\",\"slug\":\"先进先出置换算法fifo\",\"link\":\"#先进先出置换算法fifo\",\"children\":[]},{\"level\":3,\"title\":\"最近最少使⽤的置换算法LRU\",\"slug\":\"最近最少使用的置换算法lru\",\"link\":\"#最近最少使用的置换算法lru\",\"children\":[]},{\"level\":3,\"title\":\"时钟⻚⾯置换算法——Clock算法\",\"slug\":\"时钟⻚面置换算法——clock算法\",\"link\":\"#时钟⻚面置换算法——clock算法\",\"children\":[]},{\"level\":3,\"title\":\"改进型的 clock 算法\",\"slug\":\"改进型的-clock-算法\",\"link\":\"#改进型的-clock-算法\",\"children\":[]},{\"level\":3,\"title\":\"最不常⽤页面置换算法\",\"slug\":\"最不常用页面置换算法\",\"link\":\"#最不常用页面置换算法\",\"children\":[]}]},{\"level\":2,\"title\":\"页面抖动（颠簸）\",\"slug\":\"页面抖动-颠簸\",\"link\":\"#页面抖动-颠簸\",\"children\":[]},{\"level\":2,\"title\":\"工作集（驻留集）\",\"slug\":\"工作集-驻留集\",\"link\":\"#工作集-驻留集\",\"children\":[]}],\"readingTime\":{\"minutes\":7.31,\"words\":2193},\"filePathRelative\":\"docs/操作系统——页面置换算法.md\",\"localizedDate\":\"2022年9月23日\",\"excerpt\":\"<h2> 缺页中断</h2>\\n<p>当 CPU 访问的⻚⾯不在物理内存时，便会产⽣⼀个缺⻚中断，请求操作系统将所缺⻚调⼊到物理内存。那它与⼀般中断的主要区别在于：\\n缺⻚中断在指令执⾏「期间」产⽣和处理中断信号，⽽⼀般中断在⼀条指令执⾏「完成」后检查和处理中断信号。</p>\\n<p>缺⻚中断返回到该指令的开始重新执⾏「该指令」，⽽⼀般中断返回回到该指令的「下⼀个指令」执⾏。</p>\\n<ol>\\n<li>在 CPU ⾥访问⼀条 Load M 指令，然后 CPU 会去找 M 所对应的⻚表项。</li>\\n<li>如果该⻚表项的状态位是「有效的」，那 CPU 就可以直接去访问物理内存了，如果状态位是「⽆效的」，则 CPU 则会发送缺⻚中断请求。</li>\\n<li>操作系统收到了缺⻚中断，则会执⾏缺⻚中断处理函数，先会查找该⻚⾯在磁盘中的⻚⾯的位置。</li>\\n<li>找到磁盘中对应的⻚⾯后，需要把该⻚⾯换⼊到物理内存中，<strong>但是在换⼊前，需要在物理内存中找空闲⻚</strong>，如果找到空闲⻚，就把⻚⾯换⼊到物理内存中。</li>\\n<li>⻚⾯从磁盘换⼊到物理内存完成后，则把⻚表项中的状态位修改为「有效的」。</li>\\n<li>最后，CPU 重新执⾏导致缺⻚异常的指令。</li>\\n</ol>\",\"autoDesc\":true}")

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
