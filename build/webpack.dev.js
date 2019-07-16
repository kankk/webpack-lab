const webpackConfig = require('./webpack.config');
const WebPackMerge = require('webpack-merge');

const webpack = require('webpack');

module.exports = WebPackMerge(webpackConfig, {
  devtool: "source-map",
  devServer: {
    index: 'index.html',
    port: 5000,
    host: 'localhost',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});