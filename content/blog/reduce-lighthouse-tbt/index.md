---
title: 快速 TBT 优化
date: "2022-01-30T08:18:09Z"
description: "通过拆分 JS 与异步任务快速降低 TBT，以提高 Lighthouse 评分。"
---

背景知识：[Lighthouse](https://web.dev/performance-scoring/) [TBT](https://web.dev/i18n/zh/lighthouse-total-blocking-time/)。

TBT，Total Blocking Time，“总阻塞时间”，是测量页面从 [FCP](https://web.dev/i18n/zh/fcp/) 到 [TTI](https://web.dev/i18n/zh/tti/) 之间所有长任务的**阻塞部分**之和。

在 Lighthouse，如果一个任务在主线程不间断的执行时间超过 50 毫秒，那么它就会被标记为长任务，其中超出 50 毫秒的时长即为**阻塞部分**。

现有一个项目，TBT 高达 700+ 毫秒。在尝试了拆分 JS、内嵌 CSS 以及移除无用的模块等常规方案之后，TBT 依然保持在 600+ 毫秒。

通过 Chrome 的 Performance 面板，我们发现：虽然拆分出了 jQuery、Bootstrap、Vue、ElementUI 及多个页面入口文件，但是由于这些 JS 文件采用的是 defer 加载模式，它们在主线程中的执行是连续无间断的，也就说从第一个文件到最后一个文件，主线程一直处于阻塞状态，所以这些文件的 TBT 等于它们运行的时间总和减去 50 毫秒。

于是，在尽量不动现有架构的前提下，要想快速降低 TBT，有一个终极方案：根据 TBT 计算规则，如果把这些任务拆分成多个不连续的任务，那么每拆分出一个不连续的长任务，我们将获得大约 50 毫秒的收益。

最简单的方案就是：使用 `setTimeout`（不可以用 `Promise`，原因见 [事件循环](https://zh.javascript.info/event-loop#:~:text=%E5%9C%A8%E5%BE%AE%E4%BB%BB%E5%8A%A1%E4%B9%8B%E9%97%B4%E6%B2%A1%E6%9C%89%20UI%20%E6%88%96%E7%BD%91%E7%BB%9C%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%A4%84%E7%90%86%EF%BC%9A%E5%AE%83%E4%BB%AC%E4%B8%80%E4%B8%AA%E7%AB%8B%E5%8D%B3%E6%8E%A5%E4%B8%80%E4%B8%AA%E5%9C%B0%E6%89%A7%E8%A1%8C%E3%80%82)）将执行时间超过 50 毫秒的同步任务转换为异步任务。

我们先对创建 Vue 的任务进行的异步，降低了 50 毫秒。但这远远不够，于是我们就想到：可以把执行时间超过 50 毫秒的 JS 文件的执行动作也**异步化**：

```html
<link
  rel="preload"
  as="script"
  href="path/to/app.js"
  onload="var script = document.createElement('script'); script.src = this.href; setTimeout(() => { document.body.appendChild(script) }, 10);"
/>
```

如果 app.js 依赖 Vue，则可以加一些判断（我们通过 CDN 加载 UMD 规范的 Vue 文件）：

```html
<link
  rel="preload"
  as="script"
  href="path/to/app.js"
  onload="var script = document.createElement('script'); script.src = this.href; var timeout = setInterval(() => { if (window.Vue) {clearInterval(timeout); document.body.appendChild(script)} }, 10);"
/>
```

最终，TBT 降低到 300 毫秒以下，“完美”收工。

当然，即使在降低了 TBT 的同时，也降低了用户感受到页面卡顿的概率，它依然只能作为对现有项目快速打补丁的一种方式，毕竟谷歌制定 TBT 指标的目的是帮助大家改善网页的用户体验，而不是让大家去刷分。
