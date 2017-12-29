// webpack.config 本质上是一段js文件
// 其运行环境应该是在 node.js服务器上来执行的逻辑

const path = require('path');
// node.js 导出文件 导出一个对象实例
module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    // path 是node.js中的方法 dirname: C:\dev\projects\JavaScriptStudy\webpack\03使用配置文件 当前文件所在文件夹的绝对路径
    // resolve 是指 吧__dirname dist拼接为一个绝对路径，若不能拼接，则返回当前目录 也就是说 应该返回了 __dirname/dist文件
    path: path.resolve(__dirname, 'dist')
  }
};
console.log(__dirname)