<template>
<div class="juzhong">
  <el-table
      :data="data"
      border
      style="width: 100%; "
      :header-cell-style="headerStyle">
    <el-table-column
        fixed
        prop="ctime"
        label="上映时间"
        width="150">
    </el-table-column>
    <el-table-column
        prop="title"
        label="标题"
        width="380">
    </el-table-column>
    <el-table-column
        prop="source"
        label="来源"
        width="120">
    </el-table-column>
    <el-table-column
        prop="description"
        label="简介"
        width="400">
    </el-table-column>
    <el-table-column
        label="地址"
        width="400">
      <template slot-scope="scope">
        <a  :href="[[scope.row.url]]">{{scope.row.url}}</a>
      </template>
    </el-table-column>
    <el-table-column
        label="图片"
        width="200px"
        >
      <template slot-scope="scope" >
      <el-image class="el-image" :src="scope.row.picUrl" ></el-image>
        </template>
    </el-table-column>

  </el-table>
</div>
</template>

<script>

export default {
  name: "dongman",
  data(){
    return{
      data:[],


    }
  },
  mounted(){
    this.loadDate();
  },
  methods:{
    async loadDate(){
      const {data:res}=await this.$http.post('http://api.tianapi.com/dongman/index?key=00b51f9a8a5109c78059e0b71fa053f0',);
      const data=res.newslist;
      data.forEach((data)=>{
       this.data.push({
       ctime:data.ctime,
       title:data.title,
       source:data.source,
       description:data.description,
       url:data.url,
       picUrl:data.picUrl
     })
     })


    },
    headerStyle(){
      return'text-align:center; font-size:20px;';
    },


  }

}


</script>

<style scoped>
.el-image{
  height: 100%;
  width: 100%;

}


div{
  width: 100%;

}



</style>
