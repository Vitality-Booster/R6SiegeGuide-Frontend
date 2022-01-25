// import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Operators from "../views/Operators";
import Maps from "../views/Maps";
import SingleOperator from "../views/SingleOperator";
import Register from "../views/Register";
import Statistics from "../views/Statistics";
import NewOperator from "../views/NewOperator";
import NewMap from "../views/NewMap";
import SingleMap from "../views/SingleMap";

// Vue.use(VueRouter)

// check router properties in order to send people to the Login page in case, they are not logged in
// (Probably won't need that after all, as I may have "Continue without login" functionality)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    //component: () => import (/* webpackChunkName: "login" */ "@/views/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
    // component: () => import (/* webpackChunkName: "register" */ "@/views/Register")
  },
  {
    path: '/operators',
    name: 'Operators',
    component: Operators
  },
  {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
  },
  {
      path: '/maps',
      name: 'Maps',
      component: Maps
  },
  {
    path: '/operators/:name',
    name: 'singleOperator',
    component: SingleOperator,
    props: true
  },
  {
    path: '/operators/new',
    name: 'newOperator',
    component: NewOperator,
  },
  {
    path: '/maps/new',
    name: 'newMap',
    component: NewMap,
  },
  {
    path: '/maps/:name',
    name: 'singleMap',
    component: SingleMap,
    props: true
  }
]

const router = createRouter({
  // change to something else in the future
  history: createWebHistory(),
  routes
})

export default router
