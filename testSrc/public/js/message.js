  //首次进入页面的url地址；
var url1="findTrackingHistoryTaskByProcessInstanceId";
var url2="getProcessInstanceOperationRecordByTaskId";
$(function(){
    
    $('#full').click(function(){
        $('.bottom').css({
            position:'absolute',
            height:'850px'
        });
        document.querySelector(".bottom").scrollIntoView(true);
     })
    $('#cancel').click(function(){
        $('.bottom').css({
            position:'static',
            height:'300px'
        })

    })
})


//显示流转详情
var researchDetails = function(_url,currendTask,processInstanceId){
    if(!_url){
    	_url = url1;
    }
    var dataValue = {processInstanceId:processInstanceId};
    if(currendTask){
    	dataValue = {processInstanceId:processInstanceId,taskKey:currendTask};
    }
    $.ajax({
        type: "GET",
        url: _url,
        data:dataValue,
        dataType: "json",
        success: function (rs) {
            for(let i=0;i<rs.length;i++){
                var _obj = rs[i];
                _obj.startTime=_obj.startTime==null?'':formatDateTime(_obj.startTime);
                _obj.endTime=_obj.endTime==null?'暂未结束':formatDateTime(_obj.endTime);
                _obj.claimTime=_obj.claimTime==null?'':formatDateTime(_obj.claimTime);
                _obj.childTitle = _obj.childProcess.length>0?(_obj.childProcess[0].title?_obj.childProcess[0].title + "-" + 
                		_obj.childProcess[0].jid:_obj.childProcess[0].jid):'查看子流程窗口';
                _obj.opr = `<p class="aLink view" style="float: left;" onclick="openData('${_obj.id}')">查看流程
                </p>${_obj.childProcess.length==0?'':`<p class="aLink viewSon" style="float: left;" onclick="
                searchProcess('','${_obj.childTitle}','${_obj.childProcess[0].processInstanceId}','')">查看子流程</p>`}`;
            }
        	$('#details').datagrid({
                data: rs,
                fitColumns: true,
                fit:true,
                rownumbers:true,
        	    columns:[[
        	        {field:'name',title:'环节',width:100},
                    {field:'taskStatus',title:'状态',width:100},
                    {field:'assignee',title:'办理人',width:100},
                    {field:'startTime',title:'到达时间',width:150},
                    {field:'claimTime',title:'接办时间',width:150},
                    {field:'endTime',title:'办理时间',width:150},
                    {field:'opr',title:'操作',width:70,formatter:formatterValue}
                ]]
        	});  
        }
    });
 }

//格式化直接返回原有值，保留解析html
var formatterValue = function(value, row, index){
	return value;
}

var formatDateTime = function(timeStamp) {
	if(timeStamp==''){
		return '';
	}
    var date = new Date();  
    date.setTime(timeStamp);  
    var y = date.getFullYear();      
    var m = date.getMonth() + 1;      
    m = m < 10 ? ('0' + m) : m;      
    var d = date.getDate();      
    d = d < 10 ? ('0' + d) : d;      
    var h = date.getHours();    
    h = h < 10 ? ('0' + h) : h;    
    var minute = date.getMinutes();    
    var second = date.getSeconds();    
    minute = minute < 10 ? ('0' + minute) : minute;      
    second = second < 10 ? ('0' + second) : second;     
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
};

var	loadFilterDataName = {
	open:'打开表单',
	activateProcessInstance:'解除挂起',
	suspendProcessInstance:'挂起',
	refuseApplySuspend:'拒绝挂起',
	applySuspend:'申请挂起',
	startProcess:'启动流程实例',
	createTask:'创建任务',
	setRemindMessage:'催办',
	claim :'接办任务',
	unclaim:'撤办任务',
	complete:'完成任务',
	passTo:'转办任务',
	sendBack:'任务跳转',
	backOffice:'收回',
	reRun:'退回',
	finish:'结档',
	refund:'退件',
	modifyProcessInstanceName:'修改流程名称',
	deleteProcessInstance:'彻底删除流程实力',
	supervision:'督办',
	endsupervision:'取消督办',
	disposeRefund:'退件办理'
}

//打开查看流程详情
var openData = function(currendTask){
	var params = {
    		taskId: currendTask
	};
	taskId = currendTask;
	var urlStr = url2;
	if(!currendTask){
	  urlStr = "getProcessInstanceOperationRecord";
	  params = {
		 processInstanceId:processInstanceId
	  }
	}
    $('#linkMsg').window('open');
    $('#linkMsgTable').datagrid({
        url:urlStr,
    	queryParams:params,
    	rownumbers:true,
    	fit:true,
    	loadFilter: function(data){
    		var	dataName = loadFilterDataName;
            for(let i=0;i<data.length;i++){
               data[i].operationType= dataName[data[i].operationType];
               data[i].operationTime=formatDateTime(data[i].operationTime);
            }
            return data;
    	},
        method:'get',
        loadMsg:'加载中...请稍后',
        nowrap:false
    })
}

//点击打开子流程详情
var openChildProcessData = function(childProcessInstanceId){
	var params = {
		processInstanceId: childProcessInstanceId
	};
    $('#linkMsg').window('open');
    $('#linkMsgTable').datagrid({
        url:"getProcessInstanceOperationRecord",
    	queryParams:params,
    	rownumbers:true,
    	fit:true,
    	loadFilter: function(data){
    		var	dataName = loadFilterDataName;
            for(let i=0;i<data.length;i++){
               data[i].operationType= dataName[data[i].operationType];
               data[i].operationTime=formatDateTime(data[i].operationTime);
            }
            return data;
    	},
        method:'get',
        loadMsg:'加载中...请稍后',
        nowrap:false
    })
}