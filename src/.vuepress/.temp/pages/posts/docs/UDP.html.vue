<template><div><h1 id="tcp-和-udp-区别" tabindex="-1"><a class="header-anchor" href="#tcp-和-udp-区别" aria-hidden="true">#</a> TCP 和 UDP 区别</h1>
<ol>
<li>连接</li>
</ol>
<p>TCP 是⾯向连接的传输层协议，传输数据前先要建⽴连接。</p>
<p>UDP 是不需要连接，即刻传输数据。</p>
<ol start="2">
<li>
<p>服务对象
TCP 是⼀对⼀的两点服务，即⼀条连接只有两个端点。
UDP ⽀持⼀对⼀、⼀对多、多对多的交互通信</p>
</li>
<li>
<p>可靠性
TCP 是可靠交付数据的，数据可以⽆差错、不丢失、不重复、按需到达。
UDP 是尽最⼤努⼒交付，不保证可靠交付数据。</p>
</li>
<li>
<p>拥塞控制、流量控制</p>
<p>TCP 有拥塞控制和流量控制机制，保证数据传输的安全性。UDP 则没有，即使⽹络⾮常拥堵了，也不会影响 UDP 的发送速率。</p>
</li>
<li>
<p>⾸部开销</p>
<p>TCP ⾸部⻓度较⻓，会有⼀定的开销，⾸部在没有使⽤「选项」字段时是 20 个字节，如果使⽤了「选项」</p>
</li>
</ol>
<p>字段则会变⻓的。</p>
<p>UDP ⾸部只有 8 个字节，并且是固定不变的，开销较⼩。</p>
<ol start="6">
<li>
<p>传输⽅式</p>
<p>TCP 是流式传输，没有边界，但保证顺序和可靠。</p>
<p>UDP 是⼀个包⼀个包的发送，是有边界的，但可能会丢包和乱序。</p>
</li>
<li>
<p>分⽚不同</p>
<p><strong>TCP 的数据⼤⼩如果⼤于 MSS ⼤⼩，则会在传输层进⾏分⽚</strong>，<strong>⽬标主机收到后，也同样在传输层组装 TCP数据包</strong>，如果中途丢失了⼀个分⽚，只需要传输丢失的这个分⽚。</p>
<p><strong>UDP 的数据⼤⼩如果⼤于 MTU ⼤⼩，则会在 IP 层进⾏分⽚</strong>，<strong>⽬标主机收到后，在 IP 层组装完数据，接着</strong></p>
<p><strong>再传给传输层</strong>，但是如果中途丢了⼀个分⽚，在实现可靠传输的 UDP 时则就需要重传所有的数据包，这样</p>
<p>传输效率⾮常差，所以通常 UDP 的报⽂应该⼩于 MTU。</p>
</li>
</ol>
<h1 id="tcp-和-udp-应用场景" tabindex="-1"><a class="header-anchor" href="#tcp-和-udp-应用场景" aria-hidden="true">#</a> TCP 和 UDP 应⽤场景</h1>
<p>由于 TCP 是⾯向连接，能保证数据的可靠性交付，因此经常⽤于：</p>
<ol>
<li>FTP ⽂件传输</li>
<li>HTTP / HTTPS</li>
</ol>
<p>由于 UDP ⾯向⽆连接，它可以随时发送数据，再加上UDP本身的处理既简单⼜⾼效，因此经常⽤于：</p>
<ol>
<li>包总量较少的通信，如 DNS 、 SNMP 等</li>
<li>视频、⾳频等多媒体通信</li>
<li>⼴播通信</li>
</ol>
<h3 id="udp-为什么是不可靠的-bind-和-connect-对于-udp-的作用是什么" tabindex="-1"><a class="header-anchor" href="#udp-为什么是不可靠的-bind-和-connect-对于-udp-的作用是什么" aria-hidden="true">#</a> UDP 为什么是不可靠的？bind 和 connect 对于 UDP 的作用是什么</h3>
<p>UDP 只有一个 socket 接收缓冲区，没有 socket 发送缓冲区，即只要有数据就发，不管对方是否可以正确接收。而在对方的 socket 接收缓冲区满了之后，新来的数据报无法进入到 socket 接受缓冲区，此数据报就会被丢弃，因此 UDP 不能保证数据能够到达目的地，此外，UDP 也没有流量控制和重传机制，故UDP的数据传输是不可靠的。</p>
</div></template>


