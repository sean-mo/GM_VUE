"use strict";

var router = require('koa-router')();

router.get('/', async function (next) {
	await this.render('index.html');
	await next;
})

router.get('/login.html', async function (next) {
	await this.render('login.html');
	await next;
})

export default router;