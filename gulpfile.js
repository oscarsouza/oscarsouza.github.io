var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  plumber = require('gulp-plumber'),
  prefixer = require('autoprefixer-stylus'),
  rupture = require('rupture'),
  koutoSwiss = require('kouto-swiss'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('bundle', ['exec', 'jekyll build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('imagemin', function() {
  return gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('assets/img/'));
});

gulp.task('stylus', function() {
  return gulp.src('src/styl/style.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [prefixer(), rupture(), koutoSwiss()],
      compress: true
    }))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('cp-icons', ['cp-fonts'], function() {
  return gulp.src('src/icons/*.*')
    .pipe(gulp.dest('assets/icons/'));
});

gulp.task('cp-fonts', function() {
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('assets/fonts/'));
});

gulp.task('watch', function() {
  return gulp.watch('src/styl/*.styl', ['stylus']);
  return gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
  return gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', function(cb) {
  return runSequence(['imagemin', 'stylus', 'js', 'cp-icons', 'watch'], cb);
});
