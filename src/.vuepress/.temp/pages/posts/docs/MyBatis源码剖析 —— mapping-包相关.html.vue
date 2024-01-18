<template><div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>mapping</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">MappedStatement</span> <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> resource<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Configuration</span> configuration<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Integer</span> fetchSize<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Integer</span> timeout<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">StatementType</span> statementType<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">ResultSetType</span> resultSetType<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">SqlSource</span> sqlSource<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Cache</span> cache<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">ParameterMap</span> parameterMap<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ResultMap</span><span class="token punctuation">></span></span> resultMaps<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">boolean</span> flushCacheRequired<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">boolean</span> useCache<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">boolean</span> resultOrdered<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">SqlCommandType</span> sqlCommandType<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">KeyGenerator</span> keyGenerator<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyProperties<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyColumns<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">boolean</span> hasNestedResultMaps<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> databaseId<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Log</span> statementLog<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">LanguageDriver</span> lang<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> resultSets<span class="token punctuation">;</span>

  <span class="token class-name">MappedStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// constructor disabled</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">MappedStatement</span> mappedStatement <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MappedStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span><span class="token punctuation">(</span><span class="token class-name">Configuration</span> configuration<span class="token punctuation">,</span> <span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">SqlSource</span> sqlSource<span class="token punctuation">,</span> <span class="token class-name">SqlCommandType</span> sqlCommandType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>configuration <span class="token operator">=</span> configuration<span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>sqlSource <span class="token operator">=</span> sqlSource<span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>statementType <span class="token operator">=</span> <span class="token class-name">StatementType</span><span class="token punctuation">.</span><span class="token constant">PREPARED</span><span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>resultSetType <span class="token operator">=</span> <span class="token class-name">ResultSetType</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>parameterMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ParameterMap<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span>configuration<span class="token punctuation">,</span> <span class="token string">"defaultParameterMap"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>resultMaps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>sqlCommandType <span class="token operator">=</span> sqlCommandType<span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>keyGenerator <span class="token operator">=</span> configuration<span class="token punctuation">.</span><span class="token function">isUseGeneratedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">SqlCommandType</span><span class="token punctuation">.</span><span class="token constant">INSERT</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>sqlCommandType<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token class-name">Jdbc3KeyGenerator</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span> <span class="token operator">:</span> <span class="token class-name">NoKeyGenerator</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
      <span class="token class-name">String</span> logId <span class="token operator">=</span> id<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>configuration<span class="token punctuation">.</span><span class="token function">getLogPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        logId <span class="token operator">=</span> configuration<span class="token punctuation">.</span><span class="token function">getLogPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      mappedStatement<span class="token punctuation">.</span>statementLog <span class="token operator">=</span> <span class="token class-name">LogFactory</span><span class="token punctuation">.</span><span class="token function">getLog</span><span class="token punctuation">(</span>logId<span class="token punctuation">)</span><span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>lang <span class="token operator">=</span> configuration<span class="token punctuation">.</span><span class="token function">getDefaultScriptingLanguageInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">resource</span><span class="token punctuation">(</span><span class="token class-name">String</span> resource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>resource <span class="token operator">=</span> resource<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mappedStatement<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">parameterMap</span><span class="token punctuation">(</span><span class="token class-name">ParameterMap</span> parameterMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>parameterMap <span class="token operator">=</span> parameterMap<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">resultMaps</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ResultMap</span><span class="token punctuation">></span></span> resultMaps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>resultMaps <span class="token operator">=</span> resultMaps<span class="token punctuation">;</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ResultMap</span> resultMap <span class="token operator">:</span> resultMaps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mappedStatement<span class="token punctuation">.</span>hasNestedResultMaps <span class="token operator">=</span> mappedStatement<span class="token punctuation">.</span>hasNestedResultMaps <span class="token operator">||</span> resultMap<span class="token punctuation">.</span><span class="token function">hasNestedResultMaps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">fetchSize</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> fetchSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>fetchSize <span class="token operator">=</span> fetchSize<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>timeout <span class="token operator">=</span> timeout<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">statementType</span><span class="token punctuation">(</span><span class="token class-name">StatementType</span> statementType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>statementType <span class="token operator">=</span> statementType<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">resultSetType</span><span class="token punctuation">(</span><span class="token class-name">ResultSetType</span> resultSetType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>resultSetType <span class="token operator">=</span> resultSetType <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token class-name">ResultSetType</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span> <span class="token operator">:</span> resultSetType<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">cache</span><span class="token punctuation">(</span><span class="token class-name">Cache</span> cache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>cache <span class="token operator">=</span> cache<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">flushCacheRequired</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> flushCacheRequired<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>flushCacheRequired <span class="token operator">=</span> flushCacheRequired<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">useCache</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> useCache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>useCache <span class="token operator">=</span> useCache<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">resultOrdered</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> resultOrdered<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>resultOrdered <span class="token operator">=</span> resultOrdered<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">keyGenerator</span><span class="token punctuation">(</span><span class="token class-name">KeyGenerator</span> keyGenerator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>keyGenerator <span class="token operator">=</span> keyGenerator<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">keyProperty</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyProperty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>keyProperties <span class="token operator">=</span> <span class="token function">delimitedStringToArray</span><span class="token punctuation">(</span>keyProperty<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">keyColumn</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyColumn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>keyColumns <span class="token operator">=</span> <span class="token function">delimitedStringToArray</span><span class="token punctuation">(</span>keyColumn<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">databaseId</span><span class="token punctuation">(</span><span class="token class-name">String</span> databaseId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>databaseId <span class="token operator">=</span> databaseId<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">lang</span><span class="token punctuation">(</span><span class="token class-name">LanguageDriver</span> driver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>lang <span class="token operator">=</span> driver<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">resultSets</span><span class="token punctuation">(</span><span class="token class-name">String</span> resultSet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>resultSets <span class="token operator">=</span> <span class="token function">delimitedStringToArray</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Resul sets.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">resultSet</span>
     *          the result set
     * <span class="token keyword">@return</span> the builder
     * <span class="token keyword">@deprecated</span> Use <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">resultSets</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">resulSets</span><span class="token punctuation">(</span><span class="token class-name">String</span> resultSet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      mappedStatement<span class="token punctuation">.</span>resultSets <span class="token operator">=</span> <span class="token function">delimitedStringToArray</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">MappedStatement</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">assert</span> mappedStatement<span class="token punctuation">.</span>configuration <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">assert</span> mappedStatement<span class="token punctuation">.</span>id <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">assert</span> mappedStatement<span class="token punctuation">.</span>sqlSource <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">assert</span> mappedStatement<span class="token punctuation">.</span>lang <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      mappedStatement<span class="token punctuation">.</span>resultMaps <span class="token operator">=</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">unmodifiableList</span><span class="token punctuation">(</span>mappedStatement<span class="token punctuation">.</span>resultMaps<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> mappedStatement<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">KeyGenerator</span> <span class="token function">getKeyGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> keyGenerator<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">SqlCommandType</span> <span class="token function">getSqlCommandType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sqlCommandType<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> resource<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Configuration</span> <span class="token function">getConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> configuration<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> id<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNestedResultMaps</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> hasNestedResultMaps<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getFetchSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> fetchSize<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> timeout<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">StatementType</span> <span class="token function">getStatementType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> statementType<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">ResultSetType</span> <span class="token function">getResultSetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> resultSetType<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">SqlSource</span> <span class="token function">getSqlSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sqlSource<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">ParameterMap</span> <span class="token function">getParameterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> parameterMap<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ResultMap</span><span class="token punctuation">></span></span> <span class="token function">getResultMaps</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> resultMaps<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Cache</span> <span class="token function">getCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cache<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isFlushCacheRequired</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> flushCacheRequired<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isUseCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> useCache<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isResultOrdered</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> resultOrdered<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDatabaseId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> databaseId<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getKeyProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> keyProperties<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getKeyColumns</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> keyColumns<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Log</span> <span class="token function">getStatementLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> statementLog<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">LanguageDriver</span> <span class="token function">getLang</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> lang<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getResultSets</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> resultSets<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Gets the resul sets.
   *
   * <span class="token keyword">@return</span> the resul sets
   * <span class="token keyword">@deprecated</span> Use <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">getResultSets</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>
   */</span>
  <span class="token annotation punctuation">@Deprecated</span>
  <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getResulSets</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> resultSets<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">BoundSql</span> <span class="token function">getBoundSql</span><span class="token punctuation">(</span><span class="token class-name">Object</span> parameterObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BoundSql</span> boundSql <span class="token operator">=</span> sqlSource<span class="token punctuation">.</span><span class="token function">getBoundSql</span><span class="token punctuation">(</span>parameterObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ParameterMapping</span><span class="token punctuation">></span></span> parameterMappings <span class="token operator">=</span> boundSql<span class="token punctuation">.</span><span class="token function">getParameterMappings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>parameterMappings <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> parameterMappings<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      boundSql <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BoundSql</span><span class="token punctuation">(</span>configuration<span class="token punctuation">,</span> boundSql<span class="token punctuation">.</span><span class="token function">getSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> parameterMap<span class="token punctuation">.</span><span class="token function">getParameterMappings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> parameterObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// check for nested result maps in parameter mappings (issue #30)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ParameterMapping</span> pm <span class="token operator">:</span> boundSql<span class="token punctuation">.</span><span class="token function">getParameterMappings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">String</span> rmId <span class="token operator">=</span> pm<span class="token punctuation">.</span><span class="token function">getResultMapId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>rmId <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ResultMap</span> rm <span class="token operator">=</span> configuration<span class="token punctuation">.</span><span class="token function">getResultMap</span><span class="token punctuation">(</span>rmId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rm <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          hasNestedResultMaps <span class="token operator">|=</span> rm<span class="token punctuation">.</span><span class="token function">hasNestedResultMaps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> boundSql<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">delimitedStringToArray</span><span class="token punctuation">(</span><span class="token class-name">String</span> in<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>in <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> in<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> in<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


