/**
  * 通用对话框功能，用于显示指定url地址的页面。并获取操作结果。
  * @param: url 是要显示的页面链接地址
  * @param: title 弹出对话框的title
  * @param: isMax 是否初始最大化对话框
  * @param: resultFun 获取操作结果的回调方法（方法原型：function(string_result)）
  * url页面实现要求说明：
  * 1.如果url地址与当前系统所在域不同（即跨域），内部需要使用消息机制完成通讯：
  * 需要获得操作结果时，本方法会向url所指定的页面发送内容为“feedback”的消息。
  * 页面接收到消息后（或者内部实现者需要主动返回结果时），需将操作结果向本页面也发送内容为“feedback=操作内容”的消息。
  * 而返回null，表示不需要关闭对话框。
  * 2.如果url地址与当前系统所在域相同，内部需要使用回调机制完成通讯：
  * 需要获得操作结果时，本方法会向url所指定的页面调用feedback（原型：return_string function()）方法，页面需实现feedback方法并返回操作结果。
  * 或者内部实现者需要主动返回结果时，调用parent.onShowDialogOK()，通知外部需要返回结果给用户（当然内部仍要实现feedback方法）。
  * 返回null，表示不需要关闭对话框。
 */
function showDialog(url,title,isMax,resultFun){
	url=url.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"+");
	//name属性设置是否跨域：1表示有跨域
	var html='<div id="sDialogBox7811q" name="0">' +
				'<div id="sDialog7811q" class="easyui-window" title="'+title+'" data-options="minimizable:false,collapsible:false,modal:true,footer:\'#sDialog7811q-footer-btns\',maximized:'+isMax+'" style="width:870px;height:515px;">' +
					'<div class="easyui-layout" data-options="fit:true">' +
						'<iframe id="ifrm7811q" style="border:0; width:100%;height:100%;overflow:auto;" src="'+url+'">' +
						'</iframe>' +
					'</div>' +
				'</div>' +
				'<div id="sDialog7811q-footer-btns" style="line-height:36px;height:36px;text-align:right;">' +
					'<a href="javascript:void(0)" style="padding:0 12px;" class="easyui-linkbutton" data-options="iconCls:\'icon-ok\'" onclick="sDialogSure()">确定</a>&nbsp;&nbsp;' +
					'<a href="javascript:void(0)" style="padding:0 12px;;margin-right:5px;" class="easyui-linkbutton" data-options="iconCls:\'icon-cancel\'" onclick="closeDialog();">取消</a>' +
				'</div>'+
			 '</div>';
	
	if($("#sDialogBox7811q").length>0){
		$('#sDialog7811q').window('destroy');
		$("#sDialogBox7811q").remove();
	}
	$('body').append(html);
	$.parser.parse('#sDialogBox7811q');

	this.sDialogSure=function(){
		var ifrm=document.getElementById('ifrm7811q');
		var ifrmWin=ifrm.contentWindow;
		if($("#sDialogBox7811q").attr("name")=="0"){
			var selInfo="";
			try{
				selInfo=ifrmWin.feedback();
			}catch(e){console.error(e);}

			if(selInfo!=null){
				$('#sDialog7811q').window("close");
				//$("#sDialogBox7811q").remove();
				//$('#sDialog7811q').dialog('destroy');
				if(resultFun)
					resultFun(selInfo);
			}
		}else{
			ifrmWin.postMessage("feedback","*");
		}
	};

	//如果是跨域地址，需要通过消息机制获取交互用的值。
	var curDomain=document.domain;
	if(curDomain.toLowerCase()!=getDomainFromUrl(url))
	{
		$("#sDialogBox7811q").attr("name","1");//通过name属性设置标识是否跨域
		window.onmessage=function(e){
			e=e||event;
			var data=e.data;
			if(data){
				var index=data.indexOf("=");
				if(data.substring(0,index)=="feedback")
				{
					$('#sDialog7811q').window("close");
					//$('#sDialog7811q').dialog('destroy');
					data=data.substring(index+1);
					if(resultFun)
						resultFun(data);
				}
			}
		}
	
	}else{
		window.onShowDialogOK=this.sDialogSure;
	}
	
	this.closeDialog = function()
	{
		$('#sDialog7811q').window('close');
		$('#sDialog7811q').window('destroy');
		$("#sDialogBox7811q").remove();
	}

}
