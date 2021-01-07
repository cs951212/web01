import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import qs from 'qs';
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.axios = axios;
Vue.prototype.qs=qs;
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
