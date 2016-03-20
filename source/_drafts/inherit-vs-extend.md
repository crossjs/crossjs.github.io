title: 继承与扩展
date: "2015-02-23T12:07:39.300Z"
---

> **使用继承（inherit），而不是扩展（extend）。**

先看个需求：

![modular 1](/img/posts/modular-1.png)

- 有 A、B 两个模块，都依赖 C 模块
- A 模块用到 C 模块的方法 m
- B 模块用到 C 模块的方法 m，同时需要进行适当的修改

对于 A、B 来说，C 可以说是全局变量，为了避免污染“全局变量”，解决方案：

![modular 2](/img/posts/modular-2.png)

- 模块 C1 继承自模块 C
- 模块 C1 的方法 m 修改自模块 C 的方法 m
- A 模块依赖 C 模块
- B 模块依赖 C1 模块

所以，当需要扩展公用模块时，应该继承后再扩展，而不是直接扩展。