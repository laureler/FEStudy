'use strict'

let mainConfig = {
	entry: './src/main.ts',
	output: {
		filename: 'bundle.js',
		path: '../dist/webpack'
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	module: {
		loaders: [
			{
				test: '\/.tsx?$/',
				loader: 'ts-loader'
			}
		]
	}
}
module.exports = mainConfig