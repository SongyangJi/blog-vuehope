<template><div><h1 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h1>
<h2 id="左旋右旋" tabindex="-1"><a class="header-anchor" href="#左旋右旋" aria-hidden="true">#</a> 左旋右旋</h2>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token comment">// 右旋</span>
<span class="token keyword">void</span> <span class="token function">zig</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Node <span class="token operator">*</span>q <span class="token operator">=</span> p<span class="token operator">-></span>left<span class="token punctuation">;</span>
    p<span class="token operator">-></span>left <span class="token operator">=</span> q<span class="token operator">-></span>right<span class="token punctuation">;</span>
    q<span class="token operator">-></span>right <span class="token operator">=</span> p<span class="token punctuation">;</span>
    p <span class="token operator">=</span> q<span class="token punctuation">;</span>
    <span class="token function">pushUp</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pushUp</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 左旋</span>
<span class="token keyword">void</span> <span class="token function">zag</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Node <span class="token operator">*</span>p <span class="token operator">=</span> q<span class="token operator">-></span>right<span class="token punctuation">;</span>
    q<span class="token operator">-></span>right <span class="token operator">=</span> p<span class="token operator">-></span>left<span class="token punctuation">;</span>
    p<span class="token operator">-></span>left <span class="token operator">=</span> q<span class="token punctuation">;</span>
    q <span class="token operator">=</span> p<span class="token punctuation">;</span>
    <span class="token function">pushUp</span><span class="token punctuation">(</span>q<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pushUp</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="zig-zag.png" style="zoom:20%;" />
<h1 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h1>
<h2 id="红黑树的性质" tabindex="-1"><a class="header-anchor" href="#红黑树的性质" aria-hidden="true">#</a> 红黑树的性质</h2>
<ol>
<li>性质1：每个节点要么是黑色，要么是红色。</li>
<li>性质2：根节点是黑色。</li>
<li>性质3：每个叶子节点（NIL）是黑色。</li>
<li>性质4：每个红色结点的两个子结点一定都是黑色。</li>
<li>性质5：任意一结点到每个叶子结点的路径都包含数量相同的黑结点。</li>
</ol>
<p><strong>当然红黑树也必须是二叉搜索树。</strong></p>
<p>总结后的精华就是下面两点：</p>
<ol>
<li><strong>红黑树的性质是每条路径的黑色节点数目相同</strong>;</li>
<li><strong>红黑树保证最长路径不超过最短路径的二倍，因而近似平衡</strong>;</li>
</ol>
<h1 id="avl" tabindex="-1"><a class="header-anchor" href="#avl" aria-hidden="true">#</a> AVL</h1>
<h2 id="四种情况" tabindex="-1"><a class="header-anchor" href="#四种情况" aria-hidden="true">#</a> 四种情况</h2>
<h2 id="添加步骤" tabindex="-1"><a class="header-anchor" href="#添加步骤" aria-hidden="true">#</a> 添加步骤</h2>
<h2 id="删除步骤" tabindex="-1"><a class="header-anchor" href="#删除步骤" aria-hidden="true">#</a> 删除步骤</h2>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token comment">//</span>
<span class="token comment">// Created by SongyangJi on 2020/11/16.</span>
<span class="token comment">//</span>


<span class="token comment">/**
 *
 *  这个例子仅仅演示了AVL的基本操作，没有用泛型，只有键，没有值，
 *  并且假定所有数据都不相同。
 *
 */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm></span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"binaryTree/BinarySearchTree.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;queue></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream></span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">AVL</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    
    <span class="token comment">// 内部节点</span>
    <span class="token keyword">struct</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> value<span class="token punctuation">;</span>
        Node <span class="token operator">*</span>left<span class="token punctuation">,</span> <span class="token operator">*</span>right<span class="token punctuation">;</span>
        <span class="token keyword">int</span> height <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 高度</span>

        <span class="token function">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">,</span> Node <span class="token operator">*</span>left <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">,</span> Node <span class="token operator">*</span>right <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span>
                <span class="token operator">:</span> <span class="token function">value</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">left</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">right</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    Node <span class="token operator">*</span>root <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>


<span class="token keyword">public</span><span class="token operator">:</span>

    <span class="token function">AVL</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">bool</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">query</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">remove</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//  层次遍历，用来简单的检查</span>
    <span class="token keyword">void</span> <span class="token function">displayLayerOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">"层次遍历:"</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
        queue<span class="token operator">&lt;</span>Node <span class="token operator">*</span><span class="token operator">></span> q<span class="token punctuation">;</span>
        q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>q<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> size <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>size<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                Node <span class="token operator">*</span>p <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">front</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                q<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                cout <span class="token operator">&lt;&lt;</span> p<span class="token operator">-></span>value <span class="token operator">&lt;&lt;</span> <span class="token string">"   "</span><span class="token punctuation">;</span>
                q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            cout <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        cout <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token function">getInOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> res<span class="token punctuation">;</span>
        <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">int</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">AVL</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">helperDestructor</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>

<span class="token comment">//    // 求高度, 规定只有一个节点的高度为 1， 用于求平衡因子</span>
<span class="token comment">//    int height(Node* t){</span>
<span class="token comment">//        if(t == nullptr) return 0;</span>
<span class="token comment">//        return max(height(t->left),height(t->right))+1;</span>
<span class="token comment">//    }</span>

    <span class="token keyword">int</span> <span class="token function">h</span><span class="token punctuation">(</span>Node <span class="token operator">*</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> t <span class="token operator">?</span> t<span class="token operator">-></span>height <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 平衡因子</span>
    <span class="token keyword">int</span> <span class="token function">balance_factor</span><span class="token punctuation">(</span>Node <span class="token operator">*</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>t<span class="token operator">-></span>left<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">h</span><span class="token punctuation">(</span>t<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 更新 p 操作</span>
    <span class="token keyword">void</span> <span class="token function">pushUp</span><span class="token punctuation">(</span>Node <span class="token operator">*</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        p<span class="token operator">-></span>height <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 右旋</span>
    <span class="token keyword">void</span> <span class="token function">zig</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>q <span class="token operator">=</span> p<span class="token operator">-></span>left<span class="token punctuation">;</span>
        p<span class="token operator">-></span>left <span class="token operator">=</span> q<span class="token operator">-></span>right<span class="token punctuation">;</span>
        q<span class="token operator">-></span>right <span class="token operator">=</span> p<span class="token punctuation">;</span>
        p <span class="token operator">=</span> q<span class="token punctuation">;</span>
        <span class="token function">pushUp</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pushUp</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 左旋</span>
    <span class="token keyword">void</span> <span class="token function">zag</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>q<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> q<span class="token operator">-></span>right<span class="token punctuation">;</span>
        q<span class="token operator">-></span>right <span class="token operator">=</span> p<span class="token operator">-></span>left<span class="token punctuation">;</span>
        p<span class="token operator">-></span>left <span class="token operator">=</span> q<span class="token punctuation">;</span>
        q <span class="token operator">=</span> p<span class="token punctuation">;</span>
        <span class="token function">pushUp</span><span class="token punctuation">(</span>q<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pushUp</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  
    <span class="token comment">/*
  	 * 下面为 AVL树的四种情况
     */</span>
  
    <span class="token comment">// LL型,右旋 左子树的左子树插入节点</span>
    <span class="token keyword">void</span> <span class="token function">LL</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">zig</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// RR,左旋 右子树的右子树插入节点</span>
    <span class="token keyword">void</span> <span class="token function">RR</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">zag</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// LR，先左旋后右旋, 新节点位于t的左子树的右子树</span>
    <span class="token keyword">void</span> <span class="token function">LR</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">zag</span><span class="token punctuation">(</span>t<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">zig</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// RL, 先右旋后左旋, 新节点位于t的右子树的左子树</span>
    <span class="token keyword">void</span> <span class="token function">RL</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">zig</span><span class="token punctuation">(</span>t<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">zag</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
    <span class="token comment">// 插入操作，不仅要找到插入的位置，还要进行旋转进行高度的平衡</span>
    <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>t<span class="token punctuation">,</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Node</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 插入完成之后，自下而上的进行调整高度</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> t<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 向左插入</span>
            <span class="token function">insert</span><span class="token punctuation">(</span>t<span class="token operator">-></span>left<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>


            <span class="token keyword">int</span> leftH <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>t<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> rightH <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>t<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 向左边插入，只有可能是 leftH > rightH</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>leftH <span class="token operator">-</span> rightH <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// LL 型</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;=</span> t<span class="token operator">-></span>left<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">LL</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// LR 型</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> t<span class="token operator">-></span>left<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">LR</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>


        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> t<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 向右插入</span>
            <span class="token function">insert</span><span class="token punctuation">(</span>t<span class="token operator">-></span>right<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">int</span> leftH <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>t<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> rightH <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>t<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token comment">// 向右边插入，只有可能是 rightH > leftH </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>rightH <span class="token operator">-</span> leftH <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// RR型</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">>=</span> t<span class="token operator">-></span>right<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">RR</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// RL型</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> t<span class="token operator">-></span>right<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">RL</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>
        <span class="token comment">// 自底向上更新 t 的高度</span>
        <span class="token function">pushUp</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span>Node <span class="token operator">*</span><span class="token operator">&amp;</span>p<span class="token punctuation">,</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> p<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token function">remove</span><span class="token punctuation">(</span>p<span class="token operator">-></span>left<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 删除左子树的节点，唯一可能导致"失衡" 的情况是 bf由 -1 变成-2</span>
            <span class="token keyword">int</span> bf <span class="token operator">=</span> <span class="token function">balance_factor</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bf <span class="token operator">&lt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token operator">-></span>right<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">RR</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token function">RL</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> p<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token function">remove</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 删除右子树的节点，唯一可能导致"失衡" 的情况是 bf由 1 变成 2</span>
            <span class="token keyword">int</span> bf <span class="token operator">=</span> <span class="token function">balance_factor</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bf <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>left<span class="token operator">-></span>left<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>left<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">LL</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token function">LR</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 下面细分成 3种情况 (左右子树都为空，一棵为空另一棵不为空，都不为空)</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-></span>left <span class="token operator">==</span> <span class="token keyword">nullptr</span> <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">delete</span> p<span class="token punctuation">;</span>
                p <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-></span>left <span class="token operator">!=</span> <span class="token keyword">nullptr</span> <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                Node <span class="token operator">*</span>temp <span class="token operator">=</span> p<span class="token operator">-></span>left<span class="token punctuation">;</span>
                <span class="token keyword">delete</span> p<span class="token punctuation">;</span>
                p <span class="token operator">=</span> temp<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-></span>left <span class="token operator">==</span> <span class="token keyword">nullptr</span> <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right <span class="token operator">!=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                Node <span class="token operator">*</span>temp <span class="token operator">=</span> p<span class="token operator">-></span>right<span class="token punctuation">;</span>
                <span class="token keyword">delete</span> p<span class="token punctuation">;</span>
                p <span class="token operator">=</span> temp<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 用前驱的值代替（后继也是一样）</span>
                Node <span class="token operator">*</span>cur <span class="token operator">=</span> p<span class="token operator">-></span>left<span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token operator">-></span>right <span class="token operator">!=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    cur <span class="token operator">=</span> cur<span class="token operator">-></span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                p<span class="token operator">-></span>value <span class="token operator">=</span> cur<span class="token operator">-></span>value<span class="token punctuation">;</span>

                <span class="token function">remove</span><span class="token punctuation">(</span>p<span class="token operator">-></span>left<span class="token punctuation">,</span> cur<span class="token operator">-></span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// 这个地方仍然要有形态的调整</span>

                <span class="token comment">// 删除左子树的节点，唯一可能导致"失衡" 的情况是 bf由 -1 变成-2</span>
                <span class="token keyword">int</span> bf <span class="token operator">=</span> <span class="token function">balance_factor</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>bf <span class="token operator">&lt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token operator">-></span>right<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token function">h</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">RR</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token function">RL</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>
            <span class="token comment">// 自底向上更新 t 的高度</span>
            <span class="token function">pushUp</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">bool</span> <span class="token function">query</span><span class="token punctuation">(</span>Node <span class="token operator">*</span>p<span class="token punctuation">,</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> p<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">query</span><span class="token punctuation">(</span>p<span class="token operator">-></span>left<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> p<span class="token operator">-></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">query</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">helperDestructor</span><span class="token punctuation">(</span>Node <span class="token operator">*</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token function">helperDestructor</span><span class="token punctuation">(</span>node<span class="token operator">-></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">helperDestructor</span><span class="token punctuation">(</span>node<span class="token operator">-></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">delete</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">inOrder</span><span class="token punctuation">(</span>Node <span class="token operator">*</span>node<span class="token punctuation">,</span> vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token operator">-></span>left<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
        v<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>node<span class="token operator">-></span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">inOrder</span><span class="token punctuation">(</span>node<span class="token operator">-></span>right<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    AVL avl<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> x <span class="token operator">&lt;=</span> <span class="token number">15</span><span class="token punctuation">;</span> x<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        avl<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> v <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">14</span><span class="token punctuation">,</span><span class="token number">13</span><span class="token punctuation">,</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token operator">:</span>v<span class="token punctuation">)</span><span class="token punctuation">{</span>
        avl<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
        avl<span class="token punctuation">.</span><span class="token function">displayLayerOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考链接</p>
<p><a href="https://www.cnblogs.com/skywang12345/p/3245399.html" target="_blank" rel="noopener noreferrer">红黑树(一)之 原理和算法详细介绍<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


