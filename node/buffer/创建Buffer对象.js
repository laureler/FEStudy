// buffer类是一个可以再任何模块中被利用的全局类, 所以不需要加载任何模块直接new就好
// 制定大小
var bf = new Buffer(32)
bf.fill(1, 10)
console.log(bf)

//直接使用数组
var bf2 = new Buffer([1, 2, 3, 33, 4, 5, 6, 767, 22])
console.log(bf2)

//直接使用一个字符串来初始化缓存区
var str  = '你好'
var bf3_utf8 = new Buffer(str,'utf8')
var bf3_ascii = new Buffer('你好','ascii')
var bf3_base64 = new Buffer('你好','base64')
var bf3_utf16le = new Buffer('你好','utf16le')
var bf3_ucs2 = new Buffer('你好','ucs2')
var bf3_hex = new Buffer('你好十六进制','hex')
console.log(bf3_utf8)
console.log(str.length)
console.log(bf3_utf8.length)

console.log(bf3_base64.toString('base64',0,bf3_base64.length))
