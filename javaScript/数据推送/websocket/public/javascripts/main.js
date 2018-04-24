// 客户端 js
$(function () {
  var i = 0;
  var socket = io.connect("http://localhost:3000")

  socket.on('open',()=>{
    console.log("已连接")
    socket.send('连接成功')   //socket.on('message')就会坚挺到
  })

  socket.on('message',(json)=>{
    console.log('message',json)
  })

})