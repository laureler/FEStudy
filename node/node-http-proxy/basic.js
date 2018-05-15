// 使用node原生模块的一个 代理服务器
var http = require('http')
var url = require('url')
var getCookie = []
var postCookie = []
// 创建http服务 代理所有服务器转发
var app = http.createServer(function (req, res) {
  // 查询本机ip
  //http://192.168.10.29:8080/
  var cookieArray = []
  var regExpResult = new RegExp('/cas/login').test(req.url)
  if (regExpResult && req.method == 'POST') {
    req.headers['cookie'] =getCookie[0].split(";")[0];
  }
  var sreq = http.request({
    // host: '127.0.0.1', // 目标主机
    host: '192.168.10.29', // 目标主机
    path: req.url, // 目标路径
    port: '8080',
    method: req.method,
    headers: req.headers
  }, function (sres, resp) {
    sres.pipe(res)
    var regExpResult = new RegExp('/cas/login').test(req.url)
    if (regExpResult && req.method === 'POST') {
      if (cookies != undefined && cookies.length >= 2) {
        cookieArray = cookies
      }
    }
    if (regExpResult && req.method === 'GET') {
      var cookies = sres.headers['set-cookie']
      getCookie = cookies;
    }

    sres.on('end', function () {
      console.log('done')
    })
  })
  if (/POST|PUT/i.test(req.method)) {
    req.pipe(sreq)
  } else {
    sreq.end()
  }
})
// 访问127.0.0.1:3001查看效果
app.listen(3000)
console.log('server started on http://127.0.0.1:3000')