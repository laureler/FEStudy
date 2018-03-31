<!-- 面向 渲染引擎的tab标签页 -->
/**
 * 1. 运行环境ie11以上 浏览器
 * 2. 以来jQuery1.9版本年以上
 * 3. 使用方法：
 *      tabsUI.init() 初始化所有标签页
 * 4. 标签页依赖规则 查看md文档
 *
 *
 */
// 功能点：
/**
 * 1. init: 初始化 所有的标签页
 *  1.1 （具有多个标签页的，可以点击切换）
 * 2.
 */
// 依赖 tab-${uuid} panel-${uuid}
(function (document, window, $,environment) {
	
	var TabsUI = function () {
		function tabsUI(element, config) {
			this._element = element
			this._config = config
		}
		
		// public methods
		
		var config = {
			targetIds: ['tab1-1', 'tab2-2'], //当前所有的id属性将会获得焦点
		}
		
		//为所有的标签页统一绑定事件
		
		var _prototype = TabsUI.prototype
		/**
		 *
		 * @param config {{}}
		 * config.targetIds
		 *
		 */
		_prototype.init = function (config) {
			this.getTargetById(config)
			/*this.checkTitles(config)*/
			this.initEvents(config)
		}
		/**
		 *  设置标签页的定位信息
		 * @param newPosition    标签页会按照该参数转换定位
		 * @param elementId  根据对应的id属性来 控制位置 todo 若没有ID信息，则应当把所有的 标签页统一移动位置信息？那么定位应当统一
		 */
		_prototype.TooglePosition = function (newPosition,elementId) {
			
			var positionArr = ['top', 'left', 'bottom', 'right']
			let $Tab
			let oldPosition
			let tabOldStr
			let tabNewStr
			let isOldStr
			let isNewStr
			let translateXYStr
			
			let error = null
			try {
				
				$Tab = $('#' + elementId).length == 0 ? $('[rel="tabs"]') : $('#' + elementId)
				if($Tab.length > 1) {
					
					for (var i = 0; i < $Tab.length; i++) {
						var $tabItem = $Tab[i];
						this.TooglePosition(newPosition,$tabItem.id)
					}
				}
				var matchResult
				var classList = $Tab.children()[0].classList
				for (var i = 0; i < classList.length; i++) {
					matchResult = /el-tabs--/.exec(classList.item(i))
					if (matchResult !== null && positionArr.includes(matchResult.input.split('-')[matchResult.input.split('-').length - 1])) {
						break
					}
				}
				// console.log(matchResult)
				oldPosition = $Tab.attr('position') || matchResult.input.split('-')[matchResult.input.split('-').length - 1]
				if (!(positionArr.includes(newPosition) || positionArr.includes(oldPosition))) return
				
				tabOldStr = 'el-tabs--' + oldPosition
				tabNewStr = 'el-tabs--' + newPosition
				isOldStr = 'is-' + oldPosition
				isNewStr = 'is-' + newPosition
				this.showLog(tabOldStr)
				this.showLog(tabNewStr)
				this.showLog(isOldStr)
				this.showLog(isNewStr)
				translateXYStr = (newPosition == 'top' || newPosition == 'bottom') ? 'Y' : 'X'
				
				var $tabDiv = $Tab.find('.' + tabOldStr)
				var $isDiv = $Tab.find('.' + isOldStr)
				var $transFormNavDiv = $Tab.find('.el-tabs__nav')
				
			} catch (e) {
				//若中间环节出错 则不再进行操作 并处理错误信息
				error = e
				console.error(e)
			}
			if (!error) {
				$Tab.attr('position', newPosition)
				$tabDiv.removeClass(tabOldStr).addClass(tabNewStr)
				$isDiv.removeClass(isOldStr).addClass(isNewStr)
				$transFormNavDiv.attr('style', 'transform: translate' + translateXYStr + '(0px);')
			}
		}
		/**
		 * 根据标签页 选中项的ID属性来 取得对应的目标
		 * @param idValues {[]} 数组结构/字符串 若为数组结构 第二个参数失效
		 * @param vision 是否自动切换到可视区域 若为true则当前 id对应的标签页应当切换到可视区域 默认值为false
		 */
		_prototype.getTargetById = function (idValues, vision) {
			//参数安全类型检查
			if (idValues == undefined) return
			if (idValues.constructor.name === 'Array' && idValues.length != undefined) {
				for (var i = 0; i < idValues.length; i++) {
					var idValue = idValues[i]
					let elementById = document.getElementById(idValue)
					if (elementById == null) continue
					this.switchTabs(idValue)
				}
			}
			//id类型为非数组结构 启动第二个参数检查
			else if (idValues.constructor.name === 'String' && idValues != '') {
				//参数安全类型检查
				let idValue = idValues
				vision = vision || false
				//idElement 根据idValue获取对应的DOM元素
				let idElement = document.getElementById(idValue);
				if(idElement === null){
					this.showLog('没有查询到对应的 DOM元素')
					return;
				}
				// 设置选择模式
				let type = ''
				if(idValue.split('-')[0] ==='tab'){
					type = 'selectTab'
				}
				if(idElement.getAttribute('rel') === 'tabs'){
					type = 'selectTabs'
				}
				if(idElement.getAttribute('isControl' === 'true')){
					type = 'selectControl'
				}
				switch (type){
					// 以tab开头的 选项卡div元素 单纯的做切换
					case 'selectTab':
						this.switchTabs(idValue)
						if(vision === true){
							//todo 获取当前选项卡所处的标签页id
							//todo 不断地向外递归查找
						}
						break;
					//若当前的id是标签页控件
					case 'selectTabs':
						// todo 标签页不切换焦点
						//todo 标签页应该向外查找对应的id
						break;
					//若当前的id选中时标签页
					case 'selectControl':
						// todo 不断向外查找标签页并且切换
						// todo 若没有就算了
						break;
				}
			}
		}
		/**
		 * 根据id切换标签页的选项卡
		 * @param tab_id
		 */
		_prototype.switchTabs = function (tab_id) {
			let uuid = tab_id.split('-')[1]
			if (uuid == undefined) return
			$('#' + tab_id).addClass('is-active').siblings('div').removeClass('is-active')
			$('#pane-' + uuid).siblings('div').hide()
			$('#pane-' + uuid).show()
		}
		_prototype.initEvents = function () {
			var _this = this
			// todo 先检查 在滚动事件
			console.log('检查标题长度并且绑定滚动事件')
			
			//绑定点击切换事件
			// todo 事件绑定只应该执行一次
			var clickFunction = function (e) {
				let selectedId = $(e.target).attr('id')
				if (selectedId !== undefined && $(e.target).parent().attr('role') === 'tablist') {
					_this.getTargetById(selectedId)
				}
			}
			$('[rel="tabs"]').on('click', clickFunction)
			//
			console.log('绑定滚动事件')
		}
		_prototype.showLog = function (msg) {
			if(environment =='dev'){
				console.log(msg)
			}
		}
	}
	// exports
	window.tabsUI = new TabsUI()
	
})(document, window, $,'dev')

/**
 *    动态切换标签页的 id属性
 * @param elementId      标签页的id
 * @param newPosition    新定位
 * @param oldPosition    旧定位
 * todo 旧定位是应该传递进来 还是自行去DOM里面去判断？
 * todo 底部定位有问题
 */
window.test = function (elementId, newPosition) {
	
	var positionArr = ['top', 'left', 'bottom', 'right']
	let $Tab
	let oldPosition
	let tabOldStr
	let tabNewStr
	let isOldStr
	let isNewStr
	let translateXYStr
	
	let error = null
	try {
		$Tab = $('#' + elementId)
		var matchResult
		var classList = $Tab.children()[0].classList
		for (var i = 0; i < classList.length; i++) {
			matchResult = /el-tabs--/.exec(classList.item(i))
			if (matchResult !== null && positionArr.includes(matchResult.input.split('-')[matchResult.input.split('-').length - 1])) {
				break
			}
		}
		// console.log(matchResult)
		oldPosition = $Tab.attr('position') || matchResult.input.split('-')[matchResult.input.split('-').length - 1]
		if (!(positionArr.includes(newPosition) || positionArr.includes(oldPosition))) return
		
		tabOldStr = 'el-tabs--' + oldPosition
		tabNewStr = 'el-tabs--' + newPosition
		isOldStr = 'is-' + oldPosition
		isNewStr = 'is-' + newPosition
		console.log(tabOldStr)
		console.log(tabNewStr)
		console.log(isOldStr)
		console.log(isNewStr)
		translateXYStr = (newPosition == 'top' || newPosition == 'bottom') ? 'Y' : 'X'
		
		var $tabDiv = $Tab.find('.' + tabOldStr)
		var $isDiv = $Tab.find('.' + isOldStr)
		var $transFormNavDiv = $Tab.find('.el-tabs__nav')
		
	} catch (e) {
		//若中间环节出错 则不再进行操作 并处理错误信息
		error = e
		console.error(e)
	}
	if (!error) {
		$Tab.attr('position', newPosition)
		$tabDiv.removeClass(tabOldStr).addClass(tabNewStr)
		$isDiv.removeClass(isOldStr).addClass(isNewStr)
		$transFormNavDiv.attr('style', 'transform: translate' + translateXYStr + '(0px);')
	}
}

/**
 * 为所有的标签页增加scroll滚动事件
 * @param id 标签页的id属性值
 */
window.addScroll = function (id) {
	var tabElement = document.getElementById(id);
	var tab_navWrap = tabElement.getElementsByClassName('el-tabs__nav-wrap')[0];
	tab_navWrap.classList.add('is-scrollable');
	
	// todo 增加 span*2 （两个左右标记）
	// todo ['role="tablist"'] 外部增加一层 div.el-tabs__nav-scroll
	// todo el-tabs__item 加 isclosable
	
}
