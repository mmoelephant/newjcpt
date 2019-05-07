import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import echarts from "echarts";
import './style/base.stylus'
import './assets/iconfont/iconfont.css'
import './assets/font/font.css'


Vue.prototype.$echarts = echarts;
// Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
