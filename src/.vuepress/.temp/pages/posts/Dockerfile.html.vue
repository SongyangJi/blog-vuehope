<template><div><p>dockerfile 的命令摘要</p>
<ul>
<li>
<p>FROM- 镜像从那里来</p>
</li>
<li>
<p>MAINTAINER- 镜像维护者信息</p>
</li>
<li>
<p>RUN- 构建镜像执行的命令，每一次RUN都会构建一层</p>
</li>
<li>
<p>CMD- 容器启动的命令，如果有多个则以最后一个为准，也可以为ENTRYPOINT提供参数</p>
</li>
<li>
<p>VOLUME- 定义数据卷，如果没有定义则使用默认</p>
</li>
<li>
<p>USER- 指定后续执行的用户组和用户</p>
</li>
<li>
<p>WORKDIR- 切换当前执行的工作目录</p>
</li>
<li>
<p>HEALTHCHECH- 健康检测指令</p>
</li>
<li>
<p>ARG- 变量属性值，但不在容器内部起作用</p>
</li>
<li>
<p>EXPOSE- 暴露端口</p>
</li>
<li>
<p>ENV- 变量属性值，容器内部也会起作用</p>
</li>
<li>
<p>ADD- 添加文件，如果是压缩文件也解压</p>
</li>
<li>
<p>COPY- 添加文件，以复制的形式</p>
</li>
<li>
<p>ENTRYPOINT- 容器进入时执行的命令</p>
</li>
</ul>
</div></template>


