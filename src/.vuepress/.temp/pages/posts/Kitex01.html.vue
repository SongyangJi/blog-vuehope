<template><div><h1 id="thrift入门" tabindex="-1"><a class="header-anchor" href="#thrift入门" aria-hidden="true">#</a> thrift入门</h1>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> thrift
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="编写thrift文件" tabindex="-1"><a class="header-anchor" href="#编写thrift文件" aria-hidden="true">#</a> 编写thrift文件</h2>
<p><a href="https://thrift.apache.org/docs/idl" target="_blank" rel="noopener noreferrer">thrift语法<ExternalLinkIcon/></a></p>
<p>Goland 插件：Thrift Support</p>
<p><code v-pre>User.thrift</code></p>
<div class="language-thrift line-numbers-mode" data-ext="thrift"><pre v-pre class="language-thrift"><code>namespace go Sample // Sample对应go的module名

struct User {
    1:required i32 id;
    2:required string name;
    3:required string avatar;
    4:required string address;
    5:required string mobile;
}

struct UserList {
    1:required list&lt;User&gt; userList;
    2:required i32 page;
    3:required i32 limit;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Service.thrift</code></p>
<div class="language-thrift line-numbers-mode" data-ext="thrift"><pre v-pre class="language-thrift"><code>include &quot;User.thrift&quot;

namespace go Sample

typedef map&lt;string, string&gt; Data

struct Response {
    1:required i32 errCode; // 错误码
    2:required string errMsg; // 错误信息
    3:required Data data;
}

//定义服务
service Greeter {
    Response SayHello(
        1:required User.User user
    )

    Response GetUser(
        1:required i32 uid
    )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用thrift脚手架" tabindex="-1"><a class="header-anchor" href="#使用thrift脚手架" aria-hidden="true">#</a> 使用thrift脚手架</h2>
<p>使用<code v-pre>thrift -r -v --gen go idl/Service.thrift</code>根据idl文件生成go代码。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir thrift_sample % thrift <span class="token parameter variable">-r</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">--gen</span> go idl/Service.thrift
Scanning /Users/jisongyang/GolandProjects/thrift_sample/idl/Service.thrift <span class="token keyword">for</span> includes
Scanning /Users/jisongyang/GolandProjects/thrift_sample/idl/User.thrift <span class="token keyword">for</span> includes
Parsing /Users/jisongyang/GolandProjects/thrift_sample/idl/User.thrift <span class="token keyword">for</span> types
Parsing /Users/jisongyang/GolandProjects/thrift_sample/idl/Service.thrift <span class="token keyword">for</span> types
Program: /Users/jisongyang/GolandProjects/thrift_sample/idl/User.thrift
Generating <span class="token string">"go"</span>
Program: /Users/jisongyang/GolandProjects/thrift_sample/idl/Service.thrift
Generating <span class="token string">"go"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目录结构</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── client_test.go
├── gen-go  <span class="token comment"># thrift脚手架生成的目录</span>
│   └── Sample
│       ├── GoUnusedProtection__.go
│       ├── Service-consts.go
│       ├── Service.go
│       ├── User-consts.go
│       ├── User.go
│       └── greeter-remote
│           └── greeter-remote.go
├── go.mod
├── go.sum
├── idl <span class="token comment"># 自己编写的idl文件</span>
│   ├── Service.thrift
│   └── User.thrift
└── main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="server端实现interface" tabindex="-1"><a class="header-anchor" href="#server端实现interface" aria-hidden="true">#</a> server端实现interface</h2>
<p>这是thrift生成的</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Greeter <span class="token keyword">interface</span> <span class="token punctuation">{</span>
  <span class="token comment">// Parameters:</span>
  <span class="token comment">//  - User</span>
  <span class="token function">SayHello</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">(</span>_r <span class="token operator">*</span>Response<span class="token punctuation">,</span> _err <span class="token builtin">error</span><span class="token punctuation">)</span>
  <span class="token comment">// Parameters:</span>
  <span class="token comment">//  - UID</span>
  <span class="token function">GetUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> uid <span class="token builtin">int32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>_r <span class="token operator">*</span>Response<span class="token punctuation">,</span> _err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>server端里去实现：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">//定义服务</span>
<span class="token keyword">type</span> Greeter <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//实现IDL里定义的接口</span>
<span class="token comment">//SayHello</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Greeter<span class="token punctuation">)</span> <span class="token function">SayHello</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> u <span class="token operator">*</span>Sample<span class="token punctuation">.</span>User<span class="token punctuation">)</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>Sample<span class="token punctuation">.</span>Response<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    strJson<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>Sample<span class="token punctuation">.</span>Response<span class="token punctuation">{</span>ErrCode<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> ErrMsg<span class="token punctuation">:</span> <span class="token string">"success"</span><span class="token punctuation">,</span> Data<span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"User"</span><span class="token punctuation">:</span> <span class="token function">string</span><span class="token punctuation">(</span>strJson<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">//GetUser</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Greeter<span class="token punctuation">)</span> <span class="token function">GetUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> uid <span class="token builtin">int32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>Sample<span class="token punctuation">.</span>Response<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>Sample<span class="token punctuation">.</span>Response<span class="token punctuation">{</span>ErrCode<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> ErrMsg<span class="token punctuation">:</span> <span class="token string">"user not exist."</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>   
    <span class="token comment">//buffered</span>
    <span class="token keyword">var</span> transportFactory thrift<span class="token punctuation">.</span>TTransportFactory
    <span class="token keyword">if</span> <span class="token operator">*</span>buffered <span class="token punctuation">{</span>
        transportFactory <span class="token operator">=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTBufferedTransportFactory</span><span class="token punctuation">(</span><span class="token number">8192</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        transportFactory <span class="token operator">=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTTransportFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//framed</span>
    <span class="token keyword">if</span> <span class="token operator">*</span>framed <span class="token punctuation">{</span>
        transportFactory <span class="token operator">=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTFramedTransportFactory</span><span class="token punctuation">(</span>transportFactory<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//handler</span>
    handler <span class="token operator">:=</span> <span class="token operator">&amp;</span>Greeter<span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token comment">//transport,no secure</span>
    <span class="token keyword">var</span> err <span class="token builtin">error</span>
    <span class="token keyword">var</span> transport thrift<span class="token punctuation">.</span>TServerTransport
    transport<span class="token punctuation">,</span> err <span class="token operator">=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTServerSocket</span><span class="token punctuation">(</span><span class="token operator">*</span>addr<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"error running server:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//processor</span>
    processor <span class="token operator">:=</span> Sample<span class="token punctuation">.</span><span class="token function">NewGreeterProcessor</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span> <span class="token comment">// 关键</span>
    
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Starting the simple server... on "</span><span class="token punctuation">,</span> <span class="token operator">*</span>addr<span class="token punctuation">)</span>
    
    <span class="token comment">//start tcp server</span>
    server <span class="token operator">:=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTSimpleServer4</span><span class="token punctuation">(</span>processor<span class="token punctuation">,</span> transport<span class="token punctuation">,</span> transportFactory<span class="token punctuation">,</span> protocolFactory<span class="token punctuation">)</span>
    err <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">Serve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"error running server:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="client端" tabindex="-1"><a class="header-anchor" href="#client端" aria-hidden="true">#</a> client端</h2>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">var</span> ctx <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">GetClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Sample<span class="token punctuation">.</span>GreeterClient <span class="token punctuation">{</span>
    addr <span class="token operator">:=</span> <span class="token string">":9090"</span>
    <span class="token keyword">var</span> transport thrift<span class="token punctuation">.</span>TTransport
    <span class="token keyword">var</span> err <span class="token builtin">error</span>
    transport<span class="token punctuation">,</span> err <span class="token operator">=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTSocket</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error opening socket:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//protocol</span>
    <span class="token keyword">var</span> protocolFactory thrift<span class="token punctuation">.</span>TProtocolFactory
    protocolFactory <span class="token operator">=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTBinaryProtocolFactoryDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment">//no buffered</span>
    <span class="token keyword">var</span> transportFactory thrift<span class="token punctuation">.</span>TTransportFactory
    transportFactory <span class="token operator">=</span> thrift<span class="token punctuation">.</span><span class="token function">NewTTransportFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    transport<span class="token punctuation">,</span> err <span class="token operator">=</span> transportFactory<span class="token punctuation">.</span><span class="token function">GetTransport</span><span class="token punctuation">(</span>transport<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"error running client:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">if</span> err <span class="token operator">:=</span> transport<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"error running client:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    iprot <span class="token operator">:=</span> protocolFactory<span class="token punctuation">.</span><span class="token function">GetProtocol</span><span class="token punctuation">(</span>transport<span class="token punctuation">)</span>
    oprot <span class="token operator">:=</span> protocolFactory<span class="token punctuation">.</span><span class="token function">GetProtocol</span><span class="token punctuation">(</span>transport<span class="token punctuation">)</span>
    
    client <span class="token operator">:=</span> Sample<span class="token punctuation">.</span><span class="token function">NewGreeterClient</span><span class="token punctuation">(</span>thrift<span class="token punctuation">.</span><span class="token function">NewTStandardClient</span><span class="token punctuation">(</span>iprot<span class="token punctuation">,</span> oprot<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 关键</span>
    <span class="token keyword">return</span> client
<span class="token punctuation">}</span>

<span class="token comment">//GetUser</span>
<span class="token keyword">func</span> <span class="token function">TestGetUser</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> <span class="token function">GetClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    rep<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">GetUser</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"thrift err: %v\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Logf</span><span class="token punctuation">(</span><span class="token string">"Recevied: %v\n"</span><span class="token punctuation">,</span> rep<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Reference</p>
<p>https://thrift.apache.org/</p>
<p><a href="https://thrift.apache.org/docs/idl" target="_blank" rel="noopener noreferrer">thrift语法<ExternalLinkIcon/></a></p>
</blockquote>
<h1 id="kitex" tabindex="-1"><a class="header-anchor" href="#kitex" aria-hidden="true">#</a> Kitex</h1>
<p>关于kite的介绍和微服务rpc的基本概念就不写了，直接上操作。</p>
<h2 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装</h2>
<ol>
<li>安装 kitex：<code v-pre>go install github.com/cloudwego/kitex/tool/cmd/kitex@latest</code></li>
<li>安装 thriftgo：<code v-pre>go install github.com/cloudwego/thriftgo@latest</code></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir kitex_echo % kitex <span class="token parameter variable">--version</span>
v0.4.3
jisongyang@SongyangJi-MacBookAir kitex_echo % thriftgo <span class="token parameter variable">--version</span>
thriftgo <span class="token number">0.2</span>.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>有了thriftgo无需安装thrift了。</p>
</blockquote>
<blockquote>
<p>这里可以直接创建目录，用kitex生成项目，也可以先创建go项目再进去编写idl。</p>
</blockquote>
<h2 id="编写idl" tabindex="-1"><a class="header-anchor" href="#编写idl" aria-hidden="true">#</a> 编写IDL</h2>
<p>echo.thrift</p>
<div class="language-thrift line-numbers-mode" data-ext="thrift"><pre v-pre class="language-thrift"><code>namespace go api

struct Request {
  1: string message
}

struct Response {
  1: string message
}

service Echo {
    Response echo(1: Request req)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成-echo-服务代码" tabindex="-1"><a class="header-anchor" href="#生成-echo-服务代码" aria-hidden="true">#</a> 生成 echo 服务代码</h2>
<p>命令：<code v-pre>kitex -module kitex_echo -service p.s.m echo.thrift</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir kitex_echo % kitex <span class="token parameter variable">-module</span> kitex_echo <span class="token parameter variable">-service</span> p.s.m echo.thrift
jisongyang@SongyangJi-MacBookAir kitex_echo % tree
<span class="token builtin class-name">.</span>
├── build.sh
├── echo.thrift
├── go.mod
├── handler.go
├── kitex_gen
│   └── api <span class="token comment"># idl中go的namespace</span>
│       ├── <span class="token builtin class-name">echo</span> <span class="token comment"># idl的文件名</span>
│       │   ├── client.go
│       │   ├── echo.go
│       │   ├── invoker.go
│       │   └── server.go
│       ├── echo.go
│       ├── k-consts.go
│       └── k-echo.go
├── main.go
└── script
    └── bootstrap.sh

<span class="token number">4</span> directories, <span class="token number">13</span> files

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://www.cloudwego.io/zh/docs/kitex/tutorials/code-gen/code_generation/" target="_blank" rel="noopener noreferrer">代码生成<ExternalLinkIcon/></a></p>
<ul>
<li>-service service_name
使用该选项时，kitex 会生成构建一个服务的脚手架代码，参数 <code v-pre>service_name</code> 给出启动时服务自身的名字，通常其值取决于使用 Kitex 框架时搭配的服务注册和服务发现功能。</li>
</ul>
<p>如果不指定 -service 参数，那么生成的只有 kitex_gen 目录。</p>
<ul>
<li>-module module_name
该参数用于指定生成代码所属的 Go 模块，会影响生成代码里的 import path。
如果当前目录是在 $GOPATH/src 下的一个目录，那么可以不指定该参数；kitex 会使用 $GOPATH/src 开始的相对路径作为 import path 前缀。例如，在$GOPATH/src/example.com/hello/world 下执行 kitex，那么 kitex_gen/example_package/example_package.go 在其他代码代码里的 import path 会是 example.com/hello/world/kitex_gen/example_package。
如果当前目录不在 $GOPATH/src 下，那么必须指定该参数。
如果指定了 -module 参数，那么 kitex 会从当前目录开始往上层搜索 go.mod 文件
如果不存在 go.mod 文件，那么 kitex 会调用 go mod init 生成 go.mod；
如果存在 go.mod 文件，那么 kitex 会检查 -module 的参数和 go.mod 里的模块名字是否一致，如果不一致则会报错退出；
最后，go.mod 的位置及其模块名字会决定生成代码里的 import path。</li>
</ul>
<blockquote>
<p>Another example</p>
</blockquote>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.
├── build.sh                     // 服务的构建脚本，会创建一个名为 output 的目录并生成启动服务所需的文件到里面
├── handler.go                   // 用户在该文件里实现 IDL service 定义的方法
├── kitex_gen                    // IDL 内容相关的生成代码
│   ├── base                     // base.thrift 的生成代码
│   │   ├── base.go              // thriftgo 的产物，包含 base.thrift 定义的内容的 go 代码
│   │   └── k-base.go            // kitex 在 thriftgo 的产物之外生成的代码
│   └── demo                     // demo.thrift 的生成代码
│       ├── demo.go              // thriftgo 的产物，包含 demo.thrift 定义的内容的 go 代码
│       ├── k-demo.go            // kitex 在 thriftgo 的产物之外生成的代码
│       └── demoservice          // kitex 为 demo.thrift 里定义的 demo service 生成的代码
│           ├── demoservice.go   // 提供了 client.go 和 server.go 共用的一些定义
│           ├── client.go        // 提供了 NewClient API
│           └── server.go        // 提供了 NewServer API
├── main.go                      // 程序入口
└── script                       // 构建脚本
    └── bootstrap.sh             // 服务的启动脚本，会被 build.sh 拷贝至 output 下
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一个bug——not-enough-arguments-in-call-to-t-tprot-xxx" tabindex="-1"><a class="header-anchor" href="#一个bug——not-enough-arguments-in-call-to-t-tprot-xxx" aria-hidden="true">#</a> 一个bug——not enough arguments in call to t.tProt.xxx</h3>
<p>根本原因是thrift在git上的go包更新了增加对go 1.7中的http.request + context的用法，部分函数中增加了context参数；但是thriftgo生成的go代码是版本较低的。</p>
<p>所以解决方案就是要么使用最新的thriftgo（目前好像develop版本可以），要么降低<code v-pre>github.com/apache/thrif</code>的版本。</p>
<p>亲测，将版本降低到v0.13.0是可以的。</p>
<h2 id="client端-1" tabindex="-1"><a class="header-anchor" href="#client端-1" aria-hidden="true">#</a> client端</h2>
<p>值得一提的是，这里直接使用了服务端生成的go代码，这是可以的也是应该的。</p>
<p>如果如果是其他语言的话，就必须要在generate code一下了。</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"context"</span>
    <span class="token string">"log"</span>
    <span class="token string">"time"</span>
    
    <span class="token string">"github.com/cloudwego/kitex/client"</span>
    <span class="token string">"github.com/cloudwego/kitex/client/callopt"</span>
    <span class="token string">"kitex_echo/kitex_gen/api"</span>
    <span class="token string">"kitex_echo/kitex_gen/api/echo"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">,</span> err <span class="token operator">:=</span> echo<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token string">"p.s.m"</span><span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">WithHostPorts</span><span class="token punctuation">(</span><span class="token string">"0.0.0.0:8888"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    req <span class="token operator">:=</span> <span class="token operator">&amp;</span>api<span class="token punctuation">.</span>Request<span class="token punctuation">{</span>Message<span class="token punctuation">:</span> <span class="token string">"helloworld from jsy"</span><span class="token punctuation">}</span>
    resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Echo</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> req<span class="token punctuation">,</span> callopt<span class="token punctuation">.</span><span class="token function">WithRPCTimeout</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>resp<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go.mod</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code>module kite_echo_client

<span class="token keyword">go</span> <span class="token number">1.18</span>

require <span class="token punctuation">(</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>cloudwego<span class="token operator">/</span>kitex v0<span class="token punctuation">.</span><span class="token number">4.3</span>
	kitex_echo v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">00010101000000</span><span class="token operator">-</span><span class="token number">000000000000</span> <span class="token comment">// 这个服务端的module还没推送到git remote</span>
<span class="token punctuation">)</span>

require <span class="token punctuation">(</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>apache<span class="token operator">/</span>thrift v0<span class="token punctuation">.</span><span class="token number">13.0</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>bytedance<span class="token operator">/</span>gopkg v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20220531084716</span><span class="token operator">-</span>665b4f21126f <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>chenzhuoyu<span class="token operator">/</span>iasm v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20220818063314</span><span class="token operator">-</span>28c361dae733 <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>choleraehyq<span class="token operator">/</span>pid v0<span class="token punctuation">.</span><span class="token number">0.15</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>cloudwego<span class="token operator">/</span>fastpb v0<span class="token punctuation">.</span><span class="token number">0.2</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>cloudwego<span class="token operator">/</span>frugal v0<span class="token punctuation">.</span><span class="token number">1.3</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>cloudwego<span class="token operator">/</span>netpoll v0<span class="token punctuation">.</span><span class="token number">2.6</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>cloudwego<span class="token operator">/</span>thriftgo v0<span class="token punctuation">.</span><span class="token number">2.1</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>golang<span class="token operator">/</span>protobuf v1<span class="token punctuation">.</span><span class="token number">5.2</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>google<span class="token operator">/</span>pprof v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20220608213341</span><span class="token operator">-</span>c488b8fa1db3 <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>jhump<span class="token operator">/</span>protoreflect v1<span class="token punctuation">.</span><span class="token number">8.2</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>json<span class="token operator">-</span>iterator<span class="token operator">/</span><span class="token keyword">go</span> v1<span class="token punctuation">.</span><span class="token number">1.12</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>modern<span class="token operator">-</span><span class="token keyword">go</span><span class="token operator">/</span>concurrent v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20180228061459</span><span class="token operator">-</span>e0a39a4cb421 <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>modern<span class="token operator">-</span><span class="token keyword">go</span><span class="token operator">/</span>reflect2 v1<span class="token punctuation">.</span><span class="token number">0.2</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>oleiade<span class="token operator">/</span>lane v1<span class="token punctuation">.</span><span class="token number">0.1</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>tidwall<span class="token operator">/</span>gjson v1<span class="token punctuation">.</span><span class="token number">9.3</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>tidwall<span class="token operator">/</span>match v1<span class="token punctuation">.</span><span class="token number">1.1</span> <span class="token comment">// indirect</span>
	github<span class="token punctuation">.</span>com<span class="token operator">/</span>tidwall<span class="token operator">/</span>pretty v1<span class="token punctuation">.</span><span class="token number">2.0</span> <span class="token comment">// indirect</span>
	golang<span class="token punctuation">.</span>org<span class="token operator">/</span>x<span class="token operator">/</span>arch v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20220722155209</span><span class="token operator">-</span>00200b7164a7 <span class="token comment">// indirect</span>
	golang<span class="token punctuation">.</span>org<span class="token operator">/</span>x<span class="token operator">/</span>net v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20210614182718</span><span class="token operator">-</span>04defd469f4e <span class="token comment">// indirect</span>
	golang<span class="token punctuation">.</span>org<span class="token operator">/</span>x<span class="token operator">/</span>sync v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20210220032951</span><span class="token operator">-</span>036812b2e83c <span class="token comment">// indirect</span>
	golang<span class="token punctuation">.</span>org<span class="token operator">/</span>x<span class="token operator">/</span>sys v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20220817070843</span><span class="token operator">-</span>5a390386f1f2 <span class="token comment">// indirect</span>
	golang<span class="token punctuation">.</span>org<span class="token operator">/</span>x<span class="token operator">/</span>text v0<span class="token punctuation">.</span><span class="token number">3.6</span> <span class="token comment">// indirect</span>
	google<span class="token punctuation">.</span>golang<span class="token punctuation">.</span>org<span class="token operator">/</span>genproto v0<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span><span class="token number">20210513213006</span><span class="token operator">-</span>bf773b8c8384 <span class="token comment">// indirect</span>
	google<span class="token punctuation">.</span>golang<span class="token punctuation">.</span>org<span class="token operator">/</span>protobuf v1<span class="token punctuation">.</span><span class="token number">28.0</span> <span class="token comment">// indirect</span>
	gopkg<span class="token punctuation">.</span>in<span class="token operator">/</span>yaml<span class="token punctuation">.</span>v3 v3<span class="token punctuation">.</span><span class="token number">0.1</span> <span class="token comment">// indirect</span>
<span class="token punctuation">)</span>

replace kitex_echo <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">/</span>kitex_echo <span class="token comment">// 直接替换为本地目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>https://www.cloudwego.io/zh/docs/kitex/</p>
</div></template>


