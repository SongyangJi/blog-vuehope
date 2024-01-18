export const data = JSON.parse("{\"key\":\"v-86b0f164\",\"path\":\"/posts/%E8%BF%99%E6%AC%A1%E5%BD%BB%E5%BA%95%E8%A7%A3%E5%86%B3HashMap!.html\",\"title\":\"这次彻底解决HashMap!\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"这次彻底解决HashMap!\",\"date\":\"2021-08-03T00:00:00.000Z\",\"categories\":\"Java集合类\",\"tags\":[\"Java集合类\",\"数据结构\",\"源码系列\"],\"description\":\"前言，这篇文章着眼于JDK中HashMap的实现，源码解析，以及常见的面试问题。 对于一般的哈希表的实现，各种散列算法以及解决哈希冲突的方案本文并不完全介绍。 而且，关于红黑树的部分，本篇文章也不设计，只是直接调用api。 HashMap 文档 以下来自 HashMap 文档。 重点已加粗，并且增加了自己的批注。 基于哈希表的Map接口的实现。 此实现提供所有可选的映射操作，并允许空值和空键。 HashMap类与Hashtable底层都是hash表，不同之处在于HashMap线程不安全，并且允许 null。 该实现为基本操作（ get和put ）提供了常量时间的性能，假设哈希函数将元素正确地分散在存储桶中。 集合视图上的迭代所需的时间与HashMap实例的“capacity”（存储桶数）及其 size（键-值映射数）成正比。 因此，如果迭代性能很重要，则不要将初始容量设置得过高（或负载因子过低），这一点非常重要。（否则会产生大量空桶,影响遍历效率） HashMap的实例具有两个影响其性能的参数：初始容量（ initial capacity ）和负载因子（ load factor）。 容量是哈希表中存储桶的数量，初始容量是创建哈希表时的容量。 负载因子是散列表的容量自动增加之前允许其填充的完整程度的度量。 当哈希表中的条目数超过负载因子和当前容量的乘积时，哈希表将被重新哈希（rehashed）（即内部数据结构将被重建）。 通常，**默认负载因子（0.75）**在时间和空间成本之间提供了一个很好的折衷方案。 较高的值会减少空间开销，但会增加查找成本（在HashMap类的大多数操作中都得到了体现，包括get和put ）。 设置其初始容量时，应考虑映射中的预期条目数及其负载因子，以最大程度地减少重新哈希操作的次数。 如果初始容量大于最大条目数除以负载因子，则将不会进行任何哈希操作。 如果将许多映射存储在HashMap实例中，则创建具有足够大容量的映射将比让其根据需要增长表的自动重新哈希处理更有效地存储映射（即如果确定在创建时就有大量映射存入HashMap,为了避免反复扩容，应确保足够大的初始容量）。 请注意，在具有大量相同hashCode()的键会降低哈希表性能， 为了改善影响，当键为Comparable ，此类可以使用键之间的比较顺序来帮助打破平局（即链表转红黑树）。 请注意，HashMap未实现同步。 如果多个线程同时访问一个哈希映射，并且至少有一个线程在结构上修改该映射，则必须在外部进行同步。 （结构修改是添加或删除一个或多个映射的任何操作；仅更改已经包含的键相关联的值不是结构修改。）\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/%E8%BF%99%E6%AC%A1%E5%BD%BB%E5%BA%95%E8%A7%A3%E5%86%B3HashMap!.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"这次彻底解决HashMap!\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"前言，这篇文章着眼于JDK中HashMap的实现，源码解析，以及常见的面试问题。 对于一般的哈希表的实现，各种散列算法以及解决哈希冲突的方案本文并不完全介绍。 而且，关于红黑树的部分，本篇文章也不设计，只是直接调用api。 HashMap 文档 以下来自 HashMap 文档。 重点已加粗，并且增加了自己的批注。 基于哈希表的Map接口的实现。 此实现提供所有可选的映射操作，并允许空值和空键。 HashMap类与Hashtable底层都是hash表，不同之处在于HashMap线程不安全，并且允许 null。 该实现为基本操作（ get和put ）提供了常量时间的性能，假设哈希函数将元素正确地分散在存储桶中。 集合视图上的迭代所需的时间与HashMap实例的“capacity”（存储桶数）及其 size（键-值映射数）成正比。 因此，如果迭代性能很重要，则不要将初始容量设置得过高（或负载因子过低），这一点非常重要。（否则会产生大量空桶,影响遍历效率） HashMap的实例具有两个影响其性能的参数：初始容量（ initial capacity ）和负载因子（ load factor）。 容量是哈希表中存储桶的数量，初始容量是创建哈希表时的容量。 负载因子是散列表的容量自动增加之前允许其填充的完整程度的度量。 当哈希表中的条目数超过负载因子和当前容量的乘积时，哈希表将被重新哈希（rehashed）（即内部数据结构将被重建）。 通常，**默认负载因子（0.75）**在时间和空间成本之间提供了一个很好的折衷方案。 较高的值会减少空间开销，但会增加查找成本（在HashMap类的大多数操作中都得到了体现，包括get和put ）。 设置其初始容量时，应考虑映射中的预期条目数及其负载因子，以最大程度地减少重新哈希操作的次数。 如果初始容量大于最大条目数除以负载因子，则将不会进行任何哈希操作。 如果将许多映射存储在HashMap实例中，则创建具有足够大容量的映射将比让其根据需要增长表的自动重新哈希处理更有效地存储映射（即如果确定在创建时就有大量映射存入HashMap,为了避免反复扩容，应确保足够大的初始容量）。 请注意，在具有大量相同hashCode()的键会降低哈希表性能， 为了改善影响，当键为Comparable ，此类可以使用键之间的比较顺序来帮助打破平局（即链表转红黑树）。 请注意，HashMap未实现同步。 如果多个线程同时访问一个哈希映射，并且至少有一个线程在结构上修改该映射，则必须在外部进行同步。 （结构修改是添加或删除一个或多个映射的任何操作；仅更改已经包含的键相关联的值不是结构修改。）\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Java集合类\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"数据结构\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"源码系列\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-08-03T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"这次彻底解决HashMap!\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-08-03T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"数据组织结构\",\"slug\":\"数据组织结构\",\"link\":\"#数据组织结构\",\"children\":[]},{\"level\":2,\"title\":\"HashMap的核心参数\",\"slug\":\"hashmap的核心参数\",\"link\":\"#hashmap的核心参数\",\"children\":[]},{\"level\":2,\"title\":\"构造器\",\"slug\":\"构造器\",\"link\":\"#构造器\",\"children\":[]},{\"level\":2,\"title\":\"put 操作\",\"slug\":\"put-操作\",\"link\":\"#put-操作\",\"children\":[]},{\"level\":2,\"title\":\"get 操作\",\"slug\":\"get-操作\",\"link\":\"#get-操作\",\"children\":[]},{\"level\":2,\"title\":\"resize（扩容操作）\",\"slug\":\"resize-扩容操作\",\"link\":\"#resize-扩容操作\",\"children\":[{\"level\":3,\"title\":\"确定新的容量和阈值\",\"slug\":\"确定新的容量和阈值\",\"link\":\"#确定新的容量和阈值\",\"children\":[]},{\"level\":3,\"title\":\"元素的再散列\",\"slug\":\"元素的再散列\",\"link\":\"#元素的再散列\",\"children\":[]}]},{\"level\":2,\"title\":\"JDK1.7与JDK1.8的区别\",\"slug\":\"jdk1-7与jdk1-8的区别\",\"link\":\"#jdk1-7与jdk1-8的区别\",\"children\":[{\"level\":3,\"title\":\"头插法改尾插法\",\"slug\":\"头插法改尾插法\",\"link\":\"#头插法改尾插法\",\"children\":[]},{\"level\":3,\"title\":\"引入红黑树\",\"slug\":\"引入红黑树\",\"link\":\"#引入红黑树\",\"children\":[]}]},{\"level\":2,\"title\":\"哈希表核心逻辑\",\"slug\":\"哈希表核心逻辑\",\"link\":\"#哈希表核心逻辑\",\"children\":[]},{\"level\":2,\"title\":\"链表树化的具体实现类\",\"slug\":\"链表树化的具体实现类\",\"link\":\"#链表树化的具体实现类\",\"children\":[]},{\"level\":2,\"title\":\"迭代器实现\",\"slug\":\"迭代器实现\",\"link\":\"#迭代器实现\",\"children\":[]}],\"readingTime\":{\"minutes\":21.76,\"words\":6527},\"filePathRelative\":\"posts/这次彻底解决HashMap!.md\",\"localizedDate\":\"2021年8月3日\",\"excerpt\":\"<blockquote>\\n<p>前言，这篇文章着眼于JDK中HashMap的实现，源码解析，以及常见的面试问题。</p>\\n<p>对于一般的哈希表的实现，各种散列算法以及解决哈希冲突的方案本文并不完全介绍。</p>\\n<p>而且，关于红黑树的部分，本篇文章也不设计，只是直接调用api。</p>\\n</blockquote>\\n<h1> HashMap 文档</h1>\\n<p>以下来自 HashMap 文档。</p>\\n<p>重点已加粗，并且增加了自己的批注。</p>\\n<blockquote>\\n<p>基于哈希表的Map接口的实现。</p>\\n<p>此实现提供所有可选的映射操作，并<strong>允许空值和空键</strong>。</p>\\n<p>HashMap类与Hashtable底层都是hash表，不同之处在于<strong>HashMap线程不安全</strong>，并且允许 null。</p>\\n<p>该实现为<strong>基本操作（ get和put ）提供了常量时间的性能</strong>，假设哈希函数将元素正确地分散在存储桶中。</p>\\n<p>集合视图上的迭代所需的时间与HashMap实例的“capacity”（存储桶数）及其 size（键-值映射数）成正比。 因此，如果迭代性能很重要，则不要将初始容量设置得过高（或负载因子过低），这一点非常重要。（<strong>否则会产生大量空桶,影响遍历效率</strong>）</p>\\n<p>HashMap的实例具有两个影响其性能的参数：<strong>初始容量（ initial capacity ）和负载因子（ load factor）</strong>。</p>\\n<p><strong>容量是哈希表中存储桶的数量</strong>，初始容量是创建哈希表时的容量。</p>\\n<p><strong>负载因子是散列表的容量自动增加之前允许其填充的完整程度的度量</strong>。 当哈希表中的条目数超过<strong>负载因子和当前容量的乘积</strong>时，哈希表将被重新哈希（rehashed）（即内部数据结构将被重建）。</p>\\n<p>通常，**默认负载因子（0.75）**在时间和空间成本之间提供了一个很好的折衷方案。 较高的值会减少空间开销，但会增加查找成本（在HashMap类的大多数操作中都得到了体现，包括get和put ）。 设置其初始容量时，应考虑映射中的预期条目数及其负载因子，以最大程度地减少重新哈希操作的次数。 如果初始容量大于最大条目数除以负载因子，则将不会进行任何哈希操作。</p>\\n<p>如果将许多映射存储在HashMap实例中，则创建具有足够大容量的映射将比让其根据需要增长表的自动重新哈希处理更有效地存储映射（<strong>即如果确定在创建时就有大量映射存入HashMap,为了避免反复扩容，应确保足够大的初始容量</strong>）。 请注意，在具有大量相同hashCode()的键会降低哈希表性能， 为了改善影响，<strong>当键为Comparable</strong> ，此类可以使用键之间的比较顺序来帮助打破平局（<strong>即链表转红黑树</strong>）。</p>\\n<p>请注意，HashMap未实现同步。 如果多个线程同时访问一个哈希映射，并且至少有一个线程在结构上修改该映射，则必须在外部进行同步。 （<strong>结构修改是添加或删除一个或多个映射的任何操作；仅更改已经包含的键相关联的值不是结构修改</strong>。）</p>\\n</blockquote>\",\"autoDesc\":true}")

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
