const gulp = require('gulp');
const gutil = require("gulp-util");
const webpack = require('webpack');
const config = require('../config.json');
const type = config[process.argv[2]] ? process.argv[2] : 'dev';
const WebpackConfig = require('../webpack.prod')(type);

gulp.task('webpack', function (callback) {
    webpack(WebpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    })
})