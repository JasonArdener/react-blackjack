var gulp = require('gulp');
//var less = require('gulp-less');
//var reporter = require('gulp-less-reporter');
var connect = require('gulp-connect');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var assign = require('lodash.assign');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var compass = require('gulp-compass');
var pixrem = require('gulp-pixrem');
var Server = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

//++++++++++++++++++++++
//+ Private vars
//++++++++++++++++++++++

var portNumber = 8080;

//++++++++++++++++++++++++
//+ CLI tasks [public]
//++++++++++++++++++++++++

gulp.task('default', function( callback ) {
	runSequence(
		[
			'clean:build',
		],
		[
            'copy:html',
			'copy:images',
		],
		[
			'modules:app-sass',
            'modules:app-js',
			'modules:app-test',
			'serve:dev',
			'watch:html',
			'watch:sass'
		]
	, callback);
});

//++++++++++++++++++++++
//+ Tasks [private]
//++++++++++++++++++++++

//++++++++++++++++++++++
//+ SASS
//++++++++++++++++++++++

gulp.task('modules:app-sass', function() {
  gulp.src('./styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(compass({
      css: './build/',
      sass: './styles/',
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(pixrem({
      rootValue: '100%',
      replace: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(cssmin())
    .pipe(gulp.dest('./build/'));
});

//++++++++++++++++++++++
//+ Javascript
//++++++++++++++++++++++

var destJs =  './build/js/'

var globalBrowserifyOpts = {
    paths: [
        './node_modules', 
        './bower_components/',
	],
    debug: true
};

function bundle(b, bundleName, bundleDest) {
    return b.bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red(Error ('Browserify Error: ') + err.message));
            this.emit('end');
        })
        .pipe(source(bundleName))
        .pipe(gulp.dest(bundleDest));
}

function setUpBrowserify(browserifyOpts, bundleName, bundleDest) {
    var opts = assign( {}, watchify.args, globalBrowserifyOpts, browserifyOpts );
    var b = watchify( browserify(opts) ); 
        b.transform(babelify);
        b.on('update', function(){
            bundle(b, bundleName, bundleDest);
        });
        b.on('log', gutil.log);
    return b;
}

// Define Browserify bundles, setup Browserify tasks and gulp tasks
// MAIN BUNDLE
var mainBundleOpts = {
    entry: './app/index.js',
    bundleFilename: 'app.debug.js',
    bundleDest: destJs
}
var testBundleOpts = {
    entry: './app/index.spec.js',
    bundleFilename: 'app.spec.js',
    bundleDest: destJs
}
var mainBundle = setUpBrowserify({
        entries: [mainBundleOpts.entry]
    },
    mainBundleOpts.bundleFilename,
    mainBundleOpts.bundleDest
);
var testBundle = setUpBrowserify({
        entries: [testBundleOpts.entry]
    },
    testBundleOpts.bundleFilename,
    testBundleOpts.bundleDest
);
gulp.task('modules:app-js', function() { 
    bundle(mainBundle, mainBundleOpts.bundleFilename, mainBundleOpts.bundleDest);
});

gulp.task('modules:app-test', function() { 
    bundle(testBundle, testBundleOpts.bundleFilename, testBundleOpts.bundleDest);
});

//++++++++++++++++++++++
//+ Copy
//++++++++++++++++++++++

gulp.task('copy:images', function () {
    return gulp.src('./img/**')
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('copy:html', function () {
	return gulp.src('./app/index.html')
		.pipe(gulp.dest('./build/'));
});

gulp.task('copy:package-bundles', function () {
	return gulp.src([
			'./bundles/global.css',
			'./bundles/global.js'
		])
		.pipe(gulp.dest('./build/bundles/'));
});

//++++++++++++++++++++++
//+ Clean
//++++++++++++++++++++++

gulp.task('clean:build', function ( callback ) {
	del(['./build/'], callback);
});

gulp.task('clean:js-modules', function ( callback ) {
	del(['./build/**/*.js', '!./build/bundles/*.*'], callback);
});

gulp.task('clean:css-modules', function ( callback ) {
	del(['./build/**/*.css', '!./build/bundles/*.*'], callback);
});


//++++++++++++++++++++++
//+ Server
//++++++++++++++++++++++

gulp.task('serve:dev', function() {
	connect.server({
		root: 'build',
		port: portNumber,
		livereload: true
	});
});


//++++++++++++++++++++++
//+ Test
//++++++++++++++++++++++

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
        done();
    }).start();
});

//++++++++++++++++++++++
//+ Watch
//++++++++++++++++++++++

gulp.task('watch:sass', function () {
	return gulp.watch([
		'styles/**/*.scss'
	], ['modules:app-sass']);
});

gulp.task('watch:html', function () {
	return gulp.watch([
		'app/**/*.html'
	], ['copy:html']);
});
