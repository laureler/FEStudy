//路由句柄
//可以为请求提供多个回调函数，行为类似中间件
// 唯一区别是 这些回调函数有可能会继续调用 next('route')方法，而略过其他路由回调函数
// 可以利用路由句柄有多种形式，可以是一个函数，函数数组或者两者组合
var express = require('express')
var app = express()

//使用一个回调函数处理路由
app.get('/example/a',(req,res,next)=>{
  res.send('hello from a')
})

// 使用多个函数来处理路由
// 请求会首先找到第一个回调函数 然而回调函数却调用了 next();
// 继而进入第二个回调函数
app.get('/example/b',(req,res,next)=>{
  console.log('response will be send by the next function');
  next();
},(req,res)=>{
  res.send('hello from b')
})

//使用函数组来处理路由
var cb0 = function(req,resp,next){
  console.log('cb0')
  next();
}
var cb1 = function(req,resp,next){
  console.log('cb1')
  next();
}
var cb2 = function(req,resp,next){
  console.log('cb2')
  next();
}
var cb3 = function(req,resp,next){
  console.log('cb3')
  next();
}
var cb4 = function(req,resp,next){
  console.log('cb4')
  resp.send('hello from cb4')
}
app.get('/example/c',[cb0,cb1,cb2,cb3,cb4])


//也可以混合处理路由
app.get('/example/d',[cb0,cb1,cb2],function (req, resp, next) {
  console.log('response will be send by the next function')
  next();
},(req,resp)=>{
  resp.send('混合处理路由方式')
})
app.listen(3000)
console.log('listening http://127.0.0.1:3000')