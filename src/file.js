const colors = require('colors');
const fs = require('fs');
const replaceStream = require('replacestream');
const stat = fs.stat;

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function (src, dst, config) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }

        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            if (config.filename) {
                _dst = dst + '/' + path.replace(/template/, config.filename);
            }
            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    if (config) {
                        readable = fs.createReadStream(_src)
                            .pipe(replaceStream('Template', config.name))
                    }
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                    console.log(('创建文件：'+ _dst + ' => 完成').green);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, config, copy);
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function (src, dst, config, callback) {
    fs.exists(dst, function (exists) {
        if (exists) {
            callback(src, dst, config);
        } else {
            console.log(dst +' 目录不存在！'.underline.yellow);
            fs.mkdir(dst, function () {
                console.log(dst +' 目录创建完成！'.underline.green);
                callback(src, dst, config);
            });
        }
    });
};

module.exports = {
    exists: exists,
    copy: copy
}