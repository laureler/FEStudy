function demo1 () {
  var data = 1
  this.data = data;
}
function demo2 () {
  var data  =2
  this.data = data;
}
console.log(new demo1().data)
console.log(new demo2().data)