var webpack = require('webpack');


import baseConf from './base.webpack.js';

baseConf.plugins = [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.UglifyJsPlugin({
	    compress: {
		    warnings: false
		},
		sourceMap: false
	}),
	...baseConf.plugins
]

export default baseConf;

