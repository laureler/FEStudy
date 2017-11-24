// HTMLElement class相关的武器库

/**
 *  1. addClass     添加class样式
 *  2. hasClass     判断是否拥有class样式
 *  3. removeClass  移除class样式
 */

/**
 *  为HTMLElement添加class
 * @param ele:HTMLElement   要添加的DOM元素
 * @param classStr:String   class样式名称
 * @return className:String 加入的class样式名称
 * @requires hasClass       依赖方法 hasClass
 */
function addClass (ele, classStr) {
  var result = ''
  if (!hasClass(ele, classStr)) {
    ele.className += '' + classStr
    result = classStr
  }
  return result
}

/**
 * 判断元素是否拥有某种class样式
 * @param ele:HTMLElement
 * @param classStr：String
 * @return {boolean}
 */
function hasClass (ele, classStr) {
  return (new RegExp('(\\s|^)' + classStr + '(\\s|$)').test(ele.className))
}

/**
 * 移除当前DOM的class样式
 * @param ele       要添加的DOM元素
 * @param classStr  class样式
 * @return :Boolean 返回值的boolean类型
 */
function removeClass (ele, classStr) {
  if (hasClass(ele, classStr)) {
    var regExp = new RegExp('(\\s|^)' + classStr + '(\\s|$)')
    ele.className = ele, className.replace(regExp, ' ')
    return true;
  }
  return false
}