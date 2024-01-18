<template><div><h2 id="conditionalxxx注解族" tabindex="-1"><a class="header-anchor" href="#conditionalxxx注解族" aria-hidden="true">#</a> @ConditionalXXX注解族</h2>
<h3 id="conditionalonproperty" tabindex="-1"><a class="header-anchor" href="#conditionalonproperty" aria-hidden="true">#</a> @ConditionalOnProperty</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">,</span> <span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Conditional</span><span class="token punctuation">(</span><span class="token class-name">OnPropertyCondition</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ConditionalOnProperty</span> <span class="token punctuation">{</span>

   <span class="token doc-comment comment">/**
    * Alias for <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>.
    * <span class="token keyword">@return</span> the names
    */</span>
   <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

   <span class="token doc-comment comment">/**
    * A prefix that should be applied to each property. The prefix automatically ends
    * with a dot if not specified. A valid prefix is defined by one or more words
    * separated with dots (e.g. <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token string">"acme.system.feature"</span></span></span><span class="token punctuation">}</span>).
    * <span class="token keyword">@return</span> the prefix
    */</span>
   <span class="token class-name">String</span> <span class="token function">prefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

   <span class="token doc-comment comment">/**
    * The name of the properties to test. If a prefix has been defined, it is applied to
    * compute the full key of each property. For instance if the prefix is
    * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">app<span class="token punctuation">.</span>config</span></span><span class="token punctuation">}</span> and one value is <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">my<span class="token operator">-</span>value</span></span><span class="token punctuation">}</span>, the full key would be
    * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>my<span class="token operator">-</span>value</span></span><span class="token punctuation">}</span>
    * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
    * Use the dashed notation to specify each property, that is all lower case with a "-"
    * to separate words (e.g. <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">my<span class="token operator">-</span><span class="token keyword">long</span><span class="token operator">-</span>property</span></span><span class="token punctuation">}</span>).
    * <span class="token keyword">@return</span> the names
    */</span>
   <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

   <span class="token doc-comment comment">/**
    * The string representation of the expected value for the properties. If not
    * specified, the property must <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span>not<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span> be equal to <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">false</span></span></span><span class="token punctuation">}</span>.
    * <span class="token keyword">@return</span> the expected value
    */</span>
   <span class="token class-name">String</span> <span class="token function">havingValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

   <span class="token doc-comment comment">/**
    * Specify if the condition should match if the property is not set. Defaults to
    * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">false</span></span></span><span class="token punctuation">}</span>.
    * <span class="token keyword">@return</span> if should match if the property is missing
    */</span>
   <span class="token keyword">boolean</span> <span class="token function">matchIfMissing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@ConditionalOnClass
@ConditionalOnBean
@ConditionalOnMissingBean</p>
<p>@ConditionalOnSingleCandidate</p>
<p><a href="https://spring.hhui.top/spring-blog/2018/10/19/181019-SpringBoot%E5%9F%BA%E7%A1%80%E7%AF%87Bean%E4%B9%8B%E6%9D%A1%E4%BB%B6%E6%B3%A8%E5%85%A5-ConditionalOnProperty/" target="_blank" rel="noopener noreferrer">一篇很齐全的博客<ExternalLinkIcon/></a></p>
</div></template>


