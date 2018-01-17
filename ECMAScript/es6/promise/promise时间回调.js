const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(console.log('errpr'), 3000))
})
var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log('p2')
    return resolve(p1)
  }, 1000)
  reject(() => console.log('p2 reject'))
})

p2.then(result => console.log(result))
  .catch(result => console.log(result))

