export const data = JSON.parse("{\"key\":\"v-0dd650c3\",\"path\":\"/posts/hertz%E2%80%94%E2%80%94%E4%B8%AD%E9%97%B4%E4%BB%B6.html\",\"title\":\"hertz——中间件\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"hertz——中间件\",\"date\":\"2022-12-09T15:21:02.000Z\",\"categories\":\"hertz\",\"tags\":null,\"description\":\"源码分析 // Use attaches a global middleware to the router. ie. the middleware attached though Use() will be // included in the handlers chain for every single request. Even 404, 405, static files... // // For example, this is the right place for a logger or error management middleware. func (engine *Engine) Use(middleware ...app.HandlerFunc) IRoutes { \\tengine.RouterGroup.Use(middleware...) \\tengine.rebuild404Handlers() \\tengine.rebuild405Handlers() \\treturn engine }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/hertz%E2%80%94%E2%80%94%E4%B8%AD%E9%97%B4%E4%BB%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"hertz——中间件\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"源码分析 // Use attaches a global middleware to the router. ie. the middleware attached though Use() will be // included in the handlers chain for every single request. Even 404, 405, static files... // // For example, this is the right place for a logger or error management middleware. func (engine *Engine) Use(middleware ...app.HandlerFunc) IRoutes { \\tengine.RouterGroup.Use(middleware...) \\tengine.rebuild404Handlers() \\tengine.rebuild405Handlers() \\treturn engine }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-12-09T15:21:02.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"hertz——中间件\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-12-09T15:21:02.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":1.95,\"words\":585},\"filePathRelative\":\"posts/hertz——中间件.md\",\"localizedDate\":\"2022年12月9日\",\"excerpt\":\"<p>源码分析</p>\\n<div class=\\\"language-go line-numbers-mode\\\" data-ext=\\\"go\\\"><pre class=\\\"language-go\\\"><code><span class=\\\"token comment\\\">// Use attaches a global middleware to the router. ie. the middleware attached though Use() will be</span>\\n<span class=\\\"token comment\\\">// included in the handlers chain for every single request. Even 404, 405, static files...</span>\\n<span class=\\\"token comment\\\">//</span>\\n<span class=\\\"token comment\\\">// For example, this is the right place for a logger or error management middleware.</span>\\n<span class=\\\"token keyword\\\">func</span> <span class=\\\"token punctuation\\\">(</span>engine <span class=\\\"token operator\\\">*</span>Engine<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token function\\\">Use</span><span class=\\\"token punctuation\\\">(</span>middleware <span class=\\\"token operator\\\">...</span>app<span class=\\\"token punctuation\\\">.</span>HandlerFunc<span class=\\\"token punctuation\\\">)</span> IRoutes <span class=\\\"token punctuation\\\">{</span>\\n\\tengine<span class=\\\"token punctuation\\\">.</span>RouterGroup<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">Use</span><span class=\\\"token punctuation\\\">(</span>middleware<span class=\\\"token operator\\\">...</span><span class=\\\"token punctuation\\\">)</span>\\n\\tengine<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">rebuild404Handlers</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span>\\n\\tengine<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">rebuild405Handlers</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span>\\n\\t<span class=\\\"token keyword\\\">return</span> engine\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
