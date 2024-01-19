export const data = JSON.parse("{\"key\":\"v-20781d6a\",\"path\":\"/posts/GoLang-Module.html\",\"title\":\"GoLang-Module\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"GoLang-Module\",\"date\":\"2022-12-01T00:24:38.000Z\",\"categories\":\"Go\",\"tags\":[\"Go\"],\"description\":\"Go Mod 模式 Go Modules 在 Go 1.11 和 Go 1.12 中有三个模式，根据环境变量 GO111MODULE进行配置： GOPATH 模式（GO111MODULE=off） Go 编译器从不使用 Go Mod。而会查找 vendor 目录和 GOPATH 以查找依赖项。 Go Modules 模式（ GO111MODULE=on） Go 编译器只使用 Go Mod，GOPATH不再作为导入目录，但它还是会把下载的依赖储存在 GOPATH/pkg/mod 中，也会把 go install 命令的结果放在 GOPATH/bin 中。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/GoLang-Module.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"GoLang-Module\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Go Mod 模式 Go Modules 在 Go 1.11 和 Go 1.12 中有三个模式，根据环境变量 GO111MODULE进行配置： GOPATH 模式（GO111MODULE=off） Go 编译器从不使用 Go Mod。而会查找 vendor 目录和 GOPATH 以查找依赖项。 Go Modules 模式（ GO111MODULE=on） Go 编译器只使用 Go Mod，GOPATH不再作为导入目录，但它还是会把下载的依赖储存在 GOPATH/pkg/mod 中，也会把 go install 命令的结果放在 GOPATH/bin 中。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Go\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-12-01T00:24:38.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"GoLang-Module\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-12-01T00:24:38.000Z\\\",\\\"dateModified\\\":\\\"2024-01-18T12:43:38.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"GOPATH 模式（GO111MODULE=off）\",\"slug\":\"gopath-模式-go111module-off\",\"link\":\"#gopath-模式-go111module-off\",\"children\":[]},{\"level\":2,\"title\":\"Go Modules 模式（ GO111MODULE=on）\",\"slug\":\"go-modules-模式-go111module-on\",\"link\":\"#go-modules-模式-go111module-on\",\"children\":[]},{\"level\":2,\"title\":\"缺省模式（未设置该环境变量或 GO111MODULE=auto）\",\"slug\":\"缺省模式-未设置该环境变量或-go111module-auto\",\"link\":\"#缺省模式-未设置该环境变量或-go111module-auto\",\"children\":[]}],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705581818000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":0.97,\"words\":290},\"filePathRelative\":\"posts/GoLang-Module.md\",\"localizedDate\":\"2022年12月1日\",\"excerpt\":\"<h1> Go Mod 模式</h1>\\n<p>Go Modules 在 Go 1.11 和 Go 1.12 中有三个模式，根据环境变量 <code>GO111MODULE</code>进行配置：</p>\\n<h2> GOPATH 模式（GO111MODULE=off）</h2>\\n<p>Go 编译器从不使用 Go Mod。而会查找 vendor 目录和 GOPATH 以查找依赖项。</p>\\n<h2> Go Modules 模式（ GO111MODULE=on）</h2>\\n<p>Go 编译器只使用 Go Mod，GOPATH不再作为导入目录，但它还是会把下载的依赖储存在 GOPATH/pkg/mod 中，也会把 go install 命令的结果放在 GOPATH/bin 中。</p>\",\"autoDesc\":true}")
