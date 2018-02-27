var fs = require('fs')
// 异步读取文件
fs.readFile('./index.html', {encoding: 'utf8', flag: 'r'}, (error, data) => {
  console.log(data)
})

console.log('-------------------------------')
// 同步读取文件
try {
  var data = fs.readFileSync('./index.html','utf8')
  console.log(data)
} catch (e) {console.log('读取文件的时候发生错误') }