import Vue from 'vue'
import App from './App.vue'
import Router from '../routes'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.min.css'
Vue.use(VueResource)

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: Router
}).$mount('#app')
