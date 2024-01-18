export const data = JSON.parse("{\"key\":\"v-ff87d94c\",\"path\":\"/posts/docs/%E3%80%8A%E5%88%B7%E9%A2%98%E2%80%94%E2%80%94%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E3%80%8B.html\",\"title\":\"《刷题——动态规划》\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"《刷题——动态规划》\",\"date\":\"2023-01-01T02:51:04.000Z\",\"categories\":\"算法题\",\"tags\":null,\"description\":\"DP 最长公共子串 import java.util.*; public class Solution { /** * longest common substring * @param str1 string字符串 the string * @param str2 string字符串 the string * @return string字符串 */ int N = 5010; public String LCS (String str1, String str2) { // write code here int[][] f = new int[N][N]; // String ans = null; char[] s1 = str1.toCharArray(); char[] s2 = str2.toCharArray(); int maxLen = 0; int l1 = 0, l2 = 0, n1 = s1.length, n2 = s2.length; for(int i = 1; i &lt;= n1; i++) { for(int j = 1; j &lt;= n2; j++) { if(s1[i - 1] == s2[j - 1]) { f[i][j] = f[i-1][j-1] + 1; if(f[i][j] &gt; maxLen) { maxLen = f[i][j]; l1 = i - maxLen; } } else { f[i][j] = 0; // 子串其实更简单 } /* if(text1[i] == text2[j]) { a[i][j] = a[i-1][j-1] + 1; } else { a[i][j] = max(a[i-1][j], a[i][j-1]); } */ } } ans = str1.substring(l1, l1 + maxLen); return ans; } }\"},\"headers\":[{\"level\":2,\"title\":\"DP\",\"slug\":\"dp\",\"link\":\"#dp\",\"children\":[{\"level\":3,\"title\":\"最长公共子串\",\"slug\":\"最长公共子串\",\"link\":\"#最长公共子串\",\"children\":[]},{\"level\":3,\"title\":\"LCS（最长公共子序列）\",\"slug\":\"lcs-最长公共子序列\",\"link\":\"#lcs-最长公共子序列\",\"children\":[]},{\"level\":3,\"title\":\"编辑距离（LCS变种）\",\"slug\":\"编辑距离-lcs变种\",\"link\":\"#编辑距离-lcs变种\",\"children\":[]},{\"level\":3,\"title\":\"扔鸡蛋\",\"slug\":\"扔鸡蛋\",\"link\":\"#扔鸡蛋\",\"children\":[]},{\"level\":3,\"title\":\"NC122 正则表达式匹配\",\"slug\":\"nc122-正则表达式匹配\",\"link\":\"#nc122-正则表达式匹配\",\"children\":[]},{\"level\":3,\"title\":\"NC44通配符匹配\",\"slug\":\"nc44通配符匹配\",\"link\":\"#nc44通配符匹配\",\"children\":[]},{\"level\":3,\"title\":\"NC134 买卖股票的最好时机(二)\",\"slug\":\"nc134-买卖股票的最好时机-二\",\"link\":\"#nc134-买卖股票的最好时机-二\",\"children\":[]},{\"level\":3,\"title\":\"NC135 买卖股票的最好时机(三)\",\"slug\":\"nc135-买卖股票的最好时机-三\",\"link\":\"#nc135-买卖股票的最好时机-三\",\"children\":[]},{\"level\":3,\"title\":\"NC167 买卖股票的最好时机(四)\",\"slug\":\"nc167-买卖股票的最好时机-四\",\"link\":\"#nc167-买卖股票的最好时机-四\",\"children\":[]},{\"level\":3,\"title\":\"NC173 填充数组\",\"slug\":\"nc173-填充数组\",\"link\":\"#nc173-填充数组\",\"children\":[]},{\"level\":3,\"title\":\"NC178 打家劫舍(三)\",\"slug\":\"nc178-打家劫舍-三\",\"link\":\"#nc178-打家劫舍-三\",\"children\":[]},{\"level\":3,\"title\":\"NC187 压缩字符串(二)\",\"slug\":\"nc187-压缩字符串-二\",\"link\":\"#nc187-压缩字符串-二\",\"children\":[]},{\"level\":3,\"title\":\"二叉树中的最大路径和\",\"slug\":\"二叉树中的最大路径和\",\"link\":\"#二叉树中的最大路径和\",\"children\":[]},{\"level\":3,\"title\":\"拼成金额的最小硬币数（完全背包）\",\"slug\":\"拼成金额的最小硬币数-完全背包\",\"link\":\"#拼成金额的最小硬币数-完全背包\",\"children\":[]},{\"level\":3,\"title\":\"最大正方形\",\"slug\":\"最大正方形\",\"link\":\"#最大正方形\",\"children\":[]},{\"level\":3,\"title\":\"三角形最小路径和\",\"slug\":\"三角形最小路径和\",\"link\":\"#三角形最小路径和\",\"children\":[]},{\"level\":3,\"title\":\"合法的括号字符串\",\"slug\":\"合法的括号字符串\",\"link\":\"#合法的括号字符串\",\"children\":[]},{\"level\":3,\"title\":\"NC176 打家劫舍(一)\",\"slug\":\"nc176-打家劫舍-一\",\"link\":\"#nc176-打家劫舍-一\",\"children\":[]},{\"level\":3,\"title\":\"NC177 打家劫舍(二)\",\"slug\":\"nc177-打家劫舍-二\",\"link\":\"#nc177-打家劫舍-二\",\"children\":[]},{\"level\":3,\"title\":\"NC243 目标和\",\"slug\":\"nc243-目标和\",\"link\":\"#nc243-目标和\",\"children\":[]},{\"level\":3,\"title\":\"最长公共子数组\",\"slug\":\"最长公共子数组\",\"link\":\"#最长公共子数组\",\"children\":[]},{\"level\":3,\"title\":\"NC181 单词拆分(一)\",\"slug\":\"nc181-单词拆分-一\",\"link\":\"#nc181-单词拆分-一\",\"children\":[]},{\"level\":3,\"title\":\"NC83 连续子数组的最大乘积\",\"slug\":\"nc83-连续子数组的最大乘积\",\"link\":\"#nc83-连续子数组的最大乘积\",\"children\":[]},{\"level\":3,\"title\":\"NC138 矩阵最长递增路径\",\"slug\":\"nc138-矩阵最长递增路径\",\"link\":\"#nc138-矩阵最长递增路径\",\"children\":[]}]}],\"readingTime\":{\"minutes\":23.85,\"words\":7155},\"filePathRelative\":\"posts/docs/《刷题——动态规划》.md\",\"localizedDate\":\"2023年1月1日\",\"excerpt\":\"<h2> DP</h2>\\n<h3> 最长公共子串</h3>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token keyword\\\">import</span> <span class=\\\"token import\\\"><span class=\\\"token namespace\\\">java<span class=\\\"token punctuation\\\">.</span>util<span class=\\\"token punctuation\\\">.</span></span><span class=\\\"token operator\\\">*</span></span><span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">Solution</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token doc-comment comment\\\">/**\\n     * longest common substring\\n     * <span class=\\\"token keyword\\\">@param</span> <span class=\\\"token parameter\\\">str1</span> string字符串 the string\\n     * <span class=\\\"token keyword\\\">@param</span> <span class=\\\"token parameter\\\">str2</span> string字符串 the string\\n     * <span class=\\\"token keyword\\\">@return</span> string字符串\\n     */</span>\\n    <span class=\\\"token keyword\\\">int</span> <span class=\\\"token class-name\\\">N</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">5010</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token class-name\\\">String</span> <span class=\\\"token constant\\\">LCS</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">String</span> str1<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token class-name\\\">String</span> str2<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token comment\\\">// write code here</span>\\n        <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> f <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">N</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token class-name\\\">N</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// </span>\\n        <span class=\\\"token class-name\\\">String</span> ans <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">null</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">char</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> s1 <span class=\\\"token operator\\\">=</span> str1<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">toCharArray</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">char</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> s2 <span class=\\\"token operator\\\">=</span> str2<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">toCharArray</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">int</span> maxLen <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">int</span> l1 <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">,</span> l2 <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">,</span> n1 <span class=\\\"token operator\\\">=</span> s1<span class=\\\"token punctuation\\\">.</span>length<span class=\\\"token punctuation\\\">,</span> n2 <span class=\\\"token operator\\\">=</span> s2<span class=\\\"token punctuation\\\">.</span>length<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&lt;=</span> n1<span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">for</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> j <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span> j <span class=\\\"token operator\\\">&lt;=</span> n2<span class=\\\"token punctuation\\\">;</span> j<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>s1<span class=\\\"token punctuation\\\">[</span>i <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">==</span> s2<span class=\\\"token punctuation\\\">[</span>j <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                    f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token operator\\\">-</span><span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n                    \\n                    <span class=\\\"token keyword\\\">if</span><span class=\\\"token punctuation\\\">(</span>f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">&gt;</span> maxLen<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                        maxLen <span class=\\\"token operator\\\">=</span> f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n                        l1 <span class=\\\"token operator\\\">=</span> i <span class=\\\"token operator\\\">-</span> maxLen<span class=\\\"token punctuation\\\">;</span> \\n                    <span class=\\\"token punctuation\\\">}</span>\\n                <span class=\\\"token punctuation\\\">}</span> <span class=\\\"token keyword\\\">else</span> <span class=\\\"token punctuation\\\">{</span>\\n                    f<span class=\\\"token punctuation\\\">[</span>i<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">[</span>j<span class=\\\"token punctuation\\\">]</span> <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 子串其实更简单</span>\\n                <span class=\\\"token punctuation\\\">}</span>\\n                <span class=\\\"token comment\\\">/*\\n                if(text1[i] == text2[j]) {\\n                    a[i][j] = a[i-1][j-1] + 1;\\n                } else {\\n                    a[i][j] = max(a[i-1][j], a[i][j-1]);\\n                }\\n                */</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n\\n        ans <span class=\\\"token operator\\\">=</span> str1<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">substring</span><span class=\\\"token punctuation\\\">(</span>l1<span class=\\\"token punctuation\\\">,</span> l1 <span class=\\\"token operator\\\">+</span> maxLen<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">return</span> ans<span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
