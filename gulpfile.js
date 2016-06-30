'use strict';

let gulp = require('gulp');
let ghPages = require('gulp-gh-pages');

gulp.task('deploy', () => {
  return gulp.src('build/bundled/**/*')
    .pipe(ghPages());
})
