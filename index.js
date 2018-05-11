'use strict';

const config = require('./pyramid.config'); 
const webpackConfig = require('./webpack.config');
const pyramid = require('./src');
const webpack = require('webpack');

module.exports = function( options = config ){
  console.log('pyramid build start.....');
  return pyramid(options)
        .then((articles)=>{
          console.log(`pyramid got ${articles.length} article.`);
          if ( !options.webpack ){ //can't use webpack  return articles
            console.log('pyramid is not use webpack return articles now.');
            return articles;
          }
          console.log(`webpack start mode ${options.webpack.mode}..... please wait.....`);
          return new Promise((resolve , reject)=>{
            webpack(webpackConfig(options.webpack , articles) , (err , stats)=>{
              if ( err || stats.hasErrors() ) {
                console.error('pyramid use webpack is error ' , err || stats.hasErrors());
                return reject(err||stats);
              }
              console.log('pyramid use webpack is success now return stats & articles.');
              console.log(`Statistics  information please open output file ----> ${options.webpack.filename}`);
              return resolve({stats , articles});
            });
          });
        } , (error)=>{
          console.error('pyramid get articles is error' , error);
          return error;
        });
};