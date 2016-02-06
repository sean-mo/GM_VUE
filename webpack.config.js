"use strict";

require("babel-core/register");

var NODE_ENV 	= process.env.NODE_ENV || 'dev';
var webpackConf = require(`./config/webpack/${NODE_ENV}.webpack.js`);
module.exports  = webpackConf;