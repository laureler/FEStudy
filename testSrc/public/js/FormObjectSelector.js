/**
 * 通用的表单选择
 * 1、列表信息，显示表单名称的Title,版本号Vernum
 * 2、isSingle是单选(true)或多选(false)
 * 		initForms：初始选择的表单ID数组
 * 		innerContId：要内嵌界面的容器ID。如果为空，则以弹出框显示；否则将界面显示在容器中
 * 		resultFun：选择结果回调方法，原型：function (resultdata)
 * 	返回resultdata是对象数组，每个元素包含属性：id表单唯一的Id, title表单名称
 * 3、支持对表单名称进行查询
*/

//上次用于选择控件的表单ID，如果当前表单ID与上次相同，则不会重新初始化，提升性能。
var cacheFormid9lse4='';

// 表单模板列表接口
var getAllFormInfosUrl9lse4='/formengineWebService/getAllFormTree';

function FormObjectSelector(initForms,isSingle,resultFun,innerContId)
{
	var _this=this;
	
	this.initItem=function(initForms)
	{
		var listCtrl=$('#commSelectorListUl9lse4');
		var nodes=listCtrl.tree('getChecked');
		//清除上一次所有勾选的项
		for(var i=0;i<nodes.length;i++)
		{
			listCtrl.tree('uncheck',nodes[i].target);
		}

		if(initForms){
			//将需要勾选的项设为勾选状态
			for(var i=0;i<initForms.length;i++){
				// 判断初始值在列表中是否存在
				var tarNode=listCtrl.tree('find',initForms[i]);
				if(tarNode){
					if(isSingle){
						listCtrl.tree('select',tarNode.target);
						break;
					}
					else
						listCtrl.tree('check',tarNode.target);
					
				}
			}
		}
	}

	var html="";
	if(!innerContId){
		html += '<div id="commonFormSelector9lse4Box"><div id="commonFormSelector9lse4" class="easyui-window" title="请选择表单"'+
			' data-options="collapsible:false,modal:true,maximizable:false,minimizable:false,footer:\'#dlg-cfs-footer-btns9lse4\'"'+
			' style="width:350px;height:450px;">';
	}else{
		html += '<div id="commonFormSelector9lse4" style="width:100%;height:100%;">';
	}
	html += '<div style="position:relative;overflow:hidden;height:100%;">' +
				'<div style="margin:0 -1px;">' +
					'<input class="easyui-searchbox" data-options="prompt:\'输入表单名称查询\',searcher:SearchFormTitle9lse4"'+
					' style="width:100%;height:30px;" />' +
				'</div>' +
				'<div style="position:absolute;bottom:0;top:30px;width:100%;overflow-x:hidden;overflow-y:auto;">' +
					'<ul id="commSelectorListUl9lse4" class="easyui-tree">' +
					'</ul>' +
				'</div>' +
			'</div>' ;
	if(!innerContId){
		html += '<div id="dlg-cfs-footer-btns9lse4" style="line-height:35px;height:35px;text-align:center;">' +
					'<a class="easyui-linkbutton" data-options="iconCls:\'icon-ok\'" onclick="submitFormSelector()">确定</a>' +
					'<span style="margin-left:30px;">&nbsp;</span>'+
					'<a class="easyui-linkbutton" data-options="iconCls:\'icon-cancel\'" onclick="$(\'#commonFormSelector9lse4\').window(\'close\')">取消</a>' +
				'</div></div></div>';
	}else{
		html +='</div>';
	}

	var cacheItem=isSingle+""+innerContId;
	if(cacheFormid9lse4!=cacheItem || $('#commonFormSelector9lse4').length==0)
	{
		cacheFormid9lse4=cacheItem;

		if($('#commonFormSelector9lse4Box').length>0){
			$('#commonFormSelector9lse4').window('destroy');
			$("#commonFormSelector9lse4Box").remove();
		}else if($('#commonFormSelector9lse4').length>0){
			$('#commonFormSelector9lse4').remove();
		}
		if(!innerContId){
			$('body').append(html);
			$.parser.parse('#commonFormSelector9lse4Box');
		}else{
			$('#'+innerContId).html(html);
			$.parser.parse('#'+innerContId);
		}

		//$('#commSelectorListUl9lse4').empty();
		$.ajax({
			url:getAllFormInfosUrl9lse4,
			type:'GET',
			async:false,
			dataType:'json',
			success:function(data){
//				var items=[];
//				for(var i=1;i<data.length;i++){
//					var obj=new Object();
//					obj.id=data[i].rid;
//					obj.text=data[i].title+"(V"+data[i].vernum+")";
//					items.push(obj);
//				}

				$('#commSelectorListUl9lse4').tree({
					data:data,
					checkbox:!isSingle,
					cascadeCheck:false,
	    		onDblClick:function(node){
	    			if(!isSingle){
	    				if(node.checked)
	    					$('#commSelectorListUl9lse4').tree("uncheck",node.target);
	    				else
	    					$('#commSelectorListUl9lse4').tree("check",node.target);
	    			}else{
	    				_this.submitFormSelector();
	    			}
	    		},
					onLoadSuccess : function(node, data) {$('#commSelectorListUl9lse4').tree("collapseAll");}
				});
				
			},
			error:function(){
				showError("获取数据失败");
			}
		});
	}else{
		if(!innerContId){
			$('#commonFormSelector9lse4').window("open");
		}
	}
	
	this.initItem(initForms);
	
	/**
	 * 提交表单选择器所选择的选项
	 */
	this.submitFormSelector=function(){
		var arrdata=GetSelectedForms();
		
		if(!innerContId){
			$('#commonFormSelector9lse4').window('close');
		}
		
		if(resultFun){
			resultFun(arrdata);
		}
	}
}

//提供给外部调用，因此不加随机后缀
function GetSelectedForms()
{
	var arrdata=[];
	var opt=$('#commSelectorListUl9lse4').tree('options');
	var nodes;
	if(opt.checkbox)
		nodes=$('#commSelectorListUl9lse4').tree('getChecked');
	else{
		nodes=[];
		var sel=$('#commSelectorListUl9lse4').tree('getSelected');
		if(sel) nodes.push(sel);
	}
	for(var i=0;i<nodes.length;i++){
		var obj=new Object();
		obj.id=nodes[i].id
		obj.title=nodes[i].text;
		arrdata.push(obj);
	}
	
	return arrdata;
}

/*
 * 文本框搜索事件
 * findCount统计搜索数量
 * searchTxt存储searcher搜索的值
 */
var SearchFormTitle9lse4=function(value){
	// searchTreeNode 依赖于/public/js/ibasesys.js 里的通用Tree控件方法
	searchTreeNode($('#commSelectorListUl9lse4'),value,true);
}
