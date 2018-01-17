// 创建Promise 实例

const promise = new Promise(function (resolve, reject) {
  console.log('create promise');
  if(true /*异步操作成功*/){
    //执行异步操作
    var value = 'success'
    resolve(value) //ba Promise函数的 对象转变为成功 pending->resolved 在异步操作成功的时候，把结果传递出去
  }else{
    //拒绝执行异步操作，返回错误
    var error = 'error'
    reject(error)  // Promise函数的状态转变为失败  pending->rejected 在异步操作失败的过程中调用。 把错误的结过返回出去
  }
})

// 所以，在Promise生成了实例之后，要制定他的resolved rejected状态的回调函数
// promise.then 接受两个参数，一个是resolved 一个是rejected
promise.then(function (value) {
    console.log(value)
},function (error) {
  console.log(error)
})

console.log('hi')