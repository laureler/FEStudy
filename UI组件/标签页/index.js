(function (global) {
	'use strict'
	global.pageUI = function (element, options) {
		// todo 测试使用默认值
		element = document.createElement('div')
		element.classList.add('pageUI')
		options = {
			[
			  title: '标签页测试',
			id: new Date().getTime()
	]
	}
		try {
			//检查参数结果
			var checkResult = checkOptions(element, options)
			switch (checkResult) {
				// 无参数构造
				case 0:

					break
				case '-1':
					break
				case 1:
					break
			}
			this.element = element || ''
			this.options = options
		} catch (e) {
			console.error(e)
		}

	}
	/**
	 * 生成标签页的选项卡信息
	 *    1. 默认标签页没有数据，就生成一次信息
	 *    2. 当新建标签页的时候 也需要新建一次信息
	 *    @return { options }
	 */
	pageUI.generatorOptions = function () {
		var newOptions = {
			title: '标签' + this.options.title.length + 1,
			id: '选项卡的id',
		}
		return newOptions
	}

	/**
	 * 检查参数 是否正确
	 * @param element    page元素的根节点
	 * @param options    page元素的选项
	 *    options:{[
	 * 		title:'标签页标题',
	 * 		id:'选项卡Id'
	 * 	]}
	 * @return {result msg}  0代表无参数构造，应当生成默认参数；1代表通过。-1代表不通过参数检查
	 */
	function checkOptions (element, options) {
		var result = {
			status: 1,
			msg: '通过'
		}
		if (element != undefined) {
			result.status = -1
			result.msg = '没有element参数'
		} else if (options.length <= 0) {
			result.status = 0
		}
		return result
	}
})(window)