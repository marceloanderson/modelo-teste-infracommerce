"use strict";

var gulp		= require('gulp'),
	gutil		= require('gulp-util'),
	plumber		= require('gulp-plumber'),
	imagemin	= require('gulp-imagemin'),
	uglify		= require('gulp-uglifyjs'),
	sass		= require('gulp-ruby-sass'),
	connect		= require('gulp-connect'),
	changed		= require('gulp-changed'),
	ignore		= require('gulp-ignore');

var paths = {
		scripts: ['src/js/plugins/*.js','src/js/app.js'],
		sass: 'src/sass/**/*.scss',
		html: 'src/**/*.html',
		images: 'src/images/**/*'
	};

gulp.task('scripts', function () {
	return gulp.src(paths.scripts)
		.pipe(plumber())
		.pipe(uglify('app.min.js', {
			outSourceMap: true,
			basePath: 'src/js/'
		}))
		.pipe(gulp.dest('build/js'))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	return gulp.src(paths.sass)
		.pipe(plumber())
		.pipe(sass({
			// sourcemap: true,
			noCache: true,
			style:'compressed'
		}))
		.pipe(gulp.dest('build/css'))
		.pipe(ignore.exclude('**/*.map'))
		.pipe(connect.reload());
});

gulp.task('html', function () {
	return gulp.src(paths.html)
		.pipe(connect.reload());
});

gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe(plumber())
		.pipe(changed('build/images'))
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true
		}))
		.pipe(gulp.dest('build/images'));
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'scripts', 'sass', 'images', 'html']);
// gulp.task('build', ['default', 'images']);