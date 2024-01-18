<template><div><h1 id="问题简介" tabindex="-1"><a class="header-anchor" href="#问题简介" aria-hidden="true">#</a> 问题简介</h1>
<p>这里的海量数据问题不是指的一般性的大数据问题，指的是由大量数字、字符串等构成的大数据集，我们需要处理解决如下几种典型的计算问题：计数、排序、去重、交集、TopK等等。</p>
<p>问题的关键点在于，如此庞大的数据无法一次性放到内存里面，因而处理方案就没有那么简单了。</p>
<ol>
<li>
<p><strong>计数</strong>
海量数字，哪个数字出现的次数最多？</p>
</li>
<li>
<p><strong>排序</strong>
10G的数字，将其排序。</p>
</li>
<li>
<p><strong>去重</strong></p>
<p>海量日志，去除其中重复的数据。</p>
</li>
<li>
<p><strong>交集</strong></p>
<p>两个各有20亿行的文件，每一行都只有一个数字，求这两个文件的交集。</p>
</li>
<li>
<p><strong>TopK</strong></p>
<p>10G整数求中位数。</p>
</li>
</ol>
<h1 id="典型问题分析" tabindex="-1"><a class="header-anchor" href="#典型问题分析" aria-hidden="true">#</a> 典型问题分析</h1>
<h2 id="排序" tabindex="-1"><a class="header-anchor" href="#排序" aria-hidden="true">#</a> 排序</h2>
<p><a href="https://songyangji.gitee.io/2022/03/20/%E5%A4%A7%E6%96%87%E4%BB%B6%E6%8E%92%E5%BA%8F/" target="_blank" rel="noopener noreferrer">大文件排序<ExternalLinkIcon/></a></p>
<p>可参考上面的博客。</p>
<h2 id="去重——海量日志-去除其中重复的数据。" tabindex="-1"><a class="header-anchor" href="#去重——海量日志-去除其中重复的数据。" aria-hidden="true">#</a> 去重——海量日志，去除其中重复的数据。</h2>
<blockquote>
<p>如果是32位int的话，可以考虑位图bitmap之类的，不过这里我们直接分析更一般性的问题。</p>
</blockquote>
<p><strong>哈希文件分片</strong></p>
<p>首先根据数据量估算一下需要拆分成多少的小文件后可以放在内存里处理。比如1TB的字符串可能需要分成1024个小文件才可以处理。</p>
<p>对每一条一条数据记录， 根据某种hash规则，求取hash(url) %1024，然后根据所取得的值将数据记录分别存储到1024个小文件（a0~a1023）中。hash结果很集中使得某个文件ai过大，可以再对ai进行二级hash(ai0~ai1024)，这样数据就又被hash到 1024 个不同级别的文件中。  每一个小文件是可以单独进行处理的。</p>
<blockquote>
<p>这里有一个小问题，就是上面的处理的方式默认数据基本上均匀分布的，但是如果说某一单个字符串本身就出现了很多很多此，那么二级hash、三级hash都没有用，这个时候需要在最终的放在内存处理前，先对这些hash无法减小数据量的文件进行compact操作，也就是提前去除那些重复字符串。</p>
</blockquote>
<h2 id="计数" tabindex="-1"><a class="header-anchor" href="#计数" aria-hidden="true">#</a> 计数</h2>
<p>计数指的是要计算一条记录出现的次数，这个问题的处理方式本质上和上面的<strong>去重</strong>是一回事的。</p>
<h2 id="交集" tabindex="-1"><a class="header-anchor" href="#交集" aria-hidden="true">#</a> 交集</h2>
<h3 id="有a、b两个文件-各存放50亿个url-每个url各占64字节-内存限制是4g-让你找出a、b文件共同的url" tabindex="-1"><a class="header-anchor" href="#有a、b两个文件-各存放50亿个url-每个url各占64字节-内存限制是4g-让你找出a、b文件共同的url" aria-hidden="true">#</a> 有a、b两个文件，各存放50亿个url，每个url各占64字节，内存限制是4G，让你找出a、b文件共同的url？</h3>
<blockquote>
<p>解决方案1：hash 分解+ 分而治之 + 归并 的方式：</p>
</blockquote>
<p>如果内存中想要存入所有的 url，共需要 50亿 * 64= 320G大小空间，所以采用 hash 分解+ 分而治之 + 归并 的方式：</p>
<p>（1）遍历文件a，对每个 url 根据某种hash规则，求取hash(url) %1024，然后根据所取得的值将 url 分别存储到1024个小文件（a0~a1023）中。这样每个小文件的大约为300M。如果hash结果很集中使得某个文件ai过大，可以再对ai进行二级hash(ai0~ai1024)，这样 url 就被hash到 1024 个不同级别的文件中。对文件b也是相同的处理方式。</p>
<p>（2）分别比较文件，a0 VS b0，…… ，a1023 VS b1023，求每对小文件中相同的url时：把其中一个小文件的 url 存储到 hashmap 中，然后遍历另一个小文件的每个url，看其是否在刚才构建的 hashmap 中，如果是，那么就是共同的url，存到文件中。</p>
<p>（3）把1024个文件中的相同 url 合并起来，比如写到文件里。</p>
<blockquote>
<p>解决方案2：Bloom filter</p>
</blockquote>
<p>如果允许有一定的错误率，可以使用 Bloom filter。
将其中一个文件中的 url载入 Bloom filter，然后挨个读取另外一个文件的url，检查是否与Bloom filter，如果是，那么该url应该是共同的url（注意会有一定的错误率）</p>
<h3 id="现有两个各有20亿行的文件-每一行都只有一个int型数字-求这两个文件的交集。" tabindex="-1"><a class="header-anchor" href="#现有两个各有20亿行的文件-每一行都只有一个int型数字-求这两个文件的交集。" aria-hidden="true">#</a> 现有两个各有20亿行的文件，每一行都只有一个int型数字，求这两个文件的交集。</h3>
<p><strong>解决方案</strong>：采用 bitmap 进行问题解决，int 的[最大数]是 2^32 = 4G。</p>
<p>用一个二进制的下标来表示一个 int 值，大概需要4G个bit位，即约4G/8 = 512M的内存，就可以解决问题了。</p>
<p>① <strong>首先</strong>遍历文件，将每个文件按照数字的正数，负数标记到2个 bitmap 上，为：正数 bitmapA_positive，负数 bitmapA_negative；</p>
<p>② <strong>遍历</strong>另外一个文件，生成正数：bitmapB_positive，bitmapB_negative；</p>
<p>③ 取 bitmapA_positive and bitmapB_positive 得到2个文件的正数的交集，同理得到负数的交集；</p>
<p>④ 合并，问题解决。</p>
<h2 id="topk——10g整数求中位数" tabindex="-1"><a class="header-anchor" href="#topk——10g整数求中位数" aria-hidden="true">#</a> TopK——10G整数求中位数</h2>
<ol>
<li>
<p>分桶法</p>
<p>思路：化大为小，把所有数划分到各个小区间，把每个数映射到对应的区间里，对每个区间中数的个数进行计数，数一遍各个区间，看看中位数落在哪个区间，若够小，使用基于内存的算法，否则 继续划分。
具体的：
假设整数是32位的，根据每个整数二进制前的5位，可以划分为32个不同的桶，如果某个桶的个数在内存中放不下，则继续划分，知道内存可以放下为止；然后统计每个桶中的数的个数，就可以中位数一定出现在哪个桶中，而且知道是该桶中第几大数，因为桶的划分是根据二进制前缀来进行划分的，桶之间是排好序的。</p>
</li>
<li>
<p>分治+递归</p>
<p>题目说是整数，我们认为是带符号的int,所以4字节，占32位。
假设100亿个数字保存在一个大文件中，依次读一部分文件到内存(不超过内存的限制)，将每个数字用二进制表示，比较二进制的最高位(第32位，符号位，0是正，1是负)，如果数字的最高位为0，则将这个数字写入 file_0文件中；如果最高位为 1，则将该数字写入file_1文件中。
从而将100亿个数字分成了两个文件，假设 file_0文件中有 60亿 个数字，file_1文件中有 40亿 个数字。那么中位数就在 file_0 文件中，并且是 file_0 文件中所有数字排序之后的第 10亿 个数字。（file_1中的数都是负数，file_0中的数都是正数，也即这里一共只有40亿个负数，那么排序之后的第50亿个数一定位于file_0中）
现在，我们只需要处理 file_0 文件了（不需要再考虑file_1文件）。对于 file_0 文件，同样采取上面的措施处理：将file_0文件依次读一部分到内存(不超内存限制)，将每个数字用二进制表示，比较二进制的 次高位（第31位），如果数字的次高位为0，写入file_0_0文件中；如果次高位为1，写入file_0_1文件 中。
现假设 file_0_0文件中有30亿个数字，file_0_1中也有30亿个数字，则中位数就是：file_0_0文件中的数字从小到大排序之后的第10亿个数字。
抛弃file_0_1文件，继续对 file_0_0文件 根据 次次高位(第30位) 划分，假设此次划分的两个文件为：file_0_0_0中有5亿个数字，file_0_0_1中有25亿个数字，那么中位数就是 file_0_0_1文件中的所有数字排序之后的 第 5亿 个数。</p>
</li>
</ol>
<blockquote>
<p>参考文章</p>
<p>https://www.cnblogs.com/GarrettWale/p/14478347.html</p>
<p>https://blog.csdn.net/hustwht/article/details/52181632</p>
<p>https://guozi149.me/%E8%AE%A1%E7%AE%97%E6%9C%BA/%E7%AE%97%E6%B3%95/100%E4%BA%BF%E6%9D%A1URL%E5%8E%BB%E9%87%8D/</p>
<p>https://www.cnblogs.com/luxiaoxun/p/14392375.html</p>
</blockquote>
</div></template>


