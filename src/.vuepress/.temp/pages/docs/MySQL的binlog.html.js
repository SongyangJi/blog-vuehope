export const data = JSON.parse("{\"key\":\"v-6c466018\",\"path\":\"/docs/MySQL%E7%9A%84binlog.html\",\"title\":\"MySQL —— binlog\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL —— binlog\",\"date\":\"2022-09-28T13:39:36.000Z\",\"categories\":\"MySQL\",\"tags\":null,\"description\":\"binlog是Mysql sever层维护的一种二进制日志，与innodb引擎中的redo/undo log是完全不同的日志；其主要是用来记录对mysql数据更新或潜在发生更新的SQL语句，并保存在磁盘中； 作用主要有： 主从复制：MySQL Replication在Master端开启binlog，Master把它的二进制日志传递给slaves并回放来达到master-slave数据一致的目的。复制是mysql最重要的功能之一，mysql集群的高可用、负载均衡和读写分离都是基于复制来实现的； 数据恢复：通过mysqlbinlog工具恢复数据； 增量备份。\"},\"headers\":[{\"level\":2,\"title\":\"binlog格式\",\"slug\":\"binlog格式\",\"link\":\"#binlog格式\",\"children\":[]}],\"readingTime\":{\"minutes\":3.51,\"words\":1052},\"filePathRelative\":\"docs/MySQL的binlog.md\",\"localizedDate\":\"2022年9月28日\",\"excerpt\":\"<p>binlog是Mysql sever层维护的一种二进制日志，与innodb引擎中的redo/undo log是完全不同的日志；其主要是用来记录对mysql数据更新或潜在发生更新的SQL语句，并保存在磁盘中；</p>\\n<p>作用主要有：</p>\\n<ul>\\n<li>主从复制：MySQL Replication在Master端开启binlog，Master把它的二进制日志传递给slaves并回放来达到master-slave数据一致的目的。复制是mysql最重要的功能之一，mysql集群的高可用、负载均衡和读写分离都是基于复制来实现的；</li>\\n<li>数据恢复：通过mysqlbinlog工具恢复数据；</li>\\n<li>增量备份。</li>\\n</ul>\",\"autoDesc\":true}")

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
