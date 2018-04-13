var gulp        = require('gulp'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    babel       = require('gulp-babel'),
    copy        = require('gulp-copy');

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

// gulp.task('js',  function(){
//     return gulp.src('js/*.js')
//     .pipe(sourcemaps.init())
//     .pipe( babel( {
//         presets: [ 'env' ],
//     }))
//     .pipe(uglify())
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('dist'))
// });