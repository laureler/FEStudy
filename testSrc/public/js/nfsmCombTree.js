// 全部调用的引用都可以持有
(function nfsmTreeJS(global) {
  $.fn.nsCombTreeChange = function (fun) {
    nfsmCombTree.setChangeFunById(this[0].id, fun);
  };


  var Tree = function () {
    var countNumber = 0;
    var countArray = new Map();
    var countEleData = new Map();
    var countChangeFun = new Map();
    var onloadInitList = [];

    this.pushInitTree = function (id) {
        onloadInitList.push(id);
    }
    this.onloadInit = function (id) {
        loadControl.addEvent(null,function(){
            for(var i=0,len=onloadInitList.length; i<len; i++){
                nfsmCombTree.initTree(onloadInitList[i]);
            }
            onloadInitList.length=0;
            //$(document).trigger('click');
        });
    };
    
    this.batchInit = function(){
    	for(var i=0,len=onloadInitList.length; i<len; i++){
            nfsmCombTree.initTree(onloadInitList[i]);
        }
        onloadInitList.length=0;
    };

    this.showTree = function(event){

      var el = $(event.target);
      var divEl = null;
      if(!el.hasClass("nfsm-combTree")){ // 获取外壳dom元素
        divEl = el.parent();
      }else{
        divEl = el;
      }

      if(divEl.find(".ct-list-showCheck").attr("disabled")){return false;} // disabled：禁止任何操作
      if(el.hasClass("ct-input") && !el[0].readOnly){return false;} // readonly：禁止输入。存在readonly的情况，即是禁止输入，并且点击输入框可以弹出下拉框。不存在readonly情况是不允许弹下拉框
      if(el.is("I")){
        nfsmCombTree.getInstance(divEl)?nfsmCombTree.getInstance(divEl).clean():'';return;
      }

      nfsmCombTree.initTree(divEl.attr('id'));
        // 点击非showCheck元素，切换下拉框显示隐藏
        var flag = null;
        if(el.hasClass("ct-list-showCheck")){
          flag = !el[0].checked;
        }
        var showCheck = divEl.find(".ct-list-showCheck").eq(0);
        var ulList = divEl.find(".ct-list-showCheck").eq(0);
        flag===null?flag = showCheck[0].checked:"";
        $('.ct-list').css('display', 'none');
        $('.ct-list-showCheck').attr('checked', false);
        var table = divEl.parents(".ui-widget-content");
        if(table.length>0){
          table = table.eq(0);
        }else{
          table=null;
        }
        if(flag){
          table?table.css("z-index",table.eq(0).attr("data-z-index")):"";
          showCheck[0].checked = false;
        }else{
          table?table.attr("data-z-index",table.css("z-index")).css("z-index",100):"";
          showCheck[0].checked = true;
        }


    }

    this.initTree = function (id, flag) {
      var config = {};
      var result = nfsmCombTree.getInstance(id,flag);
      if (!result) {
        var _dom = $(document.getElementById(id));
        var ops = _dom.attr('data-option') != null ? _dom.attr('data-option').split(",") : [];
        for (var i = 0, len = ops.length; i < len; i++) {
          var arr = ops[i].split(':');
          arr[0] && arr[1] ? config[arr[0]] = arr[1] : '';
        }
        _dom.attr('data-showPanel') != null ? config['showPanel']=_dom.attr('data-showPanel') : '';
        result = nfsmCombTree.init(id, config);
        var _data = nfsmCombTree.getDataByEleId(id);
        (_data && _data.data.length>0)?setMultiSelectValue(id, _data.data, _data.val):'';
      }
      result = nfsmCombTree.getInstance(id,flag);
      return result;
    }

    /**通过控件的id，获取当前控件的数据与需要过滤的数据 
     */
    this.getDataByEleId = function (_id) {
      return countEleData.get(_id);
    };

    /** 通过控件的id，存储当前控件的数据与需要过滤的数据
     */
    this.setDataByEleId = function (_id, _data, _val) {
      countEleData.set(_id, {
        data: _data,
        val: _val
      });
    };

    /** 通过控件的id，存储当前控件的onchange值改变触发的事件
     */
    this.setChangeFunById = function (_id, fun) {
      countChangeFun.set(_id, fun);
    };

    /** 通过控件的id，获取当前控件的onchange值改变触发的事件
     */
    this.getChangeFunById = function (_id) {
      return countChangeFun.get(_id);
    };

    this.closeTree = function () {
        document.addEventListener('click', function (event) {
            if ($(event.target).parent('.nfsm-combTree').length > 0) {
                return false;
            }
            $('.ct-list').css('display', 'none');
            $('.ct-list-showCheck').attr('checked', false);
        });
    };

    this.validataFun = function(el, text){
      var _jq = $(el);
      if(text){
        _jq.attr("data-mes",text);
        _jq.addClass("textbox-invalid-important");
        _jq.nsTooltip("show");
        // _jq.nsTooltip("focus");
      }else{
        _jq.removeClass("textbox-invalid-important");
        _jq.nsTooltip("remove");
      }
    };

    function getInstanceFun (_temp){
      var rs = null;
      if (typeof (_temp) == "string") {
        rs = countArray.get(_temp) || null;
      }
      if (_temp && _temp.nodeType == 1) {
        _temp = $(_temp);
      }
      if (_temp && _temp instanceof jQuery) {
        if (_temp.eq(0).attr("id") && countArray.get(_temp.eq(0).attr("id"))) {
          rs = countArray.get(_temp.eq(0).attr("id"));
        } else if (_temp.parents('.nfsm-combTree') && countArray.get(_temp.parents('.nfsm-combTree').attr("id"))) {
          rs = countArray.get(_temp.parents('.nfsm-combTree').attr("id"));
        }
      }
      return rs;
    }

    // 获取实例
    this.getInstance = function (_temp,flag) {
      var rs = getInstanceFun(_temp);
      if(!flag){
    	  if(rs && rs.getShowPanel){
    		  eval(rs.getShowPanel());
    	  }
      }
      return rs;
    }
    // 获取实例
    this.getInstanceEval = function (_temp) {
      return getInstanceFun(_temp);
    }

    this.init = function (HTMLElement, config) {

      /**
       * @param HTMLElement   检查参数1
       * @param config        检查参数2
       * @param callback      检查完毕参数回调
       */
      var argumentsCheck = function (HTMLElement, config, callback) {
        // console.log('检查分类，检查到不同类型，返回不同参数')
        if (!HTMLElement) {
          throw "id不能为空";
        }
        if (!config.url && !config.data) {
          throw "url或者数据不能为空";
        }
      };

      // 定义初始化tree的方法
      function tree(HTMLElement, config) {
        var _this = this;
        var _data = [];
        // let _reData = []; // 存储转换过的数据，通过下标来搜索
        var _dom = null;
        var _checkList = new Map(); // 选中的checkbox对应的值
        var _selectList = []; //
        var collect = {
          url: config.url || '',
          data: config.data || nfsmCombTree.getDataByEleId(HTMLElement) || [],
          checkbox: '',
          isSingle: '',
          checkNodeByKey: {}, // 根据key，存储节点对应的checkbox的target
          checkNodeByText: {}, // 根据text，存储节点对应的checkbox的target
          rsVal: {},
          rootDatas : [],
          required: config.required?config.required.trim():'',
          showPanel:config.showPanel,
          styleId: "",
          screenType:0 // 1 为过滤所有节点，0 为只过滤子节点
        };

        _this.getShowPanel = function(){
          return collect.showPanel || null;
        };

        /**
         * 选中节点事件监听
         */
        collect.bindEvent = function () {
          _dom.find('.ct-input').eq(0).bind({
              'keyup':function(event){
                $(event.target).val()?_dom.find('.ct-clean').show():_dom.find('.ct-clean').hide();
                var val = $(event.target).val();
                if (val) {
                    var vals = collect.isSingle ? [val] : val.split(',');
                    _this.clean(1);
                    for (var i = 0, len = vals.length; i < len; i++) {
                        collect.checkedDeal(vals[i], 0, true, 1);
                    }
                    if (collect.isSingle) {$(event.target).val(val)}
                }
                isCallback(event.target);
                return false;
              },
              'change':function (event) {
                  isCallback(event.target);
                },
          });

          // 根据输入框，判断是否清除必填样式，和判断是否需要执行回调函数
          var isCallback = function (_input) {
              var rs = [];
              for(var key in collect.rsVal){
                  if(collect.rsVal[key] && collect.rsVal[key].key){
                      rs.push(collect.rsVal[key].text);
                  }
              }
              var val = rs.join(",");
              $(_input).val()?_dom.find('.ct-clean').show():_dom.find('.ct-clean').hide();
              var callFun = nfsmCombTree.getChangeFunById(_dom.attr('id'));
              if(collect.required){
                  if(!$(_input).val()){
                      nfsmCombTree.validataFun($(_input),"该输入项为必输入项");
                  }else{
                      nfsmCombTree.validataFun($(_input));
                  }
              }
              if(callFun!=null){
                  if($(_input).attr("data-oldValue")==undefined){
                      //第一次执行
                      $(_input).attr("data-oldValue",val);
                      callFun();
                  }else{
                      if($(_input).attr("data-oldValue")!=val){
                          $(_input).attr("data-oldValue",val);
                          callFun();
                      }
                  }
              }else{
                  if($(_input).val()){
                      nfsmCombTree.validataFun($(_input));
                  }
              }
              $(_input).nsTooltip("focus");
          }


          // 监听事件
          _dom.find(".node-content>div").click(function (event) {
            _dom.removeAttr("none-trigger"); // 去除判断能否点击下拉框事件的限制条件
            var _thisDom = event.target;
            // 展开事件监听
            if (_thisDom.tagName == "I" && _thisDom.className.indexOf("icon-expand") >= 0) {
              var _ldom = $(_thisDom).parent().next();
              _ldom.hasClass("disp-none") ? _ldom.removeClass("disp-none") : _ldom.addClass(
                "disp-none");
              return false;
            }

            // 监听选中事件
            if (_thisDom.tagName == "INPUT" && _thisDom.className.indexOf("node-check") >= 0) {
              collect.checkedDeal(_thisDom.value.split(',')[1], 1, _thisDom.checked);
                _dom.find(".ct-input").change();
              return false;
            }

            var _thisDom = $(this).find('.node-check')[0];
            collect.checkedDeal(_thisDom.value.split(',')[1], 1, !_thisDom.checked);
              _dom.find(".ct-input").change();
            return false;
          });
        }
        
        _this.loadData = function (rs) {
          var _countAll = 0;
          var _html = '<ul class="tree" style="width: fit-content;min-width:100%;">';

          function setTree(tree, count) {
            count++;
            for (var i = 0; i < tree.length; i++) {
              var hasChild = tree[i].children != null && tree[i].children.length > 0 ? true : false;
              _html += '<li class="tree-node">' +
                '<div class="node-content' + (hasChild ? "" : " node-leaf") + '" data-filter="' + tree[i].id + '"data-filterT="' + tree[i].text + '">' +
                '<div>';
              for (var j = 0; j < count; j++) {
                _html += '<i class="node-icon node-occupy"></i>';
              }
              _html += '<i class="node-icon ' + (hasChild ? "icon-expand" : "") + '"></i>' +
                '<i class="node-icon ' + (hasChild ? "icon-folder" : "icon-file") + '"></i>';
              _html += '<input class="node-check ' + (collect.checkbox ? "" : " disp-none") + ' " type="checkbox" value="' + _countAll + ',' + tree[i].id + ',' + tree[i].text + '">';
              _html += '<span class="node-text">' + (tree[i].text) + '</span></div>';
              collect.rootDatas.push(tree[i]);
              _countAll++;
              if (hasChild) {
                _html += '<ul class="tree">';
                setTree(tree[i].children, count);
                _html += '</ul>';
              }
              _html += '</div></li>';
            }
          };
          setTree(rs, -1);
          _html += '</ul>';
          _dom.find(".nfsm-ct-cont").html(_html);

          
        collect.storageCheckNode();
    	  collect.setCombox();
    	  collect.bindEvent();// 增加监听事件
        };

        collect.setCombList = function () {
          $.ajax({
            url: collect.url,
            dataType: 'json',
            method: 'GET',
            async: false,
            success: function (rs) {
              _this.loadData(rs);
            }
          })
        };

        // 关闭或打开下拉选择框
        collect.closeCbTree = function(){
        	if(!_dom.attr("none-trigger")){
        		_dom.find(".ct-list-showCheck").trigger("click");
        	}else{
        		_dom.removeAttr("none-trigger")
        	}
        };

        /**
         * 处理配置参数
         */ 
        collect.configDeal = function (el, cfg) {
          _dom = el != null ? $(document.getElementById(el)) : null;
          //cfg.isSingle == 'false' || cfg.isSingle == '' ? collect.isSingle = false : collect.isSingle = 'true';
          cfg.checkbox == 'false' || cfg.checkbox == '' ? collect.checkbox = false : collect.checkbox = 'true';
          collect.isSingle = (!collect.checkbox);
        };

        /**
         * 存储checkbox的target节点
         */
        collect.storageCheckNode = function(){
          var checkNodes = _dom.find('.node-check');
          for (var i = 0, len = checkNodes.length; i < len; i++) {
            var checkArr = checkNodes[i].value.split(',');
            collect.checkNodeByKey[checkArr[1]] = checkNodes[i];
            collect.checkNodeByText[checkArr[2]] = checkNodes[i];
          }
        };

        collect.setCombox = function () {
          _dom.find(".ct-clean").click(function (event) {
            _this.clean();
            _dom.find('.ct-input')[0].focus();
            _dom.find('.ct-input').change();
          });
        };

        /**
         * 初始化
         */
        collect.init = function(ele, config){
          collect.configDeal(ele, config);
          if (collect.data.data && collect.data.data.length>0) {
        	_this.loadData(collect.data);
          }else if(collect.url){
        	collect.setCombList();
          }
        };
        collect.init(HTMLElement, config);

        _this.clean = function (notChangeInput) {
          notChangeInput? "":_dom.find('.ct-input').val("");
          var choiseList = _dom.find(".bgc-88c3d5");
          if (choiseList.length > 0) {
            for (var i = 0, len = choiseList.length; i < len; i++) {
              choiseList[i].classList.remove("bgc-88c3d5");
            }
          }
          _dom.find('.node-check').attr('checked', false);
          collect.rsVal = {};
        };

        _this.cleanData = function () {
            _this.clean();
            _dom.find('.ct-input').change();
        }

        /**
         * 通过key，或者text值，选中对应的节点
         * @param val : 需要选中的值，可以为text或者key值
         * @param type : 0为通过text选中，1为通过key选中
         * @param isCheck : true为选中节点，false为取消选中节点
         * @param notChangeInput : 不传入参数不触发输入框的值
         */
        collect.checkedDeal = function (val, type, isCheck, notChangeInput) {
          var checkDom = "";
          if(type == -1){
            checkDom = collect.checkNodeByKey[val];
            if(!checkDom){
                checkDom = collect.checkNodeByText[val];
            }
            if (!checkDom) {
                var ctI = _dom.find(".ct-input");
                var str = ctI.val() + "," + val;
                ctI.val(str.indexOf(',') == 0 ? str.substr(1) : str);
                return false;
            }
          }else{
              checkDom = type ? collect.checkNodeByKey[val] : collect.checkNodeByText[val];
              if (!checkDom) {
                  return false;
              }
          }

          if (collect.isSingle) { // 单选
        	  collect.closeCbTree();
        	  if(_dom.find(".bgc-88c3d5")[0]==$(checkDom).parent('div')[0]){
        		  return;
        	  }
        	  _this.clean();
          }
          if (!collect.checkbox) {
              if(collect.isSingle){
                  (_dom.find(".bgc-88c3d5").length > 0) ? _dom.find(".bgc-88c3d5")[0].classList.remove("bgc-88c3d5"): '';
              }
              isCheck?$(checkDom).parent('div').addClass("bgc-88c3d5"):$(checkDom).parent('div').removeClass("bgc-88c3d5");
          }
          var key = checkDom.value.split(',')[1];
          var text = checkDom.value.split(',')[2];
          checkDom.checked = isCheck;
          if(isCheck){
              notChangeInput?collect.addRsVal(key, text):collect.addVal(key, text);
          }else{
              notChangeInput?collect.delRsVal(key, text):collect.delVal(key, text);
          }
        };

        /**
         * 选中节点，存储节点值，追加输入框的值
         * @param key ：key值
         * @param text ：文本值
         */
        collect.addVal = function (key, text) {
          // 输入框增加text值
          var ctI = _dom.find(".ct-input");
          var str = ctI.val() + "," + text;
          ctI.val(str.indexOf(',') == 0 ? str.substr(1) : str);
          collect.addRsVal(key, text);
          //ctI.change();
        };

        collect.addRsVal = function (key, text) {
          // 根据key，存储当前节点对象值
          if (collect.isSingle) { // 单选情况，保证只存在一个值
            collect.rsVal = {};
          }
          collect.rsVal[key] = {
            'key': key,
            'text': text
          };
        };

        /**
         * 取消选中节点，删除节点值，删除输入框的值
         * @param key ：key值
         * @param text ：文本值
         */
        collect.delVal = function (key, text) {
          // 输入框减少对应的text值
          var ctI = _dom.find(".ct-input");
          var str = "," + ctI.val();
          var str2 = str.split("," + text).join("");
          ctI.val(str2.indexOf(',') == 0 ? str2.substr(1) : str2);
          collect.delRsVal(key, text);
          //ctI.change();
        };

        collect.delRsVal = function (key, text) {
          if (collect.isSingle) { // 单选情况，保证只存在一个值
            collect.rsVal = {};
          }
          collect.rsVal[key] = {};
        }

        // 获取数据源
        _this.getResourceData = function () {
          return this.data;
        };

        _this.getRootDatas = function () {
          return collect.rootDatas;
        };

        /**
         * 根据文本，删除输入框里对应的文本值
         * @param text ：需要删除的文本值
         * (暂弃用)
         */
        collect.deleteCheck = function (text) {
          var ctI = _dom.find(".ct-input");
          var str = "," + ctI.val();
          var str2 = str.split("," + text).join("");
          ctI.val(str2.substr(1));
        };

        /**
         * 获取输入框值（对外提供的方法）
         */ 
        _this.getText = function () {
          return _dom?_dom.find(".ct-input").val():"";
        };

        /**
         * 设置输入框值（对外提供的方法）
         * @param {*} text 
         */
        _this.setText = function (text) {
          var ctI = _dom.find(".ct-input");
          var str = "";
          if (!collect.isSingle) {
            str = ctI.val() + "," + text;
          } else {
            str = text;
          }
          ctI.val(str);
          if (ctI.val().indexOf(',') == 0) {
            var str2 = ctI.val().substr(1);
            ctI.val(str2);
          }
          _this.clean();
          ctI.change();
        };

        // 获取选中值
        _this.getValue = function () {
          var rs = [];
          for(var key in collect.rsVal){
            if(collect.rsVal[key] && collect.rsVal[key].key){
              rs.push(collect.rsVal[key].key);
            }
          }
          return rs.length?rs.join(','):_dom?_dom.find('.ct-input').val():"";
        };

        /** 
         * text: 需要设值的值
         * type=1时，通过key设值；type=0的时候，通过text设值
         * 修改：2018.1.31，type属性无效
         */
        _this.setValue = function (text, type) {
          var arr = typeof (text) == 'string' ? text.split(',') : text;
          _this.clean();
          _dom.attr("none-trigger",1);
          if (arr.length <= 0) {
              return false;
          }
          for (var i = 0, len = arr.length; i < len; i++) {
              collect.checkedDeal(arr[i], -1, true);
          }
          _dom.find(".ct-input").change();
        };

        /** 过滤下拉框事件
         * _scText:需要过滤的文本值或者id值
         * type：过滤文本的类型，1为通过key过滤，0为通过文本text值过滤，默认通过key过滤
         */
        _this.screen = function (_scText, type) {
          !type?type = 1:''; // 过滤类型默认1
            if(collect.screenType=="1"){
                // 所有节点都过滤
                if(new RegExp("^[ ]+$").test(_scText) || _scText == ""){ // 清除所有过滤
                    _dom.find(".node-content").removeClass("disp-none");
                    return false;
                }
                _dom.find(".node-content").addClass("disp-none"); // 隐藏所有节点
                if (type) {// 根据条件展示所有符合的节点
                    _dom.find(".node-content[data-filter*='"+_scText+"']").removeClass("disp-none");
                }else{
                    _dom.find(".node-content[data-filterT*='"+_scText+"']").removeClass("disp-none");
                }
                var showNodes = _dom.find(".node-content:not(.disp-none)");
                for(var i=0,len=showNodes.length; i<len; i++){
                    $(showNodes[i]).parents(".node-content").removeClass("disp-none");
                }
                return false;
            }
            else {
                // 只过滤子节点,但是父节点也不显示
                if (new RegExp("^[ ]+$").test(_scText) || _scText == "") { // 清除所有过滤
                    _dom.find(".node-content>div").removeClass("disp-none");
                    //_dom.find(".node-occupy").removeClass("disp-none"); //隐藏结构前的
                    return false;
                }
                _dom.find(".node-content>div").addClass("disp-none");
                //_dom.find(".node-occupy").addClass("disp-none");
                if (type) {// 根据条件展示所有符合的节点
                    _dom.find(".node-content[data-filter*='"+_scText+"']>div").removeClass("disp-none");
                    _dom.find(".node-content[data-filter='"+_scText+"']>div").addClass("disp-none");
                }else{
                    _dom.find(".node-content[data-filterT*='"+_scText+"']>div").removeClass("disp-none");
                    _dom.find(".node-content[data-filterT='"+_scText+"']>div").addClass("disp-none");
                }
            }
        };

        tree.prototype = {
          'version1': '1.0'
        }
        return _this;
      }

      var treeInstance = null;
        treeInstance = new tree(HTMLElement, config);
        countNumber += 1;
        countArray.set(HTMLElement, treeInstance);

        return treeInstance;
    };
    return this;
  };

  global.nfsmCombTree = new Tree();

})(window);
nfsmCombTree.onloadInit();
nfsmCombTree.closeTree();
//@ sourseURL=nfsmCombTree.js
