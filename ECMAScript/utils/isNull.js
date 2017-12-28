/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
    return false
  return !Object.keys(obj).length
}

/**
 * 判断一个用户提交的 数据是否为空或者换行符(回车) 全部为空格
 * @param str
 * @return Boolean
 */
function isNull( str ){
  if ( str == "" ) return true;
  let result;
  var regu = "^[ \n]+$";
  var re = new RegExp(regu);
  return re.test(str);
}