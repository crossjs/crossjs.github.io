title: '@font-face 在 IE 下无效'
date: 2016-04-09 03:07:20
tags: ['@font-face', 'web font', IE, no-cache]
---

以下情况会导致 IE 下 `@font-face` 无效：
Web Font 文件请求的 headers 里包含 `Pragma: no-cache` 等会导致 IE 缓存失效的配置项。

相关：
- https://romixch.wordpress.com/2014/10/03/font-face-not-working-with-internet-explorer-and-http-header-pragmano-cache/
- http://stackoverflow.com/questions/13415073/on-ie-css-font-face-works-only-when-navigating-through-inner-links
