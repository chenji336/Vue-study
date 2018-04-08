const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

console.log('process.env.NODE_ENV:',process.env.NODE_ENV)
const isDev = process.env.NODE_ENV === 'development'

let config = {
	entry: path.join(__dirname,'src/index.js'),
	output: {
		// webpack-dev-server不能使用chunkhash，否则报错
		filename: 'bundle.[hash:8].js',
		path: path.join(__dirname,'dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			// { // 没有使用到.css文件，所以注释掉
			// 	test: /\.css$/,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader'
			// 	]
			// },
			{
				test: /\.(jpg|png|svg|gif|jpeg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: '[name]-aaa.[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HTMLPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development1"' : '"production1"'
			}
		})
	]
}

if (isDev) {
	config.devtool = '#cheap-module-eval-source-map'
	config.devServer = {
		host: '0.0.0.0',
		port: '8099',
		overlay: {
			errors: true
		},
		hot: true
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin
	)
	// 开发环境还是让style样式放在js中，这样样式也可以进行热加载
	config.module.rules.push({
		test: /\.styl$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true
				}
			},
			'stylus-loader'
		]
	})
} else {
	config.entry = {
		app: path.join(__dirname,'src/index.js'),
		vendor: ['vue'] // 把vue文件打包到vendor中，如果vue-loader也需要的话，直接['vue','vue-loader']就行。专门打包类文件（插件js）
	}
	// chunkhash，这样就不会主文件hash改变也跟着改变
	config.output.filename='[name].[chunkhash:8].js'
	config.module.rules.push({
		test: /\.styl$/,
		 use: ExtractPlugin.extract({
			fallback: 'style-loader',
			use: [
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				},
				'stylus-loader'
			]
		})
	})
	config.plugins.push(
		new ExtractPlugin("styles.[contenthash:8].css"),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' // 需要跟上面entry名称一样
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime' // 避免插入js的时候已经存在的chunkhash值改变
		})
	)
}

module.exports = config