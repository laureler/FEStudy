var http = require('http')
var server = http.createServer()

// server服务器在接收到客户端请求时 出发的request事件绑定事件处理函数
server.on('request', function (req, resp) {
  console.log(req.url)
  res.end()
})
server.listen(1337, '127.0.0.1')