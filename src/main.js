import Vue from 'vue'
import App from './App.vue'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import router from './router/router'
import VueLazyload from "vue-lazyload";
import store from './store'
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyload,{
  loading: require('./assets/images/lazy-load.gif')
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
