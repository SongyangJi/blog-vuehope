<template><div><p>本篇博客本着<strong>面向接口编程</strong>的思想，整理了Java集合类的接口设计UML图，
然后根据官方文档摘取了笔者觉得比较重要的API，这对增强Java集合类的整体认识无疑是很有帮助的。
不过，这样一篇整理+搬运的博客也仅仅是对笔者自己有帮助罢了。</p>
<h1 id="接口设计uml图" tabindex="-1"><a class="header-anchor" href="#接口设计uml图" aria-hidden="true">#</a> 接口设计UML图</h1>
<figure><img src="@source/posts/docs/Collection.png" alt="集合框架中的接口" tabindex="0" loading="lazy"><figcaption>集合框架中的接口</figcaption></figure>
<h1 id="迭代模式的实现" tabindex="-1"><a class="header-anchor" href="#迭代模式的实现" aria-hidden="true">#</a> 迭代模式的实现</h1>
<p>Java类库实现的 <strong>迭代器模式</strong>。</p>
<h2 id="迭代器-iterator" tabindex="-1"><a class="header-anchor" href="#迭代器-iterator" aria-hidden="true">#</a> 迭代器：<code v-pre>Iterator</code></h2>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>hasNext()</code>如果迭代具有更多元素，则返回 <code v-pre>true</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>next()</code>返回迭代中的下一个元素。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default void</code></td>
<td style="text-align:left"><code v-pre>remove()</code>从底层集合中删除此迭代器返回的最后一个元素（可选操作）。</td>
</tr>
</tbody>
</table>
<h2 id="可迭代对象-iterable" tabindex="-1"><a class="header-anchor" href="#可迭代对象-iterable" aria-hidden="true">#</a> 可迭代对象：<code v-pre>Iterable</code></h2>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>default void</code></td>
<td style="text-align:left"><code v-pre>forEach(Consumer&lt;? super T&gt; action)</code>对 <code v-pre>Iterable</code>的每个元素执行给定的操作，直到所有元素都被处理或动作引发异常。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Iterator&lt;T&gt;</code></td>
<td style="text-align:left"><code v-pre>iterator()</code>返回类型为 <code v-pre>T</code>元素的迭代器。</td>
</tr>
</tbody>
</table>
<h1 id="一元集合" tabindex="-1"><a class="header-anchor" href="#一元集合" aria-hidden="true">#</a> 一元集合</h1>
<p><code v-pre>Collection</code></p>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>add(E e)</code>确保此集合包含指定的元素（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>addAll(Collection&lt;? extends E&gt; c)</code>将指定集合中的所有元素添加到此集合（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>void</code></td>
<td style="text-align:left"><code v-pre>clear()</code>从此集合中删除所有元素（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>contains(Object o)</code>如果此集合包含指定的元素，则返回 <code v-pre>true</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>containsAll(Collection&lt;?&gt; c)</code>如果此集合包含指定 <code v-pre>集合</code>中的所有元素，则返回true。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>isEmpty()</code>如果此集合不包含元素，则返回 <code v-pre>true</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Iterator&lt;E&gt;</code></td>
<td style="text-align:left"><code v-pre>iterator()</code>返回此集合中的元素的迭代器。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>remove(Object o)</code>从该集合中删除指定元素的单个实例（如果存在）（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>removeAll(Collection&lt;?&gt; c)</code>删除指定集合中包含的所有此集合的元素（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>int</code></td>
<td style="text-align:left"><code v-pre>size()</code>返回此集合中的元素数。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Object[]</code></td>
<td style="text-align:left"><code v-pre>toArray()</code>返回一个包含此集合中所有元素的数组。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>&lt;T&gt; T[]</code></td>
<td style="text-align:left"><code v-pre>toArray(T[] a)</code>返回包含此集合中所有元素的数组; 返回的数组的运行时类型是指定数组的运行时类型。</td>
</tr>
</tbody>
</table>
<h2 id="线性集合" tabindex="-1"><a class="header-anchor" href="#线性集合" aria-hidden="true">#</a> 线性集合</h2>
<h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> <code v-pre>List</code></h3>
<p>拓展了Collection接口，所以只列出多出的方法。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>void</code></td>
<td style="text-align:left"><code v-pre>add(int index, E element)</code>将指定的元素插入此列表中的指定位置（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>get(int index)</code>返回此列表中指定位置的元素。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>int</code></td>
<td style="text-align:left"><code v-pre>indexOf(Object o)</code>返回此列表中指定元素的第一次出现的索引，如果此列表不包含元素，则返回-1。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>int</code></td>
<td style="text-align:left"><code v-pre>lastIndexOf(Object o)</code>返回此列表中指定元素的最后一次出现的索引，如果此列表不包含元素，则返回-1。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>remove(int index)</code>删除该列表中指定位置的元素（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>set(int index, E element)</code>用指定的元素（可选操作）替换此列表中指定位置的元素。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default void</code></td>
<td style="text-align:left"><code v-pre>sort(Comparator&lt;? super E&gt; c)</code>使用随附的 <code v-pre>Comparator</code>排序此列表来比较元素。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>List&lt;E&gt;</code></td>
<td style="text-align:left"><code v-pre>subList(int fromIndex, int toIndex)</code>返回此列表中指定的 <code v-pre>fromIndex</code> （含）和 <code v-pre>toIndex</code>之间的视图。</td>
</tr>
</tbody>
</table>
<h3 id="queue" tabindex="-1"><a class="header-anchor" href="#queue" aria-hidden="true">#</a> <code v-pre>Queue</code></h3>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>add(E e)</code>将指定的元素插入到此队列中，如果可以立即执行此操作，而不会违反容量限制， <code v-pre>true</code>在成功后返回 <code v-pre>IllegalStateException</code>如果当前没有可用空间，则抛出IllegalStateException。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>offer(E e)</code>如果在不违反容量限制的情况下立即执行，则将指定的元素插入到此队列中。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>remove()</code>检索并删除此队列的头。如果队列对空，抛出异常NoSuchElementException。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>poll()</code>检索并删除此队列的头，如果此队列为空，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>element()</code>检索但不删除这个队列的头。如果队列为空，抛出异常NoSuchElementException。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>peek()</code>检索但不删除此队列的头，如果此队列为空，则返回 <code v-pre>null</code> 。</td>
</tr>
</tbody>
</table>
<p>要注意这三对方法的差别。</p>
<h3 id="deque" tabindex="-1"><a class="header-anchor" href="#deque" aria-hidden="true">#</a> <code v-pre>Deque</code></h3>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>void</code></td>
<td style="text-align:left"><code v-pre>addFirst(E e)</code>插入此双端队列的前面，如果它是立即可行且不会违反容量限制，抛出一个指定的元素 <code v-pre>IllegalStateException</code>如果当前没有空间可用。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>void</code></td>
<td style="text-align:left"><code v-pre>addLast(E e)</code>在插入如果它是立即可行且不会违反容量限制，抛出此双端队列的末尾指定元素 <code v-pre>IllegalStateException</code>如果当前没有空间可用。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>offerFirst(E e)</code>在此deque的前面插入指定的元素，除非它会违反容量限制。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>offerLast(E e)</code>在此deque的末尾插入指定的元素，除非它会违反容量限制。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>getFirst()</code>检索，但不删除，这个deque的第一个元素。如果为空，抛出抛出异常NoSuchElementException。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>getLast()</code>检索，但不删除，这个deque的最后一个元素。如果为空，抛出抛出异常NoSuchElementException。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>peekFirst()</code>检索，但不删除，此deque的第一个元素，或返回 <code v-pre>null</code>如果这个deque是空的。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>peekLast()</code>检索但不删除此deque的最后一个元素，如果此deque为空，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>removeFirst()</code>检索并删除此deque的第一个元素。如果为空，抛出抛出异常NoSuchElementException</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>removeLast()</code>检索并删除此deque的最后一个元素。如果为空，抛出抛出异常NoSuchElementException</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>pollFirst()</code>检索并删除此deque的第一个元素，如果此deque为空，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>pollLast()</code>检索并删除此deque的最后一个元素，如果此deque为空，则返回 <code v-pre>null</code> 。</td>
</tr>
</tbody>
</table>
<p>和Queue的方法几乎一致，主要是双端队列在两端都可以进出。
所以，在各方法后面加上了 First、Last修饰（事实上，还有缺省First、Last的方法，但是考虑到会引起歧义，所以干脆不用）。</p>
<p><code v-pre>Deque</code>接口实际上既可以作为Queue，也可以作为Stack来使用。</p>
<p>push、pop是针对栈而言的。</p>
<p>offer、poll是针对队列而言的。</p>
<p>其中 jdk的设计是，push、pop实际上都是对队列的第一个元素的操作。</p>
<p>offer向队尾加入元素，poll从队首移除元素。</p>
<h2 id="唯一性集合" tabindex="-1"><a class="header-anchor" href="#唯一性集合" aria-hidden="true">#</a> 唯一性集合</h2>
<h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> <code v-pre>Set</code></h3>
<p>Set接口与之相同（仅仅是接口定义约束的不同），略去。</p>
<h3 id="sortedset" tabindex="-1"><a class="header-anchor" href="#sortedset" aria-hidden="true">#</a> <code v-pre>SortedSet</code></h3>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>first()</code>返回此集合中当前的第一个（最低）元素。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>last()</code>返回此集合中当前的最后（最高）元素。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>SortedSet&lt;E&gt;</code></td>
<td style="text-align:left"><code v-pre>headSet(E toElement)</code>返回该集合的部分的视图，其元素严格小于 <code v-pre>toElement</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>SortedSet&lt;E&gt;</code></td>
<td style="text-align:left"><code v-pre>tailSet(E fromElement)</code>返回此组件的元素大于或等于 <code v-pre>fromElement</code>的部分的视图。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>SortedSet&lt;E&gt;</code></td>
<td style="text-align:left"><code v-pre>subSet(E fromElement, E toElement)</code>返回该集合的部分的视图，其元素的范围为 <code v-pre>fromElement</code> （含），为 <code v-pre>toElement</code> ，独占。</td>
</tr>
</tbody>
</table>
<h3 id="navigableset" tabindex="-1"><a class="header-anchor" href="#navigableset" aria-hidden="true">#</a> <code v-pre>NavigableSet</code></h3>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>ceiling(E e)</code>返回此集合中最小元素大于或等于给定元素，如果没有此元素则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>floor(E e)</code>返回该集合中最大的元素小于或等于给定元素，如果没有这样的元素，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>higher(E e)</code>返回这个集合中的最小元素严格大于给定的元素，如果没有这样的元素，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>lower(E e)</code>返回该集合中最大的元素严格小于给定的元素，如果没有这样的元素，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>pollFirst()</code>检索并删除第一个（最低）元素，如果此集合为空，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>E</code></td>
<td style="text-align:left"><code v-pre>pollLast()</code>检索并删除最后一个（最高）元素，如果此集合为空，则返回 <code v-pre>null</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Iterator&lt;E&gt;</code></td>
<td style="text-align:left"><code v-pre>iterator()</code>以升序返回此集合中的元素的迭代器。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Iterator&lt;E&gt;</code></td>
<td style="text-align:left"><code v-pre>descendingIterator()</code>以降序返回该集合中的元素的迭代器。</td>
</tr>
</tbody>
</table>
<h1 id="二元集合-映射" tabindex="-1"><a class="header-anchor" href="#二元集合-映射" aria-hidden="true">#</a> 二元集合（映射）</h1>
<h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> <code v-pre>Map</code></h2>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>containsKey(Object key)</code>如果此映射包含指定键的映射，则返回 <code v-pre>true</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>containsValue(Object value)</code>如果此地图将一个或多个键映射到指定的值，则返回 <code v-pre>true</code> 。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Set&lt;K&gt;</code></td>
<td style="text-align:left"><code v-pre>keySet()</code>返回此地图中包含的键的视图。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Collection&lt;V&gt;</code></td>
<td style="text-align:left"><code v-pre>values()</code>返回此地图中包含的值的视图。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>Set&lt;Map.Entry&lt;K,V&gt;&gt;</code></td>
<td style="text-align:left"><code v-pre>entrySet()</code>返回此地图中包含的映射的视图。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>V</code></td>
<td style="text-align:left"><code v-pre>get(Object key)</code>返回到指定键所映射的值，或 <code v-pre>null</code>如果此映射包含该键的映射。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default V</code></td>
<td style="text-align:left"><code v-pre>getOrDefault(Object key, V defaultValue)</code>返回到指定键所映射的值，或 <code v-pre>defaultValue</code>如果此映射包含该键的映射。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>V</code></td>
<td style="text-align:left"><code v-pre>put(K key, V value)</code>将指定的值与该映射中的指定键相关联（可选操作）。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default V</code></td>
<td style="text-align:left"><code v-pre>putIfAbsent(K key, V value)</code>如果指定的键尚未与某个值相关联（或映射到 <code v-pre>null</code> ）将其与给定值相关联并返回 <code v-pre>null</code> ，否则返回当前值。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default V</code></td>
<td style="text-align:left"><code v-pre>replace(K key, V value)</code>只有当目标映射到某个值时，才能替换指定键的条目。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default boolean</code></td>
<td style="text-align:left"><code v-pre>replace(K key, V oldValue, V newValue)</code>仅当前映射到指定的值时，才能替换指定键的条目。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>V</code></td>
<td style="text-align:left"><code v-pre>remove(Object key)</code>如果存在（从可选的操作），从该地图中删除一个键的映射。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default boolean</code></td>
<td style="text-align:left"><code v-pre>remove(Object key, Object value)</code>仅当指定的密钥当前映射到指定的值时删除该条目。</td>
</tr>
</tbody>
</table>
<p>需要注意 replace 和 putIfAbsent 的区别。</p>
<h2 id="map-entry" tabindex="-1"><a class="header-anchor" href="#map-entry" aria-hidden="true">#</a> <code v-pre>Map.Entry</code></h2>
<p>它的角色类似于迭代器的角色，不过是二元的。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Modifier and Type</th>
<th style="text-align:left">Method and Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>K</code></td>
<td style="text-align:left"><code v-pre>getKey()</code>返回与此条目相对应的键。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>V</code></td>
<td style="text-align:left"><code v-pre>getValue()</code>返回与此条目相对应的值。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>V</code></td>
<td style="text-align:left"><code v-pre>setValue(V value)</code>用指定的值替换与该条目相对应的值（可选操作）。</td>
</tr>
</tbody>
</table>
<blockquote>
<p>参考资料</p>
<p><a href="https://docs.oracle.com/javase/8/docs/api/" target="_blank" rel="noopener noreferrer">Overview (Java Platform SE 8 <ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


