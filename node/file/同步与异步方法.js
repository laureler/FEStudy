var fs = require('fs')
// sync 是同步的意思  synchronize(同步）
var fileSync = fs.readFileSync('./index.html','utf8')
// 等待操作返回结果，然后利用该结果
console.log(fileSync)

fs.readFile('./index.html',(err,data)=>{
  console.log(data.toString('utf8'))
})