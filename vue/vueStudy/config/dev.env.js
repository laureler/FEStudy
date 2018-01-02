'use strict'
// 首先引入的是webpack的merge插件，该插件是用来合并对象，也就是配置文件用的，相同的选项会被覆盖
// 可以在用户 设置了自己的额外的配置文件的时候 合并参数
const merge = require('webpack-merge')
//引入配置文件
const prodEnv = require('./prod.env')
// 合并 打包配置和 开发配置  开发配置要 包含 打包配置
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
