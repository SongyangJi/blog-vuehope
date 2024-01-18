<template><div><h1 id="syn-flood" tabindex="-1"><a class="header-anchor" href="#syn-flood" aria-hidden="true">#</a> SYN FLOOD</h1>
<p>SYN Flood 是种典型的 DoS（拒绝服务）攻击，其目的是通过消耗服务器所有可用资源使服务器无法用于处理合法请求。通过重复发送初始连接请求（SYN）数据包，攻击者能够压倒目标服务器上的所有可用端口，导致目标设备根本不响应合法请求。</p>
<h2 id="syn攻击的原理" tabindex="-1"><a class="header-anchor" href="#syn攻击的原理" aria-hidden="true">#</a> SYN攻击的原理</h2>
<p>在 TCP 建立连接的过程中，<strong>因为服务端不确定自己发给客户端的 SYN-ACK 消息或客户端反馈的 ACK 消息是否会丢在半路，所以会给每个待完成的半开连接状态设一个定时器</strong>，如果超过时间还没有收到客户端的 ACK 消息，则重新发送一次 SYN-ACK 消息给客户端，直到重试超过一定次数时才会放弃。</p>
<p><strong>服务端为了维持半开连接状态，需要分配内核资源维护半开连接</strong>。当攻击者伪造海量的虚假 IP 向服务端发送 SYN 包时，就形成了 SYN FLOOD 攻击。攻击者故意不响应 ACK 消息，导致服务端被大量注定不能完成的半开连接占据，直到资源耗尽，停止响应正常的连接请求。</p>
<p><strong>SYN flood攻击目前有两种方法，不过都与服务端没收到<em>ACK</em>有关</strong>。恶意用户可以跳过发送最后的<em>ACK</em>信息；或者在<em>SYN</em>里通过欺骗来源IP地址，这让服务器送<em>SYN-ACK</em>到假造的IP地址，因此永不可能收到<em>ACK</em>。这两个案例服务器会花点时间等待ACK通知，故一个简单的网络拥塞可能是由于没有<em>ACK</em>造成的。</p>
<p>解决方法：</p>
<ol>
<li>
<p>直接的方法是<strong>提高 TCP 端口容量</strong>，<strong>减少半开连接的资源占用时间</strong>，然而该方法只是稍稍提高了防御能力，算不上解决问题；</p>
</li>
<li>
<p><strong>部署能够辨别恶意 IP 的路由器</strong>，将伪造 IP 地址的发送方发送的 SYN 消息过滤掉，该方案作用一般不是太大；</p>
</li>
<li>
<p><strong>SYN Cache</strong>：该方法首先<strong>构造一个全局 Hash Table，用来缓存系统当前所有的半开连接信息</strong>。在 Hash Table 中的每个桶的容量大小是有限制的，<s>当桶满时，会主动丢掉早来的信息</s>。</p>
<p><strong>当服务端收到一个 SYN 消息后，会通过一个映射函数生成一个相应的 Key 值，使得当前半连接信息存入相应的桶中</strong>。<strong>当收到客户端正确的ack报文后，服务端才开始分配传输资源块</strong>，并将相应的半开连接信息从表中删除。<strong>和服务器传输资源相比，维护表的开销要小得多</strong>。</p>
</li>
<li>
<p><strong>SYN Cookie</strong>：<strong>服务端通过特定的算法将半开连接信息编码成序列号或者时间戳</strong>，<strong>用作服务端给客户端的消息编号，随 SYN-ACK 消息一同返回给连接发起方</strong>，这样<strong>在连接建立完成前服务端不保存任何信息</strong>，<strong>直到发送方发送 ACK 确认报文并且服务端成功验证编码信息后，服务端才开始分配传输资源</strong>。若请求方是攻击者，则不会向服务端会 ACK 消息，由于未成功建立连接，因此服务端并没有花费任何额外的开销。</p>
<p>然而该方案也存在一些缺点，<strong>由于服务端并不保存半开连接状态，因此也就丧失了超时重传的能力</strong>，这在一定程度上降低了正常用户的连接成功率。此外，客户端发送给服务端的确认报文存在传输丢失的可能，当 ACK 确认报文丢失时，服务端和客户端会对连接的成功与否产生歧义，此时就需要上层应用采取相应的策略进行处理了。</p>
</li>
</ol>
<blockquote>
<p><a href="https://zh.wikipedia.org/wiki/SYN_cookie" target="_blank" rel="noopener noreferrer">SYN cookie wiki<ExternalLinkIcon/></a></p>
<p>发起一个 TCP 连接时，客户端将一个 TCP SYN 包发送给服务器。作为响应，服务器将 TCP SYN + ACK 包返回给客户端。此数据包中有一个<a href="https://zh.wikipedia.org/wiki/%E4%BC%A0%E8%BE%93%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE#.E5.BA.8F.E5.88.97.E5.8F.B7.E5.92.8C.E7.A1.AE.E8.AE.A4" target="_blank" rel="noopener noreferrer">序号<ExternalLinkIcon/></a>（sequence number，TCP头中的第二个32 bit），它被 TCP 用来重新组装数据流。根据 TCP 规范，由端点发送的第一个序号可以是由该端点决定的任何值。SYN Cookies 是根据以下规则构造的初始序号：</p>
<ul>
<li>令 <strong>t</strong> 为一个缓慢递增的时间戳（通常为 <code v-pre>time() &gt;&gt; 6 </code>，提供 64 秒的分辨率）；</li>
<li>令 <strong>m</strong> 为服务器会在 SYN 队列条目中存储的<a href="https://zh.wikipedia.org/wiki/%E6%9C%80%E5%A4%A7%E5%88%86%E6%AE%B5%E5%A4%A7%E5%B0%8F" target="_blank" rel="noopener noreferrer">最大分段大小<ExternalLinkIcon/></a>（maximum segment size，简称为 MSS）；</li>
<li>令 <strong>s</strong> 为一个加密<a href="https://zh.wikipedia.org/wiki/%E6%95%A3%E5%88%97%E7%AE%97%E6%B3%95" target="_blank" rel="noopener noreferrer">散列<ExternalLinkIcon/></a>函数对服务器和客户端各自的 IP 地址和端口号以及 <strong>t</strong> 进行运算的结果。返回得到的数值 <strong>s</strong> 必须是一个24位值。</li>
</ul>
<p>初始 TCP 序号，也就是所谓的 <em>SYN cookie</em>，按照如下算法得到：</p>
<ul>
<li>头五位：<strong>t</strong> <a href="https://zh.wikipedia.org/wiki/%E5%90%8C%E4%BD%99" target="_blank" rel="noopener noreferrer">mod<ExternalLinkIcon/></a> 32；</li>
<li>中三位：<strong>m</strong> 编码后的数值；</li>
<li>末24位：<strong>s</strong> 本身；</li>
</ul>
<p>注：由于 <em>m</em> 必须用 3 位进行编码，服务器在启用了 SYN Cookie 时只能为 <em>m</em> 发送八种不同的数值。</p>
<p>根据 TCP 规范，当客户端发回 TCP ACK 包给服务器以响应服务器的 SYN + ACK 包时，客户端必须使用由服务器发送的初始序号加1作为数据包中的确认号。服务器接着从确认号中减去 1 以便还原向客户端发送的原始 SYN Cookie。</p>
<p>接下来服务器进行以下检查：</p>
<ul>
<li>根据当前的时间以及 <strong>t</strong> 来检查连接是否过期。</li>
<li>重新计算 <strong>s</strong> 来确认这是不是一个有效的 SYN Cookie。</li>
<li>从 3 位编码中解码 <strong>m</strong>，以便之后用来重建 SYN 队列条目。在此之后，连接照常进行。</li>
</ul>
</blockquote>
<p><a href="https://zh.wikipedia.org/wiki/SYN_flood" target="_blank" rel="noopener noreferrer">SYN flood Wiki<ExternalLinkIcon/></a></p>
<h1 id="从浏览器输入域名到显示出网页的过程" tabindex="-1"><a class="header-anchor" href="#从浏览器输入域名到显示出网页的过程" aria-hidden="true">#</a> 从浏览器输入域名到显示出网页的过程</h1>
<ul>
<li>1、输入地址</li>
<li>2、浏览器查找域名的 IP 地址</li>
<li>3、浏览器向 web 服务器发送一个 HTTP 请求</li>
<li>4、服务器的永久重定向响应</li>
<li>6、服务器处理请求</li>
<li>7、服务器返回一个 HTTP 响应</li>
<li>8、浏览器显示 HTML</li>
<li>9、浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等</li>
</ul>
<blockquote>
<p>浏览器从输入网址到渲染页面主要分为以下几个过程</p>
<ul>
<li>URL 输入</li>
<li><a href="https://cloud.tencent.com/product/cns?from=10680" target="_blank" rel="noopener noreferrer">DNS 解析<ExternalLinkIcon/></a></li>
<li>建立 TCP 连接</li>
<li>发送 HTTP / HTTPS 请求（建立 TLS 连接）</li>
<li><a href="https://cloud.tencent.com/product/cvm?from=10680" target="_blank" rel="noopener noreferrer">服务器<ExternalLinkIcon/></a>响应请求</li>
<li>浏览器解析渲染页面</li>
<li>HTTP 请求结束，断开 TCP 连接</li>
</ul>
</blockquote>
<p>https://www.cnblogs.com/lepeCoder/p/15147895.html</p>
<p>https://zhuanlan.zhihu.com/p/133906695</p>
<h1 id="tcp" tabindex="-1"><a class="header-anchor" href="#tcp" aria-hidden="true">#</a> TCP</h1>
<h2 id="tcp-粘包问题" tabindex="-1"><a class="header-anchor" href="#tcp-粘包问题" aria-hidden="true">#</a> TCP 粘包问题</h2>
<p><strong>为什么会发生TCP粘包和拆包?</strong></p>
<p>① 发送方写入的数据大于套接字缓冲区的大小，此时将发生拆包。</p>
<p>② 发送方写入的数据小于套接字缓冲区大小，由于 TCP 默认使用 Nagle 算法，只有当收到一个确认后，才将分组发送给对端，当发送方收集了多个较小的分组，就会一起发送给对端，这将会发生粘包。</p>
<p>③ 进行 MSS （最大报文长度）大小的 TCP 分段，当 TCP 报文的数据部分大于 MSS 的时候将发生拆包。</p>
<p>④ 发送方发送的数据太快，接收方处理数据的速度赶不上发送端的速度，将发生粘包。</p>
<p><strong>常见解决方法</strong></p>
<p>① <strong>在消息的头部添加消息长度字段</strong>，服务端获取消息头的时候解析消息长度，然后向后读取相应长度的内容。</p>
<p>② 固定消息数据的长度，服务端每次读取既定长度的内容作为一条完整消息，当消息不够长时，空位补上固定字符。但是该方法会浪费网络资源。</p>
<p>③ <strong>设置消息边界，也可以理解为分隔符</strong>，服务端从数据流中按消息边界分离出消息内容，一般使用换行符。</p>
<blockquote>
<ol>
<li>
<p>单看传输层，TCP是「面向字节流」传输的，本身是没有「包」的概念的，接收方将接收的报文段（segment）的数据提取出来按序放置在缓存中。</p>
</li>
<li>
<p>但是从应用层的角度看是有「包」的概念的，例如http/1.1中采用了「管道(pipeline)」的思想，即可以多个http数据流「复用」同一个TCP，因此各个http数据流之间是「纠缠」的，那么就需要在应用层进行处理，「区分不同」的数据流，自然就需要处理「粘包」的问题。</p>
</li>
<li>
<p>个人认为TCP层没有「包」的概念反映了TCP层对应用层「多数据流」的支持较弱，这恰恰导致了粘包问题。而这种弱势也导致了HTTP/3转向了QUIC，也就是基于UDP，自行实现更好的「多数据流复用/分用」。</p>
</li>
</ol>
</blockquote>
</div></template>


