��ģ��Ϊ��̬������Դ����Ҫ�������õ�Web������

����tomcat�У���Ҫ��
1. ����tomcat��װĿ¼/conf����server.xml
2. �ҵ�����Host�ڣ�������ϵͳӦ�õ�AppĿ¼��Host��
3. ��������Ķ���
<Context docBase="<pulbic����Ŀ¼·��>/public" path="/public" reloadable="true"/>
===========================
===========================

��jquery��
js/
+----jquery-1.11.3.min.js��EasyUIʹ�ã�
+----jquery-1.x.min.js ��1.x���°汾��Ŀǰ1.12.4��
  ����ʹ�ã�����1.x���°汾��
+----jquery-3.x.min.js��3.x���°汾��Ŀǰ3.2.1��
  ����ʹ�ã�����3.x���°汾���˰汾���1.x���˽ϴ��������1.x���������ݣ������Ҫ����ѡ��1.x����3.xʹ�á�

+----ajaxfileupload.min.js
  �ļ��첽�ϴ�
+----jquery.form.min.js
  ���첽�ύ

+----jquery.cookie.js
  Jquery Cookie�������

+----jquery-ui.min.js ���ݲ���ȷ��

+----jquery.preloader.js
  ������ʾ�����ڼ�����ɺ�������ʾ��Ϣ����ʹ�÷�����
 $(������ɵĿؼ�ѡ����).preloader({selector:��ʾ�ؼ�ѡ����});   ��ʾ�ؼ�ѡ����Ĭ��Ϊ"#preloader"

===========================
jquery_mCustomScrollbar/
  ����jquery�Ĺ�������ʽ
===========================

��EasyUI 1.5.2��
css/
+----icon.css ��EasyUIͼ�궨�壩
+----icons/    ��EasyUIͼ�꣩
+----default/  ��һ��EasyUI�ؼ�Ƥ����

js/
+----easyui-lang-zh_CN.js
 ��EasyUI���ػ������ı���
+----easyloader.js

+----jquery.easyui.min.js
 ������ jquery-1.11.3.min.js��
+----jquery.easyui.mobile.js
 ���ֻ��˼��ݴ���

+----jquery.edatagrid.js
   �༭DataGrid��װ
+---datagrid-bufferview.js
   ������ͼ����ʼֻ���ص�һҳ�����¹����ż��أ������ع���ͱ���������scrollviewֻ���ص�ǰҳ+ǰ��һҳ����
===========================
easyui/
  �ٷ�ʵ�ֵ���չ�����������չ�����js/Ŀ¼�£������Ƶ���Ŀ¼�£�
+----datagrid-detailview.js
  ����ϸ����datagrid�ؼ�

===========================

�������������
datePicker/
  һ�����ڿؼ�����EasyUI֧�ָ���ĸ�ʽ������

js/
+----sha1.min.js
  SHA1�����㷨��������������ϴ���

+----echarts.common.min.js
  �ٶȿ�����һ��ͼ��ؼ�������jquery.3.1 �����ϰ汾��

+----Img.js
  ��ȡ����ͼƬԤ��ͼ

===========================
===========================

����ϵͳʵ�֡�
css/
+----page.css
  ����ϵͳ��ҳ��ͳһ������ʽ��ͨ��easyui��othger.css��������
+----tmpcss.css
  ��easyui�ؼ���ʽ���е���������
+----color.css
+----mobile.css


js/
+----ibasesys.min.js
  ����ϵͳ��ȫ�ַ�����װ��������ʾ������ʾ�Ĵ���

+----expressdesign.js
  ���ʽ�����
+----exprruntimetest.js
  ���ʽ��֤���л�����Ϣ

+----FormSelector.js
  ���ֶ�ѡ����
+----FormSelectorTree.js
  ���ؼ��б�ѡ�����������ؼ�����ǩҳ����塢���

+----FormObjectSelector.js
  ��ѡ����

+----myalert.js
  �Զ������ʾ/ȷ����ʾ��

+----OrganSelector.js
  ��֯�ṹѡ����

+----showdialog.js
  ��ʾͨ�öԻ��򣬴���url��ַΪ�Ի������ݣ�һ�����ڱ��ʽ��ʾ��

+----treedesigner.js
  ͨ�����б�ѡ����������url��ַΪ���б����ݣ��ɵ�ѡ���ѡ
  ����ʵ�ֵ�ͨ�ù��ܣ�
1��ѡ��ҵ����
	var url="/mainWeb/system/businessDefTreeByUserId";
	createTreeCtrl(url,'newWorkCTree','ѡ��Ҫ�����Ĺ���',false,resultFun);
2��ѡ����������

+----message.js
  ��ת������Ϣ�б��˹��ܲ�ͨ�ã����뵽��Ӧ���̱ȽϺã�

html/
+----expressionDesigner.html
  ���ʽ�����

+----FormObjectSelector.html
  ��ѡ����ҳ��ʵ��

+----formSelector.html
  ���ֶ�ѡ����ҳ��ʵ��

+----formSelectorTree.html
  ���ؼ�ѡ����ҳ��ʵ��

+----OrganSelector.html
  ��֯�ṹѡ����ҳ��ʵ��


UEditor/
   ���ʽ������������

kindeditor

wangEditor