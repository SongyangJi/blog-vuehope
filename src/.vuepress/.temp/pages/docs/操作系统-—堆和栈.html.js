export const data = JSON.parse("{\"key\":\"v-50e02e2a\",\"path\":\"/docs/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F-%E2%80%94%E5%A0%86%E5%92%8C%E6%A0%88.html\",\"title\":\"操作系统——堆和栈\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"操作系统——堆和栈\",\"date\":\"2021-12-06T15:56:01.000Z\",\"categories\":\"操作系统\",\"tags\":[\"OS\"],\"description\":\"进程内存的段式划分 一个由C/C++编译的程序占用的内存分为以下几个部分 （从上到下，从内存高地址到内存低地址） 1、栈区（stack） — 由编译器自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。（高地址） 2、堆区（heap） — 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收 。注意它与数据结构中的堆是两回事，分配方式倒是类似于链表（当然还有其它的管理方式）。 3、全局区（静态区）（static）—全局变量和静态变量的存储是放在一块的，初始化的全局变量和静态变量在一块区域， 未初始化的全局变量和未初始化的静态变量在相邻的另一块区域。程序结束后由系统释放。\"},\"headers\":[{\"level\":2,\"title\":\"申请方式\",\"slug\":\"申请方式\",\"link\":\"#申请方式\",\"children\":[]},{\"level\":2,\"title\":\"申请后系统的响应\",\"slug\":\"申请后系统的响应\",\"link\":\"#申请后系统的响应\",\"children\":[]},{\"level\":2,\"title\":\"申请大小的限制\",\"slug\":\"申请大小的限制\",\"link\":\"#申请大小的限制\",\"children\":[]},{\"level\":2,\"title\":\"申请效率的比较\",\"slug\":\"申请效率的比较\",\"link\":\"#申请效率的比较\",\"children\":[]},{\"level\":2,\"title\":\"堆和栈中的存储内容\",\"slug\":\"堆和栈中的存储内容\",\"link\":\"#堆和栈中的存储内容\",\"children\":[]},{\"level\":2,\"title\":\"堆和栈中的存储内容\",\"slug\":\"堆和栈中的存储内容-1\",\"link\":\"#堆和栈中的存储内容-1\",\"children\":[]},{\"level\":2,\"title\":\"如何使用\",\"slug\":\"如何使用\",\"link\":\"#如何使用\",\"children\":[]},{\"level\":2,\"title\":\"Linux进程堆管理\",\"slug\":\"linux进程堆管理\",\"link\":\"#linux进程堆管理\",\"children\":[]},{\"level\":2,\"title\":\"堆空间的管理算法\",\"slug\":\"堆空间的管理算法\",\"link\":\"#堆空间的管理算法\",\"children\":[{\"level\":3,\"title\":\"空闲链表\",\"slug\":\"空闲链表\",\"link\":\"#空闲链表\",\"children\":[]},{\"level\":3,\"title\":\"位图\",\"slug\":\"位图\",\"link\":\"#位图\",\"children\":[]},{\"level\":3,\"title\":\"对象池\",\"slug\":\"对象池\",\"link\":\"#对象池\",\"children\":[]},{\"level\":3,\"title\":\"综合运用多种算法\",\"slug\":\"综合运用多种算法\",\"link\":\"#综合运用多种算法\",\"children\":[]}]}],\"readingTime\":{\"minutes\":14.51,\"words\":4352},\"filePathRelative\":\"docs/操作系统-—堆和栈.md\",\"localizedDate\":\"2021年12月6日\",\"excerpt\":\"<h1> 进程内存的段式划分</h1>\\n<p>一个由C/C++编译的程序占用的内存分为以下几个部分\\n（从上到下，<strong>从内存高地址到内存低地址</strong>）\\n1、栈区（stack） — 由编译器自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。（高地址）</p>\\n<p>2、堆区（heap） — 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收 。注意它与数据结构中的堆是两回事，分配方式倒是类似于链表（当然还有其它的管理方式）。</p>\\n<p>3、全局区（静态区）（static）—全局变量和静态变量的存储是放在一块的，初始化的全局变量和静态变量在一块区域， 未初始化的全局变量和未初始化的静态变量在相邻的另一块区域。程序结束后由系统释放。</p>\",\"autoDesc\":true}")

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
