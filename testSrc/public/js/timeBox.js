/*时间控件*/
/*事件的话 先使用change事件试试*/
var timePicker={
	eve:[],
	//初始化事件
	init:function(){
		var _this=this;
		var timeBox=$(".Wdate");
		for(var i=0,len=timeBox.length;i<len;i++){
			if(timeBox[i].getAttribute("required")){
				this.Input($(timeBox[i]));
			}
		}
		i=0;
		len=this.eve.length;
		for(;i<len;i++){
			this.eve[i].dom.setAttribute("data-fun",i);
			if(!this.eve[i].dom.getAttribute("required")){
				$(this.eve[i].dom).on("input",function(event){
					_this.extraHandler($(this));
				});
			}
		}
	},
	
	Input:function(jq){
		this.validate(jq);
		jq.on("input",this.inputHandler);
	},
	addEvent:function(ele,fun){
		this.eve.push({"dom":ele,"fun":fun});
	},
	validate:function(jq){
		if(jq.val()==""||jq.val()==null){
			jq.attr("data-mes","该项为必填项");
			jq.attr("old-value",jq.val());
			jq.addClass("textbox-invalid-important");
			jq.nsTooltip("show");
		}else{
			jq.removeClass("textbox-invalid-important");
			jq.nsTooltip("remove");
			var index=jq.attr("data-fun");
			if(index){
				try{
					if(jq.attr("old-value")!=undefined){
						if(jq.attr("old-value")!=jq.val()){
							jq.attr("old-value",jq.val());
							this.eve[parseInt(index)]&&this.eve[parseInt(index)].fun(jq);
						}
					}else{
						jq.attr("old-value",jq.val());
						this.eve[parseInt(index)]&&this.eve[parseInt(index)].fun(jq);
					}
				}catch(e){
					console.error(e);
				}
			}
		}
	},
	inputHandler:function(event){
		timePicker.validate($(event.target));
		$(event.target).nsTooltip("focus");
	},
	extraHandler:function(jq){
		if(jq.attr("required")){
			timePicker.validate(jq);
			jq.nsTooltip("focus");
		}else{
			var index=jq.attr("data-fun");
			if(index){
				try{
					if(jq.attr("old-value")!=undefined){
						if(jq.attr("old-value")!=jq.val()){
							jq.attr("old-value",jq.val());
							this.eve[parseInt(index)]&&this.eve[parseInt(index)].fun(jq);
						}
					}else{
						jq.attr("old-value",jq.val());
						this.eve[parseInt(index)]&&this.eve[parseInt(index)].fun(jq);
					}
				}catch(e){
					console.error(e);
				}
			}
		}
	}
}

loadControl.addEvent(timePicker,timePicker.init);
