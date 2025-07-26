var gulp = require("gulp"),
  sass = require('gulp-sass');
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require('browser-sync').create();

//sass files directory + filename zB "sass/test.sass"
//können mehrere sein
sassfile = ["sass/*"];
// For Browsersync html watching
htmlfile = ["*.html"];

gulp.task("default",["sass", "watch"]);
//
//compiles it
//prefixes it
//syncs with browser
gulp.task("sass", function() {
return gulp.src('./sass/style.sass')
  .pipe(sass().on('error', sass.logError)) 
  .pipe(autoprefixer())
  .pipe(gulp.dest("."))
  .pipe(browserSync.stream());
});

//WATCH 

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

gulp.watch(sassfile, ["sass"]);
gulp.watch(htmlfile).on('change', browserSync.reload);
});

