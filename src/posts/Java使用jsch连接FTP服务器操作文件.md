---
title: Java使用jsch连接FTP服务器操作文件
date: 2021-12-26 23:27:21
tags:
---






>本文主要在sdu-pta项目中如何使用 jsch 去连接 FTP服务器，并访问、下载、上传文件。

# Maven依赖
```xml
        <dependency>
            <groupId>com.jcraft</groupId>
            <artifactId>jsch</artifactId>
            <version>0.1.55</version>
        </dependency>
```


# 使用说明
```java
    /**
     * 获取Channel
     */
    public ChannelSftp getSftp() throws SftpException {
        Session session;
        try {
            session = new JSch().getSession(sshProperties.getUsername(), sshProperties.getHost(), sshProperties.getPort());
            session.setConfig("StrictHostKeyChecking", "no");
            session.setPassword(sshProperties.getPassword());
            session.connect();
        } catch (JSchException e) {
            log.error("ssh connecting " + sshProperties.getUsername() + "@" + sshProperties.getHost() + " failed.", e);
            throw new SftpException();
        }
        ChannelSftp sftp;
        try {
            sftp = (ChannelSftp) session.openChannel("sftp");
            sftp.connect();
        } catch (JSchException e) {
            log.error("channel opens fail", e);
            throw new SftpException();
        }
        return sftp;
    }
    
    // 使用配置类获取操作句柄
    ChannelSftp sftp = sshConfiguration.getSftp();
    // 使用后关闭连接
        try {
            // 文件的各种操作 
        } catch (com.jcraft.jsch.SftpException e) {
            throw new SftpException(e.getMessage());
        } finally {
            // 注意这里的连接关闭
            sftp.disconnect();
            try {
                sftp.getSession().disconnect();
            } catch (JSchException e) {
                log.error("sftp fails to channel get session");
            }
        }
```


# 实战演练
## 配置类
```java
package com.sduoj.judgeserver.conf;

import com.jcraft.jsch.*;
import com.sduoj.judgeserver.exception.internal.SftpException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

/**
 * @Author: Song yang Ji
 * @ProjectName: sduoj-judge-server
 * @Version 1.0
 * @Description: SFTP的配置信息类
 */


@Configuration
@Slf4j(topic = "SFTP")
public class SshConfiguration {

    @Getter
    SshProperties sshProperties;

    @Autowired
    public SshConfiguration(SshProperties sshProperties) {
        this.sshProperties = sshProperties;
    }

    public ChannelSftp getSftp() throws SftpException {
        Session session;
        try {
            session = new JSch().getSession(sshProperties.getUsername(), sshProperties.getHost(), sshProperties.getPort());
            session.setConfig("StrictHostKeyChecking", "no");
            session.setPassword(sshProperties.getPassword());
            session.connect();
        } catch (JSchException e) {
            log.error("ssh connecting " + sshProperties.getUsername() + "@" + sshProperties.getHost() + " failed.", e);
            throw new SftpException();
        }
        ChannelSftp sftp;
        try {
            sftp = (ChannelSftp) session.openChannel("sftp");
            sftp.connect();
        } catch (JSchException e) {
            log.error("channel opens fail", e);
            throw new SftpException();
        }
        return sftp;
    }
}
```

## 工具类
接口类
```java
package com.sduoj.judgeserver.util.sftp;

import java.nio.file.Path;

/**
 * @Author: Song yang Ji
 * @ProjectName: sduoj-judge-server
 * @Version 1.0
 * @Description:
 */

public interface SftpFilesService {

    /**
     * @param problemID 题目ID
     * @param local     下载的本地的路径
     * @throws SftpException Sftp 异常
     */
    void downloadProblemIOFiles(String problemID, Path local) throws SftpException;


    /**
     *
     * @param problemID 题目ID
     * @param testPointID 测试点ID
     * @param local 下载的本地的路径
     * @throws SftpException Sftp 异常
     */
    void downloadProblemTestPointIOFiles(String problemID, String testPointID, Path local) throws SftpException;

}
```


实现类
```java
@Service("sftpFilesService")
@Slf4j(topic = "SFTP")
public class SftpFilesServiceImpl implements SftpFilesService {

    EnvironmentConfig environmentConfig;

    SshConfiguration sshConfiguration;


    @Autowired
    public SftpFilesServiceImpl(EnvironmentConfig environmentConfig, SshConfiguration sshConfiguration) {
        this.environmentConfig = environmentConfig;
        this.sshConfiguration = sshConfiguration;
    }

    /**
     * @param problemID 题目ID
     * @param local     下载的本地的路径
     * @throws SftpException Sftp 异常
     */
    @Override
    public void downloadProblemIOFiles(String problemID, Path local) throws SftpException {
        // 创建本地文件夹
        try {
            Files.createDirectory(local);
        } catch (IOException e) {
            throw new SftpException("本地文件夹创建失败");
        }

        String remoteProblemFiles = sshConfiguration.getSshProperties().getRootDir() + problemID + "/";
        ChannelSftp sftp = sshConfiguration.getSftp();
        try {
            List<String> list = listFileNamesInDir(sftp, remoteProblemFiles);
            for (String filePath : list) {
                sftp.get(filePath, local.toString());
            }
        } catch (com.jcraft.jsch.SftpException e) {

            throw new SftpException(e.getMessage());
        } finally {
            // 注意这里的连接关闭
            sftp.disconnect();
            try {
                sftp.getSession().disconnect();
            } catch (JSchException e) {
                log.error("sftp fails to channel get session");
            }
        }
    }

    /**
     * @param problemID   题目ID
     * @param testPointID 测试点ID
     * @param local       下载的本地的路径
     * @throws SftpException Sftp 异常
     */
    @Override
    public void downloadProblemTestPointIOFiles(String problemID, String testPointID, Path local) throws SftpException {
        String remoteProblemFiles = sshConfiguration.getSshProperties().getRootDir() + problemID + "/" + testPointID + "/";
        ChannelSftp sftp = sshConfiguration.getSftp();
        try {
            List<String> list = listFileNamesInDir(sftp, remoteProblemFiles);
            for (String filePath : list) {
                sftp.get(filePath, local.toString());
            }
        } catch (com.jcraft.jsch.SftpException e) {

            throw new SftpException(e.getMessage());
        } finally {
            // 注意这里的连接关闭
            sftp.disconnect();
            try {
                sftp.getSession().disconnect();
            } catch (JSchException e) {
                log.error("sftp fails to channel get session");
            }
        }
    }

    private List<String> listFileNamesInDir(ChannelSftp sftp, String remoteDir) throws com.jcraft.jsch.SftpException {
        List<String> list = new ArrayList<>();
        Vector<ChannelSftp.LsEntry> ls = sftp.ls(remoteDir);
        for (ChannelSftp.LsEntry file : ls) {
            String filename = file.getFilename();
            if (filename.equals(".") || filename.equals("..")) continue;
            list.add(remoteDir + filename);
        }
        return list;
    }

}
```
