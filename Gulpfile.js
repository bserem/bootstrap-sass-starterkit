var gulp = require('gulp');
    del = require('del');
    stripDebug = require('gulp-strip-debug');
    plumber = require('gulp-plumber'); //error handling
    replace = require('gulp-replace'); //replace text
    autoprefixer = require('gulp-autoprefixer'); // vendor-prefix css
    sass = require('gulp-sass'); //libsass
    nano = require('gulp-cssnano');
    spawn = require('child_process').spawn; // auto-reload gulpfile on change
    imagemin = require('gulp-imagemin');
    pngquant = require('imagemin-pngquant');
    sourcemaps = require('gulp-sourcemaps'); // sourcemaps for SASS->CSS
    spritesmith = require('gulp.spritesmith'); // sprite generator
    uglify = require('gulp-uglify');
    jshint = require('gulp-jshint');
    concat = require('gulp-concat');
    jqc = require('gulp-jquery-closure');
    shell = require('gulp-shell');
    size = require('gulp-size');
    googleWebFonts = require('gulp-google-webfonts');

var config = {
  // SOURCE
  sass:'source/sass/**/*.{scss,sass}',
  bootstrap_sass:'source/bootstrap-sass/**/*.{scss,sass}',
  js:'source/js/**/*.js',
  contribjs:'source/contrib-js/**/*.js',
  tpl:'templates/**/*.{php,html}',
  images:'source/assets/images/*.{png,gif,jpeg,jpg,svg}',
  sprites:'source/assets/sprites/*.{png,gif,jpeg,jpg,svg}',
  fonts:'source/assets/fonts/*.{eot,svg,ttf,woff}',

  // IN THE MIDDLE
  distsass:'source/sass/solebich', // ATTENTION: This goes to source folder and then gets minified to dist
  distsprites:'source/assets/images', // ATTENTION: This goes to source folder and then gets minified to dist

  // DIST
  dist: 'dist',
  distcss:'dist/css',
  distjs:'dist/js',
  distfonts:'dist/assets/fonts',
  distimages:'dist/assets/images',
};

/**
 * Error Handling
 */
var onError =function(err) {
  console.log(err.toString());
  this.emit('end');
};

/**
 * Default task, executed when Gulp is called with no arguments.
 */
gulp.task('default', ['watch'], function() {
  // place code for your default task here
});

/**
 * Clean-Up dist
 */
gulp.task('clean', function(cb) {
  del([
    'dist/**/*',
    // we don't want to clean this file though so we negate the pattern
    // '!dist/mobile/deploy.json'
  ], cb);
});

/**
 * Auto Reload Gulp process if Gulpfile.js is changed.
 * http://noxoc.de/2014/06/25/reload-gulpfile-js-on-change/
 */
gulp.task('auto-reload', function() {
  var process;
  function restart() {
    if (process) {
      process.kill();
    }
    process = spawn('gulp', ['watch'], {stdio: 'inherit'}); // start Gulp with 'watch' task
  }
  gulp.watch('Gulpfile.js', restart);
  restart();
});

/**
 * Watch task
 * Enables automatic reload of CSS in browsers (pushes new CSS)
 * Auto compiles SASS files on file-change.
 */
gulp.task('watch', ['production'], function() {
  //livereload.listen(35729);
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.js, ['scripts']);
  gulp.watch(config.images, ['images']);
  gulp.watch(config.sprites, ['sprites']);
  gulp.watch(config.fonts, ['copyFonts']);
  gulp.watch('**/*.{php,inc,info}', ['drush']);
});

/**
 * SASS Compilling task, with libsass
 * and sourcemaps
 */
gulp.task('sass', function () {
  gulp.src(config.sass)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded', sourceComments: 'true' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(size({title:'css'}))
    .pipe(gulp.dest(config.distcss));
    //.pipe(livereload());
});
gulp.task('prod-sass', function () {
  gulp.src(config.sass)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(size({title:'css'}))
    .pipe(nano())
    .pipe(size({title:'css'}))
    .pipe(gulp.dest(config.distcss));
});

/**
 * Concat JS.
 */
gulp.task('scripts', function() {
  //gulp.src([config.js, '!'+config.js+'modernizr.js'])
  gulp.src(config.js)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    //.pipe(gulpIgnore.exclude(/modernizr\.js/))
    .pipe(replace('$(document).ready(function()', '$(function()'))
    .pipe(concat('main.js'))
    .pipe(jqc())
    //.pipe(uglify())
    .pipe(gulp.dest(config.distjs))
    //.pipe(livereload())
    .pipe(size({title:'js'}));
});

/**
 * Production JS.
 */
gulp.task('prod-js', function() {
  gulp.src(config.js)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    //.pipe(gulpIgnore.exclude(/modernizr\.js/))
    .pipe(replace('$(document).ready(function()', '$(function()'))
    .pipe(stripDebug())
    .pipe(concat('main.js'))
    .pipe(jqc())
    .pipe(uglify())
    .pipe(gulp.dest(config.distjs))
    .pipe(size({title:'js'}));
});

/**
 * Google webfonts.
 */
gulp.task('googlewebfonts', function () {
  var options = {
    fontsDir: 'assets/fonts/',
    cssDir: 'sass/',
    cssFilename: 'googlewebfonts.scss',
  };
  return gulp.src('./source/assets/fonts/fonts.list')
  .pipe(googleWebFonts(options))
  .pipe(gulp.dest('source'));
});

/**
 * Minify images.
 */
gulp.task('images', function () {
  gulp.src(config.images)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.distimages))
    .pipe(size({title:'images'}));
});

/**
 * Make sprites
 */
gulp.task('sprites', function () {
  var spriteData = gulp.src(config.sprites)
    .pipe(plumber())
    .pipe(spritesmith({
      imgPath: '../assets/images/sprites.png',
      imgName: 'sprites.png',
      cssName: '_sprites.scss',
      algorithm: 'top-down',
      padding: 2,
    }));
  spriteData.img
    .pipe(gulp.dest(config.distsprites));
  spriteData.css
    .pipe(gulp.dest(config.distsass));
});
gulp.task('logos', function () {
  var spriteData = gulp.src('source/assets/sprites/logos/*.png')
    .pipe(plumber())
    .pipe(spritesmith({
      imgPath: '../assets/images/logos.png',
      retinaImgPath: '../assets/images/logos-2x.png',
      retinaSrcFilter: 'source/assets/sprites/logos/*-2x.png',
      imgName: 'logos3.png',
      retinaImgName: 'logos-2x.png',
      cssName: '_logosprites.scss',
      algorithm: 'top-down',
      padding: 2,
    }));
  spriteData.img
    .pipe(gulp.dest('source/assets/images'));
  spriteData.css
    .pipe(gulp.dest(config.distsass));
});


/**
 * Copy files to dist as needed.
 */
gulp.task('copyFiles', ['copyFonts', 'copyContribJS'], function() {
});
gulp.task('copyFonts', function () {
  gulp.src(config.fonts)
    .pipe(gulp.dest(config.distfonts))
    .pipe(size({title:'fonts'}));
});
gulp.task('copyContribJS', function () {
  gulp.src(config.contribjs)
    .pipe(gulp.dest(config.distjs))
    .pipe(size({title:'contribjs'}));
});

/**
 * Prepare bootstrap sass subtheme.
 */
gulp.task('prepare-bootstrap', function () {
  gulp.src("bower_components/bootstrap-sass/**/*")
    .pipe(gulp.dest("source/bootstrap-sass"));
});

/**
 * Production task.
 * Compilles SASS files for production site.
 */
gulp.task('production', ['prod-sass', 'prod-js', 'copyFiles', 'sprites', 'images'], function() {
});

/**
 * First Run task.
 * Use this to prepare a new site clone for development.
 * Requires livereload library and module properly installed.
 */
gulp.task('firstrun', ['prepare-bootstrap', 'sass', 'scripts', 'sprites'], function() {
});
