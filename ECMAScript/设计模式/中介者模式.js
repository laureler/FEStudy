/**
 * 主板
 *
 观察者模式和中介者模式都是通过消息收发机制实现，不过在观察者模式中，
 一个对象既可以是消息的发送者也可以是消息的接收者，
 而中介者模式中消息的发送方只有一个就是中介者对象，而且中介者对象不能订阅消息，
 只有那些活跃对象（订阅者）才能订阅中介者消息。
 如果用中介者模式来解决上面的问题，
 那么中介者对象就是设置层模块对象，它负责向各个导航模块对象发送用户设置消息，
 而各个导航模块则应该作为消息的订阅者存在
 */
// 中介者对象（主板）
var zhuban = function () {
  // 消息对象
  var _msg = {}
  return {
    // 订阅消息方法，type:消息名称 action:消息回调函数
    register: function (type, action) {
      // 如果消息存在
      if (_msg[type])
      // 存入回调函数
        _msg[type].push(action)
      else {
        // 不存在则建立消息容器
        _msg[type] = []
        _msg[type].push(action)
      }
    },
    // 发布消息方法
    send: function (type) {
      // 如果该消息已经被订阅
      if (_msg[type]) {
        // 遍历已存储的消息回调函数
        for (var i = 0, len = _msg[type].length; i < len; i++) {
          // 执行回调函数
          _msg[type][i] && _msg[type][i]()
        }
      }
    }
  }
}