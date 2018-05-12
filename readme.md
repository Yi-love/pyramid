## Pyramid
Statistics your blog data.
> 获取博客文章，进行统计数据。


# error please don't use

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
'use strict';

const path = require('path');

module.exports = {
  root: path.resolve(process.cwd() , '_posts'), //bolg markdown file path
  extensions: [],  //ext file want read
  encoding: 'utf-8', //file encode
  author:'',  //no author file can set author default `Owner`
  filename: 'index.html', //resolve path is output.publicPath
  hashFile: true,
  blogName: '',
  url: '/',
  cache: '',
  webpack: true,
  watch: false,
  autoClear: true,
  mode: 'production',
  viewPath: path.resolve(process.cwd() , 'pyramid'),
  staticPath: path.resolve(process.cwd() , 'pyramid')
};
```

### 1. npm
```
npm install -save-dev @cray/pyramid
```

cmd:
```
npm run start
```

open output path `index.html`.


### 2. CI
install:

```
npm install -g @cray/pyramid
```

cmd:
```
pyramid [configPath]
```

### 3. require

```js
const pyramid = require('@cray/pyramid');

pramid([options]).then();
```

> options is default `pyramid.config.js`
