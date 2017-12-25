
function classa () {
  this.testb = function  () {
    test()
  }
  function test () {
    console.log(1)
  }
}
new classa().testb()
