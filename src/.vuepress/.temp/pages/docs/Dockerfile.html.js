export const data = JSON.parse("{\"key\":\"v-22be4b42\",\"path\":\"/docs/Dockerfile.html\",\"title\":\"Dockerfile\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Dockerfile\",\"date\":\"2022-10-18T19:41:31.000Z\",\"categories\":\"Docker\",\"tags\":null,\"description\":\"dockerfile 的命令摘要 FROM- 镜像从那里来 MAINTAINER- 镜像维护者信息 RUN- 构建镜像执行的命令，每一次RUN都会构建一层 CMD- 容器启动的命令，如果有多个则以最后一个为准，也可以为ENTRYPOINT提供参数 VOLUME- 定义数据卷，如果没有定义则使用默认 USER- 指定后续执行的用户组和用户 WORKDIR- 切换当前执行的工作目录 HEALTHCHECH- 健康检测指令 ARG- 变量属性值，但不在容器内部起作用 EXPOSE- 暴露端口 ENV- 变量属性值，容器内部也会起作用 ADD- 添加文件，如果是压缩文件也解压 COPY- 添加文件，以复制的形式 ENTRYPOINT- 容器进入时执行的命令\"},\"headers\":[],\"readingTime\":{\"minutes\":0.69,\"words\":206},\"filePathRelative\":\"docs/Dockerfile.md\",\"localizedDate\":\"2022年10月19日\",\"excerpt\":\"<p>dockerfile 的命令摘要</p>\\n<ul>\\n<li>\\n<p>FROM- 镜像从那里来</p>\\n</li>\\n<li>\\n<p>MAINTAINER- 镜像维护者信息</p>\\n</li>\\n<li>\\n<p>RUN- 构建镜像执行的命令，每一次RUN都会构建一层</p>\\n</li>\\n<li>\\n<p>CMD- 容器启动的命令，如果有多个则以最后一个为准，也可以为ENTRYPOINT提供参数</p>\\n</li>\\n<li>\\n<p>VOLUME- 定义数据卷，如果没有定义则使用默认</p>\\n</li>\\n<li>\\n<p>USER- 指定后续执行的用户组和用户</p>\\n</li>\\n<li>\\n<p>WORKDIR- 切换当前执行的工作目录</p>\\n</li>\\n<li>\\n<p>HEALTHCHECH- 健康检测指令</p>\\n</li>\\n<li>\\n<p>ARG- 变量属性值，但不在容器内部起作用</p>\\n</li>\\n<li>\\n<p>EXPOSE- 暴露端口</p>\\n</li>\\n<li>\\n<p>ENV- 变量属性值，容器内部也会起作用</p>\\n</li>\\n<li>\\n<p>ADD- 添加文件，如果是压缩文件也解压</p>\\n</li>\\n<li>\\n<p>COPY- 添加文件，以复制的形式</p>\\n</li>\\n<li>\\n<p>ENTRYPOINT- 容器进入时执行的命令</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
