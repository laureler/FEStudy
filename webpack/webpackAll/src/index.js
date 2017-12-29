// index.js中使用es6语法
import _ from 'lodash'
import  './style.css'
import  myJpg  from './test.jpg'

function component () {
  let elementById = document.createElement('span')
  // lodash import by this script
  elementById.innerHTML = _.join(['hello', 'webpack', '   '])
  elementById.classList.add('hello')
  let image = new Image()
  image.src = myJpg
  elementById.appendChild(image)
  return elementById
}
// 执行 npx webpack src/index.js dist/bundle.js 编译脚本
document.body.appendChild(component())