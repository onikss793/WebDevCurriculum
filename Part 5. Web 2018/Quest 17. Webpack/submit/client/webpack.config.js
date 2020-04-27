const path                           = require('path'),
      HtmlWebpackPlugin              = require('html-webpack-plugin'),
      VueLoaderPlugin                = require('vue-loader/lib/plugin'),
      MiniCssExtractPlugin           = require('mini-css-extract-plugin'),
      { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
	entry    : './src/main.js',
	output   : {
		filename: '[name].[hash].js',
		path    : path.resolve(__dirname, 'dist')
	},
	devtool  : '#source-map',
	devServer: {
		open       : true,
		hot        : true,
		contentBase: './dist'
	},
	resolve: {
		alias: {
			"vue$": "vue/dist/vue.esm.js"
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	module   : {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
		]
	},
	plugins  : [
		new HtmlWebpackPlugin({ template: './dist/index.html', title: '메모장' }),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin(),
		new HotModuleReplacementPlugin()
	]
};