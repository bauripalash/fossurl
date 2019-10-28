var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var del = require('del');
var zip = require("gulp-zip");

function compress(){
    return gulp
        .src('output/*')
        .pipe(zip('package.zip'))
        .pipe(gulp.dest('output'));
}
 
function pre_js() {
    return gulp
    .src(['src/index.js'])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('comp'));
}

function m_html() {
    return gulp
        .src('src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('output'));
}

function m_css(){
    var plugins = [
        cssnano()
    ];
    return gulp
        .src('src/index.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('output'));
}

function m_js(){
    return gulp
        .src(['comp/index.js'])
        .pipe(uglify())
        .pipe(gulp.dest('output'));
}

function copy_extras(){
    return gulp
        .src(['src/CNAME' , 'src/runme.py' , 'src/head.js'])
        .pipe(gulp.dest('output'));
}

function clean(){
    return del(["./comp"]);
}

function pack_clean(){
    return del(["./output/CNAME" , "./output/head.js" , "./output/index.css" , "./output/index.html" , "./output/index.js" , "./output/runme.py"]);
}

gulp.task("html", m_html);
gulp.task("css", m_css);
gulp.task("js", m_js);
gulp.task("pre_js", pre_js);
gulp.task("clean" , clean);
gulp.task("copy_extras" , copy_extras);
gulp.task("compress" , compress);
gulp.task("pack_clean" , pack_clean);


gulp.task(
    "build",
    gulp.series("html", "css" , "pre_js" , "js" , "copy_extras" , "clean")
);

gulp.task(
    "packit",
    gulp.series("build" , "compress" , "pack_clean")
);
