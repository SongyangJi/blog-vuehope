<template><div><h1 id="_1-发现-监控慢查询" tabindex="-1"><a class="header-anchor" href="#_1-发现-监控慢查询" aria-hidden="true">#</a> 1. 发现+监控慢查询</h1>
<h2 id="mysql提供的慢查询日志" tabindex="-1"><a class="header-anchor" href="#mysql提供的慢查询日志" aria-hidden="true">#</a> Mysql提供的慢查询日志</h2>
<p><strong>MySQL的慢查询，全名是慢查询日志，是MySQL提供的一种日志记录，用来记录在MySQL中响应时间超过阀值的语句。</strong></p>
<p><strong>相关参数</strong></p>
<ol>
<li>slow_query_log : 是否开启慢查询日志</li>
<li>slow_query_log_file : 慢查询日志文件名及路径</li>
<li>long_query_time : 指定慢查询时间阈(yu)值，sql执行时间大于该阈值（不包括该值本身，如在sql执行中花费的时间等于，下面的2秒时，不会被记录）将被记录下来,生产环境中1~2秒范围均可</li>
<li>log_queries_not_using_indexes : 将没有使用索引的语句记录至慢查询日志中，</li>
<li>log_throttle_queries_not_using_indexes : 限制每分钟内，在慢查询日志中，去记录没有使用索引的SQL语句的次数,因为没有使用索引的SQL可能会短时间重复执行，为了避免日志快速增大，限制每分钟的记录次数</li>
<li>min_examined_row_limit : 扫描全表少于该值的记录将不会被记录至慢查询日志,结合去记录没有使用索引的SQL语句的例子，有可能存在某一个表，数据量维持在百行左右，且没有建立索引。这种表即使不建立索引，查询也很快，扫描记录很小，如果确定有这种表，则可以通过此参数设置，将这个SQL不记录到慢查询日志。</li>
</ol>
<p><strong>开启方式</strong></p>
<ol>
<li>修改配置文件</li>
<li>MySQL shell</li>
</ol>
<figure><img src="https://pic3.zhimg.com/80/v2-b2bd80889ea54240a64ec1510c73a13a_1440w.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="mybatis-plus的性能分析插件" tabindex="-1"><a class="header-anchor" href="#mybatis-plus的性能分析插件" aria-hidden="true">#</a> MyBatis -plus的性能分析插件</h2>
<blockquote>
<p>性能分析拦截器，用于输出每条 SQL 语句及其执行时间</p>
</blockquote>
<p>https://hfbbob1.gitbooks.io/mybatis-plus/content/xing-neng-fen-xi-cha-jian.html</p>
<h1 id="_2-分析慢查询日志——explain" tabindex="-1"><a class="header-anchor" href="#_2-分析慢查询日志——explain" aria-hidden="true">#</a> 2. 分析慢查询日志——explain</h1>
<p>直接分析mysql慢查询日志 ,利用explain关键字可以模拟优化器执行SQL查询语句，来分析sql慢查询语句。</p>
<p>Explain是一个非常有的命令，可以用来获取关于查询执行计划的信息，以及如何解释输出。Explain命令是查看查询优化器如何决定执行查询的主要方法。这个功能有一定的局限性，并不总是会说出真相，但是它的输出是可以获取的最好信息，值得花时间了解，可以学习到查询是如何执行的。</p>
<p>explain的输出列：
<img src="https://img-blog.csdn.net/20170509232741017?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd3VzZXl1a3Vp/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="" loading="lazy"></p>
<p><strong>其中最重要的字段为：id、type、key、rows、Extra</strong></p>
<ol>
<li><strong>id列</strong></li>
</ol>
<p>这一列总是包含一个编号，标示select所属的行。</p>
<p><strong>数字越大越先执行，如果说数字一样大，那么就从上往下依次执行</strong>，id列为null的就表示这是一个结果集，不需要使用它来进行查询。</p>
<ol start="2">
<li><strong>select_type列</strong></li>
</ol>
<p>这一列显示了对应行是简单还是复杂select。</p>
<p>常见的有：</p>
<p>A：simple：表示不包含union操作或者不包含子查询的简单select查询。有连接查询时，外层的查询为simple，且只有一个</p>
<p>B：primary：一个需要union操作或者含有子查询的select，位于最外层的单位查询的select_type即为primary。且只有一个</p>
<p>C：union：union连接的两个select查询，第一个查询是dervied派生表，除了第一个表外，第二个以后的表select_type都是union</p>
<p>D：dependent union：与union一样，出现在union 或union all语句中，但是这个查询要受到外部查询的影响</p>
<p>E：union result：包含union的结果集，在union和union all语句中,因为它不需要参与查询，所以id字段为null</p>
<p>F：subquery：除了from字句中包含的子查询外，其他地方出现的子查询都可能是subquery</p>
<p>G：dependent subquery：与dependentunion类似，表示这个subquery的查询要受到外部表查询的影响</p>
<p>H：derived：from字句中出现的子查询，也叫做派生表，其他数据库中可能叫做内联视图或嵌套select</p>
<ol start="3">
<li>table列</li>
</ol>
<p>这一列显示了对应行正在访问查询的表名，如果查询使用了别名，那么这里显示的是别名，如果不涉及对数据表的操作，那么这显示为null，如果显示为尖括号括起来的<code v-pre>&lt;derived N&gt;</code>就表示这个是临时表，后边的N就是执行计划中的id，表示结果来自于这个查询产生。如果是尖括号括起来的<code v-pre>&lt;union M,N&gt;</code>，与<code v-pre>&lt;derived N&gt;</code>类似，也是一个临时表，表示这个结果来自于union查询的id为M,N的结果集。</p>
<ol start="4">
<li><strong>type列</strong></li>
</ol>
<p>这一列显示了<strong>访问类型，即MySQL决定如何查找表中的行</strong>。</p>
<p><strong>依次从好到差：system，const，eq_ref，ref，fulltext，ref_or_null，unique_subquery，index_subquery，range，index_merge，index，ALL，除了all之外，其他的type都可以使用到索引，除了index_merge之外，其他的type只可以用到一个索引</strong></p>
<p>A：system：表中只有一行数据或者是空表，且只能用于myisam和memory表。如果是Innodb引擎表，type列在这个情况通常都是all或者index</p>
<p>B：<strong>const：使用唯一索引或者主键</strong>，返回记录一定是1行记录的等值where条件时，通常type是const。其他数据库也叫做唯一索引扫描</p>
<p>C：<strong>eq_ref</strong>：出现在要连接过个表的查询计划中，<strong>驱动表只返回一行数据，且这行数据是第二个表的主键或者唯一索引</strong>，且必须为not null，唯一索引和主键是多列时，只有所有的列都用作比较时才会出现eq_ref</p>
<p>D：<strong>ref</strong>：不像eq_ref那样要求连接顺序，也没有主键和唯一索引的要求，只要使用相等条件检索时就可能出现，常见与辅助索引的等值查找。或者多列主键、唯一索引中，使用第一个列之外的列作为等值查找也会出现，总之，返回数据不唯一的等值查找就可能出现。</p>
<p>E：fulltext：全文索引检索，要注意，全文索引的优先级很高，若全文索引和普通索引同时存在时，mysql不管代价，优先选择使用全文索引</p>
<p>F：ref_or_null：与ref方法类似，只是增加了null值的比较。实际用的不多。</p>
<p>G：unique_subquery：用于where中的in形式子查询，子查询返回不重复值唯一值</p>
<p>H：index_subquery：用于in形式子查询使用到了辅助索引或者in常数列表，子查询可能返回重复值，可以使用索引将子查询去重。</p>
<p>I：<strong>range：索引范围扫描</strong>，常见于使用&gt;,&lt;,isnull,between ,in ,like等运算符的查询中。</p>
<p>J：index_merge：表示查询使用了两个以上的索引，最后取交集或者并集，常见and ，or的条件使用了不同的索引，官方排序这个在ref_or_null之后，但是实际上由于要读取所个索引，性能可能大部分时间都不如range</p>
<p>K：<strong>index：索引全表扫描</strong>，<strong>把索引从头到尾扫一遍</strong>，常见于使用索引列就可以处理不需要读取数据文件的查询、可以使用索引排序或者分组的查询。</p>
<p>L：<strong>all：全表扫描数据文件</strong>，然后再在server层进行过滤返回符合要求的记录。</p>
<ol start="5">
<li><strong>possible_keys列</strong></li>
</ol>
<p><strong>查询可能使用到的索引</strong>都会在这里列出来。这个列表是优化过程早期创建的，因此有些罗列出来的索引有可能后续是没用的。</p>
<ol start="6">
<li><strong>key列</strong></li>
</ol>
<p>显示了<strong>查询真正使用到的索引</strong>，select_type为index_merge时，这里可能出现两个以上的索引，其他的select_type这里只会出现一个。</p>
<p>如果该索引没有出现在possible_keys列中，那么MySQL选用它是出于另外的原因，比如选择了一个覆盖索引。</p>
<p>possible_keys揭示了哪一个索引能有助于高效地进行查找，key显示了优化采用哪一个索引可以最小化查询成本。</p>
<ol start="7">
<li>key_len列</li>
</ol>
<p>用于处理查询的索引长度，如果是单列索引，那就整个索引长度算进去，如果是多列索引，那么查询不一定都能使用到所有的列，具体使用到了多少个列的索引，这里就会计算进去，没有使用到的列，这里不会计算进去。留意下这个列的值，算一下你的多列索引总长度就知道有没有使用到所有的列了。要注意，mysql的ICP特性使用到的索引不会计入其中。另外，key_len只计算where条件用到的索引长度，而排序和分组就算用到了索引，也不会计算到key_len中。</p>
<ol start="8">
<li>ref列</li>
</ol>
<p>如果是使用的常数等值查询，这里会显示const，如果是连接查询，被驱动表的执行计划这里会显示驱动表的关联字段，如果是条件使用了表达式或者函数，或者条件列发生了内部隐式转换，这里可能显示为func</p>
<ol start="9">
<li><strong>rows列</strong></li>
</ol>
<p>这里是执<strong>行计划中估算的扫描行数</strong>，不是精确值。</p>
<ol start="10">
<li><strong>extra列</strong></li>
</ol>
<p>这个列可以显示的信息非常多，有几十种，常用的有</p>
<p>A：distinct：在select部分使用了distinc关键字</p>
<p>B：no tables used：不带from字句的查询或者Fromdual查询</p>
<p>C：使用not in()形式子查询或notexists运算符的连接查询，这种叫做反连接。即，一般连接查询是先查询内表，再查询外表，反连接就是先查询外表，再查询内表。</p>
<p>D：<strong>using filesort</strong>：排序时无法使用到索引时，就会出现这个。<strong>常见于order by和group by语句中</strong></p>
<p>E：<strong>using index：查询时不需要回表查询，直接通过索引就可以获取查询的数据。(覆盖索引)</strong></p>
<p>F：<strong>using join buffer</strong>（block nestedloop），using join buffer（batched key accss）：5.6.x之后的版本优化关联查询的BNL，BKA特性。主要是减少内表的循环数量以及比较顺序地扫描查询。</p>
<p>G：using sort_union，using_union，usingintersect，using sort_intersection：</p>
<p>using intersect：表示使用and的各个索引的条件时，该信息表示是从处理结果获取交集</p>
<p>using union：表示使用or连接各个使用索引的条件时，该信息表示从处理结果获取并集</p>
<p>using sort_union和usingsort_intersection：与前面两个对应的类似，只是他们是出现在用and和or查询信息量大时，先查询主键，然后进行排序合并后，才能读取记录并返回。</p>
<p>H：using temporary：表示使用了临时表存储中间结果。临时表可以是内存临时表和磁盘临时表，执行计划中看不出来，需要查看status变量，used_tmp_table，used_tmp_disk_table才能看出来。</p>
<p>I：<strong>using where</strong>：**表示存储引擎返回的记录并不是所有的都满足查询条件，需要在server层进行过滤。**查询条件中分为限制条件和检查条件，5.6之前，存储引擎只能根据限制条件扫描数据并返回，然后server层根据检查条件进行过滤再返回真正符合查询的数据。5.6.x之后支持ICP特性，可以把检查条件也下推到存储引擎层，不符合检查条件和限制条件的数据，直接不读取，这样就大大减少了存储引擎扫描的记录数量。extra列显示using index condition</p>
<p>J：firstmatch(tb_name)：5.6.x开始引入的优化子查询的新特性之一，常见于where字句含有in()类型的子查询。如果内表的数据量比较大，就可能出现这个</p>
<p>K：loosescan(m..n)：5.6.x之后引入的优化子查询的新特性之一，在in()类型的子查询中，子查询返回的可能有重复记录时，就可能出现这个</p>
<p>除了这些之外，还有很多查询数据字典库，执行计划过程中就发现不可能存在结果的一些提示信息</p>
<ol start="11">
<li>filtered列</li>
</ol>
<p>使用explain extended时会出现这个列，5.7之后的版本默认就有这个字段，不需要使用explain extended了。这个字段表示存储引擎返回的数据在server层过滤后，剩下多少满足查询的记录数量的比例，注意是百分比，不是具体记录数。</p>
<h1 id="_3-常见的慢查询优化" tabindex="-1"><a class="header-anchor" href="#_3-常见的慢查询优化" aria-hidden="true">#</a> 3. 常见的慢查询优化</h1>
<h2 id="索引相关" tabindex="-1"><a class="header-anchor" href="#索引相关" aria-hidden="true">#</a> 索引相关</h2>
<h3 id="索引没起作用的情况" tabindex="-1"><a class="header-anchor" href="#索引没起作用的情况" aria-hidden="true">#</a> 索引没起作用的情况</h3>
<ol>
<li>使用LIKE关键字的查询语句</li>
<li>范围查询破坏最左前缀匹配原则</li>
<li>索引字段参与计算</li>
</ol>
<h3 id="建索引的几大原则" tabindex="-1"><a class="header-anchor" href="#建索引的几大原则" aria-hidden="true">#</a> 建索引的几大原则</h3>
<p>1.<strong>最左前缀匹配原则</strong>，非常重要的原则，mysql会一直向右匹配直到遇到范围查询(&gt;、&lt;、between、like)就停止匹配，比如a = 1 and b = 2 and c &gt; 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d的顺序可以任意调整。</p>
<p>2.=和in可以乱序，比如a = 1 and b = 2 and c = 3 建立(a,b,c)索引可以任意顺序，mysql的查询优化器会帮你优化成索引可以识别的形式。</p>
<p>3.<strong>尽量选择区分度高的列作为索引</strong>，区分度的公式是count(distinct col)/count(*)，表示字段不重复的比例，比例越大我们扫描的记录数越少，唯一键的区分度是1，而一些状态、性别字段可能在大数据面前区分度就是0，那可能有人会问，这个比例有什么经验值吗？使用场景不同，这个值也很难确定，一般需要join的字段我们都要求是0.1以上，即平均1条扫描10条记录。</p>
<p>4.<strong>索引列不能参与计算</strong>，保持列“干净”，比如from_unixtime(create_time) = ’2014-05-29’就不能使用到索引，原因很简单，b+树中存的都是数据表中的字段值，但进行检索时，需要把所有元素都应用函数才能比较，显然成本太大。所以语句应该写成create_time = unix_timestamp(’2014-05-29’)。</p>
<p>5.<strong>尽量复用已有的索引</strong>，不要新建索引。比如表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可。</p>
<h2 id="优化数据库结构" tabindex="-1"><a class="header-anchor" href="#优化数据库结构" aria-hidden="true">#</a> 优化数据库结构</h2>
<p><a href="https://zhuanlan.zhihu.com/p/137368446" target="_blank" rel="noopener noreferrer">分库分表相关<ExternalLinkIcon/></a></p>
<p>（这里介绍一点最简单的）</p>
<ul>
<li>将字段很多的表分解成多个表</li>
</ul>
<p>对于字段比较多的表，如果有些字段的使用频率很低，可以将这些字段分离出来形成新表。因为当一个表的数据量很大时，会由于使用频率低的字段的存在而变慢。</p>
<ul>
<li>增加中间表（但是破坏了数据库范式）</li>
</ul>
<p>对于需要经常联合查询的表，可以建立中间表以提高查询效率。通过建立中间表，把需要经常联合查询的数据插入到中间表中，然后将原来的联合查询改为对中间表的查询，以此来提高查询效率。</p>
<h2 id="分页相关" tabindex="-1"><a class="header-anchor" href="#分页相关" aria-hidden="true">#</a> 分页相关</h2>
<p>在系统中需要分页的操作通常会使用limit加上偏移量的方法实现，同时加上合适的order by 子句。如果有对应的索引，通常效率会不错，否则MySQL需要做大量的<strong>文件排序</strong>操作。</p>
<p>一个非常令人头疼问题就是当偏移量非常大的时候，</p>
<p>例如可能是limit 10000,20这样的查询，这是mysql需要查询10020条然后只返回最后20条，前面的10000条记录都将被舍弃，这样的代价很高。</p>
<p>优化此类查询的一个最简单的方法是尽可能的使用<strong>索引覆盖扫描</strong>，而不是查询所有的列。然后根据需要做一次关联操作再返回所需的列。对于偏移量很大的时候这样做的效率会得到很大提升。</p>
<p>对于下面的查询：
select id,title from collect limit 90000,10;
该语句存在的最大问题在于limit M,N中偏移量M太大（我们暂不考虑筛选字段上要不要添加索引的影响），导致每次查询都要先从整个表中找到满足条件 的前M条记录，之后舍弃这M条记录并从第M+1条记录开始再依次找到N条满足条件的记录。</p>
<p>如果表非常大，且筛选字段没有合适的索引，且M特别大那么这样的代价是非常高的。</p>
<p>试想，<strong>如果我们下一次的查询能从前一次查询结束后标记的位置开始查找，找到满足条件的100条记录，并记下下一次查询应该开始的位置，以便于下一次查询能直接从该位置开始，这样就不必每次查询都先从整个表中先找到满足条件的前M条记录</strong>，舍弃，在从M+1开始再找到100条满足条件的记录了。</p>
<p>方法一：<strong>先查询出主键id值（或者直接带上id）</strong>
select id,title from collect where id&gt;=(select id from collect order by id limit 90000,1) limit 10;
原理：先查询出90000条数据对应的主键id的值，然后直接通过该id的值直接查询该id后面的数据。</p>
<p>方法二：<strong>关延迟联</strong>
如果这个表非常大，那么这个查询可以改写成如下的方式：
select news.id, news.description from news inner join (select id from news order by title limit 50000,5) as myNew using(id);
这里的“关延迟联”将大大提升查询的效率，它让MySQL扫描尽可能少的页面，获取需要的记录后再根据关联列回原表查询需要的所有列。这个技术也可以用在优化关联查询中的limit。</p>
<h2 id="其他小trick" tabindex="-1"><a class="header-anchor" href="#其他小trick" aria-hidden="true">#</a> 其他小trick</h2>
<ul>
<li><strong>小表驱动大表</strong></li>
</ul>
<p>。。。。。。</p>
<blockquote>
<p>参考文章https://tech.meituan.com/2014/06/30/mysql-index.html</p>
</blockquote>
</div></template>


