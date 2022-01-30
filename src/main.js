// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './assets/css/custom.css';
import App from './App'
// import router from './router'
import router from '../src/router'
import Vuelidate from 'vuelidate';
import resources from '../src/json/hotellist.json';
import { store } from './store/store.js'
Vue.config.productionTip = false
Vue.use(Vuelidate);




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  resources,
  components: { App },
  template: '<router-view/>',
})
