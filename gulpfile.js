// const gulp = require('gulp')
// const browserSync = require('browser-sync').create()
// const sass = require('gulp-sass')(require('sass'))
// const cleanCSS = require('gulp-clean-css')
// const autoprefixer = require('gulp-autoprefixer')
// const rename = require('gulp-rename')

// gulp.task('server', function () {
//   browserSync.init({
//     server: {
//       baseDir: 'src',
//     },
//   })

//   gulp.watch('src/*.html').on('change', browserSync.reload)
// })

// gulp.task('styles', function () {
//   return gulp
//     .src('src/sass/**/*.+(scss|sass)')
//     .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
//     .pipe(rename({ suffix: '.min', prefix: '' }))
//     .pipe(
//       autoprefixer({
//         overrideBrowserslist: ['last 2 versions'],
//         cascade: false,
//       })
//     )
//     .pipe(cleanCSS({ compatibility: 'ie8' }))
//     .pipe(gulp.dest('src/css'))
//     .pipe(browserSync.stream())
// })

// gulp.task('watch', function () {
//   gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'))
// })

// gulp.task('default', gulp.parallel('watch', 'server', 'styles'))


const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

// Компиляция SASS
function styles() {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

// Запуск локального сервера
function server() {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
  });

  gulp.watch('src/*.html').on('change', browserSync.reload);
}

// Отслеживание изменений
function watchFiles() {
  gulp.watch('src/sass/**/*.+(scss|sass)', styles);
  gulp.watch('src/*.html').on('change', browserSync.reload);
}

// Задачи по умолчанию
exports.styles = styles;
exports.watch = watchFiles;
exports.server = server;
exports.default = gulp.parallel(server, watchFiles, styles);
