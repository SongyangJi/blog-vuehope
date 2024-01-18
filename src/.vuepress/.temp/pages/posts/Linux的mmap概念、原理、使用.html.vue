<template><div><h1 id="mmap基础概念" tabindex="-1"><a class="header-anchor" href="#mmap基础概念" aria-hidden="true">#</a> mmap基础概念</h1>
<p><code v-pre>mmap</code>是一种<strong>内存映射文件</strong>的方法，即<strong>将一个文件或者其它对象映射到进程的地址空间</strong>，<strong>实现文件磁盘地址和进程虚拟地址空间中一段虚拟地址的一一对映关系</strong>。</p>
<p>实现这样的映射关系后**，进程就可以采用指针的方式读写操作这一段内存**，而<strong>系统会自动回写脏页面到对应的文件磁盘上</strong>，即完成了对文件的操作而不必再调用read,write等系统调用函数。相反，内核空间对这段区域的修改也直接反映用户空间，从而可以实现<strong>不同进程间的文件共享</strong>。</p>
<p>如下图所示：</p>
<figure><img src="@source/posts/mmap1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>由上图可以看出，进程的虚拟地址空间，由多个虚拟内存区域构成。虚拟内存区域是进程的虚拟地址空间中的一个同质区间，即具有同样特性的连续地址范围。上图中所示的text数据段（代码段）、初始数据段、BSS数据段、堆、栈和内存映射，都是一个独立的虚拟内存区域。而为内存映射服务的地址空间处在堆栈之间的空余部分。</p>
<p>linux内核使用<code v-pre>vm_area_struct</code>结构来表示<strong>一个独立的虚拟内存区域</strong>，由于每个不同质的虚拟内存区域功能和内部机制都不同，因此一<strong>个进程使用多个vm_area_struct结构来分别表示不同类型的虚拟内存区域</strong>。</p>
<p>各个vm_area_struct结构使用链表或者树形结构链接，方便进程快速访问，如下图所示：</p>
<figure><img src="@source/posts/mmap2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>vm_area_struct结构中包含区域起始和终止地址以及其他相关信息，同时也包含一个vm_ops指针，其内部可引出所有针对这个区域可以使用的系统调用函数。这样，进程对某一虚拟内存区域的任何操作需要用要的信息，都可以从vm_area_struct中获得。</p>
<p><strong>mmap函数就是要创建一个新的vm_area_struct结构，并将其与文件的物理磁盘地址相连。</strong></p>
<h1 id="mmap内存映射步骤和原理" tabindex="-1"><a class="header-anchor" href="#mmap内存映射步骤和原理" aria-hidden="true">#</a> mmap内存映射步骤和原理</h1>
<h2 id="内存映射步骤" tabindex="-1"><a class="header-anchor" href="#内存映射步骤" aria-hidden="true">#</a> 内存映射步骤</h2>
<p>mmap内存映射的实现过程，总的来说可以分为三个阶段：</p>
<p><strong>（一）进程启动映射过程，并在虚拟地址空间中为映射创建虚拟映射区域</strong></p>
<ol>
<li>进程在用户空间调用库函数mmap，</li>
</ol>
<p>原型：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">mmap</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>start<span class="token punctuation">,</span> <span class="token class-name">size_t</span> length<span class="token punctuation">,</span> <span class="token keyword">int</span> prot<span class="token punctuation">,</span> <span class="token keyword">int</span> flags<span class="token punctuation">,</span> <span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token class-name">off_t</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>
<p>在当前进程的虚拟地址空间中，寻找一段空闲的满足要求的连续的虚拟地址;</p>
</li>
<li>
<p>为此虚拟区分配一个vm_area_struct结构，接着对这个结构的各个域进行了初始化</p>
</li>
<li>
<p>将新建的虚拟区结构（vm_area_struct）插入进程的虚拟地址区域链表或树中</p>
</li>
</ol>
<p><strong>（二）调用内核空间的系统调用函数mmap（不同于用户空间函数），实现文件物理地址和进程虚拟地址的一一映射关系</strong></p>
<p>5、为映射分配了新的虚拟地址区域后，通过待映射的文件指针，在文件描述符表中找到对应的文件描述符，通过文件描述符，链接到内核“已打开文件集”中该文件的文件结构体（struct file），每个文件结构体维护着和这个已打开文件相关各项信息。</p>
<p>6、通过该文件的文件结构体，链接到file_operations模块，调用内核函数mmap，其原型为：int mmap(struct file *filp, struct vm_area_struct *vma)，不同于用户空间库函数。</p>
<p>7、内核mmap函数通过虚拟文件系统inode模块定位到文件磁盘物理地址。</p>
<p>8、通过remap_pfn_range函数建立页表，即实现了文件地址和虚拟地址区域的映射关系。此时，这片虚拟地址并没有任何数据关联到主存中。</p>
<p><strong>（三）进程发起对这片映射空间的访问，引发缺页异常，实现文件内容到物理内存（主存）的拷贝</strong></p>
<p>注：前两个阶段仅在于创建虚拟区间并完成地址映射，但是并没有将任何文件数据的拷贝至主存。真正的文件读取是当进程发起读或写操作时。</p>
<p>9、进程的读或写操作访问虚拟地址空间这一段映射地址，通过查询页表，发现这一段地址并不在物理页面上。因为目前只建立了地址映射，真正的硬盘数据还没有拷贝到内存中，因此引发缺页异常。</p>
<p>10、缺页异常进行一系列判断，确定无非法操作后，内核发起请求调页过程。</p>
<p>11、调页过程先在交换缓存空间（swap cache）中寻找需要访问的内存页，如果没有则调用nopage函数把所缺的页从磁盘装入到主存中。</p>
<p>12、之后进程即可对这片主存进行读或者写的操作，如果写操作改变了其内容，一定时间后系统会自动回写脏页面到对应磁盘地址，也即完成了写入到文件的过程。</p>
<p>注：修改过的脏页面并不会立即更新回文件中，而是有一段时间的延迟，可以调用msync()来强制同步, 这样所写的内容就能立即保存到文件里了。</p>
<h3 id="内核怎样保证各个进程寻址到同一个共享内存区域的内存页面" tabindex="-1"><a class="header-anchor" href="#内核怎样保证各个进程寻址到同一个共享内存区域的内存页面" aria-hidden="true">#</a> 内核怎样保证各个进程寻址到同一个共享内存区域的内存页面</h3>
<ol>
<li>
<p>page cache及swap cache中页面的区分：一个被访问文件的物理页面都驻留在page cache或swap cache中，一个页面的所有信息由struct page来描述。struct page中有一个域为指针mapping ，它指向一个struct address_space类型结构。page cache或swap cache中的所有页面就是根据address_space结构以及一个偏移量来区分的。</p>
</li>
<li>
<p>文件与 address_space结构的对应：一个具体的文件在打开后，内核会在内存中为之建立一个struct inode结构，其中的i_mapping域指向一个address_space结构。这样，一个文件就对应一个address_space结构，一个 address_space与一个偏移量能够确定一个page cache 或swap cache中的一个页面。因此，当要寻址某个数据时，很容易根据给定的文件及数据在文件内的偏移量而找到相应的页面。</p>
</li>
<li>
<p><strong>进程调用mmap()时，只是在进程空间内新增了一块相应大小的缓冲区，并设置了相应的访问标识</strong>，但并没有建立进程空间到物理页面的映射。因此，第一次访问该空间时，会引发一个缺页异常。</p>
</li>
<li>
<p>对于共享内存映射情况，缺页异常处理程序首先在swap cache中寻找目标页（符合address_space以及偏移量的物理页），如果找到，则直接返回地址；如果没有找到，则判断该页是否在交换区 (swap area)，如果在，则执行一个换入操作；如果上述两种情况都不满足，处理程序将分配新的物理页面，并把它插入到page cache中。进程最终将更新进程页表。
注：对于映射普通文件情况（非共享映射），缺页异常处理程序首先会在page cache中根据address_space以及数据偏移量寻找相应的页面。如果没有找到，则说明文件数据还没有读入内存，处理程序会从磁盘读入相应的页 面，并返回相应地址，同时，进程页表也会更新。</p>
</li>
<li>
<p>所有进程在映射同一个共享内存区域时，情况都一样，在建立线性地址与物理地址之间的映射之后，不论进程各自的返回地址（实际上各进程返回的地址为各进程的虚拟地址，虚拟地址自然就会不一样，而它们映射的物理地址是相同的）如何，实际访问的必然是同一个共享内存区域对应的物理页面。
注：一个共享内存区域可以看作是特殊文件系统shm中的一个文件，shm的安装点在交换区上。</p>
</li>
</ol>
<h1 id="mmap相关函数" tabindex="-1"><a class="header-anchor" href="#mmap相关函数" aria-hidden="true">#</a> mmap相关函数</h1>
<p><strong>函数原型</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">mmap</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>start<span class="token punctuation">,</span> <span class="token class-name">size_t</span> length<span class="token punctuation">,</span> <span class="token keyword">int</span> prot<span class="token punctuation">,</span> <span class="token keyword">int</span> flags<span class="token punctuation">,</span> <span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token class-name">off_t</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>返回说明</strong></p>
<p>成功执行时，mmap()返回被映射区的指针;</p>
<p>失败时，mmap()返回MAP_FAILED[其值为(void *)]， error被设为以下的某个值：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> 1 EACCES：访问出错
 2 EAGAIN：文件已被锁定，或者太多的内存已被锁定
 3 EBADF：fd不是有效的文件描述词
 4 EINVAL：一个或者多个参数无效
 5 ENFILE：已达到系统对打开文件的限制
 6 ENODEV：指定文件所在的文件系统不支持内存映射
 7 ENOMEM：内存不足，或者进程已超出最大内存映射数量
 8 EPERM：权能不足，操作不允许
 9 ETXTBSY：已写的方式打开文件，同时指定MAP_DENYWRITE标志
10 SIGSEGV：试着向只读区写入
11 SIGBUS：试着访问不属于进程的内存区
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数</strong></p>
<p>start：映射区的开始地址</p>
<p>length：映射区的长度</p>
<p>prot：期望的内存保护标志，不能与文件的打开模式冲突, 是以下的某个值，可以通过or运算合理地组合在一起</p>
<table>
<thead>
<tr>
<th>prot参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>PROT_READ</td>
<td>内存段可读</td>
</tr>
<tr>
<td>PROT_WRITE</td>
<td>内存段可写</td>
</tr>
<tr>
<td>PROT_EXEC</td>
<td>内存段可执行</td>
</tr>
<tr>
<td>PROT_NONE</td>
<td>内存段不能被访问</td>
</tr>
</tbody>
</table>
<p>flags：指定映射对象的类型，映射选项和映射页是否可以共享。它的值可以是一个或者多个以下位的组合体</p>
<table>
<thead>
<tr>
<th>flags参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>MAP_SHARED</td>
<td>进程间共享内存，对该内存段修改反映到映射文件中。提供了POSIX共享内存</td>
</tr>
<tr>
<td>MAP_PRIVATE</td>
<td>内存段为调用进程所私有。对该内存段的修改不会反映到映射文件</td>
</tr>
<tr>
<td>MAP_ANNOYMOUS</td>
<td>这段内存不是从文件映射而来的。内容被初始化为全0</td>
</tr>
<tr>
<td>MAP_FIXED</td>
<td>内存段必须位于start参数指定的地址处，start必须是页大小的整数倍（4K整数倍）</td>
</tr>
<tr>
<td>MAP_HUGETLB</td>
<td>按照大内存页面来分配内存空间</td>
</tr>
</tbody>
</table>
<p>fd：有效的文件描述符。如果MAP_ANONYMOUS被设定，为了兼容问题，其值应为-1；</p>
<p>offset：被映射对象内容的起点；</p>
<p><strong>相关函数</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">munmap</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> addr<span class="token punctuation">,</span> <span class="token class-name">size_t</span> len <span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>成功执行时，munmap()返回0。失败时，munmap返回-1，error返回标志和mmap一致；</p>
<p>该调用在进程地址空间中解除一个映射关系，addr是调用mmap()时返回的地址，len是映射区的大小；</p>
<p>当映射关系解除后，对原来映射地址的访问将导致段错误发生。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">msync</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span>addr<span class="token punctuation">,</span> <span class="token class-name">size_t</span> len<span class="token punctuation">,</span> <span class="token keyword">int</span> flags <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一般说来，进程在映射空间的对共享内容的改变并不直接写回到磁盘文件中，往往在调用munmap()后才执行该操作。</p>
<p>可以通过调用msync()实现磁盘上文件内容与共享内存区的内容一致, 也就是内存同步到磁盘上。</p>
<h1 id="mmap和常规文件操作的区别" tabindex="-1"><a class="header-anchor" href="#mmap和常规文件操作的区别" aria-hidden="true">#</a> mmap和常规文件操作的区别</h1>
<p>参考文章<a href="http://47.117.127.179/2021/11/20/Linux%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6%E7%9A%84%E5%AE%9E%E7%8E%B0/" target="_blank" rel="noopener noreferrer">《Linux文件描述符的使用与实现》<ExternalLinkIcon/></a>。</p>
<p>我们首先简单的回顾一下常规文件系统操作（调用read/fread等类函数）中，函数的调用过程：</p>
<ol>
<li>
<p>进程发起读文件请求;</p>
</li>
<li>
<p>内核通过查找进程文件符表（<code v-pre>fd_array</code>），定位到内核已打开文件集上的文件信息，从而找到此文件的<code v-pre>inode</code>;</p>
</li>
<li>
<p>inode在address_space上查找要请求的文件页是否已经缓存在页缓存中。如果存在，则直接返回这片文件页的内容。</p>
</li>
<li>
<p>如果不存在，则通过inode定位到文件磁盘地址，将数据从磁盘复制到页缓存。之后再次发起读页面过程，进而将页缓存中的数据发给用户进程。</p>
</li>
</ol>
<p>总结来说，常规文件操作为了提高读写效率和保护磁盘，使用了<strong>页缓存机制</strong>。</p>
<p>这样造成读文件时<strong>需要先将文件页从磁盘拷贝到页缓存中</strong>，由于<strong>页缓存处在内核空间</strong>，不能被用户进程直接寻址，所以<strong>还需要将页缓存中数据页再次拷贝到内存对应的用户空间中</strong>。这样，<strong>通过了两次数据拷贝过程，才能完成进程对文件内容的获取任务</strong>。写操作也是一样，待写入的buffer在内核空间不能直接访问，必须要先拷贝至内核空间对应的主存，再写回磁盘中（延迟写回），也是需要两次数据拷贝。</p>
<p>而使用mmap操作文件时，创建新的虚拟内存区域和建立文件磁盘地址和虚拟内存区域映射这两步，没有任何文件拷贝操作，而之后<strong>访问数据时发现内存中并无数据而发起的缺页异常过程</strong>，<strong>可以通过已经建立好的映射关系，只使用一次数据拷贝，就从磁盘中将数据传入内存的用户空间中</strong>，供进程使用。</p>
<p><strong>总而言之，常规文件操作需要从磁盘到页缓存再到用户主存的两次数据拷贝，</strong></p>
<p><strong>而mmap操控文件，只需要从磁盘到用户主存的一次数据拷贝过程。</strong></p>
<p>说白了，mmap的关键点是<strong>实现了用户空间和内核空间的数据直接交互而省去了空间不同数据不通的繁琐过程</strong>。因此mmap效率更高。</p>
<h1 id="mmap优点" tabindex="-1"><a class="header-anchor" href="#mmap优点" aria-hidden="true">#</a> mmap优点</h1>
<p>由上文讨论可知，mmap优点共有一下几点：</p>
<ol>
<li>
<p><strong>对文件的读取操作跨过了页缓存</strong>，减少了数据的拷贝次数，<strong>用内存读写取代I/O读写</strong>，提高了文件读取效率。</p>
</li>
<li>
<p>实现了用户空间和内核空间的高效交互方式。<strong>两空间的各自修改操作可以直接反映在映射的区域内，从而被对方空间及时捕捉</strong>。</p>
</li>
<li>
<p>提供<strong>进程间共享内存及相互通信</strong>的方式。不管是父子进程还是无亲缘关系的进程，都可以<strong>将自身用户空间映射到同一个文件或匿名映射到同一片区域</strong>。从而通过各自对映射区域的改动，达到进程间通信和进程间共享的目的。同时，如果进程A和进程B都映射了区域C，当A第一次读取C时通过缺页从磁盘复制文件页到内存中；但当B再读C的相同页面时，虽然也会产生缺页异常，但是不再需要从磁盘中复制文件过来，而可直接使用已经保存在内存中的文件数据。</p>
</li>
<li>
<p><strong>可用于实现高效的大规模数据传输</strong>。内存空间不足，是制约大数据操作的一个方面，解决方案往往是借助硬盘空间协助操作，补充内存的不足。但是进一步会造成大量的文件I/O操作，极大影响效率。这个问题可以通过mmap映射很好的解决。换句话说，但凡是需要用磁盘空间代替内存的时候，mmap都可以发挥其功效。</p>
</li>
</ol>
<h1 id="mmap用途" tabindex="-1"><a class="header-anchor" href="#mmap用途" aria-hidden="true">#</a> mmap用途</h1>
<ol>
<li>
<p>共享内存：可以说是最有用的进程间通信方式，也是最快的IPC形式。两个不同进程A、B共享内存的意思是，同一块物理内存被映射到进程A、B各自的进程地址空 间。进程A可以即时看到进程B对共享内存中数据的更新，反之亦然。由于多个进程共享同一块内存区域，必然需要某种同步机制，互斥锁和信号量都可以。</p>
<p>Linux的2.2.x内核支持多种共享内存方式，如<strong>1) mmap()系统调用，2) Posix共享内存，以及3) System V共享内存</strong>。linux发行版本如Redhat 8.0支持mmap()系统调用及System V共享内存，但还没实现Posix共享内存。</p>
</li>
<li>
<p>文件访问方式：mmap函数是unix/linux下的系统调用，mmap系统调用并不是完全为了用于共享内存而设计的。它本身提供了不同于一般对普通文件的访问方式，进程可以像读写内存一样对普通文件的操作。而Posix或系统V的共享内存IPC则纯粹用于共享目的，当然mmap()实现共享内存也是其主要应用之一。</p>
</li>
</ol>
<p>mmap系统调用使得进程之间通过映射同一个普通文件实现共享内存。普通文件被映射到进程地址空间后，进程可以像访问普通内存一样对文件进行访问，不必再调用read()，write()等操作。
我们的程序中大量运用了mmap，用到的正是mmap的这种“像访问普通内存一样对文件进行访问”的功能。实践证明，<strong>当要对一个文件频繁的进行访问，并且指针来回移动时</strong>，调用mmap比用常规的方法快很多</p>
<h1 id="mmap使用细节" tabindex="-1"><a class="header-anchor" href="#mmap使用细节" aria-hidden="true">#</a> mmap使用细节</h1>
<ol>
<li>
<p>使用mmap需要注意的一个关键点是，<strong>mmap映射区域大小必须是物理页大小(page_size)的整倍数</strong>（32位系统中通常是4k字节）。原因是，内存的最小粒度是页，而进程虚拟地址空间和内存的映射也是以页为单位。为了匹配内存的操作，mmap从磁盘到虚拟地址空间的映射也必须是页。</p>
</li>
<li>
<p>内核可以跟踪被内存映射的底层对象（文件）的大小，<strong>进程可以合法的访问在当前文件大小以内且在内存映射区以内的那些字节</strong>。也就是说，<strong>如果文件的大小一直在扩张，只要在映射区域范围内的数据，进程都可以合法得到</strong>，这和映射建立时文件的大小无关。具体情形参见<em>情形三</em>。</p>
</li>
<li>
<p><strong>映射建立之后，即使文件关闭，映射依然存在</strong>。因为映射的是磁盘的地址，不是文件本身，和文件句柄无关。同时可用于进程间通信的有效地址空间不完全受限于被映射文件的大小，因为是按页映射。</p>
</li>
</ol>
<p>在上面的知识前提下，我们下面看看如果大小不是页的整倍数的具体情况：</p>
<p><strong>情形一：一个文件的大小是5000字节，mmap函数从一个文件的起始位置开始，映射5000字节到虚拟内存中。</strong></p>
<p>分析：因为单位物理页面的大小是4096字节，虽然被映射的文件只有5000字节，但是对应到进程虚拟地址区域的大小需要满足整页大小，因此mmap函数执行后，实际映射到虚拟内存区域8192个 字节，5000~8191的字节部分用零填充。映射后的对应关系如下图所示：</p>
<p>​        <img src="@source/posts/mmap3.png" alt="img" loading="lazy"></p>
<p>此时：</p>
<p>（1）读/写前5000个字节（0~4999），会返回操作文件内容。</p>
<p>（2）读字节5000-8191时，结果全为0。写5000~8191时，进程不会报错，但是所写的内容不会写入原文件中 。</p>
<p>（3）读/写8192以外的磁盘部分，会返回一个<code v-pre>SIGSECV</code>错误（无效的内存引用）。</p>
<p><strong>情形二：一个文件的大小是5000字节，mmap函数从一个文件的起始位置开始，映射15000字节到虚拟内存中，即映射大小超过了原始文件的大小。</strong></p>
<p>分析：由于文件的大小是5000字节，和情形一一样，其对应的两个物理页。那么这两个物理页都是合法可以读写的，只是超出5000的部分不会体现在原文件中。由于程序要求映射15000字节，而文件只占两个物理页，因此8192字节~15000字节都不能读写，操作时会返回异常。如下图所示：</p>
<p>​         <img src="@source/posts/mmap4.png" alt="img" loading="lazy"></p>
<p>此时：</p>
<p>（1）进程可以正常读/写被映射的前5000字节(0~4999)，写操作的改动会在一定时间后反映在原文件中。</p>
<p>（2）对于5000~8191字节，进程可以进行读写过程，不会报错。但是内容在写入前均为0，另外，写入后不会反映在文件中。</p>
<p>（3）对于8192~14999字节，进程不能对其进行读写，会报<code v-pre>SIGBUS</code>错误（指针所对应的地址是有效地址，但总线不能正常使用该 指针，通常是未对齐的数据访问所致）。</p>
<p>（4）对于15000以外的字节，进程不能对其读写，会引发<code v-pre>SIGSEGV</code>错误。</p>
<p><strong>情形三：一个文件初始大小为0，使用mmap操作映射了1000*4K的大小，即1000个物理页大约4M字节空间，mmap返回指针ptr。</strong></p>
<p>分析：如果在映射建立之初，就对文件进行读写操作，由于文件大小为0，并没有合法的物理页对应，如同情形二一样，会返回SIGBUS错误。</p>
<p>但是如果每次操作ptr读写前，<strong>先增加文件的大小？</strong>，那么ptr在文件大小内部的操作就是合法的。例如，文件扩充4096字节，ptr就能操作ptr  [ (char)ptr + 4095]的空间。只要文件扩充的范围在1000个物理页（映射范围）内，ptr都可以对应操作相同的大小。</p>
<p>这样，方便随时扩充文件空间，随时写入文件，不造成空间浪费。</p>
<blockquote>
<p>mmap针对Windows和Unix的版本在具体实现上有所不同，对于Windows版本，当length参数比file本身size大的时候，会自动扩展file为指定length大小；而Unix版本不支持自动扩展，即length只能小于等于size of file，如果超出size，则会报错。</p>
</blockquote>
<p>https://www.cnblogs.com/alantu2018/p/8506381.html</p>
</div></template>


