<template>
<div>


  <el-container style="height:100%; width: 100%;position: fixed; border: 1px solid #eee">
    <el-aside width="200px" class="el-aside" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" >

        <el-submenu  v-for="(father,index) in Menu" :key="index" :index="father.index">
          <template  slot="title"><i :class="father.ficon"></i>{{father.fname}}</template>
            <el-menu-item  v-for="(game,index) in father.son" :key="index"><router-link @click.native="jump(game.path,game)" to="">{{game.game}}</router-link></el-menu-item>
        </el-submenu>


        <el-menu-item >
          <i class="el-icon-chat-line-square"></i>
          <span slot="title"><router-link to="/friend">聊天室</router-link></span>
        </el-menu-item>

        <el-menu-item >
          <i  class="el-icon-user"></i>
          <span slot="title"><router-link to="/task">信息处理</router-link></span>
        </el-menu-item>

      </el-menu>
    </el-aside>

       <el-container>
      <el-header >
        <el-image  class="headimg" :src="himage"></el-image>
        <el-dropdown size="small" trigger="click" style="position: relative;right:-45%" placement="top"  @command="handleCommand">
      <span  class="el-dropdown-link">
        {{this.$store.getters.getUser.username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" icon="el-icon-plus">退出登录</el-dropdown-item>
            <el-dropdown-item command="return" icon="el-icon-plus">返回首页</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

     <el-tabs  type="card" v-model="editableTabsValue"  closable   @tab-click="tabClick" @tab-remove="removeTab" >
           <el-tab-pane id="tab"
               v-for="(item) in editableTabs"
               :key="item.name"
               :label="item.title"
               :name="item.name"
               :ref="item.ref"
           >
           </el-tab-pane>

         </el-tabs>

      <el-main>
        <Message v-if="flag"></Message>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</div>
</template>

<script>
import Message from './Message'


export default {
  name: "Main",
  components: {
     Message
  },
  data (){
    return{
      editableTabsValue: '0',
      tabIndex: 0,
      editableTabs: [],
      index:[],
      Menu:[],
      flag:true,
      himage:''
    }
  },

  created() {
      this.getPc();
      this.gethead();
      window.addEventListener('beforeunload',this.fresh())
  },

  watch:{
    '$route':function (to){
      //新增页面
      // 获得路由元数据的name和组件名
      let flag1=true
      let path=to.path;
      const thisName = to.name
      if(path=="/main"){
        this.flag=true;
      }else {
        this.flag=false;

      }

      if(this.editableTabs.length==0&&path!="/main") {
        this.addTab(path, thisName)
      }
       else {
        for (let i = 0; i < this.$refs.tabs.length; i++) {
            if (this.$refs.tabs[i].label == to.name) {
              this.editableTabsValue=this.$refs.tabs[i].name
              this.$router.push(path);
              flag1=false
              break
            }
        }

        if(flag1){
          if(thisName!="Main") {
            this.addTab(path, thisName)
          }
        }

      }

    },
    editableTabs:function (){
      if(this.editableTabs.length==0)
        this.$router.push("/main");
    }

  },
  methods:{
    async gethead(){
      let uid=window.sessionStorage.getItem('uid');
      const {data:res}=await this.$http.get("http://localhost:1642/api/User/gethead",{params:{uid:uid}});
      console.log(res);
      this.himage=res.data[0]
    },
   async getPc(){
     const {data:res}=await this.$http.get("http://localhost:1642/api/Shop/getMenu");
     res.data.forEach(item=>{
       this.Menu.push({
         index:item.index,
         fname:item.fname,
         ficon:item.ficon,
         son:item.son
       })
     })
    },
    fresh(){
        if(this.$route.path!="/main"){
          this.flag=false;
          console.log(this.editableTabsValue)
        }
    },

    addTab(path,thisName){
      let newActiveIndex = ++this.tabIndex + ''
      //动态双向追加tabs
      this.editableTabs.push({
        title: thisName,
        path:path,
        name: newActiveIndex,
        ref: 'tabs',
      })
      this.editableTabsValue = newActiveIndex

    },
    tabClick(thisTab){
      let val = this.editableTabs.filter(item => thisTab.name == item.name)
      let path=val[0].path
      this.$router.push(path);
    },

    removeTab(targetName){
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push(nextTab.path);
            }
          }

        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);

    },

    jump(path){
      this.$router.push(path);

    },

    handleCommand(command){
     switch (command) {
       case'logout':
         window.sessionStorage.clear();
         this.$router.push('/login');
         break;
       case'return':
         this.$router.push('/main');
         this.editableTabs.splice(0,this.editableTabs.length);

     }

    },

  },


}

</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 100%;
  overflow: visible;
}
body,html{
  height: 100%;
  height:100%
}
.el-dropdown-link {
  cursor: pointer;

}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.headimg{
  position: absolute;
  left:90%;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

</style>
