import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../src/App.vue'
import HotelList from './components/HotelList.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter);

const routes = [
  
  {
    path: '/hotel_list/:rating?',
    name: 'HotelList',
    component: HotelList,
  },
  {
    path: '/hotel_search',
    name: 'App',
    component: App,
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

