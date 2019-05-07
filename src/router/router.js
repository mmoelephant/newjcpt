import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import reportIndex from '../views/intellReport/reportIndex.vue'
import rout from './routerstt'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path:'/reportIndex',
    name:'reportIndex',
    component:reportIndex
  },
    {path: '/setting',
    name: 'setting',
    component: () => import('../views/setting.vue')
  },
]

const final_route = routes.push(...rout)
export default new Router({
    final_route
})
