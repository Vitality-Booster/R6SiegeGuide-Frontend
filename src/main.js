import {createApp} from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'


// import store
import store from './store/index'
store.commit('loadWebsitePictures')

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router'

createApp(App).use(router).use(store).use(BootstrapVue3).mount('#app')


