let axios = require('axios')
axios.get('https://www.baidu.com', {
  params: ''
})
  .then(response => {
    console.log(response)
  })
