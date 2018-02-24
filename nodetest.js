var save = require('./save.js')
var save2 = require('./save.js')
console.log(require.resolve('./save.js')) //查询路径的时候 并不会加载
console.log(__dirname)
console.log(__filename)
console.log(save.testVar)
save.testVar = '222'
console.log(save2.testVar)



if (module === require.main) {
  console.log('this is the main module in application');
}else{
  console.log(module)
  console.log(require.main)
}