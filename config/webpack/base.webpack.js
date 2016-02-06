"use strict";

import webpack 			 from 'webpack';
import path    			 from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import nunjucks          from '../../server/nunjucks-loader';

const env    	 	= process.env.NODE_ENV || 'dev';
const PORT 	 		= process.env.PORT     || 8080;

var httpProvider 	= {
	GMServerApi: '127.0.0.1/api'
}

var webpackConf     = {
	entry: {
        'js/login' : './src/containers/loginPage.ts'
	},
	output: {
		path       	   : path.resolve('build'),
		filename       : '[name].js',
		publicPath	   : '/',
		chunkFilename  : "[chunkhash].bundle.js"
	},
	module: {
		loaders: [
			{ 
				test    : /\.vue(tx)$/,
				loader  : 'vue',
				exclude : /node_modules/
			},
			{ 
				test    : /\.ts$/,
				loader  : 'ts',
				exclude : /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//
			},
			{ 
				test    : /\.js$/,
				loader  : 'babel',
				exclude : /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//
			},
			{ 
				test    : /\.html$/,
				loader  : 'file?name=[name].html!../../server/nunjucks-loader'
			},
			{ 
				test    : /\.scss$/,
				loader  : ExtractTextPlugin.extract("style-loader", "raw-loader!sass-loader?outputStyle=expanded")
			}
		]
	},
	resolve:{
		extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.vue', '.css', '.scss', 'html']
	},
	sassLoader:{
		includePaths : [path.resolve('./src/sass')],
		outputStyle  : 'expanded',
		sourceMap    : true,
		outFile      : path.resolve('./build')
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"' + env + '"',
			'ServerAPI'		      : '"' + httpProvider.GMServerApi + '"',
			'GMServerApi'		  : '""'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name	: 'commons',
			filename: 'js/commons.js'
		}),
		new ExtractTextPlugin('style.css', {allChunks: true})
	]
}

export default webpackConf;