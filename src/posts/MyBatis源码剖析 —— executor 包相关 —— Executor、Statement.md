---
title: MyBatis源码剖析 —— executor 包相关之Executor、Statement
date: 2021-08-08
categories: MyBatis
tags:
  - MyBatis
  - 框架源码系列
---



# Executor相关

只列出了两个有代表性的方法。

```java
package org.apache.ibatis.executor;

public interface Executor {

  int update(MappedStatement ms, Object parameter) throws SQLException;

  <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey cacheKey, BoundSql boundSql) throws SQLException;

}
```

方法参数里，有一个重要的 MappedStatement， 这个实际上就是在**xml里写的sql语句的包装类**。



来看一看它的实现类

## BaseExecutor

```java
package org.apache.ibatis.executor;

public abstract class BaseExecutor implements Executor {

  protected Transaction transaction;
  protected Executor wrapper;
  protected Configuration configuration;

  
  // executor 的 commmit、rollback 都去调 transaction 的 commit()、rollback()
  public void commit(boolean required) throws SQLException {
    // ...
    if (required) {
      transaction.commit();
    }
  }

  public void rollback(boolean required) throws SQLException {
 		 // ...    
          transaction.rollback();
 
  }


  // 增删改查最终都调用这两个方法，具体实现由 ExecutorType 这个枚举量决定
  protected abstract int doUpdate(MappedStatement ms, Object parameter) throws SQLException;

  protected abstract <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql)
      throws SQLException;



}
```



## SimpleExecutor

```java
package org.apache.ibatis.executor;

public class SimpleExecutor extends BaseExecutor {

  public SimpleExecutor(Configuration configuration, Transaction transaction) {
    super(configuration, transaction);
  }


  public int doUpdate(MappedStatement ms, Object parameter) throws SQLException {
    Statement stmt = null;
    try {
      Configuration configuration = ms.getConfiguration();
      // 获取 Statement 处理器， 注意这里传入了参数 MappedStatement，parameter
      StatementHandler handler = configuration.newStatementHandler(this, ms, parameter, RowBounds.DEFAULT, null, null);
      stmt = prepareStatement(handler, ms.getStatementLog());
      // 最终用 Statement处理器去处理 Statement
      return handler.update(stmt);
    } finally {
      closeStatement(stmt);
    }
  }
  

  // 与上面一样的做法
  public <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) throws SQLException {
    // ...
  }
  

  private Statement prepareStatement(StatementHandler handler, Log statementLog) throws SQLException {
    Statement stmt;
    Connection connection = getConnection(statementLog);
    stmt = handler.prepare(connection, transaction.getTimeout());
    // 填充参数（如果是 Prepared型的Statement的话）
    handler.parameterize(stmt);
    return stmt;
  }

}
```



具体的实现类其实由 ExecutorType 的三种类型确定，可以通过配置文件里的 settings 的 defaultExecutorType 来配置：

```java
public enum ExecutorType {
  SIMPLE, REUSE, BATCH
}
```

这里不再细述其他两种。

# Statement相关

这个不是mybatis里定义的东西，而是`java.sql`里定义的接口。

**用于执行静态 SQL 语句并返回它产生的结果的对象。**

它有众多和数据源相关的实现类，比如`com.mysql.cj.jdbc.StatementImpl`就是和mysql交互的statement。



## StatementHandler

```java
package org.apache.ibatis.executor.statement;

public interface StatementHandler {

  // 获得Statement，数据库连接、事务超时时间 
  Statement prepare(Connection connection, Integer transactionTimeout)
      throws SQLException;

  // 参数化“语句”
  void parameterize(Statement statement)
      throws SQLException;

  // 执行 Statement 的 update 操作
  int update(Statement statement)
      throws SQLException;

  // 执行 查询操作
  <E> List<E> query(Statement statement, ResultHandler resultHandler)
      throws SQLException;

  
  BoundSql getBoundSql();

  ParameterHandler getParameterHandler();

}
```





## BaseStatementHandler

抽象类，实现了 StatementHandler 部分方法

```java
package org.apache.ibatis.executor.statement;

public abstract class BaseStatementHandler implements StatementHandler {

  protected final Configuration configuration;
  protected final ObjectFactory objectFactory;             // 对象工厂，负责通过反射的方式生成对象
  protected final TypeHandlerRegistry typeHandlerRegistry; // 类型处理器工厂
  protected final ResultSetHandler resultSetHandler;       // 结果集处理器
  protected final ParameterHandler parameterHandler;       // 参数处理器

  protected final Executor executor;
  protected final MappedStatement mappedStatement;         // 从 xml 读取来的 sql语句的包装类
  protected final RowBounds rowBounds;        

  protected BoundSql boundSql;                             // 处理任何Mybatis的动态sql标签后，从SqlSource获得的实际 SQL 字符串

  protected BaseStatementHandler(Executor executor, MappedStatement mappedStatement, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {
    /// ...
    // 从配置类获取
    this.typeHandlerRegistry = configuration.getTypeHandlerRegistry();
    this.objectFactory = configuration.getObjectFactory();
    if (boundSql == null) { // issue #435, get the key before calculating the statement
      generateKeys(parameterObject);
      boundSql = mappedStatement.getBoundSql(parameterObject);
    }
    this.boundSql = boundSql;
    // 从配置类获取
    this.parameterHandler = configuration.newParameterHandler(mappedStatement, parameterObject, boundSql);
    this.resultSetHandler = configuration.newResultSetHandler(executor, mappedStatement, rowBounds, parameterHandler, resultHandler, boundSql);
  }


  @Override
  public Statement prepare(Connection connection, Integer transactionTimeout) throws SQLException {
      Statement statement = null;
      // 调用初始化 Statement 参数，传入参数 connection
      statement = instantiateStatement(connection);
      
      // 设置两个配置参数
      setStatementTimeout(statement, transactionTimeout);
      setFetchSize(statement);
      return statement;
    
  }

  protected abstract Statement instantiateStatement(Connection connection) throws SQLException;

  protected void setStatementTimeout(Statement stmt, Integer transactionTimeout) throws SQLException {
    // ... 
    // 设置 查询时间、事务时间
    StatementUtil.applyTransactionTimeout(stmt, queryTimeout, transactionTimeout);
  }

  protected void setFetchSize(Statement stmt) throws SQLException {
			// 调用 stmt.setFetchSize(fetchSize);
  }

  protected void closeStatement(Statement statement) {
       statement.close();
  }

  // 生成主键相关
  protected void generateKeys(Object parameter) {
    // ...
  }

}
```





```java
package org.apache.ibatis.executor.statement;

// routing 路由
public class RoutingStatementHandler implements StatementHandler {

  private final StatementHandler delegate;

  public RoutingStatementHandler(Executor executor, MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {
    // 根据 不同的 StatementType 选择相应的StatementHandler接口的实现类 
    switch (ms.getStatementType()) {
      case STATEMENT:
        delegate = new SimpleStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
        break;
      case PREPARED:
        delegate = new PreparedStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
        break;
      case CALLABLE:
        delegate = new CallableStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
        break;
      default:
        throw new ExecutorException("Unknown statement type: " + ms.getStatementType());
    }
  }
```



```java
package org.apache.ibatis.executor.statement;

public class SimpleStatementHandler extends BaseStatementHandler {


  @Override
  public int update(Statement statement) throws SQLException {
    String sql = boundSql.getSql();
    Object parameterObject = boundSql.getParameterObject();
    KeyGenerator keyGenerator = mappedStatement.getKeyGenerator();
    int rows;
    // 调用 Statement的 execute 方法完成任务
    if (keyGenerator instanceof Jdbc3KeyGenerator) {
      statement.execute(sql, Statement.RETURN_GENERATED_KEYS);
      rows = statement.getUpdateCount();
      keyGenerator.processAfter(executor, mappedStatement, statement, parameterObject);
    } else if (keyGenerator instanceof SelectKeyGenerator) {
      statement.execute(sql);
      rows = statement.getUpdateCount();
      keyGenerator.processAfter(executor, mappedStatement, statement, parameterObject);
    } else {
      statement.execute(sql);
      rows = statement.getUpdateCount();
    }
    return rows;
  }


  @Override
  public <E> List<E> query(Statement statement, ResultHandler resultHandler) throws SQLException {
    String sql = boundSql.getSql();
    // 这里的sql已经完全是可执行的sql了，无需参数填充
    statement.execute(sql);
    // 用结果集处理器处理 statement.getResultSet()
    return resultSetHandler.handleResultSets(statement);
  }


  // 到最后还是要 调用 JDBC 的 Connection 的 createStatement 的方法
  @Override 
  protected Statement instantiateStatement(Connection connection) throws SQLException {
    if (mappedStatement.getResultSetType() == ResultSetType.DEFAULT) {
      return connection.createStatement();
    } else {
      // JDBC 允许返回 ResultSet 的时候指定 ”结果集类型“—— ResultSetType， 这是一个枚举量
      return connection.createStatement(mappedStatement.getResultSetType().getValue(), ResultSet.CONCUR_READ_ONLY);
    }
  }

  @Override
  public void parameterize(Statement statement) {
    // do none thing (因为这是 ”简单型“的Statement处理器, 没有对占位符#{}进行处理)
  }

}
```





```java
package org.apache.ibatis.executor.statement;

public class PreparedStatementHandler extends BaseStatementHandler {
  // 和上面的一样，只不过把关于 keyGenerator的部分放在了 instantiateStatement 罢了
  @Override
  public int update(Statement statement) throws SQLException {
  }

  // 和上面的一样
  @Override
  public <E> List<E> query(Statement statement, ResultHandler resultHandler) throws SQLException { 
  }

  @Override
  protected Statement instantiateStatement(Connection connection) throws SQLException {
    String sql = boundSql.getSql();
    if (mappedStatement.getKeyGenerator() instanceof Jdbc3KeyGenerator) {
      String[] keyColumnNames = mappedStatement.getKeyColumns();
      if (keyColumnNames == null) {
        return connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
      } else {
        return connection.prepareStatement(sql, keyColumnNames);
      }
    } else if (mappedStatement.getResultSetType() == ResultSetType.DEFAULT) {
      // 注意 这里的sql 仍然会有 占位符，所以执行流程后面还要调用 parameterize
      return connection.prepareStatement(sql);
    } else {
      return connection.prepareStatement(sql, mappedStatement.getResultSetType().getValue(), ResultSet.CONCUR_READ_ONLY);
    }
  }

  @Override
  public void parameterize(Statement statement) throws SQLException {
    // 相比于 SimpleStatementHandler 多了一个占位符的填充参数
    parameterHandler.setParameters((PreparedStatement) statement);
  }

}
```

