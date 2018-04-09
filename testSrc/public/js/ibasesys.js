/*! 系统全局可用的通用方法定义 更新时间：2017-5-26 */
;

//==========信息显示===========
//从错误页读取错误消息（ajax请求对象通过xhr.responseText方式得到错误页）：
//系统本身返回错误信息会使用“[errs] [erre]”包含；
//否则获取使用“<body><h1> </h1>”查找错误信息。
function analyseError(htmlText){
	if(!htmlText) return "";

	var iPos=0;
	var sMsg="";
	var sToken="";
	var iNext=0;

	sMsg=findMessage(htmlText,0,"[errs]","[erre]");
	if(sMsg){
		return sMsg;
	}

	//tomcat的错误页
	sToken="<body><h1>";
	iPos=htmlText.indexOf(sToken);
	if(iPos>=0)
	{
		sMsg=findMessage(htmlText,iPos,sToken,"</h1>");
		var sMsg1="";
		if(sMsg.indexOf("Http代码:")>=0 || sMsg.indexOf("Internal Server Error")>=0){
			sToken="essage</b>";//tomcat 8.0为小写m，tomcat 8.5为大写M，因此去掉此字符查找
			iNext=htmlText.indexOf(sToken,iPos);
			if(iNext>0){
				sMsg1=findMessage(htmlText,iNext+sToken.length,"","</p>");
			}
		}
		if(!sMsg1){
			sToken="escription</b>";//tomcat 8.0为小写d，tomcat 8.5为大写D，因此去掉此字符查找
			iNext=htmlText.indexOf(sToken,iPos);
			//if(iNext<0){
			//	sToken="<b>Description</b>";
			//	iNext=htmlText.indexOf(sToken,iPos);
			//}
			if(iNext>0){
				sMsg1=findMessage(htmlText,iNext+sToken.length,"","</p>");
			}
		}
		if(sMsg1) return sMsg+"\n"+sMsg1;
		return sMsg;
	}
	
	sToken="<body>";
	iPos=htmlText.indexOf(sToken);
	if(iPos>=0){
		iPos+=sToken.length;
		htmlText=htmlText.substring(iPos);
	}
	return (htmlText.length<=300)?htmlText:(htmlText.substr(0,300)+"...");
}

function findMessage(htmlText,iStart,sToken,sEndTkn)
{
	var iPos=iStart;
	if(sToken) iPos=htmlText.indexOf(sToken,iStart);
	if(iPos>=0){
		if(sToken) iPos+=sToken.length;
		return htmlText.substring(iPos,htmlText.indexOf(sEndTkn,iPos));
	}
	return "";
}

//msg: 表示要显示的信息
//title：提示标题（如果不填或为空，默认为：提示）
//bCenter: 是否显示在界面中间（true为中间，false为右下角）
function showSuccess(msg,title,bCenter){
	if(!title) title="提示";
	if(bCenter){
	$.messager.show({
		title: title,
		msg: msg,
		timeout:2000,
		showType:"fade",
		style:{right:'',bottom:''}
	});
	}else{
		$.messager.show({
			title: title,
			msg: msg,
			timeout:2000,
			showType:"slide"
		});
	}
}

//通过Ajax错误事件返回结果显示错误消息。
//xhr:XMLHttpRequest对象，有用的属性：
// readyState:当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
// status:返回的HTTP状态码，比如常见的404,500等错误代码。
// statusText:对应状态码的错误信息，比如404错误信息是not found,500是Internal Server Error。
// responseText:服务器响应返回的文本信息。
//stat:客户端处理的错误状态（null或"timeout","error","abort","notmodified"和 "parsererror"）
//exMsg:字符串类型，表示错误抛出返回的错误信息，如果产生的是HTTP错误，那么返回的信息就是HTTP状态码对应的错误信息，
//	比如404的Not Found,500错误的Internal Server Error等。
//title:标题（默认为：提示）
function showAjaxError(xhr,stat,exMsg,title)
{
	if(!title) title="提示";
	var alertMsg = analyseError(xhr.responseText);
	if (alertMsg)
		showError(alertMsg,title);
	else{
		var sOther="";
		if(stat) sOther+="["+stat+"]";
		if(exMsg) sOther+=exMsg;
		if(sOther) sOther="："+sOther;
		showError("未知的原因"+sOther,title);
	}
}

//sErr:错误提示信息
//title:提示标题（如果如果不填或为空，默认为：提示）
//icon: 提示图标（如果不填或为空，默认为："info"），有效值：error,question,info,warning
function showError(sErr,title,icon){
	if(!title) title="提示";
	if(!icon) icon="info";
	$.messager.alert(title,sErr,icon);
};
//-----------------------------------

//==========扩展功能==========
//查找数组元素位置，未找到返回-1
Array.prototype.indexOf = function (ftxt) {
	for (inx in this) {
		if (this[inx] == ftxt) return inx;
	}
	return -1;
}

//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
 var o = {
     "M+": this.getMonth() + 1, //月份
     "d+": this.getDate(), //日
     "H+": this.getHours(), //小时
     "m+": this.getMinutes(), //分
     "s+": this.getSeconds(), //秒
     "S": this.getMilliseconds() //毫秒
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}

//Html编码
function htmlEncode(str){
  var s = "";
  if(!str) return "";
  s = str.replace(/&/g,"&amp;");
  s = s.replace(/</g,"&lt;");
  s = s.replace(/>/g,"&gt;");
  //s = s.replace(/ /g,"&nbsp;");
  s = s.replace(/\'/g,"&apos;");
  s = s.replace(/\"/g,"&quot;");
  s = s.replace(/\r/g,"&#13;");
  s = s.replace(/\n/g,"&#10;");
  return s;
}

//将字符串转换成可用于ID值的串（将特殊字符用_转意），以便能用于jquery的操作
//原则：数字上的符号，用数字转意；纯符号键，从左到右，从上到下依次按键盘字母从左到右上下两排
//最后p与z结对，而多出一对符号再用最后一排字母键从左到右结对（比如：xc vb nm）。对应关系如下：
//~`qa _-ws +=ed {[rf }]tg |\yh :;uj "'ik <,ol >.pz ?/xc
function toIdEncode(text)
{
	return text.replace(/\_/g, "_w")
		.replace(/\~/g, "_q")
		.replace(/\!/g, "_1").replace(/\@/g, "_2").replace(/\#/g, "_3").replace(/\$/g, "_4")
		.replace(/\-/g, "_s").replace(/\\/g, "_h").replace(/\:/g, "_u").replace(/\</g, "_o")
		.replace(/\>/g, "_p").replace(/\./g, "_z")
		.replace(/\?/g, "_x").replace(/\//g, "_c");
}
//将转意的ID串，转换为原始字符串
function fromIdEncode(id)
{
	return id.replace(/\_q/g,	"~")
		.replace(/\_1/g,"!").replace(/\_2/g,"@").replace(/\_3/g,"#").replace(/\_4/g,"$")
		.replace(/\_s/g,"-").replace(/\_h/g, "\\").replace(/\_u/g,":").replace(/\_o/g,"<")
		.replace(/\_p/g,">").replace(/\_z/g,".")
		.replace(/\_x/g,"?").replace(/\_c/g,"/")
		.replace(/\_w/g, "_");
}

//将日期值格式化成标准格式
function formatDate(value) {
	if(value){
		var date = new Date(value);
		return date.Format("yyyy-MM-dd HH:mm:ss"); 
	}
	return '';
}

//判断是否为有效的rid值。
//不能为空，也不能是#（或以#开头）
function IsValidId(sid)
{
	if(!sid) return false;
	var s=sid+"";
	if(s.length==0 || s.charAt(0)=="#")return false;
	return true;
}
//---------------------------------

/**
 * 通过URL地址中的查询参数，转换为名值对（参数值与传入的值一致，即：传入的是编码值，返回的也是编码值）
 * @param sUrlSearch  如：window.location.search 或 "/aa/bb?p1=123&p2=932" 等
 * @returns
 */
function getSearchParams(sUrlSearch)
{
	var ret={};
	if(!sUrlSearch) return ret;
	
	var istart=sUrlSearch.indexOf("?");
	if(istart>=0)
		sUrlSearch=sUrlSearch.substr(istart+1);
	var params=sUrlSearch.split("&");
	for(var inx=0;inx<params.length;++inx){
		var item=params[inx];
		istart=item.indexOf("=");
		if(istart>0)
			ret[item.substr(0,istart)]=item.substr(istart+1);
		else
			ret[item]="";//没有等号(或等号前为空），则表示此项为参数名
	}
	return ret;
}

/**
 * 获取URL地址的域名。
 * 比如：http://192.168.10.100:8080/mainWeb?sys=1234
 * 返回的是：192.168.10.100
 * @param sUrl
 * @returns
 */
function getDomainFromUrl(sUrl)
{
	var urlDomain=document.domain;
	urlDomain=urlDomain.toLowerCase();
	if(!sUrl)  return urlDomain;
	
	var iq=sUrl.indexOf("?");
	if(iq<0) iq=sUrl.length;
	var isch=sUrl.indexOf("://"); //没有://，表示没有协议名
	if(isch<0 || isch>iq) return urlDomain;
	isch+=3;
	var ispit=sUrl.indexOf("/",isch);//找到最前一个/分隔符
	if(ispit<0) ispit=iq;
	urlDomain=sUrl.substring(isch,ispit).toLowerCase();
	ispit=urlDomain.indexOf(":");//如果有:，表示有端口号（需要去除）
	if(ispit>=0) urlDomain=urlDomain.substr(0,ispit);
	return urlDomain;
}

//为get请求url地址添加标签参数，以防浏览器缓存请求结果.
//所添加的参数为"_t"+最多4位随机数=当前时间毫秒值
function tagGetRequest(sUrl)
{
	var tagItem="_t"+Math.round(Math.random()*10000).toString(16);
	tagItem=tagItem+"="+(new Date().getTime()).toString(16);//.substr(3);
	var iPos=sUrl.indexOf("?")+1;
	if(iPos<=0) return sUrl+"?"+tagItem;
	return sUrl.substr(0,iPos)+tagItem+"&"+sUrl.substr(iPos);
}

//Ajax请求
//url:请求地址
//data：请求数据内容
//prop：请求参数，包含属性
//  msg，操作描述，不设置或空，默认为“操作”
//  sFn，执行成功后的回调方法（参数为服务器返回结果），不设置或空，默认为显示操作成功提示
//  fFn，执行失败后的回调方法（参数1为请求对象，参数2为提示信息，参数3为异常信息），不设置或空，默认为显示操作失败提示
//  async，是否异步调用请求，默认为true（即异步调用）
//  method，请求方法，默认为POST
//  jsonObj，请求跳转到invokeJsonObj方法，处理发送json数组对象
function invokeJson(url,data,prop){
	if(!prop) prop = {};
	if(prop.jsonObj){invokeJsonObj(url,data,prop); return;}
	if(!prop.msg)  prop.msg = '操作';
	if(!prop.sFn) {prop.sFn = function(data){showSuccess(prop.msg+'成功');}};//成功的方法
	if(!prop.fFn) {prop.fFn = function(xhr,data,ex){showError(prop.msg+'失败：'+analyseError(xhr.responseText));}}//失败的方法
	if(prop.async==null) prop.async = true;
	if(!prop.method) prop.method="POST";
	else if(prop.method.toUpperCase()=="GET"){
		url=tagGetRequest(url);
	}
	$.ajax({ 
		url: url,
		type:prop.method,
		async : prop.async,
		content:document.body,
		data:data,
		success: prop.sFn,
		error: prop.fFn
	});
}

//以Json串方式提交Ajax请求
//url:请求地址
//data：请求数据内容,对象形式,同时后台参数以@RequestBody修饰
//prop：请求参数，包含属性
//  msg，操作描述，不设置或空，默认为“操作”
//  sFn，执行成功后的回调方法（参数为服务器返回结果），不设置或空，默认为显示操作成功提示
//  fFn，执行失败后的回调方法（参数1为请求对象，参数2为提示信息，参数3为异常信息），不设置或空，默认为显示操作失败提示
//  async，是否异步调用请求，默认为true（即异步调用）
//  method，请求方法，默认为POST
function invokeJsonObj(url,data,prop){
	if(!prop) prop = {};
	if(!prop.msg)  prop.msg = '操作';
	if(!prop.sFn) {prop.sFn = function(data){showSuccess(prop.msg+'成功');}};//成功的方法
	if(!prop.fFn) {prop.fFn = function(xhr,data,ex){showError(prop.msg+'失败：'+analyseError(xhr.responseText));}}//失败的方法
	if(!prop.async) prop.async = true;
	if(!prop.method) prop.method="POST";
	else if(prop.method.toUpperCase()=="GET"){
		url=tagGetRequest(url);
	}
	$.ajax({ 
		url: url,
		type:prop.method,
		async : prop.async,
		context: document,
		contentType:'application/json;charset=utf-8',
		data:JSON.stringify(data),
		success: prop.sFn,
		error: prop.fFn
	});
}

//跨域Ajax请求
//url:请求地址
//data：请求数据内容
//prop：请求参数，包含属性
//  msg，操作描述，不设置或空，默认为“操作”
//  sFn，执行成功后的回调方法（参数为服务器返回结果），不设置或空，默认为显示操作成功提示
//  fFn，执行失败后的回调方法（参数1为请求对象，参数2为提示信息，参数3为异常信息），不设置或空，默认为显示操作失败提示
//  async，是否异步调用请求，默认为true（即异步调用）
//  method，请求方法，默认为POST
function invokeJsonp(url,data,prop){
	if(!prop) prop = {};
	if(!prop.msg)  prop.msg = '操作';
	if(! prop.sFn) {prop.sFn = function(data){showSuccess(prop.msg+'成功');}};//成功的方法
	if(! prop.fFn) {prop.fFn = function(xhr,data,ex){showError(prop.msg+'失败:'+analyseError(xhr.responseText),'提示');}}//失败的方法
	if(prop.async==null)  prop.async = true;
	if(!prop.method) prop.method="POST";
	else if(prop.method.toUpperCase()=="GET"){
		url=tagGetRequest(url);
	}
	$.ajax({
		url:url,
		type:prop.method,
		async : prop.async,
		dataType:"jsonp",
		jsonp:'ibase2-xjp-cb',
		data: data,
		crossDomain:true, 
		success:prop.sFn,
		error:prop.fFn
	});
}
//----------------------------------

//============组织结构节点操作================
//通过组织结构树，获取指定节点的层次名
//角色返回的名称为：[角色名]
//部门或岗位的名称为：单位名/部门名/* 单位名/部门名/岗位名/*
//人员的名称为：单位名/部门名/岗位名/人员名
function getOrganFullName(oTree,node)
{
	if(node.attributes.organType==2 || node.attributes.organType==3)
		return "["+node.text+"]";
	var arName=[];
	if(node.attributes.organType!=10)
		arName.push("*");
	while(node){
		if(IsValidId(node.id))
			arName.unshift(node.text);
		node=oTree.tree("getParent",node.target);
	}
	return arName.join("/");
}
//---------------------------------------

//========通用Tree控件操作===============
//从当前选择位置下一位置（子或兄弟节点）开始查找包含文本的节点
//bFindId:是否查找ID值
function searchTreeNode(oTree, sText, bFindId) {
	if (!sText) {
		$.messager.alert('提示', '请输入要查找的信息', 'info');
		return;
	}
	var roots=oTree.tree('getRoots');
	if(roots.length==0){
		return;
	}
	sText=sText.toUpperCase();
	var startNode = oTree.tree('getSelected');
	var bRoot = false;
	if (startNode == null) {
		startNode = roots[0];
		bRoot = true;
	}
	
//不用递归方法查找内容
	var finded =getTreeNode(oTree,roots,startNode, sText, false,bFindId);
	if(finded==null && !bRoot){
		finded =getTreeNode(oTree,roots,startNode, sText, true,bFindId);
	}
	
//通过递归方法查找内容。因为easyui获取子节点时，会返回每个层次下的子节点。因此不需要递归查找
//	var finded = getTreeNode(oTree,startNode, sText);
//	if (finded == null && !bRoot) {
//		startNode = roots[0];
//		if(startNode.text.toUpperCase().indexOf(sText)>=0)
//			finded = startNode;
//		else if(bFindId && startNode.id.toUpperCase().indexOf(sText)>=0)
//			finded = startNode;
//		else finded = getTreeNode(oTree,startNode, sText,bFindId);
//	}
	
	if (finded == null) {
		showSuccess('未搜索到 ： ' + sText,'提示');
	} else {
		selectNode(oTree,finded);
	}
}
function getTreeNode(oTree,roots,startNode, sText, bStart,bFindId)
{
	var finded =null;
	for(var ix=0;ix<roots.length;++ix){
		if(!bStart){
			if(roots[ix].target==startNode.target)
				bStart=true;
		}else if(roots[ix].text.toUpperCase().indexOf(sText)>=0){
			finded = roots[ix];
			break;
		}else if(bFindId && roots[ix].id.toUpperCase().indexOf(sText)>=0){
			finded = roots[ix];
			break;
		}
		var childs=oTree.tree('getChildren',roots[ix].target);
		for(var iy=0;iy<childs.length;++iy){
			if(!bStart){
				if(childs[iy].target==startNode.target)
					bStart=true;
			}
			else if(childs[iy].text.toUpperCase().indexOf(sText)>=0){
				finded = childs[iy];
				break;
			}else if(bFindId && childs[iy].id.toUpperCase().indexOf(sText)>=0){
				finded = childs[iy];
				break;
			}
		}
		if(finded!=null) break;
	}
	return finded;
}

////从当前节点开始，查找包含文本的后续节点（子或兄弟或父节点的后续节点）
//function getTreeNode(oTree,startNode, sText)
//{
//	if(startNode==null) return null;
//	var nextNode=null;
//	var childs=oTree.tree('getChildren',startNode.target);
//	if(childs.length==0){
//		nextNode=getSibling(oTree,startNode);
//		if(nextNode==null){
//			nextNode=oTree.tree("getParent",startNode.target);
//			if(nextNode!=null){
//				nextNode=getSibling(oTree,nextNode);
//			}
//		}
//	}else{
//		nextNode=childs[0];
//	}
//	
//	if(nextNode==null) return null;
//	if(nextNode.text.toUpperCase().indexOf(sText)>=0){
//		return nextNode;
//	}
//	return getTreeNode(oTree,nextNode,sText);
//}

//判断指定节点的父级节点是否有勾选
function IsParentCheck(treeCtrl,node)
{
	return GetCheckedParent(treeCtrl,parent)!=null;
}

//获取指定节点的勾选的父级节点(会递归向上检查，直到根节点)，
//如果有勾选：返回此节点对象。如果没有，返回空
function GetCheckedParent(treeCtrl,node)
{
	var parent=treeCtrl.tree("getParent",node.target);
	if(parent==null) return null;
	if(IsCheckedTreeNode(treeCtrl,parent)) return parent;
	return GetCheckedParent(treeCtrl,parent);
}

//判断树节点是否为勾选状态
//由于EasyUI未提供判断节点是否勾选的方法，进行了简单封装，在以后升级时替换
function IsCheckedTreeNode(treeCtrl,node)
{
return (node && node.checked);
}

//选中一个节点，并进入可视范围
function selectNode(oTree,oNode)
{
	oNode=normalNode(oNode,oTree);
	oTree.tree('expandTo', oNode.target);
	oTree.tree('select', oNode.target);
	oTree.tree('scrollTo', oNode.target);
}

//对节点进行格式化，保证target属性有值。
//注：如果有子节点，并不处理子节点的target属性
function normalNode(oNode,oTree)
{
	if(oNode.target==null)
	{
		if(oTree){
			return oTree.tree("find",oNode.id);
		}else if(oNode.domId){
			oNode.target=$("#"+oNode.domId);
		}
	}
	return oNode;
}

//获取当前节点的下一兄弟节点，没有返回null
function getSibling(oTree,startNode)
{
	var parent=null;
	if(startNode!=null){
		startNode=normalNode(startNode,oTree);
		parent=oTree.tree("getParent",startNode.target);
		if(parent==null) return null;
	}
	
	var childs=null;
	if(parent==null){
		childs=oTree.tree('getRoots');
	}else{
		childs=parent.children;//oTree.tree('getChildren',parent.target);
	}
	var nextNode=null;
	if(childs!=null){
		for(var ix=0;ix<childs.length;++ix){
			if(childs[ix].target==startNode.target) {
				/*
				for(var iy=ix+1;iy<childs.length;++iy){
					var newP=oTree.tree("getParent",childs[iy].target);
					if(newP.target==parent.target){
						nextNode=childs[iy];
						break;
					}
				}
				*/
				if(ix+1<childs.length) nextNode=childs[ix+1];
				break;
			}
		}
	}
	return nextNode;
}

//获取指定节点下的直接子节点(即第一层的子节点)
function GetDirectChildren(oTree,node){
	var chldNodes = [];
	$(node.target).next().children().children("div.tree-node")
	.each(function(){
		chldNodes.push(oTree.tree('getNode',this));
	});
	return chldNodes;
}