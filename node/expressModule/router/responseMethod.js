//响应路由的方法
var express = require('express')
var app = express()

app.get('/index',(req,resp)=>{
  res.download()//提示下载文件
  res.end() //中介响应处理流程
  res.json()  //发送一个json格式的响应
  res.jsonp() //发送一个支持jsonp的json格式的响应
  res.redirect() // todo 重定向请求
  res.render()  // todo 渲染视图模板 ？
  res.send()
  res.sendfile()
  res.sendStatus()
})
app.listen(3000)
console.log('listening http://127.0.0.1:3000')