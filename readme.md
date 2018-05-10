## Pyramid
Statistics your blog data.
> 获取博客文章，进行统计数据。

## compatible

```
//1.
---
title: '文件名'
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
module.exports = {
  root: 'E:\\git\\yi-love.github.io\\_posts', //bolg markdown file path
  extensions: [],  //ext file want read
  encoding: 'utf-8', //file encode
  author:''  //no author file can set author default `Owner`
};
```

1:

```
node index.js
```

2：

```
webpack
```

open `static/index.html`.
