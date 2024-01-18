---
title: GoLang-接口
date: 2022-11-29 02:04:22
categories: Go
tags:
  - Go
---



```go
package main

type FormatError struct {
}

func (*FormatError) Error() string {
	return "format error"
}

func main() {
	var fe *FormatError = nil
	if fe != nil {
		panic("to 1")
	}
	var e error = fe
	if e != nil {
		panic("to 2")
	}
}

```

