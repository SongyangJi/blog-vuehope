<template><div><h1 id="go-mod-模式" tabindex="-1"><a class="header-anchor" href="#go-mod-模式" aria-hidden="true">#</a> Go Mod 模式</h1>
<p>Go Modules 在 Go 1.11 和 Go 1.12 中有三个模式，根据环境变量 <code v-pre>GO111MODULE</code>进行配置：</p>
<h2 id="gopath-模式-go111module-off" tabindex="-1"><a class="header-anchor" href="#gopath-模式-go111module-off" aria-hidden="true">#</a> GOPATH 模式（GO111MODULE=off）</h2>
<p>Go 编译器从不使用 Go Mod。而会查找 vendor 目录和 GOPATH 以查找依赖项。</p>
<h2 id="go-modules-模式-go111module-on" tabindex="-1"><a class="header-anchor" href="#go-modules-模式-go111module-on" aria-hidden="true">#</a> Go Modules 模式（ GO111MODULE=on）</h2>
<p>Go 编译器只使用 Go Mod，GOPATH不再作为导入目录，但它还是会把下载的依赖储存在 GOPATH/pkg/mod 中，也会把 go install 命令的结果放在 GOPATH/bin 中。</p>
<h2 id="缺省模式-未设置该环境变量或-go111module-auto" tabindex="-1"><a class="header-anchor" href="#缺省模式-未设置该环境变量或-go111module-auto" aria-hidden="true">#</a> 缺省模式（未设置该环境变量或 GO111MODULE=auto）</h2>
<p>Go 编译器在同时满足以下两个条件时使用 Go Mod</p>
<p>1.当前目录不在 GOPATH/src/ 下；
2.在当前目录或上层目录中存在 go.mod 文件；</p>
<p>Go 1.13 及1.13以后版本默认使用 Go Mod 模式</p>
<h1 id="依赖管理命令-go-get-install、go-mod-tidy、download" tabindex="-1"><a class="header-anchor" href="#依赖管理命令-go-get-install、go-mod-tidy、download" aria-hidden="true">#</a> 依赖管理命令 go get/install、go mod tidy、download</h1>
<h1 id="go-module的发布、导入" tabindex="-1"><a class="header-anchor" href="#go-module的发布、导入" aria-hidden="true">#</a> Go Module的发布、导入</h1>
<p>https://zhuanlan.zhihu.com/p/109828249</p>
<blockquote>
<p>参考文章
https://www.topgoer.com/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AEgopath.html</p>
<p>https://go.dev/blog/using-go-modules</p>
<p>https://blog.csdn.net/m0_63044390/article/details/123984873</p>
<p>https://www.topgoer.com/%E5%85%B6%E4%BB%96/%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86.html</p>
<p>https://www.jianshu.com/p/04dd0d386df2</p>
<p><a href="https://blog.golangstack.com/post/go-mod-import-local-package/" target="_blank" rel="noopener noreferrer">go mod 导入本地包<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


