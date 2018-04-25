var express = require('express')
var app = express()

// todo 注意 查询字符串不属于路径的一部分
app.get('/', function (req, res) {
  res.send('root')
})
app.get('/about', function (req, res) {
  res.send('about')
})

// 匹配 acd 和 abcd (ab至少有一个要出现)
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})
// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function (req, res) {
  res.send('ab+cd')
})

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})
//------------------经典的路由示例
app.get('/as', function(req, res) {
  res.send('a');
});
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});



app.listen(3000)
console.log('listening http://127.0.0.1:3000')