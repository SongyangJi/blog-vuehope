export const data = JSON.parse("{\"key\":\"v-653ea584\",\"path\":\"/posts/Go%E8%AF%AD%E8%A8%80%E8%B0%83%E7%94%A8Shell%E4%B8%8E%E5%8F%AF%E6%89%A7%E8%A1%8C%E6%96%87%E4%BB%B6.html\",\"title\":\"Go语言调用Shell与可执行文件\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Go语言调用Shell与可执行文件\",\"date\":\"2022-06-20T13:51:38.000Z\",\"categories\":\"Go\",\"tags\":[\"Go\"],\"description\":\"库函数 os/exec包可用于调用外部命令，可以使用管道连接输入输出，并支持阻塞与非阻塞方式执行命令。 os/exec包中关键的类型为Cmd，以下介绍的所有方法皆服务于该类型： func Command(name string, arg ...string) *Cmd 方法返回一个*Cmd， 用于执行name指定的程序(携带arg参数) func (c *Cmd) Run() error 执行Cmd中包含的命令，阻塞直到命令执行完成 func (c *Cmd) Start() error 执行Cmd中包含的命令，该方法立即返回，并不等待命令执行完成 func (c *Cmd) Wait() error 该方法会阻塞直到Cmd中的命令执行完成，但该命令必须是被Start方法开始执行的 func (c *Cmd) Output() ([]byte, error) 执行Cmd中包含的命令，并返回标准输出的切片 func (c *Cmd) CombinedOutput() ([]byte, error) 执行Cmd中包含的命令，并返回标准输出与标准错误合并后的切片 func (c *Cmd) StdinPipe() (io.WriteCloser, error) 返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输入 func (c *Cmd) StdoutPipe() (io.ReadCloser, error) 返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输出 func (c *Cmd) StderrPipe() (io.ReadCloser, error) 返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准错误\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Go%E8%AF%AD%E8%A8%80%E8%B0%83%E7%94%A8Shell%E4%B8%8E%E5%8F%AF%E6%89%A7%E8%A1%8C%E6%96%87%E4%BB%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Go语言调用Shell与可执行文件\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"库函数 os/exec包可用于调用外部命令，可以使用管道连接输入输出，并支持阻塞与非阻塞方式执行命令。 os/exec包中关键的类型为Cmd，以下介绍的所有方法皆服务于该类型： func Command(name string, arg ...string) *Cmd 方法返回一个*Cmd， 用于执行name指定的程序(携带arg参数) func (c *Cmd) Run() error 执行Cmd中包含的命令，阻塞直到命令执行完成 func (c *Cmd) Start() error 执行Cmd中包含的命令，该方法立即返回，并不等待命令执行完成 func (c *Cmd) Wait() error 该方法会阻塞直到Cmd中的命令执行完成，但该命令必须是被Start方法开始执行的 func (c *Cmd) Output() ([]byte, error) 执行Cmd中包含的命令，并返回标准输出的切片 func (c *Cmd) CombinedOutput() ([]byte, error) 执行Cmd中包含的命令，并返回标准输出与标准错误合并后的切片 func (c *Cmd) StdinPipe() (io.WriteCloser, error) 返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输入 func (c *Cmd) StdoutPipe() (io.ReadCloser, error) 返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输出 func (c *Cmd) StderrPipe() (io.ReadCloser, error) 返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准错误\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Go\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-20T13:51:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Go语言调用Shell与可执行文件\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-20T13:51:38.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"调用Shell命令或可执行文件\",\"slug\":\"调用shell命令或可执行文件\",\"link\":\"#调用shell命令或可执行文件\",\"children\":[]},{\"level\":2,\"title\":\"调用Shell脚本\",\"slug\":\"调用shell脚本\",\"link\":\"#调用shell脚本\",\"children\":[]},{\"level\":2,\"title\":\"使用输入输出Pipe\",\"slug\":\"使用输入输出pipe\",\"link\":\"#使用输入输出pipe\",\"children\":[]}],\"readingTime\":{\"minutes\":2.41,\"words\":723},\"filePathRelative\":\"posts/Go语言调用Shell与可执行文件.md\",\"localizedDate\":\"2022年6月20日\",\"excerpt\":\"<h1> 库函数</h1>\\n<p>os/exec包可用于调用外部命令，可以使用管道连接输入输出，并支持阻塞与非阻塞方式执行命令。\\nos/exec包中关键的类型为Cmd，以下介绍的所有方法皆服务于该类型：</p>\\n<ul>\\n<li>\\n<p><code>func Command(name string, arg ...string) *Cmd</code>\\n方法返回一个*Cmd， 用于执行name指定的程序(携带arg参数)</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) Run() error</code>\\n执行Cmd中包含的命令，阻塞直到命令执行完成</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) Start() error</code>\\n执行Cmd中包含的命令，该方法立即返回，并不等待命令执行完成</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) Wait() error</code>\\n该方法会阻塞直到Cmd中的命令执行完成，但该命令必须是被Start方法开始执行的</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) Output() ([]byte, error)</code>\\n执行Cmd中包含的命令，并返回标准输出的切片</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) CombinedOutput() ([]byte, error)</code>\\n执行Cmd中包含的命令，并返回标准输出与标准错误合并后的切片</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) StdinPipe() (io.WriteCloser, error)</code>\\n返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输入</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) StdoutPipe() (io.ReadCloser, error)</code>\\n返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输出</p>\\n</li>\\n<li>\\n<p><code>func (c *Cmd) StderrPipe() (io.ReadCloser, error)</code>\\n返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准错误</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")

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
