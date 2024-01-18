export const data = JSON.parse("{\"key\":\"v-d5fe7b18\",\"path\":\"/docs/undolog.html\",\"title\":\"MySQL —— Undo log\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL —— Undo log\",\"date\":\"2021-12-09T18:47:10.000Z\",\"categories\":\"MySQL\",\"tags\":[\"MySQL\"],\"description\":\"undo log的作用 为了保证事务的原子性，InnoDB引入了undo日志，undo日志记载了回滚操作所需的内容。 undo是逻辑日志，只是将数据库逻辑地恢复到原来的样子；所有修改都被逻辑地取消了，但是数据结构和页本身在回滚之后可能不大相同。 undo log有两个作用：提供回滚和多版本并发控制(MVCC)。 事务id 在事务在对表中的记录进行修改的时候，会为这个事务分配一个唯一的事务id，这个事务id是递增的，所以事务id越小越先执行。未被分配事务id的事务的id默认是0。\"},\"headers\":[{\"level\":2,\"title\":\"undo log的作用\",\"slug\":\"undo-log的作用\",\"link\":\"#undo-log的作用\",\"children\":[]},{\"level\":2,\"title\":\"事务id\",\"slug\":\"事务id\",\"link\":\"#事务id\",\"children\":[]},{\"level\":2,\"title\":\"各种类型的Undo log\",\"slug\":\"各种类型的undo-log\",\"link\":\"#各种类型的undo-log\",\"children\":[]},{\"level\":2,\"title\":\"Undo log 的管理\",\"slug\":\"undo-log-的管理\",\"link\":\"#undo-log-的管理\",\"children\":[]},{\"level\":2,\"title\":\"undo及redo如何记录事务\",\"slug\":\"undo及redo如何记录事务\",\"link\":\"#undo及redo如何记录事务\",\"children\":[{\"level\":3,\"title\":\"Undo + Redo事务的简化过程\",\"slug\":\"undo-redo事务的简化过程\",\"link\":\"#undo-redo事务的简化过程\",\"children\":[]},{\"level\":3,\"title\":\"崩溃恢复\",\"slug\":\"崩溃恢复\",\"link\":\"#崩溃恢复\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.28,\"words\":1284},\"filePathRelative\":\"docs/undolog.md\",\"localizedDate\":\"2021年12月10日\",\"excerpt\":\"<h2> undo log的作用</h2>\\n<p>为了保证事务的原子性，InnoDB引入了undo日志，undo日志记载了回滚操作所需的内容。</p>\\n<p>undo是<strong>逻辑日志</strong>，只是将数据库逻辑地恢复到原来的样子；所有修改都被逻辑地取消了，但是数据结构和页本身在回滚之后可能不大相同。</p>\\n<p>undo log有两个作用：<strong>提供回滚</strong>和<strong>多版本并发控制(MVCC)</strong>。</p>\\n<h2> 事务id</h2>\\n<p>在事务在对表中的记录进行修改的时候，会为这个事务分配一个唯一的事务id，这个事务id是递增的，所以事务id越小越先执行。未被分配事务id的事务的id默认是0。</p>\",\"autoDesc\":true}")

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
