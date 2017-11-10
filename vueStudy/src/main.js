// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/* import App from './App'
import router from './router' */

Vue.config.productionTip = false

/* eslint-disable no-new */
/* new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
}) */

Vue.component('child', {
  template: `<span>{{myMessage}}</span>`,
  props: ['myMessage']
  /* data: function () {
    return null
  } */
  // 从技术角度看 data确实是一个函数，所以不会报错，但是其实data只是一个返回全局共享的变量
})

new Vue({
  el: '#app',
  // parentMessage
  data: function () {
    return {'parentMessage': 'data'}
  }
})
