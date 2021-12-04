import {createApp} from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
 // import { BootstrapVue,  } from 'bootstrap-vue'


import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'

// import store
import store from './store/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
//import axios from "axios";

//
// Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)
// Vue.use(store)

// Vue.config.productionTip = false

createApp(App).use(router).use(store).mount('#app')
const firebaseConfig = {
  apiKey: "AIzaSyCXIRdhpv9pw5kPujBJewPzkJm44iqjfSg",
  authDomain: "r6siege-guide.firebaseapp.com",
  projectId: "r6siege-guide",
  storageBucket: "r6siege-guide.appspot.com",
  messagingSenderId: "272522559720",
  appId: "1:272522559720:web:e3ed7658d8ad279a55895d",
  measurementId: "G-C5K9M28S5N"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

// const auth = getAuth()


