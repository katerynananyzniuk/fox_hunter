const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

/*------Server------*/
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build/"
        }
    });


    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/*------Pug compile------*/
gulp.task('templates:compile', function buildHTML() {
    return gulp.src(
        ['source/templates/index.pug',
        'source/templates/**/*.pug']
        )
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'))
});

/*------Styles compile------*/
gulp.task('styles:compile', function () {
    return gulp.src(
        'source/styles/main.scss'
        )
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(rename(
            'main.min.css'
        ))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

/*------Slider------*/
gulp.task('slider', function(){
    return gulp.src('source/js/slick.min.js')
    .pipe(gulp.dest('build/js'));
});

/*------js------*/
gulp.task('js', function(){
    return gulp.src([
            'source/js/form.js',
            'source/js/main.js'
        ])  
        .pipe(sourcemaps.init())
        .pipe(concat(
            'main.min.js'
        ))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

/*------Sprite------*/
  gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/info/icons/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
  });
  
/*------Delete------*/
  gulp.task('clean', function del(cb) {
      return rimraf('build', cb);
    });
    
/*------Copy fonts------*/
    gulp.task('copy:fonts', function () {
        return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
    });
    
/*------Copy images------*/
    gulp.task('copy:images', function () {
        return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
    });
    
/*------Copy------*/
    gulp.task('copy', gulp.parallel('copy:images','copy:fonts'));
    
/*------Watchers------*/
    gulp.task('watch', function () {
        gulp.watch('source/templates/**/*.pug', gulp.series('templates:compile'));
        gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
        gulp.watch('source/js/**/*.js', gulp.series('js'));
    });
    
/*------Default------*/
    gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile','styles:compile','js','slider','sprite','copy'),
    gulp.parallel('watch','server')
    )
);
