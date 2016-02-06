"use strict";

import webpack from 'webpack';
export default function(app){
	const webpackConf = require('../config/webpack/server.webpack.js');
	var compiler = webpack(webpackConf.devConf);
	app.use(require('koa-webpack-dev-middleware')(compiler, webpackConf.serverConf));
	app.use(require('koa-webpack-hot-middleware')(compiler),{ log: console.log })
}