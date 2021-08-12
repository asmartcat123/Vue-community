import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Router from "vue-router";
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import vuex from 'vuex'
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(vuex);
Vue.use(Router);
Vue.use(VueResource);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
