<template><div><h2 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存" aria-hidden="true">#</a> 缓存</h2>
<p>最常见的使用方式。</p>
<h2 id="分布式锁" tabindex="-1"><a class="header-anchor" href="#分布式锁" aria-hidden="true">#</a> 分布式锁</h2>
<p>https://songyangji.gitee.io/2021/11/29/Redis%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81/</p>
<h2 id="排行榜" tabindex="-1"><a class="header-anchor" href="#排行榜" aria-hidden="true">#</a> 排行榜</h2>
<p>在线比赛的排行榜。</p>
<p>使用 zset即可。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GameService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">RedisTemplate</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token class-name">ZSetOperations</span> ops<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ops <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForZSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">incrUserScoreInGame</span><span class="token punctuation">(</span><span class="token class-name">String</span> gameId<span class="token punctuation">,</span> <span class="token keyword">int</span> uid<span class="token punctuation">,</span> <span class="token keyword">double</span> addedScore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ops<span class="token punctuation">.</span><span class="token function">incrementScore</span><span class="token punctuation">(</span>gameId<span class="token punctuation">,</span> uid<span class="token punctuation">,</span> addedScore<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addUserWithScore</span><span class="token punctuation">(</span><span class="token class-name">String</span> gameId<span class="token punctuation">,</span> <span class="token keyword">int</span> uid<span class="token punctuation">,</span> <span class="token keyword">double</span> score<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ops<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>gameId<span class="token punctuation">,</span> uid<span class="token punctuation">,</span> score<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserScore</span><span class="token punctuation">></span></span> <span class="token function">getTopK</span><span class="token punctuation">(</span><span class="token class-name">String</span> gameId<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ZSetOperations<span class="token punctuation">.</span>TypedTuple</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span><span class="token punctuation">></span></span> set <span class="token operator">=</span> ops<span class="token punctuation">.</span><span class="token function">rangeWithScores</span><span class="token punctuation">(</span>gameId<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> k <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserScore</span><span class="token punctuation">></span></span> objects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">assert</span> set <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ZSetOperations<span class="token punctuation">.</span>TypedTuple</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> tuple <span class="token operator">:</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">UserScore</span> userScore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserScore</span><span class="token punctuation">(</span>tuple<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">:</span> tuple<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">,</span> tuple<span class="token punctuation">.</span><span class="token function">getScore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span><span class="token number">0</span> <span class="token operator">:</span> tuple<span class="token punctuation">.</span><span class="token function">getScore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            objects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>userScore<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> objects<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大数据量进行排名时候，分数的累加是具有规律性的，就是说一般不会突然一下子加10000分，减10000分。而是+10，-10。那么可以得出这么一个结论：在一般情况下，前十名的用户是由前1000名（也可以是2000名，结合具体业务来）来产出的。所以给出这样的策略：1.第一次跑批得出前1000名的uid，进行排序，计算出前10名进行展示。2.10分钟内，只统计这1000个uid的分数变化情况，产出10名。3.定时任务10分钟一次跑全量数据跑出最新的1000个uid，计算前10。4.如果遇到大分数累加事件，直接将该用户当前积分和第1000个uid分数进行比较，分数低的uid进行抛弃。</p>
<p>zset只存10个，每次写入前判断下第10名的value，大于就写入，并存储更新第10名的value，难道不是这样做？</p>
<h2 id="签到" tabindex="-1"><a class="header-anchor" href="#签到" aria-hidden="true">#</a> 签到</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">void</span> <span class="token function">testBitMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 示例：使用BitMap记录用户本周是否有签到</span>
        <span class="token keyword">final</span> <span class="token keyword">long</span> userId <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// final long userId = 1L;</span>
        <span class="token comment">// userId高48位用于将用户划分到不同的key，低16位作为位图偏移参数offset;</span>
        <span class="token class-name">String</span> keySign <span class="token operator">=</span> <span class="token string">"user:sign:"</span> <span class="token operator">+</span> <span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDayOfWeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> <span class="token punctuation">(</span>userId <span class="token operator">>></span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// offset参数必须大于或等于0，小于2^32(bit 映射被限制在 512 MB 之内)</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setBit</span><span class="token punctuation">(</span>keySign<span class="token punctuation">,</span> userId <span class="token operator">&amp;</span> <span class="token number">0xffff</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"是否签到："</span> <span class="token operator">+</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBit</span><span class="token punctuation">(</span>keySign<span class="token punctuation">,</span> userId <span class="token operator">&amp;</span> <span class="token number">0xffff</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"是否签到："</span> <span class="token operator">+</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBit</span><span class="token punctuation">(</span>keySign<span class="token punctuation">,</span> <span class="token punctuation">(</span>userId <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0xffff</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="面对面开房间" tabindex="-1"><a class="header-anchor" href="#面对面开房间" aria-hidden="true">#</a> 面对面开房间</h2>
<p>https://www.cnblogs.com/54chensongxia/p/13813533.html</p>
<p>https://www.runoob.com/html/html5-geolocation.html</p>
<p>数据结构：</p>
<p>6位的房间号 ： 1000，000；</p>
<p><code v-pre>longitude:latitude</code></p>
<blockquote>
<p>在经线上，纬度每差1度,实地距离大约为111千米；</p>
<p>在纬线上，经度每差1度,实际距离为111×cosθ千米。（其中θ表示该纬线的纬度.在不同纬线上,经度每差1度的实际距离是不相等的）。</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 添加一个空间元素,longitude、latitude、member分别是该地理位置的经度、纬度、成员</span>
<span class="token comment"># 这里的成员就是指代具体的业务数据，比如说用户的ID等</span>
<span class="token comment"># 需要注意的是Redis的纬度有效范围不是[-90,90]而是[-85,85]</span>
<span class="token comment"># 如果在添加一个空间元素时，这个元素中的menber已经存在key中，那么GEOADD命令会返回0,相当于更新了这个menber的位置信息</span>
GEOADD key longitude latitude member <span class="token punctuation">[</span>longitude latitude member<span class="token punctuation">]</span>
<span class="token comment"># 用于添加城市的坐标信息</span>
geoadd cities:locations <span class="token number">117.12</span> <span class="token number">39.08</span> tianjin <span class="token number">114.29</span> <span class="token number">38.02</span> shijiazhuang <span class="token number">118.01</span> <span class="token number">39.38</span> tangshan <span class="token number">115.29</span> <span class="token number">38.51</span> baoding

<span class="token comment"># 获取地理位置信息</span>
geopos key member <span class="token punctuation">[</span>member <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token comment"># 获取天津的坐标</span>
geopos cities:locations tianjin

<span class="token comment"># 获取两个坐标之间的距离</span>
<span class="token comment"># unit代表单位，有4个单位值</span>
  - m <span class="token punctuation">(</span>meter<span class="token punctuation">)</span> 代表米
  - km （kilometer）代表千米
  - mi （miles）代表英里
  - ft （ft）代表尺
geodist key member1 member2 <span class="token punctuation">[</span>unit<span class="token punctuation">]</span>
<span class="token comment"># 获取天津和保定之间的距离</span>
GEODIST cities:locations tianjin baoding km

<span class="token comment"># 获取指定位置范围内的地理信息位置集合，此命令可以用于实现附近的人的功能</span>
<span class="token comment"># georadius和georadiusbymember两个命令的作用是一样的，都是以一个地理位置为中心算出指定半径内的其他地理信息位置，不同的是georadius命令的中心位置给出了具体的经纬度，georadiusbymember只需给出成员即可。其中radiusm|km|ft|mi是必需参数，指定了半径（带单位），这两个命令有很多可选参数，参数含义如下：</span>
<span class="token comment"># - withcoord：返回结果中包含经纬度。 </span>
<span class="token comment"># - withdist：返回结果中包含离中心节点位置的距离。</span>
<span class="token comment"># - withhash：返回结果中包含geohash，有关geohash后面介绍。</span>
<span class="token comment"># - COUNT count：指定返回结果的数量。</span>
<span class="token comment"># - asc|desc：返回结果按照离中心节点的距离做升序或者降序。</span>
<span class="token comment"># - store key：将返回结果的地理位置信息保存到指定键。</span>
<span class="token comment"># - storedist key：将返回结果离中心节点的距离保存到指定键。</span>
georadius key longitude latitude radiusm<span class="token operator">|</span>km<span class="token operator">|</span>ft<span class="token operator">|</span>mi <span class="token punctuation">[</span>withcoord<span class="token punctuation">]</span> <span class="token punctuation">[</span>withdist<span class="token punctuation">]</span> <span class="token punctuation">[</span>withhash<span class="token punctuation">]</span> <span class="token punctuation">[</span>COUNT count<span class="token punctuation">]</span> <span class="token punctuation">[</span>asc<span class="token operator">|</span>desc<span class="token punctuation">]</span> <span class="token punctuation">[</span>store key<span class="token punctuation">]</span> <span class="token punctuation">[</span>storedist key<span class="token punctuation">]</span>

georadiusbymember key member radiusm<span class="token operator">|</span>km<span class="token operator">|</span>ft<span class="token operator">|</span>mi <span class="token punctuation">[</span>withcoord<span class="token punctuation">]</span> <span class="token punctuation">[</span>withdist<span class="token punctuation">]</span> <span class="token punctuation">[</span>withhash<span class="token punctuation">]</span> <span class="token punctuation">[</span>COUNT count<span class="token punctuation">]</span> <span class="token punctuation">[</span>asc<span class="token operator">|</span>desc<span class="token punctuation">]</span> <span class="token punctuation">[</span>store key<span class="token punctuation">]</span> <span class="token punctuation">[</span>storedist key<span class="token punctuation">]</span>

<span class="token comment"># 获取geo hash</span>
<span class="token comment"># Redis使用geohash将二维经纬度转换为一维字符串，geohash有如下特点：</span>
<span class="token comment"># - GEO的数据类型为zset，Redis将所有地理位置信息的geohash存放在zset中。</span>
<span class="token comment"># - 字符串越长，表示的位置更精确，表3-8给出了字符串长度对应的精度，例如geohash长度为9时，精度在2米左右。长度和精度的对应关系，请参考：https://easyreadfs.nosdn.127.net/9F42_CKRFsfc8SUALbHKog==/8796093023252281390</span>
<span class="token comment"># - 两个字符串越相似，它们之间的距离越近，Redis利用字符串前缀匹配算法实现相关的命令。</span>
<span class="token comment"># - geohash编码和经纬度是可以相互转换的。</span>
<span class="token comment"># - Redis正是使用有序集合并结合geohash的特性实现了GEO的若干命令。</span>
geohash key member <span class="token punctuation">[</span>member <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 删除操作，GEO没有提供删除成员的命令，但是因为GEO的底层实现是zset，所以可以借用zrem命令实现对地理位置信息的删除。</span>
zrem key member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="限流" tabindex="-1"><a class="header-anchor" href="#限流" aria-hidden="true">#</a> 限流</h1>
<h2 id="第一种-基于redis的setnx的操作" tabindex="-1"><a class="header-anchor" href="#第一种-基于redis的setnx的操作" aria-hidden="true">#</a> 第一种：基于Redis的setnx的操作</h2>
<p>我们在使用Redis的分布式锁的时候，大家都知道是依靠了setnx的指令，在CAS（Compare and swap）的操作的时候，同时给指定的key设置了过期实践（expire），我们在限流的主要目的就是为了在单位时间内，有且仅有N数量的请求能够访问我的代码程序。所以依靠setnx可以很轻松的做到这方面的功能。</p>
<p>比如我们需要在10秒内限定20个请求，那么我们在setnx的时候可以设置过期时间10，当请求的setnx数量达到20时候即达到了限流效果。代码比较简单就不做展示了。</p>
<p>当然这种做法的弊端是很多的，比如当统计1-10秒的时候，无法统计2-11秒之内，如果需要统计N秒内的M个请求，那么我们的Redis中需要保持N个key等等问题</p>
<h2 id="第二种-基于redis的数据结构zset" tabindex="-1"><a class="header-anchor" href="#第二种-基于redis的数据结构zset" aria-hidden="true">#</a> 第二种：基于Redis的数据结构zset]</h2>
<p>其实限流涉及的最主要的就是滑动窗口，上面也提到1-10怎么变成2-11。其实也就是起始值和末端值都各+1即可。</p>
<p>而我们如果用Redis的list数据结构可以轻而易举的实现该功能</p>
<p>我们可以将请求打造成一个zset数组，当每一次请求进来的时候，value保持唯一，可以用UUID生成，而score可以用当前时间戳表示，因为score我们可以用来计算当前时间戳之内有多少的请求数量，而zset数据结构也提供了range方法让我们可以很轻易的获取到2个时间戳内有多少请求。</p>
<p>代码如下</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Response</span> <span class="token function">limitFlow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Long</span> currentTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>redisTemplate<span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span><span class="token string">"limit"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Integer</span> count <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForZSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rangeByScore</span><span class="token punctuation">(</span><span class="token string">"limit"</span><span class="token punctuation">,</span> currentTime <span class="token operator">-</span>  intervalTime<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// intervalTime是限流的时间 </span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> count <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token class-name">Response</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"每分钟最多只能访问5次"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForZSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"limit"</span><span class="token punctuation">,</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Response</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"访问成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述代码可以做到滑动窗口的效果，并且能保证每N秒内至多M个请求，缺点就是zset的数据结构会越来越大。实现方式相对也是比较简单的。</p>
<blockquote>
<p>基于微服务的思想，构建在 B2C 电商场景下的项目实战。核心技术栈，是 Spring Boot + Dubbo 。未来，会重构成 Spring Cloud Alibaba 。</p>
<p>项目地址：https://github.com/YunaiV/onemall</p>
</blockquote>
<h2 id="第三种-基于redis的令牌桶算法" tabindex="-1"><a class="header-anchor" href="#第三种-基于redis的令牌桶算法" aria-hidden="true">#</a> 第三种：基于Redis的令牌桶算法</h2>
<p>提到限流就不得不提到令牌桶算法了。</p>
<p>令牌桶算法提及到输入速率和输出速率，当输出速率大于输入速率，那么就是超出流量限制了。</p>
<p>也就是说我们每访问一次请求的时候，可以从Redis中获取一个令牌，如果拿到令牌了，那就说明没超出限制，而如果拿不到，则结果相反。</p>
<p>依靠上述的思想，我们可以<strong>结合Redis的List数据结构</strong>很轻易的做到这样的代码，只是简单实现</p>
<p><strong>依靠List的leftPop来获取令牌；</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 输出令牌</span>
<span class="token keyword">public</span> <span class="token class-name">Response</span> <span class="token function">limitFlow2</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Object</span> result <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">leftPop</span><span class="token punctuation">(</span><span class="token string">"limit_list"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Response</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"当前令牌桶中无令牌"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Response</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>articleDescription2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再<strong>依靠Java的定时任务，定时往List中rightPush令牌</strong>，当然令牌也需要唯一性，所以我这里还是用UUID进行了生成</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 10S的速率往令牌桶中添加UUID，只为保证唯一性</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedDelay <span class="token operator">=</span> <span class="token number">10_000</span><span class="token punctuation">,</span>initialDelay <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setIntervalTimeTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rightPush</span><span class="token punctuation">(</span><span class="token string">"limit_list"</span><span class="token punctuation">,</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>综上，代码实现起始都不是很难，针对这些限流方式我们可以在AOP或者filter中加入以上代码，用来做到接口的限流，最终保护你的网站。</p>
<p>Redis其实还有很多其他的用处，他的作用不仅仅是缓存，分布式锁的作用。他的数据结构也不仅仅是只有String，Hash，List，Set，Zset。有兴趣的可以后续了解下他的GeoHash算法；BitMap，HLL以及布隆过滤器数据(Redis4.0之后加入，可以用Docker直接安装redislabs/rebloom)结构。</p>
<blockquote>
<p>https://mp.weixin.qq.com/s/jT0WYISuSoi_hkTmELb7PQ</p>
</blockquote>
<h2 id="第四种-基于redis的漏桶算法" tabindex="-1"><a class="header-anchor" href="#第四种-基于redis的漏桶算法" aria-hidden="true">#</a> 第四种：基于Redis的漏桶算法</h2>
<p>https://juejin.cn/post/6844903982842789896</p>
</div></template>


