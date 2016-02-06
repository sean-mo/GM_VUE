"use strict";

/*
   require  Library
*/
var fs          = require('fs');
var path        = require('path');
var notify 		= require('gulp-notify');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync');
// gulp
var gulp             = require('gulp');
var fileInclude      = require('gulp-file-include');
var nunjucks         = require('gulp-nunjucks-html');
var fileSize         = require('gulp-filesize');
// sass
var autoprefixer     = require('gulp-autoprefixer');
var sass             = require('gulp-sass');
var sourcemaps       = require('gulp-sourcemaps');
var minifyCSS        = require('gulp-minify-css');

var imagemin   	     = require('gulp-imagemin');
var changed          = require('gulp-changed');
var clean            = require('gulp-clean');
// webpack plugins
var vueLoader        = require('vue-loader');
// three lib
var _			     = require('lodash');
var named      		 = require('vinyl-named');
var webpack      	 = require('webpack');
var webpackConf      = require('./webpack.config');

//

var httpPort = 8080;

/* task */

// default
gulp.task('default',    gulp.series(doTemplate, compileSass, movei18n, devWebpack, moveFonts, compressImages, httpBrowser, watchTemplate, watchSass, watchI18n));
gulp.task('dev',     	gulp.parallel('default') );
gulp.task('webpackDev', gulp.series(movei18n, moveFonts, compressImages))
// task list
gulp.task('template'	 , doTemplate);
gulp.task('sass'		 , compileSass);
gulp.task('httpServers'  , httpBrowser);
gulp.task('minifyCss'	 , gulp.series(compileSass, minifyCss));
gulp.task('images'       , compressImages);
gulp.task('fonts'        , moveFonts);
gulp.task('charts'       , moveCharts);
gulp.task('clean'        , cleanBuild);
gulp.task('webpack'      , devWebpack);
gulp.task('moveApi'      , moveApiTest);
gulp.task('movei18n'      , movei18n);
gulp.task('moveTemplate' , moveTemplate);
// watch
gulp.task('watch'        , gulp.series(watchSass, watchTemplate, watchI18n))
// tree
gulp.task('tree'         , logTree)
// build
gulp.task('build'        , gulp.series(cleanBuild, compressImages, moveFonts, movei18n));

/*
	private function
*/
function watchTemplate(done){
	gulp.watch(['src/template/*.html' , 'src/template/**/*.html'], gulp.parallel('template'));
	done();
}
function watchSass(done){
	gulp.watch(['src/sass/*.scss'     , 'src/sass/**/*.scss']    , gulp.parallel('sass'));
	done();
}

function watchI18n(done){
    gulp.watch(['src/utils/i18n/*.*'], gulp.parallel('movei18n'));
	done();
}

function logTree(){
	gutil.beep();
	gutil.log(gulp.tree());
}
function doTemplate2(){
	return gulp.src(['src/template/*.html'])
	  .pipe(fileInclude({
	     prefix: '@@',
	     basepath: '@file'
	   }))
	  .on('error', handleErrors)
	  .pipe(gulp.dest('build/'))
	  .pipe(fileSize())
	  .pipe(browserSync.reload({stream:true}));
}

function doTemplate() {
	return gulp.src(['src/template/*.html'])
		.pipe(nunjucks({
			searchPaths: ['src/template'],
			autoescape: true,
			tags: {
				blockStart: '<%',
				blockEnd: '%>',
				variableStart: '<$',
				variableEnd: '$>',
				commentStart: '<#',
				commentEnd: '#>'
			}
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest('build/'))
		.pipe(fileSize())
		.pipe(browserSync.reload({
			stream: true
		}));
}

function compileSass(){
	return gulp.src(['src/sass/*.scss'])
	  .pipe(sourcemaps.init())
      .pipe(autoprefixer({ browsers: ['last 25 version', 'iOS > 6','Android >= 4'] }))
      .pipe(sass({
	      errLogToConsole: true,
	      indentedSyntax: true, // Enable .sass syntax!
	      imagePath: 'images' // Used by the image-url helper
	   }))
      .pipe(sourcemaps.write())
      .on('error', handleErrors)
      .pipe(gulp.dest('build/'))
      .pipe(fileSize())
      .pipe(browserSync.reload({stream:true}));
}

function minifyCss(){
    return gulp.src(['build/*.css'])
       .pipe(sourcemaps.init())
	   .pipe(minifyCSS({keepBreaks:true, compatibility: 'ie7'}))
	   .pipe(sourcemaps.write())
	   .on('error', handleErrors)
	   .pipe(gulp.dest('build/'))
	   .pipe(fileSize())
	   .pipe(browserSync.reload({stream:true}));
}

function compressImages(){
	return gulp.src(['src/images/*.{JPG,jpg,png,gif}'])
    .pipe(changed('build/images/*.{JPG,jpg,png,gif}')) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .on('error', handleErrors)
    .pipe(gulp.dest('build/images/'))
    .pipe(fileSize())
    .pipe(browserSync.reload({stream:true}));
}

function httpBrowser(cb){
	browserSync({
		port : httpPort,
	    files: ['build/*.html', 'build/*.css', 'build/js/*.js'],
	    logFileChanges: true,
	    server: {
	      // Serve up our build folder
	      baseDir: 'build/',
	      middleware: function (req, res, next) {
	        res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有跨域请求
	        next();
	      }
	    }
	}, cb);
}


function moveFonts(){
	return gulp.src(['src/fonts/*.*'])
		.pipe(gulp.dest('build/fonts/'))
		.pipe(fileSize())
    	.pipe(browserSync.reload({stream:true}));
}

function movei18n(){
    return gulp.src(['src/utils/i18n/*.*'])
		.pipe(gulp.dest('build/i18n/'))
		.pipe(fileSize())
    	.pipe(browserSync.reload({stream:true}));
}

function moveTemplate(){
	return gulp.src(['src/vue/template/*.*'])
		.pipe(gulp.dest('build/template/'))
		.pipe(fileSize())
    	.pipe(browserSync.reload({stream:true}));
}

function moveCharts(){
	return gulp.src(['src/chart/*.*'])
		.pipe(gulp.dest('build/chart/'))
		.pipe(fileSize())
    	.pipe(browserSync.reload({stream:true}));
}

function moveApiTest(){
	return gulp.src(['src/vue/apiTest/*.json'])
		.pipe(gulp.dest('build/js/apiTest/'))
		.pipe(fileSize())
    	.pipe(browserSync.reload({stream:true}));
}

function cleanBuild(){
	return gulp.src(['build/'])
		.pipe(clean({
			read: false
		}))
}

// webpack

function devWebpack(done){
	delete webpackConf.entry.style;
	delete webpackConf.entry.template;
	webpack(webpackConf, function (err, stats) {
		if (err)  handleErrors(err);
		gutil.log('[webpack:dev]', stats.toString({ colors: true, chunkModules: false }));
		done();
	})
}
// handleErrors
function handleErrors(){
	var args = Array.prototype.slice.call(arguments);
	// Send error to notification center with gulp-notify
	notify.onError({
	   title: "Compile Error",
	    message: "<%= error %>"
	}).apply(this, args);
	// Keep gulp from hanging on this task
	this.emit('end');
	gutil.beep();
}
