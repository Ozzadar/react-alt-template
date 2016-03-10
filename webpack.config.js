const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const pkg = require('./package.json')
const Clean = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
}

process.env.BABEL_ENV = TARGET

const common = {
	//Entry accepts a path or an object of entries
	// the build chapter contains an example of the latter
	
	entry: PATHS.app,
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	module: {
		loaders: [
			//Set up jsx. This accepts js too thanks to RegExp
			{
				test: /\.jsx?$/,
				//Enable caching for improved performance during development
				//it uses default OS directory by default. If you need something
				//more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
				loaders: ['babel?cacheDirectory'],
				include: PATHS.app
			},
			{
				test: /\.(png|jpg|ico)$/,
				loader: 'url?limit=25000'
			},
			{ 
				test: /\.json$/, 
				loaders: ['json-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'node_modules/html-webpack-template/index.html',
			title: 'kDaemon',
			appMountId: 'app',
			inject: false,
			favicon: './app/images/favicon.ico'
		})
	]
}

//Default configuration
if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			//Enable history API fallback so HTML5 History API based
			//routing works. This is a good default that will come
			//in handy in more complicated setups
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			//display only errors to reduce the amount of output.
			stats: 'errors-only',

			//Parse host and port from env so this is easy to customize
			host: process.env.HOST,
			port: process.env.PORT
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loaders: ['style', 'css'],
					include: PATHS.app
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	})
}

if (TARGET === 'build' || TARGET === 'stats') {
	module.exports = merge(common, {
		entry: {
			app: PATHS.app,
			vendor: Object.keys(pkg.dependencies).filter(function(v) {
				//Exclude alt-utils as it won't work with this setup
				//due to the way the package has been designed
				// (no package.json main)
				return v!== 'alt-utils'
			})
		},
		output: {
			path: PATHS.build,
			filename: '[name].[chunkhash].js',
			chunkFilename: '[chunkhash].js'
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: PATHS.app
				}
			]
		},
		plugins: [
			//Extract vendor and manifest files
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest']
			}),
			//Setting DefinePlugin affect React library size!
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings:false
				}
			}),
			new Clean([PATHS.build], {
				verbose: true
			}),
			//Output extracted CSS to a file
			new ExtractTextPlugin('styles.[chunkhash].css')
		]

	})
}