'use strict';

var gulp = require('gulp')
    , rimraf = require('rimraf')
    , sass = require('gulp-sass')
    , shell = require('gulp-shell')
    , rigger = require('gulp-rigger')
    , uglify = require('gulp-uglify')
    , watch = require('gulp-watch')
    , rename = require('gulp-rename')
    , cssmin = require('gulp-minify-css')
    , imagemin = require('gulp-imagemin')
    , prefixer = require('gulp-autoprefixer')
    , browserSync = require('browser-sync')
    , pngquant = require('imagemin-pngquant')
    , reload = browserSync.reload
    ;
 
gulp.task('default', ['server', 'watch']);
gulp.task('start', ['build', 'server', 'watch']);
gulp.task('build', [ 'clean', 'html:build', 'js_plugins:build', 'js_main:build', 'scss_core:build', 'scss_main:build', 'font:build', 'img:build' ]);
gulp.task('watch', [ 'html:watch', 'js_plugins:watch', 'js_main:watch', 'scss_core:watch', 'scss_main:watch', 'img:watch', 'font:watch' ]);

var path = {
    clients: {
        build: './build/'
    },
    scss: {
        core : './src/scss/core.scss',
        scss : './src/scss/main.scss',
        folder : './src/scss/core/**/*.scss'
    },
    js: {
        js : './src/js/main.js',
        plugin : './src/js/plugin.js',
        folder : './src/js/plugin/**/*.js'
    },
    html: {
        html : './src/html/*.html',
        folder : './src/html/**/*.html'
    },
    assets: {
        img : './src/img/**/*',
        font : './src/fnt/**/*'
    }
};
 
var config = {
    server: {
        baseDir: path.clients.build
    },
    tunnel: false,
    host: 'localhost',
    port: 8010
};
 
gulp.task('html:build', function () {
    gulp.src(path.html.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.clients.build))
        .pipe(reload({stream: true}))
});

gulp.task('scss_main:build', function () {
    gulp.src(path.scss.scss) 
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(rename({
            basename : "style"
        }))
        .pipe(gulp.dest(path.clients.build + '/css'))
        .pipe(reload({stream: true}))
});

gulp.task('scss_core:build', function () {
    gulp.src(path.scss.core) 
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(rename({
            basename : "min"
        }))
        .pipe(gulp.dest(path.clients.build + '/css'))
        .pipe(reload({stream: true}))
});

gulp.task('js_plugins:build', function () {
    gulp.src(path.js.plugin) 
        .pipe(rigger()) 
        .pipe(uglify()) 
        .pipe(rename({
            basename : "min"
        }))
        .pipe(gulp.dest(path.clients.build + '/js'))
        .pipe(reload({stream: true}))
});

gulp.task('js_main:build', function () {
    gulp.src(path.js.js) 
        .pipe(rigger()) 
        .pipe(uglify()) 
        .pipe(rename({
            basename : "script"
        }))
        .pipe(gulp.dest(path.clients.build + '/js'))
        .pipe(reload({stream: true}))
});

gulp.task('img:build', function () {
    gulp.src(path.assets.img) 
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
    watch([path.html.folder], function(event, cb) {
        gulp.start('html:build');
    });
});

gulp.task('scss_core:watch', function(){
    watch([path.scss.folder], function(event, cb) {
        gulp.start('scss_core:build');
    });
});

gulp.task('scss_main:watch', function(){
    watch([path.scss.scss], function(event, cb) {
        gulp.start('scss_main:build');
    });
});

gulp.task('js_plugins:watch', function(){
    watch([path.js.folder], function(event, cb) {
        gulp.start('js_plugins:build');
    });
});

gulp.task('js_main:watch', function(){
    watch([path.js.js], function(event, cb) {
        gulp.start('js_main:build');
    });
});

gulp.task('img:watch', function(){
    watch([path.assets.img], function(event, cb) {
        gulp.start('img:build');
    });
});

gulp.task('font:watch', function(){
    watch([path.assets.font], function(event, cb) {
        gulp.start('font:build');
    });
});
 
gulp.task('server', function () {
    browserSync(config);
});

gulp.task('clear', ['clean']);
gulp.task('clean', function (cb) {
    rimraf(path.clients.build, cb);
});


gulp.task('init', shell.task([
  'mkdir src',
  'mkdir src/html',
  'mkdir src/html/tpl',
  'touch src/html/index.html',
  'mkdir src/scss',
  'mkdir src/scss/core',
  'touch src/scss/main.scss',
  'touch src/scss/core.scss',
  'mkdir src/js',
  'touch src/js/plugin.js',
  'touch src/js/main.js',
  'mkdir src/js/plugin',
  'mkdir src/img',
  'mkdir src/fnt'
]));