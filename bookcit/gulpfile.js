var gulp = require('gulp');
var minsass = require('gulp-sass');
var concat = require('gulp-concat');
var server = require('gulp-webserver');
var mincss = require('gulp-clean-css');
var autop = require('gulp-autoprefixer')
var fs = require('fs');
var path = require('path');
var url = require('url')
var mock = require('./mock/index')
gulp.task('css', function() {
    return gulp.src('./src/sass/*')
        .pipe(minsass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('devserver', function() {
    return gulp.src('/src/')
        .pipe(server({
            port: 9999,
            open: true,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                if (/^\/api/.test(req.url)) {
                    res.end(mock(req.url))
                } else {
                    var pathname = url.parse(req.url).pathname;
                    pathname = /(\.html|\.css|\.js|\.png)$/.test(pathname) ? pathname : 'index.html';
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('watch', function() {
    return gulp.watch('./src/sass/*', gulp.series('css'))
})
gulp.task('dev', gulp.series('css', 'devserver', 'watch'))