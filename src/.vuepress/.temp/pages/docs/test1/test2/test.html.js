export const data = JSON.parse("{\"key\":\"v-bbd2ba66\",\"path\":\"/docs/test1/test2/test.html\",\"title\":\"你好\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"你好\"},\"headers\":[],\"readingTime\":{\"minutes\":0.01,\"words\":2},\"filePathRelative\":\"docs/test1/test2/test.md\",\"excerpt\":\"<h1> 你好</h1>\\n\",\"autoDesc\":true}")

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
