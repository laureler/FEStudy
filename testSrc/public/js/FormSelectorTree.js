/**
 * 目前只适用于表单标签页选择
 * 1、列表信息：表单标签页
 * 2、formid：需要选择控件的表单ID
 * 		initFields：初始选择的表单控件ID数组
 * 		itype:选择控件类型（2=标签页，1=表单控件(暂不支持)，0=所有控件）
 * 		innerContId：要内嵌界面的容器ID。如果为空，则以弹出框显示；否则将界面显示在容器中
 * 		resultFun：选择结果回调方法，原型：function (resultdata)
 * 	返回resultdata是对象数组，每个元素包含属性：id表单唯一的Id, title表单名称
 * 3、支持对表单名称进行查询
 * 4、singleParam={isSingle:true, isLevelSingle:true, }。 
 * 		（isSingle）：是否单选，true为单选，false为多选，默认false
 * 		（isLevelSingle）：是否为同级单选，true为单选，false为多选，默认false
*/

//上次用于选择控件的表单ID，如果当前表单ID与上次相同，则不会重新初始化，提升性能。
var cacheFormid7lseoe='';

// 表单模板列表接口
var getAllFormInfosUrl7lseoe='/formengineWebService/getFormControlList?type={:type}&forminforid=';

function FormSelectorTree(formid,initFields,itype,resultFun,innerContId,singleParam){
	var html="";
	var sSuffix="标签页";
	if(itype!=2){
		throw ("仅支持表单标签页的选择");
		return;
	}
	
	// 赋默认初始值
	singleParam?'':singleParam = {};
	singleParam.isSingle?'':singleParam.isSingle=false;
	singleParam.isLevelSingle?'':singleParam.isLevelSingle=false;
	
	if(!innerContId){
		html += '<div id="commonFormSelector7lseoeBox">'+
		'<div id="commonFormSelector7lseoe" class="easyui-window" title="请选择表单'+sSuffix+
		'" data-options="collapsible:false,modal:true,maximizable:false,minimizable:false,footer:\'#dlg-cfs-footer-btns7lseoe\'"'+
		' style="width:350px;height:450px;">';
	}else{
		html += '<div id="commonFormSelector7lseoe" style="width:100%;height:100%;">';
	}
	html += '<div style="position:relative;overflow:hidden;height:100%;">' +
			'<div style="margin:0 -1px;">' +
				'<input class="easyui-searchbox" data-options="prompt:\'输入名称查询\',searcher:SearchKongjian7lseoe" style="width:100%;height:30px;" />' +
			'</div>' +
			'<div style="position:absolute;bottom:0;top:30px;width:100%;overflow-x:hidden;overflow-y:auto;">' +
				'<ul id="commSelectorListUl7lseoe" class="easyui-tree">' +
				'</ul>' +
			'</div>' +
		'</div>';
	if(!innerContId){
		html += '<div id="dlg-cfs-footer-btns7lseoe" style="line-height:35px;height:35px;text-align:center;">' +
					'<a class="easyui-linkbutton" data-options="iconCls:\'icon-ok\'" onclick="submitFormSelector()">确定</a>&nbsp;&nbsp;' +
					'<span style="margin-left:30px;">&nbsp;</span>'+
					'<a class="easyui-linkbutton" data-options="iconCls:\'icon-cancel\'" onclick="$(\'#commonFormSelector7lseoe\').window(\'close\')">取消</a>' +
				'</div></div></div>';
	}else{
		html +='</div>';
	}
	
	var cacheItem=formid+""+innerContId;
	if(cacheFormid7lseoe!=cacheItem || $('#commonFormSelector7lseoe').length==0)
	{
		cacheFormid7lseoe=cacheItem;

		if($('#commonFormSelector7lseoeBox').length>0){
			$('#commonFormSelector7lseoe').window('destroy');
			$("#commonFormSelector7lseoeBox").remove();
		}else if($('#commonFormSelector7lseoe').length>0){
			$('#commonFormSelector7lseoe').remove();
		}
		if(!innerContId){
			$('body').append(html);
			$.parser.parse('#commonFormSelector7lseoeBox');
		}else{
			$('#'+innerContId).html(html);
			$.parser.parse('#'+innerContId);
		}

		var formUrl=getAllFormInfosUrl7lseoe.replace("{:type}",itype)+formid
		$.ajax({
			url:formUrl,
			type:'GET',
			async:false,
			dataType:'json',
			success:function(data){
//				data = '[{"id":"#page","text":"标签页","iconCls":"icon-blank","checked":false,"state":null,"parentId":"f6c96951-5d72-4f00-8d83-bee102cd5fbb","sort":1,"attributes":{"ftype":""},"children":[{"id":"4EA00F0B38A004D5","text":"4EA00F0B38A004D5","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":0,"attributes":{"ftype":"page"},"children":[{"id":"4EA00F0B38A004D5#宗地信息表","text":"宗地信息表","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":0,"attributes":{"ftype":"pageItem"},"children":[],"load":false},{"id":"4EA00F0B38A004D5#宗地图","text":"宗地图","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":1,"attributes":{"ftype":"pageItem"},"children":[],"load":false}],"load":false},{"id":"1508203952223F5C3","text":"1508203952223F5C3","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":1,"attributes":{"ftype":"page"},"children":[{"id":"1508203952223F5C3#窗口收件","text":"窗口收件","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":0,"attributes":{"ftype":"pageItem"},"children":[],"load":false},{"id":"1508203952223F5C3#权利登记","text":"权利登记","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":1,"attributes":{"ftype":"pageItem"},"children":[],"load":false},{"id":"1508203952223F5C3#审批表","text":"审批表","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":2,"attributes":{"ftype":"pageItem"},"children":[],"load":false},{"id":"1508203952223F5C3#缴费通知书","text":"缴费通知书","iconCls":"icon-blank","checked":false,"state":null,"parentId":"","sort":3,"attributes":{"ftype":"pageItem"},"children":[],"load":false}],"load":false}],"load":false}]';
//				data = JSON.parse(data);
				$('#commSelectorListUl7lseoe').tree({
					data:data,
					animate:true,
					checkbox:function(node){return (node.attributes.ftype && node.attributes.ftype!="page");},
					cascadeCheck:false,
					formatter:function(node){
						if(!node.attributes.ftype || node.attributes.ftype.indexOf("page")==0)
							return node.text;
						return node.text+"-<span style='color:red;'>"+node.id+"</span>("+node.attributes.ftype+")";
					},
					onLoadSuccess:function(node,data){
						$('#commSelectorListUl7lseoe').on('mouseenter','span.tree-title',function(){
//							console.log($(this).text());
							var curZindex=$(this).parents('.window').css('z-index')+100;
							var itemTxt=$(this).text();
							var itemWidth=$(this).width()+4; // 4像素是padding的左右值各2
							var itemLeft=$(this).position().left; // node.text文本相对于父元素偏移多少
							var cTreeWidth=$('#commSelectorListUl7lseoe').width();
							var diffWidth=Math.abs(itemWidth+itemLeft-cTreeWidth);
							if((itemWidth+itemLeft)>cTreeWidth){
								if($('body').find('.tip').length!=0){
						            $('body').find('.tip').remove();
						        }else{
						        	var html='<div class="tip">'+itemTxt+'</div>';
									$('body').append(html);
									$('.tip').css({'top':$(this).offset().top+15,'left':$(this).offset().left-diffWidth-10,'z-index':curZindex});
						        }						
							}
						});
						
						$('#commSelectorListUl7lseoe').on('mouseleave','span.tree-title',function(){
							if($('body').find('.tip').length!=0){
						        $('body').find('.tip').remove();
						    }
						});
					},
					onBeforeCheck:function(node, checked){
						var _tree = $("#commSelectorListUl7lseoe");
						var checkedNode = [];
						
						if (singleParam.isSingle) {
							checkedNode = _tree.tree("getChecked");
						}
						else if (singleParam.isLevelSingle){
							var _p = _tree.tree("getParent",node.target);
							checkedNode = _tree.tree("getChildren",_p.target);
						}
						if (checkedNode.length > 0) {
							for (var i = 0; i < checkedNode.length; i++) {
								if(checkedNode[i].checked){
									checkedNode[i].checkState="";
									var childrens = checkedNode[i].target.children;
									for (var j = 0; j < childrens.length; j++) {
										if (childrens[j].className == "tree-checkbox tree-checkbox1") {
											childrens[j].className = "tree-checkbox tree-checkbox0";
										}
									}
								}
							}
						}
					}
				});
				
			},
			error:function(xhr,msg,stat){
				showAjaxError(xhr,msg,stat,"获取数据失败");
			}
		});
	}else{
		if(!innerContId){
			$('#commonFormSelector7lseoe').window("open");
		}
	}
	
	treeUncheckedAll7lseoe();
	// 加载初始数据，利用on('load')使iframe加载完成后就执行的方法
	if(initFields){		
		for(var i=0;i<initFields.length;i++){
			// 判断初始值在列表中是否存在
			var itemNode=$('#commSelectorListUl7lseoe').tree('find',initFields[i].replace('.','-'));
			if(!itemNode){
				console.log('不存在节点');
			}else{
				$('#commSelectorListUl7lseoe').tree('check',itemNode.target);
			}
		}
	}
	
	/**
	 * 提交表单选择器所选择的选项
	 */
	this.submitFormSelector=function(){
		var arrdata=GetSelectedFormFields4Tree();
		
		if(!innerContId){
			$('#commonFormSelector7lseoe').window('close');
		}		
		
		if(resultFun){
			resultFun(arrdata);
		}
	}
}

//提供给外部调用，因此不加随机后缀
function GetSelectedFormFields4Tree()
{
	var arrdata=[];

	var _arrdata=$('#commSelectorListUl7lseoe').tree('getChecked');
	for(var i=0;i<_arrdata.length;i++){
		var item={};
		item.id=_arrdata[i].id;
		item.title=_arrdata[i].text;
		arrdata.push(item);
	}
	return arrdata;
}

/**
 * 表单选择器的列表搜索事件
 */
function SearchKongjian7lseoe(value){
	// searchTreeNode 依赖于/public/js/ibasesys.js 里的通用Tree控件方法
	searchTreeNode($('#commSelectorListUl7lseoe'),value,true);
}

/*
 * 清除EasyUI-Tree所有的选择
 */
function treeUncheckedAll7lseoe(){
	var nodes=$('#commSelectorListUl7lseoe').tree('getChecked');
	for(var i=0;i<nodes.length;i++){
		$('#commSelectorListUl7lseoe').tree('uncheck',nodes[i].target);
	}
}
