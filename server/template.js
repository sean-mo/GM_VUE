"use strict";

import nunjucks	from 'nunjucks';

export default async function(next){
	// template
	var template = nunjucks.configure('./src/template',{
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


	var render = async function(view){
		var html = template.render(view);
		this.type = 'html';
		this.body = html;
		return html;
	}

	this.render = render;
	await next;
}
