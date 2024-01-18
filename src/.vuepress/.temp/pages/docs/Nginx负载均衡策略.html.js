export const data = JSON.parse("{\"key\":\"v-1dc97c70\",\"path\":\"/docs/Nginx%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AD%96%E7%95%A5.html\",\"title\":\"Nginx负载均衡策略\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Nginx负载均衡策略\",\"date\":\"2022-03-16T16:19:46.000Z\",\"categories\":\"Nginx\",\"tags\":[\"Nginx\",\"负载均衡\"],\"description\":\"负载均衡的5种策略 要理解负载均衡，必须先搞清楚正向代理和反向代理。 负载均衡的几种常用方式 1、轮询（默认） 每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。 upstream backserver { server 192.168.0.14; server 192.168.0.15; }\"},\"headers\":[{\"level\":2,\"title\":\"1、轮询（默认）\",\"slug\":\"_1、轮询-默认\",\"link\":\"#_1、轮询-默认\",\"children\":[]},{\"level\":2,\"title\":\"2、weight\",\"slug\":\"_2、weight\",\"link\":\"#_2、weight\",\"children\":[]},{\"level\":2,\"title\":\"3、ip_hash\",\"slug\":\"_3、ip-hash\",\"link\":\"#_3、ip-hash\",\"children\":[]},{\"level\":2,\"title\":\"4、fair（第三方）\",\"slug\":\"_4、fair-第三方\",\"link\":\"#_4、fair-第三方\",\"children\":[]},{\"level\":2,\"title\":\"5、url_hash（第三方）\",\"slug\":\"_5、url-hash-第三方\",\"link\":\"#_5、url-hash-第三方\",\"children\":[]}],\"readingTime\":{\"minutes\":2.45,\"words\":734},\"filePathRelative\":\"docs/Nginx负载均衡策略.md\",\"localizedDate\":\"2022年3月17日\",\"excerpt\":\"<h1> 负载均衡的5种策略</h1>\\n<p>要理解负载均衡，必须先搞清楚正向代理和反向代理。</p>\\n<p><strong>负载均衡的几种常用方式</strong></p>\\n<h2> 1、轮询（默认）</h2>\\n<p>每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。</p>\\n<div class=\\\"language-nginx line-numbers-mode\\\" data-ext=\\\"nginx\\\"><pre class=\\\"language-nginx\\\"><code><span class=\\\"token directive\\\"><span class=\\\"token keyword\\\">upstream</span> backserver</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token directive\\\"><span class=\\\"token keyword\\\">server</span> 192.168.0.14</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token directive\\\"><span class=\\\"token keyword\\\">server</span> 192.168.0.15</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
