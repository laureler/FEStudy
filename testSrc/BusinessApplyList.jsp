<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/common/subpage.jsp"%>
<title>事项申请</title>
</head>
<body>
	<div id="topTool" class="pd10" style="display:none;">
		<table>
			<tr>
				<td>
					<input type="checkbox" id="bwebQuery" name="bwebQuery" value="0" onclick="this.value=(this.value==0)?1:0;showBwebQuery()"/><span>可在线申报事项</span>
				</td>
				<!-- <td>
					<input type="checkbox" id="collectQuery" name="collectQuery" value="0" onclick="this.value=(this.value==0)?1:0;showCollectQuery()"/><span>显示收藏事项</span>
				</td> -->
				<td style="padding-left:530px;">
					<input id="ss" class="easyui-searchbox" searcher="doSearch" prompt="输入需要查询的事项名称" style="width:350px"/> 
					<a id="clrSearch" class="easyui-linkbutton" style="display:none" title="清除搜索，并刷新"
						data-options="iconCls:'icon-clear',plain:true" onclick="cutSearchText()"></a>
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
				<th data-options="field:'title',align:'center'" width="250px">事项名称</th>
				<th data-options="field:'pcode',align:'center'" width="250px">事项所属类型</th>
				<th data-options="field:'adminDept',align:'center',formatter:function(val){return '惠州市国土资源局'}" width="150px">主管部门</th>
				<th data-options="field:'division',align:'center',formatter:function(val){return '惠州市'}" width="100px">行政区划</th>
				<th data-options="field:'operation',align:'center',formatter:formatOper" width="350px">操作</th>
			</tr>
			</thead>
		</table>
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
			var bwebQuery = "";
			if(state!=0){
				keyword = $('#ss').textbox("getText");
				bwebQuery = $("#bwebQuery").val();
			}
      $("#docItem").datagrid({
          striped: true,  
          url: ctx + "/pub/getBusinessApplyList",
          queryParams: {'keyword':keyword,'bwebQuery':bwebQuery}
      });  
		}
		
		//清除关键字查询条件并刷新
		function cutSearchText(){
			$("#ss").searchbox('clear');
			selectFormData(1);
			$("#clrSearch").css("display", "none");
		}
		
		//格式化操作列显示内容
		function formatOper(val,row,index){
			//指引静态页面url
			var guideUrl = 'wsbs.huizhou.gov.cn/portal/serviceSubject/formView?serviceSubjectId=4413220000000071981791000392961001#clxx http://wsbs.huizhou.gov.cn/portal/serviceSubject/formView?serviceSubjectId=4413220000000071981791000392961001#clxx';
			return '<a href="'+row["ID"]+'">表格下载</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="declareBusinessJob('+"'"+row['rid']+"'"+')">在线申报'+
				'</a>&nbsp;&nbsp;&nbsp;<a href="'+guideUrl+'">指引</a>'+'</a>&nbsp;&nbsp;&nbsp;';  
		}
		
		//在线申报
		function declareBusinessJob(rid){
			var url = parentWin.workflowUrl;
			var module = {
					moduleId:"CreateJobForm"+(new Date()).getTime(),name:"新建事项申报窗口",
					pageUrl: url+"/getBusinessStartForm?businessDefinitionId="+rid,
					isParent:false,dadName:"createJob"
			};
			parentWin.addTap(null,module);
		}
		
		//触发可在线事项申报勾选框
		function showBwebQuery(){
			var bwebQueryVal = $("#bwebQuery").val();
			//根据可在线事项申报勾选值来过滤，若为1则需要过滤
			if(bwebQueryVal == 1){
				selectFormData(1);
			}else{
				selectFormData(0);
			}
		}
		
	</script>
</body>
</html>