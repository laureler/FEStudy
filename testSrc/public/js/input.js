$(function(){
	//是否执行过node
	var loaded=false;
	//视窗相关方法的封装
	var zView={
		//确定浏览器视窗大小 兼容性写法
		viewPort:function(){
			if(document.compatMode=='BackCompat'){
				return {
					width:document.body.clientWidth,
					height:document.body.clientHeight
				};
			}else{
				return {
					width:document.documentElement.clientWidth,
					height:document.documentElement.clientHeight
				}
			}
		},
		//获取元素的左边距  离左边框的距离
		getElementLeft:function(element){
			var actualLeft=element.offsetLeft;
			var current=element.offsetParent;
			while(current!==null){
			 	actualLeft+=current.offsetLeft;
			 	current=current.offsetParent;
			}
			return actualLeft;
		},
		//元素离顶部的距离  不是离窗口顶部的距离   而是页面顶部的距离
		getElementTop:function(element){
			var actualTop=element.offsetTop;
			var current=element.offsetParent; 
			while(current!==null){
			 	actualTop+=current.offsetTop;
			 	current=current.offsetParent;
			}
			return actualTop;
		},
		//获取元素的上下左右边距
		getBoundingClientRect:function(element){
			var scrollTop=document.documentElement.scrollTop;
			var scrollLeft=document.documentElement.scrollLeft;
			if(element.getBoundingClientRect){
				if(typeof arguments.callee.offset!='number'){
					var temp=document.createElement("div");
					temp.style.cssText="position: absolute;left: 0;top: 0;";
					document.body.appendChild(temp);
					arguments.callee.offset=-temp.getBoundingClientRect().top-scrollTop;
					document.body.removeChild(temp);
					temp=null;
				}
				var rect=element.getBoundingClientRect();
				var offset=arguments.callee.offset;
				return{
					left:rect.left+offset,
					right:rect.right+offset,
					top:rect.top+offset,
					bottom:rect.bottom+offset
				};			
			}else{
				var actualLeft=getElementLeft(element);
				var actualTop=getElementTop(element);
				
				return{
					left:actualLeft-scrollLeft,
					right:actualLeft+element.offsetWidth-scrollLeft,
					top:actualTop-scrollTop,
					bottom:actualTop+element.offsetHeight-scrollTop
				}
			}
		}
	};
	
	var typeCheck={
		//必填
		required:function(ele,callback){
			var obj=ele.children(".nfsm_text")[0];
			//为空
			if(!typeExec.required(obj)){
				inputControll.errorMesadd(ele,"该输入项为必输项");
				return false;
			}else{
				inputControll.removeError(ele,callback);
				return true;
			}
		},
		integer:function(ele,callback){
			var obj=ele.children(".nfsm_text")[0];
			var tem=obj.value.substring(0,1)=='-'?obj.value.substring(0,1):'';
			//先把非数字的都替换掉，除了数字 
	      	obj.value = obj.value.replace(/[^\d]/g,'');  
	      	//保证第一位不是0 
	 	  	obj.value = tem + obj.value.replace(/^[0]/g,'');
			if(!typeExec.integer(obj)){
				inputControll.errorMesadd(ele,typeExec.required(obj)?"请输入整数":"该输入项为必输项");
				return false;
			}else{
				inputControll.removeError(ele,callback);
				return true;
			}
		},
		intOrFloat:function(ele,callback){
			var obj=ele.children(".nfsm_text")[0];
			var tem=obj.value.substring(0,1)=='-'?obj.value.substring(0,1):'';
			//先把非数字的都替换掉，除了数字和.   
	      	obj.value = obj.value.replace(/[^\d\.]/g,'');     
	       	//必须保证第一个为数字而不是.     
	      	obj.value = obj.value.replace(/^\./g,'');     
	       	//保证只有出现一个.而没有多个.     
	       	obj.value = obj.value.replace(/\.{2,}/g,'.');     
	       	//保证.只出现一次，而不能出现两次以上     
	       	obj.value = tem + obj.value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
	       	
			if(!typeExec.intOrFloat(obj)){
				inputControll.errorMesadd(ele,typeExec.required(obj)?"请输入整数或小数，并确保格式正确":"该输入项为必输项");
				return false;
			}else{
				inputControll.removeError(ele,callback);
				return true;
			}
		}
	}
	
	var typeExec={
		required:function(obj){
			return obj.value!=""&&obj.value!=null;
		},
		integer:function(obj){
			//添加为空判断  没有要求不能为空时  为空返回true;
			var req=$(obj).attr("required");
			var test=/^(\-?)[1-9]+\d*$/i.test(obj.value);
			return req?test:(obj.value?test:true);
		},
		intOrFloat:function(obj){
			//添加为空判断  没有要求不能为空时  为空返回true;
			var req=$(obj).attr("required");
			var test=/^(\-?)\d+(\.\d+)?$/i.test(obj.value);
			return req?test:(obj.value?test:true);
		}
	}
	
	var inputControll={
		setValue:function(ele,value){
			ele.children(".nfsm_text").val(value);
			var res=this.validate(ele,arguments[2]);
            var extra=ele.children(".nfsm_text").attr("data-event");
            if(extra&&!ele.attr("edit")){
            	ele.attr("edit",1);
            	setTimeout(function(){
            		ele.removeAttr("edit");
            	},10);
            	try{
            		eventHandler.events[parseInt(extra)]&&eventHandler.events[parseInt(extra)].fn({"currentTarget":ele.children(".nfsm_text")[0]},res);
            	}catch(err){
            		console.error(err);
            	}
            }
		},
		getValue:function(ele){
			return ele.children(".nfsm_text").val();
		},
		clear:function(ele){
			ele.children(".nfsm_text").val("");
			//添加验证 是否有空验证
			var res=this.validate(ele,arguments[1]);
            var extra=ele.children(".nfsm_text").attr("data-event");
            if(extra){
            	ele.attr("edit",1);
            	setTimeout(function(){
            		ele.removeAttr("edit");
            	},10);
            	try{
            		eventHandler.events[parseInt(extra)]&&eventHandler.events[parseInt(extra)].fn({"currentTarget":ele.children(".nfsm_text")[0]},res);
            	}catch(err){
            		console.error(err);
            	}
            }
		},
		validate:function(ele,param){
			var type=ele.attr("validType")||ele.children(".nfsm_text").attr("required");
			if(typeCheck[type]){
				var res=typeCheck[type](ele,param);
				if(Object.prototype.toString.call(param)=="[object Function]"){
					try{
						param(typeExec[type](ele.children(".nfsm_text")[0]));
					}catch(err){
						console.error(err);
					}
				}
				return res;
			}
			return true;
		},
		updateTip:function(ele,tips){
			ele.attr("data-mes",tips);
		},
		showInputErrr:function(ele,event,mes){
			inputControll.errorMesadd(ele,mes);
			eventHandler.focusEvent(event);
		},
		errorMesadd:function(ele,mes){
			ele.addClass("nfsm_textVerify");
			if(mes)ele.attr("data-mes",mes);
			//先取消绑定事件   在重新绑定
			eventHandler.unbindMouseEvent(ele);
			eventHandler.addMouseEvent(ele);
		},
		removeError:function(ele,fn){
			ele.removeClass("nfsm_textVerify");
			//去掉鼠标事件监听
			eventHandler.unbindMouseEvent(ele);
			eventHandler.blurEvent();
			this.updateTip(ele,"");
			tooltip.hide();
			fn&&fn(ele);
		},
		input:function(ele,fn){
			//由于这个方法执行时间过早  所以需要延迟执行
			var data={"ele":ele,"fn":fn};
			eventHandler.events.push(data);
			if(loaded){
				eventHandler.singleEvent(ele,fn,eventHandler.events.length-1);
			}
		},
		isValid:function(ele){
			return ele.attr('class').indexOf("nfsm_textVerify")==-1;
		},
		validAll:function(ele){
			return $(".nfsm_textVerify").length?true:false;
		},
		init:function(){
			eventHandler.init();
			this.init=function(){
				loaded=true;
				console.log("init complete");
			};
		},
		initInnerAll:function(ele){
			var txt=ele.find(".nfsm_textbox");
			for(var i=0,len=txt.length;i<len;i++){
				if($(txt[i]).children(".nfsm_text").attr("data-event")==undefined){
					if($(txt[i]).attr("validType")||$(txt[i]).children(".nfsm_text").attr("required")){
						eventHandler.addInputEvent($(txt[i]));	
						eventHandler.addFocusEvent($(txt[i]));	
					}
				}
			}
		}
	}
	
	$.fn.nsTooltip=function(name,param){
		if(typeof name=='string'){
			switch(name){
				case "show":
					eventHandler.addMouseEvent(this);
					break;
				case "remove":
					eventHandler.unbindMouseEvent(this);
					this.removeAttr("focus-parent");
					this.removeAttr("data-mes");
					eventHandler.focusEvent({"currentTarget":this[0]});
					break;
				case "update":
					inputControll.updateTip(this,param);
					break;
				case "focus":
					eventHandler.focusEvent({"currentTarget":this[0]});;
				default:
					break;
			}
		}
	}
	
	var eventHandler={
		events:[],
		//初始化事件监听  给所有直接带有验证类型的添加输入事件和焦点事件
		init:function(){
			for(var i=0,len=this.events.length;i<len;i++){
		    	var ele=this.events[i].ele,fn=this.events[i].fn;
		    	ele.children(".nfsm_text").attr("data-event",i);
		    	if(ele.attr("validType")||ele.children(".nfsm_text").attr("required")){
					
				}else{
					ele.children(".nfsm_text").on("input",eventHandler.inputEvtEx);
				}
		    }
			$(".nfsm_textbox").each(function(){
				if(this.getAttribute("validType")||$(this).children(".nfsm_text").attr("required")){
					eventHandler.addInputEvent($(this));
					eventHandler.addFocusEvent($(this));
				}
		   });
		},
		singleEvent:function(ele,fun,index){
			ele.children(".nfsm_text").attr("data-event",index);
			if(ele.attr("validType")||ele.children(".nfsm_text").attr("required")){
				eventHandler.addInputEvent(ele);	
				eventHandler.addFocusEvent(ele);	
			}else{
				ele.children(".nfsm_text").on("input",eventHandler.inputEvtEx);
			}
		},
		addInputEvent:function(ele){
			//验证包括类型数据验证 错误信息添加和去除 鼠标事件添加和删除
			var res=inputControll.validate(ele);
			/*var extra=ele.children(".nfsm_text")[0].getAttribute("data-event");
			if(extra){
				try{
					eventHandler.events[parseInt(extra)]&&eventHandler.events[parseInt(extra)].fn(null,res);
				}catch(err){
					console.error(err);
				}
			}*/
			ele.children(".nfsm_text").on("input",eventHandler.inputEvt);
		},
		inputEvt:function(event){
			var res=inputControll.validate($(event.currentTarget).parent());
			eventHandler.focusEvent(event);
			//执行回调函数
			eventHandler.inputEvtEx(event,res);
		},
		//回调函数执行部分
		inputEvtEx:function(event){
			var extra=event.currentTarget.getAttribute("data-event");
			var res=arguments[1];
			if(extra){
				try{
					eventHandler.events[parseInt(extra)]&&eventHandler.events[parseInt(extra)].fn(event,res);
				}catch(err){
					console.error(err);
				}
			}
		},
		addMouseEvent:function(ele){
			ele.mouseenter(eventHandler.updateTooltip);
			ele.mouseleave(tooltip.hide);
			eventHandler.addFocusEvent(ele);
		},
		updateTooltip:function(event){
			if(event){
				var ins=event.currentTarget.getAttribute("focus");
				var x=event.clientX+this.offsetWidth-event.offsetX+12;
				var y=event.clientY-event.offsetY;//-(event.currentTarget.offsetHeight/2 - 9);
				if(event.target.className.indexOf("nfsm_border")!=-1||event.currentTarget.nodeName.toLowerCase()=="input"||event.currentTarget.nodeName.toLowerCase()=="textarea"){
					tooltip.update(x,y,event.currentTarget.getAttribute("data-mes"));
				}else{
					tooltip.update(x-4,y-4,event.currentTarget.getAttribute("data-mes"));
				}
				if(ins){
					tooltip.hide();
				}
			}
		},
		unbindMouseEvent:function(ele){
			ele.unbind('mouseenter',eventHandler.updateTooltip);
			ele.unbind('mouseleave',tooltip.hide);
			if(ele.is("input")||ele.is('textarea')){
				ele.unbind("focus",eventHandler.focusEvent);
				ele.unbind("blur",eventHandler.blurEvent);
			}else{
				ele.find("input").unbind("focus",eventHandler.focusEvent);
				ele.find("textarea").unbind("focus",eventHandler.focusEvent);
				ele.find("input").unbind("blur",eventHandler.blurEvent);
				ele.find("textarea").unbind("blur",eventHandler.blurEvent);
			}
		},
		addFocusEvent:function(ele){
			ele.attr("focus-parent",1);
			if(ele.is('input')||ele.is('textarea')){
				ele.focus(eventHandler.focusEvent);
				ele.blur(eventHandler.blurEvent);
			}else{
				ele.find("input").focus(eventHandler.focusEvent);
				ele.find("textarea").focus(eventHandler.focusEvent);
				ele.find("input").blur(eventHandler.blurEvent);
				ele.find("textarea").blur(eventHandler.blurEvent);
			}
		},
		focusEvent:function(event){
			if(event){
				//focus事件一般对应的是输入框 按照文本输入框的写法直接取父元素的span但是其他控件结构不一定
				var target=$(event.currentTarget).closest("[focus-parent='1']");
				target.attr("focus",true);
				//event.currentTarget.parentNode.setAttribute("focus",true);
				var mes=target.attr("data-mes");
				tooltip.focusUpdate(target[0]||target.context,mes);
				$("#formPanel").on('scroll',eventHandler.scrollHandler);
				$(".easyui-dialog[closed*='true']").on('scroll',eventHandler.scrollHandlertwo);
				tooltip.hide();
			}
		},
		scrollHandler:function(event){
			tooltip.indexSet(1000);
			clearTimeout(eventHandler.timer);
			eventHandler.timer=setTimeout(function(){
				if(document.activeElement){
					var tar=$(document.activeElement).closest("[focus-parent='1']");
					if(tar.length){
						tooltip.focusUpdate(tar[0],tar[0].getAttribute("data-mes"));
					}
				}
			},50);
		},
		scrollHandlertwo:function(event){
			clearTimeout(eventHandler.timer);
			if(event.currentTarget.scrollTop>(eventHandler.getParentTop(document.activeElement,"canvas")+document.activeElement.offsetHeight)){
				tooltip.indexSet(-1);
			}else{
				tooltip.indexSet(10000);
			}
			eventHandler.timer=setTimeout(function(){
				if(document.activeElement){
					var tar=$(document.activeElement).closest("[focus-parent='1']");
					if(tar.length){
						tooltip.focusUpdate(tar[0],tar[0].getAttribute("data-mes"));
					}
				}
			},50);
		},
		blurEvent:function(event){
			tooltip.focusHide();
			tooltip.indexSet(10000);
			if(event)$(event.currentTarget).closest("[focus-parent='1']").removeAttr("focus");
			$("#formPanel").unbind('scroll',eventHandler.scrollHandler);
			$(".easyui-dialog[closed*='true']").unbind('scroll',eventHandler.scrollHandlertwo);
		},
		//用途单一  取的元素与子表单顶部的距离
		getParentTop:function(element,clas){
			var actualTop=element.offsetTop;
			var current=element.offsetParent; 
			while(current!==null&&current.className.indexOf(clas)==-1){
			 	actualTop+=current.offsetTop;
			 	current=current.offsetParent;
			}
			return actualTop;
		}
	}
	
	//调用初始化监听 具体视情况来使用
	loadControl.addEvent(null,function(){
		$.fn.nsTextbox("init");
	});
	
	$.fn.nsTextbox=function(name,param){
		if(typeof name=='string'){
			if(inputControll[name]){
				var res=inputControll[name](this,param,arguments[2]);
				if(res!=undefined){
					return res;
				};
			}else{
				console.error(name+"方法不存在");
			}
		}
		return this.children(".nfsm_text");
	}
	
	var tooltip={
		//这个东西完全可以创建一个   然后通过改变位置来实现
		update:function(x,y,mes){
			this.show();
			if(x&&y)$("#tips_move").css({"top":y+"px","left":x+"px"});
			if(mes){$("#tips_move").children(".tip_message").html(mes)}else{
				this.hide();
			};
		},
		hide:function(){
			$("#tips_move").css({"display":"none"});
		},
		show:function(){
			$("#tips_move").css({"display":""});
		},
		focusUpdate:function(ele,mes){
			this.focusShow();
			var pos=zView.getBoundingClientRect(ele);
			//if(matchesSelector(ele))
			var x=pos.left+ele.offsetWidth+12;
			var y=pos.top+1;
			$("#tip_focus").css({"top":y+"px","left":x+"px"});
			if(mes){$("#tip_focus").children(".tip_message").html(mes)}else{
				this.focusHide();
			};
		},
		focusShow:function(){
			$("#tip_focus").css({"display":""});
		},
		focusHide:function(){
			$("#tip_focus").css({"display":"none"});
		},
		indexSet:function(index){
			$("#tip_focus").css({"z-index":index});
		}
	}
});
