<template><div><p>好家伙，这个问题已经困扰我好几个小时了。
网上的做法众说纷纭，有相似的东西，也有不同的。
这次我汇总一下。</p>
<p>具体的原因和过程可以看<a href="https://www.jianshu.com/p/7ab21c7f0674" target="_blank" rel="noopener noreferrer">在Hexo中渲染MathJax数学公式<ExternalLinkIcon/></a>这篇博客。</p>
<p>我遇到的问题是，在本地公式可以正常渲染。但是用hexo部署上去的时候，却又这么几种问题。</p>
<p>ok，分析一下几点原因。</p>
<ol>
<li><strong>渲染引擎缺失</strong></li>
</ol>
<p>渲染引擎更换一下。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> uninstall hexo-renderer-marked <span class="token parameter variable">--save</span>
<span class="token function">npm</span> <span class="token function">install</span> hexo-renderer-kramed <span class="token parameter variable">--save</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>似乎装这一个就可以了，但是似乎还有人装其他引擎的。</p>
<ol start="2">
<li><strong>语义冲突</strong></li>
</ol>
<p>进入项目更目录下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> node_modules<span class="token punctuation">\</span>kramed<span class="token punctuation">\</span>lib<span class="token punctuation">\</span>rules<span class="token punctuation">\</span>inline.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改这么两行。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//  escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,</span>
  <span class="token literal-property property">escape</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\([`*\[\]()#$+\-.!_>])</span><span class="token regex-delimiter">/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,</span>
  <span class="token literal-property property">em</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\*((?:\*\*|[\s\S])+?)\*(?!\*)</span><span class="token regex-delimiter">/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li><strong>配置文件未将MathJax开启</strong></li>
</ol>
<p>这一步操作有些不同，但操作差不多，就是开启MathJax渲染。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># Mathjax数学公式</span>
<span class="token key atrule">mathjax</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token comment"># Katex数学公式(allpost设置为false时只有头部设置math:true的文章才开启)</span>
<span class="token key atrule">katex</span><span class="token punctuation">:</span>
  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">allpost</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">copy_tex</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li><strong>公式语法有误</strong>
如果上述操作全部完成，还是不能成功，看看有没有语法问题。</li>
</ol>
<p>比如，我遇到的问题，如果在公式内连续使用两个花括号，必须加上空格。</p>
<p>如下面的会渲染失败。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$$L_p  = (\sum_{i=1}^m |x_i - y_i |^{p}  )^{{\tfrac{1}{p}}}$$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在连续的花括号之间加上空格即可。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$$L_p  = (\sum_{i=1}^m |x_i - y_i |^{p}  )^{ {\tfrac{1} {p} } }$$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


