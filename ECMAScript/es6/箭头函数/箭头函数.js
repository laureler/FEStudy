var f = () => 5
var f = function () {
  return 5
}

var sum = function (num1, num2) {
  return num1 + num2
}
var sum = (num1, num2) => num1 + num2

// 方法体 代码超过一行
var sum = (num1, num2) => { return num1 + num2 }

// 这样就会产生新的问题 如果我要返回一个对象 类似于 {name:"long",id:1}
var getname = (name) => ({name: 'long', id: 1})

// 升级>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 配合函数变量解构使用
const full = ({first, last}) => first + '' + last
// 等于
var person = {
  first: 'first',
  last: 'last'
}
const full2 = function (person) {
  return person.first + '' + person.last
}

//简洁语法
const isEven = n => n % 2 == 0   //判断是否是偶数 若是偶数返回true
const square = n => n * n

// 简化回调函数
  [1, 2, 3].map(function (x) {
  return x * x
})
// 等于
  [1, 2, 3].map(x => x * x)


// 简化回调函数2
var result = values.sort(function (a, b) {
  return a - b
})
// 等于
var result2 = values.sort((a, b) => a - b)

///升级>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 配合rest参数
const numbers = (...nums) => nums
numbers(1,2,3,4) //[1,2,3,4]

const headAndTail = (head, ...tail) => console.log(this)

headAndTail(1,2,3,4,5)  //[1,[2,3,4,5]]




