export const data = JSON.parse("{\"key\":\"v-6663f43e\",\"path\":\"/posts/docs/GCC%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3.html\",\"title\":\"GCC参数详解\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"GCC参数详解\",\"date\":\"2022-11-30T22:39:32.000Z\",\"categories\":\"C\",\"tags\":[\"C\",\"编译\"],\"description\":\"gcc工作步骤 gcc 与 g++ 分别是 gnu 的 c &amp; c++ 编译器 gcc/g++ 在执行编译工作的时候，总共需要4步： 1、预处理,生成 .i 的文件[预处理器cpp] 2、将预处理后的文件转换成汇编语言, 生成文件 .s [编译器egcs] 3、有汇编变为目标代码(机器代码)生成 .o 的文件[汇编器as] 4、连接目标代码, 生成可执行程序 [链接器ld] 参数详解 -x language filename\"},\"headers\":[{\"level\":3,\"title\":\"gcc工作步骤\",\"slug\":\"gcc工作步骤\",\"link\":\"#gcc工作步骤\",\"children\":[]},{\"level\":3,\"title\":\"参数详解\",\"slug\":\"参数详解\",\"link\":\"#参数详解\",\"children\":[]},{\"level\":3,\"title\":\"gcc 命令的常用选项\",\"slug\":\"gcc-命令的常用选项\",\"link\":\"#gcc-命令的常用选项\",\"children\":[]}],\"readingTime\":{\"minutes\":8.25,\"words\":2476},\"filePathRelative\":\"posts/docs/GCC参数详解.md\",\"localizedDate\":\"2022年12月1日\",\"excerpt\":\"<h3> gcc工作步骤</h3>\\n<p>gcc 与 g++ 分别是 gnu 的 c &amp; c++ 编译器 gcc/g++ 在执行编译工作的时候，总共需要4步：</p>\\n<ul>\\n<li>1、预处理,生成 .i 的文件[预处理器cpp]</li>\\n<li>2、将预处理后的文件转换成汇编语言, 生成文件 .s [编译器egcs]</li>\\n<li>3、有汇编变为目标代码(机器代码)生成 .o 的文件[汇编器as]</li>\\n<li>4、连接目标代码, 生成可执行程序 [链接器ld]</li>\\n</ul>\\n<h3> 参数详解</h3>\\n<p><strong>-x language filename</strong></p>\",\"autoDesc\":true}")

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
