
/**
 * 拖拽 类， 在控件工具栏里用到
 *   框架
 */



	var drag=function(data){
		var $this = $(this);
		var xPage;
		var yPage;
		var X;//
		var Y;//
		var xRand = 0;//
		var yRand = 0;//
		var father = $this.parent();
		var defaults = {
			move : 'both',
			randomPosition : true ,
			hander:1
		}
		var opt = $.extend({},defaults,data);
		var movePosition = opt.move;
		var random = opt.randomPosition;

		var hander = opt.hander;

		if(hander == 1){
			hander = $this;
		}else{
			hander = $this.find(opt.hander);
		}
		//---初始化
		father.css({"position":"relative","overflow":"hidden"});
		$this.css({"position":"absolute"});
		hander.css({"cursor":"move"});

		var faWidth = father.width();
		var faHeight = father.height();
		var thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'));
		var thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'));

		var mDown = false;//
		var positionX;
		var positionY;
		var moveX ;
		var moveY ;

		if(random){
			$thisRandom();
		}
		//随机函数
		function $thisRandom(){
			$this.each(function(index){
				var randY = parseInt(Math.random()*(faHeight-thisHeight));///
				var randX = parseInt(Math.random()*(faWidth-thisWidth));///
				if(movePosition.toLowerCase() == 'x'){
					$(this).css({
						left:randX
					});
				}else if(movePosition.toLowerCase() == 'y'){
					$(this).css({
						top:randY
					});
				}else if(movePosition.toLowerCase() == 'both'){
					$(this).css({
						top:randY,
						left:randX
					});
				}

			});
		}

		hander.mousedown(function(e){
			father.children().css({"zIndex":"0"});
			$this.css({"zIndex":"1"});
			mDown = true;
			X = e.pageX;
			Y = e.pageY;
			positionX = $this.position().left;
			positionY = $this.position().top;
			return false;
		});

		$(document).mouseup(function(e){
			mDown = false;
		});

		$(document).mousemove(function(e){
			xPage = e.pageX;//--
			moveX = positionX+xPage-X;

			yPage = e.pageY;//--
			moveY = positionY+yPage-Y;

			function thisXMove(){ //x轴移动
				if(mDown == true){
					$this.css({"left":moveX});
				}else{
					return;
				}
				if(moveX < 0){
					$this.css({"left":"0"});
				}
				if(moveX > (faWidth-thisWidth)){
					$this.css({"left":faWidth-thisWidth});
				}
				return moveX;
			}

			function thisYMove(){ //y轴移动
				if(mDown == true){
					$this.css({"top":moveY});
				}else{
					return;
				}
				if(moveY < 0){
					$this.css({"top":"0"});
				}
				if(moveY > (faHeight-thisHeight)){
					$this.css({"top":faHeight-thisHeight});
				}
				return moveY;
			}

			function thisAllMove(){ //全部移动
				if(mDown == true){
					$this.css({"left":moveX,"top":moveY});
				}else{
					return;
				}
				if(moveX < 0){
					$this.css({"left":"0"});
				}
				if(moveX > (faWidth-thisWidth)){
					$this.css({"left":faWidth-thisWidth});
				}

				if(moveY < 0){
					$this.css({"top":"0"});
				}
				if(moveY > (faHeight-thisHeight)){
					$this.css({"top":faHeight-thisHeight});
				}
			}
			if(movePosition.toLowerCase() == "x"){
				thisXMove();
			}else if(movePosition.toLowerCase() == "y"){
				thisYMove();
			}else if(movePosition.toLowerCase() == 'both'){
				thisAllMove();
			}
		});
	};
	exports.drag=drag;
	/**
	 * 原生的JS 拖动 类----
	 */
	function DragNode(){
		this.initialize.apply(this, arguments)
	};
	DragNode.prototype={
		initialize : function (drag, options){
			this.drag = this.$(drag);
			//console.log(this.drag,drag);
			this._x = this._y = 0;
			this._moveDrag = this.bind(this, this.moveDrag);
			this._stopDrag = this.bind(this, this.stopDrag);
			this.setOptions(options);
			this.handle = this.$(this.options.handle);
			this.maxContainer = this.$(this.options.maxContainer);
			this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
			this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;
			this.limit = this.options.limit;
			this.lockX = this.options.lockX;
			this.lockY = this.options.lockY;
			this.lock = this.options.lock;
			this.onStart = this.options.onStart;
			this.onMove = this.options.onMove;
			this.onStop = this.options.onStop;
			this.handle.style.cursor = "move";
			this.changeLayout();
			if(options.initpostion){
				//this.handle
				this.initpostion=options.initpostion;
			}
			this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag));

		},
		changeLayout : function ()
		{
			if(this.drag.offsetTop==0&&this.drag.offsetLeft==0){

			}else{
				this.drag.style.top = this.drag.offsetTop + "px";
				this.drag.style.left = this.drag.offsetLeft + "px";
			}
//			console.log(this.drag.offsetTop,this.drag.offsetLeft);

			this.drag.style.position = "absolute";
			this.drag.style.margin = "0"
		},
		//点击后 调用 开始拖动
		startDrag : function (event){
			document.body.style.cursor="move";
			var event = event || window.event;

			this._x = event.clientX - this.drag.offsetLeft;
			this._y = event.clientY - this.drag.offsetTop;

			this.addHandler(document, "mousemove", this._moveDrag);
			this.addHandler(document, "mouseup", this._stopDrag);

			event.preventDefault && event.preventDefault();
			this.handle.setCapture && this.handle.setCapture();

			if(this.initpostion){
				this.initpostion.ele.css({
					top:this._y,
					left:this._x
				});
//				this.initpostion.ele.show();
				this.initpostion.ele.empty();
				//clone
				var clone=this.handle.cloneNode();
				var cn=clone.getAttribute('title');
				this.initpostion.ele.html(cn);
				this.initpostion.ele.append(clone);
				this.initpostion.tid=this.handle.getAttribute('data-id');//data-id="imagebox"
				this.initpostion.event=event;
			}

			this.onStart()
		},
		// 跟随鼠标移动事件
		moveDrag : function (event){
//			console.log(event.pageX,event.pageY,'------------');
			var xx=document.elementFromPoint(event.pageX,event.pageY);
			//console.log(xx);
			$(xx).trigger('touchenter');


			var event = event || window.event;

			var iTop = event.clientY - this._y;
			var iLeft = event.clientX - this._x;

			if(this.initpostion){
				iTop=iTop+this._y;
				iLeft=iLeft+this._x;
			}

			if (this.lock) return;

			this.limit && (iTop < 0 && (iTop = 0), iLeft < 0 && (iLeft = 0), iTop > this.maxTop && (iTop = this.maxTop), iLeft > this.maxLeft && (iLeft = this.maxLeft));

			this.lockY || (this.drag.style.top = iTop + "px");
			this.lockX || (this.drag.style.left = iLeft + "px");

			event.preventDefault && event.preventDefault();

			this.onMove()
		},
		// 松开鼠标触发事件
		stopDrag : function (event){
			document.body.style.cursor="auto";
			this.removeHandler(document, "mousemove", this._moveDrag);
			this.removeHandler(document, "mouseup", this._stopDrag);
			if(this.initpostion){
				this.initpostion.ele.hide();
				//dragEnd
//				console.log(event);
				this.initpostion.dragEnd(this.initpostion.tid,this.initpostion.event,{ele:event.target,x:event.clientX,y:event.clientY});
			}
			this.handle.releaseCapture && this.handle.releaseCapture();

			this.onStop()
		},
		//参数设置
		setOptions : function (options){
			this.options ={
				handle:			this.drag, //事件对象
				limit:			true, //锁定范围
				lock:			false, //锁定位置
				lockX:			false, //锁定水平位置
				lockY:			false, //锁定垂直位置
				maxContainer:	document.documentElement || document.body, //指定限制容器
				onStart:		function () {}, //开始时回调函数
				onMove:			function () {}, //拖拽时回调函数
				onStop:			function () {}  //停止时回调函数
			};
			for (var p in options) this.options[p] = options[p]
		},
		//获取id
		$ : function (id)
		{
			return typeof id === "string" ? document.getElementById(id) : id
		},
		//添加绑定事件
		addHandler : function (oElement, sEventType, fnHandler)
		{
			return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
		},
		//删除绑定事件
		removeHandler : function (oElement, sEventType, fnHandler)
		{
			return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
		},
		//绑定事件到对象
		bind : function (object, fnHandler)
		{
			return function ()
			{
				return fnHandler.apply(object, arguments)
			}
		}
	};
	exports.DragNode=DragNode;

