
var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


var minifyCSS = function () {
    return gulp.src('./app/css/dev/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/')); // doesn't like ./ at start :(
}
var compileJS = function () {
    return gulp.src('./app/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'))
}

gulp.task('css', function () {
    minifyCSS();
});

gulp.task('js', function () {
    compileJS();
});

gulp.task('default', function () {
    minifyCSS();
    return compileJS();
});

gulp.task('watch', function () {
    var jsWatcher = gulp.watch('./app/js/*.js', compileJS());
    jsWatcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    var cssWatcher = gulp.watch('./app/css/dev/*.css', minifyCSS());
    cssWatcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    return gulp.parallel(['js', 'css']);
});