export const data = JSON.parse("{\"key\":\"v-df9dc118\",\"path\":\"/posts/proc-cpuinfo%E6%96%87%E4%BB%B6%E4%BF%A1%E6%81%AF%E8%A7%A3%E8%AF%BB.html\",\"title\":\"Linux——/proc/cpuinfo文件信息解读\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux——/proc/cpuinfo文件信息解读\",\"date\":\"2023-04-08T16:08:42.000Z\",\"categories\":\"Linux\",\"tags\":null,\"description\":\"在linux系统中，提供了/proc目录下文件，显示系统的软硬件信息。如果想了解系统中CPU的提供商和相关配置信息，则可以查/proc/cpuinfo。但是此文件输出项较多，不易理解。例如我们想获取，有多少颗物理CPU，每个物理cpu核心数，以及超线程是否开启等信息。 明确物理CPU、核数、逻辑cpu数的概念 ①物理CPU数（physical id）：主板上实际插入的cpu数量，可以数不重复的 physical id 有几个 ②CPU核心数（cpu cores）：单块CPU上面能处理数据的芯片组的数量，如双核、四核等 ③逻辑CPU数：一般情况下，\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/proc-cpuinfo%E6%96%87%E4%BB%B6%E4%BF%A1%E6%81%AF%E8%A7%A3%E8%AF%BB.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Linux——/proc/cpuinfo文件信息解读\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"在linux系统中，提供了/proc目录下文件，显示系统的软硬件信息。如果想了解系统中CPU的提供商和相关配置信息，则可以查/proc/cpuinfo。但是此文件输出项较多，不易理解。例如我们想获取，有多少颗物理CPU，每个物理cpu核心数，以及超线程是否开启等信息。 明确物理CPU、核数、逻辑cpu数的概念 ①物理CPU数（physical id）：主板上实际插入的cpu数量，可以数不重复的 physical id 有几个 ②CPU核心数（cpu cores）：单块CPU上面能处理数据的芯片组的数量，如双核、四核等 ③逻辑CPU数：一般情况下，\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-04-08T16:08:42.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Linux——/proc/cpuinfo文件信息解读\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-04-08T16:08:42.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":3.01,\"words\":904},\"filePathRelative\":\"posts/proc-cpuinfo文件信息解读.md\",\"localizedDate\":\"2023年4月9日\",\"excerpt\":\"<p>在linux系统中，提供了/proc目录下文件，显示系统的软硬件信息。如果想了解系统中CPU的提供商和相关配置信息，则可以查/proc/cpuinfo。但是此文件输出项较多，不易理解。例如我们想获取，有多少颗物理CPU，每个物理cpu核心数，以及超线程是否开启等信息。</p>\\n<h1> 明确物理CPU、核数、逻辑cpu数的概念</h1>\\n<p>①物理CPU数（physical id）：主板上实际插入的cpu数量，可以数不重复的 physical id 有几个</p>\\n<p>②CPU核心数（cpu cores）：单块CPU上面能处理数据的芯片组的数量，如双核、四核等</p>\\n<p>③逻辑CPU数：一般情况下，</p>\",\"autoDesc\":true}")

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
