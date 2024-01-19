export const data = JSON.parse("{\"key\":\"v-1b62f6e2\",\"path\":\"/posts/%E5%AF%B9Jsch%E7%9A%84Seession%E4%B8%8EChannel%E7%9A%84%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E7%9A%84%E6%B5%8B%E8%AF%95.html\",\"title\":\"对Jsch的Seession与Channel的线程安全性的测试\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"对Jsch的Seession与Channel的线程安全性的测试\",\"date\":\"2021-08-02T00:00:00.000Z\",\"categories\":\"FTP\",\"tags\":null,\"description\":\"10000个文件(每个文件只有 12 byte) 1 session 1 channel 串行： 37 s 并行(4 核)： 死锁 或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362) 等各种异常 1 session n channels 串行：200 s 并行(4 核)：25 s (但是文件下载有丢失) n sessions 1 channel 串行：1200 s 并行(4 核)：320 s 100个文件(每个文件有 12 MB) 1 session 1 channel 串行： 19 s 并行(4 核)： 死锁 或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362) 等各种异常, 总之文件传输失败 1 session n channels 串行：20 s 并行(4 核)：18s (但是文件下载有丢失) n sessions 1 channel 串行：35 s 并行(4 核)：10 s 10个文件(每个文件有 120 MB) 1 session 1 channel 串行： 18 s 并行(4 核)： 死锁 或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362) 等各种异常, 总之文件传输失败 1 session n channels 串行：18 s 并行(4 核)：19 s n sessions 1 channel 串行：19 s 并行(4 核)：8 s\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/%E5%AF%B9Jsch%E7%9A%84Seession%E4%B8%8EChannel%E7%9A%84%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E7%9A%84%E6%B5%8B%E8%AF%95.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"对Jsch的Seession与Channel的线程安全性的测试\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"10000个文件(每个文件只有 12 byte) 1 session 1 channel 串行： 37 s 并行(4 核)： 死锁 或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362) 等各种异常 1 session n channels 串行：200 s 并行(4 核)：25 s (但是文件下载有丢失) n sessions 1 channel 串行：1200 s 并行(4 核)：320 s 100个文件(每个文件有 12 MB) 1 session 1 channel 串行： 19 s 并行(4 核)： 死锁 或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362) 等各种异常, 总之文件传输失败 1 session n channels 串行：20 s 并行(4 核)：18s (但是文件下载有丢失) n sessions 1 channel 串行：35 s 并行(4 核)：10 s 10个文件(每个文件有 120 MB) 1 session 1 channel 串行： 18 s 并行(4 核)： 死锁 或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362) 等各种异常, 总之文件传输失败 1 session n channels 串行：18 s 并行(4 核)：19 s n sessions 1 channel 串行：19 s 并行(4 核)：8 s\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-08-02T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"对Jsch的Seession与Channel的线程安全性的测试\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-08-02T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2024-01-18T12:43:38.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705581818000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":0.89,\"words\":267},\"filePathRelative\":\"posts/对Jsch的Seession与Channel的线程安全性的测试.md\",\"localizedDate\":\"2021年8月2日\",\"excerpt\":\"<ul>\\n<li>\\n<ul>\\n<li>10000个文件(每个文件只有 12 byte)</li>\\n</ul>\\n<ol>\\n<li>1 session 1 channel\\n串行： 37 s\\n并行(4 核)： 死锁\\n或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)\\n等各种异常</li>\\n<li>1 session n channels\\n串行：200 s\\n并行(4 核)：25 s (但是文件下载有丢失)</li>\\n<li>n sessions 1 channel\\n串行：1200 s\\n并行(4 核)：320 s</li>\\n</ol>\\n</li>\\n<li>\\n<p>100个文件(每个文件有 12 MB)</p>\\n<ol>\\n<li>\\n<p>1 session 1 channel\\n串行： 19 s\\n并行(4 核)： 死锁\\n或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)\\n等各种异常, 总之文件传输失败</p>\\n</li>\\n<li>\\n<p>1 session n channels\\n串行：20 s\\n并行(4 核)：18s (但是文件下载有丢失)</p>\\n</li>\\n<li>\\n<p>n sessions 1 channel\\n串行：35 s\\n并行(4 核)：10 s</p>\\n</li>\\n</ol>\\n</li>\\n<li>\\n<p>10个文件(每个文件有 120 MB)</p>\\n<ol>\\n<li>\\n<p>1 session 1 channel\\n串行： 18 s\\n并行(4 核)： 死锁\\n或者 throw new SftpException()、at com.jcraft.jsch.ChannelSftp._realpath(ChannelSftp.java:2362)\\n等各种异常, 总之文件传输失败</p>\\n</li>\\n<li>\\n<p>1 session n channels\\n串行：18 s\\n并行(4 核)：19 s</p>\\n</li>\\n<li>\\n<p>n sessions 1 channel\\n串行：19 s\\n并行(4 核)：8 s</p>\\n</li>\\n</ol>\\n</li>\\n</ul>\",\"autoDesc\":true}")
