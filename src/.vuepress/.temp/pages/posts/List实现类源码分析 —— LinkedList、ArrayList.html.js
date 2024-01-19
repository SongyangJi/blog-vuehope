export const data = JSON.parse("{\"key\":\"v-04f95e78\",\"path\":\"/posts/List%E5%AE%9E%E7%8E%B0%E7%B1%BB%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%20%E2%80%94%E2%80%94%20LinkedList%E3%80%81ArrayList.html\",\"title\":\"List实现类源码分析 —— LinkedList、ArrayList\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"List实现类源码分析 —— LinkedList、ArrayList\",\"date\":\"2021-07-24T00:00:00.000Z\",\"categories\":\"Java集合类\",\"tags\":[\"Java集合类\",\"数据结构\",\"源码系列\"],\"description\":\"系列的其他文章： Java集合类 总结 LinkedList 继承关系 可见LinkedList既是List接口的实现也是Queue的实现（Deque），故其和ArrayList相比LinkedList支持的功能更多，其可视作队列来使用。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/List%E5%AE%9E%E7%8E%B0%E7%B1%BB%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%20%E2%80%94%E2%80%94%20LinkedList%E3%80%81ArrayList.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"List实现类源码分析 —— LinkedList、ArrayList\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"系列的其他文章： Java集合类 总结 LinkedList 继承关系 可见LinkedList既是List接口的实现也是Queue的实现（Deque），故其和ArrayList相比LinkedList支持的功能更多，其可视作队列来使用。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Java集合类\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"数据结构\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"源码系列\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-07-24T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"List实现类源码分析 —— LinkedList、ArrayList\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-07-24T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2024-01-18T12:43:38.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"LinkedList\",\"slug\":\"linkedlist\",\"link\":\"#linkedlist\",\"children\":[{\"level\":3,\"title\":\"继承关系\",\"slug\":\"继承关系\",\"link\":\"#继承关系\",\"children\":[]},{\"level\":3,\"title\":\"数据结构\",\"slug\":\"数据结构\",\"link\":\"#数据结构\",\"children\":[]},{\"level\":3,\"title\":\"构造函数\",\"slug\":\"构造函数\",\"link\":\"#构造函数\",\"children\":[]},{\"level\":3,\"title\":\"操作的时间复杂度\",\"slug\":\"操作的时间复杂度\",\"link\":\"#操作的时间复杂度\",\"children\":[]}]},{\"level\":2,\"title\":\"ArrayList\",\"slug\":\"arraylist\",\"link\":\"#arraylist\",\"children\":[{\"level\":3,\"title\":\"继承关系\",\"slug\":\"继承关系-1\",\"link\":\"#继承关系-1\",\"children\":[]},{\"level\":3,\"title\":\"数据结构\",\"slug\":\"数据结构-1\",\"link\":\"#数据结构-1\",\"children\":[]},{\"level\":3,\"title\":\"构造函数\",\"slug\":\"构造函数-1\",\"link\":\"#构造函数-1\",\"children\":[]},{\"level\":3,\"title\":\"操作的时间复杂度\",\"slug\":\"操作的时间复杂度-1\",\"link\":\"#操作的时间复杂度-1\",\"children\":[]},{\"level\":3,\"title\":\"扩容机制\",\"slug\":\"扩容机制\",\"link\":\"#扩容机制\",\"children\":[]}]},{\"level\":2,\"title\":\"关于GC\",\"slug\":\"关于gc\",\"link\":\"#关于gc\",\"children\":[]},{\"level\":2,\"title\":\"序列化/反序列化\",\"slug\":\"序列化-反序列化\",\"link\":\"#序列化-反序列化\",\"children\":[{\"level\":3,\"title\":\"LinkedList的序列化实现\",\"slug\":\"linkedlist的序列化实现\",\"link\":\"#linkedlist的序列化实现\",\"children\":[]},{\"level\":3,\"title\":\"ArrayList的序列化实现\",\"slug\":\"arraylist的序列化实现\",\"link\":\"#arraylist的序列化实现\",\"children\":[]}]},{\"level\":2,\"title\":\"迭代器实现\",\"slug\":\"迭代器实现\",\"link\":\"#迭代器实现\",\"children\":[{\"level\":3,\"title\":\"LinkedList的迭代器实现\",\"slug\":\"linkedlist的迭代器实现\",\"link\":\"#linkedlist的迭代器实现\",\"children\":[]},{\"level\":3,\"title\":\"ArrayList的迭代器实现\",\"slug\":\"arraylist的迭代器实现\",\"link\":\"#arraylist的迭代器实现\",\"children\":[]}]},{\"level\":2,\"title\":\"LinkedList\",\"slug\":\"linkedlist-1\",\"link\":\"#linkedlist-1\",\"children\":[]},{\"level\":2,\"title\":\"ArrayList\",\"slug\":\"arraylist-1\",\"link\":\"#arraylist-1\",\"children\":[]}],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705581818000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":17.91,\"words\":5372},\"filePathRelative\":\"posts/List实现类源码分析 —— LinkedList、ArrayList.md\",\"localizedDate\":\"2021年7月24日\",\"excerpt\":\"<blockquote>\\n<p>系列的其他文章：</p>\\n<p><a href=\\\"http://47.117.127.179/categories/Java%E9%9B%86%E5%90%88%E7%B1%BB/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">Java集合类</a></p>\\n</blockquote>\\n<h1> 总结</h1>\\n<h2> LinkedList</h2>\\n<h3> 继承关系</h3>\\n<p>可见LinkedList既是List接口的实现也是Queue的实现（Deque），故其和ArrayList相比LinkedList支持的功能更多，其可视作队列来使用。</p>\",\"autoDesc\":true}")
