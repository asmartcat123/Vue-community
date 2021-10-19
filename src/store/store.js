import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state=null!=window.sessionStorage.getItem('state')?JSON.parse(window.sessionStorage.getItem('state')): {
        user: {
            username: '',
            password:'',
            usercode:''
        }
}

export default new Vuex.Store({
    state,

    getters:{
      getUser(state){
          return state.user;
      }
    },

    mutations:{
        setUser(state,user){
            state.user=user;
        }
    },

    actions:{
        asynacsetUser(context,user){
            context.commit('setUser',user);
}

    },


})
