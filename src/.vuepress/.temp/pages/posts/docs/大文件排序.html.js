export const data = JSON.parse("{\"key\":\"v-47c69424\",\"path\":\"/posts/docs/%E5%A4%A7%E6%96%87%E4%BB%B6%E6%8E%92%E5%BA%8F.html\",\"title\":\"大文件排序\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"大文件排序\",\"date\":\"2022-03-20T23:16:05.000Z\",\"categories\":\"工程向算法\",\"description\":\"分割+多路归并 我们可以将一个很大的文件，切分成很多个小文件，使得每个小文件能够单独的装进内存，并将每个小文件进行内排序（快速排序等等），然后再将多个小文件进行多路归并排序，最终得到一个有序的文件。 多路归并排序在大数据领域也是常用的算法，常用于海量数据排序。当数据量特别大时，这些数据无法被单个机器内存容纳，它需要被切分位多个集合分别由不同的机器进行内存排序（map过程），然后再进行多路归并算法将来自多个不同机器的数据进行排序（reduce 过程），这是流式多路归并排序。 多路归并排序的优势在于内存消耗极低，它的内存占用和输入文件的数量成正比，和数据总量无关，数据总量只会线性正比影响排序的时间。\"},\"headers\":[{\"level\":2,\"title\":\"堆\",\"slug\":\"堆\",\"link\":\"#堆\",\"children\":[]},{\"level\":2,\"title\":\"胜者树\",\"slug\":\"胜者树\",\"link\":\"#胜者树\",\"children\":[]},{\"level\":2,\"title\":\"败者树\",\"slug\":\"败者树\",\"link\":\"#败者树\",\"children\":[]}],\"readingTime\":{\"minutes\":2.49,\"words\":747},\"filePathRelative\":\"posts/docs/大文件排序.md\",\"localizedDate\":\"2022年3月21日\",\"excerpt\":\"<h1> 分割+多路归并</h1>\\n<p>我们可以将一个很大的文件，切分成很多个小文件，使得每个小文件能够单独的装进内存，并将每个小文件进行内排序（快速排序等等），然后再将多个小文件进行多路归并排序，最终得到一个有序的文件。</p>\\n<p>多路归并排序在大数据领域也是常用的算法，常用于海量数据排序。当数据量特别大时，这些数据无法被单个机器内存容纳，它需要被切分位多个集合分别由不同的机器进行内存排序（map过程），然后再进行多路归并算法将来自多个不同机器的数据进行排序（reduce 过程），这是流式多路归并排序。</p>\\n<p>多路归并排序的优势在于内存消耗极低，它的内存占用和输入文件的数量成正比，和数据总量无关，数据总量只会线性正比影响排序的时间。</p>\",\"autoDesc\":true}")

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
