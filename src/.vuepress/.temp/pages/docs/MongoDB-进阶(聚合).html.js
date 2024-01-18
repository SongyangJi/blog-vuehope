export const data = JSON.parse("{\"key\":\"v-41c94868\",\"path\":\"/docs/MongoDB-%E8%BF%9B%E9%98%B6(%E8%81%9A%E5%90%88).html\",\"title\":\"MongoDB 进阶(聚合)\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MongoDB 进阶(聚合)\",\"date\":\"2021-10-19T08:57:21.000Z\",\"categories\":\"NoSQL\",\"tags\":[\"NoSQL\",\"MongoDB\"],\"description\":\"聚合 什么是聚合管道？ 聚合管道是基于数据处理管道概念建模的数据聚合框架。 文档进入多阶段管道，将文档转换为聚合结果。 MongoDB 聚合管道由阶段组成。每个阶段都会在文档通过管道时对其进行转换。 管道阶段可以在管道中多次出现，但$out，$merge、 和 $geoNear阶段除外。（相当于 Java 流式计算的的最后一步归约操作）。\"},\"headers\":[{\"level\":2,\"title\":\"聚合管道的阶段\",\"slug\":\"聚合管道的阶段\",\"link\":\"#聚合管道的阶段\",\"children\":[]},{\"level\":2,\"title\":\"聚合管道表达式\",\"slug\":\"聚合管道表达式\",\"link\":\"#聚合管道表达式\",\"children\":[]},{\"level\":2,\"title\":\"group\",\"slug\":\"group\",\"link\":\"#group\",\"children\":[{\"level\":3,\"title\":\"含义与作用\",\"slug\":\"含义与作用\",\"link\":\"#含义与作用\",\"children\":[]},{\"level\":3,\"title\":\"语法\",\"slug\":\"语法\",\"link\":\"#语法\",\"children\":[]},{\"level\":3,\"title\":\"小例子\",\"slug\":\"小例子\",\"link\":\"#小例子\",\"children\":[]}]},{\"level\":2,\"title\":\"lookup实现关联查询\",\"slug\":\"lookup实现关联查询\",\"link\":\"#lookup实现关联查询\",\"children\":[{\"level\":3,\"title\":\"含义与作用\",\"slug\":\"含义与作用-1\",\"link\":\"#含义与作用-1\",\"children\":[]},{\"level\":3,\"title\":\"语法\",\"slug\":\"语法-1\",\"link\":\"#语法-1\",\"children\":[]},{\"level\":3,\"title\":\"小例子\",\"slug\":\"小例子-1\",\"link\":\"#小例子-1\",\"children\":[]}]}],\"readingTime\":{\"minutes\":8.83,\"words\":2650},\"filePathRelative\":\"docs/MongoDB-进阶(聚合).md\",\"localizedDate\":\"2021年10月19日\",\"excerpt\":\"<h1> 聚合</h1>\\n<p>什么是聚合管道？</p>\\n<ul>\\n<li><strong>聚合管道是基于数据处理管道概念建模的数据聚合框架</strong>。</li>\\n<li>文档进入<strong>多阶段管道</strong>，将文档转换为聚合结果。</li>\\n<li>MongoDB 聚合管道由<strong>阶段</strong>组成。每个阶段都会在文档通过管道时对其进行转换。</li>\\n<li>管道阶段可以在管道中多次出现，但<a href=\\\"https://docs.mongodb.com/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\"><code>$out</code></a>，<a href=\\\"https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\"><code>$merge</code></a>、 和 <a href=\\\"https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#mongodb-pipeline-pipe.-geoNear\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\"><code>$geoNear</code></a>阶段除外。（相当于 Java 流式计算的的最后一步归约操作）。</li>\\n</ul>\",\"autoDesc\":true}")

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
