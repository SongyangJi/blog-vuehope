<template><div><h2 id="add-threads-users-添加线程组" tabindex="-1"><a class="header-anchor" href="#add-threads-users-添加线程组" aria-hidden="true">#</a> Add Threads（Users）添加线程组</h2>
<p><strong>线程组主要参数详解</strong></p>
<ol>
<li>线程数：虚拟用户数。一个虚拟用户占用一个进程或线程。模拟多少用户访问也就填写多少个线程数量。</li>
<li>Ramp-Up时间(秒)：设置的虚拟用户数需要多长时间全部启动。如果线程数为<code v-pre>100</code>，准备时长为<code v-pre>5</code>，那么需要<code v-pre>5</code>秒钟启动<code v-pre>100</code>个线程，也就是每秒钟启动<code v-pre>20</code>个线程。 相当于每秒模拟<code v-pre>20</code>个用户进行访问，设置为零我理解为并发访问。</li>
<li>循环次数：如果线程数为<code v-pre>100</code>，循环次数为<code v-pre>100</code>。那么总请求数为<code v-pre>100*100=10000</code> 。如果勾选了“永远”，那么所有线程会一直发送请求，直到选择停止运行脚本。</li>
</ol>
<h2 id="add-sample-添加取样器" tabindex="-1"><a class="header-anchor" href="#add-sample-添加取样器" aria-hidden="true">#</a> Add Sample 添加取样器（）</h2>
<h3 id="add-sample-http-request-添加http接口测试" tabindex="-1"><a class="header-anchor" href="#add-sample-http-request-添加http接口测试" aria-hidden="true">#</a> Add Sample HTTP Request 添加http接口测试（）</h3>
<p><strong>Http请求主要参数详解</strong></p>
<ul>
<li>协议：向目标服务器发送HTTP请求协议，可以是<code v-pre>HTTP</code>或<code v-pre>HTTPS</code>，默认为<code v-pre>HTTP</code>。</li>
<li>服务器名称或IP ：<code v-pre>HTTP</code>请求发送的目标服务器名称或<code v-pre>IP</code>。</li>
<li>端口号：目标服务器的端口号，默认值为80</li>
<li>方法：发送<code v-pre>HTTP</code>请求的方法，可用方法包括<code v-pre>GET</code>、<code v-pre>POST</code>、<code v-pre>HEAD</code>、<code v-pre>PUT</code>、<code v-pre>OPTIONS</code>、<code v-pre>TRACE</code>、<code v-pre>DELETE</code>等。</li>
<li>路径：目标<code v-pre>URL</code>路径（<code v-pre>URL</code>中去掉服务器地址、端口及参数后剩余部分）。</li>
<li>字符集编码：编码方式，默认为<code v-pre>ISO-8859-1</code>编码，这里配置为<code v-pre>utf-8</code>。</li>
<li>参数：同请求一起发送参数 ，在请求中发送的<code v-pre>URL</code>参数，用户可以将<code v-pre>URL</code>中所有参数设置在本表中，表中每行为一个参数（对应<code v-pre>URL</code>中的 <code v-pre>key=value</code>），注意参数传入中文时需要勾选“编码”。</li>
</ul>
<h2 id="断言" tabindex="-1"><a class="header-anchor" href="#断言" aria-hidden="true">#</a> 断言</h2>
<h3 id="add-assertions-json-assertion-添加json断言" tabindex="-1"><a class="header-anchor" href="#add-assertions-json-assertion-添加json断言" aria-hidden="true">#</a> Add Assertions Json Assertion 添加Json断言（）</h3>
<h3 id="add-listener-assertion-results-添加断言结果" tabindex="-1"><a class="header-anchor" href="#add-listener-assertion-results-添加断言结果" aria-hidden="true">#</a> Add Listener Assertion Results 添加断言结果（）</h3>
<h2 id="结果报告" tabindex="-1"><a class="header-anchor" href="#结果报告" aria-hidden="true">#</a> 结果报告</h2>
<h3 id="add-listener-view-results-tree-添加察看结果树" tabindex="-1"><a class="header-anchor" href="#add-listener-view-results-tree-添加察看结果树" aria-hidden="true">#</a> Add Listener View Results Tree 添加察看结果树（）</h3>
<h3 id="add-listener-aggregate-report-添加聚合报告" tabindex="-1"><a class="header-anchor" href="#add-listener-aggregate-report-添加聚合报告" aria-hidden="true">#</a> Add Listener Aggregate Report 添加聚合报告（）</h3>
<p><strong>聚合报告参数详解</strong></p>
<ol>
<li>Label：每个 <code v-pre>JMeter</code> 的 <code v-pre>element</code>（例如我这里只有一个 <code v-pre>Spring WebFlux</code>）都有一个 <code v-pre>Name</code> 属性，这里显示的就是 <code v-pre>Name</code> 属性的值。</li>
<li>样本(Samples)：请求数——表示这次测试中一共发出了多少个请求，我这里模拟了<code v-pre>100</code>个用户循环<code v-pre>6</code>次也就为<code v-pre>100*6=600</code>。</li>
<li>平均值(Average)：平均响应时间 (单位:<code v-pre>ms</code>)。默认是单个<code v-pre>Request</code>的平均响应时间，当使用了<code v-pre>Transaction Controller</code>时，也可以是<code v-pre>Transaction</code>为单位显示平均响应时间。</li>
<li>中位数(Median)： 50％ 用户的响应时间。</li>
<li>90% 百分位(Line)：90％用户的响应时间。相邻几个<code v-pre>*%</code>同意。</li>
<li>最小值(Min)：最小响应时间。</li>
<li>最大值(Max)：最大响应时间。</li>
<li>异常(Error) %：错误率——错误请求数/请求总数。</li>
<li>吞吐量(Throughput)：吞吐量——默认情况下表示每秒完成的请求数（<code v-pre>Request per Second</code>），当使用了 <code v-pre>Transaction Controller</code> 时，也可以表示类似 <code v-pre>LoadRunner</code> 的 <code v-pre>Transaction per Second</code> 数 。</li>
<li>接收 KB/Sec：每秒从服务器端接收到的数据量，相当于<code v-pre>LoadRunner</code>中的<code v-pre>Throughput/Sec</code>。</li>
<li>发送 KB/Sec：每秒向服务器发送的数据量，相当于<code v-pre>LoadRunner</code>中的<code v-pre>Throughput/Sec</code>。</li>
</ol>
<blockquote>
<p>一般而言，性能测试中我们需要重点关注的数据有： Samples、Average、Min、Max、Error、Throughput。</p>
</blockquote>
<blockquote>
<p><a href="https://www.jianshu.com/p/6bc152ca6126" target="_blank" rel="noopener noreferrer">Apache JMeter 入门教程<ExternalLinkIcon/></a></p>
<p><a href="https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E5%8E%8B%E5%8A%9B%E6%B5%8B%E8%AF%95/10364657" target="_blank" rel="noopener noreferrer">软件压力测试<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


