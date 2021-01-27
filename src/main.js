import './registerServiceWorker'

import App from './App.vue'
import Vue from 'vue'
import config from './config/config.json'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

window.config = config

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
