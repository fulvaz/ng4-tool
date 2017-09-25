/*
 * Webpack 开发模式配置
 */
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // 合并webpack配置
const webpackMergeDll = webpackMerge.strategy({
	plugins: 'replace'
});
const commonConfig = require('./webpack.common.js'); // 通用webpack配置

/*
 * Webpack 插件
 */
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const config = require('./config.json');
/*
 * Webpack 环境变量
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'dev';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 4000;
const API = process.env.API || config[ENV].api;
const TRACK_URL = process.env.TRACK_URL || config[ENV].track_url;
const TRACK_ID = process.env.TRACK_ID || config[ENV].track_id;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({
	env: ENV
}).metadata, {
	host: HOST,
	port: PORT,
	ENV: ENV,
	HMR: HMR,
	API: API,
	TRACK_URL:TRACK_URL,
	TRACK_ID:TRACK_ID
});


const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

/*
 * Webpack 配置
 *
 * 参考文档: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
	return webpackMerge(commonConfig({
		env: ENV
	}), {

		/*
		 * 开发debug工具
		 *
		 * 参考文档: http://webpack.github.io/docs/configuration.html#devtool
		 * 参考文档: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
		 */
		devtool: 'cheap-module-source-map',

		/*
		 * 输出配置
		 *
		 * 参考文档: http://webpack.github.io/docs/configuration.html#output
		 */
		output: {

			/*
			 * 输出路径.
			 *
			 * 参考文档: http://webpack.github.io/docs/configuration.html#output-path
			 */
			path: helpers.root('dist'),

			/*
			 * 输出文件名及路径
			 *
			 * 参考文档: http://webpack.github.io/docs/configuration.html#output-filename
			 */
			filename: '[name].bundle.js',

			/*
			 * The filename of the SourceMaps for the JavaScript files.
			 * They are inside the output.path directory.
			 *
			 * 参考文档: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
			 */
			sourceMapFilename: '[file].map',

			/* The filename of non-entry chunks as relative path
			 * inside the output.path directory.
			 *
			 * 参考文档: http://webpack.github.io/docs/configuration.html#output-chunkfilename
			 */
			chunkFilename: '[id].chunk.js',

			library: 'ac_[name]',
			libraryTarget: 'var',
		},

		module: {

			rules: [

				/*
				 * 处理css
				 */
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
					include: [helpers.root('src', 'styles')]
				},

				/*
				 * 处理css
				 * 将sass样式插入到DOM中并且支持HMR热更新
				 */
				{
					test: /\.scss$/,
					use: ['style-loader', 'css-loader', 'sass-loader'],
					include: [helpers.root('src', 'styles')]
				},

			]

		},

		plugins: [

			/*
			 * 注入环境变量
			 * 参考文档: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
			 *
			 * 提示: 添加更多变量时when adding more properties, make sure you include them in custom-typings.d.ts
			 */
			new DefinePlugin({
				'ENV': JSON.stringify(METADATA.ENV),
				'HMR': METADATA.HMR,
				'process.env': {
					'ENV': JSON.stringify(METADATA.ENV),
					'NODE_ENV': JSON.stringify(METADATA.ENV),
					'HMR': METADATA.HMR,
					'API': JSON.stringify(METADATA.API),
					'TRACK_URL': JSON.stringify(METADATA.TRACK_URL),
					'TRACK_ID': JSON.stringify(METADATA.TRACK_ID)
				}
			}),
			new DllBundlesPlugin({
				bundles: {
					polyfills: [
						'core-js',
						{
							name: 'zone.js',
							path: 'zone.js/dist/zone.js'
						},
						{
							name: 'zone.js',
							path: 'zone.js/dist/long-stack-trace-zone.js'
						},
					],
					vendor: [
						'@angular/platform-browser',
						'@angular/platform-browser-dynamic',
						'@angular/core',
						'@angular/common',
						'@angular/forms',
						'@angular/http',
						'@angular/router',
						'@angularclass/hmr',
						'rxjs',
					]
				},
				dllDir: helpers.root('dll'),
				webpackConfig: webpackMergeDll(commonConfig({
					env: ENV
				}), {
					devtool: 'cheap-module-source-map',
					plugins: []
				})
			}),

			/*
			 * 插件: 引入资源
			 * 参考文档: https://github.com/SimenB/add-asset-html-webpack-plugin
			 */
			new AddAssetHtmlPlugin([{
					filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`)
				},
				{
					filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`)
				}
			]),

			/*
			 * 参考文档: https://gist.github.com/sokra/27b24881210b56bbaff7
			 */
			new LoaderOptionsPlugin({
				debug: true,
				options: {

				}
			}),

		],

		/*
		 * Webpack Server 配置
		 * 参考文档: https://webpack.github.io/docs/webpack-dev-server.html
		 */
		devServer: {
			port: METADATA.port,
			host: METADATA.host,
			historyApiFallback: true,
			disableHostCheck:true,
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			}
		},

		/*
		 * 参考文档: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	});
}