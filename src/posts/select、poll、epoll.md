---
title: 《Unix网络编程》—— echo server的bio、select、poll、epoll多种实现
date: 2022-03-16 23:13:27
categories: IO
tags: 
  - Linux
  - IO
  - Socket
---



## blocked io

```c
/**
 * @Author: 吉松阳
 * @Date: 2021/11/18
 * @Description: 
 */

#include    "../lib/unp.h"

void str_echo(int sockfd) {
    int bytes;
    char buf[MAXLINE] = {0};

    while (1) {
        // RECEIVE
        bytes = read(sockfd, buf, MAXLINE);
        if (bytes <= 0) break;
        printf("server receive is %s\n", buf);
        // SEND
        write(sockfd, buf, bytes);
    }
}

int main(int argc, char **argv) {
    printf("server start...\n");
    int listenfd, connfd;
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;
    // SOCKET
    listenfd = socket(AF_INET, SO CK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);
    // BIND
    if (bind(listenfd, (struct sockaddr *) &servaddr, sizeof(servaddr)) < 0) {
        fatal("read was interrupted by a signal\n");
    }
    // LISTEN
    listen(listenfd, LISTENQ);

    for (;;) {
        clilen = sizeof(cliaddr);
        // ACCEPT
        connfd = accept(listenfd, (struct sockaddr *) &cliaddr, &clilen);

        if (fork() == 0) {    /* child process */
            close(listenfd);    /* close listening socket */
            str_echo(connfd);    /* process the request */
            exit(0);
        }
        close(connfd);            /* parent closes connected socket */
    }
}



```



## select



```c
#include <sys/select.h>
#include <sys/time.h>

int select(int maxfdp1, fd_set *readset, fd_set *writeset, fd_set *exceptset, const struct timeval *timeout);

// return :
// 若有就绪描述符则为其数目，若超时则为0，若出错则为-1
```



```c
/**
 * @Author: 吉松阳
 * @Date: 2021/11/18
 * @Description: 
 */


#include    "../lib/unp.h"

int main(int argc, char **argv) {
    printf("server start...\n");
    int i, maxi, maxfd, listenfd, connfd, sockfd;
    int nready, client[FD_SETSIZE];
    ssize_t n;
    // allset 维护当前活跃的客户端socket的读描述符集
    fd_set rset, allset;
    char buf[MAXLINE];
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;

    // SOCKET
    listenfd = socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    // BIND
    if (bind(listenfd, (SA *) &servaddr, sizeof(servaddr)) < 0) fatal("bind failure");

    // LISTEN
    listen(listenfd, LISTENQ);

    maxfd = listenfd;              /* initialize */
    maxi = -1;                     /* index into client[] array */
    for (i = 0; i < FD_SETSIZE; i++) {
        client[i] = -1;            /* -1 indicates available entry */
    }
    FD_ZERO(&allset);
    FD_SET(listenfd, &allset); // 单个监听描述符集

    for (;;) {
        rset = allset;        /* structure assignment */
        nready = select(maxfd + 1, &rset, NULL, NULL, NULL); // 返回就绪的文件描述符的个数

        if (FD_ISSET(listenfd, &rset)) {    /* new client connection */
            clilen = sizeof(cliaddr);
            // ACCEPT
            connfd = accept(listenfd, (SA *) &cliaddr, &clilen);

            for (i = 0; i < FD_SETSIZE; i++)
                if (client[i] < 0) {
                    client[i] = connfd;    /* save descriptor */
                    break;
                }
            if (i == FD_SETSIZE)
                fatal("too many clients");

            FD_SET(connfd, &allset);    /* add new descriptor to set */
            if (connfd > maxfd)
                maxfd = connfd;            /* for select */
            if (i > maxi)
                maxi = i;                /* max index in client[] array */

            if (--nready <= 0)
                continue;                /* no more readable descriptors */
        }

        for (i = 0; i <= maxi; i++) {    /* check all clients for data */
            if ((sockfd = client[i]) < 0)
                continue;
            if (FD_ISSET(sockfd, &rset)) {
                memset(buf, 0, sizeof buf);
                if ((n = read(sockfd, buf, MAXLINE)) == 0) {
                    /*4connection closed by client */
                    close(sockfd);
                    /* close this client connection */
                    FD_CLR(sockfd, &allset);
                    client[i] = -1;
                } else {
                    printf("server receive is : '%s'\n", buf);
                    write(sockfd, buf, n);
                }
                if (--nready <= 0)
                    break;                /* no more readable descriptors */
            }
        }
    }

}
```



## poll

```c
#include <poll.h>

int poll(struct pollfd * fdarray, unsigned long nfds, int timeout);
// return :
// 若有就绪描述符则为其数目，若超时则为0，若出错则为-1
```



```c
/**
 * @Author: 吉松阳
 * @Date: 2021/11/18
 * @Description: 
 */

#include  "../lib/unp.h"
#include    <limits.h>        /* for OPEN_MAX */
#include <poll.h>

int main(int argc, char **argv) {
    printf("server start...\n");
    int i, maxi, listenfd, connfd, sockfd;
    int nready;
    ssize_t n;
    char buf[MAXLINE];
    socklen_t clilen;
    struct pollfd client[OPEN_MAX];
    struct sockaddr_in cliaddr, servaddr;

    listenfd = socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    if (bind(listenfd, (SA *) &servaddr, sizeof(servaddr))) fatal("bind failure");

    listen(listenfd, LISTENQ);

    client[0].fd = listenfd; // 监听套接字描述符
    client[0].events = POLLRDNORM;
    
    for (i = 1; i < OPEN_MAX; i++)
        client[i].fd = -1;        /* -1 indicates available entry */
    maxi = 0;                    /* max index into client[] array */

    for (;;) {
        nready = poll(client, maxi + 1, -1);

        if (client[0].revents & POLLRDNORM) {    /* new client connection */
            clilen = sizeof(cliaddr);
            connfd = accept(listenfd, (SA *) &cliaddr, &clilen);

            for (i = 1; i < OPEN_MAX; i++)
                if (client[i].fd < 0) {
                    client[i].fd = connfd;    /* save descriptor */
                    break;
                }
            if (i == OPEN_MAX)
                fatal("too many clients");

            client[i].events = POLLRDNORM;
            if (i > maxi)
                maxi = i;                /* max index in client[] array */

            if (--nready <= 0)
                continue;                /* no more readable descriptors */
        }

        for (i = 1; i <= maxi; i++) {    /* check all clients for data */
            if ((sockfd = client[i].fd) < 0)
                continue;
            if (client[i].revents & (POLLRDNORM | POLLERR)) {
                memset(buf, 0, sizeof buf);
                if ((n = read(sockfd, buf, MAXLINE)) < 0) {
                    if (errno == ECONNRESET) {
                        /*4connection reset by client */
                        printf("client[%d] aborted connection\n", i);
                        close(sockfd);
                        client[i].fd = -1;
                    } else
                        fatal("read error");
                } else if (n == 0) {
                    /*connection closed by client */
                    printf("client[%d] closed connection\n", i);
                    close(sockfd);
                    client[i].fd = -1;
                } else {
                    write(sockfd, buf, n);
                    printf("server receive is : '%s'\n", buf);
                }
                if (--nready <= 0)
                    break;                /* no more readable descriptors */
            }
        }
    }
}



```





## 使用epoll









## Client

```c
/**
 * @Author: 吉松阳
 * @Date: 2021/11/18
 * @Description: 
 */

#include    "../lib/unp.h"

void str_cli(int sockfd) {
    char sendline[MAXLINE] = {0}, recvline[MAXLINE] = {0};
    while (scanf("%s", sendline) > 0) {
        // SEND
        write(sockfd, sendline, strlen(sendline));
        // RECEIVE
        if (read(sockfd, recvline, MAXLINE) <= 0) {
            fatal("str_cli: server terminated prematurely");
        }
        printf("echoed message is %s\n", recvline);
    }
}

int main(int argc, char **argv) {
    printf("client start\n");
    int sockfd;
    struct sockaddr_in servaddr;

    char *server_ip = "127.0.0.1";

    // SOCKET
    sockfd = socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT); // 
    inet_pton(AF_INET, server_ip, &servaddr.sin_addr);

    // CONNECT
    if (connect(sockfd, (SA *) &servaddr, sizeof(servaddr)) < 0) fatal("connection failed");

    str_cli(sockfd);        /* do it all */

    exit(0);
}




```




## Lib

```c
/* include unph */
/* Our own header.  Tabs are set for 4 spaces, not 8 */

#ifndef	__unp_h
#define	__unp_h

#include	<sys/types.h>	/* basic system data types */
#include	<sys/socket.h>	/* basic socket definitions */
#if TIME_WITH_SYS_TIME
#include	<sys/time.h>	/* timeval{} for select() */
#include	<time.h>		/* timespec{} for pselect() */
#else
#if HAVE_SYS_TIME_H
#include	<sys/time.h>	/* includes <time.h> unsafely */
#else
#include	<time.h>		/* old system? */
#endif
#endif
#include	<netinet/in.h>	/* sockaddr_in{} and other Internet defns */
#include	<arpa/inet.h>	/* inet(3) functions */
#include	<errno.h>
#include	<fcntl.h>		/* for nonblocking */
#include	<netdb.h>
#include	<signal.h>
#include	<stdio.h>
#include	<stdlib.h>
#include	<string.h>
#include	<sys/stat.h>	/* for S_xxx file mode constants */
#include	<sys/uio.h>		/* for iovec{} and readv/writev */
#include	<unistd.h>
#include	<sys/wait.h>
#include	<sys/un.h>		/* for Unix domain sockets */

#ifdef	HAVE_SYS_SELECT_H
# include	<sys/select.h>	/* for convenience */
#endif

#ifdef	HAVE_SYS_SYSCTL_H
#ifdef	HAVE_SYS_PARAM_H
# include	<sys/param.h>	/* OpenBSD prereq for sysctl.h */
#endif
# include	<sys/sysctl.h>
#endif

#ifdef	HAVE_POLL_H
# include	<poll.h>		/* for convenience */
#endif

#ifdef	HAVE_SYS_EVENT_H
# include	<sys/event.h>	/* for kqueue */
#endif

#ifdef	HAVE_STRINGS_H
# include	<strings.h>		/* for convenience */
#endif

/* Three headers are normally needed for socket/file ioctl's:
 * <sys/ioctl.h>, <sys/filio.h>, and <sys/sockio.h>.
 */
#ifdef	HAVE_SYS_IOCTL_H
# include	<sys/ioctl.h>
#endif
#ifdef	HAVE_SYS_FILIO_H
# include	<sys/filio.h>
#endif
#ifdef	HAVE_SYS_SOCKIO_H
# include	<sys/sockio.h>
#endif

#ifdef	HAVE_PTHREAD_H
# include	<pthread.h>
#endif

#ifdef HAVE_NET_IF_DL_H
# include	<net/if_dl.h>
#endif

#ifdef HAVE_NETINET_SCTP_H
#include	<netinet/sctp.h>
#endif


#define	LISTENQ		1024	/* 2nd argument to listen() */

/* Define some port number that can be used for our examples */
#define	SERV_PORT		 9877			/* TCP and UDP */
#define	SERV_PORT_STR	"9877"			/* TCP and UDP */

/* Miscellaneous constants */
#define	MAXLINE		4096	/* max text line length */
#define	BUFFSIZE	8192	/* buffer size for reads and writes */

/* Following shortens all the typecasts of pointer arguments: */
#define	SA	struct sockaddr

#define fatal(message) fprintf(stderr, message)


#endif	/* __unp_h */

```
