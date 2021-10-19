<template>
<div>

  <!--聊天口-->
  <div class="box"  >
    <div  v-for="(item,index) in messageList" :key="index"  class="msg"  :style="item.username == username?'flex-direction:row-reverse':''">

      <div>


          <span :style="item.username==username?'color:#409EFF':'color:#00FA9A'" :class="item.username==username?'right':'left'">
          {{item.msg}}
          </span>

      </div>

    </div>
  </div>

   <!--输入框-->
  <el-input style="width:40%; "
      :autosize="{ minRows: 8, maxRows: 20 }"
      type="textarea"
      placeholder="请输入内容"
      v-model="msg"
      @keypress.enter.native="submit(msg)"
  >
  </el-input><br/>
  <el-button style="position:relative;left: 18%" type="primary" @click="submit(msg)">提交</el-button>


</div>
</template>

<script>


export default {
  name: "Friend",
  data(){
    return{
      ws:null,
      msg:'',
      userNum: '',

      username:this.$store.getters.getUser.username,
      messageList:[]

    }
  },
  created() {

  },
  mounted(){
    this.initWebSocket();

  },
  methods:{
    submit(){
      const msg=this.msg;

      if(!msg.trim().length){
        return;
      }
      this.ws.send(JSON.stringify({
        msg:msg,
        username:this.username
      }))
      this.msg=''

    },

    initWebSocket(){
      const ws=new WebSocket("ws://192.168.11.101:8001");
      this.ws=ws

      ws.onopen=function (e){
        console.log('open',e);

      }

      ws.onclose=function (e){
        console.log(e);
      }

      ws.onerror=function (){
        console.log("连接出错");

      }

      ws.onmessage= (e)=>{
        const msg=JSON.parse(e.data);
        console.log(msg);
        this.messageList.push(msg);
        console.log(this.messageList);
        this.userNum=msg.userNum;

      }
    },

  }
}
</script>

<style scoped>
.box{
  width: 40%;
  height:300px;
  overflow: scroll;
  margin: 10px auto;
  border:1px solid silver;
}
.msg{
  display: flex;
  width:100%;
  flex-wrap: nowrap;
}


</style>
