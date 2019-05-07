import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import echarts from "echarts"
import './style/base.stylus'
import './assets/iconfont/iconfont.css'


Vue.prototype.$echarts = echarts;
// Vue.use(ElementUI);

Vue.config.productionTip = false

// 这里的根实例是配合router.js创建的
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
