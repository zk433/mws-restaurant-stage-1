var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    cssnano     = require('gulp-cssnano'),
    htmlmin     = require('gulp-htmlmin'),
    imagemin    = require('gulp-imagemin'),
    uglify      = require('gulp-uglify'),
    cache       = require('gulp-cache'),
    useref      = require('gulp-useref'),
    rename      = require('gulp-rename');

gulp.task('hello', function() {
    console.log('Hi!');
});

