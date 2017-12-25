/**
 *
 * @param htmlElement   要进行操作的DOM元素
 * @param config        要进行的配置
 * @param callback      回调函数
 */
function dragOnDrop (htmlElement, config, callback) {
  if (htmlElement == undefined) {
    return
  }
  // 拖拽对象
  this.DragElement = htmlElement
  this._x = this._y = 0
  this.bindEventListener = function () {
    

  }

}