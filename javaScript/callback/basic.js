// 声明一个 回调函数
var callback = function (str) {
  console.log(str)
  console.log(new Date())
}

function fun (param, callback) {
  callback('先行回调')
  console.log('1')
  console.log('1')
  console.log('1')
  console.log('1')
  console.log('1')
  console.log('1')
  console.log('1')
  console.log('1')
  callback('后执行回调')
}

fun(1,callback)

function promiseDemo () {
  var obj = new Promise(function (resolve,reject) {
    resolve('先执行回调')
    console.log('2')
    console.log('2')
    console.log('2')
    console.log('2')
    console.log('2')
    console.log('2')
    console.log('2')
    console.log('2')
    console.log('2')
    console.log('2')
    resolve('后执行回调')
  })
  return obj
}
promiseDemo()           //先执行某方法
  .then(function (str) {  //然后在执行此方法
    console.log(str)
  })