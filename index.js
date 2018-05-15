'use strict';
const path = require('path');
const config = require('./pyramid.config'); 
const webpackConfig = require('./webpack.config');
const pyramid = require('./src');
const webpack = require('webpack');
const fs = require('fs');
const rimraf = require('rimraf');
const crypto = require('crypto');
const TreeWorker = require('tree-worker');

const treeWorker = new TreeWorker();

/**
 * [webpackRun 运行webpack编译打包]
 * @param  {[type]} articles [description]
 * @param  {[type]} options  [description]
 * @return {[type]}          [description]
 */
function webpackRun(options , articles){
  console.log(`${new Date}: [pyramid] run webpack start with mode [${options.mode}] !!! please waiting.....`);
    return webpack(webpackConfig(options , articles) , (error, stats)=>{
      if ( error || stats.hasErrors() ) {
        console.error(new Date , ': [pyramid] run webpack is error ' , error || stats);
        return Promise.reject(error||stats);
      }
      console.log(`${new Date}: [pyramid] run webpack is success!!!`);
      return moveCacheFiles(options , articles);
    });
}
/**
 * [filtersFile 过滤文件]
 * @param  {[type]} files [description]
 * @return {[type]}       [description]
 */
function filtersFile(files){
  let caches = {views:[],static:[]};
  if ( typeof files !== 'object' ){
    return caches;
  }
  
  for ( let name in files ){
    if ( files[name].type === 'S_IFREG' ){
      if ( files[name].paths.ext.toLowerCase() === '.html' ){
        caches.views.push({
            path: files[name].origin,
            name: files[name].paths.base
        });
      }else{
        caches.static.push({
            path: files[name].origin,
            name: files[name].paths.base
        });
      }
    }
  }
  return caches;
}
/**
 * [getCacheFiles 获取缓存文件]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function getCacheFiles(options) {
  console.log(`${new Date}: [pyramid] get cache files now. ${options.cache}`);
  return treeWorker.work(options.cache).then((that)=>that.stat).then(filtersFile);
}

/**
 * [copyFile 复制文件]
 * @param  {[type]} source [原文件]
 * @param  {[type]} dist   [目标文件]
 * @return {[type]}        [description]
 */
function copyFile(source , dist){
  console.log(`${new Date}: [pyramid] copy file ${source} to ${dist}`);
  return new Promise((resolve , reject)=>{
    let rr = fs.createReadStream(source);
    let ww = fs.createWriteStream(dist);
    
    rr.on('end' , ()=>{
      return resolve(dist);
    });
    rr.on('error' , (error)=>{
      return reject(error);
    });
    ww.on('error' , (error)=>{
      return reject(error);
    });

    rr.pipe(ww);
  });
}
/**
 * [copyFiles 复制文件s]
 * @param  {Array}  files [description]
 * @param  {[type]} dist  [description]
 * @return {[type]}       [description]
 */
async function copyFiles(files = [] ,dist){
  let arr = [];
  for ( let i = 0 ; i < files.length ; i++ ){
    try{
      let result = await copyFile(files[i].path , path.resolve(dist , files[i].name));
      arr.push({
        path: result,
        name: files[i].name
      });
    }catch(error){
      return error;
    }
  }
  return arr;
}
/**
 * [createDir 创建目录]
 * @param  {[type]} dirName [description]
 * @return {[type]}         [description]
 */
function createDir(dirName){
  console.log(`${new Date}: [pyramid] create dir now. dirName : ${dirName}`);
  
  return new Promise((resolve , reject)=>{
    fs.mkdir(dirName , (error)=>{
      if ( error && error.code !== 'EEXIST' ){
        return reject(error);
      }
      return resolve(true);
    });
  });
}
/**
 * [copyFilesToDist 复制文件到目标目录]
 * @param  {[type]} options  [description]
 * @param  {[type]} files    [description]
 * @return {[type]}          [description]
 */
async function copyFilesToDist(options , files){
  console.log(`${new Date}: [pyramid] copy cache files now. view : ${files.views.length} && static: ${files.static.length}`);
  try{
    let result = await Promise.all([createDir(options.viewPath),createDir(options.staticPath)]);
    let arrPaths = await Promise.all([copyFiles(files.views , options.viewPath),copyFiles(files.static , options.staticPath)]);
    return {
      views: arrPaths[0],
      static: arrPaths[1]
    };
  }catch(error){
    return error;
  }
}
/**
 * [rmdir 移除缓存目录]
 * @param  {[type]} dir [description]
 * @return {[type]}     [description]
 */
function rmdir(dir){
  console.log(`${new Date}: [pyramid] clear cache dir ${dir}`);
  return new Promise((resolve , reject)=>{
    rimraf(dir , (error)=>{
      return error ? reject(error) : resolve(true); 
    });
  });
}
/**
 * [clearCacheDir 清除缓存文件]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
async function clearCacheDir(options , files){
  console.log(`${new Date}: [pyramid] clear cache dir now. you set autoClear [${options.autoClear}]`);
  try{
    if ( options.autoClear ){
      let result = await rmdir(options.cache);
      console.log(`${new Date}: [pyramid] clear cache dir success.`);
    }
  }catch(error){
    console.log(`${new Date}: [pyramid] clear cache dir error.` , error);
  }
  return files;
}

/**
 * [moveCacheFiles 移动文件]
 * @param  {[type]} options  [description]
 * @param  {[type]} articles [description]
 * @return {[type]}          [description]
 */
function moveCacheFiles(options , articles){
  return Promise.resolve(articles)
    .then(getCacheFiles.bind(this,options))
    .then(copyFilesToDist.bind(this,options))
    .then(clearCacheDir.bind(this,options));
};
/**
 * [isRunWebpack 是否需要webpack]
 * @param  {[type]} options  [description]
 * @param  {[type]} articles [description]
 * @return {[type]}          [description]
 */
function isRunWebpack(options , articles){
  console.log(`${new Date}: [pyramid] run webpack ? ${!!options.webpack}`);
  if ( !options.webpack ){
    console.log(`${new Date}: [pyramid] only return articles. ${articles.length}`);
    return Promise.resolve(articles);
  }
  return webpackRun(options , articles);
}

/**
 * [pyramid 博客数据统计]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function( options = config ){
  console.log(`${new Date}: [pyramid] build start in ${process.cwd()}`);
  let md5 = crypto.createHash('md5');
  let cache = md5.update(process.cwd()).digest('hex');
  options = Object.assign({} , config , options);
  options.webpack = !!options.webpack;
  options.url = options.url || './';
  options.cache = path.resolve(__dirname , `./dist/${options.cache || cache}`);
  return pyramid(options).then(isRunWebpack.bind(this , options));
};

