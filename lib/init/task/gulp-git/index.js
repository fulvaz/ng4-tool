const gulp = require('gulp');
const clean = require('gulp-clean');
const path = require('path');
const colors = require('colors');
const exec = require('child_process').exec;

const config = require('../config.json');
const type = config[process.argv[2]] ? process.argv[2] : 'dev';

/*
* 创建dist目录(添加一个临时文件)
*/
gulp.task('createDist', function (callback) {
    return gulp.src('./README.md')
        .pipe(gulp.dest('./dist/'));
})

/*
* 删除dist目录临时文件
*/
gulp.task('cleanDist', function (callback) {
    return gulp.src('./dist/README.md')
        .pipe(clean());
})

/*
* git初始化
*/
gulp.task('init', function (callback) {
    exec('git init', {
        cwd: path.resolve(__dirname, '../../dist')
    }, function (error, stdout, stderr) {
        if (error) {
            console.log(colors.red.underline(error));
        } else {
            console.log(colors.green('仓库初始化成功'));
        }
        callback()
    })
})

/*
* 创建并切换分支
*/
gulp.task('checkout', function (callback) {
    exec('git checkout -b ' + config[type].branch, {
        cwd: path.resolve(__dirname, '../../dist')
    }, function (error, stdout, stderr) {
        if (error) {
            console.log(colors.red.underline(error));
        } else {
            console.log(colors.green('创建分支成功'));
            console.log(colors.yellow.underline('当前分支:' + config[type].branch));
        }
        callback()
    })
});

/*
* 添加远程仓库
*/
gulp.task('remote', function (callback) {
    exec('git remote add origin ' + config[type].remote, {
        cwd: path.resolve(__dirname, '../../dist')
    }, function (error, stdout, stderr) {
        if (error) {
            console.log(colors.red.underline(error));
        } else {
            console.log(colors.green('添加远程仓库成功'));
            console.log(colors.yellow.underline('当前远程仓库:' + config[type].remote));
        }
        callback()
    })
});

/*
* 拉取远程仓库代码
*/
gulp.task('pull',function(callback){
    exec('git pull ' + config[type].remote+' '+config[type].branch, {
        cwd: path.resolve(__dirname, '../../dist')
    }, function (error, stdout, stderr) {
        if (error) {
            console.log(colors.red.underline(error));
        } else {
            console.log(colors.green('拉取远程仓库成功'));
            console.log(colors.yellow.underline('拉取远程仓库:' + config[type].remote));
            console.log(colors.yellow.underline('拉取远程分支:' + config[type].branch));
        }
        callback()
    })
})

/*
* git添加更改
*/
gulp.task('add', function (callback) {
    exec('git add index.html', {
        cwd: path.resolve(__dirname, '../../dist')
    }, function (error, stdout, stderr) {
        if (error) {
            console.log(colors.red.underline(error));
        } else {
            console.log(colors.green('添加更改文件成功成功'));
        }
        callback()
    })
});

/*
* git提交修改
*/
gulp.task('commit', function (callback) {
    const info = new Date();
    exec('git commit -m ' + '"发布时间:' + info + '"', {
        cwd: path.resolve(__dirname, '../../dist')
    }, function (error, stdout, stderr) {
        if (error) {
            console.log(colors.red.underline(error));
        } else {
            console.log(colors.green('提交修改成功'));
            console.log(colors.yellow.underline('提交信息:' + info));
        }
        callback()
    })
});

/*
* git推送
*/
gulp.task('push', function (callback) {
    exec('git push origin ' + config[type].branch, {
        cwd: path.resolve(__dirname, '../../dist')
    }, function (error, stdout, stderr) {
        if (error) {
            console.log(colors.red.underline(error));
        } else {
            console.log(colors.green('推送到远程仓库成功'));
            console.log(colors.yellow.underline('当前版本:' + config.v));
        }
        callback()
    })
});

