export const data = JSON.parse("{\"key\":\"v-8ba5bf44\",\"path\":\"/posts/MySQL%E7%9A%84binlog.html\",\"title\":\"MySQL —— binlog\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL —— binlog\",\"date\":\"2022-09-28T13:39:36.000Z\",\"categories\":\"MySQL\",\"tags\":null,\"description\":\"binlog是Mysql sever层维护的一种二进制日志，与innodb引擎中的redo/undo log是完全不同的日志；其主要是用来记录对mysql数据更新或潜在发生更新的SQL语句，并保存在磁盘中； 作用主要有： 主从复制：MySQL Replication在Master端开启binlog，Master把它的二进制日志传递给slaves并回放来达到master-slave数据一致的目的。复制是mysql最重要的功能之一，mysql集群的高可用、负载均衡和读写分离都是基于复制来实现的； 数据恢复：通过mysqlbinlog工具恢复数据； 增量备份。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/MySQL%E7%9A%84binlog.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"MySQL —— binlog\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"binlog是Mysql sever层维护的一种二进制日志，与innodb引擎中的redo/undo log是完全不同的日志；其主要是用来记录对mysql数据更新或潜在发生更新的SQL语句，并保存在磁盘中； 作用主要有： 主从复制：MySQL Replication在Master端开启binlog，Master把它的二进制日志传递给slaves并回放来达到master-slave数据一致的目的。复制是mysql最重要的功能之一，mysql集群的高可用、负载均衡和读写分离都是基于复制来实现的； 数据恢复：通过mysqlbinlog工具恢复数据； 增量备份。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-09-28T13:39:36.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"MySQL —— binlog\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-09-28T13:39:36.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"binlog格式\",\"slug\":\"binlog格式\",\"link\":\"#binlog格式\",\"children\":[]}],\"readingTime\":{\"minutes\":3.51,\"words\":1052},\"filePathRelative\":\"posts/MySQL的binlog.md\",\"localizedDate\":\"2022年9月28日\",\"excerpt\":\"<p>binlog是Mysql sever层维护的一种二进制日志，与innodb引擎中的redo/undo log是完全不同的日志；其主要是用来记录对mysql数据更新或潜在发生更新的SQL语句，并保存在磁盘中；</p>\\n<p>作用主要有：</p>\\n<ul>\\n<li>主从复制：MySQL Replication在Master端开启binlog，Master把它的二进制日志传递给slaves并回放来达到master-slave数据一致的目的。复制是mysql最重要的功能之一，mysql集群的高可用、负载均衡和读写分离都是基于复制来实现的；</li>\\n<li>数据恢复：通过mysqlbinlog工具恢复数据；</li>\\n<li>增量备份。</li>\\n</ul>\",\"autoDesc\":true}")

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
