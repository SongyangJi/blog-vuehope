export const data = JSON.parse("{\"key\":\"v-23562857\",\"path\":\"/posts/docs/Linux%E7%9A%84mmap%E6%A6%82%E5%BF%B5%E3%80%81%E5%8E%9F%E7%90%86%E3%80%81%E4%BD%BF%E7%94%A8.html\",\"title\":\"Linux的mmap概念、原理、使用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux的mmap概念、原理、使用\",\"date\":\"2021-11-22T09:52:37.000Z\",\"categories\":\"Linux\",\"tags\":[\"Linux\",\"内核\"],\"description\":\"mmap基础概念 mmap是一种内存映射文件的方法，即将一个文件或者其它对象映射到进程的地址空间，实现文件磁盘地址和进程虚拟地址空间中一段虚拟地址的一一对映关系。 实现这样的映射关系后**，进程就可以采用指针的方式读写操作这一段内存**，而系统会自动回写脏页面到对应的文件磁盘上，即完成了对文件的操作而不必再调用read,write等系统调用函数。相反，内核空间对这段区域的修改也直接反映用户空间，从而可以实现不同进程间的文件共享。\"},\"headers\":[{\"level\":2,\"title\":\"内存映射步骤\",\"slug\":\"内存映射步骤\",\"link\":\"#内存映射步骤\",\"children\":[{\"level\":3,\"title\":\"内核怎样保证各个进程寻址到同一个共享内存区域的内存页面\",\"slug\":\"内核怎样保证各个进程寻址到同一个共享内存区域的内存页面\",\"link\":\"#内核怎样保证各个进程寻址到同一个共享内存区域的内存页面\",\"children\":[]}]}],\"readingTime\":{\"minutes\":18.8,\"words\":5641},\"filePathRelative\":\"posts/docs/Linux的mmap概念、原理、使用.md\",\"localizedDate\":\"2021年11月22日\",\"excerpt\":\"<h1> mmap基础概念</h1>\\n<p><code>mmap</code>是一种<strong>内存映射文件</strong>的方法，即<strong>将一个文件或者其它对象映射到进程的地址空间</strong>，<strong>实现文件磁盘地址和进程虚拟地址空间中一段虚拟地址的一一对映关系</strong>。</p>\\n<p>实现这样的映射关系后**，进程就可以采用指针的方式读写操作这一段内存**，而<strong>系统会自动回写脏页面到对应的文件磁盘上</strong>，即完成了对文件的操作而不必再调用read,write等系统调用函数。相反，内核空间对这段区域的修改也直接反映用户空间，从而可以实现<strong>不同进程间的文件共享</strong>。</p>\",\"autoDesc\":true}")

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
