export const data = JSON.parse("{\"key\":\"v-834fe144\",\"path\":\"/docs/Ubuntu-%E9%85%8D%E7%BD%AE-SFTP-%E6%9C%8D%E5%8A%A1%E5%99%A8.html\",\"title\":\"Ubuntu 配置 SFTP 服务器\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Ubuntu 配置 SFTP 服务器\",\"date\":\"2021-08-01T00:00:00.000Z\",\"categories\":\"Linux\",\"tags\":[\"Linux配置\",\"FTP\"],\"description\":\"安装SFTP服务 sftp是Secure File Transfer Protocol的缩写，安全文件传送协议。可以为传输文件提供一种安全的网络的加密方法。sftp 与 ftp 有着几乎一样的语法和功能。SFTP 为 SSH的其中一部分，是一种传输档案至 Blogger 伺服器的安全方式。其实在SSH软件包中，已经包含了一个叫作SFTP(Secure File Transfer Protocol)的安全文件信息传输子系统。 SFTP本身没有单独的守护进程，它必须使用sshd守护进程（端口号默认是22）来完成相应的连接和答复操作，所以从某种意义上来说，SFTP并不像一个服务器程序，而更像是一个客户端程序。SFTP同样是使用加密传输认证信息和传输的数据，所以，使用SFTP是非常安全的。但是，由于这种传输方式使用了加密/解密技术，所以传输效率比普通的FTP要低得多，如果您对网络安全性要求更高时，可以使用SFTP代替FTP。\"},\"headers\":[{\"level\":2,\"title\":\"sftp用户、用户组的创建\",\"slug\":\"sftp用户、用户组的创建\",\"link\":\"#sftp用户、用户组的创建\",\"children\":[]},{\"level\":2,\"title\":\"创建文件服务器目录\",\"slug\":\"创建文件服务器目录\",\"link\":\"#创建文件服务器目录\",\"children\":[]},{\"level\":2,\"title\":\"权限配置\",\"slug\":\"权限配置\",\"link\":\"#权限配置\",\"children\":[]}],\"readingTime\":{\"minutes\":3.57,\"words\":1071},\"filePathRelative\":\"docs/Ubuntu-配置-SFTP-服务器.md\",\"localizedDate\":\"2021年8月1日\",\"excerpt\":\"<h1> 安装SFTP服务</h1>\\n<blockquote>\\n<p>sftp是Secure File Transfer Protocol的缩写，安全文件传送协议。可以为传输文件提供一种安全的网络的加密方法。<strong>sftp 与 ftp 有着几乎一样的语法和功能。<strong>SFTP 为 SSH的其中一部分，是一种传输档案至 Blogger 伺服器的安全方式。其实</strong>在SSH软件包中，已经包含了一个叫作SFTP(Secure File Transfer Protocol)的安全文件信息传输子系统</strong>。 <strong>SFTP本身没有单独的守护进程，它必须使用sshd守护进程（端口号默认是22）来完成相应的连接和答复操作，所以从某种意义上来说，SFTP并不像一个服务器程序，而更像是一个客户端程序。<strong>SFTP同样是使用加密传输认证信息和传输的数据，所以，使用SFTP是非常安全的。但是</strong>，由于这种传输方式使用了加密/解密技术，所以传输效率比普通的FTP要低得多</strong>，如果您对网络安全性要求更高时，可以使用SFTP代替FTP。</p>\\n</blockquote>\",\"autoDesc\":true}")

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
