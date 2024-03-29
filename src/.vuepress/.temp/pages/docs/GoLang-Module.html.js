export const data = JSON.parse("{\"key\":\"v-25ed8ed1\",\"path\":\"/docs/GoLang-Module.html\",\"title\":\"GoLang-Module\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"GoLang-Module\",\"date\":\"2022-12-01T00:24:38.000Z\",\"categories\":\"Go\",\"tags\":[\"Go\"],\"description\":\"Go Mod 模式 Go Modules 在 Go 1.11 和 Go 1.12 中有三个模式，根据环境变量 GO111MODULE进行配置： GOPATH 模式（GO111MODULE=off） Go 编译器从不使用 Go Mod。而会查找 vendor 目录和 GOPATH 以查找依赖项。 Go Modules 模式（ GO111MODULE=on） Go 编译器只使用 Go Mod，GOPATH不再作为导入目录，但它还是会把下载的依赖储存在 GOPATH/pkg/mod 中，也会把 go install 命令的结果放在 GOPATH/bin 中。\"},\"headers\":[{\"level\":2,\"title\":\"GOPATH 模式（GO111MODULE=off）\",\"slug\":\"gopath-模式-go111module-off\",\"link\":\"#gopath-模式-go111module-off\",\"children\":[]},{\"level\":2,\"title\":\"Go Modules 模式（ GO111MODULE=on）\",\"slug\":\"go-modules-模式-go111module-on\",\"link\":\"#go-modules-模式-go111module-on\",\"children\":[]},{\"level\":2,\"title\":\"缺省模式（未设置该环境变量或 GO111MODULE=auto）\",\"slug\":\"缺省模式-未设置该环境变量或-go111module-auto\",\"link\":\"#缺省模式-未设置该环境变量或-go111module-auto\",\"children\":[]}],\"readingTime\":{\"minutes\":0.97,\"words\":290},\"filePathRelative\":\"docs/GoLang-Module.md\",\"localizedDate\":\"2022年12月1日\",\"excerpt\":\"<h1> Go Mod 模式</h1>\\n<p>Go Modules 在 Go 1.11 和 Go 1.12 中有三个模式，根据环境变量 <code>GO111MODULE</code>进行配置：</p>\\n<h2> GOPATH 模式（GO111MODULE=off）</h2>\\n<p>Go 编译器从不使用 Go Mod。而会查找 vendor 目录和 GOPATH 以查找依赖项。</p>\\n<h2> Go Modules 模式（ GO111MODULE=on）</h2>\\n<p>Go 编译器只使用 Go Mod，GOPATH不再作为导入目录，但它还是会把下载的依赖储存在 GOPATH/pkg/mod 中，也会把 go install 命令的结果放在 GOPATH/bin 中。</p>\",\"autoDesc\":true}")

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
