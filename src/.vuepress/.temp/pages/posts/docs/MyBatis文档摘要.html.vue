<template><div><h1 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h1>
<p>MyBatis 的配置文件的层次结构：</p>
<ul>
<li>configuration（配置）
<ul>
<li>properties（属性）</li>
<li>settings（设置）</li>
<li>typeAliases（类型别名）</li>
<li>typeHandlers（类型处理器）</li>
<li>objectFactory（对象工厂）</li>
<li>plugins（插件）</li>
<li>environments（环境配置）
<ul>
<li>environment（环境变量）
<ul>
<li>transactionManager（事务管理器）</li>
<li>dataSource（数据源）</li>
</ul>
</li>
</ul>
</li>
<li>databaseIdProvider（数据库厂商标识）</li>
<li>mappers（映射器）</li>
</ul>
</li>
</ul>
<h2 id="属性-properties" tabindex="-1"><a class="header-anchor" href="#属性-properties" aria-hidden="true">#</a> 属性（properties）</h2>
<h2 id="设置-settings" tabindex="-1"><a class="header-anchor" href="#设置-settings" aria-hidden="true">#</a> 设置（settings）</h2>
<h3 id="对象关系映射相关" tabindex="-1"><a class="header-anchor" href="#对象关系映射相关" aria-hidden="true">#</a> 对象关系映射相关</h3>
<table>
<thead>
<tr>
<th style="text-align:left">设置名</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">有效值</th>
<th style="text-align:left">默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">autoMappingBehavior</td>
<td style="text-align:left">指定 MyBatis 应如何自动映射列到字段或属性。 NONE 表示关闭自动映射；PARTIAL 只会自动映射没有定义嵌套结果映射的字段。 FULL 会自动映射任何复杂的结果集（无论是否嵌套）。</td>
<td style="text-align:left">NONE, PARTIAL, FULL</td>
<td style="text-align:left">PARTIAL</td>
</tr>
<tr>
<td style="text-align:left">mapUnderscoreToCamelCase</td>
<td style="text-align:left">是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。</td>
<td style="text-align:left">true | false</td>
<td style="text-align:left">False</td>
</tr>
<tr>
<td style="text-align:left">autoMappingUnknownColumnBehavior</td>
<td style="text-align:left">指定发现自动映射目标未知列（或未知属性类型）的行为。<code v-pre>NONE</code>: 不做任何反应<code v-pre>WARNING</code>: 输出警告日志（<code v-pre>'org.apache.ibatis.session.AutoMappingUnknownColumnBehavior'</code> 的日志等级必须设置为 <code v-pre>WARN</code>）<code v-pre>FAILING</code>: 映射失败 (抛出 <code v-pre>SqlSessionException</code>)</td>
<td style="text-align:left">NONE, WARNING, FAILING</td>
<td style="text-align:left"></td>
</tr>
</tbody>
</table>
<h3 id="缓存相关" tabindex="-1"><a class="header-anchor" href="#缓存相关" aria-hidden="true">#</a> 缓存相关</h3>
<table>
<thead>
<tr>
<th style="text-align:left">设置名</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">有效值</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">cacheEnabled</td>
<td style="text-align:left">全局性地开启或关闭所有映射器配置文件中已配置的任何缓存。</td>
<td style="text-align:left">true | false</td>
<td>true</td>
</tr>
<tr>
<td style="text-align:left">localCacheScope</td>
<td style="text-align:left">MyBatis 利用本地缓存机制（Local Cache）防止循环引用和加速重复的嵌套查询。 默认值为 SESSION，会缓存一个会话中执行的所有查询。 若设置值为 STATEMENT，本地缓存将仅用于执行语句，对相同 SqlSession 的不同查询将不会进行缓存。</td>
<td style="text-align:left">SESSION | STATEMENT</td>
<td>SESSION</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="数据库连接与执行器相关" tabindex="-1"><a class="header-anchor" href="#数据库连接与执行器相关" aria-hidden="true">#</a> 数据库连接与执行器相关</h3>
<table>
<thead>
<tr>
<th style="text-align:left">设置名</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">有效值</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">defaultStatementTimeout</td>
<td style="text-align:left">设置超时时间，它决定数据库驱动等待数据库响应的秒数。</td>
<td style="text-align:left">任意正整数</td>
<td>未设置 (null)</td>
</tr>
<tr>
<td style="text-align:left">defaultExecutorType</td>
<td style="text-align:left">配置默认的执行器。SIMPLE 就是普通的执行器；REUSE 执行器会重用预处理语句（PreparedStatement）； BATCH 执行器不仅重用语句还会执行批量更新。</td>
<td style="text-align:left">SIMPLE REUSE BATCH</td>
<td>SIMPLE</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="日志相关" tabindex="-1"><a class="header-anchor" href="#日志相关" aria-hidden="true">#</a> 日志相关</h3>
<table>
<thead>
<tr>
<th style="text-align:left">设置名</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">有效值</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">logPrefix</td>
<td style="text-align:left">指定 MyBatis 增加到日志名称的前缀。</td>
<td style="text-align:left">任何字符串</td>
<td>未设置</td>
</tr>
<tr>
<td style="text-align:left">logImpl</td>
<td style="text-align:left">指定 MyBatis 所用日志的具体实现，未指定时将自动查找。</td>
<td style="text-align:left">SLF4J | LOG4J | LOG4J2 | JDK_LOGGING | COMMONS_LOGGING | STDOUT_LOGGING | NO_LOGGING</td>
<td>未设置</td>
</tr>
</tbody>
</table>
<h2 id="类型别名-typealiases" tabindex="-1"><a class="header-anchor" href="#类型别名-typealiases" aria-hidden="true">#</a> 类型别名（typeAliases）</h2>
<h2 id="类型处理器-typehandlers" tabindex="-1"><a class="header-anchor" href="#类型处理器-typehandlers" aria-hidden="true">#</a> 类型处理器（typeHandlers）</h2>
</div></template>


