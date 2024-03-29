export const data = JSON.parse("{\"key\":\"v-3220d2b0\",\"path\":\"/posts/docs/%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3.html\",\"title\":\"海量数据问题解决\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"海量数据问题解决\",\"date\":\"2022-09-15T01:05:26.000Z\",\"categories\":\"工程向算法\",\"tags\":[\"算法\"],\"description\":\"问题简介 这里的海量数据问题不是指的一般性的大数据问题，指的是由大量数字、字符串等构成的大数据集，我们需要处理解决如下几种典型的计算问题：计数、排序、去重、交集、TopK等等。 问题的关键点在于，如此庞大的数据无法一次性放到内存里面，因而处理方案就没有那么简单了。 计数 海量数字，哪个数字出现的次数最多？ 排序 10G的数字，将其排序。 去重 海量日志，去除其中重复的数据。 交集 两个各有20亿行的文件，每一行都只有一个数字，求这两个文件的交集。 TopK 10G整数求中位数。\"},\"headers\":[{\"level\":2,\"title\":\"排序\",\"slug\":\"排序\",\"link\":\"#排序\",\"children\":[]},{\"level\":2,\"title\":\"去重——海量日志，去除其中重复的数据。\",\"slug\":\"去重——海量日志-去除其中重复的数据。\",\"link\":\"#去重——海量日志-去除其中重复的数据。\",\"children\":[]},{\"level\":2,\"title\":\"计数\",\"slug\":\"计数\",\"link\":\"#计数\",\"children\":[]},{\"level\":2,\"title\":\"交集\",\"slug\":\"交集\",\"link\":\"#交集\",\"children\":[{\"level\":3,\"title\":\"有a、b两个文件，各存放50亿个url，每个url各占64字节，内存限制是4G，让你找出a、b文件共同的url？\",\"slug\":\"有a、b两个文件-各存放50亿个url-每个url各占64字节-内存限制是4g-让你找出a、b文件共同的url\",\"link\":\"#有a、b两个文件-各存放50亿个url-每个url各占64字节-内存限制是4g-让你找出a、b文件共同的url\",\"children\":[]},{\"level\":3,\"title\":\"现有两个各有20亿行的文件，每一行都只有一个int型数字，求这两个文件的交集。\",\"slug\":\"现有两个各有20亿行的文件-每一行都只有一个int型数字-求这两个文件的交集。\",\"link\":\"#现有两个各有20亿行的文件-每一行都只有一个int型数字-求这两个文件的交集。\",\"children\":[]}]},{\"level\":2,\"title\":\"TopK——10G整数求中位数\",\"slug\":\"topk——10g整数求中位数\",\"link\":\"#topk——10g整数求中位数\",\"children\":[]}],\"readingTime\":{\"minutes\":6.58,\"words\":1973},\"filePathRelative\":\"posts/docs/海量数据问题解决.md\",\"localizedDate\":\"2022年9月15日\",\"excerpt\":\"<h1> 问题简介</h1>\\n<p>这里的海量数据问题不是指的一般性的大数据问题，指的是由大量数字、字符串等构成的大数据集，我们需要处理解决如下几种典型的计算问题：计数、排序、去重、交集、TopK等等。</p>\\n<p>问题的关键点在于，如此庞大的数据无法一次性放到内存里面，因而处理方案就没有那么简单了。</p>\\n<ol>\\n<li>\\n<p><strong>计数</strong>\\n海量数字，哪个数字出现的次数最多？</p>\\n</li>\\n<li>\\n<p><strong>排序</strong>\\n10G的数字，将其排序。</p>\\n</li>\\n<li>\\n<p><strong>去重</strong></p>\\n<p>海量日志，去除其中重复的数据。</p>\\n</li>\\n<li>\\n<p><strong>交集</strong></p>\\n<p>两个各有20亿行的文件，每一行都只有一个数字，求这两个文件的交集。</p>\\n</li>\\n<li>\\n<p><strong>TopK</strong></p>\\n<p>10G整数求中位数。</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")

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
