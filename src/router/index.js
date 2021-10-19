import Vue from "vue";
import Router from 'vue-router';

import Login from "@/views/Login";
import Main from '../views/Main'
import DNF from "@/components/DNF";
import CF from "@/components/CF";
import LOL from "@/components/LOL";
import impact from "@/acg/impact";
import dongman from "../dongman/dongman"
import Friend from "@/communicate/Friend";
import Error from "@/views/Error";
import Register from "@/views/Register";
import music from "@/dongman/music";
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
          path:'',
          redirect:'/login'
        },
        {
            path: '/login',
            name: 'Login',
            component:Login,
            meta: {
                roles: ['admin', 'user']
            },
        },
        {
            path:"/register",
            name:"Register",
            component:Register
        },
        {
            path:'/error',
            name:'error',
            component:Error,
            meta:{
                roles:['user']
            }

        },
        {
            path:'/main',
            name:'Main',
            component:Main,
            meta:{
                roles:['admin']
            },
            children:[
                {
                    path:'/dnf',
                    name:'DNF',
                    component:DNF,
                    meta:{
                        roles:['admin']
                    },
                },
                {
                    path:'/cf',
                    name:'CF',
                    component:CF,
                    meta:{
                        roles:['admin']
                    },
                },
                {
                    path:'/lol',
                    name:'LOL',
                    component:LOL,
                    meta:{
                        roles:['admin']
                    },
                },
                {
                    path:'/impact',
                    name:'崩坏',
                    component:impact,
                    meta:{
                        roles:['admin']
                    },
                },
                {
                    path:'/dongman',
                    name:'动漫',
                    component:dongman,
                    meta:{
                        roles:['admin']
                    },
                },
                {
                    path:'/music',
                    name:'音乐',
                    component:music
                },
                {
                    path:'/friend',
                    name:'friend',
                    component:Friend,
                    meta:{
                        roles:['admin']
                    },
                }
            ]
        },


    ]
})

const VueRouterPush = Router.prototype.push

Router.prototype.push = function push (to) {

    return VueRouterPush.call(this, to).catch(err => err)

}
