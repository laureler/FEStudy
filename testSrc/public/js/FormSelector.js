/**
 * 表单选择器的方法
*/

//获取表单html内容的服务地址
var renderFormUrl='/formengineWebService/renderSelectForm?formid=';
//获取表单定义信息，目的是为了获取标签页的
//var getFormInfoUrl='/formengineWebService/getFormInfoByID?rid=';
//获取表单内的控件定义信息(包括子表单内的控件、标签页信息，2=标签页，1=表单控件，0=所有控件）
var getFormDomainUrl='/formengineWebService/getFormControlList?type=1&forminforid=';

//上次用于选择控件的表单ID，如果当前表单ID与上次相同，则不会重新初始化，提升性能。
var cacheFormid7811q='';

//显示选择表单控件界面
//formid：要选择的表单ID
//initFields：初始选择的控件ID数组
//innerContId：要内嵌界面的容器ID。如果为空，则以弹出框显示；否则将界面显示在容器
//resultFun：选择结果回调方法，原型：function (resultdata) 
// 返回结果（resultdata）是选择字段对象的数组，每个元素包含属性：
//ftitle,字段标题名称；fname,字段唯一名（或控件标识）；ftype,控件类型（比如：textbox。不是值类型）
function ShowFormSelector(formid,initFields,resultFun,innerContId)
{
	var _this=this;
	if(!formid){
		showError("表单ID不能为空");
		return;
	}

	var html='';
	if(!innerContId){
		html += '<div id="formSelector7811qBox">'+
			'<div id="formSelector7811q" class="easyui-window" title="表单选择器" data-options="collapsible:false,minimizable:false,modal:true,maximized:true,footer:\'#dlg-footer-btns7811q\'" style="width:870px;height:600px;">';
	}else{
		html += '<div id="formSelector7811q" style="width:100%;height:100%;">';
	}
	html += '<div class="easyui-layout" data-options="fit:true,border:\'none\'" style="height:100%;">' +
            '<div data-options="region:\'center\'" style="width:400px;height:450px;overflow:hidden;position:relative;">' +
              '<div class="shadeMask" style="display:block;background-color:#E4F8E8">'+
            	'<div class="loadingTxt">正在初始化表单...</div>'+
              '</div>'+
            	'<div class="curFormInfoHeadBox">' +
              	'<ul id="curFormInfoHead7811q" class="curFormInfoHead">' +
              		'<li fname="" class="fs_item sel" onclick="renderIframe7811q(this)">主表单</li>' +
              	'</ul>' +
            	'</div>' +
            	'<div id="curFormInfoCont7811q" class="iframeBox">' +
              	'<iframe id="mainifr7811q" class="formselector-iframe" name="">' +
                '</iframe>' +
            	'</div>' +
            '</div>' +
            '<div id="fselector-list" title="所有控件" data-options="region:\'east\',split:true,width:350" style="min-width:262px;height:100%;">' +
                '<div style="margin-right:-1px;">' +
                '<input class="easyui-searchbox" data-options="prompt:\'查找控件\',searcher:SearchKongjian7811q" style="width:100%;height:30px;" />' +
                '</div>' +
        				'<div style="position:absolute;bottom:0;top:58px;width:100%;overflow-x:visible;overflow-y:auto;">' +
      					'<ul id="formselectorul7811q" class="easyui-tree">' +
      					'</ul>' +
      					'</div>' +
            '</div>' +
       '</div>';
	if(!innerContId){
		html += '<div id="dlg-footer-btns7811q" style="line-height:35px;height:35px;text-align:center;">' +
					//'<a class="easyui-linkbutton" data-options="iconCls:\'icon-ibase_quanxuan\',plain:true" onclick="formFieldSelectMode(0)">全部勾选</a>&nbsp;' +
					'<a class="easyui-linkbutton" style="margin:0 10px;" data-options="iconCls:\'icon-ibase_quanclear\',plain:true" onclick="formFieldSelectMode(1)">清除勾选</a>&nbsp;' +
					'<a class="easyui-linkbutton" style="margin:0 30px;" data-options="iconCls:\'icon-ok\'" onclick="submitFormSelector()">确&nbsp;&nbsp;定</a>&nbsp;' +
					'<a class="easyui-linkbutton" data-options="iconCls:\'icon-cancel\'" onclick="$(\'#formSelector7811q\').window(\'close\')">取&nbsp;&nbsp;消</a>' +
				'</div>'+
			'</div></div>';
	}else{
		html +='</div>';
	}
	
	var cacheItem=formid+""+innerContId;
	if(cacheFormid7811q!=cacheItem || $('#formSelector7811q').length==0)
	{
		cacheFormid7811q=cacheItem;

		if($('#formSelector7811qBox').length>0){
			$('#formSelector7811q').window('destroy');
			$("#formSelector7811qBox").remove();
		}else if($('#formSelector7811q').length>0){
			$('#formSelector7811q').remove();
		}
		
		if(!innerContId){
			$('body').append(html);
			$.parser.parse('#formSelector7811qBox');
		}else{
			$('#'+innerContId).html(html);
			$.parser.parse('#'+innerContId);
		}

		$.ajax({
			url:getFormDomainUrl+formid,  //获取表单内的控件定义信息
			type:'GET',
			async:false,
			dataType:'json',
			success:function(data){
				$('#formselectorul7811q').tree({
					data:data,
					animate:true,
					checkbox:function(node){return (node.id && node.id.charAt(0)!='#');},
					cascadeCheck:false,
					formatter:function(node){
						if(!node.attributes.ftype) // || node.attributes.ftype.indexOf("page")==0 标签页只显示标题
							return node.text;
						var ftext=node.text;
						//if(ftext.length>21) ftext=ftext.substr(0,20)+"..";
						if(ftext.indexOf("<")>=0)
							ftext=htmlEncode(ftext);
						var ctrlId=node.id;
						var iPos=ctrlId.lastIndexOf(">");
						if(iPos>=0)
							ctrlId=ctrlId.substr(iPos+1);
						return ftext+"-<span style='color:red;'>"+ctrlId+"</span>("+node.attributes.ftype+")";
					},
					onCheck:function(node){
						_this.onCheckNode(node);
					},
					onLoadSuccess:function(node,data){
						//添加提示框Tooltip功能
						$('#formselectorul7811q').on('mouseenter','span.tree-title',function(){
							var curZindex=$(this).parents('.window').css('z-index')+100;
							var itemTxt=$(this).text();
							var itemWidth=$(this).width()+4; // 4像素是padding的左右值各2
							var itemLeft=$(this).position().left; // node.text文本相对于父元素偏移多少
							var cTreeWidth=$('#formselectorul7811q').width();
							if((itemWidth+itemLeft)>cTreeWidth){
								if($('body').find('.tip').length==0){
								//	$('body').find('.tip').remove();
								//}else{
									var html='<div class="tip">'+itemTxt+'</div>';
									$('body').append(html);
									$('.tip').css({'top':$(this).offset().top+20,'left':$(this).offset().left-100,'z-index':curZindex});
								}
							}
						});
						
						$('#formselectorul7811q').on('mouseleave','span.tree-title',function(){
							if($('body').find('.tip').length!=0){
								$('body').find('.tip').remove();
							}
						});
					},
				});
			},
			error:function(xhr,stat,exmsg){
				console.log('获取服务器数据失败！');
			}
		});
		
		$('#mainifr7811q').attr('src',renderFormUrl+formid);
		bindSFormCont7811q(initFields,"mainifr7811q",'');

	}else{//同一个表单，只需初始化选中字段即可
		if(!innerContId){
			$('#formSelector7811q').window("open");
		}
		resetSelected7811q(initFields,"mainifr7811q");
	}
	
	this.onCheckNode=function(node){
		//勾选树下的控件时，将左边表单控件高亮选中
		var nodeId=node.id;
		var iPos=nodeId.lastIndexOf(">");
		var parentFname="";
		if(iPos>=0){
			parentFname=nodeId.substr(0,iPos);
			nodeId=nodeId.substr(iPos+1);
		}
		var iframeId="mainifr7811q";
		if(parentFname) iframeId=toIdEncode(parentFname)+"7811q";

		var bChecked=node.checked;
		var targetId=null;
		var iframeObj=$('#'+iframeId);
		if(iframeObj.length>0)
			targetId=iframeObj.contents().find('div[cnode=shell]').filter('div[fname="'+nodeId+'"]').eq(0);
		var maskdiv="<div class='maskbox'></div>";
		if(targetId && targetId.length>0){
			if(bChecked){
				targetId.find('.maskbox').css('opacity','0.8');
				targetId.attr('isSelect','select');
			}else{
				targetId.find('.maskbox').css('opacity','0.1');
				targetId.attr('isSelect','noselect');
			}
		}
	}

	/**
	 * 提交表单选择器所选择的选项
	 */
	this.submitFormSelector=function(){
		var arrdata=GetSelectedFormFields();
		
		if(!innerContId){
			$('#formSelector7811q').window('close');
		}
		
		if(resultFun){
			resultFun(arrdata);
		}
	}
}

/**
 * 表单选择器的列表搜索事件
 */
function SearchKongjian7811q(value){
	// searchTreeNode 依赖于/public/js/ibasesys.js 里的通用Tree控件方法
	searchTreeNode($('#formselectorul7811q'),value,true);
}

// 创建子表单
function FSelectorOpenSubForm7811q(formId,fullName,event){
	if(formId){
		var curIframe=$('#curFormInfoCont7811q').children('iframe[name="'+fullName+'"]');
		if(curIframe.length==0){
			var fname2Id=toIdEncode(fullName)+'7811q';
			var renderSubFormUrl='/formengineWebService/renderSelectForm?formid='+formId;
			var html='<iframe id="'+fname2Id+'" class="formselector-iframe" name="'+fullName+'" src="'+renderSubFormUrl+'"></iframe>';
			
			var formTitle=getSubFormTitle7811q(fullName);
			
			var title='<li fname="'+fullName+'" class="fs_item sel" onclick="renderIframe7811q(this)">'+formTitle
				+'<div class="icon-ibase-closeX" onclick="closeSubForm7811q(this)"></div></li>';
			
			$('#curFormInfoCont7811q').children().css({'display':'none'}).end().append(html);
			$('#curFormInfoHead7811q').children().removeClass('sel').end().append(title);
			
			// 从列表控件中读取选中控件初始字段的数组
			var _initFields=[];
			var arr=GetSelectedFormFields();
			if(arr){
				for(var i=0;i<arr.length;i++){
					_initFields.push(arr[i].fname);
				}
			}
			// 对新打开的子表单进行控件绑定
			bindSFormCont7811q(_initFields,fname2Id,fullName);
			
		}else{
			var ele=$('#curFormInfoHead7811q').children().filter('li[fname="'+fullName+'"]');
			renderIframe7811q(ele);
		}
		
		// 计算head里所含的TabHead的数量，来解决水平滚动条的问题
		var countwidth=0;
		$('#curFormInfoHead7811q').children().each(function(idx,tag){
			countwidth=countwidth+$(tag).width()+22;
		});
		$('#curFormInfoHead7811q').width(countwidth);
		
		var _height=$('.curFormInfoHeadBox').height()+2;
		$('#curFormInfoCont7811q').css({top:_height+'px'});
		
		
	}
	
	event.stopPropagation();
}

// 切换标签页
function renderIframe7811q(tag){
	var fname=$(tag).attr('fname');
	if($(tag).hasClass('sel')==false){
		$(tag).addClass('sel').siblings().removeClass('sel');
		$('#curFormInfoCont7811q').children('iframe[name="'+fname+'"]').css({'display':'block'}).siblings().css({'display':'none'});
	}
}

// 关闭标签页
function closeSubForm7811q(tag){
	var fname=$(tag).parent().attr('fname');
	
	var nextItem=$(tag).parent().next();
	if(nextItem[0]==null)
		nextItem=$(tag).parent().prev();
	var nextItemFName=nextItem.attr('fname');
	
	nextItem.addClass('sel');
	$('#curFormInfoCont7811q').children('iframe[name="'+nextItemFName+'"]').css({'display':'block'})
	
	$('#curFormInfoCont7811q').children('iframe[name="'+fname+'"]').remove();
	$(tag).parent().remove();
	
	event.stopPropagation();
}

//对初始化后的表单实现对控件的绑定
function bindSFormCont7811q(initFields,iframeId,fullName){
	$('#'+iframeId).on('load',function(){
		//添加选中蒙版
		$('#'+iframeId).contents().find('div[cnode=shell]').filter('div[fname]').each(function(idx,value){
			if($(this).attr('fname')!='' && $(this).attr('fname')!=null){
				if($(this).children().length>0){
					var _width=$(this).children()[0].style.width;
					var _height=$(this).children()[0].style.height;
					var _top=$(this).children()[0].style.top;
					var _left=$(this).children()[0].style.left;
					$(this).append("<div class='maskbox' style='width:"+_width+";height:"+_height+";top:"+_top+";left:"+_left+";'></div>");
				}
			}
		});
		resetSelected7811q(initFields,iframeId)

		$('#'+iframeId).contents().find('div[cnode=shell]').filter('div[fname]').on('click',function(event){
			//高亮选中控件时，将右边树下的控件勾选
			var curFname=$(this).attr('fname');
			if(fullName) curFname=fullName+'>'+curFname;
			var fslistNode=$('#formselectorul7811q').tree('find',curFname);
			
			var maskdiv="<div class='maskbox'></div>";
			
			if(fslistNode){
				$('#formselectorul7811q').tree('expandTo', fslistNode.target);
				$('#formselectorul7811q').tree('select', fslistNode.target);
				$('#formselectorul7811q').tree('scrollTo', fslistNode.target);

				if($(this).attr('isSelect')=='select'){
					$('#formselectorul7811q').tree('uncheck',fslistNode.target);
				}else{
					$('#formselectorul7811q').tree('check',fslistNode.target);
				}
			}
			event.stopPropagation();
		});
		
		// 对SubData, attachment绑定mouseenter事件：显示浮动按钮，点击显示子表单界面
		$('#'+iframeId).contents().find('div[rel=SubData],div[rel=attachment]').on('mouseenter',function(event){
			if($(this).find('#ib_rkmenubox')[0]!=null){
				$(this).find('#ib_rkmenubox').remove();
			}
			var formid=$(this).children(0).attr('formid');
			if(formid){
				var SubFName=$(this).attr('fname');
				var fullNameNext=fullName;
				if(fullNameNext) fullNameNext=fullNameNext+'>'+SubFName;
				else fullNameNext=SubFName;
				
				var _top=parseInt($(this).children()[0].style.top)+35+'px';
				var _left=parseInt($(this).children()[0].style.left)+5+'px';
				
				var mhtml='<div id="ib_rkmenubox" class="ib_rkmenubox" style="top:'+_top+';left:'+_left+';">' +
					          '<div class="ib_rkmenuitem" onclick="parent.FSelectorOpenSubForm7811q(\''+formid+'\',\''+fullNameNext+'\',event)">打开子表单</div> ' +
					      '</div>';
				
			    $(this).append(mhtml);
			}
			
			event.stopPropagation();
		});
		
		// 对SubData, attachment绑定mouseleave事件
		$('#'+iframeId).contents().find('div[rel=SubData],div[rel=attachment]').on('mouseleave',function(event){
			if($(this).find('#ib_rkmenubox')[0]!=null){
				$(this).find('#ib_rkmenubox').remove();
		    }
			
			event.stopPropagation();
		});
		
		$(".shadeMask").hide();
	});
}

//提供给使用内嵌页面时，所调用的获取勾选项的方法。因此不加随机后缀
function GetSelectedFormFields()
{
	var arrdata=[];
	var _arrdata=$('#formselectorul7811q').tree('getChecked');
	for(var i=0;i<_arrdata.length;i++){
		var ftype=_arrdata[i].attributes.ftype;
		if(!ftype) continue;
		
		var obj={};
		obj.ftitle=_arrdata[i].text;
		obj.ftype=ftype;
		var name=_arrdata[i].id;
			obj.fname=name;
		arrdata.push(obj);
	}
	
	return arrdata;
}

// 页面加载初始数据，即是那些控件是被选中的
var resetSelected7811q=function(initFields,iframeId){
	treeUncheckedAll7811q()
	if(!initFields) return;
	
	for(var i=0;i<initFields.length;i++){
		var itemNode=findNode7811q(initFields[i]);
		if(!itemNode){
			console.log('不存在节点:'+initFields[i]);
		}else{
			$('#formselectorul7811q').tree('check',itemNode.target);
		}
	}
};

//通过字段名查找节点
var findNode7811q=function (fldName){
	if(!fldName) return null;
	var ctrlTree=$('#formselectorul7811q');
	var itemNode=ctrlTree.tree('find',fldName);
	
	return itemNode;
}

// 通过fname在formselectorul7811q列表中找到对应的，并获取子表单的Title
var getSubFormTitle7811q=function(fullname){
	var itemNode=findNode7811q(fullname);
	var title=itemNode==null?fullname:itemNode.text;
	return title;
}

/*
 * 清除EasyUI-Tree所有的选择
 */
function treeUncheckedAll7811q(){
	var nodes=$('#formselectorul7811q').tree('getChecked');
	for(var i=0;i<nodes.length;i++){
		$('#formselectorul7811q').tree('uncheck',nodes[i].target);
	}
}

/*
 * 表单选择模式的选择参数
 * 0：全部选择
 * 1：全部取消
 * 2：反选
 */
function formFieldSelectMode(para){
	if(para==0){
		var nodes=$('#formselectorul7811q').tree('getChecked','unchecked');
		for(var i=0;i<nodes.length;i++){
			$('#formselectorul7811q').tree('check',nodes[i].target);
		}
	}else if(para==1){
		var nodes=$('#formselectorul7811q').tree('getChecked','checked');
		for(var i=0;i<nodes.length;i++){
			$('#formselectorul7811q').tree('uncheck',nodes[i].target);
		}
	}else if(para==2){
		var nodes=$('#formselectorul7811q').tree('getChildren');
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].checkState=='checked'){
				$('#formselectorul7811q').tree('uncheck',nodes[i].target);
			}else if(nodes[i].checkState=='unchecked'){
				$('#formselectorul7811q').tree('check',nodes[i].target);
			}
		}
	}else{
		showError('方法使用的参数不正确!')
	}
}
