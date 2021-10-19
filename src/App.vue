<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      innerWidth:window.innerWidth,
      widths:window.screen.width
    }
  },
  components: {
  },
  mounted() {
    const that=this;
       window.onresize=()=>{
         return(()=>{
           that.innerWidth=window.innerWidth;
           that.widths=window.screen.width;
         })()
       }
      window.addEventListener('unload',this.saveState);
  },
  methods:{

    saveState(){
      window.sessionStorage.setItem('state',JSON.stringify(this.$store.state));
    }
  },
  watch:{
    innerWidth:function (){

      if(innerWidth==this.widths){
        document.body.style.width=this.widths+'px';
      }
      if(innerWidth!=this.widths){
        if(innerWidth>this.widths) {
          document.body.style.width = innerWidth - this.widths / 0.09 + 'px';
          return;
        }
        document.body.style.width=innerWidth+'px';
      }

   },

  }
}



</script>

<style>
*{
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;
  color: #2c3e50;
  height:100%;
  width: 100%;

}
a {
  text-decoration: none;
  color:black
}

.router-link-active {
   text-decoration: none;
  color: #409EFF;
  }
body,html{
  height:100%;
  width: 100%;
}
</style>
