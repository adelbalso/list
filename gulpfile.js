var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  // place code for your default task here
  console.log('Hello World');
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task('build',['js','css','html']);

gulp.task('js',function(){
  gulp.src('app/scripts/main.js')
    .pipe(browserify({
      debug: true
    }))
    .pipe(gulp.dest('./release/scripts'));
});

gulp.task('css',function(){
  gulp.src('app/styles/main.css')
    .pipe(gulp.dest('./release/styles'));
});

gulp.task('html',function(){
  gulp.src('app/index.html')
    .pipe(gulp.dest('./release'));
})