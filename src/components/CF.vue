<template>
<div>
  <i style="position:relative; left: -50%" @click="check()" class="el-icon-shopping-cart-2"></i>
  <el-row class="box">
    <el-col  v-for="(game,index) in weapon" :key="index"  class="box1">
      <el-card :body-style="{ padding: '0px' ,margin:'0px' }">
        <img :src="game.simage" class="image">
        <div style="padding: 14px;">
          <span>{{game.sname}}</span>
          <p>price:${{game.sprice}}</p>
          <el-popconfirm
              confirm-button-text='购买'
              @confirm="add(game)"
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              :title='game.sname'
          >
          <el-button slot="reference" type="text"  class="button">购买</el-button>
          </el-popconfirm>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog  class="windowbox"  title="购物车" :visible.sync="dialogFormVisible">
    <el-table style="width: 100%"
        :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        :header-cell-style="headerStyle">
      <el-table-column align="center"
                       fixed
                       prop="sid"
                       label="序号"
                       width="50" height="150">
      </el-table-column>
      <el-table-column align="center"
          fixed
          prop="sname"
          label="武器名称"
          width="150" height="150">
      </el-table-column>
      <el-table-column align="center"
          prop="sprice"
          label="武器价格"
          width="150">
      </el-table-column>
      <el-table-column  align="center"  label="操作" >
        <template  slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <p style="text-align:left;margin-top:20px">total:${{total()}}</p>

    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :page-size="pagesize"
        :total="list.length">
    </el-pagination>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>

export default {
  name: "CF",
  data(){
    return{
      pagesize:3,//每页显示条数
      currentPage:1,//初始页
      list:[],
      weapon:[],
      currentDate: new Date(),

      dialogFormVisible: false,
    }
  },
  mounted() {
    this.getweapon();
  },
  created() {

  },
  methods:{
    async getweapon(){
     const {data:res}=await this.$http.get("http://localhost:1642/api/Shop/getweapon");
     console.log(res.data);
     res.data.forEach(item=>{
       this.weapon.push({
         sname:item.wname,
         simage:item.wimage,
         sprice:item.wprice
       })
     })
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;

    },
    total(){
      var total=0;
      this.list.forEach(item=>{
        total=total+item.sprice
      })
      return total;

    },
   async add(game){
     const {data:res}=await this.$http.post("http://localhost:1642/api/Shop/buyweapon",game);
     if(res.code!=200) return this.$message.error("购买失败");
     this.$message.success("购买成功");

    },
    handleDelete(index, row) {
      const sid=row.sid
      this.$http.delete("http://localhost:1642/api/Shop/deleteshop",{params:{sid:sid}});
      this.list.splice(index,1);

      if(this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize).length==0){
         this.handleCurrentChange(this.currentPage-1);
      }
    },
   async check(){
      const {data:res}=await this.$http.get("http://localhost:1642/api/Shop/getshop");
      console.log(res);
      this.list=res.data;
      this.handleCurrentChange(1);
      this.dialogFormVisible=true
    },
    headerStyle(){
      return'text-align:center;';
    },

  }

}
</script>

<style scoped>

.box{
  display: flex;
  width:100%;
  height: 100%;
  flex-wrap: wrap;
}

.box1{
  margin:10px;
  width: 300px;
}

.image {
  width: 100%;
  height:150px;
}


.button {
  padding: 0;
  float: right;
}
.windowbox{
  margin:  auto;
  width:50%;


}




</style>
