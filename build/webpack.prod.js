const webpackConfig = require('./webpack.config');
const WebPackMerge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = WebPackMerge(webpackConfig, {
  mode: "production",
  plugins: [
    new UglifyJSPlugin()
  ],
  devtool: false,
});