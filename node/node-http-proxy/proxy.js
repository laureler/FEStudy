var http = require('http'),
  httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({
  target:'http://192.168.10.29:8080',
  forward:'/cas/login',
}).listen(8000);

