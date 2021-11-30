import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
// import axios from "axios";

// const client = axios.create({
//   baseURL: process.env.VUE_APP_BASE_URL
// });
//
// export default client;

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  // client,
  render: h => h(App)
}).$mount('#app')
