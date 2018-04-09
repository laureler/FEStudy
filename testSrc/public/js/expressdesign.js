/**
 * 表达式设计器 动态生成
 */
var expressCollect = {
	'formId':'',
	'bBackServer':1,
	'oprBtn':{
		'save':{
			text : '保存',
			value : 'save',
			tip : '保存表达式'
		},
		'debug':{
			text : '调试运行',
			value : 'debug',
			tip : ''
		}, 
		'getVal':{
			text : '获取值',
			value : 'getVal',
			tip : '',
			formIdCollect: '',
			exp: ''
		},
		'setVal':{
			text : '设置值',
			value : 'setVal',
			tip : '',
			formIdCollect: '',
			exp: ''
		},
		'getSysField':{
			text : '获取系统字段',
			value : 'getSysField',
			tip : '',
			formIdCollect: '',
			exp: ''
		},
		'getCustomField':{
			text : '获取自定义字段',
			value : 'getCustomField',
			tip : '',
			formIdCollect: '',
			exp: ''
		}
	}
};


/**
 * openExpress(params) //弹窗
 *
 * @param oldExpFla  初始表达式内容 （会放置在打开的弹窗内部 表达式区域）           //初始表达式内容
 * @param innerContId 若Iframe内嵌页面，则需要将Iframe页面的id传递进来，若无则null //要内嵌界面的容器ID。如果为空，则以弹出框显示；否则将界面显示在容器
 * @param resultFun 是回调函数 原型function resultFun(result){} 获取确定按钮后的返回值
 * @param bBackServer 表达式类型（0前端表达式，1后端表达式）,不传入默认0
 * @param formId 关联表单ID（如果未传入表单ID，就是目前的实现方式，但如果传入了表单ID，不需要弹出表单选择对话框）
 */
document.write("<link href='/public/codemirror/codemirror-5.32.0/lib/codemirror.css' rel='stylesheet'/>");
document.write("<link href='/public/codemirror/codemirror-5.32.0/theme/ambiance.css' rel='stylesheet'/>");
document.write("<script type='text/javascript' src='/public/codemirror/codemirror-5.32.0/lib/codemirror.js'></script>");
document.write("<script type='text/javascript' src='/public/codemirror/codemirror-5.32.0/mode/javascript/javascript.js'></script>");
document.write("<script type='text/javascript' src='/public/js/FormObjectSelector.js'></script>");
document.write("<script type='text/javascript' src='/public/js/FormSelector.js'></script>");
document.write("<script type='text/javascript' src='/public/js/exprruntimetest.js'></script>");

function openExpress(oldExpFla,resultFun,innerContId,bBackServer,formId) {
	// console.log(oldExpFla);
	expressCollect.bBackServer = bBackServer?bBackServer:0;
	expressCollect.formId = formId?formId:'';
	var bBackName = bBackServer?"表达式设计器-后端表达式":"表达式设计器-前端表达式";

	var html = '';
	if (!innerContId) {
		html += '<div id="expresswin7811qBox">'+
					'<div id="expresswin7811q" class="easyui-dialog"  title="'+bBackName+'" style="width:700px;height:500px" data-options="maximized:true,maximizable:true,buttons:\'#win-express-footer-btns\'">';
	}else{
		html += '<div id="expresswin7811q" style="width:100%;height:100%">';
	}
	
	html += '<div class="easyui-layout" data-options="fit:true" style="height:100%">'
			+ '<div data-options="region:\'center\',collapsible:false" style="box-sizing: border-box;overflow:hidden;">'
			+ '<textarea id="expressionDesignerText" style="height:100%;width:100%;"></textarea>'
			+ '<div id="validateBox" class="validateBox"><div id="validateTxt"></div><div class="closeValdateTxt" onclick="closeValdateTxt()"></div></div>'
			+ '</div>'
			+ '<div data-options="region:\'south\',border:false,collapsible:true" style="height:200px;"> '
			+ '<div id="signButtonId" style="padding: 5px 10px;border: 1px solid #e1e1e1;">';
	for (var key in expressCollect.oprBtn) {
		var _btn = expressCollect.oprBtn[key];
		if(key=="save" && innerContId){
			continue;
		}
		if(key=="debug"){
            html += '<input id="expresswin7811qBox-DgsJid" type="text" style="float: right;height: 20px;" placeholder="请输入调试环境的业务号">';
            html += '<a href="#" class="easyui-linkbutton mr5" style="float:right" onclick="expToolbarClk(\''+_btn.value+'\')">' + _btn.text + '</a>';
            continue;
		}
		html += '<a href="#" class="easyui-linkbutton mr5" onclick="expToolbarClk(\''+_btn.value+'\')">' + _btn.text + '</a>';
	}
	html += '</div>'
			+ '<div class="easyui-layout" data-options="fit:true,border:false" style="width:100%;height:100%;">'
			+ '<div data-options="region:\'west\',split:true" style="width:40%;overflow-x:hidden;"> '
			+ '<div style="margin:4px 0;">'
			+ '<ul class="easyui-tree" id="baseObj"></ul>'
			// + '<ul class="easyui-tree" id="systemObj">'
			// + '<li data-options="state:\'closed\',id:\'systemId\'">'
			// + '<span>系统配置</span>'
			// + '<ul>'
			// + '<li data-options="id:\'adminiId\'"><span>行政区划</span></li>'
			// + '<li  data-options="id:\'codeDicId\'"><span>代码字典</span></li>'
			// + '</ul>'
			// + '</li>'
			// + '</ul>'
			+ '</div>'
			+ '</div>'
			+ '<div data-options="region:\'center\',split:true" title="描述" style="width:60%;">'
			+ '<ul id="decriptionId" style="margin:0 10px;"></ul>' + '</div>' + '</div>' + '</div>'
			+ '</div>';

//	if ($('#expresswin7811q')[0] == null) {
	$('#expresswin7811q').dialog("open");
//	}
	if (innerContId) {
		$('#'+innerContId).append(html);
		$.parser.parse('#'+innerContId);
	} else {
		$('body').append(html);
		$.parser.parse('#expresswin7811qBox');
	}
	initCtrl(oldExpFla);

    // 关闭表达式设计器窗口
    var closeExpresswin=function() {
        $('#expresswin7811q').dialog('close');
    }

    // 获取UEditor的纯文本
	this.getEditorContentTxt=function() {
		var validResult=validExpress(false,"");
		if(validResult===true){
			var str = '' || expressCollect.editor.getValue();
			closeExpresswin();
			if(resultFun){
				resultFun(str);
			}
		}else if(validResult===false){
			return;
		}else{
			$.messager.confirm('提示', '表达式存在问题：'+validResult+'，是否继续保存', function(rs){
				if(rs){
                    var str = '' || expressCollect.editor.getValue();
                    closeExpresswin();
                    if(resultFun){
                        resultFun(str);
                    }
				}
			});
		}
	}
}

	//保存
	var saveEditorContentTxt = function(){
		var str = '' || expressCollect.editor.getValue();
		return str;
	}

// 延时执行的方法
function initCtrl(oldExpFla) {
	// var ctrl=$("#signButtonId>a");
	// if(!ctrl || ctrl.length==0){
	// window.setTimeout(bindBtnEvent,500);
	// return;
	// }
	
	expressCollect.editor = CodeMirror.fromTextArea(document.getElementById("expressionDesignerText"), { //script_once_code为你的textarea的ID号
		lineNumbers: true,//是否显示行号
		mode:"text/javascript",//默认脚本编码
		theme: 'ambiance'
	});
	expressCollect.editor.setSize('auto','100%');
	expressCollect.editor.setValue(oldExpFla);

	expToolbarClk = function(_type) {

		// 获取自定义字段方法
		var getField = function(_cb){
			var _formId = expressCollect.formId;
			
			var getObjForm = function(_id){
				var resultFun = function(formRs){
					var _arry = [];
					for(var i=0; i<formRs.length; i++){
						_arry.push(formRs[i].fname);
					}
					if(_cb){
						_cb(_arry);
					}
				}
				ShowFormSelector(_id, [], resultFun); // 打开表单选择
			};
			
			if(!_formId){
				var callback = function(rs){
					if(rs[0].id){
						getObjForm(rs[0].id);
					}
				};
				FormObjectSelector([], true, callback); // 打开关联表单选择
			}else{
				getObjForm(_formId);
			}
		};

		switch (_type) {
			case 'save':
				getEditorContentTxt();
				break;
			
			case 'debug':
				var sJid = $("#expresswin7811qBox-DgsJid").val();
				validExpress(true,sJid);
				break;

			case 'getVal':
				getField(function(_arry){
					for(var i=0,len=_arry.length; i<len; i++){
						setExpressionValue("var gV"+i+" = $.F.getFieldValue(\"" + _arry[i] + "\");");
					}
				});
				break;

			case 'setVal':
				getField(function(_arry){
					for(var i=0,len=_arry.length; i<len; i++){
						setExpressionValue("var sV"+i+" = $.F.setFieldValue(\"" + _arry[i] + "\");");
					}
				});
				break;
			
			case 'getSysField':
				createJobBaseDialog();
				break;

			case 'getCustomField':
				getField(function(_arry){setExpressionValue(_arry.join(","));});
				break;
			default:
				break;
		}
	};

	$('#signButtonId>a').hover(function() {
		if ($('body').find('.tip').length != 0) {
			$('body').find('.tip').remove();
		} else {
			var tagId = $(this).attr('id');
			for (var i = 0; i < expressCollect.oprBtn.length; i++) {
				if (expressCollect.oprBtn[i].key == tagId) {
					var txt = expressCollect.oprBtn[i].tip;
				}
			}

			var _top = $(this).offset().top;
			var _left = $(this).offset().left;

			var tip = "<div class='tip'>" + txt + "</div>";
			var zIndex = $(this).parentsUntil('div[class=window]')[4].style.zIndex;
			var _zIndex = zIndex == null ? 10000 : zIndex;
			if (txt != undefined) {
				$('body').append(tip);
				$('.tip').css({
					'top' : _top + 25,
					'left' : _left,
					'z-index' : _zIndex
				});
			}
		}
	}, function() {
		if ($('body').find('.tip').length != 0) {
			$('body').find('.tip').remove();
		} else {
			return false;
		}
	});

	$.ajax({
		url: "/public/js/expJson.json",
		type: "GET",
		success: function (rs) {
			$("#baseObj").tree({
				data: rs,
				state: closed,
				animate: false,
				onClick: function (node) { // 单击事件为各对象展示描述信息
					if (node.domType != "root"){ //根节点不展示信息
						$('#decriptionId').html("<li>" + node.decripHtml + "</li>");
					}
				},
				onDblClick: function (node) {
					if (node.domType != "root"){ //根节点的值不填入编辑框里
						setExpressionValue(node.id);
					}
				}
			});
		},
		error: function () {
		}
	});
	

//	$('#expresswin7811q').dialog("open");
}

// 格式化文本内容
function setExpressionValue(str) {
	expressCollect.editor.replaceSelection(str);
};

// 选择业务基表字段
function createJobBaseDialog() {
	var html = '<div id="jobBaseDialog" class="easyui-dialog">'
			+ '<div style="padding:10px 5px;border-bottom:1px solid #efefef;">'
			+ '<span>业务基表：</span>'
			+ '<select id="baseFormId" name="dept" style="width:83%;height:25px" onchange="showBaseForm()">'
			+ '<option>请选择...</option>'
			+ '<option value="job_base">job_base</option>'
			+ '<option value="act_ru_execution">act_ru_execution</option>'
			+ '<option value="act_ru_task">act_ru_task</option>' + '</select>'
			+ '</div>' + '<div id="baseListId" style="height:370px"></div>'
			+ '</div>';

	if ($('#jobBaseDialog')[0] == null) {
		$('body').append(html);
		console.log('%c ' + '不存在', 'background:orange');
		// $.parser.parse();
	}
	console.log('%c ' + '已经存在', 'background:orange');

	$('#jobBaseDialog').dialog({
		title : '选择业务基表字段',
		width : 400,
		height : 500,
		close : false,
		modal : true,
		buttons : [ {
			text : '确定',
			handler : function() {
				var basefname = $('#baseListId').datalist("getSelected");
				if (basefname) {
					setExpressionValue('"' + basefname.fname + '"');
				}
				$("#jobBaseDialog").dialog('close');
			}

		}, {
			text : '关闭',
			handler : function() {
				$('#jobBaseDialog').dialog('close');
			}
		} ]
	});
}
// 显示业务基表字段
function showBaseForm() {
	var formName = $('#baseFormId option:selected').text();
	$('#baseListId').datalist({
		url : '/formengineWebService/getFormDomains?forminforid=' + formName,
		valueField : 'rid',
		textField : 'ftitle',
		checkbox : true,
		lines : true,
	// onCheck:function(index,row){
	// setExpressionValue('"'+row.fname+'"');
	// }
	});
}

// 字符串替换
function ReplaceAll(str, sptr, sptr1) {
	while (str.indexOf(sptr) >= 0) {
		str = str.replace(sptr, sptr1);
	}
	return str;
}

// 验证功能
function validExpress(bDebug,sJid) {
	var exprStr = '' || expressCollect.editor.getValue();
	if (!exprStr){return true;}
	exprStr = $.trim(exprStr);
	var result = DebugExpr(expressCollect.bBackServer,exprStr,bDebug,sJid||'');
	if (result) {
		result = result.toString();
		if(result.indexOf("SyntaxError")>=0){
            createValidateTxt(false, '验证失败！'+result.message);
            return false;
		}
		return result.message;
	}
	else{
		createValidateTxt(true, '验证通过！');
		return true;
	}
	
	/*var exprStr = expressCollect.editor.getValue();
	exprStr = $.trim(exprStr);
	if (!exprStr)
		return true;
	// console.log(exprStr);
	if(expressCollect.bBackServer == 1){
		try {
			if (exprStr.charAt(0) == "#") {
				exprStr = exprStr.substring(1);
				var regx = new RegExp(exprStr);
				var testVal = "abc123!@#测试";
				var result = regx.test(testVal);
				if (!result) {
					createValidateTxt(false, '验证失败！');
					return false;
				}
				else{
					createValidateTxt(true, '验证通过！');
					return true;
				}
			} else {
				// 表达式（JavaScript内容）
				var result = eval(exprStr);
				createValidateTxt(true, '验证通过！');
				return true;
			}
		} catch (exception) {
			createValidateTxt(false, '验证失败：' + exception);
			return false;
		}
	}*/
}

// 定时关闭验证信息框
function createValidateTxt(isSuccess, validInfo) {
	var html = '';
	if (isSuccess) {
		$('#validateBox').css({
			display : 'block',
			background : '#f1f5fc'
		});
	} else {
		$('#validateBox').css({
			display : 'block',
			background : '#fcf1f1'
		});
	}
	$('#validateTxt').text(validInfo);
}

function closeValdateTxt() {
	$('#validateBox').css({
		display : 'none'
	});
}