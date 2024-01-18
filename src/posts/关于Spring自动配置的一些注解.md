---
title: 关于Spring自动配置的一些注解
date: 2021-09-16
categories: Spring
tags: 
    - Spring核心
    - JavaSE
---

## @ConditionalXXX注解族

### @ConditionalOnProperty

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.METHOD })
@Documented
@Conditional(OnPropertyCondition.class)
public @interface ConditionalOnProperty {

   /**
    * Alias for {@link #name()}.
    * @return the names
    */
   String[] value() default {};

   /**
    * A prefix that should be applied to each property. The prefix automatically ends
    * with a dot if not specified. A valid prefix is defined by one or more words
    * separated with dots (e.g. {@code "acme.system.feature"}).
    * @return the prefix
    */
   String prefix() default "";

   /**
    * The name of the properties to test. If a prefix has been defined, it is applied to
    * compute the full key of each property. For instance if the prefix is
    * {@code app.config} and one value is {@code my-value}, the full key would be
    * {@code app.config.my-value}
    * <p>
    * Use the dashed notation to specify each property, that is all lower case with a "-"
    * to separate words (e.g. {@code my-long-property}).
    * @return the names
    */
   String[] name() default {};

   /**
    * The string representation of the expected value for the properties. If not
    * specified, the property must <strong>not</strong> be equal to {@code false}.
    * @return the expected value
    */
   String havingValue() default "";

   /**
    * Specify if the condition should match if the property is not set. Defaults to
    * {@code false}.
    * @return if should match if the property is missing
    */
   boolean matchIfMissing() default false;

}
```



@ConditionalOnClass
@ConditionalOnBean
@ConditionalOnMissingBean

@ConditionalOnSingleCandidate

[一篇很齐全的博客](https://spring.hhui.top/spring-blog/2018/10/19/181019-SpringBoot%E5%9F%BA%E7%A1%80%E7%AF%87Bean%E4%B9%8B%E6%9D%A1%E4%BB%B6%E6%B3%A8%E5%85%A5-ConditionalOnProperty/)