<template><div><h1 id="字典树介绍" tabindex="-1"><a class="header-anchor" href="#字典树介绍" aria-hidden="true">#</a> 字典树介绍</h1>
<p>又称<strong>前缀树</strong>，Trie树，是一种多叉树。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串）。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较。
它的最基本的操作是插入一个字符串，和查询。</p>
<h1 id="存储原理" tabindex="-1"><a class="header-anchor" href="#存储原理" aria-hidden="true">#</a> 存储原理</h1>
<p>多叉树结构：
一般的，如果我们想存储一棵一般的树，树的节点可以这样写：</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">struct</span> <span class="token class-name">OrdinaryTrieNode</span><span class="token punctuation">{</span>
	<span class="token keyword">int</span> val<span class="token punctuation">;</span>
	vector<span class="token operator">&lt;</span>OrdinaryTrieNode<span class="token operator">*</span><span class="token operator">></span> childs<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而如果是字典树的话：
假设字符串仅由大小为<strong>n</strong>的字符集中的字符构成（比如26个小写字母），那么每个节点的字节就可以有<strong>n</strong>个指向。</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">const</span> <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token number">26</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">TrieNode</span><span class="token punctuation">{</span>
	TrieNode<span class="token operator">*</span> childs<span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现，节点本身并没有存储字符的值。那么如何知道它的后继字符有哪些呢？
这个时候，我们可以把将字符映射到一个索引，然后让父节点的<code v-pre>childs</code>数组索引存储这个节点。</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">char</span> c<span class="token punctuation">;</span>
TrieNode<span class="token operator">*</span> parent<span class="token punctuation">;</span>
parent<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> TrieNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候<code v-pre>parent</code>节点就有了一个新的子节点，对应的字符为<code v-pre>c</code>;
于是，其实我们发现真正字符的信息其实是<strong>存储在父节点与子节点的边上</strong>，<strong>节点本身只是存储着它的子节点</strong>。</p>
<p><img src="https://img-blog.csdnimg.cn/20200614173023837.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0ODQ2MzI0,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy">
（<s>图来自互联网</s> ）
那么怎么知道记录一个字符串的结束呢，比如<strong>字符串<code v-pre>aabb</code></strong>，其实并不代表<code v-pre>aab</code>出现在字典树里。
根据不同实现，也有不同的解决办法。
一种方法是，在结构体里加一个变量，表明这个节点是否是字符串的结尾。</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">struct</span> <span class="token class-name">TrieNode</span><span class="token punctuation">{</span>
	<span class="token keyword">bool</span> isEnd<span class="token punctuation">;</span>
	TrieNode<span class="token operator">*</span> childs<span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="字典树的静态实现" tabindex="-1"><a class="header-anchor" href="#字典树的静态实现" aria-hidden="true">#</a> 字典树的静态实现</h1>
<p>数组模拟，下标代替指针。
其中，编号为1的节点表示根节点，0表示空指。</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">const</span> <span class="token keyword">int</span> maxnode <span class="token operator">=</span> maxn<span class="token operator">*</span>maxlen<span class="token punctuation">;</span>  <span class="token comment">// 字符串个数*字符串的长度</span>
<span class="token keyword">int</span> trie<span class="token punctuation">[</span>maxnode<span class="token punctuation">]</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">,</span>tot<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// size是字符集的大小，tot保存节点个数</span>
<span class="token keyword">bool</span> end<span class="token punctuation">[</span>maxnode<span class="token punctuation">]</span>  <span class="token comment">// 结尾标记</span>

<span class="token keyword">int</span> <span class="token function">idx</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> c <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//插入字符串的方法</span>
<span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> str<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">,</span>p<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>  <span class="token comment">//根节点为1</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>len<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token function">idx</span><span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//如果这个节点不存在，新建一个</span>
			trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token operator">=</span> <span class="token operator">++</span>tot<span class="token punctuation">;</span>
		p <span class="token operator">=</span> trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	end<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//查找字符串的方法</span>
<span class="token keyword">bool</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> str<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">,</span>p<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>len<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		p <span class="token operator">=</span> trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token function">idx</span><span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> end<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="字典树的动态实现" tabindex="-1"><a class="header-anchor" href="#字典树的动态实现" aria-hidden="true">#</a> 字典树的动态实现</h1>
<p>版本一：
其中，析构函数用递归实现。</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Trie</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">/** Initialize your data structure here. */</span>
    <span class="token function">Trie</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        root <span class="token operator">=</span> <span class="token keyword">new</span> TrieNode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token operator">~</span><span class="token function">Trie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">destroy</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/** Inserts a word into the trie. */</span>
    <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">const</span> string <span class="token operator">&amp;</span>word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        TrieNode <span class="token operator">*</span>p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>word<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> TrieNode<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        p<span class="token operator">-></span>isEnd <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">/** Returns if the word is in the trie. */</span>
    <span class="token keyword">bool</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token keyword">const</span> string <span class="token operator">&amp;</span>word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        TrieNode <span class="token operator">*</span>p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>word<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span><span class="token operator">==</span><span class="token keyword">nullptr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> p<span class="token operator">-></span>isEnd<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">/** Returns if there is any word in the trie that starts with the given prefix. */</span>
    <span class="token keyword">bool</span> <span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token keyword">const</span> string <span class="token operator">&amp;</span>prefix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        TrieNode <span class="token operator">*</span>p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>prefix<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span><span class="token operator">==</span><span class="token keyword">nullptr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token operator">-</span><span class="token char">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">struct</span> <span class="token class-name">TrieNode</span><span class="token punctuation">{</span>    
        <span class="token keyword">bool</span> isEnd <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        TrieNode<span class="token operator">*</span> childs<span class="token punctuation">[</span><span class="token number">26</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    TrieNode<span class="token operator">*</span> root <span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span>TrieNode<span class="token operator">*</span> root<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span>TrieNode<span class="token operator">*</span> pt<span class="token operator">:</span>root<span class="token operator">-></span>childs<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">destroy</span><span class="token punctuation">(</span>pt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">delete</span> root<span class="token punctuation">;</span>
            root <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>    
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>版本2：
树的节点用</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code> <span class="token keyword">struct</span> <span class="token class-name">Node</span><span class="token punctuation">{</span>
        <span class="token keyword">bool</span> isEnd <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        unordered_map<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token punctuation">,</span>Node<span class="token operator">*</span><span class="token operator">></span> childs<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中析构函数用迭代实现（用一个<code v-pre>queue&lt;TrieNode&gt;</code>,遍历这棵树就可）。</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Trie</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">/** Initialize your data structure here. */</span>
    <span class="token function">Trie</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        root <span class="token operator">=</span> <span class="token keyword">new</span> Node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token operator">~</span><span class="token function">Trie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        queue<span class="token operator">&lt;</span>Node<span class="token operator">*</span><span class="token operator">></span> q<span class="token punctuation">;</span>
        q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>q<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            Node<span class="token operator">*</span> pn <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">front</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            q<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span>unordered_map<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token punctuation">,</span>Node<span class="token operator">*</span><span class="token operator">></span><span class="token double-colon punctuation">::</span>iterator it<span class="token operator">=</span>pn<span class="token operator">-></span>childs<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> it<span class="token operator">!=</span>pn<span class="token operator">-></span>childs<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>it<span class="token operator">++</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
                q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>it<span class="token operator">-></span>second<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">delete</span> pn<span class="token punctuation">;</span>
            pn <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">/** Inserts a word into the trie. */</span>
    <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">const</span> string <span class="token operator">&amp;</span>word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node<span class="token operator">*</span> p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>word<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token operator">-></span>childs<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> Node<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        p<span class="token operator">-></span>isEnd <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">/** Returns if the word is in the trie. */</span>
    <span class="token keyword">bool</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token keyword">const</span> string <span class="token operator">&amp;</span>word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node<span class="token operator">*</span> p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>word<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token operator">-></span>childs<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> p<span class="token operator">-></span>isEnd<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">/** Returns if there is any word in the trie that starts with the given prefix. */</span>
    <span class="token keyword">bool</span> <span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token keyword">const</span> string <span class="token operator">&amp;</span>prefix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node<span class="token operator">*</span> p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>prefix<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token operator">-></span>childs<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>childs<span class="token punctuation">[</span>c<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">struct</span> <span class="token class-name">Node</span><span class="token punctuation">{</span>
        <span class="token keyword">bool</span> isEnd <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        unordered_map<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token punctuation">,</span>Node<span class="token operator">*</span><span class="token operator">></span> childs<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    Node <span class="token operator">*</span> root<span class="token punctuation">;</span>    
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_01trie介绍" tabindex="-1"><a class="header-anchor" href="#_01trie介绍" aria-hidden="true">#</a> 01Trie介绍</h1>
<p>将数字映射成一个<strong>01串</strong>，如果是一个<code v-pre>int</code>数字，就是一个长度为32的01串。
然后将这些01串当成字符串插入字典树，这时候字典树的字符集为2（只有0和1）。</p>
<h2 id="代码部分的几处重要点" tabindex="-1"><a class="header-anchor" href="#代码部分的几处重要点" aria-hidden="true">#</a> 代码部分的几处重要点</h2>
<p>①依次从高位到低位提取出二进制数字
注意<code v-pre>up</code>是个常量，如果数值是<strong>int</strong>的话，取<strong>30</strong>——最高位是符号位，第二高位就表示$2^{30}$</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span>up<span class="token punctuation">;</span>i<span class="token operator">>=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">--</span><span class="token punctuation">)</span>
	<span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token operator">>></span>i<span class="token punctuation">)</span><span class="token operator">&amp;</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>②异或结果的求法（位运算加快速度）</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code>sum <span class="token operator">=</span> <span class="token punctuation">(</span>sum<span class="token operator">&lt;&lt;</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">|</span><span class="token number">1</span>  <span class="token comment">// 乘2在加1</span>
sum<span class="token operator">&lt;&lt;=</span><span class="token number">1</span>  <span class="token comment">// sum = sum&lt;&lt;1 == sum*2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="典型例题" tabindex="-1"><a class="header-anchor" href="#典型例题" aria-hidden="true">#</a> 典型例题</h2>
<p><a href="https://loj.ac/problem/10050" target="_blank" rel="noopener noreferrer">The XOR Largest Pair<ExternalLinkIcon/></a>
01Trie的典型例题
给定n个数字，求任意两个数字异或运算的最大值。</p>
<ul>
<li>思路：
将数字理解为一个长度为32位的01串，异或运算求最值，应该贪心地从最高位到最低位取不同的数字。</li>
<li>步骤：
将所有数字插入Trie，然后遍历n个数字，对于每个数字从高位到低位， 依次匹配与它不同的数字（没有就匹配相同的）。
注意这样贪心是合理的，因为高位的数字影响大于低位数字影响总和。
譬如:
0x1000 0000 &gt;   0x0111 1111。</li>
</ul>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;iostream></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;cmath></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;math.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;string></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;string.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;algorithm></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stack></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;queue></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;vector></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;map></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">ms0</span><span class="token expression"><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token function">memset</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">ll</span> <span class="token expression"><span class="token keyword">long</span> <span class="token keyword">long</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">INF</span> <span class="token expression"><span class="token number">0x3f3f3f3f</span></span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token keyword">int</span> maxnode <span class="token operator">=</span> <span class="token number">1e5</span><span class="token operator">+</span><span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">int</span> up <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> n<span class="token punctuation">,</span>d<span class="token punctuation">[</span>maxnode<span class="token punctuation">]</span><span class="token punctuation">,</span>trie<span class="token punctuation">[</span>maxnode<span class="token operator">*</span><span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>tot<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>ans<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> p<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span>up<span class="token punctuation">;</span>i<span class="token operator">>=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">--</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token operator">>></span>i<span class="token punctuation">)</span><span class="token operator">&amp;</span><span class="token number">1</span><span class="token punctuation">;</span>   <span class="token comment">//从高位到低位的获取</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span> trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token operator">=</span><span class="token operator">++</span>tot<span class="token punctuation">;</span>
        p<span class="token operator">=</span>trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> p<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>sum<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span>up<span class="token punctuation">;</span>i<span class="token operator">>=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token comment">// 从高位到低位</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token operator">>></span>i<span class="token punctuation">)</span><span class="token operator">&amp;</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token operator">^</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            sum <span class="token operator">=</span> <span class="token punctuation">(</span>sum<span class="token operator">&lt;&lt;</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">|</span><span class="token number">1</span> <span class="token punctuation">;</span>  <span class="token comment">// sum=sum*2+1</span>
            p <span class="token operator">=</span> trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token operator">^</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            sum<span class="token operator">&lt;&lt;=</span><span class="token number">1</span><span class="token punctuation">;</span>
            p<span class="token operator">=</span>trie<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    cin<span class="token operator">>></span>n<span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span>n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">"%d"</span><span class="token punctuation">,</span><span class="token operator">&amp;</span>d<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span>n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
        ans <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>ans<span class="token punctuation">,</span><span class="token function">find</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span>ans<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="demo——字典树的实现" tabindex="-1"><a class="header-anchor" href="#demo——字典树的实现" aria-hidden="true">#</a> Demo——字典树的实现</h1>
<p><strong>NC124</strong> <strong>字典树的实现</strong></p>
<p>https://www.nowcoder.com/practice/a55a584bc0ca4a83a272680174be113b?tpId=117&amp;tqId=37818&amp;rp=1&amp;ru=/exam/oj&amp;qru=/exam/oj&amp;sourceUrl=%2Fexam%2Foj%3Fdifficulty%3D3%26judgeStatus%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tab%3D%25E7%25AE%2597%25E6%25B3%2595%25E7%25AF%2587%26topicId%3D117&amp;difficulty=3&amp;judgeStatus=3&amp;tags=&amp;title=</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">id</span><span class="token expression"><span class="token punctuation">(</span>c<span class="token punctuation">)</span> c <span class="token operator">-</span> </span><span class="token char">'a'</span></span>

<span class="token keyword">class</span> <span class="token class-name">Trie</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">struct</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> cnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> endCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        Node <span class="token operator">*</span>child<span class="token punctuation">[</span><span class="token number">26</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    Node <span class="token operator">*</span>root <span class="token operator">=</span> <span class="token keyword">new</span> Node<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span>string <span class="token operator">&amp;</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> Node<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            p<span class="token operator">-></span>cnt<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        p<span class="token operator">-></span>endCnt<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span>string <span class="token operator">&amp;</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            p<span class="token operator">-></span>cnt<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        p<span class="token operator">-></span>endCnt<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">bool</span> <span class="token function">search</span><span class="token punctuation">(</span>string <span class="token operator">&amp;</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> p<span class="token operator">-></span>endCnt <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">int</span> <span class="token function">prefixNumber</span><span class="token punctuation">(</span>string <span class="token operator">&amp;</span>pre<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span>pre<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>child<span class="token punctuation">[</span><span class="token function">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> p<span class="token operator">-></span>cnt<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">/**
     *
     * @param operators string字符串vector&lt;vector&lt;>> the ops
     * @return string字符串vector
     */</span>
    vector<span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token function">trieU</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span>vector<span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">></span> <span class="token operator">&amp;</span>operators<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// write code here</span>
        Trie trie<span class="token punctuation">;</span>
        vector<span class="token operator">&lt;</span>string<span class="token operator">></span> ans<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">auto</span> <span class="token operator">&amp;</span>opt<span class="token operator">:</span> operators<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            string o <span class="token operator">=</span> opt<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            string s <span class="token operator">=</span> opt<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token string">"1"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                trie<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token string">"2"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                trie<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token string">"3"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>trie<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    ans<span class="token punctuation">.</span><span class="token function">emplace_back</span><span class="token punctuation">(</span><span class="token string">"YES"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    ans<span class="token punctuation">.</span><span class="token function">emplace_back</span><span class="token punctuation">(</span><span class="token string">"NO"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token string">"4"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> num <span class="token operator">=</span> trie<span class="token punctuation">.</span><span class="token function">prefixNumber</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
                ans<span class="token punctuation">.</span><span class="token function">emplace_back</span><span class="token punctuation">(</span><span class="token function">to_string</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


