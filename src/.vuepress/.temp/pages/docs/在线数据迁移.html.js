export const data = JSON.parse("{\"key\":\"v-49b4eaaa\",\"path\":\"/docs/%E5%9C%A8%E7%BA%BF%E6%95%B0%E6%8D%AE%E8%BF%81%E7%A7%BB.html\",\"title\":\"在线数据迁移\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"在线数据迁移\",\"date\":\"2022-10-08T22:38:41.000Z\",\"categories\":\"架构\",\"tags\":null,\"description\":\"在线数据迁移最大的挑战是如何保证迁移过程服务不受影响。很多人将其比喻成“飞行过程中换发动机”“给行驶的汽车换轮胎”，但实际上并没有那么困难，一个入行一两年的技术人员，遵从一些经验指导，完全可以完成。下面就跟大家分享一下个人在这方面的一些经验，作为抛砖引玉。 在线数据迁移一般分为四个步骤： 一. 上线双写，即同时写入新旧两种数据； 二. 历史数据离线搬迁，即离线将历史存量数据从旧系统搬到新系统； 三. 切读，即将读请求路由到新系统； 四. 清理沉淀，包括清理旧的数据，回收资源，及清理旧的代码逻辑，旧的配套系统等等，将迁移过程中的经验教训进行总结沉淀，将过程中开发或使用的工具进行通用化改造，以备下次使用。\"},\"headers\":[{\"level\":2,\"title\":\"上线双写\",\"slug\":\"上线双写\",\"link\":\"#上线双写\",\"children\":[]},{\"level\":2,\"title\":\"历史数据搬迁\",\"slug\":\"历史数据搬迁\",\"link\":\"#历史数据搬迁\",\"children\":[]},{\"level\":2,\"title\":\"切读\",\"slug\":\"切读\",\"link\":\"#切读\",\"children\":[]},{\"level\":2,\"title\":\"清理沉淀\",\"slug\":\"清理沉淀\",\"link\":\"#清理沉淀\",\"children\":[]}],\"readingTime\":{\"minutes\":7.02,\"words\":2107},\"filePathRelative\":\"docs/在线数据迁移.md\",\"localizedDate\":\"2022年10月9日\",\"excerpt\":\"<blockquote>\\n<p>在线数据迁移最大的挑战是如何保证迁移过程服务不受影响。很多人将其比喻成“飞行过程中换发动机”“给行驶的汽车换轮胎”，但实际上并没有那么困难，一个入行一两年的技术人员，遵从一些经验指导，完全可以完成。下面就跟大家分享一下个人在这方面的一些经验，作为抛砖引玉。</p>\\n</blockquote>\\n<p>在线数据迁移一般分为四个步骤：</p>\\n<p>一. 上线双写，即同时写入新旧两种数据；</p>\\n<p>二. 历史数据离线搬迁，即离线将历史存量数据从旧系统搬到新系统；</p>\\n<p>三. 切读，即将读请求路由到新系统；</p>\\n<p>四. 清理沉淀，包括清理旧的数据，回收资源，及清理旧的代码逻辑，旧的配套系统等等，将迁移过程中的经验教训进行总结沉淀，将过程中开发或使用的工具进行通用化改造，以备下次使用。</p>\",\"autoDesc\":true}")

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
