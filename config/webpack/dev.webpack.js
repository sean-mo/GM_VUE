"use strict";

import baseConf from './base.webpack.js';

export default Object.assign({}, baseConf, {
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
	devServer: {
		contentBase: './build'
	}
})


