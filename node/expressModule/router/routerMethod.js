var express = require('express')
var app = express()
// express 提供了下列的方法
/*get, post, put, head, delete, options,
  trace, copy, lock, mkcol, move, purge,
  propfind, proppatch, unlock, report,
  mkactivity, checkout, merge, m-search,
  notify, subscribe, unsubscribe, patch,
  search, connect*/
// get method route
app.get('/jsonObj1', function (req, res) {
  var responseObject = [
    {name: 'help'},
    {name: '123'}
  ]
  res.send(responseObject) //send可以返回文本和其他
})
// post method route
app.post('/jsonObj2', function (req, res) {
  var responseObject = [
    {name: 'help'},
    {name: '123'}
  ]
  res.json(responseObject)
})
//全部请求
app.all('/serect',function (req, res, next) {
  console.log('accessing thr secret section ……')
  // pass control to the next handler
  next();
})
app.listen(3000)
console.log('listening to port http://localhost:3000')