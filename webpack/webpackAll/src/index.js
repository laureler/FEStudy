// index.js中使用es6语法
import _ from 'lodash'
import printMe from './print.js'
import  './test.css'

function component () {
  let elementById = document.createElement('span')
  // lodash import by this script
  elementById.innerHTML = _.join(['hello', 'webpack', '   '])
  elementById.classList.add('hello')

  var btn = document.createElement('button');
  btn.innerHTML = '点我'
  btn.onclick = printMe
  btn.classList.add('test')
  elementById.appendChild(btn)

  return elementById
}
// 执行 npx webpack src/index.js dist/bundle.js 编译脚本
//document.body.appendChild(component())
// 这样写可以让 事件绑定热部署
let element = component();  //当print.js改变导致页面重新渲染的时候
document.body.appendChild(element)

if(module.hot){
  module.hot.accept('./print.js',function () {
    console.log('accepting the updated printMe module!');
    //printMe();
    // 手工配置绑定时间？
    document.body.removeChild(element)
    element = component();
    document.body.appendChild(element)
  })
}