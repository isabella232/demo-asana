var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass:clean', function () {
    return gulp.src(['./stylesheets/main.*'])
                .pipe(clean());
});

gulp.task('sass:build', ['sass:clean'], function () {

    return gulp.src(['sass/main.scss'])
                .pipe(sourcemaps.init())
                .pipe(sass())
                .on('error', function (error) {
                    console.error(error); 
                    this.emit('end');
                 })
                .pipe(autoprefixer())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('stylesheets/'));
});

gulp.task('sass:watch', function () {
    gulp.watch(['sass/**/*.scss'], ['sass:build'])
});

gulp.task('server', function() {
    browserSync.init({
        server: "."
    });
});

gulp.task('run', ['server', 'sass:watch']);