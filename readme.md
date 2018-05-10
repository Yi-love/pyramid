## Pyramid
Statistics your blog data.
> 获取博客文章，进行统计数据。

## compatible（兼容的博文）
`hexo` ,`jekyll` is ok.

使用 `hexo` ，`jekyll` 构建的博客基本上只有符合下面的文章都支持。 

```
//1.
---
title: Github-我的第一篇博客
date: 2017-04-24 10:30
categories: [前端]
author: Yi
---

//2.
---
layout: page
title: Github-我的第一篇博客
categories:  [笔记]
tags: [记事]
---
```

> please see pyramid.config.js

## start
`npm install` first.

```js
//pyramid.config.js
module.exports = {
  root: 'E:\\git\\yi-love.github.io\\_posts', //bolg markdown file path
  extensions: [],  //ext file want read
  encoding: 'utf-8', //file encode
  author:''  //no author file can set author default `Owner`
};
```

1. get all articles data.

```
node index.js
```

2. build frontend html page.

```
webpack
```

open `static/index.html`.
