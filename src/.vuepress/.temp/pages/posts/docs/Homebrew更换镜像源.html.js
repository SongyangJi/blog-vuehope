export const data = JSON.parse("{\"key\":\"v-7b72de08\",\"path\":\"/posts/docs/Homebrew%E6%9B%B4%E6%8D%A2%E9%95%9C%E5%83%8F%E6%BA%90.html\",\"title\":\"Homebrew更换镜像源\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Homebrew更换镜像源\",\"date\":\"2022-05-14T02:59:24.000Z\",\"categories\":\"Tools\",\"tags\":[\"Homebrew\"],\"description\":\"替换brew.git cd \\\"$(brew --repo)\\\" git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git 替换homebrew-core.git cd \\\"$(brew --repo)/Library/Taps/homebrew/homebrew-core\\\" git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git 替换homebrew-bottles访问地址\"},\"headers\":[],\"readingTime\":{\"minutes\":0.22,\"words\":65},\"filePathRelative\":\"posts/docs/Homebrew更换镜像源.md\",\"localizedDate\":\"2022年5月14日\",\"excerpt\":\"<h1> 替换brew.git</h1>\\n<p>cd \\\"$(brew --repo)\\\"\\ngit remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git</p>\\n<h1> 替换homebrew-core.git</h1>\\n<p>cd \\\"$(brew --repo)/Library/Taps/homebrew/homebrew-core\\\"\\ngit remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git</p>\\n<h1> 替换homebrew-bottles访问地址</h1>\",\"autoDesc\":true}")

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
