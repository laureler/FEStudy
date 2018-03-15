const p1 = new Promise(function(resolve,reject) {
  // 3000毫秒后 状态会变成rejected
  setTimeout(() => resolve(new Error('fail'),3000))
})
const p2 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    return resolve(p1)
  },0)
})

p2.then(function(result) {
  console.log(result)
},function(error) {
  console.log("p2"+ error)
})
//可以再报错的Promise里面，了解当前发生错误的环境信息
process.on('unhandledRejection', function (err, p2) {
  throw err;
});

//链式表达
/*
new Promise(function(resolve,reject) {
  // 3000毫秒后 状态会变成rejected
  setTimeout(() => {
      return reject(new Error('fail'),3000)
  })
}).then(function (value) {
  console.log('我是第一个链式表达式，取值来自于前面的 new promise')
})*/
