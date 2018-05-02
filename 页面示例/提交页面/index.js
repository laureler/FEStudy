function showSettings(node) {
  codeVaild=node.attributes.code;
  if (node.attributes.wfRID == '#') {
    combotree(1);
    $("#businessList").css({'display':'none'});
    $("#classificationList").panel('open');
    $("#cfrid").attr("value", node.attributes.rid);
    $("#cfcode").textbox('setValue', node.attributes.code);
    highpcode=node.attributes.pcode;
    $("#cfpcode").combotree('setValue', node.attributes.pcode);
    $("#classificationName").textbox('setValue', node.attributes.title);
    $("#cfsortValue").numberspinner('setValue', node.attributes.sortValue);
    $("#codeVaild").val(node.attributes.code);
    $("#cfwfRID").attr('value', node.attributes.wfRID);
    $("#oldcode").attr('value', node.attributes.code);
    //$("#Contain").textbox('setValue',node.attributes.code);wfRID
    var _allNode = $("#businessDefTree").tree('getChildren', node.target);
    if (_allNode == null) return;
    var list = [];
    for (var ix = 0; ix < _allNode.length; ++ix) {
      var datalist = new Object();
      datalist.text = _allNode[ix].text;
      datalist.id = _allNode[ix].id;
      datalist.value = _allNode[ix].attributes.wfRID;
      datalist.sortValue=_allNode[ix].attributes.sortValue;
      list.push(datalist);
    }
    console.log(list);
    $('#Contain').datalist('loadData', list);
  } else {
    $("#classificationList").panel('close');
    $("#businessList").css({'display':'block'});
    $("#rid").attr("value", node.attributes.rid);
    $('#register').combobox('setValue', node.attributes.register);
    $("#code").textbox('setValue', node.attributes.code);
    $("#codeVaild").val(node.attributes.code);
    $("#pcode").combotree('setValue', node.attributes.pcode);
    $("#title").textbox('setValue', node.attributes.title);
    $("#wfRID").attr('value', node.attributes.wfRID);
    if(node.attributes.bwebQuery==1){
      //$("#bwebQuery").attr('checked', true);
      $("#bwebQuery").prop("checked","checked");
    }else{
      $("#bwebQuery").removeAttr("checked");
      //$("#bwebQuery").attr('checked', false);
    }
    $("#sortValue").textbox('setValue', node.attributes.sortValue);
    $('#docItem').datagrid('load', {
      bcode : node.attributes.code
    });
    $('#yewutabs').tabs('resize',{
      height:$('#businessList').height()-$('#buslist_Table').height()-10
    });
    $('#HandlePersonList').datagrid('loadData', {
      total : 0,
      rows : []
    });
    $.ajax({
      url : ctx + '/system/loadFormProcess',
      data : {
        type : 2
      },
      type : "post",
      success : function(data) {
        $("#wfRIDTxt").textbox('setValue','');
        for(var ix=0;ix<data.length;ix++){
          if(node.attributes.wfRID==data[ix].id){
            var iVerNum=data[ix].attributes;//保存的是版本号
            if(!iVerNum) iVerNum=0;
            $("#wfRIDTxt").textbox('setValue', data[ix].text+" - V"+iVerNum);
            return;
          }
        }
      },
      error : function(data) {
      }
    });
    //	$("#initFormTxt").textbox('setValue', node.attributes.initFormTxt);
    loaderPerson();
    loadercharge();
    loaderrule ();
    loadertasks ();
  }
}