<template>
<div>

  <el-container style="height:100%; width: 100%;position: fixed; border: 1px solid #eee">
    <el-aside width="200px" class="el-aside" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">

        <el-submenu index="1">
          <template  slot="title"><i class="el-icon-s-platform"></i>端游</template>
            <el-menu-item v-for="(game,index) in PCGame" :key="index"><router-link @click.native="jump(game.path)" to="">{{game.title}}</router-link></el-menu-item>

        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-mobile-phone"></i>手游</template>
          <el-menu-item v-for="(game,index) in MBGame" :key="index" ><router-link  @click.native="jump(game.path,game)" to="">{{game.game}}</router-link></el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>ACG</template>
            <el-menu-item  v-for="(game,index) in ACG" :key="index"  ><router-link  @click.native="jump(game.path,game)" to="">{{game.game}}</router-link></el-menu-item>
        </el-submenu>

        <el-menu-item >
          <i class="el-icon-chat-line-square"></i>
          <span slot="title"><router-link to="/friend">聊天室</router-link></span>
        </el-menu-item>


      </el-menu>
    </el-aside>

       <el-container>

      <el-header  >
       欢迎{{this.$store.getters.getUser.username}}
        <el-button style="text-align: right;font-size: 12px; position: relative; left: 45%; top:-5px "  @click="logout" type="info">退出</el-button>
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
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</div>
</template>

<script>


export default {
  name: "Main",
  data (){
    return{
      editableTabsValue: '0',
      tabIndex: 0,
      editableTabs: [],
      index:[],
      Pc:[],
      PCGame:[
        {
          title:'CF',
          name:'1',
          game:'CF',
          path:'/cf'
        },
        {
          title:'DNF',
          name:'2',
          game:'DNF',
          path: '/dnf',
        },
        {
          title:'LOL',
          name:'3',
          game:'LOL',
          path: '/lol'
        }
      ],
      MBGame:[
        {
          title:'原神',
          name:'4',
          game:'原神',
          path:'/yuanshen'
        },
        {
          title:'崩坏三',
          name:'5',
          game:'崩坏三',
          path:'/impact'
        },
        {
          title:'王者荣耀',
          name:'6',
          game:'王者荣耀',
          path:'/wangzherongyao'
        }
      ],
      ACG:[
        {
          title:'音乐',
          name:'7',
          game:'音乐',
          path:'/music'
        },
        {
          title:'手办',
          name:'8',
          game: '手办',
          path:'/shouban'
        },
        {
          title:'动漫',
          name:'9',
          game: '动漫',
          path:'/dongman'
        }
      ],

    }
  },

  created() {
      this.getPc();
  },
  watch:{
    '$route':function (to){
      //新增页面
      // 获得路由元数据的name和组件名
      let flag=true
      let path=to.path;
      const thisName = to.name
      if(this.editableTabs.length==0&&path!="/main") {
        this.addTab(path, thisName)
      }
       else {
        for (let i = 0; i < this.$refs.tabs.length; i++) {
            if (this.$refs.tabs[i].label == to.name) {
              this.editableTabsValue=this.$refs.tabs[i].name
              this.$router.push(path);
              flag=false
              break
            }
        }

        if(flag){
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
   async getPc(){
     const {data:res}=await this.$http.post("http://localhost:8081/getPc");
     this.Pc=res;

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

    logout(){
      window.sessionStorage.clear();
      this.$router.push('/login');
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



</style>
