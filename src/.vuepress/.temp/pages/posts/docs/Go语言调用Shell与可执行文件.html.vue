<template><div><h1 id="库函数" tabindex="-1"><a class="header-anchor" href="#库函数" aria-hidden="true">#</a> 库函数</h1>
<p>os/exec包可用于调用外部命令，可以使用管道连接输入输出，并支持阻塞与非阻塞方式执行命令。
os/exec包中关键的类型为Cmd，以下介绍的所有方法皆服务于该类型：</p>
<ul>
<li>
<p><code v-pre>func Command(name string, arg ...string) *Cmd</code>
方法返回一个*Cmd， 用于执行name指定的程序(携带arg参数)</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) Run() error</code>
执行Cmd中包含的命令，阻塞直到命令执行完成</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) Start() error</code>
执行Cmd中包含的命令，该方法立即返回，并不等待命令执行完成</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) Wait() error</code>
该方法会阻塞直到Cmd中的命令执行完成，但该命令必须是被Start方法开始执行的</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) Output() ([]byte, error)</code>
执行Cmd中包含的命令，并返回标准输出的切片</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) CombinedOutput() ([]byte, error)</code>
执行Cmd中包含的命令，并返回标准输出与标准错误合并后的切片</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) StdinPipe() (io.WriteCloser, error)</code>
返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输入</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) StdoutPipe() (io.ReadCloser, error)</code>
返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准输出</p>
</li>
<li>
<p><code v-pre>func (c *Cmd) StderrPipe() (io.ReadCloser, error)</code>
返回一个管道，该管道会在Cmd中的命令被启动后连接到其标准错误</p>
</li>
</ul>
<h1 id="普通调用示例" tabindex="-1"><a class="header-anchor" href="#普通调用示例" aria-hidden="true">#</a> 普通调用示例</h1>
<h2 id="调用shell命令或可执行文件" tabindex="-1"><a class="header-anchor" href="#调用shell命令或可执行文件" aria-hidden="true">#</a> 调用Shell命令或可执行文件</h2>
<p>演示在当前目录创建一个空文件</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"os/exec"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"touch"</span><span class="token punctuation">,</span> <span class="token string">"test_file"</span><span class="token punctuation">)</span>

    err <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Execute Command failed:"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Execute Command finished."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般不建议使用这种默认方式调用Shell脚本：
<code v-pre>cmd := exec.Command(&quot;my_shell.sh&quot;)</code>
因为这种方式实际的执行结果和命令行执行#sh my_shell.sh一样，如果你的Shell脚本不满足sh的规范，就会调用失败。</p>
<h2 id="调用shell脚本" tabindex="-1"><a class="header-anchor" href="#调用shell脚本" aria-hidden="true">#</a> 调用Shell脚本</h2>
<p>设置bash来调用指定Shell脚本，dir_size.sh为我们测试用的Shell脚本。调用完成后打印Shell脚本的标准输出到控制台。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"os/exec"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    command <span class="token operator">:=</span> <span class="token string">`./dir_size.sh .`</span>
    cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"/bin/bash"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> command<span class="token punctuation">)</span>

    output<span class="token punctuation">,</span> err <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Execute Shell:%s failed with error:%s"</span><span class="token punctuation">,</span> command<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Execute Shell:%s finished with output:\n%s"</span><span class="token punctuation">,</span> command<span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用输入输出pipe" tabindex="-1"><a class="header-anchor" href="#使用输入输出pipe" aria-hidden="true">#</a> 使用输入输出Pipe</h2>
<p>演示使用管道连接到grep命令的标准输入，过滤包含test的字符串，并使用管道连接标准输出，打印运行结果：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"io/ioutil"</span>
    <span class="token string">"os/exec"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"/bin/bash"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> <span class="token string">"grep test"</span><span class="token punctuation">)</span>

    stdin<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">StdinPipe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    stdout<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">StdoutPipe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> err <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Execute failed when Start:"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    stdin<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"go text for grep\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    stdin<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"go test text for grep\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    stdin<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    out_bytes<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>stdout<span class="token punctuation">)</span>
    stdout<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> err <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Execute failed when Wait:"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Execute finished:"</span> <span class="token operator">+</span> <span class="token function">string</span><span class="token punctuation">(</span>out_bytes<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序输出结果：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ./execCommand </span>
Execute finished:go <span class="token builtin class-name">test</span> text <span class="token keyword">for</span> <span class="token function">grep</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


