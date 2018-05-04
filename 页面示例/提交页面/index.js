
var treedata =
  [{
    'id': '#',
    'text': '所有业务 ',
    'children': [{
      'id': '200002',
      'text': 'testZQQ',
      'children': null,
      'attributes': {
        'rid': '77c5ba50-65fc-48d2-a246-e47d49d04154',
        'code': '200002',
        'pcode': '#',
        'createDate': 1524473861000,
        'userId': null,
        'wfRID': 'f99c99e1-421b-11e8-be81-005056b0626d',
        'initForm': '',
        'title': 'testZQQ',
        'bwebQuery': 0,
        'sortValue': 0,
        'register': null,
        'wfRIDTxt': 'test',
        'initFormTxt': null,
        'procUserId': null,
        'creatorFullName': null
      },
      'parentId': '#',
      'sort': 0,
      'iconCls': 'icon-busitem'
    }, {
      'id': '1314520',
      'text': '外网预申请系统',
      'children': [{
        'id': '9000101-01',
        'text': '国有建设用地抵押权首次登记',
        'children': null,
        'attributes': {
          'rid': '75aee0d0-03da-4437-ab47-8faddb423694',
          'code': '9000101-01',
          'pcode': '1314520',
          'createDate': 1524218594000,
          'userId': null,
          'wfRID': '5d89050e-3d87-11e8-96c4-005056c00001',
          'initForm': '',
          'title': '国有建设用地抵押权首次登记',
          'bwebQuery': 1,
          'sortValue': 1,
          'register': null,
          'wfRIDTxt': '抵押权首次登记',
          'initFormTxt': null,
          'procUserId': null,
          'creatorFullName': null
        },
        'parentId': '1314520',
        'sort': 1,
        'iconCls': 'icon-busitem'
      }, {
        'id': '9000101-02',
        'text': '国有建设用地使用权及房屋所有权抵押权首次登记',
        'children': null,
        'attributes': {
          'rid': 'd18c6715-15e0-4eed-b9a7-0d0e6d89aa8e',
          'code': '9000101-02',
          'pcode': '1314520',
          'createDate': 1524006424000,
          'userId': null,
          'wfRID': '5d89050e-3d87-11e8-96c4-005056c00001',
          'initForm': '',
          'title': '国有建设用地使用权及房屋所有权抵押权首次登记',
          'bwebQuery': 1,
          'sortValue': 2,
          'register': null,
          'wfRIDTxt': '抵押权首次登记',
          'initFormTxt': null,
          'procUserId': null,
          'creatorFullName': null
        },
        'parentId': '1314520',
        'sort': 2,
        'iconCls': 'icon-busitem'
      }, {
        'id': '9000101-03',
        'text': '抵押权变更登记',
        'children': null,
        'attributes': {
          'rid': '8fe23005-a8a2-44b8-9c38-d9524197bc1f',
          'code': '9000101-03',
          'pcode': '1314520',
          'createDate': 1524006430000,
          'userId': '#',
          'wfRID': 'f5be0bf0-3cb5-11e8-a19c-005056b0626d',
          'initForm': '',
          'title': '抵押权变更登记',
          'bwebQuery': 1,
          'sortValue': 3,
          'register': null,
          'wfRIDTxt': '抵押权变更登记',
          'initFormTxt': null,
          'procUserId': null,
          'creatorFullName': null
        },
        'parentId': '1314520',
        'sort': 3,
        'iconCls': 'icon-busitem'
      }],
      'attributes': {
        'rid': '0f8e33ce-143f-4f05-8389-7433dccf8e5c',
        'code': '1314520',
        'pcode': '#',
        'createDate': 1523309565000,
        'userId': '#',
        'wfRID': '#',
        'initForm': '',
        'title': '外网预申请系统',
        'bwebQuery': 0,
        'sortValue': 0,
        'register': null,
        'wfRIDTxt': null,
        'initFormTxt': null,
        'procUserId': null,
        'creatorFullName': null
      },
      'parentId': '#',
      'sort': 0,
      'iconCls': 'tree-folder'
    }, {
      'id': '123213',
      'text': '谭满光测试业务',
      'children': null,
      'attributes': {
        'rid': '34782a7e-e568-40fe-93a0-18581f8bffbf',
        'code': '123213',
        'pcode': '#',
        'createDate': 1524945033000,
        'userId': null,
        'wfRID': 'b9c98625-4ab8-11e8-8d9f-507b9daf3316',
        'initForm': '',
        'title': '谭满光测试业务',
        'bwebQuery': 0,
        'sortValue': 0,
        'register': null,
        'wfRIDTxt': 'tmg',
        'initFormTxt': null,
        'procUserId': null,
        'creatorFullName': null
      },
      'parentId': '#',
      'sort': 0,
      'iconCls': 'icon-busitem'
    }, {
      'id': '2018041123',
      'text': 'tmg',
      'children': null,
      'attributes': {
        'rid': '6f9952c0-d9e6-4966-9d47-8c478de0d33b',
        'code': '2018041123',
        'pcode': '#',
        'createDate': 1523662460000,
        'userId': null,
        'wfRID': '57d63c36-3d86-11e8-9fb5-005056b0626d',
        'initForm': '',
        'title': 'tmg',
        'bwebQuery': 0,
        'sortValue': 4,
        'register': null,
        'wfRIDTxt': null,
        'initFormTxt': null,
        'procUserId': null,
        'creatorFullName': null
      },
      'parentId': '#',
      'sort': 4,
      'iconCls': 'icon-busitem'
    }],
    'attributes': null,
    'parentId': '0',
    'sort': 1,
    'iconCls': 'icon-blank'
  }]
// 新增弹出模态框
var trTemplate = '<tr>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<!--<td>1</td>-->\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="autoSizeInput" autocomplete="off">\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td class="td-info" width="70px">\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<label class="webuploader-pick uploader-small">编辑详细</label>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="autoSizeInput" autocomplete="off">\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="autoSizeInput" autocomplete="off">\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="autoSizeInput" autocomplete="off">\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="autoSizeInput" autocomplete="off">\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<label class="uploader uploader-small webuploader-container"><div class="webuploader-pick">上传表格</div><div id="rt_rt_1ccik5cflnda6fs1ke51rfo1gqk1" style="position: absolute; top: -17px; left: 0px; width: 60px; height: 32px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" multiple="multiple"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></div></label>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<label class="uploader uploader-small webuploader-container"><div class="webuploader-pick">上传表格</div><div id="rt_rt_1ccik5cfobkprq8njqhug109n3" style="position: absolute; top: -17px; left: 0px; width: 60px; height: 32px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" multiple="multiple"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></div></label>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t\t<label class="webuploader-pick uploader-small delete" style="background-color: red">×</label>\n' +
  '\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t\t\t\t</tr>'

//点击删除当前行
$('.js-mater').on('click','.delete',function () {
  var tr = $(this).parents('tr')[0]
  tr.outerHTML = ''
})
// 点击追加一行数据
$('.newRowButton').on('click',function () {

  $('.js-mater').append(trTemplate)
})

var uploader = WebUploader.create({
  server: 'http://webuploader.duapp.com/server/fileupload.php',
  pick: '.uploader',
})

uploader.on('fileQueued',function (file) {
  console.log(uploader)
  console.log(file.name)
  console.log(file.id)
})

// 模态框展示
var btn = document.getElementById('newForm');
var close = document.getElementsByClassName('close')[0];
var cancel = document.getElementById('cancel');
var confirm = document.getElementById('sure');
var modal = document.getElementById('modal');
btn.addEventListener('click', function(){
  modal.style.display = "block";
});
close.addEventListener('click', function(){
  modal.style.display = "none";
});
cancel.addEventListener('click', function(){
  modal.style.display = "none";
});
confirm.addEventListener('click',function () {
  modal.style.display = "none";
  sendData()
})
function sendData () {

}