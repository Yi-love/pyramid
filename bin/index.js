#!/usr/bin/env node

const path = require('path');
const pyramid = require('../index');
let config = path.resolve(process.cwd() , 'pyramid.config.js');

if ( process.argv.length === 3 && process.argv[2] ) {
  config = process.argv[2];
}

console.log(`${new Date} [pyramid] want use config file: ${config}`);

try{
  const options = require(config);
  pyramid(options);
}catch(error){
  console.error(`${new Date} [pyramid] ci is error. ` , error);
}
