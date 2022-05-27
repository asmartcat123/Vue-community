<template>
  <div>
    姓名：{{ name }}
    年龄：{{ age }}
    <button @click="changeName('李四')">改变姓名</button>
    <button @click="setAge(18)">改变年龄</button>
    <input type="text" v-model.number="value">
    <p>{{value}}</p>

    <button @click="act">增加</button>
  </div>


</template>

<script>
import bus from "./test.js";

import Vue from "vue";

import{state,mutations} from "./test.js";

export default {
  name: "test",

  data(){
    return{
      value:'',
      arr:[1,2,3,4,5,6,7,8,9,10],
      item:{
        oldProperty:"旧属性"
      },

    }
  },
mounted() {
    bus.$on('add',(val)=>{
    console.log(val)
  });
},
  computed: {
    name() {
      return state.name
    },
    age() {
      return state.age
    }
  },
  methods:{
    changeName: mutations.changeName,
    setAge: mutations.setAge,
    add(){
      Object.assign(this.item,{
        new1Property:"新属性1"
      })
      Vue.set(this.item,'newProperty','新属性');
      console.log(this.item)
    },
    accept(val){
      console.log(val);

    },
    act(){
     // console.log(this.$refs.child.obj.name)
     Vue.set(this.arr,0,12);
    }
  }
}
</script>

<style scoped>

</style>
