"use strict";
import webpack  		 from 'webpack';
import path              from 'path';
import baseConf 		 from './base.webpack.js';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var devConf = Object.assign({}, {
	debug        : true,
	cache        : true,
	watch        : true,
	watchOptions : {
		poll            : 500,
		aggregateTimeout: 400
	},
	devtool      : 'cheap-source-map',
	node : {
		console: true
	},
	target: 'web'
}, baseConf);



// add webpack-hot middleware client
Object.keys(devConf.entry).forEach( key => {
	let file = devConf.entry[key]; file = typeof file === 'string' ? [file] : file;
	devConf.entry[key] = ['webpack-hot-middleware/client','webpack/hot/dev-server', ...file];
})

devConf.plugins = [new webpack.HotModuleReplacementPlugin(), ...devConf.plugins];

module.exports = {
	devConf 	: devConf,
	serverConf  : {	
		publicPath         : '/',
		progress		   : true,
		hot                : true,
		quiet              : false,
		lzay               : false,
		historyApiFallBack : true,
		headers            : { 'Access-Control-Allow-Origin': '*' },
		stats              : {
			assets             : true,
			colors             : true,
			version            : true,
			hash               : true,
			timings            : true,
			chunks             : true,
			chunkModules       : false
		}
	}
}