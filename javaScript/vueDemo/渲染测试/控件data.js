// 业务data数据
/**
 *
 * @param extendProperties  若有扩展属性 则传递进来重写扩展属性 否则为空
 */
var templateData = function (extendProperties) {
  if (extendProperties !== undefined) {
    this.extProperties = extendProperties
  }

}
templateData.prototype = {
  code: 'label',
  height: '20px || 20%',       //单位px或百分比
  width: '20px || 20%',     //单位px或百分比
  security: '权限控制',      //todo 权限控制看权限控制解释
  title: '控件标题',         //控件标题
  fName: '标识字段',       //todo 控件标识字段
  zIndex: '控件层级',                 //控件层级
  backgroundColor: '16进制色彩',     //是否有必要增加red之类的字符
  margin: '0px || 0px,0px,0px,0px',  //margin属性值
  font: {
    color: '字体色',
    fontFamily: '字体',             //默认值为宋体
    fontSize: '字号',               //默认值为12px,单位:px
    fontLetter: '字间距',           //默认值为0px
    textDecoration: '下划线',
    fontWeight: '是否加粗',
    fontStyle: '是否倾斜'
  }
}
exports.default = s

var s = new templateData({
  "im_extendProperties":'222'
})
console.log(s)