"use strict";

import koa     	     	from 'koa';
import staticCache      from 'koa-static-cache';
import koaLogger        from 'koa-log4js'
import template   		from './template';
import router      	    from './router';
import webpackServer	from './webpackServer';

const PORT = process.env.PORT     || 8080;
const app  = koa();
// ES7 async
app.experimental = true;
app.use(staticCache('./build'));
// logger 
app.use(koaLogger());
// webpack
webpackServer(app);
// 设置模板
app.use(template);
// 设置路由
app.use(router.routes());
app.listen(PORT)
console.info('browser open: http://localhost:' + PORT)