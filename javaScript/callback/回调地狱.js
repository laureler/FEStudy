
function demoA (callback) {
  console.log(1)
  callback('第一次调用回调',function () {

  })
}
function demoB (callback) {
  console.log(2)
  callback('第二次调用回调',function () {

  })
}
demoA(demoB)