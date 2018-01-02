// webpack.config 本质上是一段js文件
// 其运行环境应该是在 node.js服务器上来执行的逻辑

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
//const webpack = require('webpack-hot')
// node.js 导出文件 导出一个对象实例
module.exports = {
  entry: {
    app:'./src/index.js',
    //print:'./src/print.js'
  },
  devtool: 'inline-source-map',
  devServer :{
    contentBase:'./dist',
    hot:true
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'output Management'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),

    publicPath:'/'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  }
}
