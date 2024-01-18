<template><div><p><strong>文章结构</strong></p>
<img src="overview2.jpg" style="zoom:50%;" />
<h1 id="redis的数据类型和底层数据结构" tabindex="-1"><a class="header-anchor" href="#redis的数据类型和底层数据结构" aria-hidden="true">#</a> Redis的数据类型和底层数据结构</h1>
<p><strong>Redis 数据结构并不是指 String（字符串）对象、List（列表）对象、Hash（哈希）对象、Set（集合）对象和 Zset（有序集合）对象，因为这些是 Redis 键值对中值的数据类型，也就是数据的保存形式，这些对象的底层实现的方式就用到了数据结构</strong>。</p>
<figure><img src="@source/posts/overview1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<blockquote>
<p>上图中，zset的实现箭头有误。应该使用到了 [压缩列表 / listpack] or [哈希表 + 跳表]，也就是说图中少画了一条指向哈希表的箭头。<a href="https://developer.aliyun.com/article/666398" target="_blank" rel="noopener noreferrer">redis zset底层数据结构<ExternalLinkIcon/></a></p>
</blockquote>
<ul>
<li>在 Redis 3.0 版本中 List 对象的底层数据结构由「双向链表」或「压缩表列表」实现，但是在 3.2 版本之后，List 数据类型底层数据结构是由 quicklist 实现的；</li>
<li>在最新的 Redis 代码（还未发布正式版本）中，压缩列表数据结构已经废弃了，交由 listpack 数据结构来实现了。</li>
</ul>
<h1 id="kv数据库的整体设计" tabindex="-1"><a class="header-anchor" href="#kv数据库的整体设计" aria-hidden="true">#</a> KV数据库的整体设计</h1>
<p>在开始讲数据结构之前，先给介绍下 Redis 是怎样实现键值对（key-value）数据库的。</p>
<p>Redis 的键值对中的 key 就是字符串对象，而 <strong>value 可以是字符串对象，也可以是集合数据类型的对象</strong>，比如 List 对象、Hash 对象、Set 对象和 Zset 对象。</p>
<p><strong>Redis 是使用了一个「哈希表」保存所有键值对</strong>，哈希表的最大好处就是让我们可以用 O(1) 的时间复杂度来快速查找到键值对。哈希表其实就是一个数组，数组中的元素叫做哈希桶。</p>
<p>Redis 的哈希桶是怎么保存键值对数据的呢？</p>
<p>哈希桶存放的是指向键值对数据的指针（dictEntry*），这样通过指针就能找到键值对数据，然后因为键值对的值可以保存字符串对象和集合数据类型的对象，所以键值对的数据结构中并不是直接保存值本身，而是保存了</p>
<p>void * key 和 void * value 指针，分别指向了实际的键对象和值对象，这样一来，即使值是集合数据，也可以通过 void * value 指针找到。</p>
<figure><img src="@source/posts/overview3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>redisDb 结构，表示 Redis 数据库的结构，结构体里存放了指向了 dict 结构的指针；</li>
<li>dict 结构，结构体里存放了 2 个哈希表，正常情况下都是用「哈希表1」，「哈希表2」只有在 rehash 的时候才用，具体什么是 rehash，我在本文的哈希表数据结构会讲；</li>
<li>ditctht 结构，表示哈希表的结构，结构里存放了哈希表数组，数组中的每个元素都是指向一个哈希表节点结构（dictEntry）的指针；</li>
<li>dictEntry 结构，表示哈希表节点的结构，结构里存放了 <strong>void * key 和 void * value 指针， *key 指向的是 String 对象，而 *value 则可以指向 String 对象，也可以指向集合类型的对象，比如 List 对象、Hash 对象、Set 对象和 Zset 对象</strong>。</li>
</ul>
<p>特别说明下，void * key 和 void * value 指针指向的是 <strong>Redis 对象</strong>，Redis 中的每个对象都由 redisObject 结构表示，如下图：</p>
<img src="redis_object.jpg" style="zoom:70%;" />
<p>对象结构里包含的成员变量：</p>
<ul>
<li>type，标识该对象是什么类型的对象（String 对象、 List 对象、Hash 对象、Set 对象和 Zset 对象）；</li>
<li>encoding，标识该对象使用了哪种底层的数据结构；</li>
<li><strong>ptr，指向底层数据结构的指针</strong>。</li>
</ul>
<h1 id="sds-simple-dynamic-string" tabindex="-1"><a class="header-anchor" href="#sds-simple-dynamic-string" aria-hidden="true">#</a> SDS（simple dynamic string）</h1>
<p>由于C 语言字符串的缺陷，Redis 是用 C 语言实现的，但是它没有直接使用 C 语言的 char* 字符数组来实现字符串，而是自己封装了一个名为简单动态字符串（simple dynamic string，SDS） 的数据结构来表示字符串，也就是 Redis 的 String 数据类型的底层数据结构是 SDS。</p>
<ol>
<li>O（1）复杂度获取字符串长度</li>
<li>二进制安全</li>
<li>不会发生缓冲区溢出</li>
</ol>
<h1 id="双向链表" tabindex="-1"><a class="header-anchor" href="#双向链表" aria-hidden="true">#</a> 双向链表</h1>
<p>Redis对双向链表的实现和我们一般自己实现的并没有什么区别：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">listNode</span> <span class="token punctuation">{</span>
    <span class="token comment">//前置节点</span>
    <span class="token keyword">struct</span> <span class="token class-name">listNode</span> <span class="token operator">*</span>prev<span class="token punctuation">;</span>
    <span class="token comment">//后置节点</span>
    <span class="token keyword">struct</span> <span class="token class-name">listNode</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>
    <span class="token comment">//节点的值</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span> listNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的特性我们都很清楚。</p>
<blockquote>
<p>链表的缺陷也是有的：</p>
<ul>
<li>链表每个节点之间的内存都是不连续的，意味着<strong>无法很好利用 CPU 缓存</strong>。能很好利用 CPU 缓存的数据结构就是数组，因为数组的内存是连续的，这样就可以充分利用 CPU 缓存来加速访问。</li>
<li>还有一点，保存一个链表节点的值都需要一个链表节点结构头的分配，<strong>内存开销较大</strong>。</li>
</ul>
</blockquote>
<h1 id="压缩列表" tabindex="-1"><a class="header-anchor" href="#压缩列表" aria-hidden="true">#</a> 压缩列表</h1>
<p>压缩列表的最大特点，就是它被设计成一种内存紧凑型的数据结构，占用一块连续的内存空间，不仅可以利用 CPU 缓存，而且会针对不同长度的数据，进行相应编码，这种方法可以有效地节省内存开销。</p>
<p>压缩列表的最大特点，就是它被设计成一种内存紧凑型的数据结构，占用一块连续的内存空间，不仅可以利用 CPU 缓存，而且会针对不同长度的数据，进行相应编码，这种方法可以有效地节省内存开销。</p>
<p>但是，压缩列表的缺陷也是有的：</p>
<ul>
<li><strong>不能保存过多的元素，否则查询效率就会降低</strong>；</li>
<li><strong>新增或修改某个元素时，压缩列表占用的内存空间需要重新分配，甚至可能引发连锁更新的问题</strong>。</li>
</ul>
<h2 id="压缩列表结构设计" tabindex="-1"><a class="header-anchor" href="#压缩列表结构设计" aria-hidden="true">#</a> 压缩列表结构设计</h2>
<p>压缩列表是 Redis 为了节约内存而开发的，它是<strong>由连续内存块组成的顺序型数据结构</strong>，有点类似于数组。</p>
<figure><img src="@source/posts/压缩列表1.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>压缩列表在表头有三个字段：</p>
<ul>
<li><strong>zlbytes</strong>，记录整个压缩列表占用内存字节数；</li>
<li><strong>zltail</strong>，记录压缩列表「尾部」节点距离起始地址多少字节，也就是列表尾的偏移量；</li>
<li><strong>zllen</strong>，<strong>记录压缩列表包含的节点数量</strong>；</li>
<li><strong>zlend</strong>，标记压缩列表的结束点，固定值 0xFF（十进制255）。</li>
</ul>
<p>在压缩列表中，如果我们要查找定位第一个元素和最后一个元素，可以通过表头三个字段的长度直接定位，复杂度是 O(1)。而<strong>查找其他元素时，就没有这么高效了，只能逐个查找，此时的复杂度就是 O(N) 了，因此压缩列表不适合保存过多的元素</strong>。</p>
<p>另外，压缩列表节点（entry）的构成如下：</p>
<figure><img src="@source/posts/压缩列表2.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>压缩列表节点包含三部分内容：</p>
<ul>
<li><strong>prevlen</strong>，记录了「前一个节点」的长度；</li>
<li><strong>encoding</strong>，记录了当前节点实际数据的类型以及长度；</li>
<li><strong>data</strong>，记录了当前节点的实际数据；</li>
</ul>
<p>当我们往压缩列表中插入数据时，压缩列表就会根据数据是字符串还是整数，以及数据的大小，会使用不同空间大小的 prevlen 和 encoding 这两个元素里保存的信息，<strong>这种根据数据大小和类型进行不同的空间大小分配的设计思想，正是 Redis 为了节省内存而采用的</strong>。</p>
<p>分别说下，prevlen 和 encoding 是如何根据数据的大小和类型来进行不同的空间大小分配。</p>
<p>压缩列表里的每个节点中的  prevlen 属性都记录了「前一个节点的长度」，而且 prevlen 属性的空间大小跟前一个节点长度值有关，比如：</p>
<ul>
<li>如果<strong>前一个节点的长度小于 254 字节</strong>，那么 prevlen 属性需要用 <strong>1 字节的空间</strong>来保存这个长度值；</li>
<li>如果<strong>前一个节点的长度大于等于 254 字节</strong>，那么 prevlen 属性需要用 <strong>5 字节的空间</strong>来保存这个长度值；</li>
</ul>
<p>encoding 属性的空间大小跟数据是字符串还是整数，以及字符串的长度有关：</p>
<ul>
<li>如果<strong>当前节点的数据是整数</strong>，则 encoding 会使用 <strong>1 字节的空间</strong>进行编码。</li>
<li>如果<strong>当前节点的数据是字符串，根据字符串的长度大小</strong>，encoding 会使用 <strong>1 字节/2字节/5字节的空间</strong>进行编码。</li>
</ul>
<p>因此，<strong>压缩列表只会用于保存的节点数量不多的场景</strong>，只要节点数量足够小，即使发生连锁更新，也是能接受的。</p>
<blockquote>
<p>虽说如此，Redis 针对压缩列表在设计上的不足，在后来的版本中，新增设计了两种数据结构：quicklist（Redis 3.2 引入） 和 listpack（Redis 5.0 引入）。<strong>这两种数据结构的设计目标，就是尽可能地保持压缩列表节省内存的优势，同时解决压缩列表的「连锁更新」的问题</strong>。</p>
</blockquote>
<h2 id="压缩列表的缺陷" tabindex="-1"><a class="header-anchor" href="#压缩列表的缺陷" aria-hidden="true">#</a> 压缩列表的缺陷</h2>
<p>空间扩展操作也就是重新分配内存，因此<strong>连锁更新一旦发生，就会导致压缩列表占用的内存空间要多次重新分配，这就会直接影响到压缩列表的访问性能</strong>。</p>
<p>所以说，<strong>虽然压缩列表紧凑型的内存布局能节省内存开销，但是如果保存的元素数量增加了，或是元素变大了，会导致内存重新分配，最糟糕的是会有「连锁更新」的问题</strong>。</p>
<h1 id="quicklist" tabindex="-1"><a class="header-anchor" href="#quicklist" aria-hidden="true">#</a> quicklist</h1>
<blockquote>
<p>在 Redis 3.0 之前，List 对象的底层数据结构是双向链表或者压缩列表。然后在  Redis 3.2 的时候，List 对象的底层改由 quicklist 数据结构实现。</p>
</blockquote>
<p>在 Redis 3.0 之前，List 对象的底层数据结构是双向链表或者压缩列表。然后在  Redis 3.2 的时候，List 对象的底层改由 quicklist 数据结构实现。</p>
<p>其实 <strong>quicklist 就是「双向链表 + 压缩列表」组合，因为一个 quicklist 就是一个链表，而链表中的每个元素又是一个压缩列表</strong>。</p>
<p>在前面讲压缩列表的时候，我也提到了压缩列表的不足，虽然压缩列表是通过紧凑型的内存布局节省了内存开销，但是因为它的结构设计，如果保存的元素数量增加，或者元素变大了，压缩列表会有「连锁更新」的风险，一旦发生，会造成性能下降。</p>
<p>quicklist 解决办法，<strong>通过控制每个链表节点中的压缩列表的大小或者元素个数，来规避连锁更新的问题。因为压缩列表元素越少或越小，连锁更新带来的影响就越小，从而提供了更好的访问性能。</strong></p>
<h4 id="quicklist-结构设计" tabindex="-1"><a class="header-anchor" href="#quicklist-结构设计" aria-hidden="true">#</a> quicklist 结构设计</h4>
<p>quicklist 的结构体跟链表的结构体类似，都包含了表头和表尾，区别在于 quicklist 的节点是 quicklistNode。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklist</span> <span class="token punctuation">{</span>
    <span class="token comment">//quicklist的链表头</span>
    quicklistNode <span class="token operator">*</span>head<span class="token punctuation">;</span>      <span class="token comment">//quicklist的链表头</span>
    <span class="token comment">//quicklist的链表头</span>
    quicklistNode <span class="token operator">*</span>tail<span class="token punctuation">;</span> 
    <span class="token comment">//所有压缩列表中的总元素个数</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> count<span class="token punctuation">;</span>
    <span class="token comment">//quicklistNodes的个数</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> len<span class="token punctuation">;</span>       
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span> quicklist<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来看看，quicklistNode 的结构定义：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token punctuation">{</span>
    <span class="token comment">//前一个quicklistNode</span>
    <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token operator">*</span>prev<span class="token punctuation">;</span>     <span class="token comment">//前一个quicklistNode</span>
    <span class="token comment">//下一个quicklistNode</span>
    <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>     <span class="token comment">//后一个quicklistNode</span>
    <span class="token comment">//quicklistNode指向的压缩列表</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>zl<span class="token punctuation">;</span>              
    <span class="token comment">//压缩列表的的字节大小</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> sz<span class="token punctuation">;</span>                
    <span class="token comment">//压缩列表的元素个数</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> count <span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">;</span>        <span class="token comment">//ziplist中的元素个数 </span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span> quicklistNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，quicklistNode 结构体里包含了前一个节点和下一个节点指针，这样每个 quicklistNode 形成了一个双向链表。但是链表节点的元素不再是单纯保存元素值，而是保存了一个压缩列表，所以 quicklistNode 结构体里有个指向压缩列表的指针 *zl。</p>
<p>我画了一张图，方便你理解 quicklist 数据结构。</p>
<figure><img src="@source/posts/quicklist.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>在向 quicklist 添加一个元素的时候，不会像普通的链表那样，直接新建一个链表节点。而是会检查插入位置的压缩列表是否能容纳该元素，如果能容纳就直接保存到 quicklistNode 结构里的压缩列表，如果不能容纳，才会新建一个新的 quicklistNode 结构。</p>
<p>quicklist 会控制 quicklistNode 结构里的压缩列表的大小或者元素个数，来规避潜在的连锁更新的风险，但是这并没有完全解决连锁更新的问题。</p>
<h1 id="哈希表" tabindex="-1"><a class="header-anchor" href="#哈希表" aria-hidden="true">#</a> 哈希表</h1>
<p><strong>Redis 采用了「链式哈希」来解决哈希冲突</strong>，在不扩容哈希表的前提下，将具有相同哈希值的数据串起来，形成链接起，以便这些数据在表中仍然可以被查询到。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">dictht</span> <span class="token punctuation">{</span>
    <span class="token comment">//哈希表数组</span>
    dictEntry <span class="token operator">*</span><span class="token operator">*</span>table<span class="token punctuation">;</span>
    <span class="token comment">//哈希表大小</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> size<span class="token punctuation">;</span>  
    <span class="token comment">//哈希表大小掩码，用于计算索引值</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> sizemask<span class="token punctuation">;</span>
    <span class="token comment">//该哈希表已有的节点数量</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> used<span class="token punctuation">;</span>
<span class="token punctuation">}</span> dictht<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，哈希表是一个数组（dictEntry **table），数组的每个元素是一个指向「哈希表节点（dictEntry）」的指针。</p>
<figure><img src="@source/posts/hash1.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>哈希表节点的结构如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">dictEntry</span> <span class="token punctuation">{</span>
    <span class="token comment">//键值对中的键</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>key<span class="token punctuation">;</span>

    <span class="token comment">//键值对中的值</span>
    <span class="token keyword">union</span> <span class="token punctuation">{</span>
        <span class="token keyword">void</span> <span class="token operator">*</span>val<span class="token punctuation">;</span>
        <span class="token class-name">uint64_t</span> u64<span class="token punctuation">;</span>
        <span class="token class-name">int64_t</span> s64<span class="token punctuation">;</span>
        <span class="token keyword">double</span> d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> v<span class="token punctuation">;</span>
    <span class="token comment">//指向下一个哈希表节点，形成链表</span>
    <span class="token keyword">struct</span> <span class="token class-name">dictEntry</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span> dictEntry<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dictEntry 结构里不仅包含指向键和值的指针，还包含了指向下一个哈希表节点的指针，这个指针可以将多个哈希值相同的键值对链接起来，以此来解决哈希冲突的问题，这就是链式哈希。</p>
<p>另外，这里还跟你提一下，dictEntry 结构里键值对中的值是一个「联合体 v」定义的，因此，键值对中的值可以是一个指向实际值的指针，或者是一个无符号的 64 位整数或有符号的 64 位整数或double 类的值。这么做的好处是可以节省内存空间，因为当「值」是整数或浮点数时，就可以将值的数据内嵌在 dictEntry 结构里，无需再用一个指针指向实际的值，从而节省了内存空间。</p>
<h2 id="渐进式rehash" tabindex="-1"><a class="header-anchor" href="#渐进式rehash" aria-hidden="true">#</a> 渐进式rehash</h2>
<p>哈希表结构设计的这一小节，我给大家介绍了 Redis 使用 dictht 结构体表示哈希表。不过，在实际使用哈希表时，Redis 定义一个 dict 结构体，这个结构体里定义了<strong>两个哈希表（ht[2]）</strong>。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">dict</span> <span class="token punctuation">{</span>
    …
    <span class="token comment">//两个Hash表，交替使用，用于rehash操作</span>
    dictht ht<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
    …
<span class="token punctuation">}</span> dict<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之所以定义了 2 个哈希表，是因为进行 rehash 的时候，需要用上 2 个哈希表了。</p>
<figure><img src="@source/posts/hash1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>在正常服务请求阶段，插入的数据，都会写入到「哈希表 1」，此时的「哈希表 2 」 并没有被分配空间。</p>
<p>随着数据逐步增多，触发了 rehash 操作，这个过程分为三步：</p>
<ul>
<li>给「哈希表 2」 分配空间，一般会比「哈希表 1」 大 2 倍；</li>
<li>将「哈希表 1 」的数据迁移到「哈希表 2」 中；</li>
<li>迁移完成后，「哈希表 1 」的空间会被释放，并把「哈希表 2」 设置为「哈希表 1」，然后在「哈希表 2」 新创建一个空白的哈希表，为下次 rehash 做准备。</li>
</ul>
<p>为了方便你理解，我把 rehash 这三个过程画在了下面这张图：</p>
<figure><img src="@source/posts/hash2.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>这个过程看起来简单，但是其实第二步很有问题，<strong>如果「哈希表 1 」的数据量非常大，那么在迁移至「哈希表 2 」的时候，因为会涉及大量的数据拷贝，此时可能会对 Redis 造成阻塞，无法服务其他请求</strong>。</p>
<p>为了避免 rehash 在数据迁移过程中，因拷贝数据的耗时，影响 Redis 性能的情况，所以 Redis 采用了<strong>渐进式 rehash</strong>，也就是将数据的迁移的工作不再是一次性迁移完成，而是分多次迁移。</p>
<p>渐进式 rehash 步骤如下：</p>
<ul>
<li>给「哈希表 2」 分配空间；</li>
<li><strong>在 rehash 进行期间，每次哈希表元素进行新增、删除、查找或者更新操作时，Redis 除了会执行对应的操作之外，还会顺序将「哈希表 1 」中索引位置上的所有 key-value 迁移到「哈希表 2」 上</strong>；</li>
<li>随着处理客户端发起的哈希表操作请求数量越多，最终在某个时间嗲呢，会把「哈希表 1 」的所有 key-value 迁移到「哈希表 2」，从而完成 rehash 操作。</li>
</ul>
<p><strong>这样就巧妙地把一次性大量数据迁移工作的开销，分摊到了多次处理请求的过程中，避免了一次性 rehash 的耗时操作</strong>。</p>
<p><strong>在进行渐进式 rehash 的过程中，会有两个哈希表，所以在渐进式 rehash 进行期间，哈希表元素的删除、查找、更新等操作都会在这两个哈希表进行。</strong></p>
<p>比如，查找一个 key 的值的话，先会在「哈希表 1」 里面进行查找，如果没找到，就会继续到哈希表 2 里面进行找到。</p>
<p>另外，<strong>在渐进式 rehash 进行期间，新增一个 key-value 时，会被保存到「哈希表 2 」里面，而「哈希表 1」 则不再进行任何添加操作，这样保证了「哈希表 1 」的 key-value 数量只会减少</strong>，随着 rehash 操作的完成，最终「哈希表 1 」就会变成空表。</p>
<p><strong>rehash 触发条件</strong>
触发 rehash 操作的条件，主要有两个：</p>
<ol>
<li>当负载因子大于等于 1 ，并且 Redis 没有在执行 bgsave 命令或者 bgrewiteaof 命令，也就是没有执行 RDB 快照或没有进行 AOF 重写的时候，就会进行 rehash 操作。</li>
<li>当负载因子大于等于 5 时，此时说明哈希冲突非常严重了，不管有没有有在执行 RDB 快照或 AOF 重写，都会强制进行 rehash 操作。</li>
</ol>
<p>（负载因子=节点数/哈希表容量）</p>
<h1 id="跳表" tabindex="-1"><a class="header-anchor" href="#跳表" aria-hidden="true">#</a> 跳表</h1>
<p>Redis 只有在 Zset 对象的底层实现用到了跳表，跳表的优势是能支持平均 O(logN) 复杂度的节点查找。</p>
<p>Zset 对象是唯一一个同时使用了两个数据结构来实现的 Redis 对象，这两个数据结构一个是跳表，一个是哈希表。这样的好处是既能进行高效的范围查询，也能进行高效单点查询。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">zset</span> <span class="token punctuation">{</span>
    dict <span class="token operator">*</span>dict<span class="token punctuation">;</span>     <span class="token comment">// map用来存储member到score的映射，这样就实现了set部分的功能；并可以在O(1)时间内找到member对应的分数；</span>
    zskiplist <span class="token operator">*</span>zsl<span class="token punctuation">;</span> <span class="token comment">// skiplist按score从小到大的顺序存储节点</span>
<span class="token punctuation">}</span> zset<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Zset 对象能支持范围查询（如 ZRANGEBYSCORE 操作），这是因为它的数据结构设计采用了跳表，而又能以常数复杂度获取元素权重（如 ZSCORE 操作），这是因为它同时采用了哈希表进行索引。</p>
<h2 id="跳表结构设计" tabindex="-1"><a class="header-anchor" href="#跳表结构设计" aria-hidden="true">#</a> 跳表结构设计</h2>
<p>链表在查找元素的时候，因为需要逐一查找，所以查询效率非常低，时间复杂度是O(N)，于是就出现了跳表。<strong>跳表是在链表基础上改进过来的，实现了一种「多层」的有序链表</strong>，这样的好处是能快读定位数据。</p>
<p>那跳表长什么样呢？我这里举个例子，下图展示了一个层级为 3 的跳表。</p>
<figure><img src="https://mmbiz.qpic.cn/mmbiz_png/J0g14CUwaZc0xXMUofrwAVS3mR0DxcWCQibqN7sJ9zUaiaE6pkqs2gKDw3GKFibiaK5EOTq5m7Sdnpplfht6Y8ia8Bg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>图中头节点有 L0~L2 三个头指针，分别指向了不同层级的节点，然后每个层级的节点都通过指针连接起来：</p>
<ul>
<li>L0 层级共有 5 个节点，分别是节点1、2、3、4、5；</li>
<li>L1 层级共有 3 个节点，分别是节点 2、3、5；</li>
<li>L2 层级只有 1 个节点，也就是节点 3 。</li>
</ul>
<p>如果我们要在链表中查找节点 4 这个元素，只能从头开始遍历链表，需要查找 4 次，而使用了跳表后，只需要查找 2 次就能定位到节点 4，因为可以在头节点直接从 L2 层级跳到节点 3，然后再往前遍历找到节点 4。</p>
<p>可以看到，这个查找过程就是在多个层级上跳来跳去，最后定位到元素。当数据量很大时，跳表的查找复杂度就是 O(logN)。</p>
<p>那跳表节点是怎么实现多层级的呢？这就需要看「跳表节点」的数据结构了，如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token punctuation">{</span>
    <span class="token comment">//Zset 对象的元素值</span>
    sds ele<span class="token punctuation">;</span>
    <span class="token comment">//元素权重值</span>
    <span class="token keyword">double</span> score<span class="token punctuation">;</span>
    <span class="token comment">//后向指针</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>backward<span class="token punctuation">;</span>

    <span class="token comment">//节点的level数组，保存每层上的前向指针和跨度</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistLevel</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>forward<span class="token punctuation">;</span>
        <span class="token keyword">unsigned</span> <span class="token keyword">long</span> span<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> level<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> zskiplistNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Zset 对象要同时保存元素和元素的权重，对应到跳表节点结构里就是 sds 类型的 ele 变量和 double 类型的 score 变量。<strong>每个跳表节点都有一个后向指针，指向前一个节点，目的是为了方便从跳表的尾节点开始访问节点，这样倒序查找时很方便</strong>。</p>
<p>跳表是一个带有层级关系的链表，而且每一层级可以包含多个节点，每一个节点通过指针连接起来，实现这一特性就是靠跳表节点结构体中的<strong>zskiplistLevel 结构体类型的 level 数组</strong>。</p>
<p>level 数组中的每一个元素代表跳表的一层，也就是由 zskiplistLevel 结构体表示，比如 leve[0] 就表示第一层，leve[1] 就表示第二层。zskiplistLevel 结构体里定义了「指向下一个跳表节点的指针」和「跨度」，跨度时用来记录两个节点之间的距离。</p>
<p>比如，下面这张图，展示了各个节点的跨度。</p>
<figure><img src="@source/posts/zset1.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>第一眼看到跨度的时候，以为是遍历操作有关，实际上并没有任何关系，遍历操作只需要用前向指针就可以完成了。</p>
<p><strong>跨度实际上是为了计算这个节点在跳表中的排名</strong>。具体怎么做的呢？因为跳表中的节点都是按序排列的，那么计算某个节点排位的时候，从头节点点到该结点的查询路径上，将沿途访问过的所有层的跨度累加起来，得到的结果就是目标节点在跳表中的排位。</p>
<p>举个例子，查找图中节点 3 在跳表中的排位，从头节点开始查找节点 3，查找的过程只经过了一个层（L3），并且层的跨度是 3，所以节点 3 在跳表中的排位是 3。</p>
<p>另外，图中的头节点其实也是 zskiplistNode 跳表节点，只不过头节点的后向指针、权重、元素值都会被用到，所以图中省略了这部分。</p>
<p>问题来了，由谁定义哪个跳表节点是头节点呢？这就介绍「跳表」结构体了，如下所示：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">zskiplist</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>header<span class="token punctuation">,</span> <span class="token operator">*</span>tail<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> length<span class="token punctuation">;</span>
    <span class="token keyword">int</span> level<span class="token punctuation">;</span>
<span class="token punctuation">}</span> zskiplist<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跳表结构里包含了：</p>
<ul>
<li>跳表的头尾节点，便于在O(1)时间复杂度内访问跳表的头节点和尾节点；</li>
<li>跳表的长度，便于在O(1)时间复杂度获取跳表节点的数量；</li>
<li>跳表的最大层数，便于在O(1)时间复杂度获取跳表中层高最大的那个节点的层数量；</li>
<li></li>
</ul>
<h2 id="跳表节点查询过程" tabindex="-1"><a class="header-anchor" href="#跳表节点查询过程" aria-hidden="true">#</a> 跳表节点查询过程</h2>
<p>查找一个跳表节点的过程时，跳表会从头节点的最高层开始，逐一遍历每一层。在遍历某一层的跳表节点时，会用跳表节点中的 SDS 类型的元素和元素的权重来进行判断，共有两个判断条件：</p>
<ul>
<li>如果当前节点的权重「小于」要查找的权重时，跳表就会访问该层上的下一个节点。</li>
<li>如果当前节点的权重「等于」要查找的权重时，并且当前节点的 SDS 类型数据「小于」要查找的数据时，跳表就会访问该层上的下一个节点。</li>
</ul>
<p>如果上面两个条件都不满足，或者下一个节点为空时，跳表就会使用目前遍历到的节点的 level 数组里的下一层指针，然后沿着下一层指针继续查找，这就相当于跳到了下一层接着查找。</p>
<p>举个例子，下图有个 3 层级的跳表。</p>
<figure><img src="@source/posts/zset2.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>如果要查找「元素：abcd，权重：4」的节点，查找的过程是这样的：</p>
<ul>
<li>先从头节点的最高层开始，L2 指向了「元素：abc，权重：3」节点，这个节点的权重比要查找节点的小，所以要访问该层上的下一个节点；</li>
<li>但是该层上的下一个节点是空节点，于是就会跳到「元素：abc，权重：3」节点的下一层去找，也就是 leve[1];</li>
<li>「元素：abc，权重：3」节点的  leve[1] 的下一个指针指向了「元素：abcde，权重：4」的节点，然后将其和要查找的节点比较。虽然「元素：abcde，权重：4」的节点的权重和要查找的权重相同，但是当前节点的 SDS 类型数据「大于」要查找的数据，所以会继续跳到「元素：abc，权重：3」节点的下一层去找，也就是 leve[0]；</li>
<li>「元素：abc，权重：3」节点的 leve[0] 的下一个指针指向了「元素：abcd，权重：4」的节点，该节点正是要查找的节点，查询结束。</li>
</ul>
<h2 id="跳表节点层数设置" tabindex="-1"><a class="header-anchor" href="#跳表节点层数设置" aria-hidden="true">#</a> 跳表节点层数设置</h2>
<p>跳表的相邻两层的节点数量的比例会影响跳表的查询性能。</p>
<p>举个例子，下图的跳表，第二层的节点数量只有 1 个，而第一层的节点数量有 6 个。</p>
<figure><img src="@source/posts/zset3.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>这时，如果想要查询节点 6，那基本就跟链表的查询复杂度一样，就需要在第一层的节点中依次顺序查找，复杂度就是 O(N) 了。所以，为了降低查询复杂度，我们就需要维持相邻层结点数间的关系。</p>
<p><strong>跳表的相邻两层的节点数量最理想的比例是 2:1，查找复杂度可以降低到 O(logN)</strong>。</p>
<p>下图的跳表就是，相邻两层的节点数量的比例是 2 : 1。</p>
<figure><img src="@source/posts/zset4.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<blockquote>
<p>那怎样才能维持相邻两层的节点数量的比例为 2 : 1  呢？</p>
</blockquote>
<p>如果采用新增节点或者删除节点时，来调整跳表节点以维持比例的方法的话，会带来额外的开销。</p>
<p>Redis 则采用一种巧妙的方法是，<strong>跳表在创建节点的时候，随机生成每个节点的层数</strong>，并没有严格维持相邻两层的节点数量比例为 2 : 1 的情况。</p>
<p>具体的做法是，<strong>跳表在创建节点时候，会生成范围为[0-1]的一个随机数，如果这个随机数小于 0.25（相当于概率 25%），那么层数就增加 1 层，然后继续生成下一个随机数，直到随机数的结果大于 0.25 结束，最终确定该节点的层数</strong>。</p>
<p>这样的做法，相当于每增加一层的概率不超过 25%，层数越高，概率越低，层高最大限制是 64。</p>
</div></template>


