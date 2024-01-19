export const data = JSON.parse("{\"key\":\"v-cbe38d38\",\"path\":\"/posts/%E5%85%B3%E4%BA%8ESpring%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B3%A8%E8%A7%A3.html\",\"title\":\"关于Spring自动配置的一些注解\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"关于Spring自动配置的一些注解\",\"date\":\"2021-09-16T00:00:00.000Z\",\"categories\":\"Spring\",\"tags\":[\"Spring核心\",\"JavaSE\"],\"description\":\"@ConditionalXXX注解族 @ConditionalOnProperty @Retention(RetentionPolicy.RUNTIME) @Target({ ElementType.TYPE, ElementType.METHOD }) @Documented @Conditional(OnPropertyCondition.class) public @interface ConditionalOnProperty { /** * Alias for {@link #name()}. * @return the names */ String[] value() default {}; /** * A prefix that should be applied to each property. The prefix automatically ends * with a dot if not specified. A valid prefix is defined by one or more words * separated with dots (e.g. {@code \\\"acme.system.feature\\\"}). * @return the prefix */ String prefix() default \\\"\\\"; /** * The name of the properties to test. If a prefix has been defined, it is applied to * compute the full key of each property. For instance if the prefix is * {@code app.config} and one value is {@code my-value}, the full key would be * {@code app.config.my-value} * &lt;p&gt; * Use the dashed notation to specify each property, that is all lower case with a \\\"-\\\" * to separate words (e.g. {@code my-long-property}). * @return the names */ String[] name() default {}; /** * The string representation of the expected value for the properties. If not * specified, the property must &lt;strong&gt;not&lt;/strong&gt; be equal to {@code false}. * @return the expected value */ String havingValue() default \\\"\\\"; /** * Specify if the condition should match if the property is not set. Defaults to * {@code false}. * @return if should match if the property is missing */ boolean matchIfMissing() default false; }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/%E5%85%B3%E4%BA%8ESpring%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B3%A8%E8%A7%A3.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"关于Spring自动配置的一些注解\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"@ConditionalXXX注解族 @ConditionalOnProperty @Retention(RetentionPolicy.RUNTIME) @Target({ ElementType.TYPE, ElementType.METHOD }) @Documented @Conditional(OnPropertyCondition.class) public @interface ConditionalOnProperty { /** * Alias for {@link #name()}. * @return the names */ String[] value() default {}; /** * A prefix that should be applied to each property. The prefix automatically ends * with a dot if not specified. A valid prefix is defined by one or more words * separated with dots (e.g. {@code \\\"acme.system.feature\\\"}). * @return the prefix */ String prefix() default \\\"\\\"; /** * The name of the properties to test. If a prefix has been defined, it is applied to * compute the full key of each property. For instance if the prefix is * {@code app.config} and one value is {@code my-value}, the full key would be * {@code app.config.my-value} * &lt;p&gt; * Use the dashed notation to specify each property, that is all lower case with a \\\"-\\\" * to separate words (e.g. {@code my-long-property}). * @return the names */ String[] name() default {}; /** * The string representation of the expected value for the properties. If not * specified, the property must &lt;strong&gt;not&lt;/strong&gt; be equal to {@code false}. * @return the expected value */ String havingValue() default \\\"\\\"; /** * Specify if the condition should match if the property is not set. Defaults to * {@code false}. * @return if should match if the property is missing */ boolean matchIfMissing() default false; }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Spring核心\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"JavaSE\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-09-16T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"关于Spring自动配置的一些注解\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-09-16T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2024-01-18T12:43:38.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"@ConditionalXXX注解族\",\"slug\":\"conditionalxxx注解族\",\"link\":\"#conditionalxxx注解族\",\"children\":[{\"level\":3,\"title\":\"@ConditionalOnProperty\",\"slug\":\"conditionalonproperty\",\"link\":\"#conditionalonproperty\",\"children\":[]}]}],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705581818000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":0.95,\"words\":285},\"filePathRelative\":\"posts/关于Spring自动配置的一些注解.md\",\"localizedDate\":\"2021年9月16日\",\"excerpt\":\"<h2> @ConditionalXXX注解族</h2>\\n<h3> @ConditionalOnProperty</h3>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token annotation punctuation\\\">@Retention</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">RetentionPolicy</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token constant\\\">RUNTIME</span><span class=\\\"token punctuation\\\">)</span>\\n<span class=\\\"token annotation punctuation\\\">@Target</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">{</span> <span class=\\\"token class-name\\\">ElementType</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token constant\\\">TYPE</span><span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">ElementType</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token constant\\\">METHOD</span> <span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">)</span>\\n<span class=\\\"token annotation punctuation\\\">@Documented</span>\\n<span class=\\\"token annotation punctuation\\\">@Conditional</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">OnPropertyCondition</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token keyword\\\">class</span><span class=\\\"token punctuation\\\">)</span>\\n<span class=\\\"token keyword\\\">public</span> <span class=\\\"token annotation punctuation\\\">@interface</span> <span class=\\\"token class-name\\\">ConditionalOnProperty</span> <span class=\\\"token punctuation\\\">{</span>\\n\\n   <span class=\\\"token doc-comment comment\\\">/**\\n    * Alias for <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@link</span> <span class=\\\"token reference\\\"><span class=\\\"token punctuation\\\">#</span><span class=\\\"token function\\\">name</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span></span><span class=\\\"token punctuation\\\">}</span>.\\n    * <span class=\\\"token keyword\\\">@return</span> the names\\n    */</span>\\n   <span class=\\\"token class-name\\\">String</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> <span class=\\\"token function\\\">value</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">default</span> <span class=\\\"token punctuation\\\">{</span><span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n\\n   <span class=\\\"token doc-comment comment\\\">/**\\n    * A prefix that should be applied to each property. The prefix automatically ends\\n    * with a dot if not specified. A valid prefix is defined by one or more words\\n    * separated with dots (e.g. <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@code</span> <span class=\\\"token code-section\\\"><span class=\\\"token code language-java\\\"><span class=\\\"token string\\\">\\\"acme.system.feature\\\"</span></span></span><span class=\\\"token punctuation\\\">}</span>).\\n    * <span class=\\\"token keyword\\\">@return</span> the prefix\\n    */</span>\\n   <span class=\\\"token class-name\\\">String</span> <span class=\\\"token function\\\">prefix</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">default</span> <span class=\\\"token string\\\">\\\"\\\"</span><span class=\\\"token punctuation\\\">;</span>\\n\\n   <span class=\\\"token doc-comment comment\\\">/**\\n    * The name of the properties to test. If a prefix has been defined, it is applied to\\n    * compute the full key of each property. For instance if the prefix is\\n    * <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@code</span> <span class=\\\"token code-section\\\"><span class=\\\"token code language-java\\\">app<span class=\\\"token punctuation\\\">.</span>config</span></span><span class=\\\"token punctuation\\\">}</span> and one value is <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@code</span> <span class=\\\"token code-section\\\"><span class=\\\"token code language-java\\\">my<span class=\\\"token operator\\\">-</span>value</span></span><span class=\\\"token punctuation\\\">}</span>, the full key would be\\n    * <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@code</span> <span class=\\\"token code-section\\\"><span class=\\\"token code language-java\\\">app<span class=\\\"token punctuation\\\">.</span>config<span class=\\\"token punctuation\\\">.</span>my<span class=\\\"token operator\\\">-</span>value</span></span><span class=\\\"token punctuation\\\">}</span>\\n    * <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>p</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    * Use the dashed notation to specify each property, that is all lower case with a \\\"-\\\"\\n    * to separate words (e.g. <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@code</span> <span class=\\\"token code-section\\\"><span class=\\\"token code language-java\\\">my<span class=\\\"token operator\\\">-</span><span class=\\\"token keyword\\\">long</span><span class=\\\"token operator\\\">-</span>property</span></span><span class=\\\"token punctuation\\\">}</span>).\\n    * <span class=\\\"token keyword\\\">@return</span> the names\\n    */</span>\\n   <span class=\\\"token class-name\\\">String</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> <span class=\\\"token function\\\">name</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">default</span> <span class=\\\"token punctuation\\\">{</span><span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n\\n   <span class=\\\"token doc-comment comment\\\">/**\\n    * The string representation of the expected value for the properties. If not\\n    * specified, the property must <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>strong</span><span class=\\\"token punctuation\\\">&gt;</span></span>not<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>strong</span><span class=\\\"token punctuation\\\">&gt;</span></span> be equal to <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@code</span> <span class=\\\"token code-section\\\"><span class=\\\"token code language-java\\\"><span class=\\\"token boolean\\\">false</span></span></span><span class=\\\"token punctuation\\\">}</span>.\\n    * <span class=\\\"token keyword\\\">@return</span> the expected value\\n    */</span>\\n   <span class=\\\"token class-name\\\">String</span> <span class=\\\"token function\\\">havingValue</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">default</span> <span class=\\\"token string\\\">\\\"\\\"</span><span class=\\\"token punctuation\\\">;</span>\\n\\n   <span class=\\\"token doc-comment comment\\\">/**\\n    * Specify if the condition should match if the property is not set. Defaults to\\n    * <span class=\\\"token punctuation\\\">{</span><span class=\\\"token keyword\\\">@code</span> <span class=\\\"token code-section\\\"><span class=\\\"token code language-java\\\"><span class=\\\"token boolean\\\">false</span></span></span><span class=\\\"token punctuation\\\">}</span>.\\n    * <span class=\\\"token keyword\\\">@return</span> if should match if the property is missing\\n    */</span>\\n   <span class=\\\"token keyword\\\">boolean</span> <span class=\\\"token function\\\">matchIfMissing</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">default</span> <span class=\\\"token boolean\\\">false</span><span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")
