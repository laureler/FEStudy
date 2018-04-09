/**
 * 参照EasyUI实现的消息提示框。在非EasyUI环境下使用，比如：工作流设计器项目下（用Angular.js）
 */
;

$(document).ready(function(){
	/*弹出框  */
	$.mymessager = {
        alert: function (title,msg,icon,fn) {
            GenerateHtml('alert',title,msg);
            btnOk(fn);
        },
        confirm: function (title,msg,fn) {
        	 GenerateHtml('confirm',title,msg);
             btnOk(fn);
             btnNo();
        },
        show:function(options){
        	//options具有属性值：
        	/*
showType: 消息框显示位置：null,slide,fade,show。默认值是slide；
showSpeed: 消息框显示速度（毫秒）。默认值600.
width: 消息框的宽度。默认值250.
height: 消息框的高度。默认值100.
title: 标题.
msg: 消息内容.
style: 自定义样式.
timeout: 自动关闭延时（毫秒）。默认值4000，如果设为0，则不自动关闭.
        	 */
        	
        	//TODO:显示消息框，并定时关闭
        }
    }
	//生成Html
    var GenerateHtml = function (type,title,msg) {
        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con"><div id="mb_con_box">';
        _html += '<div id="mb_title"><p>'+title+'</p></div><div id="mb_msg"><p>' + msg + '</p></div><div id="mb_btnbox">';

        if (type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        }else if(type == "confirm"){
        	_html += '<input id="mb_btn_no" type="button" value="取消" />';
        	_html += '<input id="mb_btn_ok" type="button" value="确定" />';

        }

        _html += '</div></div></div>';
        // 先将_html添加到body，再设置Css样式
        $("body").append(_html);
        //生成Css
         GenerateCss();
    }

    //生成Css
    var GenerateCss = function () {
        $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
            filter: 'Alpha(opacity=60)', top: '0', left: '0', opacity: '0.6',
        });
        $("#mb_con").css({ zIndex: '999999', width: '20%', position: 'fixed', height:'21%',
            borderRadius:'5px',backgroundColor: '#fff',padding:'1.4%', minHeight:'165px',minWidth:'300px',boxShadow:'-3px 0 10px #b7b7b7 ,3px 0 10px #b7b7b7 ,0 -3px 10px #b7b7b7 ,0 3px 10px #b7b7b7'
       });
        $("#mb_con_box").css({ zIndex: '999999', width: '100%',   height:'100%',
            position:'relative'
       });
        $("#mb_title").css({ zIndex: '999999',   position: 'absolute',width: '100%', height:'35%', width:'auto',
              width:'100%',color:'#474747',fontFamily:'微软雅黑'
       });
       $("#mb_title p").css({  margin:'0',fontSize:'32px'
      });
      $("#mb_msg").css({  position: 'absolute',  height:'30%',width: '100%', top:'35%',
              color:'#474747',fontFamily:'微软雅黑' ,
       });
       $("#mb_msg p").css({  margin:'0',fontSize:'18px'
       });
       $("#mb_btnbox").css({  position: 'absolute',width: '100%', height:'35%',
              top:'65%'
       });
        $("#mb_btnbox input").css({  fontSize:'14px'});
        $("#mb_btn_no").css({  width: '17%', height:'40%', float:'right',marginTop:'5%',marginLeft:'5%',
                border:'1px solid #909090' ,background:'#fff',outline:'none',borderRadius:'2px',cursor:'pointer',color:'#474747',fontFamily:'微软雅黑',

       });
        $("#mb_btn_ok").css({  width: '17%', height:'40%', float:'right',marginTop:'5%',
                 border:'none',background:'#2fc593',outline:'none',borderRadius:'2px',cursor:'pointer',color:'#fff' ,fontFamily:'微软雅黑',

       });

        var _width = document.documentElement.clientWidth;  //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        if(_width<1580){
        	 $("#mb_title p").css({fontSize:'25px'});
        	 $("#mb_msg p").css({ fontSize:'15px'});
        	 $("#mb_btnbox input").css({ fontSize:'12px'});
        }
        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();
        //调整提示框位置
        $("#mb_con").css({ top: (_height - boxHeight) / 3 + "px", left: (_width - boxWidth) / 2 + "px" });
    }
      //确定按钮事件
    var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function () {
        $("#mb_btn_no,#mb_ico").click(function () {
            $("#mb_box,#mb_con").remove();
        });
    }
})
