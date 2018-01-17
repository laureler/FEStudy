function log (x, y) {
  y = y || 'world'
  console.log(x,y)
}
log('hello')
log('hello','china')
log('hello','')
log('hello',false)  //赋值的false不起作用了

function defaultparam (param1, param2 = 'x') {
  console.log(param1,param2)
  const param1 = '2' //error
  var param1  = '2'  //error
}
defaultparam('1',false)