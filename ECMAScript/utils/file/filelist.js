/**
 * fileList
 * file
 */
function showFileName () {
  let file;
  let files = document.getElementById('file').files
  for (var i = 0; i < files.length; i++) {
    var fileItem = files[i]
    console.log(fileItem.name)
  }
}