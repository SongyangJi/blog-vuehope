---
title: Linux读写文件相关库函数
date: 2021-11-20 22:07:03
categories: Linux
tags: 
  - Linux
  - C
  - File
---



## 读写文件相关
### write 
+ 头文件:
```c
#include <unistd.h>
```

+ 函数说明:
  write系统调用，是把缓存区buf中的前nbytes字节写入到与文件描述符有关的文件中。

+ 函数定义
```c
//参数分别为 文件描述符、缓冲区、
size_t write(int flides, const void *buf, size_t nbytes);
```

+ 返回值
  write系统调用返回的是实际写入到文件中的字节数。

### read  
+ 头文件:
```c
#include <unistd.h>
```

+ 函数说明:
  read系统调用，是从与文件描述符flides相关联的文件中读取前nbytes字节的内容，并且写入到数据区buf中。

+ 函数定义
```c
size_t read(int flides, void *buf, size_t nbytes);
```

+ 返回值
  read系统调用返回的是实际读入的字节数。
  

### open
+ 头文件:
```c
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
```

+ 函数说明:


+ 函数定义
```c
int open(const *path, int oflags); //1
int open(const *path, int oflags, mode_t mode); //2
```

参数说明：
其中，oflags是由必需文件访问模式和可选模式一起构成的(通过按位或“|”)：
必需部分：
- O_RDONLY———-以只读方式打开
- O_WRONLY———以只写方式打开
- O_RDWR————以读写方式打开
可选部分：
- O_CREAT————按照参数mode给出的访问模式创建文件
- O_EXCL————–与O_CREAT一起使用，确保创建出文件，避免两个程序同时创建同一个文件，如文件存在则open调用失败 
- O_APPEND———-把写入数据追加在文件的末尾
- O_TRUNC———–把文件长度设置为0，丢弃原有内容

在第一种调用方式上，加上了第三个参数mode，**主要是搭配O_CREAT使用**，同样地，这个参数规定了属主、同组和其他人对文件的文件操作权限。
+ 文件属主
  - S_IRUSR———-读权限 
  - S_IWUSR———写权限
  - S_IXUSR———-执行权限 
+ 文件所属组  
  - S_IRGRP———-读权限 
  - S_IWGRP———写权限 
  - S_IXGRP———-执行权限
+ 其他人  
  - S_IROTH———-读权限 
  - S_IWOTH———写权限
  - S_IXOTH———-执行权限 

另外，也可以用数字设定法：
0 : 无权限；
1 : 只执行；
2 : 只写；
4 : 只读。

这种权限设计实际上就是linux文件权限的设计。


+ 返回值
  open系统调用成功返回一个新的文件描述符，失败返回-1。


### close

+ 函数定义
```c
#include <unistd.h>
int close(int flides);
```

+ 函数说明:
  终止文件描述符flides与其对应的文件间的联系，文件描述符被释放，可重新使用。
  使用完文件描述符之后，要记得释放！



### fopen
+ 头文件:
```c
#include <stdio.h>
```
+ 函数说明:
  C 库函数,使用给定的模式 mode 打开 filename 所指向的文件。

+ 函数定义
```c
FILE *fopen(const char *filename, const char *mode)
```
| "r"  | 打开一个用于读取的文件。该文件必须存在。                     |
| ---- | ------------------------------------------------------------ |
| "w"  | 创建一个用于写入的空文件。如果文件名称与已存在的文件相同，则会删除已有文件的内容，文件被视为一个新的空文件。 |
| "a"  | 追加到一个文件。写操作向文件末尾追加数据。如果文件不存在，则创建文件。 |
| "r+" | 打开一个用于更新的文件，可读取也可写入。该文件必须存在。     |
| "w+" | 创建一个用于读写的空文件。                                   |
| "a+" | 打开一个用于读取和追加的文件。                               |

+ 返回值 
  该函数返回一个 FILE 指针。否则返回 NULL，且设置全局变量 errno 来标识错误。

### fclose
+ 头文件:
```c
#include <stdio.h>
```
+ 函数说明:
  C 库函数 int fclose(FILE *stream) 关闭流 stream, 并且刷新所有的缓冲区。

+ 函数定义
```c
// stream -- 这是指向 FILE 对象的指针，该 FILE 对象指定了要被关闭的流。
int fclose(FILE *stream)
```

+ 返回值
  如果流成功关闭，则该方法返回零。如果失败，则返回 EOF。

### fprintf
+ 头文件:
```c
#include <stdio.h>
```
+ 函数说明:
  C 库函数, 发送格式化输出到流 stream 中。

+ 函数定义
```c
int fprintf(FILE *stream, const char *format, ...)
```

+ 返回值
  如果成功，则返回写入的字符总数，否则返回一个负数。

### flock
+ 头文件 
```c
#include <sys/file.h>
```

+ 函数说明 flock()会依参数operation所指定的方式对参数fd所指的文件做各种锁定或解除锁定的动作。
  此函数只能锁定整个文件，无法锁定文件的某一区域。
  
+ 函数定义
```c
// fd 文件描述符、 锁定operation
int flock(int fd,int operation);
```

参数 operation 有下列四种情况:
  - LOCK_SH 建立共享锁定。多个进程可同时对同一个文件作共享锁定。
  - LOCK_EX 建立互斥锁定。一个文件同时只有一个互斥锁定。
  - LOCK_UN 解除文件锁定状态。
  - LOCK_NB 无法建立锁定时，此操作可不被阻断，马上返回进程。(通常与LOCK_SH或LOCK_EX做OR组合)

+ 返回值 
  返回0表示成功，若有错误则返回-1，错误代码存于errno。
  

### snprintf
+ 头文件:
```c
#include <stdio.h>
```

+ 函数说明:
  C 库函数，将可变参数(...)按照 format 格式化成字符串，并将字符串复制到 str 中，size 为要写入的字符的最大数目，超过 size 会被截断。

+ 函数定义
```c
int snprintf (char * str, size_t size, const char * format, ... );
```

  - str -- 目标字符串。
  - size -- 拷贝字节数(Bytes)。
  - format -- 格式化成字符串。
  - ... -- 可变参数。

+ 返回值
  - 如果格式化后的字符串长度小于等于 size，则会把字符串全部复制到 str 中，并给其后添加一个字符串结束符 \0。
  返回的实际写入的长度。
  - 如果格式化后的字符串长度大于 size，超过 size 的部分会被截断，只将其中的 (size-1) 个字符复制到 str 中，并给其后添加一个字符串结束符 \0。
    返回值为欲写入的字符串长度。
    

## 重定向
### dup
+ 头文件:
```c
#include <unistd.h>
```

+ 函数说明:
  dup用来复制参数oldfd所指的文件描述符。
  返回的新文件描述符和参数oldfd指向同一个文件，这**两个描述符共享同一个数据结构，共享所有的锁定，读写指针和各项标志位**。


+ 函数定义
```c
int dup(int oldfd);
```

+ 返回值
  当复制成功是，返回最小的尚未被使用过的文件描述符;
  若有错误则返回-1。
  错误代码存入errno中。

### dup2
+ 头文件:
```c
#include <unistd.h>
```

+ 函数说明:
  dup2与dup区别是dup2可以用参数newfd指定新文件描述符的数值。
  若参数newfd已经被程序使用，则系统就会将newfd所指的文件关闭；
  若newfd等于oldfd，则返回newfd,而不关闭newfd所指的文件。
  dup2所复制的文件描述符与原来的文件描述符共享各种文件状态。共享所有的锁定，读写位置和各项权限或flags等.
  在shell的重定向功能中，(输入重定向”<”和输出重定向”>”)就是通过调用dup或dup2函数对标准输入和标准输出的操作来实现的。
  
+ 函数定义
```c
int dup2(int oldfd, int newfd);
```

+ 返回值
  若dup2调用成功则返回新的文件描述符，出错则返回-1。


+ 举例：
如何使用dup2实现标准输出到文件的重定向？
```c
#include<stdio.h>
#include<fcntl.h>
#include<unistd.h>
#include<stdlib.h>
#include<string.h>

int main() {
    int oldfd;
    int fd;
    int t;
    char *buf = "This is a test!!!!\n";
    if ((oldfd = open("/Users/jisongyang/CLionProjects/test_syscalls_sandbox/redirect/mine.txt", O_RDWR | O_CREAT,
                      0644)) == -1) {
        printf("open error\n");
        exit(-1);
    }
    fd = dup2(oldfd, STDOUT_FILENO);
    if (fd == -1) {
        printf("dup2 error\n");
        exit(-1);
    } else {
        printf("fd:%d  STDOUT_FILENO:%d\n", fd, STDOUT_FILENO);
    }
    t = (int) strlen(buf);
    if (write(fileno(stdout), buf, t) != t)//本应该写入到stdout的信息，但是标准输出已经重定向到目标文件中，故向标准输出写的数据将会写到目标文件中。
    {
        printf("write error!\n");
        exit(-1);
    }
    fflush(stdout); // printf 是带缓冲的函数，不加这一行代码，printf 的内容不会写到文件里
    close(fd);
    return 0;
}
```

最重要的一行代码：`dup2(oldfd, STDOUT_FILENO)`
