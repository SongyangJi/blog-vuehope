export const data = JSON.parse("{\"key\":\"v-80ba9366\",\"path\":\"/docs/%E3%80%8A%E5%88%B7%E9%A2%98%E2%80%94%E2%80%94%E4%BA%8C%E5%88%86%E3%80%8B.html\",\"title\":\"《刷题——二分》\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"《刷题——二分》\",\"date\":\"2023-01-09T04:27:52.000Z\",\"categories\":\"算法题\",\"tags\":null,\"description\":\"二分 两个有序数组找中位数 class Solution { public double findMedianSortedArrays(int[] nums1, int[] nums2) { int length1 = nums1.length, length2 = nums2.length; int totalLength = length1 + length2; if (totalLength % 2 == 1) { int midIndex = totalLength / 2; double median = getKthElement(nums1, nums2, midIndex + 1); return median; } else { int midIndex1 = totalLength / 2 - 1, midIndex2 = totalLength / 2; double median = (getKthElement(nums1, nums2, midIndex1 + 1) + getKthElement(nums1, nums2, midIndex2 + 1)) / 2.0; return median; } } public int getKthElement(int[] nums1, int[] nums2, int k) { /* 主要思路：要找到第 k (k&gt;1) 小的元素，那么就取 pivot1 = nums1[k/2-1] 和 pivot2 = nums2[k/2-1] 进行比较 * 这里的 \\\"/\\\" 表示整除 * nums1 中小于等于 pivot1 的元素有 nums1[0 .. k/2-2] 共计 k/2-1 个 * nums2 中小于等于 pivot2 的元素有 nums2[0 .. k/2-2] 共计 k/2-1 个 * 取 pivot = min(pivot1, pivot2)，两个数组中小于等于 pivot 的元素共计不会超过 (k/2-1) + (k/2-1) &lt;= k-2 个 * 这样 pivot 本身最大也只能是第 k-1 小的元素 * 如果 pivot = pivot1，那么 nums1[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \\\"删除\\\"，剩下的作为新的 nums1 数组 * 如果 pivot = pivot2，那么 nums2[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \\\"删除\\\"，剩下的作为新的 nums2 数组 * 由于我们 \\\"删除\\\" 了一些元素（这些元素都比第 k 小的元素要小），因此需要修改 k 的值，减去删除的数的个数 */ int length1 = nums1.length, length2 = nums2.length; int index1 = 0, index2 = 0; int kthElement = 0; while (true) { // 边界情况 if (index1 == length1) { return nums2[index2 + k - 1]; } if (index2 == length2) { return nums1[index1 + k - 1]; } if (k == 1) { return Math.min(nums1[index1], nums2[index2]); } // 正常情况 int half = k / 2; int newIndex1 = Math.min(index1 + half, length1) - 1; // notice - 1 int newIndex2 = Math.min(index2 + half, length2) - 1; int pivot1 = nums1[newIndex1], pivot2 = nums2[newIndex2]; if (pivot1 &lt;= pivot2) { k -= (newIndex1 - index1 + 1); index1 = newIndex1 + 1; } else { k -= (newIndex2 - index2 + 1); index2 = newIndex2 + 1; } } } }\"},\"headers\":[{\"level\":2,\"title\":\"二分\",\"slug\":\"二分\",\"link\":\"#二分\",\"children\":[{\"level\":3,\"title\":\"两个有序数组找中位数\",\"slug\":\"两个有序数组找中位数\",\"link\":\"#两个有序数组找中位数\",\"children\":[]},{\"level\":3,\"title\":\"搜索旋转排序数组\",\"slug\":\"搜索旋转排序数组\",\"link\":\"#搜索旋转排序数组\",\"children\":[]},{\"level\":3,\"title\":\"LIS（最长上升子序列）二分+贪心\",\"slug\":\"lis-最长上升子序列-二分-贪心\",\"link\":\"#lis-最长上升子序列-二分-贪心\",\"children\":[]},{\"level\":3,\"title\":\"寻找数组的峰值\",\"slug\":\"寻找数组的峰值\",\"link\":\"#寻找数组的峰值\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.58,\"words\":1375},\"filePathRelative\":\"docs/《刷题——二分》.md\",\"localizedDate\":\"2023年1月9日\",\"excerpt\":\"<h2> 二分</h2>\\n<h3> 两个有序数组找中位数</h3>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">Solution</span> <span class=\\\"token punctuation\\\">{</span>\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">double</span> <span class=\\\"token function\\\">findMedianSortedArrays</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> nums1<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> nums2<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token keyword\\\">int</span> length1 <span class=\\\"token operator\\\">=</span> nums1<span class=\\\"token punctuation\\\">.</span>length<span class=\\\"token punctuation\\\">,</span> length2 <span class=\\\"token operator\\\">=</span> nums2<span class=\\\"token punctuation\\\">.</span>length<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">int</span> totalLength <span class=\\\"token operator\\\">=</span> length1 <span class=\\\"token operator\\\">+</span> length2<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>totalLength <span class=\\\"token operator\\\">%</span> <span class=\\\"token number\\\">2</span> <span class=\\\"token operator\\\">==</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">int</span> midIndex <span class=\\\"token operator\\\">=</span> totalLength <span class=\\\"token operator\\\">/</span> <span class=\\\"token number\\\">2</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">double</span> median <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">getKthElement</span><span class=\\\"token punctuation\\\">(</span>nums1<span class=\\\"token punctuation\\\">,</span> nums2<span class=\\\"token punctuation\\\">,</span> midIndex <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">return</span> median<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span> <span class=\\\"token keyword\\\">else</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">int</span> midIndex1 <span class=\\\"token operator\\\">=</span> totalLength <span class=\\\"token operator\\\">/</span> <span class=\\\"token number\\\">2</span> <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">,</span> midIndex2 <span class=\\\"token operator\\\">=</span> totalLength <span class=\\\"token operator\\\">/</span> <span class=\\\"token number\\\">2</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">double</span> median <span class=\\\"token operator\\\">=</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token function\\\">getKthElement</span><span class=\\\"token punctuation\\\">(</span>nums1<span class=\\\"token punctuation\\\">,</span> nums2<span class=\\\"token punctuation\\\">,</span> midIndex1 <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token function\\\">getKthElement</span><span class=\\\"token punctuation\\\">(</span>nums1<span class=\\\"token punctuation\\\">,</span> nums2<span class=\\\"token punctuation\\\">,</span> midIndex2 <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">/</span> <span class=\\\"token number\\\">2.0</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">return</span> median<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">int</span> <span class=\\\"token function\\\">getKthElement</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> nums1<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> nums2<span class=\\\"token punctuation\\\">,</span> <span class=\\\"token keyword\\\">int</span> k<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token comment\\\">/* 主要思路：要找到第 k (k&gt;1) 小的元素，那么就取 pivot1 = nums1[k/2-1] 和 pivot2 = nums2[k/2-1] 进行比较\\n         * 这里的 \\\"/\\\" 表示整除\\n         * nums1 中小于等于 pivot1 的元素有 nums1[0 .. k/2-2] 共计 k/2-1 个\\n         * nums2 中小于等于 pivot2 的元素有 nums2[0 .. k/2-2] 共计 k/2-1 个\\n         * 取 pivot = min(pivot1, pivot2)，两个数组中小于等于 pivot 的元素共计不会超过 (k/2-1) + (k/2-1) &lt;= k-2 个\\n         * 这样 pivot 本身最大也只能是第 k-1 小的元素\\n         * 如果 pivot = pivot1，那么 nums1[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \\\"删除\\\"，剩下的作为新的 nums1 数组\\n         * 如果 pivot = pivot2，那么 nums2[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \\\"删除\\\"，剩下的作为新的 nums2 数组\\n         * 由于我们 \\\"删除\\\" 了一些元素（这些元素都比第 k 小的元素要小），因此需要修改 k 的值，减去删除的数的个数\\n         */</span>\\n\\n        <span class=\\\"token keyword\\\">int</span> length1 <span class=\\\"token operator\\\">=</span> nums1<span class=\\\"token punctuation\\\">.</span>length<span class=\\\"token punctuation\\\">,</span> length2 <span class=\\\"token operator\\\">=</span> nums2<span class=\\\"token punctuation\\\">.</span>length<span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">int</span> index1 <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">,</span> index2 <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">int</span> kthElement <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span>\\n\\n        <span class=\\\"token keyword\\\">while</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token boolean\\\">true</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token comment\\\">// 边界情况</span>\\n            <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>index1 <span class=\\\"token operator\\\">==</span> length1<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token keyword\\\">return</span> nums2<span class=\\\"token punctuation\\\">[</span>index2 <span class=\\\"token operator\\\">+</span> k <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>index2 <span class=\\\"token operator\\\">==</span> length2<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token keyword\\\">return</span> nums1<span class=\\\"token punctuation\\\">[</span>index1 <span class=\\\"token operator\\\">+</span> k <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>k <span class=\\\"token operator\\\">==</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token keyword\\\">return</span> <span class=\\\"token class-name\\\">Math</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">min</span><span class=\\\"token punctuation\\\">(</span>nums1<span class=\\\"token punctuation\\\">[</span>index1<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span> nums2<span class=\\\"token punctuation\\\">[</span>index2<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n            \\n            <span class=\\\"token comment\\\">// 正常情况</span>\\n            <span class=\\\"token keyword\\\">int</span> half <span class=\\\"token operator\\\">=</span> k <span class=\\\"token operator\\\">/</span> <span class=\\\"token number\\\">2</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">int</span> newIndex1 <span class=\\\"token operator\\\">=</span> <span class=\\\"token class-name\\\">Math</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">min</span><span class=\\\"token punctuation\\\">(</span>index1 <span class=\\\"token operator\\\">+</span> half<span class=\\\"token punctuation\\\">,</span> length1<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// notice - 1</span>\\n            <span class=\\\"token keyword\\\">int</span> newIndex2 <span class=\\\"token operator\\\">=</span> <span class=\\\"token class-name\\\">Math</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">min</span><span class=\\\"token punctuation\\\">(</span>index2 <span class=\\\"token operator\\\">+</span> half<span class=\\\"token punctuation\\\">,</span> length2<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">-</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">int</span> pivot1 <span class=\\\"token operator\\\">=</span> nums1<span class=\\\"token punctuation\\\">[</span>newIndex1<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">,</span> pivot2 <span class=\\\"token operator\\\">=</span> nums2<span class=\\\"token punctuation\\\">[</span>newIndex2<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>pivot1 <span class=\\\"token operator\\\">&lt;=</span> pivot2<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                k <span class=\\\"token operator\\\">-=</span> <span class=\\\"token punctuation\\\">(</span>newIndex1 <span class=\\\"token operator\\\">-</span> index1 <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                index1 <span class=\\\"token operator\\\">=</span> newIndex1 <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span> <span class=\\\"token keyword\\\">else</span> <span class=\\\"token punctuation\\\">{</span>\\n                k <span class=\\\"token operator\\\">-=</span> <span class=\\\"token punctuation\\\">(</span>newIndex2 <span class=\\\"token operator\\\">-</span> index2 <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                index2 <span class=\\\"token operator\\\">=</span> newIndex2 <span class=\\\"token operator\\\">+</span> <span class=\\\"token number\\\">1</span><span class=\\\"token punctuation\\\">;</span>\\n            <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
