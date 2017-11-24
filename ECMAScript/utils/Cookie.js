// cookie相关的武器库
/**
 *
 */

/**
 * @desc 根据name读取cookie属性
 * @param name:String
 * @return :String
 */
function getCookie (name) {
  var arr = document.cookie.replace(/\s/g,'').split(';')
  for (var i = 0; i < arr.length; i++) {
    var temparr = arr[i].split('=');
    if(temparr[0] == name){
      return decodeURIComponent(temparr[1])
    }
  }
  return '';
}
