'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var webpack = require('webpack');
var webpackConfigDev = require('./webpack/config.dev.js');
var webpackConfigProd = require('./webpack/config.prod.js');
var WebpackDevServer = require('webpack-dev-server');

var runSequence = require('run-sequence');
var del = require('del');

gulp.task('server', function(){
    runSequence('start-dev-server');
});

gulp.task('start-dev-server', function(cb) {
    var bundleStart = null;
    var bundler = webpack(webpackConfigDev);
    bundler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });
    bundler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });
    var webpackDevServer = new WebpackDevServer(bundler, {
        publicPath: '/dist/',
        hot: false,
        quiet: false,
        noInfo: true,
        stats: {
            colors: true
        }
    });
    webpackDevServer.listen(3000, 'localhost', function () {
        console.log('Bundling project, please wait...');
    });
});


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////                PRODUCTION                       ///////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
    del(['./dist/**']).then(function (paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('copy-task', function(){
    gulp.src(['./src/examples/*.html'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function (cb) {
    var bundler = webpack(webpackConfigProd);
    function bundle(err, stats) {
        if (err) {
            //Only happen for fatal errors
            gutil.log('[webpack error] ', err.error);
        }
        if(stats.hasErrors()){
            //Webpack will tolerant such error and go on for next compile.
            gutil.log('[webpack] error', stats.compilation.errors[0].message);
        }
        return cb();
    }
    bundler.run(bundle);
});

gulp.task('build-prod', function(cb){
    runSequence('clean', ['copy-task', 'webpack'], function(){
        cb();
    });
});