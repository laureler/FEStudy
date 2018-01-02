// webpack.config 本质上是一段js文件
// 其运行环境应该是在 node.js服务器上来执行的逻辑

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// node.js 导出文件 导出一个对象实例
module.exports = {
  entry: {
    app:'./src/index.js',
    print:'./src/print.js'
  },
  devtool: 'inline-source-map',
  plugins:[
    new HtmlWebpackPlugin({
      title:'output Management'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),

    publicPath:'/'
  },
}
