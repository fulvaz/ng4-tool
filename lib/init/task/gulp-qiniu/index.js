const gulp = require('gulp');
const gutil = require("gulp-util");
const qiniu = require('gulp-qiniu');
const replace = require('gulp-replace');
const webpack = require('webpack');
const clean = require('gulp-clean');
const path = require('path');

const config = require('../config.json');
const type = config[process.argv[2]] ? process.argv[2] : 'dev';

gulp.task('clean', function () {
    return gulp.src(['./dist', './compiled'])
        .pipe(clean());
})

/*
上传七牛
*/
gulp.task('upload', function () {
    return gulp.src('./dist/**')
        .pipe(qiniu({
            accessKey: config[type].ak,
            secretKey: config[type].sk,
            bucket: config[type].bk,
            private: false
        }, {
            dir: config[type].dirname + '/' + config.v + '/',
            versioning: false,
            versionFile: './config/images/images.json',
            ignore: ['*.yml', 'Dockerfile', './deploy/**', '*.md', 'hosts'],
            concurrent: 10
        }))
})

/*替换固定的静态资源*/
gulp.task('replace', function () {
    return gulp.src('./dist/index.html')
        // .pipe(replace('/assets/', config[type].url + config.v + '/assets/'))
        .pipe(gulp.dest('./dist/'));
})