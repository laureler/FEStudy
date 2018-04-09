本模块为静态公共资源，需要额外配置到Web容器。

如在tomcat中，需要：
1. 进入tomcat安装目录/conf，打开server.xml
2. 找到所在Host节（包含本系统应用的App目录的Host）
3. 添加这样的定义
<Context docBase="<pulbic所以目录路径>/public" path="/public" reloadable="true"/>
===========================
===========================

【jquery】
js/
+----jquery-1.11.3.min.js（EasyUI使用）
+----jquery-1.x.min.js （1.x最新版本，目前1.12.4）
  单独使用，保持1.x最新版本。
+----jquery-3.x.min.js（3.x最新版本，目前3.2.1）
  单独使用，保持3.x最新版本。此版本针对1.x做了较大调整，与1.x基本不兼容，因此需要考虑选择1.x还是3.x使用。

+----ajaxfileupload.min.js
  文件异步上传
+----jquery.form.min.js
  表单异步提交

+----jquery.cookie.js
  Jquery Cookie操作插件

+----jquery-ui.min.js （暂不明确）

+----jquery.preloader.js
  加载提示处理（在加载完成后隐藏提示信息），使用方法：
 $(加载完成的控件选择器).preloader({selector:提示控件选择器});   提示控件选择器默认为"#preloader"

===========================
jquery_mCustomScrollbar/
  基于jquery的滚动条样式
===========================

【EasyUI 1.5.2】
css/
+----icon.css （EasyUI图标定义）
+----icons/    （EasyUI图标）
+----default/  （一套EasyUI控件皮肤）

js/
+----easyui-lang-zh_CN.js
 （EasyUI本地化语言文本）
+----easyloader.js

+----jquery.easyui.min.js
 （基于 jquery-1.11.3.min.js）
+----jquery.easyui.mobile.js
 （手机端兼容处理）

+----jquery.edatagrid.js
   编辑DataGrid封装
+---datagrid-bufferview.js
   缓冲视图（初始只加载第一页，向下滚动才加载，但加载过后就保留，不像scrollview只加载当前页+前后一页）。
===========================
easyui/
  官方实现的扩展插件（部分扩展插件在js/目录下，会逐步移到此目录下）
+----datagrid-detailview.js
  有详细栏的datagrid控件

===========================

【第三方插件】
datePicker/
  一个日期控件（比EasyUI支持更多的格式化处理）

js/
+----sha1.min.js
  SHA1加密算法（用于密码加密上传）

+----echarts.common.min.js
  百度开发的一款图表控件（依赖jquery.3.1 及以上版本）

+----Img.js
  获取本地图片预览图

===========================
===========================

【本系统实现】
css/
+----page.css
  我们系统的页面统一风格的样式，通过easyui的othger.css改名而来
+----tmpcss.css
  对easyui控件样式进行调整、美化
+----color.css
+----mobile.css


js/
+----ibasesys.min.js
  我们系统的全局方法封装（比如显示错误提示的处理）

+----expressdesign.js
  表达式设计器
+----exprruntimetest.js
  表达式验证运行环境信息

+----FormSelector.js
  表单字段选择器
+----FormSelectorTree.js
  表单控件列表选择器（容器控件：标签页、面板、表格）

+----FormObjectSelector.js
  表单选择器

+----myalert.js
  自定义的提示/确认提示框

+----OrganSelector.js
  组织结构选择器

+----showdialog.js
  显示通用对话框，传入url地址为对话框内容（一般用于表达式显示框）

+----treedesigner.js
  通用树列表选择器，传入url地址为树列表内容，可单选或多选
  用于实现的通用功能：
1）选择业务定义
	var url="/mainWeb/system/businessDefTreeByUserId";
	createTreeCtrl(url,'newWorkCTree','选择要启动的工作',false,resultFun);
2）选择工作流定义

+----message.js
  流转操作信息列表（此功能不通用，移入到相应工程比较好）

html/
+----expressionDesigner.html
  表达式设计器

+----FormObjectSelector.html
  表单选择器页面实现

+----formSelector.html
  表单字段选择器页面实现

+----formSelectorTree.html
  表单控件选择器页面实现

+----OrganSelector.html
  组织结构选择器页面实现


UEditor/
   表达式设计器依赖插件

kindeditor

wangEditor