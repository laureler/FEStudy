/*
组织结构选择器，依赖easyui框架实现
*/
//选择组织项：
//type：展示节点类型：0展示所有节点，1仅部门岗位节点，2部门岗位与人员节点（无角色），3仅角色节点，4仅部门（无岗位），5仅人员（无部门和岗位）
//retType：返回节点类型：0返回所有勾选上的节点，1仅返回勾选节点的最上级节点，2仅返回勾选节点中的人员节点(如果勾选了角色，这些角色节点也返回，需要调用者处理)
//  对于返回类型1，举例说明：
// []D0
//   [√]D1
//      [√]D11
//        [√]P1
//        []U1
//      []D12
//   [√]D2
//     [√]P2
//       []U2
//   []D3
// 这里D1，D11，P1，D2，P2有勾选，而P1的上级D11有勾选，同时D11的上级D1也有勾选；P2的上级D2有勾选，所以只返回D1，D2节点
//bMultiple：是否多选（在retType==2时，如果是单选，若选中非人员节点，提示不正确实；
//    如果是多选，若选中非叶子节点，返回此节点下的所有人员节点）
//initSel：需要初始选中的组织项ID数组
//resultFun：选择结果回调方法，原型：function (selNodes,treeCtrl,userData)
//    selNodes为所有选中组织项对象数组；每个元素包含属性：
//id,组织项ID；text,组织项名；attributes,扩展属性
//{mdistrict:所属行政区划,organCode:内部代码,organDescription:描述,organType:组织项类型(0部门1岗位2自定义角色3系统角色10人员),status:组织项状态(-1审核中0不可用1可用)}
//    treeCtrl为节点所在树控件；
//    userData需要传递的用户参数。
//userData：需要传递的参数，这个参数将会通过回调方法返回
//innerContId：组织结构树所在容器的id属性值（如果不为空，放置在调用者指定的容器中；如果为空，则弹出对话框）。
//Owidth: 容器宽度
//Oheigh:容器高度

var cacheType4aGwn='';
var _organParam;//内部参数，为了在调用GetSelectedOrgans时获得这些参数

function selectOrganization(type,retType,bMultiple,initSel,resultFun,userData,innerContId,Owidth,Oheigh)
{
	var _this=this;
	_organParam={retType:retType,bMultiple:bMultiple,userData:userData};
	var html='';
  (Owidth== null || Owidth ==undefined)?Owidth=330:Owidth=Owidth;
  (Oheigh== null || Oheigh ==undefined)?Oheigh=450:Oheigh=Oheigh;
	if(!innerContId){
		html+=	'<div id="organCont4aGwn">' +
					'<div id=\"organWin4aGwn\" class=\"easyui-dialog\" style=\"width:'+Owidth+'px;height:'+Oheigh+'px;\" title=\"组织结构信息\" data-options=\"buttons:\'#organWin-btns4aGwn\',closed:false,modal:true\">' ;
	}else{
		html+=	'<div id=\"organWin4aGwn\" style=\"width:'+Owidth+'px;height:'+Oheigh+'px\">';
	}
		html += '<div class="easyui-layout" data-options="border:false,fit:true," style="width:100%;height:100%;">' +
	    '<div style="">' +
	    '<input id="findCTree7811q" class="easyui-searchbox" prompt="查找数据" style="width:100%;height:30px;" data-options="searcher:searchOrganTT4aGwnNode"/>' +
	    '</div>' +
      '<div style="top:30px;bottom:0;width:100%;overflow:auto;position:absolute;">' +
      	'<ul id="organTT4aGwn" style="overflow:hidden;"></ul>' +
      '</div>' +
		'</div>';
	
	if(!innerContId){
		html +=	'<div id="organWin-btns4aGwn" style="text-align:center;line-height:30px;height:30px;">'+
				// '<a id="btnClear4aGwn" class="easyui-linkbutton" style="display:none;" data-options="iconCls:\'icon-ibase_quanclear\',plain:true" onclick="clearSelectTT()">清除勾选</a>&nbsp;' +
				// '<span style="margin-left:8px;">&nbsp;</span>'+
				'<a class="easyui-linkbutton" data-options="iconCls:\'icon-ok\'" onclick="submitOrganTT()">确定</a>&nbsp;' +
				// '<span style="margin-left:30px;">&nbsp;</span>'+
				'<a class="easyui-linkbutton" data-options="iconCls:\'icon-cancel\'" onclick="cancelOrganTT()" >取消</a>' +
			'</div>'+
		'</div></div>';
	}else{
		html += '</div>';
	}
	
	var stt=type+""+bMultiple+""+innerContId;
	if(cacheType4aGwn!=stt || $('#organWin4aGwn').length==0)
	{
		cacheType4aGwn=stt;

		if($('#organCont4aGwn').length>0){
			$('#organWin4aGwn').window('destroy');
			$("#organCont4aGwn").remove();
		}else if($('#organWin4aGwn').length>0){
			$('#organWin4aGwn').remove();
		}
		if(!innerContId){
			$('body').append(html);
			$.parser.parse('#organCont4aGwn');
		}else{
			$('#'+innerContId).html(html);
			$.parser.parse('#'+innerContId);
		}
	
		var _url='/mainWeb/system/getOrganTree?valid=1&type='+type;
//		if(parent.window.ctx=='')
//		var _url=parent.window.ctx+'/system/getOrganTree?type='+type;
		
		//返回人员节点时，级联勾选
		var isCascadeCheck= retType==2;
		
		$.ajax({
			url:_url,
			type:"POST",
			dataType:"json",
			success:function(data){
				$('#organTT4aGwn').tree({
					method:'get',
					animate:false,
					checkbox:bMultiple,
	    		onDblClick:function(node){
	    			if(bMultiple){
	    				if(node.checked)
	    					$('#organTT4aGwn').tree("uncheck",node.target);
	    				else
	    					$('#organTT4aGwn').tree("check",node.target);
	    			}else{
	    				_this.submitOrganTT();
	    			}
	    		},
					cascadeCheck:isCascadeCheck,
					onCheck:organCheckRoot4aGwn,
					data:data
				});
				if(bMultiple)
					$("#btnClear4aGwn").css("display","");
				initSelNode4aGwn(initSel,bMultiple);
			},
			error:function(xhr){
				$.messager.alert('提示','组织结构数据获取失败');
			}
		});
	}else{
		if(!innerContId){
			$('#organWin4aGwn').window("open");
		}
		
		initSelNode4aGwn(initSel,bMultiple);
	}
	//------------------------
	
	this.submitOrganTT=function(){
		var nodes=GetSelectedOrgans(true);
		if(!nodes) return;
		
		var treeCtrl=$('#organTT4aGwn');
		
		if(!innerContId){
			$('#organWin4aGwn').dialog('close');
		}

		if(resultFun){
			resultFun(nodes,treeCtrl,userData);
		}
	}
	
	this.cancelOrganTT=function(){
		$('#organWin4aGwn').dialog('close');
	}
	this.clearSelectTT=function(){
		var treeCtrl=$('#organTT4aGwn');
		var chkNodes=treeCtrl.tree('getChecked');
		for(var inx=0;inx<chkNodes.length;++inx){
			treeCtrl.tree('uncheck',chkNodes[inx].target);
		}
	}
}

//提供给外部调用，因此不加随机后缀
//返回空表示选择不合法
//参数bData指出是否仅返回选择节点信息：
// true，返回选中节点数据
// false，返回{'nodes':nodes,'treeCtrl':treeCtrl,'userData':userData};
//bUnprompt指出是否不提示：
// true，未选择内容，不提示用户直接返回null
// false，未选择有效内容，提示用户（并返回null）
function GetSelectedOrgans(bData,bUnprompt)
{
	var treeCtrl=$('#organTT4aGwn');
	var nodes=[];
	if(_organParam.bMultiple){
		var chkNodes=treeCtrl.tree('getChecked');
		var idExist=[];
		for(var inx=0;inx<chkNodes.length;++inx){
			if(IsValidId(chkNodes[inx].id) && idExist.indexOf(chkNodes[inx].id)<0){
				idExist.push(chkNodes[inx].id);
				nodes.push(chkNodes[inx]);
			}
		}
	}
	else{
		var selNode=treeCtrl.tree('getSelected');
		if(selNode!=null && IsValidId(selNode.id))
			nodes.push(selNode);
	}
	if(nodes.length==0){
		if(!bUnprompt)
			$.messager.alert('提示','请选择需要的组织项!');
		return null;
	}
	
	var validNodes=[];
	if(_organParam.retType==0){//所有勾选项都返回，不管是否父级节点是否有勾选
		validNodes=nodes;
	}else if(_organParam.retType==1){//只返回最顶层节点勾选的项（同一层次下的父节点/子节点都有勾选，只返回父节点）
		for(var inx=0;inx<nodes.length;++inx){
			if(!IsParentCheck(treeCtrl,nodes[inx]))//定义在ibasesys.js
				validNodes.push(nodes[inx]);
		}
	}else if(_organParam.retType==2){//只返回勾选的用户节点
		for(var inx=0;inx<nodes.length;++inx){
			if(nodes[inx].attributes.organType == 10)
				validNodes.push(nodes[inx]);
			else if(nodes[inx].attributes.organType == 2 || nodes[inx].attributes.organType == 3){
				//如果是角色，因为展开成人员效率会较低，这里直接返回角色项（需要调用者处理）
				validNodes.push(nodes[inx]);
			}
		}
	}
	
	if(validNodes.length==0){
		if(!bUnprompt)
			$.messager.alert('提示','请选择正确的组织项!');
		return null;
	}
	if(bData)
		return validNodes;
	else
		return {nodes:validNodes,treeCtrl:treeCtrl,userData:_organParam.userData};
}

//初始选中节点
//bCheck指出是勾选(true)还是高亮选(false)，如果高亮选，只选中第一项
function initSelNode4aGwn(organTTId,bCheck)
{
	if(bCheck){
		//清除原有的勾选
		var nodes=$('#organTT4aGwn').tree('getChecked');
		if(nodes.length>0){
			for(var inx=0;inx<nodes.length;++inx){
				$('#organTT4aGwn').tree('uncheck',nodes[inx].target);
			}
		}
	}else{
		var node=$('#organTT4aGwn').tree('getSelected');
		if(node != null){
			$(node.target).removeClass('tree-node-selected');
		}
	}
	
	if(!organTTId || organTTId.length==0)
		return;
	
	for(var inx=0;inx<organTTId.length;inx++){
		var node=$('#organTT4aGwn').tree('find',organTTId[inx]);
		if(node !=null){
			if(bCheck){
				$('#organTT4aGwn').tree('check',node.target);
			}
			else{
				selectNode($('#organTT4aGwn'),node);//定义在ibasesys.js
				break;
			}
		}
	}
}

function organCheckRoot4aGwn(node,checked)
{
	if(!node || IsValidId(node.id)) return;
	var treeCtrl=$('#organTT4aGwn');
	var childNode=GetDirectChildren(treeCtrl,node);
	for(var inx=0;inx<childNode.length;++inx){
		treeCtrl.tree(checked?"check":"uncheck",childNode[inx].target);
	}
	//将无效节点勾选清除(为了防止用户误以为没有勾上，不清除勾选)
	//treeCtrl.tree("uncheck",node.target);
}

//树内项目搜索----------------------
function searchOrganTT4aGwnNode(val) {
	console.log(val);
	// searchTreeNode 依赖于/public/js/ibasesys.js 里的通用Tree控件方法
	searchTreeNode($('#organTT4aGwn'),val);
}

