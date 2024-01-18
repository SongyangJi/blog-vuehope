export const data = JSON.parse("{\"key\":\"v-70198bc0\",\"path\":\"/posts/Goroutine%E3%80%81Channel%E3%80%81sync.html\",\"title\":\"Go并发编程——goroutine、channel、sync\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Go并发编程——goroutine、channel、sync\",\"date\":\"2022-03-01T10:35:00.000Z\",\"categories\":\"Go\",\"tags\":[\"Go\",\"并发编程\"],\"description\":\"// 它的调度也是不规律的 func f(id int) { \\tcnt := 0 \\tfor { \\t\\ttime.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond) \\t\\tcnt++ \\t\\tfmt.Printf(\\\"%d says %d\\\\n\\\", id, cnt) \\t} } func main() { \\tgo f(1) \\tgo f(2) \\tgo f(3) // 仅仅让主任务不退出而已 \\tfor { \\t\\t \\t} }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Goroutine%E3%80%81Channel%E3%80%81sync.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Go并发编程——goroutine、channel、sync\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"// 它的调度也是不规律的 func f(id int) { \\tcnt := 0 \\tfor { \\t\\ttime.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond) \\t\\tcnt++ \\t\\tfmt.Printf(\\\"%d says %d\\\\n\\\", id, cnt) \\t} } func main() { \\tgo f(1) \\tgo f(2) \\tgo f(3) // 仅仅让主任务不退出而已 \\tfor { \\t\\t \\t} }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Go\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"并发编程\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-03-01T10:35:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Go并发编程——goroutine、channel、sync\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-03-01T10:35:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.49,\"words\":148},\"filePathRelative\":\"posts/Goroutine、Channel、sync.md\",\"localizedDate\":\"2022年3月1日\",\"excerpt\":\"<div class=\\\"language-go line-numbers-mode\\\" data-ext=\\\"go\\\"><pre class=\\\"language-go\\\"><code><span class=\\\"token comment\\\">// 它的调度也是不规律的</span>\\n<span class=\\\"token keyword\\\">func</span> <span class=\\\"token function\\\">f</span><span class=\\\"token punctuation\\\">(</span>id <span class=\\\"token builtin\\\">int</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n\\tcnt <span class=\\\"token operator\\\">:=</span> <span class=\\\"token number\\\">0</span>\\n\\t<span class=\\\"token keyword\\\">for</span> <span class=\\\"token punctuation\\\">{</span>\\n\\t\\ttime<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">Sleep</span><span class=\\\"token punctuation\\\">(</span>time<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">Duration</span><span class=\\\"token punctuation\\\">(</span>rand<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">Intn</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">1000</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">*</span> time<span class=\\\"token punctuation\\\">.</span>Millisecond<span class=\\\"token punctuation\\\">)</span>\\n\\t\\tcnt<span class=\\\"token operator\\\">++</span>\\n\\t\\tfmt<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">Printf</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"%d says %d\\\\n\\\"</span><span class=\\\"token punctuation\\\">,</span> id<span class=\\\"token punctuation\\\">,</span> cnt<span class=\\\"token punctuation\\\">)</span>\\n\\t<span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n\\n<span class=\\\"token keyword\\\">func</span> <span class=\\\"token function\\\">main</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n\\t<span class=\\\"token keyword\\\">go</span> <span class=\\\"token function\\\">f</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span>\\n\\t<span class=\\\"token keyword\\\">go</span> <span class=\\\"token function\\\">f</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">2</span><span class=\\\"token punctuation\\\">)</span>\\n\\t<span class=\\\"token keyword\\\">go</span> <span class=\\\"token function\\\">f</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">3</span><span class=\\\"token punctuation\\\">)</span>\\n  <span class=\\\"token comment\\\">// 仅仅让主任务不退出而已</span>\\n\\t<span class=\\\"token keyword\\\">for</span> <span class=\\\"token punctuation\\\">{</span>\\n\\t\\t\\n\\t<span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
