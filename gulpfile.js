var gulp        = require('gulp'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    babel       = require('gulp-babel'),
    copy        = require('gulp-copy'),
    gzip        = require('gulp-gzip'),
    cssnano     = require('gulp-cssnano');

gulp.task('del', function(){
    return del.sync('dist');
})


gulp.task('js',  function(){
    return gulp.src(['js/localforage.js', 'js/idb.js', 'js/dbhelper.js'])
    .pipe(sourcemaps.init())
    .pipe( babel( {
        presets: [ 'env' ],
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
});

gulp.task('gzip', function(){
    return gulp.src('css/*.css')
    .pipe(gzip())
    .pipe(gulp.dest('gzipped'))
})

gulp.task('css', function(){
    return gulp.src('css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
})