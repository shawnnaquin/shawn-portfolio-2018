var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	baseUrl: '/',
	pluginOptions: {
	    critical: {
	        inline: true,
	        width: 1024,
	        height: 565,
	    }
	},
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
					  process.env.NODE_ENV !== 'production'
					    ? 'vue-style-loader'
					    : MiniCssExtractPlugin.loader,
					  'css-loader'
					]
				}
			]
		},

		plugins: [
			new MiniCssExtractPlugin()
		]
	}

};