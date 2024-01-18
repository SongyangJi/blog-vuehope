---
title: SpringMVC 常用注解
date: 2021-04-02
categories: SpringMVC
tags: SpringMVC
---


# @Controller
`@Controller` 用于标记在一个类上，使用它标记的类就是一个SpringMVC Controller 对象。分发处理器将会扫描使用了该注解的类的方法，并检测该方法是否使用了@RequestMapping 注解。
**@Controller 只是定义了一个控制器类，而使用@RequestMapping 注解的方法才是真正处理请求的处理器。**

## @RestController
一般我们直接把这个注解加上控制类上，既声明这是一个控制类，也将对象转成json格式传给前端。

`@RestController`  = `@Controller` + `@ResponseBody`



# @RequestMapping
## URL匹配
@RequestMapping是一个用来处理请求地址映射的注解，可用于类或方法上。

通过类路径和方法路径结合访问controller方法

> 当@RequestMapping 标记在Controller 类上的时候，里面使用@RequestMapping
> 标记的方法的请求地址都是相对于类上的@RequestMapping 而言的；当Controller
> 类上没有标记@RequestMapping 注解时，方法上的@RequestMapping
> 都是绝对路径。这种绝对路径和相对路径所组合成的最终路径都是相对于根路径“/ ”而言的。
> 
总之，这个注解的作用是完成了 **url到控制器方法**的映射。

+ 常规使用：类路径+方法路径
```java
@Controller
// 这个注解在返回非视图的对象时使用
@ResponseBody
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/name")
    public String name(){
        return "jsy";
    }

    @RequestMapping("/age")
    public int age(){
        return 18;
    }
}
```
启动服务器后，访问 http://localhost:8080/user/name 。



+ **URL模板**
为了取出URL模板中的 参数，需要使用`@PathVariable`注解，下面会细讲。
```java
@Controller
// 这个注解在返回非视图的对象时使用
@ResponseBody
@RequestMapping("/user/")
public class UserController {
    @RequestMapping("/name/{p1}")
    public String name(@PathVariable String p1){
        return "我叫"+p1;
    }
}
```

+ **正则匹配**
举一个最简单的例子：通配符`*`
如`@RequestMapping("*/user/")`会匹配到`/test/user/`等等。

## value和method属性
+ **value**
	指定请求的实际地址，指定的地址可以是URI Template 模式
+  **method**
	指定请求的method类型， GET、POST、PUT、DELETE等。也就是**窄化了请求范围** 


## @GetMapping、@PostMapping
根据上面的`method`属性，可以直接使用`@RequestMapping`的衍生注解：
+ @GetMapping 等同于 @RequestMapping(method = RequestMethod.GET)
+ @PostMapping 等同于 @RequestMapping(method = RequestMethod.POST)
+ @PutMapping 等同于 @RequestMapping(method = RequestMethod.PUT)
+ @DeleteMapping 等同于 @RequestMapping(method = RequestMethod.DELETE)
+ @PatchMapping 等同于 @RequestMapping(method = RequestMethod.PATCH)
等等。

# 获取参数
## @PathVariable
**用于将请求URL中的模板变量映射到功能处理方法的参数上，即取出uri模板中的变量作为参数。**

```java
@Controller
// 这个注解在返回非视图的对象时使用
@ResponseBody
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class UserController {
    @RequestMapping("/name/{p1}/{id}")
    public String name(@PathVariable("p1") String p,@PathVariable int id){
        return "我叫"+p+",学号是"+id;
    }
}
```
注意点，如果所需要使用的变量名跟参数名不相同的时候，就要明确指出使用的是URI 模板中的哪个变量!

## @RequestBody 

默认会将post请求中body中的json串反序列话为实体类：

```java
   @PostMapping("/student")
    public void post(@RequestBody Student student) {
    }
```



## @RequestParam

这就是 GET请求的 query-string的格式，形如： **?name1=value1&name2=value2**。

@RequestParam就是用来提取中其中的值的。

```java
    @PostMapping("/student")
    public Student get(@RequestParam String name, @RequestParam int age) {

    }
```

