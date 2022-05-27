<template>
<div>

  <button @click="handle">Child</button>
{{num}}
</div>
</template>

<script>


import bus from "./test.js";

export default {
  name: "child",
  props: {

  },
  data() {
    return {
      obj:{
        name:'张三',
        age:18
      },
      num: 1
    }
  },
  mounted() {
   bus.$on('child',(data)=>{
     this.num+=data
   })

console.log(bus)
  },
  methods: {
    handle() {
      bus.$emit('bro', this.num);
    }
  }
}
</script>

<style scoped>

</style>
