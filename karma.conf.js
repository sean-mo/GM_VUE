
module.exports = function(config){
	config.set({
	    files: [
	      // 'src/utils/*.js',
	      'src/**/*.ts',
	      'test/*.ts',
	      'test/**/*.ts'
	    ],
	    frameworks: ['mocha', 'chai'],
	    colors: true,
	    // browsers: ['Chrome'],
	    captureTimeout: 600, //捕捉超时
	    // port: 8979,
	    singleRun: true, //持续集成测试
	    autoWatch: true,
	    logLevel: config.LOG_INFO, //config.LOG_DEBUG 

	    // coverage reporter generates the coverage
	    reporters: ['progress', 'coverage'],
	    preprocessors: {
	      // source files, that you wanna generate coverage for
	      // do not include tests or libraries
	      // (these files will be instrumented by Istanbul)
	      // 'src/utils/*.js': ['babel', 'coverage'],
	      // 'src/**/*.ts': ['typescript', 'babel', 'coverage']
	       'src/**/*.ts': ['webpack']
	    },
	    // reporter options
	    mochaReporter: {
	      colors: {
	        success: 'bgGreen',
	        info: 'cyan',
	        warning: 'bgBlue',
	        error: 'bgRed'
	      }
	    },
	    typescriptPreprocessor: {
	    	options: {
	        sourceMap: false, // (optional) Generates corresponding .map file.
	        target: 'ES6', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
	        module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
	        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
	        noResolve: true, // (optional) Skip resolution and preprocessing.
	        removeComments: true, // (optional) Do not emit comments to output.
	        concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
	      },
	      // extra typing definitions to pass to the compiler (globs allowed)
	      typings: [
	        'typings/tsd.d.ts'
	      ],
	      // transforming the filenames
	      transformPath: function(path) {
	        return path.replace(/\.ts$/, '.js');
	      }
	    },
	    // optionally, configure the reporter
	    coverageReporter: {
	    	check: { // 测试条件，假如不满足check的条件，则返回测试失败
			    global: { // 适用于全部文件
			      statements: 50,
			      branches: 50,
			      functions: 50,
			      lines: 50,
			      excludes: []
			    }
			},
	   		 // 指定覆盖测试报表生成目录
	        dir: 'build/reports/coverage',
	        reporters: [ // 各种输出格式支持
	          // reporters not supporting the `file` property
	          { type: 'html', subdir: 'report-html' }
	          // { type: 'lcov', subdir: 'report-lcov' },
	          // // reporters supporting the `file` property, use `subdir` to directly
	          // // output them in the `dir` directory
	          // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
	          // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
	          // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
	          // { type: 'text', subdir: '.', file: 'text.txt' },
	          // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
	      	]
	    },
	    webpack: {
	      resolve: {
	        root: __dirname,
	        extensions: ['','.ts','.js','.json']
	      },
	      devtool: 'inline-source-map',
	      module: {
	        loaders: [
	          { test: /\.ts?$/,   loader: 'babel-loader!ts-loader', exclude: [
	              /web_modules/,
	              /node_modules/
	            ]
	          },
	          { test: /\.json$/, loader: 'json' },
	          { test: /\.html$/, loader: 'raw' },
	          { test: /\.css$/,  loader: 'raw' }
	        ]
	      },
	      stats: { colors: true, reasons: true },
	      debug: false
	    },

	    webpackServer: {
	      noInfo: true //please don't spam the console when running in karma!
	    },
  });
}