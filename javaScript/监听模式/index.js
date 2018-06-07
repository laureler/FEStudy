class TargetObj {
  constructor (key, value, callback) {
    this.value = value;
    this.key = key;
    this.callback = callback;
  }

  /**
   * 为当前的对象 绑定监听
   * @param param
   * @param callback
   */
  observerParam (param, callback) {
    return new Proxy(this, {
      set (target, property, value, reciever) {
        if (property === param && target.callback != undefined) {
          target.callback(target[property], value);
        }
        return Reflect.set(target, property, value, reciever);
      }
    });
  }
}

/**
 * 添加一个 自动监听属性值的对象 当value变化的时候，自动触发callback
 * @param key
 * @param value
 * @param callback
 * @param watchParam 要监听的param
 * @constructor
 */
function ObserverObject (key, value, callback, watchParam) {
  return new TargetObj(key, value, callback).observerParam(watchParam);
}

// 使用方法:
let targetObj = new ObserverObject(1, 'Martin', (oldVal, newVal) => {
	console.info(`value属性的值从 ${oldVal} 改变为 ${newVal}`);
},'value')

targetObj.value = 'Lucas';

