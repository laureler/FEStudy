// request('http://localhost:9080/static/formDesigner/images/formdesignericonew/shanchu.png').pipe(fs.createWriteStream('d:/index.png'))

var request = require('request')
var fs = require('fs')
var path = require('path')

const dirname = 'uploadImages'
const hostdir = "./public/mito/"
function mkdirSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
  return false
}

function downloadUrl(urlList) {
  for (const url of urlList) {
    const first = url.indexOf(dirname)
    const last = url.lastIndexOf('/')
    if (first > 0 && last > 0) {
      const name = url.substr(last + 1)
      const dir = url.substr(first, last - first)
      const dstpath = hostdir + dir + '/' + name
      if (name.length && dir.length && !fs.existsSync(dstpath)) {
        if (mkdirSync(hostdir + dir)) {
          console.log(dstpath)
          request(url).pipe(fs.createWriteStream(dstpath))
        }
      }
    }
  }
}