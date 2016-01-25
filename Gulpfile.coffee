gulp = require 'gulp'
uglify = require 'gulp-uglify'
cssmin = require 'gulp-cssmin'
htmlmin = require 'gulp-minify-html'
useref = require 'gulp-useref'
gulpif = require 'gulp-if'
rs = require 'run-sequence'

# -----------------------------------------------

gulp.task 't2', ->
	gulp.src 'dist/index.html'
		.pipe htmlmin()
		.pipe gulp.dest('dist')

gulp.task 't1', ->
	gulp.src 'src/index.html'
		.pipe useref()
		.pipe gulpif('*.js',  uglify())
		.pipe gulpif('*.css',  cssmin())
		.pipe gulp.dest('dist')

gulp.task 'default', -> rs 't1', 't2'