'use strict';

const path = require('path');

module.exports = {
  root: path.resolve(process.cwd() , '_posts'), //bolg markdown file path
  extensions: [],  //ext file want read
  encoding: 'utf-8', //file encode
  author:'',  //no author file can set author default `Owner`
  filename: 'index.html', //html file name
  hashFile: true,
  blogName: '',
  url: './', //js,css path in html set
  cache: '',
  webpack: true, // if set false : return  articles
  watch: false,
  autoClear: true, // clear cache path
  mode: 'production', //webpack module
  viewPath: path.resolve(process.cwd() , 'pyramid'), //html path you want
  staticPath: path.resolve(process.cwd() , 'pyramid') // js,css path you want
};