---
title: MyBatis源码剖析 —— session 包相关
date: 2021-08-06
categories: MyBatis
tags:
  - MyBatis
  - 框架源码系列
---




# 构建流程
从 SqlSessionFactoryBuilder 构建 SqlSessionFactory。
```java
  public SqlSessionFactory build(InputStream inputStream, String environment, Properties properties) {
    try {
      XMLConfigBuilder parser = new XMLConfigBuilder(inputStream, environment, properties);
      return build(parser.parse());
    }  
  }
  public SqlSessionFactory build(Configuration config) {
    return new DefaultSqlSessionFactory(config);
  }
```



# SqlSessionFactoryBuilder

`SqlSessionFactoryBuilder`仅用来构建SqlSessionFactory，

提供了一系列 build 方法（从各种来源，如输入流、配置类）等等构建SqlSessionFactory。

```java
package org.apache.ibatis.session;
public class SqlSessionFactoryBuilder {
  // build()方法簇
  public SqlSessionFactory build(..) {
  }
}
```

# SqlSessionFactory接口、实现类
SqlSession工厂

## SqlSessionFactory

提供了一系列openSession()方法的接口，并接受一些连接属性，如autoCommit（是否自动提交）、TransactionIsolationLevel（事务的隔离级别）等。

```java
package org.apache.ibatis.session;
public interface SqlSessionFactory {
  // openSession()方法簇
  SqlSession openSession(..);
}
```


## DefaultSqlSessionFactory

```java
package org.apache.ibatis.session.defaults;

public class DefaultSqlSessionFactory implements SqlSessionFactory {

  private final Configuration configuration;

  /*
   以上省略实现接口的 openSession(..) 方法，
   均调用了 openSessionFromDataSource openSessionFromConnection 方法
  */
  
  private SqlSession openSessionFromDataSource(ExecutorType execType, TransactionIsolationLevel level, boolean autoCommit) {
    Transaction tx = null;
    try {
      final Environment environment = configuration.getEnvironment();
      // 获取 事务管理器
      final TransactionFactory transactionFactory = getTransactionFactoryFromEnvironment(environment);
      // 指定参数： 数据源、事务隔离级别、是否自动提交，获取事务
      tx = transactionFactory.newTransaction(environment.getDataSource(), level, autoCommit);
      // 获取 执行器
      final Executor executor = configuration.newExecutor(tx, execType);
      // 构造 session 并返回
      return new DefaultSqlSession(configuration, executor, autoCommit);
    } catch (Exception e) {
      closeTransaction(tx); // may have fetched a connection so lets call close()
      throw ExceptionFactory.wrapException("Error opening session.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  private SqlSession openSessionFromConnection(ExecutorType execType, Connection connection) {
    // 与上面的逻辑几乎一致，不过从 java.sql.Connection 可以获得很多信息如隔离级别、是否自动提交等信息
  }

  // 根据配置信息返回 transactionManager，否则返回默认的 ManagedTransactionFactory 
  private TransactionFactory getTransactionFactoryFromEnvironment(Environment environment) {
    if (environment == null || environment.getTransactionFactory() == null) {
      return new ManagedTransactionFactory();
    }
    return environment.getTransactionFactory();
  }
  
}
```




# SqlSession接口、实现类


SqlSession 接口
## SqlSession

```java
package org.apache.ibatis.session;

/*
只摘取了部分方法
*/
public interface SqlSession extends Closeable {
  // 各种select语句
  <T> T selectOne(String statement);
  <E> List<E> selectList(String statement);
  <K, V> Map<K, V> selectMap(String statement, String mapKey);
  <T> Cursor<T> selectCursor(String statement);
  void select(String statement, ResultHandler handler);
  
  // 插入、更新、删除
  int insert(String statement);
  int update(String statement);
  int delete(String statement);

  // 事务的提交、回滚
  void commit();
  void commit(boolean force);
  void rollback();
  void rollback(boolean force);
  
  // 绑定到此 SqlSession 的映射器
  <T> T getMapper(Class<T> type);
 
  Connection getConnection();
}
```





## DefaultSqlSession

SqlSession的默认实现类，注意此类线程不安全，所以同一个`DefaultSqlSession`实例不能作为多个线程共享的变量。



有两个重要的成员属性：configuration，executor。

configuration 获取绑定的sql语句，映射器等。

executor用于执行sql任务。

```java
package org.apache.ibatis.session.defaults;

/*
 省略了部分字段、接口中的方法，以及异常处理，
 只留下最关键的方法调用。
*/
public class DefaultSqlSession implements SqlSession {
  
  private final Configuration configuration;
  private final Executor executor;

  // select语句最终的实现方法
  private <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler) {
      MappedStatement ms = configuration.getMappedStatement(statement);
      return executor.query(ms, wrapCollection(parameter), rowBounds, handler);    
  }

  
  // update、delete、insert在处理的时候其实不加区分，最后都是调用这个方法（因为不需要对结果集进行对象映射）
  @Override
  public int update(String statement, Object parameter) {
      dirty = true;
      MappedStatement ms = configuration.getMappedStatement(statement);
      return executor.update(ms, wrapCollection(parameter));
  }


  @Override
  public void commit(boolean force) {
      executor.commit(isCommitOrRollbackRequired(force));
      dirty = false;
  }

  @Override
  public void rollback(boolean force) {
      executor.rollback(isCommitOrRollbackRequired(force));
      dirty = false;
  }

  // 根据 xxxMapper.class 获取 xxxMapper的实例（代理生成的对象）
  @Override
  public <T> T getMapper(Class<T> type) {
    return configuration.getMapper(type, this);
  }
}
```





## SqlSessionManager

`SqlSessionManager`相比`SqlSession`而言，一方面做到了线程安全，另一方面避免了每次都需要 openSession(), 实现了对昂贵对象的复用。



通过 `Proxy` + `ThreadLocal` 的方式 代理对 `SqlSession` 的操作。

SqlSession 的使用要么从线程的本地变量里去取，要么用完即弃。这样，每个线程使用到的都是”独属于自己“的SqlSession了。



```java
package org.apache.ibatis.session;

public class SqlSessionManager implements SqlSessionFactory, SqlSession {

  // 从配置文件或者Java类生成的
  private final SqlSessionFactory sqlSessionFactory;
  // 代理类
  private final SqlSession sqlSessionProxy;

  // 线程本地变量
  private final ThreadLocal<SqlSession> localSqlSession = new ThreadLocal<>();
 
  
  private SqlSessionManager(SqlSessionFactory sqlSessionFactory) {
    this.sqlSessionFactory = sqlSessionFactory;
    // Proxy.newProxyInstance
    this.sqlSessionProxy = (SqlSession) Proxy.newProxyInstance(
        SqlSessionFactory.class.getClassLoader(),
        new Class[]{SqlSession.class},
        new SqlSessionInterceptor());
  }

  // 此方法可以直接绕过 SqlSessionFactoryBuilder的构造
  public static SqlSessionManager newInstance(Reader reader) {
    return new SqlSessionManager(new SqlSessionFactoryBuilder().build(reader, null, null));
  }
 
  // 设置线程本地量
  public void startManagedSession() {
    this.localSqlSession.set(openSession());
  }
  // 从 threadLocal里去取
  public boolean isManagedSessionStarted() {
    return this.localSqlSession.get() != null;
  }
 
  // 用代理对象调用，之后被 SqlSessionInterceptor 拦截
  @Override
  public <T> T selectOne(String statement) {
    return sqlSessionProxy.selectOne(statement);
  }
  
  
  private class SqlSessionInterceptor implements InvocationHandler {
    public SqlSessionInterceptor() {
        // Prevent Synthetic Access
    }

    // 先从本地拿, 有则直接用, 无则直接用一个新的 session 执行任务
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
      final SqlSession sqlSession = SqlSessionManager.this.localSqlSession.get();
      // 
      if (sqlSession != null) {
        try {
          return method.invoke(sqlSession, args);
        } catch (Throwable t) {
          throw ExceptionUtil.unwrapThrowable(t);
        }
      } else {
        try (SqlSession autoSqlSession = openSession()) {
          try {
            final Object result = method.invoke(autoSqlSession, args);
            autoSqlSession.commit();
            return result;
          } catch (Throwable t) {
            autoSqlSession.rollback();
            throw ExceptionUtil.unwrapThrowable(t);
          }
        }
      }
    }
  }

}
```





## SqlSessionTemplate

这个类在 org.mybatis.spring包中，也实现了 SqlSession接口，也是线程安全的。

不过，这个类在获得目标对象 SqlSession 的时候，并不是简单的从ThreadLocal里取，而是借助 `TransactionSynchronizationManager`去获取`SqlSessionHolder`再最终获得 `SqlSession`的。

这里不再赘述，放在spring 的事务管理里细述。



> [MyBatis 3 文档](https://mybatis.org/mybatis-3/zh/getting-started.html)
