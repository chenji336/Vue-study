const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

console.log('process.env.NODE_ENV:',process.env.NODE_ENV)
const dev = process.env.NODE_ENV === 'development'

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
		new HTMLPlugin()
	]
}

if (dev) {
	config.devServer = {
		host: '0.0.0.0',
		port: '8088',
		overlay: {
			errors: true
		}
	}
}

module.exports = config