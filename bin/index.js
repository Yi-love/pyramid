#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const pyramid = require('../index');
const config = path.resolve('pyramid.config.js');

console.log(`pyramid want use config file: ${config}`);

try{
  const options = require(config);
  pyramid(options);
}catch(error){
  console.error('pyramid ci is error. ' , error);
}
