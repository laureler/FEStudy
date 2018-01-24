var Iterator = function (item, container) {
  // 获取父元素
  var container = container && document.getElementById(container) || document,
    // 获取元素
    items = container.getElementById(items),
    //获取长度
    length = items.length
  index = 0
  // 缓存原生数组的 splice方法
  var splice = [].splice()
  // 返回
  return {
    // 获取第一个元素
    first: function () {

    },
    // 获取第二个元素
    second: function () {

    },
    // 获取前面一个元素
    pre: function () {

    },
    // 获取后一个元素
    next: function () {

    },
    // 获取某一个元素
    get: function () {

    },
    // 对每一个元素执行某一个方法
    dealEach: function () {

    },
    // 对一个元素执行某一个方法
    dealItem: function () {

    },
    // 排他方式 处理一个元素
    exclusive: function () {

    }
  }

}