<template>
<div>
  <el-carousel :interval="4000" type="card" height="200px" class="width">
    <el-carousel-item v-for="url in urls" :key="url">
      <el-image class="el-image" :src="url"></el-image>
    </el-carousel-item>
  </el-carousel>
  <!--按钮弹窗-->

  <div >
    <!--标题-->
    <h3>电竞新闻</h3>
    <!--flex容器包裹-->
    <div class="box">
    <!--主体-->
    <div v-for="(item,index) in news" :key="index" class="box1" >
      <!--发布时间-->
      <span style="text-align: left">{{item.ctime}}</span>
      <!--图片-->
      <el-image :src="item.picUrl"></el-image>
      <!--标题-->
      <a :href="item.url" style="color:#409EFF; text-align: left "> <h4>{{item.title}}</h4></a>
      <!--阐述-->
      <div class="box2">
        <h4 style="text-align: center">详情</h4>
      <span >{{item.description}}</span>
        </div>


    </div>



  </div>

  </div>

</div>
</template>

<script>

export default {
  name: "LOL",
  data(){
    return{
      urls:[
          'https://img0.baidu.com/it/u=3781644895,2627355018&fm=26&fmt=auto&gp=0.jpg',
          'https://img2.baidu.com/it/u=2962949785,3962172824&fm=26&fmt=auto&gp=0.jpg',
          'https://img0.baidu.com/it/u=2210434016,3472441988&fm=26&fmt=auto&gp=0.jpg',
          'https://img2.baidu.com/it/u=139020373,3366794674&fm=26&fmt=auto&gp=0.jpg',
      ],
      news:[]
    }
  },

  mounted() {
    this.postNews();


  },
  methods:{

    async postNews(){
      const {data:res}=await this.$http.get('http://api.tianapi.com/esports/index?key=00b51f9a8a5109c78059e0b71fa053f0');
      this.news=res.newslist;

    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}


.width{
  margin: auto;
  width: 1200px;
}


.el-image{
  width: 100%;
}

.box{
  margin-left:50px ;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  height: 100%;
}

.box1{
  width:350px;
  height:450px;
  margin:20px;
  box-shadow: 0 0 10px #DCDEF6;
  color: #409EFF;
  border: 2px solid #409EFF;

}
a{
  text-decoration: none;

}
.box2{
  margin-top: 10px;
  width: 100%;
  text-align: left;


}


</style>
