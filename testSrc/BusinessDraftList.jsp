<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/common/subpage.jsp"%>
<title>我的草稿</title>
</head>
<body>
	<div id="topTool" class="pd10" style="display:none;">
		<table>
			<tr>
				<td>
					<input id="ss" class="easyui-searchbox" searcher="doSearch" prompt="请输入查询的业务受理号" style="width:350px"/> 
					<a id="clrSearch" class="easyui-linkbutton" style="display:none" title="清除搜索，并刷新"
						data-options="iconCls:'icon-clear',plain:true" onclick="cutSearchText()"></a>
				</td>
				<td>
					<a class="easyui-linkbutton" data-options="iconCls:'icon-reload'" plain="true"
						onclick="reLoad()">刷新</a>
				</td>
				<td>
					<a class="easyui-linkbutton" data-options="iconCls:'icon-add'" plain="true"
						onclick="businessApply()">事项申请</a>
				</td>
				<td>
					<a class="easyui-linkbutton" data-options="iconCls:'icon-remove'" plain="true"
						onclick="deleteMore()">删除草稿</a>
				</td>
			</tr>
		</table>
	</div>

	<div class="easyui-panel overh" data-options="fit:true,noheader:true,border:false">
		<table id="docItem" style="width:100%;height:100%" 
		 	data-options="fitColumns:true,singleSelect:true,toolbar:'#topTool',
		 		checkOnSelect:false,selectOnCheck:false,scrollbarSize:0,pageSize:20,
	    	pageList:[20,40,60,80,100],pagination:true,rownumbers:true,nowrap:true">
			<thead>
			<tr>
				<th data-options="field:'ck',align:'center',checkbox: true"></th>
				<th data-options="field:'jid',align:'center'" width="200px">预受理号</th>
				<th data-options="field:'title',align:'center'" width="200px">申请事项名称</th>
				<th data-options="field:'modifyDate',align:'center',formatter:formatDate" width="200px">最后编辑时间</th>
				<th data-options="field:'operation',align:'center',formatter:formatOper" width="400px">操作</th>
			</tr>
			</thead>
		</table>
	</div>
	
	<div id="winList" class="easyui-window" title="提交结果" closed="true"
		style="width: 400px; height: 200px; display: none;"
		data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,inline:false,footer:'#List'">
		<table id="dgList" striped="true" class="easyui-datagrid"
			style="width: 100%; height: 100%; display: none;"
			data-options="fitColumns:false,">
			<thead>
				<tr>
					<th field="jid" align="center">业务受理号</th>
					<th field="message" align="center">错误原因</th>
				</tr>
			</thead>
		</table>
		<div id="List" align="center" style="padding: 5px;">
			<a class="easyui-linkbutton ml10" onclick="closeList()">确定</a>
		</div>
	</div>
	
	<script type="text/javascript">
		//初始化列表
		$(selectFormData(0));
		
		//条件查询
		var doSearch = function(value,name){
			if (value) {
				$("#clrSearch").css("display", "");
			} else {
				$("#clrSearch").css("display", "none");
			}
			selectFormData(1);
		}
		
		//查询列表数据
		function selectFormData(state){
			var keyword = "";
			if(state!=0){
				keyword = $('#ss').textbox("getText");
			}
      $("#docItem").datagrid({
          striped: true,  
          url: parentWin.workflowUrl+"/myjob/getBusinessDraftList",
          queryParams: {'keyword':keyword}
      });  
		}
		
		//清除关键字查询条件并刷新
		function cutSearchText(){
			$("#ss").searchbox('clear');
			selectFormData(1);
			$("#clrSearch").css("display", "none");
		}
		
		//日期时间格式化
		function formatDate(value){
			if(!value){
				return "--:--";
			}
			var date = new Date(value);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			var d = date.getDate();
			var h = date.getHours();
			var min = date.getMinutes();
			var s = date.getSeconds();
			return y + '年' +m + '月' + d + '日 ' + h + '点' + min + '分' + s + '秒';
		}
		
		//格式化操作列显示内容
		function formatOper(val,row,index){
			return '<a href="javascript:void(0)" onclick="findForm('+"'"+row['taskId']+"','"+row['title']+"'"+')">编辑</a>';
		}
		
		//刷新
		function reLoad(){
			location.reload();
		}
		
		//事项申请
		function businessApply(){
			var module = {
					moduleId:"businessApply",
					name:"事项申请",
					pageUrl:"/pubWeb/pub/businessApply",
					isParent:false,dadName:"businessApply"
			};
			parentWin.addTap(null,module);
		}
		
		//删除草稿
		function deleteMore(){
			var info = $('#docItem').datagrid('getChecked');
			if(info==null || info==''){
				var node=$('#docItem').datagrid('getSelected');
				if(node==null || node==''){
					showError("请选择一项要操作的数据");
					return;
				}else{
					info[0]=node;
				}
			}
			var errInfo=[];
			var processInstanceIds = [];
			var businessNumbers=[];
			//流程实例id，业务号jid
			for(var i=0;i<info.length;i++){
				if(info[i]["processInstanceId"]&&info[i]["processInstanceId"]!=="0"){
					processInstanceIds.push(info[i]["processInstanceId"]);
					businessNumbers.push(info[i]["jid"]);
				}
			}
			$.messager.confirm('提示', '确认删除吗?', function(r){
				if(r){
					var sFn = function(data){
						if(data.length>0){
							for(var i=0;i<data.length;i++){
								var err={jid:data[i].jid,title:"",message:analyseError(data[i].message)}
								errInfo.push(err);
							}
						}
						if(errInfo.length>0){
							var data ={total:errInfo.length,rows:errInfo};
							$("#winList").window("setTitle","删除结果");
							$("#winList").window('open');
							 $('#dgList').datagrid({
							     data: data.rows
							    });
						}else{
							showSuccess("删除成功");
						}
						$("#docItem").datagrid('reload');
				  };
					var fFn = function(xhr,err,exmsg){
						showAjaxError(xhr,err,exmsg,"批量数据删除失败");
					};
					if(processInstanceIds.length>0){
		 				processInstanceIds = processInstanceIds.join(',');
		 			}else{
		 				processInstanceIds=null;
		 			}
		 			if(businessNumbers.length>0){
		 				businessNumbers = businessNumbers.join(',');
		 			}else{
		 				businessNumbers=null;
		 			}
		 			invokeJson(parentWin.workflowUrl+"/deleteCreateJobs",{processInstanceIds:processInstanceIds,businessNumbers:businessNumbers},{sFn:sFn,fFn:fFn});
				}
			});
		}
		
		//编辑
		function findForm(taskId,title){
			searchForm("BusinessDraftForm2",title,taskId,"businessDraft");
		}
		
		//提交(暂不提供)
		function submitForm(taskId){
			$.messager.confirm('提示', '确认提交该数据吗?', function(r){
		 		if(r){
		 			$.ajax({
		 	   			url:parentWin.workflowUrl+"/batchComplateTask",
		 					data:{"taskId":taskId},
		 					success:function(data){
		 						 if(data.code){
		 		    			 createCompleteDialog(data,data.taskId,data.code);
		 		    	   }else{
		 		    		   $("#docItem").datagrid('reload');
		 		    		   showSuccess("提交成功");
		 		    	   }
		 	   			},
		 	   			error:function(xhr,stat,exmsg){
		 	    				showAjaxError(xhr,stat,exmsg,"提交出错");
		 	   			}
	 				});
		 		}
		 	});
		}
		
	</script>
</body>
</html>