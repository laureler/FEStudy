/*Tab模块操作*/
var nsTabModule={
	timer:null,
	//初始化
	init:function(){
		this.initHeight();
		//为了确保正确在标签页隐藏执行完成后在进行初始化
		setTimeout(function(){
			nsTabModule.initScroll();
		},1000);
		this.addTabSelectorEvent();
		try{
			this.load&&this.load();
		}catch(err){
			console.error(err);
		}
	},
	//在标签页初始化完成后执行 如果有需要标签执行完之后执行的命令 可以使用此方法
	onload:function(fun){
		if(Object.prototype.toString.call(fun)=="[object Function]"){
			this.load=fun;
		}
	},
	//添加统一的一个方法 该方法会因时间顺序被替换 点击标签时触发
	onTap:function(fun){
		if(Object.prototype.toString.call(fun)=="[object Function]"){
            this.tabSelet=fun;
        }
	},
	//该方法暂时可以不用  平衡左右标签页高度的  现阶段会有问题需要调整
	initHeight:function(){
		/*var left=$(".southgis_box_left"),leftHeight=0,contentHeight=0;
		for(var i=0,len=left.length;i<len;i++){
			this.adjustHeight(left[i]);
		}*/
		var box=$(".southgis_box");
//		for(var i=box.length-1,len=0;i>=len;i--){
//			var id=$(box[i]).children(".southgis_tags").find(".selected")[0].getAttribute("data-id");
//			$(box[i]).css("height",nsTabModule.getPageHeight($("div[data-parent='"+id+"']"))+"px"); 
//		}
		if(box.length){
			//设置画板高度为自适应
			$(".canvas").css("height","auto");
		}
	},
	//调整tab高度和内容高度相同 onload的瞬间 取高度宽度值可能是错误的
	adjustHeight:function(ele){
		$(ele).css("height","");
		leftHeight=$(ele).height();
		var dataId=this.getDataId(ele);
		var con=this.getContentPage(dataId);
		if(con){
			$(con).css("height","");
			contentHeight=$(con).height();
			if(leftHeight>contentHeight){
				$(con).css("height",leftHeight);
			}else{
				$(ele).css("height",contentHeight+2);
			}
		}
	},
	//初始化标签栏  当标签栏长度大于标签设置的宽度时需要出现按钮
 	initScroll:function(){
		var box=$(".southgis_box");
		for(var i=0,len=box.length;i<len;i++){
			this.scrollTool($(box[i]));
		}
		$(".scroller_right").on("click",function(event){
			var tab=$(this).parent().children(".southgis_tags");
			var ul=tab.find(".southgis_tabs"),left=ul.css("margin-left");
			var tabWidth=nsTabModule.getTabsWidth(ul.find(".southgis_tab_item"));
			if((tabWidth-tab.width()+25)>Math.abs(parseFloat(left.replace("px","")))){
				ul.css("margin-left",(parseFloat(left.replace("px",""))-20)+"px");
			}
		});
		$(".scroller_left").on("click",function(event){
			var ul=$(this).parent().children(".southgis_tags").find(".southgis_tabs"),left=ul.css("margin-left");
			if(left&&parseFloat(left.replace("px",""))>=20){
				ul.css("margin-left","20px");
			}else{
				ul.css("margin-left",(parseFloat(left.replace("px",""))+20)+"px");
			}
		});
	},
	//判断并添加左右按钮  控制标签页滑动
	scrollTool:function(jq){
		var tar=jq.children(".southgis_tags");
		var uls=tar.find(".southgis_tab_item");
		
		if(this.getTabsWidth(uls)>jq.width()){
			tar.after("<div class='scroller_right' style='display: block; height: 28px;'></div>");
			tar.after("<div class='scroller_left' style='display: block; height: 28px;'></div>");
			tar.children(".southgis_tabs").css("margin-left","20px");
		}
	},
	//遍历li标签的宽度相加 包括margin
	getTabsWidth:function(uls){
		var width=0;
		for(var i=0,len=uls.length;i<len;i++){
			//按照现有大小 4个字的长度为78(82) 3个字的为64(68) 2个字的为50(54) 1个字的为36(40) 空22(26)
			//类推 一个汉字的宽度为14  一个字节7
			if(uls[i].style.display!="none"){
				var tex=$(uls[i]).children(".southgis_tab");
				if(tex.children("span").length){
					tex=tex.children(".tabs-title")[0].innerText
				}else{
					tex=tex[0].innerText;
				}
				width+=this.getLength(tex)*7+26;
			}
		}
		return width;
	},
	//获取字符串实际长度一个汉字的长度是2
	getLength:function(str){
		///<summary>获得字符串实际长度，中文2，英文1</summary>	
	    ///<param name="str">要获得长度的字符串</param>	
	    var realLength = 0, len = str.length, charCode = -1;
	    for (var i = 0; i < len; i++) {
	        charCode = str.charCodeAt(i);
	        if (charCode >= 0 && charCode <= 128) realLength += 1;
	        else realLength += 2;
	    }
	    return realLength;
	},
	//获取当前页的高度  page是jq对象
	getPageHeight:function(page){
		var shell=page.children(".node_control_cont").children("[cnode='shell']"),ele;
		var extra=page.children("[cnode='shell']");
		for(var a=0,lena=extra.length;a<lena;a++){
			shell[shell.length]=extra[a];
			shell.length++;
		}
		for(var i=0,len=shell.length;i<len;i++){
			if(shell[i].style.position=="absolute"){
				if(shell[i].style.display!="none"){
					if(ele){
						ele=this.topCompare(ele,shell[i]);
					}else{
						ele=shell[i];
					}
				}
			}else{
				if(shell[i].children&&shell[i].children[0].style.display!="none"){
					if(ele){
						ele=this.topCompare(ele,shell[i].children[0]);
					}else{
						ele=shell[i].children[0];
					}
				}
			}
		}
		return ele?parseFloat(ele.style.top.replace("px",""))+$(ele).height()+130:130;
	},
	//必须确保参数为html元素  并且为绝对定位
	topCompare:function(arg1,arg2){
		var top1=arg1.style.top.replace("px","");
		top1?top1=parseFloat(top1):top1=0;
		var top2=arg2.style.top.replace("px","");
		top2?top2=parseFloat(top2):top2=0;
		if((top1+($(arg1).height()))>=(top2+($(arg2).height()))){
			return arg1;
		}else{
			return arg2;
		}
	},
	//获取标签离左边的距离
	positionJduge:function(li){
		var box=$(li).closest(".southgis_box");
		if(box.children(".scroller_right").length){
			var parent=$(li.parentNode),left=parseFloat(parent.css("margin-left").replace("px",""));
			if(li.offsetLeft<25){
				parent.css("margin-left",left-li.offsetLeft+25);
			}
			var width=parseFloat(box.css("width").replace("px",""));
			var offsetRight=width-li.offsetLeft-li.offsetWidth;
			if(offsetRight<25){
				parent.css("margin-left",left+offsetRight-25);
			}
		}
	},
	//添加tab点击的事件
	addTabSelectorEvent:function(){
		var tabs=$(".southgis_tabs");
		tabs.click(this.eventHandler);
	},
	//标签页点击事件执行
	eventHandler:function(event){
		event = event || window.event;
		var target=event.target;
		if(target.nodeName.toLowerCase()!="ul"){
			//如果切换了
			if(nsTabModule.getDataId(event.currentTarget)!=target.getAttribute("data-id")){
				nsTabModule.setPage(target.getAttribute("data-id"));
			}
			try{
				nsTabModule.tabSelet&&nsTabModule.tabSelet(event);
			}catch(err){
				console.error(err);
			}
		}
	},
	//设置切换界面 根据当前点击的页面  id为data-id 设置在li标签上的数据
	setPage:function(id){
		//当元素存在  并且没有设置为隐藏
		if($("li[data-id='"+id+"']").length&&$("li[data-id='"+id+"']")[0].style.display!="none"){
			var con=$("li[data-id='"+id+"']").closest(".southgis_box");
			con.children(".southgis_tags").find(".selected").removeClass("selected");
			con.find("li[data-id='"+id+"']").addClass("selected");
			con.children(".ns_show").removeClass("ns_show");
			con.find("div[data-parent='"+id+"']").addClass("ns_show");
			return true;
		}else{
			return false;
		}
	},
	//手动设置切换页面  如果id(data-id)存在直接执行跳转
	select:function(tabid,title,id){
		if(id){
			return this.setPage(id);
		}else{
			var res=false;
			var content=$(document.getElementById(tabid));
			var tab=content.children(".southgis_tags").find(".southgis_tab");
			for(var i=0,len=tab.length;i<len;i++){
				if(tab[i].innerText==title){
					res=this.setPage(tab[i].parentNode.getAttribute("data-id"));
					break;
				}
			}
			return res;
		}
	},
	//选定特定的子标签   逐级显示其父标签
	selectWithParent:function(tabid,title){
		var res=true;
		run(tabid,title,null);
		function run(arg1,arg2,arg3){
			var tem=nsTabModule.select(arg1,arg2,arg3);
			if(res)res=tem;
			var box=$(document.getElementById(arg1)).parent().closest(".southgis_tabcontent");
			if(box&&box.length){
				var arg1=box.attr("data-parent");
				var parent=box.parent();
				run(parent.attr('id'),null,arg1);
			}
		}
		return res;
	},
	//ele为dom元素  设置显示ele所在的标签  并拓展到父级
	selectByField:function(ele){
		var res=false;
		var target=$(ele);
		var box=target.closest(".southgis_box");
		if(box.length){
			var tabid=box.attr("id");
			var dataid=target.closest(".southgis_tabcontent").attr("data-parent");
			var tab=box.children(".southgis_tags").find(".southgis_tab_item");
			for(var i=0,len=tab.length;i<len;i++){
				if(tab[i].getAttribute("data-id")==dataid){
					res=this.selectWithParent(tabid,tab[i].innerText);
					break;
				}
			}
		}else{
			res=true;
		}
		return res;
	},
	//设置当前标签页第一个显示的为默认显示
	selectDefault:function(tabid){
		var content=$(document.getElementById(tabid));
		if(content.length){
			var tab=content.children(".southgis_tags").find(".southgis_tab_item");
			for(var i=0,len=tab.length;i<len;i++){
				if(tab[i].style.display!='none'){
					this.setPage(tab[i].getAttribute("data-id"));
					break;
				}
			}
		}
	},
	jdugeVisible:function(ele){
		/*if($(ele).is(":visible")){//可见
			return true;
		}else{//视图本身被隐藏 需要排除掉控件没有切换过去的隐藏情况
			return this.queryUpper(ele);
		}*/
		return true;
	},
	//向上查询
	queryUpper:function(ele){
		var display=$(ele).css("display");
		if(display=="none"){//元素本身是隐藏的
			return false;
		}else{
			var res=true;
			var current=ele.parentNode;
			while(current!==null){
				display=$(current).css("display");
				if(current.id=="startForm"){
					current=null;
				}else{
					if(display=="none"){
						//到了内容页
						if(current.className.indexOf("southgis_tabcontent")!=-1){
							var dataid=$(current).attr("data-parent");
							var li=$(current.parentNode).children(".southgis_tags").find(".southgis_tab_item[data-id='"+dataid+"']");
							if(li[0].style.display=='none'){
								res=false;
								current=null;
							}else{
								current=current.parentNode;
							}
						}else{
							current=null;
							res=false;
						}
					}else{
						current=current.parentNode;
					}
				}
			}
			return res;
		}
	},
	//单存隐藏
	hide:function(tabid,title){
		var content=$(document.getElementById(tabid));
		var tab=content.children(".southgis_tags").find(".southgis_tab");
		for(var i=0,len=tab.length;i<len;i++){
			if(tab[i].innerText==title){
				tab[i].parentNode.style.display="none";
				$(this.getContentPage(tab[i].parentNode.getAttribute("data-id"))).removeClass("ns_show");
				break;
			}
		}
	},
	/**
	 * @param {Element} ele 
	 * southgis_tabs或者southgis_tags标签对应的元素
	 * */
	getDataId:function(ele){
		//jquery对象
		if(ele instanceof jQuery){
			var target=ele.find(".selected");
			return target?target.attr("data-id"):null;
		}else if(ele&&ele.nodeType&&ele.nodeType==1){//html元素
			var target=ele.querySelector("*[class*='selected']");
			return target?target.getAttribute("data-id"):null;
		}else if(typeof ele=="string"){//可能是id
			return this.getDataId(document.getElementById(ele));
		}
		return null;
	},
	getContentPage:function(id){
		return document.querySelector("div[data-parent*='"+id+"']");
	}
}

loadControl.addEvent(nsTabModule,nsTabModule.init);
	
