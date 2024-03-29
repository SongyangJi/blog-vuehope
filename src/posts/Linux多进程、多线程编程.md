---
title: Linux多进程、多线程编程
date: 2021-11-20 22:13:12
categories: Linux
tags:
  - Linux
  - C
  - 进程
  - 线程
---



# 进程/线程相关

## 线程相关

## background information
线程和进程的理论概念不再赘述。
Linux 中，系统是不认识线程还是进程的，它只认识 task。

> 下面的阐述都是 Unix like 下的有关线程的语义。

主线程和子线程
  + 共享： 用户区内，除了栈区是不共享的，其余都是共享的。
  + 不共享： 栈区（当有 1 主 + 4 子线程时候，栈区会被平分为 5 份）

多进程共享的资源（fork、clone出的子进程和父进程）：
  + 代码
  + 文件描述符
  + 内存映射区 –mmap


多线程共享的资源：
  + 堆
  + 全局变量 

+ 线程号和线程 ID 是有区别的
  查看方式： 找到程序的进程 ID后， `ps -Lf $(pid)`，LWP那一列即为线程ID。

  

### pthread_create
+ 头文件:
```c
#include<pthread.h>
```
pthread非linux系统的默认库， 需手动链接-线程库 -lpthread

+ 函数说明:
  返回成功时，由 tidp 指向的内存单元被设置为新创建线程的线程ID。a
  ttr参数用于指定各种不同的线程属性。
  新创建的线程从start_rtn函数的地址开始运行，该函数只有一个万能指针参数arg。
  如果需要向start_rtn函数传递的参数不止一个，那么需要把这些参数放到一个结构体中，然后把这个结构的地址作为arg的参数传入。
  
+ 函数定义
```c
int pthread_create(pthread_t *tidp,const pthread_attr_t *attr, void *(*start_rtn)(void*),void *arg);
```



+ 参数说明：
  第一个参数为指向线程标识符的指针。
  第二个参数用来设置线程属性。
  第三个参数是线程运行函数的起始地址。
  最后一个参数是运行函数的参数。

+ 返回值
  若线程创建成功，则返回0。若线程创建失败，则返回出错编号，并且*thread中的内容是未定义的。
  
+ 代码
```c
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

int num = 13; //设置为全局变量，在全局区域，共享

void* myfun(void* arg);

int main(int argc, char *argv[])
{
    void* p = (void *)&num;  //传一个地址进去（voi* 也是 4 个字节）
    pthread_t id[5] = {0};
    for (int i = 0; i < 5; i++) {
        pthread_create(&(id[i]), NULL, myfun, p);
        printf("i = %d, thread id: %ld\n", i, id[i]);
    }
    
    return 0;
}

void* myfun(void* arg)
{
    printf("num = %d, child thread id: %ld\n", (*((int *)arg))++, pthread_self());
    return NULL;
}
```

+ 参考链接
  [pthread_create(3) — Linux manual page](https://man7.org/linux/man-pages/man3/pthread_create.3.html)
  [Linux中创建多线程实例pthread_create()](https://xmuli.tech/posts/28f8209f/)
  


### pthread_join
pthread_join()即是子线程合入主线程，主线程阻塞等待子线程结束，然后回收子线程资源。

注意，默认情况下，资源是不会随着子线程的exit或return而回收的。

+ 头文件:
```c
#include <pthread.h>
```

+ 函数说明:
  thread_join()函数，以阻塞的方式等待thread指定的线程结束。当函数返回时，被等待线程的资源被收回。
  如果线程已经结束，那么该函数会立即返回。并且thread指定的线程必须是 joinable 的。
+ 函数定义
```c
int pthread_join(pthread_t thread, void **retval);
```
thread: 线程标识符，即线程ID，标识唯一线程。
retval: 用户定义的指针，用来存储被等待线程的返回值。

+ 返回值
  0代表成功。 失败，返回的则是错误号。


+ 示例代码：
```c
#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>
#include <unistd.h>

void *thread_function(void *arg) {
    int i;
    for (i = 0; i < 8; i++) {
        printf("Thread working... %d \n", i);
        sleep(1);
    }
    return NULL;
}

int main(void) {
    pthread_t mythread;

    if (pthread_create(&mythread, NULL, thread_function, NULL)) {
        printf("error creating thread.");
        abort();
    }
    if (pthread_join(mythread, NULL)) {
        printf("error join thread.");
        abort();
    }

    printf("thread done! \n");
    return 0;
}
/*
 输出
Thread working...! 0 
Thread working...! 1 
Thread working...! 2 
Thread working...! 3 
Thread working...! 4 
Thread working...! 5 
Thread working...! 6 
Thread working...! 7 
thread done! 
 */
```

如果去掉`pthread_join`的调用的话，
输出为：
```shell
thread done! 
Thread working... 0 
Process finished with exit code 0
```
也就是说，子线程来不及执行它的函数，就因为父线程的死亡而被迫终结了。



### pthread_detach
+ 头文件:
```c
#include <pthread.h>
```

+ 函数说明:
  pthread_join()函数的替代函数，可回收创建时detachstate属性设置为PTHREAD_CREATE_JOINABLE的线程的存储空间。
  该函数不会阻塞父线程。
  pthread_join()函数用于只是应用程序在线程tid终止时回收其存储空间。

+ 函数定义
```c
int pthread_detach(pthread_t tid);
```

+ 返回值
  thread_detach() 在调用成功完成之后返回零。其他任何返回值都表示出现了错误。

注意，即使如此，父线程退出时，子线程仍然会强制退出。


### pthread_cancel

+ 函数说明：
  发送终止信号给thread线程，如果成功则返回0，否则为非0值。发送成功并不意味着thread会终止。

+ 函数定义：
```c
int pthread_cancel(pthread_t thread)
```

+ 示例代码：
```c
/**
 * @Author: 吉松阳
 * @Date: 2021/9/26
 * @Description: 
 */

#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>
#include <unistd.h>

void print_message_function(void *ptr);

int main() {
    pthread_t thread1;
    pthread_create(&thread1, NULL, (void *) &print_message_function, (void *) 0);
    sleep(3);
    printf("main thread\n");
    pthread_cancel(thread1);
    sleep(7);
    exit(0);
}

void print_message_function(void *ptr) {
    pthread_detach(pthread_self());
    sleep(6);
    printf("child thread\n");
    pthread_exit(0);
}
// 实验证明 pthread_exit 确实起作用了
```

+ 参考链接：
[线程取消(pthread_cancel)](https://www.cnblogs.com/lijunamneg/archive/2013/01/25/2877211.html)

## 信号处理相关
### raise
+ 头文件:
```c
#include <signal.h>
```

+ 函数说明:
  C 库函数, 会促使生成信号 sig。sig 参数与 SIG 宏兼容。

+ 函数定义
```c
// sig -- 要发送的信号码。
int raise(int sig)
```

查看所有信号：使用 `kill -l`
```shell
songyangji@SongyangJi-Ubuntu-DeskStop:~$ kill -l
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
16) SIGSTKFLT	17) SIGCHLD	18) SIGCONT	19) SIGSTOP	20) SIGTSTP
21) SIGTTIN	22) SIGTTOU	23) SIGURG	24) SIGXCPU	25) SIGXFSZ
26) SIGVTALRM	27) SIGPROF	28) SIGWINCH	29) SIGIO	30) SIGPWR
31) SIGSYS	34) SIGRTMIN	35) SIGRTMIN+1	36) SIGRTMIN+2	37) SIGRTMIN+3
38) SIGRTMIN+4	39) SIGRTMIN+5	40) SIGRTMIN+6	41) SIGRTMIN+7	42) SIGRTMIN+8
43) SIGRTMIN+9	44) SIGRTMIN+10	45) SIGRTMIN+11	46) SIGRTMIN+12	47) SIGRTMIN+13
48) SIGRTMIN+14	49) SIGRTMIN+15	50) SIGRTMAX-14	51) SIGRTMAX-13	52) SIGRTMAX-12
53) SIGRTMAX-11	54) SIGRTMAX-10	55) SIGRTMAX-9	56) SIGRTMAX-8	57) SIGRTMAX-7
58) SIGRTMAX-6	59) SIGRTMAX-5	60) SIGRTMAX-4	61) SIGRTMAX-3	62) SIGRTMAX-2
```

值得注意的是，
当一个进程调用fork时，因为子进程在开始时复制父进程的存储映像，信号捕捉函数的地址在子进程中是有意义的，所以子进程继承父进程的信号处理方式。
但是当子进程调用exec后，因为exec运行新的程序后会覆盖从父进程继承来的存储映像。
那么信号捕捉函数在新程序中已无意义，所以exec会将原先设置为要捕捉的信号都更改为默认动作。


+ 返回值
  如果成功该函数返回零，否则返回非零。


### signal
+ 头文件:
```c
#include <signal.h>
```


+ 函数说明:
  C 库函数,设置一个函数来处理信号，即带有 sig 参数的信号处理程序。

+ 函数定义
```c
void (*signal(int sig, void (*func)(int)))(int)
```

参数说明：
+ sig -- 在信号处理程序中作为变量使用的信号码。下面是一些重要的标准信号常量
+ func -- 一个指向函数的指针。它可以是一个由程序定义的函数，也可以是下面预定义函数之一。
  - SIG_DFL	默认的信号处理程序。
  - SIG_IGN	忽视信号。


+ 返回值
  该函数返回之前的信号处理程序


+ 实例代码

```c
#include<stdio.h>
#include<stdlib.h>
#include<signal.h>

void signal_catchfunc(int);

int main() {
    int ret;
    signal(SIGINT, signal_catchfunc);
    printf("开始生成一个信号\n");
    ret = raise(SIGINT);
    if (ret != 0) {
        printf("错误，不能生成SIGINT信号\n");
        exit(0);
    }
    printf("退出....\n");
    return 0;
}

void signal_catchfunc(int signal) {
    printf("捕获信号\n");
}
```

### sandbox使用的信号
信号的共达60余个，这里只介绍一下sandbox中使用的信号。

### SIGUSR1/SIGUSR2
SIGUSR1 用户自定义信号 默认处理：进程终止;
SIGUSR2 用户自定义信号默认处理：进程终止。

### SIGSEGV
在POSIX兼容的平台上，SIGSEGV是当一个进程**执行了一个无效的内存引用**，或**发生段错误**时发送给它的信号。
SIGSEGV的符号常量在头文件`signal.h`中定义。
因为在不同平台上，信号数字可能变化，因此最好使用符号信号名。通常，它是信号#11。
[SIGSEGV维基百科](https://zh.wikipedia.org/wiki/SIGSEGV)





## execXX 函数组
exec函数族提供了一个在进程中启动另一个程序执行的方法。它可以根据指定的文件名或目录名找到可执行文件，
并用它来取代原调用进程的数据段、代码段和堆栈段，在执行完之后，原调用进程的内容除了进程号外，其他全部被新的进程替换了。
另外，这里的可执行文件既可以是二进制文件，也可以是Linux下任何可执行的脚本文件。

exec函数一共有六个，其中execve为内核级系统调用，
其他（execl，execle，execlp，execv，execvp）都是调用execve的库函数。
不同之处在于如何找到程序、如何指定参数以及环境来自何处。

+ 名称中带有 v 的调用，用带有一个数组参数来指定argv[]新程序的数组。数组的最后一个元素为 NULL。

+ 名称中带有 l 的调用，将新程序的参数作为函数本身的可变长度参数列表。参数的结尾为参数指针(char *)NULL。
  你应该始终进行类型转换，因为NULL实际是整数常量，并且调用可变参数函数时的默认参数转换不会将其转换为指针。

+ 名称中带有 e 的调用，需要一个额外的参数（或l情况下的参数）来提供新程序的环境；否则，程序将继承当前进程的环境。

### execve
+ 头文件:
```c
#include<unistd.h>
```

+ 函数说明:
  pthread_create是类Unix操作系统（Unix、Linux、Mac OS X等）的创建线程的函数。
  它的功能是创建线程（实际上就是确定调用该线程函数的入口点），在线程创建以后，就开始运行相关的线程函数。

+ 函数定义:
```c
int execve(const char *pathname, char *const argv[], char *const envp[]);
```

+ 返回值:
  如果执行成功则函数不会返回(后面的代码也并不会执行了)，执行失败则直接返回-1，失败原因存于errno 中。


+ 示例代码:
```c
/**
 * @Author: 吉松阳
 * @Date: 2021/9/22
 * @Description: 
 */
#include<unistd.h>

int main() {
    char *argv[] = {"ls", "-el", NULL};
    char *envp[] = {"PATH=/bin", 0};
    execve("/bin/ls", argv, envp);
}
/*
  total 128
  drwxr-xr-x  5 jisongyang  staff    160 Sep 22 22:07 CMakeFiles
  -rw-r--r--  1 jisongyang  staff   6687 Sep 22 22:06 Makefile
  -rw-r--r--  1 jisongyang  staff   1021 Sep 22 22:06 cmake_install.cmake
  -rwxr-xr-x  1 jisongyang  staff  50424 Sep 22 22:22 test_execve
 */
```

参考链接:
1. [execve(2) — Linux manual page](https://man7.org/linux/man-pages/man2/execve.2.html)
2. [What is the difference between the functions of the exec family of system calls like exec and execve?](https://stackoverflow.com/questions/20823371/what-is-the-difference-between-the-functions-of-the-exec-family-of-system-calls)


### sleep
+ 头文件:
```c
#include <unistd.h>
```

+ 函数说明:
  sleep()会令目前的进程暂停, 直到达到参数seconds 所指定的时间, 或是被信号所中断.
  
+ 函数定义
```c
unsigned int sleep(unsigned int seconds);
```

+ 返回值 
  若进程暂停到参数seconds 所指定的时间则返回0, 若有信号中断则返回剩余秒数.



##  wait 函数组
进程调用 exit() 退出执行后，被设置为僵死状态。
这时父进程可以通过 wait4() 系统调用查询子进程是否终结，之后再进行最后的操作，彻底删除进程所占用的内存资源。
wait4() 系统调用由 linux 内核实现。
linux 系统通常提供了 wait()、waitpid()、wait3()、wait4() 这四个函数，
四个函数的参数不同，语义也有细微的差别，但是都返回关于终止进程的状态信息。

### wait
+ 头文件:
```c
#include <sys/types.h>        // 提供类型 pid_t 的定义
#include <sys/wait.h>
```

+ 函数说明:
  当进程调用 wait() 时，会暂停目前进程的执行（即阻塞），由 wait() 来自动分析是否当前进程的某个子进程已经退出，
  如果找到了这样一个已经变成僵尸进程的子进程，wait 就会收集这个子进程的信息，并将其彻底销毁后返回；
  如果没有找到这样一个子进程，wait 就会一直阻塞在这里，直到出现**僵尸进程**。

+ 函数定义
```c
pid_t wait(int *status);
```
参数 status 保存着子进程退出时的一些状态（包括 task_struct、thread_info及内核栈等）它是一个指向 int 类型的指针；
如果不在意子进程的结束状态值，只想把这个僵尸进程消灭掉（实际上，大多数时候都是这样做的），则可以将这个参数设为 NULL。

关于 status参数比较复杂，可以参考这里
[传送门](https://www.ibm.com/developerworks/cn/linux/kernel/syscall/part3/index.html)

+ 返回值
  如果 wait() 调用成功，则会返回被收集子进程的进程ID；如果被调用进程没有子进程，则调用失败，返回 -1

### waitpid

+ 函数原型：
```c
pid_t waitpid(pid_t pid,int *status,int options);
```
waitpid() 函数的功能与 wait() 的功能类似，不过，它比 wait() 函数多了两个参数：

+ 1）参数 pid 为欲等待的子进程的识别码：
  pid < -1 ：等待进程组 ID 为 pid 绝对值的进程组中的任何子进程；
  pid = -1 ：等待任何子进程，此时 waitpid() 相当于 wait()。实际上，wait()就是 pid = -1、options = 0 的waitpid()， 且有：
  pid = 0 ：等待进程组 ID 与当前进程相同的任何子进程（也就是等待同一个进程组中的任何子进程）； 
  pid > 0 ：等待任何子进程 ID 为 pid 的子进程，只要指定的子进程还没有结束，waitpid() 就会一直等下去。
  
+ 2）参数 options 提供一些额外的选项来控制 waitpid()：
  WNOHANG：如果没有任何已经结束了的子进程，则马上返回，不等待； 
  WUNTRACED：如果子进程进入暂停执行的情况，则马上返回，但结束状态不予理会； 
  也可以将这两个选项组合起来使用，使用 OR 操作。如果不想使用这两个选项，也可以直接把 options 设为 0 

+ 3）waitpid() 的返回值，有三种： 
  a）正常返回时，waitpid() 返回收集到的子进程的PID； 
  b）如果设置了 WNOHANG，而调用 waitpid() 时，没有发现已退出的子进程可收集，则返回0； 
  c）如果调用出错，则返回 -1，这时erron 会被设置为相应的值以指示错误所在。（当 pid 所指示的子进程不错在，或此进程存在，但不是调用进程的子进程， waitpid() 就会返回出错，这时 erron 被设置为 ECHILD）

### wait3/wait4
函数原型
```c
#include <sys/tpyes.h>
#include <sys/wait.h>

pid_t wait3(int *status,int options,struct rusage *rusage);
pid_t wait4(pid_t pid,int *status,int options,struct rusage *rusage);
```
wait3() 和 wait4() 函数除了可以获得子进程状态信息外，还可以获得子进程的资源使用信息，这些信息是通过参数 **rusage** 得到的。
而 wait3() 与 wait4() 之间的区别是，wait3() 等待所有进程，而 wait4() 可以根据 pid 的值选择要等待的子进程。
参数 pid 的意义与 waitpid() 函数的一样。

其中，需要注意的是，参数rusage所指向的结构中返回终止子进程的资源使用情况。其中包括进程使用的CPU时间总量以及内存管理的统计数据。
如下，为它的结构定义：
```c
struct rusage {
    struct timeval ru_utime; /* user CPU time used */
    struct timeval ru_stime; /* system CPU time used */
    long   ru_maxrss;        /* maximum resident set size */
    long   ru_ixrss;         /* integral shared memory size */
    long   ru_idrss;         /* integral unshared data size */
    long   ru_isrss;         /* integral unshared stack size */
    long   ru_minflt;        /* page reclaims (soft page faults) */
    long   ru_majflt;        /* page faults (hard page faults) */
    long   ru_nswap;         /* swaps */
    long   ru_inblock;       /* block input operations */
    long   ru_oublock;       /* block output operations */
    long   ru_msgsnd;        /* IPC messages sent */
    long   ru_msgrcv;        /* IPC messages received */
    long   ru_nsignals;      /* signals received */
    long   ru_nvcsw;         /* voluntary context switches */
    long   ru_nivcsw;        /* involuntary context switches */
};
```

其中比较重要的三项：
1. timeval ru_utime; /* user CPU time used */        用户态CPU使用时间
2. timeval ru_stime; /* system CPU time used */      内核态CPU使用时间
3. ru_maxrss;        /* maximum resident set size */ 最大驻留集

还可以shell中使用
```shell
man getrusage
```

### 如何使用int* status

如果参数status的值不是NULL，wait就会把子进程退出时的状态取出并存入其中，这指向整数值（int），
指出了子进程是正常退出还是被非正常结束的，以及正常结束时的返回值，或被哪一个信号结束的等信息。
由于这些信息被存放在**一个整数的不同二进制位**中，所以用常规的方法读取会非常麻烦，
于是就设计了一套专门的宏来完成这项工作，下面介绍一下其中最常用的几个。


请注意，下面的宏中的 status 虽然名字一样，这里的参数status并不同于wait中的参数
一个是指向整数的指针，而是那个指针所指向的整数，切记不要搞混。

### WIFEXITED(int status)
这个宏用来指出进程是否为正常退出的，如果是，它会返回一个非零值。

### WEXITSTATUS(status)
**当WIFEXITED返回非零值时**，可以用这个宏来提取**子进程的返回值**。
如果子进程调用exit(5)退出，WEXITSTATUS(status) 就会返回5；如果子进程调用exit(7)，WEXITSTATUS(status)就会返回7。
请注意，如果进程不是正常退出的，也就是 说，WIFEXITED返回0，这个值就毫无意义。

所以二者往往这样配合使用：
```c
//正常退出判断
if(WIFEXITED(status)){
    printf("child exit with %d\n", WEXITSTATUS(status));
}
```

### WIFSIGNALED(status)
这个宏来指出进程是否遇到未处理的信号而意外退出，如果是，返回非零0.

### 
**当 WIFSIGNALED 返回非零值时**，此时可通过WTERMSIG(status)获取使得**进程退出的信号编号**

所以二者可以这样配合使用
```c
//因为某种信号中断获取状态
if(WIFSIGNALED(status)){
    printf("child killed by %d\n", WTERMSIG(status));
}
```


+ 参考链接
  [wait4(2) — Linux manual page](https://man7.org/linux/man-pages/man2/wait4.2.html)