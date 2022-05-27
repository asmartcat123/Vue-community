<template>
<div>


<canvas id="canvas"></canvas>


</div>
</template>

<script>

let canvas;
let ctx;
export default {
  name: "impact",
  data(){
    return{
      character:[],
    }
  },
  mounted() {

    this.qingqiu();
    this.initCanvas();



    },
  methods:{
   async qingqiu(){
      const {data:res}= await this.$http.get("http://localhost:1642/api/WeatherForecast/getCharacter");
      console.log(res)
      this.character=res;
    },
    initCanvas(){
      console.log("初始化canvas")
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      this.drawSmile()
    },
    drawSmile() {
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
      ctx.moveTo(110, 75);
      ctx.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
      ctx.moveTo(65, 65);
      ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
      ctx.moveTo(95, 65);
      ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
      ctx.stroke();
    }

    }
  }

</script>

<style scoped>


</style>
