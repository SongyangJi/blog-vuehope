<template><div><h1 id="键" tabindex="-1"><a class="header-anchor" href="#键" aria-hidden="true">#</a> 键</h1>
<blockquote>
<p>命令不区分大小写，尽量使用大写，表明是Redis的关键字。</p>
</blockquote>
<h2 id="获得符合规则的键名列表" tabindex="-1"><a class="header-anchor" href="#获得符合规则的键名列表" aria-hidden="true">#</a> 获得符合规则的键名列表</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>KEYS your_pattern
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>pattern支持glob风格。</p>
<ol>
<li><code v-pre>？</code> 匹配单个字符；</li>
<li><code v-pre>*</code> 匹配任意个（包括0个）字符；</li>
<li><code v-pre>[]</code> 匹配 [] 括号间的任一字符，可以使用<code v-pre>-</code>表示范围，如a[b-d],表示匹配ab、ac、ad；</li>
<li><code v-pre>\x</code> 用于转义，匹配字符 x 本身。</li>
</ol>
<p>那么<code v-pre>KEYS *</code>实际上就会返回Redis中所有的键。</p>
<h2 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令" aria-hidden="true">#</a> 基本命令</h2>
<ol>
<li><strong>删除</strong></li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>DEL key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>存在并删除成功返回1，失败返回0；</p>
<ol start="2">
<li><strong>判断是否存在</strong></li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>EXISTS key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><strong>获取类型</strong></li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>TYPE key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回类型可能是（string字符串、hash散列、list列表、set集合、zset有序集合）</p>
<ol start="4">
<li>序列化给定 key</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>DUMP key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回被序列化的值</p>
<h2 id="生存时间相关" tabindex="-1"><a class="header-anchor" href="#生存时间相关" aria-hidden="true">#</a> 生存时间相关</h2>
<ol>
<li>为给定 key 设置过期时间</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>EXPIRE key seconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>单位秒。</p>
<ol start="2">
<li>设置 key 的过期时间以毫秒计</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PEXPIRE key milliseconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>和 EXPIRE 类似</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>EXPIREAT key timestamp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置过期时间。 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。</p>
<ol start="4">
<li>和 EXPIRE 类似</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PEXPIREAT key milliseconds-timestamp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置 key 过期时间的时间戳(unix timestamp) 以毫秒计</p>
<ol start="5">
<li>移除过期时间</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PERSIST key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>移除 key 的过期时间，key 将持久保持。</p>
<p>注意，使用<code v-pre>SET</code>、<code v-pre>GETSET</code>命令为键赋值，也会同时清除键的过期时间。
但是只对键值操作的命令，如（RPUSH、INCR、HSET、ZREM）</p>
<ol start="6">
<li>返回剩余的生存时间。</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>TTL key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以<strong>秒为单位</strong>，返回给定 key 的剩余生存时间(TTL, time to live)。</p>
<ol start="7">
<li>和TTL类似</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PTTL key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以<strong>毫秒为单位</strong>返回 key 的剩余的过期时间。</p>
<h2 id="其他命令" tabindex="-1"><a class="header-anchor" href="#其他命令" aria-hidden="true">#</a> 其他命令</h2>
<ol>
<li>修改 key 的名称</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>RENAME key newkey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>仅当 newkey 不存在时，将 key 改名为 newkey 。</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>RENAMENX key newkey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>从当前数据库中随机返回一个 key</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>RANDOMKEY
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>将当前数据库的 key 移动到给定的数据库 db 当中</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>MOVE key db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>清除某个数据库的数据</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>FLUSHDB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6">
<li>清除Redis所有数据</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>FLUSHALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h1>
<h2 id="字符串-string" tabindex="-1"><a class="header-anchor" href="#字符串-string" aria-hidden="true">#</a> 字符串(string)</h2>
<h3 id="性质" tabindex="-1"><a class="header-anchor" href="#性质" aria-hidden="true">#</a> 性质</h3>
<ul>
<li>
<p>string 是 redis 最基本的类型，你可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。</p>
</li>
<li>
<p>string 类型是二进制安全的。意思是 <strong>redis 的 string 可以包含任何数据</strong>。比如jpg图片或者<strong>序列化的对象</strong>。</p>
</li>
<li>
<p>string 类型是 Redis 最基本的数据类型，<strong>string</strong> 类型的值最大能存储 <strong>512M</strong>B。</p>
</li>
</ul>
<h3 id="操作命令" tabindex="-1"><a class="header-anchor" href="#操作命令" aria-hidden="true">#</a> 操作命令</h3>
<ul>
<li><strong>取值赋值</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SET key value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>GET key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在指定的 key 不存在时，为 key 设置指定的值。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SETNX KEY_NAME VALUE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>递增递减数字</strong>
当存储的字符串是<strong>整数形式</strong>时，可以使用<code v-pre>INCR</code>命令自增1，并返回自增后的值。
（当键不存在时，默认从0开始自增，所以第一次返回值为 1 ）。</li>
</ul>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code>INCR num 
返回：<span class="token number">1</span>
INCR num 
返回：<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果给非整数类型的值，如浮点值、字符串，使用INCR命令，会报错。
如：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>127.0.0.1:6379[1]> GET s
"helloworld"
127.0.0.1:6379[1]> INCR s
(error) ERR value is not an integer or out of range
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指定增量</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>INCRBY key increment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样的，也有<strong>减少命令</strong>。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>DECR key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>DECR key decrement
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>浮点数的增加</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>INCRBYFLOAT key increment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但没有对应的减少命令。</p>
<ul>
<li><strong>向尾部追加值</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>APPEND key value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>获取字符串长度</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>STRLEN key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>同时获得/得到多个键值</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>MGET key [key ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>MSET key value [key1 value1 ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>位操作
暂略。</li>
</ul>
<blockquote>
<p>以下的数据类型都不能支持嵌套。</p>
</blockquote>
<h2 id="散列-hash" tabindex="-1"><a class="header-anchor" href="#散列-hash" aria-hidden="true">#</a> 散列(hash)</h2>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<ul>
<li>Redis hash 是一个<strong>键值(key=&gt;value)对集合</strong>。</li>
<li>键值的类型只能是<strong>字符串</strong>，也就是说不能去嵌套其他类型。</li>
<li>hash 特别适合用于<strong>存储对象</strong>。</li>
<li>一个散列类型的键最多只能包含$2^{32}-1$（<strong>40亿</strong>多）个字段。</li>
</ul>
<h3 id="操作命令-1" tabindex="-1"><a class="header-anchor" href="#操作命令-1" aria-hidden="true">#</a> 操作命令</h3>
<ul>
<li><strong>赋值、取值</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HSET key field value
HGET key field
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注：HSET命令不区分插入还是更新操作，插入操返回1，更新返回0；</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HMSET key field1 value1 field2 value2 [filed3 value3]
HMGET key field1 field2 [field3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不知道散列类型的键对应的值有哪些字段，可以使用：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HGETALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>只获取<strong>字段名</strong>或<strong>字段值</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HKEYS key
HVALS key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>只获取<strong>字段数量</strong>
返回字段的数量。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HLEN key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>127.0.0.1:6379> HSET car price 50000
(integer) 1
127.0.0.1:6379> HMSET car kind bmw color white
OK
127.0.0.1:6379> HGET car price
"50000"
127.0.0.1:6379> HMGET car kind color
1) "bmw"
2) "white"
127.0.0.1:6379> HGETALL car
1) "price"
2) "50000"
3) "kind"
4) "bmw"
5) "color"
6) "white"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>判断字段是否存在</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HEXISTS key field
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>当字段不存在时赋值</strong>
（NX表示not exists）</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HSETNX key field value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得一提的是，这个命令也是一个原子操作，不需要担心静态条件。</p>
<ul>
<li><strong>增加数字</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HINCRBY key filed increment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（散列类型没有HINCR命令）</p>
<ul>
<li><strong>删除字段</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>HDEL key field [field1 ……]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回成功的删除字段的个数。</p>
<h2 id="列表" tabindex="-1"><a class="header-anchor" href="#列表" aria-hidden="true">#</a> 列表</h2>
<h3 id="特点-1" tabindex="-1"><a class="header-anchor" href="#特点-1" aria-hidden="true">#</a> 特点</h3>
<p>Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。
列表类型的内部使用双向链表，所以在链表两端添加元素的时间复杂度为O(1)。
自然，在链表两端查询元素都是很快的。</p>
<h3 id="操作命令-2" tabindex="-1"><a class="header-anchor" href="#操作命令-2" aria-hidden="true">#</a> 操作命令</h3>
<ul>
<li><strong>向列表两端添加元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 从左边添加（头部）
LPUSH key val [val1 ……]
// 从右边添加（尾部）
RPUSH key val [val1 ……]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>向列表两端弹出元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>LPOP key
RPOP key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>获取列表中元素的个数</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>LLEN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当键不存在时，返回0；</p>
<ul>
<li><strong>获得列表片段</strong>
两个注意点，① 索引<strong>从0开始</strong>， ② <strong>左右都是闭区间</strong>。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>LRANGE key start end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并且支持负索引，表示从右边开始计数。
如-1表示右边第一个，-2表示右边第二个。</p>
<p><strong>两个情况</strong>
① start的位置在stop的后面，返回空列表
② stop的位置大于实际的索引范围，则返回到列表最右边的元素。</p>
<ul>
<li><strong>删除列表中指定的值</strong>
REM为remove的缩写</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>LREM key count value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除前count个值value的元素。
<strong>注意</strong>：
① count为0时，删除所有
②count为负，仍然删除前|count|个。</p>
<p><strong>返回的是实际删除的元素的个数</strong>。</p>
<ul>
<li><strong>获得/修改制定索引的元素值</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>LINDEX key index
LSET KEY index value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：索引从0开始</p>
<ul>
<li><strong>只保留指定阶段</strong>
<strong>只保留[start,end]的元素</strong>，其余的元素删除。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>LTRIM key start end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>将元素从一个列表转到另一个列表</strong>
将第一个列表的元素从右边弹出，从左边添加进第二的列表。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>RPOPLPUSH source destination
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="集合" tabindex="-1"><a class="header-anchor" href="#集合" aria-hidden="true">#</a> 集合</h2>
<h3 id="特点-2" tabindex="-1"><a class="header-anchor" href="#特点-2" aria-hidden="true">#</a> 特点</h3>
<p><strong>Redis 的 Set 是 String 类型的无序集合</strong>。集合成员是<strong>唯一的</strong>，这就意味着集合中不能出现重复的数据。</p>
<p>Redis 中集合是通过<strong>哈希表 hash table</strong>实现的，所以添加，删除，查找的复杂度<strong>基本上是</strong> O(1)的。</p>
<p>集合中最大的成员数为 $2^{32}- 1$ (4294967295, 每个集合可存储40多亿个成员)。</p>
<h3 id="操作命令-3" tabindex="-1"><a class="header-anchor" href="#操作命令-3" aria-hidden="true">#</a> 操作命令</h3>
<ul>
<li><strong>增加/删除元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SADD key member [member ...]
SREM key member [member ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>返回是成功添加、删除的元素的个数。</p>
<ul>
<li><strong>获得集合的所有元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SMEMBERS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>判断元素是否在集合中</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SISMEMBER key member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>时间复杂度为O(1)。当值存在时返回1，否则返回0。</p>
<ol>
<li><strong>集合的交</strong>
intersection： 交集</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SINTER setA setB setC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li><strong>集合的并</strong>
union：并集</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SUNION setA setB setC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><strong>集合的差</strong>
首先差集$A-B$的含义是，${x| x\in A \ \ and \ \ x\notin B }$</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SDIFF key [key ....]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>比如: A - B - C，依次计算即可：
多个集合做差集是将前两个集合差集的结果再次作为操作数。</p>
<ul>
<li><strong>获取集合中元素的个数</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SCARD  key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>进行集合运算并将结果存储</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SINTERSTORE destination key [key ...]
SDIFFSTORE destination key [key ...]
SUNIONSTORE destination key [key ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="有序集合" tabindex="-1"><a class="header-anchor" href="#有序集合" aria-hidden="true">#</a> 有序集合</h2>
<h3 id="特点-3" tabindex="-1"><a class="header-anchor" href="#特点-3" aria-hidden="true">#</a> 特点</h3>
<ul>
<li>Redis的zset 和 set 一样也是<strong>string类型元素的集合</strong>,且<strong>不允许重复</strong>的成员。</li>
<li>不同的是<strong>每个元素都会关联一个double类型的分数</strong>。redis正是通过分数来为集合中的成员进行<strong>从小到大的排序</strong>。</li>
<li>zset的<strong>成员是唯一的</strong>,但分数(score)却可以重复。</li>
</ul>
<h3 id="操作命令-4" tabindex="-1"><a class="header-anchor" href="#操作命令-4" aria-hidden="true">#</a> 操作命令</h3>
<ul>
<li><strong>增加元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZADD key score member [score member ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZADD student_score 100 zhangsan 90 xiaoming 60 xiaohua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>获得元素的分数</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZSCORE  key number
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>获得<strong>排名在某个范围</strong>的元素列表</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZRANGE key start stop [WITHSCORES]
ZREVRANGE key start stop [WITHSCORES]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ZRANGE命令会按照<strong>元素分数的从小到大的顺序</strong>返回<strong>索引从start到stop之间的所有元素</strong></p>
<ul>
<li>ZARNGE和 LRANGE类似，包括 star, stop；</li>
<li>如果<strong>需要同时获得元素的分数</strong>，加上参数<code v-pre>WITHSCORES</code>,</li>
<li>如果<strong>需要从大到小排序</strong>，用ZREVRANGE
如：</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>127.0.0.1:6379> ZRANGE student_score 0 -1 WITHSCORES
1) "xiaohua"
2) "60"
3) "xiaoming"
4) "90"
5) "zhangsan"
6) "100"
127.0.0.1:6379> ZREVRANGE student_score 0 -1 WITHSCORES
1) "zhangsan"
2) "100"
3) "xiaoming"
4) "90"
5) "xiaohua"
6) "60"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>获得<strong>指定分数范围的元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offser count]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该命令按照<strong>元素分数从小到大</strong>的顺序返回分数在min到max之间（包含min、max）的元素。</p>
<ul>
<li>如果需要是开区间，在min、max前面加上<code v-pre>(</code></li>
<li>min、max也可以使用<strong>无穷大</strong>，<code v-pre>+inf、-inf</code></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>LIMIT offset count
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>和SQL中语法类似，offset是偏移量，count是最大允许的个数。</p>
<p>表示获取分数<strong>大于</strong>80分的从第<strong>2</strong>个人开始的3个人（不足3个就拉倒）。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZRANGEBYSCORE student_score (80 +inf WITHSCORES LIMIT  1 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>增加某个元素的分数</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZINCRBY key increment member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>获得集合中元素的数量</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZCARD key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>获得指定<strong>分数范围内的元素个数</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZCOUNT key min max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>删除元素</strong>
返回成功删除的元素个数。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZREM member [member...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>按照<strong>排名范围删除元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZREMRANGEBYRANK key start stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>按照<strong>分数范围删除元素</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZREMRANGEBYSCORE key min max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>按<strong>元素的排名</strong>
从0开始，从小到大获取元素的排名，最小元素的排名为0；</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ZRANK key member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>有序集合的交集</strong>
暂略。</li>
</ul>
<h2 id="hyperloglog" tabindex="-1"><a class="header-anchor" href="#hyperloglog" aria-hidden="true">#</a> HyperLogLog</h2>
<blockquote>
<p>基数：一个数据集中不同元素的个数。
基数估计：估计一个数据集中不同元素的个数，但是允许有误差。</p>
</blockquote>
<h2 id="特点-4" tabindex="-1"><a class="header-anchor" href="#特点-4" aria-hidden="true">#</a> 特点</h2>
<ul>
<li>
<p>HyperLogLog 是用来做<strong>基数统计</strong>的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。</p>
</li>
<li>
<p>在 Redis 里面，<strong>每个 HyperLogLog 键只需要花费 12 KB 内存</strong>，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。</p>
</li>
<li>
<p>但是，因为 HyperLogLog 只会<strong>根据输入元素来计算基数</strong>，而<strong>不会储存输入元素本身</strong>，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。</p>
</li>
</ul>
<h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h2>
<ul>
<li>将多个元素添加进<strong>HyperLogLog</strong>,但是只是统计个数，不会保存数据本身。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PFADD key element [element ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>返回数据集的基数
如果有多个key，会统计这些数据集的基数之和，但是注意<strong>不是简单的求和</strong>。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PFCOUNT key [key ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>将多个 HyperLogLog 合并为一个 HyperLogLog</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PFMERGE destkey sourcekey [sourcekey ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


