export const data = JSON.parse("{\"key\":\"v-275bca66\",\"path\":\"/posts/Linux%E5%A4%9A%E8%BF%9B%E7%A8%8B%E3%80%81%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B.html\",\"title\":\"Linux多进程、多线程编程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux多进程、多线程编程\",\"date\":\"2021-11-20T22:13:12.000Z\",\"categories\":\"Linux\",\"tags\":[\"Linux\",\"C\",\"进程\",\"线程\"],\"description\":\"进程/线程相关 线程相关 background information 线程和进程的理论概念不再赘述。 Linux 中，系统是不认识线程还是进程的，它只认识 task。 下面的阐述都是 Unix like 下的有关线程的语义。 主线程和子线程 共享： 用户区内，除了栈区是不共享的，其余都是共享的。 不共享： 栈区（当有 1 主 + 4 子线程时候，栈区会被平分为 5 份） 多进程共享的资源（fork、clone出的子进程和父进程）：\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/posts/Linux%E5%A4%9A%E8%BF%9B%E7%A8%8B%E3%80%81%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"常潇的技术站\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Linux多进程、多线程编程\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"进程/线程相关 线程相关 background information 线程和进程的理论概念不再赘述。 Linux 中，系统是不认识线程还是进程的，它只认识 task。 下面的阐述都是 Unix like 下的有关线程的语义。 主线程和子线程 共享： 用户区内，除了栈区是不共享的，其余都是共享的。 不共享： 栈区（当有 1 主 + 4 子线程时候，栈区会被平分为 5 份） 多进程共享的资源（fork、clone出的子进程和父进程）：\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"常潇-KeepCool\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Linux\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"C\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"进程\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"线程\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-11-20T22:13:12.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-01-18T12:43:38.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Linux多进程、多线程编程\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-11-20T22:13:12.000Z\\\",\\\"dateModified\\\":\\\"2024-01-18T12:43:38.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"常潇-KeepCool\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"线程相关\",\"slug\":\"线程相关\",\"link\":\"#线程相关\",\"children\":[]},{\"level\":2,\"title\":\"background information\",\"slug\":\"background-information\",\"link\":\"#background-information\",\"children\":[{\"level\":3,\"title\":\"pthread_create\",\"slug\":\"pthread-create\",\"link\":\"#pthread-create\",\"children\":[]},{\"level\":3,\"title\":\"pthread_join\",\"slug\":\"pthread-join\",\"link\":\"#pthread-join\",\"children\":[]},{\"level\":3,\"title\":\"pthread_detach\",\"slug\":\"pthread-detach\",\"link\":\"#pthread-detach\",\"children\":[]},{\"level\":3,\"title\":\"pthread_cancel\",\"slug\":\"pthread-cancel\",\"link\":\"#pthread-cancel\",\"children\":[]}]},{\"level\":2,\"title\":\"信号处理相关\",\"slug\":\"信号处理相关\",\"link\":\"#信号处理相关\",\"children\":[{\"level\":3,\"title\":\"raise\",\"slug\":\"raise\",\"link\":\"#raise\",\"children\":[]},{\"level\":3,\"title\":\"signal\",\"slug\":\"signal\",\"link\":\"#signal\",\"children\":[]},{\"level\":3,\"title\":\"sandbox使用的信号\",\"slug\":\"sandbox使用的信号\",\"link\":\"#sandbox使用的信号\",\"children\":[]},{\"level\":3,\"title\":\"SIGUSR1/SIGUSR2\",\"slug\":\"sigusr1-sigusr2\",\"link\":\"#sigusr1-sigusr2\",\"children\":[]},{\"level\":3,\"title\":\"SIGSEGV\",\"slug\":\"sigsegv\",\"link\":\"#sigsegv\",\"children\":[]}]},{\"level\":2,\"title\":\"execXX 函数组\",\"slug\":\"execxx-函数组\",\"link\":\"#execxx-函数组\",\"children\":[{\"level\":3,\"title\":\"execve\",\"slug\":\"execve\",\"link\":\"#execve\",\"children\":[]},{\"level\":3,\"title\":\"sleep\",\"slug\":\"sleep\",\"link\":\"#sleep\",\"children\":[]}]},{\"level\":2,\"title\":\"wait 函数组\",\"slug\":\"wait-函数组\",\"link\":\"#wait-函数组\",\"children\":[{\"level\":3,\"title\":\"wait\",\"slug\":\"wait\",\"link\":\"#wait\",\"children\":[]},{\"level\":3,\"title\":\"waitpid\",\"slug\":\"waitpid\",\"link\":\"#waitpid\",\"children\":[]},{\"level\":3,\"title\":\"wait3/wait4\",\"slug\":\"wait3-wait4\",\"link\":\"#wait3-wait4\",\"children\":[]},{\"level\":3,\"title\":\"如何使用int* status\",\"slug\":\"如何使用int-status\",\"link\":\"#如何使用int-status\",\"children\":[]},{\"level\":3,\"title\":\"WIFEXITED(int status)\",\"slug\":\"wifexited-int-status\",\"link\":\"#wifexited-int-status\",\"children\":[]},{\"level\":3,\"title\":\"WEXITSTATUS(status)\",\"slug\":\"wexitstatus-status\",\"link\":\"#wexitstatus-status\",\"children\":[]},{\"level\":3,\"title\":\"WIFSIGNALED(status)\",\"slug\":\"wifsignaled-status\",\"link\":\"#wifsignaled-status\",\"children\":[]},{\"level\":3,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]}]}],\"git\":{\"createdTime\":1705581818000,\"updatedTime\":1705581818000,\"contributors\":[{\"name\":\"jisongyang\",\"email\":\"jisongyang@kuaishou.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":14.95,\"words\":4486},\"filePathRelative\":\"posts/Linux多进程、多线程编程.md\",\"localizedDate\":\"2021年11月21日\",\"excerpt\":\"<h1> 进程/线程相关</h1>\\n<h2> 线程相关</h2>\\n<h2> background information</h2>\\n<p>线程和进程的理论概念不再赘述。\\nLinux 中，系统是不认识线程还是进程的，它只认识 task。</p>\\n<blockquote>\\n<p>下面的阐述都是 Unix like 下的有关线程的语义。</p>\\n</blockquote>\\n<p>主线程和子线程</p>\\n<ul>\\n<li>共享： 用户区内，除了栈区是不共享的，其余都是共享的。</li>\\n<li>不共享： 栈区（当有 1 主 + 4 子线程时候，栈区会被平分为 5 份）</li>\\n</ul>\\n<p>多进程共享的资源（fork、clone出的子进程和父进程）：</p>\",\"autoDesc\":true}")
