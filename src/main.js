import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Router from "vue-router";
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import vuex from 'vuex'
import store from "@/store/store";
import VueLazyload from 'vue-lazyload'
import Vant from 'vant'
import locale from 'element-ui/lib/locale/lang/en'
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.use(ElementUI,{locale});
Vue.use(vuex);
Vue.use(Router);
Vue.use(VueResource);
Vue.use(VueLazyload);
Vue.use(Vant);



router.beforeEach((to,from,next)=>{
  //const role=window.sessionStorage.getItem('usercode');
  const confirm=window.sessionStorage.getItem('isLogin');
  if(to.path==='/test'||to.path==='/login'){
    next();
    return;
  }

  if (confirm==null){
      if(to.path!=="/register") {
        next("/login");

      }
  }

  next()


})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
