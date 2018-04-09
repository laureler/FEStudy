$(function(){
	window.onload=function(){
		loadControl.init();
	};
});

var loadControl={
	stack:[],
	init:function(){
		function exec(i){
	    	if(i<loadControl.stack.length){
	    		if(loadControl.stack[i].field){
	    			loadControl.stack[i].func.call(loadControl.stack[i].field);
	    		}else{
	    			loadControl.stack[i].func();
	    		}
	    		exec(i+1);
	    	}else{
	    		loadControl.stack=[];
	    	}
	    }
		setTimeout(function(){exec(0);},50);
	},
	addEvent:function(content,fun){
		if(Object.prototype.toString.call(fun)=="[object Function]"){
			this.stack.push({"field":content,"func":fun});
		}
	}
}
