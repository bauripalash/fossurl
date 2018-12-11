var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var pump = require('pump');
 

gulp.task('m-html', function() {
    return gulp.src('index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('output'));
});

gulp.task('m-css', function() {
    var plugins = [
        cssnano()
    ];
    return gulp.src('index.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('output'));
});

gulp.task('m-js', function (cb) {
    pump([
          gulp.src(['index.js' , 'head.js']),
          uglify(),
          gulp.dest('output')
      ],
      cb
    );
  });

gulp.task('default', gulp.series('m-html', 'm-css', 'm-js'));
// exports.default = series(clean, build);