---
title: 鸿蒙系统 CSS 动画卡顿
date: "2022-01-31T04:55:33Z"
description: "记一次 HarmonyOS Webview 中的 CSS 动画卡顿问题的解决。"
---

我们有一个 Hybrid App，其中 UI 部分采用的是基于 React 的 SPA。页面的切换动画采用的是像这样的 CSS Transition：

```css
.page {
  transition: transform 0.5s;
  will-change: transform;
}

.page.out {
  transform: translate3d(100%, 0, 0);
}
```

在常见的 iOS 与 Android 设备中，页面切换丝般顺滑，但是在 HarmonyOS（设备是 HUAWEI P30 Pro） 下却有非常明显的卡顿，可以明显感觉到持续的掉帧。

刚开始怀疑是不是 HarmonyOS 的 Webview 没有激活 3D 加速，然而一切正常。

一通瞎试，最后发现使用像素值声明位移时，卡顿消失了。又尝试了 vw 值，卡顿又出现了。可能这些页面的相对值是相对于视窗宽度，而视窗宽度不是稳定的？或者说读取时计算量较大？

没有继续深究，但得出一个简单的结论：使用绝对值可以解决 HarmonyOS Webview 的 CSS 动画卡顿问题。大概是这样：

```css
.page {
  transition: transform 0.5s;
  will-change: transform;
}

.page.out {
  transform: translate3d(768px, 0, 0);
}
```
