export const data = JSON.parse("{\"key\":\"v-327e93b0\",\"path\":\"/docs/Spring%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%901.html\",\"title\":\"Spring源码解析1\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Spring源码解析1\",\"date\":\"2021-10-15T00:39:49.000Z\",\"categories\":\"Spring\",\"tags\":[\"Spring核心\",\"JavaEE\"],\"description\":\"为了减少篇幅，以及尽可能介绍核心，在贴出代码的时候只节选部分。完整代码请参阅官方文档。 顶层设计 如何表示对象与对象之间的关系 描述对象的文件存放在哪里 如何统一一个关于对象的定义 如何对不同的配置文件进行解析 IOC的实现方式： 依赖注入（DI）、依赖查找（不再使用） 源码类图 BeanFactory（存放Bean的容器） 访问 Spring bean 容器的根接口。 该接口的实现类包含一个bean的注册表，每个bean定义由一个字符串名称唯一标识。 根 据 bean 定义，工厂将返回包含对象的独立实例（原型设计模式），或单个共享实例（单例设计模式的高级替代方案，其中实例是范围内的单例）工厂）。 返回哪种类型的实例取决于 bean factory 配置：API 是相同的。 这种方法的重点是 BeanFactory 是应用程序组件的中央注册表，并且集中了应用程序组件的配置（例如，单个对象不再需要读取属性文件）。 Spring 的依赖注入功能是使用这个 BeanFactory 接口及其子接口实现的。 通常 BeanFactory 将加载存储在配置源（例如 XML ）中的 bean 定义，并使用org.springframework.beans包来配置 bean。 但是，实现可以简单地直接在 Java 代码中返回它根据需要创建的 Java 对象。 定义的存储方式没有限制：LDAP、RDBMS、XML、属性文件等。\"},\"headers\":[{\"level\":2,\"title\":\"BeanFactory（存放Bean的容器）\",\"slug\":\"beanfactory-存放bean的容器\",\"link\":\"#beanfactory-存放bean的容器\",\"children\":[]},{\"level\":2,\"title\":\"BeanDefinition（Bean的统一定义）\",\"slug\":\"beandefinition-bean的统一定义\",\"link\":\"#beandefinition-bean的统一定义\",\"children\":[]}],\"readingTime\":{\"minutes\":2.93,\"words\":879},\"filePathRelative\":\"docs/Spring源码解析1.md\",\"localizedDate\":\"2021年10月15日\",\"excerpt\":\"<blockquote>\\n<p>为了减少篇幅，以及尽可能介绍核心，在贴出代码的时候只节选部分。完整代码请参阅官方文档。</p>\\n</blockquote>\\n<h1> 顶层设计</h1>\\n<ol>\\n<li>如何表示对象与对象之间的关系</li>\\n<li>描述对象的文件存放在哪里</li>\\n<li>如何统一一个关于对象的定义</li>\\n<li>如何对不同的配置文件进行解析</li>\\n</ol>\\n<p>IOC的实现方式：</p>\\n<p>依赖注入（DI）、依赖查找（不再使用）</p>\\n<h1> 源码类图</h1>\\n<h2> BeanFactory（存放Bean的容器）</h2>\\n<blockquote>\\n<p><strong>访问 Spring bean 容器的根接口</strong>。\\n该接口的实现类包含一个bean的注册表，每个bean定义由一个字符串名称唯一标识。 根\\n据 bean 定义，工厂将返回包含对象的独立实例（原型设计模式），或单个共享实例（单例设计模式的高级替代方案，其中实例是范围内的单例）工厂）。 返回哪种类型的实例取决于 bean factory 配置：API 是相同的。\\n这种方法的重点是 BeanFactory 是应用程序组件的中央注册表，并且集中了应用程序组件的配置（例如，单个对象不再需要读取属性文件）。\\n<strong>Spring 的依赖注入功能是使用这个 BeanFactory 接口及其子接口实现的</strong>。\\n通常 BeanFactory 将加载存储在配置源（例如 XML ）中的 bean 定义，并使用org.springframework.beans包来配置 bean。 但是，实现可以简单地直接在 Java 代码中返回它根据需要创建的 Java 对象。 定义的存储方式没有限制：LDAP、RDBMS、XML、属性文件等。</p>\\n</blockquote>\",\"autoDesc\":true}")

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
