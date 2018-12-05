var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');

module.exports = {

	baseUrl: '/',

	pluginOptions: {
	    critical: {
	    	inline: true,
	    	extract: true,
	        width: 375,
	        height: 565
	    }
	},

	chainWebpack: config => {
	  config.plugin('preload').tap(options => {
	  	options[0].as = (entry) => {
  		if (/\.css$/.test(entry)) return 'style';
  		if (/\.woff$/.test(entry)) return 'font';
  		if (/\.png$/.test(entry)) return 'image';
	      return 'script';
	    }
	    return options
	  })
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
			new MiniCssExtractPlugin(),
			// new PurifyCSSPlugin({
			//   paths: [ path.join(__dirname, 'public', 'index.html')
			// })
		]
	}

};