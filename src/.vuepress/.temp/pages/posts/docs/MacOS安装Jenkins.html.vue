<template><div><p>Mac用户使用brew安装jenkins最为方便了</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 安装</span>
brew update
brew <span class="token function">install</span> jenkins
<span class="token comment"># 更新</span>
brew upgrade jenkins
<span class="token comment"># 启动</span>
brew services start jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看admin密码</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> .jenkins/secrets/initialAdminPassword
<span class="token comment"># a5f8fbee0dfe4fec807b71ae42a1a1f8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


