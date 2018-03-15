const p1 = new Promise((resolve => {
  setTimeout(()=>{
    resolve('p1')
  },3000)
}),reject=>{

})
const p2 = new Promise((resolve => {
  setTimeout(()=>{
    resolve('p1')
  },1000)
}),reject=>{

})
const p3 = new Promise((resolve => {
  setTimeout(()=>{
    resolve('p1')
  },1000)
}),reject=>{                                                                                                

})
var s = "time"
console.time(s)
const p = Promise.all([p1, p2, p3]);
p.then((value => {
  console.timeEnd(s)
  console.log("resolved")
}))