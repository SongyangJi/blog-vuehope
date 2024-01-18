<template><div><h1 id="osi七层模型" tabindex="-1"><a class="header-anchor" href="#osi七层模型" aria-hidden="true">#</a> OSI七层模型</h1>
<img src="osi.png" alt="image.png" style="zoom:60%;" />
<p>OSI 模型全称为开放式通信系统互连参考模型，是国际标准化组织 ( ISO ) 提出的一个试图使各种计算机在世界范围内互连为网络的标准框架。</p>
<p>OSI 将计算机网络体系结构划分为七层，每一层实现各自的功能和协议，并完成与相邻层的接口通信。</p>
<p>OSI 的服务定义详细说明了各层所提供的服务。某一层的服务就是该层及其下各层的一种能力，它通过接口提供给更高一层。各层所提供的服务与这些服务是怎么实现的无关。</p>
<p><strong>协议讲的是同一层的之间的约定，服务是底层提供给高层的功能。</strong></p>
<ul>
<li><strong>应用层</strong></li>
</ul>
<p>应用层位于 OSI 参考模型的第七层，其作用是通过应用程序间的交互来完成特定的网络应用。该层协议定义了应用<strong>进程之间</strong>的交互规则，<strong>通过不同的应用层协议为不同的网络应用提供服务</strong>。</p>
<p>例如域名系统 <em>DNS</em>，支持万维网应用的 <em>HTTP</em> 协议，电子邮件系统采用的 <em>SMTP</em> 协议等。</p>
<p>在应用层交互的数据单元我们称之为报文。</p>
<ul>
<li><strong>表示层</strong></li>
</ul>
<p>表示层的作用是使通信的应用程序能够解释交换数据的含义，其位于 OSI 参考模型的第六层，向上为应用层提供服务，向下接收来自会话层的服务。</p>
<p>该层提供的服务主要包括<em>数据压缩，数据加密以及数据描述</em>。这使得应用程序不必担心在各台计算机中表示和存储的内部格式差异。</p>
<ul>
<li><strong>会话层</strong></li>
</ul>
<p>会话层就是负责建立、管理和终止表示层实体之间的通信会话。该层提供了<em>数据交换的定界和同步</em>功能，包括了<em>建立检查点和恢复方案</em>的方法。</p>
<ul>
<li><strong>传输层</strong></li>
</ul>
<p>传输层的主要任务是<strong>为两台主机进程之间的通信提供服务</strong>。</p>
<p>应用程序利用该服务传送应用层报文。该服务并不针对某一特定的应用，多种应用可以使用同一个传输层服务。由于一台主机可同时运行多个线程，因此传输层有复用和分用的功能。所谓复用就是指多个应用层进程可同时使用下面传输层的服务，分用和复用相反，是传输层把收到的信息分别交付上面应用层中的相应进程。</p>
<p>在传输层交互的数据单元我们称之为<em>段</em>。</p>
<ul>
<li><strong>网络层</strong></li>
</ul>
<p>两台计算机之间传送数据时其通信链路往往不止一条，所传输的信息甚至可能经过很多通信子网。</p>
<p><strong>网络层的主要任务就是选择合适的网间路由和交换节点，确保数据按时成功传送</strong>。在发送数据时，网络层把传输层产生的报文或用户数据报封装成分组和包向下传输到数据链路层。</p>
<p><strong>在网络层使用的协议是无连接的网际协议（Internet Protocol）和许多路由协议</strong>，因此我们通常把该层简单地称为 IP 层。</p>
<p>在网络层交互的数据单元我们称之为<em>包</em>。</p>
<ul>
<li><strong>数据链路层</strong></li>
</ul>
<p>数据链路层通常也叫做链路层，在物理层和网络层之间。两台主机之间的数据传输，总是在一段一段的链路上传送的，这就需要使用专门的链路层协议。</p>
<p>在两个相邻节点之间传送数据时，<strong>数据链路层将网络层交下来的 IP 数据报组装成帧</strong>，在两个相邻节点间的链路上传送帧。每一帧包括数据和必要的控制信息。通过控制信息我们可以知道一个帧的起止比特位置，此外，也能使接收端检测出所收到的帧有无差错，如果发现差错，数据链路层能够简单的丢弃掉这个帧，以避免继续占用网络资源。</p>
<p>在数据链路层交互的数据单元我们称之为<em>帧</em>。</p>
<ul>
<li><strong>物理层</strong></li>
</ul>
<p>作为 OSI 参考模型中最低的一层，<strong>物理层的作用是实现计算机节点之间比特流的透明传送</strong>，<strong>尽可能屏蔽掉具体传输介质和物理设备的差异</strong>。使其上面的数据链路层不必考虑网络的具体传输介质是什么。该层的主要任务是确定与传输媒体的接口的一些特性（机械特性、电气特性、功能特性，过程特性）。</p>
<p>在物理层交互的数据单元我们称之为<em>比特</em>。</p>
<h1 id="tcp-ip-参考模型" tabindex="-1"><a class="header-anchor" href="#tcp-ip-参考模型" aria-hidden="true">#</a> TCP/IP 参考模型</h1>
<p>OSI 七层模型在提出时的出发点是基于标准化的考虑，而没有考虑到具体的市场需求，使得该模型结构复杂，部分功能冗余，因而完全实现 OSI 参考模型的系统不多。</p>
<p><strong>TCP/IP 参考模型直接面向市场需求，实现起来也比较容易</strong>，因此在一经提出便得到了广泛的应用。基于 TCP/IP 的参考模型将协议分成四个层次，如上图所示，它们自下而上分别是：网络访问层、网际互联层、传输层、和应用层。</p>
<ul>
<li><strong>应用层</strong></li>
</ul>
<p>TCP/IP 模型将 OSI 参考模型中的<strong>会话层、表示层和应用层的功能合并到一个应用层实现</strong>，通过不同的应用层协议为不同的应用提供服务。例如：HTTP、FTP、Telnet、DNS、SMTP 等。</p>
<ul>
<li><strong>传输层</strong></li>
</ul>
<p>该层对应于 OSI 参考模型的传输层，为上层实体提供源端到对端主机的通信功能。</p>
<p>传输层定义了两个主要协议：传输控制协议（TCP）和用户数据报协议（UDP）。其中面向连接的 TCP 协议保证了数据的传输可靠性，面向无连接的 UDP 协议能够实现数据包简单、快速地传输。</p>
<ul>
<li><strong>网际互联层</strong></li>
</ul>
<p>网际互联层对应 OSI 参考模型的网络层，主要负责相同或不同网络中计算机之间的通信。</p>
<p>在网际互联层， <strong>IP 协议提供的是一个不可靠、无连接的数据报传递服务</strong>。</p>
<p><strong>IP协议本身是不可靠的，存在着丢包、延时、无序等问题。</strong></p>
<p>该协议实现两个基本功能：<strong>寻址和分段</strong>。根据数据报报头中的目的地址将数据传送到目的地址，在这个过程中 IP 负责选择传送路线。</p>
<p>除了 IP 协议外，该层另外两个主要协议是互联网组管理协议（IGMP）和互联网控制报文协议（ICMP）。</p>
<ul>
<li><strong>网络接入层</strong></li>
</ul>
<p><strong>网络接入层的功能对应于 OSI 参考模型中的物理层和数据链路层</strong>，它负责监视数据在主机和网络之间的交换。事实上，<strong>TCP/IP 并未真正描述这一层的实现</strong>，而由参与互连的各网络使用自己的物理层和数据链路层协议，然后与 TCP/IP 的网络接入层进行连接，因此具体的实现方法将随着网络类型的不同而有所差异。</p>
<p><strong>TCP/IP 五层参考模型</strong></p>
<p>五层体系的协议结构是综合了 OSI 和 TCP/IP 优点的一种协议，包括应用层、传输层、网络层、数据链路层和物理层。其中应用层对应 OSI 的上三层，下四层和 OSI 相同。五层协议的体系结构只是为介绍网络原理而设计的，实际应用还是 TCP/IP 四层体系结构。</p>
<p>在《计算机网络》一书中也是根据这个层次划分进行编排的。</p>
<h1 id="osi-模型和-tcp-ip-模型异同比较" tabindex="-1"><a class="header-anchor" href="#osi-模型和-tcp-ip-模型异同比较" aria-hidden="true">#</a> OSI 模型和 TCP/IP 模型异同比较</h1>
<h2 id="相同点" tabindex="-1"><a class="header-anchor" href="#相同点" aria-hidden="true">#</a> 相同点</h2>
<p>① OSI 参考模型与 TCP/IP 参考模型都采用了层次结构。</p>
<p>② 都能够提供<strong>面向连接</strong>和<strong>无连接</strong>两种通信服务机制。</p>
<p>无连接套接字传输效率高，但是不可靠，有丢失数据包，捣乱数据的风险
如果注重效率和实时性，就选择无连接套接字（UDP服务），比如DNS和即时聊天软件等。
有连接套接字非常可靠，万无一失，但是传输效率低，耗费资源多
如果对数据完整性的要求高，就选择有连接套接字（TCP服务），比如HTTP和FTP等。</p>
<h2 id="不同点" tabindex="-1"><a class="header-anchor" href="#不同点" aria-hidden="true">#</a> 不同点</h2>
<p>① OSI 采用的七层模型； TCP/IP 是四层结构。</p>
<p>② TCP/IP 参考模型没有对网络接口层进行细分，只是一些概念性的描述； OSI 参考模型对服务和协议做了明确的区分。</p>
<p>③ OSI 先有模型，后有协议规范，适合于描述各种网络；TCP/IP 是先有协议集然后建立模型，不适用于非 TCP/IP 网络。</p>
<p>④ TCP/IP 一开始就提出面向连接和无连接服务，而 OSI 一开始只强调面向连接服务，直到很晚才开始制定无连接的服务标准。</p>
<p>⑤ OSI 参考模型虽然被看好，但将网络划分为七层，实现起来较困难；相反，TCP/IP 参考模型虽然有许多不尽人意的地方，但作为一种简化的分层结构还是比较成功的。</p>
<h2 id="为什么-tcp-ip-去除了表示层和会话层" tabindex="-1"><a class="header-anchor" href="#为什么-tcp-ip-去除了表示层和会话层" aria-hidden="true">#</a> 为什么 TCP/IP 去除了表示层和会话层</h2>
<p>OSI 参考模型在提出时，他们的理想是非常好的，但实际上，由于会话层、表示层、应用层都是在应用程序内部实现的，最终产出的是一个应用数据包，而应用程序之间是几乎无法实现代码的抽象共享的，这也就造成 OSI 设想中的应用程序维度的分层是无法实现的，例如，我们几乎不会认为数据的压缩、加密算法算是一种协议，而会话的概念则更为抽象，难以用协议来进行描述，所以在后来的 TCP/IP 协议框架的设计中，便将表示层和会话层与应用层整合在一起，让整个过程更为清晰明了。</p>
<blockquote>
<p>三层都在应用程序内实现，程序间无法共享，合三为一；</p>
</blockquote>
<h2 id="数据如何在各层之间传输-数据的封装过程" tabindex="-1"><a class="header-anchor" href="#数据如何在各层之间传输-数据的封装过程" aria-hidden="true">#</a> 数据如何在各层之间传输（数据的封装过程）</h2>
<figure><img src="https://upload-images.jianshu.io/upload_images/16902285-d74d1c1b8d27e037.png?imageMogr2/auto-orient/strip|imageView2/2/w/684/format/webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>在发送主机端：</p>
<ol>
<li>
<p><strong>应用层</strong>向<strong>传输层</strong>传递应用层的报文：传输层收取到报文并附上附加信息，该首部将被接收端的传输层使用。应用层报文和传输层首部信息一道构成了传输层报文段。附加的信息可能包括：允许接收端传输层向上向适当的应用程序交付<strong>报文的信息</strong>以及<strong>差错检测位</strong>信息,该信息让接收端能够判断报文中的比特是否在途中已被改变。</p>
</li>
<li>
<p><strong>传输层</strong>向<strong>网络层</strong>传递该报文段：<strong>网络层增加了如源和目的端系统地址等网络层首部信息</strong>，生成了网络层数据报。</p>
</li>
<li>
<p><strong>网络层</strong>向<strong>链路层</strong>传递该分组，<strong>在数据链路层数据包添加发送端 MAC 地址和接收端 MAC 地址</strong>后被封装成数据帧。</p>
</li>
<li>
<p><strong>链路层</strong>向<strong>物理层</strong>传递帧：在物理层数据帧被封装成比特流，之后通过传输介质传送到对端。</p>
</li>
</ol>
<p><strong>应用数据报→传输层报文段→网络层成组→链路层成帧→物理层比特流</strong></p>
<h1 id="osi-和-tcp-ip-协议之间的对应关系" tabindex="-1"><a class="header-anchor" href="#osi-和-tcp-ip-协议之间的对应关系" aria-hidden="true">#</a> OSI 和 TCP/IP 协议之间的对应关系</h1>
<table>
<thead>
<tr>
<th>OSI 七层网络模型</th>
<th>TCP/IP 四层概念模型</th>
<th>对应的网络协议</th>
</tr>
</thead>
<tbody>
<tr>
<td>应用层（Application）</td>
<td>应用层</td>
<td>HTTP, TFTP, FTP, NFS, WAIS, SMTP, Telnet, DNS, SNMP</td>
</tr>
<tr>
<td>表示层（Presentation）</td>
<td>~</td>
<td>TIFF, GIF, JPEG, PICT</td>
</tr>
<tr>
<td>会话层（Session）</td>
<td>~</td>
<td>RPC, SQL, NFS, NetBIOS, names, AppleTalk</td>
</tr>
<tr>
<td>传输层（Transport）</td>
<td>传输层</td>
<td>TCP, UDP</td>
</tr>
<tr>
<td>网络层（Network）</td>
<td>网络层</td>
<td>IP, ICMP, ARP, RARP, RIP, IPX</td>
</tr>
<tr>
<td>数据链路层（Data Link）</td>
<td>数据链路层</td>
<td>FDDI, Frame Relay, HDLC, SLIP, PPP</td>
</tr>
<tr>
<td>物理层（Physical）</td>
<td>~</td>
<td>EIA/TIA-232, EIA/TIA-499, V.35, 802.3</td>
</tr>
</tbody>
</table>
<p>在TCP/IP模型中，ARP协议属于网络层；在OSI模型中，ARP协议属于链路层。</p>
<blockquote>
<p>其实在书上说在哪里都可以啊
ARP 其实是介于数据链路层和网络层之间的协议的。</p>
</blockquote>
</div></template>


