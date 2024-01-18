export const data = JSON.parse("{\"key\":\"v-69c47acd\",\"path\":\"/docs/select%E3%80%81poll%E3%80%81epoll.html\",\"title\":\"《Unix网络编程》—— echo server的bio、select、poll、epoll多种实现\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"《Unix网络编程》—— echo server的bio、select、poll、epoll多种实现\",\"date\":\"2022-03-16T23:13:27.000Z\",\"categories\":\"IO\",\"tags\":[\"Linux\",\"IO\",\"Socket\"],\"description\":\"blocked io /** * @Author: 吉松阳 * @Date: 2021/11/18 * @Description: */ #include \\\"../lib/unp.h\\\" void str_echo(int sockfd) { int bytes; char buf[MAXLINE] = {0}; while (1) { // RECEIVE bytes = read(sockfd, buf, MAXLINE); if (bytes &lt;= 0) break; printf(\\\"server receive is %s\\\\n\\\", buf); // SEND write(sockfd, buf, bytes); } } int main(int argc, char **argv) { printf(\\\"server start...\\\\n\\\"); int listenfd, connfd; socklen_t clilen; struct sockaddr_in cliaddr, servaddr; // SOCKET listenfd = socket(AF_INET, SO CK_STREAM, 0); bzero(&amp;servaddr, sizeof(servaddr)); servaddr.sin_family = AF_INET; servaddr.sin_addr.s_addr = htonl(INADDR_ANY); servaddr.sin_port = htons(SERV_PORT); // BIND if (bind(listenfd, (struct sockaddr *) &amp;servaddr, sizeof(servaddr)) &lt; 0) { fatal(\\\"read was interrupted by a signal\\\\n\\\"); } // LISTEN listen(listenfd, LISTENQ); for (;;) { clilen = sizeof(cliaddr); // ACCEPT connfd = accept(listenfd, (struct sockaddr *) &amp;cliaddr, &amp;clilen); if (fork() == 0) { /* child process */ close(listenfd); /* close listening socket */ str_echo(connfd); /* process the request */ exit(0); } close(connfd); /* parent closes connected socket */ } }\"},\"headers\":[{\"level\":2,\"title\":\"blocked io\",\"slug\":\"blocked-io\",\"link\":\"#blocked-io\",\"children\":[]},{\"level\":2,\"title\":\"select\",\"slug\":\"select\",\"link\":\"#select\",\"children\":[]},{\"level\":2,\"title\":\"poll\",\"slug\":\"poll\",\"link\":\"#poll\",\"children\":[]},{\"level\":2,\"title\":\"使用epoll\",\"slug\":\"使用epoll\",\"link\":\"#使用epoll\",\"children\":[]},{\"level\":2,\"title\":\"Client\",\"slug\":\"client\",\"link\":\"#client\",\"children\":[]},{\"level\":2,\"title\":\"Lib\",\"slug\":\"lib\",\"link\":\"#lib\",\"children\":[]}],\"readingTime\":{\"minutes\":4.55,\"words\":1365},\"filePathRelative\":\"docs/select、poll、epoll.md\",\"localizedDate\":\"2022年3月17日\",\"excerpt\":\"<h2> blocked io</h2>\\n<div class=\\\"language-c line-numbers-mode\\\" data-ext=\\\"c\\\"><pre class=\\\"language-c\\\"><code><span class=\\\"token comment\\\">/**\\n * @Author: 吉松阳\\n * @Date: 2021/11/18\\n * @Description: \\n */</span>\\n\\n<span class=\\\"token macro property\\\"><span class=\\\"token directive-hash\\\">#</span><span class=\\\"token directive keyword\\\">include</span>    <span class=\\\"token string\\\">\\\"../lib/unp.h\\\"</span></span>\\n\\n<span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">str_echo</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> sockfd<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token keyword\\\">int</span> bytes<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">char</span> buf<span class=\\\"token punctuation\\\">[</span>MAXLINE<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token punctuation\\\">{</span><span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">;</span>\\n\\n    <span class=\\\"token keyword\\\">while</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token comment\\\">// RECEIVE</span>\\n        bytes <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">read</span><span class=\\\"token punctuation\\\">(</span>sockfd<span class=\\\"token punctuation\\\">,</span> buf<span class=\\\"token punctuation\\\">,</span> MAXLINE<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>bytes <span class=\\\"token operator\\\">&lt;=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token keyword\\\">break</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token function\\\">printf</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"server receive is %s\\\\n\\\"</span><span class=\\\"token punctuation\\\">,</span> buf<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token comment\\\">// SEND</span>\\n        <span class=\\\"token function\\\">write</span><span class=\\\"token punctuation\\\">(</span>sockfd<span class=\\\"token punctuation\\\">,</span> buf<span class=\\\"token punctuation\\\">,</span> bytes<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n\\n<span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">main</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> argc<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">char</span> <span class=\\\"token operator\\\">*</span><span class=\\\"token operator\\\">*</span>argv<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token function\\\">printf</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"server start...\\\\n\\\"</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">int</span> listenfd<span class=\\\"token punctuation\\\">,</span> connfd<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token class-name\\\">socklen_t</span> clilen<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">struct</span> <span class=\\\"token class-name\\\">sockaddr_in</span> cliaddr<span class=\\\"token punctuation\\\">,</span> servaddr<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token comment\\\">// SOCKET</span>\\n    listenfd <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">socket</span><span class=\\\"token punctuation\\\">(</span>AF_INET<span class=\\\"token punctuation\\\">,</span> SO CK_STREAM<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n\\n    <span class=\\\"token function\\\">bzero</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token operator\\\">&amp;</span>servaddr<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">sizeof</span><span class=\\\"token punctuation\\\">(</span>servaddr<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    servaddr<span class=\\\"token punctuation\\\">.</span>sin_family <span class=\\\"token operator\\\">=</span> AF_INET<span class=\\\"token punctuation\\\">;</span>\\n    servaddr<span class=\\\"token punctuation\\\">.</span>sin_addr<span class=\\\"token punctuation\\\">.</span>s_addr <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">htonl</span><span class=\\\"token punctuation\\\">(</span>INADDR_ANY<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    servaddr<span class=\\\"token punctuation\\\">.</span>sin_port <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">htons</span><span class=\\\"token punctuation\\\">(</span>SERV_PORT<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token comment\\\">// BIND</span>\\n    <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token function\\\">bind</span><span class=\\\"token punctuation\\\">(</span>listenfd<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">struct</span> <span class=\\\"token class-name\\\">sockaddr</span> <span class=\\\"token operator\\\">*</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">&amp;</span>servaddr<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">sizeof</span><span class=\\\"token punctuation\\\">(</span>servaddr<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">&lt;</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token function\\\">fatal</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"read was interrupted by a signal\\\\n\\\"</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token comment\\\">// LISTEN</span>\\n    <span class=\\\"token function\\\">listen</span><span class=\\\"token punctuation\\\">(</span>listenfd<span class=\\\"token punctuation\\\">,</span> LISTENQ<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n\\n    <span class=\\\"token keyword\\\">for</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">;</span><span class=\\\"token punctuation\\\">;</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        clilen <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">sizeof</span><span class=\\\"token punctuation\\\">(</span>cliaddr<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token comment\\\">// ACCEPT</span>\\n        connfd <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">accept</span><span class=\\\"token punctuation\\\">(</span>listenfd<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">struct</span> <span class=\\\"token class-name\\\">sockaddr</span> <span class=\\\"token operator\\\">*</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">&amp;</span>cliaddr<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token operator\\\">&amp;</span>clilen<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token function\\\">fork</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">==</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>    <span class=\\\"token comment\\\">/* child process */</span>\\n            <span class=\\\"token function\\\">close</span><span class=\\\"token punctuation\\\">(</span>listenfd<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>    <span class=\\\"token comment\\\">/* close listening socket */</span>\\n            <span class=\\\"token function\\\">str_echo</span><span class=\\\"token punctuation\\\">(</span>connfd<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>    <span class=\\\"token comment\\\">/* process the request */</span>\\n            <span class=\\\"token function\\\">exit</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token function\\\">close</span><span class=\\\"token punctuation\\\">(</span>connfd<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>            <span class=\\\"token comment\\\">/* parent closes connected socket */</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n\\n\\n\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
