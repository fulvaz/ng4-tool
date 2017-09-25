#!/usr/bin/env node

console.log('ng4创建模板工具');

const colors = require('colors');
const path = require('path');
const program = require('commander');

const tool = require('./src');

/*/
1、是否单独设置相对路径 -p 
2、是否重新命名文件名 -n name/template
3、是否有模板类别 -t type/component 
/*/
const config = {
	type: 'c',
	filename: 'template',
	name: 'Template',
	path: process.cwd()
}

program
	.version('0.0.1')
	.option('-t, --type [value]', 'choose type，c component, m module, d directive, p pipe, n ngrx, default component','c')
	.option('-n, --file [value]', 'file name, default template','template')
	.option('-p, --path [value]', 'need relative file path','')
	.usage('<keywords>')
	.parse(process.argv);

if (!program.args.length) {
	console.log('命令错误，暂时只支持init、create命令'.underline.red);
	program.help();
} else {
	if (program.args[0] === 'init') {
		// 初始化项目
		tool(false);
		return null;
	}
	if (program.args[0] === 'create') {

		if (program.type) {
			config.type = program.type;
		}
		if (program.file) {
			config.filename = program.file;
			config.name = program.file.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
		}
		if (program.path) {
			config.path = path.join(config.path, program.path);
		}
		tool(config);
		return null;
	}
	console.log('命令错误，暂时只支持init、create命令'.underline.red);
}