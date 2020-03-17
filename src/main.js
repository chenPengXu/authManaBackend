import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
