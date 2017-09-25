const gulp         = require('gulp');
const gulpSequence = require('gulp-sequence');
require('./task/gulp-build');
require('./task/gulp-qiniu');
require('./task/gulp-git');

gulp.task('dev', gulpSequence('clean','git.start','webpack','replace','git.end','upload'));
gulp.task('product', gulpSequence('clean','git.start','webpack','replace','git.end','upload'));

gulp.task('git.start',gulpSequence('createDist','cleanDist','init','checkout','remote','pull'));
gulp.task('git.end',gulpSequence('add','commit','push'));