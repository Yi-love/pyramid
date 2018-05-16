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

> node : v7.6+

```js
//pyramid.config.js
'use strict';

const path = require('path');

module.exports = {
  root: 'E:\\git\\yi-love.github.io\\_posts', //bolg markdown file path
  strict: true, // if error exit 1   .. only ci
  extensions: [],  //ext file want read
  encoding: 'utf-8', //file encode
  author:'',  //no author file can set author default `Owner`
  filename: 'pyramid.html', //html file name
  hashFile: true,
  blogName: '',
  url: './static', //js,css path in html set
  cache: '',
  webpack: true, // if set false : return  articles
  watch: false,
  autoClear: true, // clear cache path
  mode: 'production', //webpack module
  viewPath: path.resolve(process.cwd() , 'pyramid'), //html path you want
  staticPath: path.resolve(process.cwd() , 'pyramid/static') // js,css path you want
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

open you blog dir:

```
npm install --save-dev pyramid
```

next ... cmd:
```
pyramid [configPath]
```

### 3. require

```js
const pyramid = require('@cray/pyramid');

pramid([options]).then();
```

> options is default `pyramid.config.js`


### example

Github: [https://github.com/futuweb/futu.im](https://github.com/futuweb/futu.im)
统计url: [https://futu.im/statistics/](https://futu.im/statistics/)
