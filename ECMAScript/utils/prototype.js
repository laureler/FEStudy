/**
 * treejs 的方法封装
 * @param element   传递进来的htmlElement对象
 * @param config    用户初始化的config的参数
 */
var treejs = function (element,config) {
    // 定义当前tree的 内部方法变量


}


treejs.prototype = {
  demo :[1,2,3],
  demo2 : function () {
    console.log('callback');
  }
}


//var result = new tree(HTMLElement,config)
// result 应当是你返回的 tree的对象，内部封装了数据和方法，可以由用户再次通过某些情况来触发 调用你的方法
// result.collapse[折叠的意思]( param1,param2) 等等方法
