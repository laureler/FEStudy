/**
  * createTreeCtrl 是生成树结构的控件，含有搜索功能
  * @param strUrl 生成树的数据来源。返回树结构数据。
  * @param widgetId 外部传入的树控件Id（方便外部使用），不传入将使用默认Id。
  * @param title 弹出框的标题
  * @param resultFun 确定事件后的回调函数，原型bool resultFun(data)，返回值表示选中是否有错（true有错，则不关闭选择框；false无错，会关闭选择框）
  * @param innerContId 内嵌界面的容器ID。如果为空，则以弹出框显示；否则将界面显示在容器
  * @param isMultiple 是否单选
*/
function createTreeCtrl(strUrl,widgetId,title,isMultiple,resultFun,innerContId){
	
	var _this=this;
	widgetId=widgetId==null?'commonTree5w4ey':widgetId;
	
    var html='';
    if(!innerContId){
        html += '<div id="'+widgetId+'Box"><div id="'+widgetId+'" class="easyui-window" title="'+title+'" style="width:330px;height:450px;" data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,footer:\'#ft2\'">';
    }else{
        html += '<div id="'+widgetId+'" style="width:330px;height:450px;" >'
    }
    html += '<div class="easyui-layout" data-options="fit:true,border:false" style="overflow:hidden;">' +
		    '<div data-options="region:\'north\',border:false">' +
		    	'<input id="findCTree5w4ey" class="easyui-searchbox" prompt="输入内容查找" style="width:100%;height:30px;" data-options="searcher:searchCTreeNode5w4ey"/>' +
		    '</div>' +
		    '<div data-options="region:\'center\',border:false">' +
		        '<ul id="cTreeList5w4ey" class="easyui-tree" style="overflow:hidden;"></ul>' +
		    '</div>' +
		'</div>';
    if(!innerContId){
        html += '<div id="ft2" align="center" style="padding:5px 0;border:1px solid #95B8E7">' +
                    '<a class="easyui-linkbutton" data-options="iconCls:\'icon-ok\'" onclick="commonTreeClick()">确定</a> &nbsp;&nbsp;' +
                    '<a class="easyui-linkbutton" data-options="iconCls:\'icon-cancel\'" onClick="commonTreeCancel()">取消</a>' +
                '</div>' +
                '</div></div>';
    }else{
        html += '</div>';
    }
    
    if(!innerContId){
    	if($('#'+widgetId).length==0){
            $('body').append(html);
            $.parser.parse($('#'+widgetId+'Box'));
        }else{
            $('#'+widgetId).window('open');
        }
    }else{
    	if($('#'+widgetId).length==0){
    		$('#'+innerContId).html(html);
    		$.parser.parse('#'+innerContId);
    	}
    }

  	this.commonTreeClick=function(){
  		var nodes=null;
  		if(isMultiple)
  			nodes = $('#cTreeList5w4ey').tree('getChecked');
  		else
  			nodes = $('#cTreeList5w4ey').tree('getSelected');
  		
  		if(!nodes){
      		showError('没有选择任何项，请先选择一项'); 
      		return;
      }
  		if(resultFun){
      		var bErr=resultFun(nodes);
      		if(bErr) return;
      	}
  		if(!innerContId)
      		$('#'+widgetId).window('close');
  	}
    
    this.commonTreeCancel=function(){
    	$('#'+widgetId).window('close');
    }
    
    // 树数据加载
    if(strUrl){
    	$('#cTreeList5w4ey').tree({
    		url:strUrl,
    		method:'GET',
    		dataType:'json',
    		animate:true,
    		checkbox:isMultiple,
    		onDblClick:function(node){
    			if(isMultiple){
    				if(node.checked)
    					$('#cTreeList5w4ey').tree("uncheck",node.target);
    				else
    					$('#cTreeList5w4ey').tree("check",node.target);
    			}else{
    				_this.commonTreeClick();
    			}
    		},
    		onLoadSuccess:function(node,data){
				$('#cTreeList5w4ey').on('mouseenter','span.tree-title',function(){
//					console.log($(this).text());
					var curZindex=$(this).parents('.window').css('z-index')+100;
					var itemTxt=$(this).text();
					var itemWidth=$(this).width()+4; // 4像素是padding的左右值各2
					var itemLeft=$(this).position().left; // node.text文本相对于父元素偏移多少
					var cTreeWidth=$('#cTreeList5w4ey').width();
					if((itemWidth+itemLeft)>cTreeWidth){
						if($('body').find('.tip').length!=0){
				            $('body').find('.tip').remove();
				        }else{
				        	var html='<div class="tip">'+itemTxt+'</div>';
							$('body').append(html);
							$('.tip').css({'top':$(this).offset().top+15,'left':$(this).offset().left,'z-index':curZindex});
				        }						
					}
				});
				
				$('#cTreeList5w4ey').on('mouseleave','span.tree-title',function(){
					if($('body').find('.tip').length!=0){
				        $('body').find('.tip').remove();
				    }
				});
    		},
    		onLoadError:function(){
    			showError("读取数据出错");
    		}
    	});
    }
}

// 树内项目搜索----------------------
function searchCTreeNode5w4ey(val) {
	console.log(val);
	// searchTreeNode 依赖于/public/js/ibasesys.js 里的通用Tree控件方法
	searchTreeNode($('#cTreeList5w4ey'),val);
}
