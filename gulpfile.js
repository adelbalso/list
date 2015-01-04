var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('gulp-browserify');
var mainBowerFiles = require('main-bower-files');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task('build',['bower','js','css','html']);

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

gulp.task('bower', function() {
    gulp.src(mainBowerFiles(), { base: 'app/bower_components' })
        .pipe(gulp.dest('./release/bower_components'))
    // console.log(mainBowerFiles());
        // console.log(process.env.NODE_ENV);
});