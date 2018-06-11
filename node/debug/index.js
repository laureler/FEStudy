var debug = require('debug')('foo:server');
var http=require("http");
http.createServer(function(req,res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
}).listen(3000,function(){
  debug("listening");
});
// windows
// set DEBUG=foo:* & node index.js


// linux
// DEBUG=mydebug:* node app.js