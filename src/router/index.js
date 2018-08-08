import Vue from 'vue'
import Router from 'vue-router'

import Index from '../App.vue'

import Seller from '../components/seller.vue';
import Goods from '../components/goods.vue';
import Rates from '../components/rates.vue';
Vue.use(Router);

export default new Router({
  routes: [

    {
      path:'/',
      redirect:'/goods'
    },
    {
    path:'/seller',
    name:'seller',
    component:Seller,
  },
    {
      path:'/rates',
      name:'rates',
      component:Rates,
    },
    {
      path:'/goods',
      name:'goods',
      component:Goods,
    }
  ]
})
