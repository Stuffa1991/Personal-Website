'use strict';
 
const gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint');

gulp.task('sass', function () {
	return gulp.src('./app/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist/assets/stylesheets'));
});

gulp.task('compress', function () {
	return gulp.src('./app/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(jshint())
    	.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/assets/javascript'));
});

gulp.task('html', function () {
  gulp.src('./dist/*.html')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/js/**/*.js', ['compress']);
    gulp.watch('./dist/**/*.html', ['html']);
});

gulp.task('default',['sass', 'compress', 'html', 'watch', 'connect'], function() {

});