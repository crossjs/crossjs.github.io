title: scoped css in vue
date: 2016-04-22 00:15:30
tags: ['vue', 'vue-loader', 'scoped css']
---

使用 [vue-loader](https://github.com/vuejs/vue-loader) 的 [scoped css](http://vuejs.github.io/vue-loader/features/scoped-css.html) 有两点要注意：

1. 不要使用 `@import`；
2. 如果 A 组件包含 B 组件，A 的 *scoped css* 不应该试图定义 B 的内部元素的样式。

Q: 可是为什么呢？
A: 不解释（自己动手重现，更可加深理解）。
