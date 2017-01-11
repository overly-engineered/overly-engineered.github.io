var gulp = require('gulp'), cleanCSS = require('gulp-clean-css'), watch = require('gulp-watch');

gulp.task('stream', function () {
    // Endless stream mode
    return watch('css/dev/styles.css', { ignoreInitial: false })
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css/dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/dev/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/dist'));
});
