// webpack.config 本质上是一段js文件
// 其运行环境应该是在 node.js服务器上来执行的逻辑

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// node.js 导出文件 导出一个对象实例
module.exports = {
  entry: {
    app:'./src/index.js',
    print:'./src/print.js'
  },
  plugins:[new HtmlWebpackPlugin()],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
}
