// 基本的回调事件
function callback (str) {
  if(str === undefined) {
    console.log('callback被调用')
    return 'callback'
  }
}
function fun (param, callback) {
  if(param !== undefined && callback !== undefined){
    console.log(param)

    if(callback === 'callback'){
      console.log('我本来想调用回调函数的，但是你给了我回调函数的返回结果！')
    }else {
      callback(param)
    }
  }
}


fun(1,callback)
// 注意错误 下列是在方法被调用的时候 直接调用了 名为callback的方法，并利用其返回的结果作为参数(返回结果为 'callback':string)
// 而且在fun方法里 也要额外的判断 是否第二个参数传递进来的是否是方法
// fun(1,callback())