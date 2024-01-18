<template><div><p>系列文章</p>
<p><a href="https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/%E7%94%B1%E6%B5%85%E5%85%A5%E6%B7%B1%E5%90%83%E9%80%8F%20Docker-%E5%AE%8C" target="_blank" rel="noopener noreferrer">由浅入深吃透Docker<ExternalLinkIcon/></a></p>
<p>Docker 是<strong>一个用于开发、发布和运行应用程序的开放平台</strong>。Docker 使您能够<strong>将应用程序与基础架构分离</strong>，以便您可以快速交付软件。使用 Docker，您可以像管理应用程序一样管理基础设施。通过利用 Docker 快速交付、测试和部署代码的方法，您可以显着减少编写代码和在生产环境中运行之间的延迟。</p>
<h2 id="我可以使用-docker-做什么" tabindex="-1"><a class="header-anchor" href="#我可以使用-docker-做什么" aria-hidden="true">#</a> 我可以使用 Docker 做什么？</h2>
<ul>
<li><strong>快速、一致地交付您的应用程序</strong>
Docker 通过允许开发人员使用提供应用程序和服务的本地容器在标准化环境中工作来简化开发生命周期。</li>
</ul>
<p>也就是说，<strong>容器的概念非常适合持续集成和持续交付 (CI/CD) 工作流程。</strong></p>
<ul>
<li><strong>响应式部署和扩展</strong></li>
</ul>
<p>Docker 基于容器的平台允许高度可移植的工作负载。Docker 容器可以在开发人员的本地笔记本电脑、数据中心的物理或虚拟机、云提供商或混合环境中运行。</p>
<p>Docker 的可移植性和轻量级特性还使得动态管理工作负载、根据业务需求<strong>近乎实时地扩展或拆除应用程序和服务变得容易</strong>。</p>
<ul>
<li><strong>在相同硬件上运行更多工作负载</strong></li>
</ul>
<blockquote>
<p>Docker 是轻量级和快速的。它为基于管理程序的虚拟机提供了一种可行且经济高效的替代方案，因此您可以使用更多的计算容量来实现业务目标。Docker 非常适合高密度环境下需要用更少资源完成更多工作的中小型部署。</p>
</blockquote>
<p>也就是说，相比对docker更加可靠。</p>
<h2 id="docker-architecture" tabindex="-1"><a class="header-anchor" href="#docker-architecture" aria-hidden="true">#</a> Docker architecture</h2>
<p>Docker 使用客户端-服务器架构。Docker客户端与 Docker守护进程对话，后者负责构建、运行和分发 Docker 容器的繁重工作。Docker 客户端和守护程序可以在同一系统上运行，或者您可以将 Docker 客户端连接到远程 Docker 守护程序。Docker 客户端和守护程序使用 REST API，通过 UNIX 套接字或网络接口进行通信。另一个 Docker 客户端是 Docker Compose，它允许您使用由一组容器组成的应用程序。</p>
<figure><img src="@source/posts/architecture.svg" alt="Docker Architecture Diagram" tabindex="0" loading="lazy"><figcaption>Docker Architecture Diagram</figcaption></figure>
<h3 id="the-docker-daemon-docker-守护进程" tabindex="-1"><a class="header-anchor" href="#the-docker-daemon-docker-守护进程" aria-hidden="true">#</a> The Docker daemon（Docker 守护进程）</h3>
<p>Docker 守护程序 ( <code v-pre>dockerd</code>) 侦听 Docker API 请求并管理 Docker 对象，例如 images, containers, networks, and volumes（镜像、容器、网络和数据卷）。守护进程还可以与其他守护进程通信以管理 Docker 服务。</p>
<h3 id="the-docker-client" tabindex="-1"><a class="header-anchor" href="#the-docker-client" aria-hidden="true">#</a> The Docker client</h3>
<p>Docker 客户端 ( <code v-pre>docker</code>) 是许多 Docker 用户与 Docker 交互的主要方式。当您使用诸如<code v-pre>docker run</code>之类的命令时，客户端会将这些命令发送到<code v-pre>dockerd</code>执行它们。该<code v-pre>docker</code>命令使用 Docker API。Docker 客户端可以与多个守护进程通信。</p>
<h3 id="docker-desktop" tabindex="-1"><a class="header-anchor" href="#docker-desktop" aria-hidden="true">#</a> Docker Desktop</h3>
<p>Docker Desktop 是一个易于安装的应用程序，适用于您的 Mac 或 Windows 环境，使您能够构建和共享容器化应用程序和微服务。Docker Desktop 包括 Docker 守护程序 ( <code v-pre>dockerd</code>)、Docker 客户端 ( <code v-pre>docker</code>)、Docker Compose、Docker Content Trust、Kubernetes 和 Credential Helper。</p>
<h3 id="docker-registries-注册中心" tabindex="-1"><a class="header-anchor" href="#docker-registries-注册中心" aria-hidden="true">#</a> Docker registries（注册中心）</h3>
<p>Docker<em>注册中心</em>存储 Docker 镜像。</p>
<p>Docker Hub 是一个任何人都可以使用的公共注册中心，并且 Docker 默认配置为在 Docker Hub 上查找镜像。您甚至可以运行自己的私有注册中心。</p>
<p>当您使用<code v-pre>docker pull</code> or <code v-pre>docker run</code>命令时，将从您配置的注册中心中提取所需的镜像。</p>
<p>当您使用该<code v-pre>docker push</code>命令时，您的镜像会被推送到您配置的注册中心中。</p>
<h3 id="docker-objects" tabindex="-1"><a class="header-anchor" href="#docker-objects" aria-hidden="true">#</a> Docker objects</h3>
<h4 id="images-镜像" tabindex="-1"><a class="header-anchor" href="#images-镜像" aria-hidden="true">#</a> Images（镜像）</h4>
<p><em>镜像</em>是一个只读模板，其中包含创建 Docker 容器的指令。</p>
<p>通常，一个镜像基于另一个镜像，并带有一些额外的自定义。例如，您可以基于<code v-pre>ubuntu</code>映像构建一个自己的映像 ，而这个自定义的镜像安装了 Apache Web Server和自己的应用程序，以及使得应用程序运行所需的配置信息。</p>
<p>你可以创建自己的镜像，也可以只使用其他人创建并在注册中心中发布的镜像。</p>
<p>要构建您自己的镜像，你需要使用简单的语法创建一个<em>Dockerfile</em> ，这个docker file便是用于定义创建和运行镜像所需的步骤。</p>
<p>Dockerfile 中的每条指令都会在映像中创建一个层（layer）。当您更改 Dockerfile 并重建映像时，仅重建那些已更改的层。与其他虚拟化技术相比，这是使映像如此轻量、小巧和快速的部分原因。</p>
<h4 id="containers" tabindex="-1"><a class="header-anchor" href="#containers" aria-hidden="true">#</a> Containers</h4>
<p><em>容器</em>是镜像的可运行实例。</p>
<p>您可以<strong>使用 Docker API 或 CLI 创建、启动、停止、移动或删除（create, start, stop, move, or delete）容器</strong>。您可以将容器连接到一个或多个网络，将存储附加到它，甚至可以根据其当前状态创建新映像。</p>
<p>默认情况下，一个容器与其他容器及其主机的隔离相对较好。您可以控制容器的网络、存储或其他底层子系统与其他容器或主机的隔离程度。</p>
<p><strong>容器由其映像以及您在创建或启动它时提供给它的配置选项定义</strong>。</p>
<p>当容器被移除时，任何未存储在持久存储介质中的状态更改都会消失。</p>
<h5 id="示例docker-run命令" tabindex="-1"><a class="header-anchor" href="#示例docker-run命令" aria-hidden="true">#</a> 示例<code v-pre>docker run</code>命令</h5>
<p>以下命令运行一个<code v-pre>ubuntu</code>容器，以交互方式附加到您的本地命令行会话，然后运行<code v-pre>/bin/bash</code>.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> ubuntu /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当您运行此命令时，会发生以下情况（假设您使用的是默认注册中心配置）：</p>
<ol>
<li>如果您在本地没有<code v-pre>ubuntu</code>映像，Docker 会从您配置的注册中心中提取它，就像您<code v-pre>docker pull ubuntu</code>手动运行一样。</li>
<li>Docker 会创建一个新容器，就像您<code v-pre>docker container create</code> 手动运行命令一样。</li>
<li>Docker 为容器分配一个读写文件系统，作为它的最后一层。这允许正在运行的容器在其本地文件系统中创建或修改文件和目录。</li>
<li>Docker 创建了一个网络接口来将容器连接到默认网络，因为您没有指定任何网络选项（这是一个默认行为）。这包括为容器分配 IP 地址。默认情况下，容器可以使用主机的网络连接连接到外部网络。</li>
<li>Docker 启动容器并执行<code v-pre>/bin/bash</code>. 因为容器以交互方式运行并附加到您的终端（由于<code v-pre>-i</code>and<code v-pre>-t</code> 标志），您可以在输出记录到终端时使用键盘提供输入。</li>
<li>当您键入<code v-pre>exit</code>终止<code v-pre>/bin/bash</code>命令时，容器会停止但不会被删除。您可以重新启动或删除它。</li>
</ol>
<h2 id="底层技术" tabindex="-1"><a class="header-anchor" href="#底层技术" aria-hidden="true">#</a> 底层技术</h2>
<p>Docker 是用Go 编写的，并利用 Linux 内核的几个特性来提供其功能。Docker 使用一种称为<code v-pre>namespaces</code>的技术来提供隔离的工作空间（也就是所说的<em>容器</em>的概念）。当您运行容器时，Docker 会为该容器创建一组 <em>命名空间。</em></p>
<p>这些命名空间提供了一层隔离。容器的每个方面都在单独的命名空间中运行，并且它的访问权限仅限于该命名空间。</p>
<blockquote>
<p>参考</p>
<p>https://docs.docker.com/get-started/overview/</p>
</blockquote>
</div></template>


