//启动严格模式
'use strict'
// 检查版本号
require('./check-versions')()
//引入配置文件中的 index.js文件(没有指明文件的默认使用index.js)
const config = require('../config')

// 若没有定义全部变量 NODE_ENV 则将NODE_ENV设置为development
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// opn插件式用来打开指定终端的，此文件用来在默认浏览器中打开连接 opn(url)
const opn = require('opn')
// nodejs path路径模块
const path = require('path')
// nodejs 框架 express 主要作用简化操作，是服务器端监听文件的，理解为tomcat容器即可
const express = require('express')
//webpack模块，用来使用webpack内置插件
const webpack = require('webpack')
// 用来代理请求的，只能用于开发环境，目的主要是解决跨域请求后台的api
const proxyMiddleware = require('http-proxy-middleware')
// 下面的意思是指，若不是testing 或者 production环境就引入 webpack.dev.conf.js配置文件。
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 默认的监听端口号，因为没有设置process.env.PORT 所以使用了config.dev.port-->8080
const port = process.env.PORT || config.dev.port

// automatically open browser, if not set will be false
// 由于 null||undefined 前面追加!!都会返回true ，这样若config.dev.autoOpenBrowser是true的时候，可以加两个!!来杜绝 null||undefined的情况
const autoOpenBrowser = !!config.dev.autoOpenBrowser


// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//定义HTTP跨域问题
const proxyTable = config.dev.proxyTable


// 下面是创建node.js的express开发架构的实例。
const app = express()
// 最核心的配置 把webpack的配置文件传递到webpack方法中， 返回的编译对象中有很多属性。 主要用到里面的状态函数
const compiler = webpack(webpackConfig)

// 开始webpack 热部署插件
// webpack-dev-middleware   webpack-hot-middleware 黄金组合搭档
// webpack-dev-middleware webpack 打包配置
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// webpack-hot-middleware webpack 热部署配置
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})


// force page reload when html-webpack-plugin template changes  强制重新加载页面 当html-webpack-plugin 模板改变的时候
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display

app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
// es6 promise 语法 定义两个回调函数
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port


// 下面是加载动画
console.log('> Starting dev server...')
// waitUntilValid是webpack-dev-middleware实例的方法，在编译成功之后调用
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it 测试环境不再主动打开浏览器
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    // node.js监听端口
    server = app.listen(port)
    _resolve()    //resolve并没有真正的回调函数 只是规范 模拟而已
  })
})

// 把 promise对象也导出出去， 对外提供操作服务器和 接收数据的接口。
module.exports = {
  ready: readyPromise,    //promise实例，可以通过readyPromise.then收到数据
  close: () => {
    server.close()      //关闭服务器
  }
}
