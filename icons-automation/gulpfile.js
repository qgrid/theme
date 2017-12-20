var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var svgo = require('gulp-svgo');
var inlineFonts = require('gulp-inline-fonts');
var del = require('del');

var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'qgrid-iconfont';

var del = require('del');

gulp.task('clean', function () {
  return del([
    'optimized-icons/*',
   // 'dist/*',
  ]);
});

gulp.task('svgo', ['clean'], function() {
    return gulp.src('raw-icons/*')
        .pipe(svgo())
        .pipe(gulp.dest('optimized-icons/'));
});

gulp.task('iconfont', ['svgo'], function(){
  return gulp.src(['optimized-icons/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: true,
      formats: ['woff2'], // 'ttf', 'eot', 'woff', 'woff2'
      timestamp: runTimestamp,
	  normalize: true
    }))
      .on('glyphs', function(glyphs, options) {
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('dist/'));
});

gulp.task('iconfontCss', ['svgo'], function(){
  gulp.src(['optimized-icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      targetPath: fontName+'.css',
    }))
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: runTimestamp,
	  normalize: true
     }))
    .pipe(gulp.dest('dist/'));
});


gulp.task('embedFont', ['iconfont'], function() {
return gulp.src(['dist/*'])
  .pipe(inlineFonts({ name: fontName }))
  .pipe(gulp.dest('dist/embedded'));
});



gulp.task('simple', ['clean', 'svgo', 'iconfontCss']);
gulp.task('embedded', ['clean', 'svgo', 'iconfont', 'embedFont']);
gulp.task('all', ['clean', 'svgo', 'simple', 'embedded']);
gulp.task('default', ['all']);
