title: koa-send thrown malicious path
date: 2016-04-22 01:14:59
tags: ['koa', 'koa-send', 'node']
---

使用 [koa](http://koajs.com/) 过程中，碰到几次 `koa-send` 抛出如下错误：

``` bash
Malicious Path
```

根本原因是 `node` `v5.7.0` 的 `path.parse` 有 [bug](https://github.com/nodejs/node/issues/5393)：

``` js
path.parse('/path/to/file').root

// 期望: '/'
// 实际: ''
```

相关：
- [Should the path be normalized? #51](https://github.com/koajs/send/issues/51)
- [url.parse result differences in 5.7.x to 5.6.x #5393](https://github.com/nodejs/node/issues/5393)
