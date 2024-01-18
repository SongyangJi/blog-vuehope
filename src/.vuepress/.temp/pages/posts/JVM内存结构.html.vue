<template><div><h2 id="jvm内存结构图" tabindex="-1"><a class="header-anchor" href="#jvm内存结构图" aria-hidden="true">#</a> JVM内存结构图</h2>
<p>《深入理解Java虚拟机（第2版）》</p>
<figure><img src="@source/posts/jvm-memory.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>Java8内存结构介绍</strong></p>
<figure><img src="@source/posts/jvm-memory2.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<h2 id="虚拟机内存与本地内存的区别" tabindex="-1"><a class="header-anchor" href="#虚拟机内存与本地内存的区别" aria-hidden="true">#</a> 虚拟机内存与本地内存的区别</h2>
<p>Java虚拟机在执行的时候会把管理的内存分配成不同的区域，这些区域被称为虚拟机内存，同时，对于虚拟机没有直接管理的物理内存，也有一定的利用，这些被利用却不在虚拟机内存数据区的内存，我们称它为<code v-pre>本地内存</code>，这两种内存有一定的区别：</p>
<ul>
<li>
<p>JVM内存
受虚拟机内存大小的参数控制，当大小超过参数设置的大小时就会报OOM</p>
</li>
<li>
<p>本地内存
本地内存不受虚拟机内存参数的限制，只受物理内存容量的限制
虽然不受参数的限制，但是如果内存的占用超出物理内存的大小，同样也会报OOM</p>
</li>
</ul>
<h2 id="各个区域的具体作用" tabindex="-1"><a class="header-anchor" href="#各个区域的具体作用" aria-hidden="true">#</a> 各个区域的具体作用</h2>
<h3 id="程序计数器-program-counter-register" tabindex="-1"><a class="header-anchor" href="#程序计数器-program-counter-register" aria-hidden="true">#</a> 程序计数器（Program Counter Register）</h3>
<p><strong>程序计数器就是当前线程所执行的字节码的行号指示器</strong>，<strong>通过改变计数器的值，来选取下一行指令</strong>，通过他来实现跳转、循环、恢复线程等功能。</p>
<ul>
<li>在任何时刻，一个处理器内核只能运行一个线程，多线程是通过线程轮流切换，分配时间来完成的，这就需要有一个标志来记住每个线程执行到了哪里，这里便需要到了程序计数器。</li>
<li>所以，<strong>程序计数器是线程私有的</strong>，每个线程都已自己的程序计数器。</li>
</ul>
<h3 id="虚拟机栈-jvm-stacks" tabindex="-1"><a class="header-anchor" href="#虚拟机栈-jvm-stacks" aria-hidden="true">#</a> 虚拟机栈（JVM Stacks）</h3>
<p>虚拟机栈是线程私有的，随线程生灭。虚拟机栈描述的是线程中的方法的内存模型：</p>
<p>每个方法被执行的时候，都会在虚拟机栈中同步创建一个<strong>栈帧</strong>（stack frame）。</p>
<ul>
<li>每个栈帧的包含如下的内容
<ul>
<li>Java基本数据类型（byte/boolean/char/int/long/double/float/short）以及对象的引用 （注：这里的基本数据类型指的是方法内的局部变量）</li>
<li>局部变量表</li>
<li>操作数栈</li>
<li>动态连接</li>
<li>方法返回地址</li>
</ul>
</li>
</ul>
<p>方法被执行时入栈，执行完后出栈
虚拟机栈可能会抛出两种异常：</p>
<ul>
<li>如果线程请求的栈深度大于虚拟机所规定的栈深度，则会抛出<code v-pre>StackOverFlowError</code>即栈溢出</li>
<li>如果虚拟机的栈容量可以动态扩展，那么当虚拟机栈申请不到内存时会抛出<code v-pre>OutOfMemoryError</code>即OOM内存溢出</li>
</ul>
<h3 id="本地方法栈-native-method-stacks" tabindex="-1"><a class="header-anchor" href="#本地方法栈-native-method-stacks" aria-hidden="true">#</a> 本地方法栈（Native Method Stacks）</h3>
<p>本地方法栈与虚拟机栈的作用是相似的,都会抛出<code v-pre>OutOfMemoryError</code>和<code v-pre>StackOverFlowError</code>，都是<code v-pre>线程私有</code>的，主要的区别在于：</p>
<ul>
<li>虚拟机栈执行的是java方法</li>
<li>本地方法栈执行的是native方法</li>
</ul>
<h3 id="java堆-java-heap" tabindex="-1"><a class="header-anchor" href="#java堆-java-heap" aria-hidden="true">#</a> Java堆（Java Heap）</h3>
<p>java堆是JVM内存中最大的一块，由所有<strong>线程共享</strong>,是<strong>由垃圾收集器管理</strong>的内存区域，<strong>主要存放对象实例</strong>，当然由于java虚拟机的发展，堆中也多了许多东西，现在主要有：</p>
<ul>
<li>
<p>对象实例</p>
<ul>
<li>类初始化生成的对象；</li>
<li>基本数据类型的数组也是对象实例。</li>
</ul>
</li>
<li>
<p>字符串常量池</p>
<ul>
<li>字符串常量池原本存放于方法区，jdk7开始放置于堆中；</li>
<li>字符串常量池存储的是string对象的直接引用，而不是直接存放的对象，是一张<code v-pre>string table</code>。</li>
</ul>
</li>
<li>
<p>静态变量
静态变量是有static修饰的变量，jdk7时从方法区迁移至堆中。</p>
</li>
<li>
<p>线程分配缓冲区（Thread Local Allocation Buffer）</p>
<ul>
<li>线程私有，但是不影响java堆的共性；</li>
<li>增加线程分配缓冲区是为了提升对象分配时的效率。</li>
</ul>
</li>
</ul>
<p>java堆既可以是固定大小的，也可以是可扩展的（通过参数<code v-pre>-Xmx</code>和<code v-pre>-Xms</code>设定），如果堆无法扩展或者无法分配内存时也会报OOM。</p>
<blockquote>
<p>静态变量 存储位置：JDK8之前，静态成员变量确实存放在方法区；但JDK8之后就取消了“永久代”，取而代之的是“元空间”，永久代中的数据也进行了迁移，静态成员变量迁移到了堆中（方法区是JVM的规范，永久代是方法区的具体实现）。</p>
</blockquote>
<h3 id="方法区-method-area" tabindex="-1"><a class="header-anchor" href="#方法区-method-area" aria-hidden="true">#</a> 方法区（Method Area）</h3>
<p>方法区绝对是网上所有关于java内存结构文章争论的焦点，因为方法区的实现在java8做了一次大革新，现在我们来讨论一下：</p>
<p><strong>方法区是所有线程共享的内存</strong>，</p>
<p>在java8以前是放在JVM内存中的，<strong>由永久代实现，受JVM内存大小参数的限制</strong>;</p>
<p>在java8中移除了永久代的内容，<strong>方法区由元空间(Meta Space)实现，并直接放到了本地内存中</strong>，不受JVM参数的限制（当然，如果物理内存被占满了，方法区也会报OOM）。</p>
<p>并且将原来放在方法区的<strong>字符串常量池</strong>和<strong>静态变量</strong>都转移到了Java堆中，方法区与其他区域不同的地方在于，方法区在编译期间和类加载完成后的内容有少许不同，不过总的来说分为这两部分：</p>
<ul>
<li>
<p>类元信息（Klass）</p>
<ul>
<li>类元信息在类编译期间放入方法区，里面放置了类的基本信息，包括类的<code v-pre>版本</code>、<code v-pre>字段</code>、<code v-pre>方法</code>、<code v-pre>接口</code>以及<code v-pre>常量池表（Constant Pool Table）</code></li>
<li><code v-pre>常量池表（Constant Pool Table）</code>存储了类在编译期间生成的<code v-pre>字面量</code>、<code v-pre>符号引用</code>这些信息在类加载完后会被解析到运行时常量池中</li>
</ul>
</li>
<li>
<p>运行时常量池（Runtime Constant Pool）</p>
<ul>
<li><strong>运行时常量池主要存放在类加载后被解析的字面量与符号引用</strong>，但不止这些；</li>
<li>运行时常量池具备动态性，可以添加数据，比较多的使用就是String类的intern()方法</li>
</ul>
</li>
</ul>
<h2 id="直接内存" tabindex="-1"><a class="header-anchor" href="#直接内存" aria-hidden="true">#</a> 直接内存</h2>
<p><strong>直接内存位于本地内存，不属于JVM内存</strong>，但是也会在物理内存耗尽的时候报OOM。</p>
<p>在jdk1.4中加入了NIO（New Input/Putput）类，引入了一种基于通道（channel）与缓冲区（buffer）的新IO方式，它可以使用native函数直接分配堆外内存，然后通过存储在java堆中的DirectByteBuffer对象作为这块内存的引用进行操作，这样可以在一些场景下大大提高IO性能，<strong>避免了在java堆和native堆来回复制数据</strong>。</p>
<h1 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h1>
<h2 id="类常量池、运行时常量池、字符串常量池有什么关系-有什么区别" tabindex="-1"><a class="header-anchor" href="#类常量池、运行时常量池、字符串常量池有什么关系-有什么区别" aria-hidden="true">#</a> 类常量池、运行时常量池、字符串常量池有什么关系？有什么区别？</h2>
<p>类常量池与运行时常量池都存储在方法区，而<strong>字符串常量池在jdk7时就已经从方法区迁移到了java堆中</strong>。</p>
<p>在类编译过程中，会把类元信息放到方法区，类元信息的其中一部分便是<strong>类常量池，主要存放字面量和符号引用</strong>，<strong>而字面量的一部分便是文本字符</strong>，在类加载时将字面量和符号引用解析为直接引用存储在运行时常量池；</p>
<p>对于文本字符来说，它们会在解析时查找字符串常量池，查出这个文本字符对应的字符串对象的直接引用，将直接引用存储在运行时常量池；</p>
<p><strong>字符串常量池存储的是字符串对象的引用，而不是字符串本身</strong>。</p>
<h2 id="什么是字面量-什么是符号引用" tabindex="-1"><a class="header-anchor" href="#什么是字面量-什么是符号引用" aria-hidden="true">#</a> 什么是字面量？什么是符号引用？</h2>
<ul>
<li>
<p>字面量</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//这个1便是字面量</span>
<span class="token class-name">String</span> b<span class="token operator">=</span><span class="token string">"iloveu"</span><span class="token punctuation">;</span><span class="token comment">//iloveu便是字面量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<ul>
<li>java代码在编译过程中是无法构建引用的，字面量就是在编译时对于数据的一种表示:</li>
</ul>
</li>
<li>
<p>符号引用</p>
</li>
<li>
<ul>
<li>由于在编译过程中并不知道每个类的地址，因为可能这个类还没有加载，所以如果你在一个类中引用了另一个类，那么你完全无法知道他的内存地址，那怎么办，我们只能用他的类名作为符号引用，在类加载完后用这个符号引用去获取他的内存地址。</li>
<li>例子：我在com.demo.Solution类中引用了com.test.Quest，那么我会把<code v-pre>com.test.Quest</code>作为符号引用存到类常量池，等类加载完后，拿着这个引用去方法区找这个类的内存地址。</li>
</ul>
</li>
</ul>
<blockquote>
<p>参考</p>
<p><a href="https://www.cnblogs.com/ityouknow/p/5610232.html" target="_blank" rel="noopener noreferrer">jvm系列(二):JVM内存结构<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


