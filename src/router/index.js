// import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// check router properties in order to send people to the Login page in case, they are not logged in
// (Probably wont need that after all, as I may have "Continue without login" functionality)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import (/* webpackChunkName: "login" */ "@/views/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import (/* webpackChunkName: "register" */ "@/views/Register")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  // change to something else in the future
  history: createWebHistory(),
  routes
})

export default router
