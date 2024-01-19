export const data = JSON.parse("{\"key\":\"v-00ca7700\",\"path\":\"/posts/Redis%E7%9A%84%E5%B8%B8%E8%A7%81%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF.html\",\"title\":\"Redis的常见使用场景\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis的常见使用场景\",\"date\":\"2022-03-01T11:22:31.000Z\",\"categories\":\"Redis\",\"tags\":[\"NoSQL\",\"Redis\"],\"description\":\"[1、缓存] String类型 例如：热点数据缓存（例如报表、头条排行榜、对象缓存、全页缓存等等可以提升为热点数据的访问数据。 [2、数据共享分布式] 举一个典型例子：分布式 session 的共享。 spring session在 redis 里面保存的数据包括： SET 类型的 spring:session:expireations:[min] min 表示从 1970 年 1 月 1 日 0 点 0 分经过的分钟数， SET 集合的 member 为 expires:[sessionId] ,表示这一分钟应该过期的键。 String 类型的 spring:session:sessions:expires:[sessionId] 该数据对应一个空值，表示 sessionId 过期的剩余时间，即 maxInactiveInterval。 Hash 类型的 spring:session:sessions:[sessionId] session 保存的数据，记录了 creationTime，maxInactiveInterval，lastAccessedTime，attribute。前两个数据是用于 session 过期管理的辅助数据结构。 { \\\"lastAccessedTime\\\": 1523933008926,/*2018/4/17 10:43:28*/ \\\"creationTime\\\": 1523933008926, /*2018/4/17 10:43:28*/ \\\"maxInactiveInterval\\\": 1800, \\\"sessionAttr:name\\\": \\\"xu\\\" // 用户数据 }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Redis%E7%9A%84%E5%B8%B8%E8%A7%81%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Redis的常见使用场景\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"[1、缓存] String类型 例如：热点数据缓存（例如报表、头条排行榜、对象缓存、全页缓存等等可以提升为热点数据的访问数据。 [2、数据共享分布式] 举一个典型例子：分布式 session 的共享。 spring session在 redis 里面保存的数据包括： SET 类型的 spring:session:expireations:[min] min 表示从 1970 年 1 月 1 日 0 点 0 分经过的分钟数， SET 集合的 member 为 expires:[sessionId] ,表示这一分钟应该过期的键。 String 类型的 spring:session:sessions:expires:[sessionId] 该数据对应一个空值，表示 sessionId 过期的剩余时间，即 maxInactiveInterval。 Hash 类型的 spring:session:sessions:[sessionId] session 保存的数据，记录了 creationTime，maxInactiveInterval，lastAccessedTime，attribute。前两个数据是用于 session 过期管理的辅助数据结构。 { \\\"lastAccessedTime\\\": 1523933008926,/*2018/4/17 10:43:28*/ \\\"creationTime\\\": 1523933008926, /*2018/4/17 10:43:28*/ \\\"maxInactiveInterval\\\": 1800, \\\"sessionAttr:name\\\": \\\"xu\\\" // 用户数据 }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"NoSQL\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Redis\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-03-01T11:22:31.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Redis的常见使用场景\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-03-01T11:22:31.000Z\\\",\\\"dateModified\\\":\\\"2024-01-18T12:43:38.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705581818000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":1.46,\"words\":439},\"filePathRelative\":\"posts/Redis的常见使用场景.md\",\"localizedDate\":\"2022年3月1日\",\"excerpt\":\"<ul>\\n<li>[1、缓存]</li>\\n</ul>\\n<p>String类型</p>\\n<p>例如：热点数据缓存（例如报表、头条排行榜、对象缓存、全页缓存等等可以提升为热点数据的访问数据。</p>\\n<ul>\\n<li>[2、数据共享分布式]</li>\\n</ul>\\n<p>举一个典型例子：分布式 session 的共享。</p>\\n<blockquote>\\n<p>spring session在 redis 里面保存的数据包括：</p>\\n<ul>\\n<li>\\n<p>SET 类型的</p>\\n<div class=\\\"language-text line-numbers-mode\\\" data-ext=\\\"text\\\"><pre class=\\\"language-text\\\"><code>spring:session:expireations:[min]\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div><p>min 表示从 1970 年 1 月 1 日 0 点 0 分经过的分钟数， SET 集合的 member 为 expires:[sessionId] ,表示这一分钟应该过期的键。</p>\\n</li>\\n<li>\\n<p>String 类型的</p>\\n<div class=\\\"language-text line-numbers-mode\\\" data-ext=\\\"text\\\"><pre class=\\\"language-text\\\"><code>spring:session:sessions:expires:[sessionId]\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div><p>该数据对应一个空值，表示 sessionId 过期的剩余时间，即 maxInactiveInterval。</p>\\n</li>\\n<li>\\n<p>Hash 类型的</p>\\n<div class=\\\"language-text line-numbers-mode\\\" data-ext=\\\"text\\\"><pre class=\\\"language-text\\\"><code>spring:session:sessions:[sessionId]\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div><p>session 保存的数据，记录了 creationTime，maxInactiveInterval，lastAccessedTime，attribute。前两个数据是用于 session 过期管理的辅助数据结构。</p>\\n<div class=\\\"language-json line-numbers-mode\\\" data-ext=\\\"json\\\"><pre class=\\\"language-json\\\"><code><span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token property\\\">\\\"lastAccessedTime\\\"</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token number\\\">1523933008926</span><span class=\\\"token punctuation\\\">,</span><span class=\\\"token comment\\\">/*2018/4/17 10:43:28*/</span>\\n    <span class=\\\"token property\\\">\\\"creationTime\\\"</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token number\\\">1523933008926</span><span class=\\\"token punctuation\\\">,</span> <span class=\\\"token comment\\\">/*2018/4/17 10:43:28*/</span>\\n    <span class=\\\"token property\\\">\\\"maxInactiveInterval\\\"</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token number\\\">1800</span><span class=\\\"token punctuation\\\">,</span>\\n    <span class=\\\"token property\\\">\\\"sessionAttr:name\\\"</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token string\\\">\\\"xu\\\"</span> <span class=\\\"token comment\\\">// 用户数据</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div></li>\\n</ul>\\n</blockquote>\",\"autoDesc\":true}")
