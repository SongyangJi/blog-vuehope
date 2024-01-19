export const data = JSON.parse("{\"key\":\"v-285e5a34\",\"path\":\"/posts/etcd.html\",\"title\":\"etcd\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"etcd\",\"date\":\"2022-12-09T02:57:47.000Z\",\"categories\":\"NoSQL\",\"tags\":[\"etcd\",\"Go\"],\"description\":\"安装 brew install etcd 启动 启动 jisongyang@SongyangJi-MacBookAir ~ % brew services start etcd ==&gt; Successfully started `etcd` (label: homebrew.mxcl.etcd) jisongyang@SongyangJi-MacBookAir ~ % brew services list Name Status User File activemq none etcd started jisongyang ~/Library/LaunchAgents/homebrew.mxcl.etcd.plist hbase none jenkins none mongodb-community none nginx none rabbitmq none redis none jisongyang@SongyangJi-MacBookAir ~ % etcdctl endpoint health 127.0.0.1:2379 is healthy: successfully committed proposal: took = 2.418875ms jisongyang@SongyangJi-MacBookAir ~ % etcd ctl put \\\"name\\\" \\\"bob\\\" {\\\"level\\\":\\\"info\\\",\\\"ts\\\":\\\"2022-12-09T03:06:16.834+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:73\\\",\\\"msg\\\":\\\"Running: \\\",\\\"args\\\":[\\\"etcd\\\",\\\"ctl\\\",\\\"put\\\",\\\"name\\\",\\\"bob\\\"]} {\\\"level\\\":\\\"warn\\\",\\\"ts\\\":\\\"2022-12-09T03:06:16.834+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:75\\\",\\\"msg\\\":\\\"failed to verify flags\\\",\\\"error\\\":\\\"'ctl' is not a valid flag\\\"} jisongyang@SongyangJi-MacBookAir ~ % jisongyang@SongyangJi-MacBookAir ~ % etcd ctl get \\\"name\\\" {\\\"level\\\":\\\"info\\\",\\\"ts\\\":\\\"2022-12-09T03:06:26.364+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:73\\\",\\\"msg\\\":\\\"Running: \\\",\\\"args\\\":[\\\"etcd\\\",\\\"ctl\\\",\\\"get\\\",\\\"name\\\"]} {\\\"level\\\":\\\"warn\\\",\\\"ts\\\":\\\"2022-12-09T03:06:26.364+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:75\\\",\\\"msg\\\":\\\"failed to verify flags\\\",\\\"error\\\":\\\"'ctl' is not a valid flag\\\"}\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/etcd.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"etcd\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"安装 brew install etcd 启动 启动 jisongyang@SongyangJi-MacBookAir ~ % brew services start etcd ==&gt; Successfully started `etcd` (label: homebrew.mxcl.etcd) jisongyang@SongyangJi-MacBookAir ~ % brew services list Name Status User File activemq none etcd started jisongyang ~/Library/LaunchAgents/homebrew.mxcl.etcd.plist hbase none jenkins none mongodb-community none nginx none rabbitmq none redis none jisongyang@SongyangJi-MacBookAir ~ % etcdctl endpoint health 127.0.0.1:2379 is healthy: successfully committed proposal: took = 2.418875ms jisongyang@SongyangJi-MacBookAir ~ % etcd ctl put \\\"name\\\" \\\"bob\\\" {\\\"level\\\":\\\"info\\\",\\\"ts\\\":\\\"2022-12-09T03:06:16.834+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:73\\\",\\\"msg\\\":\\\"Running: \\\",\\\"args\\\":[\\\"etcd\\\",\\\"ctl\\\",\\\"put\\\",\\\"name\\\",\\\"bob\\\"]} {\\\"level\\\":\\\"warn\\\",\\\"ts\\\":\\\"2022-12-09T03:06:16.834+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:75\\\",\\\"msg\\\":\\\"failed to verify flags\\\",\\\"error\\\":\\\"'ctl' is not a valid flag\\\"} jisongyang@SongyangJi-MacBookAir ~ % jisongyang@SongyangJi-MacBookAir ~ % etcd ctl get \\\"name\\\" {\\\"level\\\":\\\"info\\\",\\\"ts\\\":\\\"2022-12-09T03:06:26.364+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:73\\\",\\\"msg\\\":\\\"Running: \\\",\\\"args\\\":[\\\"etcd\\\",\\\"ctl\\\",\\\"get\\\",\\\"name\\\"]} {\\\"level\\\":\\\"warn\\\",\\\"ts\\\":\\\"2022-12-09T03:06:26.364+0800\\\",\\\"caller\\\":\\\"etcdmain/etcd.go:75\\\",\\\"msg\\\":\\\"failed to verify flags\\\",\\\"error\\\":\\\"'ctl' is not a valid flag\\\"}\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"etcd\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Go\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-12-09T02:57:47.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"etcd\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-12-09T02:57:47.000Z\\\",\\\"dateModified\\\":\\\"2024-01-18T12:43:38.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705581818000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":0.85,\"words\":256},\"filePathRelative\":\"posts/etcd.md\",\"localizedDate\":\"2022年12月9日\",\"excerpt\":\"<h1> 安装</h1>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code>brew <span class=\\\"token function\\\">install</span> etcd\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div><h1> 启动</h1>\\n<p>启动</p>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code>jisongyang@SongyangJi-MacBookAir ~ % brew services start etcd\\n<span class=\\\"token operator\\\">==</span><span class=\\\"token operator\\\">&gt;</span> Successfully started <span class=\\\"token variable\\\"><span class=\\\"token variable\\\">`</span>etcd<span class=\\\"token variable\\\">`</span></span> <span class=\\\"token punctuation\\\">(</span>label: homebrew.mxcl.etcd<span class=\\\"token punctuation\\\">)</span>\\njisongyang@SongyangJi-MacBookAir ~ % brew services list\\nName              Status  User       File\\nactivemq          none\\netcd              started jisongyang ~/Library/LaunchAgents/homebrew.mxcl.etcd.plist\\nhbase             none\\njenkins           none\\nmongodb-community none\\nnginx             none\\nrabbitmq          none\\nredis             none\\njisongyang@SongyangJi-MacBookAir ~ % etcdctl endpoint health\\n<span class=\\\"token number\\\">127.0</span>.0.1:2379 is healthy: successfully committed proposal: took <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">2</span>.418875ms\\njisongyang@SongyangJi-MacBookAir ~ % etcd ctl put <span class=\\\"token string\\\">\\\"name\\\"</span> <span class=\\\"token string\\\">\\\"bob\\\"</span>\\n<span class=\\\"token punctuation\\\">{</span><span class=\\\"token string\\\">\\\"level\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"info\\\"</span>,<span class=\\\"token string\\\">\\\"ts\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"2022-12-09T03:06:16.834+0800\\\"</span>,<span class=\\\"token string\\\">\\\"caller\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"etcdmain/etcd.go:73\\\"</span>,<span class=\\\"token string\\\">\\\"msg\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"Running: \\\"</span>,<span class=\\\"token string\\\">\\\"args\\\"</span>:<span class=\\\"token punctuation\\\">[</span><span class=\\\"token string\\\">\\\"etcd\\\"</span>,<span class=\\\"token string\\\">\\\"ctl\\\"</span>,<span class=\\\"token string\\\">\\\"put\\\"</span>,<span class=\\\"token string\\\">\\\"name\\\"</span>,<span class=\\\"token string\\\">\\\"bob\\\"</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">{</span><span class=\\\"token string\\\">\\\"level\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"warn\\\"</span>,<span class=\\\"token string\\\">\\\"ts\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"2022-12-09T03:06:16.834+0800\\\"</span>,<span class=\\\"token string\\\">\\\"caller\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"etcdmain/etcd.go:75\\\"</span>,<span class=\\\"token string\\\">\\\"msg\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"failed to verify flags\\\"</span>,<span class=\\\"token string\\\">\\\"error\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"'ctl' is not a valid flag\\\"</span><span class=\\\"token punctuation\\\">}</span>\\njisongyang@SongyangJi-MacBookAir ~ %\\njisongyang@SongyangJi-MacBookAir ~ % etcd ctl get <span class=\\\"token string\\\">\\\"name\\\"</span>\\n<span class=\\\"token punctuation\\\">{</span><span class=\\\"token string\\\">\\\"level\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"info\\\"</span>,<span class=\\\"token string\\\">\\\"ts\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"2022-12-09T03:06:26.364+0800\\\"</span>,<span class=\\\"token string\\\">\\\"caller\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"etcdmain/etcd.go:73\\\"</span>,<span class=\\\"token string\\\">\\\"msg\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"Running: \\\"</span>,<span class=\\\"token string\\\">\\\"args\\\"</span>:<span class=\\\"token punctuation\\\">[</span><span class=\\\"token string\\\">\\\"etcd\\\"</span>,<span class=\\\"token string\\\">\\\"ctl\\\"</span>,<span class=\\\"token string\\\">\\\"get\\\"</span>,<span class=\\\"token string\\\">\\\"name\\\"</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">{</span><span class=\\\"token string\\\">\\\"level\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"warn\\\"</span>,<span class=\\\"token string\\\">\\\"ts\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"2022-12-09T03:06:26.364+0800\\\"</span>,<span class=\\\"token string\\\">\\\"caller\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"etcdmain/etcd.go:75\\\"</span>,<span class=\\\"token string\\\">\\\"msg\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"failed to verify flags\\\"</span>,<span class=\\\"token string\\\">\\\"error\\\"</span><span class=\\\"token builtin class-name\\\">:</span><span class=\\\"token string\\\">\\\"'ctl' is not a valid flag\\\"</span><span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")
