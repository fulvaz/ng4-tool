const colors = require('colors');
const path = require('path');
const FileAction = require('./file');
module.exports = function (config) {
	if (!config) {
		// 初始化项目复制
		const src = path.resolve(__dirname, '../lib/init');
		const dst = process.cwd();
		FileAction.exists(src, dst, false, FileAction.copy);
		return null;
	}
	let src = path.resolve(__dirname, '../lib/component');
	switch (config.type) {
		case 'm':
			src = path.resolve(__dirname, '../lib/module');
			break;
		case 'd':
			src = path.resolve(__dirname, '../lib/directive');
			break;
		case 'p':
			src = path.resolve(__dirname, '../lib/pipe');
			break;
		case 'n':
			src = path.resolve(__dirname, '../lib/ngrx');
			break;
		default:
			path.resolve(__dirname, '../lib/component');
	}

	FileAction.exists(src, config.path, config, FileAction.copy);
}