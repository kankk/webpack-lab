const path = require('path');

// 生成HTML页面
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 每次打包删除dist文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 抽离CSS
const MinicssExtractPlugin = require('mini-css-extract-plugin');
// 压缩分离后的css
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');
// 净化分离后的css
const glob = require('glob');
const PurifycssPlugin = require('purifycss-webpack');

// 自定义 Plugins
const TimerPlugin = require('./plugins/TimerPlugin');

// 优化
const WebpackUtils = require('./webpack-utils');

// let publicPath = 'http://localhost:5000/static/assets'; // 打包的绝对路径

module.exports = {
  mode: 'development',
  // entry: {
  //   index: './src/index.js'
  // },
  entry: WebpackUtils.getMultiPagesEntry(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  // resolve
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ],
    alias: {
      components: path.resolve(__dirname, '../src/components')
    },
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  // loaders
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/, // 排除不要加载的文件夹
      include: path.resolve(__dirname, '../src') // 指定需要加载的文件夹
    }, {
      // 图片文件
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192, // 文件体积小于 8192kb 时，将被转为 base64 资源
          name: '[name].[ext]',
          outputPath: 'static/assets/', // 资源 输出路径
          // publicPath
        }
      }]
    }, {
      // 视频文件
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/assets/', // 资源 输出路径
          // publicPath
        }
      }]
    }, {
      // 字体文件
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/assets/', // 资源 输出路径
          // publicPath
        }
      }]
    }, {
    //   // Css
    //   test: /\.css$/,
    //   use: ['style-loader', 'css-loader']
    // }, {
      // 分离CSS
      // style-loader -> MinicssExtractPlugin.loader
      test: /\.css$/,
      use: [MinicssExtractPlugin.loader, 'css-loader']
    }, {
      // Sass, Scss
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']  // 从右往左编译
    }, {
      // Less
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']  // 从右往左编译
    }, {
      // typescript
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.md$/,
      use: [{
        loader: path.resolve(__dirname, './loaders/MarkdownLoader.js')
      }]
    },]
  },
  // optimization
  optimization: {
    splitChunks: {
      // all: 所有模块
      // initial: 同步模块
      // async: 异步模块
      chunks: 'all',
      minSize: 10000, // 提高缓存利用率, 这需要在https2/spdy
      maxSize: 0,
      minChunks: 2, // 共享最少的chunk数, 使用次数超过这个值才会被提取
      maxAsyncRequests: 5,//最多的异步chunk数
      maxInitialRequests: 5,// 最多的同步chunks数
      automaticNameDelimiter: '~',// 多页面共用chunk命名分隔符
      name: true,
      cacheGroups: {  // 声明的公共chunk
        vendor: {
          test: module => {
            if (module.resource) {
              const include = [/[\\/]node_modules[\\/]/].every(reg => {
                return reg.test(module.resource);
              });
              const exclude = [/[\\/]node_modules[\\/](react|redux|antd)/].some(reg => {
                return reg.test(module.resource);
              });
              return include && !exclude;
            }
            return false;
          },
          name: 'vendor',
          priority: 50,// 确定模块打入的优先级
          reuseExistingChunk: true,// 使用复用已经存在的模块
        },
        default: {
          test: module => {
            if (module.resource) {
              const include = [/[\\/]src[\\/]components[\\/]/].every(reg => {
                return reg.test(module.resource);
              });
              return include;
            }
            return false;
          },
          // name: 'components',
          minChunks: 1,
          priority: 40,// 确定模块打入的优先级
          reuseExistingChunk: true,// 使用复用已经存在的模块
        }
      }
    }
  },
  // plugins
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './src/index.html'
    // }),
    ...WebpackUtils.getMultiPagesPlugins(),
    new MinicssExtractPlugin({
      filename: 'static/css/[name].[hash:7].css'
    }),
    new OptimizeCSS(),
    // new PurifycssPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src/*.html'))
    // })
    new CleanWebpackPlugin(),
    new TimerPlugin()
  ],
}