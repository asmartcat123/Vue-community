<template>
<div>
   <!--个人信息-->
  <el-row :gutter="20">
    <el-col :span="8" class="message">
    <h1>欢迎  {{this.$store.getters.getUser.username}}</h1>
      <span>最近登录：{{NowTime}}</span><br>
      <span>用户类型:{{this.$store.getters.getUser.usercode}}</span>


    </el-col>
    <el-col :span="16"><div >123</div></el-col>
  </el-row>






</div>
</template>

<script>
export default {
  name: "Error",
  data(){
    return{
      NowTime:''

    }
  },
  mounted() {
    this.getCurrentTime()
  },
  methods: {
    getCurrentTime() {
      //获取当前时间并打印

      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      this.NowTime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;

    }
  }
}
</script>

<style scoped>

.message{
  text-align: left;
  height: 20%;
  box-shadow: 10px 10px 20px #888888;


}
body,html{
  height: 100%;
  width: 100%;
}

</style>

