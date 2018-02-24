var http = require('http')
var events = require('events')
var server = http.createServer()

server.on('newListener',function (e,f) {
  console.log(`绑定了新的事件:${f}`)
})
server.on('removeListener',function (e, f) {
  console.log(`移除了事件${f}`)
})


server.on('request', (req, resp) => {
  if(req.url != '/favicon.ico') console.log(req.url)

  resp.end()
})


server.on('request', (req, resp) => {
  if(req.url != '/favicon.ico')
    console.log('我是绑定的第2个')


  resp.end()
})

server.on('request', (req, resp) => {
  if(req.url != '/favicon.ico')
      console.log('我是绑定的第三个')

  resp.end()
})
server.listen(1337,'127.0.0.1')
// 打印出 server目标上 绑定的request事件的数量
console.log(events.EventEmitter.listenerCount(server,'request'))