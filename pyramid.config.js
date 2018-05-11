'use strict';

const path = require('path');

module.exports = {
  root: path.resolve(process.cwd() , '_post'), //bolg markdown file path
  extensions: [],  //ext file want read
  encoding: 'utf-8', //file encode
  author:'',  //no author file can set author default `Owner`
  webpack: {  // could use false return articles
    mode: 'production',
    watch: false,
    output: {
      path: path.resolve(process.cwd() , './static/dist'),
      publicPath : './dist'
    },
    autoClear: true, //clean publicPath
    filename: './../index.html', //resolve path is output.publicPath
    hashFile: false
  }
};