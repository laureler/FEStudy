function loadImage (url) {
  return new Promise(function (resolve, reject) {
    var image = new Image()
    image.onload = function () {
      resolve(image)
    }
    image.onerror = () => { reject(new Error('加载图片不成功' + url))}
  })
  image.src = url;
}
loadImage('http://imgsrc.baidu.com/baike/pic/item/c9fcc3cec3fdfc034f8532dedf3f8794a5c226d3.jpg')