'use strict';

const config = require('./pyramid.config'); 
const webpackConfig = require('./webpack.config');
const pyramid = require('./src');
const webpack = require('webpack');

module.exports = function( options = config ){
  console.log('pyramid build with options \n' , options , webpackConfig(options.webpack));
  return pyramid(options)
        .then((articles)=>{
          if ( !options.webpack ){ //can't use webpack  return articles
            return articles;
          }
          return new Promise((resolve , reject)=>{
            webpack(webpackConfig(options.webpack) , (err , stats)=>{
              if ( err || stats.hasErrors() ) {
                console.error('pyramid use webpack is error ' , err || stats.hasErrors());
                return reject(err);
              }
              return resolve({stats , articles});
            });
          });
        } , (error)=>{
          console.error('pyramid get articles is error' , error);
          return error;
        });
};