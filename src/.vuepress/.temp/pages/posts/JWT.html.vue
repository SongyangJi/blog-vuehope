<template><div><blockquote>
<p>在一个web项目中总需要考虑的一个问题就是如何认证用户的身份。</p>
</blockquote>
<h1 id="用户的认证方式" tabindex="-1"><a class="header-anchor" href="#用户的认证方式" aria-hidden="true">#</a> 用户的认证方式</h1>
<h2 id="传统的session认证" tabindex="-1"><a class="header-anchor" href="#传统的session认证" aria-hidden="true">#</a> 传统的session认证</h2>
<p>互联网服务离不开用户认证。一般流程是下面这样。</p>
<blockquote>
<p>1、用户向服务器发送用户名和密码。</p>
<p>2、服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。</p>
<p>3、服务器向用户返回一个 session_id，写入用户的 Cookie。</p>
<p>4、用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。</p>
<p>5、服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。</p>
</blockquote>
<p>我们知道，http协议本身是一种无状态的协议，而这就意味着如果用户向我们的应用提供了用户名和密码来进行用户认证，那么下一次请求时，用户还要再一次进行用户认证才行。</p>
<p>因为根据http协议，我们并不能知道是哪个用户发出的请求，所以<strong>为了让我们的应用能识别是哪个用户发出的请求</strong>，我们只能<strong>在服务器存储一份用户登录的信息</strong>，这份登录信息会在响应时传递给浏览器，<strong>将SessionID告诉客户端保存在cookie中，以便下次请求时发送给我们的应用</strong>，这样我们的应用就能识别请求来自哪个用户了，这就是传统的基于session认证。</p>
<p>但是这种基于session的认证使应用本身很难得到扩展，随着不同客户端用户的增加，独立的服务器已无法承载更多的用户，而这时候基于session认证应用的问题就会暴露出来。</p>
<h3 id="基于session认证所显露的问题" tabindex="-1"><a class="header-anchor" href="#基于session认证所显露的问题" aria-hidden="true">#</a> 基于session认证所显露的问题</h3>
<ul>
<li>Session: 每个用户经过我们的应用认证之后，我们的应用都要在服务端做一次记录，以方便用户下次请求的鉴别，通常而言session都是保存在内存中，而随着认证用户的增多，服务端的开销会明显增大。</li>
<li>水平扩展困难: 用户认证之后，服务端做认证记录，如果认证的记录被保存在内存中的话，这意味着用户下次请求还必须要请求在这台服务器上,这样才能拿到授权的资源，这样在分布式的应用上，相应的限制了负载均衡器的能力。这也意味着限制了应用的扩展能力。</li>
<li>CSRF: 因为是基于cookie来进行用户识别的, cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。</li>
</ul>
<blockquote>
<p><a href="https://tech.meituan.com/2018/10/11/fe-security-csrf.html" target="_blank" rel="noopener noreferrer">前端安全系列（二）：如何防止CSRF攻击？<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="基于token的鉴权机制" tabindex="-1"><a class="header-anchor" href="#基于token的鉴权机制" aria-hidden="true">#</a> 基于token的鉴权机制</h2>
<p>基于token的鉴权机制类似于http协议也是无状态的，它不需要在服务端去保留用户的认证信息或者会话信息。这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了，这就为应用的扩展提供了便利。</p>
<p>流程：</p>
<ol>
<li>用户使用账户、密码来请求服务器</li>
<li>服务器进行验证用户的信息</li>
<li>服务器通过验证发送给用户一个token</li>
<li>客户端存储token，并在每次请求时附送上这个token值</li>
<li>服务端验证token值，并返回数据</li>
</ol>
<h1 id="jwt" tabindex="-1"><a class="header-anchor" href="#jwt" aria-hidden="true">#</a> JWT</h1>
<h2 id="什么是jwt及原理" tabindex="-1"><a class="header-anchor" href="#什么是jwt及原理" aria-hidden="true">#</a> 什么是JWT及原理</h2>
<p>JWT(JSON Web Token) 是一个开放标准(RFC 7519)，它定义了一种<strong>紧凑的</strong>、<strong>自包含的</strong>（内部包含了一些会话信息）方式，</p>
<p><strong>用于作为JSON对象在各方之间安全地传输信息</strong>**。该信息可以被验证和信任**，因为它是有数字签名的。</p>
<p>JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code> <span class="token punctuation">{</span>
   <span class="token property">"姓名"</span><span class="token operator">:</span> <span class="token string">"张三"</span><span class="token punctuation">,</span>
   <span class="token property">"角色"</span><span class="token operator">:</span> <span class="token string">"管理员"</span><span class="token punctuation">,</span>
   <span class="token property">"到期时间"</span><span class="token operator">:</span> <span class="token string">"2018年7月1日0点0分"</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以后，用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名（详见后文）。</p>
<p>服务器就不保存任何 session 数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。</p>
<h2 id="jwt的构成" tabindex="-1"><a class="header-anchor" href="#jwt的构成" aria-hidden="true">#</a> JWT的构成</h2>
<p>JWT由三部分组成，它们之间用圆点(.)连接。这三部分分别是：</p>
<ul>
<li>Header</li>
<li>Payload</li>
<li>Signature</li>
</ul>
<p>三种都是经过Base64URL编码后的串。</p>
<p>写成一行，就是下面的样子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Header<span class="token punctuation">.</span>Payload<span class="token punctuation">.</span>Signature
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>具体的构成方式如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>base64(header).base64(payload).base64( HS256(base64(header) + "." + base64(payload), secret) )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> Header</h3>
<p>jwt的头部由两部分信息组成：</p>
<ul>
<li>type：声明类型，这里是jwt</li>
<li>alg：声明加密的算法 通常直接使用 HMAC SHA256</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"typ"</span><span class="token operator">:</span><span class="token string">"jwt"</span><span class="token punctuation">,</span>
  <span class="token property">"alg"</span><span class="token operator">:</span><span class="token string">"HS256"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对头部信息进行Base64编码的得到第一部分的信息。</p>
<h3 id="payload" tabindex="-1"><a class="header-anchor" href="#payload" aria-hidden="true">#</a> Payload</h3>
<p>载荷就是存放有效信息的地方,它包含声明（要求）。声明有三种类型：</p>
<ul>
<li>registered claims：标准中注册的声明。这里有一组预定义的声明，它们不是强制的，但是推荐</li>
<li>public claims：公共的声明</li>
<li>private claims：私有的声明</li>
</ul>
<p><strong>标准中注册的声明 (建议但不强制使用) ：</strong></p>
<ul>
<li>iss: jwt签发者</li>
<li>sub: jwt所面向的用户</li>
<li>aud: 接收jwt的一方</li>
<li>exp: jwt的过期时间，这个过期时间必须要大于签发时间</li>
<li>nbf: 定义在什么时间之前，该jwt都是不可用的</li>
<li>iat: jwt的签发时间</li>
<li>jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击</li>
</ul>
<p><strong>公共的声明 ：</strong></p>
<p>公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密.</p>
<p><strong>私有的声明 ：</strong></p>
<p>私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。</p>
<p>对Payload进行Base64加密就得到了JWT第二部分的内容。</p>
<h3 id="signature" tabindex="-1"><a class="header-anchor" href="#signature" aria-hidden="true">#</a> Signature</h3>
<p>JWT的第三部分是一个签证信息，这个签证信息由三部分组成：</p>
<ul>
<li>header (base64后的)</li>
<li>payload (base64后的)</li>
<li>secret</li>
</ul>
<p><strong>Signature 部分是对前两部分的签名，防止数据篡改。</strong></p>
<p>第三部分需要base64加密后的header和base64加密后的payload使用 <code v-pre>.</code> 连接组成的字符串，然后通过header中声明的加密方式进行加盐secret组合加密，然后就构成了JWT的第三部分。</p>
<p><strong>注意：</strong>
secret是保存在服务器端的，JWT的签发生成也是在服务器端的，<strong>secret就是用来进行JWT的签发和JWT的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去</strong>。</p>
<p>一旦客户端得知这个secret, 那就意味着客户端是可以自我签发JWT了。</p>
<h2 id="jwt的几个特点" tabindex="-1"><a class="header-anchor" href="#jwt的几个特点" aria-hidden="true">#</a> JWT的几个特点</h2>
<p>（1）JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。（？？？）</p>
<p>（2）JWT 不加密的情况下，不能将秘密数据写入 JWT。</p>
<p>（3）JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。</p>
<p>（4）JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。</p>
<p>（5）JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。</p>
<p>（6）为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。</p>
<h2 id="基于jjwt使用jwt" tabindex="-1"><a class="header-anchor" href="#基于jjwt使用jwt" aria-hidden="true">#</a> 基于jjwt使用JWT</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">LearnJwtApplicationTests</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> secret <span class="token operator">=</span> <span class="token string">"secret"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> secretBase64<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        secretBase64 <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encodeToString</span><span class="token punctuation">(</span>secret<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testJwtCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JwtBuilder</span> jwtBuilder <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> jwtBuilder
                <span class="token comment">// header</span>
                <span class="token punctuation">.</span><span class="token function">setHeaderParam</span><span class="token punctuation">(</span><span class="token string">"alg"</span><span class="token punctuation">,</span> <span class="token string">"HS256"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setHeaderParam</span><span class="token punctuation">(</span><span class="token string">"typ"</span><span class="token punctuation">,</span> <span class="token string">"JWT"</span><span class="token punctuation">)</span>
                <span class="token comment">// payload</span>
                <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token string">"sub"</span><span class="token punctuation">,</span> <span class="token string">"1234567890"</span><span class="token punctuation">)</span> <span class="token comment">// 标准声明</span>
                <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token string">"iat"</span><span class="token punctuation">,</span> <span class="token number">1516239022</span><span class="token punctuation">)</span>   <span class="token comment">// 标准声明</span>
                <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"John Doe"</span><span class="token punctuation">)</span>  <span class="token comment">// 自定义声明</span>
                <span class="token comment">// signature</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">,</span> secretBase64<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testJWTParse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."</span> <span class="token operator">+</span>
<span class="token comment">//                "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ."+</span>
                <span class="token string">"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9vIiwiaWF0IjoxNTE2MjM5MDIyfQ."</span> <span class="token operator">+</span>
                <span class="token string">"XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o"</span><span class="token punctuation">;</span>
        <span class="token class-name">JwtParser</span> jwtParser <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Jws</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Claims</span><span class="token punctuation">></span></span> claimsJws <span class="token operator">=</span> jwtParser<span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>secretBase64<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JwsHeader</span> header <span class="token operator">=</span> claimsJws<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Claims</span> body <span class="token operator">=</span> claimsJws<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> signature <span class="token operator">=</span> claimsJws<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"----- header -----"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"alg : "</span> <span class="token operator">+</span> header<span class="token punctuation">.</span><span class="token function">getAlgorithm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"typ : "</span><span class="token operator">+</span>header<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"----- body -----"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sub : "</span><span class="token operator">+</span>body<span class="token punctuation">.</span><span class="token function">getSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"iat : "</span><span class="token operator">+</span>body<span class="token punctuation">.</span><span class="token function">getIssuedAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"name : "</span><span class="token operator">+</span>body<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"id : "</span><span class="token operator">+</span>body<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"----- signature -----"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"signature : "</span> <span class="token operator">+</span> signature<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="jwt的使用方式" tabindex="-1"><a class="header-anchor" href="#jwt的使用方式" aria-hidden="true">#</a> JWT的使用方式</h1>
<h2 id="前端" tabindex="-1"><a class="header-anchor" href="#前端" aria-hidden="true">#</a> 前端</h2>
<h3 id="前端储存jwt" tabindex="-1"><a class="header-anchor" href="#前端储存jwt" aria-hidden="true">#</a> 前端储存JWT</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span><span class="token punctuation">;</span>
axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>
	<span class="token string">"/user/login"</span><span class="token punctuation">,</span>
	<span class="token punctuation">{</span>
		<span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userId<span class="token punctuation">,</span>
		<span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userPsw<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$message</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			<span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"登录成功"</span><span class="token punctuation">,</span>
			<span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">"登录成功！正在为您跳转页面..."</span><span class="token punctuation">,</span>
			<span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"success"</span><span class="token punctuation">,</span>
			<span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
			<span class="token literal-property property">showClose</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
			<span class="token function-variable function">onClose</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">"setNoToken"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$alert</span><span class="token punctuation">(</span>
			<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">错误代码</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>message<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
			<span class="token string">"登录失败"</span><span class="token punctuation">,</span>
			<span class="token punctuation">{</span>
				<span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"error"</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="请求携带jwt" tabindex="-1"><a class="header-anchor" href="#请求携带jwt" aria-hidden="true">#</a> 请求携带JWT</h3>
<p>客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。</p>
<p>此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域(<a href="https://www.cnblogs.com/imgss/p/cors.html" target="_blank" rel="noopener noreferrer">cookie跨域那些事<ExternalLinkIcon/></a>)，所以更好的做法是放在 HTTP 请求的头信息<code v-pre>Authorization</code>字段里面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">Authorization</span><span class="token operator">:</span> Bearer <span class="token operator">&lt;</span>token<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span><span class="token punctuation">;</span>
axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>
	<span class="token string">'/test'</span><span class="token punctuation">,</span> <span class="token comment">// url</span>
	<span class="token punctuation">{</span><span class="token literal-property property">num</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// data</span>
	<span class="token punctuation">{</span>
		<span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">Authorization</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Bearer </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>token<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// options</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/posts/unsed-img-dir/JWT/jwt1.png" style="zoom:60%;" />
<h3 id="前端提取jwt携带的信息" tabindex="-1"><a class="header-anchor" href="#前端提取jwt携带的信息" aria-hidden="true">#</a> 前端提取JWT携带的信息</h3>
<p>前面也有提到，JWT的payload模块可以携带一些业务逻辑所必要的非敏感信息。因此，前端需要能够解析出JWT字符串。
举个例子，在sduoj中，需要判断用户的登录信息是否合法，其中一项评判标准就是JWT是否过期。在后端的服务器代码中存在这一部分逻辑，而在前端的代码中，也包含了这一段逻辑代码。
前端的代码逻辑中，仅在用户首次与sduoj的前端页面建立会话时进行判断。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 首先判断localStorage中是否存在token字段</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token doc-comment comment">/**
	 * 注意，由于localStorage是以字符串形式取出的
	 * 当token字段是空字符串时，javascript会将其转换为布尔值false。
	 * 因此需要增加!==null进行判断。	
	 */</span>
	<span class="token comment">// 使用模块加载器将通过yarn安装的jsonwebtoken加载进来</span>
	<span class="token keyword">let</span> jwt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"jsonwebtoken"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
	<span class="token comment">// 使用jsonwebtoken解析JWT字符串</span>
	<span class="token keyword">const</span> <span class="token constant">TOKEN</span> <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token doc-comment comment">/**
	 * 通过jsonwebtoken解析后将会得到包含payload非敏感部分明文的JSON对象
	 * 提取jwt的过期时间，过期时间处在exp字段下
	 * 注意：jwt的时间单位比javascript、java等语言的时间单位要大3个数量级
	 * 因此，需要给解析出的时间乘上1000
	 */</span>
	<span class="token keyword">let</span> exp <span class="token operator">=</span> <span class="token constant">TOKEN</span><span class="token punctuation">.</span>exp <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">;</span>
	<span class="token comment">// 判断当前时间是否已超过token的过期时间</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>exp <span class="token operator">&lt;=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$message</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			<span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">"您的身份认证已过期，请重新登陆"</span><span class="token punctuation">,</span>
			<span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"warning"</span><span class="token punctuation">,</span>
			<span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
			<span class="token function-variable function">onClose</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
				<span class="token doc-comment comment">/**
				 * 消息提示关闭后执行两项任务
				 * 1.将过期的token字段从localStorage中移除
				 * 2.为用户跳转至登录界面
				 */</span>
				localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
	<span class="token comment">// 当localStorage中不存在token字段时，自动跳转至登录界面</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="后端-springboot" tabindex="-1"><a class="header-anchor" href="#后端-springboot" aria-hidden="true">#</a> 后端（SpringBoot）</h2>
<h3 id="生成、解析jwt" tabindex="-1"><a class="header-anchor" href="#生成、解析jwt" aria-hidden="true">#</a> 生成、解析JWT</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>jsy<span class="token punctuation">.</span>learnjwt<span class="token punctuation">.</span>util</span><span class="token punctuation">;</span>


<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>jsy<span class="token punctuation">.</span>learnjwt<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">CheckResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>jsy<span class="token punctuation">.</span>learnjwt<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">SystemConstant</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span></span><span class="token class-name">SecretKey</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span>spec<span class="token punctuation">.</span></span><span class="token class-name">SecretKeySpec</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtUtil</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 签发JWT
     *
     * <span class="token keyword">@param</span> <span class="token parameter">id</span>        JWT的唯一标识
     * <span class="token keyword">@param</span> <span class="token parameter">subject</span>   代表这个JWT的主体，即它的所有人，这个是一个json格式的字符串，可以存放什么userId，roleId之类的，作为什么用户的唯一标志
     * <span class="token keyword">@param</span> <span class="token parameter">ttlMillis</span> 有效时间
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">createJWT</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> subject<span class="token punctuation">,</span> <span class="token class-name">Long</span> ttlMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> nowMillis <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Date</span> now <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>nowMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SecretKey</span> secretKey <span class="token operator">=</span> <span class="token function">generalKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JwtBuilder</span> builder <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token comment">// 是JWT的唯一标识，根据业务需要，这个可以设置为一个不重复的值，主要用来作为一次性token,从而回避重放攻击。</span>
                <span class="token punctuation">.</span><span class="token function">setSubject</span><span class="token punctuation">(</span>subject<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setIssuer</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>     <span class="token comment">// 颁发者是使用 HTTP 或 HTTPS 方案的 URL（区分大小写），其中包含方案、主机及（可选的）端口号和路径部分</span>
                <span class="token punctuation">.</span><span class="token function">setIssuedAt</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span>      <span class="token comment">// jwt的签发时间</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">,</span> secretKey<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 设置签名使用的签名算法和签名使用的秘钥</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ttlMillis <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">long</span> expMillis <span class="token operator">=</span> nowMillis <span class="token operator">+</span> ttlMillis<span class="token punctuation">;</span>
            <span class="token class-name">Date</span> expDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>expMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
            builder<span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span>expDate<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 过期时间</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 验证JWT
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CheckResult</span> <span class="token function">validateJWT</span><span class="token punctuation">(</span><span class="token class-name">String</span> jwtStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CheckResult</span> checkResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CheckResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Claims</span> claims <span class="token operator">=</span> <span class="token function">parseJWT</span><span class="token punctuation">(</span>jwtStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
            checkResult<span class="token punctuation">.</span><span class="token function">setClaims</span><span class="token punctuation">(</span>claims<span class="token punctuation">)</span><span class="token punctuation">;</span>
            checkResult<span class="token punctuation">.</span><span class="token function">setSuccess</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExpiredJwtException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// JWT 过期</span>
            checkResult<span class="token punctuation">.</span><span class="token function">setErrCode</span><span class="token punctuation">(</span><span class="token class-name">SystemConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_ERRCODE_EXPIRE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            checkResult<span class="token punctuation">.</span><span class="token function">setSuccess</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            checkResult<span class="token punctuation">.</span><span class="token function">setErrCode</span><span class="token punctuation">(</span><span class="token class-name">SystemConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_ERRCODE_FAIL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            checkResult<span class="token punctuation">.</span><span class="token function">setSuccess</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> checkResult<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">SecretKey</span> <span class="token function">generalKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> encodedKey <span class="token operator">=</span> <span class="token class-name">SystemConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_SECRET</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SecretKeySpec</span><span class="token punctuation">(</span>encodedKey<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> encodedKey<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token string">"AES"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 解析JWT字符串
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Claims</span> <span class="token function">parseJWT</span><span class="token punctuation">(</span><span class="token class-name">String</span> jwt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SecretKey</span> secretKey <span class="token operator">=</span> <span class="token function">generalKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>secretKey<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>jwt<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拦截器处理token的验证" tabindex="-1"><a class="header-anchor" href="#拦截器处理token的验证" aria-hidden="true">#</a> 拦截器处理token的验证</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>jsy<span class="token punctuation">.</span>learnjwt<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>fastjson<span class="token punctuation">.</span></span><span class="token class-name">JSONObject</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>jsy<span class="token punctuation">.</span>learnjwt<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">CheckResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>jsy<span class="token punctuation">.</span>learnjwt<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">SystemConstant</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>jsy<span class="token punctuation">.</span>learnjwt<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">JwtUtil</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">HandlerInterceptor</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">Cookie</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span>charset<span class="token punctuation">.</span></span><span class="token class-name">StandardCharsets</span></span><span class="token punctuation">;</span>


<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span>: SongyangJi
 * <span class="token keyword">@description</span>:
 * <span class="token keyword">@since</span>: 2021/12/27
 */</span>

<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">HandlerInterceptor</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

        <span class="token comment">// 1.从Cookie获取token</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token function">getTokenFromCookie</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 2.从headers中获取</span>
            token <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 3.从请求参数获取</span>
            token <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//输出响应流</span>
            <span class="token class-name">JSONObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"msg"</span><span class="token punctuation">,</span> <span class="token string">"403"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"application/json; charset=utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>jsonObject<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 验证token</span>
        <span class="token class-name">CheckResult</span> checkResult <span class="token operator">=</span> <span class="token class-name">JwtUtil</span><span class="token punctuation">.</span><span class="token function">validateJWT</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>checkResult<span class="token punctuation">.</span><span class="token function">isSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 验证通过</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>checkResult<span class="token punctuation">.</span><span class="token function">getErrCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">SystemConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_ERRCODE_EXPIRE</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//输出响应流</span>
                <span class="token class-name">JSONObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"msg"</span><span class="token punctuation">,</span> <span class="token class-name">SystemConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_ERRCODE_EXPIRE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"application/json; charset=utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>jsonObject<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>checkResult<span class="token punctuation">.</span><span class="token function">getErrCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">SystemConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_ERRCODE_FAIL</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//输出响应流</span>
                <span class="token class-name">JSONObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"msg"</span><span class="token punctuation">,</span> <span class="token class-name">SystemConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_ERRCODE_FAIL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"application/json; charset=utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>jsonObject<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//输出响应流</span>
            <span class="token class-name">JSONObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"msg"</span><span class="token punctuation">,</span> <span class="token string">"403"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"application/json; charset=utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>jsonObject<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">getTokenFromCookie</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Cookie</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cookies <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getCookies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token operator">==</span> cookies <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> cookies<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Cookie</span> cookie <span class="token operator">:</span> cookies<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>cookie<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    token <span class="token operator">=</span> cookie<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> token<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置对应路径的接口的拦截器</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebMvcConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">MyInterceptor</span> myInterceptor<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 设置对应路径的接口的拦截器</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span>myInterceptor<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/token/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h1>
<p>https://jwt.io/</p>
<p>https://jwt.io/introduction/</p>
<p>http://www.jsons.cn/allencrypt/</p>
<p>https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html</p>
<p>https://blog.csdn.net/qq_53126706/article/details/120925322?spm=1001.2014.3001.5501</p>
<p>https://www.jianshu.com/p/6623416161ff</p>
<p>https://www.jianshu.com/p/4a124a10fcaf</p>
</div></template>


