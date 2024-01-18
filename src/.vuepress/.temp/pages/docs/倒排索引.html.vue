<template><div><blockquote>
<p>正向索引：存储每个文档的单词的列表。</p>
<p>正向索引的查询往往满足每个文档有序频繁的全文查询。</p>
</blockquote>
<h1 id="倒排索引" tabindex="-1"><a class="header-anchor" href="#倒排索引" aria-hidden="true">#</a> 倒排索引</h1>
<blockquote>
<p>反向索引数据结构是典型的<a href="https://zh.m.wikipedia.org/wiki/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E" target="_blank" rel="noopener noreferrer">搜索引擎<ExternalLinkIcon/></a><a href="https://zh.m.wikipedia.org/wiki/%E6%AA%A2%E7%B4%A2" target="_blank" rel="noopener noreferrer">检索<ExternalLinkIcon/></a><a href="https://zh.m.wikipedia.org/wiki/%E7%AE%97%E6%B3%95" target="_blank" rel="noopener noreferrer">算法<ExternalLinkIcon/></a>重要的部分。</p>
</blockquote>
<p><strong>倒排索引</strong>（英语：Inverted index），也常被称为<strong>反向索引</strong>、<strong>置入档案</strong>或<strong>反向档案</strong>，是一种索引方法，被<strong>用来存储在全文搜索下某个单词在一个文档或者一组文档中的存储位置的映射</strong>。它是<em>文档检索系统</em>中最常用的数据结构。</p>
<p>有两种不同的反向索引形式：</p>
<ul>
<li>一条记录的水平反向索引（或者<strong>反向档案索引</strong>）包含每个引用单词的文档的[列表]。</li>
<li>一个单词的水平反向索引（或者<strong>完全反向索引</strong>）又包含每个单词在一个文档中的位置。</li>
</ul>
<p>后者的形式提供了更多的兼容性（比如<em>短语搜索</em>），但是需要更多的时间和空间来创建。</p>
<p>举例，下面是要被索引的文本：</p>
<ul><li><span class="mwe-math-element"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y" style="display: none;"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle T_{0}=}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <msub>
          <mi>T</mi>
          <mrow class="MJX-TeXAtom-ORD">
            <mn>0</mn>
          </mrow>
        </msub>
        <mo>=</mo>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle T_{0}=}</annotation>
  </semantics></math></span><noscript><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/1ab3d9202f18a678affe9a339511bef0a7b8b110" class="mwe-math-fallback-image-inline" aria-hidden="true" style="vertical-align: -0.671ex; width:4.865ex; height:2.509ex;" alt="{\displaystyle T_{0}=}"></noscript><img width="0" height="0" class="mwe-math-fallback-image-inline image-lazy-loaded" alt="{\displaystyle T_{0}=}" usemap="undefined" src="https://wikimedia.org/api/rest_v1/media/math/render/svg/1ab3d9202f18a678affe9a339511bef0a7b8b110" srcset="" style="width: 4.865ex; height: 2.509ex; vertical-align: -0.671ex;"></span><code>0. "it is what it is"</code></li>
<li><span class="mwe-math-element"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y" style="display: none;"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle T_{1}=}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <msub>
          <mi>T</mi>
          <mrow class="MJX-TeXAtom-ORD">
            <mn>1</mn>
          </mrow>
        </msub>
        <mo>=</mo>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle T_{1}=}</annotation>
  </semantics></math></span><noscript><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/57ac5840245616f79874f4635b3bcb2e3da344dd" class="mwe-math-fallback-image-inline" aria-hidden="true" style="vertical-align: -0.671ex; width:4.865ex; height:2.509ex;" alt="{\displaystyle T_{1}=}"></noscript><img width="0" height="0" class="mwe-math-fallback-image-inline image-lazy-loaded" alt="{\displaystyle T_{1}=}" usemap="undefined" src="https://wikimedia.org/api/rest_v1/media/math/render/svg/57ac5840245616f79874f4635b3bcb2e3da344dd" srcset="" style="width: 4.865ex; height: 2.509ex; vertical-align: -0.671ex;"></span><code>1. "what is it"</code></li>
<li><span class="mwe-math-element"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y" style="display: none;"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle T_{2}=}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <msub>
          <mi>T</mi>
          <mrow class="MJX-TeXAtom-ORD">
            <mn>2</mn>
          </mrow>
        </msub>
        <mo>=</mo>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle T_{2}=}</annotation>
  </semantics></math></span><noscript><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/5713cf5634b3846b4d68c3383b65db289511d8bf" class="mwe-math-fallback-image-inline" aria-hidden="true" style="vertical-align: -0.671ex; width:4.865ex; height:2.509ex;" alt="{\displaystyle T_{2}=}"></noscript><img width="0" height="0" class="mwe-math-fallback-image-inline image-lazy-loaded" alt="{\displaystyle T_{2}=}" usemap="undefined" src="https://wikimedia.org/api/rest_v1/media/math/render/svg/5713cf5634b3846b4d68c3383b65db289511d8bf" srcset="" style="width: 4.865ex; height: 2.509ex; vertical-align: -0.671ex;"></span><code>2. "it is a banana"</code></li></ul>
<h2 id="反向档案索引" tabindex="-1"><a class="header-anchor" href="#反向档案索引" aria-hidden="true">#</a> 反向档案索引</h2>
<p>我们就能得到下面的反向文件索引：</p>
<pre> "a":      {2}
 "banana": {2}
 "is":     {0, 1, 2}
 "it":     {0, 1, 2}
 "what":   {0, 1}
</pre>
<p>如果要检索 'what'、'is'、'it'将对应这个集合：
$$
{0,1}\cap{0,1,2}\cap{0,1,2}={0,1}
$$</p>
<h2 id="完全反向索引" tabindex="-1"><a class="header-anchor" href="#完全反向索引" aria-hidden="true">#</a> 完全反向索引</h2>
<p>对相同的文字，我们得到后面这些完全反向索引，由文档数量和当前查询的单词结果组成的的成对数据。 同样，文档数量和当前查询的单词结果都从零开始。所以，&quot;banana&quot;: {(2, 3)} 就是说 &quot;banana&quot;在第三个文档里 T2，而且在第三个文档的位置是第四个单词(地址为 3)。</p>
<pre>"a":      {(2, 2)}
"banana": {(2, 3)}
"is":     {(0, 1), (0, 4), <b>(1, 1)</b>, (2, 1)}
"it":     {(0, 0), (0, 3), <b>(1, 2)</b>, (2, 0)} 
"what":   {(0, 2), <b>(1, 0)</b>}
</pre>
<p>如果我们执行短语搜索<code v-pre>&quot;what is it&quot;</code> 我们得到这个短语的全部单词各自的结果所在文档为文档0和文档1。但是这个短语检索的连续的条件仅仅在文档1得到。</p>
</div></template>


