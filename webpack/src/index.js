
function component () {
  let elementById = document.getElementById('app')
  // loadsh 根据这一行来引入
  elementById.innerHTML = _.join(['hello, webpack','   '])
  return elementById
}

document.appendChild(component())