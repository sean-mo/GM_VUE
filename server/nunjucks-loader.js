"use strict";
import nunjucks	from 'nunjucks';
module.exports = function(content){
	this.cacheable();
	var callback = this.async();
	nunjucks.configure('./src/template',{
		autoescape: true,
	    tags: {
		    blockStart: '<%',
		    blockEnd: '%>',
		    variableStart: '<$',
		    variableEnd: '$>',
		    commentStart: '<#',
		    commentEnd: '#>'
		},
		watch: false
	})

	callback(null, nunjucks.renderString(content));
};