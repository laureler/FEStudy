/*
* @Author: MWH
* @Date:   2017-12-18 15:16:46
* @Last Modified time: 2017-12-21 10:33:13
* @desc:  1、fix easy_ui datagrid 不显示行号问题；
*         2、fix easy_ui datagrid 二次加载滚动条不恢复问题；
*         
* @use：在$("#dg").datagrid()中添加onLoadSuccess事件
* 
* eg:
* $("#dg").datagrid({
    onLoadSuccess : function () {
        // 不传入该列标题，即默认为“序号”, 
        // 若为$(this).datagrid("fixRownumber", '标题'); 即为“标题”，建议为两个字
        $(this).datagrid("fixRownumber");  // 默认为“序号”

        $(this).datagrid("fixDatagridScrollBar");  // fix滚动条
    }
  });
*/


(function($){
    $.extend($.fn.datagrid.methods, {
        // fix 行号问题
        fixRownumber : function (jq, title) {
            return jq.each(function () {
                var panel = $(this).datagrid("getPanel");
                // 设置列表标题
                $(".datagrid-header-rownumber", panel).text(title || '序号');
                //获取最后一行的number容器,并拷贝一份
                var clone = $(".datagrid-cell-rownumber", panel).last().clone();
                //由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
                clone.css({
                    "position" : "absolute",
                    left : -1000
                }).appendTo("body");
                var width = clone.width("auto").width();
                //默认宽度是25,所以只有大于25的时候才进行fix
                if (width > 25) {
                    //多加5个像素,保持一点边距
                    $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
                    //修改了宽度之后,需要对容器进行重新计算,所以调用resize
                    $(this).datagrid("resize");
                    //一些清理工作
                    clone.remove();
                    clone = null;
                } else {
                    //还原成默认状态
                    $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
                }
            });
        },
        // fix 滚动条问题
        fixDatagridScrollBar : function(jq) {
            return jq.each(function(){
                var panel = $(this).datagrid("getPanel"); 
                var datagrid_body = $(".datagrid-view2>.datagrid-body", panel);
                // 恢复滚动条
                datagrid_body.scrollTop(0);
                datagrid_body.scrollLeft(0);
            });
        }
    });
})(jQuery);