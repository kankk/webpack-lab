const path = require('path');
const fs = require('fs');

// 生成HTML页面
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 公共entry
const COMMON_ENTRY = [];

// 页面目录
const PAGES_DIR = './src/pages';

// 多页面应用入口配置
// 把src/pages目录下所有含有index.html和index.js的目录分别作为一个页面入口
function getMultiPagesEntry () {
  const entry = {
    index: './src/index.js'
  };

  fs.readdirSync(PAGES_DIR).filter(item => {
    let filePath = path.join(PAGES_DIR, item, 'index.js');
    if (!fs.existsSync(filePath)) {
      return false;
    } else {
      return true;
    }
  }).forEach(file => {
    const name = path.basename(file);
    entry[name] = [...COMMON_ENTRY, `${PAGES_DIR}/${file}/index.js`];
  });

  return entry;
}

// 多页面应用入口配置
// 对应HtmlWebpackPlugin设置
function getMultiPagesPlugins () {
  const plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
  ];

  fs.readdirSync(PAGES_DIR).filter(item => {
    let filePath = path.join(PAGES_DIR, item, 'index.html');
    if (!fs.existsSync(filePath)) {
      return false;
    } else {
      return true;
    }
  }).forEach(file => {
    const name = path.basename(file);
    file = `${PAGES_DIR}/${file}/index.html`;
    // 添加runtime脚本和页面入口脚本
    const chunks = [`runtime~${name}`, name];
    plugins.push(new HtmlWebpackPlugin({
      minify: false,
      filename: `${name}.html`,
      template: file,
      chunks
    }))
  });

  return plugins;
}

module.exports = {
  getMultiPagesEntry,
  getMultiPagesPlugins
}