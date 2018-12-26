let gulp = require('gulp');
let less = require('gulp-less');
let path = require('path');
let minify = require('gulp-babel-minify');
let pump = require('pump');

gulp.task('less', function () {
    return gulp.src('assets/less/app.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('js', function (cb) {
    pump([
            gulp.src('assets/js/**/*.js'),
            minify(),
            gulp.dest('public/js')
        ],
        cb
    );
});

let all = function () {
    gulp.watch('assets/less/**/*.less', gulp.parallel('less'));

    gulp.watch('assets/js/**/*.js', gulp.parallel('js'))
};

gulp.task('default', gulp.series(gulp.parallel('less', 'js'), all));