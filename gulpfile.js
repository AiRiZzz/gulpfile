'use strict';

var gulp = require('gulp')
    , rimraf = require('rimraf')
    , less = require('gulp-less')
    , jade = require('gulp-jade')
    , shell = require('gulp-shell')
    , uglify = require('gulp-uglify')
    , rigger = require('gulp-rigger')
    , watch = require('gulp-watch')
    , notify = require("gulp-notify")
    , rename = require("gulp-rename")
    , cssmin = require('gulp-minify-css')
    , imagemin = require('gulp-imagemin')
    , prefixer = require('gulp-autoprefixer')
    , browserSync = require("browser-sync")
    , pngquant = require('imagemin-pngquant')
    , reload = browserSync.reload
    ;
 
gulp.task('default', ['start:html']);
gulp.task('init:html', ['html:init', 'src:init']);
gulp.task('init:jade', ['jade:init', 'src:init']);
gulp.task('start:html', ['build:html', 'server', 'watchfull:html']);
gulp.task('start:jade', ['build:jade', 'server', 'watchfull:jade']);
gulp.task('build:html', [ 'html:build', 'js:build', 'less:build', 'font:build', 'img:build' ]);
gulp.task('build:jade', [ 'jade:build', 'js:build', 'less:build', 'font:build', 'img:build' ]);
gulp.task('watchfull:html', [ 'html:watch', 'js:watch', 'less:watch', 'img:watch', 'font:watch' ]);
gulp.task('watchfull:jade', [ 'jade:watch', 'js:watch', 'less:watch', 'img:watch', 'font:watch' ]);

var path = {
    clients: {
        build: './build/'
    },
    src: {
        html : './src/html/*.html',
        jade : './src/jade/*.jade',
        less : './src/less/main.less',
        js : './src/js/main.js',
        img : './src/img/**/*',
        font : './src/fnt/**/*'
    },
    watch: {
        html : './src/html/**/*.html',
        jade : './src/jade/**/*.jade',
        less : './src/less/**/*.less',
        js : './src/js/**/*.js',
        img : './src/img/**/*',
        font : './src/fnt/**/*'
    }
};
 
var config = {
    server: {
        baseDir: path.clients.build
    },
    tunnel: true,
    host: 'localhost',
    port: 8000
};
 
gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.clients.build))
        .pipe(reload({stream: true}))
        // .pipe(notify('HTML : OK'));
});

gulp.task('jade:build', function () {
    gulp.src(path.src.jade)
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest(path.clients.build))
        .pipe(reload({stream: true}))
        // .pipe(notify('JADE : OK'));
});

gulp.task('less:build', function () {
    gulp.src(path.src.less) 
        .pipe(less())
        .pipe(prefixer())
        .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(rename({
            basename : "style",
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.clients.build + '/css'))
        .pipe(reload({stream: true}))
        // .pipe(notify('LESS : OK'));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(uglify()) 
        .pipe(rename({
            basename : "script",
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.clients.build + '/js'))
        .pipe(reload({stream: true}))
        // .pipe(notify('JS : OK'));
});

gulp.task('img:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.clients.build + '/img'))
        .pipe(reload({stream: true}))
});
 
gulp.task('font:build', function() {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.clients.build + '/fnt'))
});

gulp.task('html:watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
});

gulp.task('jade:watch', function(){
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
});

gulp.task('less:watch', function(){
    watch([path.watch.less], function(event, cb) {
        gulp.start('less:build');
    });
});

gulp.task('js:watch', function(){
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('img:watch', function(){
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
});

gulp.task('font:watch', function(){
    watch([path.watch.font], function(event, cb) {
        gulp.start('font:build');
    });
});
 
gulp.task('server', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clients.build, cb);
});

gulp.task('html:init', shell.task([
  'mkdir src',
  'mkdir src/html',
  'mkdir src/html/tpl',
  'touch src/html/index.html'
]));

gulp.task('jade:init', shell.task([
  'mkdir src',
  'mkdir src/jade',
  'mkdir src/jade/tpl',
  'touch src/jade/index.jade'
]));

gulp.task('src:init', shell.task([
  'mkdir src/less',
  'mkdir src/less/devl',
  'touch src/less/main.less',
  'touch src/less/devl/var.less',
  'mkdir src/js',
  'touch src/js/main.js',
  'mkdir src/js/devl',
  'mkdir src/img',
  'mkdir src/fnt'
]));