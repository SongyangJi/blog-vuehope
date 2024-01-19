export const data = JSON.parse("{\"key\":\"v-beede9e0\",\"path\":\"/posts/JUC%E4%B9%8BAQS%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90%E4%B8%8E%E4%BD%BF%E7%94%A8.html\",\"title\":\"JUC之AQS源码解析与使用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"JUC之AQS源码解析与使用\",\"date\":\"2021-11-13T18:07:00.000Z\",\"categories\":\"JUC\",\"tags\":[\"JUC\",\"Java多线程\"],\"description\":\"从自己实现一把锁说起 《操作系统概念》一书中在第6章”同步“中，以CAS这样的原子命令实现了锁的语义，并且以它为基础实现了非忙等（busy waiting）的锁。 下面我们在Java中使用AtomicBoolean这个原子更新类实现 代码实例 众所周知，i++是经典的读改写操作，它不是原子的。 下面的代码在多线程环境下将一个数x自增N次，并观察在加锁和不加锁的情况下的结果。 结果，显示如果使用我们自己的实现的互斥锁，x最终等于N，也说明锁生效了。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/JUC%E4%B9%8BAQS%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90%E4%B8%8E%E4%BD%BF%E7%94%A8.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"JUC之AQS源码解析与使用\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"从自己实现一把锁说起 《操作系统概念》一书中在第6章”同步“中，以CAS这样的原子命令实现了锁的语义，并且以它为基础实现了非忙等（busy waiting）的锁。 下面我们在Java中使用AtomicBoolean这个原子更新类实现 代码实例 众所周知，i++是经典的读改写操作，它不是原子的。 下面的代码在多线程环境下将一个数x自增N次，并观察在加锁和不加锁的情况下的结果。 结果，显示如果使用我们自己的实现的互斥锁，x最终等于N，也说明锁生效了。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-19T06:45:46.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"JUC\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Java多线程\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-11-13T18:07:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-19T06:45:46.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"JUC之AQS源码解析与使用\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-11-13T18:07:00.000Z\\\",\\\"dateModified\\\":\\\"2024-01-19T06:45:46.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"代码实例\",\"slug\":\"代码实例\",\"link\":\"#代码实例\",\"children\":[]},{\"level\":2,\"title\":\"总结\",\"slug\":\"总结\",\"link\":\"#总结\",\"children\":[]},{\"level\":2,\"title\":\"如何使用AQS\",\"slug\":\"如何使用aqs\",\"link\":\"#如何使用aqs\",\"children\":[]},{\"level\":2,\"title\":\"AQS和同步组件的关系\",\"slug\":\"aqs和同步组件的关系\",\"link\":\"#aqs和同步组件的关系\",\"children\":[{\"level\":3,\"title\":\"AQS用于访问和修改同步状态的方法\",\"slug\":\"aqs用于访问和修改同步状态的方法\",\"link\":\"#aqs用于访问和修改同步状态的方法\",\"children\":[]}]},{\"level\":2,\"title\":\"AQS的可重写的方法\",\"slug\":\"aqs的可重写的方法\",\"link\":\"#aqs的可重写的方法\",\"children\":[]},{\"level\":2,\"title\":\"AQS提供的模板方法\",\"slug\":\"aqs提供的模板方法\",\"link\":\"#aqs提供的模板方法\",\"children\":[]},{\"level\":2,\"title\":\"不可重入的独占锁Mutex\",\"slug\":\"不可重入的独占锁mutex\",\"link\":\"#不可重入的独占锁mutex\",\"children\":[]},{\"level\":2,\"title\":\"简易的发令枪 BooleanLatch\",\"slug\":\"简易的发令枪-booleanlatch\",\"link\":\"#简易的发令枪-booleanlatch\",\"children\":[]},{\"level\":2,\"title\":\"最多两个线程同时获得锁 TwinsLock\",\"slug\":\"最多两个线程同时获得锁-twinslock\",\"link\":\"#最多两个线程同时获得锁-twinslock\",\"children\":[]},{\"level\":2,\"title\":\"独占式同步状态的获取与释放\",\"slug\":\"独占式同步状态的获取与释放\",\"link\":\"#独占式同步状态的获取与释放\",\"children\":[]},{\"level\":2,\"title\":\"共享式同步状态的获取与释放\",\"slug\":\"共享式同步状态的获取与释放\",\"link\":\"#共享式同步状态的获取与释放\",\"children\":[]}],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705646746000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":2}]},\"readingTime\":{\"minutes\":13.69,\"words\":4106},\"filePathRelative\":\"posts/JUC之AQS源码解析与使用.md\",\"localizedDate\":\"2021年11月14日\",\"excerpt\":\"<h1> 从自己实现一把锁说起</h1>\\n<p>《操作系统概念》一书中在第6章”同步“中，以CAS这样的原子命令实现了锁的语义，并且以它为基础实现了非忙等（busy waiting）的锁。</p>\\n<p>下面我们在Java中使用<code>AtomicBoolean</code>这个原子更新类实现</p>\\n<h2> 代码实例</h2>\\n<p>众所周知，<code>i++</code>是经典的读改写操作，它不是原子的。</p>\\n<p>下面的代码在多线程环境下将一个数<code>x</code>自增N次，并观察在加锁和不加锁的情况下的结果。</p>\\n<p>结果，显示如果使用我们自己的实现的互斥锁，<code>x</code>最终等于N，也说明锁生效了。</p>\",\"autoDesc\":true}")
