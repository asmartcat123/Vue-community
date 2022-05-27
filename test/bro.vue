<template>
<div>
<button @click="handle">Bro</button>
{{num}}
</div>
</template>

<script>

import bus from './test'
export default {
  name: "bro",
  data() {
    return {
      num: 1
    }
  },
  methods: {
      handle(){
        bus.$emit('child',this.num);
      }
  },
  mounted() {
    bus.$on('bro',(val)=>{
      this.num+=val
    });
  }
}
</script>

<style scoped>

</style>
