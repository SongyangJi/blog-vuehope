export const data = JSON.parse("{\"key\":\"v-f352cf50\",\"path\":\"/posts/docs/JVM%E7%B1%BB%E5%8A%A0%E8%BD%BD%E6%9C%BA%E5%88%B6.html\",\"title\":\"JVM类加载机制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"JVM类加载机制\",\"date\":\"2022-03-21T02:53:12.000Z\",\"categories\":\"JVM\",\"tags\":[\"JVM\"],\"description\":\"类加载 类的加载过程非常复杂，主要有这几个过程：加载、链接（验证、准备、解析）、初始化。这些术语很多地方都出现过，我们不需要死记硬背，而应该要了解它背后的原理和要做的事情。 如图所示。大多数情况下，类会按照图中给出的顺序进行加载。 类加载过程 包含了加载、验证、准备、解析和初始化这 5 个阶段。 1. 加载 加载是类加载的一个阶段，注意不要混淆。 加载过程完成以下三件事：\"},\"headers\":[{\"level\":2,\"title\":\"类加载过程\",\"slug\":\"类加载过程\",\"link\":\"#类加载过程\",\"children\":[{\"level\":3,\"title\":\"1. 加载\",\"slug\":\"_1-加载\",\"link\":\"#_1-加载\",\"children\":[]},{\"level\":3,\"title\":\"2. 验证\",\"slug\":\"_2-验证\",\"link\":\"#_2-验证\",\"children\":[]},{\"level\":3,\"title\":\"3. 准备\",\"slug\":\"_3-准备\",\"link\":\"#_3-准备\",\"children\":[]},{\"level\":3,\"title\":\"4. 解析\",\"slug\":\"_4-解析\",\"link\":\"#_4-解析\",\"children\":[]},{\"level\":3,\"title\":\"5. 初始化\",\"slug\":\"_5-初始化\",\"link\":\"#_5-初始化\",\"children\":[]}]},{\"level\":2,\"title\":\"类加载器\",\"slug\":\"类加载器\",\"link\":\"#类加载器\",\"children\":[{\"level\":3,\"title\":\"类与类加载器\",\"slug\":\"类与类加载器\",\"link\":\"#类与类加载器\",\"children\":[]},{\"level\":3,\"title\":\"类加载器分类\",\"slug\":\"类加载器分类\",\"link\":\"#类加载器分类\",\"children\":[]},{\"level\":3,\"title\":\"双亲委派模型\",\"slug\":\"双亲委派模型\",\"link\":\"#双亲委派模型\",\"children\":[]},{\"level\":3,\"title\":\"自定义类加载器实现\",\"slug\":\"自定义类加载器实现\",\"link\":\"#自定义类加载器实现\",\"children\":[]},{\"level\":3,\"title\":\"一些自定义加载器\",\"slug\":\"一些自定义加载器\",\"link\":\"#一些自定义加载器\",\"children\":[]},{\"level\":3,\"title\":\"如何替换 JDK 的类\",\"slug\":\"如何替换-jdk-的类\",\"link\":\"#如何替换-jdk-的类\",\"children\":[]}]}],\"readingTime\":{\"minutes\":15.13,\"words\":4539},\"filePathRelative\":\"posts/docs/JVM类加载机制.md\",\"localizedDate\":\"2022年3月21日\",\"excerpt\":\"<h1> 类加载</h1>\\n<p>类的加载过程非常复杂，主要有这几个过程：<strong>加载、链接（验证、准备、解析）、初始化</strong>。这些术语很多地方都出现过，我们不需要死记硬背，而应该要了解它背后的原理和要做的事情。</p>\\n<p>如图所示。大多数情况下，类会按照图中给出的顺序进行加载。</p>\\n<figure><figcaption></figcaption></figure>\\n<h2> 类加载过程</h2>\\n<p>包含了加载、验证、准备、解析和初始化这 5 个阶段。</p>\\n<h3> 1. 加载</h3>\\n<p>加载是类加载的一个阶段，注意不要混淆。</p>\\n<p>加载过程完成以下三件事：</p>\",\"autoDesc\":true}")

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
