//子表单
var subData={
	win:0,
	ids:[],
	//初始化
	init:function(){
		this.win=$(window).height();
		for(var i=0,len=this.ids.length;i<len;i++){
			var dom=$(document.getElementById(this.ids[i].id));
			dom.addClass("easyui-datagrid");
			$.parser.parse(dom);
			if(this.ids[i].type=="subData"){
				this.adjust(dom,this.ids[i].id);
			}else if(this.ids[i].type=="attachment"){
				this.filebox(dom,this.ids[i].id);
			}
		}
	},
	add:function(id,type){
		this.ids.push({"id":id,"type":type});
	},
	filebox:function(jq,id){
		jq.datagrid({toolbar: document.getElementById('tbForm_'+id)});
		var _maxHeight = this.win*0.8;
		$(document.getElementById("formData_"+id)).dialog({buttons:document.getElementById('dlgBtn_'+id),maxHeight:_maxHeight});
		setTimeout(function(){
			showSubdata(id,jq.attr("data-table"));
		},(Math.random()*1000+539));
		
		var _top = this.win*0.1;
		var dialog=$(document.getElementById("formData_"+id));
		dialog.css({top:_top+'px'});
		dialog.parent().css({top:_top+'px'});
		dialog.parent().next()[0].style.opacity=0;
	},
	adjust:function(jq,id){
		jq.datagrid({toolbar: document.getElementById('tbForm_'+id)});
		var _maxHeight = this.win*0.8;
		
		$(document.getElementById("formData_"+id)).dialog({buttons:document.getElementById('dlgBtn_'+id),maxHeight:_maxHeight});
		setTimeout(function(){
			showSubdata(id,jq.attr("data-table"));
			reFlashDataGridPageTmg20180116(id, id);
		},(Math.random()*1000+539));

        // 实时监听输入框值变化
        $(document.getElementById("searchbar_"+id)).next().children(".textbox-text").bind('input propertychange', function() {
            var value = $(this).val().trim();
            if(value) {
                $(document.getElementById('delSearchTextBtn_'+id)).show();
            }else {
                $(document.getElementById('delSearchTextBtn_'+id)).hide();
            }
        });
		
		if(jq.attr("data-rowstyle")=="rowedit"){
			initAutoSave();
		}
		
//		var pager = jq.datagrid('getPager');
//		pager.pagination({
//			showRefresh:false,
//			total:0,
//			displayMsg:'共 {total} 条记录',
//			layout:[],
//			buttons:$(document.getElementById("pageTool_"+id))
//		});
		
		var _top = this.win*0.1;
		var dialog=$(document.getElementById("formData_"+id));
		dialog.css({top:_top+'px'});
		dialog.parent().css({top:_top+'px'});
		dialog.parent().next()[0].style.opacity=0;
	}
}

function formatterFn(value, rowData, rowIndex) {
	var filedName = this.field;	
	var divres = '';
	var fileOperation = '';
 	var filepath = rowData.filePath;
 	if(!filepath){
        filepath = "";
	}
	if(filedName == "wtOperation"){
		fileOperation = '<a href="javascript:void(0)" onclick="showImgOnRow(\''+filepath+'\')">查看</a>';
	}else if(filedName == "dlOperation"){
		fileOperation = '<a href="javascript:void(0)" onclick="downloadFile(\''+filepath+'\',\''+rowData.uploadState+'\')">下载</a>';
	}
 		
	divres = "<div class=operation>"+ fileOperation +"</div>";
	return divres;
 }

loadControl.addEvent(subData,subData.init);
