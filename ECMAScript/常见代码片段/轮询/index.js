/**
 * 初始化轮询
 * @return intervalNumber 当前轮训方法的ID值 通过ID值来关闭轮询
 * @param time      轮询失效时间(秒)
 * @param callback  轮询查找成功之后的处理
 */
function initcheck (intervalNumber,time,callback) {
  var startTime = new Date().getTime();
  if(intervalNumber !== undefined && intervalNumber !== null){
    clearInterval(intervalNumber)
    return
  }
  if(time !== undefined && intervalNumber !== null) console.error('请设置轮询时间!')

  var number =  setInterval(function(){
    if(new Date().getTime() -startTime > time) clearInterval(number)
    var lastNumber = new Date().getTime().toString().substr(new Date().getTime().toString().length-1,1)
    $.get('https://easy-mock.com/mock/59eea9c93511d4418e36efb3/intervalCode?code=0'+lastNumber).done(function (data) {
      callback(data)
    })
    }, 1000);
  return number
}
// 使用方式： 设置一个 6s时间长度的轮询，成功之后来到定义的回调事件
/*let number = initcheck(null,6000,(data)=>{
  if(data.code >5){
    console.log(data.message)
  }
})*/
// 使用方式： 根据轮询返回的number 作为参数来关闭当前的轮询
// initcheck(number)