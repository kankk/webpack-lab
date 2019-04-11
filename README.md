# loaders
## url-loader
* 解决项目中的路径问题
* 将小体积的资源转成base64
* 让webpack识别资源文件

## file-loader
* 解决项目中的路径问题
* 让webpack识别资源文件

## html-withimg-loader
* 解决html中的路径问题
* ps: webpack建议所有图片都使用背景图的方式, 所以默认情况在html中使用img标签, 会显示路径错误

## css-loader style-loader
* webpack默认只识别js文件, 要解析打包css必须安装相应的loader

## sass-loader node-sass
* 对sass进行解析

## less-loader less
* 对less进行解析

## postcss-loader autoprefixer
* 自动添加css3属性前缀


# plugins
## html-webpack-plugin
* 根据模板生成页面html
* 自动引入JS等外部资源文件
* 设置title, mate等标签内容
* 优化html(压缩, 缓存, 转换等)

## mini-css-extract-plugin
* webpack认为css应该被打包到JS中, 以减少HTTP请求次数
* 业务需求抽离CSS单独打包
* 需要配置资源文件的输出路径(相对路径改成绝对路径)

## optimize-css-assets-webpack-plugin
* 即使在生产模式下, 分离后的css不会被压缩
* 使用此插件对css进行压缩处理

## purifycss-webpack purify-css
* 对于页面中没有使用的css, 打包时可以通过此插件进行清除
* 限制: 仅限于清除分离后的css文件中无用的样式

# 其他
## webpack-dev-server
* 本地Node.js Express服务器, 本地开发时使用
* 支持热更新
* 精简终端输出
* 热替换

## webpack-merge
* 通过webpack-merge合并多个webpack配置

## source map
* 在config的devtool中配置

## tree shaking
* 自动开启tree shaking的条件
  * webpack4.x production mode下
  * 编码时, 遵循es6模块化语法(require无效)
  * 编译时, 不要遍历ES6模块

## HMR 热更新
* 作用: 在启动服务时, 局部加载页面被修改之处; 加快开发编译速度
* 保留在完全重新加载页面时丢失的应用程序状态