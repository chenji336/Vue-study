const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

console.log('process.env.NODE_ENV:',process.env.NODE_ENV)
const isDev = process.env.NODE_ENV === 'development'

let config = {
	entry: path.join(__dirname,'src/index.js'),
	output: {
		filename: 'bundle.js',
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
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
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
			},
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
}

module.exports = config