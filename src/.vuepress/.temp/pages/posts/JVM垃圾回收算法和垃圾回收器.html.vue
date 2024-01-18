<template><div><h1 id="gc的基础知识" tabindex="-1"><a class="header-anchor" href="#gc的基础知识" aria-hidden="true">#</a> GC的基础知识</h1>
<h2 id="一、垃圾回收的区域" tabindex="-1"><a class="header-anchor" href="#一、垃圾回收的区域" aria-hidden="true">#</a> 一、垃圾回收的区域</h2>
<ul>
<li>栈：栈中的生命周期是跟随线程，所以一般不需要关注。</li>
<li>堆：堆中的对象是垃圾回收的重点。</li>
<li>方法区：这一块也会发生垃圾回收，不过这块的效率比较低，一般不是我们关注的重点。</li>
</ul>
<h2 id="二、怎么判断对象的存活" tabindex="-1"><a class="header-anchor" href="#二、怎么判断对象的存活" aria-hidden="true">#</a> 二、怎么判断对象的存活</h2>
<p>一般有两种方式（引用计数法、可达性分析），<strong>JVM使用的是可达性分析</strong>。</p>
<h3 id="_1-引用计数法" tabindex="-1"><a class="header-anchor" href="#_1-引用计数法" aria-hidden="true">#</a> 1. 引用计数法</h3>
<p>给对象添加一个引用计数器，当对象增加一个引用时计数器加 1，引用失效时计数器减 1。引用计数为 0 的对象可被回收（Python 在用，但主流虚拟机没有使用）。</p>
<ul>
<li>优点：快，方便，实现简单。</li>
<li>缺陷：对象相互引用时（A.instance=B 同时 B.instance=A），很难判断对象是否该回收。</li>
</ul>
<h3 id="_2-可达性分析" tabindex="-1"><a class="header-anchor" href="#_2-可达性分析" aria-hidden="true">#</a> 2. 可达性分析</h3>
<p>来判定对象是否存活的。这个算法的基本思路就是通过一系列的称为“GC Roots”的对象作为起始点，从这些节点开始向下搜索，搜索所走过的路径称为引用链（Reference Chain），当一个对象到 GC Roots 没有任何引用链相连时，则证明此对象是不可用的。</p>
<p>作为 GC Roots 的对象包括下面几种：</p>
<ul>
<li>虚拟机栈（栈帧中的本地变量表）中引用的对象；</li>
<li>方法区中类静态属性引用的对象；</li>
<li>方法区中常量引用的对象；</li>
<li>本地方法栈中JNI（即一般说的Native方法）引用的对象；</li>
</ul>
<h2 id="三、-垃圾回收算法" tabindex="-1"><a class="header-anchor" href="#三、-垃圾回收算法" aria-hidden="true">#</a> 三、 垃圾回收算法</h2>
<p>本节具体介绍一下各种垃圾回收算法的思想：</p>
<h3 id="_1-标记-清除算法" tabindex="-1"><a class="header-anchor" href="#_1-标记-清除算法" aria-hidden="true">#</a> 1. 标记-清除算法</h3>
<p>标记-清除算法对<strong>根集合</strong>进行扫描，对<strong>存活</strong>的对象进行标记。标记完成后，再对整个空间内<strong>未被标记</strong>的对象扫描，进行回收。</p>
<ul>
<li>
<p><strong>优点</strong>：</p>
<p><strong>实现简单，不需要进行对象进行移动</strong>。</p>
</li>
<li>
<p><strong>缺点</strong>：</p>
<p>标记、清除过程效率低，<strong>产生大量不连续的内存碎片</strong>，提高了垃圾回收的频率。</p>
</li>
</ul>
<figure><img src="@source/posts/mark-sweep.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-标记-复制算法" tabindex="-1"><a class="header-anchor" href="#_2-标记-复制算法" aria-hidden="true">#</a> 2. 标记-复制算法</h3>
<p>这种收集算法解决了标记清除算法存在的效率问题。它将内存区域划分成相同的两个<strong>内存块</strong>。每次仅使用一半的空间，<code v-pre>JVM</code>生成的新对象放在一半空间中。当一半空间用完时进行<code v-pre>GC</code>，把可到达对象复制到另一半空间，然后把使用过的内存空间一次清理掉。</p>
<ul>
<li>
<p><strong>优点</strong>：</p>
<p>按顺序分配内存即可，实现简单、运行高效，不用考虑内存碎片。</p>
</li>
<li>
<p><strong>缺点</strong>：</p>
<p><strong>可用的内存大小缩小为原来的一半</strong>，<strong>对象存活率高时会频繁进行复制</strong>。</p>
</li>
</ul>
<figure><img src="@source/posts/gc-copy.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-标记-整理算法" tabindex="-1"><a class="header-anchor" href="#_3-标记-整理算法" aria-hidden="true">#</a> 3. 标记-整理算法</h3>
<p><strong>标记-整理算法</strong> 采用和 <strong>标记-清除算法</strong> 一样的方式进行对象的标记，但后续不直接对可回收对象进行清理，而是将所有的<strong>存活对象</strong>往一端<strong>空闲空间</strong>移动，然后清理掉端边界以外的内存空间。</p>
<ul>
<li>
<p><strong>优点</strong>：</p>
<p><strong>解决了标记-清理算法存在的内存碎片问题</strong>。</p>
</li>
<li>
<p><strong>缺点</strong>：</p>
<p>仍<strong>需要进行局部对象移动，一定程度上降低了效率</strong>。</p>
<figure><img src="@source/posts/mark-compact.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
</ul>
<h3 id="_4-分代收集技术" tabindex="-1"><a class="header-anchor" href="#_4-分代收集技术" aria-hidden="true">#</a> 4. 分代收集技术</h3>
<h4 id="基本术语" tabindex="-1"><a class="header-anchor" href="#基本术语" aria-hidden="true">#</a> 基本术语</h4>
<ul>
<li>部分收集（Partial GC）指目标不是完整收集整个Java堆的垃圾收集，其中可以分为：</li>
<li>
<ul>
<li>新生代收集（Minor GC/Young GC）: 指目标只是新生代的垃圾收集；</li>
<li>老年代收集（Major GC/Old GC）: 指目标只是老年代的垃圾收集。注意这个名词可能有歧义，有的也指整堆收集。</li>
<li>混合收集（Mixed GC）：指目标是收集整个新生代以及部分老年代的来及收集。目前只有G1收集器有这种行为。</li>
</ul>
</li>
<li>整堆收集（Full GC）：收集整个Java堆和方法区的垃圾收集。</li>
</ul>
<p>当前商业虚拟机都采用<strong>分代收集</strong>的垃圾收集算法。分代收集算法，顾名思义是根据对象的<strong>存活周期</strong>将内存划分为几块。一般包括<strong>年轻代</strong>、<strong>老年代</strong> 和 <strong>永久代</strong>，如图所示：</p>
<figure><img src="@source/posts/gc-generation.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<blockquote>
<p>上图中的 永久（Permanent）代在 JDK8之后便被取消。</p>
</blockquote>
<h4 id="新生代-young-generation" tabindex="-1"><a class="header-anchor" href="#新生代-young-generation" aria-hidden="true">#</a> 新生代（Young generation）</h4>
<p>绝大多数最新被创建的对象会被分配到这里，由于<strong>大部分对象</strong>在创建后会很快变得<strong>不可达</strong>，所以很多对象被创建在<strong>新生代</strong>，然后<strong>消失</strong>。对象从这个区域消失的过程我们称之为 <code v-pre>minor GC</code>。</p>
<p><strong>新生代</strong> 中存在一个<code v-pre>Eden</code>区和两个<code v-pre>Survivor</code>区（Survivor 区里面分为 from 和 to 区），每次只使用Eden和其中的一块Survivor区。新对象会首先分配在<code v-pre>Eden</code>中（<strong>如果新对象过大，会直接分配在老年代</strong>中）。在<code v-pre>GC</code>中，<code v-pre>Eden</code>中的对象会被移动到<code v-pre>Survivor</code>中，直至对象满足一定的年纪（定义为熬过<code v-pre>GC</code>的次数），会被移动到<strong>老年代</strong>。</p>
<p>可以设置<strong>新生代</strong>和<strong>老年代</strong>的相对大小。这种方式的优点是新生代大小会随着整个<strong>堆</strong>大小<strong>动态扩展</strong>。参数 <code v-pre>-XX:NewRatio</code> 设置<strong>老年代</strong>与<strong>新生代</strong>的比例。例如 <code v-pre>-XX:NewRatio=8</code> 指定 <strong>老年代/新生代</strong> 为<code v-pre>8/1</code>. <strong>老年代</strong> 占堆大小的 <code v-pre>7/8</code> ，<strong>新生代</strong> 占堆大小的 <code v-pre>1/8</code>（默认即是 <code v-pre>1/8</code>）。</p>
<p><strong>当Eden区满了的时候，会触发Young GC。</strong></p>
<h4 id="老年代-old-generation" tabindex="-1"><a class="header-anchor" href="#老年代-old-generation" aria-hidden="true">#</a> 老年代（Old generation）</h4>
<p>对象没有变得不可达，并且从新生代中<strong>存活</strong>下来，会被<strong>拷贝</strong>到这里。其所占用的空间要比新生代多。也正由于其相对<strong>较大的空间</strong>，发生在<strong>老年代</strong>上的<code v-pre>GC</code>要比<strong>新生代</strong>要<strong>少得多</strong>。对象从<strong>老年代</strong>中消失的过程，可以称之为<code v-pre>major GC</code>（或者<code v-pre>full GC</code>）。</p>
<p><code v-pre>JDK8</code>堆内存一般是划分为<strong>年轻代</strong>和<strong>老年代</strong>，<strong>不同年代</strong> 根据自身特性采用<strong>不同的垃圾收集算法</strong>。</p>
<p>对于<strong>新生代</strong>，每次<code v-pre>GC</code>时都有<strong>大量</strong>的对象死亡，只有<strong>少量</strong>对象存活。考虑到复制成本低，适合采用<strong>复制算法</strong>。因此有了<code v-pre>From Survivor</code>和<code v-pre>To Survivor</code>区域。</p>
<p>对于<strong>老年代</strong>，因为对象<strong>存活率高</strong>，没有额外的内存空间对它进行担保。因而适合采用<strong>标记-清除算法</strong>和<strong>标记-整理算法</strong>进行回收。</p>
<h1 id="垃圾回收器" tabindex="-1"><a class="header-anchor" href="#垃圾回收器" aria-hidden="true">#</a> 垃圾回收器</h1>
<p>Jvm 垃圾回收器把上面的三种算法全部用到了，采用分代收集。</p>
<h2 id="新生代-复制算法。" tabindex="-1"><a class="header-anchor" href="#新生代-复制算法。" aria-hidden="true">#</a> 新生代：复制算法。</h2>
<table>
<thead>
<tr>
<th>收集器</th>
<th>收集对象和算法</th>
<th>收集器类型</th>
</tr>
</thead>
<tbody>
<tr>
<td>Serial</td>
<td>新生代，<strong>标记复制算法</strong></td>
<td>单线程</td>
</tr>
<tr>
<td>ParNew</td>
<td>新生代，<strong>标记复制算法</strong></td>
<td>并行的多线程收集器</td>
</tr>
<tr>
<td>Parallel Scavenge</td>
<td>新生代，<strong>标记复制算法</strong></td>
<td>并行的多线程收集器</td>
</tr>
</tbody>
</table>
<h2 id="老年代-标记清除算法和标记整理算法" tabindex="-1"><a class="header-anchor" href="#老年代-标记清除算法和标记整理算法" aria-hidden="true">#</a> 老年代：标记清除算法和标记整理算法</h2>
<table>
<thead>
<tr>
<th>收集器</th>
<th>收集对象和算法</th>
<th>收集器类型</th>
</tr>
</thead>
<tbody>
<tr>
<td>Serial Old</td>
<td>老年代，标记整理算法</td>
<td>单线程</td>
</tr>
<tr>
<td>Parallel Old</td>
<td>老年代，标记整理算法</td>
<td>并行的多线程收集器</td>
</tr>
<tr>
<td>CMS（Concurrent Mark Sweep ）</td>
<td>老年代，<strong>标记清除算法</strong></td>
<td>并行和并发收集器</td>
</tr>
<tr>
<td>G1（Garbage First）</td>
<td>跨新生代和老年代，复制算法 + 标记整理算法</td>
<td>并行和并发收集器</td>
</tr>
</tbody>
</table>
<figure><img src="@source/posts/gc-machines.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>注：</strong></p>
<ul>
<li><strong>并行：垃圾收集的多线程的同时进行</strong>。</li>
<li><strong>并发：垃圾收集的多线程和用户应用的多线程同时进行</strong>。</li>
<li>使用 <code v-pre>jps -v</code> 可以看到使用的垃圾收集器，例如：<code v-pre>-XX:+UseConcMarkSweepGC</code> （CMS）</li>
</ul>
<h2 id="serial-serial-old" tabindex="-1"><a class="header-anchor" href="#serial-serial-old" aria-hidden="true">#</a> Serial/Serial Old</h2>
<p>最古老的，单线程，独占式，成熟，适合单 CPU 服务器。<code v-pre>-XX:+UseSerialGC</code> 新生代和老年代都用串行收集器。</p>
<h2 id="parnew" tabindex="-1"><a class="header-anchor" href="#parnew" aria-hidden="true">#</a> ParNew</h2>
<p>ParNew 和 Serial 基本没区别，唯一的区别：多线程，多 CPU 的，停顿时间比 Serial 少 。</p>
<p><code v-pre>-XX:+UseParNewGC</code>新生代使用 ParNew，老年代使用 Serial Old 。</p>
<p>可以和CMS搭配使用。</p>
<h2 id="parallel-scavenge-parallergc-parallel-old" tabindex="-1"><a class="header-anchor" href="#parallel-scavenge-parallergc-parallel-old" aria-hidden="true">#</a> Parallel Scavenge（ParallerGC）/Parallel Old</h2>
<p><strong>关注吞吐量的垃圾收集器</strong>，<strong>高吞吐量则可以高效率地利用 CPU 时间</strong>（但对响应时间有负面影响），尽快完成程序的运算任务，主要适合在后台运算而不需要太多交互的任务。所谓吞吐量就是 CPU 用于运行用户代码的时间与 CPU 总消耗时间的比值，即吞吐量=运行用户代码时间/（运行用户代码时间+垃圾收集时间）</p>
<h2 id="cms-concurrent-mark-sweep" tabindex="-1"><a class="header-anchor" href="#cms-concurrent-mark-sweep" aria-hidden="true">#</a> CMS（Concurrent Mark Sweep）</h2>
<p>CMS收集器是一种<strong>以获取最短回收停顿时间为目标</strong>的收集器。目前很大一部分的 Java 应用集中在互联网站或者 B/S 系统的服务端上，这类应用尤其<strong>重视服务的响应速度，希望系统停顿时间最短</strong>，以给用户带来较好的体验。</p>
<p>CMS 收集器就非常符合这类应用的需求。<code v-pre>-XX:+UseConcMarkSweepGC</code> ，<strong>一般新生代使用 ParNew，老年代的用 CMS</strong>，从名字（包含“Mark Sweep”）上就可以看出，CMS 收集器是基于“标记—清除”算法实现的，它的运作过程相对于前面几种收集器来说更复杂一些。</p>
<h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h3>
<figure><img src="@source/posts/gc-cms.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>整个过程分为 4 个步骤，包括：</p>
<p>1、<strong>初始标记</strong>：仅仅只是标记一下 <strong>GC Roots 能直接关联到的对象</strong>，速度很快，需要停顿（STW -Stop the world）。（需要 STW）</p>
<p>2、<strong>并发标记</strong>：从 GC Root 开始对堆中对象进行可达性分析，找到存活对象，它在整个回收过程中耗时最长，不需要停顿。（无需STW）</p>
<p>3、<strong>重新标记</strong>：<strong>为了修正并发标记期间因用户程序继续运作而导致标记产生变动的那一部分对象的标记记录，</strong>。这个阶段的停顿时间一般会比初始标记阶段稍长一些，但远比并发标记的时间短。(因为用户在并发标记阶段对对象做的修改相对来讲是比较少的)。（需要STW)</p>
<ol start="4">
<li><strong>并发清除</strong>：（无需STW）</li>
</ol>
<blockquote>
<p><strong>Stop The World</strong></p>
<p>Java中Stop-The-World机制简称STW，是在执行垃圾收集算法时，Java应用程序的其他所有线程都被挂起（除了垃圾收集帮助器之外）。Java中一种全局暂停现象，全局停顿，所有Java代码停止，native代码可以执行，但不能与JVM交互。</p>
</blockquote>
<h3 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h3>
<ol>
<li>优点</li>
</ol>
<p>由于整个过程中耗时最长的并发标记和并发清除过程收集器线程都可以与用户线程一起工作，所以，从<strong>总体上来说，CMS 收集器的内存回收过程是与用户线程一起并发执行的</strong>。</p>
<ol start="2">
<li>缺点</li>
</ol>
<ul>
<li><strong>CPU 资源敏感</strong>：因为并发阶段多线程占据 CPU 资源，如果 CPU 资源不足，效率会明显降低。</li>
<li><strong>会产生内存碎片</strong>：<strong>标记-清除算法</strong> 会导致产生不连续的内存碎片。</li>
<li>由于 CMS <strong>并发清理阶段</strong> 用户线程还在运行着，伴随程序运行自然就还会有新的垃圾不断产生，这一部分垃圾出现在标记过程之后，CMS 无法在当次收集中处理掉它们，只好留待下一次 GC 时再清理掉。这一部分垃圾就称为 <strong>浮动垃圾</strong>。</li>
<li>由于浮动垃圾的存在，因此需要预留出一部分内存，意味着 CMS 收集不能像其它收集器那样等待老年代快满的时候再回收。在 1.6 的版本中老年代空间使用率阈值(92%)，如果预留的内存不够存放浮动垃圾，就会出现 Concurrent Mode Failure，这时虚拟机将临时启用 Serial Old 来替代 CMS。</li>
</ul>
<h2 id="g1" tabindex="-1"><a class="header-anchor" href="#g1" aria-hidden="true">#</a> G1</h2>
<p><strong>G1相比较CMS的改进</strong></p>
<ul>
<li><strong>基于标记-整理算法, 不会产生空间碎片</strong>，分配大对象时不会无法得到连续的空间而提前触发一次full gc 。</li>
<li><strong>停顿时间相对可控</strong>： G1可以通过设置预期停顿时间（Pause time）来控制垃圾收集时间，但是<strong>这个预期停顿时间G1只能尽量做到，而不是一定能做到</strong>。</li>
</ul>
<p>G1 收集器之所以能建立可预测的停顿时间模型，是因为它可以<strong>有计划地避免在整个 Java 堆中进行全区域的垃圾收集</strong>。</p>
<p>G1 跟踪各个 Region 里面的垃圾堆积的价值大小（回收所获得的空间大小以及回收所需时间的经验值），<strong>在后台维护一个优先列表</strong>，<strong>每次根据允许的收集时间，优先回收价值最大的 Region</strong>（这也就是 <strong>Garbage-First</strong> 名称的来由）。</p>
<p><strong>这种使用 Region 划分内存空间以及有优先级的区域回收方式</strong>，<strong>保证了 G1 收集器在有限的时间内可以获取尽可高的收集效率</strong>。</p>
<h3 id="region如何划分" tabindex="-1"><a class="header-anchor" href="#region如何划分" aria-hidden="true">#</a> Region如何划分</h3>
<p>G1 把堆划分成多个大小相等的 <strong>独立区域</strong>（Region），<strong>新生代和老年代不再物理隔离</strong>。</p>
<p>G1 算法将堆划分为若干个独立区域（Region），它仍然属于分代收集器。</p>
<p>不过，这些区域的一部分包含新生代，<strong>新生代的垃圾收集依然采用暂停所有应用线程的方式，将存活对象拷贝到老年代或者 Survivor 空间</strong>。</p>
<p>例如其中一个独立区域如图：</p>
<figure><img src="@source/posts/g1-region.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="步骤-1" tabindex="-1"><a class="header-anchor" href="#步骤-1" aria-hidden="true">#</a> 步骤</h3>
<figure><img src="@source/posts/gc-g1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>大致分为4个步骤：</p>
<ol>
<li><strong>初始标记</strong>：仅仅只是标记一下 GC Roots 能直接关联到的对象，并且修改 TAMS（Nest Top Mark Start）的值，让下一阶段用户程序并发运行时，能在正确可以的 Region 中创建对象，此阶段需要停顿线程(STW)，但耗时很短。</li>
<li><strong>并发标记</strong>：从 GC Root 开始对堆中对象进行可达性分析，找到存活对象，此阶段耗时较长，但可与用户程序并发执行。</li>
<li><strong>最终标记</strong>：<strong>为了修正在并发标记期间因用户程序继续运作而导致标记产生变动的那一部分标记记录</strong>，虚拟机将这段时间对象变化记录在线程的 <code v-pre>Remembered Set Logs</code> 里面，最终标记阶段需要把 Remembered Set Logs 的数据合并到 Remembered Set 中。这阶段需要停顿线程(STW)，但是可并行执行。</li>
<li><strong>筛选回收</strong>：<strong>首先对各个 Region 中的回收价值和成本进行排序，根据用户所期望的 GC 停顿时间来制定回收计划</strong>。此阶段其实也可以做到与用户程序一起并发执行，但是因为只回收一部分 Region，时间是用户可控制的，而且停顿用户线程将大幅度提高收集效率。</li>
</ol>
<p>G1 从整体来看是基于<strong>标记整理</strong>算法实现的收集器，从局部（两个Region之间）上来看是基于复制算法实现的。</p>
<h2 id="垃圾回收器的一些重要参数" tabindex="-1"><a class="header-anchor" href="#垃圾回收器的一些重要参数" aria-hidden="true">#</a> 垃圾回收器的一些重要参数</h2>
<p>使用<code v-pre>java -XX:+PrintCommandLineFlags -version</code>查看关于垃圾收集器的一些信息。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token parameter variable">-XX:InitialHeapSize</span><span class="token operator">=</span><span class="token number">268435456</span> <span class="token parameter variable">-XX:MaxHeapSize</span><span class="token operator">=</span><span class="token number">4294967296</span> <span class="token parameter variable">-XX:+PrintCommandLineFlags</span> <span class="token parameter variable">-XX:+UseCompressedClassPointers</span> <span class="token parameter variable">-XX:+UseCompressedOops</span> <span class="token parameter variable">-XX:+UseParallelGC</span>
<span class="token function">java</span> version <span class="token string">"1.8.0_281"</span>
Java<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> SE Runtime Environment <span class="token punctuation">(</span>build <span class="token number">1.8</span>.0_281-b09<span class="token punctuation">)</span>
Java HotSpot<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> <span class="token number">64</span>-Bit Server VM <span class="token punctuation">(</span>build <span class="token number">25.281</span>-b09, mixed mode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>UseSerialGC</td>
<td>虚拟机运行在 Client 模式下的默认值，打开此开关后，使用 Serial+Serial Old 的收集器组合进行内存回收</td>
</tr>
<tr>
<td>UseParNewGC</td>
<td>打开此开关后，使用 ParNew + Serial Old 的收集器组合进行内存回收</td>
</tr>
<tr>
<td>UseConcMarkSweepGC</td>
<td>打开此开关后，使用 ParNew + CMS + Serial Old 的收集器组合进行内存回收。Serial Old 收集器将作为 CMS 收集器出现 Concurrent Mode Failure 失败后的后备收集器使用</td>
</tr>
<tr>
<td><strong>UseParallelGC</strong></td>
<td><strong>虚拟机运行在 Server 模式下的默认值</strong>，打开此开关后，使用 <strong>Parallel Scavenge + Serial Old(PS MarkSweep)</strong> 的收集器组合进行内存回收</td>
</tr>
<tr>
<td>UseParallelOldGC</td>
<td>打开此开关后，使用 Parallel Scavenge + Parallel Old 的收集器组合进行内存回收</td>
</tr>
<tr>
<td>SurvivorRatio</td>
<td>新生代中 Eden 区域与 Survivor 区域的容量比值，默认为 8，代表 Eden : Survivor = 8 : 1</td>
</tr>
<tr>
<td>PretenureSizeThreshold</td>
<td>直接晋升到老年代的对象大小，设置这个参数后，大于这个参数的对象将直接在老年代分配</td>
</tr>
<tr>
<td>MaxTenuringThreshold</td>
<td>晋升到老年代的对象年龄，每个对象在坚持过一次 Minor GC 之后，年龄就增加 1，当超过这个参数值时就进入老年代</td>
</tr>
<tr>
<td>UseAdaptiveSizePolicy</td>
<td>动态调整 Java 堆中各个区域的大小以及进入老年代的年龄</td>
</tr>
<tr>
<td>HandlePromotionFailure</td>
<td>是否允许分配担保失败，即老年代的剩余空间不足以应付新生代的整个 Eden 和 Survivor 区的所有对象都存活的极端情况</td>
</tr>
<tr>
<td>ParallelGCThreads</td>
<td>设置并行 GC 时进行内存回收的线程数</td>
</tr>
<tr>
<td>GCTimeRatio GC</td>
<td>时间占总时间的比率，默认值为 99，即允许 1% 的 GC 时间，仅在使用 Parallel Scavenge 收集器生效</td>
</tr>
<tr>
<td>MaxGCPauseMillis</td>
<td>设置 GC 的最大停顿时间，仅在使用 Parallel Scavenge 收集器时生效</td>
</tr>
<tr>
<td>CMSInitiatingOccupancyFraction</td>
<td>设置 CMS 收集器在老年代空间被使用多少后触发垃圾收集，默认值为 68%，仅在使用 CMS 收集器时生效</td>
</tr>
<tr>
<td>UseCMSCompactAtFullCollection</td>
<td>设置 CMS 收集器在完成垃圾收集后是否要进行一次内存碎片整理，仅在使用 CMS 收集器时生效</td>
</tr>
<tr>
<td>CMSFullGCsBeforeCompaction</td>
<td>设置 CMS 收集器在进行若干次垃圾收集后再启动一次内存碎片整理，仅在使用 CMS 收集器时生效</td>
</tr>
</tbody>
</table>
<blockquote>
<p><a href="https://juejin.cn/post/6844904148404535309" target="_blank" rel="noopener noreferrer">JVM垃圾回收算法和垃圾回收器<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/6844903639794843656" target="_blank" rel="noopener noreferrer">JVM系列(五) - JVM垃圾回收算法<ExternalLinkIcon/></a></p>
<p><a href="https://cloud.tencent.com/developer/article/1582661" target="_blank" rel="noopener noreferrer">Full GC 和 Minor GC，傻傻分不清楚<ExternalLinkIcon/></a></p>
</blockquote>
<h1 id="fullgc" tabindex="-1"><a class="header-anchor" href="#fullgc" aria-hidden="true">#</a> FullGC</h1>
<h2 id="什么时候会触发fullgc" tabindex="-1"><a class="header-anchor" href="#什么时候会触发fullgc" aria-hidden="true">#</a> 什么时候会触发FullGC</h2>
<h3 id="system-gc-方法的调用" tabindex="-1"><a class="header-anchor" href="#system-gc-方法的调用" aria-hidden="true">#</a> System.gc()方法的调用</h3>
<p>此方法的调用是建议JVM进行Full GC,虽然只是建议而非一定,但很多情况下它会触发 Full GC,从而增加Full GC的频率,也即增加了间歇性停顿的次数。强烈影响系建议能不使用此方法就别使用，让虚拟机自己去管理它的内存，可通过通过<code v-pre>-XX:+ DisableExplicitGC</code>来禁止RMI调用System.gc。</p>
<h3 id="metaspace区内存达到阈值" tabindex="-1"><a class="header-anchor" href="#metaspace区内存达到阈值" aria-hidden="true">#</a> Metaspace区内存达到阈值</h3>
<p>从JDK8开始，永久代(PermGen)的概念被废弃掉了，取而代之的是一个称为Metaspace的存储空间。Metaspace使用的是本地内存，而不是堆内存，也就是说在默认情况下Metaspace的大小只与本地内存大小有关。-XX:MetaspaceSize=21810376B（约为20.8MB）超过这个值就会引发Full GC，这个值不是固定的，是会随着JVM的运行进行动态调整的，与此相关的参数还有多个，详细情况请参考<a href="https://blog.csdn.net/bolg_hero/article/details/78189621" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a></p>
<h3 id="老年代空间不足" tabindex="-1"><a class="header-anchor" href="#老年代空间不足" aria-hidden="true">#</a> 老年代空间不足</h3>
<blockquote>
<p><strong>Survivor区域对象晋升到老年代有两种情况</strong>：</p>
<p>一种是给每个对象定义一个对象计数器，如果对象在Eden区域出生，并且经过了第一次GC，那么就将他的年龄设置为1，在Survivor区域的对象每熬过一次GC，年龄计数器加一，等到到达默认值15时，就会被移动到老年代中，默认值可以通过-XX:MaxTenuringThreshold来设置。
另外一种情况是如果JVM发现Survivor区域中的相同年龄的对象占到所有对象的一半以上时，就会将大于这个年龄的对象移动到老年代，在这批对象在统计后发现可以晋升到老年代，但是发现老年代没有足够的空间来放置这些对象，这就会引起Full GC。</p>
</blockquote>
<p>老年代空间只有在<strong>新生代对象转入</strong>及<strong>创建大对象、大数组</strong>时才会出现不足的现象，</p>
<p>当执行Full GC后空间仍然不足，则抛出如下错误：<code v-pre>java.lang.OutOfMemoryError: Java heap space</code>
为避免以上两种状况引起的Full GC，调优时应尽量做到让对象在Minor GC阶段被回收、让对象在新生代多存活一段时间及不要创建过大的对象及数组。</p>
<h3 id="堆中分配很大的对象" tabindex="-1"><a class="header-anchor" href="#堆中分配很大的对象" aria-hidden="true">#</a> 堆中分配很大的对象</h3>
<p>这个参数可以通过<code v-pre>-XX:PretenureSizeThreshold</code>进行设定，大对象或者长期存活的对象进入老年代，典型的大对象就是很长的字符串或者数组，它们在被创建后会直接进入老年代，虽然可能新生代中的Eden区域可以放置这个对象，在要放置的时候JVM如果发现老年代的空间不足时，会触发GC。</p>
<p>所谓大对象，是指需要大量连续内存空间的java对象，例如很长的数组，<strong>此种对象会直接进入老年代，而老年代虽然有很大的剩余空间，但是无法找到足够大的连续空间来分配给当前对象</strong>，此种情况就会触发JVM进行Full GC。</p>
<p>为了解决这个问题，CMS垃圾收集器提供了一个可配置的参数，即-XX:+UseCMSCompactAtFullCollection开关参数，用于在“享受”完Full GC服务之后额外免费赠送一个碎片整理的过程，<strong>内存整理的过程无法并发的，空间碎片问题没有了，但提顿时间不得不变长了</strong>，JVM设计者们还提供了另外一个参数 -XX:CMSFullGCsBeforeCompaction,这个参数用于设置在执行多少次不压缩的Full GC后,跟着来一次带压缩的。</p>
<h3 id="统计得到的minor-gc晋升到旧生代的平均大小大于老年代的剩余空间" tabindex="-1"><a class="header-anchor" href="#统计得到的minor-gc晋升到旧生代的平均大小大于老年代的剩余空间" aria-hidden="true">#</a> 统计得到的Minor GC晋升到旧生代的平均大小大于老年代的剩余空间</h3>
<p>这是一个较为复杂的触发情况，Hotspot<strong>为了避免由于新生代对象晋升到旧生代导致旧生代空间不足的现象</strong>，在进行Minor GC时，做了一个判断，<strong>如果之前统计所得到的Minor GC晋升到旧生代的平均大小大于旧生代的剩余空间，那么就直接触发Full GC</strong>。</p>
<blockquote>
<p>例如程序第一次触发Minor GC后，有6MB的对象晋升到旧生代，那么当下一次Minor GC发生时，首先检查旧生代的剩余空间是否大于6MB，如果小于6MB，则执行Full GC（相当于，提前进行fullgc，而不是把新生代的对象移动过去之后发现内存不足才fullgc）。</p>
<p>当新生代采用PS GC时，方式稍有不同，PS GC是在Minor GC后也会检查，例如上面的例子中第一次Minor GC后，PS GC会检查此时旧生代的剩余空间是否大于6MB，如小于，则触发对旧生代的回收。
除了以上4种状况外，对于使用RMI来进行RPC或管理的Sun JDK应用而言，默认情况下会一小时执行一次Full GC。可通过在启动时通过- java -Dsun.rmi.dgc.client.gcInterval=3600000来设置Full GC执行的间隔时间或通过-XX:+ DisableExplicitGC来禁止RMI调用System.gc。</p>
</blockquote>
<h3 id="cms-gc时出现promotion-failed和concurrent-mode-failure" tabindex="-1"><a class="header-anchor" href="#cms-gc时出现promotion-failed和concurrent-mode-failure" aria-hidden="true">#</a> CMS GC时出现promotion failed和concurrent mode failure</h3>
<p>对于采用CMS进行老年代GC的程序而言，尤其要注意GC日志中是否有<strong>promotion failed</strong>和<strong>concurrent mode failure</strong>两种状况，当这两种状况出现时可能会触发Full GC。</p>
<p>promotion failed是在进行Minor GC时，survivor space放不下、对象只能放入老年代，而此时老年代也放不下造成的；concurrent mode failure是在</p>
<p>执行CMS GC的过程中同时有对象要放入老年代，而此时老年代空间不足造成的（有时候“空间不足”是CMS GC时当前的浮动垃圾过多导致暂时性的空间不足触发Full GC）。
应对措施为：增大survivor space、老年代空间或调低触发并发GC的比率，但在JDK 5.0+、6.0+的版本中有可能会由于JDK的bug29导致CMS在remark完毕后很久才触发sweeping动作。对于这种状况，可通过设置-XX: CMSMaxAbortablePrecleanTime=5（单位为ms）来避免。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>可以发现其实堆内存的Full GC一般都是<strong>两个原因</strong>引起的，<strong>要么是老年代内存过小，要么是老年代连续内存过小。<strong>无非是这两点，而</strong>元数据区Metaspace引发的Full GC可能是阈值引起的</strong>。</p>
<h2 id="如何排查" tabindex="-1"><a class="header-anchor" href="#如何排查" aria-hidden="true">#</a> 如何排查</h2>
<p><strong>检测JVM堆的情况</strong></p>
<p>方法1. 可以使用JDK的bin目录下的jvisualvm.exe工具来进行实时监测，这个是图形化界面，最为直观，这是一个强大的工具。
方法2. 采用jps找到进行id，然后使用jstat -gc pid来实时进行检测。
方法3. 运行程序前设置-XX:+PrintGCDetails，-XX:+PrintGCDateStamps参数打印GC的详细信息进行分析。</p>
<blockquote>
<p>参考博客</p>
<p>https://blog.csdn.net/Hollake/article/details/90484027</p>
</blockquote>
</div></template>


