import {createApp} from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';


// import store
import store from './store/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import router from './router'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

createApp(App).use(router).use(store).use(BootstrapVue3).use(BootstrapIconsPlugin).use(VueChartkick).mount('#app')


