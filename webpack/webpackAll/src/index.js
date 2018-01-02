// index.js中使用es6语法
import _ from 'lodash'
import printMe from './print.js'
import './test.css'
import { cube } from './math.js'

function component () {
  let element = document.createElement('pre')
  element.innerHTML = [
    'hello,webpack',
    '5 cubed is equal to' + cube(5)
  ].join('\n\n')
  return element
}

// 执行 npx webpack src/index.js dist/bundle.js 编译脚本
//document.body.appendChild(component())
// 这样写可以让 事件绑定热部署
let element = component()  //当print.js改变导致页面重新渲染的时候
document.body.appendChild(element)

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('accepting the updated printMe module!')
    //printMe();
    // 手工配置绑定时间？
    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
}