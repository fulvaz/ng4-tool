/*
 * Webpack 公共配置部分
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack 插件
 *
 * problem with copy-webpack-plugin
 */
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

/*
 * Webpack 常量配置
 */
const HMR = helpers.hasProcessFlag('hot'); /*是否启用HMR*/
const AOT = process.env.BUILD_AOT || helpers.hasNpmFlag('aot'); /*是否启用AOT模式*/
const METADATA = {
	title: 'iAPP',
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer(),
	HMR: HMR
};

/*
 * Webpack 参数配置
 *
 * 参考文档: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {

	/*
	 *  判断是否是生产模式
	 */

	isProd = options.env === 'product';
	return {

		/*
		 * 缓存生成的模块和块，提高构建性能。.
		 * watch监听模式默认开启.
		 *
		 * 参考文档: http://webpack.github.io/docs/configuration.html#cache
		 */
		//cache: false,

		/*
		 * main 入口文件
		 * polyfills 垫片(项目公共库)
		 * 
		 * 参考文档: http://webpack.github.io/docs/configuration.html#entry
		 */
		entry: {

			'polyfills': './src/polyfills.browser.ts',
			'main': AOT ? './src/main.browser.aot.ts' : './src/main.browser.ts'

		},

		/*
		 * 文件类型配置
		 *
		 * 参考文档: http://webpack.github.io/docs/configuration.html#resolve
		 */
		resolve: {

			/*
			 * 哪些后缀文件需要处理.
			 *
			 * 参考文档: http://webpack.github.io/docs/configuration.html#resolve-extensions
			 */
			extensions: ['.ts', '.js', '.json'],

			/*
			 * 要解析到当前目录的目录名称数组(类似快捷方式)
			 */
			modules: [helpers.root('src'), helpers.root('node_modules')],

		},

		/*
		 * loder配置.
		 *
		 * 参考文档: http://webpack.github.io/docs/configuration.html#module
		 */
		module: {

			rules: [

				/*
				 * 解析.ts文件
				 *
				 * Template(html)/Style(css)  要使用 `angular2-template-loader`处理
				 * Angular 2 lazy loading (async routes) 要使用 `ng-router-loader`处理
				 *
				 * `ng-router-loader` 必须使用js而不是typescript
				 *
				 * 参考文档: https://github.com/s-panferov/awesome-typescript-loader
				 * 参考文档: https://github.com/TheLarkInn/angular2-template-loader
				 * 参考文档: https://github.com/shlomiassaf/ng-router-loader
				 */
				{
					test: /\.ts$/,
					use: [{
							loader: '@angularclass/hmr-loader',
							options: {
								pretty: !isProd,
								prod: isProd
							}
						},
						{
							/*
							 *  确保输出的是js而不是typescript
							 */
							loader: 'ng-router-loader',
							options: {
								loader: 'async-import',
								genDir: 'compiled',
								aot: AOT
							}
						},
						{
							loader: 'awesome-typescript-loader',
							options: {
								configFileName: 'tsconfig.webpack.json',
								useCache: !isProd
							}
						},
						{
							loader: 'angular2-template-loader'
						}
					],
					exclude: [/\.(spec|e2e)\.ts$/]
				},

				/*
				 * 解析json文件.
				 *
				 * 参考文档: https://github.com/webpack/json-loader
				 */
				{
					test: /\.json$/,
					use: 'json-loader'
				},

				/*
				 * 解析css文件
				 * 将css转为字符串输出
				 *
				 */
				{
					test: /\.css$/,
					use: ['to-string-loader', 'css-loader'],
					exclude: [helpers.root('src', 'styles')]
				},

				/*
				 * 解析scss文件
				 * 将scss转为字符串输出
				 *
				 */
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader', 'sass-loader'],
					exclude: [helpers.root('src', 'styles')]
				},

				/*
				 * 解析html文件
				 * 将html转为字符串输出
				 *
				 * See: https://github.com/webpack/raw-loader
				 */
				{
					test: /\.html$/,
					use: 'html-loader',
					exclude: [helpers.root('src/index.html')]
				},

				/*
				 * 处理图片
				 */
				{
					test: /\.(jpg|png|gif|svg)$/,
					use: 'file-loader?name=assets/img/[name].[hash:8].[ext]'
				},

				/* 处理字体
				 */
				{
					test: /\.(eot|woff2?|ttf)([\?]?.*)$/,
					use: 'file-loader?name=assets/font/[name].[hash:8].[ext]'
				}

			],

		},

		/*
		 * 添加滤镜.
		 *
		 * 文档参考: http://webpack.github.io/docs/configuration.html#plugins
		 */
		plugins: [
			/*
			 * Plugin: AssetsPlugin
			 * 添加静态资源(主要是dll文件)
			 *
			 * 文档参考: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
			 */

			new AssetsPlugin({
				path: helpers.root('dist'),
				filename: 'webpack-assets.json',
				prettyPrint: true
			}),

			/*
			 * Plugin: ForkCheckerPlugin
			 * 单独进行类型检查，避免webpack一直等待.
			 *
			 * 文档参考: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
			 */
			new CheckerPlugin(),
			/*
			 * Plugin: CommonsChunkPlugin
			 * 分块插件。。。
			 *
			 * 文档参考: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
			 * 文档参考: https://github.com/webpack/docs/wiki/optimization#multi-page-app
			 */
			new CommonsChunkPlugin({
				name: 'polyfills',
				chunks: ['polyfills']
			}),
			/*
			 * 构建vendor模块
			 */
			new CommonsChunkPlugin({
				name: 'vendor',
				chunks: ['main'],
				minChunks: module => /node_modules/.test(module.resource)
			}),
			/*
			 * vendor与polyfills引入顺序
			 */
			new CommonsChunkPlugin({
				name: ['polyfills', 'vendor'].reverse()
			}),
			new CommonsChunkPlugin({
				name: ['manifest'],
				minChunks: Infinity,
			}),

			/*
			 * Plugin: ContextReplacementPlugin
			 * Angular 必须的
			 *
			 * 文档参考: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
			 * 文档参考: https://github.com/angular/angular/issues/11580
			 */
			new ContextReplacementPlugin(
				/*
				 * The (\\|\/) piece accounts for path separators in *nix and Windows
				 */
				/angular(\\|\/)core(\\|\/)@angular/,
				helpers.root('src'), // location of your src
				{
					/*
					 * Your Angular Async Route paths relative to this root directory
					 */
				}
			),

			/*
			 * Plugin: CopyWebpackPlugin
			 * 引入静态资源
			 *
			 * 文档参考: https://www.npmjs.com/package/copy-webpack-plugin
			 */
			new CopyWebpackPlugin([{
						from: 'src/assets',
						to: 'assets'
					},
					{
						from: 'src/meta'
					}
				],
				isProd ? {
					ignore: ['mock-data/*/*']
				} : undefined
			),


			/*
			 * Plugin: HtmlWebpackPlugin
			 * 引入静态资源
			 *
			 * 文档参考: https://github.com/ampedandwired/html-webpack-plugin
			 */
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				title: METADATA.title,
				chunksSortMode: 'dependency',
				metadata: METADATA,
				inject: 'head'
			}),

			/*
			 * Plugin: ScriptExtHtmlWebpackPlugin
			 * Description: Enhances html-webpack-plugin functionality
			 * with different deployment options for your scripts including:
			 *
			 * 文档参考: https://github.com/numical/script-ext-html-webpack-plugin
			 */
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer'
			}),

			/*
			 * Plugin: HtmlElementsPlugin
			 * Description: Generate html tags based on javascript maps.
			 *
			 * If a publicPath is set in the webpack output configuration, it will be automatically added to
			 * href attributes, you can disable that by adding a "=href": false property.
			 * You can also enable it to other attribute by settings "=attName": true.
			 *
			 * The configuration supplied is map between a location (key) and an element definition object (value)
			 * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
			 *
			 * Example:
			 *  Adding this plugin configuration
			 *  new HtmlElementsPlugin({
			 *    headTags: { ... }
			 *  })
			 *
			 *  Means we can use it in the template like this:
			 *  <%= webpackConfig.htmlElements.headTags %>
			 *
			 * Dependencies: HtmlWebpackPlugin
			 */
			new HtmlElementsPlugin({
				headTags: require('./head-config.common')
			}),

			/*
			 * Plugin LoaderOptionsPlugin (experimental)
			 *
			 * See: https://gist.github.com/sokra/27b24881210b56bbaff7
			 */
			new LoaderOptionsPlugin({}),


			/*
			 * Fix Angular 2
			 */
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)async/,
				helpers.root('node_modules/@angular/core/src/facade/async.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)collection/,
				helpers.root('node_modules/@angular/core/src/facade/collection.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)errors/,
				helpers.root('node_modules/@angular/core/src/facade/errors.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)lang/,
				helpers.root('node_modules/@angular/core/src/facade/lang.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)math/,
				helpers.root('node_modules/@angular/core/src/facade/math.js')
			),

			new ngcWebpack.NgcWebpackPlugin({
				disabled: !AOT,
				tsConfig: helpers.root('tsconfig.webpack.json'),
				resourceOverride: helpers.root('task/resource-override.js')
			}),

			/*
			 * Plugin: InlineManifestWebpackPlugin
			 * Inline Webpack's manifest.js in index.html
			 *
			 * https://github.com/szrenwei/inline-manifest-webpack-plugin
			 */
			new InlineManifestWebpackPlugin(),
		],

		/*
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * 文档参考: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	};
}