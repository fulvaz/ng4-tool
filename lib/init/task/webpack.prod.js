/*
 * Webpack 生产模式配置
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

/**
 * Webpack 插件
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const config = require('./config.json');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = function (env) {
	const API = process.env.API || config[env].api;
	const TRACK_URL = process.env.TRACK_URL || config[env].track_url;
	const TRACK_ID = process.env.TRACK_ID || config[env].track_id;
	const METADATA = webpackMerge(commonConfig({
		env: env
	}).metadata, {
		host: HOST,
		port: PORT,
		ENV: env,
		HMR: false,
		API:API,
		TRACK_URL:TRACK_URL,
		TRACK_ID:TRACK_ID
	});

	return webpackMerge(commonConfig({
		env: env
	}), {
		devtool: 'source-map',
		output: {
			path: helpers.root('dist'),
			publicPath: config[env].url + config.v + '/',
			filename: '[name].[chunkhash:8].bundle.js',
			sourceMapFilename: '[file].map',
			chunkFilename: '[name].[chunkhash:8].chunk.js'

		},
		module: {
			rules: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					}),
					include: [helpers.root('src', 'styles')]
				},{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader!sass-loader'
					}),
					include: [helpers.root('src', 'styles')]
				},
			]
		},
		plugins: [
			new OptimizeJsPlugin({
				sourceMap: false
			}),
			new ExtractTextPlugin('[name].[contenthash:8].css'),
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
			new UglifyJsPlugin({
				beautify: false, //prod
				output: {
					comments: false
				}, //prod
				mangle: {
					screw_ie8: true
				}, //prod
				compress: {
					screw_ie8: true,
					warnings: false,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true,
					negate_iife: false // we need this for lazy v8
				},
			}),
			new NormalModuleReplacementPlugin(
				/angular2-hmr/,
				helpers.root('task/empty.js')
			),
			new NormalModuleReplacementPlugin(
				/zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
				helpers.root('task/empty.js')
			),
			new HashedModuleIdsPlugin(),
			new LoaderOptionsPlugin({
				minimize: true,
				debug: false,
				options: {
					htmlLoader: {
						minimize: true,
						removeAttributeQuotes: false,
						caseSensitive: true,
						customAttrSurround: [
							[/#/, /(?:)/],
							[/\*/, /(?:)/],
							[/\[?\(?/, /(?:)/]
						],
						customAttrAssign: [/\)?\]?=/]
					},
				}
			}),
		],
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