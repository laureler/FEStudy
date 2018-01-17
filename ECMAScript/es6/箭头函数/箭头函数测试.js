// this 的引用不会被更改，而且this是在创建的this
var testFun2 = ()=>{
  console.log(arguments)
  //console.log(rest)
  setTimeout(() => {
    console.log(this)
  }, 1000);
  var id = 'old'
  return ''
}

testFun2.call({id:'test'})

function foo () {
  setTimeout(()=>{
    console.log(this)
  },2000)
}
var  id = 'go'
foo.call({id:'to'})
