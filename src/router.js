// 定义路由组件(可以const aa = {template:'<div>xxx</div>'}也可以从其他文件import进来)
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import about from './views/About.vue'
import reportIndex from './views/intellReport/reportIndex.vue'

Vue.use(Router)

// 创建router实例（在其中定义路由，是一个对象数组形式），在main.js中创建和挂载根实例new vue({router,store,...}).$mount('#app')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/about',
      name:'about',
      component:about
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path:'/reportIndex',
      name:'reportIndex',
      component:reportIndex
    }
  ]
})
