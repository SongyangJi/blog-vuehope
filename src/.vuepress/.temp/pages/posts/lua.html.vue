<template><div><h1 id="什么是lua" tabindex="-1"><a class="header-anchor" href="#什么是lua" aria-hidden="true">#</a> 什么是lua</h1>
<h2 id="mac安装-lua" tabindex="-1"><a class="header-anchor" href="#mac安装-lua" aria-hidden="true">#</a> Mac安装 lua</h2>
<p><strong>安装</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew search lua
brew <span class="token function">install</span> lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>进入shell</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>运行脚本文件</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> +x test_lua.lua
/test_lua.lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h1>
<h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2>
<p><strong>行注释</strong></p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 这是注释</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>段注释</strong></p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">--[[
这是块注释
这是块注释
--]]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2>
<h2 id="全局变量" tabindex="-1"><a class="header-anchor" href="#全局变量" aria-hidden="true">#</a> 全局变量</h2>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token function">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token comment">-- 无初始值为 nil</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="局部变量" tabindex="-1"><a class="header-anchor" href="#局部变量" aria-hidden="true">#</a> 局部变量</h3>
<p>在redis脚本中不能使用全局变量，只能使用局部变量（其实是为了防止脚本之间相互影响）</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">local</span> b
<span class="token keyword">local</span> c<span class="token punctuation">,</span> d
<span class="token keyword">local</span> e<span class="token punctuation">,</span> f<span class="token punctuation">,</span> g <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<h3 id="空" tabindex="-1"><a class="header-anchor" href="#空" aria-hidden="true">#</a> 空</h3>
<p>没有赋值的变量或者表的字段即为nil，空。</p>
<h3 id="布尔" tabindex="-1"><a class="header-anchor" href="#布尔" aria-hidden="true">#</a> 布尔</h3>
<p>只有true，false。</p>
<h3 id="数字" tabindex="-1"><a class="header-anchor" href="#数字" aria-hidden="true">#</a> 数字</h3>
<p>包括整数、浮点数，1、2.0、3.5e10</p>
<h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h3>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> s1 <span class="token operator">=</span> <span class="token string">'a'</span>
<span class="token keyword">local</span> s2 <span class="token operator">=</span> <span class="token string">"abc"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="表" tabindex="-1"><a class="header-anchor" href="#表" aria-hidden="true">#</a> 表</h3>
<p>lua中唯一的数据结构，既可以当数组，也可以当字典。</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
c <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">'s1'</span><span class="token punctuation">,</span> <span class="token string">'s2'</span><span class="token punctuation">,</span> <span class="token string">'s3'</span><span class="token punctuation">}</span>
d <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'s'</span><span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">}</span>
c<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">-- 's1'</span>
d<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> d<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：Lua规定数组的索引从 1 开始的，而不是 0</strong></p>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">function</span> <span class="token punctuation">(</span>函数列表<span class="token punctuation">)</span>
  函数题
<span class="token keyword">end</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子1</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">function</span> <span class="token function">m</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span>
  <span class="token keyword">return</span> a<span class="token operator">*</span>b
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
  <span class="token keyword">if</span> n <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token keyword">then</span> <span class="token keyword">return</span> <span class="token number">1</span> <span class="token keyword">end</span>
  <span class="token keyword">return</span> <span class="token function">fun</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fun</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="控制语句" tabindex="-1"><a class="header-anchor" href="#控制语句" aria-hidden="true">#</a> 控制语句</h2>
<h3 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h3>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token operator">></span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">elseif</span> <span class="token number">15</span><span class="token operator">></span><span class="token number">10</span> <span class="token keyword">then</span>
     <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">'15'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">else</span>
     <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while-循环" tabindex="-1"><a class="header-anchor" href="#while-循环" aria-hidden="true">#</a> while 循环</h3>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">while</span> 条件表达式 <span class="token keyword">do</span>
  语句块
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>sum <span class="token operator">=</span> <span class="token number">0</span>
num <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">-- 注意 do 和 end</span>
<span class="token keyword">while</span> num <span class="token operator">&lt;=</span> <span class="token number">100</span> <span class="token keyword">do</span>
    sum <span class="token operator">=</span> sum <span class="token operator">+</span> num
    num <span class="token operator">=</span> num <span class="token operator">+</span> <span class="token number">1</span>
<span class="token keyword">end</span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"sum ="</span><span class="token punctuation">,</span>sum<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for-循环" tabindex="-1"><a class="header-anchor" href="#for-循环" aria-hidden="true">#</a> for 循环</h3>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">for</span> 变量 <span class="token operator">=</span> 初值<span class="token punctuation">,</span> 终值<span class="token punctuation">,</span> 步长 <span class="token keyword">do</span>
  语句块
<span class="token keyword">end</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>sum <span class="token operator">=</span> <span class="token number">0</span>
<span class="token comment">-- 默认步长是1</span>
<span class="token keyword">for</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token keyword">do</span>
    sum <span class="token operator">=</span> sum <span class="token operator">+</span> i
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个格式</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">for</span> var1<span class="token punctuation">,</span> var2<span class="token punctuation">,</span> <span class="token punctuation">...</span><span class="token punctuation">,</span> varn <span class="token keyword">in</span> 迭代器 <span class="token keyword">do</span>
  语句块
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>表的遍历</strong></p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">}</span>

<span class="token comment">-- #获取表的长度</span>
<span class="token keyword">for</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">#</span>a <span class="token keyword">do</span>
  <span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token function">print</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>


<span class="token comment">-- 使用 ipairs</span>
<span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token keyword">in</span> <span class="token function">ipairs</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token keyword">do</span>
  <span class="token function">print</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
  <span class="token function">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="常用库" tabindex="-1"><a class="header-anchor" href="#常用库" aria-hidden="true">#</a> 常用库</h1>
<h2 id="string库" tabindex="-1"><a class="header-anchor" href="#string库" aria-hidden="true">#</a> String库</h2>
<ol>
<li>获取长度</li>
</ol>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>a <span class="token operator">=</span> <span class="token string">'abc'</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token operator">#</span>a<span class="token punctuation">)</span> <span class="token comment">-- 长度为3</span>
<span class="token function">print</span><span class="token punctuation">(</span>string<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>大小写转换</li>
</ol>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>string<span class="token punctuation">.</span><span class="token function">lower</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
string<span class="token punctuation">.</span><span class="token function">upper</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>子串</li>
</ol>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 闭区间，end可以取到</span>
string<span class="token punctuation">.</span><span class="token function">sub</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> start<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token keyword">end</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="table-库" tabindex="-1"><a class="header-anchor" href="#table-库" aria-hidden="true">#</a> Table 库</h2>
<p>暂略。</p>
<h2 id="math-库" tabindex="-1"><a class="header-anchor" href="#math-库" aria-hidden="true">#</a> Math 库</h2>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token punctuation">...</span><span class="token punctuation">)</span>
math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token punctuation">...</span><span class="token punctuation">)</span>
math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="redis和lua" tabindex="-1"><a class="header-anchor" href="#redis和lua" aria-hidden="true">#</a> Redis和Lua</h1>
<h3 id="lua使用redis" tabindex="-1"><a class="header-anchor" href="#lua使用redis" aria-hidden="true">#</a> lua使用redis</h3>
<p>在lua脚本使用<code v-pre>redis.call</code></p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'set'</span><span class="token punctuation">,</span><span class="token string">'key1'</span><span class="token punctuation">,</span><span class="token string">'val1'</span><span class="token punctuation">)</span>
<span class="token keyword">local</span> v <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'get'</span><span class="token punctuation">,</span> <span class="token string">'key2'</span><span class="token punctuation">)</span>
<span class="token keyword">return</span> v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis-cli中使用lua" tabindex="-1"><a class="header-anchor" href="#redis-cli中使用lua" aria-hidden="true">#</a> redis-cli中使用lua</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>EVAL script numkeys key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span> arg <span class="token punctuation">[</span>arg <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="keys-和-argv" tabindex="-1"><a class="header-anchor" href="#keys-和-argv" aria-hidden="true">#</a> KEYS 和 ARGV</h3>
<p>使用 <code v-pre>KEYS</code>获取键，使用<code v-pre>ARGV</code>获取值。</p>
<blockquote>
<p>注意索引从 1 开始。</p>
</blockquote>
<h3 id="原子性和执行时间" tabindex="-1"><a class="header-anchor" href="#原子性和执行时间" aria-hidden="true">#</a> 原子性和执行时间</h3>
<p>Redis执行lua脚本是原子的，也就是在一个脚本执行期间不会执行其他命令。</p>
<p>所有其他的命令都必须在脚本执行完成后才能执行。</p>
<p>为了防止一个脚本执行时间太长，Redis提供<code v-pre>lua-time-limit</code>限制脚本的最长运行时间（默认是 5 秒），</p>
<p>时间到了，就可以接受其他命令，但这个脚本的执行就无法无确保原子性了，因为它还没有只执行完。</p>
</div></template>


