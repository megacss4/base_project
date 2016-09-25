'use strict';

// npm i -S browser-sync gulp gulp-autoprefixer gulp-imagemin gulp-line-ending-corrector gulp-minify-css gulp-rename gulp-rigger gulp-sass gulp-sourcemaps gulp-uglify gulp-watch imagemin-pngquant normalize.css rimraf
// bower i -S jquery

const browserSync = require("browser-sync"),
  reload = browserSync.reload,
  gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  lec = require('gulp-line-ending-corrector'),
  cssmin = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  rigger = require('gulp-rigger'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf');

// PATH ==========

var path = {
  build: {
    view: 'build/',
    ico: 'build/',
    data: 'build/data/',
    fonts: 'build/fonts/',
    images: 'build/images/',
    style: 'build/style/',
    scripts: 'build/scripts/'
  },

  dev: {
    view: 'dev/',
    ico: 'dev/',
    data: 'dev/data/',
    fonts: 'dev/fonts/',
    images: 'dev/images/',
    style: 'dev/style/',
    scripts: 'dev/scripts/'
  },

  source: {
    view: 'source/html/*.html',
    ico: 'source/images/*.ico',
    data: 'source/data/**/*.*',
    fonts: 'source/fonts/**/*.*',
    images: 'source/images/**/*.*',
    style: 'source/scss/*.scss',
    scripts: 'source/scripts/*.js'
  },

  watch: {
    view: 'source/html/**/*.html',
    ico: 'source/images/*.ico',
    data: 'source/data/**/*.*',
    fonts: 'source/fonts/**/*.*',
    images: 'source/images/**/*.*',
    style: 'source/scss/**/*.scss',
    scripts: 'source/scripts/**/*.js'
  },

  clean: {
    dev: './dev',
    build: './build'
  }
};

// ASSETS ==========

gulp.task('jquery', function() {
  return gulp.src('bower_components/jquery/dist/jquery.js')
    .pipe(gulp.dest('source/scripts/'));
});

gulp.task('normalize', function() {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(rename('_normalize.scss'))
    .pipe(gulp.dest('source/scss/base/'));
});

gulp.task('assets', [
  'normalize',
  'jquery'
]);

// DEV ==========

var devConfig = {
  server: {
    baseDir: "./dev"
  },
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Dev"
};

gulp.task('view:dev', function () {
  return gulp.src(path.source.view)
    .pipe(rigger())
    .pipe(lec())
    .pipe(gulp.dest(path.dev.view))
    .pipe(reload({stream: true}));
});

gulp.task('ico:dev', function () {
  return gulp.src(path.source.ico)
    .pipe(gulp.dest(path.dev.ico))
    .pipe(reload({stream: true}));
});

gulp.task('data:dev', function () {
  return gulp.src(path.source.data)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.dev.data))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:dev', function () {
  return gulp.src(path.source.fonts)
    .pipe(gulp.dest(path.dev.fonts))
    .pipe(reload({stream: true}));
});

gulp.task('images:dev', function () {
  return gulp.src(path.source.images)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.dev.images))
    .pipe(reload({stream: true}));
});

gulp.task('style:dev', function () {
  return gulp.src(path.source.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dev.style))
    .pipe(reload({stream: true}));
});

gulp.task('scripts:dev', function () {
  return gulp.src(path.source.scripts)
    .pipe(rigger())
    .pipe(gulp.dest(path.dev.scripts))
    .pipe(reload({stream: true}));
});

gulp.task('dev', [
  'view:dev',
  'ico:dev',
  'data:dev',
  'fonts:dev',
  'images:dev',
  'style:dev',
  'scripts:dev'
]);

gulp.task('watch', function() {
  watch([path.watch.view], function(event, cb) {
    gulp.start('view:dev');
  });

  watch([path.watch.ico], function(event, cb) {
    gulp.start('ico:dev');
  });

  watch([path.watch.data], function(event, cb) {
    gulp.start('data:dev');
  });

  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:dev');
  });

  watch([path.watch.images], function(event, cb) {
    gulp.start('images:dev');
  });

  watch([path.watch.style], function(event, cb) {
    gulp.start('style:dev');
  });

  watch([path.watch.scripts], function(event, cb) {
    gulp.start('scripts:dev');
  });
});

gulp.task('webserver:dev', function () {
    browserSync(devConfig);
});

gulp.task('clean:dev', function (cb) {
    rimraf(path.clean.dev, cb);
});

gulp.task('default', ['dev', 'webserver:dev', 'watch']);

// BUILD ==========

gulp.task('view:build', function () {
  return gulp.src(path.source.view)
    .pipe(rigger())
    .pipe(lec())
    .pipe(gulp.dest(path.build.view))
    .pipe(reload({stream: true}));
});

gulp.task('ico:build', function () {
  return gulp.src(path.source.ico)
    .pipe(gulp.dest(path.build.ico))
    .pipe(reload({stream: true}));
});

gulp.task('data:build', function () {
  return gulp.src(path.source.data)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.data))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
  return gulp.src(path.source.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}));
});

gulp.task('images:build', function () {
  return gulp.src(path.source.images)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.images))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  return gulp.src(path.source.style)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.style))
    .pipe(reload({stream: true}));
});

gulp.task('scripts:build', function () {
  return gulp.src(path.source.scripts)
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest(path.build.scripts))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
  'view:build',
  'ico:build',
  'data:build',
  'fonts:build',
  'images:build',
  'style:build',
  'scripts:build'
]);

gulp.task('clean:build', function (cb) {
    rimraf(path.clean.build, cb);
});