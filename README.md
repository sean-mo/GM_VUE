# GM管理系统前端代码

> GM游戏管理系统（删减版），删除绝大部分业务代码，保留工程化、配置和登录业务代码。部分关键代码已经移除。该项目提供了typescript、test、webpack等等完整的配置，此代码仅供开源学习用，只需要简单调整一下，就可以直接跑一下了。


## 小光点

> 为项目写了不少函数库和接口文件

- 部分函数库Typescript 接口文件，可参考typings文件。（redux-middlware/vueI18n/component-ajax等)
- utils提供了vue-redux/localstorage等等函数库
- redux store封装了actions，提供直接可以使用的action
- component/containers/actions，提供了redux typescript一些简单的示例
- vue-redux提供了与react-redux相似的api。仅一个API，可以直接使用，也可以用tsd导出完整的JS直接用，生产环境谨慎使用。（嘿嘿，因为删除了部分关键代码）

## 工程化

### 安装

`打开终端，进入项目所在文件夹输入命令进行安装:`
	
	npm install
	npm install git://github.com/gulpjs/gulp#4.0 -g
	npm install typescript tsd -g
	npm install nodemon -g
	npm install wepback -g
	npm install babel@5.8 -g

- Mac下可能会存在某些package安装失败（比如gulp-sass/gulp-imagemin）
- Windows下gulp-imagemin存在图形库问题请暂时在package.json屏蔽掉。

`假如安装出错，请尝试分开安装 Package`

	npm install gulp-sass
	npm install gulp-imagemin
    其它安装，请打package.json,逐个安装相应的node插件	

### 运行

    gulp             执行前端自动化开发环境任务，同时建立一个Http Server
    gulp httpServers 构建一个http

    npm run dev       运行一个webpack server 支持 vue-hot-api
    npm run build     运行一个webpack 压缩任务，同时执行gulp build

    nodemon server.js 运行一个支持KOA的server，预计支持mockserver
    

### 运行环境 

    ruby / sass
    nodejs v5.1.0

### 前端架构和插件说明
	 
     webpack: 用于模块化打包的插件
     babeljs: 用于将ES6代码转成ES5
     vuejs  : 一个简洁的mvvm前端架构，于angularjs类似


### 项目源文件结构
```
├── README.md
├── config       // 配置文件
│   └── webpack   // webpack配置
│       ├── base.webpack.js   // 基本配置
│       ├── dev.webpack.js    // 开发环境
│       ├── production.webpack.js // 生产环境
│       └── server.webpack.js     // 服务器端配置
├── gulpfile.js         // gulp配置
├── jsconfig.json       // vscode 配置
├── karma.conf.js       //  karma 配置
├── nodemon.json   // 启动node的配置
├── package.json     
├── server           // 基于 server 工程化
│   ├── koa.js      // koa app文件 
│   ├── nunjucks-loader.js  // webpack-loader nujucks模板引擎（自写的）
│   ├── router.js           // 路由 
│   ├── template.js         // 静态模板
│   └── webpackServer.js    // webpack server middleware 配置
├── server.js   // 基于 Server 启动文件 nodemon server.js
├── src
│   ├── actions             // redux action
│   │   ├── appState.ts
│   │   ├── login.ts
│   │   └── rootActions.ts
│   ├── component             // components
│   │   ├── components.ts
│   │   ├── custorm
│   │   ├── form
│   │   └── modal
│   ├── containers
│   │   ├── app.ts
│   │   └── loginPage.ts
│   ├── decorators   // 修饰器
│   │   ├── all.ts
│   │   └── vue.ts
│   ├── fonts
│   │   ├── FontAwesome.otf
│   │   ├── fontawesome-webfont.eot
│   │   ├── fontawesome-webfont.svg
│   │   ├── fontawesome-webfont.ttf
│   │   └── fontawesome-webfont.woff
│   ├── images
│   │   ├── grid.png
│   │   └── login-accent-bar.png
│   ├── plugins
│   ├── reducer
│   │   ├── appState.ts
│   │   ├── login.ts
│   │   └── rootReducers.ts
│   ├── sass
│   │   ├── components
│   │   ├── devLibrary
│   │   ├── external
│   │   ├── pages
│   │   ├── style.js
│   │   └── style.scss
│   ├── store
│   │   └── configStore.ts    // 生成action
│   ├── template
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── newsStyle.html   
│   │   ├── partials
│   │   └── template.js
│   ├── ts
│   │   ├── config.ts  // 全局配置
│   │   └── popup.ts   // 弹层
│   └── utils
│       ├── GmError.ts   // 错误捕获
│       ├── ajax.ts       // 基于superagent小封装
│       ├── ajaxJquery.ts   // 基于 独立ajax 的小封装
│       ├── component-ajax   // 从jQuery/zepto移出来的独立ajax
│       ├── i18n                
│       ├── languageView.js
│       ├── localstorage.ts    // 本地存储
│       ├── shallowEqual.ts
│       └── vue-redux.ts       // redux vue 小函数
├── test
│   ├── actions
│   │   └── login.ts
│   ├── mocha.opts
│   ├── reducer
│   │   └── login.ts
│   ├── store
│   │   └── configStore.ts
│   └── utils
│       ├── ajax.ts
│       ├── ajaxJquery.js
│       ├── ajaxJquery.ts
│       └── vue-redux.ts
├── tsconfig.json
├── tsd.json
├── typings
│   ├── SuperAjax
│   │   └── SuperAjax.d.ts
│   ├── assertion-error
│   │   └── assertion-error.d.ts
│   ├── chai
│   │   └── chai.d.ts
│   ├── component-ajax
│   │   └── component-ajax.d.ts
│   ├── custom-error
│   │   └── custom-error.d.ts
│   ├── deep-equal
│   │   └── deep-equal.d.ts
│   ├── global.d.ts
│   ├── jquery
│   │   └── jquery.d.ts
│   ├── lodash
│   │   └── lodash.d.ts
│   ├── mocha
│   │   └── mocha.d.ts
│   ├── node
│   │   └── node.d.ts
│   ├── redux
│   │   └── redux.d.ts
│   ├── redux-middleware
│   │   ├── redux-act.d.ts
│   │   ├── redux-logger.d.ts
│   │   └── redux-thunk.d.ts
│   ├── sinon
│   │   └── sinon.d.ts
│   ├── superagent
│   │   └── superagent.d.ts
│   ├── supertest
│   │   └── supertest.d.ts
│   ├── tsd.d.ts
│   ├── vue
│   │   └── vue.d.ts
│   ├── vueClassComponent
│   │   └── vueClassComponent.d.ts
│   └── vueI18n
│       └── vue-i18n.d.ts
└── webpack.config.js
```

