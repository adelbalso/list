var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('gulp-browserify');
var mainBowerFiles = require('main-bower-files');
var stylus = require('gulp-stylus');
var nib = require('nib');


var cssFiles  = ["app/styles/**/*.styl"],
    jsFiles   = ["app/scripts/*.js"],
    htmlFiles = ["app/*.html"];

gulp.task('default', ['serve']);

// DEV SERVER:
gulp.task('serve', ['serve-stylus'], function() {
  browserSync({
    server: {
      baseDir: ['app','.tmp']
    }
  });

  gulp.watch(htmlFiles, reload);
  gulp.watch(jsFiles, reload);
  gulp.watch(cssFiles, ['serve-stylus']);
});

gulp.task('serve-stylus', function () {
  return gulp.src(cssFiles)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream:true}))
    .on('error',function(error){
      console.error('' + error);
    });
});

// BUILD TASK:
gulp.task('build',['build-bower','build-js','build-css','html']);

gulp.task('build-js',function(){
  gulp.src(jsFiles)
    .pipe(gulp.dest('./release/scripts'));
});

gulp.task('build-css',function(){
  gulp.src(cssFiles)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./release/styles'));
});

gulp.task('html',function(){
  gulp.src(htmlFiles)
    .pipe(gulp.dest('./release'));
})

gulp.task('bower', function() {
    gulp.src(mainBowerFiles(), { base: 'app/bower_components' })
        .pipe(gulp.dest('./release/bower_components'))
});


// Workaround for https://github.com/gulpjs/gulp/issues/71
var origSrc = gulp.src;
gulp.src = function () {
    return fixPipe(origSrc.apply(this, arguments));
};
function fixPipe(stream) {
    var origPipe = stream.pipe;
    stream.pipe = function (dest) {
        arguments[0] = dest.on('error', function (error) {
            var nextStreams = dest._nextStreams;
            if (nextStreams) {
                nextStreams.forEach(function (nextStream) {
                    nextStream.emit('error', error);
                });
            } else if (dest.listeners('error').length === 1) {
                throw error;
            }
        });
        var nextStream = fixPipe(origPipe.apply(this, arguments));
        (this._nextStreams || (this._nextStreams = [])).push(nextStream);
        return nextStream;
    };
    return stream;
}

