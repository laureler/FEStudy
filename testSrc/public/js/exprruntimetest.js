
var myDate = new Date();
var fullYear = myDate.getFullYear().toString();
var year = myDate.getYear().toString();
year = year.length > 2 ? year.substr(1) : year;
var month = myDate.getMonth() + 1;
var fullMonth = (month < 10 ? "0" + month : month.toString()); 
month = month.toString();
var day = myDate.getDate();
var fullDay = (day < 10 ? "0" + day : day.toString()); 
day = day.toString();

//日期标准格式的字符串（yyyy-MM-dd HH:mm:ss）
function nowStr()
{
	var myDate = new Date();
	return myDate.Format("yyyy-MM-dd HH:mm:ss");
}
//将日期格式的字符串转换成日期值，支持常见的日期格式字符串：
//yyyy-MM-dd HH:mm:ss、yyyy年MM月dd日 HH时mm分ss秒、yyyyMMddHHmmss
//国标标准格式如：Sat Feb 24 2018 10:10:17 GMT+0800
//以及中文数字如：二〇一八年十一月二十五日 十点三十分八秒
var parseDate = function(strDate) {
  var result = null;
  //日期戳
  if(typeof srcDate == "number"){
      result = new Date(srcDate);
  }else if(srcDate instanceof Date){
    result = srcDate;
  }else{
  	var strDate=srcDate+"";
    //2017年2月3日  12点30分20秒
    if(strDate.indexOf("年") > 0){
        strDate = strDate.replace("年","-").replace("月","-").replace("日"," ");
    }
    if(strDate.indexOf("分") > 0){
      strDate = strDate.replace("时",":").replace("点",":").replace("分",":").replace("秒","");
    }
    
    //中文数字处理 〇一二三四五六七八九
		//十 一十 二十 ... 十一 一十一 二十一 ...
		//-->十前面不是一至九，加"一"；十后面不是〇至九，加"〇"；最后将十替换成""
		var iTemp = 0;
		strDate = strDate.replace(/○/g, '〇');//将\xA1F0替换成\xA996
		while ((iTemp = strDate.indexOf('十', iTemp)) >= 0)
		{
			if (iTemp + 1 == strDate.length())
			{
				strDate += "〇";
				break;
			}
			if (!_isCNumber(strDate.charAt(iTemp + 1)))
			{
				strDate = strDate.substring(0, iTemp + 1)+"〇"+strDate.substring(iTemp + 1);
			}

			if (iTemp == 0)
			{
				strDate = "一"+strDate;
				++iTemp;
			}
			else if (strDate.charAt(iTemp - 1) == '〇')
			{
				strDate = strDate.substring(0, iTemp - 1)+"一"+strDate.substring(iTemp);
			}
			else if (!_isCNumber(strDate.charAt(iTemp - 1)))
			{
				strDate = strDate.substring(0, iTemp)+"一"+strDate.substring(iTemp);
			}
			++iTemp;
		}
		strDate = strDate.replace(/十/g, "");
		//廿 廿一 ...-->廿后面不是〇至九，加"〇"；最后将廿替换成"二"
		iTemp = 0;
		while ((iTemp = strDate.indexOf('廿', iTemp)) >= 0)
		{
			if (iTemp + 1 == strDate.length())
			{
				strDate += "〇";
				break;
			}
			if (!_isCNumber(strDate.charAt(iTemp + 1)))
			{
				strDate = (strDate.substring(0, iTemp + 1)+"〇"+strDate.substring(iTemp + 1));
			}
			++iTemp;
		}
		strDate = strDate.replace(/廿/g, '二');
		//卅 卅一 ...-->卅后面不是〇至九，加"〇"；最后将卅替换成"三"
		iTemp = 0;
		while ((iTemp = strDate.indexOf('卅', iTemp)) >= 0)
		{
			if (iTemp + 1 == strDate.length())
			{
				strDate += "〇";
				break;
			}
			if (!_isCNumber(strDate.charAt(iTemp + 1)))
			{
				strDate = (strDate.substring(0, iTemp + 1)+"〇"+strDate.substring(iTemp + 1));
			}
			++iTemp;
		}
		strDate = strDate.replace(/卅/g, '三');

		strDate = strDate.replace(/〇/g, '0').replace(/一/g, '1').replace(/二/g, '2')
				.replace(/三/g, '3').replace(/四/g, '4').replace(/五/g, '5')
				.replace(/六/g, '6').replace(/七/g, '7').replace(/八/g, '8')
				.replace(/九/g, '9');
    
    //20170102,20170102123344
    if(!(strDate.indexOf("-") > 0 || strDate.indexOf("/") > 0)){
        //2017
        if(strDate.length == 4){
            result = new Date(strDate);
        }
        //201702
        else if(strDate.length == 6){
            strDate = strDate.substring(0,4)+"-"+strDate.substring(4);
            result = new Date(strDate);
        }
        //20170102
        else if(strDate.length == 8){
            strDate = strDate.substring(0,4)+"-"+strDate.substring(4,6)+"-"+strDate.substring(6);
            result = new Date(strDate);
        }
        //20170102123344
        else if(strDate.length == 14){
            var ymd = strDate.substring(0,8);
            var hms = strDate.substring(8);
            strDate = ymd.substring(0,4)+"-"+ymd.substring(4,6)+"-"+ymd.substring(6) +
                " " +hms.substring(0,2)+":"+hms.substring(2,4)+":"+hms.substring(4);
            result = new Date(strDate);
        }
        //作为时间戳
        else{
            result =  new Date(parseInt(strDate));
        }
    }
    //2017-2-3，2017-02-04，2017/2/3，2017/02/03
    //Sat Feb 24 2018 10:10:17 GMT+0800
    else{
        result = new Date(strDate);
    }
  }
  if(result==null || isNaN(result.getTime())){
      showError(srcDate +"格式不正确，无法转化成日期值");
      result = null;
  }
  return result;
}

//表单处理对象
function form()
{
	this._mapField={};
	//获取指定字段值
	this.getFieldValue = function(formDomainName){
		return "11";
	}
	//获取指定字段显示的文本（如果无文本，则取字段值）
	this.getFieldDicText = function(formDomainName){
		return "11"
	}
	//设置字段值
	this.setFieldValue = function(formDomainName, fieldValue){
		this._mapField[formDomainName]=fieldValue;
	}
	//以显示文本设置字段值（内部会转换成字段值）
	this.setFieldDicText = function(formDomainName, text){
		this._mapField[formDomainName]=text;
	}
	//获取所有字段名值对
	this.getFormData = function(){
		return {"JOB_A.F1":"11","JOB_A.F2":"abc"};
	}
	//获取所有字段名列表
	this.getFieldNames = function(){
		return ["JOB_A.F1","JOB_A.F2"];
	}
	//获取当前业务号
	this.getBusinessno = function(){
		return "20170101001";
	}
}
//工作流处理对象
function workflow()
{
	//通过环节Key名，获取指定环节信息
	this.getStep = function(stepKey){
		return {
		 "id":"00198904-f843-11e7-8e0d-005056b81d36","surplusDate":0.0,"duDate":1515835230825,
		 "countersign":false,"accumulateTime":0.0,"formTemplateId":"da765eee-45f3-483e-b373-489345760d8b",
		 "checkingBeforeCompleted":"","visiableFollowWorkMen":[],"automaticCommit":false,"automaticClaim":false,
		 "completePartialSubmit":false,"processInstanceId":"001961d8-f843-11e7-8e0d-005056b81d36","showingCompletingDialog":false,
		 "processFinished":false,"processRefundable":false,"computingWorkload":false,"masterTaskCount":1,
		 "normalTaskCount":0,"linkDefinitionKey":"task2073918","forceClaimPeoples":[],"countersignIsPass":false,
		 "createTime":1515835230000,"executionId":"001961d8-f843-11e7-8e0d-005056b81d36","winthdrad":false,
		 "childProcess":[],"processDefinitionId":"b32012af-f813-11e7-8495-005056b81d36",
		 "maxTimelimit":0.0,"visiableMen":[],"masterMen":["f4f4412c-7c2b-4f12-a69e-1a1bb210f1b7"],"normalMen":[],
		 "applaySuspended":0,"autoCompleteDateTime":9223372036854775807
		};
	}
	//执行保存操作
	this.save = function(){}
}
//组织结构处理对象
function Organization()
{
	this.getUserName = function(){
		return "管理员";
	}
	
	//组织项的全名
	//部门或岗位为：单位/部门/岗位/*
	//人员为：单位/部门/岗位/人员
	//角色为：[角色]
	this.getFullName = function(uid){
		return "单位/部门/岗位/人员";
	}
	//其中organType值：0=部门，1=岗位，2=自定义角色，3=系统角色，10=人员
	this.getAllUser = function(uids){
		return [
		 {"status":1,"organDescription":"","sortValue":0,"organType":10,"organName":"张三",
		  "organCode":"","mdistrict":"","parentId":"daa2fcca-5c0a-4d88-85d1-6e43f710bfff",
		  "rid":"09434cda-2398-45bd-80d7-4fd3c8c46939"},
		 {"status":1,"children":[],"organDescription":"","sortValue":0,"organType":10,"organName":"李四",
		  "organCode":"","mdistrict":"","parentId":"61c8ddb1-46b7-4aec-a36e-839796cb4ad0",
		  "rid":"d8e431c6-fcb1-4031-9fb9-395d3ab3057b"}]
	}
	this.getOrganInfo = function(uid){
		return {"status":1,"organDescription":"","sortValue":0,"organType":10,"organName":"张三",
		 "organCode":"","mdistrict":"","parentId":"daa2fcca-5c0a-4d88-85d1-6e43f710bfff",
		 "rid":"09434cda-2398-45bd-80d7-4fd3c8c46939"};
	}
	
	this.getOrganInfoByCode = function(code){
		return {"status":1,"organDescription":"","sortValue":0,"organType":10,"organName":"张三",
		 "organCode":"","mdistrict":"","parentId":"daa2fcca-5c0a-4d88-85d1-6e43f710bfff",
		 "rid":"09434cda-2398-45bd-80d7-4fd3c8c46939"};
	}
	
	this.getOrganInfoByName = function(fullName){
		return {"status":1,"organDescription":"","sortValue":0,"organType":10,"organName":"张三",
		 "organCode":"","mdistrict":"","parentId":"daa2fcca-5c0a-4d88-85d1-6e43f710bfff",
		 "rid":"09434cda-2398-45bd-80d7-4fd3c8c46939"};
	}
	
	this.getOwnerDept = function(uid){
		return {"status":1,"organDescription":"二级单位","sortValue":0,"organType":0,"organName":"花都区分局",
		"organCode":"","mdistrict":"","parentId":"1df42869-2c23-4b45-859a-d2e47b055c30",
		"rid":"e2c7ae45-cd71-4b20-b03e-6dbb0193b032"};
	}
	
	this.getFirstPost = function(uid){
		return {"status":1,"organDescription":"","sortValue":0,"organType":1,"organName":"办事员",
		"organCode":"","mdistrict":"","parentId":"e2c7ae45-cd71-4b20-b03e-6dbb0193b032",
		"rid":"daa2fcca-5c0a-4d88-85d1-6e43f710bfff"};
	}
	
	this.getAllPost = function(uid){
		return [
		{"status":1,"organDescription":"","sortValue":0,"organType":1,"organName":"办事员",
		"organCode":"","mdistrict":"","parentId":"e2c7ae45-cd71-4b20-b03e-6dbb0193b032",
		"rid":"daa2fcca-5c0a-4d88-85d1-6e43f710bfff"}
		];
	}
	
	this.isRole = function(uid, roleName){
		return true;
	}
	
	this.isInclude = function(uid,puids){
		return true;
	}
}
//获取行政区划信息
var adminDivisions = function(administratorCode){
	return [
	{"C":"440000","A":"粤","F":"广东省","L":"1","S":"44"},
	{"C":"440100","A":"穗","F":"广州市","L":"2","S":"4401"},
	{"C":"440101","A":"","F":"县代码-440101","L":"","S":""}
	];
}
//获取字典项信息
var codeDict = function(catalogCode, showValue){
	return [
	{"code":"4400006001","sortValue":1,"catalogId":"56165dda-988f-48d3-a40e-21604dc28298","showValue":"正式项目",
	"rid":"6378ce88-df05-11e7-a395-d00de043d937"}
	];
}
//获取系统配置信息
var sysKey = function(catalog, key){
	return "配置值";
}

//获取编号的流水号值
var createNum = function(numberLength, type){
	return 123;
}

//通过编号公式生成编号
var buildNo = function(expFla){
	return "(2010)12345号";
}

	//条件执行sql语句：sql1执行成功且有返回值，则执行sql2，否则(不出异常时)执行sql3。
	//dsName:数据源查询服务配置名，用于支持多数据源的查询（暂未使用）
	//sql1:语句命名（为了安全，不直接写sql语句，而是由单独模块定义sql并命名，通过命名找到sql语句内容）
	//param1:所执行语句的参数名值对的Map对象（依据命名所对应的sql语句中的参数定义方式，支持占位符与命名参数）
	// 如：{"?1":"#date#","?2":1,"?3":"1-23-4"}
	//  {"regdate":"#date#","mj":1,"rid":"1-23-4"}
	//返回每条sql语句的执行结果名值对的Map对象：
	//   如果是select语句，返回List<Map<String,Object>>格式的记录集（Map指一条记录结果，Key为字段名，Value为字段值）；
	//   如果是insert、update、delete语句，返回影响的记录数。 
	//   若对应某条语句未执行，相应结果为null。
	var execsql=function(dsName,sql1,param1,sql2,param2,sql3,param3)
	{
		return {"sql1":null,"sql2":null,"sql3":null};
	}
	
	//执行存贮过程
	//dsName:数据源查询服务配置名，用于支持多数据源的查询（暂未使用）
	//procName：存贮过程名
	//inParam：输入参数，名值对的Map对象（但只支持命名参数的写法，不支持占位符参数）
	//outParam：输出参数，名值对的Map对象（也只支持命名参数的写法），每项参数的值为返回结果类型的描述字符串。如：{"no":"int"}
	//   varchar（字符串）、clob（大文本内容）：将返回字符串值；
	//   int（整数）：将返回整数值；
	//   double（浮点小数）、decimal（定点小数）：将返回小数值；
	//   datetime（日期）：将返回日期值（时间戳）；
	//   blob（大二进制块）：将返回base64编码的二进制值；
	//   cursor（游标，只能一个）：将返回List<Map<String,Object>>格式的记录集（Map指一条记录结果，Key为字段名，Value为字段值），
	// 为了兼容不同数据库返回记录集的方式不同（有些用输出参数返回，有些通过查询语句返回），统一按输出参数的方式调用（内部会正确处理通过查询语句返回的情况）。
	//返回存贮过程的输出参数名值对Map对象
	var execproc=function(dsName,procName,inParam,outParam)
	{
		var outRet={};
		for(var nx in outParam){
			var typeName=outParam[nx];
			if(typeName=="varchar") outRet[nx]="abc";
			else if(typeName=="clob") outRet[nx]="abc big";
			else if(typeName=="int") outRet[nx]=123;
			else if(typeName=="long") outRet[nx]=123890;
			else if(typeName=="double") outRet[nx]=123.45;
			else if(typeName=="decimal") outRet[nx]=1234.5678;
			else if(typeName=="datetime") outRet[nx]=(new Date()).getTime();
			else if(typeName=="blob") outRet[nx]="AAECAwQFBgcICQ==";
			else if(typeName=="cursor") outRet[nx]=[{"field1":"text","field2":123}];
			else outRet[nx]=null;
		}
		return outRet;
	}
	
	//执行批量查询
	//dsName:数据源查询服务配置名，用于支持多数据源的查询（暂未使用）
	//arrSqlInfo：查询信息数组，每个元素是SqlInfo对象：
	// {sql:语句命名,param:[参数名值对的Map对象列表]}
	//返回每条sql语句返回的记录集数组：List＜List＜记录集＞＞。
	//   其中第一层数组元素是各条sql语句的返回值数组（与传入的sql语句顺序对应）；
	//   第二层数组元素是每条sql语句内不同组参数的返回的记录集结果（与param参数顺序对应，但一般只有一组参数）
	//   记录集返回List＜Map＜String,Object＞＞（Map指一条记录结果，Key为字段名，Value为字段值）
	var batchsql=function(dsName,arrSqlInfo)
	{
		var allRet=[];
		for(var ix=0;ix<arrSqlInfo.length;++ix){
			var sqlRet=[];
			var ps=arrSqlInfo[ix].param;
			for(var iy=0;iy<ps.length;++iy){
				var recRet=[{"field1":"text","field2":123},
				            {"field1":"text","field2":456}];
				sqlRet.push(recRet);
			}
			allRet.push(sqlRet);
		}
		return allRet;
	}
	
	//执行批量更新
	//dsName:数据源查询服务配置名，用于支持多数据源的查询（暂未使用）
	//arrSqlInfo：查询信息数组，每个元素是SqlInfo对象
	//返回每条sql语句返回的受影响记录数：List＜int[]＞。
	//   其中第一层数组元素是各条sql语句的返回值数组（与传入的sql语句顺序对应）；
	//   第二层数组元素是每条sql语句内不同组参数的返回结果（与param参数顺序对应，每一项的值表示此参数下执行导致的影响记录数）
	var batchcud=function(dsName,arrSqlInfo)
	{
		var allRet=[];
		for(var ix=0;ix<arrSqlInfo.length;++ix){
			var sqlRet=[];
			var ps=arrSqlInfo[ix].param;
			for(var iy=0;iy<ps.length;++iy){
				var recRet=1;
				sqlRet.push(recRet);
			}
			allRet.push(sqlRet);
		}
		return allRet;
	}

//客户端对象
function client()
{
	//当前根结点的窗口对象（可进一步获取当前登录环境信息）
	this.rootWindow = window.parent;
	//当前控件名
	this.currentFieldName = "";
	//当前控件值
	this.currentValue = "";
}
//向控制台输出信息
function printMsg(msg)
{
	console.log(msg);
}

jQuery.extend({
	Y:fullYear,
	y:year,
	M:fullMonth,
	m:month,
	D:fullDay,
	d:day,
	nowStr:nowStr,
	F:new form(),
	W:new workflow(),
	O:new Organization(),
	C:codeDict,
	X:adminDivisions,
	N:createNum,
	S:sysKey,
	UID:"1234-ab-cd-89-123456",
	Data:{},
	execsql:execsql,
	execproc:execproc,
	batchsql:batchsql,
	batchcud:batchcud,
	client:new client(),
	buildNo:buildNo,
	print:printMsg,
  parseDate:parseDate
});

//服务端的引入Java对象的类
//var Java=null;
//var Packages=null;

//验证或调试表达式
//bBackServer，指出是否需要运行后台表达式
//sExpr，要验证的表达式
//sJid，用于初始化调试环境的业务号
//bDebug，是否调试（如果为true，会自动添加一行debuger代码（相当于软断点）
function DebugExpr(bBackServer,sExpr,bDebug,sJid)
{
	if(!sExpr) return null;
	
	if(!sJid)sJid="";
	var ex=null;
	if(bBackServer){
		//Java={};
		//Java.type=function(className){return new Object();}
		//调用调试Web服务，执行表达式
		$.ajax({
			url:'/workflowWebService/debugexpr?jid='+sJid,
			type:'post',
			data:sExpr,
			dataType:'text',
			async: false,
			contentType:'application/json;charset=utf-8',
			success:function(data){
				showSuccess(data,"表达式执行正确，返回结果：");
			},
			error:function(xhr,stat,exmsg){
				ex=analyseError(xhr.responseText);
			}
		});
	}else{
		//Java=null;
		var runExpr=sExpr;
		var bVal=true;//是否验证运行（false表示使用真实环境运行）
		if(bDebug){
			runExpr=_InsertBreakPoint(runExpr);
			if(sJid){
			bVal=false;
			var url="/workflowWebService/debugexprForm?jid="+sJid;
			//调用调试Web服务，显示调试表单
			var root=window;
			while(root!=window.top && !root.addTap)
				root=root.parent;
			var debugWin=null;
			if(root.addTap){
				var tapId="expr"+sJid;
				debugWin=root.findTapWindow(tapId);
				if(debugWin) debugWin.expr="";
				root.addTap(null,{moduleId:tapId,name:"表达式调试",pageUrl:url});
				debugWin=root.findTapWindow(tapId);
			}
			else{
				debugWin=window.open(url,"_blank");
			}
			debugWin.expr=runExpr;
			}
		}
		if(bVal){
			try{
				var ret=eval(runExpr);
				showSuccess(ret,"表达式执行正确，返回结果：");
			}catch(e){
				ex=e;
			}
		}
	}
	return ex;
}
function _InsertBreakPoint(sExpr)
{
	//插入断点位置
	var iPos=sExpr.indexOf("//@ sourceURL");
	if(iPos<0){
		var dtTime=(new Date().getTime()).toString();
		sExpr="//@ sourceURL=expr"+dtTime.substr(dtTime.length-8)+".js\ndebugger;\n"+sExpr;
	}else{
		iPos+=12;
		while(sExpr.length>iPos && sExpr.charAt(iPos)!="\r" && sExpr.charAt(iPos)!="\n"){
			++iPos;
		}
		++iPos;
		while(sExpr.length>iPos && (sExpr.charAt(iPos)=="\r" || sExpr.charAt(iPos)=="\n")){
			++iPos;
		}
		if(iPos>sExpr.length)iPos=sExpr.length;
		sExpr=sExpr.substr(0,iPos)+"debugger;\n"+sExpr.substr(iPos);
	}
	return sExpr;
}
