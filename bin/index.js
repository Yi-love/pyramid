#!/usr/bin/env node

const path = require('path');
const pyramid = require('../index');
let config = path.resolve('pyramid.config.js');

if ( process.argv.length === 3 && process.argv[2] ) {
  config = process.argv[2];
}

console.log(`pyramid want use config file: ${config}`);

try{
  const options = require(config);
  pyramid(options);
}catch(error){
  console.error('pyramid ci is error. ' , error);
}
