// Array相关的js库
/**
 *  判断两个数组是否相等
 * @param array1:Array
 * @param array2:Array
 * @return :Boolean
 */
function arrayEqual(array1,array2){
  if(array1 === array2) return true;
  if(array1.length != array2.length) return false;
  for (var i = 0; i < array1.length; i++) {
    if(array1[i] !== array2[i]) return false;
  }
  return true
}