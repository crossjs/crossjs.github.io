title: postcss
date: 2016-03-20 19:41:59
tags: [postcss, webpack]
---

> [PostCSS](http://postcss.org/) is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.

大白话就是：通过适当的插件，你只需要写标准（现在的标准、未来的标准、或你期望的标准）的样式即可

## 一些插件

- [autoprefixer](https://github.com/postcss/autoprefixer)
- [import](https://github.com/postcss/postcss-import)
- [nested](https://github.com/postcss/postcss-nested)
- [mixins](https://github.com/postcss/postcss-mixins)
- [sprites](https://github.com/2createStudio/postcss-sprites)
- [...more](http://postcss.parts/)

## 在 webpack 中使用

```js
webpackConfig = {
  module: {
    loaders: [
      test: /\.css$/,
      loaders: 'style!css?sourceMap!postcss'
  },
  postcss: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-sprites')['default']({...}),
    ...
  ]
}
```
