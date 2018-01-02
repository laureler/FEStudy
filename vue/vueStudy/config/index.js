//严格模式
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
// 配置build和dev版本
// 导出一个对象 两个参数 build打包模式  dev开发模式
module.exports = {
  build: {
    // 导入prod.env.js配置文件，只要用来指定当前环境， NODE_ENV: '"production"' prod其实就是production的缩写
    env: require('./prod.env'),
    //使用path路径模块来拼接处 当前目录，再拼接出绝对路径。
    index: path.resolve(__dirname, '../dist/index.html'),
    // 定义静态资源的路径，也就是dist目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 定义静态资源子路径， 也就是dist下的 static文件夹
    assetsSubDirectory: 'static',
    // 定义静态资源的引用路径，也就是真正的引用根路径。
    assetsPublicPath: '/',
    //是否生成sourceMap sourceMap是在编译后的debug或者错误信息时候，可以准确地定位到模块化的文件中。而非打包过后的Bundle.js中
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    //是否在生产环境中压缩代码，若压缩，则必须安装compression-webpack-plugin
    productionGzip: false,
    // 定义要 压缩那些类型的文件
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 开启编译完成后的报告，可以通过设置为true || flase 来开启或者关闭。
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    //引入dev.env.js 里面设置了变量 NODE_ENV: '"development"'
    env: require('./dev.env'),
    //设置开发端口 监听8080
    port: process.env.PORT || 8080,
    //自动打开
    autoOpenBrowser: true,
    // 静态资源
    assetsSubDirectory: 'static',
    //映射路径
    assetsPublicPath: '/',
    // 跨域设置
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    //css 资源映射模块化 css可能会出问题，但是一般都没有问题。所以就没必要。
    cssSourceMap: false
  }
}
