<template><div><h1 id="替换brew-git" tabindex="-1"><a class="header-anchor" href="#替换brew-git" aria-hidden="true">#</a> 替换brew.git</h1>
<p>cd &quot;$(brew --repo)&quot;
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git</p>
<h1 id="替换homebrew-core-git" tabindex="-1"><a class="header-anchor" href="#替换homebrew-core-git" aria-hidden="true">#</a> 替换homebrew-core.git</h1>
<p>cd &quot;$(brew --repo)/Library/Taps/homebrew/homebrew-core&quot;
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git</p>
<h1 id="替换homebrew-bottles访问地址" tabindex="-1"><a class="header-anchor" href="#替换homebrew-bottles访问地址" aria-hidden="true">#</a> 替换homebrew-bottles访问地址</h1>
<p>echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' &gt;&gt; ~/.zprofile
source ~/.zprofile</p>
</div></template>


