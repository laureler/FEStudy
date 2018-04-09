/**
 * 添加鼠标滚轮监听
 * 
 * */
loadControl.addEvent(null,function(){
	if(document.addEventListener){
	    document.addEventListener('DOMMouseScroll',mouseScrollFun,false);
	}
	//IE及其他浏览器
	window.onmousewheel = document.onmousewheel=mouseScrollFun;
	$(".ct-list").on("scroll",function(e){
		topArr=[];
		bottomArr=[];
		clearTimeout(mousTimer);
	});
	$(".datagrid-body").on("scroll",function(e){
		topArr=[];
		bottomArr=[];
		clearTimeout(mousTimer);
	});
});

var topArr=[],bottomArr=[],mousTimer,scrollNum=8;

function mouseScrollFun(event){
	event = event || window.event;  
	var path=event.path;
	var target=event.target,Class=target.className,isPopup=false;
	if(!(Class=="window-shadow")&&!(Class=="window-mask")&&$(target).closest(".viewer-container").length==0){
		isPopup=$(target).closest(".window").length>0;
		if(!isPopup){
			var panel=document.getElementById("formPanel");
			var top=panel.scrollTop;
			var bottom=panel.scrollHeight-panel.clientHeight-top;
			if (event.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
	            if (event.wheelDelta > 0) { //当滑轮向上滚动时  
	            	if(top==0){
	            		if(topArr.length<scrollNum){
	            			topArr.push(0);
	            			clearTimeout(mousTimer);
	            			mousTimer=setTimeout(function(){
	            				topArr=[];
	            			},1000);
	            		}else{
	            			topArr=[];
	            			clearTimeout(mousTimer);
	            			//切换页面
	            			mouseScroll.prev();
	            		}
	            	}else{
	            		topArr=[];
            			clearTimeout(mousTimer);
	            	}
	            }  
	            if (event.wheelDelta < 0) { //当滑轮向下滚动时  
	            	if(bottom<=1){
	            		if(bottomArr.length<scrollNum){
	            			bottomArr.push(0);
	            			clearTimeout(mousTimer);
	            			mousTimer=setTimeout(function(){
	            				bottomArr=[];
	            			},1000);
	            		}else{
	            			bottomArr=[];
	            			clearTimeout(mousTimer);
	            			//切换页面
	            			mouseScroll.next();
	            		}
	            	}else{
	            		bottomArr=[];
            			clearTimeout(mousTimer);
	            	}
	            }  
	        } else if (event.detail) {  //Firefox滑轮事件  
	            if (event.detail< 0) { //当滑轮向上滚动时  
	            	if(top==0){
	            		if(topArr.length<scrollNum){
	            			topArr.push(0);
	            			clearTimeout(mousTimer);
	            			mousTimer=setTimeout(function(){
	            				topArr=[];
	            			},1000);
	            		}else{
	            			topArr=[];
	            			clearTimeout(mousTimer);
	            			//切换页面
	            			mouseScroll.prev();
	            		}
	            	}else{
	            		topArr=[];
            			clearTimeout(mousTimer);
	            	}
	            }  
	            if (event.detail> 0) { //当滑轮向下滚动时 
	            	if(bottom<=1){
	            		if(bottomArr.length<scrollNum){
	            			bottomArr.push(0);
	            			clearTimeout(mousTimer);
	            			mousTimer=setTimeout(function(){
	            				bottomArr=[];
	            			},1000);
	            		}else{
	            			bottomArr=[];
	            			clearTimeout(mousTimer);
	            			//切换页面
	            			mouseScroll.next();
	            		}
	            	}else{
	            		bottomArr=[];
            			clearTimeout(mousTimer);
	            	}
	            }  
	        }
		}
	}
}

/**鼠标滚轮具体操作*/
var mouseScroll={
	prev:function(){
		//currentTarget：ul   target：li
		var box=$(".canvas").children(".southgis_box");
		if(box.length){
			var currentTarget=box.children(".southgis_tags").children(".southgis_tabs");
			var target=currentTarget.find(".selected").prev();
			while(target.length&&target[0].style.display=="none"){
				target=target.prev();
			}
			if(target.length){
				nsTabModule.eventHandler({"target":target[0],"currentTarget":currentTarget[0]});
				document.getElementById("formPanel").scrollTop=0;
			}
		}
	},
	next:function(){
		//currentTarget：ul   target：li
		var box=$(".canvas").children(".southgis_box");
		if(box.length){
			var currentTarget=box.children(".southgis_tags").children(".southgis_tabs");
			var target=currentTarget.find(".selected").next();
			while(target.length&&target[0].style.display=="none"){
				target=target.next();
			}
			if(target.length){
				nsTabModule.eventHandler({"target":target[0],"currentTarget":currentTarget[0]});
				document.getElementById("formPanel").scrollTop=0;
			}
		}
	}
}
