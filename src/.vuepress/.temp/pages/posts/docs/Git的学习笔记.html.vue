<template><div><h1 id="安装与配置" tabindex="-1"><a class="header-anchor" href="#安装与配置" aria-hidden="true">#</a> 安装与配置</h1>
<p>Mac上使用图形化安装工具、brew、xcode自带的都可以。
检查</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h2>
<p>配置文件为 *gitconfig</p>
<p>作用域有三种：</p>
<ol>
<li>系统 system (/etc/gitconfig)</li>
<li>全局（用户）global (在 ~/.gitconfig )</li>
<li>项目 (在仓库的 /project/.git/config)</li>
</ol>
<ul>
<li>查看</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--list</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>配置</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">'jsy'</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">'153xxxxx@qq.com'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h1>
<h2 id="版本库、工作区、暂存区" tabindex="-1"><a class="header-anchor" href="#版本库、工作区、暂存区" aria-hidden="true">#</a> 版本库、工作区、暂存区</h2>
<ul>
<li>版本库
就是那个 .git
里面有</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir .git % <span class="token function">ls</span>
HEAD		description	info		refs
config		hooks		objects
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>工作区
我们能看到的那个包含.git的文件夹, 比如下面的那个 repo 文件夹就是</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir .git % <span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
jisongyang@SongyangJi-MacBookAir repo % <span class="token builtin class-name">pwd</span>
/Users/jisongyang/learn-git-repo/repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>暂存区
临时保存的修改的文件的地方</li>
</ul>
<h2 id="git下文件的状态" tabindex="-1"><a class="header-anchor" href="#git下文件的状态" aria-hidden="true">#</a> git下文件的状态</h2>
<ol>
<li>untracked 未被git管理</li>
<li>tracked
<ol>
<li>unmodified 未修改</li>
<li>modified 已修改</li>
<li>staged 暂存</li>
</ol>
</li>
</ol>
<p>查看状态</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> status
<span class="token comment"># 未跟踪</span>
<span class="token function">git</span> status <span class="token parameter variable">-s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir repo % <span class="token function">clear</span>
<span class="token comment"># 未跟踪</span>
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> status <span class="token parameter variable">-s</span>
?? a.txt
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> <span class="token function">add</span> a.txt
<span class="token comment"># 已跟踪</span>
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> status <span class="token parameter variable">-s</span>
A  a.txt
jisongyang@SongyangJi-MacBookAir repo % <span class="token builtin class-name">echo</span> hello <span class="token operator">>></span> a.txt
<span class="token comment"># 已修改</span>
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> status <span class="token parameter variable">-s</span>
AM a.txt
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> reset a.txt
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> status <span class="token parameter variable">-s</span>
?? a.txt
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> commit a.txt
<span class="token punctuation">[</span>master <span class="token punctuation">(</span>root-commit<span class="token punctuation">)</span> <span class="token number">5273424</span><span class="token punctuation">]</span> init a.txt
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> a.txt
jisongyang@SongyangJi-MacBookAir repo % <span class="token function">git</span> status <span class="token parameter variable">-s</span>
<span class="token comment"># a.txt 在状态里不可见了</span>
jisongyang@SongyangJi-MacBookAir repo %
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gitignore" tabindex="-1"><a class="header-anchor" href="#gitignore" aria-hidden="true">#</a> .gitignore</h2>
<p>当有文件不需要git管理的时候，使用这个文件就很有必要了。
比如日志、项目编译出来的文件、IDEA的本地信息等等，就不需要git管理。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 文件名固定</span>
<span class="token function">touch</span> .gitignore
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>看例子就好</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 忽略所有 *.class</span>
*.class
<span class="token comment"># 但是不忽略Hello.class</span>
<span class="token operator">!</span>Hello.class
<span class="token comment"># 忽略当前目录下的TODO文件夹</span>
/TODO 
<span class="token comment"># 忽略 target 下的所有文件</span>
target/
<span class="token comment"># 忽略 doc/*.txt的所有文件夹</span>
doc/*.txt
<span class="token comment">## 忽略 doc及其所有子目录下所有的 *.txt</span>
doc/**/*.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="仓库" tabindex="-1"><a class="header-anchor" href="#仓库" aria-hidden="true">#</a> 仓库</h2>
<ul>
<li>在本地初始化仓库</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建完会多一个 .init文件(默认不可见)</p>
<ul>
<li>从远程仓库克隆</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="暂存区" tabindex="-1"><a class="header-anchor" href="#暂存区" aria-hidden="true">#</a> 暂存区</h2>
<p>从工作区到暂存区</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> filename
<span class="token comment"># 添加全部文件</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直接从暂存区删除文件，工作区则不做出改变</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="版本库" tabindex="-1"><a class="header-anchor" href="#版本库" aria-hidden="true">#</a> 版本库</h2>
<ul>
<li>从暂存区到版本库</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">'message'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>修改上一次的commit</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">--amend</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>具体使用方法见<a href="https://zhuanlan.zhihu.com/p/100243017" target="_blank" rel="noopener noreferrer">git commit --amend 修改git提交记录用法详解<ExternalLinkIcon/></a></p>
<h1 id="远程仓库" tabindex="-1"><a class="header-anchor" href="#远程仓库" aria-hidden="true">#</a> 远程仓库</h1>
<p><strong>查看已连接的远程仓库</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote
<span class="token function">git</span> remote <span class="token parameter variable">-v</span>
<span class="token function">git</span> remote show origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>添加远程仓库</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> <span class="token punctuation">[</span>shortname<span class="token punctuation">]</span> url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>从远程仓库克隆到本地</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>移除无效的远程仓库</strong>（只是移除关联关系，不会对远程仓库有影响）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">rm</span> origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>抓取(fetch)</strong>
从远程仓库将最新版本获取到本地仓库</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> fetch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>拉取(pull)</strong>
相当于fetch + merge : 从远程仓库将最新版本获取到本地仓库，并merge
（根据配置也可能是相当于 fetch + rebase）
(可能报 merge unrelated histories)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> pull <span class="token punctuation">[</span>romote-name<span class="token punctuation">]</span> <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>推送(push)</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push <span class="token punctuation">[</span>romote-name<span class="token punctuation">]</span> <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="分支" tabindex="-1"><a class="header-anchor" href="#分支" aria-hidden="true">#</a> 分支</h1>
<p>master分支是git自动创建的，但没并没有什么特殊之处。</p>
<p><strong>查看分支</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 列出所有本地分支</span>
<span class="token function">git</span> branch
<span class="token comment"># 列出所有远程分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-r</span>
<span class="token comment"># 列出远程和本地分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建分支</strong>(在原先分支下创建分支，内容会初始共享)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch branch-name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例（*master表示当前在master分支下）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir repo1 % <span class="token function">git</span> branch b1
jisongyang@SongyangJi-MacBookAir repo1 % <span class="token function">git</span> branch
  b1
* master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>切换分支</strong>（这个时候就自动把目标分支在本地仓库里的文件换到工作区里）</p>
<div class="language-bashå line-numbers-mode" data-ext="bashå"><pre v-pre class="language-bashå"><code>git checkout b1

# &quot;打开&quot;远程仓库的分支
# 如果没有全部拉下来的话
# git fetch -all
git checkout -b dev（本地分支名） origin/dev（远程分支名）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个命令合并到一步：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>将本地分支推送至远程仓库</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin b1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>分支合并</strong>
(可能会冲突)
这里的冲突需要正确理解（这里的冲突的就像是乐观锁的加版本号一样，事实上在svn里确实有全局版本号，不允许脏写发生）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 把b1分支合并到当前的master分支</span>
<span class="token function">git</span> merge b1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>rebase</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> fetch
<span class="token function">git</span> rebase dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>是rebase还是merge？</strong>
git rebase和git merge这两个命令都旨在将更改代码从一个分支合并到另一个分支，但二者的合并方式却有很大的不同。
git merge优点是分支代码合并后不破坏原分支的代码提交记录，缺点就是会产生额外的提交记录并进行两条分支的合并，
git rebase 优点是无须新增提交记录到目标分支，rebase后可以将对象分支的提交历史续上目标分支上，形成线性提交历史记录，进行review的时候更加直观。</p>
<blockquote>
<p><strong>git rebase的黄金原则</strong>
<strong>不能对一个共享的分支进行Git rebase操作</strong>。
<s>比如，现在在feature分支上，现在想要合并master分支的代码：
也就是说，如果master分支是共享的（这是一种很常见的方式），
那么就不能进行 git rebase master，
而是要进行 git merge master。</s></p>
</blockquote>
<p>总结</p>
<ul>
<li><strong>融合代码到公共分支的时使用git merge</strong>，而不用git rebase</li>
<li><strong>融合代码到个人分支的时候使用git rebase</strong>，可以不污染分支的提交记录，形成简洁的线性提交历史记录。
参考 <a href="https://joyohub.com/2020/04/06/git-rebase/" target="_blank" rel="noopener noreferrer">git rebase和git merge有什么区别？<ExternalLinkIcon/></a></li>
</ul>
<p><strong>删除分支</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 删除的是本地的分支，对远程的分支无关</span>
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> branch-name
<span class="token comment"># 强制删除（git的保护，以防误删）</span>
<span class="token function">git</span> branch <span class="token parameter variable">-D</span> branch-name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jisongyang@SongyangJi-MacBookAir repo1 % <span class="token function">git</span> branch <span class="token parameter variable">-d</span> b1
error: The branch <span class="token string">'b1'</span> is not fully merged.
If you are sure you want to delete it, run <span class="token string">'git branch -D b1'</span><span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除远程分支</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push origin <span class="token parameter variable">-d</span> branchname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="标签" tabindex="-1"><a class="header-anchor" href="#标签" aria-hidden="true">#</a> 标签</h1>
<p>Git给历史中的某次提交打上标签，以示重要。
标签指的是某个分支某个特定时间节点的状态。（就像是打了一份快照）</p>
<p><strong>查看已有标签</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 列出已有标签</span>
<span class="token function">git</span> tag
<span class="token function">git</span> show tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建标签</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> tag tagname
<span class="token function">git</span> tag tagname <span class="token parameter variable">-m</span> message
<span class="token comment"># 举例</span>
<span class="token function">git</span> tag v1.0 <span class="token parameter variable">-m</span> <span class="token string">'finally a stable release'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将标签推送到远程仓库</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 推送某个标签</span>
<span class="token function">git</span> push origin vxx
<span class="token comment"># 推送所有不在remote的标签</span>
<span class="token function">git</span> push origin <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实操</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 拉取所有版本</span>
<span class="token function">git</span> fetch <span class="token parameter variable">--all</span> <span class="token parameter variable">--tags</span>
<span class="token comment"># 查看有哪些版本</span>
<span class="token function">git</span> tag
<span class="token comment"># 创建某个版本的新的分支并切换过去</span>
<span class="token function">git</span> checkout tags/v1.0 <span class="token parameter variable">-b</span> v1.0-branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE" target="_blank" rel="noopener noreferrer">Git-基础-打标签<ExternalLinkIcon/></a></p>
<h1 id="命令拾遗" tabindex="-1"><a class="header-anchor" href="#命令拾遗" aria-hidden="true">#</a> 命令拾遗</h1>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 查看工作区和暂存区的文件</span>
<span class="token function">git</span> ls-files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>删除</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>git rm</code>和<code v-pre>rm</code>的区别很多，网上讲的也都是其中的一个方面，不细讲了，最好自己试试。</p>
<p>查看日志</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


