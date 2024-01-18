<template><div><h1 id="go-testing" tabindex="-1"><a class="header-anchor" href="#go-testing" aria-hidden="true">#</a> Go-Testing</h1>
<ol>
<li>测试代码须放在包以<code v-pre>_test.go</code>结尾的文件中。</li>
<li>测试函数以<code v-pre>Test</code>为前缀。</li>
<li>测试命令（<code v-pre>go test</code>）忽略以&quot;_&quot;或&quot;.&quot;开头的测试文件。</li>
<li>正常的编译操作(<code v-pre>go build</code>、<code v-pre>go install</code>)会忽略测试文件</li>
</ol>
</div></template>


