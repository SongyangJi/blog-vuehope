<template><div><h1 id="c-实现" tabindex="-1"><a class="header-anchor" href="#c-实现" aria-hidden="true">#</a> C++实现</h1>
<p>采用 <code v-pre>right</code>、<code v-pre>down</code>指针的方法，维护前驱与后继、上层与下层的节点之间的关系。</p>
<p><strong>缺点</strong>：每个节点都要存储真实的数据，增加了不必要的开销。</p>
<p>(<s>另外，我的代码实现有点冗余，其实可以把查找节点抽象一个方法出来。</s> )</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector></span></span>
<span class="token keyword">using</span> std<span class="token double-colon punctuation">::</span>vector<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">SkipList</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token comment">// 最高层数为32层</span>
    <span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token keyword">int</span> MAX_LEVELS <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>

    <span class="token keyword">struct</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token comment">// 真实数据</span>
        <span class="token keyword">int</span> val<span class="token punctuation">;</span>
        <span class="token comment">// 向右走、向下走的指针</span>
        Node <span class="token operator">*</span>right<span class="token punctuation">,</span> <span class="token operator">*</span>down<span class="token punctuation">;</span>

        <span class="token keyword">explicit</span> <span class="token function">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> val <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> Node <span class="token operator">*</span>right <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">,</span> Node <span class="token operator">*</span>down <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">val</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">right</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">down</span><span class="token punctuation">(</span>down<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 哑结点</span>
    Node <span class="token operator">*</span>head <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>

    <span class="token comment">// 模拟抛硬币</span>
    <span class="token keyword">static</span> <span class="token keyword">bool</span> <span class="token function">getRand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">SkipList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 哑结点初始化MAX层，next指针都为空，head是最上面的节点</span>
        <span class="token comment">// 哑结点不存储任何真实数据，仅仅是为了代码实现方便罢了</span>
        Node <span class="token operator">*</span>down <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">,</span> <span class="token operator">*</span>up<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> MAX_LEVELS<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            up <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Node</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">nullptr</span><span class="token punctuation">,</span> down<span class="token punctuation">)</span><span class="token punctuation">;</span>
            down <span class="token operator">=</span> up<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        head <span class="token operator">=</span> up<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 查找某个元素是否存在</span>
    <span class="token keyword">bool</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 从左上角出发</span>
        Node <span class="token operator">*</span>node <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//先向右移，再向下移</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-></span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 此时  node.val &lt; target &lt; node.val, 通过“跳跃”的方式快速缩小了范围</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> node<span class="token operator">-></span>right<span class="token operator">-></span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    node <span class="token operator">=</span> node<span class="token operator">-></span>down<span class="token punctuation">;</span>
                    <span class="token comment">// 找到了   </span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">==</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token comment">// 继续往右走    </span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    node <span class="token operator">=</span> node<span class="token operator">-></span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 右面没有节点了，只能往下走才可能找到    </span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                node <span class="token operator">=</span> node<span class="token operator">-></span>down<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 这里的新增节点，是允许重复值的；如果是Set的话，可以先查找出目标 node ，如果 node.val ==  num , 就不要重复插入了</span>
    <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 其实是一个栈，用来存储搜索路径中的节点(前驱)，</span>
        <span class="token comment">// 因为最后要根据新节点的层数往上层增加节点，就必须知道它的前驱</span>
        vector<span class="token operator">&lt;</span>Node <span class="token operator">*</span><span class="token operator">></span> downs<span class="token punctuation">;</span>
        <span class="token comment">// 从顶部开始搜索。</span>
        Node <span class="token operator">*</span>node <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 一直往右走，直到右边没有节点，或者右边节点的值大于 num</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>node<span class="token operator">-></span>right <span class="token operator">&amp;&amp;</span> node<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">&lt;=</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                node <span class="token operator">=</span> node<span class="token operator">-></span>right<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//找到这一层的找到要插入的位置的前驱, 入栈</span>
            downs<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 往下走，直到最底层</span>
            node <span class="token operator">=</span> node<span class="token operator">-></span>down<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 这时候已经到了最底层</span>
        <span class="token comment">// 从后向前根据“抛硬币的节点”依次在每一层的前驱后面插入节点;</span>
        <span class="token keyword">int</span> pos <span class="token operator">=</span> downs<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        Node <span class="token operator">*</span>dn <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">,</span> <span class="token operator">*</span>pre<span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            pre <span class="token operator">=</span> downs<span class="token punctuation">[</span>pos<span class="token operator">--</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// 新增节点存储值是 num （明显数据被重复存储了），后继是 pre->right ,前驱是 pre（其实就是链表的插入操作），注意</span>
            pre<span class="token operator">-></span>right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Node</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> pre<span class="token operator">-></span>right<span class="token punctuation">,</span> dn<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 这时的 pre->right 就是新增的节点。</span>
            dn <span class="token operator">=</span> pre<span class="token operator">-></span>right<span class="token punctuation">;</span>
            <span class="token comment">// 如果没有超出允许的 MAX_LEVELS 并且根据抛硬币的结果需要继续往上加，则继续  </span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>pos <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">getRand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 删除一个值,基本上与查找流程一致</span>
    <span class="token keyword">bool</span> <span class="token function">erase</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>node <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token comment">// 记录是否存在</span>
        <span class="token keyword">bool</span> exist <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-></span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 找到了目标值</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">==</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// del 即为要删除的节点</span>
                    Node <span class="token operator">*</span>del <span class="token operator">=</span> node<span class="token operator">-></span>right<span class="token punctuation">;</span>
                    <span class="token comment">// 链表的删除操作</span>
                    node<span class="token operator">-></span>right <span class="token operator">=</span> del<span class="token operator">-></span>right<span class="token punctuation">;</span>
                    <span class="token comment">// 注意我们是要把这个"柱子"从上向右全部删除的，所以还要往下走，继续走</span>
                    <span class="token comment">// node 是要删除的节点的前驱</span>
                    node <span class="token operator">=</span> node<span class="token operator">-></span>down<span class="token punctuation">;</span>
                    exist <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token keyword">delete</span> del<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">&lt;</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    node <span class="token operator">=</span> node<span class="token operator">-></span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    node <span class="token operator">=</span> node<span class="token operator">-></span>down<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                node <span class="token operator">=</span> node<span class="token operator">-></span>down<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> exist<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="力扣《设计跳表》" tabindex="-1"><a class="header-anchor" href="#力扣《设计跳表》" aria-hidden="true">#</a> 力扣《设计跳表》</h1>
<p>力扣上的一道题目，可以供你测试你的代码。
<a href="https://leetcode-cn.com/problems/design-skiplist/" target="_blank" rel="noopener noreferrer">设计跳表<ExternalLinkIcon/></a></p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token keyword">struct</span> <span class="token class-name">Node</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> val<span class="token punctuation">;</span>
    Node <span class="token operator">*</span>right<span class="token punctuation">,</span> <span class="token operator">*</span>down<span class="token punctuation">;</span>
    <span class="token function">Node</span><span class="token punctuation">(</span>Node<span class="token operator">*</span> _right<span class="token punctuation">,</span> Node<span class="token operator">*</span> _down<span class="token punctuation">,</span> <span class="token keyword">int</span> _val<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">right</span><span class="token punctuation">(</span>_right<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">down</span><span class="token punctuation">(</span>_down<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">val</span><span class="token punctuation">(</span>_val<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Skiplist</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    Node<span class="token operator">*</span> head<span class="token punctuation">;</span>
    vector<span class="token operator">&lt;</span>Node<span class="token operator">*</span><span class="token operator">></span> inserted<span class="token punctuation">;</span>
    <span class="token function">Skiplist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Node</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">bool</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">&lt;</span> target<span class="token punctuation">)</span> p <span class="token operator">=</span> p<span class="token operator">-></span>right<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">==</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>down<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        inserted<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">&lt;</span> num<span class="token punctuation">)</span> p <span class="token operator">=</span> p<span class="token operator">-></span>right<span class="token punctuation">;</span>
            inserted<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>down<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">bool</span> grow <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        Node<span class="token operator">*</span> downNode <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>grow <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>inserted<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            Node<span class="token operator">*</span> rightmost <span class="token operator">=</span> inserted<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> inserted<span class="token punctuation">.</span><span class="token function">pop_back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Node<span class="token operator">*</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Node</span><span class="token punctuation">(</span>rightmost<span class="token operator">-></span>right<span class="token punctuation">,</span> downNode<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>
            rightmost<span class="token operator">-></span>right <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
            downNode <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
            grow <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 不人为限制层数，层数极高的情况很稀疏；</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>grow<span class="token punctuation">)</span><span class="token punctuation">{</span>
            Node<span class="token operator">*</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Node</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> downNode<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>
            head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Node</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> head<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">bool</span> <span class="token function">erase</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Node <span class="token operator">*</span>p <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">bool</span> seen <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token operator">-></span>right <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">&lt;</span> num<span class="token punctuation">)</span> p <span class="token operator">=</span> p<span class="token operator">-></span>right<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>seen <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right <span class="token operator">&amp;&amp;</span> p<span class="token operator">-></span>right<span class="token operator">-></span>val <span class="token operator">==</span> num<span class="token punctuation">)</span> seen <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>seen<span class="token punctuation">)</span><span class="token punctuation">{</span>
                p<span class="token operator">-></span>right <span class="token operator">=</span> p<span class="token operator">-></span>right<span class="token operator">-></span>right<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p <span class="token operator">=</span> p<span class="token operator">-></span>down<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> seen<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Your Skiplist object will be instantiated and called as such:
 * Skiplist* obj = new Skiplist();
 * bool param_1 = obj->search(target);
 * obj->add(num);
 * bool param_3 = obj->erase(num);
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


