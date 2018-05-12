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