

var _name, _age           //私有变量

var name = '', age = 0    //共有变量

// 模块对象的构造函数
var foo = function (name, age) {
  _name = name
  _age = age
}

// setName setAge getName getAge 共有函数
// 获取私有变量_name的 变量值
foo.prototype.getName = function () {
  return _name
}

//设置私有变量name的值
foo.prototype.setName = function (name) {
  _name = name
}

// 获取私有变量_age的值
foo.prototype.getAge = function () {
  return _age
}

//设置私有变量age的值
foo.prototype.setAge = function (age) {
  _age = age
}
foo.prototype.name = name
foo.prototype.age = age
module.exports = foo