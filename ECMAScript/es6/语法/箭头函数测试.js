
var testFun2 = ()=>{
  console.log(this)
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