export const data = JSON.parse("{\"key\":\"v-6a00e54a\",\"path\":\"/docs/%E6%96%87%E4%BB%B6%E5%88%86%E7%89%87%E4%B8%8E%E6%96%AD%E7%82%B9%E7%BB%AD%E4%BC%A0.html\",\"title\":\"文件分片与断点续传\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"文件分片与断点续传\",\"date\":\"2021-12-28T00:04:18.000Z\",\"tags\":null,\"description\":\"断点续传 基于http协议实现断点续传。 请求部分，需要在请求头里加入Range头，表示本次请求的byte数组的开始和结束位置。 格式为：Bytes=开始-结束。如果不填表示0或者最后。 对于要支持断点续传的服务器，需要处理这个请求头，如果发现有Range头部，需要对响应特殊处理。 code：返回206； header：需要返回如下几个header： Content-Range: 格式为bytes 开始-结束/全部，如 bytes 0-10/3103 Content-Type，对于二进制数据是application/octet-stream Content-Length: 如1024，本次内容的大小 Accept-Ranges：bytes，表示支持Range请求 body：返回Range范围内的字节；\"},\"headers\":[],\"readingTime\":{\"minutes\":0.72,\"words\":216},\"filePathRelative\":\"docs/文件分片与断点续传.md\",\"localizedDate\":\"2021年12月28日\",\"excerpt\":\"<h1> 断点续传</h1>\\n<p>基于http协议实现断点续传。</p>\\n<p>请求部分，需要在请求头里加入Range头，表示本次请求的byte数组的开始和结束位置。</p>\\n<p>格式为：Bytes=开始-结束。如果不填表示0或者最后。</p>\\n<blockquote>\\n<p>对于要支持断点续传的服务器，需要处理这个请求头，如果发现有Range头部，需要对响应特殊处理。</p>\\n</blockquote>\\n<ul>\\n<li>\\n<p>code：返回206；</p>\\n</li>\\n<li>\\n<p>header：需要返回如下几个header：</p>\\n<ul>\\n<li>Content-Range: 格式为bytes 开始-结束/全部，如 bytes 0-10/3103</li>\\n<li>Content-Type，对于二进制数据是application/octet-stream</li>\\n<li>Content-Length: 如1024，本次内容的大小</li>\\n<li>Accept-Ranges：bytes，表示支持Range请求</li>\\n</ul>\\n</li>\\n<li>\\n<p>body：返回Range范围内的字节；</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")

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
