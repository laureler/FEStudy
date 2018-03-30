<!-- 面向 渲染引擎的tab标签页 -->
//依赖 jquery >1.9
// 依赖 tab-${uuid} panel-${uuid}
(function (document, window, $) {
	
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
			this.toogleTabs(config)
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
		 * 切换
		 * 根据标签页 选中项的ID属性切换到对应的选项卡
		 * @param idValues {[]}
		 */
		_prototype.toogleTabs = function (idValues) {
			if (idValues == undefined) return
			if (idValues.constructor.name === 'Array' && idValues.length != undefined) {
				for (var i = 0; i < idValues.length; i++) {
					var idValue = idValues[i]
					let elementById = document.getElementById(idValue)
					if (elementById == null) continue
					this.switchTabs(idValue)
				}
			}
			else if (idValues.constructor.name === 'String' && idValues != '') {
				this.switchTabs(idValues)
			}
		}
		/**
		 * 根据id切换标题与面板
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
					_this.toogleTabs(selectedId)
				}
			}
			$('[rel="tabs"]').on('click', clickFunction)
			//
			console.log('绑定滚动事件')
		}
	}
	// exports
	window.tabsUI = new TabsUI()
	
})(document, window, $)

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
