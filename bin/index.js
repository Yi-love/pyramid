#!/usr/bin/env node

const path = require('path');
const pyramid = require('../index');
let config = path.resolve(process.cwd() , 'pyramid.config.js');

if ( process.argv.length === 3 && process.argv[2] ) {
  config = process.argv[2];
}

console.log(`${new Date} [pyramid] want use config file: ${config}`);

let options;
try{
   options = require(config);
}catch(error){
  console.error(`${new Date} [pyramid] ci is error. ` , error);
  return exit(1);
}

pyramid(options).catch((error)=>{
  console.error(`${new Date}: [pyramid] throw error.`);
  console.error(error);
  if ( options.strict ){
    console.error(`${new Date}: [pyramid] exit 1 . ${options.strict}`);
    return exit(1);
  }
  return error;
});