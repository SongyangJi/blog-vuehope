export const data = JSON.parse("{\"key\":\"v-2541bf6b\",\"path\":\"/posts/Spring%20%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B04%20%20%E2%80%94%E2%80%94%20%20AOP%EF%BC%88%E9%9D%A2%E5%90%91%E5%88%87%E9%9D%A2%E7%BC%96%E7%A8%8B%EF%BC%89.html\",\"title\":\"Spring 学习笔记4  ——  AOP（面向切面编程）\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Spring 学习笔记4  ——  AOP（面向切面编程）\",\"date\":\"2021-08-01T00:00:00.000Z\",\"categories\":\"Spring\",\"tags\":[\"Spring核心\",\"JavaEE\"],\"description\":\"这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。 5. Spring 面向方面编程 5.1 AOP概念 下面是一些核心 AOP 概念和术语。这些术语不是特定于 Spring 的。 切面（Aspect）：跨越多个类的关注点的模块化—— AOP中的基本单位，正如OOP中的类一样。在 Spring AOP 中，方面是通过使用基于XML配置常规Bean或使用注解@Aspect注解的常规类 （@AspectJ 风格）实现的。 注意：@Aspect是注解，@AspectJ是AspectJ project在Spring AOP中实现的风格。 连接点（Join point）：程序执行过程中的一个点，例如方法的执行或异常的处理。 在 Spring AOP 中，一个连接点总是代表一个方法的执行，目前不能对字段进行拦截。 通知（Advice）：方面在特定连接点采取的行动。通知类型将在后面讨论。 切点（Pointcut）：**匹配连接点的谓词。**由切入点表达式匹配的连接点的概念是 AOP 的核心，Spring 默认使用 AspectJ 风格的切入点表达式语言。 通俗的说，Spring会根据切点定义的规则去匹配连接点。 引入（Introduction） ：代表类型声明额外的方法或字段。Spring AOP 允许您向任何目标对象引入新的接口（和相应的实现）。 这个算是AOP里比较难理解的概念，最好通过实例来解释。 目标对象（Target object）：被一个或多个方面建议的对象。也称为“建议对象”。由于 Spring AOP 是使用运行时代理实现的，所以这个对象始终是一个被代理的对象 （即原对象）。 AOP 代理：由 AOP 框架创建的对象，用于实现方面契约（建议方法执行等）。在 Spring Framework 中，AOP 代理由 JDK 动态代理或 CGLIB 代理。 编织：将切面与其他应用程序类型或对象联系起来以创建 Advised 对象。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Spring%20%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B04%20%20%E2%80%94%E2%80%94%20%20AOP%EF%BC%88%E9%9D%A2%E5%90%91%E5%88%87%E9%9D%A2%E7%BC%96%E7%A8%8B%EF%BC%89.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Spring 学习笔记4  ——  AOP（面向切面编程）\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。 5. Spring 面向方面编程 5.1 AOP概念 下面是一些核心 AOP 概念和术语。这些术语不是特定于 Spring 的。 切面（Aspect）：跨越多个类的关注点的模块化—— AOP中的基本单位，正如OOP中的类一样。在 Spring AOP 中，方面是通过使用基于XML配置常规Bean或使用注解@Aspect注解的常规类 （@AspectJ 风格）实现的。 注意：@Aspect是注解，@AspectJ是AspectJ project在Spring AOP中实现的风格。 连接点（Join point）：程序执行过程中的一个点，例如方法的执行或异常的处理。 在 Spring AOP 中，一个连接点总是代表一个方法的执行，目前不能对字段进行拦截。 通知（Advice）：方面在特定连接点采取的行动。通知类型将在后面讨论。 切点（Pointcut）：**匹配连接点的谓词。**由切入点表达式匹配的连接点的概念是 AOP 的核心，Spring 默认使用 AspectJ 风格的切入点表达式语言。 通俗的说，Spring会根据切点定义的规则去匹配连接点。 引入（Introduction） ：代表类型声明额外的方法或字段。Spring AOP 允许您向任何目标对象引入新的接口（和相应的实现）。 这个算是AOP里比较难理解的概念，最好通过实例来解释。 目标对象（Target object）：被一个或多个方面建议的对象。也称为“建议对象”。由于 Spring AOP 是使用运行时代理实现的，所以这个对象始终是一个被代理的对象 （即原对象）。 AOP 代理：由 AOP 框架创建的对象，用于实现方面契约（建议方法执行等）。在 Spring Framework 中，AOP 代理由 JDK 动态代理或 CGLIB 代理。 编织：将切面与其他应用程序类型或对象联系起来以创建 Advised 对象。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Spring核心\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"JavaEE\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-08-01T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Spring 学习笔记4  ——  AOP（面向切面编程）\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-08-01T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"5.1 AOP概念\",\"slug\":\"_5-1-aop概念\",\"link\":\"#_5-1-aop概念\",\"children\":[]},{\"level\":2,\"title\":\"5.2 使用@AspectJ风格的AOP\",\"slug\":\"_5-2-使用-aspectj风格的aop\",\"link\":\"#_5-2-使用-aspectj风格的aop\",\"children\":[{\"level\":3,\"title\":\"5.2.1 启用@AspectJ支持\",\"slug\":\"_5-2-1-启用-aspectj支持\",\"link\":\"#_5-2-1-启用-aspectj支持\",\"children\":[]},{\"level\":3,\"title\":\"5.2.2 声明一个切面\",\"slug\":\"_5-2-2-声明一个切面\",\"link\":\"#_5-2-2-声明一个切面\",\"children\":[]},{\"level\":3,\"title\":\"5.2.3 声明一个切入点\",\"slug\":\"_5-2-3-声明一个切入点\",\"link\":\"#_5-2-3-声明一个切入点\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.92,\"words\":1177},\"filePathRelative\":\"posts/Spring 学习笔记4  ——  AOP（面向切面编程）.md\",\"localizedDate\":\"2021年8月1日\",\"excerpt\":\"<blockquote>\\n<p>这里我做的这份笔记的意义仅仅是记录下自己学习Spring的历程，既不是对官方API的深入解释，也不一定是对新手友好的、知识点详尽的一份学习清单。</p>\\n</blockquote>\\n<h1> 5. Spring 面向方面编程</h1>\\n<h2> 5.1 AOP概念</h2>\\n<p>下面是一些核心 AOP 概念和术语。这些术语不是特定于 Spring 的。</p>\\n<ul>\\n<li>\\n<p>切面（Aspect）：跨越多个类的关注点的模块化—— <strong>AOP中的基本单位</strong>，正如OOP中的类一样。在 Spring AOP 中，方面是通过使用<strong>基于XML配置常规Bean</strong>或<strong>使用注解@Aspect注解的常规类 （@AspectJ 风格）实现的</strong>。</p>\\n<p>注意：<code>@Aspect</code>是注解，@AspectJ是AspectJ project在Spring AOP中实现的风格。</p>\\n</li>\\n<li>\\n<p>连接点（Join point）：<strong>程序执行过程中的一个点，例如方法的执行或异常的处理</strong>。</p>\\n<p>在 Spring AOP 中，一个连接点总是代表一个<strong>方法</strong>的执行，目前不能对<strong>字段</strong>进行拦截。</p>\\n</li>\\n<li>\\n<p>通知（Advice）：<strong>方面在特定连接点采取的行动</strong>。通知类型将在后面讨论。</p>\\n</li>\\n<li>\\n<p>切点（Pointcut）：**匹配连接点的谓词。**由切入点表达式匹配的连接点的概念是 AOP 的核心，Spring 默认使用 AspectJ 风格的切入点表达式语言。</p>\\n<p>通俗的说，Spring会根据切点定义的规则去匹配连接点。</p>\\n</li>\\n<li>\\n<p>引入（Introduction） ：代表类型声明额外的方法或字段。Spring AOP 允许您向任何目标对象引入新的接口（和相应的实现）。</p>\\n<p>这个算是AOP里比较难理解的概念，最好通过实例来解释。</p>\\n</li>\\n<li>\\n<p>目标对象（Target object）：被一个或多个方面建议的对象。也称为“建议对象”。由于 Spring AOP 是使用运行时代理实现的，所以这个对象始终是一个<strong>被代理的对象</strong> （即原对象）。</p>\\n</li>\\n<li>\\n<p>AOP 代理：由 AOP 框架创建的对象，用于实现方面契约（建议方法执行等）。在 Spring Framework 中，AOP 代理由 JDK 动态代理或 CGLIB 代理。</p>\\n</li>\\n<li>\\n<p>编织：将切面与其他应用程序类型或对象联系起来以创建 Advised 对象。</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")

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
